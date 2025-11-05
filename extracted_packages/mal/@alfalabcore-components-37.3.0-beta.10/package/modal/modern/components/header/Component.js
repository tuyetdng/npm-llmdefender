import React, { useContext, useEffect } from 'react';
import cn from 'classnames';
import { CrossMIcon } from '@alfalab/icons-glyph/CrossMIcon';
import { ModalContext } from '../../Context.js';
import { ResponsiveContext } from '../../ResponsiveContext.js';
import { Closer } from '../closer/Component.js';
import '../../../../base-modal/modern';
import '../../../../icon-button/modern';
import '@alfalab/icons-glyph/CrossHeavyMIcon';

const getDataTestId = (dataTestId, element) => {
    const elementPart = element ? `-${element.toLowerCase()}` : '';
    return dataTestId ? `${dataTestId}${elementPart}` : undefined;
};

const desktopStyles = {"header":"modal__header_2m9gw","content":"modal__content_2m9gw","s":"modal__s_2m9gw","m":"modal__m_2m9gw","l":"modal__l_2m9gw","xl":"modal__xl_2m9gw","fullscreen":"modal__fullscreen_2m9gw","hasContent":"modal__hasContent_2m9gw","sticky":"modal__sticky_2m9gw"};
require('./desktop.css');

const styles = {"header":"modal__header_1jbvb","hasContent":"modal__hasContent_1jbvb","highlighted":"modal__highlighted_1jbvb","sticky":"modal__sticky_1jbvb","content":"modal__content_1jbvb","title":"modal__title_1jbvb","addon":"modal__addon_1jbvb","closer":"modal__closer_1jbvb","left":"modal__left_1jbvb","center":"modal__center_1jbvb","right":"modal__right_1jbvb","trim":"modal__trim_1jbvb"};
require('./index.css');

const mobileStyles = {"sticky":"modal__sticky_tqntf","content":"modal__content_tqntf"};
require('./mobile.css');

const Header = ({ className, addonClassName, contentClassName, leftAddons, children, align = 'left', trim = true, title, hasCloser = true, sticky, dataTestId, }) => {
    const { headerHighlighted, setHasHeader } = useContext(ModalContext);
    const { size, view } = useContext(ResponsiveContext);
    const hasContent = title || Boolean(children);
    useEffect(() => {
        setHasHeader(true);
    }, [setHasHeader]);
    return (React.createElement("div", { className: cn(styles.header, className, {
            [styles.highlighted]: hasContent && sticky && headerHighlighted,
            [styles.sticky]: sticky,
            [styles.hasContent]: hasContent,
            [desktopStyles.header]: view === 'desktop',
            [desktopStyles.hasContent]: view === 'desktop' && hasContent,
            [desktopStyles.sticky]: view === 'desktop' && sticky,
            [desktopStyles[size]]: view === 'desktop',
            [mobileStyles.sticky]: view === 'mobile' && sticky,
        }), "data-test-id": getDataTestId(dataTestId) },
        (leftAddons || view === 'desktop') && (React.createElement("div", { className: cn(styles.addon, addonClassName) }, leftAddons)),
        hasContent && (React.createElement("div", { className: cn(styles.content, contentClassName, styles[align], {
                [styles.trim]: trim,
                [desktopStyles.content]: view === 'desktop',
                [mobileStyles.content]: view === 'mobile',
            }) },
            children,
            title && (React.createElement("div", { className: styles.title, "data-test-id": getDataTestId(dataTestId, 'title') }, title)))),
        hasCloser && (React.createElement("div", { className: cn(styles.addon, styles.closer, addonClassName) }, view === 'desktop' ? (React.createElement(Closer, { dataTestId: getDataTestId(dataTestId, 'closer') })) : (React.createElement(Closer, { icon: CrossMIcon, size: 'xs', dataTestId: getDataTestId(dataTestId, 'closer') }))))));
};

export { Header };
