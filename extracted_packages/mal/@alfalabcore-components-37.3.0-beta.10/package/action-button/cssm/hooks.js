var React = require('react');

var useLoader = function (loading, timeout) {
    var timerId = React.useRef(0);
    var _a = React.useState(true), loaderTimePassed = _a[0], setLoaderTimePassed = _a[1];
    var showLoader = loading || !loaderTimePassed;
    React.useEffect(function () {
        if (loading) {
            setLoaderTimePassed(false);
            if (timerId.current) {
                window.clearTimeout(timerId.current);
            }
            timerId.current = window.setTimeout(function () {
                setLoaderTimePassed(true);
            }, timeout);
        }
    }, [loading, timeout]);
    React.useEffect(function () {
        if (timerId.current) {
            window.clearTimeout(timerId.current);
        }
    }, []);
    return { showLoader: showLoader };
};

exports.useLoader = useLoader;
