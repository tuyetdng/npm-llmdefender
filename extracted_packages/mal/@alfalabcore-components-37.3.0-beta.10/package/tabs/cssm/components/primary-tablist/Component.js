var tslib_es6 = require('../../tslib.es6-0e9bf404.js');
var React = require('react');
var cn = require('classnames');
var coreComponentsBadge = require('../../../../badge/cssm');
var coreComponentsKeyboardFocusable = require('../../../../keyboard-focusable/cssm');
var desktop = require('../../../../picker-button/cssm/desktop');
var hooks_useTablistTitles = require('../../hooks/use-tablist-titles.js');
var syntheticEvents = require('../../synthetic-events.js');
var components_scrollableContainer_Component = require('../scrollable-container/Component.js');
var components_title_Component = require('../title/Component.js');
require('@alfalab/hooks');
require('../../hooks/use-collapsible-elements.js');
require('@juggle/resize-observer');
require('../../hooks/use-tabs.js');
require('compute-scroll-into-view');
require('../scrollable-container/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var PrimaryTabList = function (_a) {
    var size = _a.size, _b = _a.styles, styles = _b === void 0 ? {} : _b, className = _a.className, containerClassName = _a.containerClassName, _c = _a.titles, titles = _c === void 0 ? [] : _c, _d = _a.selectedId, selectedId = _d === void 0 ? titles.length ? titles[0].id : undefined : _d, _e = _a.scrollable, scrollable = _e === void 0 ? true : _e, collapsible = _a.collapsible, collapsedTabsIds = _a.collapsedTabsIds, fullWidthScroll = _a.fullWidthScroll, onChange = _a.onChange, dataTestId = _a.dataTestId, _f = _a.breakpoint, breakpoint = _f === void 0 ? 1024 : _f;
    var lineRef = React.useRef(null);
    var _g = hooks_useTablistTitles.useTablistTitles({
        titles: titles,
        selectedId: selectedId,
        collapsible: collapsible,
        collapsedTabsIds: collapsedTabsIds,
        breakpoint: breakpoint,
        onChange: onChange,
    }), containerRef = _g.containerRef, addonRef = _g.addonRef, tablistTitles = _g.tablistTitles, selectedTab = _g.selectedTab, focusedTab = _g.focusedTab, getTabListItemProps = _g.getTabListItemProps;
    React.useEffect(function () {
        if (selectedTab && lineRef.current) {
            lineRef.current.style.width = "".concat(selectedTab.offsetWidth, "px");
            lineRef.current.style.transform = "translateX(".concat(selectedTab.offsetLeft, "px)");
        }
    }, [selectedTab, tablistTitles]);
    var collapsedOptions = React.useMemo(function () {
        return tablistTitles.reduce(function (options, title) {
            if (title.collapsed) {
                options.push({
                    key: title.title,
                    value: title.id,
                    content: React__default.default.createElement(components_title_Component.Title, tslib_es6.__assign({}, title, { styles: styles, isOption: true })),
                });
            }
            return options;
        }, []);
    }, [tablistTitles, styles]);
    var collapsedAddonsLength = tablistTitles.filter(function (title) { return title.collapsed && title.rightAddons; }).length;
    var handleOptionsChange = function (payload) {
        var _a;
        if (((_a = payload.selected) === null || _a === void 0 ? void 0 : _a.value) && onChange) {
            var nativeMouseEvent = new MouseEvent('change');
            var syntheticMouseEvent = syntheticEvents.createSyntheticMouseEvent(nativeMouseEvent);
            onChange(syntheticMouseEvent, { selectedId: payload.selected.value });
        }
    };
    var renderContent = function () {
        var _a;
        return (React__default.default.createElement("div", { role: 'tablist', "data-test-id": dataTestId, className: cn__default.default(styles.component, className, size && styles[size], (_a = {},
                _a[styles.fullWidthScroll] = fullWidthScroll,
                _a)) },
            tablistTitles.map(function (title, index) { return (React__default.default.createElement(coreComponentsKeyboardFocusable.KeyboardFocusable, { key: title.id }, function (ref, focused) { return (React__default.default.createElement(components_title_Component.Title, tslib_es6.__assign({}, getTabListItemProps(index, ref), title, { focused: focused, styles: styles }))); })); }),
            collapsedOptions.length ? (React__default.default.createElement("span", { ref: addonRef, role: 'tablist', className: styles.pickerWrapper },
                React__default.default.createElement(desktop.PickerButtonDesktop, { fieldClassName: styles.title, optionClassName: cn__default.default(styles.pickerOption, size && styles[size]), options: collapsedOptions, onChange: handleOptionsChange, rightAddons: collapsedAddonsLength ? (React__default.default.createElement(coreComponentsBadge.Badge, { view: 'count', content: collapsedAddonsLength })) : null, size: 'l', view: 'ghost', label: '\u0415\u0449\u0451', popoverPosition: 'bottom-end' }))) : null,
            React__default.default.createElement("div", { className: styles.line, ref: lineRef })));
    };
    return scrollable && !collapsible ? (React__default.default.createElement(components_scrollableContainer_Component.ScrollableContainer, { activeChild: focusedTab || selectedTab, containerClassName: containerClassName, fullWidthScroll: fullWidthScroll }, renderContent())) : (React__default.default.createElement("div", { ref: containerRef, className: cn__default.default(styles.container, containerClassName) }, renderContent()));
};

exports.PrimaryTabList = PrimaryTabList;
