var tslib_es6 = require('../../tslib.es6-9c29edce.js');
var React = require('react');
var cn = require('classnames');
var components_content_Component = require('./Component.js');
require('../../Context.js');
require('../../../base-modal');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"s":"side-panel__s_8a8xv"};
require('./desktop.css');

var ContentDesktop = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 's' : _b, className = _a.className, restProps = tslib_es6.__rest(_a, ["size", "className"]);
    return React__default.default.createElement(components_content_Component.Content, tslib_es6.__assign({ className: cn__default.default(className, size && styles[size]) }, restProps));
};

exports.ContentDesktop = ContentDesktop;
