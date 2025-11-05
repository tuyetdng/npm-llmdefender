var React = require('react');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var DEFAULT_TABLE_CONTEXT = {
    columnsConfiguration: [],
    compactView: false,
    stickyHeader: false,
    compactHorizontal: false,
    wrapperRef: { current: null },
};
var TableContext = React__default.default.createContext(DEFAULT_TABLE_CONTEXT);

exports.DEFAULT_TABLE_CONTEXT = DEFAULT_TABLE_CONTEXT;
exports.TableContext = TableContext;
