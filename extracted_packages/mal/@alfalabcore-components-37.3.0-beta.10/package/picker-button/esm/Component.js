import { _ as __rest, a as __assign } from './tslib.es6-ebff0dba.js';
import React, { forwardRef } from 'react';
import cn from 'classnames';
import { BaseSelect, OptionsList, Optgroup } from '../../select/esm';
import { Field } from './field/Component.js';
import { Option } from './option/Component.js';
import '../../button/esm';
import '@alfalab/icons-glyph/ChevronDownCompactSIcon';
import '@alfalab/icons-glyph/ChevronDownMIcon';
import '@alfalab/icons-glyph/MoreMIcon';
import '@alfalab/icons-glyph/MoreSIcon';
import './utils/index.js';

var styles = {"container":"picker-button__container_1haon","optionsPopover":"picker-button__optionsPopover_1haon","sideGap":"picker-button__sideGap_1haon","optionsListContainer":"picker-button__optionsListContainer_1haon","option":"picker-button__option_1haon"};
require('./index.css');

var SIDE_POSITIONS = ['right', 'right-start', 'right-end', 'left', 'left-start', 'left-end'];
var PickerButtonDesktop = forwardRef(function (_a, ref) {
    var _b;
    var _c = _a.OptionsList, OptionsList$1 = _c === void 0 ? OptionsList : _c, _d = _a.Optgroup, Optgroup$1 = _d === void 0 ? Optgroup : _d, _e = _a.Option, Option$1 = _e === void 0 ? Option : _e, view = _a.view, loading = _a.loading, _f = _a.size, size = _f === void 0 ? 'm' : _f, _g = _a.variant, variant = _g === void 0 ? 'default' : _g, className = _a.className, leftAddons = _a.leftAddons, rightAddons = _a.rightAddons, popperClassName = _a.popperClassName, optionsListClassName = _a.optionsListClassName, optionClassName = _a.optionClassName, showArrow = _a.showArrow, restProps = __rest(_a, ["OptionsList", "Optgroup", "Option", "view", "loading", "size", "variant", "className", "leftAddons", "rightAddons", "popperClassName", "optionsListClassName", "optionClassName", "showArrow"]);
    var isSideGap = !!restProps.popoverPosition && SIDE_POSITIONS.includes(restProps.popoverPosition);
    return (React.createElement(BaseSelect, __assign({}, restProps, { optionProps: { Checkmark: null }, ref: ref, Option: Option$1, Field: Field, size: size === 'm' ? 'm' : 's', fieldProps: {
            view: view,
            loading: loading,
            /** size у select, button несовместимы */
            buttonSize: size,
            buttonVariant: variant,
            leftAddons: leftAddons,
            rightAddons: rightAddons,
            showArrow: showArrow,
        }, Optgroup: Optgroup$1, OptionsList: OptionsList$1, className: cn(styles.container, className), popperClassName: cn('cc-picker-button', styles.optionsPopover, popperClassName, (_b = {},
            _b[styles.sideGap] = isSideGap,
            _b)), optionsListClassName: cn(styles.optionsListContainer, optionsListClassName), optionClassName: cn(styles.option, optionClassName), selected: [], closeOnSelect: true })));
});

export { PickerButtonDesktop };
