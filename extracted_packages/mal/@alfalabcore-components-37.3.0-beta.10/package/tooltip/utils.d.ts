declare function useControlled<T>(controlledValue: T, defaultValue: T): [T, (value: T) => void];
export { useControlled };
