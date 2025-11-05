var tslib_es6 = require('../../tslib.es6-19b064c1.js');
var React = require('react');
var components_baseShape_component = require('../base-shape/component.js');
var components_superEllipse_paths = require('./paths.js');
require('classnames');
require('../base-shape/utils.js');
require('../base-shape/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var SuperEllipse = React.forwardRef(function (props, ref) { return (React__default.default.createElement(components_baseShape_component.BaseShape, tslib_es6.__assign({}, props, { pathsMap: components_superEllipse_paths.pathsMap, ref: ref }))); });

exports.SuperEllipse = SuperEllipse;
