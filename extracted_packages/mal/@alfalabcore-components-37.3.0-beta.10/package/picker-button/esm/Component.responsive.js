import { _ as __rest, a as __assign } from './tslib.es6-ebff0dba.js';
import React, { forwardRef } from 'react';
import { useMedia } from '@alfalab/hooks';
import { PickerButtonDesktop } from './Component.js';
import { PickerButtonMobile } from './Component.mobile.js';
import 'classnames';
import '../../select/esm';
import './field/Component.js';
import '../../button/esm';
import '@alfalab/icons-glyph/ChevronDownCompactSIcon';
import '@alfalab/icons-glyph/ChevronDownMIcon';
import '@alfalab/icons-glyph/MoreMIcon';
import '@alfalab/icons-glyph/MoreSIcon';
import './option/Component.js';
import './utils/index.js';

var PickerButtonResponsive = forwardRef(function (_a, ref) {
    var OptionsList = _a.OptionsList, onScroll = _a.onScroll, footer = _a.footer, swipeable = _a.swipeable, bottomSheetProps = _a.bottomSheetProps, _b = _a.breakpoint, breakpoint = _b === void 0 ? 1024 : _b, restProps = __rest(_a, ["OptionsList", "onScroll", "footer", "swipeable", "bottomSheetProps", "breakpoint"]);
    var view = useMedia([
        ['mobile', "(max-width: ".concat(breakpoint - 1, "px)")],
        ['desktop', "(min-width: ".concat(breakpoint, "px)")],
    ], 'desktop')[0];
    return view === 'desktop' ? (React.createElement(PickerButtonDesktop, __assign({ ref: ref, OptionsList: OptionsList, onScroll: onScroll }, restProps))) : (React.createElement(PickerButtonMobile, __assign({ ref: ref, footer: footer, swipeable: swipeable, bottomSheetProps: bottomSheetProps }, restProps)));
});

export { PickerButtonResponsive };
