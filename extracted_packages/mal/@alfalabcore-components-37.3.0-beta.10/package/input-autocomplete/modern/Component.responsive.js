import React from 'react';
import { useMedia } from '@alfalab/hooks';
import { InputAutocompleteDesktop } from './Component.desktop.js';
import { InputAutocompleteMobile } from './Component.mobile.js';
import '../../select/modern';
import './autocomplete-field/Component.js';
import 'react-merge-refs';
import 'classnames';
import '../../input/modern';
import 'lodash.throttle';
import '../../button/modern';
import './autocomplete-mobile-field/Component.js';
import '../../form-control/modern';

const InputAutocompleteResponsive = ({ breakpoint = 1024, ...restProps }) => {
    const [view] = useMedia([
        ['mobile', `(max-width: ${breakpoint - 1}px)`],
        ['desktop', `(min-width: ${breakpoint}px)`],
    ], 'desktop');
    return view === 'desktop' ? (React.createElement(InputAutocompleteDesktop, { ...restProps })) : (React.createElement(InputAutocompleteMobile, { ...restProps }));
};

export { InputAutocompleteResponsive };
