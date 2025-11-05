import React from 'react';
import cn from 'classnames';
import { flagSprite } from './flagSprite.js';

const styles = {"flagIcon":"intl-phone-input__flagIcon_jv6x2","flagPlaceholder":"intl-phone-input__flagPlaceholder_jv6x2"};
require('./index.css');

/**
 * Компонент флага в виде иконки.
 */
const FlagIcon = ({ country = '', className }) => flagSprite[country] ? (React.createElement("span", { className: cn(styles.flagIcon, className), "data-test-id": `flag-icon-${country}`, dangerouslySetInnerHTML: { __html: flagSprite[country] } })) : (React.createElement("div", { className: cn(styles.flagPlaceholder, className) }));

export { FlagIcon };
