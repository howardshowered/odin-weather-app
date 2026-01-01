const apiKey = '5RRVPUFJWF56QQZA3HM4WPXTQ';
let weatherCard = document.querySelector('#weather-card');
let searchInput = document.querySelector('#search-input');
let searchButton = document.querySelector('#search-button');

async function fetchWeather(location) {
    let locationEncoded = encodeURI(location);
    try 
    {
        let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationEncoded}?key=${apiKey}`;
        let response = await fetch(url);
        let data = await response.json();
        return await data;
    } catch (error) {
        console.error("Failed to fetch:", error.message);
    }

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
    let dayOfWeekHeading = document.createElement("h2");
    console.log(data.days[0]);
    const [year, month, day] = data.days[0].datetime.split("-");
    let date = new Date(year, month - 1, day);
    console.log(date);

    switch (date.getDay()) {
        case 0:
            dayOfWeekHeading.textContent = 'Sunday';
            break;
        case 1:
            dayOfWeekHeading.textContent = 'Monday';
            break;
        case 2:
            dayOfWeekHeading.textContent = "Tuesday";
            break;
        case 3:
            dayOfWeekHeading.textContent = "Wednesday";
            break;
        case 4:
            dayOfWeekHeading.textContent = "Thursday";
            break;
        case 5:
            dayOfWeekHeading.textContent = "Friday";
            break;
        case 6:
            dayOfWeekHeading.textContent = "Saturday";
            break;      
    }
    let temp = document.createElement("h2");


    temp.textContent = `Temp now: ${data.days[0].temp}`;
    weatherCard.appendChild(location);
    let icon = document.createElement('img');
    if(data.days[0].icon === 'rain') {
        icon.src = "./res/rain.svg";
       
    } else if (data.days[0].icon === 'snow') {
        icon.src = "./res/snow.svg";

    }
    weatherCard.appendChild(icon);
    weatherCard.appendChild(dayOfWeekHeading);
    weatherCard.appendChild(temp);

} 


searchButton.addEventListener('click',async () => {
    weatherCard.innerHTML = ``;
    weatherCard.textContent = 'Loading...';
    let data = await fetchWeather(searchInput.value);
    displayWeather(data);

})