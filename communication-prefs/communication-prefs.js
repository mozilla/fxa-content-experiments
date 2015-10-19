'use strict';

module.exports = {
  name: 'Are the communication preferences enabled',
  startDate: '2015-01-01',
  subjectAttributes: ['lang'],
  independentVariables: ['communicationPrefsVisible'],
  eligibilityFunction: function () {
    return true;
  },
  groupingFunction: function (subject) {
    var AVAILABLE_LANGUAGES = [
      'de',
      'en',
      'en-us',
      'es',
      'fr',
      'hu',
      'id',
      'pl',
      'pt-br',
      'ru'
    ];

    function normalizeLanguage(lang) {
      return lang.toLowerCase().replace(/_/g, '-');
    }

    function areCommunicationPrefsAvailable(lang) {
      var normalizedLanguage = normalizeLanguage(lang);
      return (AVAILABLE_LANGUAGES.indexOf(normalizedLanguage) > -1);
    }

    return {
      communicationPrefsVisible: areCommunicationPrefsAvailable(subject.lang)
    };
  }
};
