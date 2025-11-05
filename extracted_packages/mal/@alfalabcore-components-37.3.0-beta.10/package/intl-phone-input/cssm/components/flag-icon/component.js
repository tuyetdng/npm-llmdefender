var React = require('react');
var cn = require('classnames');
var components_flagIcon_flagSprite = require('./flagSprite.js');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

/**
 * Компонент флага в виде иконки.
 */
var FlagIcon = function (_a) {
    var _b = _a.country, country = _b === void 0 ? '' : _b, className = _a.className;
    return components_flagIcon_flagSprite.flagSprite[country] ? (React__default.default.createElement("span", { className: cn__default.default(styles__default.default.flagIcon, className), "data-test-id": "flag-icon-".concat(country), dangerouslySetInnerHTML: { __html: components_flagIcon_flagSprite.flagSprite[country] } })) : (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.flagPlaceholder, className) }));
};

exports.FlagIcon = FlagIcon;
