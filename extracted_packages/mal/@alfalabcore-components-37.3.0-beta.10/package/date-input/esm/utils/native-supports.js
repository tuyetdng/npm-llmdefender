/**
 * Возвращает `true`, если поддерживается `input[type="date"]`
 */
function isInputDateSupported() {
    var input = document.createElement('input');
    var value = 'a';
    input.setAttribute('type', 'date');
    input.setAttribute('value', value);
    return input.value !== value;
}

export { isInputDateSupported };
