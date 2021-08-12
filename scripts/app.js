const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
  // const cityDets = data.cityDets;
  // const weather = data.weather;

  // desctructuring properties 
  const { cityDets, weather } = data; 
  // console.log(data);
  //update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  // update night or day and icon
  const iconUpdate = weather.WeatherIcon;
  const iconSrc = `img/icons/${iconUpdate}.svg`;
  icon.setAttribute('src', iconSrc);

  let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

  time.setAttribute('src', timeSrc);

  //remove d-none class if present
  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
};

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return {
    cityDets: cityDets,
    weather: weather
  };

  // return {cityDets, weather}; //? can use only one value, if we use the same name for key and the value
};

cityForm.addEventListener('submit', e => {
  //prevent page reloading
  e.preventDefault();

  //get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();
  //update ui with a new city
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});