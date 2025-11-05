var React = require('react');
var cn = require('classnames');
var Context = require('../../Context.js');
var ResponsiveContext = require('../../ResponsiveContext.js');
var desktopStyles = require('./desktop.module.css');
var styles = require('./index.module.css');
var layoutStyles = require('./layout.module.css');
var mobileStyles = require('./mobile.module.css');
require('../../../../base-modal/cssm');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var desktopStyles__default = /*#__PURE__*/_interopDefaultCompat(desktopStyles);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);
var layoutStyles__default = /*#__PURE__*/_interopDefaultCompat(layoutStyles);
var mobileStyles__default = /*#__PURE__*/_interopDefaultCompat(mobileStyles);

var Footer = function (_a) {
    var _b;
    var children = _a.children, className = _a.className, sticky = _a.sticky, _c = _a.layout, layout = _c === void 0 ? 'start' : _c, gap = _a.gap;
    var _d = React.useContext(Context.ModalContext), footerHighlighted = _d.footerHighlighted, setHasFooter = _d.setHasFooter;
    var _e = React.useContext(ResponsiveContext.ResponsiveContext), size = _e.size, view = _e.view;
    React.useEffect(function () {
        setHasFooter(true);
    }, [setHasFooter]);
    return (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.footer, className, layoutStyles__default.default[layout], gap && layoutStyles__default.default["gap-".concat(gap)], (_b = {},
            _b[styles__default.default.highlighted] = sticky && footerHighlighted,
            _b[styles__default.default.sticky] = sticky,
            _b[desktopStyles__default.default.footer] = view === 'desktop',
            _b[desktopStyles__default.default.sticky] = view === 'desktop' && sticky,
            _b[desktopStyles__default.default[size]] = view === 'desktop',
            _b[mobileStyles__default.default.footer] = view === 'mobile',
            _b[mobileStyles__default.default.sticky] = view === 'mobile' && sticky,
            _b)) }, children));
};

exports.Footer = Footer;
