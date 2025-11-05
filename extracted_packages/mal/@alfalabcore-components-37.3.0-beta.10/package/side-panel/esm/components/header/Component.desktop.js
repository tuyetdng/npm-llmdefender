import { _ as __rest, a as __assign } from '../../tslib.es6-46a2fd0f.js';
import React from 'react';
import cn from 'classnames';
import { CrossHeavyMIcon } from '@alfalab/icons-glyph/CrossHeavyMIcon';
import { Closer } from '../closer/Component.js';
import { Header } from './Component.js';
import '../../../../icon-button/esm';
import '../../../../base-modal/esm';
import '../../Context.js';

var styles = {"content":"side-panel__content_1wmke","s":"side-panel__s_1wmke","hasContent":"side-panel__hasContent_1wmke","sticky":"side-panel__sticky_1wmke"};
require('./desktop.css');

var HeaderDesktop = function (_a) {
    var _b;
    var _c = _a.size, size = _c === void 0 ? 's' : _c, className = _a.className, contentClassName = _a.contentClassName, _d = _a.hasCloser, hasCloser = _d === void 0 ? true : _d, _e = _a.closerIcon, closerIcon = _e === void 0 ? CrossHeavyMIcon : _e, sticky = _a.sticky, _f = _a.leftAddons, leftAddons = _f === void 0 ? React.createElement("span", null) : _f, title = _a.title, children = _a.children, restProps = __rest(_a, ["size", "className", "contentClassName", "hasCloser", "closerIcon", "sticky", "leftAddons", "title", "children"]);
    var hasContent = Boolean(title || children);
    return (React.createElement(Header, __assign({ className: cn(className, size && styles[size], (_b = {},
            _b[styles.sticky] = sticky,
            _b[styles.hasContent] = hasContent,
            _b)), contentClassName: cn(styles.content, contentClassName), closer: hasCloser ? React.createElement(Closer, { icon: closerIcon }) : null, leftAddons: leftAddons, sticky: sticky, title: title }, restProps), children));
};

export { HeaderDesktop };
