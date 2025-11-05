import { a as __assign } from '../colors.module-8732cbf6.js';
import React from 'react';
import { Title } from '../title/component.js';
import { c as commonStyles } from '../common.module-4f616a19.js';
import 'classnames';

var styles = {"styrene-xlarge":"typography__styrene-xlarge_39k3n","styrene-large":"typography__styrene-large_39k3n","styrene-medium":"typography__styrene-medium_39k3n","styrene-small":"typography__styrene-small_39k3n","styrene-xsmall":"typography__styrene-xsmall_39k3n","system-xlarge":"typography__system-xlarge_39k3n","system-large":"typography__system-large_39k3n","system-medium":"typography__system-medium_39k3n","system-small":"typography__system-small_39k3n","system-xsmall":"typography__system-xsmall_39k3n","margins-xlarge":"typography__margins-xlarge_39k3n","margins-large":"typography__margins-large_39k3n","margins-medium":"typography__margins-medium_39k3n","margins-small":"typography__margins-small_39k3n","margins-xsmall":"typography__margins-xsmall_39k3n"};
require('./index.css');

var TitleResponsive = function (props) { return (
/**
 * Если поменять Object.assign на деструктуризацию, то упадут тесты.
 * Видимо, это особенность работы jest и css-modules.
 */
React.createElement(Title, __assign({}, props, { styles: Object.assign(commonStyles, styles) }))); };

export { TitleResponsive };
