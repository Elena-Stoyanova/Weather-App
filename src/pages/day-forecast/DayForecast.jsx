import './DayForecast.scss';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { useContext, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../App';
import getAllDayForecast from '../../utils/getAllDayForecast';

const DayForecast = ({ city, weatherList }) => {
  const { date } = useContext(AppContext);

  console.log(date);
  console.log(weatherList);
  const [dailyForecast, setDailyForecast] = useState(
    getAllDayForecast(date, weatherList)
  );
  const [hourForecast, setHourForecast] = useState(dailyForecast[0]);
  //location
  // day
  // radio buttons c or f
  // temp
  // min / max temp
  // wind speed

  const navigate = useNavigate();

  const temp = Math.round(hourForecast.main.temp);
  const maxTemp = Math.round(hourForecast.main.temp_max);
  const minTemp = Math.round(hourForecast.main.temp_min);
  const iconId = hourForecast.weather[0].id;
  const dayOrNight = hourForecast.sys.pod;
  const description = hourForecast.weather[0].description;

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
      <div className='headerContainer'>
        <div className='wrapper'>
          <LocationOnRoundedIcon />
          <h3>{city}</h3>
        </div>

        <h3>Today {dateText}</h3>
      </div>

      <div className='radioButtons'>
        <div className='radio'>
          <label>
            <input
              type='radio'
              value='C'
              // checked={this.state.selectedOption === "C"}
              // onChange={this.onValueChange}
            />
            °C
          </label>
        </div>
        <div className='radio'>
          <label>
            <input
              type='radio'
              value='F'
              // checked={this.state.selectedOption === "F"}
              // onChange={this.onValueChange}
            />
            °F
          </label>
        </div>
      </div>
      <h2 className='degreeHeader'>{temp}°C</h2>
      <p>
        {maxTemp}°C/{minTemp}°C
      </p>
      <div className='wrapper'>
        <i className={`owf owf-${iconId}-${dayOrNight} owf-lg`} />
        <p>{description}</p>
      </div>
      <div className='container'>
        {dailyForecast.map((hour, index) => (
          <div
            className='hourCard'
            key={index}
            onClick={() => setHourForecast(hour)}
          >
            <h3>
              {new Date(hour.dt * 1000).toLocaleTimeString(
                'en-US',
                optionsHour
              )}
            </h3>
            <h3>
              {Math.round(hour.main.temp_max)}°C/
              {Math.round(hour.main.temp_max)}°C
            </h3>
            <div className='wrapper'>
              <i
                className={`owf owf-${hour.weather[0].id}-${hour.sys.pod} owf-lg`}
              />
              <p>{hour.weather[0].main}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default DayForecast;
