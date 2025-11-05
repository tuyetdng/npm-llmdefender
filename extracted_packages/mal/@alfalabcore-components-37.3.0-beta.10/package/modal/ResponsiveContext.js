var React = require('react');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var ResponsiveContext = React__default.default.createContext({
    view: 'desktop',
    size: 's',
});

exports.ResponsiveContext = ResponsiveContext;
