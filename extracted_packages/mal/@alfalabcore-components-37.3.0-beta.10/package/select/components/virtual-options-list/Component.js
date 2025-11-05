var tslib_es6 = require('../../tslib.es6-febad92e.js');
var React = require('react');
var reactVirtual = require('react-virtual');
var cn = require('classnames');
var coreComponentsScrollbar = require('../../../scrollbar');
var hooks = require('@alfalab/hooks');
var utils = require('../../utils.js');
var components_optgroup_Component = require('../optgroup/Component.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"virtualOptionsList":"select__virtualOptionsList_1rykd","scrollable":"select__scrollable_1rykd","inner":"select__inner_1rykd","virtualRow":"select__virtualRow_1rykd","highlighted":"select__highlighted_1rykd","emptyPlaceholder":"select__emptyPlaceholder_1rykd","l":"select__l_1rykd","xl":"select__xl_1rykd"};
require('./index.css');

/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line @typescript-eslint/no-redeclare
var VirtualOptionsList = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 's' : _b, _c = _a.flatOptions, flatOptions = _c === void 0 ? [] : _c, _d = _a.highlightedIndex, highlightedIndex = _d === void 0 ? -1 : _d, className = _a.className, getOptionProps = _a.getOptionProps, Option = _a.Option, open = _a.open, _e = _a.options, options = _e === void 0 ? [] : _e, _f = _a.overscan, overscan = _f === void 0 ? 10 : _f, _g = _a.Optgroup, Optgroup = _g === void 0 ? components_optgroup_Component.Optgroup : _g, dataTestId = _a.dataTestId, emptyPlaceholder = _a.emptyPlaceholder, _h = _a.visibleOptions, visibleOptions = _h === void 0 ? 5 : _h, onScroll = _a.onScroll, header = _a.header, footer = _a.footer, nativeScrollbarProp = _a.nativeScrollbar;
    var listRef = React.useRef(null);
    var parentRef = React.useRef(null);
    var scrollbarRef = React.useRef(null);
    var _j = React.useState(0), visibleOptionsInvalidateKey = _j[0], setVisibleOptionsInvalidateKey = _j[1];
    var prevHighlightedIndex = utils.usePrevious(highlightedIndex) || -1;
    var rowVirtualizer = reactVirtual.useVirtual({
        size: flatOptions.length,
        parentRef: parentRef,
        overscan: overscan,
    });
    var nativeScrollbar = hooks.useMedia([[true, '(max-width: 1023px)']], false)[0];
    nativeScrollbar = Boolean(nativeScrollbarProp !== null && nativeScrollbarProp !== void 0 ? nativeScrollbarProp : nativeScrollbar);
    // Сколл к выбранному пункту при открытии меню
    React.useEffect(function () {
        if (open) {
            rowVirtualizer.scrollToIndex(highlightedIndex, { align: 'end' });
        }
    }, [open]);
    // Скролл к пункту, которого нет на экране
    React.useEffect(function () {
        if (highlightedIndex === -1)
            return;
        if (!rowVirtualizer.virtualItems.some(function (option) { return option.index === highlightedIndex; })) {
            rowVirtualizer.scrollToIndex(highlightedIndex, { align: 'end' });
        }
    }, [highlightedIndex]);
    // Циклическая навигация
    React.useEffect(function () {
        var notDisabled = function (option) { return !option.disabled; };
        var firstNonDisabled = flatOptions.findIndex(notDisabled);
        var lastNonDisabled = utils.lastIndexOf(flatOptions, notDisabled);
        if (prevHighlightedIndex <= firstNonDisabled &&
            highlightedIndex === flatOptions.length - 1) {
            rowVirtualizer.scrollToIndex(lastNonDisabled);
        }
        if (prevHighlightedIndex >= lastNonDisabled && highlightedIndex === 0) {
            rowVirtualizer.scrollToIndex(0);
        }
    }, [prevHighlightedIndex, highlightedIndex]);
    React.useEffect(function () {
        setVisibleOptionsInvalidateKey(
        /**
         * react-virtual может несколько раз отрендерить список с одним элементом,
         * поэтому нужно еще раз пересчитать высоту, когда список ВИДИМЫХ пунктов будет отрендерен полностью
         * Также, высоту нужно пересчитывать при изменении ОБЩЕГО кол-ва пунктов меню
         */
        rowVirtualizer.virtualItems.length > 1 ? flatOptions.length : 1);
    }, [rowVirtualizer.virtualItems.length, flatOptions.length]);
    utils.useVisibleOptions({
        visibleOptions: visibleOptions,
        invalidate: visibleOptionsInvalidateKey,
        listRef: listRef,
        styleTargetRef: nativeScrollbar ? parentRef : scrollbarRef,
        open: open,
    });
    // Т.к. рендерится плоский список, необходимо знать индекс, когда начинается новая группа
    var groupStartIndexes = React.useMemo(function () {
        var currentIndex = 0;
        return options.reduce(function (acc, option, index) {
            if (utils.isGroup(option)) {
                acc[currentIndex] = index;
                currentIndex += option.options.length;
            }
            else {
                currentIndex += 1;
            }
            return acc;
        }, {});
    }, [options]);
    var contentNodeProps = {
        className: styles.inner,
        style: { height: "".concat(rowVirtualizer.totalSize, "px") },
        ref: listRef,
    };
    var renderList = function () {
        return rowVirtualizer.virtualItems.map(function (virtualRow) {
            var _a;
            var option = flatOptions[virtualRow.index];
            var group = options[groupStartIndexes[virtualRow.index]];
            return (React__default.default.createElement("div", { key: virtualRow.index, ref: virtualRow.measureRef, className: cn__default.default(styles.virtualRow, (_a = {},
                    _a[styles.highlighted] = highlightedIndex === virtualRow.index,
                    _a)), style: {
                    transform: "translateY(".concat(virtualRow.start, "px)"),
                } },
                group && React__default.default.createElement(Optgroup, { label: group.label }),
                !utils.isGroup(option) && React__default.default.createElement(Option, tslib_es6.__assign({}, getOptionProps(option, virtualRow.index)))));
        });
    };
    var renderWithCustomScrollbar = function () { return (React__default.default.createElement(coreComponentsScrollbar.Scrollbar, { className: styles.scrollable, ref: scrollbarRef, scrollableNodeProps: { onScroll: onScroll, ref: parentRef }, contentNodeProps: contentNodeProps }, renderList())); };
    var renderWithNativeScrollbar = function () { return (React__default.default.createElement("div", { className: styles.scrollable, ref: parentRef, onScroll: onScroll },
        React__default.default.createElement("div", tslib_es6.__assign({}, contentNodeProps), renderList()))); };
    return (React__default.default.createElement("div", { className: cn__default.default(styles.virtualOptionsList, styles[size], className), "data-test-id": dataTestId },
        header,
        nativeScrollbar ? renderWithNativeScrollbar() : renderWithCustomScrollbar(),
        emptyPlaceholder && options.length === 0 && (React__default.default.createElement("div", { className: styles.emptyPlaceholder }, emptyPlaceholder)),
        footer));
};

exports.VirtualOptionsList = VirtualOptionsList;
