import React from 'react';
import cn from 'classnames';
import { Typography } from '../../typography/modern';
import { isSmallImage, getImageAlt } from './utils/utils.js';
import { TestIds } from './utils/constants.js';
import { NoImagePaths } from './components/image-viewer/paths.js';

const styles = {"component":"gallery__component_11cmh","swiper":"gallery__swiper_11cmh","singleSlide":"gallery__singleSlide_11cmh","hidden":"gallery__hidden_11cmh","slide":"gallery__slide_11cmh","slideLoading":"gallery__slideLoading_11cmh","image":"gallery__image_11cmh","smallImage":"gallery__smallImage_11cmh","verticalImageFit":"gallery__verticalImageFit_11cmh","horizontalImageFit":"gallery__horizontalImageFit_11cmh","arrow":"gallery__arrow_11cmh","focused":"gallery__focused_11cmh","placeholder":"gallery__placeholder_11cmh","brokenImgWrapper":"gallery__brokenImgWrapper_11cmh","brokenImgIcon":"gallery__brokenImgIcon_11cmh","fullScreenImage":"gallery__fullScreenImage_11cmh"};
require('./components/image-viewer/index.css');

const SlideInner = ({ children, broken, loading, withPlaceholder }) => {
    const content = broken ? (React.createElement("div", { className: styles.brokenImgWrapper },
        React.createElement("div", { className: styles.brokenImgIcon },
            React.createElement("svg", { xmlns: 'http://www.w3.org/2000/svg', width: '80', height: '80', viewBox: '0 0 80 80', fill: 'none' },
                React.createElement("rect", { width: '80', height: '80', fill: 'none' }),
                React.createElement("path", { fillRule: 'evenodd', clipRule: 'evenodd', d: NoImagePaths.baseImage, fill: '#DBDEE1' }),
                React.createElement("path", { d: NoImagePaths.triangleImage, fill: '#DBDEE1' }))),
        React.createElement(Typography.Text, { view: 'primary-small', color: 'secondary' }, "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435"))) : (children);
    return (React.createElement("div", { className: cn(styles.slide, { [styles.slideLoading]: loading }) }, withPlaceholder ? React.createElement("div", { className: styles.placeholder }, content) : content));
};
const Slide = ({ isActive, meta, swiperAspectRatio, imageAspectRatio, image, index, swiperHeight, slideVisible, handleLoad, handleLoadError, }) => {
    const broken = Boolean(meta?.broken);
    const small = isSmallImage(meta);
    const verticalImageFit = !small && swiperAspectRatio > imageAspectRatio;
    const horizontalImageFit = !small && swiperAspectRatio <= imageAspectRatio;
    return (React.createElement(SlideInner, { active: isActive, broken: broken, loading: !meta, withPlaceholder: small || broken },
        React.createElement("img", { src: image.src, alt: getImageAlt(image, index), className: cn({
                [styles.smallImage]: small,
                [styles.image]: !small,
                [styles.verticalImageFit]: verticalImageFit,
                [styles.horizontalImageFit]: horizontalImageFit,
            }), onLoad: (event) => handleLoad(event, index), onError: () => handleLoadError(index), style: {
                maxHeight: `${swiperHeight}px`,
            }, "data-test-id": slideVisible ? TestIds.ACTIVE_IMAGE : undefined })));
};

export { Slide as S, styles as s };
