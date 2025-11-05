import React from 'react';
import cn from 'classnames';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';

const styles = {"arrow":"select__arrow_1c6c2","open":"select__open_1c6c2"};
require('./index.css');

const Arrow = ({ open, className }) => (React.createElement(ChevronDownMIcon, { className: cn(styles.arrow, className, { [styles.open]: open }) }));

export { Arrow };
