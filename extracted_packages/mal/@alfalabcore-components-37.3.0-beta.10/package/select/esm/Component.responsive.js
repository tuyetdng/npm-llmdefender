import { _ as __rest, a as __assign } from './tslib.es6-0bbcaa10.js';
import React, { forwardRef } from 'react';
import { useMedia } from '@alfalab/hooks';
import { Select } from './Component.js';
import 'classnames';
import '@alfalab/icons-glyph/ChevronDownMIcon';
import './Component-31f76563.js';
import { S as SelectMobile } from './Component-97b29b7a.js';
import '../../form-control/esm';
import '../../badge/esm';
import '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import '@alfalab/icons-glyph/CheckmarkMIcon';
import '../../checkbox/esm';
import './components/options-list/Component.js';
import 'react-virtual';
import '../../scrollbar/esm';
import './components/arrow/Component.js';
import './components/field/Component.js';
import './components/optgroup/Component.js';
import './components/option/Component.js';
import './components/base-select-mobile/checkmark/Component.js';
import './components/checkmark/Component.js';
import 'react-merge-refs';
import '@juggle/resize-observer';
import 'downshift';
import '../../popover/esm';
import './components/native-select/Component.js';
import '../../bottom-sheet/esm';
import '../../modal/esm/mobile';
import './components/base-option/Component.js';
import './components/base-checkmark/Component.js';
import '../../skeleton/esm';
import './intersection-observer-b8a51493.js';
import '../../button/esm';
import './components/base-select-mobile/options-list/Component.js';
import '../../base-modal/esm';
import './utils.js';

var SelectResponsive = forwardRef(function (_a, ref) {
    var footer = _a.footer, swipeable = _a.swipeable, bottomSheetProps = _a.bottomSheetProps, OptionsList = _a.OptionsList, onScroll = _a.onScroll, fieldProps = _a.fieldProps, _b = _a.breakpoint, breakpoint = _b === void 0 ? 1024 : _b, restProps = __rest(_a, ["footer", "swipeable", "bottomSheetProps", "OptionsList", "onScroll", "fieldProps", "breakpoint"]);
    var view = useMedia([
        ['mobile', "(max-width: ".concat(breakpoint - 1, "px)")],
        ['desktop', "(min-width: ".concat(breakpoint, "px)")],
    ], 'desktop')[0];
    return view === 'desktop' ? (React.createElement(Select, __assign({ OptionsList: OptionsList, onScroll: onScroll }, restProps, { ref: ref, fieldProps: fieldProps }))) : (React.createElement(SelectMobile, __assign({ footer: footer, swipeable: swipeable, bottomSheetProps: bottomSheetProps, fieldProps: fieldProps }, restProps, { ref: ref })));
});

export { SelectResponsive };
