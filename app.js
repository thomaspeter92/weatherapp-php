const API_KEY = "058814dadf30b7b92760a5cd779a9817";

// DOM ELEMENTS
const weatherForm = document.querySelector('#weather-form');
const weatherContainer = document.querySelector('#weather-container');
const loadingSpinner = document.querySelector('#loading-spinner');
const errorAlert = document.querySelector('#error-alert');
const weatherMain = document.querySelector('#weather-main');
const cityName = document.querySelector('#city-name h3')
const cityTemp = document.querySelector('#city-temp')
const cityDesc = document.querySelector('#city-desc')
const cityTime = document.querySelector('#city-time')
const imageContainer = document.querySelector('#image-container')
const historyContainer = document.querySelector('#history-container')


// FUNCTIONS
const handleError = (error) => {
  weatherMain.classList.add('d-none')
  errorAlert.innerHTML = `<p class="m-0">Error: ${error?.message ? error.message : 'please try again.'}</p>`;
  errorAlert.classList.remove('d-none');
}

const getWeather = async (city) => {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => {
      if(data.cod !== 200) {
        throw new Error(data?.message)
      }
      return data
    }) 
    .catch(error => {throw error})
}

const postWeather = async (weather) => {
  let params = new FormData();
  params.append('city_name', weather.name)
  params.append('temperature', weather.main.temp)
  params.append('description', weather.weather[0].main)
  params.append('time_searched', weather.dt)
  params.append('action', 'postWeather')
  params.append('icon', weather.weather[0].icon)
  return fetch('app.php', {
    method: 'POST',
    body: params
  })
    .then(res => res.json())
    .then(data => data)
    .catch(error => {throw error})
}

const getHistory = async (city) => {
  return fetch(`app.php?action=getHistory&city_name=${city}`)
  .then(res => res.json())
  .then(data => data) 
  .catch(error => {throw error})
}

const setBgImage = (weather, daytime) => {
  let imgUrl;
  switch(weather) {
    case 'Clouds': 
      imgUrl = daytime ? 'images/cloudy.jpg' : 'images/cloudyNight.jpg'
      break;
    case 'Rain':
    case 'Drizzle':
      imgUrl = daytime ? 'images/rain.jpg' : 'images/rainNight.jpg'
      break;
    case 'Snow': 
    imgUrl = daytime ? 'images/snow.jpg' : 'images/snowNight.jpg'
    break;
    case 'Clear': 
    imgUrl = daytime ? 'images/sun.jpg' : 'images/moon.jpg'
    break;
    case 'Thunderstorm':
      imgUrl =  'images/storm.jpg'
      break;
    case 'Haze':
    case 'Smoke':
      imgUrl = daytime ? 'images/haze.jpg' : 'images/smokeNight.jpg'
      break;
    case 'Fog':
    case 'Mist':
      imgUrl = daytime ? 'images/fog.jpg' : 'images/fogNight.jpg'
      break;
    default:
      imgUrl = 'images/gradient.jpg'
      break;
  }
  document.body.style.backgroundImage = `url(${imgUrl})`
}

const updateMainWeather = (weather) => {
  const daytime = weather.dt > weather.sys.sunrise && weather.dt < weather.sys.sunset;
  cityName.textContent = weather.name
  cityTemp.innerHTML = `${Math.round(weather.main.temp)}&#8451;`
  cityDesc.textContent = weather.weather[0].main
  imageContainer.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" >`
  cityTime.textContent = daytime ? 'It\'s day time' : 'It\'s night time'
  setBgImage(weather.weather[0].main, daytime)  
  weatherMain.classList.remove('d-none')
}

const updatePastWeather = (data) => {
  if(data.length <= 0)  {
    historyContainer.innerHTML = '<h6>No past weather data available.</h6>'
    return;
  }
  historyContainer.innerHTML = ""
  data.forEach(d => {
    let date = new Date(d.time_searched * 1000)
    let html = `
      <div class="text-center bg-secondary bg-opacity-25 p-2 rounded m-2">
        <p class="fs-6 fst-bold mb-0">${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</p>
        <p class="fs-6">${d.temperature}&#8451;</p>
        <img src="http://openweathermap.org/img/wn/${d.icon}.png">
        <p class="fs-6">${d.description}</p>
      </div>`;
    historyContainer.insertAdjacentHTML("beforeend", html)
  })
}

// EVENT LISTENERS
weatherForm.addEventListener('submit', async (e) => {
  errorAlert.classList.add('d-none')
  loadingSpinner.classList.toggle('d-none');
  e.preventDefault();
  let data = new FormData(weatherForm);
  try {
    let weather = await getWeather(data.get('city-name'));
    let history = await getHistory(weather.name)
    updateMainWeather(weather);
    updatePastWeather(history);
    postWeather(weather);
    loadingSpinner.classList.toggle('d-none');
  } catch (error) {
    loadingSpinner.classList.toggle('d-none');
    handleError(error)
    setBgImage()
  }
});