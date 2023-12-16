const URL_API = process.env.REACT_APP_URL_API;
const URL_API_TEST = URL_API + '/tests';
const URL_API_SITES = URL_API + '/sites';

export async function fetchTests() {
  return fetch(URL_API_TEST).then((res) => res.json());
}

export async function fetchSites() {
  return fetch(URL_API_SITES).then((res) => res.json());
}
