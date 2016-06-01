'use strict';

module.exports = {
  name: 'verification ab experiment chooser',
  hypothesis: 'keeps verification experiments independent',
  startDate: '2015-01-01',
  subjectAttributes: ['uniqueUserId', 'isMetricsEnabledValue', 'forceExperiment'],
  independentVariables: ['chooseAbExperiment'],
  eligibilityFunction: function (subject) {
    if (subject) {
      if (subject.forceExperiment) {
        return true;
      }

      if (subject.isMetricsEnabledValue) {
        // a random sampling of 50% of sessions (of 10% of sampled user base) will be in the verification experiments
        return this.bernoulliTrial(0.5, subject.uniqueUserId);
      }
    }

    return false;
  },
  groupingFunction: function (subject) {
    var EXPERIMENT_CHOICES = ['mailcheck', 'showPassword'];
    var choice = this.uniformChoice(EXPERIMENT_CHOICES, subject.uniqueUserId);

    if (subject.forceExperiment) {
      choice = subject.forceExperiment;
    }

    return {
      chooseAbExperiment: choice
    };
  }
};
