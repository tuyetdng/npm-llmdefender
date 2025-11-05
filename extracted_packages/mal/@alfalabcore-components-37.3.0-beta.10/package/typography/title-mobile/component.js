var colors_module = require('../colors.module-f2db4c0a.js');
var React = require('react');
var title_component = require('../title/component.js');
var common_module = require('../common.module-9e0238a7.js');
require('classnames');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var styles = {"styrene-xlarge":"typography__styrene-xlarge_1pauw","styrene-large":"typography__styrene-large_1pauw","styrene-medium":"typography__styrene-medium_1pauw","styrene-small":"typography__styrene-small_1pauw","styrene-xsmall":"typography__styrene-xsmall_1pauw","system-xlarge":"typography__system-xlarge_1pauw","system-large":"typography__system-large_1pauw","system-medium":"typography__system-medium_1pauw","system-small":"typography__system-small_1pauw","system-xsmall":"typography__system-xsmall_1pauw"};
require('./index.css');

var TitleMobile = function (props) { return (
/**
 * Если поменять Object.assign на деструктуризацию, то упадут тесты.
 * Видимо, это особенность работы jest и css-modules.
 */
React__default.default.createElement(title_component.Title, colors_module.__assign({}, props, { styles: Object.assign(common_module.commonStyles, styles) }))); };

exports.TitleMobile = TitleMobile;
