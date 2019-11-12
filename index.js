'use strict';

const options = {
    headers: new Headers(
        { "X-Api-Key": "90fUQ2YOU83xwLOvHybdgvJUcJ10wIyzYAv54SgG"})
};

const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function getNatParks(query, maxResults) {
    const params = {
        api_key: '90fUQ2YOU83xwLOvHybdgvJUcJ10wIyzYAv54SgG',
        q: query,
        limit: maxResults,
        stateCode: $('#state-option-one').val(),
    };

    const queryString = formatQueryParams(params);

    const url = searchURL + '?' + queryString;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();

    for (let i = 0; i < responseJson.data.length; i++){

        $('#results-list').append(`
        <li><h3>${responseJson.data[i].fullName}</h3>
        <p>${responseJson.data[i].description}</p>
        <a href="${responseJson.data[i].url}">Website</a>
        <p>${responseJson.data[i].directionsInfo}  <a href="${responseJson.data[i].directionsURL}">Directions</a></p>
            
        `)};
    $('#results').removeClass('hidden');
};







function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val();
        getNatParks(searchTerm, maxResults);
    });
}

$(function() {
    console.log('App loaded! Waiting for submit');
    watchForm();
});