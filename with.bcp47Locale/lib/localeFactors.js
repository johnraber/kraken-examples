'use strict';

function LocaleFactors(options) {
    if(!options) {
        options = {};
    }

    this.loggedInUser = options.loggedInUser || false;
    this.userCountryPref = options.userCountryPref;
    this.userLangPref = options.userLangPref;

    //country
    this.countryUrlQueryParam = options.countryUrlQueryParam;
    this.countryCookie = options.countryCookie;

    // lang   replacing '_' with '-' to support apps using legacy Locale as language
    this.langUrlQueryParam = (options.langUrlQueryParam) ? options.langUrlQueryParam.replace('_', '-') : undefined;
    this.langCookie = (options.langCookie) ? options.langCookie.replace('_', '-') : undefined;
    this.langBrowserAcceptHeader = (options.langBrowserAcceptHeader) ? options.langBrowserAcceptHeader.replace('_', '-') : undefined;

    // computed
    this.country;
    this.lang;
}

LocaleFactors.defaults = {
    defaultCountry: 'FR',
    defaultLang: 'fr-FR'
};



/**
 * This function assumes you are using Express and therefore have access to properties and methods such as req.cookies
 *   and req.param()
 *
 * @param req  should have user object attached if a user is logged in and that user object should contain
 *             preferredCountry and preferredLang properties
 * @returns  populated LocaleFactors object
 */
LocaleFactors.prototype.populateFactors = function populateFactors(req) {

    if(req.user) {

        // assume user logged in and that user preferred country and language are part of the user object  ... use
        // additional middleware to populate/modify the user object if needed

        this.loggedInUser = true;
        this.userCountryPref = req.user.preferredCountry;
        this.userLangPref = req.user.preferredLang;
    }

    var countryParam = req.param('country');
    this.countryUrlQueryParam = (countryParam) ? countryParam : undefined;

    var langParam = req.param('lang');
    this.langUrlQueryParam = (langParam) ? langParam.replace('_', '-') : undefined;

    if(req.cookies) {
        this.countryCookie = (req.cookies.COUNTRY) ? req.cookies.COUNTRY : undefined;
        this.langCookie = (req.cookies.LANG) ? req.cookies.LANG.replace('_', '-') : undefined;
    }

    this.langBrowserAcceptHeader = (req.headers['accept-language']) ? req.headers['accept-language'].replace('_', '-') : undefined;

    return this;
};




module.exports = LocaleFactors;