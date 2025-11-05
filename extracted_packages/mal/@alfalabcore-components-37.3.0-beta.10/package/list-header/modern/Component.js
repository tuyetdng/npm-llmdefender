import React from 'react';
import cn from 'classnames';
import { Typography } from '../../typography/modern';

const styles = {"component":"list-header__component_1ncwd","description":"list-header__description_1ncwd","filled":"list-header__filled_1ncwd"};
require('./index.css');

const ListHeader = ({ title, description, filled = true, className, dataTestId, }) => (React.createElement("div", { "data-test-id": dataTestId, className: cn(styles.component, { [styles.filled]: filled }, className) },
    React.createElement(Typography.Text, { view: 'secondary-large' }, title),
    description && (React.createElement(Typography.Text, { view: 'secondary-large', className: cn(styles.description) }, `, ${description}`))));

export { ListHeader };
