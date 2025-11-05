var tslib_es6 = require('../../tslib.es6-641c02e0.js');
var React = require('react');
var cn = require('classnames');
var coreComponentsIconButton = require('../../../icon-button');
var ArrowBackMIcon = require('@alfalab/icons-glyph/ArrowBackMIcon');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"backer":"bottom-sheet__backer_1k990","button":"bottom-sheet__button_1k990"};
require('./index.css');

var Backer = function (_a) {
    var className = _a.className, _b = _a.size, size = _b === void 0 ? 'xs' : _b, _c = _a.icon, icon = _c === void 0 ? ArrowBackMIcon.ArrowBackMIcon : _c, dataTestId = _a.dataTestId, onClick = _a.onClick, restProps = tslib_es6.__rest(_a, ["className", "size", "icon", "dataTestId", "onClick"]);
    return (React__default.default.createElement("div", { className: cn__default.default(styles.backer, className) },
        React__default.default.createElement(coreComponentsIconButton.IconButton, tslib_es6.__assign({ size: size, className: styles.button, "aria-label": '\u043D\u0430\u0437\u0430\u0434', onClick: onClick, icon: icon, dataTestId: dataTestId }, restProps))));
};

exports.Backer = Backer;
