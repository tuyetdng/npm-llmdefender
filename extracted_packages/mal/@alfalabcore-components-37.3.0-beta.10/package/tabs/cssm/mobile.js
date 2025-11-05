var components_primaryTablist_Component_mobile = require('./components/primary-tablist/Component.mobile.js');
var components_scrollableContainer_Component = require('./components/scrollable-container/Component.js');
var components_secondaryTablist_Component_mobile = require('./components/secondary-tablist/Component.mobile.js');
var components_tab_Component = require('./components/tab/Component.js');
var components_tabs_Component_mobile = require('./components/tabs/Component.mobile.js');
var hooks_useTabs = require('./hooks/use-tabs.js');
require('./tslib.es6-0e9bf404.js');
require('react');
require('classnames');
require('./components/primary-tablist/Component.js');
require('../../badge/cssm');
require('../../keyboard-focusable/cssm');
require('../../picker-button/cssm/desktop');
require('./hooks/use-tablist-titles.js');
require('@alfalab/hooks');
require('./hooks/use-collapsible-elements.js');
require('@juggle/resize-observer');
require('./synthetic-events.js');
require('./components/title/Component.js');
require('compute-scroll-into-view');
require('./components/scrollable-container/index.module.css');
require('./components/primary-tablist/index.module.css');
require('./components/primary-tablist/mobile.module.css');
require('./components/secondary-tablist/Component.js');
require('../../tag/cssm');
require('./components/secondary-tablist/index.module.css');
require('./components/secondary-tablist/mobile.module.css');
require('./components/tab/index.module.css');
require('./components/tabs/Component.js');



exports.PrimaryTabListMobile = components_primaryTablist_Component_mobile.PrimaryTabListMobile;
exports.ScrollableContainer = components_scrollableContainer_Component.ScrollableContainer;
exports.SecondaryTabListMobile = components_secondaryTablist_Component_mobile.SecondaryTabListMobile;
exports.Tab = components_tab_Component.Tab;
exports.TabsMobile = components_tabs_Component_mobile.TabsMobile;
exports.useTabs = hooks_useTabs.useTabs;
