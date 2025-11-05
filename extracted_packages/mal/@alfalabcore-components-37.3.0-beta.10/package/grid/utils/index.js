function createClassNames(props, styles) {
    var classNames = [];
    Object.keys(props).forEach(function (name) {
        var prop = props[name];
        if (!prop) {
            return;
        }
        if (typeof prop !== 'object') {
            classNames.push(styles["".concat(name, "-").concat(prop)]);
            return;
        }
        Object.keys(prop).forEach(function (breakpoint) {
            if (prop[breakpoint] === null) {
                return;
            }
            if (typeof prop[breakpoint] === 'object') {
                var propBreakpointObject_1 = prop[breakpoint];
                Object.keys(propBreakpointObject_1).forEach(function (size) {
                    var value = propBreakpointObject_1[size];
                    if (value === null) {
                        return;
                    }
                    classNames.push(styles["".concat(name, "-").concat(breakpoint, "-").concat(size, "-").concat(value)]);
                });
            }
            else {
                var value = prop[breakpoint];
                classNames.push(styles["".concat(name, "-").concat(breakpoint, "-").concat(value)]);
            }
        });
    });
    return classNames;
}

exports.createClassNames = createClassNames;
