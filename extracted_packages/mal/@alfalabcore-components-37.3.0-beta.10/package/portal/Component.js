var react = require('react');
var reactDom = require('react-dom');
var utils = require('./utils.js');

var Portal = react.forwardRef(function (_a, ref) {
    var _b = _a.getPortalContainer, getPortalContainer = _b === void 0 ? utils.getDefaultPortalContainer : _b, _c = _a.immediateMount, immediateMount = _c === void 0 ? false : _c, children = _a.children;
    var _d = react.useState(function () {
        return typeof window !== 'undefined' && immediateMount ? getPortalContainer() : null;
    }), mountNode = _d[0], setMountNode = _d[1];
    react.useEffect(function () {
        setMountNode(getPortalContainer());
    }, [getPortalContainer]);
    react.useEffect(function () {
        if (mountNode) {
            utils.setRef(ref, mountNode);
            return function () {
                utils.setRef(ref, null);
            };
        }
        return function () { return null; };
    }, [ref, mountNode]);
    return mountNode ? reactDom.createPortal(children, mountNode) : mountNode;
});

exports.Portal = Portal;
