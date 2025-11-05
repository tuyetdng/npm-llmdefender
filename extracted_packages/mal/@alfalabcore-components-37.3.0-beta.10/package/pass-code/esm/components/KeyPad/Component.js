import React from 'react';
import { BackspaceXxlIcon } from '@alfalab/icons-glyph/BackspaceXxlIcon';
import { g as getDataTestId } from '../../getDataTestId-ebdc0eda.js';
import { KeyPadButton } from '../KeyPadButton/Component.js';
import 'classnames';
import '../../../../button/esm';

var styles = {"component":"pass-code__component_14tfk","digit":"pass-code__digit_14tfk"};
require('./index.css');

var CELL_COUNT = 12;
var CELLS = new Array(CELL_COUNT).fill(null).map(function (_, i) {
    if (i === 10)
        return 0;
    return i + 1;
});
var KeyPad = function (_a) {
    var leftAddons = _a.leftAddons, rightAddons = _a.rightAddons, onClick = _a.onClick, onClear = _a.onClear, showClear = _a.showClear, dataTestId = _a.dataTestId;
    return (React.createElement("div", { className: styles.component, "data-test-id": getDataTestId(dataTestId, 'keypad') }, CELLS.map(function (digit, i) {
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
};

export { KeyPad };
