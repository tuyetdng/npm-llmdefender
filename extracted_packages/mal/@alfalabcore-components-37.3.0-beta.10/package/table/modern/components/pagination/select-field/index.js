import React from 'react';
import cn from 'classnames';
import { Button } from '../../../../../button/modern';

const styles = {"field":"table__field_1jeu8","open":"table__open_1jeu8"};
require('./index.css');

const CustomSelectField = ({ selected, innerProps, Arrow, open }) => {
    const { ref, ...restInnerProps } = innerProps;
    return (React.createElement("div", { ref: ref },
        React.createElement(Button, { ...restInnerProps, size: 'xxs', view: 'link', className: cn(styles.field, { [styles.open]: open }), rightAddons: Arrow }, selected?.content)));
};

export { CustomSelectField };
