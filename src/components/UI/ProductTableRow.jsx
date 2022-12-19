import React from "react";

const ProductTableRow = ({
  setCheckOnProduct,
  mainCheckBox,
  id,
  status,
  sum,
  qty,
  volume,
  name,
  delivery_date,
  currency,
}) => {
  {
    return (
      <tr className="product_row" id={id}>
        <td
          onClick={(e) => {
            setCheckOnProduct(e, mainCheckBox.current);
          }}
        >
          <input type="checkbox" readOnly checked={status ? true : false} />
          {" " + name}
        </td>
        <td>{status ? "Доставлено" : "Не доставлено"}</td>
        <td>{sum}</td>
        <td>{qty}</td>
        <td>{currency}</td>
        <td>{volume}</td>
        <td>{delivery_date}</td>
        <td>
          {sum * qty} {currency}
        </td>
      </tr>
    );
  }
};

export default ProductTableRow;
