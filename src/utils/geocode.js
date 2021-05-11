const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWF5YW5rdmVybWEiLCJhIjoiY2tvN2RtNHRzMTRmZTJ2bXltMzQ1dHMybCJ9.jVjezQtQ8hD-VGXHaSY36Q`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to services");
    } else if (body.features.length === 0) {
      callback("Try another search");
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[1].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
