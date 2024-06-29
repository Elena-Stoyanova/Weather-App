const getAllDayForecast = (day, list) => {
  const groupedData = list.filter((item) => {
    const date = new Date(item.dt * 1000).toISOString().split('T')[0];
    return date === day;
  });

  return groupedData;
};

export default getAllDayForecast;
