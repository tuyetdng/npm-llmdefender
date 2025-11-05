import { forwardRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { setRef, getDefaultPortalContainer } from './utils.js';

var Portal = forwardRef(function (_a, ref) {
    var _b = _a.getPortalContainer, getPortalContainer = _b === void 0 ? getDefaultPortalContainer : _b, _c = _a.immediateMount, immediateMount = _c === void 0 ? false : _c, children = _a.children;
    var _d = useState(function () {
        return typeof window !== 'undefined' && immediateMount ? getPortalContainer() : null;
    }), mountNode = _d[0], setMountNode = _d[1];
    useEffect(function () {
        setMountNode(getPortalContainer());
    }, [getPortalContainer]);
    useEffect(function () {
        if (mountNode) {
            setRef(ref, mountNode);
            return function () {
                setRef(ref, null);
            };
        }
        return function () { return null; };
    }, [ref, mountNode]);
    return mountNode ? createPortal(children, mountNode) : mountNode;
});

export { Portal };
