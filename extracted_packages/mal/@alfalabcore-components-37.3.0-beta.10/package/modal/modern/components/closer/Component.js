import React, { useContext, useCallback } from 'react';
import cn from 'classnames';
import { IconButton } from '../../../../icon-button/modern';
import { CrossHeavyMIcon } from '@alfalab/icons-glyph/CrossHeavyMIcon';
import { ModalContext } from '../../Context.js';
import '../../../../base-modal/modern';

const styles = {"closer":"modal__closer_dywtt","button":"modal__button_dywtt","sticky":"modal__sticky_dywtt"};
require('./index.css');

/**
 * @deprecated Компонент только для внутреннего использования. Используйте <Header />
 */
const Closer = ({ className, size = 's', sticky, icon = CrossHeavyMIcon, dataTestId, ...restProps }) => {
    const { onClose } = useContext(ModalContext);
    const handleClick = useCallback((event) => {
        onClose(event, 'closerClick');
    }, [onClose]);
    return (React.createElement("div", { className: cn(styles.closer, className, {
            [styles.sticky]: sticky,
        }) },
        React.createElement(IconButton, { size: size, className: styles.button, "aria-label": '\u0437\u0430\u043A\u0440\u044B\u0442\u044C', onClick: handleClick, icon: icon, dataTestId: dataTestId, ...restProps })));
};

export { Closer };
