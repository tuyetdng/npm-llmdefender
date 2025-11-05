var tslib_es6 = require('../../../tslib.es6-19b064c1.js');

var setDatas = function (series, labels) {
    var initData = [];
    var chartsNames = {};
    var count = 0;
    var _loop_1 = function (i) {
        var _a = series[i], _b = _a.properties, _c = _b === void 0 ? {} : _b, _d = _c.dataKey, dataKey = _d === void 0 ? '' : _d, _e = _a.data, seriaData = _e === void 0 ? [] : _e, hideLegend = _a.hideLegend, hide = _a.hide;
        if (!hideLegend && !hide)
            count += 1;
        labels.map(function (label) {
            var item = seriaData.find(function (d) { return d.label === label; });
            if (item) {
                var obj = {
                    label: label,
                };
                obj["".concat(dataKey)] = item.value;
                if (!chartsNames["".concat(dataKey)])
                    chartsNames["".concat(dataKey)] = true;
                var index = initData
                    .map(function (dataItem) { return dataItem.label; })
                    .indexOf(label);
                if (index === -1)
                    initData.push(obj);
                else
                    initData[index] = tslib_es6.__assign(tslib_es6.__assign({}, initData[index]), obj);
            }
            return null;
        });
    };
    for (var i = 0; i < series.length; i++) {
        _loop_1(i);
    }
    return [initData, chartsNames, count];
};

exports.setDatas = setDatas;
