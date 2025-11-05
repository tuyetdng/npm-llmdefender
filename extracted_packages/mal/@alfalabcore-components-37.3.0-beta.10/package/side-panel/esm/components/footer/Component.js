import React, { useContext, useEffect } from 'react';
import cn from 'classnames';
import { ModalContext } from '../../Context.js';
import '../../../../base-modal/esm';

var styles = {"footer":"side-panel__footer_1ii1p","sticky":"side-panel__sticky_1ii1p","highlighted":"side-panel__highlighted_1ii1p"};
require('./index.css');

var layoutStyles = {"column":"side-panel__column_mrcgc","gap-16":"side-panel__gap-16_mrcgc","gap-24":"side-panel__gap-24_mrcgc","gap-32":"side-panel__gap-32_mrcgc","start":"side-panel__start_mrcgc","center":"side-panel__center_mrcgc","space-between":"side-panel__space-between_mrcgc"};
require('./layout.css');

var Footer = function (_a) {
    var _b;
    var children = _a.children, className = _a.className, sticky = _a.sticky, _c = _a.layout, layout = _c === void 0 ? 'start' : _c, gap = _a.gap, dataTestId = _a.dataTestId;
    var _d = useContext(ModalContext), footerHighlighted = _d.footerHighlighted, setHasFooter = _d.setHasFooter;
    useEffect(function () {
        setHasFooter(true);
    }, [setHasFooter]);
    return (React.createElement("div", { className: cn(styles.footer, className, layoutStyles[layout], gap && layoutStyles["gap-".concat(gap)], (_b = {},
            _b[styles.highlighted] = sticky && footerHighlighted,
            _b[styles.sticky] = sticky,
            _b)), "data-test-id": dataTestId }, children));
};

export { Footer };
