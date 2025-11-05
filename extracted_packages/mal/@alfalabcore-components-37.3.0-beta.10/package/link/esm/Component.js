import React, { forwardRef, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
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

var defaultColors = {"primary":"link__primary_lwei2","secondary":"link__secondary_lwei2","defaultView":"link__defaultView_lwei2"};
require('./default.css');

var styles = {"component":"link__component_9in55","text":"link__text_9in55","withAddons":"link__withAddons_9in55","focused":"link__focused_9in55","pseudo":"link__pseudo_9in55","withoutUnderline":"link__withoutUnderline_9in55","addons":"link__addons_9in55"};
require('./index.css');

var invertedColors = {"primary":"link__primary_1otym","secondary":"link__secondary_1otym","defaultView":"link__defaultView_1otym"};
require('./inverted.css');

var colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};
var Link = forwardRef(function (_a, ref) {
    var _b, _c;
    var _d = _a.view, view = _d === void 0 ? 'primary' : _d, _e = _a.pseudo, pseudo = _e === void 0 ? false : _e, _f = _a.underline, underline = _f === void 0 ? true : _f, leftAddons = _a.leftAddons, rightAddons = _a.rightAddons, className = _a.className, dataTestId = _a.dataTestId, children = _a.children, _g = _a.colors, colors = _g === void 0 ? 'default' : _g, href = _a.href, _h = _a.Component, Component = _h === void 0 ? pseudo ? 'button' : 'a' : _h, restProps = __rest(_a, ["view", "pseudo", "underline", "leftAddons", "rightAddons", "className", "dataTestId", "children", "colors", "href", "Component"]);
    var linkRef = useRef(null);
    var focused = useFocus(linkRef, 'keyboard')[0];
    var viewClassName = view === 'default' ? 'defaultView' : view;
    var componentProps = __assign((_b = { className: cn(styles.component, colorStyles[colors][viewClassName], (_c = {},
                _c[styles.withoutUnderline] = !underline && !pseudo,
                _c[styles.pseudo] = pseudo,
                _c[styles.focused] = focused,
                _c[styles.withAddons] = leftAddons || rightAddons,
                _c), className), 'data-test-id': dataTestId, rel: restProps.target === '_blank' ? 'noreferrer noopener' : undefined }, _b[typeof Component === 'string' ? 'href' : 'to'] = href, _b), (pseudo && { type: 'button' }));
    return (React.createElement(Component, __assign({}, componentProps, restProps, { ref: mergeRefs([linkRef, ref]) }), leftAddons || rightAddons ? (React.createElement(React.Fragment, null,
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
