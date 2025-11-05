import React from 'react';
import cn from 'classnames';
import { g as getDataTestId } from '../../getDataTestId-7d6c8fa8.js';

const styles = {"component":"pure-cell__component_fwqxv","none":"pure-cell__none_fwqxv","default":"pure-cell__default_fwqxv","addonPadding":"pure-cell__addonPadding_fwqxv","top":"pure-cell__top_fwqxv","center":"pure-cell__center_fwqxv","bottom":"pure-cell__bottom_fwqxv"};
require('./index.css');

const Addon = ({ children, verticalAlign = 'top', addonPadding = 'default', dataTestId, }) => (React.createElement("section", { className: cn(styles.component, styles[addonPadding], styles[verticalAlign]), "data-test-id": getDataTestId(dataTestId, 'addon') }, children));

export { Addon };
