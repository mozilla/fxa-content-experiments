'use strict';

module.exports = {
  name: 'sync checkbox is before or after signup',
  hypothesis: 'more users click choose what to sync if it is before the large signup button',
  startDate: '2015-01-01',
  subjectAttributes: ['uniqueUserId', 'isMetricsEnabledValue', 'forceExperimentGroup'],
  independentVariables: ['syncCheckbox'],
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
      syncCheckbox: choice
    };
  }
};
