import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

// fetch('https://restcountries.com/v3.1/name/canada');

const countryIn = document.querySelector('#search-box');
const countryOut = null;
console.log(countryIn);
console.log(countryOut);

const inpunСountry = () => {
  //   if (!nameIn.value) {
  //     countryOut.textContent = 'Anonymous';
  //   } else {
  //   countryOut = countryIn.value;
  console.log(countryIn.value);
  fetch(`https://restcountries.com/v3.1/name/${countryIn.value}`);
  //   }
};

countryIn.addEventListener(
  'input',
  debounce(() => {
    inpunСountry();
  }, DEBOUNCE_DELAY)
);
