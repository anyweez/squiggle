'use strict'
let process = require('process');
let request = require('request');

function coords(place) {
    return `${place.latitude},${place.longitude}`;
}

module.exports = (function () {
    let cache = {
        lastRequest: null,
        duration: 1000 * 10 * 60, // ten minutes
        
        data: {},
        locations: {
            source: null,
            destination: null,
        },
    };
    
    function useCache(source, destination) {
        // If no request has been made, can't use cache.
        if (!cache.lastRequest) return false;
        // This shouldn't happen, but if locations haven't been set then we shouldn't trust the cache.
        if (cache.locations.source === null || cache.locations.destination === null) return false;
        // If locations have changed, don't use cache any more.
        if (source.label !== cache.locations.source.label || destination.label !== cache.locations.destination.label) return false;
        // If we've surpassed the cache duration, don't use the cache.
        if (Date.now() - cache.lastRequest > cache.duration) return false;
        
        return true;
    }

    return function (user, source, destination) {
        let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${coords(source)}&destination=${coords(destination)}&key=${process.env.GOOGLE_DIRECTIONS_KEY}`;

        // If a request has been made and it's expired, make a new one.
        if (!useCache(source, destination)) {
            console.log(`[${user}] Making directions request`);
            
            return new Promise(function (resolve, reject) {
                cache.lastRequest = Date.now();
                cache.locations = { source: source, destination: destination };
                
                request(url, function (err, response, body) {
                    if (!err) {
                        let content = JSON.parse(body);
                        if (content.routes.length === 0 || content.routes[0].legs.length === 0) reject('No route found.');

                        let seconds = content.routes[0].legs[0].duration.value;
                        cache.data = {
                            hours: Math.floor(seconds / 3600),
                            minutes: Math.floor(seconds % 3600 / 60),
                        };

                        resolve(cache.data);
                    } else reject(err);
                })
            });
        } else { // return cached info
            console.log(`[${user}] Pulling directions data from cache`);
            
            return new Promise(resolve => resolve(cache.data));
        }
    };
} ());