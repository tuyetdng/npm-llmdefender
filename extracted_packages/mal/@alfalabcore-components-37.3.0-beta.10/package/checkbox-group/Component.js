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

var styles = {"component":"checkbox-group__component_2ptyx","error":"checkbox-group__error_2ptyx","checkboxList":"checkbox-group__checkboxList_2ptyx","vertical":"checkbox-group__vertical_2ptyx","checkbox":"checkbox-group__checkbox_2ptyx","horizontal":"checkbox-group__horizontal_2ptyx","tag":"checkbox-group__tag_2ptyx","tagLabel":"checkbox-group__tagLabel_2ptyx","label":"checkbox-group__label_2ptyx","sub":"checkbox-group__sub_2ptyx","errorMessage":"checkbox-group__errorMessage_2ptyx","hint":"checkbox-group__hint_2ptyx","hiddenInput":"checkbox-group__hiddenInput_2ptyx"};
require('./index.css');

var CheckboxGroup = function (_a) {
    var _b;
    var children = _a.children, className = _a.className, _c = _a.direction, direction = _c === void 0 ? 'vertical' : _c, label = _a.label, error = _a.error, hint = _a.hint, onChange = _a.onChange, onBlur = _a.onBlur, onFocus = _a.onFocus, _d = _a.type, type = _d === void 0 ? 'checkbox' : _d, dataTestId = _a.dataTestId, _e = _a.disabled, disabled = _e === void 0 ? false : _e;
    var renderCheckbox = function (child) {
        var _a = child.props, name = _a.name, checked = _a.checked, childClassName = _a.className;
        var handleChange = function (event) {
            if (onChange) {
                onChange(event, { name: name, checked: !checked });
            }
        };
        return React.cloneElement(child, __assign(__assign({ onChange: handleChange, disabled: disabled }, child.props), { className: cn__default.default(childClassName, styles.checkbox) }));
    };
    var renderTag = function (child) {
        var _a = child.props, name = _a.name, checked = _a.checked;
        var handleChange = function (event) {
            if (onChange) {
                onChange(event, { name: name, checked: !checked });
            }
        };
        var clone = React.cloneElement(child, __assign({ onClick: handleChange, disabled: disabled }, child.props));
        return (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        React__default.default.createElement("label", { className: cn__default.default(styles.checkbox, styles.tagLabel) },
            clone,
            React__default.default.createElement("input", { type: 'checkbox', autoComplete: 'off', onChange: handleChange, disabled: disabled || child.props.disabled, checked: checked, className: styles.hiddenInput })));
    };
    var errorMessage = typeof error === 'boolean' ? '' : error;
    return (React__default.default.createElement("div", { className: cn__default.default(styles.component, styles[type], styles[direction], (_b = {}, _b[styles.error] = error, _b), className), "data-test-id": dataTestId },
        label ? React__default.default.createElement("span", { className: styles.label }, label) : null,
        children ? (React__default.default.createElement("div", { className: styles.checkboxList, onBlur: onBlur, onFocus: onFocus }, React.Children.map(children, function (child) {
            if (React.isValidElement(child)) {
                return type === 'checkbox' ? renderCheckbox(child) : renderTag(child);
            }
            return null;
        }))) : null,
        errorMessage && (React__default.default.createElement("span", { className: cn__default.default(styles.sub, styles.errorMessage), role: 'alert' }, errorMessage)),
        hint && !errorMessage && React__default.default.createElement("span", { className: cn__default.default(styles.sub, styles.hint) }, hint)));
};

exports.CheckboxGroup = CheckboxGroup;
