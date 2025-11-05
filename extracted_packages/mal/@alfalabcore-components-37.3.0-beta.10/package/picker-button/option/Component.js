var tslib_es6 = require('../tslib.es6-59eeb8c3.js');
var React = require('react');
var coreComponentsSelect = require('../../select');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var styles = {"container":"picker-button__container_9x8t0","icon":"picker-button__icon_9x8t0","content":"picker-button__content_9x8t0"};
require('./index.css');

var Option = function (_a) {
    var option = _a.option, children = _a.children, restProps = tslib_es6.__rest(_a, ["option", "children"]);
    var content = children || option.content || option.key;
    var Icon = option.icon;
    return (React__default.default.createElement(coreComponentsSelect.Option, tslib_es6.__assign({ option: option }, restProps),
        React__default.default.createElement("div", { className: styles.container },
            Icon && React__default.default.createElement(Icon, { className: styles.icon }),
            React__default.default.createElement("div", { className: styles.content }, content))));
};

exports.Option = Option;
