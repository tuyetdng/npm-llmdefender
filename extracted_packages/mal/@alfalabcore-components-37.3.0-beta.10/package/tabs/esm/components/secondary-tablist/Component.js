import { a as __assign } from '../../tslib.es6-3f4e7063.js';
import React from 'react';
import cn from 'classnames';
import { Tag } from '../../../../tag/esm';
import { useTabs } from '../../hooks/use-tabs.js';
import { ScrollableContainer } from '../scrollable-container/Component.js';
import 'compute-scroll-into-view';

var SecondaryTabList = function (_a) {
    var _b = _a.styles, styles = _b === void 0 ? {} : _b, className = _a.className, containerClassName = _a.containerClassName, size = _a.size, _c = _a.titles, titles = _c === void 0 ? [] : _c, _d = _a.selectedId, selectedId = _d === void 0 ? titles.length ? titles[0].id : undefined : _d, _e = _a.scrollable, scrollable = _e === void 0 ? true : _e, fullWidthScroll = _a.fullWidthScroll, _f = _a.tagSize, tagSize = _f === void 0 ? 'xs' : _f, onChange = _a.onChange, dataTestId = _a.dataTestId;
    var _g = useTabs({
        titles: titles,
        selectedId: selectedId,
        onChange: onChange,
    }), focusedTab = _g.focusedTab, selectedTab = _g.selectedTab, getTabListItemProps = _g.getTabListItemProps;
    var renderContent = function () {
        var _a;
        return (React.createElement("div", { role: 'tablist', "data-test-id": dataTestId, className: cn(styles.component, className, size && styles[size], (_a = {},
                _a[styles.fullWidthScroll] = fullWidthScroll,
                _a)) }, titles.map(function (item, index) {
            if (item.hidden)
                return null;
            return (React.createElement(Tag, __assign({}, getTabListItemProps(index), { key: item.id, className: cn(styles.title, item.toggleClassName), checked: item.id === selectedId, size: tagSize, rightAddons: item.rightAddons }), item.title));
        })));
    };
    return scrollable ? (React.createElement(ScrollableContainer, { activeChild: focusedTab || selectedTab, containerClassName: containerClassName, fullWidthScroll: fullWidthScroll }, renderContent())) : (React.createElement("div", { className: cn(styles.container, containerClassName) }, renderContent()));
};

export { SecondaryTabList };
