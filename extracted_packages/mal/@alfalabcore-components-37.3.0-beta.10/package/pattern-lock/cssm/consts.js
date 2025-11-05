var OBSERVE_OPTIONS = {
    childList: true,
    attributes: false,
    characterData: false,
    subtree: true,
};
var OBSERVABLE_TOKENS = {
    ACCENT_INITIAL: '--color-light-graphic-primary',
    ACCENT_SUCCESS: '--color-light-graphic-positive',
    ACCENT_FAILURE: '--color-light-graphic-negative',
    PRIMARY: '--color-light-graphic-tertiary',
    BG: '--color-light-bg-primary',
    RING_BG_INITIAL: '--color-light-specialbg-secondary-transparent',
    SELECTED_RING_BG_INITIAL: '--color-light-specialbg-tertiary-transparent',
    SELECTED_RING_BG_SUCCESS: '--color-light-graphic-positive-alpha-10',
    SELECTED_RING_BG_FAILURE: '--color-light-graphic-negative-alpha-10',
};
var THEME_STATE = {
    INITIAL: 'initial',
    SUCCESS: 'success',
    FAILURE: 'failure',
};

exports.OBSERVABLE_TOKENS = OBSERVABLE_TOKENS;
exports.OBSERVE_OPTIONS = OBSERVE_OPTIONS;
exports.THEME_STATE = THEME_STATE;
