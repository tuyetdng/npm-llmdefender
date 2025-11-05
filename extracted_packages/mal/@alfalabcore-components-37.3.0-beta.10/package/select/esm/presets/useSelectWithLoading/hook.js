import { a as __assign } from '../../tslib.es6-0bbcaa10.js';
import React from 'react';
import { Skeleton } from '../../../../skeleton/esm';
import { Option } from '../../components/option/Component.js';
import 'classnames';
import '../../components/base-select-mobile/checkmark/Component.js';
import '../../../../badge/esm';
import '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import '@alfalab/icons-glyph/CheckmarkMIcon';
import '../../components/checkmark/Component.js';
import '../../../../checkbox/esm';

var styles = {"skeleton":"select__skeleton_1he75"};
require('./index.css');

function useSelectWithLoading(_a) {
    var _b = _a.loading, loading = _b === void 0 ? false : _b, _c = _a.visibleOptions, visibleOptions = _c === void 0 ? 6 : _c, _d = _a.Option, Option$1 = _d === void 0 ? Option : _d;
    var renderOption = function (props) { return (React.createElement(Option$1, __assign({}, props, { Checkmark: null, highlighted: loading ? false : props.highlighted }))); };
    var options = Array(visibleOptions)
        .fill(0)
        .map(function (_, key) { return ({
        key: "loading-".concat(key),
        disabled: true,
        content: React.createElement(Skeleton, { className: styles.skeleton, visible: true }),
    }); });
    if (!loading)
        return null;
    return {
        Option: renderOption,
        options: options,
    };
}

export { useSelectWithLoading };
