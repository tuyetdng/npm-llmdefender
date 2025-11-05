var tslib_es6 = require('../../tslib.es6-0e9bf404.js');
var React = require('react');
var cn = require('classnames');
var components_secondaryTablist_Component = require('./Component.js');
var commonStyles = require('./index.module.css');
var mobileStyles = require('./mobile.module.css');
require('../../../../tag/cssm');
require('../../hooks/use-tabs.js');
require('../scrollable-container/Component.js');
require('compute-scroll-into-view');
require('../scrollable-container/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var commonStyles__default = /*#__PURE__*/_interopDefaultCompat(commonStyles);
var mobileStyles__default = /*#__PURE__*/_interopDefaultCompat(mobileStyles);

var styles = tslib_es6.__assign(tslib_es6.__assign({}, commonStyles__default.default), mobileStyles__default.default);
var SecondaryTabListMobile = function (_a) {
    var className = _a.className, restProps = tslib_es6.__rest(_a, ["className"]);
    return (React__default.default.createElement(components_secondaryTablist_Component.SecondaryTabList, tslib_es6.__assign({}, restProps, { styles: styles, className: cn__default.default(className, styles.mobile), tagSize: 'xs' })));
};

exports.SecondaryTabListMobile = SecondaryTabListMobile;
