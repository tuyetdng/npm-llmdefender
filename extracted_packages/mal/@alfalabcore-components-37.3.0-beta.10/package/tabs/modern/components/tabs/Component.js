import React, { cloneElement } from 'react';

const Tabs = ({ TabList, className, containerClassName, size, defaultMatch, children, selectedId, scrollable, collapsible, collapsedTabsIds, fullWidthScroll = false, keepMounted = false, dataTestId, onChange, }) => {
    const tabsArray = React.Children.toArray(children);
    const titles = tabsArray.map(({ props: { title, id, rightAddons, disabled, hidden, toggleClassName } }) => ({
        title,
        id,
        disabled,
        rightAddons,
        hidden,
        toggleClassName,
    }));
    const tabs = tabsArray.filter((tab) => tab.props.id === selectedId || tab.props.keepMounted || keepMounted);
    return (React.createElement("div", { className: className },
        React.createElement(TabList, { containerClassName: containerClassName, size: size, titles: titles, selectedId: selectedId, scrollable: scrollable, collapsible: collapsible, collapsedTabsIds: collapsedTabsIds, onChange: onChange, dataTestId: dataTestId, defaultMatch: defaultMatch, fullWidthScroll: fullWidthScroll }),
        tabs.map((tab) => cloneElement(tab, { hidden: tab.props.id !== selectedId }))));
};

export { Tabs };
