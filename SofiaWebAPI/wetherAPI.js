let weatherOfSofiaBtn = document.getElementById("SofiaWeatherBtn");
let weatherForTheWeek = document.getElementById("ForcastForTheWeek");
let weatherForToday = document.getElementById("ForcastForToday");
let forcastForDay = document.getElementById("forcastOneDay");
let forcastForWeek = document.getElementById("forcastWeek");
let input = document.getElementById("cityname");
let divTodayEl = document.getElementById(".ForcastEl");

input.addEventListener("change", function () {
  fetch(
    `https://community-open-weather-map.p.rapidapi.com/forecast?q=${input.value}&units=metric`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "bb6a7cadeamsh5025cc4c9b84502p197544jsnd35d63e6ea07",
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      },
    }
  )
    .then((response) => {
      if (response.status === 404) {
        throw Error(response);
      }
      return response.json();
    })
    .then((data) => {
      showTodayWeather(data, strongEl);

      showWeeklyWeather(data, strongEl);

      weatherOfSofiaBtn.style.display = "none";
      weatherForTheWeek.style.display = "block";
      weatherForToday.style.display = "block";
    })
    .catch((err) => {
      forcastForDay.innerHTML = `Something went wrong! Page has not been found`;
      forcastForDay.style.display = "block";
    });
});

function showTodayWeather(data) {
  forcastForDay.innerHTML = `Forcast For Today in ${data.city.name}`;
  forcastForDay.style.display = "block";

  data.list.slice(0, 1).forEach((c) => {
    let dataWeather = c.weather[0];
    span = createElem("span");
    icon = dataWeather.icon;
    iconImg = createElem("IMG");
    iconImg.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    iconImg.display = "inline";

    appentInnerHTML(
      span,
      `<strong>${data.city.name}</strong> Current Temperature ${c.main.temp}°C  Feels Like ${c.main.feels_like}°C (${c.clouds.all}%) cloudiness <h2><strong>${dataWeather.description}</strong></h2>`
    );

    appentToEl(weatherForToday, span);
    appentToEl(span, iconImg);
  });
}

function showWeeklyWeather(data) {
  let upcomingWeek = data.list.slice(1, 8);

  forcastForWeek.innerHTML = `Forcast For 7 Days in ${data.city.name}`;
  forcastForWeek.style.display = "block";

  let div = createElem("div");
  div.classList.add("div-class");
  div.setAttribute("id", "divElWeekForecast");

  upcomingWeek.forEach((e) => {
    span = createElem("span");

    e.weather.forEach((i) => {
      icon = i.icon;
    });
    iconImg = createElem("IMG");
    iconImg.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    appentInnerHTML(
      span,
      `<strong>${data.city.name}</strong> ${e.main.temp}°C `
    );

    appentToEl(weatherForTheWeek, div);
    appentToEl(div, span);
    appentToEl(span, iconImg);
  });
}

function createElem(el) {
  return document.createElement(el);
}

function appentToEl(to, from) {
  to.appendChild(from);
}

function appentInnerHTML(to, text) {
  to.innerHTML = text;
}
