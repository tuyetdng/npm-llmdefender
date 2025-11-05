import React from 'react';
import cn from 'classnames';
import { Badge } from '../../../../badge/esm';

var styles = {"component":"steps__component_u45nl"};
require('./index.css');

var StepIndicator = function (_a) {
    var content = _a.content, iconColor = _a.iconColor, className = _a.className;
    return (React.createElement(Badge, { size: 'l', view: 'icon', iconColor: iconColor, className: cn(styles.component, className), content: content }));
};

export { StepIndicator };
