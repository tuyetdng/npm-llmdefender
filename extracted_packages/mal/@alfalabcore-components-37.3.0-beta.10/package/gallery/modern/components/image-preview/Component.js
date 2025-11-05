import React, { useContext, useRef } from 'react';
import cn from 'classnames';
import { useFocus } from '@alfalab/hooks';
import { GalleryContext } from '../../context.js';
import { NoImagePaths } from './paths.js';

const styles = {"component":"gallery__component_aun8r","active":"gallery__active_aun8r","image":"gallery__image_aun8r","preview":"gallery__preview_aun8r","loading":"gallery__loading_aun8r","brokenImageWrapper":"gallery__brokenImageWrapper_aun8r","brokenIcon":"gallery__brokenIcon_aun8r","focused":"gallery__focused_aun8r"};
require('./index.css');

const ImagePreview = ({ image, active = false, index, onSelect, className }) => {
    const { imagesMeta } = useContext(GalleryContext);
    const ref = useRef(null);
    const handleClick = () => {
        onSelect(index);
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSelect(index);
        }
    };
    const [focused] = useFocus(ref, 'keyboard');
    const meta = imagesMeta[index];
    const isBroken = Boolean(meta?.broken);
    return (React.createElement("div", { className: cn(styles.component, { [styles.active]: active, [styles.focused]: focused }, className), onClick: handleClick, role: 'button', onKeyDown: handleKeyDown, tabIndex: 0, ref: ref, "aria-label": `Перейти к изображению ${index + 1}` }, isBroken ? (React.createElement("div", { className: cn(styles.preview, styles.brokenImageWrapper) },
        React.createElement("div", { className: styles.brokenIcon },
            React.createElement("svg", { xmlns: 'http://www.w3.org/2000/svg', width: '40', height: '40', viewBox: '0 0 40 40', fill: 'none' },
                React.createElement("rect", { width: '40', height: '40', fill: 'none' }),
                React.createElement("path", { fillRule: 'evenodd', clipRule: 'evenodd', d: NoImagePaths.baseImage, fill: '#DBDEE1' }),
                React.createElement("path", { d: NoImagePaths.triangleImage, fill: '#DBDEE1' }))))) : (React.createElement("div", { className: cn(styles.preview, styles.image, {
            [styles.broken]: isBroken,
            [styles.loading]: !meta,
        }), style: { backgroundImage: `url(${image.src})` } }))));
};

export { ImagePreview };
