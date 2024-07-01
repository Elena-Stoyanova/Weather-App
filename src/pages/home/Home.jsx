import { useContext } from 'react';
import './Home.scss';
import Card from '../../components/card/Card';
import DayForecast from '../../components/day-forecast/DayForecast';
import getAverageDailyForecast from '../../utils/getAverageDailyForecast';
import { AppContext } from '../../App';
import getLocalDate from '../../utils/getLocalDate';

const Home = () => {
  const { weather } = useContext(AppContext);
  const currentDate = getLocalDate(new Date());

  const averageDaysForecast = getAverageDailyForecast(weather.list);

  return (
    <div className='home'>
      <DayForecast date={currentDate} dayOfWeek={'Today'}/>
      <br></br>
      <div className='cardContainer'>
        {averageDaysForecast.map((day, index) => (
          <Card day={day} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
