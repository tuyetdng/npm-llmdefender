var React = require('react');
var cn = require('classnames');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

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

var styles = {"list":"list__list_keujd","orderedList":"list__orderedList_keujd","lowerAlpha":"list__lowerAlpha_keujd","decimal":"list__decimal_keujd","item":"list__item_keujd","unorderedItem":"list__unorderedItem_keujd","orderedItem":"list__orderedItem_keujd","slot":"list__slot_keujd"};
require('./index.css');

var List = function (_a) {
    var _b, _c;
    var _d = _a.tag, tag = _d === void 0 ? 'ul' : _d, marker = _a.marker, className = _a.className, dataTestId = _a.dataTestId, children = _a.children, restProps = __rest(_a, ["tag", "marker", "className", "dataTestId", "children"]);
    var markerType = marker || (tag === 'ul' ? '—' : 'decimal');
    var orderedMarker = markerType === 'decimal' || markerType === 'lower-alpha';
    var Component = tag === 'ol' || orderedMarker ? 'ol' : 'ul';
    var unorderedList = Component === 'ul';
    var orderedList = Component === 'ol';
    var listClassNames = cn__default.default(styles.list, (_b = {},
        _b[styles.lowerAlpha] = markerType === 'lower-alpha',
        _b[styles.decimal] = markerType === 'decimal',
        _b[styles.orderedList] = orderedList,
        _b), className);
    var itemClassNames = cn__default.default(styles.item, (_c = {},
        _c[styles.unorderedItem] = unorderedList,
        _c[styles.orderedItem] = orderedList,
        _c));
    return (React__default.default.createElement(Component, __assign({ className: listClassNames, "data-test-id": dataTestId }, restProps), React.Children.map(children, function (child) { return (React__default.default.createElement("li", { className: itemClassNames },
        unorderedList && React__default.default.createElement("div", { className: styles.slot }, markerType),
        child)); })));
};

exports.List = List;
