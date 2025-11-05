var React = require('react');
var cn = require('classnames');
var coreComponentsIconButton = require('../icon-button');
var coreComponentsLink = require('../link');
var coreComponentsSpinner = require('../spinner');
var AlertCircleMIcon = require('@alfalab/icons-glyph/AlertCircleMIcon');
var CheckmarkCircleMIcon = require('@alfalab/icons-glyph/CheckmarkCircleMIcon');
var ClockMIcon = require('@alfalab/icons-glyph/ClockMIcon');
var CrossSIcon = require('@alfalab/icons-glyph/CrossSIcon');
var PointerDownSIcon = require('@alfalab/icons-glyph/PointerDownSIcon');
var utils = require('./utils.js');
require('@alfalab/icons-glyph/DocumentDocMIcon');
require('@alfalab/icons-glyph/DocumentImageMIcon');
require('@alfalab/icons-glyph/DocumentPdfMIcon');
require('@alfalab/icons-glyph/DocumentTxtMIcon');
require('@alfalab/icons-glyph/DocumentUnknownMIcon');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"file-upload-item__component_1ovgz","infoSection":"file-upload-item__infoSection_1ovgz","info":"file-upload-item__info_1ovgz","icon":"file-upload-item__icon_1ovgz","errorIcon":"file-upload-item__errorIcon_1ovgz","successIcon":"file-upload-item__successIcon_1ovgz","name":"file-upload-item__name_1ovgz","meta":"file-upload-item__meta_1ovgz","size":"file-upload-item__size_1ovgz","delete":"file-upload-item__delete_1ovgz","download":"file-upload-item__download_1ovgz","errorWrapper":"file-upload-item__errorWrapper_1ovgz","restore":"file-upload-item__restore_1ovgz","spinnerWrapper":"file-upload-item__spinnerWrapper_1ovgz","spinner":"file-upload-item__spinner_1ovgz","uploadPercent":"file-upload-item__uploadPercent_1ovgz"};
require('./index.css');

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
            return React__default.default.createElement(ClockMIcon.ClockMIcon, { className: styles.restoreIcon });
        }
        switch (uploadStatus) {
            case 'ERROR':
                return React__default.default.createElement(AlertCircleMIcon.AlertCircleMIcon, { className: styles.errorIcon });
            case 'SUCCESS':
                return React__default.default.createElement(CheckmarkCircleMIcon.CheckmarkCircleMIcon, { className: styles.successIcon });
            case 'LOADING':
            case 'UPLOADING':
                return (React__default.default.createElement("div", { className: styles.spinnerWrapper },
                    React__default.default.createElement(coreComponentsSpinner.Spinner, { visible: true, className: styles.spinner })));
            default: {
                return React__default.default.createElement(Icon, { className: styles.icon });
            }
        }
    };
    var renderInfoSection = function () {
        var shouldShownError = uploadStatus === 'ERROR' || !!error;
        var errorContent = uploadStatus === 'ERROR' && !error ? 'Не удалось загрузить файл' : error;
        return (React__default.default.createElement("div", { className: styles.infoSection },
            React__default.default.createElement("div", { className: styles.name }, name),
            shouldShownError && (React__default.default.createElement("div", { className: styles.errorWrapper, role: 'alert' }, errorContent))));
    };
    var showMeta = !showRestore && (!uploadStatus || uploadStatus === 'SUCCESS');
    var showDownload = Boolean(downloadLink) && !showRestore;
    return (React__default.default.createElement("div", { className: cn__default.default(className, styles.component, uploadStatus && styles[uploadStatus.toLocaleLowerCase()]), "data-test-id": dataTestId },
        React__default.default.createElement("div", { className: styles.info },
            renderIcon(),
            renderInfoSection(),
            children,
            uploadStatus === 'UPLOADING' && (React__default.default.createElement("span", { className: styles.uploadPercent }, "".concat(Math.round(uploadPercent), "%"))),
            showMeta && (React__default.default.createElement("div", { className: styles.meta },
                uploadDate && React__default.default.createElement("span", { key: uploadDate }, uploadDate),
                size && (React__default.default.createElement("span", { key: size, className: styles.size }, utils.humanFileSize(size)))))),
        showRestore && (React__default.default.createElement(coreComponentsLink.Link, { pseudo: true, className: styles.restore, onClick: handleRestore }, "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C")),
        showDownload && (React__default.default.createElement(coreComponentsIconButton.IconButton, { size: 'xxs', icon: PointerDownSIcon.PointerDownSIcon, className: styles.download, "aria-label": '\u0441\u043A\u0430\u0447\u0430\u0442\u044C', href: downloadLink, onClick: handleDownload, disabled: disableButtons, download: download })),
        showDelete && !showRestore && (React__default.default.createElement(coreComponentsIconButton.IconButton, { size: 'xxs', icon: CrossSIcon.CrossSIcon, onClick: handleDelete, disabled: disableButtons, className: styles.delete, "aria-label": '\u0443\u0434\u0430\u043B\u0438\u0442\u044C' }))));
};

exports.FileUploadItem = FileUploadItem;
