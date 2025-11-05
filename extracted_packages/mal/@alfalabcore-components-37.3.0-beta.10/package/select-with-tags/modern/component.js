import React, { forwardRef, useState, useRef, useCallback } from 'react';
import { BaseSelect, OptionsList, Optgroup, Option, Arrow } from '../../select/modern';
import { TagList } from './components/tag-list/component.js';
import 'classnames';
import '../../tag/modern';
import '@alfalab/icons-glyph/CrossCompactMIcon';
import { filterOptions } from './utils/match.js';
import '../../form-control/modern';
import '@alfalab/hooks';
import './components/tag/component.js';
import './utils/calculate-collapse-size.js';

const SelectWithTags = forwardRef(({ OptionsList: OptionsList$1 = OptionsList, Optgroup: Optgroup$1 = Optgroup, Option: Option$1 = Option, Arrow: Arrow$1 = Arrow, value, selected, size = 'xl', onOpen, onInput, onChange, options, autocomplete = true, match, allowUnselect = true, collapseTagList = false, moveInputToNewLine = true, transformCollapsedTagText, transformTagText, Tag, ...restProps }, ref) => {
    const controlled = Boolean(selected);
    const [selectedTags, setSelectedTags] = useState(selected || []);
    const [isPopoverOpen, setPopoverOpen] = useState(false);
    const updatePopover = useRef(() => null);
    const resetValue = useCallback(() => {
        const event = { target: { value: '' } };
        onInput(event);
    }, [onInput]);
    const handleUpdatePopover = useCallback(() => {
        if (updatePopover && updatePopover.current) {
            updatePopover.current();
        }
    }, []);
    const handleDeleteTag = useCallback((deletedKey) => {
        let tags = selected || selectedTags;
        tags = tags.filter((tag) => {
            const key = typeof tag === 'string' ? tag : tag.key;
            return deletedKey !== key;
        });
        if (onChange) {
            onChange({ selectedMultiple: tags });
        }
        if (!controlled) {
            setSelectedTags(tags);
        }
    }, [controlled, onChange, selected, selectedTags]);
    const handleChange = useCallback(({ selectedMultiple, name, initiator }) => {
        if (onChange) {
            onChange({ selectedMultiple, name, initiator });
        }
        if (!controlled) {
            setSelectedTags(selectedMultiple);
        }
        if (value) {
            resetValue();
        }
    }, [onChange, controlled, value, resetValue]);
    const handleOpen = useCallback((payload) => {
        const { open } = payload;
        if (!open && value) {
            resetValue();
        }
        setPopoverOpen(open);
        if (onOpen)
            onOpen(payload);
    }, [onOpen, resetValue, value]);
    const filteredOptions = filterOptions(options, value, match);
    const isAutocomplete = autocomplete || Boolean(match);
    return (React.createElement(BaseSelect, { ...restProps, ref: ref, Option: Option$1, Field: TagList, Optgroup: Optgroup$1, OptionsList: OptionsList$1, Arrow: Arrow$1, multiple: true, updatePopover: updatePopover, allowUnselect: allowUnselect, showEmptyOptionsList: true, fieldProps: {
            value,
            autocomplete: isAutocomplete,
            onInput,
            handleDeleteTag,
            Tag,
            collapseTagList,
            moveInputToNewLine,
            transformCollapsedTagText,
            transformTagText,
            handleUpdatePopover,
            isPopoverOpen,
        }, selected: selected || selectedTags, autocomplete: isAutocomplete, size: size, options: filteredOptions, onChange: handleChange, onOpen: handleOpen }));
});

export { SelectWithTags };
