var React = require('react');
var cn = require('classnames');
var coreComponentsBaseModal = require('../../../base-modal');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"footer":"bottom-sheet__footer_1mk8h","sticky":"bottom-sheet__sticky_1mk8h","highlighted":"bottom-sheet__highlighted_1mk8h"};
require('./index.css');

var Footer = function (_a) {
    var _b;
    var children = _a.children, className = _a.className, sticky = _a.sticky;
    var _c = React.useContext(coreComponentsBaseModal.BaseModalContext), footerHighlighted = _c.footerHighlighted, setHasFooter = _c.setHasFooter;
    React.useEffect(function () {
        setHasFooter(true);
    }, [setHasFooter]);
    return (React__default.default.createElement("div", { className: cn__default.default(styles.footer, className, (_b = {},
            _b[styles.sticky] = sticky,
            _b[styles.highlighted] = footerHighlighted && sticky,
            _b)) }, children));
};

exports.Footer = Footer;
