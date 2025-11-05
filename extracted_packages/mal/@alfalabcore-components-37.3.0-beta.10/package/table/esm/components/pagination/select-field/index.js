import { _ as __rest, a as __assign } from '../../../tslib.es6-a84b316f.js';
import React from 'react';
import cn from 'classnames';
import { Button } from '../../../../../button/esm';

var styles = {"field":"table__field_1jeu8","open":"table__open_1jeu8"};
require('./index.css');

var CustomSelectField = function (_a) {
    var _b;
    var selected = _a.selected, innerProps = _a.innerProps, Arrow = _a.Arrow, open = _a.open;
    var ref = innerProps.ref, restInnerProps = __rest(innerProps, ["ref"]);
    return (React.createElement("div", { ref: ref },
        React.createElement(Button, __assign({}, restInnerProps, { size: 'xxs', view: 'link', className: cn(styles.field, (_b = {}, _b[styles.open] = open, _b)), rightAddons: Arrow }), selected === null || selected === void 0 ? void 0 : selected.content)));
};

export { CustomSelectField };
