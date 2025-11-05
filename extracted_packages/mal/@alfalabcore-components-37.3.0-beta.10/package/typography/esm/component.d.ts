import { FC, ForwardRefExoticComponent, RefAttributes } from 'react';
import { TextProps } from "./text/index";
import { TitleProps } from "./title/index";
import { TitleMobileProps } from "./title-mobile/index";
import { TextElementType } from "./types";
declare const Typography: {
    Title: FC<TitleProps>;
    Text: ForwardRefExoticComponent<TextProps & RefAttributes<TextElementType>>;
    TitleResponsive: FC<TitleProps>;
    TitleMobile: FC<TitleMobileProps>;
};
export { Typography };
