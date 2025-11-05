import React, { forwardRef } from 'react';
import { BaseShape } from '../base-shape/component.js';
import { pathsMap } from './paths.js';
import 'classnames';
import '../base-shape/utils.js';

const Circle = forwardRef((props, ref) => (React.createElement(BaseShape, { ...props, pathsMap: pathsMap, ref: ref })));

export { Circle };
