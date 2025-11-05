var tslib_es6 = require('../../tslib.es6-73852ed9.js');
var React = require('react');
var cn = require('classnames');
var components_primaryTablist_Component = require('./Component.js');
var index_module = require('../../index.module-5aa5df6f.js');
require('../../../badge');
require('../../../keyboard-focusable');
require('../../../picker-button/desktop');
require('../../hooks/use-tablist-titles.js');
require('@alfalab/hooks');
require('../../hooks/use-collapsible-elements.js');
require('@juggle/resize-observer');
require('../../hooks/use-tabs.js');
require('../../synthetic-events.js');
require('../scrollable-container/Component.js');
require('compute-scroll-into-view');
require('../title/Component.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var mobileStyles = {"title":"tabs__title_f1h14 tabs__title_1w0vv","mobile":"tabs__mobile_f1h14"};
require('./mobile.css');

var styles = tslib_es6.__assign(tslib_es6.__assign({}, index_module.commonStyles), mobileStyles);
var PrimaryTabListMobile = function (_a) {
    var className = _a.className, restProps = tslib_es6.__rest(_a, ["className"]);
    return (React__default.default.createElement(components_primaryTablist_Component.PrimaryTabList, tslib_es6.__assign({}, restProps, { styles: styles, className: cn__default.default(className, styles.mobile) })));
};

exports.PrimaryTabListMobile = PrimaryTabListMobile;
