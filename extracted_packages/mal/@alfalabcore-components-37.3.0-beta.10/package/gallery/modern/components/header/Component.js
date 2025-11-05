import React, { useContext, useRef, useEffect } from 'react';
import { GalleryContext } from '../../context.js';
import { isSmallImage } from '../../utils/utils.js';
import { TestIds } from '../../utils/constants.js';
import { HeaderInfoBlock } from '../header-info-block/Component.js';
import { Download, Exit, ExitFullscreen, Fullscreen } from './buttons.js';
import '../../../../typography/modern';
import '../../../../icon-button/modern';
import '../../../../tooltip/modern';
import '@alfalab/icons-glyph/ArrowsInwardMIcon';
import '@alfalab/icons-glyph/ArrowsOutwardMIcon';
import '@alfalab/icons-glyph/CrossMIcon';
import '@alfalab/icons-glyph/PointerDownMIcon';
import '../../utils/split-filename.js';

const styles = {"header":"gallery__header_1posp","buttons":"gallery__buttons_1posp"};
require('./index.css');

const Header = () => {
    const { currentSlideIndex, singleSlide, images, fullScreen, getCurrentImageMeta, getCurrentImage, setFullScreen, onClose, } = useContext(GalleryContext);
    const toggleFullScreenButton = useRef(null);
    const closeFullScreen = () => {
        setFullScreen(false);
    };
    const openFullScreen = () => {
        setFullScreen(true);
    };
    useEffect(() => {
        if (toggleFullScreenButton.current) {
            toggleFullScreenButton.current.focus();
        }
    }, [fullScreen]);
    const currentImage = getCurrentImage();
    const canDownload = currentImage?.canDownload ?? true;
    const filename = currentImage?.name || '';
    const description = singleSlide
        ? ''
        : `Изображение ${currentSlideIndex + 1} из ${images.length}`;
    const meta = getCurrentImageMeta();
    const showFullScreenButton = !isSmallImage(meta) && !meta?.broken;
    const showDownloadButton = !meta?.broken && canDownload;
    const renderToggleFullScreenButton = () => fullScreen ? (React.createElement(ExitFullscreen, { onClick: closeFullScreen, buttonRef: toggleFullScreenButton, dataTestId: TestIds.EXIT_FULLSCREEN_BUTTON })) : (React.createElement(Fullscreen, { onClick: openFullScreen, buttonRef: toggleFullScreenButton, dataTestId: TestIds.FULLSCREEN_BUTTON }));
    return (React.createElement("div", { className: styles.header },
        React.createElement(HeaderInfoBlock, { filename: filename, description: description }),
        React.createElement("div", { className: styles.buttons },
            showFullScreenButton && renderToggleFullScreenButton(),
            showDownloadButton && (React.createElement(Download, { href: currentImage?.src, download: currentImage?.name, dataTestId: TestIds.DOWNLOAD_BUTTON })),
            React.createElement(Exit, { onClick: onClose, dataTestId: TestIds.CLOSE_BUTTON }))));
};

export { Header };
