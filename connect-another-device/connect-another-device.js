'use strict';

module.exports = {
  name: 'Should the user see the "connect another device" screen',
  hypothesis: 'A nudge to connect another device will help increase multi-device users',
  startDate: '2015-01-01',
  subjectAttributes: [],
  independentVariables: ['connectAnotherDevice'],
  eligibilityFunction: function (subject) {
    return true;
  },

  groupingFunction: function (subject) {
    return {
      connectAnotherDevice: 'treatment'
    };
  }
};
