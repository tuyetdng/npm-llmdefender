var React = require('react');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var PerPageView = function (_a) {
    var pagesCount = _a.pagesCount, currentPageIndex = _a.currentPageIndex;
    return (React__default.default.createElement("span", { className: styles__default.default.component },
        currentPageIndex + 1,
        " \u0438\u0437 ",
        pagesCount,
        " \u0441\u0442\u0440\u0430\u043D\u0438\u0446"));
};

exports.PerPageView = PerPageView;
