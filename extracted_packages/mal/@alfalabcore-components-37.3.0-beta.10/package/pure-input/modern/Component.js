import React, { useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { useFocus } from '@alfalab/hooks';

const styles = {"input":"pure-input__input_1uh29","hasInnerLabel":"pure-input__hasInnerLabel_1uh29","clearIcon":"pure-input__clearIcon_1uh29","error":"pure-input__error_1uh29","component":"pure-input__component_1uh29","block":"pure-input__block_1uh29","s":"pure-input__s_1uh29","m":"pure-input__m_1uh29","l":"pure-input__l_1uh29","xl":"pure-input__xl_1uh29","focusVisible":"pure-input__focusVisible_1uh29"};
require('./index.css');

const PureInput = React.forwardRef(({ size = 's', type = 'text', block = false, className, dataTestId, ...restProps }, ref) => {
    const inputRef = useRef(null);
    const [focusVisible] = useFocus(inputRef, 'keyboard');
    return (React.createElement("input", { ...restProps, className: cn(styles.component, styles[size], {
            [styles.block]: block,
            [styles.focusVisible]: focusVisible,
        }, className), ref: mergeRefs([ref, inputRef]), type: type, "data-test-id": dataTestId }));
});
/**
 * Для отображения в сторибуке
 */
PureInput.defaultProps = {
    size: 's',
    type: 'text',
    block: false,
};

export { PureInput };
