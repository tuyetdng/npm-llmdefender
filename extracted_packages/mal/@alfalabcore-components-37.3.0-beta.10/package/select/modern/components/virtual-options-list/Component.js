import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useVirtual } from 'react-virtual';
import cn from 'classnames';
import { Scrollbar } from '../../../../scrollbar/modern';
import { useMedia } from '@alfalab/hooks';
import { usePrevious, lastIndexOf, useVisibleOptions, isGroup } from '../../utils.js';
import { Optgroup } from '../optgroup/Component.js';

const styles = {"virtualOptionsList":"select__virtualOptionsList_1rykd","scrollable":"select__scrollable_1rykd","inner":"select__inner_1rykd","virtualRow":"select__virtualRow_1rykd","highlighted":"select__highlighted_1rykd","emptyPlaceholder":"select__emptyPlaceholder_1rykd","l":"select__l_1rykd","xl":"select__xl_1rykd"};
require('./index.css');

/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line @typescript-eslint/no-redeclare
const VirtualOptionsList = ({ size = 's', flatOptions = [], highlightedIndex = -1, className, getOptionProps, Option, open, options = [], overscan = 10, Optgroup: Optgroup$1 = Optgroup, dataTestId, emptyPlaceholder, visibleOptions = 5, onScroll, header, footer, nativeScrollbar: nativeScrollbarProp, }) => {
    const listRef = useRef(null);
    const parentRef = useRef(null);
    const scrollbarRef = useRef(null);
    const [visibleOptionsInvalidateKey, setVisibleOptionsInvalidateKey] = useState(0);
    const prevHighlightedIndex = usePrevious(highlightedIndex) || -1;
    const rowVirtualizer = useVirtual({
        size: flatOptions.length,
        parentRef,
        overscan,
    });
    let [nativeScrollbar] = useMedia([[true, '(max-width: 1023px)']], false);
    nativeScrollbar = Boolean(nativeScrollbarProp ?? nativeScrollbar);
    // Сколл к выбранному пункту при открытии меню
    useEffect(() => {
        if (open) {
            rowVirtualizer.scrollToIndex(highlightedIndex, { align: 'end' });
        }
    }, [open]);
    // Скролл к пункту, которого нет на экране
    useEffect(() => {
        if (highlightedIndex === -1)
            return;
        if (!rowVirtualizer.virtualItems.some((option) => option.index === highlightedIndex)) {
            rowVirtualizer.scrollToIndex(highlightedIndex, { align: 'end' });
        }
    }, [highlightedIndex]);
    // Циклическая навигация
    useEffect(() => {
        const notDisabled = (option) => !option.disabled;
        const firstNonDisabled = flatOptions.findIndex(notDisabled);
        const lastNonDisabled = lastIndexOf(flatOptions, notDisabled);
        if (prevHighlightedIndex <= firstNonDisabled &&
            highlightedIndex === flatOptions.length - 1) {
            rowVirtualizer.scrollToIndex(lastNonDisabled);
        }
        if (prevHighlightedIndex >= lastNonDisabled && highlightedIndex === 0) {
            rowVirtualizer.scrollToIndex(0);
        }
    }, [prevHighlightedIndex, highlightedIndex]);
    useEffect(() => {
        setVisibleOptionsInvalidateKey(
        /**
         * react-virtual может несколько раз отрендерить список с одним элементом,
         * поэтому нужно еще раз пересчитать высоту, когда список ВИДИМЫХ пунктов будет отрендерен полностью
         * Также, высоту нужно пересчитывать при изменении ОБЩЕГО кол-ва пунктов меню
         */
        rowVirtualizer.virtualItems.length > 1 ? flatOptions.length : 1);
    }, [rowVirtualizer.virtualItems.length, flatOptions.length]);
    useVisibleOptions({
        visibleOptions,
        invalidate: visibleOptionsInvalidateKey,
        listRef,
        styleTargetRef: nativeScrollbar ? parentRef : scrollbarRef,
        open,
    });
    // Т.к. рендерится плоский список, необходимо знать индекс, когда начинается новая группа
    const groupStartIndexes = useMemo(() => {
        let currentIndex = 0;
        return options.reduce((acc, option, index) => {
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
    const contentNodeProps = {
        className: styles.inner,
        style: { height: `${rowVirtualizer.totalSize}px` },
        ref: listRef,
    };
    const renderList = () => rowVirtualizer.virtualItems.map((virtualRow) => {
        const option = flatOptions[virtualRow.index];
        const group = options[groupStartIndexes[virtualRow.index]];
        return (React.createElement("div", { key: virtualRow.index, ref: virtualRow.measureRef, className: cn(styles.virtualRow, {
                [styles.highlighted]: highlightedIndex === virtualRow.index,
            }), style: {
                transform: `translateY(${virtualRow.start}px)`,
            } },
            group && React.createElement(Optgroup$1, { label: group.label }),
            !isGroup(option) && React.createElement(Option, { ...getOptionProps(option, virtualRow.index) })));
    });
    const renderWithCustomScrollbar = () => (React.createElement(Scrollbar, { className: styles.scrollable, ref: scrollbarRef, scrollableNodeProps: { onScroll, ref: parentRef }, contentNodeProps: contentNodeProps }, renderList()));
    const renderWithNativeScrollbar = () => (React.createElement("div", { className: styles.scrollable, ref: parentRef, onScroll: onScroll },
        React.createElement("div", { ...contentNodeProps }, renderList())));
    return (React.createElement("div", { className: cn(styles.virtualOptionsList, styles[size], className), "data-test-id": dataTestId },
        header,
        nativeScrollbar ? renderWithNativeScrollbar() : renderWithCustomScrollbar(),
        emptyPlaceholder && options.length === 0 && (React.createElement("div", { className: styles.emptyPlaceholder }, emptyPlaceholder)),
        footer));
};

export { VirtualOptionsList };
