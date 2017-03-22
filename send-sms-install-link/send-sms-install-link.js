'use strict';

module.exports = {
  name: 'Should the user see the "Send install link via SMS" screen',
  hypothesis: 'Allowing users to send a Firefox Mobile link via SMS will result in a better conversion rate',
  startDate: '2017-01-01',
  subjectAttributes: ['account', 'forceExperiment', 'forceExperimentGroup', 'uniqueUserId'],
  independentVariables: ['sendSms'],
  eligibilityFunction: function (subject) {
    function isInExperiment (forceExperiment, email) {
      return forceExperiment === 'sendSms' ||
        // The regexps are duplicated in the groupingFunction because
        // there is no way to share code between the two.
        /@softvision\.(com|ro)$/.test(email) ||
        /@mozilla\.(com|org)$/.test(email);
    }

    if (! subject || ! subject.account || ! subject.uniqueUserId) {
      return false;
    }

    if (isInExperiment(subject.forceExperiment, subject.account.get('email'))) {
      return true;
    }

    // a random sampling of 5% of all sessions.
    // 2.5% will be in the control group,
    // 2.5% in the treatment group.
    return this.bernoulliTrial(0.05, subject.uniqueUserId);
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
