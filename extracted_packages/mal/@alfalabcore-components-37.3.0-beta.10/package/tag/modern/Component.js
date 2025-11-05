import React, { forwardRef, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { useFocus } from '@alfalab/hooks';

const defaultColors = {"component":"tag__component_18740","checked":"tag__checked_18740"};
require('./default.css');

const styles = {"component":"tag__component_13dwt","focused":"tag__focused_13dwt","addons":"tag__addons_13dwt","s":"tag__s_13dwt","m":"tag__m_13dwt","l":"tag__l_13dwt","xl":"tag__xl_13dwt","xxs":"tag__xxs_13dwt","xs":"tag__xs_13dwt","withRightAddons":"tag__withRightAddons_13dwt","withLeftAddons":"tag__withLeftAddons_13dwt","defaultVariant":"tag__defaultVariant_13dwt","alt":"tag__alt_13dwt"};
require('./index.css');

const invertedColors = {"component":"tag__component_v9s7a","checked":"tag__checked_v9s7a"};
require('./inverted.css');

const colorStylesMap = {
    default: defaultColors,
    inverted: invertedColors,
};
const Tag = forwardRef(({ rightAddons, leftAddons, children, size = 's', checked, className, dataTestId, name, colors = 'default', onClick, variant = 'default', ...restProps }, ref) => {
    const colorStyles = colorStylesMap[colors];
    const tagRef = useRef(null);
    const [focused] = useFocus(tagRef, 'keyboard');
    const variantClassName = variant === 'default' ? 'defaultVariant' : variant;
    const tagProps = {
        className: cn(styles.component, colorStyles.component, styles[size], styles[variantClassName], {
            [styles.checked]: checked,
            [colorStyles.checked]: checked,
            [styles.focused]: focused,
            [styles.withRightAddons]: Boolean(rightAddons),
            [styles.withLeftAddons]: Boolean(leftAddons),
        }, className),
        'data-test-id': dataTestId,
    };
    const handleClick = (event) => {
        if (onClick) {
            onClick(event, { name, checked: !checked });
        }
    };
    return (React.createElement("button", { ref: mergeRefs([tagRef, ref]), type: 'button', onClick: handleClick, ...tagProps, ...restProps },
        leftAddons ? React.createElement("span", { className: styles.addons }, leftAddons) : null,
        children && React.createElement("span", null, children),
        rightAddons ? React.createElement("span", { className: styles.addons }, rightAddons) : null));
});

export { Tag };
