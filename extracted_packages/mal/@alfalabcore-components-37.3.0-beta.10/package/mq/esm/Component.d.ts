import { FC, ReactNode } from 'react';
type MqProps = {
    /**
     * Media выражение или кастомный запрос из `mq.json`, например `--mobile`.
     */
    query?: string;
    /**
     * Запрос на поддержку тач-событий
     */
    touch?: boolean;
    /**
     * Дочерние элементы.
     */
    children?: ReactNode;
    /**
     * Обработчик изменений в совпадении запросов
     */
    onMatchChange?: (isMatched: boolean) => void;
};
declare const Mq: FC<MqProps>;
export { MqProps, Mq };
