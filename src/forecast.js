const request = require('request');

const forecast = (latitude, longitude, callback) => {

    url = 'http://api.weatherstack.com/current?access_key=d6e1f3d3fe91f29d5df12e053a22b9c4&query=' +
        longitude + ',' + latitude;
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('No Internet.', undefined);
        } else if (body.error) {
            callback('Coordiantes are not correct.', undefined);
        } else {
            callback(undefined, 'I predict that in ' + body.location.name +
                ' the temp will be ' + body.current.feelslike + ' degrees.');
        }
    })
}

module.exports = forecast