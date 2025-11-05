var getPath = function (_a) {
    var size = _a.size, hasTopAddons = _a.hasTopAddons, hasBottomAddons = _a.hasBottomAddons, hasIndicator = _a.hasIndicator, pathsMap = _a.pathsMap;
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

exports.getPath = getPath;
