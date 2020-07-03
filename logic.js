
$("button").on("click", function (event) {
    event.preventDefault()

    var cityInput = $("#cityInput").val()


    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" +
        cityInput + "&appid=eaef1d6f535c6ae67c03360137bcc4a8&units=imperial";

    var queryURL2 = "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityInput + "&appid=eaef1d6f535c6ae67c03360137bcc4a8&units=imperial";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            var fiveDayForecast = [];

            //Attempting to creat a for loop for the five-day forecast
            // for (i =0; i < 40; i+5) {
            // response.list[i].dt.text;
            // console.log(response.list[0].dt.text)

            // }


            var forecast = response.list[0];

            var container = $("<div>");

            var titleEl = $("<h5>5-Day Forecast</h5>");

            var temp = forecast.main.temp;
            var tempEl = $("<p>Temperature: " + temp + "°F</p>");


            var humidity = forecast.main.humidity;
            var humidityEl = $("<p>Humidity: " + humidity + "%</p>");

            var icon = forecast.weather[0].icon;
            var iconLink = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            var iconEl = $("<img src=" + iconLink + " />");

            container.append(titleEl, tempEl, humidityEl, iconEl);

            $(".forecast").append(container);


        });


    $.ajax({
        url: queryURL2,
        method: "GET"
    })
        .then(function (response) {


            var forecastToday = response;

            var containerToday = $("<div>");

            var cityToday = forecastToday.name;
            var cityElToday = $("<h3>" + cityToday + "</h3>");
            var NowMoment = moment();
            var eDisplayMoment = $(".cityResults");
            $(eDisplayMoment).html(NowMoment.format('L'));

            var iconToday = forecastToday.weather[0].icon;
            var iconLinkToday = "http://openweathermap.org/img/wn/" + iconToday + "@2x.png";
            var iconElToday = $("<img src=" + iconLinkToday + " />");


            var tempToday = forecastToday.main.temp;
            var tempElToday = $("<p>Temperature: " + tempToday + "°F</p>")

            var humidityToday = forecastToday.main.humidity;
            var humidityElToday = $("<p>Humidity: " + humidityToday + "%</p>");

            var windToday = forecastToday.wind.speed;
            var windElToday = $("<p>Wind Speed: " + windToday + " MPH</p>");

            var uvToday = forecastToday.wind.speed;
            var uvElToday = $("<p id='uv'>UV Index: " + uvToday + "</p>");
            uvIndexColor();

            containerToday.append(iconElToday, cityElToday, tempElToday, humidityElToday, windElToday, uvElToday);

            $(".cityResults").append(containerToday);

            $("#cityInput").empty();


        });




});


//Trying to change the color of the uv index
function uvIndexColor() {

    var uvToday = parseInt($("#uv").val(), 10);

    if (uvToday >= 7) {
        $("#uv").css('background-color', 'red'); s
    }

    else if (uvToday <= 3) {
        $("#uv").css('background-color', 'yellow');
    }

    else if (uvToday <= 2) {
        $("#uv").css('background-color', 'red');
    };
};






