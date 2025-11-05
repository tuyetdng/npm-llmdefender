var React = require('react');
var cn = require('classnames');
var Context = require('../../Context.js');
var styles = require('./index.module.css');
var layoutStyles = require('./layout.module.css');
require('../../../../base-modal/cssm');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);
var layoutStyles__default = /*#__PURE__*/_interopDefaultCompat(layoutStyles);

var Footer = function (_a) {
    var _b;
    var children = _a.children, className = _a.className, sticky = _a.sticky, _c = _a.layout, layout = _c === void 0 ? 'start' : _c, gap = _a.gap, dataTestId = _a.dataTestId;
    var _d = React.useContext(Context.ModalContext), footerHighlighted = _d.footerHighlighted, setHasFooter = _d.setHasFooter;
    React.useEffect(function () {
        setHasFooter(true);
    }, [setHasFooter]);
    return (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.footer, className, layoutStyles__default.default[layout], gap && layoutStyles__default.default["gap-".concat(gap)], (_b = {},
            _b[styles__default.default.highlighted] = sticky && footerHighlighted,
            _b[styles__default.default.sticky] = sticky,
            _b)), "data-test-id": dataTestId }, children));
};

exports.Footer = Footer;
