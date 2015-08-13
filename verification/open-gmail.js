'use strict';

module.exports = {
  name: 'open gmail button is shown or hidden',
  hypothesis: 'providing an open gmail.com is useful for the verification rate',
  startDate: '2015-01-01',
  endDate: '2016-02-01',
  subjectAttributes: ['uniqueUserId', 'isMetricsEnabledValue', 'forceExperimentGroup', 'email'],
  independentVariables: ['openGmail'],
  eligibilityFunction: function (subject) {
      // if metrics is enabled and subject's email ends with @gmail.com
    if (subject && subject.email && subject.email.indexOf('@gmail.com') > 0) {
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
      openGmail: choice
    };
  }
};
