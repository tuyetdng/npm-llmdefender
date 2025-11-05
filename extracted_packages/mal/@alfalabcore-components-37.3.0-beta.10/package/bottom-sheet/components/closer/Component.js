var tslib_es6 = require('../../tslib.es6-641c02e0.js');
var React = require('react');
var cn = require('classnames');
var coreComponentsBaseModal = require('../../../base-modal');
var coreComponentsIconButton = require('../../../icon-button');
var CrossMIcon = require('@alfalab/icons-glyph/CrossMIcon');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"closer":"bottom-sheet__closer_1iz26","button":"bottom-sheet__button_1iz26"};
require('./index.css');

var Closer = function (_a) {
    var className = _a.className, _b = _a.size, size = _b === void 0 ? 'xs' : _b, _c = _a.icon, icon = _c === void 0 ? CrossMIcon.CrossMIcon : _c, dataTestId = _a.dataTestId, restProps = tslib_es6.__rest(_a, ["className", "size", "icon", "dataTestId"]);
    var onClose = React.useContext(coreComponentsBaseModal.BaseModalContext).onClose;
    var handleClick = React.useCallback(function (event) {
        onClose(event, 'closerClick');
    }, [onClose]);
    return (React__default.default.createElement("div", { className: cn__default.default(styles.closer, className) },
        React__default.default.createElement(coreComponentsIconButton.IconButton, tslib_es6.__assign({ size: size, className: styles.button, "aria-label": '\u0437\u0430\u043A\u0440\u044B\u0442\u044C', onClick: handleClick, icon: icon, dataTestId: dataTestId }, restProps))));
};

exports.Closer = Closer;
