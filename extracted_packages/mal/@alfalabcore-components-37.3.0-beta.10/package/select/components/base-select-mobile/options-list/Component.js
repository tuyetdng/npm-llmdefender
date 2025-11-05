var tslib_es6 = require('../../../tslib.es6-febad92e.js');
var React = require('react');
var cn = require('classnames');
var coreComponentsBaseModal = require('../../../../base-modal');
var coreComponentsButton = require('../../../../button');
var utils = require('../../../utils.js');
var components_optgroup_Component = require('../../optgroup/Component.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"optionsList":"select__optionsList_1h2zf","emptyPlaceholder":"select__emptyPlaceholder_1h2zf","l":"select__l_1h2zf","xl":"select__xl_1h2zf","footer":"select__footer_1h2zf","footerButton":"select__footerButton_1h2zf","highlighted":"select__highlighted_1h2zf"};
require('./index.css');

var createCounter = function () {
    var count = 0;
    // eslint-disable-next-line no-plusplus
    return function () { return count++; };
};
var OptionsList = function (_a) {
    var _b;
    var _c = _a.size, size = _c === void 0 ? 's' : _c, className = _a.className, optionGroupClassName = _a.optionGroupClassName, Option = _a.Option, getOptionProps = _a.getOptionProps, _d = _a.options, options = _d === void 0 ? [] : _d, _e = _a.Optgroup, Optgroup = _e === void 0 ? components_optgroup_Component.Optgroup : _e, dataTestId = _a.dataTestId, emptyPlaceholder = _a.emptyPlaceholder, showFooter = _a.showFooter, _f = _a.onApply, onApply = _f === void 0 ? function () { return null; } : _f, _g = _a.onClear, onClear = _g === void 0 ? function () { return null; } : _g;
    var _h = React.useContext(coreComponentsBaseModal.BaseModalContext), footerHighlighted = _h.footerHighlighted, setHasFooter = _h.setHasFooter;
    React.useEffect(function () {
        setHasFooter(true);
    }, [setHasFooter]);
    var renderOption = function (option, index) { return (React__default.default.createElement(Option, tslib_es6.__assign({ key: option.key }, getOptionProps(option, index)))); };
    var counter = createCounter();
    var renderGroup = function (group) { return (React__default.default.createElement(Optgroup, { className: optionGroupClassName, label: group.label, key: group.label, size: size }, group.options.map(function (option) { return renderOption(option, counter()); }))); };
    if (options.length === 0 && !emptyPlaceholder) {
        return null;
    }
    return (React__default.default.createElement("div", { className: cn__default.default(styles.optionsList, styles[size], className), "data-test-id": dataTestId },
        options.map(function (option) {
            return utils.isGroup(option) ? renderGroup(option) : renderOption(option, counter());
        }),
        emptyPlaceholder && options.length === 0 && (React__default.default.createElement("div", { className: styles.emptyPlaceholder }, emptyPlaceholder)),
        showFooter && (React__default.default.createElement("div", { className: cn__default.default(styles.footer, className, (_b = {},
                _b[styles.highlighted] = footerHighlighted,
                _b)) },
            React__default.default.createElement(coreComponentsButton.Button, { size: 's', view: 'primary', onClick: onApply, className: styles.footerButton }, "\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C"),
            React__default.default.createElement(coreComponentsButton.Button, { size: 's', view: 'secondary', onClick: onClear, className: styles.footerButton }, "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C")))));
};

exports.OptionsList = OptionsList;
