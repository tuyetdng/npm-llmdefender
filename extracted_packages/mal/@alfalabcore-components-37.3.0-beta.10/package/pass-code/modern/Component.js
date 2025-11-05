import React, { forwardRef } from 'react';
import cn from 'classnames';
import { Gap } from '../../gap/modern';
import { g as getDataTestId } from './getDataTestId-7e0fa95b.js';
import { InputProgress } from './components/InputProgress/Component.js';
import { KeyPad } from './components/KeyPad/Component.js';
import 'react-transition-group';
import '@alfalab/icons-glyph/BackspaceXxlIcon';
import './components/KeyPadButton/Component.js';
import '../../button/modern';

const styles = {"component":"pass-code__component_iaeod","error":"pass-code__error_iaeod"};
require('./index.css');

const PassCode = forwardRef(({ value = '', dataTestId, className, leftAddons, rightAddons, error, onChange, maxCodeLength = 10, codeLength, }, ref) => {
    const passwordLen = codeLength || maxCodeLength;
    const handleChange = (digit) => {
        const newValue = value.concat(digit.toString());
        if (newValue.length <= passwordLen) {
            onChange?.(newValue);
        }
    };
    const handleClear = () => {
        if (value.length > 0) {
            onChange?.(value?.slice(0, -1));
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
