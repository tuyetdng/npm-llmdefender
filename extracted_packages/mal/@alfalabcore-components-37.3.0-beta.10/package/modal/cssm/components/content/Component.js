var React = require('react');
var cn = require('classnames');
var Context = require('../../Context.js');
var ResponsiveContext = require('../../ResponsiveContext.js');
var desktopStyles = require('./desktop.module.css');
var styles = require('./index.module.css');
var mobileStyles = require('./mobile.module.css');
require('../../../../base-modal/cssm');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var desktopStyles__default = /*#__PURE__*/_interopDefaultCompat(desktopStyles);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);
var mobileStyles__default = /*#__PURE__*/_interopDefaultCompat(mobileStyles);

var Content = function (_a) {
    var _b;
    var children = _a.children, flex = _a.flex, className = _a.className;
    var contentRef = React.useContext(Context.ModalContext).contentRef;
    var _c = React.useContext(ResponsiveContext.ResponsiveContext), size = _c.size, view = _c.view;
    return (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.content, className, (_b = {},
            _b[styles__default.default.flex] = flex,
            _b[desktopStyles__default.default[size]] = view === 'desktop' && size,
            _b[mobileStyles__default.default.content] = view === 'mobile',
            _b)), ref: contentRef }, children));
};

exports.Content = Content;
