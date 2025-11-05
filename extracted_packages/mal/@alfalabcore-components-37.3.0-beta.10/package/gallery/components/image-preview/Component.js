var React = require('react');
var cn = require('classnames');
var hooks = require('@alfalab/hooks');
var context = require('../../context.js');
var components_imagePreview_paths = require('./paths.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"gallery__component_aun8r","active":"gallery__active_aun8r","image":"gallery__image_aun8r","preview":"gallery__preview_aun8r","loading":"gallery__loading_aun8r","brokenImageWrapper":"gallery__brokenImageWrapper_aun8r","brokenIcon":"gallery__brokenIcon_aun8r","focused":"gallery__focused_aun8r"};
require('./index.css');

var ImagePreview = function (_a) {
    var _b, _c;
    var image = _a.image, _d = _a.active, active = _d === void 0 ? false : _d, index = _a.index, onSelect = _a.onSelect, className = _a.className;
    var imagesMeta = React.useContext(context.GalleryContext).imagesMeta;
    var ref = React.useRef(null);
    var handleClick = function () {
        onSelect(index);
    };
    var handleKeyDown = function (event) {
        if (event.key === 'Enter') {
            onSelect(index);
        }
    };
    var focused = hooks.useFocus(ref, 'keyboard')[0];
    var meta = imagesMeta[index];
    var isBroken = Boolean(meta === null || meta === void 0 ? void 0 : meta.broken);
    return (React__default.default.createElement("div", { className: cn__default.default(styles.component, (_b = {}, _b[styles.active] = active, _b[styles.focused] = focused, _b), className), onClick: handleClick, role: 'button', onKeyDown: handleKeyDown, tabIndex: 0, ref: ref, "aria-label": "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044E ".concat(index + 1) }, isBroken ? (React__default.default.createElement("div", { className: cn__default.default(styles.preview, styles.brokenImageWrapper) },
        React__default.default.createElement("div", { className: styles.brokenIcon },
            React__default.default.createElement("svg", { xmlns: 'http://www.w3.org/2000/svg', width: '40', height: '40', viewBox: '0 0 40 40', fill: 'none' },
                React__default.default.createElement("rect", { width: '40', height: '40', fill: 'none' }),
                React__default.default.createElement("path", { fillRule: 'evenodd', clipRule: 'evenodd', d: components_imagePreview_paths.NoImagePaths.baseImage, fill: '#DBDEE1' }),
                React__default.default.createElement("path", { d: components_imagePreview_paths.NoImagePaths.triangleImage, fill: '#DBDEE1' }))))) : (React__default.default.createElement("div", { className: cn__default.default(styles.preview, styles.image, (_c = {},
            _c[styles.broken] = isBroken,
            _c[styles.loading] = !meta,
            _c)), style: { backgroundImage: "url(".concat(image.src, ")") } }))));
};

exports.ImagePreview = ImagePreview;
