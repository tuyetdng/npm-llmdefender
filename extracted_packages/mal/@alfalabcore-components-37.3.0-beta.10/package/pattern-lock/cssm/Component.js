var utils = require('./utils-5745f540.js');
var React = require('react');
var reactCanvasPatternLock = require('react-canvas-pattern-lock');
var cn = require('classnames');
var coreComponentsGap = require('../../gap/cssm');
var consts = require('./consts.js');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var PatternLock = React.forwardRef(function (_a, ref) {
    var _b;
    var _c = _a.observeTokens, observeTokens = _c === void 0 ? false : _c, _d = _a.observerParams, observerParams = _d === void 0 ? {} : _d, _e = _a.justifyNodes, justifyNodes = _e === void 0 ? 'space-between' : _e, className = _a.className, error = _a.error, dataTestId = _a.dataTestId, restProps = utils.__rest(_a, ["observeTokens", "observerParams", "justifyNodes", "className", "error", "dataTestId"]);
    var _f = React.useState(), params = _f[0], setParams = _f[1];
    React.useEffect(function () {
        var _a = utils.getSizes(), elementSizes = _a.elementSizes, width = _a.width, height = _a.height;
        setParams({
            theme: utils.getTheme(elementSizes),
            width: width,
            height: height,
        });
    }, []);
    React.useEffect(function () {
        var styleObserver = null;
        if (observeTokens) {
            var _a = observerParams.options, options = _a === void 0 ? consts.OBSERVE_OPTIONS : _a, _b = observerParams.getTarget, getTarget = _b === void 0 ? utils.getDefaultObserveTarget : _b;
            styleObserver = new MutationObserver(function () {
                return setParams(function (prevState) {
                    var _a = utils.getSizes(), width = _a.width, height = _a.height, elementSizes = _a.elementSizes;
                    if (!prevState) {
                        return { theme: utils.getTheme(elementSizes), width: width, height: height };
                    }
                    var prevBgColor = prevState.theme[consts.THEME_STATE.INITIAL].colors.bg;
                    var themeChanged = prevBgColor !== utils.getColorByToken(consts.OBSERVABLE_TOKENS.BG);
                    if (themeChanged)
                        return utils.__assign(utils.__assign({}, prevState), { theme: utils.getTheme(elementSizes) });
                    return prevState;
                });
            });
            styleObserver.observe(getTarget(), options);
        }
        return function () { return styleObserver === null || styleObserver === void 0 ? void 0 : styleObserver.disconnect(); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [observeTokens]);
    return (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.component, className, (_b = {}, _b[styles__default.default.hidden] = !params, _b)), "data-test-id": dataTestId },
        React__default.default.createElement(coreComponentsGap.Gap, { size: 'm' }),
        React__default.default.createElement(coreComponentsGap.Gap, { size: 's' }),
        React__default.default.createElement("div", { className: styles__default.default.error }, error),
        React__default.default.createElement(coreComponentsGap.Gap, { size: 'xl' }),
        React__default.default.createElement(reactCanvasPatternLock.ReactCanvasPatternLock, utils.__assign({}, restProps, params, { ref: ref, rows: 3, cols: 3, justifyNodes: justifyNodes }))));
});

exports.PatternLock = PatternLock;
