import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from '/src/fetchCountries';

const DEBOUNCE_DELAY = 300;

const countryIn = document.querySelector('#search-box');
const liCountry = document.querySelector('.country-list');
const divCountry = document.querySelector('.country-info');
console.log(countryIn);
console.log(liCountry);
console.log(divCountry);

let massСountries = [];

// функція витягає масив по запросу
const inputСountry = () => {
  resetEl(liCountry);
  resetEl(divCountry);
  addText = countryIn.value.trim();
  if (!addText) {
    return;
  } else {
    const name = addText;
    fetchCountries(name)
      .then(data => {
        massСountries = data;
        console.log(massСountries);
        return countryArr(massСountries);
      })
      .catch(err => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        console.log(err);
      });
  }
};

// функція опрацьовує отриманий масив

function countryArr(massСountries) {
  const arrLength = massСountries.length;
  resetEl(liCountry);
  resetEl(divCountry);
  if (arrLength > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (arrLength >= 2 && arrLength <= 10) {
    liCountry.insertAdjacentHTML(
      'afterbegin',
      createCounrtyList(massСountries)
    );
    return;
  } else {
    divCountry.insertAdjacentHTML(
      'afterbegin',
      createCounrtyOne(massСountries)
    );
    console.log('1');
  }
}
// швиводить список стран
function createCounrtyList(massСountries) {
  const result = massСountries
    .map(({ name, flags }) => {
      return `<li class="country-list__item">
        <img class="country-list__img" src="${flags.svg}" alt="flag" />
        <p class="country-list__text">${name.official}</p>
      </li>`;
    })
    .join('');
  return result;
}

function createCounrtyOne(massСountries) {
  const result = massСountries
    .map(({ name, capital, population, flags, languages }) => {
      return `
  <div class="country__flag">
    <img class="country__img" src="${flags.png}" alt="flag">
    <p class="country__name">${name.official}</p>
  </div>
  <ul>
      <li> <b>Capital</b>:
    <span>${capital}</span>
      </li>
      <li> <b>Population</b>:
    <span>${population}</span>
      </li>
      <li> <b>Languages</b>:
     <span>${Object.values(languages).join(', ')}</span>
      </li>
  </ul>`;
    })
    .join('');
  return result;
}

//видалити результати минулого виклику
function resetEl(el) {
  el.innerHTML = '';
}

countryIn.addEventListener(
  'input',
  debounce(() => {
    inputСountry();
  }, DEBOUNCE_DELAY)
);
