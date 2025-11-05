/// <reference types="react" />
import { FormControlProps } from "../../../form-control";
import { InputAutocompleteProps } from "../index";
import { FieldProps as BaseFieldProps } from "../../../select";
type AutocompleteMobileFieldProps = FormControlProps & Omit<BaseFieldProps, 'selected' | 'multiple' | 'success'> & Pick<InputAutocompleteProps, 'value'>;
declare const AutocompleteMobileField: ({ size, open, error, hint, disabled, label, labelView, placeholder, value, innerProps, dataTestId, fieldClassName, Arrow, valueRenderer, toggleMenu, setSelectedItems, selectedMultiple, ...restProps }: AutocompleteMobileFieldProps) => JSX.Element;
export { AutocompleteMobileFieldProps, AutocompleteMobileField };
