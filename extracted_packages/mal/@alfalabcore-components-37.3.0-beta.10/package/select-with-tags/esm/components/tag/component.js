import { _ as __rest, a as __assign } from '../../tslib.es6-411b8c4a.js';
import React, { useCallback } from 'react';
import cn from 'classnames';
import { Tag as Tag$1 } from '../../../../tag/esm';
import { CrossCompactMIcon } from '@alfalab/icons-glyph/CrossCompactMIcon';

var styles = {"tag":"select-with-tags__tag_m6n5j","tagNoClose":"select-with-tags__tagNoClose_m6n5j","tagContentWrap":"select-with-tags__tagContentWrap_m6n5j","tagCross":"select-with-tags__tagCross_m6n5j"};
require('./index.css');

var Tag = function (_a) {
    var _b;
    var _c = _a.option, content = _c.content, key = _c.key, onClick = _a.onClick, handleDeleteTag = _a.handleDeleteTag, props = __rest(_a, ["option", "onClick", "handleDeleteTag"]);
    var handleClick = useCallback(function () {
        if (handleDeleteTag) {
            handleDeleteTag(key);
        }
    }, [handleDeleteTag, key]);
    return (React.createElement(Tag$1, __assign({ key: key, size: 'xxs', onClick: onClick, checked: !!handleDeleteTag, className: cn(styles.tag, (_b = {}, _b[styles.tagNoClose] = !handleDeleteTag, _b)) }, props),
        React.createElement("span", { className: styles.tagContentWrap },
            content,
            handleDeleteTag && (
            // eslint-disable-next-line
            React.createElement("span", { className: styles.tagCross, onClick: handleClick },
                React.createElement(CrossCompactMIcon, null))))));
};

export { Tag };
