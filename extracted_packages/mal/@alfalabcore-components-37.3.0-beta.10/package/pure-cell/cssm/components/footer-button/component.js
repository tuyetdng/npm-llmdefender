var tslib_es6 = require('../../tslib.es6-bbd6cd2a.js');
var React = require('react');
var coreComponentsButton = require('../../../../button/cssm');
var getDataTestId = require('../../getDataTestId-5c876d98.js');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var FooterButton = function (_a) {
    var children = _a.children, dataTestId = _a.dataTestId, props = tslib_es6.__rest(_a, ["children", "dataTestId"]);
    return (React__default.default.createElement(coreComponentsButton.Button, tslib_es6.__assign({}, props, { size: 'xxs', dataTestId: getDataTestId.getDataTestId(dataTestId, 'button'), className: styles__default.default.component }), children));
};

exports.FooterButton = FooterButton;
