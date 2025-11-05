import { _ as __rest, a as __assign } from './tslib.es6-ebff0dba.js';
import React, { forwardRef } from 'react';
import { SelectMobile, Optgroup } from '../../select/esm';
import { Field } from './field/Component.js';
import { Option } from './option/Component.js';
import 'classnames';
import '../../button/esm';
import '@alfalab/icons-glyph/ChevronDownCompactSIcon';
import '@alfalab/icons-glyph/ChevronDownMIcon';
import '@alfalab/icons-glyph/MoreMIcon';
import '@alfalab/icons-glyph/MoreSIcon';
import './utils/index.js';

var PickerButtonMobile = forwardRef(function (_a, ref) {
    var options = _a.options, label = _a.label, _b = _a.Option, Option$1 = _b === void 0 ? Option : _b, _c = _a.Optgroup, Optgroup$1 = _c === void 0 ? Optgroup : _c, view = _a.view, loading = _a.loading, _d = _a.variant, variant = _d === void 0 ? 'default' : _d, leftAddons = _a.leftAddons, rightAddons = _a.rightAddons, size = _a.size, bottomSheetProps = _a.bottomSheetProps, showArrow = _a.showArrow, restProps = __rest(_a, ["options", "label", "Option", "Optgroup", "view", "loading", "variant", "leftAddons", "rightAddons", "size", "bottomSheetProps", "showArrow"]);
    return (React.createElement(SelectMobile, __assign({}, restProps, { label: label, Option: Option$1, bottomSheetProps: __assign({ title: label, stickyHeader: true }, bottomSheetProps), Field: Field, Optgroup: Optgroup$1, size: size === 'm' ? 'm' : 's', closeOnSelect: true, fieldProps: {
            view: view,
            loading: loading,
            /** size у select, button несовместимы */
            buttonSize: size,
            buttonVariant: variant,
            leftAddons: leftAddons,
            rightAddons: rightAddons,
            showArrow: showArrow,
        }, ref: ref, options: options, selected: [] })));
});

export { PickerButtonMobile };
