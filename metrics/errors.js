'use strict';

module.exports = {
  name: 'enables JavaScript Sentry error metrics',
  startDate: '2015-01-01',
  subjectAttributes: ['uniqueUserId', 'env'],
  independentVariables: ['sentryEnabled'],
  eligibilityFunction: function (subject) {
    var sampleRate = subject.env === 'development' ? 1.0 : 0.3;

    return !! (subject.env && subject.uniqueUserId && this.bernoulliTrial(sampleRate, subject.uniqueUserId));
  },
  groupingFunction: function () {
    return {
      sentryEnabled: true
    };
  }
};
