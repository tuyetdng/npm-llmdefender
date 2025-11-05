import React, { useRef, useState, useEffect } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { Spinner } from '../../spinner/esm';
import { useFocus } from '@alfalab/hooks';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var __assign = function () {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

var styles = {"component":"button__component_4vwd7","focused":"button__focused_4vwd7","loading":"button__loading_4vwd7","text":"button__text_4vwd7","addons":"button__addons_4vwd7","stretchText":"button__stretchText_4vwd7","loader":"button__loader_4vwd7","xxs":"button__xxs_4vwd7","iconOnly":"button__iconOnly_4vwd7","xs":"button__xs_4vwd7","s":"button__s_4vwd7","m":"button__m_4vwd7","l":"button__l_4vwd7","xl":"button__xl_4vwd7","withRightAddons":"button__withRightAddons_4vwd7","ghost":"button__ghost_4vwd7","withLeftAddons":"button__withLeftAddons_4vwd7","link":"button__link_4vwd7","block":"button__block_4vwd7","nowrap":"button__nowrap_4vwd7"};
require('./index.css');

var defaultColors = {"primary":"button__primary_re924","loader":"button__loader_re924","secondary":"button__secondary_re924","outlined":"button__outlined_re924","tertiary":"button__tertiary_re924","filled":"button__filled_re924","transparent":"button__transparent_re924","link":"button__link_re924","ghost":"button__ghost_re924","component":"button__component_re924","loading":"button__loading_re924"};
require('./default.css');

var invertedColors = {"primary":"button__primary_g47jq","loader":"button__loader_g47jq","secondary":"button__secondary_g47jq","outlined":"button__outlined_g47jq","tertiary":"button__tertiary_g47jq","filled":"button__filled_g47jq","transparent":"button__transparent_g47jq","link":"button__link_g47jq","ghost":"button__ghost_g47jq","component":"button__component_g47jq","loading":"button__loading_g47jq"};
require('./inverted.css');

var colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};
/**
 * Минимальное время отображения лоадера - 500мс,
 * чтобы при быстрых ответах от сервера кнопка не «моргала».
 */
var LOADER_MIN_DISPLAY_INTERVAL = 500;
var logWarning = function (view) {
    if (process.env.NODE_ENV !== 'development') {
        return;
    }
    var viewsMap = {
        filled: 'secondary',
        transparent: 'secondary',
        outlined: 'tertiary',
    };
    // eslint-disable-next-line no-console
    console.warn(
    // eslint-disable-next-line prefer-template
    "@alfalab/core-components/button: view='".concat(view, "' \u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043B\u0435\u043D \u0432 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0445 \u043C\u0430\u0436\u043E\u0440\u043D\u044B\u0445 \u0432\u0435\u0440\u0441\u0438\u044F\u0445. ") +
        "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 view='".concat(viewsMap[view], "'. \u0427\u0442\u043E\u0431\u044B \u043F\u043E\u043C\u0435\u043D\u044F\u0442\u044C \u0432\u0441\u0435 \u043A\u043D\u043E\u043F\u043A\u0438 \u043D\u0430 \u043F\u0440\u043E\u0435\u043A\u0442\u0435 \u0440\u0430\u0437\u043E\u043C, \u043C\u043E\u0436\u043D\u043E \u0432\u043E\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F codemod: ") +
        'npx @alfalab/core-components-codemod --transformers=button-views src/**/*.tsx');
};
var Button = React.forwardRef(function (_a, ref) {
    var _b, _c, _d;
    var children = _a.children, _e = _a.view, view = _e === void 0 ? 'secondary' : _e, leftAddons = _a.leftAddons, rightAddons = _a.rightAddons, _f = _a.size, size = _f === void 0 ? 'm' : _f, _g = _a.block, block = _g === void 0 ? false : _g, className = _a.className, dataTestId = _a.dataTestId, href = _a.href, _h = _a.loading, loading = _h === void 0 ? false : _h, _j = _a.nowrap, nowrap = _j === void 0 ? false : _j, _k = _a.colors, colors = _k === void 0 ? 'default' : _k, _l = _a.Component, Component = _l === void 0 ? href ? 'a' : 'button' : _l, onClick = _a.onClick, restProps = __rest(_a, ["children", "view", "leftAddons", "rightAddons", "size", "block", "className", "dataTestId", "href", "loading", "nowrap", "colors", "Component", "onClick"]);
    if (['outlined', 'filled', 'transparent'].includes(view)) {
        logWarning(view);
    }
    var buttonRef = useRef(null);
    var focused = useFocus(buttonRef, 'keyboard')[0];
    var _m = useState(true), loaderTimePassed = _m[0], setLoaderTimePassed = _m[1];
    var timerId = useRef(0);
    var showLoader = loading || !loaderTimePassed;
    var iconOnly = !children;
    var componentProps = {
        className: cn(styles.component, styles[view], styles[size], colorStyles[colors].component, colorStyles[colors][view], (_b = {},
            _b[styles.focused] = focused,
            _b[styles.block] = block,
            _b[styles.iconOnly] = iconOnly,
            _b[styles.loading] = showLoader,
            _b[styles.withRightAddons] = Boolean(rightAddons) && !iconOnly,
            _b[styles.withLeftAddons] = Boolean(leftAddons) && !iconOnly,
            _b[colorStyles[colors].loading] = showLoader,
            _b), className),
        'data-test-id': dataTestId || null,
    };
    var _o = restProps, disabled = _o.disabled, _p = _o.type, type = _p === void 0 ? 'button' : _p, restButtonProps = __rest(_o, ["disabled", "type"]);
    var buttonChildren = (React.createElement(React.Fragment, null,
        leftAddons && React.createElement("span", { className: styles.addons }, leftAddons),
        children && (React.createElement("span", { className: cn(styles.text, (_c = {},
                _c[styles.nowrap] = nowrap,
                _c[styles.stretchText] = !(leftAddons || rightAddons),
                _c)) }, children)),
        showLoader && (React.createElement(Spinner, { visible: showLoader, className: cn(styles.loader, colorStyles[colors].loader) })),
        rightAddons && React.createElement("span", { className: styles.addons }, rightAddons)));
    useEffect(function () {
        if (loading) {
            setLoaderTimePassed(false);
            timerId.current = window.setTimeout(function () {
                setLoaderTimePassed(true);
            }, LOADER_MIN_DISPLAY_INTERVAL);
        }
    }, [loading]);
    useEffect(function () { return function () {
        window.clearTimeout(timerId.current);
    }; }, []);
    var handleClick = function (e) {
        if (disabled || showLoader) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        onClick === null || onClick === void 0 ? void 0 : onClick(e);
    };
    if (href) {
        var target = restProps.target;
        // Для совместимости с react-router-dom, меняем href на to
        var hrefProps = (_d = {}, _d[typeof Component === 'string' ? 'href' : 'to'] = href, _d);
        return (React.createElement(Component, __assign({ rel: target === '_blank' ? 'noreferrer noopener' : undefined }, componentProps, restProps, hrefProps, { onClick: handleClick, disabled: disabled || showLoader, ref: mergeRefs([buttonRef, ref]) }), buttonChildren));
    }
    return (React.createElement(Component, __assign({}, componentProps, restButtonProps, { onClick: handleClick, type: type, disabled: disabled || showLoader, ref: mergeRefs([buttonRef, ref]) }), buttonChildren));
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
