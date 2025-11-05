var tslib_es6 = require('../../tslib.es6-9c29edce.js');
var React = require('react');
var cn = require('classnames');
var components_content_Component = require('./Component.js');
require('../../Context.js');
require('../../../base-modal');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"content":"side-panel__content_1ecix"};
require('./mobile.css');

var ContentMobile = function (_a) {
    var className = _a.className, restProps = tslib_es6.__rest(_a, ["className"]);
    return (React__default.default.createElement(components_content_Component.Content, tslib_es6.__assign({ className: cn__default.default(className, styles.content) }, restProps)));
};

exports.ContentMobile = ContentMobile;
