/// <reference types="react" />
import { FieldProps } from "../../../select";
import { InputAutocompleteDesktopProps } from "../Component.desktop";
type AutocompleteFieldProps = FieldProps & Pick<InputAutocompleteDesktopProps, 'Input' | 'inputProps' | 'value' | 'onInput' | 'readOnly'>;
declare const AutocompleteField: ({ label, labelView, placeholder, size, Arrow, Input, value, error, success, hint, disabled, readOnly, onInput, inputProps, innerProps, }: AutocompleteFieldProps) => JSX.Element;
export { AutocompleteFieldProps, AutocompleteField };
