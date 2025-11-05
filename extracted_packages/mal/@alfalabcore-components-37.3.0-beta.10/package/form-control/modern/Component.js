import React from 'react';
import cn from 'classnames';

const defaultColors = {"component":"form-control__component_p1n34","inner":"form-control__inner_p1n34","label":"form-control__label_p1n34","hint":"form-control__hint_p1n34","disabled":"form-control__disabled_p1n34","hasError":"form-control__hasError_p1n34","filled":"form-control__filled_p1n34","focused":"form-control__focused_p1n34","error":"form-control__error_p1n34"};
require('./default.css');

const styles = {"component":"form-control__component_4trh7","inner":"form-control__inner_4trh7","inputWrapper":"form-control__inputWrapper_4trh7","input":"form-control__input_4trh7","label":"form-control__label_4trh7","labelInner":"form-control__labelInner_4trh7","addons":"form-control__addons_4trh7","leftAddons":"form-control__leftAddons_4trh7","rightAddons":"form-control__rightAddons_4trh7","sub":"form-control__sub_4trh7","above":"form-control__above_4trh7","block":"form-control__block_4trh7","s":"form-control__s_4trh7","hasInnerLabel":"form-control__hasInnerLabel_4trh7","m":"form-control__m_4trh7","l":"form-control__l_4trh7","xl":"form-control__xl_4trh7","hasLeftAddons":"form-control__hasLeftAddons_4trh7","hasRightAddons":"form-control__hasRightAddons_4trh7","disabled":"form-control__disabled_4trh7","focused":"form-control__focused_4trh7","hasError":"form-control__hasError_4trh7","filled":"form-control__filled_4trh7","hiddenLabel":"form-control__hiddenLabel_4trh7"};
require('./index.css');

const invertedColors = {"component":"form-control__component_1sors","inner":"form-control__inner_1sors","label":"form-control__label_1sors","hint":"form-control__hint_1sors","disabled":"form-control__disabled_1sors","hasError":"form-control__hasError_1sors","filled":"form-control__filled_1sors","focused":"form-control__focused_1sors","error":"form-control__error_1sors"};
require('./inverted.css');

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};
const FormControl = React.forwardRef(({ block = false, size = 's', colors = 'default', className, fieldClassName, labelClassName, addonsClassName, disabled, readOnly, focused, filled, error, hint, label, labelView = 'inner', leftAddons, rightAddons, bottomAddons, children, dataTestId, ...restProps }, ref) => {
    const errorMessage = typeof error === 'boolean' ? '' : error;
    return (React.createElement("div", { "data-test-id": dataTestId, className: cn(styles.component, colorStyles[colors].component, className, styles[size], {
            [styles.block]: block,
            [styles.hasLeftAddons]: leftAddons,
            [styles.hasRightAddons]: rightAddons || error,
        }) },
        label && labelView === 'outer' && (React.createElement("span", { className: cn(styles.above, colorStyles[colors].label) }, label)),
        React.createElement("div", { ...restProps, className: cn(fieldClassName, styles.inner, colorStyles[colors].inner, {
                [styles.disabled]: disabled || readOnly,
                [colorStyles[colors].disabled]: disabled || readOnly,
                [styles.filled]: filled,
                [colorStyles[colors].filled]: filled,
                [styles.hasInnerLabel]: label && labelView === 'inner',
                [styles.focused]: focused,
                [colorStyles[colors].focused]: focused,
                [styles.hasError]: error,
                [colorStyles[colors].hasError]: error,
            }), ref: ref },
            leftAddons && (React.createElement("div", { className: cn(styles.addons, styles.leftAddons, addonsClassName) }, leftAddons)),
            React.createElement("div", { className: styles.inputWrapper },
                label && labelView === 'inner' && (React.createElement(React.Fragment, null,
                    React.createElement("span", { className: styles.hiddenLabel, "aria-hidden": true }, label),
                    React.createElement("div", { className: cn(styles.label, colorStyles[colors].label, labelClassName) },
                        React.createElement("span", { className: styles.labelInner }, label)))),
                React.createElement("div", { className: styles.input }, children)),
            rightAddons && (React.createElement("div", { className: cn(styles.addons, styles.rightAddons, addonsClassName) }, rightAddons))),
        bottomAddons,
        errorMessage && (React.createElement("span", { className: cn(styles.sub, styles.error, colorStyles[colors].error), role: 'alert' }, errorMessage)),
        hint && !errorMessage && (React.createElement("span", { className: cn(styles.sub, colorStyles[colors].hint) }, hint))));
});

export { FormControl };
