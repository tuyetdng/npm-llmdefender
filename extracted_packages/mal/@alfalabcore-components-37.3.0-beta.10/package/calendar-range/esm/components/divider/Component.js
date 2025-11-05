import React from 'react';
import cn from 'classnames';

var styles = {"component":"calendar-range__component_eslzr","outer":"calendar-range__outer_eslzr","s":"calendar-range__s_eslzr","m":"calendar-range__m_eslzr","l":"calendar-range__l_eslzr","xl":"calendar-range__xl_eslzr"};
require('./index.css');

var Divider = function (_a) {
    var _b;
    var inputFromProps = _a.inputFromProps, inputToProps = _a.inputToProps;
    var outer = (inputFromProps === null || inputFromProps === void 0 ? void 0 : inputFromProps.label) &&
        (inputFromProps === null || inputFromProps === void 0 ? void 0 : inputFromProps.labelView) === 'outer' &&
        (inputToProps === null || inputToProps === void 0 ? void 0 : inputToProps.label) &&
        (inputToProps === null || inputToProps === void 0 ? void 0 : inputToProps.labelView) === 'outer';
    var size = (inputFromProps === null || inputFromProps === void 0 ? void 0 : inputFromProps.size) || (inputToProps === null || inputToProps === void 0 ? void 0 : inputToProps.size) || 's';
    return React.createElement("span", { className: cn(styles.component, styles[size], (_b = {}, _b[styles.outer] = outer, _b)) });
};

export { Divider };
