import React from 'react';
import cn from 'classnames';

var styles = {"component":"skeleton__component_bgmht","animate":"skeleton__animate_bgmht","background":"skeleton__background_bgmht","gradient":"skeleton__gradient_bgmht"};
require('./index.css');

var Skeleton = function (_a) {
    var _b;
    var visible = _a.visible, _c = _a.animate, animate = _c === void 0 ? true : _c, className = _a.className, dataTestId = _a.dataTestId, children = _a.children;
    if (visible) {
        return (React.createElement("div", { className: cn(styles.component, (_b = {}, _b[styles.animate] = animate, _b), className), "data-test-id": dataTestId }, children));
    }
    return (React.createElement("div", { "data-test-id": dataTestId, className: className }, children));
};

export { Skeleton };
