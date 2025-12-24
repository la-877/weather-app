
const loc = document.getElementById('location');
const subButtn = document.getElementById('submit');
const todaysTemp = document.getElementById('current-temperature');
const hrsContainer = document.querySelector('.hours-container');

function fetchApi(location) {
    const date = new Date();
    const currentDate = date.toISOString().slice(0, 10);
    const myKey = '9NG57RXYMHCK8BH8HTVRY8P2L'
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${currentDate}?key=${myKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);

            }
            return response.json();
        })

        .then(data => {
            todaysTemp.textContent = data.days[0].temp;
            console.log(data.days[0]);
            const hour = data.days[0].hours[22].datetime.slice(0, 2);
            const condition = data.days[0].hours[22].icon;
            const hrTemp = data.days[0].hours[22].temp;
            
            renderHourInfo(hour, condition, hrTemp);


        })

        .catch(error => {
            console.error('Error:', error);
        });
};

subButtn.addEventListener('click', () => {
    const inputLoc = loc.value;
    if (inputLoc) {
        console.log();
        fetchApi(inputLoc);
    }
    
});

function renderHourInfo(hrTime, cndition, hrTemp){
    const hrContainer = document.createElement('div');
    hrContainer.className = 'hr-container';

    const hour = document.createElement('hour');
    hour.className = 'hour';
    if (hrTime.startsWith('0')) {
        hrTime = hrTime.substring(1); 
    }
    if (parseInt(hrTime.substring(0,2)) < 12){
        hour.textContent = hrTime + 'am';
    }
    else {
        hour.textContent = `${parseInt(hrTime) - 12}pm`
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


