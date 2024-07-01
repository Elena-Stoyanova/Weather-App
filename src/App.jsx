import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import { createContext, useEffect, useState } from 'react';
import Forecast from './pages/forecast/Forecast';
import getLocalDate from './utils/getLocalDate';

export const AppContext = createContext(null);

function App() {
  const [date, setDate] = useState(getLocalDate(new Date()));
  const [weather, setWeather] = useState([]);
  const [metric, setMetric] = useState(
    JSON.parse(localStorage.getItem('metric')) || 'C'
  );
  const [dayOfWeek, setDayOfWeek] = useState('Today');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // const localDate = getLocalDate(new Date());

  useEffect(() => {
    let units;
    if (metric === 'C') {
      units = 'metric';
    } else {
      units = 'imperial';
    }

    fetch('https://extreme-ip-lookup.com/json/?key=9nLcPDX63sfyU3VJ0Sg9')
      .then((res) => res.json())
      .then((res) => {
        if (res.lat && res.lon) {
          return fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${res.lat}&lon=${res.lon}&units=${units}&appid=04f4fa3569bdfc8f9603c1b71a4dea51`
          );
        } else {
          throw new Error('Latitude or longitude is missing');
        }
      })
      .then((data) => data.json())
      .then((data) => {
        setWeather(data);
        console.log(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, [metric]);

  if (isLoading) {
    return;
  }

  if (error) {
    return console.log('Request failed:', error);
  }

  return (
    <BrowserRouter>
      <AppContext.Provider
        value={{
          date,
          setDate,
          weather,
          setWeather,
          metric,
          setMetric,
          dayOfWeek,
          setDayOfWeek,
        }}
      >
        <header>
          <h2>Weather App</h2>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/forecast/:date' element={<Forecast />} />
          </Routes>
        </main>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
