async function fetchWeatherData(city) {
  const apiKey = 'YOUR_API_KEY';
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  const data = await response.json();
  return data;
}

document.getElementById('searchButton').addEventListener('click', async () => {
  const city = document.getElementById('cityInput').value;
  const data = await fetchWeatherData(city);
  displayWeather(data);
});

function displayWeather(data) {
  const weatherDisplay = document.getElementById('weatherDisplay');
  if (data.cod === 200) {
    weatherDisplay.innerHTML = `
      <h2>${data.name}</h2>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Condition: ${data.weather[0].description}</p>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
    `;
  } else {
    weatherDisplay.innerHTML = `<p>Error: ${data.message}</p>`;
  }
}
