import { a as __assign } from '../../tslib.es6-0bbcaa10.js';
import React, { forwardRef, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { Scrollbar } from '../../../../scrollbar/esm';
import { useMedia } from '@alfalab/hooks';
import { useVisibleOptions, isGroup } from '../../utils.js';
import { Optgroup } from '../optgroup/Component.js';

var styles = {"optionsList":"select__optionsList_t5awo","scrollable":"select__scrollable_t5awo","emptyPlaceholder":"select__emptyPlaceholder_t5awo","l":"select__l_t5awo","xl":"select__xl_t5awo"};
require('./index.css');

var createCounter = function () {
    var count = 0;
    // eslint-disable-next-line no-plusplus
    return function () { return count++; };
};
var OptionsList = forwardRef(function (_a, ref) {
    var _b = _a.size, size = _b === void 0 ? 's' : _b, className = _a.className, optionGroupClassName = _a.optionGroupClassName, Option = _a.Option, getOptionProps = _a.getOptionProps, _c = _a.options, options = _c === void 0 ? [] : _c, _d = _a.Optgroup, Optgroup$1 = _d === void 0 ? Optgroup : _d, dataTestId = _a.dataTestId, emptyPlaceholder = _a.emptyPlaceholder, _e = _a.visibleOptions, visibleOptions = _e === void 0 ? 5 : _e, onScroll = _a.onScroll, open = _a.open, header = _a.header, footer = _a.footer, optionsListWidth = _a.optionsListWidth, nativeScrollbarProp = _a.nativeScrollbar, _f = _a.useOptionsIds, useOptionsIds = _f === void 0 ? false : _f;
    var nativeScrollbar = useMedia([[true, '(max-width: 1023px)']], false)[0];
    nativeScrollbar = Boolean(nativeScrollbarProp !== null && nativeScrollbarProp !== void 0 ? nativeScrollbarProp : nativeScrollbar);
    var renderOption = function (option, index) { return (React.createElement(Option, __assign({ key: option.key }, getOptionProps(option, index)))); };
    var listRef = useRef(null);
    var scrollbarRef = useRef(null);
    var counter = createCounter();
    var renderGroup = function (group) { return (React.createElement(Optgroup$1, { className: optionGroupClassName, label: group.label, key: group.label, size: size }, group.options.map(function (option) {
        return renderOption(option, useOptionsIds ? option.id || 0 : counter());
    }))); };
    useVisibleOptions(__assign(__assign({}, (!nativeScrollbar && { styleTargetRef: scrollbarRef })), { visibleOptions: visibleOptions, listRef: listRef, open: open, invalidate: options }));
    if (options.length === 0 && !emptyPlaceholder) {
        return null;
    }
    var renderListItems = function () { return (React.createElement(React.Fragment, null,
        options.map(function (option) {
            return isGroup(option)
                ? renderGroup(option)
                : renderOption(option, useOptionsIds ? option.id || 0 : counter());
        }),
        emptyPlaceholder && options.length === 0 && (React.createElement("div", { className: styles.emptyPlaceholder }, emptyPlaceholder)))); };
    var renderWithCustomScrollbar = function () {
        var scrollableNodeProps = {
            onScroll: onScroll,
            'data-test-id': dataTestId,
            ref: ref,
        };
        return (React.createElement(Scrollbar, { className: styles.scrollable, ref: scrollbarRef, horizontalAutoStretch: optionsListWidth === 'content', scrollableNodeProps: scrollableNodeProps, contentNodeProps: { ref: listRef } }, renderListItems()));
    };
    var renderWithNativeScrollbar = function () { return (React.createElement("div", { className: styles.scrollable, ref: mergeRefs([listRef, ref]), onScroll: onScroll }, renderListItems())); };
    return (React.createElement("div", __assign({}, (nativeScrollbar && { 'data-test-id': dataTestId }), { className: cn(styles.optionsList, styles[size], className) }),
        header,
        nativeScrollbar ? renderWithNativeScrollbar() : renderWithCustomScrollbar(),
        footer));
});

export { OptionsList };
