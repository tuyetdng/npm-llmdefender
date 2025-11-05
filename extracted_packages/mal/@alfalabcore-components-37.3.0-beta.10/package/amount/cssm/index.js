var pure_component = require('./pure/component.js');
var component = require('./component.js');
require('react');
require('classnames');
require('@alfalab/utils');
require('./pure/index.module.css');
require('./index.module.css');

var Amount = component.Amount;
Amount.Pure = pure_component.PureAmount;

exports.Amount = Amount;
