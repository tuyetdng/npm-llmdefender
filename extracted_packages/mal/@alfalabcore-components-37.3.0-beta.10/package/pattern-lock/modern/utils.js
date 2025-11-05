import { OBSERVABLE_TOKENS, THEME_STATE } from './consts.js';

function getDefaultObserveTarget() {
    return document.head;
}
function getColorByToken(token) {
    return getComputedStyle(document.documentElement).getPropertyValue(token);
}
const getSizes = (() => {
    const COMMON_SIZES = {
        lineWidth: 6,
        nodeRing: 0,
        nodeCore: 12,
    };
    let cachedSize;
    return () => {
        if (cachedSize) {
            return cachedSize;
        }
        if (window.matchMedia('(min-width: 390px)').matches) {
            cachedSize = {
                elementSizes: { ...COMMON_SIZES, nodeRadius: 43 },
                width: 322,
                height: 322,
            };
        }
        else if (window.matchMedia('(min-width: 360px)').matches) {
            cachedSize = {
                elementSizes: { ...COMMON_SIZES, nodeRadius: 38 },
                width: 292,
                height: 292,
            };
        }
        else {
            cachedSize = {
                elementSizes: { ...COMMON_SIZES, nodeRadius: 32 },
                width: 240,
                height: 240,
            };
        }
        return cachedSize;
    };
})();
function getTheme(dimens) {
    const baseColors = {
        primary: getColorByToken(OBSERVABLE_TOKENS.PRIMARY),
        bg: getColorByToken(OBSERVABLE_TOKENS.BG),
        ringBg: getColorByToken(OBSERVABLE_TOKENS.RING_BG_INITIAL),
    };
    return {
        [THEME_STATE.INITIAL]: {
            colors: {
                ...baseColors,
                accent: getColorByToken(OBSERVABLE_TOKENS.ACCENT_INITIAL),
                selectedRingBg: getColorByToken(OBSERVABLE_TOKENS.SELECTED_RING_BG_INITIAL),
            },
            dimens,
        },
        [THEME_STATE.SUCCESS]: {
            colors: {
                ...baseColors,
                accent: getColorByToken(OBSERVABLE_TOKENS.ACCENT_SUCCESS),
                selectedRingBg: getColorByToken(OBSERVABLE_TOKENS.SELECTED_RING_BG_SUCCESS),
            },
            dimens,
        },
        [THEME_STATE.FAILURE]: {
            colors: {
                ...baseColors,
                accent: getColorByToken(OBSERVABLE_TOKENS.ACCENT_FAILURE),
                selectedRingBg: getColorByToken(OBSERVABLE_TOKENS.SELECTED_RING_BG_FAILURE),
            },
            dimens,
        },
    };
}

export { getColorByToken, getDefaultObserveTarget, getSizes, getTheme };
