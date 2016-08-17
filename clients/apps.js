'use strict';

module.exports = {
  name: 'Is the apps list settings section visible',
  startDate: '2015-01-01',
  subjectAttributes: ['forceAppsList'],
  independentVariables: ['appsListVisible'],
  eligibilityFunction: function (subject) {
    if (subject && subject.forceAppsList) {
      return true;
    }

    return false;
  },
  groupingFunction: function (subject) {
    return {
      appsListVisible: true
    };
  }
};
