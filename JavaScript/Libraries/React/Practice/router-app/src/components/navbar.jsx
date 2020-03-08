import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/products">Products</Link>
      </li>
      <li>
        <Link to="/posts/2019/01?year=2020&month=02">Posts</Link>
      </li>
      <li>
        <Link to="/admin">Admin</Link>
      </li>
    </ul>
  );
};

export default NavBar;
