'use strict';

module.exports = function(app) {
  var express = require('express');
  var atms = require('../../app/controllers/atms.server.controller');
  var router = express.Router();
  app.use('/api/v1/atms', router);
  // router.use();
    router.route('/search')
      .get(atms.queryATM);
    router.route('/states')
      .get(atms.getStates)
      .post(atms.addState);
    router.route('/banks')
      .get(atms.getBanks)
      .post(atms.addBank);
    router.route('/')
      .get(atms.getAllAtms)
      .post(atms.createATM);
    router.route('/:atmid')
      .get(atms.getOneATM)
      .put(atms.updateATM)
      .delete(atms.deleteATM);
    router.route('/user/:userid')
      .get(atms.getUserAtms);
};
