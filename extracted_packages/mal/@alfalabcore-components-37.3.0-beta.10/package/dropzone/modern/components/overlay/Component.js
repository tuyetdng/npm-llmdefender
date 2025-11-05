import React from 'react';
import cn from 'classnames';
import { ContainerMIcon } from '@alfalab/icons-glyph/ContainerMIcon';

const styles = {"overlay":"dropzone__overlay_1o4ce","visible":"dropzone__visible_1o4ce","text":"dropzone__text_1o4ce"};
require('./index.css');

const Overlay = ({ text = 'Перетащите файлы', visible = false }) => (React.createElement("div", { className: cn(styles.overlay, {
        [styles.visible]: visible,
    }) },
    React.createElement(ContainerMIcon, null),
    React.createElement("span", { className: styles.text }, text)));

export { Overlay };
