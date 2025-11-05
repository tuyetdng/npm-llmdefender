import React, { forwardRef, useRef, Fragment } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { Loader } from '../../loader/modern';
import { useFocus } from '@alfalab/hooks';
import { useLoader } from './hooks.js';

const defaultColors = {"primary":"action-button__primary_1fonb","iconWrapper":"action-button__iconWrapper_1fonb","secondary":"action-button__secondary_1fonb"};
require('./default.css');

const styles = {"component":"action-button__component_14d6p","s":"action-button__s_14d6p","disabled":"action-button__disabled_14d6p","loading":"action-button__loading_14d6p","iconWrapper":"action-button__iconWrapper_14d6p","label":"action-button__label_14d6p","focused":"action-button__focused_14d6p"};
require('./index.css');

const invertedColors = {"primary":"action-button__primary_161fw","iconWrapper":"action-button__iconWrapper_161fw","secondary":"action-button__secondary_161fw"};
require('./inverted.css');

const staticColors = {"primary":"action-button__primary_1qm9y","iconWrapper":"action-button__iconWrapper_1qm9y","secondary":"action-button__secondary_1qm9y"};
require('./static.css');

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
    static: staticColors,
};
/**
 * Минимальное время отображения лоадера - 500мс,
 * чтобы при быстрых ответах от сервера кнопка не «моргала».
 */
const LOADER_MIN_DISPLAY_INTERVAL = 500;
const ActionButton = forwardRef(({ className, icon, children, href, size = 's', view = 'primary', type = 'button', iconWrapperClassName, disabled, loading, dataTestId, colors = 'default', ...rest }, ref) => {
    const componentRef = useRef(null);
    const [focused] = useFocus(componentRef, 'keyboard');
    const { showLoader } = useLoader(!!loading, LOADER_MIN_DISPLAY_INTERVAL);
    const componentProps = {
        className: cn(styles.component, colorStyles[colors][view], styles[size], {
            [styles.focused]: focused,
            [styles.disabled]: disabled,
            [styles.loading]: showLoader,
        }, className),
        'data-test-id': dataTestId,
    };
    const buttonChildren = (React.createElement(Fragment, null,
        React.createElement("span", { role: 'img', className: cn(styles.iconWrapper, colorStyles[colors].iconWrapper, styles[size], iconWrapperClassName) }, showLoader ? React.createElement(Loader, { dataTestId: 'loader' }) : icon),
        React.createElement("span", { className: styles.label }, children)));
    if (href) {
        return (React.createElement("a", { role: 'button', ref: mergeRefs([componentRef, ref]), href: href, "aria-disabled": disabled || loading, ...componentProps, ...rest }, buttonChildren));
    }
    return (React.createElement("button", { ref: mergeRefs([componentRef, ref]), 
        // eslint-disable-next-line react/button-has-type
        type: type, disabled: disabled || loading, ...componentProps, ...rest }, buttonChildren));
});

export { ActionButton };
