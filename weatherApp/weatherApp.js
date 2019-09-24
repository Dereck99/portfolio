$(document).ready(function(){
    var longitude, latitude;
    farenheitTemp = "";
    celciusTemp = "";
    var weatherApiUrl = "https://fcc-weather-api.glitch.me/api/current?";
    var tempIcon = document.getElementById("tempIcon");
    var temperatureUnit = "F";
    
    tempIcon.addEventListener("click", function(){
      var temperatureIcon = document.getElementById("tempIcon");
      var currentTemperature = document.getElementById("temperature");
      temperatureUnit = temperatureUnit == "F" ? "C" : "F";
      temperatureIcon.innerHTML = temperatureUnit;
      if(temperatureUnit == "F"){
        currentTemperature.innerHTML = farenheitTemp;
        temperatureIcon.innerHTML = "&#8457";
      } else
        {
          currentTemperature.innerHTML = celciusTemp;
          temperatureIcon.innerHTML = "&#8451";
        }
    });
  
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;
        getWeather(longitude, latitude, weatherApiUrl);
      });
    } else {
      $('#description').html("Geolocation failed");
    }
  });
  
  function getWeather(lon, lat, url){
    $.ajax({
      url: url + "lat=" + lat + "&" + "lon=" + lon,
      success: function(result){
        var description;
        celciusTemp = parseInt(result.main.temp);
        farenheitTemp = Math.round(celciusTemp * 1.8) + 32;
        $("#city").html(result.name);
        $("#country").html(result.sys.country);
        description = result.weather[0].description;
        description = description.replace(description.charAt(0), description.charAt(0).toUpperCase());
        console.log(description);
        $("#description").html(description);
        document.getElementById("imageIcon").src = result.weather[0].icon;
        document.getElementById("temperature").innerHTML = farenheitTemp;
      }
    });
  }