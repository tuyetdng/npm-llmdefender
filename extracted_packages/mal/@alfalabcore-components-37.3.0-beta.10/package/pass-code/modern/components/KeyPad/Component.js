import React from 'react';
import { BackspaceXxlIcon } from '@alfalab/icons-glyph/BackspaceXxlIcon';
import { g as getDataTestId } from '../../getDataTestId-7e0fa95b.js';
import { KeyPadButton } from '../KeyPadButton/Component.js';
import 'classnames';
import '../../../../button/modern';

const styles = {"component":"pass-code__component_14tfk","digit":"pass-code__digit_14tfk"};
require('./index.css');

const CELL_COUNT = 12;
const CELLS = new Array(CELL_COUNT).fill(null).map((_, i) => {
    if (i === 10)
        return 0;
    return i + 1;
});
const KeyPad = ({ leftAddons, rightAddons, onClick, onClear, showClear, dataTestId, }) => (React.createElement("div", { className: styles.component, "data-test-id": getDataTestId(dataTestId, 'keypad') }, CELLS.map((digit, i) => {
    if (i === 9) {
        if (leftAddons)
            return leftAddons;
        return React.createElement("div", { key: 'left-addons-empty' });
    }
    if (i === 11) {
        if (showClear) {
            return (React.createElement(KeyPadButton, { key: 'clear-btn', onClick: onClear, view: 'ghost' },
                React.createElement(BackspaceXxlIcon, null)));
        }
        if (rightAddons)
            return rightAddons;
        return React.createElement("div", { key: 'right-addon-empty' });
    }
    return (React.createElement(KeyPadButton, { key: digit, onClick: onClick, view: 'secondary', buttonClassName: styles.digit }, digit));
})));

export { KeyPad };
