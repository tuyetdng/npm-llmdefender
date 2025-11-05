import React from 'react';
import cn from 'classnames';
import { IconButton } from '../../../../icon-button/modern';
import { ArrowBackMIcon } from '@alfalab/icons-glyph/ArrowBackMIcon';

const styles = {"backer":"bottom-sheet__backer_1k990","button":"bottom-sheet__button_1k990"};
require('./index.css');

const Backer = ({ className, size = 'xs', icon = ArrowBackMIcon, dataTestId, onClick, ...restProps }) => (React.createElement("div", { className: cn(styles.backer, className) },
    React.createElement(IconButton, { size: size, className: styles.button, "aria-label": '\u043D\u0430\u0437\u0430\u0434', onClick: onClick, icon: icon, dataTestId: dataTestId, ...restProps })));

export { Backer };
