import React from 'react';
import cn from 'classnames';

var styles = {"component":"divider__component_1bs2b"};
require('./index.css');

var Divider = function (_a) {
    var className = _a.className, dataTestId = _a.dataTestId;
    return (React.createElement("hr", { className: cn(styles.component, className), "data-test-id": dataTestId }));
};

export { Divider };
