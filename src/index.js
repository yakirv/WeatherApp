import "./styles.css";

async function getWeather(){
  const locationName = document.getElementById('location-name')
  const maxTemp = document.getElementById('max-temp')
const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/petah%20tikva?unitGroup=metric&include=days&key=YSPHRYATMWY52EBAHNK378HAV&contentType=json';
try
{
  const response = await fetch(url,{mode: 'cors'})
  const weatherData = await response.json()
  console.log(weatherData.resolvedAddress)
  locationName.innerText= weatherData.resolvedAddress
  maxTemp.innerText= weatherData.days[0].tempmax
  

  
}catch
{

}


}

getWeather()