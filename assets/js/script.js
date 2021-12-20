function main() {
////////////////////------------------ intialization
    const inputEl = document.querySelector('#city-input');
    const searchFormEl = document.querySelector('#search-form');
    const cityName = document.querySelector('#city-name');
    const currentTempEl = document.querySelector('#temperature');
    const currentHumidityEl = document.querySelector('#humidity');
    const currentWindEl = document.querySelector('#wind-speed');
////////----------------------dates

//user city input
///////////////---------------------------search form
function getQuery(event) {
    event.preventDefault();

    let city = inputEl.value.trim();
    console.log(city);

    getCityCoord(city);
};
////---------------------- Uses API to get current weather of paticular location
function getCityCoord(city) {
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + "d97708cd505c038d974b4cd2aa689d4a";

    fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
            console.log(data);

            getCityWeather(data, city)

        });
      } else {
            alert('Error: unable to process this request');
      }

    })
};

//----------------------------------empty previous data show current selection
// -------------------------------------------------------current weather
//empty previous data show current selection
function getCityWeather(data,city) {
    let apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&units=imperial&appid=" + "d97708cd505c038d974b4cd2aa689d4a";
  
    fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
            console.log(data);
            
               
            displayCurrentWeather(data, city);

            let weatherDisplay = document.getElementById("weather-display");
            weatherDisplay.classList.add("activeWeatherDisplay");
            displayForcast(data); 
        });
      } else {
            alert('Error: Current weather for City not found');
      }
    })
  };

//city is added to the search history local storage
// -------------------------------------weather conditions, the temperature, the wind speed, and the humidity,uv index
function displayCurrentWeather(data, city) {
    let date = formatDate(data.current.dt);
    let icon = data.current.weather[0].icon;
    


    cityName.innerHTML = city + " (" + date + ") " + `<img src="https://openweathermap.org/img/wn/${icon}.png"></img>`;
    currentTempEl.textContent = "Temp:" + data.current.temp;
    currentWindEl.textContent = "Wind:" + data.current.wind_speed;
    currentHumidityEl.textContent = "Humidity:" + data.current.humidity;
 
};



// ---------------------------------format date to readable format
function formatDate(date) {
    const milliseconds = date * 1000 
    const dateObject = new Date(milliseconds)
    let options = { month: 'numeric', day: 'numeric', year: 'numeric' };
    const humanDateFormat = dateObject.toLocaleString("en-US", options)
  
    return humanDateFormat;
  }
  //--------------------------------------------future conditions for that city
  function displayForcast(data) {
    
    let forecastTitle = document.querySelector('#forecast')
    forecastTitle.innerHTML = `
      <div class="forecast">
        <span id="city-name">5 Day Forecast:</span>
      </div>
      `
    
    let forecastCard = document.querySelector('#five-day-forecast')
    forecastCard.innerHTML = "";
  
    for (var i = 1; i < 6; i++) {
      let date = formatDate(data.daily[i].dt);
      let icon = data.daily[i].weather[0].icon;
      let temp = data.daily[i].temp.day;
      let wind = data.daily[i].wind_speed;
      let humidity = data.daily[i].humidity;
    
      forecastCard.innerHTML += `
        <div class="forecast">
          <div class="title">
            <span class="text">${date}</span>
          </div>
          <div class="supporting-text">
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png"></img>
            <p>Temp: ${temp}</p>
            <p>Wind: ${wind}</p>
            <p>Humidity: ${humidity}</p>
          </div>
        </div>
        `
      }; 
  
  };
  searchFormEl.addEventListener("submit", getQuery);
  };
main();

//click on a city in the search history
