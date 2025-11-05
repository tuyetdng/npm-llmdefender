import React, { forwardRef, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { useFocus } from '@alfalab/hooks';

const defaultColors = {"primary":"link__primary_lwei2","secondary":"link__secondary_lwei2","defaultView":"link__defaultView_lwei2"};
require('./default.css');

const styles = {"component":"link__component_9in55","text":"link__text_9in55","withAddons":"link__withAddons_9in55","focused":"link__focused_9in55","pseudo":"link__pseudo_9in55","withoutUnderline":"link__withoutUnderline_9in55","addons":"link__addons_9in55"};
require('./index.css');

const invertedColors = {"primary":"link__primary_1otym","secondary":"link__secondary_1otym","defaultView":"link__defaultView_1otym"};
require('./inverted.css');

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};
const Link = forwardRef(({ view = 'primary', pseudo = false, underline = true, leftAddons, rightAddons, className, dataTestId, children, colors = 'default', href, Component = pseudo ? 'button' : 'a', ...restProps }, ref) => {
    const linkRef = useRef(null);
    const [focused] = useFocus(linkRef, 'keyboard');
    const viewClassName = view === 'default' ? 'defaultView' : view;
    const componentProps = {
        className: cn(styles.component, colorStyles[colors][viewClassName], {
            [styles.withoutUnderline]: !underline && !pseudo,
            [styles.pseudo]: pseudo,
            [styles.focused]: focused,
            [styles.withAddons]: leftAddons || rightAddons,
        }, className),
        'data-test-id': dataTestId,
        rel: restProps.target === '_blank' ? 'noreferrer noopener' : undefined,
        // Для совместимости с react-router-dom, меняем href на to
        [typeof Component === 'string' ? 'href' : 'to']: href,
        ...(pseudo && { type: 'button' }),
    };
    return (React.createElement(Component, { ...componentProps, ...restProps, ref: mergeRefs([linkRef, ref]) }, leftAddons || rightAddons ? (React.createElement(React.Fragment, null,
        leftAddons && React.createElement("span", { className: styles.addons }, leftAddons),
        children && (React.createElement("span", null,
            React.createElement("span", { className: styles.text }, children))),
        rightAddons && React.createElement("span", { className: styles.addons }, rightAddons))) : (React.createElement("span", { className: styles.text }, children))));
});
/**
 * Для отображения в сторибуке
 */
Link.defaultProps = {
    view: 'primary',
    pseudo: false,
};

export { Link };
