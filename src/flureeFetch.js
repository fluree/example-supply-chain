import fetch from 'isomorphic-fetch';

const host = process.env.REACT_APP_FLUREE_HOST;
const db = process.env.REACT_APP_FLUREE_DB;
const endpoint = process.env.REACT_APP_FLUREE_ENDPOINT;
console.log(host);
const url = `http://${host}:8080/${endpoint}/${db}/`;

function parseJSON(response) {
  return response.json().then(function (json) {
    const newResponse = Object.assign(response, { json });
    if (response.status < 300) {
      return newResponse;
    } else {
      throw newResponse;
    }
  });
}

function fetchResp(fullUri, fetchOpts){
  return fetch(fullUri, fetchOpts)
  .then(parseJSON)
  .then(resp =>  resp.json)
  .catch(error => {
    let errorMessage = error.json.message
    throw new Error(errorMessage)
  })
}


var flureeFetch = (endpoint, body, opts) => {
  let fullUrl = url + endpoint;
  
  var fetchOpts = opts || {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };

  return new Promise((resolve, reject) => {
      fetchResp(fullUrl, fetchOpts)
      .then(res => resolve(res))
      .catch(err => reject(err))
  });
}


export { flureeFetch, parseJSON };
