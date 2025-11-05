import React, { useContext, useCallback } from 'react';
import cn from 'classnames';
import { BaseModalContext } from '../../../../base-modal/modern';
import { IconButton } from '../../../../icon-button/modern';
import { CrossMIcon } from '@alfalab/icons-glyph/CrossMIcon';

const styles = {"closer":"bottom-sheet__closer_1iz26","button":"bottom-sheet__button_1iz26"};
require('./index.css');

const Closer = ({ className, size = 'xs', icon = CrossMIcon, dataTestId, ...restProps }) => {
    const { onClose } = useContext(BaseModalContext);
    const handleClick = useCallback((event) => {
        onClose(event, 'closerClick');
    }, [onClose]);
    return (React.createElement("div", { className: cn(styles.closer, className) },
        React.createElement(IconButton, { size: size, className: styles.button, "aria-label": '\u0437\u0430\u043A\u0440\u044B\u0442\u044C', onClick: handleClick, icon: icon, dataTestId: dataTestId, ...restProps })));
};

export { Closer };
