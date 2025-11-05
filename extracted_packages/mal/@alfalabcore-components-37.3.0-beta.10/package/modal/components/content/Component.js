var React = require('react');
var cn = require('classnames');
var Context = require('../../Context.js');
var ResponsiveContext = require('../../ResponsiveContext.js');
require('../../../base-modal');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var desktopStyles = {"s":"modal__s_14qa7","m":"modal__m_14qa7","l":"modal__l_14qa7","xl":"modal__xl_14qa7","fullscreen":"modal__fullscreen_14qa7"};
require('./desktop.css');

var styles = {"content":"modal__content_nsba3","flex":"modal__flex_nsba3"};
require('./index.css');

var mobileStyles = {"content":"modal__content_1pvc0"};
require('./mobile.css');

var Content = function (_a) {
    var _b;
    var children = _a.children, flex = _a.flex, className = _a.className;
    var contentRef = React.useContext(Context.ModalContext).contentRef;
    var _c = React.useContext(ResponsiveContext.ResponsiveContext), size = _c.size, view = _c.view;
    return (React__default.default.createElement("div", { className: cn__default.default(styles.content, className, (_b = {},
            _b[styles.flex] = flex,
            _b[desktopStyles[size]] = view === 'desktop' && size,
            _b[mobileStyles.content] = view === 'mobile',
            _b)), ref: contentRef }, children));
};

exports.Content = Content;
