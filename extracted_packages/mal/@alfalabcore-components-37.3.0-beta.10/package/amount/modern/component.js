import React from 'react';
import cn from 'classnames';
import { formatAmount, AMOUNT_MAJOR_MINOR_PARTS_SEPARATOR } from '@alfalab/utils';

const styles = {"component":"amount__component_1fiju","transparentMinor":"amount__transparentMinor_1fiju","bold":"amount__bold_1fiju","normalMinor":"amount__normalMinor_1fiju","defaultStyles":"amount__defaultStyles_1fiju","defaultMinor":"amount__defaultMinor_1fiju"};
require('./index.css');

/**
 * Компонент для отображения суммы, согласно следующему гайдлайну:
 * https://design.alfabank.ru/patterns/amount
 */
const Amount = ({ value, minority, currency, codeFormat = 'symbolic', view = 'default', bold, transparentMinor, rightAddons, showPlus = false, className, dataTestId, }) => {
    const { majorPart, minorPart, currencySymbol, currencySeparator } = formatAmount({
        value,
        currency,
        minority,
        view,
        codeFormat,
    });
    const defaultStyles = bold === undefined && transparentMinor === undefined;
    return (React.createElement("span", { className: cn(styles.component, className, {
            [styles.bold]: bold === 'full' || bold === 'major',
            [styles.defaultStyles]: defaultStyles,
        }), "data-test-id": dataTestId },
        showPlus && value > 0 ? '+' : '',
        majorPart,
        React.createElement("span", { className: cn(styles.minorPartAndCurrency, {
                [styles.transparentMinor]: transparentMinor,
                [styles.normalMinor]: bold === 'major',
                [styles.defaultMinor]: defaultStyles,
            }) },
            minorPart && AMOUNT_MAJOR_MINOR_PARTS_SEPARATOR,
            minorPart,
            currency ? `${currencySeparator}${currencySymbol ?? currency}` : null,
            rightAddons)));
};

export { Amount };
