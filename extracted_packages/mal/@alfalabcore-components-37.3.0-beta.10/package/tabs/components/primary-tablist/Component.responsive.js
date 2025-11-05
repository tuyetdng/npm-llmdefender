var tslib_es6 = require('../../tslib.es6-73852ed9.js');
var React = require('react');
var hooks = require('@alfalab/hooks');
var components_primaryTablist_Component_desktop = require('./Component.desktop.js');
var components_primaryTablist_Component_mobile = require('./Component.mobile.js');
require('./Component.js');
require('classnames');
require('../../../badge');
require('../../../keyboard-focusable');
require('../../../picker-button/desktop');
require('../../hooks/use-tablist-titles.js');
require('../../hooks/use-collapsible-elements.js');
require('@juggle/resize-observer');
require('../../hooks/use-tabs.js');
require('../../synthetic-events.js');
require('../scrollable-container/Component.js');
require('compute-scroll-into-view');
require('../title/Component.js');
require('../../index.module-5aa5df6f.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var PrimaryTabListResponsive = function (_a) {
    var size = _a.size, _b = _a.defaultMatch, defaultMatch = _b === void 0 ? 'desktop' : _b, collapsible = _a.collapsible, collapsedTabsIds = _a.collapsedTabsIds, fullWidthScroll = _a.fullWidthScroll, restProps = tslib_es6.__rest(_a, ["size", "defaultMatch", "collapsible", "collapsedTabsIds", "fullWidthScroll"]);
    var view = hooks.useMedia([
        ['mobile', '(max-width: 767px)'],
        ['desktop', '(min-width: 768px)'],
    ], defaultMatch)[0];
    return view === 'desktop' ? (React__default.default.createElement(components_primaryTablist_Component_desktop.PrimaryTabListDesktop, tslib_es6.__assign({ collapsible: collapsible, collapsedTabsIds: collapsedTabsIds, size: size }, restProps))) : (React__default.default.createElement(components_primaryTablist_Component_mobile.PrimaryTabListMobile, tslib_es6.__assign({ fullWidthScroll: fullWidthScroll }, restProps)));
};

exports.PrimaryTabListResponsive = PrimaryTabListResponsive;
