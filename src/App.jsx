import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import DayForecast from './pages/day-forecast/DayForecast';
import { createContext, useState } from 'react';

export const AppContext = createContext(null);

function App() {
  const [date, setDate] = useState('');
  return (
    <BrowserRouter>
      <AppContext.Provider value={{ date, setDate }}>
        <header>
          <h2>Weather App</h2>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/forecast/:date' element={<DayForecast />} />
          </Routes>
        </main>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
