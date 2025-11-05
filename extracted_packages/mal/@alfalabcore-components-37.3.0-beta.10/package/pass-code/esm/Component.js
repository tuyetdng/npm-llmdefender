import React, { forwardRef } from 'react';
import cn from 'classnames';
import { Gap } from '../../gap/esm';
import { g as getDataTestId } from './getDataTestId-ebdc0eda.js';
import { InputProgress } from './components/InputProgress/Component.js';
import { KeyPad } from './components/KeyPad/Component.js';
import 'react-transition-group';
import '@alfalab/icons-glyph/BackspaceXxlIcon';
import './components/KeyPadButton/Component.js';
import '../../button/esm';

var styles = {"component":"pass-code__component_iaeod","error":"pass-code__error_iaeod"};
require('./index.css');

var PassCode = forwardRef(function (_a, ref) {
    var _b = _a.value, value = _b === void 0 ? '' : _b, dataTestId = _a.dataTestId, className = _a.className, leftAddons = _a.leftAddons, rightAddons = _a.rightAddons, error = _a.error, onChange = _a.onChange, _c = _a.maxCodeLength, maxCodeLength = _c === void 0 ? 10 : _c, codeLength = _a.codeLength;
    var passwordLen = codeLength || maxCodeLength;
    var handleChange = function (digit) {
        var newValue = value.concat(digit.toString());
        if (newValue.length <= passwordLen) {
            onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
        }
    };
    var handleClear = function () {
        if (value.length > 0) {
            onChange === null || onChange === void 0 ? void 0 : onChange(value === null || value === void 0 ? void 0 : value.slice(0, -1));
        }
    };
    return (React.createElement("div", { className: cn(styles.component, className), ref: ref, "data-test-id": getDataTestId(dataTestId, 'wrapper') },
        React.createElement("div", { className: styles.error, "data-test-id": getDataTestId(dataTestId, 'error') }, error),
        React.createElement(Gap, { size: 'm' }),
        React.createElement(InputProgress, { dataTestId: dataTestId, value: value, maxCodeLength: maxCodeLength, codeLength: codeLength, error: Boolean(error) }),
        React.createElement(Gap, { size: '4xl' }),
        React.createElement(KeyPad, { dataTestId: dataTestId, leftAddons: leftAddons, rightAddons: rightAddons, onClick: handleChange, onClear: handleClear, showClear: Boolean(value) })));
});

export { PassCode };
