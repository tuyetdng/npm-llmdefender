var gutters_module = require('../gutters.module-e62e9997.js');
var React = require('react');
var cn = require('classnames');
var utils_index = require('../utils/index.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"grid__component_g8xez","top":"grid__top_g8xez","middle":"grid__middle_g8xez","bottom":"grid__bottom_g8xez","left":"grid__left_g8xez","center":"grid__center_g8xez","right":"grid__right_g8xez","around":"grid__around_g8xez","between":"grid__between_g8xez"};
require('./index.css');

var Row = function (_a) {
    var _b = _a.tag, Component = _b === void 0 ? 'div' : _b, className = _a.className, _c = _a.gutter, gutter = _c === void 0 ? {
        mobile: {
            s: 16,
        },
        desktop: {
            m: 24,
        },
    } : _c, align = _a.align, _d = _a.justify, justify = _d === void 0 ? 'between' : _d, children = _a.children, dataTestId = _a.dataTestId;
    var classNames = React.useMemo(function () { return utils_index.createClassNames({ gutter: gutter }, gutters_module.guttersStyles); }, [gutter]);
    return (React__default.default.createElement(Component, { className: cn__default.default.apply(void 0, gutters_module.__spreadArray(gutters_module.__spreadArray([gutters_module.guttersStyles.row,
            styles.component,
            align && styles[align],
            styles[justify]], classNames, false), [className], false)), "data-test-id": dataTestId }, children));
};

exports.Row = Row;
