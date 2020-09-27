import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [invalidInputs, setInvalid] = useState({ name: false, email: false, password: false })

  const handleSignup = e => {
    e.preventDefault();
    const emailIsValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    if (emailIsValid && !!name && !!password) {
      axios.post("/signup", { name, email, password }).then(res => {
        console.log(res);
        console.log(res.data);
      });
    }
    setInvalid({ name: !name, email: !emailIsValid, password: !password })
  };
  return (
    <>
      <h1>Sign up</h1>
      <div className="form">
        <input
          autoFocus
          placeholder="Name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className={invalidInputs.name ? 'invalid' : undefined}
          autoComplete="name"
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={invalidInputs.email ? 'invalid' : undefined}
          autoComplete="email"
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={invalidInputs.password ? 'invalid' : undefined}
          autoComplete="new-password"
        />
        <button onClick={handleSignup}>Sign up</button>
        <Link to="/signin">Already have an account?</Link>
      </div>
    </>
  );
};

export default Signup;
