import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const Post = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const params = useParams();

  const fetchUser = async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${params.userId}`
    );
    const data = await response.json();
    setUser(data);
  }

  const fetchPosts = async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${params.userId}`
    );
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchUser();
    fetchPosts();
  }, [params.userId]);

  return (
    <div className="container">
      <div>
        <h1>{user?.name}</h1>
        <p>{user?.email}</p>
      </div>
      <div>
        <h2>
          List of posts of {user?.name}
        </h2>
        <hr/>
      </div>
      <div>
        {posts?.map((item) => {
          return (
            <div className="post_container" key={item.id}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
