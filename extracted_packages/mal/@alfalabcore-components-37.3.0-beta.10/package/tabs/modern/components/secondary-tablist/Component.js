import React from 'react';
import cn from 'classnames';
import { Tag } from '../../../../tag/modern';
import { useTabs } from '../../hooks/use-tabs.js';
import { ScrollableContainer } from '../scrollable-container/Component.js';
import 'compute-scroll-into-view';

const SecondaryTabList = ({ styles = {}, className, containerClassName, size, titles = [], selectedId = titles.length ? titles[0].id : undefined, scrollable = true, fullWidthScroll, tagSize = 'xs', onChange, dataTestId, }) => {
    const { focusedTab, selectedTab, getTabListItemProps } = useTabs({
        titles,
        selectedId,
        onChange,
    });
    const renderContent = () => (React.createElement("div", { role: 'tablist', "data-test-id": dataTestId, className: cn(styles.component, className, size && styles[size], {
            [styles.fullWidthScroll]: fullWidthScroll,
        }) }, titles.map((item, index) => {
        if (item.hidden)
            return null;
        return (React.createElement(Tag, { ...getTabListItemProps(index), key: item.id, className: cn(styles.title, item.toggleClassName), checked: item.id === selectedId, size: tagSize, rightAddons: item.rightAddons }, item.title));
    })));
    return scrollable ? (React.createElement(ScrollableContainer, { activeChild: focusedTab || selectedTab, containerClassName: containerClassName, fullWidthScroll: fullWidthScroll }, renderContent())) : (React.createElement("div", { className: cn(styles.container, containerClassName) }, renderContent()));
};

export { SecondaryTabList };
