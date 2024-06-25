import './Card.scss';
import { Link } from 'react-router-dom';
// import { AppContext } from '../../App';
// import FavoriteButton from '../FavoriteButton';
import { useContext } from 'react';
import { Cloud } from '@mui/icons-material';

const Card = ({ item }) => {
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
          <h2>Tuesday</h2>
          {/* <br /> */}
          <h2 className='degreeHeader'>27°C</h2>
          <p>24°C/29°C</p>
        </div>

        <div className='rightText'>
          <div className='wrapper'>
            <Cloud />
            <p>Cloudy</p>
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
