var tslib_es6 = require('../../tslib.es6-0e9bf404.js');
var React = require('react');
var components_primaryTablist_Component = require('./Component.js');
var styles = require('./index.module.css');
require('classnames');
require('../../../../badge/cssm');
require('../../../../keyboard-focusable/cssm');
require('../../../../picker-button/cssm/desktop');
require('../../hooks/use-tablist-titles.js');
require('@alfalab/hooks');
require('../../hooks/use-collapsible-elements.js');
require('@juggle/resize-observer');
require('../../hooks/use-tabs.js');
require('../../synthetic-events.js');
require('../scrollable-container/Component.js');
require('compute-scroll-into-view');
require('../scrollable-container/index.module.css');
require('../title/Component.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var PrimaryTabListDesktop = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 'm' : _b, restProps = tslib_es6.__rest(_a, ["size"]);
    return (React__default.default.createElement(components_primaryTablist_Component.PrimaryTabList, tslib_es6.__assign({}, restProps, { size: size, styles: styles__default.default })));
};

exports.PrimaryTabListDesktop = PrimaryTabListDesktop;
