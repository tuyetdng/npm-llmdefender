var Component = require('./Component.js');
var utils = require('./utils.js');
require('react');
require('react-focus-lock');
require('react-merge-refs');
require('react-transition-group');
require('@juggle/resize-observer');
require('classnames');
require('../backdrop');
require('../portal');
require('../stack');
require('./matches-polyfill.js');
require('../global-store');



exports.BaseModal = Component.BaseModal;
exports.BaseModalContext = Component.BaseModalContext;
exports.getScrollbarSize = utils.getScrollbarSize;
exports.handleContainer = utils.handleContainer;
exports.hasScrollbar = utils.hasScrollbar;
exports.isScrolledToBottom = utils.isScrolledToBottom;
exports.isScrolledToTop = utils.isScrolledToTop;
exports.restoreContainerStyles = utils.restoreContainerStyles;
