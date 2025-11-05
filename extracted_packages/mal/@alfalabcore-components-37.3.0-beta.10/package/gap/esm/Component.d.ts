/// <reference types="react" />
type Size = '3xs' | '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl';
type GapProps = {
    /**
     * Размер отступа
     */
    size: Size;
    /**
     * Вид отступа (вертикальный или горизонтальный)
     * @default - 'vertical'
     */
    direction?: 'horizontal' | 'vertical';
    /**
     * HTML тег
     * @default 'div'
     */
    tag?: 'div' | 'span';
    /**
     * Дополнительный класс
     */
    className?: string;
    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};
declare const Gap: ({ size, direction, tag: Component, className, dataTestId, }: GapProps) => JSX.Element;
export { GapProps, Gap };
