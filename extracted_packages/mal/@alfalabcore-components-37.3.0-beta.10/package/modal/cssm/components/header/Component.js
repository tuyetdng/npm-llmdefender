var React = require('react');
var cn = require('classnames');
var CrossMIcon = require('@alfalab/icons-glyph/CrossMIcon');
var Context = require('../../Context.js');
var ResponsiveContext = require('../../ResponsiveContext.js');
var components_closer_Component = require('../closer/Component.js');
var desktopStyles = require('./desktop.module.css');
var styles = require('./index.module.css');
var mobileStyles = require('./mobile.module.css');
require('../../../../base-modal/cssm');
require('../../tslib.es6-bbd6cd2a.js');
require('../../../../icon-button/cssm');
require('@alfalab/icons-glyph/CrossHeavyMIcon');
require('../closer/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var desktopStyles__default = /*#__PURE__*/_interopDefaultCompat(desktopStyles);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);
var mobileStyles__default = /*#__PURE__*/_interopDefaultCompat(mobileStyles);

var getDataTestId = function (dataTestId, element) {
    var elementPart = element ? "-".concat(element.toLowerCase()) : '';
    return dataTestId ? "".concat(dataTestId).concat(elementPart) : undefined;
};

var Header = function (_a) {
    var _b, _c;
    var className = _a.className, addonClassName = _a.addonClassName, contentClassName = _a.contentClassName, leftAddons = _a.leftAddons, children = _a.children, _d = _a.align, align = _d === void 0 ? 'left' : _d, _e = _a.trim, trim = _e === void 0 ? true : _e, title = _a.title, _f = _a.hasCloser, hasCloser = _f === void 0 ? true : _f, sticky = _a.sticky, dataTestId = _a.dataTestId;
    var _g = React.useContext(Context.ModalContext), headerHighlighted = _g.headerHighlighted, setHasHeader = _g.setHasHeader;
    var _h = React.useContext(ResponsiveContext.ResponsiveContext), size = _h.size, view = _h.view;
    var hasContent = title || Boolean(children);
    React.useEffect(function () {
        setHasHeader(true);
    }, [setHasHeader]);
    return (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.header, className, (_b = {},
            _b[styles__default.default.highlighted] = hasContent && sticky && headerHighlighted,
            _b[styles__default.default.sticky] = sticky,
            _b[styles__default.default.hasContent] = hasContent,
            _b[desktopStyles__default.default.header] = view === 'desktop',
            _b[desktopStyles__default.default.hasContent] = view === 'desktop' && hasContent,
            _b[desktopStyles__default.default.sticky] = view === 'desktop' && sticky,
            _b[desktopStyles__default.default[size]] = view === 'desktop',
            _b[mobileStyles__default.default.sticky] = view === 'mobile' && sticky,
            _b)), "data-test-id": getDataTestId(dataTestId) },
        (leftAddons || view === 'desktop') && (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.addon, addonClassName) }, leftAddons)),
        hasContent && (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.content, contentClassName, styles__default.default[align], (_c = {},
                _c[styles__default.default.trim] = trim,
                _c[desktopStyles__default.default.content] = view === 'desktop',
                _c[mobileStyles__default.default.content] = view === 'mobile',
                _c)) },
            children,
            title && (React__default.default.createElement("div", { className: styles__default.default.title, "data-test-id": getDataTestId(dataTestId, 'title') }, title)))),
        hasCloser && (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.addon, styles__default.default.closer, addonClassName) }, view === 'desktop' ? (React__default.default.createElement(components_closer_Component.Closer, { dataTestId: getDataTestId(dataTestId, 'closer') })) : (React__default.default.createElement(components_closer_Component.Closer, { icon: CrossMIcon.CrossMIcon, size: 'xs', dataTestId: getDataTestId(dataTestId, 'closer') }))))));
};

exports.Header = Header;
