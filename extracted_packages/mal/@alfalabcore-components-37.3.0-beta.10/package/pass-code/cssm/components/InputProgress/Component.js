var React = require('react');
var reactTransitionGroup = require('react-transition-group');
var cn = require('classnames');
var getDataTestId = require('../../getDataTestId-5c876d98.js');
var styles = require('./index.module.css');
var transitions = require('./transitions.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);
var transitions__default = /*#__PURE__*/_interopDefaultCompat(transitions);

/* eslint-disable react/no-array-index-key */
var TRANSITION_DURATION = 150;
var InputProgress = function (_a) {
    var _b;
    var _c = _a.value, value = _c === void 0 ? '' : _c, maxCodeLength = _a.maxCodeLength, codeLength = _a.codeLength, error = _a.error, dataTestId = _a.dataTestId;
    return (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.component, (_b = {}, _b[transitions__default.default.shake] = error, _b)), "data-test-id": getDataTestId.getDataTestId(dataTestId, 'input-progress') }, codeLength
        ? new Array(codeLength).fill(null).map(function (_, i) {
            var _a;
            var filled = Boolean(value[i]);
            return (React__default.default.createElement("div", { key: i, className: cn__default.default(styles__default.default.dot, (_a = {},
                    _a[styles__default.default.error] = filled && error,
                    _a[styles__default.default.filled] = filled,
                    _a)) }));
        })
        : new Array(maxCodeLength).fill(null).map(function (_, i) {
            var _a;
            return (React__default.default.createElement(reactTransitionGroup.CSSTransition, { key: i, in: Boolean(value[i]), timeout: TRANSITION_DURATION, classNames: transitions__default.default, unmountOnExit: true },
                React__default.default.createElement("div", { className: cn__default.default(styles__default.default.dot, styles__default.default.filled, (_a = {}, _a[styles__default.default.error] = error, _a)) })));
        })));
};

exports.InputProgress = InputProgress;
