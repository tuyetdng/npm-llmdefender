import React from 'react';
import cn from 'classnames';
import { Typography } from '../../../../typography/modern';

const styles = {"tooltip":"chart__tooltip_1tjmf","tooltipList":"chart__tooltipList_1tjmf","tooltipItem":"chart__tooltipItem_1tjmf","tooltipArrow":"chart__tooltipArrow_1tjmf","tooltipArrowRight":"chart__tooltipArrowRight_1tjmf"};
require('./index.css');

const TooltipContent = ({ payload, separator, label, tooltipArrowSide, arrow, series, labelFormatter, labelStyle, }) => {
    if (!label || payload.length === 0)
        return null;
    return (React.createElement("div", { className: cn(styles.tooltip) },
        arrow && (React.createElement("span", { className: cn(styles.tooltipArrow, tooltipArrowSide ? '' : styles.tooltipArrowRight) })),
        React.createElement("ul", { className: cn(styles.tooltipList) },
            React.createElement("li", { className: cn(styles.tooltipItem), style: labelStyle },
                React.createElement(Typography.Text, { view: 'primary-medium', tag: 'span', weight: 'medium', className: cn(styles.tooltipLabel) }, labelFormatter ? labelFormatter(label) : label)),
            payload.map((entry) => {
                const data = series.find((d) => d.properties.dataKey === entry.dataKey);
                if (data?.hideTooltip || data?.hide)
                    return null;
                return (React.createElement("li", { className: cn(styles.tooltipItem), key: entry.dataKey, style: { color: entry.color } },
                    React.createElement(Typography.Text, { view: 'primary-medium', tag: 'span', weight: 'medium', className: cn(styles.tooltipValue) },
                        entry?.formatter ? entry.formatter(entry.value) : entry.value,
                        separator || ' '),
                    React.createElement(Typography.Text, { view: 'secondary-large', tag: 'span', className: cn(styles.tooltipName) }, `${entry.name}`)));
            }))));
};

export { TooltipContent };
