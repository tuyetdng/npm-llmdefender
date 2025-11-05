/**
 * Хук для медиа запросов.
 * @param query media выражение или кастомный запрос из `mq.json`, например `--mobile`.
 * @param defaultValue Значение по-умолчанию.
 */
declare const useMatchMedia: (query: string, defaultValue?: boolean) => boolean[];
export { useMatchMedia };
