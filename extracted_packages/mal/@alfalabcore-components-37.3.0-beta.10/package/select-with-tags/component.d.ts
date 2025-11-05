/// <reference types="react" />
import React from 'react';
import { BaseSelectProps } from "../select";
declare const SelectWithTags: React.ForwardRefExoticComponent<Omit<BaseSelectProps, "onChange" | "selected" | "multiple" | "autocomplete" | "nativeSelect" | "Field"> & {
    value: string;
    onInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selected?: (string | import("../select").OptionShape)[] | undefined;
    onChange?: ((payload: {
        selectedMultiple: (string | import("../select").OptionShape)[];
        initiator?: import("../select").OptionShape | null | undefined;
        name?: string | undefined;
    }) => void) | undefined;
    autocomplete?: boolean | undefined;
    match?: import("./types").OptionMatcher | undefined;
    Tag?: import("./types").TagComponent | undefined;
    collapseTagList?: boolean | undefined;
    moveInputToNewLine?: boolean | undefined;
    transformCollapsedTagText?: ((collapsedCount: number) => string) | undefined;
    transformTagText?: ((tagText?: React.ReactNode) => React.ReactNode) | undefined;
} & React.RefAttributes<HTMLInputElement>>;
export { SelectWithTags };
