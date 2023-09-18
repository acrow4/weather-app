function displayTime() {
  let dayOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let heading2 = document.querySelector("h2");
  let now = new Date();
  let day = dayOfWeek[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    heading2.innerHTML = `${day} ${hours}:0${minutes}`;
  } else {
    heading2.innerHTML = `${day} ${hours}:${minutes}`;
  }
}

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let newHeading = document.querySelector("#current-temp");
  newHeading.innerHTML = `${temp}° C`;
}

function getCity(response) {
  let location = response.data.name;
  showAutoCity(location);
  getTemp(location);
}

function getTemp(userCity) {
  let apiKey = "6c63967610076fffc576a864a7af27d0";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=metric&appid=${apiKey}`;
  axios.get(weatherUrl).then(showTemp);
}

function cleanCity(userCity) {
  let apiKey = "6c63967610076fffc576a864a7af27d0";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=metric&appid=${apiKey}`;
  axios.get(weatherUrl).then(getCity);
}

function showAutoCity(userCity) {
  let displayCity = document.querySelector(".city");
  displayCity.innerHTML = userCity;
  getTemp(userCity);
}

function showCity(event) {
  event.preventDefault();
  let userCity = document.querySelector("#city-input");
  cleanCity(userCity.value);
}

function handlePosition(response) {
  let apiKey = "6c63967610076fffc576a864a7af27d0";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${response.coords.latitude}&lon=${response.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(url).then(getCity);
}

function sendCoords() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

displayTime();

let element = document.querySelector("#location-button");
element.addEventListener("click", sendCoords);

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", showCity);
