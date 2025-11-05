import { a as __rest, _ as __assign } from '../../tslib.es6-4869e457.js';
import React, { forwardRef } from 'react';
import cn from 'classnames';
import { Button } from '../../../../button/esm';

var styles = {"button":"calendar__button_9j6vw","filled":"calendar__filled_9j6vw","outlined":"calendar__outlined_9j6vw","selected":"calendar__selected_9j6vw"};
require('./index.css');

var SelectButton = forwardRef(function (_a, ref) {
    var className = _a.className, children = _a.children, _b = _a.view, view = _b === void 0 ? 'default' : _b, restProps = __rest(_a, ["className", "children", "view"]);
    return (React.createElement(Button, __assign({}, restProps, { ref: ref, view: 'ghost', size: 'xs', className: cn(styles.button, styles[view], className) }), children));
});

export { SelectButton };
