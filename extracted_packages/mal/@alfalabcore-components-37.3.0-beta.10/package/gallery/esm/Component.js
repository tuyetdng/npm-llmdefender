import React, { useState, useCallback, useEffect } from 'react';
import { BaseModal } from '../../base-modal/esm';
import { NavigationBar } from './components/navigation-bar/Component.js';
import { Header } from './components/header/Component.js';
import 'classnames';
import '@alfalab/hooks';
import { GalleryContext } from './context.js';
import { ImageViewer } from './components/image-viewer/component.js';
import './components/image-preview/Component.js';
import './components/header-info-block/Component.js';
import '../../typography/esm';
import '../../icon-button/esm';
import '../../tooltip/esm';
import '@alfalab/icons-glyph/ArrowsInwardMIcon';
import '@alfalab/icons-glyph/ArrowsOutwardMIcon';
import '@alfalab/icons-glyph/CrossMIcon';
import '@alfalab/icons-glyph/PointerDownMIcon';
import 'element-closest';
import 'swiper';
import 'swiper/react';
import '@alfalab/icons-glyph/ChevronBackHeavyMIcon';
import '@alfalab/icons-glyph/ChevronForwardHeavyMIcon';
import './slide-9d5df36b.js';
import 'swiper/swiper.min.css';
import './utils/utils.js';
import './utils/constants.js';
import './components/header/buttons.js';
import './tslib.es6-748104c5.js';
import './components/image-preview/paths.js';
import './utils/split-filename.js';
import './components/image-viewer/paths.js';

var styles = {"container":"gallery__container_kt04d","modal":"gallery__modal_kt04d"};
require('./index.css');

var Backdrop = function () { return null; };
var Gallery = function (_a) {
    var open = _a.open, images = _a.images, _b = _a.initialSlide, initialSlide = _b === void 0 ? 0 : _b, _c = _a.loop, loop = _c === void 0 ? true : _c, onClose = _a.onClose;
    var _d = useState(initialSlide), currentSlideIndex = _d[0], setCurrentSlideIndex = _d[1];
    var _e = useState(), swiper = _e[0], setSwiper = _e[1];
    var _f = useState([]), imagesMeta = _f[0], setImagesMeta = _f[1];
    var _g = useState(false), fullScreen = _g[0], setFullScreen = _g[1];
    var slideTo = useCallback(function (index) {
        if (images[index]) {
            setCurrentSlideIndex(index);
            if (swiper) {
                swiper.slideTo(index);
            }
        }
    }, [images, swiper]);
    var slideNext = useCallback(function () {
        var lastIndex = images.length - 1;
        var nextIndex = currentSlideIndex + 1;
        if (nextIndex >= images.length) {
            nextIndex = loop ? 0 : lastIndex;
        }
        slideTo(nextIndex);
    }, [images.length, loop, currentSlideIndex, slideTo]);
    var slidePrev = useCallback(function () {
        var lastIndex = images.length - 1;
        var nextIndex = currentSlideIndex - 1;
        if (nextIndex < 0) {
            nextIndex = loop ? lastIndex : 0;
        }
        slideTo(nextIndex);
    }, [images.length, loop, currentSlideIndex, slideTo]);
    var setImageMeta = useCallback(function (meta, index) {
        imagesMeta[index] = meta;
        setImagesMeta(imagesMeta.slice());
    }, [imagesMeta]);
    var handleClose = useCallback(function () {
        onClose();
        setCurrentSlideIndex(initialSlide);
        setFullScreen(false);
    }, [initialSlide, onClose]);
    var handleEscapeKeyDown = function () {
        if (fullScreen) {
            setFullScreen(false);
        }
        else {
            handleClose();
        }
    };
    var handleKeyDown = useCallback(function (event) {
        if (!open || fullScreen) {
            return;
        }
        switch (event.key) {
            case 'ArrowLeft':
                slidePrev();
                break;
            case 'ArrowRight':
                slideNext();
                break;
        }
    }, [fullScreen, open, slideNext, slidePrev]);
    useEffect(function () {
        document.addEventListener('keydown', handleKeyDown);
        return function () {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);
    var singleSlide = images.length === 1;
    var showNavigationBar = !singleSlide && !fullScreen;
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    var galleryContext = {
        singleSlide: singleSlide,
        currentSlideIndex: currentSlideIndex,
        images: images,
        imagesMeta: imagesMeta,
        fullScreen: fullScreen,
        initialSlide: initialSlide,
        setFullScreen: setFullScreen,
        setImageMeta: setImageMeta,
        slideNext: slideNext,
        slidePrev: slidePrev,
        slideTo: slideTo,
        getSwiper: function () { return swiper; },
        setSwiper: setSwiper,
        onClose: handleClose,
        setCurrentSlideIndex: setCurrentSlideIndex,
        getCurrentImage: function () { return images[currentSlideIndex]; },
        getCurrentImageMeta: function () { return imagesMeta[currentSlideIndex]; },
    };
    return (React.createElement(GalleryContext.Provider, { value: galleryContext },
        React.createElement(BaseModal, { open: open, className: styles.modal, onEscapeKeyDown: handleEscapeKeyDown, Backdrop: Backdrop },
            React.createElement("div", { className: styles.container },
                React.createElement(Header, null),
                React.createElement(ImageViewer, null),
                showNavigationBar && React.createElement(NavigationBar, null)))));
};

export { Gallery };
