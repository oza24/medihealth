import React from "react";
import { useStateValue } from "../context";

function Product({ id, title, price, image }) {
  const [, dispatch] = useStateValue();

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      item: { id, title, price, image },
    });
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
      <img src={image} alt={title} style={{ width: "200px" }} />
      <h3>{title}</h3>
      <p>₹{price}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}

export default Product;
