import { a as __assign } from '../../tslib.es6-0bbcaa10.js';
import React, { isValidElement } from 'react';
import cn from 'classnames';
import { Checkmark } from '../base-select-mobile/checkmark/Component.js';
import { Checkmark as Checkmark$1 } from '../checkmark/Component.js';
import '../../../../badge/esm';
import '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import '@alfalab/icons-glyph/CheckmarkMIcon';
import '../../../../checkbox/esm';

var styles = {"option":"select__option_4qdvw","disabled":"select__disabled_4qdvw","s":"select__s_4qdvw","m":"select__m_4qdvw","l":"select__l_4qdvw","xl":"select__xl_4qdvw","selected":"select__selected_4qdvw","highlighted":"select__highlighted_4qdvw","content":"select__content_4qdvw","textContent":"select__textContent_4qdvw"};
require('./index.css');

var Option = function (_a) {
    var _b, _c;
    var _d = _a.size, size = _d === void 0 ? 's' : _d, className = _a.className, option = _a.option, children = _a.children, selected = _a.selected, highlighted = _a.highlighted, disabled = _a.disabled, multiple = _a.multiple, mobile = _a.mobile, _e = _a.Checkmark, Checkmark$2 = _e === void 0 ? mobile ? Checkmark : Checkmark$1 : _e, innerProps = _a.innerProps, dataTestId = _a.dataTestId;
    var content = children || option.content || option.key;
    var _f = option.showCheckMark, showCheckMark = _f === void 0 ? true : _f;
    return (React.createElement("div", __assign({}, innerProps, { className: cn(styles.option, styles[size], className, (_b = {},
            _b[styles.highlighted] = highlighted,
            _b[styles.selected] = selected,
            _b[styles.disabled] = disabled,
            _b)), "data-test-id": dataTestId }),
        Checkmark$2 && showCheckMark && (React.createElement(Checkmark$2, { disabled: disabled, selected: selected, multiple: multiple, position: 'before' })),
        React.createElement("div", { className: cn(styles.content, (_c = {},
                _c[styles.textContent] = !isValidElement(content),
                _c)) }, content),
        Checkmark$2 && showCheckMark && (React.createElement(Checkmark$2, { disabled: disabled, selected: selected, multiple: multiple, position: 'after' }))));
};

export { Option };
