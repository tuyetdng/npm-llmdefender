import React from 'react';
import cn from 'classnames';

const styles = {"component":"skeleton__component_bgmht","animate":"skeleton__animate_bgmht","background":"skeleton__background_bgmht","gradient":"skeleton__gradient_bgmht"};
require('./index.css');

const Skeleton = ({ visible, animate = true, className, dataTestId, children, }) => {
    if (visible) {
        return (React.createElement("div", { className: cn(styles.component, { [styles.animate]: animate }, className), "data-test-id": dataTestId }, children));
    }
    return (React.createElement("div", { "data-test-id": dataTestId, className: className }, children));
};

export { Skeleton };
