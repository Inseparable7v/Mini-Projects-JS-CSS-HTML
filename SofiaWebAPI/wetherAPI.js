var weatherOfSofiaBtn = document.getElementById("SofiaWeatherBtn");
var weatherForTheWeek = document.getElementById("ForcastForTheWeek");
var weatherForToday = document.getElementById("ForcastForToday");
var forcastForDay = document.getElementById("forcastOneDay");
var forcastForWeek = document.getElementById("forcastWeek");
var input = document.getElementById("cityname");
var divTodayEl = document.getElementById(".ForcastEl");

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
      let span = createElem("span");
      let iconImg;
      let icon;
      let div = createElem("div");
      forcastForDay.innerHTML = `Forcast For Today in ${data.city.name}`;
      forcastForDay.style.display = "block";

      divEl = createElem("div");
      appentToEl(weatherForToday, div);

      data.list.slice(0, 1).forEach((c) => {
        icon = c.weather[0].icon;
        iconImg = createElem("IMG");
        iconImg.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        iconImg.display = "inline";

        appentInnerHTML(
          span,
          `${data.city.name} Current Temperature ${c.main.temp}°C  Feels Like ${c.main.feels_like}°C (${c.clouds.all}%) cloudiness`
        );
        appentToEl(weatherForToday, span);
        appentToEl(weatherForToday, iconImg);
      });

      let upcomingWeek = data.list.slice(0, 8);

      forcastForWeek.innerHTML = `Forcast For 7 Days in ${data.city.name}`;
      forcastForWeek.style.display = "block";

      div = createElem("div");
      div.classList.add("div-class");
      div.setAttribute('id','divElWeekForecast');

      upcomingWeek.forEach((e) => {
        span = createElem("span");

        e.weather.forEach((i) => {
          icon = i.icon;
        });
        iconImg = createElem("IMG");
        iconImg.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        iconImg.display = "inline";
        appentInnerHTML(
          span,
          `${data.city.name} Current Temperature ${e.main.temp}°C (${e.clouds.all}%)cloudiness`
        );
        appentToEl(weatherForTheWeek, div);
        appentToEl(div, span);
        appentToEl(span, iconImg);

      });

      weatherOfSofiaBtn.style.display = "none";
      weatherForTheWeek.style.display = "block";
      weatherForToday.style.display = "block";
    })
    .catch((err) => {
      forcastForDay.innerHTML = `Something went wrong! Page has not been found`;
      forcastForDay.style.display = "block";
    });
});

function createElem(el) {
  return document.createElement(el);
}

function appentToEl(to, from) {
  to.appendChild(from);
}

function appentInnerHTML(to, text) {
  to.innerHTML = text;
}
