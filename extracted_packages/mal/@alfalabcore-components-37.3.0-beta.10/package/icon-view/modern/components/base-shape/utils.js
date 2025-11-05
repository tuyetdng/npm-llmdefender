const getPath = ({ size, hasTopAddons, hasBottomAddons, hasIndicator, pathsMap, }) => {
    if (hasBottomAddons && hasTopAddons) {
        return pathsMap[size].topBottom || '';
    }
    if (hasBottomAddons && hasIndicator) {
        return pathsMap[size].indicatorBottom || '';
    }
    if (hasBottomAddons) {
        return pathsMap[size].bottom || '';
    }
    if (hasTopAddons) {
        return pathsMap[size].top || '';
    }
    if (hasIndicator) {
        return pathsMap[size].indicator || '';
    }
    return pathsMap[size].none;
};

export { getPath };
