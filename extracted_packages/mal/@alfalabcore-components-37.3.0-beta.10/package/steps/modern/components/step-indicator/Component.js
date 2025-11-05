import React from 'react';
import cn from 'classnames';
import { Badge } from '../../../../badge/modern';

const styles = {"component":"steps__component_u45nl"};
require('./index.css');

const StepIndicator = ({ content, iconColor, className }) => (React.createElement(Badge, { size: 'l', view: 'icon', iconColor: iconColor, className: cn(styles.component, className), content: content }));

export { StepIndicator };
