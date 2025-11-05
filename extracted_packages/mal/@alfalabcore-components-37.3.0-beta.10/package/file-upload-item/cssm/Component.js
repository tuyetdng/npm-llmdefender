var React = require('react');
var cn = require('classnames');
var coreComponentsIconButton = require('../../icon-button/cssm');
var coreComponentsLink = require('../../link/cssm');
var coreComponentsSpinner = require('../../spinner/cssm');
var AlertCircleMIcon = require('@alfalab/icons-glyph/AlertCircleMIcon');
var CheckmarkCircleMIcon = require('@alfalab/icons-glyph/CheckmarkCircleMIcon');
var ClockMIcon = require('@alfalab/icons-glyph/ClockMIcon');
var CrossSIcon = require('@alfalab/icons-glyph/CrossSIcon');
var PointerDownSIcon = require('@alfalab/icons-glyph/PointerDownSIcon');
var utils = require('./utils.js');
var styles = require('./index.module.css');
require('@alfalab/icons-glyph/DocumentDocMIcon');
require('@alfalab/icons-glyph/DocumentImageMIcon');
require('@alfalab/icons-glyph/DocumentPdfMIcon');
require('@alfalab/icons-glyph/DocumentTxtMIcon');
require('@alfalab/icons-glyph/DocumentUnknownMIcon');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var FileUploadItem = function (_a) {
    var className = _a.className, children = _a.children, _b = _a.id, id = _b === void 0 ? '0' : _b, _c = _a.name, name = _c === void 0 ? '' : _c, size = _a.size, _d = _a.icon, Icon = _d === void 0 ? utils.fileIcon(name) : _d, uploadDate = _a.uploadDate, downloadLink = _a.downloadLink, download = _a.download, uploadStatus = _a.uploadStatus, _e = _a.uploadPercent, uploadPercent = _e === void 0 ? 0 : _e, error = _a.error, showDelete = _a.showDelete, showRestore = _a.showRestore, onDelete = _a.onDelete, onDownload = _a.onDownload, onRestore = _a.onRestore, disableButtons = _a.disableButtons, dataTestId = _a.dataTestId;
    var handleDownload = function (event) {
        if (onDownload) {
            event.preventDefault();
            onDownload(id);
        }
    };
    var handleDelete = function () {
        if (onDelete)
            onDelete(id);
    };
    var handleRestore = function () {
        if (onRestore)
            onRestore(id);
    };
    var renderIcon = function () {
        if (showRestore) {
            return React__default.default.createElement(ClockMIcon.ClockMIcon, { className: styles__default.default.restoreIcon });
        }
        switch (uploadStatus) {
            case 'ERROR':
                return React__default.default.createElement(AlertCircleMIcon.AlertCircleMIcon, { className: styles__default.default.errorIcon });
            case 'SUCCESS':
                return React__default.default.createElement(CheckmarkCircleMIcon.CheckmarkCircleMIcon, { className: styles__default.default.successIcon });
            case 'LOADING':
            case 'UPLOADING':
                return (React__default.default.createElement("div", { className: styles__default.default.spinnerWrapper },
                    React__default.default.createElement(coreComponentsSpinner.Spinner, { visible: true, className: styles__default.default.spinner })));
            default: {
                return React__default.default.createElement(Icon, { className: styles__default.default.icon });
            }
        }
    };
    var renderInfoSection = function () {
        var shouldShownError = uploadStatus === 'ERROR' || !!error;
        var errorContent = uploadStatus === 'ERROR' && !error ? 'Не удалось загрузить файл' : error;
        return (React__default.default.createElement("div", { className: styles__default.default.infoSection },
            React__default.default.createElement("div", { className: styles__default.default.name }, name),
            shouldShownError && (React__default.default.createElement("div", { className: styles__default.default.errorWrapper, role: 'alert' }, errorContent))));
    };
    var showMeta = !showRestore && (!uploadStatus || uploadStatus === 'SUCCESS');
    var showDownload = Boolean(downloadLink) && !showRestore;
    return (React__default.default.createElement("div", { className: cn__default.default(className, styles__default.default.component, uploadStatus && styles__default.default[uploadStatus.toLocaleLowerCase()]), "data-test-id": dataTestId },
        React__default.default.createElement("div", { className: styles__default.default.info },
            renderIcon(),
            renderInfoSection(),
            children,
            uploadStatus === 'UPLOADING' && (React__default.default.createElement("span", { className: styles__default.default.uploadPercent }, "".concat(Math.round(uploadPercent), "%"))),
            showMeta && (React__default.default.createElement("div", { className: styles__default.default.meta },
                uploadDate && React__default.default.createElement("span", { key: uploadDate }, uploadDate),
                size && (React__default.default.createElement("span", { key: size, className: styles__default.default.size }, utils.humanFileSize(size)))))),
        showRestore && (React__default.default.createElement(coreComponentsLink.Link, { pseudo: true, className: styles__default.default.restore, onClick: handleRestore }, "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C")),
        showDownload && (React__default.default.createElement(coreComponentsIconButton.IconButton, { size: 'xxs', icon: PointerDownSIcon.PointerDownSIcon, className: styles__default.default.download, "aria-label": '\u0441\u043A\u0430\u0447\u0430\u0442\u044C', href: downloadLink, onClick: handleDownload, disabled: disableButtons, download: download })),
        showDelete && !showRestore && (React__default.default.createElement(coreComponentsIconButton.IconButton, { size: 'xxs', icon: CrossSIcon.CrossSIcon, onClick: handleDelete, disabled: disableButtons, className: styles__default.default.delete, "aria-label": '\u0443\u0434\u0430\u043B\u0438\u0442\u044C' }))));
};

exports.FileUploadItem = FileUploadItem;
