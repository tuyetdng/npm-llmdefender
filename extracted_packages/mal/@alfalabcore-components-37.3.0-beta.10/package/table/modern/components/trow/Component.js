import React from 'react';
import cn from 'classnames';

const styles = {"component":"table__component_zaon3","withoutBorder":"table__withoutBorder_zaon3","clickable":"table__clickable_zaon3","selected":"table__selected_zaon3"};
require('./index.css');

const TRow = ({ children, className, selected, withoutBorder, dataTestId, ...restProps }) => (React.createElement("tr", { className: cn(styles.component, className, {
        [styles.clickable]: typeof restProps.onClick !== 'undefined',
        [styles.selected]: selected,
        [styles.withoutBorder]: withoutBorder,
    }), "data-test-id": dataTestId, ...restProps }, React.Children.map(children, (child, index) => React.cloneElement(child, { index }))));

export { TRow };
