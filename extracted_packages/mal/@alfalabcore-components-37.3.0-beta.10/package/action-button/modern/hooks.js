import { useRef, useState, useEffect } from 'react';

const useLoader = (loading, timeout) => {
    const timerId = useRef(0);
    const [loaderTimePassed, setLoaderTimePassed] = useState(true);
    const showLoader = loading || !loaderTimePassed;
    useEffect(() => {
        if (loading) {
            setLoaderTimePassed(false);
            if (timerId.current) {
                window.clearTimeout(timerId.current);
            }
            timerId.current = window.setTimeout(() => {
                setLoaderTimePassed(true);
            }, timeout);
        }
    }, [loading, timeout]);
    useEffect(() => {
        if (timerId.current) {
            window.clearTimeout(timerId.current);
        }
    }, []);
    return { showLoader };
};

export { useLoader };
