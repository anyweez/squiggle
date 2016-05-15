'use strict'
let process = require('process');
let request = require('request');

function coords(place) {
    return `${place.latitude},${place.longitude}`;
}

module.exports = (function () {
    let lastRequest = null;
    let cacheDuration = 1000 * 10 * 60; // ten minutes
    let cached = {};

    return function (user, source, destination) {
        let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${coords(source)}&destination=${coords(destination)}&key=${process.env.GOOGLE_DIRECTIONS_KEY}`;

        // If a request has been made and it's expired, make a new one.
        if (!lastRequest || (Date.now() - lastRequest) > cacheDuration) {
            return new Promise(function (resolve, reject) {
                lastRequest = Date.now();
                
                request(url, function (err, response, body) {
                    console.log('Made new request on behalf of ', user);
                    if (!err) {
                        let content = JSON.parse(body);
                        if (content.routes.length === 0 || content.routes[0].legs.length === 0) reject('No route found.');

                        let seconds = content.routes[0].legs[0].duration.value;
                        cached = {
                            hours: Math.floor(seconds / 3600),
                            minutes: Math.floor(seconds % 3600 / 60),
                        };

                        resolve(cached);
                    } else reject(err);
                })
            });
        } else { // return cached info
            return new Promise(resolve => resolve(cached));
        }
    };
} ());