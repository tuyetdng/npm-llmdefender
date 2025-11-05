import React, { Children } from 'react';
import cn from 'classnames';

const styles = {"list":"list__list_keujd","orderedList":"list__orderedList_keujd","lowerAlpha":"list__lowerAlpha_keujd","decimal":"list__decimal_keujd","item":"list__item_keujd","unorderedItem":"list__unorderedItem_keujd","orderedItem":"list__orderedItem_keujd","slot":"list__slot_keujd"};
require('./index.css');

const List = ({ tag = 'ul', marker, className, dataTestId, children, ...restProps }) => {
    const markerType = marker || (tag === 'ul' ? '—' : 'decimal');
    const orderedMarker = markerType === 'decimal' || markerType === 'lower-alpha';
    const Component = tag === 'ol' || orderedMarker ? 'ol' : 'ul';
    const unorderedList = Component === 'ul';
    const orderedList = Component === 'ol';
    const listClassNames = cn(styles.list, {
        [styles.lowerAlpha]: markerType === 'lower-alpha',
        [styles.decimal]: markerType === 'decimal',
        [styles.orderedList]: orderedList,
    }, className);
    const itemClassNames = cn(styles.item, {
        [styles.unorderedItem]: unorderedList,
        [styles.orderedItem]: orderedList,
    });
    return (React.createElement(Component, { className: listClassNames, "data-test-id": dataTestId, ...restProps }, Children.map(children, (child) => (React.createElement("li", { className: itemClassNames },
        unorderedList && React.createElement("div", { className: styles.slot }, markerType),
        child)))));
};

export { List };
