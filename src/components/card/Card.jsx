import './Card.scss';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../App';
import getLocalDate from '../../utils/getLocalDate';

const Card = ({ day }) => {
  const { date, setDate, metric, setDayOfWeek } = useContext(AppContext);
  const currentDate = getLocalDate(new Date());

  const onClick = () => {
    if (date.date !== currentDate) {
      setDayOfWeek(day.dayOfWeek);
    }
    setDate(day.date);
  };

  return (
    <div className='card'>
      <Link to={`/forecast/${day.dayOfWeek}`} onClick={() => onClick()}>
        <div className='leftText'>
          <h3>{day.dayOfWeek}</h3>
          <p>{day.dateText}</p>
          <h2 className='degreeHeader'>
            {day.temp}°{metric}
          </h2>
        </div>

        <div className='rightText'>
          <div className='wrapper'>
            <i className={`owf owf-${day.iconId} owf-lg`} />
            <h3>{day.description}</h3>
          </div>
          <br />
          <p>
            {day.maxTemp}°{metric} / {day.minTemp}°{metric}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
