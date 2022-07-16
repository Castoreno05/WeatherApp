// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={apiKey}
// api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// var testGeo = `https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${apiKey}`
// Need an api for the current weather 
// var currentWeather = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`





//  API key 
var apiKey = '40560cd406f9b5804909ab5d09157282'
var lat;
var lon;
// Link the search button
var searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', getLatLon);

function getLatLon() {

    // Create variables for information from user input
    var userSearch = document.getElementById('searchedCity').value;
    // Need coordinates for the searched results
    var geoCodeApi = `https://api.openweathermap.org/geo/1.0/direct?q=${userSearch}&limit=5&appid=${apiKey}`

    fetch(geoCodeApi)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            // console.log(data);
            lat = data[0].lat
            lon = data[0].lon
            console.log("lat", data[0].lat);
            console.log("lon", data[0].lon);
        })

    var forecast = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${apiKey}`

    fetch(forecast)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
        })
};
