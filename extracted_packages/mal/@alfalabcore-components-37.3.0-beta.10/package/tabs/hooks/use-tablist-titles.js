var tslib_es6 = require('../tslib.es6-73852ed9.js');
var React = require('react');
var hooks = require('@alfalab/hooks');
var hooks_useCollapsibleElements = require('./use-collapsible-elements.js');
var hooks_useTabs = require('./use-tabs.js');
require('@juggle/resize-observer');

var useTablistTitles = function (_a) {
    var _b = _a.titles, titles = _b === void 0 ? [] : _b, selectedId = _a.selectedId, collapsible = _a.collapsible, collapsedTabsIds = _a.collapsedTabsIds, breakpoint = _a.breakpoint, onChange = _a.onChange;
    var _c = hooks_useCollapsibleElements.useCollapsibleElements('[role=tab]', [titles]), containerRef = _c.containerRef, addonRef = _c.addonRef, idsCollapsedElements = _c.idsCollapsedElements;
    var view = hooks.useMedia([['desktop', "(min-width: ".concat(breakpoint, "px)")]], 'desktop')[0];
    var tablistTitles = React.useMemo(function () {
        var idsCollapsedTitles = [];
        var idsCollapsed = idsCollapsedElements.concat(collapsedTabsIds || []);
        if (view === 'desktop' && collapsible) {
            var visibleTitles = titles.filter(function (_a) {
                var id = _a.id;
                return !idsCollapsed.includes(String(id));
            });
            var lastVisibleTitle_1 = collapsedTabsIds
                ? null
                : visibleTitles[visibleTitles.length - 1];
            idsCollapsed.forEach(function (id) {
                if (selectedId === id && lastVisibleTitle_1) {
                    idsCollapsedTitles.push(String(lastVisibleTitle_1.id));
                }
                if (selectedId !== id) {
                    idsCollapsedTitles.push(id);
                }
            });
        }
        var titlesMapped = titles.map(function (title) { return (tslib_es6.__assign(tslib_es6.__assign({}, title), { collapsed: idsCollapsedTitles.includes(String(title.id)), selected: title.id === selectedId })); });
        if (collapsedTabsIds === null || collapsedTabsIds === void 0 ? void 0 : collapsedTabsIds.length) {
            titlesMapped.sort(function (a, b) {
                var hasA = collapsedTabsIds.includes(String(a.id));
                var hasB = collapsedTabsIds.includes(String(b.id));
                if (hasA === hasB) {
                    return 0;
                }
                return hasA ? 1 : -1;
            });
        }
        return titlesMapped.sort(function (a, b) {
            if (a.collapsed === b.collapsed) {
                return 0;
            }
            return a.collapsed ? 1 : -1;
        });
    }, [collapsedTabsIds, idsCollapsedElements, view, collapsible, titles, selectedId]);
    var _d = hooks_useTabs.useTabs({
        titles: tablistTitles,
        selectedId: selectedId,
        onChange: onChange,
    }), selectedTab = _d.selectedTab, focusedTab = _d.focusedTab, getTabListItemProps = _d.getTabListItemProps;
    return {
        containerRef: containerRef,
        addonRef: addonRef,
        tablistTitles: tablistTitles,
        selectedTab: selectedTab,
        focusedTab: focusedTab,
        getTabListItemProps: getTabListItemProps,
    };
};

exports.useTablistTitles = useTablistTitles;
