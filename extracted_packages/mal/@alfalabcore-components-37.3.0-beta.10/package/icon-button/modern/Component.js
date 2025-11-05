import React, { forwardRef } from 'react';
import cn from 'classnames';
import { Button } from '../../button/modern';

const defaultColors = {"primary":"icon-button__primary_1p7l4","secondary":"icon-button__secondary_1p7l4","transparent":"icon-button__transparent_1p7l4","negative":"icon-button__negative_1p7l4","tertiary":"icon-button__tertiary_1p7l4","component":"icon-button__component_1p7l4","loader":"icon-button__loader_1p7l4"};
require('./default.css');

const styles = {"xxs":"icon-button__xxs_plhes","xs":"icon-button__xs_plhes","s":"icon-button__s_plhes","iconWrapper":"icon-button__iconWrapper_plhes","icon":"icon-button__icon_plhes"};
require('./index.css');

const invertedColors = {"primary":"icon-button__primary_1xice","secondary":"icon-button__secondary_1xice","transparent":"icon-button__transparent_1xice","negative":"icon-button__negative_1xice","tertiary":"icon-button__tertiary_1xice","component":"icon-button__component_1xice","loader":"icon-button__loader_1xice"};
require('./inverted.css');

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};
const IconButton = forwardRef(({ className, icon: Icon, view = 'primary', size = 's', colors = 'default', ...restProps }, ref) => (React.createElement(Button, { ...restProps, ref: ref, view: 'ghost', className: cn('cc-icon-button', className, colorStyles[colors][view], colorStyles[colors].component, {
        [colorStyles[colors].loader]: restProps.loading,
    }), size: 's' },
    React.createElement("span", { className: cn(styles.iconWrapper, styles[size]) },
        React.createElement(Icon, { className: styles.icon })))));

export { IconButton };
