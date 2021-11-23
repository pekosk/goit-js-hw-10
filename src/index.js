import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix, { Notify } from 'notiflix';
// import countryCardTemplate from './country-card.hbs';
// import countryListTemplate from './country-list.hbs';
import { fetchCountries } from './fetchCountries';

const countryInput = document.querySelector('#search-box');
const countryCardsWrapperEl = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');
const cleanEl = el => (el.innerHTML = '');
const DEBOUNCE_DELAY = 300;

const renderCountryCard = countryData => {
  if (countryData.length === 1) {
    cleanEl(countryList);
    const markupOneCountry = createMarkupOneCountry(countryData);
    countryCardsWrapperEl.innerHTML = markupOneCountry;
  } else if (countryData.length <= 10) {
    cleanEl(countryCardsWrapperEl);
    const markupManyCountry = createMarkupManyCountry(countryData);
    countryList.innerHTML = markupManyCountry;
  } else if (countryData.length > 10) {
    cleanEl(countryList);
    cleanEl(countryCardsWrapperEl);
    Notify.info("Too many matches found. Please enter a more specific name.");
  }
};

const createMarkupManyCountry = countryData => {
  return countryData
    .map(({ name, flags }) => `<div class="list-container"><img class="list-flag" src="${flags.png}" alt="${name.official}" width="60px" height="40px"></img>
<h2 class="country-list-name">${name.official}</h2></div>`)
    .join('');
};

const createMarkupOneCountry = countryData => {
  return countryData
    .map(({ name, flags, capital, population, languages }) => `<div class="country__card">
  <img class="country-flag" src="${flags.png}" alt="${name.official}" width="300px" height="200px"></img>
  <h2 class="country-name">${name.official}</h2>
  <ul class="country-info">
  <li class="country-info-item">
      <p class="country-capital">Capital: <span class="country-elem">${capital}</span></p>
    </li>
  <li class="country-info-item">
      <p class="country-population">Population: <span class="country-elem">${population}</span></p>
    </li>
  <li class="country-info-item">
      <p class="country-languages">Languages: <span class="country-elem">${Object.values(languages)}</span></p>
    </li>
  </ul>
</div>`)
}

const searchCountry = (event) => {
  const country = countryInput.value;

  fetchCountries(country)
    .then(countryData => {
    console.log(countryData);
    renderCountryCard(countryData);
  })
  .catch(error => {
    console.log(error);
    Notify.failure("Oops, there is no country with that name");
  });
};

const searchCountryInput = debounce(searchCountry, DEBOUNCE_DELAY);
countryInput.addEventListener('input', searchCountryInput);
