import React, { forwardRef, Fragment } from 'react';
import cn from 'classnames';
import { getPath } from './utils.js';

var styles = {"componentWrapper":"icon-view__componentWrapper_zxxhz","component":"icon-view__component_zxxhz","bg":"icon-view__bg_zxxhz","border":"icon-view__border_zxxhz","children":"icon-view__children_zxxhz","addons":"icon-view__addons_zxxhz","size_128":"icon-view__size_128_zxxhz","topAddons":"icon-view__topAddons_zxxhz","bottomAddons":"icon-view__bottomAddons_zxxhz","size_80":"icon-view__size_80_zxxhz","indicator":"icon-view__indicator_zxxhz","size_64":"icon-view__size_64_zxxhz","size_48":"icon-view__size_48_zxxhz","size_40":"icon-view__size_40_zxxhz","size_32":"icon-view__size_32_zxxhz","size_24":"icon-view__size_24_zxxhz","size_20":"icon-view__size_20_zxxhz"};
require('./index.css');

var BaseShape = forwardRef(function (_a, ref) {
    var _b = _a.size, size = _b === void 0 ? 64 : _b, _c = _a.border, border = _c === void 0 ? false : _c, _d = _a.backgroundColor, backgroundColor = _d === void 0 ? 'var(--color-light-bg-secondary)' : _d, imageUrl = _a.imageUrl, Icon = _a.backgroundIcon, className = _a.className, children = _a.children, topAddons = _a.topAddons, bottomAddons = _a.bottomAddons, indicator = _a.indicator, pathsMap = _a.pathsMap, dataTestId = _a.dataTestId;
    var imagePatternId = imageUrl && "".concat(imageUrl.replace(/[^a-z0-9]+/g, ''), "_").concat(size);
    var svgPatternId = Icon && "svg_".concat(size);
    var hasTopAddons = Boolean(topAddons) && size > 32;
    var hasBottomAddons = Boolean(bottomAddons) && size > 32;
    var hasIndicator = Boolean(indicator) && size < 128;
    return (React.createElement("div", { className: cn(styles.componentWrapper, styles["size_".concat(size)], className), ref: ref, "data-test-id": dataTestId },
        React.createElement("div", { className: styles.component },
            React.createElement("svg", { width: size, height: size, viewBox: "0 0 ".concat(size, " ").concat(size), xmlns: 'http://www.w3.org/2000/svg', focusable: false },
                React.createElement("path", { className: styles.bg, style: {
                        fill: backgroundColor,
                    }, d: getPath({
                        size: size,
                        hasTopAddons: hasTopAddons,
                        hasBottomAddons: hasBottomAddons,
                        hasIndicator: hasIndicator,
                        pathsMap: pathsMap.shape,
                    }) }),
                imagePatternId && (React.createElement(Fragment, null,
                    React.createElement("defs", null,
                        React.createElement("pattern", { id: imagePatternId, width: '100%', height: '100%' },
                            React.createElement("image", { href: imageUrl, width: '100%', height: '100%', preserveAspectRatio: 'xMidYMid slice' }))),
                    React.createElement("path", { style: {
                            fill: "url(#".concat(imagePatternId, ")"),
                        }, d: getPath({
                            size: size,
                            hasTopAddons: hasTopAddons,
                            hasBottomAddons: hasBottomAddons,
                            hasIndicator: hasIndicator,
                            pathsMap: pathsMap.shape,
                        }) }))),
                Icon && !imageUrl && (React.createElement(Fragment, null,
                    React.createElement("defs", null,
                        React.createElement("pattern", { id: svgPatternId, width: '100%', height: '100%' },
                            React.createElement(Icon, { width: size, height: size }))),
                    React.createElement("path", { style: {
                            fill: "url(#".concat(svgPatternId, ")"),
                        }, d: getPath({
                            size: size,
                            hasTopAddons: hasTopAddons,
                            hasBottomAddons: hasBottomAddons,
                            hasIndicator: hasIndicator,
                            pathsMap: pathsMap.shape,
                        }) }))),
                border && (React.createElement("path", { className: styles.border, d: getPath({
                        size: size,
                        hasTopAddons: hasTopAddons,
                        hasBottomAddons: hasBottomAddons,
                        hasIndicator: hasIndicator,
                        pathsMap: pathsMap.border,
                    }) }))),
            !imageUrl && !Icon && React.createElement("div", { className: styles.children }, children)),
        hasTopAddons && (React.createElement("div", { className: cn(styles.addons, styles.topAddons) }, topAddons)),
        hasBottomAddons && (React.createElement("div", { className: cn(styles.addons, styles.bottomAddons) }, bottomAddons)),
        hasIndicator && !hasTopAddons && (React.createElement("div", { className: cn(styles.addons, styles.indicator) }, indicator))));
});

export { BaseShape };
