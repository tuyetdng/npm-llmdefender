import React from 'react';
import cn from 'classnames';

var styles = {"header":"calendar__header_1tc94","withShadow":"calendar__withShadow_1tc94"};
require('./index.css');

var Header = function (_a) {
    var _b;
    var _c = _a.view, view = _c === void 0 ? 'full' : _c, withShadow = _a.withShadow, children = _a.children;
    return (React.createElement("div", { className: cn(styles.header, (_b = {},
            _b[styles.monthOnly] = view === 'month-only',
            _b[styles.withShadow] = withShadow,
            _b)), "aria-live": 'polite' }, children));
};

export { Header };
