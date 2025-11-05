import React, { useContext, useMemo, useCallback } from 'react';
import cn from 'classnames';
import { Pagination as Pagination$1 } from '../../../../pagination/modern';
import { Select } from '../../../../select/modern';
import { TableContext } from '../table-context/index.js';
import { CustomSelectField } from './select-field/index.js';
import '../../../../button/modern';

const styles = {"component":"table__component_14fx1","pagesWrapper":"table__pagesWrapper_14fx1","tag":"table__tag_14fx1","tagActive":"table__tagActive_14fx1","menu":"table__menu_14fx1","option":"table__option_14fx1"};
require('./index.css');

const Pagination = ({ perPage = 25, possiblePerPage = [25, 50, 100], onPerPageChange = () => null, pagesCount, onPageChange = () => null, className, dataTestId, ...restPaginationProps }) => {
    const { wrapperRef } = useContext(TableContext);
    const options = useMemo(() => Array.from(new Set(possiblePerPage.concat(perPage)))
        .sort((a, b) => a - b)
        .map((value) => ({
        key: value.toString(),
        content: `Показывать по ${value}`,
    })), [perPage, possiblePerPage]);
    const handlePerPageChange = useCallback(({ selected }) => {
        onPerPageChange(Number(selected?.key));
    }, [onPerPageChange]);
    const handlePageChange = useCallback((pageIndex) => {
        onPageChange(pageIndex);
        setTimeout(() => {
            if (wrapperRef.current) {
                wrapperRef.current.scrollIntoView();
            }
        }, 0);
    }, [onPageChange, wrapperRef]);
    return (React.createElement("div", { className: cn(styles.component, className), "data-test-id": dataTestId },
        React.createElement(Select, { options: options, selected: perPage.toString(), onChange: handlePerPageChange, preventFlip: false, size: 's', className: styles.select, optionsListClassName: styles.menu, optionClassName: styles.option, Field: CustomSelectField }),
        pagesCount > 1 && (React.createElement(Pagination$1, { pagesCount: pagesCount, onPageChange: handlePageChange, ...restPaginationProps }))));
};

export { Pagination };
