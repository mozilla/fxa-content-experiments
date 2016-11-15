'use strict';

module.exports = {
  name: 'The account blocked SUMO link',
  startDate: '2015-01-01',
  independentVariables: ['blockedSigninSupportUrl'],
  eligibilityFunction: function (subject) {
    return true;
  },
  groupingFunction: function (subject) {
    return {
      blockedSigninSupportUrl: 'https://support.mozilla.org/kb/accounts-blocked'
    };
  }
};
