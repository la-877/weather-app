
const loc = document.getElementById('location');
const locForm = document.getElementById('loc-form');
const todaysTemp = document.getElementById('current-temperature');
const hrsContainer = document.querySelector('.hours-container');
const windSpeed = document.getElementById('windspeed');
const rain = document.getElementById('precepitation');
const usrLoc = document.getElementById('user-location');
const minTemp = document.getElementById('min-temp');
const maxTemp = document.getElementById('max-temp');
const yesterdayBtn = document.getElementById('yesterday');
const todayBtn = document.getElementById('today');
const tomorrowBtn = document.getElementById('tomorrow');


let weatherData = null;
/*
navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude.toFixed(4);
    const lon = position.coords.longitude.toFixed(4);
    const coords = `${lat},${lon}`;

    fetchApi(coords);
});*/

locForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputLoc = loc.value;
    if (inputLoc) {
        hrsContainer.innerHTML = '';
        fetchApi(inputLoc);
    }

});

function renderHourInfo(hrTime, cndition, hrTemp, currHour) {

    currHour = parseInt(currHour);
    if (parseInt(hrTime) === currHour) {
        todaysTemp.textContent = hrTemp;
    }


    const hrContainer = document.createElement('div');
    hrContainer.className = 'hr-container';

    const hour = document.createElement('p');
    hour.className = 'hour';
    if (currHour === hrTime) {
        hrContainer.id = 'current-time';

    }
    if (hrTime.startsWith('0')) {
        hrTime = hrTime.substring(1);

    }
    if (parseInt(hrTime) < 12) {
        if (parseInt(hrTime) === 0) {
            hrTime = '12';
        }
        hour.textContent = hrTime + 'am';

    }
    else {
        hrTime = parseInt(hrTime) - 12;
        if (hrTime === 0) {
            hrTime = 12;
        }
        hour.textContent = hrTime + 'pm';
    }


    const conditionIcon = document.createElement('img');
    conditionIcon.id = 'condition-icon';
    conditionIcon.alt = cndition;
    conditionIcon.src = `../images/${iconFinder(cndition)}.png`;

    const temp = document.createElement('p');
    temp.id = 'hour-deg';
    temp.textContent = hrTemp;


    hrContainer.appendChild(hour);
    hrContainer.appendChild(conditionIcon);
    hrContainer.appendChild(temp);
    hrsContainer.appendChild(hrContainer);

}


function iconFinder(conIcon) {
    if (conIcon === 'clear-day') {
        return 'clear-day';
    }
    else if (conIcon === 'clear-night') {
        return 'clear-night';
    }
    else if (conIcon === 'cloudy') {
        return 'cloudy';
    }
    else if (conIcon === 'fog') {
        return 'fog';
    }
    else if (conIcon === 'partly-cloudy-day') {
        return 'partly-cloudy-day';
    }
    else if (conIcon === 'partly-cloudy-night') {
        return 'partly-cloudy-night';
    }
    else if (conIcon === 'rain') {
        return 'rain';
    }
    else if (conIcon === 'snow') {
        return 'snow';
    }
    else if (conIcon === 'wind') {
        return 'wind';
    }
}


function fetchApi(location) {
    const myKey = '9NG57RXYMHCK8BH8HTVRY8P2L';
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/yesterday/tomorrow/?key=${myKey}`;


    fetch(apiUrl)

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            weatherData = data;
            updateUI(1);
        })

        .catch(error => {

            console.error('Error:', error);

        });
}

function updateUI(dayIndex) {
    if (!weatherData) return;

    const day = weatherData.days[dayIndex];
    const cityTimezone = weatherData.timezone;

    const currentTime = new Date().toLocaleTimeString('en-US', {
        timeZone: cityTimezone, hour: 'numeric', hour12: false
    });

    hrsContainer.innerHTML = '';
    windSpeed.textContent = day.windspeed;
    rain.textContent = day.precip;
    minTemp.textContent = day.tempmin;
    maxTemp.textContent = day.tempmax;

    day.hours.forEach(hr => {
        renderHourInfo(hr.datetime.slice(0, 2), hr.icon, hr.temp, currentTime);
    });
}

yesterdayBtn.addEventListener('click', () => updateUI(0));
todayBtn.addEventListener('click', () => updateUI(1));
tomorrowBtn.addEventListener('click', () => updateUI(2));