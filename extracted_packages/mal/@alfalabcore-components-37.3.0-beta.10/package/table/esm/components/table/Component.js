import { _ as __rest, a as __assign } from '../../tslib.es6-a84b316f.js';
import React, { forwardRef, useRef, useMemo } from 'react';
import cn from 'classnames';
import { TableContext } from '../table-context/index.js';
import { findAllHeadCellsProps } from './utils.js';
import '../thead/Component.js';
import '../../utils.js';

var styles = {"component":"table__component_ln4zp","wrapper":"table__wrapper_ln4zp","stickyHeader":"table__stickyHeader_ln4zp","hasPagination":"table__hasPagination_ln4zp","table":"table__table_ln4zp"};
require('./index.css');

var Table = forwardRef(function (_a, ref) {
    var _b;
    var className = _a.className, children = _a.children, _c = _a.compactView, compactView = _c === void 0 ? false : _c, _d = _a.compactHorizontal, compactHorizontal = _d === void 0 ? false : _d, _e = _a.wrapper, wrapper = _e === void 0 ? true : _e, pagination = _a.pagination, dataTestId = _a.dataTestId, _f = _a.stickyHeader, stickyHeader = _f === void 0 ? false : _f, restProps = __rest(_a, ["className", "children", "compactView", "compactHorizontal", "wrapper", "pagination", "dataTestId", "stickyHeader"]);
    var wrapperRef = useRef(null);
    var columnsConfiguration = useMemo(function () {
        return findAllHeadCellsProps(children).map(function (columnProps, index) { return ({
            width: columnProps.width,
            textAlign: columnProps.textAlign,
            hidden: columnProps.hidden,
            index: index,
        }); });
    }, [children]);
    /* eslint-disable react/jsx-no-constructed-context-values */
    return (React.createElement(TableContext.Provider, { value: {
            stickyHeader: stickyHeader,
            columnsConfiguration: columnsConfiguration,
            compactView: compactView,
            compactHorizontal: compactHorizontal,
            wrapperRef: wrapperRef,
        } },
        React.createElement("div", { ref: wrapperRef, className: cn(styles.component, className, (_b = {},
                _b[styles.wrapper] = wrapper,
                _b[styles.hasPagination] = !!pagination,
                _b[styles.stickyHeader] = stickyHeader,
                _b)), "data-test-id": dataTestId },
            React.createElement("table", __assign({ ref: ref, className: styles.table }, restProps), children),
            pagination)));
});

export { Table };
