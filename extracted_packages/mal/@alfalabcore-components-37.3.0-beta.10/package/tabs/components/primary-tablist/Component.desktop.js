var tslib_es6 = require('../../tslib.es6-73852ed9.js');
var React = require('react');
var components_primaryTablist_Component = require('./Component.js');
var index_module = require('../../index.module-5aa5df6f.js');
require('classnames');
require('../../../badge');
require('../../../keyboard-focusable');
require('../../../picker-button/desktop');
require('../../hooks/use-tablist-titles.js');
require('@alfalab/hooks');
require('../../hooks/use-collapsible-elements.js');
require('@juggle/resize-observer');
require('../../hooks/use-tabs.js');
require('../../synthetic-events.js');
require('../scrollable-container/Component.js');
require('compute-scroll-into-view');
require('../title/Component.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var PrimaryTabListDesktop = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 'm' : _b, restProps = tslib_es6.__rest(_a, ["size"]);
    return (React__default.default.createElement(components_primaryTablist_Component.PrimaryTabList, tslib_es6.__assign({}, restProps, { size: size, styles: index_module.commonStyles })));
};

exports.PrimaryTabListDesktop = PrimaryTabListDesktop;
