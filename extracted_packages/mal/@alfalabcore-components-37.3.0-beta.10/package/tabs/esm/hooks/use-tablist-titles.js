import { a as __assign } from '../tslib.es6-3f4e7063.js';
import { useMemo } from 'react';
import { useMedia } from '@alfalab/hooks';
import { useCollapsibleElements } from './use-collapsible-elements.js';
import { useTabs } from './use-tabs.js';
import '@juggle/resize-observer';

var useTablistTitles = function (_a) {
    var _b = _a.titles, titles = _b === void 0 ? [] : _b, selectedId = _a.selectedId, collapsible = _a.collapsible, collapsedTabsIds = _a.collapsedTabsIds, breakpoint = _a.breakpoint, onChange = _a.onChange;
    var _c = useCollapsibleElements('[role=tab]', [titles]), containerRef = _c.containerRef, addonRef = _c.addonRef, idsCollapsedElements = _c.idsCollapsedElements;
    var view = useMedia([['desktop', "(min-width: ".concat(breakpoint, "px)")]], 'desktop')[0];
    var tablistTitles = useMemo(function () {
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
        var titlesMapped = titles.map(function (title) { return (__assign(__assign({}, title), { collapsed: idsCollapsedTitles.includes(String(title.id)), selected: title.id === selectedId })); });
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
    var _d = useTabs({
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

export { useTablistTitles };
