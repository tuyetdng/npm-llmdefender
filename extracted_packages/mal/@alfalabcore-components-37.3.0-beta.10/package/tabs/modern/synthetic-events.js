const createSyntheticEvent = (event) => {
    let isDefaultPrevented = false;
    let isPropagationStopped = false;
    const preventDefault = () => {
        isDefaultPrevented = true;
        event.preventDefault();
    };
    const stopPropagation = () => {
        isPropagationStopped = true;
        event.stopPropagation();
    };
    return {
        nativeEvent: event,
        currentTarget: event.currentTarget,
        target: event.target,
        bubbles: event.bubbles,
        cancelable: event.cancelable,
        defaultPrevented: event.defaultPrevented,
        eventPhase: event.eventPhase,
        isTrusted: event.isTrusted,
        preventDefault,
        isDefaultPrevented: () => isDefaultPrevented,
        stopPropagation,
        isPropagationStopped: () => isPropagationStopped,
        persist: () => { },
        timeStamp: event.timeStamp,
        type: event.type,
    };
};
const createUIEvent = (event) => ({
    ...createSyntheticEvent(event),
    detail: 0,
    view: {
        styleMedia: {
            type: '',
            matchMedium: () => false,
        },
        document,
    },
});
const createSyntheticMouseEvent = (event) => ({
    ...createUIEvent(event),
    altKey: event.altKey,
    button: event.button,
    buttons: event.buttons,
    clientX: event.clientX,
    clientY: event.clientY,
    ctrlKey: event.ctrlKey,
    getModifierState: event.getModifierState,
    metaKey: event.metaKey,
    movementX: event.movementX,
    movementY: event.movementY,
    pageX: event.pageX,
    pageY: event.pageY,
    relatedTarget: event.relatedTarget,
    screenX: event.screenX,
    screenY: event.screenY,
    shiftKey: event.shiftKey,
});

export { createSyntheticEvent, createSyntheticMouseEvent, createUIEvent };
