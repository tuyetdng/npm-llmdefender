var React = require('react');
var cn = require('classnames');
var CrossMIcon = require('@alfalab/icons-glyph/CrossMIcon');
var Context = require('../../Context.js');
var ResponsiveContext = require('../../ResponsiveContext.js');
var components_closer_Component = require('../closer/Component.js');
require('../../../base-modal');
require('../../tslib.es6-76668849.js');
require('../../../icon-button');
require('@alfalab/icons-glyph/CrossHeavyMIcon');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var getDataTestId = function (dataTestId, element) {
    var elementPart = element ? "-".concat(element.toLowerCase()) : '';
    return dataTestId ? "".concat(dataTestId).concat(elementPart) : undefined;
};

var desktopStyles = {"header":"modal__header_2m9gw","content":"modal__content_2m9gw","s":"modal__s_2m9gw","m":"modal__m_2m9gw","l":"modal__l_2m9gw","xl":"modal__xl_2m9gw","fullscreen":"modal__fullscreen_2m9gw","hasContent":"modal__hasContent_2m9gw","sticky":"modal__sticky_2m9gw"};
require('./desktop.css');

var styles = {"header":"modal__header_1jbvb","hasContent":"modal__hasContent_1jbvb","highlighted":"modal__highlighted_1jbvb","sticky":"modal__sticky_1jbvb","content":"modal__content_1jbvb","title":"modal__title_1jbvb","addon":"modal__addon_1jbvb","closer":"modal__closer_1jbvb","left":"modal__left_1jbvb","center":"modal__center_1jbvb","right":"modal__right_1jbvb","trim":"modal__trim_1jbvb"};
require('./index.css');

var mobileStyles = {"sticky":"modal__sticky_tqntf","content":"modal__content_tqntf"};
require('./mobile.css');

var Header = function (_a) {
    var _b, _c;
    var className = _a.className, addonClassName = _a.addonClassName, contentClassName = _a.contentClassName, leftAddons = _a.leftAddons, children = _a.children, _d = _a.align, align = _d === void 0 ? 'left' : _d, _e = _a.trim, trim = _e === void 0 ? true : _e, title = _a.title, _f = _a.hasCloser, hasCloser = _f === void 0 ? true : _f, sticky = _a.sticky, dataTestId = _a.dataTestId;
    var _g = React.useContext(Context.ModalContext), headerHighlighted = _g.headerHighlighted, setHasHeader = _g.setHasHeader;
    var _h = React.useContext(ResponsiveContext.ResponsiveContext), size = _h.size, view = _h.view;
    var hasContent = title || Boolean(children);
    React.useEffect(function () {
        setHasHeader(true);
    }, [setHasHeader]);
    return (React__default.default.createElement("div", { className: cn__default.default(styles.header, className, (_b = {},
            _b[styles.highlighted] = hasContent && sticky && headerHighlighted,
            _b[styles.sticky] = sticky,
            _b[styles.hasContent] = hasContent,
            _b[desktopStyles.header] = view === 'desktop',
            _b[desktopStyles.hasContent] = view === 'desktop' && hasContent,
            _b[desktopStyles.sticky] = view === 'desktop' && sticky,
            _b[desktopStyles[size]] = view === 'desktop',
            _b[mobileStyles.sticky] = view === 'mobile' && sticky,
            _b)), "data-test-id": getDataTestId(dataTestId) },
        (leftAddons || view === 'desktop') && (React__default.default.createElement("div", { className: cn__default.default(styles.addon, addonClassName) }, leftAddons)),
        hasContent && (React__default.default.createElement("div", { className: cn__default.default(styles.content, contentClassName, styles[align], (_c = {},
                _c[styles.trim] = trim,
                _c[desktopStyles.content] = view === 'desktop',
                _c[mobileStyles.content] = view === 'mobile',
                _c)) },
            children,
            title && (React__default.default.createElement("div", { className: styles.title, "data-test-id": getDataTestId(dataTestId, 'title') }, title)))),
        hasCloser && (React__default.default.createElement("div", { className: cn__default.default(styles.addon, styles.closer, addonClassName) }, view === 'desktop' ? (React__default.default.createElement(components_closer_Component.Closer, { dataTestId: getDataTestId(dataTestId, 'closer') })) : (React__default.default.createElement(components_closer_Component.Closer, { icon: CrossMIcon.CrossMIcon, size: 'xs', dataTestId: getDataTestId(dataTestId, 'closer') }))))));
};

exports.Header = Header;
