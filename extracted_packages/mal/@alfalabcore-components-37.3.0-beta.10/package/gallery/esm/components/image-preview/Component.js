import React, { useContext, useRef } from 'react';
import cn from 'classnames';
import { useFocus } from '@alfalab/hooks';
import { GalleryContext } from '../../context.js';
import { NoImagePaths } from './paths.js';

var styles = {"component":"gallery__component_aun8r","active":"gallery__active_aun8r","image":"gallery__image_aun8r","preview":"gallery__preview_aun8r","loading":"gallery__loading_aun8r","brokenImageWrapper":"gallery__brokenImageWrapper_aun8r","brokenIcon":"gallery__brokenIcon_aun8r","focused":"gallery__focused_aun8r"};
require('./index.css');

var ImagePreview = function (_a) {
    var _b, _c;
    var image = _a.image, _d = _a.active, active = _d === void 0 ? false : _d, index = _a.index, onSelect = _a.onSelect, className = _a.className;
    var imagesMeta = useContext(GalleryContext).imagesMeta;
    var ref = useRef(null);
    var handleClick = function () {
        onSelect(index);
    };
    var handleKeyDown = function (event) {
        if (event.key === 'Enter') {
            onSelect(index);
        }
    };
    var focused = useFocus(ref, 'keyboard')[0];
    var meta = imagesMeta[index];
    var isBroken = Boolean(meta === null || meta === void 0 ? void 0 : meta.broken);
    return (React.createElement("div", { className: cn(styles.component, (_b = {}, _b[styles.active] = active, _b[styles.focused] = focused, _b), className), onClick: handleClick, role: 'button', onKeyDown: handleKeyDown, tabIndex: 0, ref: ref, "aria-label": "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044E ".concat(index + 1) }, isBroken ? (React.createElement("div", { className: cn(styles.preview, styles.brokenImageWrapper) },
        React.createElement("div", { className: styles.brokenIcon },
            React.createElement("svg", { xmlns: 'http://www.w3.org/2000/svg', width: '40', height: '40', viewBox: '0 0 40 40', fill: 'none' },
                React.createElement("rect", { width: '40', height: '40', fill: 'none' }),
                React.createElement("path", { fillRule: 'evenodd', clipRule: 'evenodd', d: NoImagePaths.baseImage, fill: '#DBDEE1' }),
                React.createElement("path", { d: NoImagePaths.triangleImage, fill: '#DBDEE1' }))))) : (React.createElement("div", { className: cn(styles.preview, styles.image, (_c = {},
            _c[styles.broken] = isBroken,
            _c[styles.loading] = !meta,
            _c)), style: { backgroundImage: "url(".concat(image.src, ")") } }))));
};

export { ImagePreview };
