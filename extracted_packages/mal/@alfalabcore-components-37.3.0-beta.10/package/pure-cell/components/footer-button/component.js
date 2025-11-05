var tslib_es6 = require('../../tslib.es6-36bf03a1.js');
var React = require('react');
var coreComponentsButton = require('../../../button');
var getDataTestId = require('../../getDataTestId-3093bcb2.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var styles = {"component":"pure-cell__component_p7qat"};
require('./index.css');

var FooterButton = function (_a) {
    var children = _a.children, dataTestId = _a.dataTestId, props = tslib_es6.__rest(_a, ["children", "dataTestId"]);
    return (React__default.default.createElement(coreComponentsButton.Button, tslib_es6.__assign({}, props, { size: 'xxs', dataTestId: getDataTestId.getDataTestId(dataTestId, 'button'), className: styles.component }), children));
};

exports.FooterButton = FooterButton;
