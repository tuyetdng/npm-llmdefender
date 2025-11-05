import { forwardRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { setRef, getDefaultPortalContainer } from './utils.js';

const Portal = forwardRef(({ getPortalContainer = getDefaultPortalContainer, immediateMount = false, children }, ref) => {
    const [mountNode, setMountNode] = useState(() => typeof window !== 'undefined' && immediateMount ? getPortalContainer() : null);
    useEffect(() => {
        setMountNode(getPortalContainer());
    }, [getPortalContainer]);
    useEffect(() => {
        if (mountNode) {
            setRef(ref, mountNode);
            return () => {
                setRef(ref, null);
            };
        }
        return () => null;
    }, [ref, mountNode]);
    return mountNode ? createPortal(children, mountNode) : mountNode;
});

export { Portal };
