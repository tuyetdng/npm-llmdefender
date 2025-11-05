import React from 'react';
import cn from 'classnames';

const styles = {"component":"generic-wrapper__component_11ffm","column":"generic-wrapper__column_11ffm","align-stretch":"generic-wrapper__align-stretch_11ffm","align-start":"generic-wrapper__align-start_11ffm","align-end":"generic-wrapper__align-end_11ffm","align-center":"generic-wrapper__align-center_11ffm","align-baseline":"generic-wrapper__align-baseline_11ffm","justify-center":"generic-wrapper__justify-center_11ffm","justify-between":"generic-wrapper__justify-between_11ffm","justify-around":"generic-wrapper__justify-around_11ffm","justify-evenly":"generic-wrapper__justify-evenly_11ffm","justify-start":"generic-wrapper__justify-start_11ffm","justify-end":"generic-wrapper__justify-end_11ffm","grow":"generic-wrapper__grow_11ffm","padding-top-3xs":"generic-wrapper__padding-top-3xs_11ffm","padding-top-2xs":"generic-wrapper__padding-top-2xs_11ffm","padding-top-xs":"generic-wrapper__padding-top-xs_11ffm","padding-top-s":"generic-wrapper__padding-top-s_11ffm","padding-top-m":"generic-wrapper__padding-top-m_11ffm","padding-top-l":"generic-wrapper__padding-top-l_11ffm","padding-top-xl":"generic-wrapper__padding-top-xl_11ffm","padding-right-3xs":"generic-wrapper__padding-right-3xs_11ffm","padding-right-2xs":"generic-wrapper__padding-right-2xs_11ffm","padding-right-xs":"generic-wrapper__padding-right-xs_11ffm","padding-right-s":"generic-wrapper__padding-right-s_11ffm","padding-right-m":"generic-wrapper__padding-right-m_11ffm","padding-right-l":"generic-wrapper__padding-right-l_11ffm","padding-right-xl":"generic-wrapper__padding-right-xl_11ffm","padding-bottom-3xs":"generic-wrapper__padding-bottom-3xs_11ffm","padding-bottom-2xs":"generic-wrapper__padding-bottom-2xs_11ffm","padding-bottom-xs":"generic-wrapper__padding-bottom-xs_11ffm","padding-bottom-s":"generic-wrapper__padding-bottom-s_11ffm","padding-bottom-m":"generic-wrapper__padding-bottom-m_11ffm","padding-bottom-l":"generic-wrapper__padding-bottom-l_11ffm","padding-bottom-xl":"generic-wrapper__padding-bottom-xl_11ffm","padding-left-3xs":"generic-wrapper__padding-left-3xs_11ffm","padding-left-2xs":"generic-wrapper__padding-left-2xs_11ffm","padding-left-xs":"generic-wrapper__padding-left-xs_11ffm","padding-left-s":"generic-wrapper__padding-left-s_11ffm","padding-left-m":"generic-wrapper__padding-left-m_11ffm","padding-left-l":"generic-wrapper__padding-left-l_11ffm","padding-left-xl":"generic-wrapper__padding-left-xl_11ffm"};
require('./index.css');

const GenericWrapper = ({ children, padding, alignItems, justifyContent, className, dataTestId, column = false, grow = false, }) => {
    const paddingStyles = padding && {
        [styles[`padding-top-${padding.top}`]]: padding.top,
        [styles[`padding-right-${padding.right}`]]: padding.right,
        [styles[`padding-bottom-${padding.bottom}`]]: padding.bottom,
        [styles[`padding-left-${padding.left}`]]: padding.left,
    };
    const alignmentStyles = alignItems && styles[`align-${alignItems}`];
    const justifyContentStyles = justifyContent && styles[`justify-${justifyContent}`];
    const growStyles = grow && styles.grow;
    const columnsStyles = column && styles.column;
    return (React.createElement("div", { className: cn(styles.component, columnsStyles, alignmentStyles, paddingStyles, justifyContentStyles, growStyles, className), "data-test-id": dataTestId }, children));
};

export { GenericWrapper };
