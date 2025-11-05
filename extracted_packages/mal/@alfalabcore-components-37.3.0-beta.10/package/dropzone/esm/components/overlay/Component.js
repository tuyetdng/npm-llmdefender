import React from 'react';
import cn from 'classnames';
import { ContainerMIcon } from '@alfalab/icons-glyph/ContainerMIcon';

var styles = {"overlay":"dropzone__overlay_1o4ce","visible":"dropzone__visible_1o4ce","text":"dropzone__text_1o4ce"};
require('./index.css');

var Overlay = function (_a) {
    var _b;
    var _c = _a.text, text = _c === void 0 ? 'Перетащите файлы' : _c, _d = _a.visible, visible = _d === void 0 ? false : _d;
    return (React.createElement("div", { className: cn(styles.overlay, (_b = {},
            _b[styles.visible] = visible,
            _b)) },
        React.createElement(ContainerMIcon, null),
        React.createElement("span", { className: styles.text }, text)));
};

export { Overlay };
