'use strict';

module.exports = {
  name: 'Are the communication preferences enabled',
  startDate: '2015-01-01',
  subjectAttributes: ['lang'],
  independentVariables: ['communicationPrefsVisible'],
  eligibilityFunction: function (subject) {
    return !! (subject && subject.lang);
  },
  groupingFunction: function (subject) {
    var AVAILABLE_LANGUAGES = [
      'de',
      'en',
      'en-[a-z]{2}',
      'es',
      'es-[a-z]{2}',
      'fr',
      'hu',
      'id',
      'pl',
      'pt-br',
      'ru'
    ];

    // double quotes are used instead of single quotes to avoid an
    // "unterminated string literal" error
    var availableLocalesRegExpStr = "^(" + AVAILABLE_LANGUAGES.join("|") + ")$"; //eslint-disable-line quotes
    var availableLocalesRegExp = new RegExp(availableLocalesRegExpStr);

    function normalizeLanguage(lang) {
      return lang.toLowerCase().replace(/_/g, '-');
    }

    function areCommunicationPrefsAvailable(lang) {
      var normalizedLanguage = normalizeLanguage(lang);
      return availableLocalesRegExp.test(normalizedLanguage);
    }

    return {
      communicationPrefsVisible: areCommunicationPrefsAvailable(subject.lang)
    };
  }
};
