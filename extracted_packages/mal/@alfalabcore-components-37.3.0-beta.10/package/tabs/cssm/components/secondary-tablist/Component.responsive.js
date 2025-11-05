var tslib_es6 = require('../../tslib.es6-0e9bf404.js');
var React = require('react');
var hooks = require('@alfalab/hooks');
var components_secondaryTablist_Component_desktop = require('./Component.desktop.js');
var components_secondaryTablist_Component_mobile = require('./Component.mobile.js');
require('./Component.js');
require('classnames');
require('../../../../tag/cssm');
require('../../hooks/use-tabs.js');
require('../scrollable-container/Component.js');
require('compute-scroll-into-view');
require('../scrollable-container/index.module.css');
require('./index.module.css');
require('./mobile.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var SecondaryTabListResponsive = function (_a) {
    var size = _a.size, _b = _a.defaultMatch, defaultMatch = _b === void 0 ? 'desktop' : _b, fullWidthScroll = _a.fullWidthScroll, restProps = tslib_es6.__rest(_a, ["size", "defaultMatch", "fullWidthScroll"]);
    var view = hooks.useMedia([
        ['mobile', '(max-width: 767px)'],
        ['desktop', '(min-width: 768px)'],
    ], defaultMatch)[0];
    return view === 'desktop' ? (React__default.default.createElement(components_secondaryTablist_Component_desktop.SecondaryTabListDesktop, tslib_es6.__assign({ size: size }, restProps))) : (React__default.default.createElement(components_secondaryTablist_Component_mobile.SecondaryTabListMobile, tslib_es6.__assign({ fullWidthScroll: fullWidthScroll }, restProps)));
};

exports.SecondaryTabListResponsive = SecondaryTabListResponsive;
