import React, { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .then(() => navigate("/"))
      .catch(err => alert(err.message));
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={loginUser}>
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;