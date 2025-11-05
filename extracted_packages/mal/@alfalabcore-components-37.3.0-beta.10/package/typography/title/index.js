var colors_module = require('../colors.module-f2db4c0a.js');
var React = require('react');
var title_component = require('./component.js');
var common_module = require('../common.module-9e0238a7.js');
require('classnames');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var styles = {"styrene-xlarge":"typography__styrene-xlarge_17h0l","styrene-large":"typography__styrene-large_17h0l","styrene-medium":"typography__styrene-medium_17h0l","styrene-small":"typography__styrene-small_17h0l","styrene-xsmall":"typography__styrene-xsmall_17h0l","system-xlarge":"typography__system-xlarge_17h0l","system-large":"typography__system-large_17h0l","system-medium":"typography__system-medium_17h0l","system-small":"typography__system-small_17h0l","system-xsmall":"typography__system-xsmall_17h0l","margins-xlarge":"typography__margins-xlarge_17h0l","margins-large":"typography__margins-large_17h0l","margins-medium":"typography__margins-medium_17h0l","margins-small":"typography__margins-small_17h0l","margins-xsmall":"typography__margins-xsmall_17h0l"};
require('./index.css');

var Title = function (props) { return (
/**
 * Если поменять Object.assign на деструктуризацию, то упадут тесты.
 * Видимо, это особенность работы jest и css-modules.
 */
React__default.default.createElement(title_component.Title, colors_module.__assign({}, props, { styles: Object.assign(common_module.commonStyles, styles) }))); };

exports.Title = Title;
