import React, { useState, useCallback, useEffect } from 'react';
import { BaseModal } from '../../base-modal/modern';
import { NavigationBar } from './components/navigation-bar/Component.js';
import { Header } from './components/header/Component.js';
import 'classnames';
import '@alfalab/hooks';
import { GalleryContext } from './context.js';
import { ImageViewer } from './components/image-viewer/component.js';
import './components/image-preview/Component.js';
import './components/header-info-block/Component.js';
import '../../typography/modern';
import '../../icon-button/modern';
import '../../tooltip/modern';
import '@alfalab/icons-glyph/ArrowsInwardMIcon';
import '@alfalab/icons-glyph/ArrowsOutwardMIcon';
import '@alfalab/icons-glyph/CrossMIcon';
import '@alfalab/icons-glyph/PointerDownMIcon';
import 'element-closest';
import 'swiper';
import 'swiper/react';
import '@alfalab/icons-glyph/ChevronBackHeavyMIcon';
import '@alfalab/icons-glyph/ChevronForwardHeavyMIcon';
import './slide-d07efafa.js';
import 'swiper/swiper.min.css';
import './utils/utils.js';
import './utils/constants.js';
import './components/header/buttons.js';
import './components/image-preview/paths.js';
import './utils/split-filename.js';
import './components/image-viewer/paths.js';

const styles = {"container":"gallery__container_kt04d","modal":"gallery__modal_kt04d"};
require('./index.css');

const Backdrop = () => null;
const Gallery = ({ open, images, initialSlide = 0, loop = true, onClose, }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(initialSlide);
    const [swiper, setSwiper] = useState();
    const [imagesMeta, setImagesMeta] = useState([]);
    const [fullScreen, setFullScreen] = useState(false);
    const slideTo = useCallback((index) => {
        if (images[index]) {
            setCurrentSlideIndex(index);
            if (swiper) {
                swiper.slideTo(index);
            }
        }
    }, [images, swiper]);
    const slideNext = useCallback(() => {
        const lastIndex = images.length - 1;
        let nextIndex = currentSlideIndex + 1;
        if (nextIndex >= images.length) {
            nextIndex = loop ? 0 : lastIndex;
        }
        slideTo(nextIndex);
    }, [images.length, loop, currentSlideIndex, slideTo]);
    const slidePrev = useCallback(() => {
        const lastIndex = images.length - 1;
        let nextIndex = currentSlideIndex - 1;
        if (nextIndex < 0) {
            nextIndex = loop ? lastIndex : 0;
        }
        slideTo(nextIndex);
    }, [images.length, loop, currentSlideIndex, slideTo]);
    const setImageMeta = useCallback((meta, index) => {
        imagesMeta[index] = meta;
        setImagesMeta(imagesMeta.slice());
    }, [imagesMeta]);
    const handleClose = useCallback(() => {
        onClose();
        setCurrentSlideIndex(initialSlide);
        setFullScreen(false);
    }, [initialSlide, onClose]);
    const handleEscapeKeyDown = () => {
        if (fullScreen) {
            setFullScreen(false);
        }
        else {
            handleClose();
        }
    };
    const handleKeyDown = useCallback((event) => {
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
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);
    const singleSlide = images.length === 1;
    const showNavigationBar = !singleSlide && !fullScreen;
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const galleryContext = {
        singleSlide,
        currentSlideIndex,
        images,
        imagesMeta,
        fullScreen,
        initialSlide,
        setFullScreen,
        setImageMeta,
        slideNext,
        slidePrev,
        slideTo,
        getSwiper: () => swiper,
        setSwiper,
        onClose: handleClose,
        setCurrentSlideIndex,
        getCurrentImage: () => images[currentSlideIndex],
        getCurrentImageMeta: () => imagesMeta[currentSlideIndex],
    };
    return (React.createElement(GalleryContext.Provider, { value: galleryContext },
        React.createElement(BaseModal, { open: open, className: styles.modal, onEscapeKeyDown: handleEscapeKeyDown, Backdrop: Backdrop },
            React.createElement("div", { className: styles.container },
                React.createElement(Header, null),
                React.createElement(ImageViewer, null),
                showNavigationBar && React.createElement(NavigationBar, null)))));
};

export { Gallery };
