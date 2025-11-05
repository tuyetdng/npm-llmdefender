import React from 'react';
import cn from 'classnames';
import { Typography } from '../../../../typography/modern';

const styles = {"header":"confirmation__header_46n9r","typography":"confirmation__typography_46n9r","typographyMobile":"confirmation__typographyMobile_46n9r"};
require('./index.css');

const Header = ({ mobile, children }) => (React.createElement(Typography.Title, { className: cn(styles.header, styles.typography, { [styles.typographyMobile]: mobile }), tag: 'h3', color: 'primary' }, children));

export { Header };
