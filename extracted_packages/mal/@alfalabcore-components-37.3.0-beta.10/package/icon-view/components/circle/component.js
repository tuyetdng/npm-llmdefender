var tslib_es6 = require('../../tslib.es6-33d53048.js');
var React = require('react');
var components_baseShape_component = require('../base-shape/component.js');
var components_circle_paths = require('./paths.js');
require('classnames');
require('../base-shape/utils.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var Circle = React.forwardRef(function (props, ref) { return (React__default.default.createElement(components_baseShape_component.BaseShape, tslib_es6.__assign({}, props, { pathsMap: components_circle_paths.pathsMap, ref: ref }))); });

exports.Circle = Circle;
