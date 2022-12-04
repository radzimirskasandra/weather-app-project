//Feature 1
function displayCurrentDate(date) {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = "0" + hour;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }
  let currentDate = `${day} ${hour}:${minute}`;
  return currentDate;
}
let h4 = document.querySelector("#date-time");
h4.innerHTML = displayCurrentDate(new Date());

//Search Engine
function getWeather(response) {
  console.log(response.data);
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = temperature;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let currentWindSpeed = document.querySelector("#wind");
  currentWindSpeed.innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  let currentWeatherDescription = document.querySelector(
    "#weather-description"
  );
  currentWeatherDescription.innerHTML = response.data.weather[0].main;

  let currentIcon = document.querySelector("#weather-icon");
  let currentWeatherIcon = response.data.weather[0].icon;
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${currentWeatherIcon}@2x.png`
  );
}

//Current city on load
function loadCity(searchInput) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=38146ecc463f344c9fc5c923d091b549&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input").value;
  loadCity(searchInput);
  let h4 = document.querySelector("#date-time");
  h4.innerHTML = displayCurrentDate(new Date());
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

//Current Location button

function currentLocationCity(response) {
  console.log(response);
  let city = response.data[0].name;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ca5af28648d86b7925348bb9fb85cd3a&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

function getLongLat(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&appid=ca5af28648d86b7925348bb9fb85cd3a&units=metric`;
  axios.get(apiUrl).then(currentLocationCity);
}

function clickCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLongLat);
  let h4 = document.querySelector("#date-time");
  h4.innerHTML = displayCurrentDate(new Date());
}

let button = document.querySelector("#button");
button.addEventListener("click", clickCurrentLocation);

//Unit conversion
function convertFahrenheit(event) {
  event.preventDefault();
  let temperatureFahrenheit = (celsiusTemperature * 9) / 5 + 32;
  let temperature = document.querySelector("#current-temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperature.innerHTML = Math.round(temperatureFahrenheit);
}

function convertCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertCelsius);

loadCity("Warsaw");
