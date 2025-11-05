var React = require('react');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var LinearGradient = function (_a) {
    var id = _a.id, gid = _a.gid, points = _a.points;
    return (React__default.default.createElement("linearGradient", { key: "".concat(id, "-").concat(gid), id: "".concat(id, "-").concat(gid), x1: '0', y1: '0', x2: '0', y2: '1' }, points.map(function (point, index) { return (React__default.default.createElement("stop", { key: "".concat(id).concat(gid, "-").concat(index.toString()), offset: "".concat(point.offset, "%"), stopColor: point.stopColor, stopOpacity: point.stopOpacity })); })));
};

exports.LinearGradient = LinearGradient;
