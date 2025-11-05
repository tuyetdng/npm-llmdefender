type SizePathsMap = {
    [size: number]: {
        top?: string;
        bottom?: string;
        topBottom?: string;
        none: string;
        indicator?: string;
        indicatorBottom?: string;
    };
};
type GetPathParams = {
    size: number;
    hasTopAddons: boolean;
    hasBottomAddons: boolean;
    hasIndicator: boolean;
    pathsMap: SizePathsMap;
};
type PathsMap = {
    shape: SizePathsMap;
    border: SizePathsMap;
};
declare const getPath: ({ size, hasTopAddons, hasBottomAddons, hasIndicator, pathsMap, }: GetPathParams) => string;
export { PathsMap, getPath };
