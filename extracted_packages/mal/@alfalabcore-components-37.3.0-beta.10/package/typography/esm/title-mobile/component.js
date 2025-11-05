import { a as __assign } from '../colors.module-8732cbf6.js';
import React from 'react';
import { Title } from '../title/component.js';
import { c as commonStyles } from '../common.module-4f616a19.js';
import 'classnames';

var styles = {"styrene-xlarge":"typography__styrene-xlarge_1pauw","styrene-large":"typography__styrene-large_1pauw","styrene-medium":"typography__styrene-medium_1pauw","styrene-small":"typography__styrene-small_1pauw","styrene-xsmall":"typography__styrene-xsmall_1pauw","system-xlarge":"typography__system-xlarge_1pauw","system-large":"typography__system-large_1pauw","system-medium":"typography__system-medium_1pauw","system-small":"typography__system-small_1pauw","system-xsmall":"typography__system-xsmall_1pauw"};
require('./index.css');

var TitleMobile = function (props) { return (
/**
 * Если поменять Object.assign на деструктуризацию, то упадут тесты.
 * Видимо, это особенность работы jest и css-modules.
 */
React.createElement(Title, __assign({}, props, { styles: Object.assign(commonStyles, styles) }))); };

export { TitleMobile };
