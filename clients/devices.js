'use strict';

module.exports = {
  name: 'Is the devices list settings section visible',
  startDate: '2015-01-01',
  subjectAttributes: ['forceDeviceList', 'uid'],
  independentVariables: ['deviceListVisible'],
  eligibilityFunction: function (subject) {
    var sampleRate = 0.1;

    if (subject) {
      if (subject.forceDeviceList) {
        return true;
      }

      if (subject.uid) {
        return !! (this.bernoulliTrial(sampleRate, subject.uid));
      }
    }

    return false;
  },
  groupingFunction: function (subject) {
    return {
      deviceListVisible: true
    };
  }
};
