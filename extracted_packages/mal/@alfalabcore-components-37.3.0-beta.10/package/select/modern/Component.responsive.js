import React, { forwardRef } from 'react';
import { useMedia } from '@alfalab/hooks';
import { Select } from './Component.js';
import 'classnames';
import '@alfalab/icons-glyph/ChevronDownMIcon';
import './Component-1d36bace.js';
import { S as SelectMobile } from './Component-c1d61517.js';
import '../../form-control/modern';
import '../../badge/modern';
import '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import '@alfalab/icons-glyph/CheckmarkMIcon';
import '../../checkbox/modern';
import './components/options-list/Component.js';
import 'react-virtual';
import '../../scrollbar/modern';
import './components/arrow/Component.js';
import './components/field/Component.js';
import './components/optgroup/Component.js';
import './components/option/Component.js';
import './components/base-select-mobile/checkmark/Component.js';
import './components/checkmark/Component.js';
import 'react-merge-refs';
import '@juggle/resize-observer';
import 'downshift';
import '../../popover/modern';
import './components/native-select/Component.js';
import '../../bottom-sheet/modern';
import '../../modal/modern/mobile';
import './components/base-option/Component.js';
import './components/base-checkmark/Component.js';
import '../../skeleton/modern';
import './intersection-observer-b8a51493.js';
import '../../button/modern';
import './components/base-select-mobile/options-list/Component.js';
import '../../base-modal/modern';
import './utils.js';

const SelectResponsive = forwardRef(({ footer, swipeable, bottomSheetProps, OptionsList, onScroll, fieldProps, breakpoint = 1024, ...restProps }, ref) => {
    const [view] = useMedia([
        ['mobile', `(max-width: ${breakpoint - 1}px)`],
        ['desktop', `(min-width: ${breakpoint}px)`],
    ], 'desktop');
    return view === 'desktop' ? (React.createElement(Select, { OptionsList: OptionsList, onScroll: onScroll, ...restProps, ref: ref, fieldProps: fieldProps })) : (React.createElement(SelectMobile, { footer: footer, swipeable: swipeable, bottomSheetProps: bottomSheetProps, fieldProps: fieldProps, ...restProps, ref: ref }));
});

export { SelectResponsive };
