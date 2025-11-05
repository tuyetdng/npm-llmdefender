var tslib_es6 = require('../../tslib.es6-0e9bf404.js');
var React = require('react');
var cn = require('classnames');
var coreComponentsTag = require('../../../../tag/cssm');
var hooks_useTabs = require('../../hooks/use-tabs.js');
var components_scrollableContainer_Component = require('../scrollable-container/Component.js');
require('compute-scroll-into-view');
require('../scrollable-container/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var SecondaryTabList = function (_a) {
    var _b = _a.styles, styles = _b === void 0 ? {} : _b, className = _a.className, containerClassName = _a.containerClassName, size = _a.size, _c = _a.titles, titles = _c === void 0 ? [] : _c, _d = _a.selectedId, selectedId = _d === void 0 ? titles.length ? titles[0].id : undefined : _d, _e = _a.scrollable, scrollable = _e === void 0 ? true : _e, fullWidthScroll = _a.fullWidthScroll, _f = _a.tagSize, tagSize = _f === void 0 ? 'xs' : _f, onChange = _a.onChange, dataTestId = _a.dataTestId;
    var _g = hooks_useTabs.useTabs({
        titles: titles,
        selectedId: selectedId,
        onChange: onChange,
    }), focusedTab = _g.focusedTab, selectedTab = _g.selectedTab, getTabListItemProps = _g.getTabListItemProps;
    var renderContent = function () {
        var _a;
        return (React__default.default.createElement("div", { role: 'tablist', "data-test-id": dataTestId, className: cn__default.default(styles.component, className, size && styles[size], (_a = {},
                _a[styles.fullWidthScroll] = fullWidthScroll,
                _a)) }, titles.map(function (item, index) {
            if (item.hidden)
                return null;
            return (React__default.default.createElement(coreComponentsTag.Tag, tslib_es6.__assign({}, getTabListItemProps(index), { key: item.id, className: cn__default.default(styles.title, item.toggleClassName), checked: item.id === selectedId, size: tagSize, rightAddons: item.rightAddons }), item.title));
        })));
    };
    return scrollable ? (React__default.default.createElement(components_scrollableContainer_Component.ScrollableContainer, { activeChild: focusedTab || selectedTab, containerClassName: containerClassName, fullWidthScroll: fullWidthScroll }, renderContent())) : (React__default.default.createElement("div", { className: cn__default.default(styles.container, containerClassName) }, renderContent()));
};

exports.SecondaryTabList = SecondaryTabList;
