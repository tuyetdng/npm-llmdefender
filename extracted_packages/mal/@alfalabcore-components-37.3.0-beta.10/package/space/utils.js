var React = require('react');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var SpaceContext = React__default.default.createContext({
    length: 0,
    horizontalSize: 0,
    verticalSize: 0,
});

exports.SpaceContext = SpaceContext;
