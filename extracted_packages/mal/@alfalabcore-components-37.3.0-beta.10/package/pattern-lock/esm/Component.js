import { _ as __rest, g as getSizes, a as getTheme, b as getColorByToken, c as __assign, d as getDefaultObserveTarget } from './utils-54a41b51.js';
import React, { forwardRef, useState, useEffect } from 'react';
import { ReactCanvasPatternLock } from 'react-canvas-pattern-lock';
import cn from 'classnames';
import { Gap } from '../../gap/esm';
import { THEME_STATE, OBSERVE_OPTIONS, OBSERVABLE_TOKENS } from './consts.js';

var styles = {"component":"pattern-lock__component_ctfk6","hidden":"pattern-lock__hidden_ctfk6","error":"pattern-lock__error_ctfk6"};
require('./index.css');

var PatternLock = forwardRef(function (_a, ref) {
    var _b;
    var _c = _a.observeTokens, observeTokens = _c === void 0 ? false : _c, _d = _a.observerParams, observerParams = _d === void 0 ? {} : _d, _e = _a.justifyNodes, justifyNodes = _e === void 0 ? 'space-between' : _e, className = _a.className, error = _a.error, dataTestId = _a.dataTestId, restProps = __rest(_a, ["observeTokens", "observerParams", "justifyNodes", "className", "error", "dataTestId"]);
    var _f = useState(), params = _f[0], setParams = _f[1];
    useEffect(function () {
        var _a = getSizes(), elementSizes = _a.elementSizes, width = _a.width, height = _a.height;
        setParams({
            theme: getTheme(elementSizes),
            width: width,
            height: height,
        });
    }, []);
    useEffect(function () {
        var styleObserver = null;
        if (observeTokens) {
            var _a = observerParams.options, options = _a === void 0 ? OBSERVE_OPTIONS : _a, _b = observerParams.getTarget, getTarget = _b === void 0 ? getDefaultObserveTarget : _b;
            styleObserver = new MutationObserver(function () {
                return setParams(function (prevState) {
                    var _a = getSizes(), width = _a.width, height = _a.height, elementSizes = _a.elementSizes;
                    if (!prevState) {
                        return { theme: getTheme(elementSizes), width: width, height: height };
                    }
                    var prevBgColor = prevState.theme[THEME_STATE.INITIAL].colors.bg;
                    var themeChanged = prevBgColor !== getColorByToken(OBSERVABLE_TOKENS.BG);
                    if (themeChanged)
                        return __assign(__assign({}, prevState), { theme: getTheme(elementSizes) });
                    return prevState;
                });
            });
            styleObserver.observe(getTarget(), options);
        }
        return function () { return styleObserver === null || styleObserver === void 0 ? void 0 : styleObserver.disconnect(); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [observeTokens]);
    return (React.createElement("div", { className: cn(styles.component, className, (_b = {}, _b[styles.hidden] = !params, _b)), "data-test-id": dataTestId },
        React.createElement(Gap, { size: 'm' }),
        React.createElement(Gap, { size: 's' }),
        React.createElement("div", { className: styles.error }, error),
        React.createElement(Gap, { size: 'xl' }),
        React.createElement(ReactCanvasPatternLock, __assign({}, restProps, params, { ref: ref, rows: 3, cols: 3, justifyNodes: justifyNodes }))));
});

export { PatternLock };
