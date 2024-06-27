import './Card.scss';
import { Link } from 'react-router-dom';
// import { AppContext } from '../../App';
// import FavoriteButton from '../FavoriteButton';
import { useContext } from 'react';
import { Cloud } from '@mui/icons-material';

const Card = ({ day }) => {
  // const playSound = useContext(AppContext);
  // cloud thermostat thunderstorm wb_sunny
  // <img
  //   src={`https://openweathermap.org/img/wn/${ele.weather[0].icon}.png`}
  //   alt='icon'
  // />;

  return (
    <div className='card' style={{ backgroundImage: "url('/sunny.png')" }}>
      {/* <Link to={`/cocktails/${item.idDrink}`} onClick={playSound}> */}
      <Link>
        <div className='leftText'>
          <h3>{day.dt_txt}</h3>
          {/* <br /> */}
          <h2 className='degreeHeader'>{day.main.temp}</h2>
          <p>
            {day.main.temp_max}°C/{day.main.temp_min}°C
          </p>
        </div>

        <div className='rightText'>
          <div className='wrapper'>
            <i
              className={`owf owf-${day.weather[0].id}-${day.sys.pod} owf-2x`}
            ></i>
            <p>{day.weather[0].description}</p>
          </div>
          <br />
          <h2>15:00</h2>
          <p>last update</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
