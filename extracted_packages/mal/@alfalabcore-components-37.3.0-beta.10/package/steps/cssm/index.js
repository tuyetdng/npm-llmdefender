var Component = require('./Component.js');
require('react');
require('classnames');
require('./components/step/Component.js');
require('@alfalab/hooks');
require('@alfalab/icons-glyph/CheckmarkCircleMIcon');
require('@alfalab/icons-glyph/ClockMIcon');
require('@alfalab/icons-glyph/ExclamationCircleMIcon');
require('./components/step-indicator/Component.js');
require('../../badge/cssm');
require('./components/step-indicator/index.module.css');
require('./components/step/index.module.css');
require('./index.module.css');



exports.Steps = Component.Steps;
