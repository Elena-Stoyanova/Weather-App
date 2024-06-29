import { useContext, useEffect, useState } from 'react';
import Card from '../../components/Card';
import { Container, Grid } from '@mui/joy';
import DayForecast from '../day-forecast/DayForecast';
import getAverageDailyForecast from '../../utils/getAverageDailyForecast';
import getAllDayForecast from '../../utils/getAllDayForecast';
import { AppContext } from '../../App';

const Home = () => {
  const [weather, setWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const { setDate } = useContext(AppContext);
  // Celsius units=metric default option
  // Fahrenheit use units=imperial option

  useEffect(() => {
    fetch('https://extreme-ip-lookup.com/json/?key=9nLcPDX63sfyU3VJ0Sg9')
      .then((res) => res.json())
      .then((res) => {
        if (res.lat && res.lon) {
          return fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${res.lat}&lon=${res.lon}&units=metric&appid=82691f8ceb43fb41024c6f58dfb99db6`
          );
        } else {
          throw new Error('Latitude or longitude is missing');
        }
      })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setWeather(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return;
  }

  if (error) {
    return console.log('Request failed:', error);
  }

  // const today = new Date().toISOString().split('T')[0];
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(today.getDate()).padStart(2, '0');

  const localDate = `${year}-${month}-${day}`;
  setDate(localDate);

  const averageDaysForecast = getAverageDailyForecast(weather.list);

  console.log(today);
  console.log(weather.list);

  return (
    <section>
      <DayForecast
        today={today}
        city={weather.city.name}
        weatherList={weather.list}
      />
      <br></br>
      <Grid
        section
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {averageDaysForecast.map((day, index) => (
          <Card day={day} key={index} />
        ))}
      </Grid>
    </section>
  );
};

export default Home;
