document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");
  const API_KEY = "e9d0fe2235e8f1c8a880b7b9cdff24e7";

  getWeatherBtn.addEventListener("click", async() => {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
        const weatherData =await fetchWeatherData(city);
        displayWeatherData(weatherData);
    } catch (error) {
        showError();
    }



  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

    const response = await fetch(url);
    console.log(typeof response);
    console.log("RESPONSE:",response);

    if(!response.ok) {
        throw new Error("City not found");
    }

    const data = response.json();
    return data;
  }


  function displayWeatherData(data) {
    console.log(data);
    const {name, main, weather} = data;
    cityName.textContent = name;
    temperature.textContent = `Temperature: ${main.temp}°C`;
    description.textContent = `Weather Condition: ${weather[0].main}`;

    //display city name:
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }


  function showError() {
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }
});
