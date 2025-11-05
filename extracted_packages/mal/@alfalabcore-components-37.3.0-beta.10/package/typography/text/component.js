var colors_module = require('../colors.module-f2db4c0a.js');
var React = require('react');
var cn = require('classnames');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"paragraph":"typography__paragraph_9xfoj","paragraphWithMargins":"typography__paragraphWithMargins_9xfoj","primary-large":"typography__primary-large_9xfoj","primary-medium":"typography__primary-medium_9xfoj","primary-small":"typography__primary-small_9xfoj","secondary-large":"typography__secondary-large_9xfoj","secondary-medium":"typography__secondary-medium_9xfoj","secondary-small":"typography__secondary-small_9xfoj","component":"typography__component_9xfoj","caps":"typography__caps_9xfoj","bold":"typography__bold_9xfoj","medium":"typography__medium_9xfoj","regular":"typography__regular_9xfoj","monospace":"typography__monospace_9xfoj"};
require('./index.css');

var Text = React.forwardRef(function (_a, ref) {
    var _b;
    var _c = _a.view, view = _c === void 0 ? 'primary-medium' : _c, _d = _a.tag, Component = _d === void 0 ? 'span' : _d, weight = _a.weight, _e = _a.monospaceNumbers, monospaceNumbers = _e === void 0 ? false : _e, _f = _a.defaultMargins, defaultMargins = _f === void 0 ? true : _f, color = _a.color, className = _a.className, dataTestId = _a.dataTestId, children = _a.children, restProps = colors_module.__rest(_a, ["view", "tag", "weight", "monospaceNumbers", "defaultMargins", "color", "className", "dataTestId", "children"]);
    return (React__default.default.createElement(Component, colors_module.__assign({ className: cn__default.default((_b = {},
            _b[styles.paragraph] = Component === 'p' && !defaultMargins,
            _b[styles.paragraphWithMargins] = Component === 'p' && defaultMargins,
            _b[styles.monospace] = monospaceNumbers,
            _b), className, color && colors_module.colors[color], styles[view], weight && styles[weight]), "data-test-id": dataTestId, ref: ref }, restProps), children));
});

exports.Text = Text;
