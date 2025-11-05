import React from 'react';
import cn from 'classnames';

var styles = {"component":"generic-wrapper__component_11ffm","column":"generic-wrapper__column_11ffm","align-stretch":"generic-wrapper__align-stretch_11ffm","align-start":"generic-wrapper__align-start_11ffm","align-end":"generic-wrapper__align-end_11ffm","align-center":"generic-wrapper__align-center_11ffm","align-baseline":"generic-wrapper__align-baseline_11ffm","justify-center":"generic-wrapper__justify-center_11ffm","justify-between":"generic-wrapper__justify-between_11ffm","justify-around":"generic-wrapper__justify-around_11ffm","justify-evenly":"generic-wrapper__justify-evenly_11ffm","justify-start":"generic-wrapper__justify-start_11ffm","justify-end":"generic-wrapper__justify-end_11ffm","grow":"generic-wrapper__grow_11ffm","padding-top-3xs":"generic-wrapper__padding-top-3xs_11ffm","padding-top-2xs":"generic-wrapper__padding-top-2xs_11ffm","padding-top-xs":"generic-wrapper__padding-top-xs_11ffm","padding-top-s":"generic-wrapper__padding-top-s_11ffm","padding-top-m":"generic-wrapper__padding-top-m_11ffm","padding-top-l":"generic-wrapper__padding-top-l_11ffm","padding-top-xl":"generic-wrapper__padding-top-xl_11ffm","padding-right-3xs":"generic-wrapper__padding-right-3xs_11ffm","padding-right-2xs":"generic-wrapper__padding-right-2xs_11ffm","padding-right-xs":"generic-wrapper__padding-right-xs_11ffm","padding-right-s":"generic-wrapper__padding-right-s_11ffm","padding-right-m":"generic-wrapper__padding-right-m_11ffm","padding-right-l":"generic-wrapper__padding-right-l_11ffm","padding-right-xl":"generic-wrapper__padding-right-xl_11ffm","padding-bottom-3xs":"generic-wrapper__padding-bottom-3xs_11ffm","padding-bottom-2xs":"generic-wrapper__padding-bottom-2xs_11ffm","padding-bottom-xs":"generic-wrapper__padding-bottom-xs_11ffm","padding-bottom-s":"generic-wrapper__padding-bottom-s_11ffm","padding-bottom-m":"generic-wrapper__padding-bottom-m_11ffm","padding-bottom-l":"generic-wrapper__padding-bottom-l_11ffm","padding-bottom-xl":"generic-wrapper__padding-bottom-xl_11ffm","padding-left-3xs":"generic-wrapper__padding-left-3xs_11ffm","padding-left-2xs":"generic-wrapper__padding-left-2xs_11ffm","padding-left-xs":"generic-wrapper__padding-left-xs_11ffm","padding-left-s":"generic-wrapper__padding-left-s_11ffm","padding-left-m":"generic-wrapper__padding-left-m_11ffm","padding-left-l":"generic-wrapper__padding-left-l_11ffm","padding-left-xl":"generic-wrapper__padding-left-xl_11ffm"};
require('./index.css');

var GenericWrapper = function (_a) {
    var _b;
    var children = _a.children, padding = _a.padding, alignItems = _a.alignItems, justifyContent = _a.justifyContent, className = _a.className, dataTestId = _a.dataTestId, _c = _a.column, column = _c === void 0 ? false : _c, _d = _a.grow, grow = _d === void 0 ? false : _d;
    var paddingStyles = padding && (_b = {},
        _b[styles["padding-top-".concat(padding.top)]] = padding.top,
        _b[styles["padding-right-".concat(padding.right)]] = padding.right,
        _b[styles["padding-bottom-".concat(padding.bottom)]] = padding.bottom,
        _b[styles["padding-left-".concat(padding.left)]] = padding.left,
        _b);
    var alignmentStyles = alignItems && styles["align-".concat(alignItems)];
    var justifyContentStyles = justifyContent && styles["justify-".concat(justifyContent)];
    var growStyles = grow && styles.grow;
    var columnsStyles = column && styles.column;
    return (React.createElement("div", { className: cn(styles.component, columnsStyles, alignmentStyles, paddingStyles, justifyContentStyles, growStyles, className), "data-test-id": dataTestId }, children));
};

export { GenericWrapper };
