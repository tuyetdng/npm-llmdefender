var tslib_es6 = require('../../tslib.es6-73852ed9.js');
var React = require('react');
var components_primaryTablist_Component_desktop = require('../primary-tablist/Component.desktop.js');
var components_secondaryTablist_Component_desktop = require('../secondary-tablist/Component.desktop.js');
var components_tabs_Component = require('./Component.js');
require('../primary-tablist/Component.js');
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
require('../../index.module-5aa5df6f.js');
require('../secondary-tablist/Component.js');
require('../../../tag');
require('../../index.module-2dc94418.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var views = {
    primary: components_primaryTablist_Component_desktop.PrimaryTabListDesktop,
    secondary: components_secondaryTablist_Component_desktop.SecondaryTabListDesktop,
};
var TabsDesktop = function (_a) {
    var _b = _a.view, view = _b === void 0 ? 'primary' : _b, _c = _a.scrollable, scrollable = _c === void 0 ? false : _c, _d = _a.size, size = _d === void 0 ? view === 'primary' ? 'm' : 's' : _d, restProps = tslib_es6.__rest(_a, ["view", "scrollable", "size"]);
    return (React__default.default.createElement(components_tabs_Component.Tabs, tslib_es6.__assign({ TabList: views[view], scrollable: scrollable, size: size }, restProps)));
};

exports.TabsDesktop = TabsDesktop;
