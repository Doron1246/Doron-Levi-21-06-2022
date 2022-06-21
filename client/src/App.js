import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Favorites from "./components/Favorites";

function App() {
  const [favorites, setFavorites] = useState([]);
  const [location, setLocation] = useState();
  const [city, setCity] = useState("Tel Aviv");

  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path='/'
            exact
            element={
              <Home
                setFavorites={setFavorites}
                favorites={favorites}
                location={location}
                setLocation={setLocation}
                city={city}
                setCity={setCity}
              />
            }
          />
          <Route
            path='/favorites'
            element={
              <Favorites
                favorites={favorites}
                setFavorites={setFavorites}
                setLocation={setLocation}
                setCity={setCity}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
