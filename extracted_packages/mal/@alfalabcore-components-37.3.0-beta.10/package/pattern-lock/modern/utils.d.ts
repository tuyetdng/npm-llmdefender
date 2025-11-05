import { Theme, ThemeParams } from 'react-canvas-pattern-lock';
declare function getDefaultObserveTarget(): HTMLHeadElement;
declare function getColorByToken(token: string): string;
declare const getSizes: () => {
    elementSizes: ThemeParams['dimens'];
    width: number;
    height: number;
};
declare function getTheme(dimens: ThemeParams['dimens']): Theme;
export { getDefaultObserveTarget, getColorByToken, getSizes, getTheme };
