import React, { useContext } from 'react';
import cn from 'classnames';
import { ModalContext } from '../../Context.js';
import { ResponsiveContext } from '../../ResponsiveContext.js';
import '../../../../base-modal/esm';

var desktopStyles = {"s":"modal__s_14qa7","m":"modal__m_14qa7","l":"modal__l_14qa7","xl":"modal__xl_14qa7","fullscreen":"modal__fullscreen_14qa7"};
require('./desktop.css');

var styles = {"content":"modal__content_nsba3","flex":"modal__flex_nsba3"};
require('./index.css');

var mobileStyles = {"content":"modal__content_1pvc0"};
require('./mobile.css');

var Content = function (_a) {
    var _b;
    var children = _a.children, flex = _a.flex, className = _a.className;
    var contentRef = useContext(ModalContext).contentRef;
    var _c = useContext(ResponsiveContext), size = _c.size, view = _c.view;
    return (React.createElement("div", { className: cn(styles.content, className, (_b = {},
            _b[styles.flex] = flex,
            _b[desktopStyles[size]] = view === 'desktop' && size,
            _b[mobileStyles.content] = view === 'mobile',
            _b)), ref: contentRef }, children));
};

export { Content };
