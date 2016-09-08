'use strict';

module.exports = {
  name: 'the password strength checker is enabled',
  hypothesis: 'the password strength checker will prevent users from signing up with insecure passwords.',
  startDate: '2015-01-01',
  subjectAttributes: ['uniqueUserId', 'isMetricsEnabledValue', 'forcePasswordStrengthCheck'],
  independentVariables: ['passwordStrengthCheckEnabled'],
  eligibilityFunction: function (subject) {
    if (subject && subject.forcePasswordStrengthCheck === 'false') {
      return false;
    }

    return true;
  },
  groupingFunction: function (subject) {
    return {
      passwordStrengthCheckEnabled: true
    };
  }
};
