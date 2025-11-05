import React, { useContext } from 'react';
import cn from 'classnames';
import { TableContext } from '../table-context/index.js';

const styles = {"component":"table__component_dog0d","compactHorizontal":"table__compactHorizontal_dog0d","compact":"table__compact_dog0d"};
require('./index.css');

const TCell = ({ className, style, dataTestId, children, index, ...restProps }) => {
    const { columnsConfiguration, compactView, compactHorizontal } = useContext(TableContext);
    const column = index === undefined ? null : columnsConfiguration[index];
    const width = column?.width;
    const textAlign = column?.textAlign;
    const hidden = column?.hidden || false;
    if (hidden)
        return null;
    return (React.createElement("td", { className: cn(styles.component, className, compactView && styles.compact, compactHorizontal && styles.compactHorizontal), style: { ...style, width, textAlign }, "data-test-id": dataTestId, ...restProps }, children));
};

export { TCell };
