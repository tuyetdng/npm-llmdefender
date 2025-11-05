var React = require('react');
var cn = require('classnames');
var getDataTestId = require('../../getDataTestId-3093bcb2.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"pure-cell__component_3hz1g","none":"pure-cell__none_3hz1g","default":"pure-cell__default_3hz1g"};
require('./index.css');

var Footer = function (_a) {
    var children = _a.children, _b = _a.footerPadding, footerPadding = _b === void 0 ? 'default' : _b, dataTestId = _a.dataTestId;
    return (React__default.default.createElement("footer", { className: cn__default.default(styles.component, styles[footerPadding]), "data-test-id": getDataTestId.getDataTestId(dataTestId, 'footer') }, children));
};

exports.Footer = Footer;
