'use strict';

module.exports = {
  name: 'coppa is dropdown or input',
  hypothesis: 'coppa is better as an input field than a dropdown',
  startDate: '2015-01-01',
  subjectAttributes: ['uniqueUserId', 'isMetricsEnabledValue', 'forceExperimentGroup'],
  independentVariables: ['coppaView'],
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
      coppaView: choice
    };
  }
};
