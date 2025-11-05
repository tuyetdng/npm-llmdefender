var React = require('react');
var cn = require('classnames');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var ButtonList = function (_a) {
    var buttons = _a.buttons, buttonClassName = _a.buttonClassName, containerClassName = _a.containerClassName;
    var buttonsIsArray = Array.isArray(buttons) && buttons.length > 0;
    if (buttonsIsArray) {
        return (React__default.default.createElement("div", { className: containerClassName }, buttons.map(function (button, index) {
            return button
                ? React__default.default.cloneElement(button, {
                    // eslint-disable-next-line react/no-array-index-key
                    key: index,
                    size: 'xxs',
                    view: index === 0 ? 'secondary' : 'link',
                    className: cn__default.default(button.props.className, buttonClassName),
                })
                : null;
        })));
    }
    return React__default.default.createElement("div", { className: containerClassName }, buttons);
};

exports.ButtonList = ButtonList;
