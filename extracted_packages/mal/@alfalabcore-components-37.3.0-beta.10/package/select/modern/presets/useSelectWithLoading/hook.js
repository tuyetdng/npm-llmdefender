import React from 'react';
import { Skeleton } from '../../../../skeleton/modern';
import { Option } from '../../components/option/Component.js';
import 'classnames';
import '../../components/base-select-mobile/checkmark/Component.js';
import '../../../../badge/modern';
import '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import '@alfalab/icons-glyph/CheckmarkMIcon';
import '../../components/checkmark/Component.js';
import '../../../../checkbox/modern';

const styles = {"skeleton":"select__skeleton_1he75"};
require('./index.css');

function useSelectWithLoading({ loading = false, visibleOptions = 6, Option: Option$1 = Option, }) {
    const renderOption = (props) => (React.createElement(Option$1, { ...props, Checkmark: null, highlighted: loading ? false : props.highlighted }));
    const options = Array(visibleOptions)
        .fill(0)
        .map((_, key) => ({
        key: `loading-${key}`,
        disabled: true,
        content: React.createElement(Skeleton, { className: styles.skeleton, visible: true }),
    }));
    if (!loading)
        return null;
    return {
        Option: renderOption,
        options,
    };
}

export { useSelectWithLoading };
