import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { PointIcon } from '../../icons/Point.js';

const styles = {"dotUnfocused":"chart__dotUnfocused_1k2nr","dot":"chart__dot_1k2nr","dotItem":"chart__dotItem_1k2nr","dotWrap":"chart__dotWrap_1k2nr","showDot":"chart__showDot_1k2nr"};
require('./index.css');

const Dot = React.forwardRef(({ cx, cy, index, activeDot, dataKey, dotSettings, value, stroke }, ref) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [option, setOption] = useState(null);
    useEffect(() => {
        let dotSetting = Array.isArray(dotSettings) && dotSettings.length > 0
            ? dotSettings.find((item) => item.media && windowWidth < item.media)
            : dotSettings;
        if (Array.isArray(dotSettings) && dotSettings.length > 0 && !dotSetting) {
            dotSetting = dotSettings[dotSettings.length - 1];
        }
        setWindowWidth(window.innerWidth);
        setOption(dotSetting);
    }, [dotSettings, windowWidth]);
    useEffect(() => {
        if (!option)
            return;
        if (typeof activeDot === 'number' && activeDot === index) {
            setHeight(option.height * option.scale);
            setWidth(option.width * option.scale);
        }
        else {
            setHeight(option.height * option.initScale);
            setWidth(option.width * option.initScale);
        }
    }, [activeDot, index, option]);
    if (!value)
        return null;
    return (React.createElement("g", { ref: ref, className: cn(styles.dot), transform: `translate(${cx - width / 2}, ${cy - height / 2})` },
        React.createElement("g", { className: cn(styles.dotWrap), transform: `scale(${activeDot === index ? option?.scale || 0 : option?.initScale || 0})` },
            React.createElement("svg", { className: cn(styles.dotItem, activeDot === index ? styles.dotActive : '', typeof activeDot === 'number' && activeDot !== index
                    ? styles.dotUnfocused
                    : ''), "data-id": index, "data-name": dataKey, width: option?.width || 0, height: option?.height || 0 },
                React.createElement(PointIcon, { fill: stroke })))));
});

export { Dot };
