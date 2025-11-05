import React, { useState, useEffect } from 'react';
import cn from 'classnames';

var styles = {"component":"cdn-icon__component_osgab"};
require('./index.css');

var CDNIcon = function (_a) {
    var name = _a.name, color = _a.color, dataTestId = _a.dataTestId, className = _a.className, _b = _a.baseUrl, baseUrl = _b === void 0 ? 'https://alfabank.servicecdn.ru/icons' : _b;
    var _c = useState(''), icon = _c[0], setIcon = _c[1];
    useEffect(function () {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "".concat(baseUrl, "/").concat(name, ".svg"));
        xhr.send();
        xhr.onload = function onload() {
            var svg = xhr.response;
            if (svg.startsWith('<svg'))
                setIcon(svg);
        };
        return function () { return xhr.abort(); };
    }, [name, baseUrl]);
    return (React.createElement("span", { style: { color: color }, className: cn(styles.component, className), 
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML: { __html: icon }, "data-test-id": dataTestId }));
};

export { CDNIcon };
