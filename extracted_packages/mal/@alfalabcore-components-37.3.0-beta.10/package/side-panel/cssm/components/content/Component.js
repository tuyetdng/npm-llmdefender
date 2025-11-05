var React = require('react');
var cn = require('classnames');
var Context = require('../../Context.js');
var styles = require('./index.module.css');
require('../../../../base-modal/cssm');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var Content = function (_a) {
    var children = _a.children, className = _a.className, dataTestId = _a.dataTestId;
    var contentRef = React.useContext(Context.ModalContext).contentRef;
    return (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.content, className, styles__default.default.flex), ref: contentRef, "data-test-id": dataTestId }, children));
};

exports.Content = Content;
