var tslib_es6 = require('../../tslib.es6-c54e6db5.js');
var React = require('react');
var cn = require('classnames');
var components_trow_Component = require('../trow/Component.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"row":"table__row_nwlhi","selected":"table__selected_nwlhi","expanded":"table__expanded_nwlhi","expandable":"table__expandable_nwlhi"};
require('./index.css');

var TExpandableRow = function (_a) {
    var _b, _c;
    var className = _a.className, selected = _a.selected, expanded = _a.expanded, _d = _a.defaultExpanded, defaultExpanded = _d === void 0 ? false : _d, _e = _a.onToggle, onToggle = _e === void 0 ? function () { return null; } : _e, _f = _a.renderContent, renderContent = _f === void 0 ? function () { return null; } : _f, restProps = tslib_es6.__rest(_a, ["className", "selected", "expanded", "defaultExpanded", "onToggle", "renderContent"]);
    var _g = React.useState(defaultExpanded), expandedState = _g[0], setExpandedState = _g[1];
    var uncontrolled = expanded === undefined;
    var isExpanded = (uncontrolled ? expandedState : expanded);
    var handleToggle = function () {
        if (uncontrolled) {
            setExpandedState(!isExpanded);
        }
        onToggle(isExpanded);
    };
    return (React__default.default.createElement(React__default.default.Fragment, null,
        React__default.default.createElement(components_trow_Component.TRow, tslib_es6.__assign({ className: cn__default.default(styles.row, className, (_b = {},
                _b[styles.selected] = selected,
                _b[styles.expanded] = isExpanded,
                _b)), selected: selected, onClick: handleToggle }, restProps)),
        React__default.default.createElement("tr", { className: cn__default.default(styles.expandable, (_c = {}, _c[styles.expanded] = isExpanded, _c)) }, renderContent(isExpanded))));
};

exports.TExpandableRow = TExpandableRow;
