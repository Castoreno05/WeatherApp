// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={apiKey}
// api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// var testGeo = `https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${apiKey}`
// Forecast for the next 16 days
var forescast = `api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}`
// Need an api for the current weather API KEY 1b58babad9d1e2a3475a0cb127e62e77
// var currentWeather = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${apiKey}`


// Link the search button
var searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', getApi);

let lat;
let lon;

//  API key 
var apiKey = '40560cd406f9b5804909ab5d09157282'

function getApi() {

    // Create variables for information from user input
    var userSearch = document.querySelector('#searchedCity').value;

    // Need coordinates for the searched results
    var geoCodeApi = `https://api.openweathermap.org/geo/1.0/direct?q=${userSearch}&limit=5&appid=${apiKey}`

    fetch(geoCodeApi)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            let lat = data[0].lat
            let lon = data[0].lon
            // console.log(lat);
            // console.log(lon);
        })

}