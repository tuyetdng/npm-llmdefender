var React = require('react');
var cn = require('classnames');
var coreComponentsTypography = require('../typography');
var utils_utils = require('./utils/utils.js');
var utils_constants = require('./utils/constants.js');
var components_imageViewer_paths = require('./components/image-viewer/paths.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"gallery__component_11cmh","swiper":"gallery__swiper_11cmh","singleSlide":"gallery__singleSlide_11cmh","hidden":"gallery__hidden_11cmh","slide":"gallery__slide_11cmh","slideLoading":"gallery__slideLoading_11cmh","image":"gallery__image_11cmh","smallImage":"gallery__smallImage_11cmh","verticalImageFit":"gallery__verticalImageFit_11cmh","horizontalImageFit":"gallery__horizontalImageFit_11cmh","arrow":"gallery__arrow_11cmh","focused":"gallery__focused_11cmh","placeholder":"gallery__placeholder_11cmh","brokenImgWrapper":"gallery__brokenImgWrapper_11cmh","brokenImgIcon":"gallery__brokenImgIcon_11cmh","fullScreenImage":"gallery__fullScreenImage_11cmh"};
require('./components/image-viewer/index.css');

var SlideInner = function (_a) {
    var _b;
    var children = _a.children, broken = _a.broken, loading = _a.loading, withPlaceholder = _a.withPlaceholder;
    var content = broken ? (React__default.default.createElement("div", { className: styles.brokenImgWrapper },
        React__default.default.createElement("div", { className: styles.brokenImgIcon },
            React__default.default.createElement("svg", { xmlns: 'http://www.w3.org/2000/svg', width: '80', height: '80', viewBox: '0 0 80 80', fill: 'none' },
                React__default.default.createElement("rect", { width: '80', height: '80', fill: 'none' }),
                React__default.default.createElement("path", { fillRule: 'evenodd', clipRule: 'evenodd', d: components_imageViewer_paths.NoImagePaths.baseImage, fill: '#DBDEE1' }),
                React__default.default.createElement("path", { d: components_imageViewer_paths.NoImagePaths.triangleImage, fill: '#DBDEE1' }))),
        React__default.default.createElement(coreComponentsTypography.Typography.Text, { view: 'primary-small', color: 'secondary' }, "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435"))) : (children);
    return (React__default.default.createElement("div", { className: cn__default.default(styles.slide, (_b = {}, _b[styles.slideLoading] = loading, _b)) }, withPlaceholder ? React__default.default.createElement("div", { className: styles.placeholder }, content) : content));
};
var Slide = function (_a) {
    var _b;
    var isActive = _a.isActive, meta = _a.meta, swiperAspectRatio = _a.swiperAspectRatio, imageAspectRatio = _a.imageAspectRatio, image = _a.image, index = _a.index, swiperHeight = _a.swiperHeight, slideVisible = _a.slideVisible, handleLoad = _a.handleLoad, handleLoadError = _a.handleLoadError;
    var broken = Boolean(meta === null || meta === void 0 ? void 0 : meta.broken);
    var small = utils_utils.isSmallImage(meta);
    var verticalImageFit = !small && swiperAspectRatio > imageAspectRatio;
    var horizontalImageFit = !small && swiperAspectRatio <= imageAspectRatio;
    return (React__default.default.createElement(SlideInner, { active: isActive, broken: broken, loading: !meta, withPlaceholder: small || broken },
        React__default.default.createElement("img", { src: image.src, alt: utils_utils.getImageAlt(image, index), className: cn__default.default((_b = {},
                _b[styles.smallImage] = small,
                _b[styles.image] = !small,
                _b[styles.verticalImageFit] = verticalImageFit,
                _b[styles.horizontalImageFit] = horizontalImageFit,
                _b)), onLoad: function (event) { return handleLoad(event, index); }, onError: function () { return handleLoadError(index); }, style: {
                maxHeight: "".concat(swiperHeight, "px"),
            }, "data-test-id": slideVisible ? utils_constants.TestIds.ACTIVE_IMAGE : undefined })));
};

exports.Slide = Slide;
exports.styles = styles;
