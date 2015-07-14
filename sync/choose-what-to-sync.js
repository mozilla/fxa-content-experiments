'use strict';

module.exports = {
  name: 'sync chooser switch mode',
  hypothesis: 'choosing what to sync is better on the web',
  startDate: '2015-01-01',
  subjectAttributes: ['uniqueUserId', 'forceChooseWhatToSyncMode'],
  independentVariables: ['chooseWhatToSyncMode'],
  eligibilityFunction: function (subject) {
    var eligible = this.bernoulliTrial(0.5, subject.uniqueUserId);

    if (subject.forceChooseWhatToSyncMode) {
      eligible = true;
    }

    return eligible;
  },
  groupingFunction: function (subject) {
    var CHOOSER_CHOICES = ['web_v1', 'client'];
    var choice = this.uniformChoice(CHOOSER_CHOICES, subject.uniqueUserId);

    if (subject.forceChooseWhatToSyncMode) {
      choice = subject.forceChooseWhatToSyncMode;
    }

    return {
      chooseWhatToSyncMode: choice
    };
  }
};
