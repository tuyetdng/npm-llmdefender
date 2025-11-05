/// <reference types="react" />
import { ButtonProps } from "../../button";
import { FieldProps as BaseFieldProps } from "../typings-ac481e66";
import { PickerButtonSize, PickerButtonVariant } from "../Component";
type FieldProps = Omit<BaseFieldProps, 'size' | 'hint' | 'success' | 'error' | 'placeholder'> & ButtonProps & {
    buttonSize?: PickerButtonSize;
    buttonVariant?: PickerButtonVariant;
    showArrow?: boolean;
};
declare const Field: ({ buttonSize, buttonVariant, view, label, open, multiple, rightAddons, Arrow, innerProps, className, selected, selectedMultiple, setSelectedItems, toggleMenu, valueRenderer, showArrow, ...restProps }: FieldProps) => JSX.Element;
export { Field };
