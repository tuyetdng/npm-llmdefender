import React, { useMemo } from 'react';
import cn from 'classnames';
import { createClassNames } from '../utils/index.js';
import { g as guttersStyles } from '../gutters.module-dcf91c0e.js';

const styles = {"component":"grid__component_g8xez","top":"grid__top_g8xez","middle":"grid__middle_g8xez","bottom":"grid__bottom_g8xez","left":"grid__left_g8xez","center":"grid__center_g8xez","right":"grid__right_g8xez","around":"grid__around_g8xez","between":"grid__between_g8xez"};
require('./index.css');

const Row = ({ tag: Component = 'div', className, gutter = {
    mobile: {
        s: 16,
    },
    desktop: {
        m: 24,
    },
}, align, justify = 'between', children, dataTestId, }) => {
    const classNames = useMemo(() => createClassNames({ gutter }, guttersStyles), [gutter]);
    return (React.createElement(Component, { className: cn(guttersStyles.row, styles.component, align && styles[align], styles[justify], ...classNames, className), "data-test-id": dataTestId }, children));
};

export { Row };
