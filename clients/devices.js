'use strict';

module.exports = {
  name: 'Is the devices list settings section visible',
  startDate: '2015-01-01',
  subjectAttributes: ['forceDeviceList'],
  independentVariables: ['deviceListVisible'],
  eligibilityFunction: function (subject) {
    if (subject && subject.forceDeviceList) {
      return true;
    }

    return false;
  },
  groupingFunction: function (subject) {
    return {
      deviceListVisible: true
    };
  }
};
