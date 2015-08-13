'use strict';

module.exports = {
  name: 'the password strength checker is enabled',
  hypothesis: 'the password strength checker will prevent users from signing up with insecure passwords.',
  startDate: '2015-01-01',
  subjectAttributes: ['uniqueUserId', 'isMetricsEnabled', 'forcePasswordStrengthCheck'],
  independentVariables: ['passwordStrengthCheckEnabled'],
  eligibilityFunction: function (subject) {
    if (subject) {
      if (subject.forcePasswordStrengthCheck === 'true') {
        return true;
      }

      if (subject.forcePasswordStrengthCheck === 'false') {
        return false;
      }

      if (subject.isMetricsEnabled) {
        return true;
      }
    }

    return false;
  },
  groupingFunction: function (subject) {
    return {
      passwordStrengthCheckEnabled: true
    };
  }
};
