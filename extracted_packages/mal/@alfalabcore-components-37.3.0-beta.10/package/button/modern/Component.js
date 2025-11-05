import React, { useRef, useState, useEffect } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { Spinner } from '../../spinner/modern';
import { useFocus } from '@alfalab/hooks';

const styles = {"component":"button__component_4vwd7","focused":"button__focused_4vwd7","loading":"button__loading_4vwd7","text":"button__text_4vwd7","addons":"button__addons_4vwd7","stretchText":"button__stretchText_4vwd7","loader":"button__loader_4vwd7","xxs":"button__xxs_4vwd7","iconOnly":"button__iconOnly_4vwd7","xs":"button__xs_4vwd7","s":"button__s_4vwd7","m":"button__m_4vwd7","l":"button__l_4vwd7","xl":"button__xl_4vwd7","withRightAddons":"button__withRightAddons_4vwd7","ghost":"button__ghost_4vwd7","withLeftAddons":"button__withLeftAddons_4vwd7","link":"button__link_4vwd7","block":"button__block_4vwd7","nowrap":"button__nowrap_4vwd7"};
require('./index.css');

const defaultColors = {"primary":"button__primary_re924","loader":"button__loader_re924","secondary":"button__secondary_re924","outlined":"button__outlined_re924","tertiary":"button__tertiary_re924","filled":"button__filled_re924","transparent":"button__transparent_re924","link":"button__link_re924","ghost":"button__ghost_re924","component":"button__component_re924","loading":"button__loading_re924"};
require('./default.css');

const invertedColors = {"primary":"button__primary_g47jq","loader":"button__loader_g47jq","secondary":"button__secondary_g47jq","outlined":"button__outlined_g47jq","tertiary":"button__tertiary_g47jq","filled":"button__filled_g47jq","transparent":"button__transparent_g47jq","link":"button__link_g47jq","ghost":"button__ghost_g47jq","component":"button__component_g47jq","loading":"button__loading_g47jq"};
require('./inverted.css');

// TODO Вид кнопок зависит от порядка импорта стилей. Исправить!!!.
const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};
/**
 * Минимальное время отображения лоадера - 500мс,
 * чтобы при быстрых ответах от сервера кнопка не «моргала».
 */
const LOADER_MIN_DISPLAY_INTERVAL = 500;
const logWarning = (view) => {
    if (process.env.NODE_ENV !== 'development') {
        return;
    }
    const viewsMap = {
        filled: 'secondary',
        transparent: 'secondary',
        outlined: 'tertiary',
    };
    // eslint-disable-next-line no-console
    console.warn(
    // eslint-disable-next-line prefer-template
    `@alfalab/core-components/button: view='${view}' будет удален в следующих мажорных версиях. ` +
        `Используйте view='${viewsMap[view]}'. Чтобы поменять все кнопки на проекте разом, можно воспользоваться codemod: ` +
        'npx @alfalab/core-components-codemod --transformers=button-views src/**/*.tsx');
};
const Button = React.forwardRef(({ children, view = 'secondary', leftAddons, rightAddons, size = 'm', block = false, className, dataTestId, href, loading = false, nowrap = false, colors = 'default', Component = href ? 'a' : 'button', onClick, ...restProps }, ref) => {
    if (['outlined', 'filled', 'transparent'].includes(view)) {
        logWarning(view);
    }
    const buttonRef = useRef(null);
    const [focused] = useFocus(buttonRef, 'keyboard');
    const [loaderTimePassed, setLoaderTimePassed] = useState(true);
    const timerId = useRef(0);
    const showLoader = loading || !loaderTimePassed;
    const iconOnly = !children;
    const componentProps = {
        className: cn(styles.component, styles[view], styles[size], colorStyles[colors].component, colorStyles[colors][view], {
            [styles.focused]: focused,
            [styles.block]: block,
            [styles.iconOnly]: iconOnly,
            [styles.loading]: showLoader,
            [styles.withRightAddons]: Boolean(rightAddons) && !iconOnly,
            [styles.withLeftAddons]: Boolean(leftAddons) && !iconOnly,
            [colorStyles[colors].loading]: showLoader,
        }, className),
        'data-test-id': dataTestId || null,
    };
    const { disabled, type = 'button', ...restButtonProps } = restProps;
    const buttonChildren = (React.createElement(React.Fragment, null,
        leftAddons && React.createElement("span", { className: styles.addons }, leftAddons),
        children && (React.createElement("span", { className: cn(styles.text, {
                [styles.nowrap]: nowrap,
                [styles.stretchText]: !(leftAddons || rightAddons),
            }) }, children)),
        showLoader && (React.createElement(Spinner, { visible: showLoader, className: cn(styles.loader, colorStyles[colors].loader) })),
        rightAddons && React.createElement("span", { className: styles.addons }, rightAddons)));
    useEffect(() => {
        if (loading) {
            setLoaderTimePassed(false);
            timerId.current = window.setTimeout(() => {
                setLoaderTimePassed(true);
            }, LOADER_MIN_DISPLAY_INTERVAL);
        }
    }, [loading]);
    useEffect(() => () => {
        window.clearTimeout(timerId.current);
    }, []);
    const handleClick = (e) => {
        if (disabled || showLoader) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        onClick?.(e);
    };
    if (href) {
        const { target } = restProps;
        // Для совместимости с react-router-dom, меняем href на to
        const hrefProps = { [typeof Component === 'string' ? 'href' : 'to']: href };
        return (React.createElement(Component, { rel: target === '_blank' ? 'noreferrer noopener' : undefined, ...componentProps, ...restProps, ...hrefProps, onClick: handleClick, disabled: disabled || showLoader, ref: mergeRefs([buttonRef, ref]) }, buttonChildren));
    }
    return (React.createElement(Component, { ...componentProps, ...restButtonProps, onClick: handleClick, type: type, disabled: disabled || showLoader, ref: mergeRefs([buttonRef, ref]) }, buttonChildren));
});
/**
 * Для отображения в сторибуке
 */
Button.defaultProps = {
    view: 'secondary',
    size: 'm',
    block: false,
    loading: false,
    nowrap: false,
};

export { Button, LOADER_MIN_DISPLAY_INTERVAL };
