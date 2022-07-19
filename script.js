// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={apiKey}
// api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

//  API key 
var apiKey = 'b4bb042da0b34136546b6b70dc3bebe5'
var lat;
var lon;
var temp;
// Used to convert Kelvin to Fahrenheit
var kelvin = 273.15;

// Link the search button
var searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', getLatLon);

function reusedBtn(userSearch){

    var geoCodeApi = `https://api.openweathermap.org/geo/1.0/direct?q=${userSearch}&limit=5&appid=${apiKey}`

    fetch(geoCodeApi)
        .then(function(response){
            return response.json();
        }).then(function(data){
            // console.log(data);
            lat = data[0].lat
            lon = data[0].lon
            currentWeather(data[0].name);
        })

};

function getLatLon() {
    // Create variables for information from user input
    var userSearch = document.getElementById('searchedCity').value;
    // Need coordinates for the searched results
    var geoCodeApi = `https://api.openweathermap.org/geo/1.0/direct?q=${userSearch}&limit=5&appid=${apiKey}`

    fetch(geoCodeApi)
        .then(function(response) {
            return response.json();
        }).then(function (data) {
            // console.log(data);
            lat = data[0].lat
            lon = data[0].lon
            // console.log("lat", data[0].lat);
            // console.log("lon", data[0].lon);
            // currentForecast();
            currentWeather(data[0].name);
        })

        localStorage.setItem(userSearch, geoCodeApi);

        var recentBtn = document.createElement("button");
        
        recentBtn.textContent = userSearch;
        recentBtn.setAttribute("class", "waves-effect waves-light grey btn recentBtn");
        recentBtn.addEventListener("click", function(){
            reusedBtn(userSearch)
        });
        document.getElementById("searchPanel").appendChild(recentBtn);
};

// function for the current weather
function currentWeather(cityName) {
    // Need an api for the current weather
    var currentWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`

    fetch(currentWeather)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            // console.log(data);
            // Need wind speed
            // console.log(data.daily[0].temp.day);
            // Need humidity
            // console.log(data.current.humidity);
            // Need the current temp
            // console.log(data.current.temp);    
            renderCurrentWeather(data, cityName)
            dayOne(data);
            dayTwo(data);
            dayThree(data);
            dayFour(data);
            dayFive(data);
        })


};


function renderCurrentWeather(data, cityName) {
    // clear all fields
    $(".cityData .temp").empty();
    $(".cityData .uvi").empty();
    $(".cityData .wind").empty();
    $(".cityData .humi").empty();
    // title - cityName, date, icon
    var iconURL = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`
    //document.createElement("img")
    var iconEl = $("<img>").attr("src", iconURL)
    var dateString = moment.unix(data.current.dt).format("MM/DD/YYYY");
    $("#dataTitle").text(`${cityName} (${dateString})`)
    $("#dataTitle").append(iconEl)
    // extract data from response
    var windSpeed = data.daily[0].wind_speed;
    var temp = data.current.temp;
    var humi = data.current.humidity;
    // inject it to html
    $(".cityData .wind").append(`Wind: ${windSpeed}`);
    $(".cityData .humi").append(`Humidity: ${humi}`);
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

    if(temp > 200){
        var fahrenheitWD = (temp - kelvin) * 1.8 + 32;
        // console.log(Math.floor(fahrenheit));
        var fahrenheitWOD = Math.floor(fahrenheitWD);
        // console.log(fahrenheit);
        $(".cityData .temp").append(`Temp: ${fahrenheitWOD}`);
    }
    
};

function dayOne(data) {

    $(".firstDay .tempOne").empty();
    $(".firstDay .windOne").empty();
    $(".firstDay .humiOne").empty();

    var iconURL = `http://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}.png`
    var iconOne = $("<img>").attr("src", iconURL);
    var dateOne = moment.unix(data.daily[1].dt).format("MM/DD/YYYY");

    $("#currentDayOne").text(`${dateOne}`)
    $("#currentDayOne").append(iconOne)

    var windSpeed = data.daily[1].wind_speed;
    var temp = data.daily[1].temp.day;
    var humi = data.daily[1].humidity;
    // inject it to html
    $(".firstDay .windOne").append(`Wind Speed: ${windSpeed}`);
    $(".firstDay .humiOne").append(`Humidity: ${humi}`);

    if(temp > 200){
        var fahrenheitWD = (temp - kelvin) * 1.8 + 32;
        // console.log(Math.floor(fahrenheit));
        var fahrenheitWOD = Math.floor(fahrenheitWD);
        // console.log(fahrenheit);
        $(".firstDay .tempOne").append(`Temp: ${fahrenheitWOD}`);
    }

};

