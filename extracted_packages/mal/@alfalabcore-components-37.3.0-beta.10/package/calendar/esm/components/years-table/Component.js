import { _ as __assign } from '../../tslib.es6-4869e457.js';
import React, { useRef, useCallback, useLayoutEffect } from 'react';
import cn from 'classnames';
import isSameYear from 'date-fns/isSameYear';
import isThisYear from 'date-fns/isThisYear';
import { SelectButton } from '../select-button/Component.js';
import '../../../../button/esm';

var styles = {"yearsTable":"calendar__yearsTable_1iu6d","responsive":"calendar__responsive_1iu6d","inner":"calendar__inner_1iu6d","button":"calendar__button_1iu6d"};
require('./index.css');

var YearsTable = function (_a) {
    var _b;
    var selectedYear = _a.selectedYear, _c = _a.years, years = _c === void 0 ? [] : _c, getYearProps = _a.getYearProps, onScroll = _a.onScroll, responsive = _a.responsive;
    var ref = useRef(null);
    var view = useCallback(function (year) {
        if (selectedYear && isSameYear(selectedYear, year))
            return 'selected';
        if (isThisYear(year))
            return 'outlined';
        return 'default';
    }, [selectedYear]);
    var handleScroll = useCallback(function (event) {
        onScroll(event.currentTarget.scrollTop);
    }, [onScroll]);
    useLayoutEffect(function () {
        var listNode = ref.current;
        var selector = ".".concat(styles.button, "[tabIndex=\"0\"]");
        var selectedYearNode = listNode && listNode.querySelector(selector);
        if (listNode && selectedYearNode) {
            var topIndent = listNode.clientHeight / 2 - selectedYearNode.clientHeight / 2;
            listNode.scrollTop = selectedYearNode.offsetTop - topIndent;
            onScroll(listNode.scrollTop);
        }
    }, [onScroll, selectedYear]);
    return (React.createElement("div", { className: cn(styles.yearsTable, (_b = {}, _b[styles.responsive] = responsive, _b)), onScroll: handleScroll, ref: ref },
        React.createElement("div", { className: styles.inner }, years.map(function (year) { return (React.createElement(SelectButton, __assign({}, getYearProps(year), { key: year.getFullYear(), view: view(year), className: styles.button }), year.getFullYear())); }))));
};

export { YearsTable };
