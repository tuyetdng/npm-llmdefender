'use strict';

var styles = require('!!css-loader!@alfalab/core-components/themes/corp.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

// eslint-disable-next-line import/no-webpack-loader-syntax
var corp = styles__default.default.toString();

module.exports = corp;
