import React, { useState, useEffect } from 'react';
import cn from 'classnames';

const styles = {"component":"cdn-icon__component_osgab"};
require('./index.css');

const CDNIcon = ({ name, color, dataTestId, className, baseUrl = 'https://alfabank.servicecdn.ru/icons', }) => {
    const [icon, setIcon] = useState('');
    useEffect(() => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${baseUrl}/${name}.svg`);
        xhr.send();
        xhr.onload = function onload() {
            const svg = xhr.response;
            if (svg.startsWith('<svg'))
                setIcon(svg);
        };
        return () => xhr.abort();
    }, [name, baseUrl]);
    return (React.createElement("span", { style: { color }, className: cn(styles.component, className), 
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML: { __html: icon }, "data-test-id": dataTestId }));
};

export { CDNIcon };
