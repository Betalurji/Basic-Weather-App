import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = 'a384b43e55307ef3d8aab9323edd36fd';

const getWeatherData = async (location) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Hava durumu verisi alınırken hata oluştu:', error);
    return null;
  }
};

const kelvinToCelsius = (kelvin) => {
  return kelvin - 273.15;
};

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const handleButtonClick = async () => {
    const data = await getWeatherData(location);
    if (data) {
      setWeatherData(data);
      setError('');
    } else {
      setWeatherData(null);
      setError('Yanlış ya da olmayan bir lokasyon girdiniz.');
    }
  };

  return (
    <div className="grid h-screen bg-gray-800 place-items-center">
      <div className="p-4 bg-white rounded-md">
        <div className="flex items-center">
          <input 
            type="text" 
            placeholder="Şehir Adı"
            className="w-full p-1 text-xl font-semibold uppercase border-none focus:outline-none"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button onClick={handleButtonClick} className="px-3 py-1 ml-2 bg-gray-200 rounded-md">
            <img
              src="https://cdn-icons-png.flaticon.com/512/758/758651.png"
              alt="..."
              className="w-8"
            />
          </button>
        </div>
        {error && (
          <p className="text-red-500">{error}</p>
        )}
      </div>
      {weatherData && (
        <div className="absolute flex items-end justify-center h-screen py-20 text-white">
          <p>Mevcut Sıcaklık: {kelvinToCelsius(weatherData.main.temp).toFixed(2)} °C</p>
          {weatherData.weather[0].main === 'Clear' && (
            <img src="https://cdn-icons-png.flaticon.com/512/6974/6974833.png" alt="Güneşli" className="w-10 h-10 ml-2" />
          )}
          {weatherData.weather[0].main === 'Snow' && (
            <img src="https://cdn-icons-png.flaticon.com/512/642/642102.png" alt="Karlı" className="w-10 h-10 ml-2" />
          )}
          {weatherData.weather[0].main === 'Rain' && (
            <img src="https://cdn-icons-png.flaticon.com/512/3351/3351979.png" alt="Yağmurlu" className="w-10 h-10 ml-2" />
          )}
          {weatherData.weather[0].main === 'Mist' && (
            <img src="https://cdn-icons-png.flaticon.com/512/4380/4380458.png" alt="Sisli" className="w-10 h-10 ml-2" />
          )}
          {weatherData.weather[0].main === 'Clouds' && (
            <img src="https://cdn-icons-png.flaticon.com/512/414/414825.png" alt="Bulutlu" className="w-10 h-10 ml-2" />
          )}
          {weatherData.weather[0].main === 'Haze' && (
            <img src="https://cdn-icons-png.flaticon.com/512/1197/1197102.png" alt="Haze" className="w-10 h-10 ml-2" />
          )}
          {weatherData.weather[0].main === 'Smoke' && (
            <img src="https://cdn-icons-png.flaticon.com/512/4380/4380458.png" alt="Smoke" className="w-10 h-10 ml-2" />
          )}
          {weatherData.weather[0].main === 'Drizzle' && (
            <img src="https://cdn-icons-png.flaticon.com/512/3076/3076129.png" alt="Drizzle" className="w-10 h-10 ml-2" />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
