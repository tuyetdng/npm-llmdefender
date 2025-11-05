import React, { useContext, useEffect } from 'react';
import cn from 'classnames';
import { ModalContext } from '../../Context.js';
import '../../../../base-modal/modern';

const styles = {"header":"side-panel__header_1via4","hasContent":"side-panel__hasContent_1via4","highlighted":"side-panel__highlighted_1via4","sticky":"side-panel__sticky_1via4","backgroundImage":"side-panel__backgroundImage_1via4","content":"side-panel__content_1via4","title":"side-panel__title_1via4","addon":"side-panel__addon_1via4","closer":"side-panel__closer_1via4","left":"side-panel__left_1via4","center":"side-panel__center_1via4","right":"side-panel__right_1via4","trim":"side-panel__trim_1via4"};
require('./index.css');

const Header = ({ className, addonClassName, contentClassName, leftAddons, children, align = 'left', trim = true, title, closer, sticky, imageUrl, dataTestId, }) => {
    const { headerHighlighted, setHasHeader } = useContext(ModalContext);
    const hasContent = Boolean(title || children);
    useEffect(() => {
        setHasHeader(true);
    }, [setHasHeader]);
    return (React.createElement("div", { className: cn(styles.header, className, {
            [styles.backgroundImage]: imageUrl,
            [styles.highlighted]: hasContent && sticky && headerHighlighted,
            [styles.sticky]: sticky,
            [styles.hasContent]: hasContent,
        }), "data-test-id": dataTestId, style: {
            ...(imageUrl && { backgroundImage: `url(${imageUrl})` }),
        } },
        leftAddons && React.createElement("div", { className: cn(styles.addon, addonClassName) }, leftAddons),
        hasContent && (React.createElement("div", { className: cn(styles.content, contentClassName, styles[align], {
                [styles.trim]: trim,
            }) },
            children,
            title && React.createElement("div", { className: styles.title }, title))),
        closer && (React.createElement("div", { className: cn(styles.addon, styles.closer, addonClassName) }, closer))));
};

export { Header };
