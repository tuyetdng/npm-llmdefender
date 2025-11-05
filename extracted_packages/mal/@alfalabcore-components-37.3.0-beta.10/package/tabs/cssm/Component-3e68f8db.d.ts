/// <reference types="react" />
import { FC, SVGProps } from 'react';
import { OptionShape } from "./typings-ac481e66";
import { OptionProps as BaseOptionProps } from "./typings-ac481e66";
type OptionProps = Omit<BaseOptionProps, 'option'> & {
    option: OptionShape & {
        icon?: FC<SVGProps<SVGSVGElement>>;
    };
};
declare const Option: ({ option, children, ...restProps }: OptionProps) => JSX.Element;
export { Option };
