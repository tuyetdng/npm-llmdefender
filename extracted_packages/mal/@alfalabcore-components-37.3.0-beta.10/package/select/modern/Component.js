import React, { forwardRef } from 'react';
import { Arrow } from './components/arrow/Component.js';
import { B as BaseSelect } from './Component-1d36bace.js';
import { Field } from './components/field/Component.js';
import { Optgroup } from './components/optgroup/Component.js';
import { Option } from './components/option/Component.js';
import { OptionsList } from './components/options-list/Component.js';
import 'classnames';
import '@alfalab/icons-glyph/ChevronDownMIcon';
import 'react-merge-refs';
import '@juggle/resize-observer';
import 'downshift';
import '../../popover/modern';
import '@alfalab/hooks';
import './components/native-select/Component.js';
import '../../form-control/modern';
import './components/base-select-mobile/checkmark/Component.js';
import '../../badge/modern';
import '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import '@alfalab/icons-glyph/CheckmarkMIcon';
import './components/checkmark/Component.js';
import '../../checkbox/modern';
import '../../scrollbar/modern';
import './utils.js';

const Select = forwardRef(({ Arrow: Arrow$1 = Arrow, Field: Field$1 = Field, OptionsList: OptionsList$1 = OptionsList, Optgroup: Optgroup$1 = Optgroup, Option: Option$1 = Option, ...restProps }, ref) => (React.createElement(BaseSelect, { ref: ref, Option: Option$1, Field: Field$1, Optgroup: Optgroup$1, OptionsList: OptionsList$1, Arrow: Arrow$1, ...restProps })));

export { Select };
