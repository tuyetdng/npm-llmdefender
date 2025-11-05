var React = require('react');
var cn = require('classnames');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var CDNIcon = function (_a) {
    var name = _a.name, color = _a.color, dataTestId = _a.dataTestId, className = _a.className, _b = _a.baseUrl, baseUrl = _b === void 0 ? 'https://alfabank.servicecdn.ru/icons' : _b;
    var _c = React.useState(''), icon = _c[0], setIcon = _c[1];
    React.useEffect(function () {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "".concat(baseUrl, "/").concat(name, ".svg"));
        xhr.send();
        xhr.onload = function onload() {
            var svg = xhr.response;
            if (svg.startsWith('<svg'))
                setIcon(svg);
        };
        return function () { return xhr.abort(); };
    }, [name, baseUrl]);
    return (React__default.default.createElement("span", { style: { color: color }, className: cn__default.default(styles__default.default.component, className), 
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML: { __html: icon }, "data-test-id": dataTestId }));
};

exports.CDNIcon = CDNIcon;
