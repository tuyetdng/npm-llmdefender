import React, { forwardRef } from 'react';
import cn from 'classnames';
import { Button } from '../../../../button/modern';

const styles = {"button":"calendar__button_9j6vw","filled":"calendar__filled_9j6vw","outlined":"calendar__outlined_9j6vw","selected":"calendar__selected_9j6vw"};
require('./index.css');

const SelectButton = forwardRef(({ className, children, view = 'default', ...restProps }, ref) => (React.createElement(Button, { ...restProps, ref: ref, view: 'ghost', size: 'xs', className: cn(styles.button, styles[view], className) }, children)));

export { SelectButton };
