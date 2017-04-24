'use strict';

module.exports = {
  name: 'Should the user see the "Send install link via SMS" screen',
  hypothesis: 'Allowing users to send a Firefox Mobile link via SMS will result in a better conversion rate',
  startDate: '2017-01-01',
  subjectAttributes: ['account', 'forceExperiment', 'forceExperimentGroup', 'isMetricsEnabledValue', 'uniqueUserId'],
  independentVariables: ['sendSms'],
  eligibilityFunction: function (subject) {
    function isInExperiment (forceExperiment, email) {
      return forceExperiment === 'sendSms' ||
        // The regexps are duplicated in the groupingFunction because
        // there is no way to share code between the two.
        /@softvision\.(com|ro)$/.test(email) ||
        /@mozilla\.(com|org)$/.test(email);
    }

    if (! subject || ! subject.account || ! subject.uniqueUserId) {
      return false;
    }

    if (isInExperiment(subject.forceExperiment, subject.account.get('email'))) {
      return true;
    }

    // enable for everyone who reports metrics to DataDog - 10% of the population
    // + 10 extra percent of the population who are not reporting to DataDog, for
    // a total of 20%.
    //
    // Getting 20% total percent when 10% is already chosen and selections
    // are independent is a bit strange. We start with the 10% that report
    // to DataDog, then add another 10%. Group A is the group who report to
    // DataDog, Group B is the 2nd selection. 10% of Group B will be a
    // part of Group A, so we have to ignore them and choose others in
    // their place. This means we have to choose > 10% of the general
    // population for Group B to arrive at 10% of the population
    // who are not already in Group A.
    if (subject.isMetricsEnabledValue) {
      return true;
    }

    // Enable for an additional 11.1111% of the population.
    //
    // N = total population
    // x = % to solve for.
    //
    // .2N = .1N + (xN - .1xN)
    // /\    /\     /\   /\
    // |     |      |    |
    // |     |      |     --- Group B also in Group A
    // |     |      --------- Group B
    // |     ---------------- Group A (people reporting to DataDog)
    // ---------------------- target
    //
    // .2N = .1N + .9xN
    // .1N = .9xN
    // .1N / .9N = x
    // .11111 = x
    return this.bernoulliTrial(0.1111, subject.uniqueUserId);
  },

  groupingFunction: function (subject) {
    function isEmailInTreatment (email) {
      return /@softvision\.(com|ro)$/.test(email) ||
             /@mozilla\.(com|org)$/.test(email);
    }

    var GROUPS = ['control', 'treatment'];
    var choice = this.uniformChoice(GROUPS, subject.uniqueUserId);

    if (subject.forceExperimentGroup) {
      choice = subject.forceExperimentGroup;
    } else if (isEmailInTreatment(subject.account.get('email'))) {
      choice = 'treatment';
    }

    return {
      sendSms: choice
    };
  }
};
