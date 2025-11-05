var React = require('react');
var cn = require('classnames');
var ContainerMIcon = require('@alfalab/icons-glyph/ContainerMIcon');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"overlay":"dropzone__overlay_1o4ce","visible":"dropzone__visible_1o4ce","text":"dropzone__text_1o4ce"};
require('./index.css');

var Overlay = function (_a) {
    var _b;
    var _c = _a.text, text = _c === void 0 ? 'Перетащите файлы' : _c, _d = _a.visible, visible = _d === void 0 ? false : _d;
    return (React__default.default.createElement("div", { className: cn__default.default(styles.overlay, (_b = {},
            _b[styles.visible] = visible,
            _b)) },
        React__default.default.createElement(ContainerMIcon.ContainerMIcon, null),
        React__default.default.createElement("span", { className: styles.text }, text)));
};

exports.Overlay = Overlay;
