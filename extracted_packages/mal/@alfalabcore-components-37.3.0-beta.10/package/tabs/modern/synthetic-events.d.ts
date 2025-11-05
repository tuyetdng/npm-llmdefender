/// <reference types="react" />
import React from 'react';
declare const createSyntheticEvent: <T extends Element, E extends Event>(event: E) => React.SyntheticEvent<T, E>;
declare const createUIEvent: <T extends Element, E extends Event>(event: E) => React.UIEvent<T, E>;
declare const createSyntheticMouseEvent: <T extends Element>(event: MouseEvent) => React.MouseEvent<T, MouseEvent>;
export { createSyntheticEvent, createUIEvent, createSyntheticMouseEvent };
