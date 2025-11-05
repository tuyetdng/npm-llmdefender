import React, { isValidElement } from 'react';
import cn from 'classnames';
import { BaseCheckmark } from '../base-checkmark/Component.js';
import '../../../../checkbox/modern';
import '@alfalab/icons-glyph/CheckmarkMIcon';

const styles = {"option":"select__option_du6yo","disabled":"select__disabled_du6yo","checkmarkBefore":"select__checkmarkBefore_du6yo","mobile":"select__mobile_du6yo","checkmarkAfter":"select__checkmarkAfter_du6yo","textContent":"select__textContent_du6yo","selected":"select__selected_du6yo","highlighted":"select__highlighted_du6yo","content":"select__content_du6yo"};
require('./index.css');

const BaseOption = ({ className, option, children, selected, highlighted, disabled, multiple, Checkmark = BaseCheckmark, checkmarkPosition = multiple ? 'before' : 'after', innerProps, dataTestId, mobile = false, }) => {
    const content = children || option.content || option.key;
    const { showCheckMark = true } = option;
    const isTextContent = !isValidElement(content);
    const renderCheckmark = () => {
        if (Checkmark && showCheckMark) {
            return React.createElement(Checkmark, { disabled: disabled, selected: selected, multiple: multiple });
        }
        return null;
    };
    return (React.createElement("div", { ...innerProps, className: cn(styles.option, className, {
            [styles.highlighted]: highlighted,
            [styles.selected]: selected,
            [styles.disabled]: disabled,
            [styles.textContent]: isTextContent,
            [styles.mobile]: mobile,
            [styles.checkmarkAfter]: !isTextContent && checkmarkPosition === 'after',
            [styles.checkmarkBefore]: !isTextContent && checkmarkPosition === 'before',
        }), "data-test-id": dataTestId },
        checkmarkPosition === 'before' && renderCheckmark(),
        React.createElement("div", { className: cn(styles.content) }, content),
        checkmarkPosition === 'after' && renderCheckmark()));
};

export { BaseOption };
