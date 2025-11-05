const sortByIndex = (series) => series.sort((a, b) => {
    if (a?.zIndex && b?.zIndex && a?.zIndex > b?.zIndex) {
        return 1;
    }
    return -1;
});

export { sortByIndex };
