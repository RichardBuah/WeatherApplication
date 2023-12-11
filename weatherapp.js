/* Intoducing Constant Variables */

const weatherIcon = document.querySelector(".weather-icon p")
const temperatureElement = document.querySelector(".temperature-el p")
const locationElement = document.querySelector(".location-el p")
/* const countryElement = document.querySelector(".country-el p") */
const tempDiscription = document.querySelector(".temp-discription")
const notificationElement = document.querySelector(".notification")
const mainContainer = document.querySelector(".main-container")

const kelvinToCelcius = 273;

const apiKey = "82005d27a116c2880c8f0fcb866998a0"

/* Weather Application Data */
const weather = {};

weather.temperature = {
    unit: "celsius"
}

/* Browser Location */
if ("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, ShowError)
} else {
    notificationElement.style.display = "block"
    notificationElement.innerHTML = "<p>Browser does not support geolocation</p>"
}

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude)
}

function ShowError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    console.log(api)

    fetch(api) 
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            weather.temperature.value = Math.floor(data.main.temp - kelvinToCelcius);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        })
}

function displayWeather() {
    weatherIcon.innerHTML = `<p><img src="images/${weather.iconId}.png" width="400" height="350"></p>`;
    temperatureElement.innerHTML = `${weather.temperature.value}°<span> C</span>`
    tempDiscription.innerHTML = weather.description
    locationElement.innerHTML = `${weather.city}, ${weather.country}`
}

function celsiusToDegreeFahenheit(temperature) {
    return (temperature * 9/5)+32;
}

temperatureElement.addEventListener("clicks", function() {
    if (weather.temperature.value === "undefined") return;

    if (weather.temperature.unit === "celcius") {
        let fahrenheit = celsiusToDegreeFahenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        temperatureElement.innerHTML = `${fahrenheit}°<span> F</span>`;
        weather.temperature.unit = "fahrenheit"
    } else {
        temperatureElement.innerHTML = `${weather.temperature.value}°<span> C</span>`
        weather.temperature.unit = "celcius"
    }
})