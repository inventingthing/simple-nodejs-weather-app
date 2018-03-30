const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const apiKey = '********'
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function (req, res){
  res.render('index', {weather: null, error:null});
});
app.post('/', function(req, res){
  var city = req.body.city;
  var state = req.body.state;
  let url = `http://api.wunderground.com/api/${apiKey}/conditions/q/${state}/${city}.json`;
request(url, function(err, response, body){
  if (err){
    res.render('index', {weather: null, error:'Error, please try again'});
  }
  else {
    let weather = JSON.parse(body);
    if(weather["current_observation"] == undefined){
      res.render('index', {weather: null, error: 'Error, please try again'});
    }
    else{
      let weather_text = `It's ${weather.current_observation.temp_f} degrees fahrenheit in ${city}.`;
      res.render('index', {weather:weather_text, error: null});
    }
  }
});
});
app.listen(3000);
