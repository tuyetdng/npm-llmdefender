var tslib_es6 = require('../../tslib.es6-bbd6cd2a.js');
var React = require('react');
var cn = require('classnames');
var coreComponentsPagination = require('../../../../pagination/cssm');
var coreComponentsSelect = require('../../../../select/cssm');
var components_tableContext_index = require('../table-context/index.js');
var components_pagination_selectField_index = require('./select-field/index.js');
var styles = require('./index.module.css');
require('../../../../button/cssm');
require('./select-field/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var Pagination = function (_a) {
    var _b = _a.perPage, perPage = _b === void 0 ? 25 : _b, _c = _a.possiblePerPage, possiblePerPage = _c === void 0 ? [25, 50, 100] : _c, _d = _a.onPerPageChange, onPerPageChange = _d === void 0 ? function () { return null; } : _d, pagesCount = _a.pagesCount, _e = _a.onPageChange, onPageChange = _e === void 0 ? function () { return null; } : _e, className = _a.className, dataTestId = _a.dataTestId, restPaginationProps = tslib_es6.__rest(_a, ["perPage", "possiblePerPage", "onPerPageChange", "pagesCount", "onPageChange", "className", "dataTestId"]);
    var wrapperRef = React.useContext(components_tableContext_index.TableContext).wrapperRef;
    var options = React.useMemo(function () {
        return Array.from(new Set(possiblePerPage.concat(perPage)))
            .sort(function (a, b) { return a - b; })
            .map(function (value) { return ({
            key: value.toString(),
            content: "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u043F\u043E ".concat(value),
        }); });
    }, [perPage, possiblePerPage]);
    var handlePerPageChange = React.useCallback(function (_a) {
        var selected = _a.selected;
        onPerPageChange(Number(selected === null || selected === void 0 ? void 0 : selected.key));
    }, [onPerPageChange]);
    var handlePageChange = React.useCallback(function (pageIndex) {
        onPageChange(pageIndex);
        setTimeout(function () {
            if (wrapperRef.current) {
                wrapperRef.current.scrollIntoView();
            }
        }, 0);
    }, [onPageChange, wrapperRef]);
    return (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.component, className), "data-test-id": dataTestId },
        React__default.default.createElement(coreComponentsSelect.Select, { options: options, selected: perPage.toString(), onChange: handlePerPageChange, preventFlip: false, size: 's', className: styles__default.default.select, optionsListClassName: styles__default.default.menu, optionClassName: styles__default.default.option, Field: components_pagination_selectField_index.CustomSelectField }),
        pagesCount > 1 && (React__default.default.createElement(coreComponentsPagination.Pagination, tslib_es6.__assign({ pagesCount: pagesCount, onPageChange: handlePageChange }, restPaginationProps)))));
};

exports.Pagination = Pagination;
