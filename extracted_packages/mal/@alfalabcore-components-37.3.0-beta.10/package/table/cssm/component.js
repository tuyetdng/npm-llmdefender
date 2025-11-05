var components_table_Component = require('./components/table/Component.js');
var components_pagination_Component = require('./components/pagination/Component.js');
var components_thead_Component = require('./components/thead/Component.js');
var components_theadCell_Component = require('./components/thead-cell/Component.js');
var components_tsortableHeadCell_Component = require('./components/tsortable-head-cell/Component.js');
var components_tbody_Component = require('./components/tbody/Component.js');
var components_tcell_Component = require('./components/tcell/Component.js');
var components_trow_Component = require('./components/trow/Component.js');
var components_texpandableRow_Component = require('./components/texpandable-row/Component.js');
require('./tslib.es6-bbd6cd2a.js');
require('react');
require('classnames');
require('./components/table-context/index.js');
require('./components/table/utils.js');
require('./utils.js');
require('./components/table/index.module.css');
require('../../pagination/cssm');
require('../../select/cssm');
require('./components/pagination/select-field/index.js');
require('../../button/cssm');
require('./components/pagination/select-field/index.module.css');
require('./components/pagination/index.module.css');
require('./components/thead/index.module.css');
require('./components/thead-cell/index.module.css');
require('./components/tsortable-head-cell/sort-icon-asc.js');
require('./components/tsortable-head-cell/sort-icon-desc.js');
require('./components/tsortable-head-cell/sort-icon-unset.js');
require('./components/tsortable-head-cell/index.module.css');
require('./components/tbody/index.module.css');
require('./components/tcell/index.module.css');
require('./components/trow/index.module.css');
require('./components/texpandable-row/index.module.css');

var Table = Object.assign(components_table_Component.Table, {
    TBody: components_tbody_Component.TBody,
    THead: components_thead_Component.THead,
    THeadCell: components_theadCell_Component.THeadCell,
    TSortableHeadCell: components_tsortableHeadCell_Component.TSortableHeadCell,
    TCell: components_tcell_Component.TCell,
    TRow: components_trow_Component.TRow,
    TExpandableRow: components_texpandableRow_Component.TExpandableRow,
    Pagination: components_pagination_Component.Pagination,
});

exports.Table = Table;
