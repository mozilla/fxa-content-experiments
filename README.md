# fxa-content-experiments

[![Build Status](https://travis-ci.org/mozilla/fxa-content-experiments.svg?branch=master)](https://travis-ci.org/mozilla/fxa-content-experiments)

Experiments for the fxa-content-server

## Deployment

The experiments are loaded from the fxa-content-server [production-experiments.json](https://github.com/mozilla/fxa-content-server/blob/master/server/config/production-experiments.json).

Once the experiments are merged into the `dev` branch in this repository, create a new branch for a particular train (such as `train-50` branch) and update the above `.json` configuration to load those experiments. 
