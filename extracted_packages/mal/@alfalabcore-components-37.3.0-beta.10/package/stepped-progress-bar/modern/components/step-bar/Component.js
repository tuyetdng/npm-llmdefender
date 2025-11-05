import React, { memo } from 'react';
import cn from 'classnames';

const styles = {"bar":"stepped-progress-bar__bar_3hgxe","positive":"stepped-progress-bar__positive_3hgxe","attention":"stepped-progress-bar__attention_3hgxe","negative":"stepped-progress-bar__negative_3hgxe","link":"stepped-progress-bar__link_3hgxe","tertiary":"stepped-progress-bar__tertiary_3hgxe","secondary":"stepped-progress-bar__secondary_3hgxe","primary":"stepped-progress-bar__primary_3hgxe","accent":"stepped-progress-bar__accent_3hgxe"};
require('./index.css');

const StepBar = memo(({ isDone, view = 'positive' }) => (React.createElement("span", { "data-test-id": isDone ? 'on' : 'off', className: cn(styles.bar, isDone && styles[view]) })));

export { StepBar };
