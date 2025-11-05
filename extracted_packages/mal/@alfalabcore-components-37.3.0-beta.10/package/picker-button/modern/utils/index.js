import { ChevronDownCompactSIcon } from '@alfalab/icons-glyph/ChevronDownCompactSIcon';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { MoreMIcon } from '@alfalab/icons-glyph/MoreMIcon';
import { MoreSIcon } from '@alfalab/icons-glyph/MoreSIcon';

const getIcon = (variant, size) => {
    if (variant === 'compact') {
        return size === 'xxs' ? MoreSIcon : MoreMIcon;
    }
    return size === 'xxs' ? ChevronDownCompactSIcon : ChevronDownMIcon;
};

export { getIcon };
