var tslib_es6 = require('../../tslib.es6-0e9bf404.js');
var React = require('react');
var cn = require('classnames');
var components_primaryTablist_Component = require('./Component.js');
var styles$1 = require('./index.module.css');
var mobileStyles = require('./mobile.module.css');
require('../../../../badge/cssm');
require('../../../../keyboard-focusable/cssm');
require('../../../../picker-button/cssm/desktop');
require('../../hooks/use-tablist-titles.js');
require('@alfalab/hooks');
require('../../hooks/use-collapsible-elements.js');
require('@juggle/resize-observer');
require('../../hooks/use-tabs.js');
require('../../synthetic-events.js');
require('../scrollable-container/Component.js');
require('compute-scroll-into-view');
require('../scrollable-container/index.module.css');
require('../title/Component.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles$1);
var mobileStyles__default = /*#__PURE__*/_interopDefaultCompat(mobileStyles);

var styles = tslib_es6.__assign(tslib_es6.__assign({}, styles__default.default), mobileStyles__default.default);
var PrimaryTabListMobile = function (_a) {
    var className = _a.className, restProps = tslib_es6.__rest(_a, ["className"]);
    return (React__default.default.createElement(components_primaryTablist_Component.PrimaryTabList, tslib_es6.__assign({}, restProps, { styles: styles, className: cn__default.default(className, styles.mobile) })));
};

exports.PrimaryTabListMobile = PrimaryTabListMobile;
