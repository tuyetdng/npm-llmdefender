import { _ as __rest, a as __assign } from './tslib.es6-c603502c.js';
import React, { forwardRef } from 'react';
import { BaseSelect, OptionsList, Optgroup, Option } from '../../select/esm';
import { AutocompleteField } from './autocomplete-field/Component.js';
import 'react-merge-refs';
import 'classnames';
import '../../input/esm';

var InputAutocompleteDesktop = forwardRef(function (_a, ref) {
    var _b = _a.OptionsList, OptionsList$1 = _b === void 0 ? OptionsList : _b, _c = _a.Optgroup, Optgroup$1 = _c === void 0 ? Optgroup : _c, _d = _a.Option, Option$1 = _d === void 0 ? Option : _d, Input = _a.Input, _e = _a.inputProps, inputProps = _e === void 0 ? {} : _e, onInput = _a.onInput, value = _a.value, success = _a.success, readOnly = _a.readOnly, _f = _a.closeOnSelect, closeOnSelect = _f === void 0 ? false : _f, options = _a.options, restProps = __rest(_a, ["OptionsList", "Optgroup", "Option", "Input", "inputProps", "onInput", "value", "success", "readOnly", "closeOnSelect", "options"]);
    return (React.createElement(BaseSelect, __assign({ ref: ref, autocomplete: true, options: options, closeOnSelect: closeOnSelect, Option: Option$1, Field: AutocompleteField, fieldProps: {
            Input: Input,
            onInput: onInput,
            value: value,
            inputProps: inputProps,
            readOnly: readOnly,
            success: success,
        }, Optgroup: Optgroup$1, OptionsList: OptionsList$1 }, restProps)));
});

export { InputAutocompleteDesktop };
