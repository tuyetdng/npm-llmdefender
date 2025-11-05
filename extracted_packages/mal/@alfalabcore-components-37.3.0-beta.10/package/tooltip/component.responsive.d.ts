/// <reference types="react" />
import React from 'react';
import { FC } from "react";
import { BottomSheetProps } from "../bottom-sheet";
import { TooltipProps } from "./index";
type View = 'desktop' | 'mobile';
type TooltipResponsiveProps = Omit<TooltipProps, 'open' | 'onClose' | 'onOpen'> & {
    /**
     * Режим отображения по умолчанию
     */
    defaultMatch?: View;
    /**
     * Управление видимостью
     */
    open?: boolean;
    /**
     * Обработчик открытия
     */
    onOpen?: (event?: React.MouseEvent<HTMLElement>) => void;
    /**
     * Обработчик закрытия
     */
    onClose?: (event?: React.MouseEvent<HTMLElement>) => void;
    /**
     * Заголовок кнопки в футере
     */
    actionButtonTitle?: string;
    /**
     * Наличие компонента крестика
     * @deprecated(используйте bottomSheetProps.hasCloser)
     */
    hasCloser?: boolean;
    /**
     *  Дополнительные пропсы компонента BottomSheet
     */
    bottomSheetProps?: Partial<BottomSheetProps>;
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};
declare const TooltipResponsive: FC<TooltipResponsiveProps>;
export { TooltipResponsive };
