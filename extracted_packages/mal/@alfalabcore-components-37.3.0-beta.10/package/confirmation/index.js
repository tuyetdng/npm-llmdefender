var component_desktop = require('./component.desktop.js');
var component_responsive = require('./component.responsive.js');
var components_screens_initial_component = require('./components/screens/initial/component.js');
var components_screens_hint_component = require('./components/screens/hint/component.js');
var components_screens_fatalError_component = require('./components/screens/fatal-error/component.js');
var components_screens_tempBlock_component = require('./components/screens/temp-block/component.js');
var components_countdownLoader_component = require('./components/countdown-loader/component.js');
var context = require('./context.js');
var types = require('./types.js');
var utils = require('./utils.js');
require('./component-d80d765d.js');
require('react');
require('classnames');
require('@alfalab/hooks');
require('../button');
require('../code-input');
require('../link');
require('../typography');
require('./components/header/component.js');
require('./countdown-section-d076e0d4.js');
require('../loader');
require('./component.mobile.js');



exports.Confirmation = component_desktop.ConfirmationDesktop;
exports.ConfirmationResponsive = component_responsive.ConfirmationResponsive;
exports.Initial = components_screens_initial_component.Initial;
exports.Hint = components_screens_hint_component.Hint;
exports.FatalError = components_screens_fatalError_component.FatalError;
exports.TempBlock = components_screens_tempBlock_component.TempBlock;
exports.CountdownLoader = components_countdownLoader_component.CountdownLoader;
exports.ConfirmationContext = context.ConfirmationContext;
exports.defaultTexts = types.defaultTexts;
exports.ONE_DAY = utils.ONE_DAY;
exports.ONE_MINUTE = utils.ONE_MINUTE;
exports.formatMsAsMinutes = utils.formatMsAsMinutes;
exports.useConfirmation = utils.useConfirmation;
exports.useCountdown = utils.useCountdown;
