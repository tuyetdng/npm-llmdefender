import { a as __assign } from '../colors.module-8732cbf6.js';
import React from 'react';
import { Title as Title$1 } from './component.js';
import { c as commonStyles } from '../common.module-4f616a19.js';
import 'classnames';

var styles = {"styrene-xlarge":"typography__styrene-xlarge_17h0l","styrene-large":"typography__styrene-large_17h0l","styrene-medium":"typography__styrene-medium_17h0l","styrene-small":"typography__styrene-small_17h0l","styrene-xsmall":"typography__styrene-xsmall_17h0l","system-xlarge":"typography__system-xlarge_17h0l","system-large":"typography__system-large_17h0l","system-medium":"typography__system-medium_17h0l","system-small":"typography__system-small_17h0l","system-xsmall":"typography__system-xsmall_17h0l","margins-xlarge":"typography__margins-xlarge_17h0l","margins-large":"typography__margins-large_17h0l","margins-medium":"typography__margins-medium_17h0l","margins-small":"typography__margins-small_17h0l","margins-xsmall":"typography__margins-xsmall_17h0l"};
require('./index.css');

var Title = function (props) { return (
/**
 * Если поменять Object.assign на деструктуризацию, то упадут тесты.
 * Видимо, это особенность работы jest и css-modules.
 */
React.createElement(Title$1, __assign({}, props, { styles: Object.assign(commonStyles, styles) }))); };

export { Title };
