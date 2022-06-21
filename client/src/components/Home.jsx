import React from "react";
import { useEffect, useState } from "react";
import Autocomplete from "./Autocomplete";
import CorrentWeather from "./CorrentWeather";
import "./Home.css";

const apiKey2 = "8j7t0np4nHcDaTHN6tXFt4eJc8AWJ2ZT";
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Home({
  setFavorites,
  favorites,
  location,
  setLocation,
  city,
  setCity,
}) {
  const [suggestions, setSuggestion] = useState([]);
  const [currentWeather, setWeather] = useState();

  useEffect(() => {
    if (city) {
      handleSearchChange(city);
    }
  }, []);

  useEffect(() => {
    if (location) {
      getLocationWeather(location);
    }
  }, [location]);

  const handleSearchChange = async (value) => {
    if (!value) {
      return;
    }

    if (!value.match(/[a-zA-Z]/)) {
      alert("Please use english alphabeth");
      return;
    }

    setCity(value);
    try {
      const results = await fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey2}&q=${value}`,
        {
          mode: "cors",
          headers: {
            Accept: "*/*",
            "Accept-Encoding": "gzip",
            "Accept-Language": "en-US",
            Host: "api.accuweather.com",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML",
          },
        }
      );
      const suggestions = await results.json();
      if (suggestions.length === 0) {
        return;
      }
      setLocation(suggestions[0]);
      setSuggestion(suggestions);
      //console.log(suggestions);
      getLocationWeather(suggestions[0]);
    } catch (err) {
      alert("Could not get suggestions from accuweather");
      return;
    }
  };

  const onSuggestionSelect = async (location) => {
    if (!location) {
      return;
    }

    setCity(location.LocalizedName);
    try {
      setLocation(location);
      setSuggestion([]);
      //console.log(suggestions);
      getLocationWeather(location);
    } catch (err) {
      alert("Could not get suggestions from accuweather");
      return;
    }
  };

  const getLocationWeather = async (location) => {
    try {
      const results = await fetch(
        `http://dataservice.accuweather.com/currentconditions/v1/${location.Key}?apikey=${apiKey2}`,
        {
          mode: "cors",
          headers: {
            Accept: "*/*",
            "Accept-Encoding": "gzip",
            "Accept-Language": "en-US",
            Host: "api.accuweather.com",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML",
          },
        }
      );
      const currentResultWeather = await results.json();

      const resultsFor5Days = await fetch(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${location.Key}?apikey=${apiKey2}`,
        {
          mode: "cors",
          headers: {
            Accept: "*/*",
            "Accept-Encoding": "gzip",
            "Accept-Language": "en-US",
            Host: "api.accuweather.com",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML",
          },
        }
      );
      const dataOfFiveDayForcast = await resultsFor5Days.json();

      const weather = {
        cityWeather: currentResultWeather,
        fiveDayForcast: dataOfFiveDayForcast,
      };
      //console.log(weather);
      setWeather(weather);
    } catch (err) {
      alert(
        "Could not get location data and five day forcast from accuweather"
      );
      return;
    }
    //console.log(dataOfFiveDayForcast);
  };

  const temperatureConverter = (fahr) => {
    const newInC = (fahr - 32) / 1.8;
    return Math.round(newInC);
  };

  const isLocationFavorite = favorites.some(
    (favorite) => favorite.location.LocalizedName === location?.LocalizedName
  );

  const addToFavorites = () => {
    // console.log(currentWeather);
    if (isLocationFavorite) {
      alert("already in favorites");
      return;
    }
    const favorite = { ...currentWeather, location };
    setFavorites((prevFavorites) => [...prevFavorites, favorite]);
  };

  const handleRemoveFromFavories = (favorite) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(
        (favor) => favor.location.Key !== location.Key
      );
      return updatedFavorites;
    });
  };

  return (
    <div className='autocomplete'>
      <Autocomplete
        value={city}
        handleSearchChange={handleSearchChange}
        onSuggestionSelect={onSuggestionSelect}
        suggestions={suggestions}
      />
      <br />
      {isLocationFavorite ? (
        <button onClick={handleRemoveFromFavories}>
          Remove from Favorites
        </button>
      ) : (
        <button onClick={addToFavorites}>Add To Favorites</button>
      )}
      <br />
      {currentWeather && location ? (
        <CorrentWeather
          weather={currentWeather}
          location={location}
          favorites={favorites}
        />
      ) : (
        <div>Please search for a location</div>
      )}
      <div className='days-container'>
        {currentWeather &&
          currentWeather.fiveDayForcast.DailyForecasts.map((day, i) => {
            const date = new Date(day.Date);
            return (
              <div className='day-card' key={i}>
                <h3>{weekDays[date.getDay()]}</h3>
                <h4>
                  Max: {temperatureConverter(day.Temperature.Maximum.Value)}C
                </h4>
                <h4>
                  Min: {temperatureConverter(day.Temperature.Minimum.Value)}C
                </h4>
              </div>
            );
          })}
      </div>
    </div>
  );
}
