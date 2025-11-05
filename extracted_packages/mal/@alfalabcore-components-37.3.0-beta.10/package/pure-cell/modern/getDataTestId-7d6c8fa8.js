const getDataTestId = (dataTestId, element) => {
    const elementPart = element ? `-${element.toLowerCase()}` : '';
    return dataTestId ? `${dataTestId}${elementPart}` : undefined;
};

export { getDataTestId as g };
