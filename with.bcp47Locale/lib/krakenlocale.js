'use strict';

var debug = require('debuglog')('g11nLocaleFR');

module.exports = function() {

    return function(req, res, next) {
        // res.locals.context.locality { country: 'iso 3166 country code', language: bcp47 language tag' } are used
        // by the template resolution engine to choose the appropriate template / properties file
        // Note:  the structure of templates under the locales directory
        res.locals.context = {locality: null };

        if(res.locals.locale) {
            res.locals.context.locality = { country: res.locals.locale.countryCode,
                language: res.locals.locale.language,
                timezone: res.locals.locale.primaryTimeZone,
                locale : res.locals.locale.cldrLocale};
        }
        else {
            // set a default
            res.locals.context.locality = { country: 'US', language: 'en-US' };
        }

        debug('Locale from locale resolver: ',  res.locals.locale);
        debug('Locality to be used by template resolution: ',  res.locals.context.locality);

        next();
    };

};