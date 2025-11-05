import React from 'react';
import cn from 'classnames';

var styles = {"grid-gap":"gap__gap_12ekk","gap":"gap__gap_12ekk","vertical":"gap__vertical_12ekk","horizontal":"gap__horizontal_12ekk"};
require('./index.css');

var Gap = function (_a) {
    var size = _a.size, _b = _a.direction, direction = _b === void 0 ? 'vertical' : _b, _c = _a.tag, Component = _c === void 0 ? 'div' : _c, className = _a.className, dataTestId = _a.dataTestId;
    return (React.createElement(Component, { "data-test-id": dataTestId, "data-gap-size": size, className: cn(styles.gap, styles[direction], className) }));
};

export { Gap };
