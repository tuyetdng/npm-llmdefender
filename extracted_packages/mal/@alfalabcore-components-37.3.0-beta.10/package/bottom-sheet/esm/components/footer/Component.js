import React, { useContext, useEffect } from 'react';
import cn from 'classnames';
import { BaseModalContext } from '../../../../base-modal/esm';

var styles = {"footer":"bottom-sheet__footer_1mk8h","sticky":"bottom-sheet__sticky_1mk8h","highlighted":"bottom-sheet__highlighted_1mk8h"};
require('./index.css');

var Footer = function (_a) {
    var _b;
    var children = _a.children, className = _a.className, sticky = _a.sticky;
    var _c = useContext(BaseModalContext), footerHighlighted = _c.footerHighlighted, setHasFooter = _c.setHasFooter;
    useEffect(function () {
        setHasFooter(true);
    }, [setHasFooter]);
    return (React.createElement("div", { className: cn(styles.footer, className, (_b = {},
            _b[styles.sticky] = sticky,
            _b[styles.highlighted] = footerHighlighted && sticky,
            _b)) }, children));
};

export { Footer };
