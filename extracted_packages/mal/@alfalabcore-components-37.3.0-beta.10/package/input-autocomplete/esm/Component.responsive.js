import { _ as __rest, a as __assign } from './tslib.es6-c603502c.js';
import React from 'react';
import { useMedia } from '@alfalab/hooks';
import { InputAutocompleteDesktop } from './Component.desktop.js';
import { InputAutocompleteMobile } from './Component.mobile.js';
import '../../select/esm';
import './autocomplete-field/Component.js';
import 'react-merge-refs';
import 'classnames';
import '../../input/esm';
import 'lodash.throttle';
import '../../button/esm';
import './autocomplete-mobile-field/Component.js';
import '../../form-control/esm';

var InputAutocompleteResponsive = function (_a) {
    var _b = _a.breakpoint, breakpoint = _b === void 0 ? 1024 : _b, restProps = __rest(_a, ["breakpoint"]);
    var view = useMedia([
        ['mobile', "(max-width: ".concat(breakpoint - 1, "px)")],
        ['desktop', "(min-width: ".concat(breakpoint, "px)")],
    ], 'desktop')[0];
    return view === 'desktop' ? (React.createElement(InputAutocompleteDesktop, __assign({}, restProps))) : (React.createElement(InputAutocompleteMobile, __assign({}, restProps)));
};

export { InputAutocompleteResponsive };
