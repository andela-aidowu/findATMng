'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var atmSchema = new Schema({
  bank_name: {
    type: String,
    required: 'Please enter a bank name',
  },
  address: {
    type: String,
    address: 'Please enter the address of the ATM',
    trim: true
  },
  state: {
    type: String,
    required: 'Please enter a state in Nigeria'
  },
  coords: {
    type: [Number], 
    index: '2dsphere',
    required: 'Input the longitude and latitude of the ATM'
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String,
    default: ''
  }
});

mongoose.model('ATM', atmSchema);