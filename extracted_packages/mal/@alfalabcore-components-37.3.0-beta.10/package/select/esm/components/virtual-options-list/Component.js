import { a as __assign } from '../../tslib.es6-0bbcaa10.js';
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useVirtual } from 'react-virtual';
import cn from 'classnames';
import { Scrollbar } from '../../../../scrollbar/esm';
import { useMedia } from '@alfalab/hooks';
import { usePrevious, lastIndexOf, useVisibleOptions, isGroup } from '../../utils.js';
import { Optgroup } from '../optgroup/Component.js';

var styles = {"virtualOptionsList":"select__virtualOptionsList_1rykd","scrollable":"select__scrollable_1rykd","inner":"select__inner_1rykd","virtualRow":"select__virtualRow_1rykd","highlighted":"select__highlighted_1rykd","emptyPlaceholder":"select__emptyPlaceholder_1rykd","l":"select__l_1rykd","xl":"select__xl_1rykd"};
require('./index.css');

/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line @typescript-eslint/no-redeclare
var VirtualOptionsList = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 's' : _b, _c = _a.flatOptions, flatOptions = _c === void 0 ? [] : _c, _d = _a.highlightedIndex, highlightedIndex = _d === void 0 ? -1 : _d, className = _a.className, getOptionProps = _a.getOptionProps, Option = _a.Option, open = _a.open, _e = _a.options, options = _e === void 0 ? [] : _e, _f = _a.overscan, overscan = _f === void 0 ? 10 : _f, _g = _a.Optgroup, Optgroup$1 = _g === void 0 ? Optgroup : _g, dataTestId = _a.dataTestId, emptyPlaceholder = _a.emptyPlaceholder, _h = _a.visibleOptions, visibleOptions = _h === void 0 ? 5 : _h, onScroll = _a.onScroll, header = _a.header, footer = _a.footer, nativeScrollbarProp = _a.nativeScrollbar;
    var listRef = useRef(null);
    var parentRef = useRef(null);
    var scrollbarRef = useRef(null);
    var _j = useState(0), visibleOptionsInvalidateKey = _j[0], setVisibleOptionsInvalidateKey = _j[1];
    var prevHighlightedIndex = usePrevious(highlightedIndex) || -1;
    var rowVirtualizer = useVirtual({
        size: flatOptions.length,
        parentRef: parentRef,
        overscan: overscan,
    });
    var nativeScrollbar = useMedia([[true, '(max-width: 1023px)']], false)[0];
    nativeScrollbar = Boolean(nativeScrollbarProp !== null && nativeScrollbarProp !== void 0 ? nativeScrollbarProp : nativeScrollbar);
    // Сколл к выбранному пункту при открытии меню
    useEffect(function () {
        if (open) {
            rowVirtualizer.scrollToIndex(highlightedIndex, { align: 'end' });
        }
    }, [open]);
    // Скролл к пункту, которого нет на экране
    useEffect(function () {
        if (highlightedIndex === -1)
            return;
        if (!rowVirtualizer.virtualItems.some(function (option) { return option.index === highlightedIndex; })) {
            rowVirtualizer.scrollToIndex(highlightedIndex, { align: 'end' });
        }
    }, [highlightedIndex]);
    // Циклическая навигация
    useEffect(function () {
        var notDisabled = function (option) { return !option.disabled; };
        var firstNonDisabled = flatOptions.findIndex(notDisabled);
        var lastNonDisabled = lastIndexOf(flatOptions, notDisabled);
        if (prevHighlightedIndex <= firstNonDisabled &&
            highlightedIndex === flatOptions.length - 1) {
            rowVirtualizer.scrollToIndex(lastNonDisabled);
        }
        if (prevHighlightedIndex >= lastNonDisabled && highlightedIndex === 0) {
            rowVirtualizer.scrollToIndex(0);
        }
    }, [prevHighlightedIndex, highlightedIndex]);
    useEffect(function () {
        setVisibleOptionsInvalidateKey(
        /**
         * react-virtual может несколько раз отрендерить список с одним элементом,
         * поэтому нужно еще раз пересчитать высоту, когда список ВИДИМЫХ пунктов будет отрендерен полностью
         * Также, высоту нужно пересчитывать при изменении ОБЩЕГО кол-ва пунктов меню
         */
        rowVirtualizer.virtualItems.length > 1 ? flatOptions.length : 1);
    }, [rowVirtualizer.virtualItems.length, flatOptions.length]);
    useVisibleOptions({
        visibleOptions: visibleOptions,
        invalidate: visibleOptionsInvalidateKey,
        listRef: listRef,
        styleTargetRef: nativeScrollbar ? parentRef : scrollbarRef,
        open: open,
    });
    // Т.к. рендерится плоский список, необходимо знать индекс, когда начинается новая группа
    var groupStartIndexes = useMemo(function () {
        var currentIndex = 0;
        return options.reduce(function (acc, option, index) {
            if (isGroup(option)) {
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
            return (React.createElement("div", { key: virtualRow.index, ref: virtualRow.measureRef, className: cn(styles.virtualRow, (_a = {},
                    _a[styles.highlighted] = highlightedIndex === virtualRow.index,
                    _a)), style: {
                    transform: "translateY(".concat(virtualRow.start, "px)"),
                } },
                group && React.createElement(Optgroup$1, { label: group.label }),
                !isGroup(option) && React.createElement(Option, __assign({}, getOptionProps(option, virtualRow.index)))));
        });
    };
    var renderWithCustomScrollbar = function () { return (React.createElement(Scrollbar, { className: styles.scrollable, ref: scrollbarRef, scrollableNodeProps: { onScroll: onScroll, ref: parentRef }, contentNodeProps: contentNodeProps }, renderList())); };
    var renderWithNativeScrollbar = function () { return (React.createElement("div", { className: styles.scrollable, ref: parentRef, onScroll: onScroll },
        React.createElement("div", __assign({}, contentNodeProps), renderList()))); };
    return (React.createElement("div", { className: cn(styles.virtualOptionsList, styles[size], className), "data-test-id": dataTestId },
        header,
        nativeScrollbar ? renderWithNativeScrollbar() : renderWithCustomScrollbar(),
        emptyPlaceholder && options.length === 0 && (React.createElement("div", { className: styles.emptyPlaceholder }, emptyPlaceholder)),
        footer));
};

export { VirtualOptionsList };
