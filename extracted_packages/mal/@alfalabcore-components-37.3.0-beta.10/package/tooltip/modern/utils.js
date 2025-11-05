import { useRef, useState, useCallback } from 'react';

function useControlled(controlledValue, defaultValue) {
    const { current: isControlled } = useRef(controlledValue !== undefined);
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const value = isControlled ? controlledValue : uncontrolledValue;
    const setValueIfUncontrolled = useCallback((newValue) => {
        if (!isControlled) {
            setUncontrolledValue(newValue);
        }
    }, [isControlled]);
    return [value, setValueIfUncontrolled];
}

export { useControlled };
