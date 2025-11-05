var tslib_es6 = require('../tslib.es6-73246b1c.js');
var React = require('react');
var mergeRefs = require('react-merge-refs');
var cn = require('classnames');
var coreComponentsInput = require('../../input');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var mergeRefs__default = /*#__PURE__*/_interopDefaultCompat(mergeRefs);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"arrow":"input-autocomplete__arrow_jx6hq","error":"input-autocomplete__error_jx6hq"};
require('./index.css');

var AutocompleteField = function (_a) {
    var _b;
    var label = _a.label, _c = _a.labelView, labelView = _c === void 0 ? 'inner' : _c, placeholder = _a.placeholder, size = _a.size, Arrow = _a.Arrow, _d = _a.Input, Input = _d === void 0 ? coreComponentsInput.Input : _d, value = _a.value, error = _a.error, success = _a.success, hint = _a.hint, disabled = _a.disabled, readOnly = _a.readOnly, onInput = _a.onInput, _e = _a.inputProps, inputProps = _e === void 0 ? {} : _e, innerProps = _a.innerProps;
    var inputRef = React.useRef(null);
    var onClick = innerProps.onClick, onFocus = innerProps.onFocus;
    var inputDisabled = disabled || readOnly;
    var handleClick = React.useCallback(function (event) {
        if (onClick)
            onClick(event);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [onClick]);
    return (React__default.default.createElement(Input, tslib_es6.__assign({}, inputProps, innerProps, { wrapperRef: mergeRefs__default.default([
            innerProps.ref,
            inputProps.wrapperRef,
        ]), ref: mergeRefs__default.default([inputRef, inputProps.ref]), disabled: disabled, readOnly: readOnly, block: true, label: label, labelView: labelView, placeholder: placeholder, size: size, error: error, success: success, hint: hint, onChange: onInput, onClick: inputDisabled ? undefined : handleClick, onFocus: inputDisabled ? undefined : onFocus, autoComplete: 'off', value: value, rightAddons: (Arrow || inputProps.rightAddons) && (React__default.default.createElement(React__default.default.Fragment, null,
            inputProps.rightAddons,
            Arrow && (React__default.default.createElement("span", { className: cn__default.default(styles.arrow, (_b = {},
                    _b[styles.error] = error,
                    _b)) }, Arrow)))) })));
};

exports.AutocompleteField = AutocompleteField;
