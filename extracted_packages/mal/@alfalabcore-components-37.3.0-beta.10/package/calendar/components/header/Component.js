var React = require('react');
var cn = require('classnames');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"header":"calendar__header_1tc94","withShadow":"calendar__withShadow_1tc94"};
require('./index.css');

var Header = function (_a) {
    var _b;
    var _c = _a.view, view = _c === void 0 ? 'full' : _c, withShadow = _a.withShadow, children = _a.children;
    return (React__default.default.createElement("div", { className: cn__default.default(styles.header, (_b = {},
            _b[styles.monthOnly] = view === 'month-only',
            _b[styles.withShadow] = withShadow,
            _b)), "aria-live": 'polite' }, children));
};

exports.Header = Header;
