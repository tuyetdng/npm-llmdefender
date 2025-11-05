var tslib_es6 = require('./tslib.es6-76668849.js');
var React = require('react');
var components_closer_Component = require('./components/closer/Component.js');
var components_content_Component = require('./components/content/Component.js');
var components_footer_Component = require('./components/footer/Component.js');
var components_header_Component = require('./components/header/Component.js');
var Component = require('./Component.js');
require('classnames');
require('../icon-button');
require('@alfalab/icons-glyph/CrossHeavyMIcon');
require('./Context.js');
require('../base-modal');
require('./ResponsiveContext.js');
require('@alfalab/icons-glyph/CrossMIcon');
require('react-merge-refs');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var ModalMobileComponent = React.forwardRef(function (props, ref) { return (React__default.default.createElement(Component.Modal, tslib_es6.__assign({}, props, { ref: ref, view: 'mobile' }))); });
var ModalMobile = Object.assign(ModalMobileComponent, {
    Content: components_content_Component.Content,
    Header: components_header_Component.Header,
    Footer: components_footer_Component.Footer,
    Closer: components_closer_Component.Closer,
});

exports.ModalMobile = ModalMobile;
