import React, { useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { useFocus } from '@alfalab/hooks';
import WorldMagnifierMIcon from '@alfalab/icons-glyph/WorldMagnifierMIcon';
import { FlagIcon } from '../flag-icon/component.js';
import '../flag-icon/flagSprite.js';

const styles = {"component":"intl-phone-input__component_1vosh","flagIconContainer":"intl-phone-input__flagIconContainer_1vosh","emptyCountryIcon":"intl-phone-input__emptyCountryIcon_1vosh","disabled":"intl-phone-input__disabled_1vosh","inner":"intl-phone-input__inner_1vosh","l":"intl-phone-input__l_1vosh","xl":"intl-phone-input__xl_1vosh","focusVisible":"intl-phone-input__focusVisible_1vosh"};
require('./index.css');

const EMPTY_COUNTRY_SELECT_FIELD = {
    value: 'EMPTY_COUNTRY_SELECT_VALUE',
    key: 'EMPTY_COUNTRY_SELECT_KEY',
};
const SelectField = ({ selected, Arrow, size, disabled, innerProps = {}, }) => {
    const wrapperRef = useRef(null);
    const [focusVisible] = useFocus(wrapperRef, 'keyboard');
    const ref = innerProps.ref ? mergeRefs([innerProps.ref, wrapperRef]) : wrapperRef;
    return (React.createElement("div", { ref: ref, className: cn(styles.component, size && styles[size], {
            [styles.focusVisible]: focusVisible,
            [styles.disabled]: disabled,
        }) },
        React.createElement("div", { ...innerProps, className: styles.inner },
            React.createElement("span", { className: styles.flagIconContainer }, !selected || selected === EMPTY_COUNTRY_SELECT_FIELD ? (React.createElement(WorldMagnifierMIcon, { className: styles.emptyCountryIcon })) : (React.createElement(FlagIcon, { country: selected.value }))),
            Arrow)));
};

export { EMPTY_COUNTRY_SELECT_FIELD, SelectField };
