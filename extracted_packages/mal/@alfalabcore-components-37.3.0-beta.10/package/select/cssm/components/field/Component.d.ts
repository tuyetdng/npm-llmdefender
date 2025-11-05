/// <reference types="react" />
import { FormControlProps } from "../../../../form-control";
import { FieldProps as BaseFieldProps } from "../../typings";
declare const Field: ({ size, open, multiple, error, hint, disabled, label, labelView, placeholder, selectedMultiple, selected, rightAddons, valueRenderer, setSelectedItems, toggleMenu, Arrow, innerProps, dataTestId, fieldClassName, ...restProps }: BaseFieldProps & FormControlProps) => JSX.Element;
export { Field };
