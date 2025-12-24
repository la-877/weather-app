
const loc = 'london';

function fetchApi() {
    const myKey = '9NG57RXYMHCK8BH8HTVRY8P2L'
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}?key=${myKey}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
                
            }
            return response.json();
        })

        .then(data => {
            console.log(data);
        })

        .catch(error => {
            console.error('Error:', error);
        });
}

fetchApi();