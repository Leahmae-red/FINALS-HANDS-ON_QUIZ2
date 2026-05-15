import React, { useState } from "react";
import "./App.css";

function App() {
  const [place, setPlace] = useState("");
  const [forecast, setForecast] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "24f8d416ffc22654e71eb27ba334e1c7";
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

  const searchWeather = async (e) => {
    e.preventDefault();

    if (!place.trim()) {
      setMessage("Please enter a city");
      return;
    }

    setLoading(true);
    setMessage("");
    setForecast(null);

    try {
      const res = await fetch(
        `${BASE_URL}?q=${place.trim()}&appid=${API_KEY}&units=metric`);

      if (!res.ok) {
        throw new Error("Location not found");
      }

      const data = await res.json();
      setForecast(data);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="climate-box">
        <h1 className="title">WEATHER MAP</h1>

        <form onSubmit={searchWeather} className="search-form">
          <input
            type="text"
            placeholder="type a city..."
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="search-input"
          />

          <button type="submit" className="search-btn">
            Search
          </button>
        </form>

        {loading && <p className="info-text">Loading weather...</p>}

        {message && <p className="error-text">{message}</p>}

        {forecast && (
          <div className="weather-section">
            <div className="top-info">
              <h2>
                {forecast.name}, {forecast.sys.country}
              </h2>

              <p className="weather-type">
                {forecast.weather[0].main}
              </p>
            </div>

            <h1 className="temperature">
              {Math.round(forecast.main.temp)}°C
            </h1>

            <div className="weather-details">
              <div className="detail-card">
                <span>Humidity</span>
                <strong>{forecast.main.humidity}%</strong>
              </div>

              <div className="detail-card">
                <span>Wind Speed</span>
                <strong>{forecast.wind.speed} m/s</strong>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
