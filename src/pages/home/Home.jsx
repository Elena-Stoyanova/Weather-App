import { useEffect, useState } from 'react';
import Card from '../../components/Card';
import { Container, Grid } from '@mui/joy';
import DayForecast from '../day-forecast/DayForecast';

const Home = () => {
  const [weather, setWeather] = useState([]);

  // display weather for today for user location via Api
  // display 4 cards for days after today via Api
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
        console.log('Request failed:', error);
      });
  }, []);

  const date = new Date(1719360000 * 1000);

  // Options for date formatting
  const options = {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
  };

  // Format the date using toLocaleDateString
  const formattedDate = date.toLocaleDateString('en-US', options);

  console.log(formattedDate);

  return (
    <Container>
      <DayForecast />
      <br></br>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Array.from(Array(4)).map((_, index) => (
          <Grid xs={2} sm={8} md={6} key={index}>
            <Card />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
