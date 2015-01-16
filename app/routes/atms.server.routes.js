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
      .post(atms.addState);
    router.route('/')
      .get(atms.ATMByDistance)
      .post(atms.createATM);
    router.route('/:id')
      .get(atms.getOneATM)
      .put(atms.updateATM)
      .delete(atms.deleteATM);
};
