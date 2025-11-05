var React = require('react');
var cn = require('classnames');
var components_flagIcon_flagSprite = require('./flagSprite.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"flagIcon":"intl-phone-input__flagIcon_jv6x2","flagPlaceholder":"intl-phone-input__flagPlaceholder_jv6x2"};
require('./index.css');

/**
 * Компонент флага в виде иконки.
 */
var FlagIcon = function (_a) {
    var _b = _a.country, country = _b === void 0 ? '' : _b, className = _a.className;
    return components_flagIcon_flagSprite.flagSprite[country] ? (React__default.default.createElement("span", { className: cn__default.default(styles.flagIcon, className), "data-test-id": "flag-icon-".concat(country), dangerouslySetInnerHTML: { __html: components_flagIcon_flagSprite.flagSprite[country] } })) : (React__default.default.createElement("div", { className: cn__default.default(styles.flagPlaceholder, className) }));
};

exports.FlagIcon = FlagIcon;
