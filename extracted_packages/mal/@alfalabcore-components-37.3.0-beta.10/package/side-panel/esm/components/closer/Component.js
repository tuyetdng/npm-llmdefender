import { _ as __rest, a as __assign } from '../../tslib.es6-46a2fd0f.js';
import React, { useContext, useCallback } from 'react';
import cn from 'classnames';
import { IconButton } from '../../../../icon-button/esm';
import { ModalContext } from '../../Context.js';
import '../../../../base-modal/esm';

var styles = {"closer":"side-panel__closer_1f6zk","button":"side-panel__button_1f6zk","sticky":"side-panel__sticky_1f6zk"};
require('./index.css');

/**
 * @deprecated Компонент только для внутреннего использования. Используйте <Header />
 */
var Closer = function (_a) {
    var _b;
    var className = _a.className, _c = _a.size, size = _c === void 0 ? 's' : _c, sticky = _a.sticky, icon = _a.icon, restProps = __rest(_a, ["className", "size", "sticky", "icon"]);
    var onClose = useContext(ModalContext).onClose;
    var handleClick = useCallback(function (event) {
        onClose(event, 'closerClick');
    }, [onClose]);
    return (React.createElement("div", { className: cn(styles.closer, className, (_b = {},
            _b[styles.sticky] = sticky,
            _b)) },
        React.createElement(IconButton, __assign({ size: size, className: styles.button, "aria-label": '\u0437\u0430\u043A\u0440\u044B\u0442\u044C', onClick: handleClick, icon: icon }, restProps))));
};

export { Closer };
