import React, { useContext } from 'react';
import cn from 'classnames';
import { ModalContext } from '../../Context.js';
import '../../../../base-modal/esm';

var styles = {"content":"side-panel__content_1n4gk","flex":"side-panel__flex_1n4gk"};
require('./index.css');

var Content = function (_a) {
    var children = _a.children, className = _a.className, dataTestId = _a.dataTestId;
    var contentRef = useContext(ModalContext).contentRef;
    return (React.createElement("div", { className: cn(styles.content, className, styles.flex), ref: contentRef, "data-test-id": dataTestId }, children));
};

export { Content };
