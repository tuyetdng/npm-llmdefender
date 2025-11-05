var React = require('react');
var cn = require('classnames');
var coreComponentsBaseModal = require('../../../../base-modal/cssm');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var Footer = function (_a) {
    var _b;
    var children = _a.children, className = _a.className, sticky = _a.sticky;
    var _c = React.useContext(coreComponentsBaseModal.BaseModalContext), footerHighlighted = _c.footerHighlighted, setHasFooter = _c.setHasFooter;
    React.useEffect(function () {
        setHasFooter(true);
    }, [setHasFooter]);
    return (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.footer, className, (_b = {},
            _b[styles__default.default.sticky] = sticky,
            _b[styles__default.default.highlighted] = footerHighlighted && sticky,
            _b)) }, children));
};

exports.Footer = Footer;
