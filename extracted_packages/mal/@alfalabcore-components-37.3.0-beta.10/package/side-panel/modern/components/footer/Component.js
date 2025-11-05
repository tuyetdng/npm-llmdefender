import React, { useContext, useEffect } from 'react';
import cn from 'classnames';
import { ModalContext } from '../../Context.js';
import '../../../../base-modal/modern';

const styles = {"footer":"side-panel__footer_1ii1p","sticky":"side-panel__sticky_1ii1p","highlighted":"side-panel__highlighted_1ii1p"};
require('./index.css');

const layoutStyles = {"column":"side-panel__column_mrcgc","gap-16":"side-panel__gap-16_mrcgc","gap-24":"side-panel__gap-24_mrcgc","gap-32":"side-panel__gap-32_mrcgc","start":"side-panel__start_mrcgc","center":"side-panel__center_mrcgc","space-between":"side-panel__space-between_mrcgc"};
require('./layout.css');

const Footer = ({ children, className, sticky, layout = 'start', gap, dataTestId, }) => {
    const { footerHighlighted, setHasFooter } = useContext(ModalContext);
    useEffect(() => {
        setHasFooter(true);
    }, [setHasFooter]);
    return (React.createElement("div", { className: cn(styles.footer, className, layoutStyles[layout], gap && layoutStyles[`gap-${gap}`], {
            [styles.highlighted]: sticky && footerHighlighted,
            [styles.sticky]: sticky,
        }), "data-test-id": dataTestId }, children));
};

export { Footer };
