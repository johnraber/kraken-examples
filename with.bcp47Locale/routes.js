var controllers = require('./controllers');

module.exports = function (router) {
    router.get('/', controllers.index);
    router.get('/template4MyLocale', controllers.localeResolution);
};