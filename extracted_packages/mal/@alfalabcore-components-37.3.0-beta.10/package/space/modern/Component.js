import React__default, { forwardRef, Children } from 'react';
import classNames from 'classnames';
import Item from './Item.js';

const styles = {"spaceContainer":"space__spaceContainer_cnkv3","spaceContainerFullWidth":"space__spaceContainerFullWidth_cnkv3","vertical":"space__vertical_cnkv3","center":"space__center_cnkv3","start":"space__start_cnkv3","end":"space__end_cnkv3","spaceItemFullWidth":"space__spaceItemFullWidth_cnkv3","spaceItem":"space__spaceItem_cnkv3"};
require('./index.css');

const SpaceSizes = {
    s: 12,
    m: 16,
    l: 20,
};
const getNumberSize = (size) => (typeof size === 'string' ? SpaceSizes[size] : size || 0);
/**
 * Позаимствовано с благодарностью из Ant Design
 */
const Space = forwardRef((props, ref) => {
    const { children, className, align = 'start', direction = 'vertical', size = 'm', wrap = false, divider = false, fullWidth = false, dataTestId, } = props;
    const [horizontalSize, verticalSize] = React__default.useMemo(() => (Array.isArray(size) ? size : [size, size]).map((item) => getNumberSize(item)), [size]);
    const childNodes = Children.toArray(children);
    if (childNodes.length === 0) {
        return null;
    }
    const directionClassName = styles[direction];
    const alignClassName = styles[align];
    const containerClassName = classNames(styles.spaceContainer, directionClassName, {
        [alignClassName]: align,
        [styles.spaceContainerFullWidth]: fullWidth,
    }, className);
    const itemClassName = classNames(styles.spaceItem, {
        [styles.spaceItemFullWidth]: fullWidth,
    });
    const nodes = childNodes.map((child, i) => (
    /* eslint-disable react/no-array-index-key */
    React__default.createElement(Item, { className: itemClassName, key: `${itemClassName}-${i}`, direction: direction, horizontalSize: horizontalSize, verticalSize: verticalSize, length: childNodes.length, index: i, wrap: wrap, divider: divider }, child)
    /* eslint-enable */
    ));
    return (React__default.createElement("div", { "data-test-id": dataTestId, className: containerClassName, style: {
            ...(wrap && { flexWrap: 'wrap', marginBottom: -verticalSize }),
        }, ref: ref }, nodes));
});

export { Space };
