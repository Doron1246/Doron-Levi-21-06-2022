import React from "react";
import { useNavigate } from "react-router-dom";
import "./Favorites.css";

export default function Fevorits({ favorites, setFavorites, setCity }) {
  //console.log({ favorites });
  const nav = useNavigate();

  const handleRemoveFromFavories = (favorite) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(
        (favor) => favor.location.Key !== favorite.location.Key
      );
      return updatedFavorites;
    });
  };

  return (
    <div>
      <h1>Favorites</h1>
      <div className='favorite-container'>
        {favorites.map((favorite, i) => {
          return (
            <div key={i} className='city-card'>
              <h3>{favorite.location.LocalizedName}</h3>
              <h4>{favorite.cityWeather[0].Temperature.Metric.Value}C</h4>
              <button
                onClick={() => {
                  setCity(favorite.location.LocalizedName);
                  nav("/");
                }}
              >
                Select
              </button>
              <button onClick={() => handleRemoveFromFavories(favorite)}>
                Remove from favorites
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
