'use strict'
let hapi = require('hapi');
let placedb = require('./placedb');
let pathfinder = require('./pathfinder');
let pillowtime = require('./pillowtime');

let server = new hapi.Server();
server.connection({
    host: 'localhost',
    port: 8050,
    routes: {
        cors: true,
    },
});

server.route({
    method: 'get',
    path: '/travel',
    handler: function (request, reply) {
        // Load places 
        let source = placedb.find('luke', placedb.SOURCE);
        let destination = placedb.find('luke', placedb.DESTINATION);

        console.log(source);
        if (source === undefined || destination === undefined) return reply().code(400);
        
        // Find the travel time between these two places and return it.
        Promise.all([
            pathfinder('luke', source, destination),
            pillowtime('luke', source, destination),
        ]).then(function (path) {
            // Form a properly-formatted response once all promises resolve.
            var response = {
                updated: new Date().toISOString(),
                places: {
                    from: source,
                    to: destination,
                },
                travel: path[0],
                prep: path[1],
            };
            
            // Return the response as JSON.
            reply(response);
        });
    },
});

server.start(function (err) {
    if (err) throw err;
    
    console.log(`Server running at ${server.info.uri}`);
});