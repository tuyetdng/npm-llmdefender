import { _ as __rest, a as __assign } from '../../tslib.es6-46a2fd0f.js';
import React from 'react';
import cn from 'classnames';
import CrossMIcon from '@alfalab/icons-glyph/CrossMIcon';
import { Closer } from '../closer/Component.js';
import { Header } from './Component.js';
import '../../../../icon-button/esm';
import '../../../../base-modal/esm';
import '../../Context.js';

var styles = {"sticky":"side-panel__sticky_18zx5","content":"side-panel__content_18zx5"};
require('./mobile.css');

var HeaderMobile = function (_a) {
    var _b;
    var className = _a.className, contentClassName = _a.contentClassName, _c = _a.hasCloser, hasCloser = _c === void 0 ? true : _c, sticky = _a.sticky, _d = _a.closerIcon, closerIcon = _d === void 0 ? CrossMIcon : _d, restProps = __rest(_a, ["className", "contentClassName", "hasCloser", "sticky", "closerIcon"]);
    return (React.createElement(Header, __assign({ className: cn(className, (_b = {},
            _b[styles.sticky] = sticky,
            _b)), contentClassName: cn(styles.content, contentClassName), closer: hasCloser ? React.createElement(Closer, { icon: closerIcon, size: 'xs' }) : null, sticky: sticky }, restProps)));
};

export { HeaderMobile };
