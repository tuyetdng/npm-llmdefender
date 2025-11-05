var tslib_es6 = require('../../tslib.es6-73852ed9.js');
var React = require('react');
var cn = require('classnames');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var Title = React.forwardRef(function (_a, ref) {
    var _b, _c;
    var id = _a.id, toggleClassName = _a.toggleClassName, title = _a.title, _d = _a.styles, styles = _d === void 0 ? {} : _d, _e = _a.rightAddons, rightAddons = _e === void 0 ? null : _e, _f = _a.hidden, hidden = _f === void 0 ? false : _f, _g = _a.selected, selected = _g === void 0 ? false : _g, _h = _a.disabled, disabled = _h === void 0 ? false : _h, _j = _a.collapsed, collapsed = _j === void 0 ? false : _j, _k = _a.focused, focused = _k === void 0 ? false : _k, _l = _a.isOption, isOption = _l === void 0 ? false : _l, restProps = tslib_es6.__rest(_a, ["id", "toggleClassName", "title", "styles", "rightAddons", "hidden", "selected", "disabled", "collapsed", "focused", "isOption"]);
    return hidden ? null : (React__default.default.createElement("button", tslib_es6.__assign({}, restProps, { ref: ref, disabled: disabled, type: 'button', id: String(id), className: cn__default.default(styles.title, (_b = {},
            _b[styles.selected] = selected,
            _b[styles.disabled] = disabled,
            _b[styles.collapsed] = collapsed && !isOption,
            _b[styles.option] = isOption,
            _b), toggleClassName) }),
        React__default.default.createElement("span", { className: cn__default.default(styles.content, (_c = {}, _c[styles.focused] = focused, _c)) }, title),
        rightAddons && React__default.default.createElement("span", { className: styles.rightAddons }, rightAddons)));
});

exports.Title = Title;
