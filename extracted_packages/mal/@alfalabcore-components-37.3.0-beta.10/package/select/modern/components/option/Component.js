import React, { isValidElement } from 'react';
import cn from 'classnames';
import { Checkmark } from '../base-select-mobile/checkmark/Component.js';
import { Checkmark as Checkmark$1 } from '../checkmark/Component.js';
import '../../../../badge/modern';
import '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import '@alfalab/icons-glyph/CheckmarkMIcon';
import '../../../../checkbox/modern';

const styles = {"option":"select__option_4qdvw","disabled":"select__disabled_4qdvw","s":"select__s_4qdvw","m":"select__m_4qdvw","l":"select__l_4qdvw","xl":"select__xl_4qdvw","selected":"select__selected_4qdvw","highlighted":"select__highlighted_4qdvw","content":"select__content_4qdvw","textContent":"select__textContent_4qdvw"};
require('./index.css');

const Option = ({ size = 's', className, option, children, selected, highlighted, disabled, multiple, mobile, Checkmark: Checkmark$2 = mobile ? Checkmark : Checkmark$1, innerProps, dataTestId, }) => {
    const content = children || option.content || option.key;
    const { showCheckMark = true } = option;
    return (React.createElement("div", { ...innerProps, className: cn(styles.option, styles[size], className, {
            [styles.highlighted]: highlighted,
            [styles.selected]: selected,
            [styles.disabled]: disabled,
        }), "data-test-id": dataTestId },
        Checkmark$2 && showCheckMark && (React.createElement(Checkmark$2, { disabled: disabled, selected: selected, multiple: multiple, position: 'before' })),
        React.createElement("div", { className: cn(styles.content, {
                [styles.textContent]: !isValidElement(content),
            }) }, content),
        Checkmark$2 && showCheckMark && (React.createElement(Checkmark$2, { disabled: disabled, selected: selected, multiple: multiple, position: 'after' }))));
};

export { Option };
