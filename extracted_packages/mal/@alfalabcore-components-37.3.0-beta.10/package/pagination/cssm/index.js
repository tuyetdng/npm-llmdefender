var Component = require('./Component.js');
require('react');
require('classnames');
require('@alfalab/icons-glyph/ChevronBackMIcon');
require('@alfalab/icons-glyph/ChevronForwardMIcon');
require('./components/default-view/index.js');
require('./components/tag/index.js');
require('../../tag/cssm');
require('./components/tag/index.module.css');
require('./components/default-view/index.module.css');
require('./components/per-page-view/index.js');
require('./components/per-page-view/index.module.css');
require('./index.module.css');



exports.Pagination = Component.Pagination;
