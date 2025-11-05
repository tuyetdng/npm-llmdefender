import { FC } from 'react';
import { SwipeableHandlers } from 'react-swipeable/types';
import { BackdropProps } from "../../../../backdrop";
type SwipeableBackdropProps = BackdropProps & {
    /**
     * Прозрачность бэкдропа
     */
    opacity?: number;
    /**
     * Обработчики свайпа
     */
    handlers?: SwipeableHandlers;
    /**
     * Время анимации opacity
     */
    opacityTimeout?: number;
};
declare const SwipeableBackdrop: FC<SwipeableBackdropProps>;
export { SwipeableBackdropProps, SwipeableBackdrop };
