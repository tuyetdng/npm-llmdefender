import React from 'react';
import cn from 'classnames';
import { Checkbox } from '../../../../checkbox/esm';
import { CheckmarkMIcon } from '@alfalab/icons-glyph/CheckmarkMIcon';

var styles = {"checkmark":"select__checkmark_wzibi","single":"select__single_wzibi","selected":"select__selected_wzibi"};
require('./index.css');

var BaseCheckmark = function (_a) {
    var _b;
    var selected = _a.selected, _c = _a.disabled, disabled = _c === void 0 ? false : _c, className = _a.className, multiple = _a.multiple;
    var checkmarkClassNames = cn(styles.checkmark, className, (_b = {},
        _b[styles.multiple] = multiple,
        _b[styles.single] = !multiple,
        _b[styles.selected] = selected,
        _b));
    return multiple ? (React.createElement(Checkbox, { checked: selected, disabled: disabled, className: checkmarkClassNames, size: 'm', onClick: function (event) { return event.stopPropagation(); } })) : (React.createElement(CheckmarkMIcon, { className: checkmarkClassNames }));
};

export { BaseCheckmark };
