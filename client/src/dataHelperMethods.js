import config from './config.json';
const fetchJsonp = require('fetch-jsonp');
//  load the values from the .env file into application's process.env
// ('dotenv').config();

const etsyKey = config.etsyKey;

console.log(process.env);

export const buildUrl = (filtersApplied) => {
//  console.log(filtersApplied);

  /* code if decided to use filters
  let parameters = [];
  for(let param in filtersApplied) {
    if(`${filtersApplied[param]}` && param !== 'jobs') {
      console.log(param);
      console.log(`${filtersApplied[param]}`);
      parameters[param] = `${filtersApplied[param]}`;
    }
  }
  let params = querystring.stringify(parameters);
  */
  //https://api.etsy.com/v2/listings/active.js?api_key=${etsyKey}&category=supplies&keywords=whiskey&includes=Images,Shop
  let request = `https://api.etsy.com/v2/listings/active.js?api_key=${etsyKey}&&includes=Images`;
  //console.log(`https://api-v2.themuse.com/jobs?api_key=${request}&${etsyKey}`);
  return request;
};

export const buildBasicUrl = (route) => {

  //https://api.etsy.com/v2/taxonomy/categories?api_key=186o1pdbspolpegt8nk87739
  let basicUrl = `https://api.etsy.com/v2/listings/active.js?api_key=${etsyKey}&category=supplies&includes=Images`;
  console.log(basicUrl);
  return basicUrl;
};

export const getItemsFromCategoryFromEtsy = (category) => {
  //https://api.etsy.com/v2/taxonomy/categories?api_key=186o1pdbspolpegt8nk87739
  let basicUrl = `https://api.etsy.com/v2/listings/active.js?api_key=${etsyKey}&category=${category}&includes=Images`;
  return basicUrl;
};

export const fetchPosts = (request) => {
  return fetchJsonp(request, {timeout: 10000})
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
    });
};

export const postToDb = (url, body) => {
  console.log(body);
  return fetch(url, {
    method: 'POST',
    body: body,
    headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => {

      if(res.ok) {
        return console.log('record added');
      }
      throw new Error('Request failed');
    })
    .catch(err => {
      console.log(err);
    });
};

export const fetchFromDb = (url) => {
  return fetch(url)
    .then(res => {
      if(res.ok) return res.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => console.log(error));
};

/*
export const fetchPosts = (filtersApplied, currentPage) => dispatch => {
  const requestedAt = Date.now()
  dispatch(requestPosts(requestedAt))
  return fetch(buildSearchUrl(filtersApplied, currentPage))
    .then(response => response.json())
    // temporarily simulating a slow response over the network
    .then(json => new Promise(resolve => setTimeout(() => resolve(json), 1000)))
    .then(json => dispatch(receivePosts(json, requestedAt)))
}*/
