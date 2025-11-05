var tslib_es6 = require('../../tslib.es6-bbd6cd2a.js');
var React = require('react');
var cn = require('classnames');
var coreComponentsIconButton = require('../../../../icon-button/cssm');
var Context = require('../../Context.js');
var styles = require('./index.module.css');
require('../../../../base-modal/cssm');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

/**
 * @deprecated Компонент только для внутреннего использования. Используйте <Header />
 */
var Closer = function (_a) {
    var _b;
    var className = _a.className, _c = _a.size, size = _c === void 0 ? 's' : _c, sticky = _a.sticky, icon = _a.icon, restProps = tslib_es6.__rest(_a, ["className", "size", "sticky", "icon"]);
    var onClose = React.useContext(Context.ModalContext).onClose;
    var handleClick = React.useCallback(function (event) {
        onClose(event, 'closerClick');
    }, [onClose]);
    return (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.closer, className, (_b = {},
            _b[styles__default.default.sticky] = sticky,
            _b)) },
        React__default.default.createElement(coreComponentsIconButton.IconButton, tslib_es6.__assign({ size: size, className: styles__default.default.button, "aria-label": '\u0437\u0430\u043A\u0440\u044B\u0442\u044C', onClick: handleClick, icon: icon }, restProps))));
};

exports.Closer = Closer;
