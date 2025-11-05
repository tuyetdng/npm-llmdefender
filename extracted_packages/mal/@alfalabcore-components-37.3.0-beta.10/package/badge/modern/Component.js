import React from 'react';
import cn from 'classnames';

const styles = {"wrapper":"badge__wrapper_4hd6a","s":"badge__s_4hd6a","m":"badge__m_4hd6a","xl":"badge__xl_4hd6a","component":"badge__component_4hd6a","count":"badge__count_4hd6a","outlineCount":"badge__outlineCount_4hd6a","l":"badge__l_4hd6a","heightS":"badge__heightS_4hd6a","heightM":"badge__heightM_4hd6a","heightL":"badge__heightL_4hd6a","heightXL":"badge__heightXL_4hd6a","heightXXL":"badge__heightXXL_4hd6a","icon":"badge__icon_4hd6a","positive":"badge__positive_4hd6a","attention":"badge__attention_4hd6a","negative":"badge__negative_4hd6a","link":"badge__link_4hd6a","tertiary":"badge__tertiary_4hd6a","secondary":"badge__secondary_4hd6a","primary":"badge__primary_4hd6a","outline":"badge__outline_4hd6a","outlineColor":"badge__outlineColor_4hd6a","dot":"badge__dot_4hd6a","isHidden":"badge__isHidden_4hd6a"};
require('./index.css');

const Badge = ({ className, size = 'm', view, visibleIconOutline = false, visibleColorOutline = false, content, height = 16, iconColor, dataTestId, }) => {
    const isCountView = view === 'count';
    const isHidden = isCountView && typeof content === 'number' && content <= 0;
    const componentContent = isCountView && content && content >= 100 ? '99+' : content;
    const isHeightS = isCountView && height >= 16 && height <= 18;
    const isHeightM = isCountView && height >= 19 && height <= 24;
    const isHeightL = isCountView && height >= 25 && height <= 32;
    const isHeightXL = isCountView && height >= 33 && height <= 40;
    const isHeightXXL = isCountView && height >= 41 && height <= 48;
    return (React.createElement("div", { className: cn(!isCountView && styles.wrapper, iconColor && styles[iconColor], {
            [styles[size]]: !isCountView,
            [styles.outline]: visibleIconOutline,
            [styles.outlineColor]: !isCountView && visibleColorOutline,
            [styles.count]: isCountView,
        }, className), "data-test-id": dataTestId },
        React.createElement("div", { className: cn(styles.component, styles[size], styles[view], iconColor && styles[iconColor], isHeightS && styles.heightS, isHeightM && styles.heightM, isHeightL && styles.heightL, isHeightXL && styles.heightXL, isHeightXXL && styles.heightXXL, {
                [styles.isHidden]: isHidden,
                [styles.dot]: !content,
                [styles.outlineCount]: isCountView && visibleIconOutline,
            }), style: {
                ...(isCountView && content && { height, minWidth: height }),
            } }, componentContent)));
};

export { Badge };
