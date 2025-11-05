import React from 'react';
import cn from 'classnames';

const styles = {"component":"status__component_1vjgk","soft":"status__soft_1vjgk","green":"status__green_1vjgk","orange":"status__orange_1vjgk","red":"status__red_1vjgk","blue":"status__blue_1vjgk","grey":"status__grey_1vjgk","teal":"status__teal_1vjgk","purple":"status__purple_1vjgk","contrast":"status__contrast_1vjgk"};
require('./index.css');

const colors = ['green', 'orange', 'red', 'blue', 'grey', 'teal', 'purple'];
const Status = ({ className, view = 'soft', color = 'green', children, dataTestId, }) => (React.createElement("span", { className: cn(styles.component, styles[color], styles[view], className), "data-test-id": dataTestId }, children));

export { Status, colors };
