import React from 'react';
import cn from 'classnames';

const styles = {"header":"calendar__header_1tc94","withShadow":"calendar__withShadow_1tc94"};
require('./index.css');

const Header = ({ view = 'full', withShadow, children }) => (React.createElement("div", { className: cn(styles.header, {
        [styles.monthOnly]: view === 'month-only',
        [styles.withShadow]: withShadow,
    }), "aria-live": 'polite' }, children));

export { Header };
