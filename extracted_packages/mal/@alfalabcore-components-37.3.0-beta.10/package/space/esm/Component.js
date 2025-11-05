import { I as Item, _ as __assign } from './Item-6bc05881.js';
import React__default, { forwardRef, Children } from 'react';
import classNames from 'classnames';

var styles = {"spaceContainer":"space__spaceContainer_cnkv3","spaceContainerFullWidth":"space__spaceContainerFullWidth_cnkv3","vertical":"space__vertical_cnkv3","center":"space__center_cnkv3","start":"space__start_cnkv3","end":"space__end_cnkv3","spaceItemFullWidth":"space__spaceItemFullWidth_cnkv3","spaceItem":"space__spaceItem_cnkv3"};
require('./index.css');

var SpaceSizes = {
    s: 12,
    m: 16,
    l: 20,
};
var getNumberSize = function (size) { return (typeof size === 'string' ? SpaceSizes[size] : size || 0); };
/**
 * Позаимствовано с благодарностью из Ant Design
 */
var Space = forwardRef(function (props, ref) {
    var _a, _b;
    var children = props.children, className = props.className, _c = props.align, align = _c === void 0 ? 'start' : _c, _d = props.direction, direction = _d === void 0 ? 'vertical' : _d, _e = props.size, size = _e === void 0 ? 'm' : _e, _f = props.wrap, wrap = _f === void 0 ? false : _f, _g = props.divider, divider = _g === void 0 ? false : _g, _h = props.fullWidth, fullWidth = _h === void 0 ? false : _h, dataTestId = props.dataTestId;
    var _j = React__default.useMemo(function () {
        return (Array.isArray(size) ? size : [size, size]).map(function (item) {
            return getNumberSize(item);
        });
    }, [size]), horizontalSize = _j[0], verticalSize = _j[1];
    var childNodes = Children.toArray(children);
    if (childNodes.length === 0) {
        return null;
    }
    var directionClassName = styles[direction];
    var alignClassName = styles[align];
    var containerClassName = classNames(styles.spaceContainer, directionClassName, (_a = {},
        _a[alignClassName] = align,
        _a[styles.spaceContainerFullWidth] = fullWidth,
        _a), className);
    var itemClassName = classNames(styles.spaceItem, (_b = {},
        _b[styles.spaceItemFullWidth] = fullWidth,
        _b));
    var nodes = childNodes.map(function (child, i) { return (
    /* eslint-disable react/no-array-index-key */
    React__default.createElement(Item, { className: itemClassName, key: "".concat(itemClassName, "-").concat(i), direction: direction, horizontalSize: horizontalSize, verticalSize: verticalSize, length: childNodes.length, index: i, wrap: wrap, divider: divider }, child)
    /* eslint-enable */
    ); });
    return (React__default.createElement("div", { "data-test-id": dataTestId, className: containerClassName, style: __assign({}, (wrap && { flexWrap: 'wrap', marginBottom: -verticalSize })), ref: ref }, nodes));
});

export { Space };