function dayTwo(data) {

    $(".secondDay .tempTwo").empty();
    $(".secondDay .windTwo").empty();
    $(".secondDay .humiTwo").empty();

    var iconURL = `http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}.png`
    var iconOne = $("<img>").attr("src", iconURL);
    var dateTwo = moment.unix(data.daily[2].dt).format("MM/DD/YYYY");

    $("#currentDayTwo").text(`${dateTwo}`)
    $("#currentDayTwo").append(iconOne)

    var windSpeed = data.daily[2].wind_speed;
    var temp = data.daily[2].temp.day;
    var humi = data.daily[2].humidity;
    // inject it to html
    $(".secondDay .windTwo").append(`Wind Speed: ${windSpeed}`);
    $(".secondDay .humiTwo").append(`Humidity: ${humi}`);

    if(temp > 200){
        var fahrenheitWD = (temp - kelvin) * 1.8 + 32;
        // console.log(Math.floor(fahrenheit));
        var fahrenheitWOD = Math.floor(fahrenheitWD);
        // console.log(fahrenheit);
        $(".secondDay .tempTwo").append(`Temp: ${fahrenheitWOD}`);
    }

};

function dayThree(data) {

    $(".thirdDay .tempThree").empty();
    $(".thirdDay .windThree").empty();
    $(".thirdDay .humiThree").empty();

    var iconURL = `http://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}.png`
    var iconOne = $("<img>").attr("src", iconURL);
    var dateTwo = moment.unix(data.daily[3].dt).format("MM/DD/YYYY");

    $("#currentDayThree").text(`${dateTwo}`)
    $("#currentDayThree").append(iconOne)

    var windSpeed = data.daily[3].wind_speed;
    var temp = data.daily[3].temp.day;
    var humi = data.daily[3].humidity;
    // inject it to html
    $(".thirdDay .windThree").append(`Wind Speed: ${windSpeed}`);
    $(".thirdDay .humiThree").append(`Humidity: ${humi}`);

    if(temp > 200){
        var fahrenheitWD = (temp - kelvin) * 1.8 + 32;
        // console.log(Math.floor(fahrenheit));
        var fahrenheitWOD = Math.floor(fahrenheitWD);
        // console.log(fahrenheit);
        $(".thirdDay .tempThree").append(`Temp: ${fahrenheitWOD}`);
    }

};

function dayFour(data) {

    $(".fourthDay .tempFour").empty();
    $(".fourthDay .windFour").empty();
    $(".fourthDay .humiFour").empty();

    var iconURL = `http://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}.png`
    var iconOne = $("<img>").attr("src", iconURL);
    var dateTwo = moment.unix(data.daily[4].dt).format("MM/DD/YYYY");

    $("#currentDayFour").text(`${dateTwo}`)
    $("#currentDayFour").append(iconOne)

    var windSpeed = data.daily[4].wind_speed;
    var temp = data.daily[4].temp.day;
    var humi = data.daily[4].humidity;
    // inject it to html
    $(".fourthDay .windFour").append(`Wind Speed: ${windSpeed}`);
    $(".fourthDay .humiFour").append(`Humidity: ${humi}`);

    if(temp > 200){
        var fahrenheitWD = (temp - kelvin) * 1.8 + 32;
        // console.log(Math.floor(fahrenheit));
        var fahrenheitWOD = Math.floor(fahrenheitWD);
        // console.log(fahrenheit);
        $(".fourthDay .tempFour").append(`Temp: ${fahrenheitWOD}`);
    }
};

function dayFive(data) {
    // Used so the text does not reappend when search is clicked
    $(".fifthDay .tempFive").empty();
    $(".fifthDay .windFive").empty();
    $(".fifthDay .humiFive").empty();

    var iconURL = `http://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}.png`
    var iconOne = $("<img>").attr("src", iconURL);
    var dateTwo = moment.unix(data.daily[5].dt).format("MM/DD/YYYY");

    $("#currentDayFive").text(`${dateTwo}`)
    $("#currentDayFive").append(iconOne)

    var windSpeed = data.daily[5].wind_speed;
    var temp = data.daily[5].temp.day;
    var humi = data.daily[5].humidity;
    // inject it to html
    $(".fifthDay .windFive").append(`Wind Speed: ${windSpeed}`);
    $(".fifthDay .humiFive").append(`Humidity: ${humi}`);

    if(temp > 200){
        var fahrenheitWD = (temp - kelvin) * 1.8 + 32;
        // console.log(Math.floor(fahrenheit));
        var fahrenheitWOD = Math.floor(fahrenheitWD);
        // console.log(fahrenheit);
        $(".fifthDay .tempFive").append(`Temp: ${fahrenheitWOD}`);
    }
};