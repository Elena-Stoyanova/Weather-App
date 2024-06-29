import './Card.scss';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../App';

const Card = ({ day }) => {
  const { setDate } = useContext(AppContext);

  return (
    <div className='card' style={{ backgroundImage: "url('/sunny.png')" }}>
      <Link to={`/forecast/${day.dayOfWeek}`} onClick={() => setDate(day.date)}>
        <div className='leftText'>
          <h3>{day.dayOfWeek}</h3>
          <p>{day.dateText}</p>
          <h2 className='degreeHeader'>{day.temp}°C</h2>
        </div>

        <div className='rightText'>
          <div className='wrapper'>
            <i className={`owf owf-${day.iconId} owf-lg`} />
            <h3>{day.description}</h3>
          </div>
          <br />
          <p>
            {day.maxTemp}°C/{day.minTemp}°C
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
