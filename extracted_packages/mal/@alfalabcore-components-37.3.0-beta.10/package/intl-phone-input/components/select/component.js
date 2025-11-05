var components_selectField_component = require('../../component-6b11f230.js');
var React = require('react');
var coreComponentsSelect = require('../../../select');
var components_flagIcon_component = require('../flag-icon/component.js');
require('react-merge-refs');
require('classnames');
require('@alfalab/hooks');
require('@alfalab/icons-glyph/WorldMagnifierMIcon');
require('../flag-icon/flagSprite.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var styles = {"component":"intl-phone-input__component_1eate","option":"intl-phone-input__option_1eate","flag":"intl-phone-input__flag_1eate","countryName":"intl-phone-input__countryName_1eate","dialCode":"intl-phone-input__dialCode_1eate"};
require('./index.css');

var CountriesSelect = function (_a) {
    var disabled = _a.disabled, size = _a.size, selected = _a.selected, countries = _a.countries, fieldWidth = _a.fieldWidth, preventFlip = _a.preventFlip, onChange = _a.onChange, dataTestId = _a.dataTestId;
    var options = React.useMemo(function () {
        return countries.map(function (_a) {
            var iso2 = _a.iso2, dialCode = _a.dialCode, name = _a.name;
            return ({
                key: iso2,
                value: iso2,
                content: (React__default.default.createElement("span", { className: styles.option },
                    React__default.default.createElement(components_flagIcon_component.FlagIcon, { country: iso2, className: styles.flag }),
                    React__default.default.createElement("span", { className: styles.optionTextWrap },
                        React__default.default.createElement("span", { className: styles.countryName }, name),
                        React__default.default.createElement("span", { className: styles.dialCode },
                            "+",
                            dialCode)))),
            });
        });
    }, [countries]);
    var renderOptionsList = React.useCallback(function (props) { return (React__default.default.createElement("div", { style: { width: fieldWidth || 0 } },
        React__default.default.createElement(coreComponentsSelect.VirtualOptionsList, components_selectField_component.__assign({}, props)))); }, [fieldWidth]);
    return (React__default.default.createElement("div", { className: styles.component, onClick: function (event) { return event.stopPropagation(); } },
        React__default.default.createElement(coreComponentsSelect.Select, { dataTestId: dataTestId, disabled: disabled, size: size, options: options, selected: selected || components_selectField_component.EMPTY_COUNTRY_SELECT_FIELD, onChange: onChange, Field: components_selectField_component.SelectField, OptionsList: renderOptionsList, preventFlip: preventFlip })));
};

exports.CountriesSelect = CountriesSelect;
