var tslib_es6 = require('../../tslib.es6-0e9bf404.js');
var React = require('react');
var coreComponentsSkeleton = require('../../../../skeleton/cssm');
var components_option_Component = require('../../components/option/Component.js');
var styles = require('./index.module.css');
require('classnames');
require('../../components/base-select-mobile/checkmark/Component.js');
require('../../../../badge/cssm');
require('@alfalab/icons-glyph/CheckmarkCircleMIcon');
require('@alfalab/icons-glyph/CheckmarkMIcon');
require('../../components/base-select-mobile/checkmark/index.module.css');
require('../../components/checkmark/Component.js');
require('../../../../checkbox/cssm');
require('../../components/checkmark/index.module.css');
require('../../components/option/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

function useSelectWithLoading(_a) {
    var _b = _a.loading, loading = _b === void 0 ? false : _b, _c = _a.visibleOptions, visibleOptions = _c === void 0 ? 6 : _c, _d = _a.Option, Option = _d === void 0 ? components_option_Component.Option : _d;
    var renderOption = function (props) { return (React__default.default.createElement(Option, tslib_es6.__assign({}, props, { Checkmark: null, highlighted: loading ? false : props.highlighted }))); };
    var options = Array(visibleOptions)
        .fill(0)
        .map(function (_, key) { return ({
        key: "loading-".concat(key),
        disabled: true,
        content: React__default.default.createElement(coreComponentsSkeleton.Skeleton, { className: styles__default.default.skeleton, visible: true }),
    }); });
    if (!loading)
        return null;
    return {
        Option: renderOption,
        options: options,
    };
}

exports.useSelectWithLoading = useSelectWithLoading;
