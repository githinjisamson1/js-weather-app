function displayWeatherDetails(data) {
  console.log(data);
  const weatherDetails = document.querySelector("#weather-details");

  const divChild = document.createElement("div");
  divChild.innerHTML = `
  <div id="forecast">
  <div>
  <img src="${data.current.condition.icon}">
  </div>
  <p>${data.location.name}</p>
  <p>${data.current.temp_c} &degC</p>
  </div>

  `;
  weatherDetails.appendChild(divChild);
}

function bindUrlWithParams(url, params) {
  const queryString = new URLSearchParams(params).toString();
  return `${url}?${queryString}`;
}

function fetchWeatherDetails(placeValue) {
  const queryParams = {
    q: `${placeValue}`,
  };

  const urlApi = `https://weatherapi-com.p.rapidapi.com/current.json`;

  const urlWitParams = bindUrlWithParams(urlApi, queryParams);

  fetch(urlWitParams, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-RapidAPI-Key": "b6013b5b88msh5ef598d84cc3975p19a5dcjsn49b2600a41ec",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      displayWeatherDetails(data);
    })
    .catch();
}

function handleDOMContentLoladed(e) {
  const weatherForm = document.querySelector("#weather-form");

  weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const placeValue = document.querySelector("#place").value;

    fetchWeatherDetails(placeValue);
  });
}

document.addEventListener("DOMContentLoaded", handleDOMContentLoladed);
