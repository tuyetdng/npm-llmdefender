var components_baseConfirmation_component = require('./component-d80d765d.js');
var React = require('react');
var cn = require('classnames');
require('@alfalab/hooks');
require('./context.js');
require('./utils.js');
require('./types.js');
require('./components/screens/initial/component.js');
require('../button');
require('../code-input');
require('../link');
require('../typography');
require('./components/header/component.js');
require('./countdown-section-d076e0d4.js');
require('../loader');
require('./components/screens/hint/component.js');
require('./components/screens/fatal-error/component.js');
require('./components/screens/temp-block/component.js');
require('./components/countdown-loader/component.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"container":"confirmation__container_n8i7v"};
require('./mobile.css');

var ConfirmationMobile = function (_a) {
    var className = _a.className, resProps = components_baseConfirmation_component.__rest(_a, ["className"]);
    return (React__default.default.createElement(components_baseConfirmation_component.BaseConfirmation, components_baseConfirmation_component.__assign({ mobile: true, className: cn__default.default(className, styles.container) }, resProps)));
};

exports.ConfirmationMobile = ConfirmationMobile;
