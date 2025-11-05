var components_baseConfirmation_component = require('./component-3c591970.js');
var React = require('react');
var hooks = require('@alfalab/hooks');
var component_desktop = require('./component.desktop.js');
var component_mobile = require('./component.mobile.js');
require('classnames');
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
require('./mobile.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var ConfirmationResponsive = function (_a) {
    var _b = _a.breakpoint, breakpoint = _b === void 0 ? 1024 : _b, restProps = components_baseConfirmation_component.__rest(_a, ["breakpoint"]);
    var view = hooks.useMedia([
        ['mobile', "(max-width: ".concat(breakpoint - 1, "px)")],
        ['desktop', "(min-width: ".concat(breakpoint, "px)")],
    ], 'desktop')[0];
    return view === 'desktop' ? (React__default.default.createElement(component_desktop.ConfirmationDesktop, components_baseConfirmation_component.__assign({}, restProps))) : (React__default.default.createElement(component_mobile.ConfirmationMobile, components_baseConfirmation_component.__assign({}, restProps)));
};

exports.ConfirmationResponsive = ConfirmationResponsive;
