'use strict';

module.exports = {
  name: 'mailcheck is enable or disabled',
  hypothesis: 'mailcheck will lead to higher confirmation rate of accounts',
  startDate: '2015-01-01',
  subjectAttributes: ['able', 'uniqueUserId', 'isMetricsEnabledValue', 'forceExperiment', 'forceExperimentGroup'],
  independentVariables: ['mailcheck'],
  eligibilityFunction: function (subject) {
    if (subject && subject.able) {
      return subject.able.choose('chooseAbExperiment', subject) === 'mailcheck';
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
