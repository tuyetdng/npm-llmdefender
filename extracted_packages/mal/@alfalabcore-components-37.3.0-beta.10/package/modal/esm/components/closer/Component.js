import { a as __rest, _ as __assign } from '../../tslib.es6-ac9b62a7.js';
import React, { useContext, useCallback } from 'react';
import cn from 'classnames';
import { IconButton } from '../../../../icon-button/esm';
import { CrossHeavyMIcon } from '@alfalab/icons-glyph/CrossHeavyMIcon';
import { ModalContext } from '../../Context.js';
import '../../../../base-modal/esm';

var styles = {"closer":"modal__closer_dywtt","button":"modal__button_dywtt","sticky":"modal__sticky_dywtt"};
require('./index.css');

/**
 * @deprecated Компонент только для внутреннего использования. Используйте <Header />
 */
var Closer = function (_a) {
    var _b;
    var className = _a.className, _c = _a.size, size = _c === void 0 ? 's' : _c, sticky = _a.sticky, _d = _a.icon, icon = _d === void 0 ? CrossHeavyMIcon : _d, dataTestId = _a.dataTestId, restProps = __rest(_a, ["className", "size", "sticky", "icon", "dataTestId"]);
    var onClose = useContext(ModalContext).onClose;
    var handleClick = useCallback(function (event) {
        onClose(event, 'closerClick');
    }, [onClose]);
    return (React.createElement("div", { className: cn(styles.closer, className, (_b = {},
            _b[styles.sticky] = sticky,
            _b)) },
        React.createElement(IconButton, __assign({ size: size, className: styles.button, "aria-label": '\u0437\u0430\u043A\u0440\u044B\u0442\u044C', onClick: handleClick, icon: icon, dataTestId: dataTestId }, restProps))));
};

export { Closer };
