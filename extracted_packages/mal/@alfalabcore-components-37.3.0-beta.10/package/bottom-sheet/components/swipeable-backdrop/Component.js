var tslib_es6 = require('../../tslib.es6-641c02e0.js');
var React = require('react');
var coreComponentsBackdrop = require('../../../backdrop');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var SwipeableBackdrop = function (_a) {
    var opacity = _a.opacity, handlers = _a.handlers, opacityTimeout = _a.opacityTimeout, style = _a.style, backdropProps = tslib_es6.__rest(_a, ["opacity", "handlers", "opacityTimeout", "style"]);
    return (React__default.default.createElement("div", tslib_es6.__assign({}, handlers, { style: tslib_es6.__assign({ opacity: opacity, transition: opacity === 1 ? "opacity ".concat(opacityTimeout, "ms ease-in-out") : '', position: 'relative' }, style) }),
        React__default.default.createElement(coreComponentsBackdrop.Backdrop, tslib_es6.__assign({}, backdropProps))));
};

exports.SwipeableBackdrop = SwipeableBackdrop;
