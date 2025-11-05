var tslib_es6 = require('../../tslib.es6-9c29edce.js');
var React = require('react');
var cn = require('classnames');
var coreComponentsIconButton = require('../../../icon-button');
var Context = require('../../Context.js');
require('../../../base-modal');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"closer":"side-panel__closer_1f6zk","button":"side-panel__button_1f6zk","sticky":"side-panel__sticky_1f6zk"};
require('./index.css');

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
    return (React__default.default.createElement("div", { className: cn__default.default(styles.closer, className, (_b = {},
            _b[styles.sticky] = sticky,
            _b)) },
        React__default.default.createElement(coreComponentsIconButton.IconButton, tslib_es6.__assign({ size: size, className: styles.button, "aria-label": '\u0437\u0430\u043A\u0440\u044B\u0442\u044C', onClick: handleClick, icon: icon }, restProps))));
};

exports.Closer = Closer;
