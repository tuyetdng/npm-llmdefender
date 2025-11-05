import { useState, useRef } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

const useCollapsibleElements = (selectors, deps = []) => {
    const [idsCollapsedElements, setIdsCollapsedElements] = useState([]);
    const containerRef = useRef(null);
    const addonRef = useRef(null);
    useLayoutEffect_SAFE_FOR_SSR(() => {
        const collapseElements = (inlineSize) => {
            const container = containerRef.current;
            if (!container)
                return;
            const addon = addonRef.current;
            const moreElement = Array.from(container.querySelectorAll('[role="tablist"]')).pop();
            const moreElementRect = moreElement?.getBoundingClientRect();
            const elements = Array.from(container.querySelectorAll(selectors));
            const containerWidth = (inlineSize || container.clientWidth) - (moreElementRect?.width || 0) * 1.5; // при рассчётах, даём кнопке "Ещё" чуть больше места, чтобы точно влезла
            const collapsedIds = elements.reduce((acc, element) => {
                const { offsetLeft, offsetWidth, id } = element;
                const elementOffset = offsetLeft + offsetWidth;
                const isCollapsedElement = getComputedStyle(element).visibility === 'collapse';
                const maxWidth = addon && !isCollapsedElement
                    ? containerWidth -
                        (addon.offsetWidth + parseFloat(getComputedStyle(addon).marginLeft))
                    : containerWidth;
                if (elementOffset >= maxWidth)
                    acc.push(id);
                return acc;
            }, []);
            setIdsCollapsedElements(collapsedIds);
        };
        const handleElementsResize = (entries) => {
            const [{ inlineSize }] = entries[0].contentBoxSize;
            collapseElements(inlineSize);
        };
        const ResizeObserver$1 = window.ResizeObserver || ResizeObserver;
        const observer = new ResizeObserver$1(handleElementsResize);
        if (containerRef.current) {
            collapseElements();
            observer.observe(containerRef.current);
        }
        return () => observer.disconnect();
    }, [selectors, ...deps]);
    return {
        containerRef,
        addonRef,
        idsCollapsedElements,
    };
};

export { useCollapsibleElements };
