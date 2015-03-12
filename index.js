'use strict';

var pkg = require('./package');
var wreck = require('wreck');

function getMeaning(word, cb) {
    var options = {
        headers: {
            'X-Mashape-Key' : 'EkCfhvHZ81mshIXcIs5EHWrVeyUlp1eNrcxjsnoeqr4FV6bhKr',
            'Accept': 'text/plain'
        }
    };
    wreck.request('GET',
        'https://mashape-community-urban-dictionary.p.mashape.com/define?term=' + word,
        options,
        function(err, response) {
            var message = 'I dont know whatcha talkin about ¯\_(ツ)_/¯';
            if(!err) {
                wreck.read(response, null, function (err, result) {
                    if(!err) {
                        if(Array.isArray(result.list) && result.list.length > 0) {
                            return cb(null, result.list[0].definition);
                        }
                    }
                    cb(null, message);
                });
            } else {
              cb(null, message);
            }
        });
}



module.exports = {

    name: pkg.name,

    version: pkg.version,

    register: function (plugin, options, next) {

        plugin.dependency('chivebot', function (plugin, next) {

            plugin.plugins.chivebot.registerCommand('meaningOf', function (raw, args, cb) {
                var word = args[2];

                //lookup urban dict
                getMeaning(word, cb);
            });

            next();

        });

        next();

    }

};
