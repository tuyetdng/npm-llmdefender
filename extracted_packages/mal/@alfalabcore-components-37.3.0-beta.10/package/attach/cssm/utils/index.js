function truncateFilename(filename, maxFilenameLength) {
    if (maxFilenameLength && filename.length > maxFilenameLength) {
        var lengthOfPart = Math.round(maxFilenameLength / 2) - 1;
        return "".concat(filename.substr(0, lengthOfPart), "\u2026").concat(filename.substr(filename.length - lengthOfPart));
    }
    return filename;
}

exports.truncateFilename = truncateFilename;
