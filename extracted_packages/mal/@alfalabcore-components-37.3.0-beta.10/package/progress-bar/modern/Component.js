import React from 'react';
import cn from 'classnames';

const styles = {"container":"progress-bar__container_ocl1l","s":"progress-bar__s_ocl1l","m":"progress-bar__m_ocl1l","filled":"progress-bar__filled_ocl1l","positive":"progress-bar__positive_ocl1l","negative":"progress-bar__negative_ocl1l","attention":"progress-bar__attention_ocl1l","link":"progress-bar__link_ocl1l","tertiary":"progress-bar__tertiary_ocl1l","secondary":"progress-bar__secondary_ocl1l","primary":"progress-bar__primary_ocl1l","accent":"progress-bar__accent_ocl1l"};
require('./index.css');

const ProgressBar = React.forwardRef(({ className, value, view = 'positive', size = 'm', dataTestId }, ref) => {
    const translateX = Math.max(-100, Math.min(0, value - 100));
    return (React.createElement("div", { role: 'progressbar', "aria-valuenow": Math.round(value), "aria-valuemin": 0, "aria-valuemax": 100, className: cn(styles.container, styles[size], className), "data-test-id": dataTestId, ref: ref },
        React.createElement("div", { className: cn(styles.filled, styles[view]), style: { transform: `translateX(${translateX}%)` } })));
});

export { ProgressBar };
