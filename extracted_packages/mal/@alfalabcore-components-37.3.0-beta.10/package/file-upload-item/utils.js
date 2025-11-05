var DocumentDocMIcon = require('@alfalab/icons-glyph/DocumentDocMIcon');
var DocumentImageMIcon = require('@alfalab/icons-glyph/DocumentImageMIcon');
var DocumentPdfMIcon = require('@alfalab/icons-glyph/DocumentPdfMIcon');
var DocumentTxtMIcon = require('@alfalab/icons-glyph/DocumentTxtMIcon');
var DocumentUnknownMIcon = require('@alfalab/icons-glyph/DocumentUnknownMIcon');

function humanFileSize(size) {
    var units = ['B', 'KB', 'MB', 'GB'];
    var humanSize = Number(size);
    var factor = 0;
    while (humanSize >= 1024 && factor < units.length - 1) {
        humanSize /= 1024;
        factor += 1;
    }
    humanSize = humanSize.toFixed(2);
    return "".concat(Number(humanSize), " ").concat(units[factor]);
}
var getExtension = function (filename) { return filename.toLowerCase().split('.').pop(); };
function fileIcon(filename) {
    var extension = getExtension(filename);
    switch (extension) {
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'svg':
        case 'tif':
        case 'tiff':
            return DocumentImageMIcon.DocumentImageMIcon;
        case 'doc':
        case 'docx':
            return DocumentDocMIcon.DocumentDocMIcon;
        case 'pdf':
            return DocumentPdfMIcon.DocumentPdfMIcon;
        case 'txt':
            return DocumentTxtMIcon.DocumentTxtMIcon;
        default:
            return DocumentUnknownMIcon.DocumentUnknownMIcon;
    }
}

exports.fileIcon = fileIcon;
exports.getExtension = getExtension;
exports.humanFileSize = humanFileSize;
