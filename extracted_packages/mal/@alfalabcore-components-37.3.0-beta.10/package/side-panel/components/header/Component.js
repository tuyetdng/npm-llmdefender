var tslib_es6 = require('../../tslib.es6-9c29edce.js');
var React = require('react');
var cn = require('classnames');
var Context = require('../../Context.js');
require('../../../base-modal');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"header":"side-panel__header_1via4","hasContent":"side-panel__hasContent_1via4","highlighted":"side-panel__highlighted_1via4","sticky":"side-panel__sticky_1via4","backgroundImage":"side-panel__backgroundImage_1via4","content":"side-panel__content_1via4","title":"side-panel__title_1via4","addon":"side-panel__addon_1via4","closer":"side-panel__closer_1via4","left":"side-panel__left_1via4","center":"side-panel__center_1via4","right":"side-panel__right_1via4","trim":"side-panel__trim_1via4"};
require('./index.css');

var Header = function (_a) {
    var _b, _c;
    var className = _a.className, addonClassName = _a.addonClassName, contentClassName = _a.contentClassName, leftAddons = _a.leftAddons, children = _a.children, _d = _a.align, align = _d === void 0 ? 'left' : _d, _e = _a.trim, trim = _e === void 0 ? true : _e, title = _a.title, closer = _a.closer, sticky = _a.sticky, imageUrl = _a.imageUrl, dataTestId = _a.dataTestId;
    var _f = React.useContext(Context.ModalContext), headerHighlighted = _f.headerHighlighted, setHasHeader = _f.setHasHeader;
    var hasContent = Boolean(title || children);
    React.useEffect(function () {
        setHasHeader(true);
    }, [setHasHeader]);
    return (React__default.default.createElement("div", { className: cn__default.default(styles.header, className, (_b = {},
            _b[styles.backgroundImage] = imageUrl,
            _b[styles.highlighted] = hasContent && sticky && headerHighlighted,
            _b[styles.sticky] = sticky,
            _b[styles.hasContent] = hasContent,
            _b)), "data-test-id": dataTestId, style: tslib_es6.__assign({}, (imageUrl && { backgroundImage: "url(".concat(imageUrl, ")") })) },
        leftAddons && React__default.default.createElement("div", { className: cn__default.default(styles.addon, addonClassName) }, leftAddons),
        hasContent && (React__default.default.createElement("div", { className: cn__default.default(styles.content, contentClassName, styles[align], (_c = {},
                _c[styles.trim] = trim,
                _c)) },
            children,
            title && React__default.default.createElement("div", { className: styles.title }, title))),
        closer && (React__default.default.createElement("div", { className: cn__default.default(styles.addon, styles.closer, addonClassName) }, closer))));
};

exports.Header = Header;
