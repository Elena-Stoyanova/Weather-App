import './Forecast.scss';
import DayForecast from '../../components/day-forecast/DayForecast';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../App';

const Forecast = () => {
  const navigate = useNavigate();
  const { date, dayOfWeek } = useContext(AppContext);
  return (
    <div>
      <DayForecast date={date} dayOfWeek={dayOfWeek} />
      <button className='backBtn' onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default Forecast;
