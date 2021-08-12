const cityForm = document.querySelector('form');
const cityName = document.querySelector('.details h5');

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
    .then(data => console.log(data))
    .catch(err => console.log(err));
});