import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  const searchCountry = input.value.trim();
  if (searchCountry) {
    fetchCountries(searchCountry).then(foundCountry).catch(err);
  } else {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  }
}

function foundCountry(data) {
  if (data.length === 1) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = createMarkupInfo(data);
  } else if (data.length < 11) {
    countryInfo.innerHTML = '';
    countryList.innerHTML = createMarkupList(data);
  } else {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}

function createMarkupInfo(arr) {
  return arr
    .map(
      ({
        name: { official },
        population,
        capital,
        flags: { svg, alt },
        languages,
      }) => `<div class="country-wrap">
      <img src="${svg}" alt="${alt}" class="flag">
      <h2>${official}</h2></div>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages).join(', ')}</p>
  `
    )
    .join('');
}

function createMarkupList(arr) {
  return arr
    .map(
      ({ name: { official }, flags: { svg, alt } }) => `<li class="list">
      <img src="${svg}" alt="${alt}" class="flag">
      <h2>${official}</h2>
      </li>`
    )
    .join('');
}

function err(error) {
  if(error.message === "Not Found"){
    Notiflix.Notify.failure('Oops, there is no country with that name.');
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  } else {
    Notiflix.Notify.failure(`${error.message}`);
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  };
  }