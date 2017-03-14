'use strict';

module.exports = {
  name: 'Should the user see the "Send install link via SMS" screen',
  hypothesis: 'Allowing users to send a Firefox Mobile link via SMS will result in a better conversion rate',
  startDate: '2017-01-01',
  subjectAttributes: ['account'],
  independentVariables: ['sendSms'],
  eligibilityFunction: function (subject) {
    if (! subject || ! subject.account) {
      return false;
    }

    var email = subject.account.get('email') || '';
    if (/@softvision\.com$/.test(email)) {
      return true;
    } else if (/@mozilla\.(com|org)$/.test(email)) {
      return true;
    }

    return false;
  },

  groupingFunction: function (subject) {
    return {
      // while in testing, everyone that's eligible is in the treatment group.
      // we'll split people into treatment and control when rolled out to
      // the general population.
      sendSms: 'treatment'
    };
  }
};
