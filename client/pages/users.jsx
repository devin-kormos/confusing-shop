import React from "react";
import { Link } from "react-router-dom";

const UsersPage = () => {
  return (
    <div>
      <h3>Welcome to UsersPage</h3>
      <ul>
        <li><Link to="/">Main Page</Link></li>
        <li><Link to='/users'>Users</Link></li>
      </ul>
    </div>
  );
};

export default UsersPage;
