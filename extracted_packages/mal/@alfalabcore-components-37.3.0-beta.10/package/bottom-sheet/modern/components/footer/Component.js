import React, { useContext, useEffect } from 'react';
import cn from 'classnames';
import { BaseModalContext } from '../../../../base-modal/modern';

const styles = {"footer":"bottom-sheet__footer_1mk8h","sticky":"bottom-sheet__sticky_1mk8h","highlighted":"bottom-sheet__highlighted_1mk8h"};
require('./index.css');

const Footer = ({ children, className, sticky }) => {
    const { footerHighlighted, setHasFooter } = useContext(BaseModalContext);
    useEffect(() => {
        setHasFooter(true);
    }, [setHasFooter]);
    return (React.createElement("div", { className: cn(styles.footer, className, {
            [styles.sticky]: sticky,
            [styles.highlighted]: footerHighlighted && sticky,
        }) }, children));
};

export { Footer };
