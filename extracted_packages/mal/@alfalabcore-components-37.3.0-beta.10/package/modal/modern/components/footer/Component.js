import React, { useContext, useEffect } from 'react';
import cn from 'classnames';
import { ModalContext } from '../../Context.js';
import { ResponsiveContext } from '../../ResponsiveContext.js';
import '../../../../base-modal/modern';

const desktopStyles = {"footer":"modal__footer_bz1kd","sticky":"modal__sticky_bz1kd","fullscreen":"modal__fullscreen_bz1kd","s":"modal__s_bz1kd","m":"modal__m_bz1kd","l":"modal__l_bz1kd","xl":"modal__xl_bz1kd"};
require('./desktop.css');

const styles = {"footer":"modal__footer_1d6lo","sticky":"modal__sticky_1d6lo","highlighted":"modal__highlighted_1d6lo"};
require('./index.css');

const layoutStyles = {"column":"modal__column_1831v","gap-16":"modal__gap-16_1831v","gap-24":"modal__gap-24_1831v","gap-32":"modal__gap-32_1831v","start":"modal__start_1831v","center":"modal__center_1831v","space-between":"modal__space-between_1831v"};
require('./layout.css');

const mobileStyles = {"footer":"modal__footer_1ggyk","sticky":"modal__sticky_1ggyk"};
require('./mobile.css');

const Footer = ({ children, className, sticky, layout = 'start', gap }) => {
    const { footerHighlighted, setHasFooter } = useContext(ModalContext);
    const { size, view } = useContext(ResponsiveContext);
    useEffect(() => {
        setHasFooter(true);
    }, [setHasFooter]);
    return (React.createElement("div", { className: cn(styles.footer, className, layoutStyles[layout], gap && layoutStyles[`gap-${gap}`], {
            [styles.highlighted]: sticky && footerHighlighted,
            [styles.sticky]: sticky,
            [desktopStyles.footer]: view === 'desktop',
            [desktopStyles.sticky]: view === 'desktop' && sticky,
            [desktopStyles[size]]: view === 'desktop',
            [mobileStyles.footer]: view === 'mobile',
            [mobileStyles.sticky]: view === 'mobile' && sticky,
        }) }, children));
};

export { Footer };
