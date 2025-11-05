var Component = require('./Component.js');
require('react');
require('react-merge-refs');
require('react-textarea-autosize');
require('classnames');
require('../../form-control/cssm');
require('../../scrollbar/cssm');
require('@alfalab/hooks');
require('./components/PseudoTextArea.js');
require('./index.module.css');
require('./default.module.css');
require('./inverted.module.css');



exports.Textarea = Component.Textarea;
exports.getDefaultCounterText = Component.getDefaultCounterText;
