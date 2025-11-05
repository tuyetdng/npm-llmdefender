/// <reference types="react" />
import { BaseSelectProps, OptionShape } from "./index-3e68f8db";
type useSelectWithApplyProps = {
    /**
     * Список выбранных пунктов
     */
    selected: BaseSelectProps['selected'];
    /**
     * Список вариантов выбора
     */
    options: BaseSelectProps['options'];
    /**
     * Обработчик выбора
     */
    onChange: BaseSelectProps['onChange'];
    /**
     * Компонент выпадающего меню
     */
    OptionsList?: BaseSelectProps['OptionsList'];
    /**
     * Показывать кнопку очистки
     */
    showClear?: boolean;
    /**
     * Показывать пункт "Выбрать все"
     */
    showSelectAll?: boolean;
};
declare const SELECT_ALL_KEY = "select_all";
declare function useSelectWithApply({ options, selected, onChange, OptionsList, showClear, showSelectAll, }: useSelectWithApplyProps): {
    OptionsList: import("react").ForwardRefExoticComponent<import("./index-3e68f8db").OptionsListProps & {
        showClear?: boolean | undefined;
        onClose?: (() => void) | undefined;
        selectedDraft?: OptionShape[] | undefined;
        OptionsList?: import("react").FC<import("./index-3e68f8db").OptionsListProps & import("react").RefAttributes<unknown>> | undefined;
    } & import("react").RefAttributes<unknown>>;
    optionsListProps: {
        OptionsList: import("react").FC<import("./index-3e68f8db").OptionsListProps> | undefined;
        showClear: boolean;
        onClear: () => void;
        onApply: () => void;
        onClose: () => void;
        selectedDraft: OptionShape[];
    };
    allowUnselect: boolean;
    multiple: boolean;
    options: (OptionShape | import("./index-3e68f8db").GroupShape | {
        key: string;
        content: string;
    })[];
    onChange: (payload: import("./index-3e68f8db").BaseSelectChangePayload) => void;
    selected: string | OptionShape | (string | OptionShape)[] | null | undefined;
};
export { SELECT_ALL_KEY, useSelectWithApply };
