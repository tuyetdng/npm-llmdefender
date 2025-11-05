var React = require('react');
var coreComponentsTypography = require('../../../typography');
var utils_splitFilename = require('../../utils/split-filename.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var styles = {"info":"gallery__info_1uhkg","filenameHead":"gallery__filenameHead_1uhkg","filenameContainer":"gallery__filenameContainer_1uhkg","description":"gallery__description_1uhkg"};
require('./index.css');

var HeaderInfoBlock = function (_a) {
    var filename = _a.filename, description = _a.description;
    var _b = utils_splitFilename.splitFilename(filename), head = _b[0], tail = _b[1];
    return (React__default.default.createElement("div", { className: styles.info },
        React__default.default.createElement("div", { className: styles.filenameContainer },
            React__default.default.createElement(coreComponentsTypography.Typography.Title, { tag: 'h1', className: styles.filenameHead, view: 'xsmall', font: 'system', color: 'primary-inverted' }, head),
            React__default.default.createElement(coreComponentsTypography.Typography.Title, { tag: 'h1', view: 'xsmall', font: 'system', color: 'primary-inverted' }, tail)),
        description ? (React__default.default.createElement(coreComponentsTypography.Typography.Text, { className: styles.description, tag: 'div', view: 'primary-medium', color: 'secondary-inverted' }, description)) : null));
};

exports.HeaderInfoBlock = HeaderInfoBlock;
