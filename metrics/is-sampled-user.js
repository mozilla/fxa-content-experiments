'use strict';

module.exports = {
  name: 'determine whether the user is sampled by the internal metrics infrastructure',
  startDate: '2015-01-01',
  subjectAttributes: ['uniqueUserId', 'env'],
  independentVariables: ['isSampledUser'],
  eligibilityFunction: function (subject) {
    var sampleRate = subject.env === 'development' ? 1.0 : 0.1;

    return !! (subject.env && subject.uniqueUserId && this.bernoulliTrial(sampleRate, subject.uniqueUserId));
  },
  groupingFunction: function () {
    return {
      isSampledUser: true
    };
  }
};
