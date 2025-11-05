/**
 * Подготовка данных для вставки из буфера обмена.
 * @param phoneValue Телефон уже введённый в поле ввода.
 * @param phoneFromBuffer Текст номера телефона из буфера обмена.
 * @param input Input в который осуществляется вставка.
 */
function preparePasteData(phoneValue, phoneFromBuffer, selectionStart, selectionEnd) {
    var trimNuber = phoneFromBuffer.trim();
    var cutNumberWithPlus = trimNuber.replace(/[^+\d]/g, '');
    var isTextHavePlus = cutNumberWithPlus[0] === '+';
    var cutNumber = trimNuber.replace(/[^\d]/g, '');
    var isRuNumberInBuffer = cutNumber[0] === '7' || cutNumber[0] === '8';
    var resultNumber = '';
    // вставка в поле c "+"
    if (phoneValue === '+') {
        resultNumber = "+".concat(cutNumber);
        // вставка в поле, в которое введена часть номера
    }
    else if (phoneValue) {
        var startText = phoneValue.substring(0, selectionStart || 0);
        var endText = phoneValue.substring(selectionEnd || 0);
        var isSelectPlus = selectionStart === 0 && selectionEnd !== 0;
        if (selectionStart === 0 && selectionEnd === 0 && !isTextHavePlus) {
            resultNumber = "+".concat(cutNumber).concat(phoneValue.substring(1)).replace(/[^+\d]/g, '');
        }
        else if (!isTextHavePlus && !isSelectPlus) {
            resultNumber = "".concat(startText).concat(cutNumber).concat(endText).replace(/[^+\d]/g, '');
        }
        else if (isTextHavePlus && isSelectPlus) {
            resultNumber = "".concat(cutNumberWithPlus).concat(endText).replace(/[^+\d]/g, '');
        }
        else if (!isTextHavePlus && isSelectPlus) {
            resultNumber = "+".concat(cutNumber).concat(endText).replace(/[^+\d]/g, '');
        }
        // вставка в пустое поле
    }
    else if (!phoneValue) {
        // вставка номера начинающегося с "+" в пустое поле
        if (isTextHavePlus) {
            resultNumber = cutNumberWithPlus;
            // вставка номера начинающегося с "7" или "8" в пустое поле
        }
        else if (isRuNumberInBuffer) {
            resultNumber = "+7".concat(cutNumber.substring(1));
            // вставка номера начинающегося НЕ с "7", "8", "+" в пустое поле
        }
        else {
            resultNumber = "+7".concat(cutNumber);
        }
    }
    return resultNumber;
}

exports.preparePasteData = preparePasteData;
