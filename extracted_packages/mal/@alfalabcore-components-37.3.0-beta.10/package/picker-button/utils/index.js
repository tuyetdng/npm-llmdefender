var ChevronDownCompactSIcon = require('@alfalab/icons-glyph/ChevronDownCompactSIcon');
var ChevronDownMIcon = require('@alfalab/icons-glyph/ChevronDownMIcon');
var MoreMIcon = require('@alfalab/icons-glyph/MoreMIcon');
var MoreSIcon = require('@alfalab/icons-glyph/MoreSIcon');

var getIcon = function (variant, size) {
    if (variant === 'compact') {
        return size === 'xxs' ? MoreSIcon.MoreSIcon : MoreMIcon.MoreMIcon;
    }
    return size === 'xxs' ? ChevronDownCompactSIcon.ChevronDownCompactSIcon : ChevronDownMIcon.ChevronDownMIcon;
};

exports.getIcon = getIcon;
