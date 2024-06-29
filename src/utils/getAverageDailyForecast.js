const getAverageDailyForecast = (list) => {
  const dailyTemps = {};

  list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toISOString().split('T')[0];

    if (!dailyTemps[day]) {
      dailyTemps[day] = {
        temps: [],
        minTemp: item.main.temp,
        maxTemp: item.main.temp,
        descriptions: [],
        ids: [],
      };
    }

    dailyTemps[day].temps.push(item.main.temp);
    dailyTemps[day].descriptions.push(item.weather[0].main);
    dailyTemps[day].ids.push(item.weather[0].id);

    dailyTemps[day].minTemp = Math.min(
      dailyTemps[day].minTemp,
      item.main.temp_min
    );

    dailyTemps[day].maxTemp = Math.max(
      dailyTemps[day].maxTemp,
      item.main.temp_max
    );
  });

  const today = new Date().toISOString().split('T')[0];
  const formattedData = [];

  const getMostFrequent = (arr) => {
    const counts = {};
    arr.forEach((item) => (counts[item] = (counts[item] || 0) + 1));
    return Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );
  };

  Object.keys(dailyTemps).forEach((day) => {
    if (day !== today) {
      const temps = dailyTemps[day].temps;
      const averageTemp =
        temps.reduce((acc, temp) => acc + temp, 0) / temps.length;

      const minTemp = dailyTemps[day].minTemp;
      const maxTemp = dailyTemps[day].maxTemp;

      const description = getMostFrequent(dailyTemps[day].descriptions);
      const iconId = getMostFrequent(dailyTemps[day].ids);

      const options = {
        month: 'long',
        day: 'numeric',
      };

      const dateText = new Date(day).toLocaleDateString('en-US', options);

      const dayOfWeek = new Date(day).toLocaleString('en-US', {
        weekday: 'long',
      });

      formattedData.push({
        date: day,
        dateText: dateText,
        dayOfWeek: dayOfWeek,
        temp: Math.round(averageTemp),
        minTemp: Math.round(minTemp),
        maxTemp: Math.round(maxTemp),
        description,
        iconId,
      });
    }
  });

  return formattedData;
};

export default getAverageDailyForecast;
