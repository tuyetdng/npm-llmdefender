import React from 'react';
import cn from 'classnames';
import { formatAmount, THINSP } from '@alfalab/utils';

const styles = {"component":"amount__component_bgzb0"};
require('./index.css');

/**
 * Компонент для отображения суммы, согласно следующему гайдлайну:
 * https://design.alfabank.ru/patterns/amount
 * Не содержит стилей кроме неразрывности строки
 *
 * @deprecated Используйте основной компонент. Стилизацию можно настроить через пропсы
 */
const PureAmount = ({ value, minority, currency, rightAddons, view = 'default', showPlus = false, className, dataTestId, }) => {
    const { formatted, currencySymbol } = formatAmount({
        value,
        currency,
        minority,
        view,
    });
    return (React.createElement("span", { className: cn(styles.component, className), "data-test-id": dataTestId },
        showPlus && value > 0 ? '+' : '',
        formatted,
        currency ? `${THINSP}${currencySymbol}` : null,
        rightAddons));
};

export { PureAmount };
