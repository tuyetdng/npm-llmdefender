import { a as __assign } from './tslib.es6-3f4e7063.js';

var createSyntheticEvent = function (event) {
    var isDefaultPrevented = false;
    var isPropagationStopped = false;
    var preventDefault = function () {
        isDefaultPrevented = true;
        event.preventDefault();
    };
    var stopPropagation = function () {
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
        preventDefault: preventDefault,
        isDefaultPrevented: function () { return isDefaultPrevented; },
        stopPropagation: stopPropagation,
        isPropagationStopped: function () { return isPropagationStopped; },
        persist: function () { },
        timeStamp: event.timeStamp,
        type: event.type,
    };
};
var createUIEvent = function (event) { return (__assign(__assign({}, createSyntheticEvent(event)), { detail: 0, view: {
        styleMedia: {
            type: '',
            matchMedium: function () { return false; },
        },
        document: document,
    } })); };
var createSyntheticMouseEvent = function (event) { return (__assign(__assign({}, createUIEvent(event)), { altKey: event.altKey, button: event.button, buttons: event.buttons, clientX: event.clientX, clientY: event.clientY, ctrlKey: event.ctrlKey, getModifierState: event.getModifierState, metaKey: event.metaKey, movementX: event.movementX, movementY: event.movementY, pageX: event.pageX, pageY: event.pageY, relatedTarget: event.relatedTarget, screenX: event.screenX, screenY: event.screenY, shiftKey: event.shiftKey })); };

export { createSyntheticEvent, createSyntheticMouseEvent, createUIEvent };
