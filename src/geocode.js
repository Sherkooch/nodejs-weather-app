const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamVyZW15eXkiLCJhIjoiY2t6dHRwNXkxMGtxbjJ3bDZjdjJqajFhNiJ9.KJ3KZ5N1bhAOHLnuYR_lrw';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('No Internet', undefined);
        } else if (body.features.length === 0) {
            callback('Theres no such place!!!', undefined);
        } else {
            callback(undefined, {
                longitude: body.features[0].center[1],
                latitude: body.features[0].center[0],
                city_name: body.features[0].text,
                country: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode