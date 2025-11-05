var tslib_es6 = require('../tslib.es6-fddeadfc.js');
var React = require('react');
var cn = require('classnames');
var utils_index = require('../utils/index.js');
var guttersStyles = require('../gutters.module.css');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var guttersStyles__default = /*#__PURE__*/_interopDefaultCompat(guttersStyles);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var Row = function (_a) {
    var _b = _a.tag, Component = _b === void 0 ? 'div' : _b, className = _a.className, _c = _a.gutter, gutter = _c === void 0 ? {
        mobile: {
            s: 16,
        },
        desktop: {
            m: 24,
        },
    } : _c, align = _a.align, _d = _a.justify, justify = _d === void 0 ? 'between' : _d, children = _a.children, dataTestId = _a.dataTestId;
    var classNames = React.useMemo(function () { return utils_index.createClassNames({ gutter: gutter }, guttersStyles__default.default); }, [gutter]);
    return (React__default.default.createElement(Component, { className: cn__default.default.apply(void 0, tslib_es6.__spreadArray(tslib_es6.__spreadArray([guttersStyles__default.default.row,
            styles__default.default.component,
            align && styles__default.default[align],
            styles__default.default[justify]], classNames, false), [className], false)), "data-test-id": dataTestId }, children));
};

exports.Row = Row;
