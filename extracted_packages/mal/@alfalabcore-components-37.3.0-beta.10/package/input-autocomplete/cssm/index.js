var Component_desktop = require('./Component.desktop.js');
var Component_responsive = require('./Component.responsive.js');
require('./tslib.es6-bbd6cd2a.js');
require('react');
require('../../select/cssm');
require('./autocomplete-field/Component.js');
require('react-merge-refs');
require('classnames');
require('../../input/cssm');
require('./autocomplete-field/index.module.css');
require('@alfalab/hooks');
require('./Component.mobile.js');
require('lodash.throttle');
require('../../button/cssm');
require('./autocomplete-mobile-field/Component.js');
require('../../form-control/cssm');
require('./autocomplete-mobile-field/index.module.css');
require('./mobile.module.css');



exports.InputAutocomplete = Component_desktop.InputAutocompleteDesktop;
exports.InputAutocompleteResponsive = Component_responsive.InputAutocompleteResponsive;
