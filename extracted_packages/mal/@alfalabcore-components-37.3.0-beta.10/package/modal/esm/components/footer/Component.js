import React, { useContext, useEffect } from 'react';
import cn from 'classnames';
import { ModalContext } from '../../Context.js';
import { ResponsiveContext } from '../../ResponsiveContext.js';
import '../../../../base-modal/esm';

var desktopStyles = {"footer":"modal__footer_bz1kd","sticky":"modal__sticky_bz1kd","fullscreen":"modal__fullscreen_bz1kd","s":"modal__s_bz1kd","m":"modal__m_bz1kd","l":"modal__l_bz1kd","xl":"modal__xl_bz1kd"};
require('./desktop.css');

var styles = {"footer":"modal__footer_1d6lo","sticky":"modal__sticky_1d6lo","highlighted":"modal__highlighted_1d6lo"};
require('./index.css');

var layoutStyles = {"column":"modal__column_1831v","gap-16":"modal__gap-16_1831v","gap-24":"modal__gap-24_1831v","gap-32":"modal__gap-32_1831v","start":"modal__start_1831v","center":"modal__center_1831v","space-between":"modal__space-between_1831v"};
require('./layout.css');

var mobileStyles = {"footer":"modal__footer_1ggyk","sticky":"modal__sticky_1ggyk"};
require('./mobile.css');

var Footer = function (_a) {
    var _b;
    var children = _a.children, className = _a.className, sticky = _a.sticky, _c = _a.layout, layout = _c === void 0 ? 'start' : _c, gap = _a.gap;
    var _d = useContext(ModalContext), footerHighlighted = _d.footerHighlighted, setHasFooter = _d.setHasFooter;
    var _e = useContext(ResponsiveContext), size = _e.size, view = _e.view;
    useEffect(function () {
        setHasFooter(true);
    }, [setHasFooter]);
    return (React.createElement("div", { className: cn(styles.footer, className, layoutStyles[layout], gap && layoutStyles["gap-".concat(gap)], (_b = {},
            _b[styles.highlighted] = sticky && footerHighlighted,
            _b[styles.sticky] = sticky,
            _b[desktopStyles.footer] = view === 'desktop',
            _b[desktopStyles.sticky] = view === 'desktop' && sticky,
            _b[desktopStyles[size]] = view === 'desktop',
            _b[mobileStyles.footer] = view === 'mobile',
            _b[mobileStyles.sticky] = view === 'mobile' && sticky,
            _b)) }, children));
};

export { Footer };
