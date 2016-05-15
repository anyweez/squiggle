'use strict'
function Place(info) {
    this.label = info.label;
    this.latitude = info.lat;
    this.longitude = info.long;

    return this;
}

/**
 * This service retrieves places per user. Right now its using a really simple in-memory
 * stub but this can eventually be swapped out to persistent storage somewhere (database
 * of some sort).
 */
module.exports = (function () {
    const SOURCE = 1;
    const DESTINATION = 2;
    
    let byUser = {
        luke: {
            home: new Place({ label: 'home', lat: 35.194060, long: -80.849268 }),
            work: new Place({ label: 'work', lat: 35.151965, long: -80.949164 }),
        },
    };
    
    let active = {
        luke: {
            [SOURCE]: 'home',
            [DESTINATION]: 'work',
        },
    };

    return {
        SOURCE: SOURCE,
        DESTINATION: DESTINATION,
        
        find: function (user, loc) {
            
            try {
                let label = active[user][loc];                
                return byUser[user][label];
            } catch (e) {
                return undefined;
            }
        },
    };
} ());