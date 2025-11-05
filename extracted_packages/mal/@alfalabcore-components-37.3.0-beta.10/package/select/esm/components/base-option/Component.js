import { a as __assign } from '../../tslib.es6-0bbcaa10.js';
import React, { isValidElement } from 'react';
import cn from 'classnames';
import { BaseCheckmark } from '../base-checkmark/Component.js';
import '../../../../checkbox/esm';
import '@alfalab/icons-glyph/CheckmarkMIcon';

var styles = {"option":"select__option_du6yo","disabled":"select__disabled_du6yo","checkmarkBefore":"select__checkmarkBefore_du6yo","mobile":"select__mobile_du6yo","checkmarkAfter":"select__checkmarkAfter_du6yo","textContent":"select__textContent_du6yo","selected":"select__selected_du6yo","highlighted":"select__highlighted_du6yo","content":"select__content_du6yo"};
require('./index.css');

var BaseOption = function (_a) {
    var _b;
    var className = _a.className, option = _a.option, children = _a.children, selected = _a.selected, highlighted = _a.highlighted, disabled = _a.disabled, multiple = _a.multiple, _c = _a.Checkmark, Checkmark = _c === void 0 ? BaseCheckmark : _c, _d = _a.checkmarkPosition, checkmarkPosition = _d === void 0 ? multiple ? 'before' : 'after' : _d, innerProps = _a.innerProps, dataTestId = _a.dataTestId, _e = _a.mobile, mobile = _e === void 0 ? false : _e;
    var content = children || option.content || option.key;
    var _f = option.showCheckMark, showCheckMark = _f === void 0 ? true : _f;
    var isTextContent = !isValidElement(content);
    var renderCheckmark = function () {
        if (Checkmark && showCheckMark) {
            return React.createElement(Checkmark, { disabled: disabled, selected: selected, multiple: multiple });
        }
        return null;
    };
    return (React.createElement("div", __assign({}, innerProps, { className: cn(styles.option, className, (_b = {},
            _b[styles.highlighted] = highlighted,
            _b[styles.selected] = selected,
            _b[styles.disabled] = disabled,
            _b[styles.textContent] = isTextContent,
            _b[styles.mobile] = mobile,
            _b[styles.checkmarkAfter] = !isTextContent && checkmarkPosition === 'after',
            _b[styles.checkmarkBefore] = !isTextContent && checkmarkPosition === 'before',
            _b)), "data-test-id": dataTestId }),
        checkmarkPosition === 'before' && renderCheckmark(),
        React.createElement("div", { className: cn(styles.content) }, content),
        checkmarkPosition === 'after' && renderCheckmark()));
};

export { BaseOption };
