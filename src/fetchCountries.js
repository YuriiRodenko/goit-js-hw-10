export function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1/';
  const END_POINT = 'name/';
  const FILTER = '?fields=name,capital,population,flags,languages';
  return fetch(`${BASE_URL}${END_POINT}${name}${FILTER}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}