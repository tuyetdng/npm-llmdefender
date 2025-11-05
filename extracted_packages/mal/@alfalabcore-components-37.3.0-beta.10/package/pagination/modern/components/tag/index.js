import React from 'react';
import cn from 'classnames';
import { Tag as Tag$1 } from '../../../../tag/modern';

const styles = {"tag":"pagination__tag_c2xjj","checked":"pagination__checked_c2xjj"};
require('./index.css');

const Tag = ({ className, checked, ...restProps }) => (React.createElement(Tag$1, { ...restProps, checked: checked, size: 'xxs', className: cn(className, styles.tag, { [styles.checked]: checked }) }));

export { Tag };
