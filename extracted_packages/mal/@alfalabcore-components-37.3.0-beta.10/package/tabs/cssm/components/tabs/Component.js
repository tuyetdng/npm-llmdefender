var React = require('react');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var Tabs = function (_a) {
    var TabList = _a.TabList, className = _a.className, containerClassName = _a.containerClassName, size = _a.size, defaultMatch = _a.defaultMatch, children = _a.children, selectedId = _a.selectedId, scrollable = _a.scrollable, collapsible = _a.collapsible, collapsedTabsIds = _a.collapsedTabsIds, _b = _a.fullWidthScroll, fullWidthScroll = _b === void 0 ? false : _b, _c = _a.keepMounted, keepMounted = _c === void 0 ? false : _c, dataTestId = _a.dataTestId, onChange = _a.onChange;
    var tabsArray = React__default.default.Children.toArray(children);
    var titles = tabsArray.map(function (_a) {
        var _b = _a.props, title = _b.title, id = _b.id, rightAddons = _b.rightAddons, disabled = _b.disabled, hidden = _b.hidden, toggleClassName = _b.toggleClassName;
        return ({
            title: title,
            id: id,
            disabled: disabled,
            rightAddons: rightAddons,
            hidden: hidden,
            toggleClassName: toggleClassName,
        });
    });
    var tabs = tabsArray.filter(function (tab) { return tab.props.id === selectedId || tab.props.keepMounted || keepMounted; });
    return (React__default.default.createElement("div", { className: className },
        React__default.default.createElement(TabList, { containerClassName: containerClassName, size: size, titles: titles, selectedId: selectedId, scrollable: scrollable, collapsible: collapsible, collapsedTabsIds: collapsedTabsIds, onChange: onChange, dataTestId: dataTestId, defaultMatch: defaultMatch, fullWidthScroll: fullWidthScroll }),
        tabs.map(function (tab) { return React.cloneElement(tab, { hidden: tab.props.id !== selectedId }); })));
};

exports.Tabs = Tabs;
