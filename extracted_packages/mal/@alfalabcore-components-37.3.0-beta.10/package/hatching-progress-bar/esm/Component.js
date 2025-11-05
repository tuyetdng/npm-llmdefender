import React from 'react';
import cn from 'classnames';

var styles = {"container":"hatching-progress-bar__container_5y7xn","hatch":"hatching-progress-bar__hatch_5y7xn","filled":"hatching-progress-bar__filled_5y7xn","positive":"hatching-progress-bar__positive_5y7xn","attention":"hatching-progress-bar__attention_5y7xn","negative":"hatching-progress-bar__negative_5y7xn","link":"hatching-progress-bar__link_5y7xn","tertiary":"hatching-progress-bar__tertiary_5y7xn","secondary":"hatching-progress-bar__secondary_5y7xn","primary":"hatching-progress-bar__primary_5y7xn","accent":"hatching-progress-bar__accent_5y7xn"};
require('./index.css');

var HatchingProgressBar = React.forwardRef(function (_a, ref) {
    var className = _a.className, value = _a.value, hatchValue = _a.hatchValue, _b = _a.view, view = _b === void 0 ? 'positive' : _b, dataTestId = _a.dataTestId;
    return (React.createElement("div", { role: 'progressbar', "aria-valuenow": Math.round(value), "aria-valuemin": 0, "aria-valuemax": 100, className: cn(styles.container, className), "data-test-id": dataTestId, ref: ref },
        React.createElement("div", { className: styles.hatch, style: { transform: "translateX(".concat(hatchValue - 100, "%)") } }),
        React.createElement("div", { className: cn(styles.filled, styles[view]), style: { transform: "translateX(".concat(value - 100, "%)") } })));
});

export { HatchingProgressBar };
