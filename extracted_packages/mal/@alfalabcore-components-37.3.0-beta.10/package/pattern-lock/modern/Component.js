import React, { forwardRef, useState, useEffect } from 'react';
import { ReactCanvasPatternLock } from 'react-canvas-pattern-lock';
import cn from 'classnames';
import { Gap } from '../../gap/modern';
import { THEME_STATE, OBSERVE_OPTIONS, OBSERVABLE_TOKENS } from './consts.js';
import { getSizes, getTheme, getColorByToken, getDefaultObserveTarget } from './utils.js';

const styles = {"component":"pattern-lock__component_ctfk6","hidden":"pattern-lock__hidden_ctfk6","error":"pattern-lock__error_ctfk6"};
require('./index.css');

const PatternLock = forwardRef(({ observeTokens = false, observerParams = {}, justifyNodes = 'space-between', className, error, dataTestId, ...restProps }, ref) => {
    const [params, setParams] = useState();
    useEffect(() => {
        const { elementSizes, width, height } = getSizes();
        setParams({
            theme: getTheme(elementSizes),
            width,
            height,
        });
    }, []);
    useEffect(() => {
        let styleObserver = null;
        if (observeTokens) {
            const { options = OBSERVE_OPTIONS, getTarget = getDefaultObserveTarget } = observerParams;
            styleObserver = new MutationObserver(() => setParams((prevState) => {
                const { width, height, elementSizes } = getSizes();
                if (!prevState) {
                    return { theme: getTheme(elementSizes), width, height };
                }
                const prevBgColor = prevState.theme[THEME_STATE.INITIAL].colors.bg;
                const themeChanged = prevBgColor !== getColorByToken(OBSERVABLE_TOKENS.BG);
                if (themeChanged)
                    return { ...prevState, theme: getTheme(elementSizes) };
                return prevState;
            }));
            styleObserver.observe(getTarget(), options);
        }
        return () => styleObserver?.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [observeTokens]);
    return (React.createElement("div", { className: cn(styles.component, className, { [styles.hidden]: !params }), "data-test-id": dataTestId },
        React.createElement(Gap, { size: 'm' }),
        React.createElement(Gap, { size: 's' }),
        React.createElement("div", { className: styles.error }, error),
        React.createElement(Gap, { size: 'xl' }),
        React.createElement(ReactCanvasPatternLock, { ...restProps, ...params, ref: ref, rows: 3, cols: 3, justifyNodes: justifyNodes })));
});

export { PatternLock };
