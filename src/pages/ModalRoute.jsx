import React, { useState, useEffect } from "react";
import {
  Link,
  Outlet,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Dialog } from "@reach/dialog";

export const ModalRoute = () => {
  const [characters, setCharacters] = useState([]);
  const [urlSearchParams, setSearchParams] =
    useSearchParams();

  const fetchRandomUsers = async () => {
    const response = await (
      await fetch(
        `https://rickandmortyapi.com/api/character/?page=${urlSearchParams.get("page")}`
      )
    ).json();
    setCharacters(response.results);
  };

  useEffect(() => {
    fetchRandomUsers();
  }, [urlSearchParams]);

  const handlePageSelect = (page) => {
    setSearchParams({ page });
  };

  return (
    <div>
      <select
        defaultValue={urlSearchParams.get("page") || 1}
        onChange={(e) => handlePageSelect(e.target.value)}
      >
        {new Array(10).fill(1).map((_, index) => {
          if (index === 0) {
            return (
              <option key={index} value={index}>
                pages
              </option>
            );
          }
          return (
            <option key={index} value={index}>
              {index}
            </option>
          );
        })}
      </select>
      <ul className="character_list">
        {characters?.map((character) => (
          <li key={character.id}>
            <Link
              to={`/modal-route/${character.id}`}
              state={{ character }}
            >
              <img
                src={character.image}
                alt={character.name}
              />
            </Link>
            <h4>{character.name}</h4>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};

export const Modal = () => {
  const [char, setChar] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchCharacter = async () => {
    const response = await (
      await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      )
    ).json();
    setChar(response);
  };

  useEffect(() => {
    fetchCharacter();
  }, []);

  function onDismiss() {
    navigate(-1);
  }

  if (!char) return null;

  return (
    <Dialog aria-labelledby="label" onDismiss={onDismiss}>
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          padding: "8px 8px",
        }}
      >
        <h1 id="label" style={{ margin: 0 }}>
          {char.name}
        </h1>
        <img
          style={{
            margin: "16px 0",
            borderRadius: "8px",
            width: "100%",
            height: "auto",
          }}
          width={400}
          height={400}
          src={char.image}
          alt={char.name}
        />
        <button
          style={{ display: "block" }}
          onClick={onDismiss}
        >
          Close
        </button>
      </div>
    </Dialog>
  );
};
