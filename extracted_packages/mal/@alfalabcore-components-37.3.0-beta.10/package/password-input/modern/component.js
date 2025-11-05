import React, { forwardRef, useState, useCallback } from 'react';
import cn from 'classnames';
import { IconButton } from '../../icon-button/modern';
import { Input } from '../../input/modern';
import { EyeMIcon } from '@alfalab/icons-glyph/EyeMIcon';
import { EyeOffMIcon } from '@alfalab/icons-glyph/EyeOffMIcon';

const styles = {"eye":"password-input__eye_npmr4","xl":"password-input__xl_npmr4","input":"password-input__input_npmr4"};
require('./index.css');

const PasswordInput = forwardRef(({ onPasswordVisibleChange, passwordVisible, disabled, colors, rightAddons, size = 's', className, ...restProps }, ref) => {
    const uncontrolled = passwordVisible === undefined;
    const [statePasswordVisible, setStatePasswordVisible] = useState(uncontrolled ? false : passwordVisible);
    const handleButtonClick = useCallback(() => {
        if (onPasswordVisibleChange) {
            onPasswordVisibleChange(!passwordVisible);
        }
        if (uncontrolled) {
            setStatePasswordVisible((visible) => !visible);
        }
    }, [passwordVisible, uncontrolled, onPasswordVisibleChange]);
    const isPasswordVisible = uncontrolled ? statePasswordVisible : passwordVisible;
    return (React.createElement(Input, { ...restProps, disabled: disabled, type: isPasswordVisible ? 'text' : 'password', size: size, ref: ref, colors: colors, className: cn(className, styles[size]), rightAddons: React.createElement(React.Fragment, null,
            rightAddons,
            React.createElement(IconButton, { className: styles.eye, colors: colors, view: 'secondary', size: 's', icon: isPasswordVisible ? EyeMIcon : EyeOffMIcon, onClick: handleButtonClick, disabled: disabled })), addonsClassName: styles.addons, inputClassName: styles.input }));
});

export { PasswordInput };
