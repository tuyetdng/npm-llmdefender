import React, { useContext, useCallback } from 'react';
import cn from 'classnames';
import { IconButton } from '../../../../icon-button/modern';
import { ModalContext } from '../../Context.js';
import '../../../../base-modal/modern';

const styles = {"closer":"side-panel__closer_1f6zk","button":"side-panel__button_1f6zk","sticky":"side-panel__sticky_1f6zk"};
require('./index.css');

/**
 * @deprecated Компонент только для внутреннего использования. Используйте <Header />
 */
const Closer = ({ className, size = 's', sticky, icon, ...restProps }) => {
    const { onClose } = useContext(ModalContext);
    const handleClick = useCallback((event) => {
        onClose(event, 'closerClick');
    }, [onClose]);
    return (React.createElement("div", { className: cn(styles.closer, className, {
            [styles.sticky]: sticky,
        }) },
        React.createElement(IconButton, { size: size, className: styles.button, "aria-label": '\u0437\u0430\u043A\u0440\u044B\u0442\u044C', onClick: handleClick, icon: icon, ...restProps })));
};

export { Closer };
