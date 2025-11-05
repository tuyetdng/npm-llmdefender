var tslib_es6 = require('../tslib.es6-bbd6cd2a.js');
var React = require('react');
var title_component = require('../title/component.js');
var commonStyles = require('../title/common.module.css');
var styles = require('./index.module.css');
require('classnames');
require('../colors.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var commonStyles__default = /*#__PURE__*/_interopDefaultCompat(commonStyles);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var TitleMobile = function (props) { return (
/**
 * Если поменять Object.assign на деструктуризацию, то упадут тесты.
 * Видимо, это особенность работы jest и css-modules.
 */
React__default.default.createElement(title_component.Title, tslib_es6.__assign({}, props, { styles: Object.assign(commonStyles__default.default, styles__default.default) }))); };

exports.TitleMobile = TitleMobile;
