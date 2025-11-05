var col_Component = require('./col/Component.js');
var row_Component = require('./row/Component.js');
require('./tslib.es6-fddeadfc.js');
require('react');
require('classnames');
require('./utils/index.js');
require('./gutters.module.css');
require('./col/index.module.css');
require('./row/index.module.css');

var Grid = {
    Row: row_Component.Row,
    Col: col_Component.Col,
};

exports.Grid = Grid;
