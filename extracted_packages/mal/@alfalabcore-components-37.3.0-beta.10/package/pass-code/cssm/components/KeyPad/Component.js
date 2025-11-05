var React = require('react');
var BackspaceXxlIcon = require('@alfalab/icons-glyph/BackspaceXxlIcon');
var getDataTestId = require('../../getDataTestId-5c876d98.js');
var components_KeyPadButton_Component = require('../KeyPadButton/Component.js');
var styles = require('./index.module.css');
require('classnames');
require('../../../../button/cssm');
require('../KeyPadButton/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var CELL_COUNT = 12;
var CELLS = new Array(CELL_COUNT).fill(null).map(function (_, i) {
    if (i === 10)
        return 0;
    return i + 1;
});
var KeyPad = function (_a) {
    var leftAddons = _a.leftAddons, rightAddons = _a.rightAddons, onClick = _a.onClick, onClear = _a.onClear, showClear = _a.showClear, dataTestId = _a.dataTestId;
    return (React__default.default.createElement("div", { className: styles__default.default.component, "data-test-id": getDataTestId.getDataTestId(dataTestId, 'keypad') }, CELLS.map(function (digit, i) {
        if (i === 9) {
            if (leftAddons)
                return leftAddons;
            return React__default.default.createElement("div", { key: 'left-addons-empty' });
        }
        if (i === 11) {
            if (showClear) {
                return (React__default.default.createElement(components_KeyPadButton_Component.KeyPadButton, { key: 'clear-btn', onClick: onClear, view: 'ghost' },
                    React__default.default.createElement(BackspaceXxlIcon.BackspaceXxlIcon, null)));
            }
            if (rightAddons)
                return rightAddons;
            return React__default.default.createElement("div", { key: 'right-addon-empty' });
        }
        return (React__default.default.createElement(components_KeyPadButton_Component.KeyPadButton, { key: digit, onClick: onClick, view: 'secondary', buttonClassName: styles__default.default.digit }, digit));
    })));
};

exports.KeyPad = KeyPad;
