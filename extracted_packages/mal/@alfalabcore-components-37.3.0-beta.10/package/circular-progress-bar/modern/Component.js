import React, { useMemo } from 'react';
import cn from 'classnames';
import { Typography } from '../../typography/modern';

const styles = {"component":"circular-progress-bar__component_17fl7","svg":"circular-progress-bar__svg_17fl7","title":"circular-progress-bar__title_17fl7","subtitle":"circular-progress-bar__subtitle_17fl7","labelWrapper":"circular-progress-bar__labelWrapper_17fl7","label":"circular-progress-bar__label_17fl7","typography":"circular-progress-bar__typography_17fl7","xxl":"circular-progress-bar__xxl_17fl7","xl":"circular-progress-bar__xl_17fl7","l":"circular-progress-bar__l_17fl7","m":"circular-progress-bar__m_17fl7","s":"circular-progress-bar__s_17fl7","xs":"circular-progress-bar__xs_17fl7","backgroundCircle":"circular-progress-bar__backgroundCircle_17fl7","progressCircle":"circular-progress-bar__progressCircle_17fl7","positive":"circular-progress-bar__positive_17fl7","negative":"circular-progress-bar__negative_17fl7","stroke":"circular-progress-bar__stroke_17fl7","bg-positive":"circular-progress-bar__bg-positive_17fl7","bg-negative":"circular-progress-bar__bg-negative_17fl7","iconWrapper":"circular-progress-bar__iconWrapper_17fl7","icon-tertiary":"circular-progress-bar__icon-tertiary_17fl7","icon-positive":"circular-progress-bar__icon-positive_17fl7","icon-negative":"circular-progress-bar__icon-negative_17fl7","icon-primary-inverted":"circular-progress-bar__icon-primary-inverted_17fl7","icon-primary":"circular-progress-bar__icon-primary_17fl7","icon-secondary":"circular-progress-bar__icon-secondary_17fl7","icon":"circular-progress-bar__icon_17fl7"};
require('./index.css');

const SIZES = {
    xs: 24,
    s: 48,
    m: 64,
    l: 80,
    xl: 128,
    xxl: 144,
};
const STROKE = {
    xs: 4,
    s: 4,
    m: 6,
    l: 8,
    xl: 10,
    xxl: 12,
};
const VIEW_TITLE = {
    xs: 'small',
    s: 'small',
    m: 'small',
    l: 'xsmall',
    xl: 'medium',
    xxl: 'medium',
};
const VIEW_TEXT = {
    xs: 'secondary-small',
    s: 'secondary-small',
    m: 'secondary-large',
    l: 'secondary-large',
    xl: 'secondary-large',
    xxl: 'secondary-large',
};
/**
 * Компонент круглого прогресс бара.
 */
const CircularProgressBar = ({ value, view = 'positive', size = 'm', className, dataTestId, title = value ? value.toString() : '0', titleComplete, subtitle, contentColor = 'secondary', subtitleComplete, stroke = true, fillComplete, icon: Icon, iconComplete: IconComplete, completeTextColor, completeIconColor = 'tertiary', direction = 'clockwise', height, children, }) => {
    const memorized = useMemo(() => {
        const strokeWidth = STROKE[size];
        const maxProgress = 100;
        const minProgress = 0;
        const widthSVG = SIZES[size];
        const heightSVG = SIZES[size];
        const center = widthSVG / 2;
        const radius = center - strokeWidth / 2;
        const circumference = Math.PI * radius * 2;
        const progress = Math.min(Math.max(value, minProgress), maxProgress);
        const strokeDasharray = circumference.toFixed(3);
        const strokeDashoffset = (((100 - progress) / 100) * circumference).toFixed(3);
        return {
            widthSVG,
            heightSVG,
            center,
            radius,
            strokeDasharray,
            strokeDashoffset,
        };
    }, [value, size]);
    const isComplete = value === 100;
    const isCompleteTextColor = isComplete && completeTextColor;
    const titleContent = titleComplete && isComplete ? titleComplete : title;
    const subtitleContent = subtitleComplete && isComplete ? subtitleComplete : subtitle;
    const IconComponent = IconComplete && isComplete ? IconComplete : Icon;
    const renderTitleString = () => SIZES[size] > 64 ? (React.createElement(Typography.TitleMobile, { className: cn(styles.typography, styles.title), color: isCompleteTextColor ? completeTextColor : contentColor, tag: 'div', font: 'system', view: VIEW_TITLE[size] }, titleContent)) : (React.createElement(Typography.Text, { className: styles.title, color: isCompleteTextColor ? completeTextColor : contentColor, tag: 'div', weight: 'bold', view: VIEW_TEXT[size] }, titleContent));
    const renderTitle = () => (typeof title === 'string' ? renderTitleString() : titleContent);
    const renderSubTitle = () => typeof subtitle === 'string' ? (React.createElement(Typography.Text, { tag: 'div', className: styles.subtitle, color: isCompleteTextColor ? completeTextColor : contentColor, view: 'primary-small' }, subtitleContent)) : (subtitleContent);
    const renderIcon = () => (React.createElement("span", { className: cn(styles.iconWrapper, styles[size], styles.tertiary, styles[`icon-${contentColor}`], {
            [styles[`icon-${completeIconColor}`]]: completeIconColor,
        }) }, IconComponent && React.createElement(IconComponent, { className: styles.icon })));
    const renderContent = () => Icon || (IconComplete && isComplete) ? (renderIcon()) : (React.createElement(React.Fragment, null,
        SIZES[size] > 24 && renderTitle(),
        SIZES[size] > 64 && renderSubTitle()));
    return (React.createElement("div", { className: cn(styles.component, styles[size], className), style: {
            ...(height && { height, width: height }),
        }, "data-test-id": dataTestId },
        React.createElement("svg", { viewBox: `0 0 ${memorized.widthSVG} ${memorized.heightSVG}`, className: styles.svg, xmlns: 'http://www.w3.org/2000/svg' },
            React.createElement("circle", { className: cn(styles.backgroundCircle, styles[size], {
                    [styles.stroke]: !stroke,
                }), cx: memorized.center, cy: memorized.center, r: memorized.radius, strokeWidth: STROKE[size] }),
            React.createElement("circle", { className: cn(styles.progressCircle, styles[view], styles[size], {
                    [styles[`bg-${view}`]]: fillComplete && isComplete,
                }), cx: memorized.center, cy: memorized.center, r: memorized.radius, strokeWidth: STROKE[size], strokeDasharray: memorized.strokeDasharray, strokeDashoffset: direction === 'counter-clockwise'
                    ? -memorized.strokeDashoffset
                    : memorized.strokeDashoffset, transform: `rotate(${-90} ${memorized.center} ${memorized.center})` })),
        React.createElement("div", { className: cn(styles.labelWrapper, {
                [styles.label]: Icon || IconComplete,
            }) }, children || renderContent())));
};

export { CircularProgressBar };
