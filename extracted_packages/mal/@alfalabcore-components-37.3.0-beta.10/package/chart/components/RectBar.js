var React = require('react');
var hooks_usePathBar_index = require('../hooks/usePathBar/index.js');
require('../hooks/usePathBar/utils/getRadius.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

// eslint-disable-next-line complexity
var getPath = function (x, width, height, initHeight, topRadius, bottomRadius, initY) {
    return "\n        M".concat(x + ((height !== 0 && bottomRadius) || 0), " ").concat(initY + initHeight || 0, "\n        Q").concat(x, " ").concat(initY + initHeight, " ").concat(x, " ").concat(initY + initHeight - ((height !== 0 && bottomRadius) || 0), "\n        L").concat(x, " ").concat(initY + ((height !== 0 && topRadius) || 0), "\n        Q").concat(x, " ").concat(initY, " ").concat(x + ((height !== 0 && topRadius) || 0), " ").concat(initY, "\n        L").concat(x + width - ((height !== 0 && topRadius) || 0), " ").concat(initY, "\n        Q").concat(x + width, " ").concat(initY, " ").concat(x + width, " ").concat(initY + (topRadius || 0), "\n        L").concat(x + width, " ").concat(initY + initHeight - ((height !== 0 && bottomRadius) || 0), "\n        Q").concat(x + width, " ").concat(initY + initHeight, " ").concat(x + width - ((height !== 0 && bottomRadius) || 0), " ").concat(initY + initHeight, "\n        Z\n    ");
};
var RectBar = function (_a) {
    var fill = _a.fill, x = _a.x, y = _a.y, width = _a.width, height = _a.height, radius = _a.radius, background = _a.background;
    var _b = hooks_usePathBar_index.usePathBar({
        radius: radius,
        height: height,
        background: background,
        y: y,
    }), initHeight = _b[0], topRadius = _b[1], bottomRadius = _b[2], initY = _b[3];
    return React.useMemo(function () { return (React__default.default.createElement("path", { d: getPath(x, width, height, initHeight, topRadius, bottomRadius, initY), stroke: 'none', fill: fill })); }, [x, width, height, initHeight, topRadius, bottomRadius, initY, fill]);
};

exports.RectBar = RectBar;
