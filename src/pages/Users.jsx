import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const Users = () => {
  const [ users, setUsers ] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );
    const data = await response.json();
    setUsers(data);
    navigate(`/posts/${data[0].id}`, { replace: true });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClick = (id) => {
    navigate(`/posts/${id}`);
  };

  return (
    <div className="container">
      <div className="post_flex">
        <ul>
          {users?.map((user) => (
            <li
              key={user.id}
              onClick={() => handleClick(user.id)}
            >
              <h2>{user.name}</h2>
            </li>
          ))}
        </ul>
        <Outlet />
      </div>
    </div>
  );
};
