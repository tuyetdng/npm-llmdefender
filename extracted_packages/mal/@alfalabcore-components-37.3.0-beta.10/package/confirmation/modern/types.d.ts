import { ComponentType, ReactNode } from 'react';
type ConfirmationProps = {
    /**
     * Экран компонента
     */
    screen: ConfirmationScreen | string;
    /**
     * Состояние компонента
     */
    state: ConfirmationState | string;
    /**
     * Мобильная версия компонента для экрана
     */
    mobile?: boolean;
    /**
     * Позиционирование контента
     */
    alignContent?: 'left' | 'center';
    /**
     * Объект с текстами
     */
    texts?: ConfirmationTexts;
    /**
     * Количество символов, которое можно ввести в поле ввода подписания до того, как произойдет автоотправка
     */
    requiredCharAmount?: number;
    /**
     * Длительность обратного отсчета на кнопке повторного запроса сообщения, в милисекундах
     */
    countdownDuration?: number;
    /**
     * Продолжительность блокировки формы (ms)
     */
    tempBlockDuration?: number;
    /**
     * Номер телефона, на который отправлен код
     */
    phone?: string;
    /**
     * Не осталось попыток ввода кода
     */
    blockSmsRetry?: boolean;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
    /**
     * Сss класс для стилизации общей обёртки
     */
    className?: string;
    /**
     * Флаг - нужно ли очищать код при возникновении ошибки
     */
    clearCodeOnError?: boolean;
    /**
     * Функция обновления состояния компонента
     */
    onChangeState: (state: ConfirmationState | string) => void;
    /**
     * Функция обновления состояния компонента
     */
    onChangeScreen: (state: ConfirmationScreen | string) => void;
    /**
     * Обработчик события завершения ввода кода подписания
     */
    onInputFinished: (code: string) => void;
    /**
     * Обработчик события нажатия на кнопку "Запросить код"
     */
    onSmsRetryClick: () => void;
    /**
     * Клик по кнопке "Понятно" на экране фатальной ошибки
     */
    onFatalErrorOkButtonClick?: () => void;
    /**
     * Временная блокировка формы закончилась
     */
    onTempBlockFinished?: () => void;
    /**
     * Возввращает объект, где ключ - название экрана (screen), значение - компонент для экрана
     */
    getScreensMap?: (defaulScreensMap: ScreensMap) => ScreensMap;
    /**
     * Дочерние элементы.
     */
    children?: ReactNode;
};
type TConfirmationContext = Required<Pick<ConfirmationProps, 'alignContent' | 'texts' | 'state' | 'screen' | 'requiredCharAmount' | 'onInputFinished' | 'countdownDuration' | 'onChangeState' | 'onSmsRetryClick' | 'onChangeScreen' | 'onFatalErrorOkButtonClick' | 'tempBlockDuration'>> & Pick<ConfirmationProps, 'phone' | 'blockSmsRetry' | 'onTempBlockFinished' | 'clearCodeOnError'> & {
    timeLeft: number;
};
type ConfirmationTexts = {
    /**
     * Экран INITIAL
     */
    title?: ReactNode;
    codeError?: string;
    codeChecking?: string;
    codeSending?: string;
    codeSended?: string;
    buttonRetry?: string;
    linkToHint?: string;
    noAttemptsLeft?: string;
    countdown?: string;
    /**
     * Экран HINT
     */
    hintButton?: string;
    /**
     * Экран FATAL_ERROR
     */
    fatalErrorTitle?: ReactNode;
    fatalErrorDescription?: ReactNode;
    fatalErrorButton?: string;
    /**
     * Экран TEMP_BLOCK
     */
    tempBlockTitle?: ReactNode;
    tempBlockDescription?: ReactNode;
};
type ConfirmationScreen = 'INITIAL' | 'HINT' | 'FATAL_ERROR' | 'TEMP_BLOCK';
type ConfirmationState = 'INITIAL' | 'CODE_CHECKING' | 'CODE_SENDING' | 'CODE_ERROR';
type ScreensMap = {
    [key: string]: ComponentType;
};
declare const defaultTexts: {
    title: string;
    codeError: string;
    codeChecking: string;
    codeSending: string;
    buttonRetry: string;
    linkToHint: string;
    hintButton: string;
    noAttemptsLeft: string;
    fatalErrorTitle: string;
    fatalErrorDescription: string;
    fatalErrorButton: string;
    tempBlockTitle: string;
    tempBlockDescription: string;
    codeSended: string;
    countdown: string;
};
export { ConfirmationProps, TConfirmationContext, ConfirmationTexts, ConfirmationScreen, ConfirmationState, ScreensMap, defaultTexts };
