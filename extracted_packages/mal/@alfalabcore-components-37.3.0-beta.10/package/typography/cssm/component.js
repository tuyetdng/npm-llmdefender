var text_component = require('./text/component.js');
var title_index = require('./title/index.js');
var titleMobile_component = require('./title-mobile/component.js');
var titleResponsive_component = require('./title-responsive/component.js');
require('./tslib.es6-bbd6cd2a.js');
require('react');
require('classnames');
require('./colors.module.css');
require('./text/index.module.css');
require('./title/component.js');
require('./title/common.module.css');
require('./title/index.module.css');
require('./title-mobile/index.module.css');
require('./title-responsive/index.module.css');

var Typography = {
    Title: title_index.Title,
    Text: text_component.Text,
    TitleResponsive: titleResponsive_component.TitleResponsive,
    TitleMobile: titleMobile_component.TitleMobile,
};

exports.Typography = Typography;
