import { _ as __rest, a as __assign } from './tslib.es6-411b8c4a.js';
import React, { forwardRef, useState, useRef, useCallback } from 'react';
import { BaseSelect, OptionsList, Optgroup, Option, Arrow } from '../../select/esm';
import { TagList } from './components/tag-list/component.js';
import 'classnames';
import '../../tag/esm';
import '@alfalab/icons-glyph/CrossCompactMIcon';
import { filterOptions } from './utils/match.js';
import '../../form-control/esm';
import '@alfalab/hooks';
import './components/tag/component.js';
import './utils/calculate-collapse-size.js';

var SelectWithTags = forwardRef(function (_a, ref) {
    var _b = _a.OptionsList, OptionsList$1 = _b === void 0 ? OptionsList : _b, _c = _a.Optgroup, Optgroup$1 = _c === void 0 ? Optgroup : _c, _d = _a.Option, Option$1 = _d === void 0 ? Option : _d, _e = _a.Arrow, Arrow$1 = _e === void 0 ? Arrow : _e, value = _a.value, selected = _a.selected, _f = _a.size, size = _f === void 0 ? 'xl' : _f, onOpen = _a.onOpen, onInput = _a.onInput, onChange = _a.onChange, options = _a.options, _g = _a.autocomplete, autocomplete = _g === void 0 ? true : _g, match = _a.match, _h = _a.allowUnselect, allowUnselect = _h === void 0 ? true : _h, _j = _a.collapseTagList, collapseTagList = _j === void 0 ? false : _j, _k = _a.moveInputToNewLine, moveInputToNewLine = _k === void 0 ? true : _k, transformCollapsedTagText = _a.transformCollapsedTagText, transformTagText = _a.transformTagText, Tag = _a.Tag, restProps = __rest(_a, ["OptionsList", "Optgroup", "Option", "Arrow", "value", "selected", "size", "onOpen", "onInput", "onChange", "options", "autocomplete", "match", "allowUnselect", "collapseTagList", "moveInputToNewLine", "transformCollapsedTagText", "transformTagText", "Tag"]);
    var controlled = Boolean(selected);
    var _l = useState(selected || []), selectedTags = _l[0], setSelectedTags = _l[1];
    var _m = useState(false), isPopoverOpen = _m[0], setPopoverOpen = _m[1];
    var updatePopover = useRef(function () { return null; });
    var resetValue = useCallback(function () {
        var event = { target: { value: '' } };
        onInput(event);
    }, [onInput]);
    var handleUpdatePopover = useCallback(function () {
        if (updatePopover && updatePopover.current) {
            updatePopover.current();
        }
    }, []);
    var handleDeleteTag = useCallback(function (deletedKey) {
        var tags = selected || selectedTags;
        tags = tags.filter(function (tag) {
            var key = typeof tag === 'string' ? tag : tag.key;
            return deletedKey !== key;
        });
        if (onChange) {
            onChange({ selectedMultiple: tags });
        }
        if (!controlled) {
            setSelectedTags(tags);
        }
    }, [controlled, onChange, selected, selectedTags]);
    var handleChange = useCallback(function (_a) {
        var selectedMultiple = _a.selectedMultiple, name = _a.name, initiator = _a.initiator;
        if (onChange) {
            onChange({ selectedMultiple: selectedMultiple, name: name, initiator: initiator });
        }
        if (!controlled) {
            setSelectedTags(selectedMultiple);
        }
        if (value) {
            resetValue();
        }
    }, [onChange, controlled, value, resetValue]);
    var handleOpen = useCallback(function (payload) {
        var open = payload.open;
        if (!open && value) {
            resetValue();
        }
        setPopoverOpen(open);
        if (onOpen)
            onOpen(payload);
    }, [onOpen, resetValue, value]);
    var filteredOptions = filterOptions(options, value, match);
    var isAutocomplete = autocomplete || Boolean(match);
    return (React.createElement(BaseSelect, __assign({}, restProps, { ref: ref, Option: Option$1, Field: TagList, Optgroup: Optgroup$1, OptionsList: OptionsList$1, Arrow: Arrow$1, multiple: true, updatePopover: updatePopover, allowUnselect: allowUnselect, showEmptyOptionsList: true, fieldProps: {
            value: value,
            autocomplete: isAutocomplete,
            onInput: onInput,
            handleDeleteTag: handleDeleteTag,
            Tag: Tag,
            collapseTagList: collapseTagList,
            moveInputToNewLine: moveInputToNewLine,
            transformCollapsedTagText: transformCollapsedTagText,
            transformTagText: transformTagText,
            handleUpdatePopover: handleUpdatePopover,
            isPopoverOpen: isPopoverOpen,
        }, selected: selected || selectedTags, autocomplete: isAutocomplete, size: size, options: filteredOptions, onChange: handleChange, onOpen: handleOpen })));
});

export { SelectWithTags };
