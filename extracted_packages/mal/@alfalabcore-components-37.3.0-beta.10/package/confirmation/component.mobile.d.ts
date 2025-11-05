import { FC } from 'react';
import { ConfirmationProps } from "./types";
type MobileConfirmationProps = Omit<ConfirmationProps, 'mobile'>;
declare const ConfirmationMobile: FC<MobileConfirmationProps>;
export { MobileConfirmationProps, ConfirmationMobile };
