var boxCity = document.getElementById('atlanta-city');
var submitBtn = document.getElementById('city-submit');
var inputEl = document.getElementById('search-box');
var formDiv = document.getElementById('search-container');
var iconDiv = document.getElementById('atlanta-icon');
var tempDiv = document.getElementById('atlanta-temp');

formDiv.addEventListener("keydown", function(event) {
    if (event === 13) {
      event.preventDefault();
      submitBtn.click();
    }
  });
  

submitBtn.addEventListener('click', getInput)

function getInput() {
    
  
};

$(function() {
    fetch('https://api.weatherapi.com/v1/current.json?key=00f3114bb00e49d097101833231101&q=' + 'atlanta' + '&aqi=no')
    .then(response => response.json())
    .then(data => {
        var city = data.location.name; //City Name
        var state = data.location.region; //State Name
        var temp = data.current.temp_f;
        var wholeTemp = Math.floor(temp);
        var icon = data.current.condition.icon;
        var currentIcon = icon.replace('//', 'https://'); //Needed to call image locally
        iconDiv.setAttribute('src', currentIcon);
        boxCity.textContent = city + ", " + state;
        tempDiv.textContent = wholeTemp + '  F°'; 
    });
});

