'use strict';

module.exports = {
  name: 'Is the devices list settings section visible',
  startDate: '2015-01-01',
  subjectAttributes: ['forceDeviceList', 'isMetricsEnabledValue'],
  independentVariables: ['deviceListVisible'],
  eligibilityFunction: function (subject) {
    if (subject) {
      if (subject.isMetricsEnabledValue || subject.forceDeviceList) {
        return true;
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
