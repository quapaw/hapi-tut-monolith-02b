'use strict';

//Go Look at https://medium.com/@dstevensio/manifests-plugins-and-schemas-organizing-your-hapi-application-68cf316730ef#.3s5j9o2yu

const Glue            = require('glue');
const SampleCustomers = require('./samples/customers');
const SampleProducts  = require('./samples/products');


Glue.compose(require('./config/manifest.json'), function(err, server) {
    server.route({method: 'GET',
                  path: '/',
                  handler: function (request, reply) {
                     reply('Hello, world');
                  }
    });

    server.route({method: 'GET',
                  path: '/{name}',
                  handler: function (request, reply) {
                     reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
                  }
    });

    server.route({method: 'GET',
                  path: '/customers',
                  handler: function (request, reply) {
                      reply(SampleCustomers);
                  }});

    server.route({method: 'GET',
                  path: '/products',
                  handler: function (request, reply) {
                     reply(SampleProducts);
                  }});



    server.start(function (err) {
        if(err) {
            throw err;
        }
        console.log('Server running at: ' + server.info.uri);
        //API Running on port 3000
    });
});
