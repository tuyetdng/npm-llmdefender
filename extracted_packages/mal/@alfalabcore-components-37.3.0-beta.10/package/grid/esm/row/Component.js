import { g as guttersStyles, _ as __spreadArray } from '../gutters.module-425f293c.js';
import React, { useMemo } from 'react';
import cn from 'classnames';
import { createClassNames } from '../utils/index.js';

var styles = {"component":"grid__component_g8xez","top":"grid__top_g8xez","middle":"grid__middle_g8xez","bottom":"grid__bottom_g8xez","left":"grid__left_g8xez","center":"grid__center_g8xez","right":"grid__right_g8xez","around":"grid__around_g8xez","between":"grid__between_g8xez"};
require('./index.css');

var Row = function (_a) {
    var _b = _a.tag, Component = _b === void 0 ? 'div' : _b, className = _a.className, _c = _a.gutter, gutter = _c === void 0 ? {
        mobile: {
            s: 16,
        },
        desktop: {
            m: 24,
        },
    } : _c, align = _a.align, _d = _a.justify, justify = _d === void 0 ? 'between' : _d, children = _a.children, dataTestId = _a.dataTestId;
    var classNames = useMemo(function () { return createClassNames({ gutter: gutter }, guttersStyles); }, [gutter]);
    return (React.createElement(Component, { className: cn.apply(void 0, __spreadArray(__spreadArray([guttersStyles.row,
            styles.component,
            align && styles[align],
            styles[justify]], classNames, false), [className], false)), "data-test-id": dataTestId }, children));
};

export { Row };
