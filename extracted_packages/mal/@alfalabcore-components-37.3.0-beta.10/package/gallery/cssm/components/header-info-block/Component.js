var React = require('react');
var coreComponentsTypography = require('../../../../typography/cssm');
var utils_splitFilename = require('../../utils/split-filename.js');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var HeaderInfoBlock = function (_a) {
    var filename = _a.filename, description = _a.description;
    var _b = utils_splitFilename.splitFilename(filename), head = _b[0], tail = _b[1];
    return (React__default.default.createElement("div", { className: styles__default.default.info },
        React__default.default.createElement("div", { className: styles__default.default.filenameContainer },
            React__default.default.createElement(coreComponentsTypography.Typography.Title, { tag: 'h1', className: styles__default.default.filenameHead, view: 'xsmall', font: 'system', color: 'primary-inverted' }, head),
            React__default.default.createElement(coreComponentsTypography.Typography.Title, { tag: 'h1', view: 'xsmall', font: 'system', color: 'primary-inverted' }, tail)),
        description ? (React__default.default.createElement(coreComponentsTypography.Typography.Text, { className: styles__default.default.description, tag: 'div', view: 'primary-medium', color: 'secondary-inverted' }, description)) : null));
};

exports.HeaderInfoBlock = HeaderInfoBlock;
