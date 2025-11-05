import React, { forwardRef, useMemo } from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';
import { BaseModal, BaseModalContext } from '../../base-modal/modern';
import { Scrollbar } from '../../scrollbar/modern';

const styles = {"component":"drawer__component_1ezay","rightPlacement":"drawer__rightPlacement_1ezay","leftPlacement":"drawer__leftPlacement_1ezay","content":"drawer__content_1ezay","simplebar":"drawer__simplebar_1ezay","enterRight":"drawer__enterRight_1ezay","enterLeft":"drawer__enterLeft_1ezay","contentEnter":"drawer__contentEnter_1ezay","backdropEnter":"drawer__backdropEnter_1ezay","enterActive":"drawer__enterActive_1ezay","backdropEnterActive":"drawer__backdropEnterActive_1ezay","backdropEnterDone":"drawer__backdropEnterDone_1ezay","contentEnterActive":"drawer__contentEnterActive_1ezay","exit":"drawer__exit_1ezay","backdropExit":"drawer__backdropExit_1ezay","contentExit":"drawer__contentExit_1ezay","exitActiveRight":"drawer__exitActiveRight_1ezay","exitActiveLeft":"drawer__exitActiveLeft_1ezay","backdropExitActive":"drawer__backdropExitActive_1ezay","backdropExitDone":"drawer__backdropExitDone_1ezay","contentExitActive":"drawer__contentExitActive_1ezay"};
require('./index.css');

const ANIMATION_DURATION = 600;
const DrawerContext = BaseModalContext;
const backdropProps = {
    classNames: {
        enter: styles.backdropEnter,
        appear: styles.backdropEnter,
        enterActive: styles.backdropEnterActive,
        appearActive: styles.backdropEnterActive,
        enterDone: styles.backdropEnterDone,
        appearDone: styles.backdropEnterDone,
        exit: styles.backdropExit,
        exitActive: styles.backdropExitActive,
        exitDone: styles.backdropExitDone,
    },
    timeout: ANIMATION_DURATION,
};
const contentProps = {
    classNames: {
        enter: styles.contentEnter,
        appear: styles.contentEnter,
        enterActive: styles.contentEnterActive,
        appearActive: styles.contentEnterActive,
        exit: styles.contentExit,
        exitActive: styles.contentExitActive,
    },
    timeout: ANIMATION_DURATION,
};
const Drawer = forwardRef(({ open, className, children, contentTransitionProps, nativeScrollbar = true, placement = 'right', scrollbarProps, ...restProps }, ref) => {
    const isRightPlacement = placement === 'right';
    const isLeftPlacement = placement === 'left';
    const transitionProps = useMemo(() => {
        const enterClassName = cn({
            [styles.enterRight]: isRightPlacement,
            [styles.enterLeft]: isLeftPlacement,
        });
        const exitClassName = cn({
            [styles.exitActiveRight]: isRightPlacement,
            [styles.exitActiveLeft]: isLeftPlacement,
        });
        return {
            classNames: {
                enter: enterClassName,
                appear: enterClassName,
                enterActive: styles.enterActive,
                appearActive: styles.enterActive,
                exit: styles.exit,
                exitActive: exitClassName,
            },
            timeout: ANIMATION_DURATION,
            ...restProps.transitionProps,
        };
    }, [restProps.transitionProps, isLeftPlacement, isRightPlacement]);
    const renderWithNativeScrollbar = () => React.createElement("div", { className: styles.content }, children);
    const renderWithCustomScrollbar = () => (React.createElement(Scrollbar, { ...scrollbarProps, className: cn(styles.simplebar, scrollbarProps?.className) }, children));
    return (React.createElement(BaseModal, { ...restProps, scrollHandler: 'content', ref: ref, open: open, className: cn(styles.component, className, {
            [styles.rightPlacement]: isRightPlacement,
            [styles.leftPlacement]: isLeftPlacement,
        }), transitionProps: transitionProps, backdropProps: { ...backdropProps, ...restProps.backdropProps } },
        React.createElement(CSSTransition, { ...{ ...contentProps, ...contentTransitionProps }, appear: true, in: open }, nativeScrollbar ? renderWithNativeScrollbar() : renderWithCustomScrollbar())));
});

export { ANIMATION_DURATION, Drawer, DrawerContext };
