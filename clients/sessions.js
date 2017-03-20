'use strict';

module.exports = {
  name: 'Are the sessions listed in the devices and apps view',
  startDate: '2015-01-01',
  subjectAttributes: ['firefoxVersion'],
  independentVariables: ['sessionsListVisible'],
  eligibilityFunction: function (subject) {
    var FIREFOX_VERSION = 53;

    if (subject && subject.firefoxVersion >= FIREFOX_VERSION) {
      return true;
    }

    return false;
  },
  groupingFunction: function (subject) {
    return {
      sessionsListVisible: true
    };
  }
};
