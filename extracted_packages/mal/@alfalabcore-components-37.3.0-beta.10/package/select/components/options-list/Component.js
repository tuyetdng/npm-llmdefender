var tslib_es6 = require('../../tslib.es6-febad92e.js');
var React = require('react');
var mergeRefs = require('react-merge-refs');
var cn = require('classnames');
var coreComponentsScrollbar = require('../../../scrollbar');
var hooks = require('@alfalab/hooks');
var utils = require('../../utils.js');
var components_optgroup_Component = require('../optgroup/Component.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var mergeRefs__default = /*#__PURE__*/_interopDefaultCompat(mergeRefs);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"optionsList":"select__optionsList_t5awo","scrollable":"select__scrollable_t5awo","emptyPlaceholder":"select__emptyPlaceholder_t5awo","l":"select__l_t5awo","xl":"select__xl_t5awo"};
require('./index.css');

var createCounter = function () {
    var count = 0;
    // eslint-disable-next-line no-plusplus
    return function () { return count++; };
};
var OptionsList = React.forwardRef(function (_a, ref) {
    var _b = _a.size, size = _b === void 0 ? 's' : _b, className = _a.className, optionGroupClassName = _a.optionGroupClassName, Option = _a.Option, getOptionProps = _a.getOptionProps, _c = _a.options, options = _c === void 0 ? [] : _c, _d = _a.Optgroup, Optgroup = _d === void 0 ? components_optgroup_Component.Optgroup : _d, dataTestId = _a.dataTestId, emptyPlaceholder = _a.emptyPlaceholder, _e = _a.visibleOptions, visibleOptions = _e === void 0 ? 5 : _e, onScroll = _a.onScroll, open = _a.open, header = _a.header, footer = _a.footer, optionsListWidth = _a.optionsListWidth, nativeScrollbarProp = _a.nativeScrollbar, _f = _a.useOptionsIds, useOptionsIds = _f === void 0 ? false : _f;
    var nativeScrollbar = hooks.useMedia([[true, '(max-width: 1023px)']], false)[0];
    nativeScrollbar = Boolean(nativeScrollbarProp !== null && nativeScrollbarProp !== void 0 ? nativeScrollbarProp : nativeScrollbar);
    var renderOption = function (option, index) { return (React__default.default.createElement(Option, tslib_es6.__assign({ key: option.key }, getOptionProps(option, index)))); };
    var listRef = React.useRef(null);
    var scrollbarRef = React.useRef(null);
    var counter = createCounter();
    var renderGroup = function (group) { return (React__default.default.createElement(Optgroup, { className: optionGroupClassName, label: group.label, key: group.label, size: size }, group.options.map(function (option) {
        return renderOption(option, useOptionsIds ? option.id || 0 : counter());
    }))); };
    utils.useVisibleOptions(tslib_es6.__assign(tslib_es6.__assign({}, (!nativeScrollbar && { styleTargetRef: scrollbarRef })), { visibleOptions: visibleOptions, listRef: listRef, open: open, invalidate: options }));
    if (options.length === 0 && !emptyPlaceholder) {
        return null;
    }
    var renderListItems = function () { return (React__default.default.createElement(React__default.default.Fragment, null,
        options.map(function (option) {
            return utils.isGroup(option)
                ? renderGroup(option)
                : renderOption(option, useOptionsIds ? option.id || 0 : counter());
        }),
        emptyPlaceholder && options.length === 0 && (React__default.default.createElement("div", { className: styles.emptyPlaceholder }, emptyPlaceholder)))); };
    var renderWithCustomScrollbar = function () {
        var scrollableNodeProps = {
            onScroll: onScroll,
            'data-test-id': dataTestId,
            ref: ref,
        };
        return (React__default.default.createElement(coreComponentsScrollbar.Scrollbar, { className: styles.scrollable, ref: scrollbarRef, horizontalAutoStretch: optionsListWidth === 'content', scrollableNodeProps: scrollableNodeProps, contentNodeProps: { ref: listRef } }, renderListItems()));
    };
    var renderWithNativeScrollbar = function () { return (React__default.default.createElement("div", { className: styles.scrollable, ref: mergeRefs__default.default([listRef, ref]), onScroll: onScroll }, renderListItems())); };
    return (React__default.default.createElement("div", tslib_es6.__assign({}, (nativeScrollbar && { 'data-test-id': dataTestId }), { className: cn__default.default(styles.optionsList, styles[size], className) }),
        header,
        nativeScrollbar ? renderWithNativeScrollbar() : renderWithCustomScrollbar(),
        footer));
});

exports.OptionsList = OptionsList;
