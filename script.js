const apiKey = '5RRVPUFJWF56QQZA3HM4WPXTQ';
let weatherCard = document.querySelector('#weather-card');
let searchInput = document.querySelector('#search-input');
let searchButton = document.querySelector('#search-button');

async function fetchWeather(location) {
    let locationEncoded = encodeURI(location);
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationEncoded}?key=${apiKey}`;
    let response = await fetch(url);
    let data = await response.json();
    return await data;
}

class WeatherData {
    constuctor(location, tempMax, tempMin, tempNow,  feelsLike) {
        this.location = location;
        this.tempMax = tempMax;
        this.tempMin = tempMin;
        this.tempNow = tempNow;
        this.feelsLike = feelsLike;
    }
}

function processWeatherData(data) {
    let newData = new WeatherData( data.address, 
                               data.days[0].tempmax,
                               data.days[0].tempmin,
                               data.days[0].temp,
                               data.days[0].feelsLike );
    return newData;

}

function displayWeather( data ) {
    weatherCard.innerHTML = ``;

    let location = document.createElement("h3");
    location.textContent = `Results for: ${data.address}`;
    let temp = document.createElement("h2");
    temp.textContent = `Temp now: ${data.days[0].temp}`;
    weatherCard.appendChild(location);
    weatherCard.appendChild(temp);

} 


searchButton.addEventListener('click',async () => {
    weatherCard.innerHTML = ``;
    weatherCard.textContent = 'Loading...';
    let data = await fetchWeather(searchInput.value);
    displayWeather(data);

})