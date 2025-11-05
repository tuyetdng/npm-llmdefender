/**
 * Подготовка данных для вставки из буфера обмена.
 * @param phoneValue Телефон уже введённый в поле ввода.
 * @param phoneFromBuffer Текст номера телефона из буфера обмена.
 * @param input Input в который осуществляется вставка.
 */
declare function preparePasteData(phoneValue: string, phoneFromBuffer: string, selectionStart?: number, selectionEnd?: number): string;
export { preparePasteData };
