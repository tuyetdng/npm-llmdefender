import React, { forwardRef } from 'react';
import cn from 'classnames';

var styles = {"scrollable":"textarea__scrollable_1f5bc","scrollableWrapper":"textarea__scrollableWrapper_1f5bc","textarea":"textarea__textarea_1f5bc","s":"textarea__s_1f5bc","m":"textarea__m_1f5bc","l":"textarea__l_1f5bc","xl":"textarea__xl_1f5bc","textareaHidden":"textarea__textareaHidden_1f5bc","hasInnerLabel":"textarea__hasInnerLabel_1f5bc","resizeVertical":"textarea__resizeVertical_1f5bc","pseudoTextarea":"textarea__pseudoTextarea_1f5bc","overflow":"textarea__overflow_1f5bc","nativeScrollbar":"textarea__nativeScrollbar_1f5bc","customScrollbar":"textarea__customScrollbar_1f5bc","sub":"textarea__sub_1f5bc","scrollableWithLabel":"textarea__scrollableWithLabel_1f5bc","focusVisible":"textarea__focusVisible_1f5bc","filled":"textarea__filled_1f5bc"};
require('./index.css');

var PseudoTextArea = forwardRef(function (_a, ref) {
    var _b = _a.size, size = _b === void 0 ? 's' : _b, pseudoTextareaClassName = _a.pseudoTextareaClassName, maxLength = _a.maxLength, value = _a.value;
    return (React.createElement("div", { className: cn(styles.pseudoTextarea, styles[size], pseudoTextareaClassName), ref: ref, hidden: true },
        React.createElement("span", null, value.slice(0, maxLength)),
        React.createElement("span", { className: cn(styles.overflow) }, value.slice(maxLength)),
        React.createElement("br", null)));
});

export { PseudoTextArea as P, styles as s };
