import React from 'react';
import cn from 'classnames';

const styles = {"component":"calendar-range__component_eslzr","outer":"calendar-range__outer_eslzr","s":"calendar-range__s_eslzr","m":"calendar-range__m_eslzr","l":"calendar-range__l_eslzr","xl":"calendar-range__xl_eslzr"};
require('./index.css');

const Divider = ({ inputFromProps, inputToProps }) => {
    const outer = inputFromProps?.label &&
        inputFromProps?.labelView === 'outer' &&
        inputToProps?.label &&
        inputToProps?.labelView === 'outer';
    const size = inputFromProps?.size || inputToProps?.size || 's';
    return React.createElement("span", { className: cn(styles.component, styles[size], { [styles.outer]: outer }) });
};

export { Divider };
