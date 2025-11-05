/// <reference types="react" />
import { ReactNode } from 'react';
type PortalProps = {
    /** Контент */
    children?: ReactNode;
    /**
     * Функция, возвращающая контейнер, в который будут рендериться дочерние элементы
     */
    getPortalContainer?: () => Element;
    /**
     * Немедленно отрендерить дочерние элементы (false - контент будет отрендерен на след. рендер).
     */
    immediateMount?: boolean;
};
declare const Portal: import("react").ForwardRefExoticComponent<PortalProps & import("react").RefAttributes<Element>>;
export { PortalProps, Portal };
