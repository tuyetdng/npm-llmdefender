var tslib_es6 = require('../../tslib.es6-bbd6cd2a.js');
var React = require('react');
var cn = require('classnames');
var coreComponentsBaseModal = require('../../../../base-modal/cssm');
var coreComponentsIconButton = require('../../../../icon-button/cssm');
var CrossMIcon = require('@alfalab/icons-glyph/CrossMIcon');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var Closer = function (_a) {
    var className = _a.className, _b = _a.size, size = _b === void 0 ? 'xs' : _b, _c = _a.icon, icon = _c === void 0 ? CrossMIcon.CrossMIcon : _c, dataTestId = _a.dataTestId, restProps = tslib_es6.__rest(_a, ["className", "size", "icon", "dataTestId"]);
    var onClose = React.useContext(coreComponentsBaseModal.BaseModalContext).onClose;
    var handleClick = React.useCallback(function (event) {
        onClose(event, 'closerClick');
    }, [onClose]);
    return (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.closer, className) },
        React__default.default.createElement(coreComponentsIconButton.IconButton, tslib_es6.__assign({ size: size, className: styles__default.default.button, "aria-label": '\u0437\u0430\u043A\u0440\u044B\u0442\u044C', onClick: handleClick, icon: icon, dataTestId: dataTestId }, restProps))));
};

exports.Closer = Closer;
