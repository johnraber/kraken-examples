# with.bcp47Locale


An example Kraken 1.0  app that uses configurable locale resolution rules to determine the locale of each request/response
 and handles bcp47 language and bcp47 locale tags.

The supported locales in the sample are the country and languages:

* country=ES  lang=en-US or es-ES
* country=ER  lang=fr-FR
* country=US  lang=en-US


To see it working with different locales:

```
Start the app:
$ node .

In your browser:

localhost:8000/template4MyLocale?country='iso 3166 country code'&lang='bcp47 language tag'


This will automatically set the locale and redirect to the index page in the right locale
```
###What does the sample app demonstrate ?

* [Setting up middleware to populate locale for each request](https://github.com/krakenjs/kraken-examples/blob/master/with.bcp47Locale/controllers/localeResoltuion.js#L20)

* [Setting the locale in a response](https://github.com/krakenjs/kraken-examples/blob/master/with.bcp47Locale/controllers/localeResoltuion.js#L31)

* [Adding locale specific property files](https://github.com/krakenjs/kraken-examples/tree/master/with.bcp47Locale/locales)