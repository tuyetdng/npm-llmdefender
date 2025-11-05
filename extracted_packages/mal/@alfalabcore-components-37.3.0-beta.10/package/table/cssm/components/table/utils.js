var React = require('react');
var utils = require('../../utils.js');
var components_thead_Component = require('../thead/Component.js');
require('../../tslib.es6-bbd6cd2a.js');
require('classnames');
require('../thead/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

function findAllHeadCellsProps(children) {
    var result = [];
    React__default.default.Children.forEach(children, function (child) {
        if (utils.isChildInstanceOf(child, components_thead_Component.THead)) {
            React__default.default.Children.forEach(child.props.children, function (headChild) {
                result.push(headChild.props);
            });
        }
    });
    return result;
}

exports.findAllHeadCellsProps = findAllHeadCellsProps;
