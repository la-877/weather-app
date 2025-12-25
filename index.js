
const loc = document.getElementById('location');
const subButtn = document.getElementById('submit');
const todaysTemp = document.getElementById('current-temperature');
const hrsContainer = document.querySelector('.hours-container');
const windSpeed = document.getElementById('windspeed');
const rain = document.getElementById('precepitation');
const usrLoc = document.getElementById('user-location');




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
            todaysTemp.textContent = data.days[0].temp;
            usrLoc.textContent = data.timezone;
            console.log(data.days);

            
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

navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude.toFixed(4);
    const lon = position.coords.longitude.toFixed(4);
    const coords = `${lat},${lon}`;

    fetchApi(coords);
});

subButtn.addEventListener('click', () => {
    const inputLoc = loc.value;
    if (inputLoc) {
        hrsContainer.innerHTML = '';
        fetchApi(inputLoc);
    }


});

function renderHourInfo(hrTime, cndition, hrTemp, currHour) {
    const hrContainer = document.createElement('div');
    hrContainer.className = 'hr-container';

    const hour = document.createElement('p');
    hour.className = 'hour';
    if (currHour === parseInt(hrTime)) {
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

    const condition = document.createElement('p');
    condition.className = 'condition-icon';
    condition.textContent = cndition;

    const temp = document.createElement('p');
    temp.id = 'hour-deg';
    temp.textContent = hrTemp;


    hrContainer.appendChild(hour);
    hrContainer.appendChild(condition);
    hrContainer.appendChild(temp);
    hrsContainer.appendChild(hrContainer);

}


