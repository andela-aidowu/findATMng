'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var bankSchema = new Schema({
  _id: {
    type: Number,
    required: 'Please enter an id',
    unique: true
  },
  name: {
    type: String
  }
});

var stateSchema = new Schema({
  _id: {
    type: Number,
    unique: true
  },
  name: {
    type: String
  }
});

var atmSchema = new Schema({
  bank_name: {
    type: Number,
    ref: 'Bank',
    required: 'Please enter a bank id'
  },
  address: {
    type: String,
    address: 'Please enter the address of the ATM',
    trim: true
  },
  state: {
    type: Number,
    ref: 'State',
    required: 'Please enter a state id'
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
  },
  estimate: {
    type: Boolean,
    default: false
  }
});
atmSchema.add({
  distance: {
    type: Number,
    default: ''
  },
  updatedOn: {
    type: Date, 
    default: Date.now
  }
});

mongoose.model('Bank', bankSchema);
mongoose.model('State', stateSchema);
mongoose.model('ATM', atmSchema);