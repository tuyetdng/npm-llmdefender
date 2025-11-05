import React from 'react';
import cn from 'classnames';
import { Button } from '../../button/modern';

const styles = {"customButton":"custom-button__customButton_z7axf","white":"custom-button__white_z7axf","black":"custom-button__black_z7axf","darkening":"custom-button__darkening_z7axf","lightening":"custom-button__lightening_z7axf","customLoading":"custom-button__customLoading_z7axf"};
require('./index.css');

const DEFAULT_BUTTON_COLOR = '#FF45C3';
const DEFAULT_CONTENT_COLOR = 'white';
const CustomButton = React.forwardRef(({ children, className, loading, backgroundColor = DEFAULT_BUTTON_COLOR, contentColor = DEFAULT_CONTENT_COLOR, stateType = 'darkening', ...restProps }, ref) => {
    const buttonProps = {
        style: { background: backgroundColor },
        ...restProps,
    };
    const buttonClassName = cn(styles.customButton, className, styles[contentColor], styles[stateType], {
        [styles.customLoading]: loading,
    });
    return (React.createElement(Button, { ...buttonProps, view: 'primary', ref: ref, className: buttonClassName, loading: loading }, children));
});
/**
 * Для отображения в сторибуке
 */
CustomButton.defaultProps = {
    size: 'm',
    block: false,
    loading: false,
    nowrap: false,
};

export { CustomButton };
