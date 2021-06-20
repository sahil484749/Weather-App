const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=10216a3d78fdaae40dd4bd55b0127949&query=" +
    encodeURIComponent(lat) +
    "," +
    encodeURIComponent(long);
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to Weather forecast API");
    } else if (body.error) {
      callback("Unable to get the location");
    } else {
      const temperature = body.current.temperature;
      const feelslike = body.current.feelslike;
      const humidity = body.current.humidity;
      callback(
        undefined,
        ` It is currently ${temperature} degress out. It feels like ${feelslike} degress out. The Humidity is ${humidity}.`
      );
    }
  });
};

module.exports = forecast;
