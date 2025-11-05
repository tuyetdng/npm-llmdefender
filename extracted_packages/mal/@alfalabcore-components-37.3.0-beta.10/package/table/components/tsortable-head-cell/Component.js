var tslib_es6 = require('../../tslib.es6-c54e6db5.js');
var React = require('react');
var cn = require('classnames');
var components_theadCell_Component = require('../thead-cell/Component.js');
var components_tsortableHeadCell_sortIconAsc = require('./sort-icon-asc.js');
var components_tsortableHeadCell_sortIconDesc = require('./sort-icon-desc.js');
var components_tsortableHeadCell_sortIconUnset = require('./sort-icon-unset.js');
require('../table-context/index.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"table__component_174gw","content":"table__content_174gw","icon":"table__icon_174gw","reverse":"table__reverse_174gw","sorted":"table__sorted_174gw"};
require('./index.css');

var TSortableHeadCell = function (_a) {
    var _b, _c;
    var children = _a.children, className = _a.className, defaultIsSortedDesc = _a.defaultIsSortedDesc, isSortedDesc = _a.isSortedDesc, textAlign = _a.textAlign, onSort = _a.onSort, restProps = tslib_es6.__rest(_a, ["children", "className", "defaultIsSortedDesc", "isSortedDesc", "textAlign", "onSort"]);
    var SortIcon = React.useMemo(function () {
        var value = isSortedDesc;
        if (value === undefined)
            value = defaultIsSortedDesc;
        if (typeof value === 'boolean')
            return value ? components_tsortableHeadCell_sortIconDesc.SortIconDesc : components_tsortableHeadCell_sortIconAsc.SortIconAsc;
        return components_tsortableHeadCell_sortIconUnset.SortIconUnset;
    }, [defaultIsSortedDesc, isSortedDesc]);
    return (React__default.default.createElement(components_theadCell_Component.THeadCell, tslib_es6.__assign({ className: cn__default.default(className, styles.component) }, restProps),
        React__default.default.createElement("div", { className: cn__default.default(styles.content, (_b = {}, _b[styles.reverse] = textAlign === 'right', _b)) },
            children,
            React__default.default.createElement(SortIcon, { onClick: onSort, className: cn__default.default(styles.icon, (_c = {},
                    _c[styles.sorted] = isSortedDesc !== undefined,
                    _c)) }))));
};

exports.TSortableHeadCell = TSortableHeadCell;
