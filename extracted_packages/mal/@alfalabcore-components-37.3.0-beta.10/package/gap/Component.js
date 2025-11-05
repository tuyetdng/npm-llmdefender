var React = require('react');
var cn = require('classnames');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"grid-gap":"gap__gap_12ekk","gap":"gap__gap_12ekk","vertical":"gap__vertical_12ekk","horizontal":"gap__horizontal_12ekk"};
require('./index.css');

var Gap = function (_a) {
    var size = _a.size, _b = _a.direction, direction = _b === void 0 ? 'vertical' : _b, _c = _a.tag, Component = _c === void 0 ? 'div' : _c, className = _a.className, dataTestId = _a.dataTestId;
    return (React__default.default.createElement(Component, { "data-test-id": dataTestId, "data-gap-size": size, className: cn__default.default(styles.gap, styles[direction], className) }));
};

exports.Gap = Gap;
