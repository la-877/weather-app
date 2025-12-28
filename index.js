
const loc = document.getElementById('location');
const locForm = document.getElementById('loc-form');
const todaysTemp = document.getElementById('current-temperature');
const hrsContainer = document.querySelector('.hours-container');
const windSpeed = document.getElementById('windspeed');
const rain = document.getElementById('precepitation');
const usrLoc = document.getElementById('user-location');
const minTemp = document.getElementById('min-temp');
const maxTemp = document.getElementById('max-temp');

const iconsArr = [];


function fetchApi(location) {

    const myKey = '9NG57RXYMHCK8BH8HTVRY8P2L';
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/yesterday/tomorrow/?key=${myKey}`;


    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);

            }
            return response.json();
        })

        .then(data => {

            usrLoc.textContent = data.timezone;
            console.log(data.days);
            minTemp.textContent = data.days[0].tempmin;
            maxTemp.textContent = data.days[0].tempmax;

            const date = new Date();
            const localTime = date.toLocaleTimeString('en-US', {
                timeZone: data.timezone,
                hour: 'numeric',
                hour12: false,
            });

            const currentTime = localTime;


            windSpeed.textContent = data.days[0].windspeed;
            rain.textContent = data.days[0].precip;
            data.days[0].hours.forEach(hr => {

                renderHourInfo(hr.datetime.slice(0, 2), hr.icon, hr.temp, currentTime)


            });


        })

        .catch(error => {
            console.error('Error:', error);
        });
};
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


function iconFinder(conIcon){
    if(conIcon === 'clear-day'){
        return 'clear-day';
    }
    else if(conIcon === 'clear-night'){
        return 'clear-night';
    }
    else if(conIcon === 'cloudy'){
        return 'cloudy';
    }
    else if(conIcon === 'fog'){
        return 'fog';
    }
    else if(conIcon === 'partly-cloudy-day'){
        return 'partly-cloudy-day';
    }
    else if(conIcon === 'partly-cloudy-night'){
        return 'partly-cloudy-night';
    }
    else if(conIcon === 'rain'){
        return 'rain';
    }
    else if(conIcon === 'snow'){
        return 'snow';
    } 
    else if(conIcon === 'wind'){
        return 'wind';
    } 
}