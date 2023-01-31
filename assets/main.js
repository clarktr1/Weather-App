
const apiKey = '201ba239c0ab457fa60182434232301';
const atlantaUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}q=atlanta&aqi=no`;

//Dom Elements
const currenttempContainer = document.querySelector('.current-temp')
const currentweatherIcon = document.querySelector('#current-weather-logo');
const currentCity = document.querySelector('#current-location');
const currentPrecip = document.querySelector('.current-precip');
const currentHumidity = document.querySelector('.current-humidity');
const currentWind = document.querySelector('.current-wind');
const imageContainer = document.querySelectorAll("#weather-logo");
const tempNum = document.querySelectorAll('.temp')

//GetInput

const cityBtn = document.querySelector('.btn')

cityBtn.addEventListener('click', getWeather);

function getWeather () {
  event.preventDefault()
  const cityInput = document.querySelector('.form-control');
  const cityValue = cityInput.value;
  const apiUrl= 'https://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=' + cityValue + '&aqi=no&days=5';
  console.log(cityValue);
  console.log(apiUrl);
  cityInput.value= '';
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    let currentdayInfo = data.current;
    let currentlocationInfo = data.location;
    let dayInfo = data.forecast.forecastday;
    //Current New Info
    currenttempContainer.innerHTML = Math.floor(currentdayInfo.temp_f, 10) + 'F°';
    currentCity.innerHTML = `- ${currentlocationInfo.name}, ${currentlocationInfo.region}`
    currentPrecip.innerHTML = `Precipitation: ${currentdayInfo.precip_in}in`
    currentHumidity.innerHTML = `Humidity: ${currentdayInfo.humidity}%`
    currentWind.innerHTML = `Wind Speed: ${Math.floor(currentdayInfo.wind_mph)}mph`

    //5-Day New Info
    //Image

    for (let i = 0; i < imageContainer.length; i++) {
      let weatherIcon = dayInfo[i].day.condition.icon.replace("//", "https://");
      imageContainer[i].setAttribute('src', weatherIcon);
    };

    //Temp

    for (let i = 0; i < tempNum.length; i++) {
      tempContainer = tempNum[i];
      tempContainer.innerHTML = Math.floor(dayInfo[i].day.maxtemp_f) + 'F°';
    };
         //Details
         const precipContainer = document.querySelectorAll('.weather-precip');
         const humidityContainer = document.querySelectorAll('.weather-humidity');
         const windContainer = document.querySelectorAll('.weather-wind')
   
         for (let i = 0; i < precipContainer.length; i++){
           precipNum = precipContainer[i]
           precipNum.innerHTML = `Precipitation: ${ dayInfo[i].day.totalprecip_in} in`
         };

         for (let i = 0; i < humidityContainer.length; i++){
          humidityContainer[i].innerHTML = `Humidity: ${ dayInfo[i].day.avghumidity}%`
         };

         for (let i = 0; i < windContainer.length; i++){
          windContainer[i].innerHTML = `Wind Speed: ${ Math.floor(dayInfo[i].day.maxwind_mph)}mph`
         }
    });

    //Search History
    const searchHistory = document.querySelector('.search');

    const words = cityValue.split(' ')
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1).toLowerCase(  );
    }

    const cityName = words.join(' ');


    searchHistory.innerHTML += `<li><button class="btn btn-primary search-btn">${cityName}</button></li>`;
    const searchBtn = document.querySelectorAll('.search-btn');
    for (let i = 0; i < searchBtn.length; i++){
      searchBtn[i].addEventListener('click', () => {
      cityInput.value = searchBtn[i].textContent;
      getWeather()

      })
    }
};


$(function() {
  fetch('https://api.weatherapi.com/v1/forecast.json?key=201ba239c0ab457fa60182434232301&q=' + 'atlanta' + '&aqi=no&days=5')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let currentdayInfo = data.current;
    let currentlocationInfo = data.location;
    let dayInfo = data.forecast.forecastday;

    //Current Container
    currentweatherIcon.setAttribute('src', currentdayInfo.condition.icon.replace('//', "https://")); 
    currenttempContainer.innerHTML = Math.floor(currentdayInfo.temp_f, 10) + 'F°';
    currentCity.innerHTML = `- ${currentlocationInfo.name}, ${currentlocationInfo.region}`
    currentPrecip.innerHTML = `Precipitation: ${currentdayInfo.precip_in}in`
    currentHumidity.innerHTML = `Humidity: ${currentdayInfo.humidity}%`
    currentWind.innerHTML = `Wind Speed: ${Math.floor(currentdayInfo.wind_mph)}mph`

    console.log(currentWind)



    //Image

    for (let i = 0; i < imageContainer.length; i++) {
      let weatherIcon = dayInfo[i].day.condition.icon.replace("//", "https://");
      imageContainer[i].setAttribute('src', weatherIcon);
    };

    //Temp

    for (let i = 0; i < tempNum.length; i++) {
      tempContainer = tempNum[i];
      tempContainer.innerHTML = Math.floor(dayInfo[i].day.maxtemp_f) + 'F°';
    };
         //Details
         const precipContainer = document.querySelectorAll('.weather-precip');
         const humidityContainer = document.querySelectorAll('.weather-humidity');
         const windContainer = document.querySelectorAll('.weather-wind')
   
         for (let i = 0; i < precipContainer.length; i++){
           precipNum = precipContainer[i]
           precipNum.innerHTML = `Precipitation: ${ dayInfo[i].day.totalprecip_in} in`
         };

         for (let i = 0; i < humidityContainer.length; i++){
          humidityContainer[i].innerHTML = `Humidity: ${ dayInfo[i].day.avghumidity}%`
         };

         for (let i = 0; i < windContainer.length; i++){
          windContainer[i].innerHTML = `Wind Speed: ${ Math.floor(dayInfo[i].day.maxwind_mph)}mph`
         }
  });

  //Outside of Fetch
      //Day
      const dateContainer = document.querySelectorAll('#date')
     for (let i = 0; i < dateContainer.length; i++){
      dateContainer[0].innerHTML = dayjs().format('dddd' + '<br>' + 'MMM D');
      dateContainer[1].innerHTML = dayjs().add(1, 'day').format('dddd' + '<br>' + 'MMM D');
      dateContainer[2].innerHTML = dayjs().add(2, 'day').format('dddd' + '<br>' + 'MMM D');
      dateContainer[3].innerHTML = dayjs().add(3, 'day').format('dddd' + '<br>' + 'MMM D');
      dateContainer[4].innerHTML= dayjs().add(4, 'day').format('dddd' + '<br>' + 'MMM D');
    };

      const currentdateContainer = document.querySelector('#current-date')
      currentdateContainer.innerHTML = dayjs().format('dddd, MMMM D');


});
