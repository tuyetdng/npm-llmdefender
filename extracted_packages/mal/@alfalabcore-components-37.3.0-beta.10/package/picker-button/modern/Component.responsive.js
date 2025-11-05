import React, { forwardRef } from 'react';
import { useMedia } from '@alfalab/hooks';
import { PickerButtonDesktop } from './Component.js';
import { PickerButtonMobile } from './Component.mobile.js';
import 'classnames';
import '../../select/modern';
import './field/Component.js';
import '../../button/modern';
import '@alfalab/icons-glyph/ChevronDownCompactSIcon';
import '@alfalab/icons-glyph/ChevronDownMIcon';
import '@alfalab/icons-glyph/MoreMIcon';
import '@alfalab/icons-glyph/MoreSIcon';
import './option/Component.js';
import './utils/index.js';

const PickerButtonResponsive = forwardRef(({ OptionsList, onScroll, footer, swipeable, bottomSheetProps, breakpoint = 1024, ...restProps }, ref) => {
    const [view] = useMedia([
        ['mobile', `(max-width: ${breakpoint - 1}px)`],
        ['desktop', `(min-width: ${breakpoint}px)`],
    ], 'desktop');
    return view === 'desktop' ? (React.createElement(PickerButtonDesktop, { ref: ref, OptionsList: OptionsList, onScroll: onScroll, ...restProps })) : (React.createElement(PickerButtonMobile, { ref: ref, footer: footer, swipeable: swipeable, bottomSheetProps: bottomSheetProps, ...restProps }));
});

export { PickerButtonResponsive };
