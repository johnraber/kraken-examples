'use strict';


var IndexModel = require('../models/index');


exports.index = function (req, res) {

    var model = new IndexModel();
    //sample of setting context in the model

    res.render('index', model);
};


exports.localeResolution = function(req, res) {

    var model = new IndexModel();

    res.render('index', model);
};