import { useRef, useState, useEffect } from 'react';

var useLoader = function (loading, timeout) {
    var timerId = useRef(0);
    var _a = useState(true), loaderTimePassed = _a[0], setLoaderTimePassed = _a[1];
    var showLoader = loading || !loaderTimePassed;
    useEffect(function () {
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
    useEffect(function () {
        if (timerId.current) {
            window.clearTimeout(timerId.current);
        }
    }, []);
    return { showLoader: showLoader };
};

export { useLoader };
