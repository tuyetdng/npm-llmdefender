var tslib_es6 = require('../../tslib.es6-0e9bf404.js');
var React = require('react');
var components_primaryTablist_Component_responsive = require('../primary-tablist/Component.responsive.js');
var components_secondaryTablist_Component_responsive = require('../secondary-tablist/Component.responsive.js');
var components_tabs_Component = require('./Component.js');
require('@alfalab/hooks');
require('../primary-tablist/Component.desktop.js');
require('../primary-tablist/Component.js');
require('classnames');
require('../../../../badge/cssm');
require('../../../../keyboard-focusable/cssm');
require('../../../../picker-button/cssm/desktop');
require('../../hooks/use-tablist-titles.js');
require('../../hooks/use-collapsible-elements.js');
require('@juggle/resize-observer');
require('../../hooks/use-tabs.js');
require('../../synthetic-events.js');
require('../scrollable-container/Component.js');
require('compute-scroll-into-view');
require('../scrollable-container/index.module.css');
require('../title/Component.js');
require('../primary-tablist/index.module.css');
require('../primary-tablist/Component.mobile.js');
require('../primary-tablist/mobile.module.css');
require('../secondary-tablist/Component.desktop.js');
require('../secondary-tablist/Component.js');
require('../../../../tag/cssm');
require('../secondary-tablist/index.module.css');
require('../secondary-tablist/Component.mobile.js');
require('../secondary-tablist/mobile.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var views = {
    primary: components_primaryTablist_Component_responsive.PrimaryTabListResponsive,
    secondary: components_secondaryTablist_Component_responsive.SecondaryTabListResponsive,
};
var TabsResponsive = function (_a) {
    var _b = _a.view, view = _b === void 0 ? 'primary' : _b, _c = _a.scrollable, scrollable = _c === void 0 ? false : _c, restProps = tslib_es6.__rest(_a, ["view", "scrollable"]);
    return React__default.default.createElement(components_tabs_Component.Tabs, tslib_es6.__assign({ TabList: views[view], scrollable: scrollable }, restProps));
};

exports.TabsResponsive = TabsResponsive;
