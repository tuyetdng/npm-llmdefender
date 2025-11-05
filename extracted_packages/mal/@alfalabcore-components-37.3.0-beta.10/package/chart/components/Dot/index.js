var React = require('react');
var cn = require('classnames');
var icons_Point = require('../../icons/Point.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"dotUnfocused":"chart__dotUnfocused_1k2nr","dot":"chart__dot_1k2nr","dotItem":"chart__dotItem_1k2nr","dotWrap":"chart__dotWrap_1k2nr","showDot":"chart__showDot_1k2nr"};
require('./index.css');

var Dot = React__default.default.forwardRef(function (_a, ref) {
    var cx = _a.cx, cy = _a.cy, index = _a.index, activeDot = _a.activeDot, dataKey = _a.dataKey, dotSettings = _a.dotSettings, value = _a.value, stroke = _a.stroke;
    var _b = React.useState(0), windowWidth = _b[0], setWindowWidth = _b[1];
    var _c = React.useState(0), height = _c[0], setHeight = _c[1];
    var _d = React.useState(0), width = _d[0], setWidth = _d[1];
    var _e = React.useState(null), option = _e[0], setOption = _e[1];
    React.useEffect(function () {
        var dotSetting = Array.isArray(dotSettings) && dotSettings.length > 0
            ? dotSettings.find(function (item) { return item.media && windowWidth < item.media; })
            : dotSettings;
        if (Array.isArray(dotSettings) && dotSettings.length > 0 && !dotSetting) {
            dotSetting = dotSettings[dotSettings.length - 1];
        }
        setWindowWidth(window.innerWidth);
        setOption(dotSetting);
    }, [dotSettings, windowWidth]);
    React.useEffect(function () {
        if (!option)
            return;
        if (typeof activeDot === 'number' && activeDot === index) {
            setHeight(option.height * option.scale);
            setWidth(option.width * option.scale);
        }
        else {
            setHeight(option.height * option.initScale);
            setWidth(option.width * option.initScale);
        }
    }, [activeDot, index, option]);
    if (!value)
        return null;
    return (React__default.default.createElement("g", { ref: ref, className: cn__default.default(styles.dot), transform: "translate(".concat(cx - width / 2, ", ").concat(cy - height / 2, ")") },
        React__default.default.createElement("g", { className: cn__default.default(styles.dotWrap), transform: "scale(".concat(activeDot === index ? (option === null || option === void 0 ? void 0 : option.scale) || 0 : (option === null || option === void 0 ? void 0 : option.initScale) || 0, ")") },
            React__default.default.createElement("svg", { className: cn__default.default(styles.dotItem, activeDot === index ? styles.dotActive : '', typeof activeDot === 'number' && activeDot !== index
                    ? styles.dotUnfocused
                    : ''), "data-id": index, "data-name": dataKey, width: (option === null || option === void 0 ? void 0 : option.width) || 0, height: (option === null || option === void 0 ? void 0 : option.height) || 0 },
                React__default.default.createElement(icons_Point.PointIcon, { fill: stroke })))));
});

exports.Dot = Dot;
