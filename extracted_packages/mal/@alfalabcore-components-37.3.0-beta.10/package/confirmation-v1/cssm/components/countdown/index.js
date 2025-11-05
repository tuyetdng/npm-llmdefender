var components_countdown_component = require('./component.js');
require('react');
require('classnames');
require('../../../../button/cssm');
require('@alfalab/hooks');
require('@alfalab/utils');
require('../countdown-loader/component.js');
require('../countdown-loader/index.module.css');
require('./index.module.css');



exports.Countdown = components_countdown_component.Countdown;
exports.formatMsAsMinutes = components_countdown_component.formatMsAsMinutes;
