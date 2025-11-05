import { _ as __rest, a as __assign } from './tslib.es6-0bbcaa10.js';
import React, { forwardRef } from 'react';
import { Arrow } from './components/arrow/Component.js';
import { B as BaseSelect } from './Component-31f76563.js';
import { Field } from './components/field/Component.js';
import { Optgroup } from './components/optgroup/Component.js';
import { Option } from './components/option/Component.js';
import { OptionsList } from './components/options-list/Component.js';
import 'classnames';
import '@alfalab/icons-glyph/ChevronDownMIcon';
import 'react-merge-refs';
import '@juggle/resize-observer';
import 'downshift';
import '../../popover/esm';
import '@alfalab/hooks';
import './components/native-select/Component.js';
import '../../form-control/esm';
import './components/base-select-mobile/checkmark/Component.js';
import '../../badge/esm';
import '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import '@alfalab/icons-glyph/CheckmarkMIcon';
import './components/checkmark/Component.js';
import '../../checkbox/esm';
import '../../scrollbar/esm';
import './utils.js';

var Select = forwardRef(function (_a, ref) {
    var _b = _a.Arrow, Arrow$1 = _b === void 0 ? Arrow : _b, _c = _a.Field, Field$1 = _c === void 0 ? Field : _c, _d = _a.OptionsList, OptionsList$1 = _d === void 0 ? OptionsList : _d, _e = _a.Optgroup, Optgroup$1 = _e === void 0 ? Optgroup : _e, _f = _a.Option, Option$1 = _f === void 0 ? Option : _f, restProps = __rest(_a, ["Arrow", "Field", "OptionsList", "Optgroup", "Option"]);
    return (React.createElement(BaseSelect, __assign({ ref: ref, Option: Option$1, Field: Field$1, Optgroup: Optgroup$1, OptionsList: OptionsList$1, Arrow: Arrow$1 }, restProps)));
});

export { Select };
