var tslib_es6 = require('../../tslib.es6-c54e6db5.js');
var React = require('react');
var cn = require('classnames');
var components_tableContext_index = require('../table-context/index.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"table__component_dog0d","compactHorizontal":"table__compactHorizontal_dog0d","compact":"table__compact_dog0d"};
require('./index.css');

var TCell = function (_a) {
    var className = _a.className, style = _a.style, dataTestId = _a.dataTestId, children = _a.children, index = _a.index, restProps = tslib_es6.__rest(_a, ["className", "style", "dataTestId", "children", "index"]);
    var _b = React.useContext(components_tableContext_index.TableContext), columnsConfiguration = _b.columnsConfiguration, compactView = _b.compactView, compactHorizontal = _b.compactHorizontal;
    var column = index === undefined ? null : columnsConfiguration[index];
    var width = column === null || column === void 0 ? void 0 : column.width;
    var textAlign = column === null || column === void 0 ? void 0 : column.textAlign;
    var hidden = (column === null || column === void 0 ? void 0 : column.hidden) || false;
    if (hidden)
        return null;
    return (React__default.default.createElement("td", tslib_es6.__assign({ className: cn__default.default(styles.component, className, compactView && styles.compact, compactHorizontal && styles.compactHorizontal), style: tslib_es6.__assign(tslib_es6.__assign({}, style), { width: width, textAlign: textAlign }), "data-test-id": dataTestId }, restProps), children));
};

exports.TCell = TCell;
