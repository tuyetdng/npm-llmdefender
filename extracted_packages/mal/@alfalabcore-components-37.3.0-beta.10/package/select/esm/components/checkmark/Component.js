import React, { useCallback } from 'react';
import cn from 'classnames';
import { Badge } from '../../../../badge/esm';
import { Checkbox } from '../../../../checkbox/esm';
import { CheckmarkCircleMIcon } from '@alfalab/icons-glyph/CheckmarkCircleMIcon';

var styles = {"checkmark":"select__checkmark_1advo","single":"select__single_1advo","selected":"select__selected_1advo","before":"select__before_1advo","multiple":"select__multiple_1advo","after":"select__after_1advo","colorIcon":"select__colorIcon_1advo"};
require('./index.css');

var Checkmark = function (_a) {
    var _b;
    var selected = _a.selected, _c = _a.disabled, disabled = _c === void 0 ? false : _c, className = _a.className, multiple = _a.multiple, _d = _a.position, position = _d === void 0 ? 'before' : _d;
    var single = !multiple || position === 'after';
    var checkmarkClassNames = cn(styles.checkmark, className, styles[position], (_b = {},
        _b[styles.multiple] = !single,
        _b[styles.single] = single,
        _b[styles.selected] = selected,
        _b));
    var handleCheckboxClick = useCallback(function (event) { return event.stopPropagation(); }, []);
    return single ? (React.createElement("div", { className: checkmarkClassNames },
        React.createElement(Badge, { className: styles.after, view: 'icon', size: 'm', iconColor: 'positive', content: React.createElement(CheckmarkCircleMIcon, { className: styles.colorIcon }) }))) : (React.createElement(Checkbox, { checked: selected, disabled: disabled, className: checkmarkClassNames, size: 'm', onClick: handleCheckboxClick }));
};

export { Checkmark };
