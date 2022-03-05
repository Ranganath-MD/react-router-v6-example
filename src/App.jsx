import { Routes, Route, NavLink } from "react-router-dom";
import { Home, Users, Post, ModalRoute, Modal } from "./pages";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav_active" : "nav_item"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/posts"
          className={({ isActive }) =>
            isActive ? "nav_active" : "nav_item"
          }
        >
          Posts
        </NavLink>
        <NavLink
          to="/modal-route"
          className={({ isActive }) =>
            isActive ? "nav_active" : "nav_item"
          }
        >
          Modal Route
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="posts" element={<Users />}>
          <Route path=":userId" element={<Post />} />
        </Route>
        <Route path="modal-route" element={<ModalRoute />}>
          <Route path=":id" element={<Modal />} />
        </Route>
      </Routes>
    </div>
  );
}
