const express = require('express');
const ejs = require('ejs')
const https = require('https');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render('index')
})

app.post("/", (req, res) => {
    const querry = req.body.City
    // console.log(querry);
    // try {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + querry + "&appid=922f1fd2f96bc1031fd775f9f75a3924&units=metric"
    //     const data = await fetch(url);
    //     console.log(data)
    //     // const cleanData = JSON.parse(data);
    //     // console.log(cleanData)
    // } catch (error) {
    //     console.log(error);
    // }

    https.get(url, (response) => {
        console.log(response.statusCode);
        response.on("data", (data) => {
            const dt = JSON.parse(data);
            // console.log(dt);
            const place = dt.name;
            //console.log(place);
            const temp = dt.main.temp;
            //console.log(temp);
            const humidity = dt.main.humidity;
            const wind_speed = dt.wind.speed;
            //console.log(wind_speed);
            const weatherDescription = dt.weather[0].description
            //console.log(weatherDescription);
            const icon = dt.weather[0].icon
            const imgurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.render('weather', { data: dt, place: place, temp: temp, windSpeed: wind_speed, description: weatherDescription, humidity: humidity, img: imgurl })
        });
    })
});
app.listen(port, () => {
    console.log("Listening at port 3000")
})