import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [invalidInputs, setInvalid] = useState({ email: false, password: false })

  const handleSubmit = e => {
    e.preventDefault();
    const emailIsValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    if (emailIsValid && !!password) {
      axios.post("/signin",
        { email, password }
      ).then(({ data }) => {

        localStorage.setItem("jwt", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

      });
    }
    setInvalid({ email: !emailIsValid, password: !password })
  };
  return (
    <>
      <h1>Signin</h1>
      <div className="form">
        <input
          autoFocus
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
        <button onClick={handleSubmit}>Sign in</button>
        <Link to="/signup">Don't have an account yet?</Link>
      </div>
    </>
  );
};

export default Signin;
