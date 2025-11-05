var React = require('react');

function useControlled(controlledValue, defaultValue) {
    var isControlled = React.useRef(controlledValue !== undefined).current;
    var _a = React.useState(defaultValue), uncontrolledValue = _a[0], setUncontrolledValue = _a[1];
    var value = isControlled ? controlledValue : uncontrolledValue;
    var setValueIfUncontrolled = React.useCallback(function (newValue) {
        if (!isControlled) {
            setUncontrolledValue(newValue);
        }
    }, [isControlled]);
    return [value, setValueIfUncontrolled];
}

exports.useControlled = useControlled;
