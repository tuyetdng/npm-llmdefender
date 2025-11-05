import { _ as __rest, a as __assign } from '../../tslib.es6-46a2fd0f.js';
import React from 'react';
import cn from 'classnames';
import { Content } from './Component.js';
import '../../../../base-modal/esm';
import '../../Context.js';

var styles = {"content":"side-panel__content_1ecix"};
require('./mobile.css');

var ContentMobile = function (_a) {
    var className = _a.className, restProps = __rest(_a, ["className"]);
    return (React.createElement(Content, __assign({ className: cn(className, styles.content) }, restProps)));
};

export { ContentMobile };
