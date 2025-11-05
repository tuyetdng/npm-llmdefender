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

var styles = {"wrapper":"badge__wrapper_4hd6a","s":"badge__s_4hd6a","m":"badge__m_4hd6a","xl":"badge__xl_4hd6a","component":"badge__component_4hd6a","count":"badge__count_4hd6a","outlineCount":"badge__outlineCount_4hd6a","l":"badge__l_4hd6a","heightS":"badge__heightS_4hd6a","heightM":"badge__heightM_4hd6a","heightL":"badge__heightL_4hd6a","heightXL":"badge__heightXL_4hd6a","heightXXL":"badge__heightXXL_4hd6a","icon":"badge__icon_4hd6a","positive":"badge__positive_4hd6a","attention":"badge__attention_4hd6a","negative":"badge__negative_4hd6a","link":"badge__link_4hd6a","tertiary":"badge__tertiary_4hd6a","secondary":"badge__secondary_4hd6a","primary":"badge__primary_4hd6a","outline":"badge__outline_4hd6a","outlineColor":"badge__outlineColor_4hd6a","dot":"badge__dot_4hd6a","isHidden":"badge__isHidden_4hd6a"};
require('./index.css');

var Badge = function (_a) {
    var _b, _c;
    var className = _a.className, _d = _a.size, size = _d === void 0 ? 'm' : _d, view = _a.view, _e = _a.visibleIconOutline, visibleIconOutline = _e === void 0 ? false : _e, _f = _a.visibleColorOutline, visibleColorOutline = _f === void 0 ? false : _f, content = _a.content, _g = _a.height, height = _g === void 0 ? 16 : _g, iconColor = _a.iconColor, dataTestId = _a.dataTestId;
    var isCountView = view === 'count';
    var isHidden = isCountView && typeof content === 'number' && content <= 0;
    var componentContent = isCountView && content && content >= 100 ? '99+' : content;
    var isHeightS = isCountView && height >= 16 && height <= 18;
    var isHeightM = isCountView && height >= 19 && height <= 24;
    var isHeightL = isCountView && height >= 25 && height <= 32;
    var isHeightXL = isCountView && height >= 33 && height <= 40;
    var isHeightXXL = isCountView && height >= 41 && height <= 48;
    return (React__default.default.createElement("div", { className: cn__default.default(!isCountView && styles.wrapper, iconColor && styles[iconColor], (_b = {},
            _b[styles[size]] = !isCountView,
            _b[styles.outline] = visibleIconOutline,
            _b[styles.outlineColor] = !isCountView && visibleColorOutline,
            _b[styles.count] = isCountView,
            _b), className), "data-test-id": dataTestId },
        React__default.default.createElement("div", { className: cn__default.default(styles.component, styles[size], styles[view], iconColor && styles[iconColor], isHeightS && styles.heightS, isHeightM && styles.heightM, isHeightL && styles.heightL, isHeightXL && styles.heightXL, isHeightXXL && styles.heightXXL, (_c = {},
                _c[styles.isHidden] = isHidden,
                _c[styles.dot] = !content,
                _c[styles.outlineCount] = isCountView && visibleIconOutline,
                _c)), style: __assign({}, (isCountView && content && { height: height, minWidth: height })) }, componentContent)));
};

exports.Badge = Badge;
