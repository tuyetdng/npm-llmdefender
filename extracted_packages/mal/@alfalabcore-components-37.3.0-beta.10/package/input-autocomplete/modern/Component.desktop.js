import React, { forwardRef } from 'react';
import { BaseSelect, OptionsList, Optgroup, Option } from '../../select/modern';
import { AutocompleteField } from './autocomplete-field/Component.js';
import 'react-merge-refs';
import 'classnames';
import '../../input/modern';

const InputAutocompleteDesktop = forwardRef(({ OptionsList: OptionsList$1 = OptionsList, Optgroup: Optgroup$1 = Optgroup, Option: Option$1 = Option, Input, inputProps = {}, onInput, value, success, readOnly, closeOnSelect = false, options, ...restProps }, ref) => (React.createElement(BaseSelect, { ref: ref, autocomplete: true, options: options, closeOnSelect: closeOnSelect, Option: Option$1, Field: AutocompleteField, fieldProps: {
        Input,
        onInput,
        value,
        inputProps,
        readOnly,
        success,
    }, Optgroup: Optgroup$1, OptionsList: OptionsList$1, ...restProps })));

export { InputAutocompleteDesktop };
