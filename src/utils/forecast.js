const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=18f96db2fe65110213559f9c9ebc8c84&query=${lat},${long}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to app");
    } else if (body.error) {
      callback("Unable to find match");
    } else {
      console.log(body.current);
      callback(undefined, {
        weather: `${body.current.weather_descriptions[0]} is the weather and wind speed is ${body.current.wind_speed}`,
      });
    }
  });
};

module.exports = forecast;
