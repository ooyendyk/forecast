import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (city) {
        try {
          const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`
          );
          setWeather(response.data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
          setWeather(null);
        }
      }
    };

    fetchWeatherData().then();
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const renderWeatherInfo = () => {
    if (!weather) {
      return <p>No weather data available.</p>;
    }

    const { name, main, weather: weatherInfo } = weather;

    return (
        <div>
          <h2>{name}</h2>
          <p>Temperature: {main.temp}°C</p>
          <p>Description: {weatherInfo[0].description}</p>
        </div>
    );
  };

  return (
      <div>
        <h1>Weather App</h1>
        <input
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter city"
        />
        {renderWeatherInfo()}
      </div>
  );
};

export default WeatherApp;
