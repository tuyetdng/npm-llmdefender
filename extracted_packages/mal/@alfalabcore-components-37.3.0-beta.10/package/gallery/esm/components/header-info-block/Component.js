import React from 'react';
import { Typography } from '../../../../typography/esm';
import { splitFilename } from '../../utils/split-filename.js';

var styles = {"info":"gallery__info_1uhkg","filenameHead":"gallery__filenameHead_1uhkg","filenameContainer":"gallery__filenameContainer_1uhkg","description":"gallery__description_1uhkg"};
require('./index.css');

var HeaderInfoBlock = function (_a) {
    var filename = _a.filename, description = _a.description;
    var _b = splitFilename(filename), head = _b[0], tail = _b[1];
    return (React.createElement("div", { className: styles.info },
        React.createElement("div", { className: styles.filenameContainer },
            React.createElement(Typography.Title, { tag: 'h1', className: styles.filenameHead, view: 'xsmall', font: 'system', color: 'primary-inverted' }, head),
            React.createElement(Typography.Title, { tag: 'h1', view: 'xsmall', font: 'system', color: 'primary-inverted' }, tail)),
        description ? (React.createElement(Typography.Text, { className: styles.description, tag: 'div', view: 'primary-medium', color: 'secondary-inverted' }, description)) : null));
};

export { HeaderInfoBlock };
