import React from 'react';
import cn from 'classnames';

const styles = {"grid-gap":"gap__gap_12ekk","gap":"gap__gap_12ekk","vertical":"gap__vertical_12ekk","horizontal":"gap__horizontal_12ekk"};
require('./index.css');

const Gap = ({ size, direction = 'vertical', tag: Component = 'div', className, dataTestId, }) => (React.createElement(Component, { "data-test-id": dataTestId, "data-gap-size": size, className: cn(styles.gap, styles[direction], className) }));

export { Gap };
