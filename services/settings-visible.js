'use strict';

module.exports = {
  name: 'Is the services list settings section visible',
  startDate: '2015-01-01',
  subjectAttributes: ['forceServicesList'],
  independentVariables: ['serviceListVisible'],
  eligibilityFunction: function (subject) {
    if (subject && subject.forceServicesList) {
      return true;
    }

    return false;
  },
  groupingFunction: function (subject) {
    return {
      serviceListVisible: true
    };
  }
};
