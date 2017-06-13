'use strict';

module.exports = {
  name: 'Should the user see the "Send install link via SMS" screen',
  hypothesis: 'Allowing users to send a Firefox Mobile link via SMS will result in a better conversion rate',
  startDate: '2017-01-01',
  subjectAttributes: ['account', 'forceExperimentGroup', 'uniqueUserId'],
  independentVariables: ['sendSms'],
  eligibilityFunction: function (subject) {
    if (! subject || ! subject.account || ! subject.uniqueUserId) {
      return false;
    }

    // Everyone is in this experiment.
    return true;
  },

  groupingFunction: function (subject) {
    function isEmailInTreatment (email) {
      return /@softvision\.(com|ro)$/.test(email) ||
             /@mozilla\.(com|org)$/.test(email);
    }

    var GROUPS = ['control', 'treatment'];
    var choice = this.uniformChoice(GROUPS, subject.uniqueUserId);

    if (subject.forceExperimentGroup) {
      choice = subject.forceExperimentGroup;
    } else if (isEmailInTreatment(subject.account.get('email'))) {
      choice = 'treatment';
    }

    return {
      sendSms: choice
    };
  }
};
