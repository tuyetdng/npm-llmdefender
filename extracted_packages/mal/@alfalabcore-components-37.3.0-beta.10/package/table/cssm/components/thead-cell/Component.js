var tslib_es6 = require('../../tslib.es6-bbd6cd2a.js');
var React = require('react');
var cn = require('classnames');
var components_tableContext_index = require('../table-context/index.js');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var THeadCell = function (_a) {
    var _b;
    var children = _a.children, className = _a.className, dataTestId = _a.dataTestId, style = _a.style, width = _a.width, textAlign = _a.textAlign, hidden = _a.hidden, restProps = tslib_es6.__rest(_a, ["children", "className", "dataTestId", "style", "width", "textAlign", "hidden"]);
    var _c = React.useContext(components_tableContext_index.TableContext), compactHorizontal = _c.compactHorizontal, stickyHeader = _c.stickyHeader;
    if (hidden)
        return null;
    return (React__default.default.createElement("th", tslib_es6.__assign({ className: cn__default.default(styles__default.default.component, className, compactHorizontal && styles__default.default.compactHorizontal, (_b = {},
            _b[styles__default.default.stickyHeader] = stickyHeader,
            _b)), style: tslib_es6.__assign(tslib_es6.__assign({}, style), { width: width, textAlign: textAlign }), "data-test-id": dataTestId }, restProps), children));
};

exports.THeadCell = THeadCell;
