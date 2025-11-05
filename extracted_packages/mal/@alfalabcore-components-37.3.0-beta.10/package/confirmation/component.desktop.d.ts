import { FC } from 'react';
import { ConfirmationProps } from "./types";
type DesktopConfirmationProps = Omit<ConfirmationProps, 'mobile'>;
declare const ConfirmationDesktop: FC<DesktopConfirmationProps>;
export { DesktopConfirmationProps, ConfirmationDesktop };
