import { a as __assign, E as EMPTY_COUNTRY_SELECT_FIELD, S as SelectField } from '../../component-064f33de.js';
import React, { useMemo, useCallback } from 'react';
import { VirtualOptionsList, Select } from '../../../../select/esm';
import { FlagIcon } from '../flag-icon/component.js';
import 'react-merge-refs';
import 'classnames';
import '@alfalab/hooks';
import '@alfalab/icons-glyph/WorldMagnifierMIcon';
import '../flag-icon/flagSprite.js';

var styles = {"component":"intl-phone-input__component_1eate","option":"intl-phone-input__option_1eate","flag":"intl-phone-input__flag_1eate","countryName":"intl-phone-input__countryName_1eate","dialCode":"intl-phone-input__dialCode_1eate"};
require('./index.css');

var CountriesSelect = function (_a) {
    var disabled = _a.disabled, size = _a.size, selected = _a.selected, countries = _a.countries, fieldWidth = _a.fieldWidth, preventFlip = _a.preventFlip, onChange = _a.onChange, dataTestId = _a.dataTestId;
    var options = useMemo(function () {
        return countries.map(function (_a) {
            var iso2 = _a.iso2, dialCode = _a.dialCode, name = _a.name;
            return ({
                key: iso2,
                value: iso2,
                content: (React.createElement("span", { className: styles.option },
                    React.createElement(FlagIcon, { country: iso2, className: styles.flag }),
                    React.createElement("span", { className: styles.optionTextWrap },
                        React.createElement("span", { className: styles.countryName }, name),
                        React.createElement("span", { className: styles.dialCode },
                            "+",
                            dialCode)))),
            });
        });
    }, [countries]);
    var renderOptionsList = useCallback(function (props) { return (React.createElement("div", { style: { width: fieldWidth || 0 } },
        React.createElement(VirtualOptionsList, __assign({}, props)))); }, [fieldWidth]);
    return (React.createElement("div", { className: styles.component, onClick: function (event) { return event.stopPropagation(); } },
        React.createElement(Select, { dataTestId: dataTestId, disabled: disabled, size: size, options: options, selected: selected || EMPTY_COUNTRY_SELECT_FIELD, onChange: onChange, Field: SelectField, OptionsList: renderOptionsList, preventFlip: preventFlip })));
};

export { CountriesSelect };
