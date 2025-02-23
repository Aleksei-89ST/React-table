import { useState, useEffect, useRef } from "react";
import "./App.css";
import SearchInput from "./components/UI/SearchInput";
import Table from "./components/UI/Table";
import Popup from "./components/UI/Popup";
import CircularProgress from "@mui/material/CircularProgress";
function App() {
  const [products, setProducts] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [popupState, setPopupState] = useState(false);

  const mainCheckBox = useRef();

  async function getData() {
    return Promise.all([firstRequest(), secondRequest()]).then((data) => [
      ...data[0],
      ...data[1],
    ]);
    async function firstRequest() {
      const response = await fetch(
        "https://api.jsonbin.io/v3/b/639744f62d0e0021081aff35",
        {
          method: "GET",
          headers: {
            "X-Master-Key":
              "$2b$10$Tz6GO99EGxvlLju25FojYeQIFgETK7Q9hXK.A6BqKQoZcEx69VcS.",
          },
        }
      );
      const data = await response.json();
      return data.record;
    }
    async function secondRequest() {
      const response = await fetch(
        "https://api.jsonbin.io/v3/b/639748812d0e0021081b01e4",
        {
          method: "GET",
          headers: {
            "X-Master-Key":
              "$2b$10$Tz6GO99EGxvlLju25FojYeQIFgETK7Q9hXK.A6BqKQoZcEx69VcS.",
          },
        }
      );
      const data = await response.json();
      return data.record;
    }
  }
  function sortByDate(array) {
    array.sort((a, b) =>
      Date.parse(a.delivery_date) > Date.parse(b.delivery_date) ? -1 : 1
    );
    return array;
  }

  useEffect(() => {
    getData().then((data) => {
      setProducts(sortByDate(data));
      setSearchedProducts(data);
    });
  }, []);

  function search(field, searchQuery) {
    if (searchQuery) {
      setSearchedProducts(
        products.filter((product) =>
          (product[field] + "").includes(searchQuery)
        )
      );
    } else setSearchedProducts([...products]);
  }

  function setCheckOnProduct(e, mainCheckBox) {
    const parent = e.target.closest(".product_row");
    const newArr = searchedProducts.map((el) => {
      if (el.id === +parent.id) {
        if (el.status === true) {
          el.status = false;
          mainCheckBox.checked = false;
        } else {
          el.status = true;
        }
      }
      return el;
    });
    setSearchedProducts(newArr);
  }

  function setAllProductsAsCheked(e) {
    if (!e.target.checked) {
      console.log(e.target);
      const newArr = products.map((product) => {
        product.status = false;
        return product;
      });
      setSearchedProducts(newArr);
    } else {
      console.log(e.target);
      const newArr = products.map((product) => {
        product.status = true;
        return product;
      });
      setSearchedProducts(newArr);
    }
  }

  function pushChekedProductsInPopup() {
    const res = [];
    searchedProducts.forEach((product) => {
      if (product.status) res.push(product.name);
    });
    return res;
  }

  function closePopup(e) {
    if (e.target.className === "popup" || e.target.className === "cancel_popup")
      setPopupState(false);
  }

  function annulProducts() {
    const newArr = searchedProducts.map((product) => {
      product.status = false;
      return product;
    });
    mainCheckBox.current.checked = false;
    setSearchedProducts(newArr);
    setPopupState(false);
  }

  return (
    <div className="App">
      {products.length > 0 ? (
        <>
          <SearchInput search={search}></SearchInput>
          <Table
            mainCheckBox={mainCheckBox}
            setAllProductsAsCheked={setAllProductsAsCheked}
            setCheckOnProduct={setCheckOnProduct}
            array={searchedProducts}
          ></Table>
          {searchedProducts.length > 0 ? (
            <button className="annul" onClick={() => setPopupState(true)}>
              Анулировать
            </button>
          ) : (
            ""
          )}
          {popupState && (
            <Popup
              annulProducts={annulProducts}
              closePopup={closePopup}
              content={pushChekedProductsInPopup()}
            ></Popup>
          )}
        </>
      ) : (
        <CircularProgress className="circularProgress"></CircularProgress>
      )}
    </div>
  );
}

export default App;
