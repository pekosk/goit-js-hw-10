import './css/styles.css';
import debounce from 'lodash.debounce';
import countryCardTemplate from './country-card.hbs';
import countryListTemplate from './country-list.hbs';
import { fetchCountries } from './fetchCountries';

const countryInput = document.querySelector('#search-box');
const countryCardsWrapperEl = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');
const DEBOUNCE_DELAY = 300;

const renderCountryCard = countryData => {
  if (countryData.length > 1) {
    countryCardsWrapperEl.insertAdjacentHTML('beforeend', countryListTemplate());
  }
};

const searchCountry = (event) => {
  const country = countryInput.value;

  fetchCountries(country)
  .then(countryData => {
    console.log(countryData);
    renderCountryCard(countryData);
  })
  .catch(error => {
    console.log(error);
  });
};

const searchCountryInput = debounce(searchCountry, DEBOUNCE_DELAY);
countryInput.addEventListener('input', searchCountryInput);
