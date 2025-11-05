import { a as __rest, _ as __assign } from './tslib.es6-ac9b62a7.js';
import React, { forwardRef, useRef, useMemo } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { BaseModal } from '../../base-modal/esm';
import { ResponsiveContext } from './ResponsiveContext.js';

var desktopStyles = {"wrapper":"modal__wrapper_u2qdw","component":"modal__component_u2qdw","fullscreen":"modal__fullscreen_u2qdw","s":"modal__s_u2qdw","m":"modal__m_u2qdw","l":"modal__l_u2qdw","xl":"modal__xl_u2qdw"};
require('./desktop.css');

var mobileStyles = {"component":"modal__component_nu45w"};
require('./mobile.css');

var transitions = {"appear":"modal__appear_12hcv","enter":"modal__enter_12hcv","appearActive":"modal__appearActive_12hcv","enterActive":"modal__enterActive_12hcv","exit":"modal__exit_12hcv","exitActive":"modal__exitActive_12hcv","exitDone":"modal__exitDone_12hcv"};
require('./transitions.css');

var Modal = forwardRef(function (_a, ref) {
    var _b;
    var _c = _a.size, size = _c === void 0 ? 's' : _c, fixedPosition = _a.fixedPosition, fullscreen = _a.fullscreen, children = _a.children, className = _a.className, wrapperClassName = _a.wrapperClassName, _d = _a.transitionProps, transitionProps = _d === void 0 ? {} : _d, view = _a.view, restProps = __rest(_a, ["size", "fixedPosition", "fullscreen", "children", "className", "wrapperClassName", "transitionProps", "view"]);
    // TODO: удалить, после удаления пропсы fullscreen
    var componentSize = fullscreen ? 'fullscreen' : size;
    var modalRef = useRef(null);
    var handleEntered = function (node, isAppearing) {
        if (fixedPosition && modalRef.current) {
            var content = modalRef.current.querySelector(".".concat(desktopStyles.component));
            if (content) {
                var marginTop = window.getComputedStyle(content).marginTop;
                content.style.marginTop = marginTop;
            }
        }
        if (transitionProps.onEntered) {
            transitionProps.onEntered(node, isAppearing);
        }
    };
    var baseModalProps = view === 'desktop'
        ? {
            ref: mergeRefs([ref, modalRef]),
            wrapperClassName: cn(desktopStyles.wrapper, wrapperClassName, (_b = {},
                _b[desktopStyles.fullscreen] = componentSize === 'fullscreen',
                _b)),
            className: cn(desktopStyles.component, className, desktopStyles[componentSize]),
            backdropProps: __assign({ invisible: componentSize === 'fullscreen' }, restProps.backdropProps),
            transitionProps: __assign(__assign({ classNames: transitions }, transitionProps), { onEntered: handleEntered }),
        }
        : {
            ref: ref,
            transitionProps: __assign({ classNames: transitions }, transitionProps),
            className: cn(className, mobileStyles.component),
        };
    var contextValue = useMemo(function () { return ({ size: componentSize, view: view }); }, [componentSize, view]);
    return (React.createElement(ResponsiveContext.Provider, { value: contextValue },
        React.createElement(BaseModal, __assign({}, restProps, baseModalProps), children)));
});

export { Modal };
