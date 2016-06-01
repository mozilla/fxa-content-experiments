'use strict';

module.exports = {
  name: 'show or hide the reveal password button',
  hypothesis: 'show button is useful for users',
  startDate: '2015-01-01',
  subjectAttributes: ['uniqueUserId', 'isMetricsEnabledValue', 'forceExperimentGroup'],
  independentVariables: ['showPassword'],
  eligibilityFunction: function (subject) {
    if (subject) {
      if (subject.forceExperimentGroup || subject.isMetricsEnabledValue) {
        return true;
      }
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
      showPassword: choice
    };
  }
};
