var tslib_es6 = require('../../tslib.es6-bbd6cd2a.js');
var React = require('react');
var cn = require('classnames');
var Context = require('../../Context.js');
var styles = require('./index.module.css');
require('../../../../base-modal/cssm');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var Header = function (_a) {
    var _b, _c;
    var className = _a.className, addonClassName = _a.addonClassName, contentClassName = _a.contentClassName, leftAddons = _a.leftAddons, children = _a.children, _d = _a.align, align = _d === void 0 ? 'left' : _d, _e = _a.trim, trim = _e === void 0 ? true : _e, title = _a.title, closer = _a.closer, sticky = _a.sticky, imageUrl = _a.imageUrl, dataTestId = _a.dataTestId;
    var _f = React.useContext(Context.ModalContext), headerHighlighted = _f.headerHighlighted, setHasHeader = _f.setHasHeader;
    var hasContent = Boolean(title || children);
    React.useEffect(function () {
        setHasHeader(true);
    }, [setHasHeader]);
    return (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.header, className, (_b = {},
            _b[styles__default.default.backgroundImage] = imageUrl,
            _b[styles__default.default.highlighted] = hasContent && sticky && headerHighlighted,
            _b[styles__default.default.sticky] = sticky,
            _b[styles__default.default.hasContent] = hasContent,
            _b)), "data-test-id": dataTestId, style: tslib_es6.__assign({}, (imageUrl && { backgroundImage: "url(".concat(imageUrl, ")") })) },
        leftAddons && React__default.default.createElement("div", { className: cn__default.default(styles__default.default.addon, addonClassName) }, leftAddons),
        hasContent && (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.content, contentClassName, styles__default.default[align], (_c = {},
                _c[styles__default.default.trim] = trim,
                _c)) },
            children,
            title && React__default.default.createElement("div", { className: styles__default.default.title }, title))),
        closer && (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.addon, styles__default.default.closer, addonClassName) }, closer))));
};

exports.Header = Header;
