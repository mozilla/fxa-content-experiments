'use strict';

module.exports = {
  name: 'Should the user see the "connect another device" screen',
  hypothesis: 'A nudge to connect another device will help increase multi-device users',
  startDate: '2015-01-01',
  subjectAttributes: ['uniqueUserId', 'isMetricsEnabledValue', 'forceExperimentGroup'],
  independentVariables: ['connectAnotherDevice'],
  eligibilityFunction: function (subject) {
    if (subject) {
      return !! (subject.forceExperimentGroup || subject.isMetricsEnabledValue);
    }

    return false;
  },
  groupingFunction: function (subject) {
    var GROUPS = ['control', 'treatment'];
    var choice = this.uniformChoice(GROUPS, subject.uniqueUserId);

    if (subject.forceExperimentGroup) {
      choice = subject.forceExperimentGroup;
    }

    return {
      connectAnotherDevice: choice
    };
  }
};
