import { useRef, useState, useCallback } from 'react';

function useControlled(controlledValue, defaultValue) {
    var isControlled = useRef(controlledValue !== undefined).current;
    var _a = useState(defaultValue), uncontrolledValue = _a[0], setUncontrolledValue = _a[1];
    var value = isControlled ? controlledValue : uncontrolledValue;
    var setValueIfUncontrolled = useCallback(function (newValue) {
        if (!isControlled) {
            setUncontrolledValue(newValue);
        }
    }, [isControlled]);
    return [value, setValueIfUncontrolled];
}

export { useControlled };
