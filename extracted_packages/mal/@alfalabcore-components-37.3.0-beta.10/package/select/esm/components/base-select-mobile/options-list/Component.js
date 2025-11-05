import { a as __assign } from '../../../tslib.es6-0bbcaa10.js';
import React, { useContext, useEffect } from 'react';
import cn from 'classnames';
import { BaseModalContext } from '../../../../../base-modal/esm';
import { Button } from '../../../../../button/esm';
import { isGroup } from '../../../utils.js';
import { Optgroup } from '../../optgroup/Component.js';

var styles = {"optionsList":"select__optionsList_1h2zf","emptyPlaceholder":"select__emptyPlaceholder_1h2zf","l":"select__l_1h2zf","xl":"select__xl_1h2zf","footer":"select__footer_1h2zf","footerButton":"select__footerButton_1h2zf","highlighted":"select__highlighted_1h2zf"};
require('./index.css');

var createCounter = function () {
    var count = 0;
    // eslint-disable-next-line no-plusplus
    return function () { return count++; };
};
var OptionsList = function (_a) {
    var _b;
    var _c = _a.size, size = _c === void 0 ? 's' : _c, className = _a.className, optionGroupClassName = _a.optionGroupClassName, Option = _a.Option, getOptionProps = _a.getOptionProps, _d = _a.options, options = _d === void 0 ? [] : _d, _e = _a.Optgroup, Optgroup$1 = _e === void 0 ? Optgroup : _e, dataTestId = _a.dataTestId, emptyPlaceholder = _a.emptyPlaceholder, showFooter = _a.showFooter, _f = _a.onApply, onApply = _f === void 0 ? function () { return null; } : _f, _g = _a.onClear, onClear = _g === void 0 ? function () { return null; } : _g;
    var _h = useContext(BaseModalContext), footerHighlighted = _h.footerHighlighted, setHasFooter = _h.setHasFooter;
    useEffect(function () {
        setHasFooter(true);
    }, [setHasFooter]);
    var renderOption = function (option, index) { return (React.createElement(Option, __assign({ key: option.key }, getOptionProps(option, index)))); };
    var counter = createCounter();
    var renderGroup = function (group) { return (React.createElement(Optgroup$1, { className: optionGroupClassName, label: group.label, key: group.label, size: size }, group.options.map(function (option) { return renderOption(option, counter()); }))); };
    if (options.length === 0 && !emptyPlaceholder) {
        return null;
    }
    return (React.createElement("div", { className: cn(styles.optionsList, styles[size], className), "data-test-id": dataTestId },
        options.map(function (option) {
            return isGroup(option) ? renderGroup(option) : renderOption(option, counter());
        }),
        emptyPlaceholder && options.length === 0 && (React.createElement("div", { className: styles.emptyPlaceholder }, emptyPlaceholder)),
        showFooter && (React.createElement("div", { className: cn(styles.footer, className, (_b = {},
                _b[styles.highlighted] = footerHighlighted,
                _b)) },
            React.createElement(Button, { size: 's', view: 'primary', onClick: onApply, className: styles.footerButton }, "\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C"),
            React.createElement(Button, { size: 's', view: 'secondary', onClick: onClear, className: styles.footerButton }, "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C")))));
};

export { OptionsList };
