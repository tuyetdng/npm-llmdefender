import React, { useRef, useEffect, useMemo } from 'react';
import cn from 'classnames';
import { Badge } from '../../../../badge/modern';
import { KeyboardFocusable } from '../../../../keyboard-focusable/modern';
import { PickerButtonDesktop } from '../../../../picker-button/modern/desktop';
import { useTablistTitles } from '../../hooks/use-tablist-titles.js';
import { createSyntheticMouseEvent } from '../../synthetic-events.js';
import { ScrollableContainer } from '../scrollable-container/Component.js';
import { Title } from '../title/Component.js';
import '@alfalab/hooks';
import '@juggle/resize-observer';
import 'compute-scroll-into-view';
import '../../hooks/use-collapsible-elements.js';
import '../../hooks/use-tabs.js';

const PrimaryTabList = ({ size, styles = {}, className, containerClassName, titles = [], selectedId = titles.length ? titles[0].id : undefined, scrollable = true, collapsible, collapsedTabsIds, fullWidthScroll, onChange, dataTestId, breakpoint = 1024, }) => {
    const lineRef = useRef(null);
    const { containerRef, addonRef, tablistTitles, selectedTab, focusedTab, getTabListItemProps } = useTablistTitles({
        titles,
        selectedId,
        collapsible,
        collapsedTabsIds,
        breakpoint,
        onChange,
    });
    useEffect(() => {
        if (selectedTab && lineRef.current) {
            lineRef.current.style.width = `${selectedTab.offsetWidth}px`;
            lineRef.current.style.transform = `translateX(${selectedTab.offsetLeft}px)`;
        }
    }, [selectedTab, tablistTitles]);
    const collapsedOptions = useMemo(() => tablistTitles.reduce((options, title) => {
        if (title.collapsed) {
            options.push({
                key: title.title,
                value: title.id,
                content: React.createElement(Title, { ...title, styles: styles, isOption: true }),
            });
        }
        return options;
    }, []), [tablistTitles, styles]);
    const collapsedAddonsLength = tablistTitles.filter((title) => title.collapsed && title.rightAddons).length;
    const handleOptionsChange = (payload) => {
        if (payload.selected?.value && onChange) {
            const nativeMouseEvent = new MouseEvent('change');
            const syntheticMouseEvent = createSyntheticMouseEvent(nativeMouseEvent);
            onChange(syntheticMouseEvent, { selectedId: payload.selected.value });
        }
    };
    const renderContent = () => (React.createElement("div", { role: 'tablist', "data-test-id": dataTestId, className: cn(styles.component, className, size && styles[size], {
            [styles.fullWidthScroll]: fullWidthScroll,
        }) },
        tablistTitles.map((title, index) => (React.createElement(KeyboardFocusable, { key: title.id }, (ref, focused) => (React.createElement(Title, { ...getTabListItemProps(index, ref), ...title, focused: focused, styles: styles }))))),
        collapsedOptions.length ? (React.createElement("span", { ref: addonRef, role: 'tablist', className: styles.pickerWrapper },
            React.createElement(PickerButtonDesktop, { fieldClassName: styles.title, optionClassName: cn(styles.pickerOption, size && styles[size]), options: collapsedOptions, onChange: handleOptionsChange, rightAddons: collapsedAddonsLength ? (React.createElement(Badge, { view: 'count', content: collapsedAddonsLength })) : null, size: 'l', view: 'ghost', label: '\u0415\u0449\u0451', popoverPosition: 'bottom-end' }))) : null,
        React.createElement("div", { className: styles.line, ref: lineRef })));
    return scrollable && !collapsible ? (React.createElement(ScrollableContainer, { activeChild: focusedTab || selectedTab, containerClassName: containerClassName, fullWidthScroll: fullWidthScroll }, renderContent())) : (React.createElement("div", { ref: containerRef, className: cn(styles.container, containerClassName) }, renderContent()));
};

export { PrimaryTabList };
