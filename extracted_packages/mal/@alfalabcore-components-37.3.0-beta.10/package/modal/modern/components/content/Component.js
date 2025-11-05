import React, { useContext } from 'react';
import cn from 'classnames';
import { ModalContext } from '../../Context.js';
import { ResponsiveContext } from '../../ResponsiveContext.js';
import '../../../../base-modal/modern';

const desktopStyles = {"s":"modal__s_14qa7","m":"modal__m_14qa7","l":"modal__l_14qa7","xl":"modal__xl_14qa7","fullscreen":"modal__fullscreen_14qa7"};
require('./desktop.css');

const styles = {"content":"modal__content_nsba3","flex":"modal__flex_nsba3"};
require('./index.css');

const mobileStyles = {"content":"modal__content_1pvc0"};
require('./mobile.css');

const Content = ({ children, flex, className }) => {
    const { contentRef } = useContext(ModalContext);
    const { size, view } = useContext(ResponsiveContext);
    return (React.createElement("div", { className: cn(styles.content, className, {
            [styles.flex]: flex,
            [desktopStyles[size]]: view === 'desktop' && size,
            [mobileStyles.content]: view === 'mobile',
        }), ref: contentRef }, children));
};

export { Content };
