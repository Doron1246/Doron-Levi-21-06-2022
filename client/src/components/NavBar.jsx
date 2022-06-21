import React from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
export default function NavBar() {
  const nav = useNavigate();

  return (
    <div className='nav-conteiner'>
      <button onClick={() => nav("/")}>Home</button>
      <button
        onClick={() => {
          nav("/favorites");
        }}
      >
        Favorites
      </button>
    </div>
  );
}
