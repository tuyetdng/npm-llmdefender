var tslib_es6 = require('../../../tslib.es6-c54e6db5.js');
var React = require('react');
var cn = require('classnames');
var coreComponentsButton = require('../../../../button');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"field":"table__field_1jeu8","open":"table__open_1jeu8"};
require('./index.css');

var CustomSelectField = function (_a) {
    var _b;
    var selected = _a.selected, innerProps = _a.innerProps, Arrow = _a.Arrow, open = _a.open;
    var ref = innerProps.ref, restInnerProps = tslib_es6.__rest(innerProps, ["ref"]);
    return (React__default.default.createElement("div", { ref: ref },
        React__default.default.createElement(coreComponentsButton.Button, tslib_es6.__assign({}, restInnerProps, { size: 'xxs', view: 'link', className: cn__default.default(styles.field, (_b = {}, _b[styles.open] = open, _b)), rightAddons: Arrow }), selected === null || selected === void 0 ? void 0 : selected.content)));
};

exports.CustomSelectField = CustomSelectField;
