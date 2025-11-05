var React = require('react');

function useCaretAvoidCountryCode(_a) {
    var inputRef = _a.inputRef, countryCodeLength = _a.countryCodeLength, clearableCountryCode = _a.clearableCountryCode;
    React.useEffect(function () {
        var input = inputRef.current;
        if (!input || clearableCountryCode)
            return;
        var moveCaretFromCountryCode = function () {
            var selectionStart = input.selectionStart || 0;
            if (selectionStart < countryCodeLength) {
                input.focus();
                input.setSelectionRange(countryCodeLength, countryCodeLength);
            }
        };
        var preventCaretMovingOnCountryCode = function (event) {
            var selectionStart = input.selectionStart || 0;
            var toLeftKey = event.keyCode === 37;
            if (toLeftKey) {
                if (selectionStart <= countryCodeLength) {
                    event.preventDefault();
                }
                // Если нажали ctrl + arrowLeft, то восстанавливаем положение каретки.
                if (event.metaKey || event.ctrlKey) {
                    requestAnimationFrame(function () {
                        moveCaretFromCountryCode();
                    });
                }
            }
        };
        input.addEventListener('click', moveCaretFromCountryCode);
        input.addEventListener('keydown', preventCaretMovingOnCountryCode);
        // eslint-disable-next-line consistent-return
        return function () {
            input.removeEventListener('click', moveCaretFromCountryCode);
            input.removeEventListener('keydown', preventCaretMovingOnCountryCode);
        };
    }, [clearableCountryCode, countryCodeLength, inputRef]);
}

exports.useCaretAvoidCountryCode = useCaretAvoidCountryCode;
