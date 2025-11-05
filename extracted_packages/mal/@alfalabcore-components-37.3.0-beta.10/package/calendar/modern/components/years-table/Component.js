import React, { useRef, useCallback, useLayoutEffect } from 'react';
import cn from 'classnames';
import isSameYear from 'date-fns/isSameYear';
import isThisYear from 'date-fns/isThisYear';
import { SelectButton } from '../select-button/Component.js';
import '../../../../button/modern';

const styles = {"yearsTable":"calendar__yearsTable_1iu6d","responsive":"calendar__responsive_1iu6d","inner":"calendar__inner_1iu6d","button":"calendar__button_1iu6d"};
require('./index.css');

const YearsTable = ({ selectedYear, years = [], getYearProps, onScroll, responsive, }) => {
    const ref = useRef(null);
    const view = useCallback((year) => {
        if (selectedYear && isSameYear(selectedYear, year))
            return 'selected';
        if (isThisYear(year))
            return 'outlined';
        return 'default';
    }, [selectedYear]);
    const handleScroll = useCallback((event) => {
        onScroll(event.currentTarget.scrollTop);
    }, [onScroll]);
    useLayoutEffect(() => {
        const listNode = ref.current;
        const selector = `.${styles.button}[tabIndex="0"]`;
        const selectedYearNode = listNode && listNode.querySelector(selector);
        if (listNode && selectedYearNode) {
            const topIndent = listNode.clientHeight / 2 - selectedYearNode.clientHeight / 2;
            listNode.scrollTop = selectedYearNode.offsetTop - topIndent;
            onScroll(listNode.scrollTop);
        }
    }, [onScroll, selectedYear]);
    return (React.createElement("div", { className: cn(styles.yearsTable, { [styles.responsive]: responsive }), onScroll: handleScroll, ref: ref },
        React.createElement("div", { className: styles.inner }, years.map((year) => (React.createElement(SelectButton, { ...getYearProps(year), key: year.getFullYear(), view: view(year), className: styles.button }, year.getFullYear()))))));
};

export { YearsTable };
