export default async function handler(req, res) {
    const { location } = req.query;
    const myKey = process.env.WEATHER_API_KEY;
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/yesterday/tomorrow/?key=${myKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
}