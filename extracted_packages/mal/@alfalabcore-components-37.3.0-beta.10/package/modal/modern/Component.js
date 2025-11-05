import React, { forwardRef, useRef, useMemo } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { BaseModal } from '../../base-modal/modern';
import { ResponsiveContext } from './ResponsiveContext.js';

const desktopStyles = {"wrapper":"modal__wrapper_u2qdw","component":"modal__component_u2qdw","fullscreen":"modal__fullscreen_u2qdw","s":"modal__s_u2qdw","m":"modal__m_u2qdw","l":"modal__l_u2qdw","xl":"modal__xl_u2qdw"};
require('./desktop.css');

const mobileStyles = {"component":"modal__component_nu45w"};
require('./mobile.css');

const transitions = {"appear":"modal__appear_12hcv","enter":"modal__enter_12hcv","appearActive":"modal__appearActive_12hcv","enterActive":"modal__enterActive_12hcv","exit":"modal__exit_12hcv","exitActive":"modal__exitActive_12hcv","exitDone":"modal__exitDone_12hcv"};
require('./transitions.css');

const Modal = forwardRef(({ size = 's', fixedPosition, fullscreen, children, className, wrapperClassName, transitionProps = {}, view, ...restProps }, ref) => {
    // TODO: удалить, после удаления пропсы fullscreen
    const componentSize = fullscreen ? 'fullscreen' : size;
    const modalRef = useRef(null);
    const handleEntered = (node, isAppearing) => {
        if (fixedPosition && modalRef.current) {
            const content = modalRef.current.querySelector(`.${desktopStyles.component}`);
            if (content) {
                const { marginTop } = window.getComputedStyle(content);
                content.style.marginTop = marginTop;
            }
        }
        if (transitionProps.onEntered) {
            transitionProps.onEntered(node, isAppearing);
        }
    };
    const baseModalProps = view === 'desktop'
        ? {
            ref: mergeRefs([ref, modalRef]),
            wrapperClassName: cn(desktopStyles.wrapper, wrapperClassName, {
                [desktopStyles.fullscreen]: componentSize === 'fullscreen',
            }),
            className: cn(desktopStyles.component, className, desktopStyles[componentSize]),
            backdropProps: {
                invisible: componentSize === 'fullscreen',
                ...restProps.backdropProps,
            },
            transitionProps: {
                classNames: transitions,
                ...transitionProps,
                onEntered: handleEntered,
            },
        }
        : {
            ref,
            transitionProps: {
                classNames: transitions,
                ...transitionProps,
            },
            className: cn(className, mobileStyles.component),
        };
    const contextValue = useMemo(() => ({ size: componentSize, view }), [componentSize, view]);
    return (React.createElement(ResponsiveContext.Provider, { value: contextValue },
        React.createElement(BaseModal, { ...restProps, ...baseModalProps }, children)));
});

export { Modal };
