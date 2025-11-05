var React = require('react');
var cn = require('classnames');
var coreComponentsGap = require('../../gap/cssm');
var getDataTestId = require('./getDataTestId-5c876d98.js');
var components_InputProgress_Component = require('./components/InputProgress/Component.js');
var components_KeyPad_Component = require('./components/KeyPad/Component.js');
var styles = require('./index.module.css');
require('react-transition-group');
require('./components/InputProgress/index.module.css');
require('./components/InputProgress/transitions.module.css');
require('@alfalab/icons-glyph/BackspaceXxlIcon');
require('./components/KeyPadButton/Component.js');
require('../../button/cssm');
require('./components/KeyPadButton/index.module.css');
require('./components/KeyPad/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var PassCode = React.forwardRef(function (_a, ref) {
    var _b = _a.value, value = _b === void 0 ? '' : _b, dataTestId = _a.dataTestId, className = _a.className, leftAddons = _a.leftAddons, rightAddons = _a.rightAddons, error = _a.error, onChange = _a.onChange, _c = _a.maxCodeLength, maxCodeLength = _c === void 0 ? 10 : _c, codeLength = _a.codeLength;
    var passwordLen = codeLength || maxCodeLength;
    var handleChange = function (digit) {
        var newValue = value.concat(digit.toString());
        if (newValue.length <= passwordLen) {
            onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
        }
    };
    var handleClear = function () {
        if (value.length > 0) {
            onChange === null || onChange === void 0 ? void 0 : onChange(value === null || value === void 0 ? void 0 : value.slice(0, -1));
        }
    };
    return (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.component, className), ref: ref, "data-test-id": getDataTestId.getDataTestId(dataTestId, 'wrapper') },
        React__default.default.createElement("div", { className: styles__default.default.error, "data-test-id": getDataTestId.getDataTestId(dataTestId, 'error') }, error),
        React__default.default.createElement(coreComponentsGap.Gap, { size: 'm' }),
        React__default.default.createElement(components_InputProgress_Component.InputProgress, { dataTestId: dataTestId, value: value, maxCodeLength: maxCodeLength, codeLength: codeLength, error: Boolean(error) }),
        React__default.default.createElement(coreComponentsGap.Gap, { size: '4xl' }),
        React__default.default.createElement(components_KeyPad_Component.KeyPad, { dataTestId: dataTestId, leftAddons: leftAddons, rightAddons: rightAddons, onClick: handleChange, onClear: handleClear, showClear: Boolean(value) })));
});

exports.PassCode = PassCode;
