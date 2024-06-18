import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import DayForecast from './pages/day-forecast/DayForecast';

function App() {
  return (
    <BrowserRouter>
      <header>
        <h2>Weather App</h2>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/day-forecast' element={<DayForecast />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
