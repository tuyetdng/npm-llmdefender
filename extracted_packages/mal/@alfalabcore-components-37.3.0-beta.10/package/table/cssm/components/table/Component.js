var tslib_es6 = require('../../tslib.es6-bbd6cd2a.js');
var React = require('react');
var cn = require('classnames');
var components_tableContext_index = require('../table-context/index.js');
var components_table_utils = require('./utils.js');
var styles = require('./index.module.css');
require('../../utils.js');
require('../thead/Component.js');
require('../thead/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var Table = React.forwardRef(function (_a, ref) {
    var _b;
    var className = _a.className, children = _a.children, _c = _a.compactView, compactView = _c === void 0 ? false : _c, _d = _a.compactHorizontal, compactHorizontal = _d === void 0 ? false : _d, _e = _a.wrapper, wrapper = _e === void 0 ? true : _e, pagination = _a.pagination, dataTestId = _a.dataTestId, _f = _a.stickyHeader, stickyHeader = _f === void 0 ? false : _f, restProps = tslib_es6.__rest(_a, ["className", "children", "compactView", "compactHorizontal", "wrapper", "pagination", "dataTestId", "stickyHeader"]);
    var wrapperRef = React.useRef(null);
    var columnsConfiguration = React.useMemo(function () {
        return components_table_utils.findAllHeadCellsProps(children).map(function (columnProps, index) { return ({
            width: columnProps.width,
            textAlign: columnProps.textAlign,
            hidden: columnProps.hidden,
            index: index,
        }); });
    }, [children]);
    /* eslint-disable react/jsx-no-constructed-context-values */
    return (React__default.default.createElement(components_tableContext_index.TableContext.Provider, { value: {
            stickyHeader: stickyHeader,
            columnsConfiguration: columnsConfiguration,
            compactView: compactView,
            compactHorizontal: compactHorizontal,
            wrapperRef: wrapperRef,
        } },
        React__default.default.createElement("div", { ref: wrapperRef, className: cn__default.default(styles__default.default.component, className, (_b = {},
                _b[styles__default.default.wrapper] = wrapper,
                _b[styles__default.default.hasPagination] = !!pagination,
                _b[styles__default.default.stickyHeader] = stickyHeader,
                _b)), "data-test-id": dataTestId },
            React__default.default.createElement("table", tslib_es6.__assign({ ref: ref, className: styles__default.default.table }, restProps), children),
            pagination)));
});

exports.Table = Table;
