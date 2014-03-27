# Kraken_Example_Shopping_Cart

A non-trivial kraken app

## Configure the database

### add lib/database.js

```javascript
'use strict';
var mongoose = require('mongoose');

var db = function () {
    return {
        config: function (conf) {
            mongoose.connect('mongodb://' + conf.host + '/' + conf.database);
            var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', function callback() {
                console.log('db connection open');
            });
        }
    };
};

module.exports = db();

```

### add databaseConfig property to config/app-development.json

```javascript
...
    "databaseConfig": {
        "host": "localhost",
        "database": "test"
    }
...
```

### In index.js
  * Import the lib/database module
  * Apply db config via the kraken "onconfig" event (in index.js)

```javascript
'use strict';


var kraken = require('kraken.next'),
    express = require('express'),
    db = require('./lib/database'),
    app = express(),
    port = process.env.PORT || 8000;


app.use(kraken({
    "onconfig": function(settings, cb) {
        var dbConfig = settings.get("databaseConfig");
        db.config(dbConfig);
        cb(null, settings);
    }
}));


app.listen(port, function () {
    console.log('Listening on http://127.0.0.1:8000/');
});
```

