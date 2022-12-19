import React from "react";

const Popup = ({ content, closePopup, annulProducts }) => {
  return (
    <div onClick={(e) => closePopup(e)} className="popup">
      <div className="popup_content">
        <span className="cancel_popup">X</span>
        Вы уверены что хотите аннулировать товары?
        <ul>
          {content.map((productName) => (
            <li>{productName}</li>
          ))}
        </ul>
        <div className="popup_buttons">
          <button onClick={annulProducts}>Применить</button>
          <button className="cancel_popup">Отменить</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
