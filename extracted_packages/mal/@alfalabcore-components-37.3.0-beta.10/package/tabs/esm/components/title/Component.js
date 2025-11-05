import { _ as __rest, a as __assign } from '../../tslib.es6-3f4e7063.js';
import React, { forwardRef } from 'react';
import cn from 'classnames';

var Title = forwardRef(function (_a, ref) {
    var _b, _c;
    var id = _a.id, toggleClassName = _a.toggleClassName, title = _a.title, _d = _a.styles, styles = _d === void 0 ? {} : _d, _e = _a.rightAddons, rightAddons = _e === void 0 ? null : _e, _f = _a.hidden, hidden = _f === void 0 ? false : _f, _g = _a.selected, selected = _g === void 0 ? false : _g, _h = _a.disabled, disabled = _h === void 0 ? false : _h, _j = _a.collapsed, collapsed = _j === void 0 ? false : _j, _k = _a.focused, focused = _k === void 0 ? false : _k, _l = _a.isOption, isOption = _l === void 0 ? false : _l, restProps = __rest(_a, ["id", "toggleClassName", "title", "styles", "rightAddons", "hidden", "selected", "disabled", "collapsed", "focused", "isOption"]);
    return hidden ? null : (React.createElement("button", __assign({}, restProps, { ref: ref, disabled: disabled, type: 'button', id: String(id), className: cn(styles.title, (_b = {},
            _b[styles.selected] = selected,
            _b[styles.disabled] = disabled,
            _b[styles.collapsed] = collapsed && !isOption,
            _b[styles.option] = isOption,
            _b), toggleClassName) }),
        React.createElement("span", { className: cn(styles.content, (_c = {}, _c[styles.focused] = focused, _c)) }, title),
        rightAddons && React.createElement("span", { className: styles.rightAddons }, rightAddons)));
});

export { Title };
