   function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

let myChart = document.getElementById("myChart");

massPopChart = new Chart(myChart, {
        type: 'bar',
        data:{
            labels:[],
            datasets:[{
                label: 'Temperature',
                data:[],
                backgroundColor: 'green'
            }]
        },
    });
 

const api = {
    key: "3df149cc122fc21bb75f09006af7fedd",
    base: "https://api.openweathermap.org/data/2.5/"
  }

const addBtn = document.querySelector('.add-btn');
const addCity = document.querySelector('.add-city');
cities = massPopChart.config.data.labels;
addCities = massPopChart.config.data.datasets[0].data;
temperatureValue = document.querySelector(".temperature-value");
submitBtn = document.querySelector(".submit-btn");

addBtn.addEventListener("click", () => {
    city = addCity.value;
    cities.push(city);
    getTemperature(city);
});

submitBtn.addEventListener("click", () => {
    finalTemperature = temperatureValue.value;
    addCities.push(finalTemperature);
    updateChart()
    temperatureValue.value = "";
    addCity.value = "";
})

function getTemperature (city) {
fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  }

function displayResults(weather){
   placeTemperature = weather.main.temp;
   temperatureValue.value = Math.round(placeTemperature);
}

function updateChart(){
    massPopChart = new Chart(myChart, {
        type: 'bar',
        data:{
            labels: cities,
            datasets:[{
                label: 'Temperature',
                data:addCities,
                backgroundColor: 'green'
            }]
        },
    });
}