import React from 'react';
import { Typography } from '../../../../typography/modern';
import { splitFilename } from '../../utils/split-filename.js';

const styles = {"info":"gallery__info_1uhkg","filenameHead":"gallery__filenameHead_1uhkg","filenameContainer":"gallery__filenameContainer_1uhkg","description":"gallery__description_1uhkg"};
require('./index.css');

const HeaderInfoBlock = ({ filename, description }) => {
    const [head, tail] = splitFilename(filename);
    return (React.createElement("div", { className: styles.info },
        React.createElement("div", { className: styles.filenameContainer },
            React.createElement(Typography.Title, { tag: 'h1', className: styles.filenameHead, view: 'xsmall', font: 'system', color: 'primary-inverted' }, head),
            React.createElement(Typography.Title, { tag: 'h1', view: 'xsmall', font: 'system', color: 'primary-inverted' }, tail)),
        description ? (React.createElement(Typography.Text, { className: styles.description, tag: 'div', view: 'primary-medium', color: 'secondary-inverted' }, description)) : null));
};

export { HeaderInfoBlock };
