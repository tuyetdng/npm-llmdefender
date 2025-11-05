import { b as __spreadArray } from '../tslib.es6-3f4e7063.js';
import { useState, useRef } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

var useCollapsibleElements = function (selectors, deps) {
    if (deps === void 0) { deps = []; }
    var _a = useState([]), idsCollapsedElements = _a[0], setIdsCollapsedElements = _a[1];
    var containerRef = useRef(null);
    var addonRef = useRef(null);
    useLayoutEffect_SAFE_FOR_SSR(function () {
        var collapseElements = function (inlineSize) {
            var container = containerRef.current;
            if (!container)
                return;
            var addon = addonRef.current;
            var moreElement = Array.from(container.querySelectorAll('[role="tablist"]')).pop();
            var moreElementRect = moreElement === null || moreElement === void 0 ? void 0 : moreElement.getBoundingClientRect();
            var elements = Array.from(container.querySelectorAll(selectors));
            var containerWidth = (inlineSize || container.clientWidth) - ((moreElementRect === null || moreElementRect === void 0 ? void 0 : moreElementRect.width) || 0) * 1.5; // при рассчётах, даём кнопке "Ещё" чуть больше места, чтобы точно влезла
            var collapsedIds = elements.reduce(function (acc, element) {
                var offsetLeft = element.offsetLeft, offsetWidth = element.offsetWidth, id = element.id;
                var elementOffset = offsetLeft + offsetWidth;
                var isCollapsedElement = getComputedStyle(element).visibility === 'collapse';
                var maxWidth = addon && !isCollapsedElement
                    ? containerWidth -
                        (addon.offsetWidth + parseFloat(getComputedStyle(addon).marginLeft))
                    : containerWidth;
                if (elementOffset >= maxWidth)
                    acc.push(id);
                return acc;
            }, []);
            setIdsCollapsedElements(collapsedIds);
        };
        var handleElementsResize = function (entries) {
            var inlineSize = entries[0].contentBoxSize[0].inlineSize;
            collapseElements(inlineSize);
        };
        var ResizeObserver$1 = window.ResizeObserver || ResizeObserver;
        var observer = new ResizeObserver$1(handleElementsResize);
        if (containerRef.current) {
            collapseElements();
            observer.observe(containerRef.current);
        }
        return function () { return observer.disconnect(); };
    }, __spreadArray([selectors], deps, true));
    return {
        containerRef: containerRef,
        addonRef: addonRef,
        idsCollapsedElements: idsCollapsedElements,
    };
};

export { useCollapsibleElements };
