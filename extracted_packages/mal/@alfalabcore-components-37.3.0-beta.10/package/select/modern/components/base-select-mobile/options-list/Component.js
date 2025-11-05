import React, { useContext, useEffect } from 'react';
import cn from 'classnames';
import { BaseModalContext } from '../../../../../base-modal/modern';
import { Button } from '../../../../../button/modern';
import { isGroup } from '../../../utils.js';
import { Optgroup } from '../../optgroup/Component.js';

const styles = {"optionsList":"select__optionsList_1h2zf","emptyPlaceholder":"select__emptyPlaceholder_1h2zf","l":"select__l_1h2zf","xl":"select__xl_1h2zf","footer":"select__footer_1h2zf","footerButton":"select__footerButton_1h2zf","highlighted":"select__highlighted_1h2zf"};
require('./index.css');

const createCounter = () => {
    let count = 0;
    // eslint-disable-next-line no-plusplus
    return () => count++;
};
const OptionsList = ({ size = 's', className, optionGroupClassName, Option, getOptionProps, options = [], Optgroup: Optgroup$1 = Optgroup, dataTestId, emptyPlaceholder, showFooter, onApply = () => null, onClear = () => null, }) => {
    const { footerHighlighted, setHasFooter } = useContext(BaseModalContext);
    useEffect(() => {
        setHasFooter(true);
    }, [setHasFooter]);
    const renderOption = (option, index) => (React.createElement(Option, { key: option.key, ...getOptionProps(option, index) }));
    const counter = createCounter();
    const renderGroup = (group) => (React.createElement(Optgroup$1, { className: optionGroupClassName, label: group.label, key: group.label, size: size }, group.options.map((option) => renderOption(option, counter()))));
    if (options.length === 0 && !emptyPlaceholder) {
        return null;
    }
    return (React.createElement("div", { className: cn(styles.optionsList, styles[size], className), "data-test-id": dataTestId },
        options.map((option) => isGroup(option) ? renderGroup(option) : renderOption(option, counter())),
        emptyPlaceholder && options.length === 0 && (React.createElement("div", { className: styles.emptyPlaceholder }, emptyPlaceholder)),
        showFooter && (React.createElement("div", { className: cn(styles.footer, className, {
                [styles.highlighted]: footerHighlighted,
            }) },
            React.createElement(Button, { size: 's', view: 'primary', onClick: onApply, className: styles.footerButton }, "\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C"),
            React.createElement(Button, { size: 's', view: 'secondary', onClick: onClear, className: styles.footerButton }, "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C")))));
};

export { OptionsList };
