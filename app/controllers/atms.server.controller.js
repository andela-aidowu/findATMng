'use strict';

var mongoose = require('mongoose'),
    ATM = mongoose.model('ATM');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var theEarth = (function() {
  var earthRaduis = 6371; //km, miles is 3959

  var getDistanceFromRads = function(rads) {
    return parseFloat(rads * earthRaduis);
  };

  var getRadsFromDistance = function(distance) {
    return parseFloat(distance / earthRaduis);
  };

  return {
    getDistanceFromRads : getDistanceFromRads,
    getRadsFromDistance : getRadsFromDistance
  };
})();

exports.createATM = function(req, res) {
  ATM.create({
    bank_name: req.body.bank_name,
    address: req.body.address,
    state: req.body.state,
    coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
  }, function(err, atm) {
    if (err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, atm);
    }
  });
};

exports.ATMByDistance = function(req, res) {
  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);
  var maxDistance = parseFloat(req.query.maxDistance);
  var point = {
    type: 'Point',
    coordinates: [lng, lat]
  };
  var geoOptions = {
    spherical: true,
    maxDistance: theEarth.getRadsFromDistance(maxDistance),
  };
  if (!lng && lng !==0 || !lat && lat !==0) {
    sendJsonResponse(res, 404, {
      'message': 'lng and lat query parameters are required'
    });
    return;
  }
  ATM.geoNear(point, geoOptions, function (err, results, stats) {
    var atms = [];
    if (err) {
      sendJsonResponse(res, 404, err);
    } else {
      results.forEach(function(doc) {
      atms.push({
        distance: theEarth.getDistanceFromRads(doc.dis),
        bank_name: doc.obj.bank_name,
        address: doc.obj.address,
        state: doc.obj.state,
        _id: doc.obj._id
        });
      });
      sendJsonResponse(res, 200, atms);
    }
  });
};

exports.getOneATM = function(req, res) {
  if (req.params && req.params.atmid) {
    ATM
      .findById(req.params.atmid)
      .exec(function(err, atm) {
        if (!atm) {
          sendJsonResponse(res, 404, {'message': 'atmid not found'});
          return;
        } else if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        sendJsonResponse(res, 200, atm);
      });
  } else {
    sendJsonResponse(res, 404, {'message': 'No atmid in request'});
  }
};

exports.updateATM = function(req, res) {
  if (!req.params.atmid) {
    sendJsonResponse(res, 404, {'message': 'Not found, atmid is required"'});
    return;
  }
  ATM
    .findById(req.params.atmid)
    .exec(function (err, atm) {
      if (!atm) {
        sendJsonResponse(res, 404, {'message': 'atmid not found'});
        return;
      }
      atm.bank = req.body.bank_name || atm.bank_name;
      atm.address = req.body.address || atm.address;
      atm.state = req.body.state || atm.state;
      atm.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)] || atm.coords;
      atm.save(function(err, atm) {
        if(err) {
          sendJsonResponse(res, 404, err);
        } else {
          sendJsonResponse(res, 200, atm);
        }
      });
    });
};

exports.deleteATM = function(req, res) {
  var atmid = req.params.atmid;
  if (atmid) {
    ATM
      .findByIdAndRemove(atmid)
      .exec(function(err, atm) {
        if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        sendJsonResponse(res, 204, null);
      }); 
  } else {
    sendJsonResponse(res, 404, {'message': 'No atmid'});
  }
};

exports.queryATM = function(req, res) {
  var obj = {};
  var bankName = req.query.bank;
  var stateValue = req.query.state;
  if (bankName && stateValue) {
    obj.bank_name = bankName;
    obj.state = stateValue;
    ATM
      .find(obj)
      .exec(function(err, atms) {
        if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        sendJsonResponse(res, 200, atms);
      });
  } else if (bankName) {
    obj.bank_name = bankName;
    ATM
      .find(obj)
      .exec(function(err, atms) {
        if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        sendJsonResponse(res, 200, atms);
      });
  } else if (stateValue) {
    obj.state = stateValue;
    ATM
      .find(obj)
      .exec(function(err, atms) {
        if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
          sendJsonResponse(res, 200, atms);
        });
  } else if (!bankName && !stateValue) {
    ATM
      .find(obj)
      .exec(function(err, atms) {
        if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        sendJsonResponse(res, 200, atms);
      });
  }
};