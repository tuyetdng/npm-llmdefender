import React, { forwardRef } from 'react';
import cn from 'classnames';
import { c as colors } from '../colors.module-bcb26f1f.js';

const styles = {"paragraph":"typography__paragraph_9xfoj","paragraphWithMargins":"typography__paragraphWithMargins_9xfoj","primary-large":"typography__primary-large_9xfoj","primary-medium":"typography__primary-medium_9xfoj","primary-small":"typography__primary-small_9xfoj","secondary-large":"typography__secondary-large_9xfoj","secondary-medium":"typography__secondary-medium_9xfoj","secondary-small":"typography__secondary-small_9xfoj","component":"typography__component_9xfoj","caps":"typography__caps_9xfoj","bold":"typography__bold_9xfoj","medium":"typography__medium_9xfoj","regular":"typography__regular_9xfoj","monospace":"typography__monospace_9xfoj"};
require('./index.css');

const Text = forwardRef(({ view = 'primary-medium', tag: Component = 'span', weight, monospaceNumbers = false, defaultMargins = true, color, className, dataTestId, children, ...restProps }, ref) => (React.createElement(Component, { className: cn({
        [styles.paragraph]: Component === 'p' && !defaultMargins,
        [styles.paragraphWithMargins]: Component === 'p' && defaultMargins,
        [styles.monospace]: monospaceNumbers,
    }, className, color && colors[color], styles[view], weight && styles[weight]), "data-test-id": dataTestId, ref: ref, ...restProps }, children)));

export { Text };
