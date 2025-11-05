import React from 'react';
import cn from 'classnames';

var styles = {"component":"loader__component_1u243","blink":"loader__blink_1u243"};
require('./index.css');

var Loader = function (_a) {
    var className = _a.className, dataTestId = _a.dataTestId;
    return (React.createElement("div", { className: cn(styles.component, className), "data-test-id": dataTestId },
        React.createElement("div", null),
        React.createElement("div", null),
        React.createElement("div", null)));
};

export { Loader };
