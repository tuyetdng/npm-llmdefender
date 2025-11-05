var tslib_es6 = require('../../tslib.es6-73852ed9.js');
var React = require('react');
var cn = require('classnames');
var components_secondaryTablist_Component = require('./Component.js');
var index_module = require('../../index.module-2dc94418.js');
require('../../../tag');
require('../../hooks/use-tabs.js');
require('../scrollable-container/Component.js');
require('compute-scroll-into-view');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var mobileStyles = {"title":"tabs__title_qaf9d tabs__title_1p09l","mobile":"tabs__mobile_qaf9d"};
require('./mobile.css');

var styles = tslib_es6.__assign(tslib_es6.__assign({}, index_module.commonStyles), mobileStyles);
var SecondaryTabListMobile = function (_a) {
    var className = _a.className, restProps = tslib_es6.__rest(_a, ["className"]);
    return (React__default.default.createElement(components_secondaryTablist_Component.SecondaryTabList, tslib_es6.__assign({}, restProps, { styles: styles, className: cn__default.default(className, styles.mobile), tagSize: 'xs' })));
};

exports.SecondaryTabListMobile = SecondaryTabListMobile;
