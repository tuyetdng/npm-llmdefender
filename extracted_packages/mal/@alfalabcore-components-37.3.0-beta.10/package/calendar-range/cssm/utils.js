var isDayButton = function (node) {
    return node && node.tagName === 'BUTTON' && node.dataset.date;
};

exports.isDayButton = isDayButton;
