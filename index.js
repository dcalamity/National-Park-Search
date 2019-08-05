'use strict';

  const searchURL= 'https://developer.nps.gov/api/v1/parks';
  
  const apiKey= 'spSzwyMegX2P7akcLWa88v3SMHBtdZmw5defzeIx';

  function displayResults(responsejson){
    $('#results-list').empty();
    console.log(responsejson)
    for (let i = 0; i < responsejson.data.length; i++){
      $('#results-list').append(
        `<li><h3>${responsejson.data[i].fullName}</h3>
        <p>${responsejson.data[i].description}</p>
        <p>${responsejson.data[i].url}</p>`
      )}
      $('#results').removeClass('hidden');
    }
  

  function formatQueryParams(params){
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

  function getNPSdata (query, maxResults=10){
    const params = {
      stateCode: query,
      limit: maxResults,
      api_key: apiKey,
    };
    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString;
    console.log(url);

    fetch(url)
      .then(response => {
        if(response.ok){
          return response.json();
        }
        throw new Error
        (response.statusText);
      })
      .then(responsejson =>
        displayResults(responsejson));
        //console.log(responsejson);
      // .catch(err => {
      //   alert(err.message);
      // })

  }

  function submitForm () {
    $('form').submit(event => {

      event.preventDefault();
      const stateSearch = $('#state-search').val();
        //alert('search clicked')
      const results = $('#numResults').val();
        //console.log(results, stateSearch);
      getNPSdata(stateSearch, results);
    }   
  )}

  $(submitForm)