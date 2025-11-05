var tslib_es6 = require('../../tslib.es6-c54e6db5.js');
var React = require('react');
var cn = require('classnames');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"table__component_zaon3","withoutBorder":"table__withoutBorder_zaon3","clickable":"table__clickable_zaon3","selected":"table__selected_zaon3"};
require('./index.css');

var TRow = function (_a) {
    var _b;
    var children = _a.children, className = _a.className, selected = _a.selected, withoutBorder = _a.withoutBorder, dataTestId = _a.dataTestId, restProps = tslib_es6.__rest(_a, ["children", "className", "selected", "withoutBorder", "dataTestId"]);
    return (React__default.default.createElement("tr", tslib_es6.__assign({ className: cn__default.default(styles.component, className, (_b = {},
            _b[styles.clickable] = typeof restProps.onClick !== 'undefined',
            _b[styles.selected] = selected,
            _b[styles.withoutBorder] = withoutBorder,
            _b)), "data-test-id": dataTestId }, restProps), React__default.default.Children.map(children, function (child, index) { return React__default.default.cloneElement(child, { index: index }); })));
};

exports.TRow = TRow;
