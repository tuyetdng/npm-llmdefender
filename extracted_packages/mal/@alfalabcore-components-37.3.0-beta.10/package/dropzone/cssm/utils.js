var preventAndStopEvent = function (event) {
    event.preventDefault();
    event.stopPropagation();
};

exports.preventAndStopEvent = preventAndStopEvent;
