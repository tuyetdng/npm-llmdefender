import React, { useContext } from 'react';
import cn from 'classnames';
import { ModalContext } from '../../Context.js';
import '../../../../base-modal/modern';

const styles = {"content":"side-panel__content_1n4gk","flex":"side-panel__flex_1n4gk"};
require('./index.css');

const Content = ({ children, className, dataTestId }) => {
    const { contentRef } = useContext(ModalContext);
    return (React.createElement("div", { className: cn(styles.content, className, styles.flex), ref: contentRef, "data-test-id": dataTestId }, children));
};

export { Content };
