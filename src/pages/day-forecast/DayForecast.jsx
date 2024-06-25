import './DayForecast.scss';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { Cloud } from '@mui/icons-material';

const DayForecast = () => {
  //location
  // day
  // radio buttons c or f
  // temp
  // min / max temp
  // wind speed

  return (
    <div className='dayForecast'>
      <div className='headerContainer'>
        <div className='wrapper'>
          <LocationOnRoundedIcon />
          <h3>Varna</h3>
        </div>

        <h3>Today 25.06</h3>
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
      <h2 className='degreeHeader'>27°C</h2>
      <p>24°C/29°C</p>
      <div className='wrapper'>
            <Cloud />
            <p>Cloudy</p>
          </div>
    </div>
  );
};

export default DayForecast;
