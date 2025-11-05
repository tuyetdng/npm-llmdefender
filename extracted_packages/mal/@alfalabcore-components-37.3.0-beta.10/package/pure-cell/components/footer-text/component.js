var React = require('react');
var coreComponentsTypography = require('../../../typography');
var getDataTestId = require('../../getDataTestId-3093bcb2.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var FooterText = function (_a) {
    var children = _a.children, _b = _a.color, color = _b === void 0 ? 'secondary' : _b, dataTestId = _a.dataTestId;
    return (React__default.default.createElement(coreComponentsTypography.Typography.Text, { view: 'primary-small', color: color, "data-test-id": getDataTestId.getDataTestId(dataTestId, 'footer-title') }, children));
};

exports.FooterText = FooterText;
