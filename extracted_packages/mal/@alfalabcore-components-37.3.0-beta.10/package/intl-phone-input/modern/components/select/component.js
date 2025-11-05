import React, { useMemo, useCallback } from 'react';
import { VirtualOptionsList, Select } from '../../../../select/modern';
import { FlagIcon } from '../flag-icon/component.js';
import { EMPTY_COUNTRY_SELECT_FIELD, SelectField } from '../select-field/component.js';
import 'classnames';
import 'react-merge-refs';
import '@alfalab/hooks';
import '@alfalab/icons-glyph/WorldMagnifierMIcon';
import '../flag-icon/flagSprite.js';

const styles = {"component":"intl-phone-input__component_1eate","option":"intl-phone-input__option_1eate","flag":"intl-phone-input__flag_1eate","countryName":"intl-phone-input__countryName_1eate","dialCode":"intl-phone-input__dialCode_1eate"};
require('./index.css');

/* eslint-disable jsx-a11y/no-static-element-interactions */
const CountriesSelect = ({ disabled, size, selected, countries, fieldWidth, preventFlip, onChange, dataTestId, }) => {
    const options = useMemo(() => countries.map(({ iso2, dialCode, name }) => ({
        key: iso2,
        value: iso2,
        content: (React.createElement("span", { className: styles.option },
            React.createElement(FlagIcon, { country: iso2, className: styles.flag }),
            React.createElement("span", { className: styles.optionTextWrap },
                React.createElement("span", { className: styles.countryName }, name),
                React.createElement("span", { className: styles.dialCode },
                    "+",
                    dialCode)))),
    })), [countries]);
    const renderOptionsList = useCallback((props) => (React.createElement("div", { style: { width: fieldWidth || 0 } },
        React.createElement(VirtualOptionsList, { ...props }))), [fieldWidth]);
    return (React.createElement("div", { className: styles.component, onClick: (event) => event.stopPropagation() },
        React.createElement(Select, { dataTestId: dataTestId, disabled: disabled, size: size, options: options, selected: selected || EMPTY_COUNTRY_SELECT_FIELD, onChange: onChange, Field: SelectField, OptionsList: renderOptionsList, preventFlip: preventFlip })));
};

export { CountriesSelect };
