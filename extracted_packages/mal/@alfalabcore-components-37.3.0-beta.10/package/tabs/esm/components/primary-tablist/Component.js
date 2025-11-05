import { a as __assign } from '../../tslib.es6-3f4e7063.js';
import React, { useRef, useEffect, useMemo } from 'react';
import cn from 'classnames';
import { Badge } from '../../../../badge/esm';
import { KeyboardFocusable } from '../../../../keyboard-focusable/esm';
import { PickerButtonDesktop } from '../../../../picker-button/esm/desktop';
import { useTablistTitles } from '../../hooks/use-tablist-titles.js';
import { createSyntheticMouseEvent } from '../../synthetic-events.js';
import { ScrollableContainer } from '../scrollable-container/Component.js';
import { Title } from '../title/Component.js';
import '@alfalab/hooks';
import '@juggle/resize-observer';
import 'compute-scroll-into-view';
import '../../hooks/use-collapsible-elements.js';
import '../../hooks/use-tabs.js';

var PrimaryTabList = function (_a) {
    var size = _a.size, _b = _a.styles, styles = _b === void 0 ? {} : _b, className = _a.className, containerClassName = _a.containerClassName, _c = _a.titles, titles = _c === void 0 ? [] : _c, _d = _a.selectedId, selectedId = _d === void 0 ? titles.length ? titles[0].id : undefined : _d, _e = _a.scrollable, scrollable = _e === void 0 ? true : _e, collapsible = _a.collapsible, collapsedTabsIds = _a.collapsedTabsIds, fullWidthScroll = _a.fullWidthScroll, onChange = _a.onChange, dataTestId = _a.dataTestId, _f = _a.breakpoint, breakpoint = _f === void 0 ? 1024 : _f;
    var lineRef = useRef(null);
    var _g = useTablistTitles({
        titles: titles,
        selectedId: selectedId,
        collapsible: collapsible,
        collapsedTabsIds: collapsedTabsIds,
        breakpoint: breakpoint,
        onChange: onChange,
    }), containerRef = _g.containerRef, addonRef = _g.addonRef, tablistTitles = _g.tablistTitles, selectedTab = _g.selectedTab, focusedTab = _g.focusedTab, getTabListItemProps = _g.getTabListItemProps;
    useEffect(function () {
        if (selectedTab && lineRef.current) {
            lineRef.current.style.width = "".concat(selectedTab.offsetWidth, "px");
            lineRef.current.style.transform = "translateX(".concat(selectedTab.offsetLeft, "px)");
        }
    }, [selectedTab, tablistTitles]);
    var collapsedOptions = useMemo(function () {
        return tablistTitles.reduce(function (options, title) {
            if (title.collapsed) {
                options.push({
                    key: title.title,
                    value: title.id,
                    content: React.createElement(Title, __assign({}, title, { styles: styles, isOption: true })),
                });
            }
            return options;
        }, []);
    }, [tablistTitles, styles]);
    var collapsedAddonsLength = tablistTitles.filter(function (title) { return title.collapsed && title.rightAddons; }).length;
    var handleOptionsChange = function (payload) {
        var _a;
        if (((_a = payload.selected) === null || _a === void 0 ? void 0 : _a.value) && onChange) {
            var nativeMouseEvent = new MouseEvent('change');
            var syntheticMouseEvent = createSyntheticMouseEvent(nativeMouseEvent);
            onChange(syntheticMouseEvent, { selectedId: payload.selected.value });
        }
    };
    var renderContent = function () {
        var _a;
        return (React.createElement("div", { role: 'tablist', "data-test-id": dataTestId, className: cn(styles.component, className, size && styles[size], (_a = {},
                _a[styles.fullWidthScroll] = fullWidthScroll,
                _a)) },
            tablistTitles.map(function (title, index) { return (React.createElement(KeyboardFocusable, { key: title.id }, function (ref, focused) { return (React.createElement(Title, __assign({}, getTabListItemProps(index, ref), title, { focused: focused, styles: styles }))); })); }),
            collapsedOptions.length ? (React.createElement("span", { ref: addonRef, role: 'tablist', className: styles.pickerWrapper },
                React.createElement(PickerButtonDesktop, { fieldClassName: styles.title, optionClassName: cn(styles.pickerOption, size && styles[size]), options: collapsedOptions, onChange: handleOptionsChange, rightAddons: collapsedAddonsLength ? (React.createElement(Badge, { view: 'count', content: collapsedAddonsLength })) : null, size: 'l', view: 'ghost', label: '\u0415\u0449\u0451', popoverPosition: 'bottom-end' }))) : null,
            React.createElement("div", { className: styles.line, ref: lineRef })));
    };
    return scrollable && !collapsible ? (React.createElement(ScrollableContainer, { activeChild: focusedTab || selectedTab, containerClassName: containerClassName, fullWidthScroll: fullWidthScroll }, renderContent())) : (React.createElement("div", { ref: containerRef, className: cn(styles.container, containerClassName) }, renderContent()));
};

export { PrimaryTabList };
