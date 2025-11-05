/// <reference types="react" />
import { DependencyList } from 'react';
declare const useCollapsibleElements: <ContainerType extends HTMLElement, AddonType extends HTMLElement>(selectors: string, deps?: DependencyList) => {
    containerRef: import("react").RefObject<ContainerType>;
    addonRef: import("react").RefObject<AddonType>;
    idsCollapsedElements: string[];
};
export { useCollapsibleElements };
