'use strict';

module.exports = {
  name: 'mailcheck is enable or disabled',
  hypothesis: 'mailcheck will lead to higher confirmation rate of accounts',
  startDate: '2015-01-01',
  endDate: '2015-11-01',
  subjectAttributes: ['uniqueUserId', 'isMetricsEnabledValue', 'forceExperimentGroup'],
  independentVariables: ['mailcheck'],
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
      mailcheck: choice
    };
  }
};
