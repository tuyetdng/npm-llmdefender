var React = require('react');
var reactTransitionGroup = require('react-transition-group');
var cn = require('classnames');
var getDataTestId = require('../../getDataTestId-11cb0c64.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"pass-code__component_1c0xp","dot":"pass-code__dot_1c0xp","error":"pass-code__error_1c0xp","filled":"pass-code__filled_1c0xp"};
require('./index.css');

var transitions = {"enter":"pass-code__enter_knpp8","enterActive":"pass-code__enterActive_knpp8","exit":"pass-code__exit_knpp8","exitActive":"pass-code__exitActive_knpp8","shake":"pass-code__shake_knpp8"};
require('./transitions.css');

/* eslint-disable react/no-array-index-key */
var TRANSITION_DURATION = 150;
var InputProgress = function (_a) {
    var _b;
    var _c = _a.value, value = _c === void 0 ? '' : _c, maxCodeLength = _a.maxCodeLength, codeLength = _a.codeLength, error = _a.error, dataTestId = _a.dataTestId;
    return (React__default.default.createElement("div", { className: cn__default.default(styles.component, (_b = {}, _b[transitions.shake] = error, _b)), "data-test-id": getDataTestId.getDataTestId(dataTestId, 'input-progress') }, codeLength
        ? new Array(codeLength).fill(null).map(function (_, i) {
            var _a;
            var filled = Boolean(value[i]);
            return (React__default.default.createElement("div", { key: i, className: cn__default.default(styles.dot, (_a = {},
                    _a[styles.error] = filled && error,
                    _a[styles.filled] = filled,
                    _a)) }));
        })
        : new Array(maxCodeLength).fill(null).map(function (_, i) {
            var _a;
            return (React__default.default.createElement(reactTransitionGroup.CSSTransition, { key: i, in: Boolean(value[i]), timeout: TRANSITION_DURATION, classNames: transitions, unmountOnExit: true },
                React__default.default.createElement("div", { className: cn__default.default(styles.dot, styles.filled, (_a = {}, _a[styles.error] = error, _a)) })));
        })));
};

exports.InputProgress = InputProgress;
