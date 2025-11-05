var tslib_es6 = require('../../tslib.es6-76668849.js');
var React = require('react');
var cn = require('classnames');
var coreComponentsIconButton = require('../../../icon-button');
var CrossHeavyMIcon = require('@alfalab/icons-glyph/CrossHeavyMIcon');
var Context = require('../../Context.js');
require('../../../base-modal');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"closer":"modal__closer_dywtt","button":"modal__button_dywtt","sticky":"modal__sticky_dywtt"};
require('./index.css');

/**
 * @deprecated Компонент только для внутреннего использования. Используйте <Header />
 */
var Closer = function (_a) {
    var _b;
    var className = _a.className, _c = _a.size, size = _c === void 0 ? 's' : _c, sticky = _a.sticky, _d = _a.icon, icon = _d === void 0 ? CrossHeavyMIcon.CrossHeavyMIcon : _d, dataTestId = _a.dataTestId, restProps = tslib_es6.__rest(_a, ["className", "size", "sticky", "icon", "dataTestId"]);
    var onClose = React.useContext(Context.ModalContext).onClose;
    var handleClick = React.useCallback(function (event) {
        onClose(event, 'closerClick');
    }, [onClose]);
    return (React__default.default.createElement("div", { className: cn__default.default(styles.closer, className, (_b = {},
            _b[styles.sticky] = sticky,
            _b)) },
        React__default.default.createElement(coreComponentsIconButton.IconButton, tslib_es6.__assign({ size: size, className: styles.button, "aria-label": '\u0437\u0430\u043A\u0440\u044B\u0442\u044C', onClick: handleClick, icon: icon, dataTestId: dataTestId }, restProps))));
};

exports.Closer = Closer;
