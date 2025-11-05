var React = require('react');
var cn = require('classnames');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"skeleton__component_bgmht","animate":"skeleton__animate_bgmht","background":"skeleton__background_bgmht","gradient":"skeleton__gradient_bgmht"};
require('./index.css');

var Skeleton = function (_a) {
    var _b;
    var visible = _a.visible, _c = _a.animate, animate = _c === void 0 ? true : _c, className = _a.className, dataTestId = _a.dataTestId, children = _a.children;
    if (visible) {
        return (React__default.default.createElement("div", { className: cn__default.default(styles.component, (_b = {}, _b[styles.animate] = animate, _b), className), "data-test-id": dataTestId }, children));
    }
    return (React__default.default.createElement("div", { "data-test-id": dataTestId, className: className }, children));
};

exports.Skeleton = Skeleton;
