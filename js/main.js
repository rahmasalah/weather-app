let searchInput = document.getElementById("searchInput");

//today
const todayDate = document.getElementById("todayDate");
const city = document.getElementById("city");
const todayTemp = document.getElementById("todayTemp");
const todayCond = document.getElementById("todayCond");
const todayHumdity = document.getElementById("todayHumdity");
const todayDire = document.getElementById("todayDire");
const todayIcon = document.getElementById("todayIcon");
const todayWind = document.getElementById("todayWind");

// tom

const tomDate = document.getElementById("tomDate");
const tomIcon = document.getElementById("tomIcon");
const tomMaxTemp = document.getElementById("tomMaxTemp");
const tomMinTemp = document.getElementById("tomMinTemp");
const tomCond = document.getElementById("tomCond");

//after tom

const afterTomDate = document.getElementById("afterTomDate");
const afterTomIcon = document.getElementById("afterTomIcon");
const afterTomMaxTemp = document.getElementById("afterTomMaxTemp");
const afterTomMinTemp = document.getElementById("afterTomMinTemp");
const afterTomCond = document.getElementById("afterTomCond");

let data = [];

async function getTemp(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=8773e0117dbb4106ac0154641241201&q=${city}&days=3&aqi=no&alerts=no`
  );
  if (response.ok == true) {
    let finalResponse = await response.json();
    data = finalResponse;
    getToday();
    getTom();
    getAfterTom();
  }
}

function getToday() {
  let todayDay = new Date();
  todayDate.innerHTML = todayDay.toLocaleDateString("en-US", {
    dateStyle: "full",
  });
  city.innerHTML = data.location.name;
  todayTemp.innerHTML = `${data.current.temp_c}°  `;
  todayIcon.setAttribute("src", `https:${data.current.condition.icon}`);
  todayCond.innerHTML = data.current.condition.text;
  todayHumdity.innerHTML = data.current.humidity;
  todayWind.innerHTML = `${data.current.wind_kph} km/h`;
  todayDire.innerHTML = data.current.wind_dir;
}

function getTom() {
  let tomDay = new Date(data.forecast.forecastday[1].date);
  tomDate.innerHTML = tomDay.toLocaleDateString("en-US", { dateStyle: "full" });
  tomIcon.setAttribute(
    "src",
    `https:${data.forecast.forecastday[1].day.condition.icon}`
  );
  tomMaxTemp.innerHTML = `${data.forecast.forecastday[1].day.maxtemp_c}°`;
  tomMinTemp.innerHTML = `${data.forecast.forecastday[1].day.mintemp_c}°`;
  tomCond.innerHTML = data.forecast.forecastday[1].day.condition.text;
}

function getAfterTom() {
  let afterTomDay = new Date(data.forecast.forecastday[2].date);
  afterTomDate.innerHTML = afterTomDay.toLocaleDateString("en-US", {
    dateStyle: "full",
  });
  afterTomIcon.setAttribute(
    "src",
    `https:${data.forecast.forecastday[2].day.condition.icon}`
  );
  afterTomMaxTemp.innerHTML = `${data.forecast.forecastday[2].day.maxtemp_c}°`;
  afterTomMinTemp.innerHTML = `${data.forecast.forecastday[2].day.mintemp_c}°`;
  afterTomCond.innerHTML = data.forecast.forecastday[2].day.condition.text;
}

getTemp("cairo");
searchInput.addEventListener("keydown", function () {
  getTemp(searchInput.value);
});
