
const loc = document.getElementById('location');
const subButtn = document.getElementById('submit');
const todaysTemp = document.getElementById('current-temperature');

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
            console.log();
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



