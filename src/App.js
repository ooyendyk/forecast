import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrentWeather = ({ weather }) => {
    if (!weather) {
        return <p>No weather data available.</p>;
    }

    const { city, list } = weather;
    const kelvinToCelsius = (temperature) => Math.round(temperature - 273.15);
    const currentForecast = list[0];

    return (
        <div>
            <h2>{city.name}</h2>
            <h3>Current Weather</h3>
            <p>Date: {new Date(currentForecast.dt_txt).toLocaleDateString()}</p>
            <p>Temperature: {kelvinToCelsius(currentForecast.main.temp)}°C</p>
            <p>Description: {currentForecast.weather[0].description}</p>
        </div>
    );
};

const WeeklyForecast = ({ weather }) => {
    if (!weather) {
        return <p>No weather data available.</p>;
    }

    const { city, list } = weather;
    const kelvinToCelsius = (temperature) => Math.round(temperature - 273.15);
    const weeklyForecast = list.slice(1, 8); // Exclude the current forecast

    return (
        <div>
            <h3>Weekly Forecast</h3>
            {weeklyForecast.map((forecast) => (
                <div key={forecast.dt}>
                    <p>Date: {new Date(forecast.dt_txt).toLocaleDateString()}</p>
                    <p>Temperature: {kelvinToCelsius(forecast.main.temp)}°C</p>
                    <p>Description: {forecast.weather[0].description}</p>
                </div>
            ))}
        </div>
    );
};

const WeatherApp = () => {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('');

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (city) {
                try {
                    const response = await axios.get(
                        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`
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

    return (
        <div>
            <h1>Weather App</h1>
            <input
                type="text"
                value={city}
                onChange={handleCityChange}
                placeholder="Enter city"
            />
            <CurrentWeather weather={weather} />
            <WeeklyForecast weather={weather} />
        </div>
    );
};

export default WeatherApp;
