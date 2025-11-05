import React, { useState } from 'react';
import cn from 'classnames';
import { TRow } from '../trow/Component.js';

const styles = {"row":"table__row_nwlhi","selected":"table__selected_nwlhi","expanded":"table__expanded_nwlhi","expandable":"table__expandable_nwlhi"};
require('./index.css');

const TExpandableRow = ({ className, selected, expanded, defaultExpanded = false, onToggle = () => null, renderContent = () => null, ...restProps }) => {
    const [expandedState, setExpandedState] = useState(defaultExpanded);
    const uncontrolled = expanded === undefined;
    const isExpanded = (uncontrolled ? expandedState : expanded);
    const handleToggle = () => {
        if (uncontrolled) {
            setExpandedState(!isExpanded);
        }
        onToggle(isExpanded);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(TRow, { className: cn(styles.row, className, {
                [styles.selected]: selected,
                [styles.expanded]: isExpanded,
            }), selected: selected, onClick: handleToggle, ...restProps }),
        React.createElement("tr", { className: cn(styles.expandable, { [styles.expanded]: isExpanded }) }, renderContent(isExpanded))));
};

export { TExpandableRow };
