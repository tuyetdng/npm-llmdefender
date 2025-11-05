var components_baseConfirmation_component = require('./component-3c591970.js');
var React = require('react');
require('classnames');
require('@alfalab/hooks');
require('./context.js');
require('./utils.js');
require('./types.js');
require('./components/screens/initial/component.js');
require('../../button/cssm');
require('../../code-input/cssm');
require('../../link/cssm');
require('../../typography/cssm');
require('./components/header/component.js');
require('./components/header/index.module.css');
require('./components/screens/initial/countdown-section.js');
require('../../loader/cssm');
require('./components/screens/initial/index.module.css');
require('./components/screens/hint/component.js');
require('./components/screens/hint/index.module.css');
require('./components/screens/fatal-error/component.js');
require('./components/screens/fatal-error/index.module.css');
require('./components/screens/temp-block/component.js');
require('./components/countdown-loader/component.js');
require('./components/countdown-loader/index.module.css');
require('./components/screens/temp-block/index.module.css');
require('./components/base-confirmation/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var ConfirmationDesktop = function (props) { return (React__default.default.createElement(components_baseConfirmation_component.BaseConfirmation, components_baseConfirmation_component.__assign({}, props))); };

exports.ConfirmationDesktop = ConfirmationDesktop;
