var tslib_es6 = require('../../tslib.es6-73852ed9.js');
var React = require('react');
var components_secondaryTablist_Component = require('./Component.js');
var index_module = require('../../index.module-2dc94418.js');
require('classnames');
require('../../../tag');
require('../../hooks/use-tabs.js');
require('../scrollable-container/Component.js');
require('compute-scroll-into-view');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var SecondaryTabListDesktop = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 's' : _b, restProps = tslib_es6.__rest(_a, ["size"]);
    return (React__default.default.createElement(components_secondaryTablist_Component.SecondaryTabList, tslib_es6.__assign({}, restProps, { size: size, styles: index_module.commonStyles, tagSize: size })));
};

exports.SecondaryTabListDesktop = SecondaryTabListDesktop;
