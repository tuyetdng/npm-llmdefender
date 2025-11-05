var React = require('react');
var cn = require('classnames');
var computeScrollIntoView = require('compute-scroll-into-view');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var computeScrollIntoView__default = /*#__PURE__*/_interopDefaultCompat(computeScrollIntoView);

var styles = {"container":"tabs__container_1lf44","fullWidthScroll":"tabs__fullWidthScroll_1lf44"};
require('./index.css');

/**
 * Дополнительная прокрутка при клике на не поместившийся таб
 */
var ADDITIONAL_SCROLLLEFT_VALUE = 40;
var ScrollableContainer = function (_a) {
    var _b;
    var containerClassName = _a.containerClassName, children = _a.children, activeChild = _a.activeChild, fullWidthScroll = _a.fullWidthScroll;
    React.useEffect(function () {
        if (activeChild) {
            var actions = computeScrollIntoView__default.default(activeChild, {
                scrollMode: 'if-needed',
                block: 'nearest',
                inline: 'nearest',
            });
            // TODO: animate?
            actions.forEach(function (_a, index) {
                var el = _a.el, left = _a.left;
                if (index === 0)
                    return;
                // eslint-disable-next-line no-param-reassign
                el.scrollLeft =
                    el.scrollLeft > left
                        ? left - ADDITIONAL_SCROLLLEFT_VALUE
                        : left + ADDITIONAL_SCROLLLEFT_VALUE;
            });
        }
    }, [activeChild]);
    return (React__default.default.createElement("div", { className: cn__default.default(styles.container, containerClassName, (_b = {},
            _b[styles.fullWidthScroll] = fullWidthScroll,
            _b)) }, children));
};

exports.ScrollableContainer = ScrollableContainer;
