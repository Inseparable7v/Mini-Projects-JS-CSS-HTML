var weatherOfSofiaBtn = document.getElementById("SofiaWeatherBtn");
var weatherOfSofia = document.querySelector(".cityName");


weatherOfSofiaBtn.addEventListener('click', function(){
    fetch(
        "https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=23.32&lat=42.69",
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": "bb6a7cadeamsh5025cc4c9b84502p197544jsnd35d63e6ea07",
            "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
          },
        }
      )
        .then((response => response.json()))
        .then(data => {
            let result = data.data;
              weatherOfSofia.innerHTML = result.map(x => `<li>${x.city_name} - ${x.temp}°C (${x.clouds}%) cloudiness</li>`);
        })
        .catch((err) => {
          console.error(err);
        });
      
});

