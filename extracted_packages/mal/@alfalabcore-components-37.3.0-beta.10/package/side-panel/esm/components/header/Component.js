import { a as __assign } from '../../tslib.es6-46a2fd0f.js';
import React, { useContext, useEffect } from 'react';
import cn from 'classnames';
import { ModalContext } from '../../Context.js';
import '../../../../base-modal/esm';

var styles = {"header":"side-panel__header_1via4","hasContent":"side-panel__hasContent_1via4","highlighted":"side-panel__highlighted_1via4","sticky":"side-panel__sticky_1via4","backgroundImage":"side-panel__backgroundImage_1via4","content":"side-panel__content_1via4","title":"side-panel__title_1via4","addon":"side-panel__addon_1via4","closer":"side-panel__closer_1via4","left":"side-panel__left_1via4","center":"side-panel__center_1via4","right":"side-panel__right_1via4","trim":"side-panel__trim_1via4"};
require('./index.css');

var Header = function (_a) {
    var _b, _c;
    var className = _a.className, addonClassName = _a.addonClassName, contentClassName = _a.contentClassName, leftAddons = _a.leftAddons, children = _a.children, _d = _a.align, align = _d === void 0 ? 'left' : _d, _e = _a.trim, trim = _e === void 0 ? true : _e, title = _a.title, closer = _a.closer, sticky = _a.sticky, imageUrl = _a.imageUrl, dataTestId = _a.dataTestId;
    var _f = useContext(ModalContext), headerHighlighted = _f.headerHighlighted, setHasHeader = _f.setHasHeader;
    var hasContent = Boolean(title || children);
    useEffect(function () {
        setHasHeader(true);
    }, [setHasHeader]);
    return (React.createElement("div", { className: cn(styles.header, className, (_b = {},
            _b[styles.backgroundImage] = imageUrl,
            _b[styles.highlighted] = hasContent && sticky && headerHighlighted,
            _b[styles.sticky] = sticky,
            _b[styles.hasContent] = hasContent,
            _b)), "data-test-id": dataTestId, style: __assign({}, (imageUrl && { backgroundImage: "url(".concat(imageUrl, ")") })) },
        leftAddons && React.createElement("div", { className: cn(styles.addon, addonClassName) }, leftAddons),
        hasContent && (React.createElement("div", { className: cn(styles.content, contentClassName, styles[align], (_c = {},
                _c[styles.trim] = trim,
                _c)) },
            children,
            title && React.createElement("div", { className: styles.title }, title))),
        closer && (React.createElement("div", { className: cn(styles.addon, styles.closer, addonClassName) }, closer))));
};

export { Header };
