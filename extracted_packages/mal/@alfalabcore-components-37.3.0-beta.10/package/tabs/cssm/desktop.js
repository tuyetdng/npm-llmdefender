var components_primaryTablist_Component_desktop = require('./components/primary-tablist/Component.desktop.js');
var components_scrollableContainer_Component = require('./components/scrollable-container/Component.js');
var components_secondaryTablist_Component_desktop = require('./components/secondary-tablist/Component.desktop.js');
var components_tab_Component = require('./components/tab/Component.js');
var components_tabs_Component_desktop = require('./components/tabs/Component.desktop.js');
var hooks_useTabs = require('./hooks/use-tabs.js');
var hooks_useCollapsibleElements = require('./hooks/use-collapsible-elements.js');
require('./tslib.es6-0e9bf404.js');
require('react');
require('./components/primary-tablist/Component.js');
require('classnames');
require('../../badge/cssm');
require('../../keyboard-focusable/cssm');
require('../../picker-button/cssm/desktop');
require('./hooks/use-tablist-titles.js');
require('@alfalab/hooks');
require('./synthetic-events.js');
require('./components/title/Component.js');
require('./components/primary-tablist/index.module.css');
require('compute-scroll-into-view');
require('./components/scrollable-container/index.module.css');
require('./components/secondary-tablist/Component.js');
require('../../tag/cssm');
require('./components/secondary-tablist/index.module.css');
require('./components/tab/index.module.css');
require('./components/tabs/Component.js');
require('@juggle/resize-observer');



exports.PrimaryTabListDesktop = components_primaryTablist_Component_desktop.PrimaryTabListDesktop;
exports.ScrollableContainer = components_scrollableContainer_Component.ScrollableContainer;
exports.SecondaryTabListDesktop = components_secondaryTablist_Component_desktop.SecondaryTabListDesktop;
exports.Tab = components_tab_Component.Tab;
exports.TabsDesktop = components_tabs_Component_desktop.TabsDesktop;
exports.useTabs = hooks_useTabs.useTabs;
exports.useCollapsibleElements = hooks_useCollapsibleElements.useCollapsibleElements;
