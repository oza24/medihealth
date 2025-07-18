import React from "react";
import { useStateValue } from "../context";

function Checkout() {
  const [{ cart }] = useStateValue();

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.map((item, index) => (
        <div key={index}>
          <p>{item.title}</p>
          <p>₹{item.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Checkout;