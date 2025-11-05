import React from 'react';
import cn from 'classnames';
import { Plate } from '../../plate/modern';

const styles = {"component":"alert__component_vxpll","title":"alert__title_vxpll"};
require('./index.css');

const Alert = ({ className, title, ...restProps }) => (React.createElement(Plate, { className: cn(styles.component, className), title: title ? React.createElement("span", { className: styles.title }, title) : null, rounded: false, limitContentWidth: false, ...restProps }));

export { Alert };
