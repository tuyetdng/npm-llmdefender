/// <reference types="react" />
import React from 'react';
import { BaseSelectProps, OptionProps, OptionShape } from "../../typings";
type useSelectWithLoadingProps = {
    loading?: boolean;
    visibleOptions?: BaseSelectProps['visibleOptions'];
    Option?: React.FC<OptionProps>;
};
declare function useSelectWithLoading({ loading, visibleOptions, Option, }: useSelectWithLoadingProps): {
    Option: (props: OptionProps) => JSX.Element;
    options: OptionShape[];
} | null;
export { useSelectWithLoading };
