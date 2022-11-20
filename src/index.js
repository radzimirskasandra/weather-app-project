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
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = `${temperature}℃`;
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=38146ecc463f344c9fc5c923d091b549&units=metric`;
  axios.get(apiUrl).then(getWeather);
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
}

let button = document.querySelector("#button");
button.addEventListener("click", clickCurrentLocation);
