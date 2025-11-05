import React from 'react';
import cn from 'classnames';

var styles = {"component":"status__component_1vjgk","soft":"status__soft_1vjgk","green":"status__green_1vjgk","orange":"status__orange_1vjgk","red":"status__red_1vjgk","blue":"status__blue_1vjgk","grey":"status__grey_1vjgk","teal":"status__teal_1vjgk","purple":"status__purple_1vjgk","contrast":"status__contrast_1vjgk"};
require('./index.css');

var colors = ['green', 'orange', 'red', 'blue', 'grey', 'teal', 'purple'];
var Status = function (_a) {
    var className = _a.className, _b = _a.view, view = _b === void 0 ? 'soft' : _b, _c = _a.color, color = _c === void 0 ? 'green' : _c, children = _a.children, dataTestId = _a.dataTestId;
    return (React.createElement("span", { className: cn(styles.component, styles[color], styles[view], className), "data-test-id": dataTestId }, children));
};

export { Status, colors };
