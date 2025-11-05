var tslib_es6 = require('../../tslib.es6-0e9bf404.js');
var React = require('react');
var components_secondaryTablist_Component = require('./Component.js');
var commonStyles = require('./index.module.css');
require('classnames');
require('../../../../tag/cssm');
require('../../hooks/use-tabs.js');
require('../scrollable-container/Component.js');
require('compute-scroll-into-view');
require('../scrollable-container/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var commonStyles__default = /*#__PURE__*/_interopDefaultCompat(commonStyles);

var SecondaryTabListDesktop = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 's' : _b, restProps = tslib_es6.__rest(_a, ["size"]);
    return (React__default.default.createElement(components_secondaryTablist_Component.SecondaryTabList, tslib_es6.__assign({}, restProps, { size: size, styles: commonStyles__default.default, tagSize: size })));
};

exports.SecondaryTabListDesktop = SecondaryTabListDesktop;
