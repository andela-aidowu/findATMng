'use strict';

module.exports = function(app) {
  var express = require('express');
  var atms = require('../../app/controllers/atms.server.controller');
  var router = express.Router();
  app.use('/api/v2', router);
  // router.use();
    router.route('/atms/search')
      .get(atms.queryATM);
    router.route('/atms')
      .get(atms.ATMByDistance)
      .post(atms.createATM);
    router.route('/atms/:id')
      .get(atms.getOneATM)
      .post(atms.updateATM)
      .delete(atms.deleteATM)
};
