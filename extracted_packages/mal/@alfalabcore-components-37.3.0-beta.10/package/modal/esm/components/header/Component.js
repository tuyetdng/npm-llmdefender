import React, { useContext, useEffect } from 'react';
import cn from 'classnames';
import { CrossMIcon } from '@alfalab/icons-glyph/CrossMIcon';
import { ModalContext } from '../../Context.js';
import { ResponsiveContext } from '../../ResponsiveContext.js';
import { Closer } from '../closer/Component.js';
import '../../../../base-modal/esm';
import '../../../../icon-button/esm';
import '@alfalab/icons-glyph/CrossHeavyMIcon';
import '../../tslib.es6-ac9b62a7.js';

var getDataTestId = function (dataTestId, element) {
    var elementPart = element ? "-".concat(element.toLowerCase()) : '';
    return dataTestId ? "".concat(dataTestId).concat(elementPart) : undefined;
};

var desktopStyles = {"header":"modal__header_2m9gw","content":"modal__content_2m9gw","s":"modal__s_2m9gw","m":"modal__m_2m9gw","l":"modal__l_2m9gw","xl":"modal__xl_2m9gw","fullscreen":"modal__fullscreen_2m9gw","hasContent":"modal__hasContent_2m9gw","sticky":"modal__sticky_2m9gw"};
require('./desktop.css');

var styles = {"header":"modal__header_1jbvb","hasContent":"modal__hasContent_1jbvb","highlighted":"modal__highlighted_1jbvb","sticky":"modal__sticky_1jbvb","content":"modal__content_1jbvb","title":"modal__title_1jbvb","addon":"modal__addon_1jbvb","closer":"modal__closer_1jbvb","left":"modal__left_1jbvb","center":"modal__center_1jbvb","right":"modal__right_1jbvb","trim":"modal__trim_1jbvb"};
require('./index.css');

var mobileStyles = {"sticky":"modal__sticky_tqntf","content":"modal__content_tqntf"};
require('./mobile.css');

var Header = function (_a) {
    var _b, _c;
    var className = _a.className, addonClassName = _a.addonClassName, contentClassName = _a.contentClassName, leftAddons = _a.leftAddons, children = _a.children, _d = _a.align, align = _d === void 0 ? 'left' : _d, _e = _a.trim, trim = _e === void 0 ? true : _e, title = _a.title, _f = _a.hasCloser, hasCloser = _f === void 0 ? true : _f, sticky = _a.sticky, dataTestId = _a.dataTestId;
    var _g = useContext(ModalContext), headerHighlighted = _g.headerHighlighted, setHasHeader = _g.setHasHeader;
    var _h = useContext(ResponsiveContext), size = _h.size, view = _h.view;
    var hasContent = title || Boolean(children);
    useEffect(function () {
        setHasHeader(true);
    }, [setHasHeader]);
    return (React.createElement("div", { className: cn(styles.header, className, (_b = {},
            _b[styles.highlighted] = hasContent && sticky && headerHighlighted,
            _b[styles.sticky] = sticky,
            _b[styles.hasContent] = hasContent,
            _b[desktopStyles.header] = view === 'desktop',
            _b[desktopStyles.hasContent] = view === 'desktop' && hasContent,
            _b[desktopStyles.sticky] = view === 'desktop' && sticky,
            _b[desktopStyles[size]] = view === 'desktop',
            _b[mobileStyles.sticky] = view === 'mobile' && sticky,
            _b)), "data-test-id": getDataTestId(dataTestId) },
        (leftAddons || view === 'desktop') && (React.createElement("div", { className: cn(styles.addon, addonClassName) }, leftAddons)),
        hasContent && (React.createElement("div", { className: cn(styles.content, contentClassName, styles[align], (_c = {},
                _c[styles.trim] = trim,
                _c[desktopStyles.content] = view === 'desktop',
                _c[mobileStyles.content] = view === 'mobile',
                _c)) },
            children,
            title && (React.createElement("div", { className: styles.title, "data-test-id": getDataTestId(dataTestId, 'title') }, title)))),
        hasCloser && (React.createElement("div", { className: cn(styles.addon, styles.closer, addonClassName) }, view === 'desktop' ? (React.createElement(Closer, { dataTestId: getDataTestId(dataTestId, 'closer') })) : (React.createElement(Closer, { icon: CrossMIcon, size: 'xs', dataTestId: getDataTestId(dataTestId, 'closer') }))))));
};

export { Header };
