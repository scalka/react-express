import config from './config.json';
const fetchJsonp = require('fetch-jsonp');
//  load the values from the .env file into application's process.env
require('dotenv').config();

const etsyKey = process.env.ETSY_KEY || config.etsyKey;

// get items from etsy
export const buildUrl = () => {
  let request = `https://api.etsy.com/v2/listings/active.js?api_key=${etsyKey}&&includes=Images`;
  return request;
};
// get items in a category
export const getItemsFromCategoryFromEtsy = (category) => {
  let basicUrl = `https://api.etsy.com/v2/listings/active.js?api_key=${etsyKey}&category=${category}&includes=Images`;
  return basicUrl;
};
//fetch posts from etsy
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
// post to mongoDb
export const postToDb = (url, body) => {
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
// get from MongoDb
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
