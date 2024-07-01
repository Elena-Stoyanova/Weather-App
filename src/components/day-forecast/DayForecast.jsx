import './DayForecast.scss';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App';
import getAllDayForecast from '../../utils/getAllDayForecast';
import {
  AirRounded,
  HPlusMobiledata,
  WaterDropRounded,
} from '@mui/icons-material';

const DayForecast = ({ date, dayOfWeek }) => {
  const { weather, metric, setMetric } = useContext(AppContext);
  const dailyForecast = getAllDayForecast(date, weather.list);
  const [hourForecast, setHourForecast] = useState(dailyForecast[0]);

  // fix date
  // display wind.speed

  const temp = Math.round(hourForecast.main.temp);
  const maxTemp = Math.round(hourForecast.main.temp_max);
  const minTemp = Math.round(hourForecast.main.temp_min);
  const iconId = hourForecast.weather[0].id;
  const dayOrNight = hourForecast.sys.pod;
  const description = hourForecast.weather[0].main;
  const windSpeed = hourForecast.wind.speed;
  const humidity = hourForecast.main.humidity;

  const isChangedMetrics = dailyForecast[0].main.temp;

  useEffect(() => {
    setHourForecast(dailyForecast[0]);
    localStorage.setItem('metric', JSON.stringify(metric));
  }, [isChangedMetrics]);

  const options = {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  const optionsHour = {
    hour: '2-digit',
    minute: '2-digit',
  };

  const dateText = new Date(hourForecast.dt * 1000).toLocaleDateString(
    'en-US',
    options
  );

  return (
    <div className='dayForecast'>
      <h3>{dayOfWeek}</h3>

      <br />

      <div className='headerContainer'>
        <div className='wrapper'>
          <LocationOnRoundedIcon />
          <h3>{weather.city.name}</h3>
        </div>
        <p>{dateText}</p>
      </div>

      <div className='radioButtons'>
        <div className='radio'>
          <label>
            <input
              type='radio'
              value='C'
              checked={metric === 'C'}
              onChange={() => setMetric('C')}
            />
            °C
          </label>
        </div>
        <div className='radio'>
          <label>
            <input
              type='radio'
              value='F'
              checked={metric === 'F'}
              onChange={() => setMetric('F')}
            />
            °F
          </label>
        </div>
      </div>

      <br />

      <div className='wrapper'>
        <div className='wrapper'>
          <i className={`owf owf-${iconId}-${dayOrNight} owf-2x`} />
          <h3>{description}</h3>
        </div>
        <h2 className='degreeHeader'>
          {temp}°{metric}
        </h2>
      </div>

      <p>
        {maxTemp}°{metric} / {minTemp}°{metric}
      </p>

      <br />

      <div className='wrapper'>
        <div className='wrapper'>
          <AirRounded />
          <p>{windSpeed}</p>
        </div>

        <div className='wrapper'>
          <WaterDropRounded />
          <p>{humidity}%</p>
        </div>
      </div>

      <br />

      <div className='scrollbarContainer'>
        {dailyForecast.map((hourData, index) => (
          <div
            className='hourCard'
            key={index}
            onClick={() => setHourForecast(hourData)}
          >
            <h3>
              {new Date(hourData.dt * 1000).toLocaleTimeString(
                'en-US',
                optionsHour
              )}
            </h3>
            <p>
              {Math.round(hourData.main.temp_max)}°{metric} /{' '}
              {Math.round(hourData.main.temp_min)}°{metric}
            </p>
            <div className='wrapper'>
              <i
                className={`owf owf-${hourData.weather[0].id}-${hourData.sys.pod} owf-lg`}
              />
              <h3>{hourData.weather[0].main}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayForecast;
