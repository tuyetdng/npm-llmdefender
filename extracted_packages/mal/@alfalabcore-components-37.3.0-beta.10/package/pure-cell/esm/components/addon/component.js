import React from 'react';
import cn from 'classnames';
import { g as getDataTestId } from '../../getDataTestId-9131c0fb.js';

var styles = {"component":"pure-cell__component_fwqxv","none":"pure-cell__none_fwqxv","default":"pure-cell__default_fwqxv","addonPadding":"pure-cell__addonPadding_fwqxv","top":"pure-cell__top_fwqxv","center":"pure-cell__center_fwqxv","bottom":"pure-cell__bottom_fwqxv"};
require('./index.css');

var Addon = function (_a) {
    var children = _a.children, _b = _a.verticalAlign, verticalAlign = _b === void 0 ? 'top' : _b, _c = _a.addonPadding, addonPadding = _c === void 0 ? 'default' : _c, dataTestId = _a.dataTestId;
    return (React.createElement("section", { className: cn(styles.component, styles[addonPadding], styles[verticalAlign]), "data-test-id": getDataTestId(dataTestId, 'addon') }, children));
};

export { Addon };
