var tslib_es6 = require('../tslib.es6-bbd6cd2a.js');
var React = require('react');
var coreComponentsSelect = require('../../../select/cssm');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var Option = function (_a) {
    var option = _a.option, children = _a.children, restProps = tslib_es6.__rest(_a, ["option", "children"]);
    var content = children || option.content || option.key;
    var Icon = option.icon;
    return (React__default.default.createElement(coreComponentsSelect.Option, tslib_es6.__assign({ option: option }, restProps),
        React__default.default.createElement("div", { className: styles__default.default.container },
            Icon && React__default.default.createElement(Icon, { className: styles__default.default.icon }),
            React__default.default.createElement("div", { className: styles__default.default.content }, content))));
};

exports.Option = Option;
