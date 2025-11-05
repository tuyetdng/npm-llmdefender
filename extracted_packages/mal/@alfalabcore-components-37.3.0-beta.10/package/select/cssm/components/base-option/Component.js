var tslib_es6 = require('../../tslib.es6-0e9bf404.js');
var React = require('react');
var cn = require('classnames');
var components_baseCheckmark_Component = require('../base-checkmark/Component.js');
var styles = require('./index.module.css');
require('../../../../checkbox/cssm');
require('@alfalab/icons-glyph/CheckmarkMIcon');
require('../base-checkmark/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var BaseOption = function (_a) {
    var _b;
    var className = _a.className, option = _a.option, children = _a.children, selected = _a.selected, highlighted = _a.highlighted, disabled = _a.disabled, multiple = _a.multiple, _c = _a.Checkmark, Checkmark = _c === void 0 ? components_baseCheckmark_Component.BaseCheckmark : _c, _d = _a.checkmarkPosition, checkmarkPosition = _d === void 0 ? multiple ? 'before' : 'after' : _d, innerProps = _a.innerProps, dataTestId = _a.dataTestId, _e = _a.mobile, mobile = _e === void 0 ? false : _e;
    var content = children || option.content || option.key;
    var _f = option.showCheckMark, showCheckMark = _f === void 0 ? true : _f;
    var isTextContent = !React.isValidElement(content);
    var renderCheckmark = function () {
        if (Checkmark && showCheckMark) {
            return React__default.default.createElement(Checkmark, { disabled: disabled, selected: selected, multiple: multiple });
        }
        return null;
    };
    return (React__default.default.createElement("div", tslib_es6.__assign({}, innerProps, { className: cn__default.default(styles__default.default.option, className, (_b = {},
            _b[styles__default.default.highlighted] = highlighted,
            _b[styles__default.default.selected] = selected,
            _b[styles__default.default.disabled] = disabled,
            _b[styles__default.default.textContent] = isTextContent,
            _b[styles__default.default.mobile] = mobile,
            _b[styles__default.default.checkmarkAfter] = !isTextContent && checkmarkPosition === 'after',
            _b[styles__default.default.checkmarkBefore] = !isTextContent && checkmarkPosition === 'before',
            _b)), "data-test-id": dataTestId }),
        checkmarkPosition === 'before' && renderCheckmark(),
        React__default.default.createElement("div", { className: cn__default.default(styles__default.default.content) }, content),
        checkmarkPosition === 'after' && renderCheckmark()));
};

exports.BaseOption = BaseOption;
