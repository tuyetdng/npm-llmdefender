var text_component = require('./text/component.js');
var title_index = require('./title/index.js');
var titleMobile_component = require('./title-mobile/component.js');
var titleResponsive_component = require('./title-responsive/component.js');
require('./colors.module-f2db4c0a.js');
require('react');
require('classnames');
require('./title/component.js');
require('./common.module-9e0238a7.js');

var Typography = {
    Title: title_index.Title,
    Text: text_component.Text,
    TitleResponsive: titleResponsive_component.TitleResponsive,
    TitleMobile: titleMobile_component.TitleMobile,
};

exports.Typography = Typography;
