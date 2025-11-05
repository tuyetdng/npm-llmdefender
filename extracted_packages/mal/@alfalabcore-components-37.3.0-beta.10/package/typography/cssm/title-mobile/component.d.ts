import { FC } from 'react';
import { TitleProps } from "../title/component";
type TitleMobileProps = Omit<TitleProps, 'defaultMargins'>;
declare const TitleMobile: FC<TitleMobileProps>;
export { TitleMobileProps, TitleMobile };
