'use strict';

module.exports = {
  name: 'Should `Send SMS` be enabled for the given country?',
  hypothesis: 'Allow more countries!',
  startDate: '2017-01-01',
  subjectAttributes: ['account', 'country'],
  independentVariables: ['sendSmsEnabledForCountry'],
  eligibilityFunction: function (subject) {
    if (! subject || ! subject.account || ! subject.country) {
      return false;
    }

    function canEmailSendToRo (email) {
      return /@softvision\.(com|ro)$/.test(email) ||
             /@mozilla\.(com|org)$/.test(email);
    }

    var sendSmsEnabledForCountry = /^(CA|GB|RO|US)$/.test(subject.country);
    if (subject.country === 'RO') {
      // only Softvision and Mozilla emails
      // are allowed to send SMS to Romania.
      sendSmsEnabledForCountry = canEmailSendToRo(subject.account.get('email'));
    }

    return sendSmsEnabledForCountry;
  },

  groupingFunction: function () {
    return {
      sendSmsEnabledForCountry: true
    };
  }
};
