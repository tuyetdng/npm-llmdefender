var tslib_es6 = require('../../tslib.es6-0e9bf404.js');
var React = require('react');
var cn = require('classnames');
var components_baseSelectMobile_checkmark_Component = require('../base-select-mobile/checkmark/Component.js');
var components_checkmark_Component = require('../checkmark/Component.js');
var styles = require('./index.module.css');
require('../../../../badge/cssm');
require('@alfalab/icons-glyph/CheckmarkCircleMIcon');
require('@alfalab/icons-glyph/CheckmarkMIcon');
require('../base-select-mobile/checkmark/index.module.css');
require('../../../../checkbox/cssm');
require('../checkmark/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var Option = function (_a) {
    var _b, _c;
    var _d = _a.size, size = _d === void 0 ? 's' : _d, className = _a.className, option = _a.option, children = _a.children, selected = _a.selected, highlighted = _a.highlighted, disabled = _a.disabled, multiple = _a.multiple, mobile = _a.mobile, _e = _a.Checkmark, Checkmark = _e === void 0 ? mobile ? components_baseSelectMobile_checkmark_Component.Checkmark : components_checkmark_Component.Checkmark : _e, innerProps = _a.innerProps, dataTestId = _a.dataTestId;
    var content = children || option.content || option.key;
    var _f = option.showCheckMark, showCheckMark = _f === void 0 ? true : _f;
    return (React__default.default.createElement("div", tslib_es6.__assign({}, innerProps, { className: cn__default.default(styles__default.default.option, styles__default.default[size], className, (_b = {},
            _b[styles__default.default.highlighted] = highlighted,
            _b[styles__default.default.selected] = selected,
            _b[styles__default.default.disabled] = disabled,
            _b)), "data-test-id": dataTestId }),
        Checkmark && showCheckMark && (React__default.default.createElement(Checkmark, { disabled: disabled, selected: selected, multiple: multiple, position: 'before' })),
        React__default.default.createElement("div", { className: cn__default.default(styles__default.default.content, (_c = {},
                _c[styles__default.default.textContent] = !React.isValidElement(content),
                _c)) }, content),
        Checkmark && showCheckMark && (React__default.default.createElement(Checkmark, { disabled: disabled, selected: selected, multiple: multiple, position: 'after' }))));
};

exports.Option = Option;
