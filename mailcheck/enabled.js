'use strict';

module.exports = {
  name: 'mailcheck is enable or disabled',
  hypothesis: 'mailcheck will lead to higher confirmation rate of accounts',
  startDate: '2015-01-01',
  endDate: '2015-11-01',
  subjectAttributes: ['uniqueUserId', 'isMetricsEnabled', 'forceMailcheck'],
  independentVariables: ['mailcheckEnabled'],
  eligibilityFunction: function (subject) {
    if (subject) {
      if (subject.forceMailcheck === 'true') {
        return true;
      }

      if (subject.forceMailcheck === 'false') {
        return false;
      }

      if (subject.isMetricsEnabled) {
        return true;
      }
    }

    return false;
  },
  groupingFunction: function (subject) {
    var trial = this.bernoulliTrial(1, subject.uniqueUserId);

    if (subject.forceMailcheck === 'true') {
      trial = true;
    }

    return {
      mailcheckEnabled: trial
    };
  }
};
