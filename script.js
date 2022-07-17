// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={apiKey}
// api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

//  API key 
var apiKey = '40560cd406f9b5804909ab5d09157282'
var lat;
var lon;
var temp;
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
            console.log(data);
            lat = data[0].lat
            lon = data[0].lon
            console.log("lat", data[0].lat);
            console.log("lon", data[0].lon);
            // currentForecast();
            currentWeather(data[0].name);
        })
};

// function for the forecast
// function currentForecast() {
//     // Need an api for a 5 day forecast
//     var forecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`

//     fetch(forecast)
//         .then(function (response) {
//             return response.json();
//         }).then(function (data) {
//             console.log(data.list[0].weather[0].description);
//             console.log(data.list[0].main.temp);
//             console.log(data);
//             currentWeather();
//         })  
// };

// function for the current weather
function currentWeather(cityName) {
    // Need an api for the current weather
    var currentWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`

    fetch(currentWeather)
        .then(function(response){
            return response.json();
        }).then(function(data){
            // console.log(data);
            console.log(data.current.temp);
            renderCurrentWeather(data, cityName)
            renderForecast(data)
        })

    
};


function renderCurrentWeather(data, cityName) {
    // clear all fields
    $(".cityData .temp").empty();
    $(".cityData .uvi").empty();
    // title - cityName, date, icon
    var iconURL = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`
    //document.createElement("img")
    var iconEl = $("<img>").attr("src", iconURL)
    var dateString = moment.unix(data.current.dt).format("MM/DD/YYYY");
    $("#dataTitle").text(`${cityName} (${dateString})`)
    $("#dataTitle").append(iconEl)
    // extract data from response
    var temp = data.current.temp;
    // inject it to html
    $(".cityData .temp").append(`Temp: ${temp}`);

    // uvi
    var uviEl = $("<span>").text(data.current.uvi);
    var color = "red";
    if (data.current.uvi < 2) {
        color = "green";
    }
    else if (data.current.uvi < 5) {
        color = "orange";
    } else {
        color = "red";
    }
    // add if condition
    uviEl.css("background-color", color);
    $(".cityData .uvi").text("UV Index: ").append(uviEl);

}

function renderForecast(data) {
    // for loop - 1 <= 5 on data.daily
}

// function appendage() {

//     var dataTitle = document.getElementById("dataTitle")

//     var currentTemp = temp;
// }
