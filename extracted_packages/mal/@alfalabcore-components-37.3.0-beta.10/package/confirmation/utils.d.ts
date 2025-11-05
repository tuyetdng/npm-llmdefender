/// <reference types="react" />
import { ConfirmationProps } from "./types";
/**
 * Форматирование миллисекунд в hh:mm:ss.
 *
 * @param {Number} ms миллисекунды
 * @returns {String} время в формате mm:ss
 */
declare function formatMsAsMinutes(ms: number): string;
type UseCountdown = (countdownDuration: number, tick?: number) => [number, () => void, () => void];
/**
 * Возвращает время, которое осталось до истечения таймера в ms
 */
declare const useCountdown: UseCountdown;
declare const ONE_DAY: number;
declare const ONE_MINUTE: number;
type UseConfirmationParams = {
    state?: ConfirmationProps['state'];
    screen?: ConfirmationProps['screen'];
    blockSmsRetry?: ConfirmationProps['blockSmsRetry'];
};
declare const useConfirmation: ({ state, screen, blockSmsRetry }?: UseConfirmationParams) => {
    confirmationState: string;
    confirmationScreen: string;
    confirmationBlockSmsRetry: boolean;
    setConfirmationState: import("react").Dispatch<import("react").SetStateAction<string>>;
    setConfirmationScreen: import("react").Dispatch<import("react").SetStateAction<string>>;
    setConfirmationBlockSmsRetry: import("react").Dispatch<import("react").SetStateAction<boolean>>;
};
export { formatMsAsMinutes, useCountdown, ONE_DAY, ONE_MINUTE, useConfirmation };
