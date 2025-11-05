import React, { forwardRef, useRef, useState, useCallback } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { IconButton } from '../../icon-button/modern';
import { useFocus } from '@alfalab/hooks';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { CrossMIcon } from '@alfalab/icons-glyph/CrossMIcon';
import { ButtonList } from './components/button-list/component.js';

const styles = {"component":"plate__component_23ygs","foldable":"plate__foldable_23ygs","focused":"plate__focused_23ygs","inner":"plate__inner_23ygs","rounded":"plate__rounded_23ygs","noBorder":"plate__noBorder_23ygs","shadow":"plate__shadow_23ygs","common":"plate__common_23ygs","negative":"plate__negative_23ygs","positive":"plate__positive_23ygs","attention":"plate__attention_23ygs","custom":"plate__custom_23ygs","rect":"plate__rect_23ygs","isHidden":"plate__isHidden_23ygs","leftAddons":"plate__leftAddons_23ygs","rightAddons":"plate__rightAddons_23ygs","subAddons":"plate__subAddons_23ygs","bold":"plate__bold_23ygs","light":"plate__light_23ygs","content":"plate__content_23ygs","isFolded":"plate__isFolded_23ygs","contentContainer":"plate__contentContainer_23ygs","withoutTitle":"plate__withoutTitle_23ygs","limitWidth":"plate__limitWidth_23ygs","description":"plate__description_23ygs","footer":"plate__footer_23ygs","closer":"plate__closer_23ygs","folder":"plate__folder_23ygs","button":"plate__button_23ygs","rowLimit1":"plate__rowLimit1_23ygs","rowLimit2":"plate__rowLimit2_23ygs","rowLimit3":"plate__rowLimit3_23ygs"};
require('./index.css');

/* eslint-disable complexity */
const Plate = forwardRef(({ hasCloser, foldable: foldableProp = false, folded: foldedProp, defaultFolded = true, rounded = true, limitContentWidth = true, leftAddons, subAddons, children, buttons, title, titleView = 'bold', view = 'common', border = view !== 'custom', shadow = view === 'custom', className, buttonsClassName, contentClassName, subAddonsClassName, dataTestId, onClick, onClose, onToggle, rowLimit, }, ref) => {
    const plateRef = useRef(null);
    const contentRef = useRef(null);
    const subAddonsRef = useRef(null);
    const [focused] = useFocus(plateRef, 'keyboard');
    const [isHidden, setIsHidden] = useState(false);
    const [foldedState, setFoldedState] = useState(defaultFolded);
    const uncontrolled = foldedProp === undefined;
    const foldable = !!title && !!children && foldableProp;
    const folded = uncontrolled ? foldedState : foldedProp;
    const hasButtons = !!buttons && typeof buttons !== 'boolean';
    const hasContent = children || hasButtons;
    const hasSubAddons = !!subAddons && typeof subAddons !== 'boolean';
    const hasAnyAddons = leftAddons || subAddons || foldable || hasCloser;
    const rowLimitStyles = rowLimit && styles[`rowLimit${rowLimit}`];
    const handleClick = useCallback((event) => {
        const target = event.target;
        const eventInsideComponent = plateRef.current && plateRef.current.contains(target);
        const eventInsideContent = contentRef.current && contentRef.current.contains(target);
        const eventInsideSubAddons = subAddonsRef.current && subAddonsRef.current.contains(target);
        const clickSimilarKeys = ['Enter', ' '].includes(event.key);
        const shouldChangeIsFolded = eventInsideComponent &&
            !eventInsideContent &&
            !eventInsideSubAddons &&
            (event.type === 'click' || clickSimilarKeys);
        if (foldable && shouldChangeIsFolded) {
            if (uncontrolled) {
                setFoldedState(!foldedState);
            }
            if (onToggle) {
                onToggle(event, { folded: !(uncontrolled ? foldedState : foldedProp) });
            }
        }
        if (onClick) {
            onClick(event);
        }
    }, [foldable, onClick, uncontrolled, onToggle, foldedState, foldedProp]);
    const handleClose = useCallback((event) => {
        setIsHidden(true);
        if (onClose) {
            onClose(event);
        }
    }, [onClose]);
    return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    React.createElement("div", { className: cn(styles.component, styles[view], {
            [styles.foldable]: foldable,
            [styles.focused]: focused,
            [styles.isHidden]: hasCloser && isHidden,
            [styles.isFolded]: foldable && folded,
            [styles.rounded]: rounded,
            [styles.rect]: !rounded,
            [styles.noBorder]: !border,
            [styles.shadow]: shadow,
        }, className), onClick: handleClick, onKeyDown: handleClick, role: 'alert', ref: mergeRefs([plateRef, ref]), 
        /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
        tabIndex: foldable ? 0 : -1, "data-test-id": dataTestId },
        React.createElement("div", { className: styles.inner },
            leftAddons && React.createElement("div", { className: styles.leftAddons }, leftAddons),
            React.createElement("div", { className: cn(styles.contentContainer, contentClassName, {
                    [styles.withoutTitle]: !title && hasAnyAddons,
                    [styles.limitWidth]: limitContentWidth,
                }) },
                title && React.createElement("div", { className: styles[titleView] }, title),
                hasContent && (React.createElement("div", { ref: contentRef, className: cn(styles.content, {
                        [styles.isFolded]: foldable && folded,
                    }) },
                    children && (React.createElement("div", { className: cn(styles.description, rowLimitStyles) }, children)),
                    hasButtons && (React.createElement("div", { className: styles.footer },
                        React.createElement(ButtonList, { buttons: buttons, containerClassName: buttonsClassName, buttonClassName: cn(styles.button, buttonsClassName) })))))),
            hasSubAddons && (React.createElement("div", { ref: subAddonsRef, className: styles.subAddons },
                React.createElement(ButtonList, { buttons: subAddons, containerClassName: subAddonsClassName, buttonClassName: styles.button }))),
            foldable && (React.createElement("div", { className: styles.rightAddons },
                React.createElement("div", { className: cn(styles.folder, {
                        [styles.isFolded]: folded,
                    }) },
                    React.createElement(ChevronDownMIcon, null)))),
            hasCloser && !foldable && (React.createElement("div", { className: styles.rightAddons },
                React.createElement(IconButton, { className: styles.closer, "aria-label": '\u0437\u0430\u043A\u0440\u044B\u0442\u044C', icon: CrossMIcon, size: 'xxs', onClick: handleClose }))))));
});
/* eslint-enable complexity */
/**
 * Для отображения в сторибуке
 */
Plate.defaultProps = {
    foldable: false,
    defaultFolded: true,
    view: 'common',
};

export { Plate };
