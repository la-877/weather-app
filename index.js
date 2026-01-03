
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
const topContainer = document.querySelector('.top');


let weatherData = null;

navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude.toFixed(4);
    const lon = position.coords.longitude.toFixed(4);
    const coords = `${lat},${lon}`;

    fetchApi(coords);
});

locForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputLoc = loc.value || usrLoc.textContent;
    if (inputLoc) {
        hrsContainer.innerHTML = '';
        fetchApi(inputLoc);
        loc.value = '';
    }

});

function renderHourInfo(hrTime, cndition, hrTemp, currHour) {

    currHour = parseInt(currHour);
    if (parseInt(hrTime) === currHour) {
        todaysTemp.textContent = convertDeg(hrTemp);

    }


    const hrContainer = document.createElement('div');
    hrContainer.className = 'hr-container animate-in';



    const hour = document.createElement('p');
    hour.className = 'hour';
    if (currHour == hrTime) {
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
    temp.textContent = `${convertDeg(hrTemp)}°`;


    hrContainer.appendChild(hour);
    hrContainer.appendChild(conditionIcon);
    hrContainer.appendChild(temp);
    hrsContainer.appendChild(hrContainer);

}


function iconFinder(conIcon) {
    const validIcons = ['clear-day', 'clear-night', 'cloudy', 'fog', 'partly-cloudy-day', 'partly-cloudy-night', 'rain', 'snow', 'wind'];

    return validIcons.includes(conIcon) ? conIcon : 'cloudy';
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

    const buttons = [yesterdayBtn, todayBtn, tomorrowBtn];
    buttons.forEach(btn => btn.classList.remove('active-day'));
    buttons[dayIndex].classList.add('active-day');

    const day = weatherData.days[dayIndex];
    const cityTimezone = weatherData.timezone;
    usrLoc.textContent = cityTimezone;


    minTemp.textContent = `${convertDeg(day.tempmin)}°`;
    maxTemp.textContent = `${convertDeg(day.tempmax)}°`;



    const currentTime = new Date().toLocaleTimeString('en-US', {
        timeZone: cityTimezone, hour: 'numeric', hour12: false
    });

    hrsContainer.innerHTML = '';
    windSpeed.textContent = `${convertWind(day.windspeed)} km/h`;
    rain.textContent = `${convertPrecip(day.precip)} mm`;



    day.hours.forEach(hr => {
        renderHourInfo(hr.datetime.slice(0, 2), hr.icon, hr.temp, currentTime);
    });

    setTimeout(() => {
        const activeHour = document.getElementById('current-time');
        if (activeHour) {
            activeHour.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }, 100);

    updateBackground(currentTime);
}


yesterdayBtn.addEventListener('click', () => updateUI(0));
todayBtn.addEventListener('click', () => updateUI(1));
tomorrowBtn.addEventListener('click', () => updateUI(2));

function convertDeg(f) {
    return Math.round((parseFloat(f) - 32) * (5 / 9));

}
function convertWind(mph) {
    return Math.round(parseFloat(mph) * 1.60934);
}

function convertPrecip(inches) {
    const mm = parseFloat(inches) * 25.4;
    return mm.toFixed(1);
}

function updateBackground(currHour) {
    const body = document.body;
    const hour = parseInt(currHour);

    if (hour >= 6 && hour < 18) {
        body.style.backgroundImage = "url('../images/day.jpg')";
        topContainer.style.color = 'black';

    } else {
        body.style.backgroundImage = "url('../images/night.jpg')";
        topContainer.style.color = 'white';
    }
}