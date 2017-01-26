'use strict';

module.exports = {
  name: 'Should the user see the "connect another device" screen',
  hypothesis: 'A nudge to connect another device will help increase multi-device users',
  startDate: '2015-01-01',
  subjectAttributes: ['uniqueUserId', 'forceExperiment', 'forceExperimentGroup'],
  independentVariables: ['connectAnotherDevice'],
  eligibilityFunction: function (subject) {
    if (! subject) {
      return false;
    }

    if (subject.forceExperiment === 'connectAnotherDevice') {
      return true;
    }

    // Place 50% of users into the two buckets, meaning the feature
    // will be enabled for ~25% of users. 'isMetricsEnabledValue' is
    // ignored, we have sufficiently high numbers that we'll assume
    // an equal number of users who have metrics enabled are in each
    // bucket. This assumption is measured in DataDog.
    return this.bernoulliTrial(0.5, subject.uniqueUserId);
  },

  groupingFunction: function (subject) {
    var GROUPS = ['control', 'treatment'];
    var choice = this.uniformChoice(GROUPS, subject.uniqueUserId);

    if (subject.forceExperimentGroup) {
      choice = subject.forceExperimentGroup;
    }

    return {
      connectAnotherDevice: choice
    };
  }
};
