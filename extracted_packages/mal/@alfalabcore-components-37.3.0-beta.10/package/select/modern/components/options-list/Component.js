import React, { forwardRef, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { Scrollbar } from '../../../../scrollbar/modern';
import { useMedia } from '@alfalab/hooks';
import { useVisibleOptions, isGroup } from '../../utils.js';
import { Optgroup } from '../optgroup/Component.js';

const styles = {"optionsList":"select__optionsList_t5awo","scrollable":"select__scrollable_t5awo","emptyPlaceholder":"select__emptyPlaceholder_t5awo","l":"select__l_t5awo","xl":"select__xl_t5awo"};
require('./index.css');

const createCounter = () => {
    let count = 0;
    // eslint-disable-next-line no-plusplus
    return () => count++;
};
const OptionsList = forwardRef(({ size = 's', className, optionGroupClassName, Option, getOptionProps, options = [], Optgroup: Optgroup$1 = Optgroup, dataTestId, emptyPlaceholder, visibleOptions = 5, onScroll, open, header, footer, optionsListWidth, nativeScrollbar: nativeScrollbarProp, useOptionsIds = false, }, ref) => {
    let [nativeScrollbar] = useMedia([[true, '(max-width: 1023px)']], false);
    nativeScrollbar = Boolean(nativeScrollbarProp ?? nativeScrollbar);
    const renderOption = (option, index) => (React.createElement(Option, { key: option.key, ...getOptionProps(option, index) }));
    const listRef = useRef(null);
    const scrollbarRef = useRef(null);
    const counter = createCounter();
    const renderGroup = (group) => (React.createElement(Optgroup$1, { className: optionGroupClassName, label: group.label, key: group.label, size: size }, group.options.map((option) => renderOption(option, useOptionsIds ? option.id || 0 : counter()))));
    useVisibleOptions({
        ...(!nativeScrollbar && { styleTargetRef: scrollbarRef }),
        visibleOptions,
        listRef,
        open,
        invalidate: options,
    });
    if (options.length === 0 && !emptyPlaceholder) {
        return null;
    }
    const renderListItems = () => (React.createElement(React.Fragment, null,
        options.map((option) => isGroup(option)
            ? renderGroup(option)
            : renderOption(option, useOptionsIds ? option.id || 0 : counter())),
        emptyPlaceholder && options.length === 0 && (React.createElement("div", { className: styles.emptyPlaceholder }, emptyPlaceholder))));
    const renderWithCustomScrollbar = () => {
        const scrollableNodeProps = {
            onScroll,
            'data-test-id': dataTestId,
            ref: ref,
        };
        return (React.createElement(Scrollbar, { className: styles.scrollable, ref: scrollbarRef, horizontalAutoStretch: optionsListWidth === 'content', scrollableNodeProps: scrollableNodeProps, contentNodeProps: { ref: listRef } }, renderListItems()));
    };
    const renderWithNativeScrollbar = () => (React.createElement("div", { className: styles.scrollable, ref: mergeRefs([listRef, ref]), onScroll: onScroll }, renderListItems()));
    return (React.createElement("div", { ...(nativeScrollbar && { 'data-test-id': dataTestId }), className: cn(styles.optionsList, styles[size], className) },
        header,
        nativeScrollbar ? renderWithNativeScrollbar() : renderWithCustomScrollbar(),
        footer));
});

export { OptionsList };
