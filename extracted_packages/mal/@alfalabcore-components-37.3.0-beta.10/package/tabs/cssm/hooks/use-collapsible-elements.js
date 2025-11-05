var tslib_es6 = require('../tslib.es6-0e9bf404.js');
var React = require('react');
var resizeObserver = require('@juggle/resize-observer');
var hooks = require('@alfalab/hooks');

var useCollapsibleElements = function (selectors, deps) {
    if (deps === void 0) { deps = []; }
    var _a = React.useState([]), idsCollapsedElements = _a[0], setIdsCollapsedElements = _a[1];
    var containerRef = React.useRef(null);
    var addonRef = React.useRef(null);
    hooks.useLayoutEffect_SAFE_FOR_SSR(function () {
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
        var ResizeObserver = window.ResizeObserver || resizeObserver.ResizeObserver;
        var observer = new ResizeObserver(handleElementsResize);
        if (containerRef.current) {
            collapseElements();
            observer.observe(containerRef.current);
        }
        return function () { return observer.disconnect(); };
    }, tslib_es6.__spreadArray([selectors], deps, true));
    return {
        containerRef: containerRef,
        addonRef: addonRef,
        idsCollapsedElements: idsCollapsedElements,
    };
};

exports.useCollapsibleElements = useCollapsibleElements;
