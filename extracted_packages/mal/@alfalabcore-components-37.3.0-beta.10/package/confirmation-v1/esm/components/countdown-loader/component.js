import React from 'react';

var styles = {"circle":"confirmation-v1__circle_bl1nf"};
require('./index.css');

var SIZE = 16;
var STROKE_WIDTH = 2;
var CENTER = SIZE / 2;
var RADIUS = CENTER - STROKE_WIDTH / 2;
/** Длина окружности */
var CIRCUMFERENCE = Math.PI * RADIUS * 2;
var CountdownLoader = function (_a) {
    var progress = _a.progress, className = _a.className;
    var value = Math.min(progress, 1);
    var strokeDasharray = CIRCUMFERENCE.toFixed(2);
    var strokeDashoffset = (value * CIRCUMFERENCE).toFixed(2);
    return (React.createElement("svg", { width: SIZE, height: SIZE, viewBox: "0 0 ".concat(SIZE, " ").concat(SIZE), className: className },
        React.createElement("circle", { cx: CENTER, cy: CENTER, r: RADIUS, strokeDasharray: strokeDasharray, strokeDashoffset: strokeDashoffset, transform: "rotate(-90 ".concat(CENTER, " ").concat(CENTER, ")"), className: styles.circle })));
};

export { CountdownLoader };
