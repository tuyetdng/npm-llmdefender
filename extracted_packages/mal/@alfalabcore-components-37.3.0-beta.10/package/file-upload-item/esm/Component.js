import React from 'react';
import cn from 'classnames';
import { IconButton } from '../../icon-button/esm';
import { Link } from '../../link/esm';
import { Spinner } from '../../spinner/esm';
import { AlertCircleMIcon } from '@alfalab/icons-glyph/AlertCircleMIcon';
import { CheckmarkCircleMIcon } from '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import { ClockMIcon } from '@alfalab/icons-glyph/ClockMIcon';
import { CrossSIcon } from '@alfalab/icons-glyph/CrossSIcon';
import { PointerDownSIcon } from '@alfalab/icons-glyph/PointerDownSIcon';
import { fileIcon, humanFileSize } from './utils.js';
import '@alfalab/icons-glyph/DocumentDocMIcon';
import '@alfalab/icons-glyph/DocumentImageMIcon';
import '@alfalab/icons-glyph/DocumentPdfMIcon';
import '@alfalab/icons-glyph/DocumentTxtMIcon';
import '@alfalab/icons-glyph/DocumentUnknownMIcon';

var styles = {"component":"file-upload-item__component_1ovgz","infoSection":"file-upload-item__infoSection_1ovgz","info":"file-upload-item__info_1ovgz","icon":"file-upload-item__icon_1ovgz","errorIcon":"file-upload-item__errorIcon_1ovgz","successIcon":"file-upload-item__successIcon_1ovgz","name":"file-upload-item__name_1ovgz","meta":"file-upload-item__meta_1ovgz","size":"file-upload-item__size_1ovgz","delete":"file-upload-item__delete_1ovgz","download":"file-upload-item__download_1ovgz","errorWrapper":"file-upload-item__errorWrapper_1ovgz","restore":"file-upload-item__restore_1ovgz","spinnerWrapper":"file-upload-item__spinnerWrapper_1ovgz","spinner":"file-upload-item__spinner_1ovgz","uploadPercent":"file-upload-item__uploadPercent_1ovgz"};
require('./index.css');

var FileUploadItem = function (_a) {
    var className = _a.className, children = _a.children, _b = _a.id, id = _b === void 0 ? '0' : _b, _c = _a.name, name = _c === void 0 ? '' : _c, size = _a.size, _d = _a.icon, Icon = _d === void 0 ? fileIcon(name) : _d, uploadDate = _a.uploadDate, downloadLink = _a.downloadLink, download = _a.download, uploadStatus = _a.uploadStatus, _e = _a.uploadPercent, uploadPercent = _e === void 0 ? 0 : _e, error = _a.error, showDelete = _a.showDelete, showRestore = _a.showRestore, onDelete = _a.onDelete, onDownload = _a.onDownload, onRestore = _a.onRestore, disableButtons = _a.disableButtons, dataTestId = _a.dataTestId;
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
            return React.createElement(ClockMIcon, { className: styles.restoreIcon });
        }
        switch (uploadStatus) {
            case 'ERROR':
                return React.createElement(AlertCircleMIcon, { className: styles.errorIcon });
            case 'SUCCESS':
                return React.createElement(CheckmarkCircleMIcon, { className: styles.successIcon });
            case 'LOADING':
            case 'UPLOADING':
                return (React.createElement("div", { className: styles.spinnerWrapper },
                    React.createElement(Spinner, { visible: true, className: styles.spinner })));
            default: {
                return React.createElement(Icon, { className: styles.icon });
            }
        }
    };
    var renderInfoSection = function () {
        var shouldShownError = uploadStatus === 'ERROR' || !!error;
        var errorContent = uploadStatus === 'ERROR' && !error ? 'Не удалось загрузить файл' : error;
        return (React.createElement("div", { className: styles.infoSection },
            React.createElement("div", { className: styles.name }, name),
            shouldShownError && (React.createElement("div", { className: styles.errorWrapper, role: 'alert' }, errorContent))));
    };
    var showMeta = !showRestore && (!uploadStatus || uploadStatus === 'SUCCESS');
    var showDownload = Boolean(downloadLink) && !showRestore;
    return (React.createElement("div", { className: cn(className, styles.component, uploadStatus && styles[uploadStatus.toLocaleLowerCase()]), "data-test-id": dataTestId },
        React.createElement("div", { className: styles.info },
            renderIcon(),
            renderInfoSection(),
            children,
            uploadStatus === 'UPLOADING' && (React.createElement("span", { className: styles.uploadPercent }, "".concat(Math.round(uploadPercent), "%"))),
            showMeta && (React.createElement("div", { className: styles.meta },
                uploadDate && React.createElement("span", { key: uploadDate }, uploadDate),
                size && (React.createElement("span", { key: size, className: styles.size }, humanFileSize(size)))))),
        showRestore && (React.createElement(Link, { pseudo: true, className: styles.restore, onClick: handleRestore }, "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C")),
        showDownload && (React.createElement(IconButton, { size: 'xxs', icon: PointerDownSIcon, className: styles.download, "aria-label": '\u0441\u043A\u0430\u0447\u0430\u0442\u044C', href: downloadLink, onClick: handleDownload, disabled: disableButtons, download: download })),
        showDelete && !showRestore && (React.createElement(IconButton, { size: 'xxs', icon: CrossSIcon, onClick: handleDelete, disabled: disableButtons, className: styles.delete, "aria-label": '\u0443\u0434\u0430\u043B\u0438\u0442\u044C' }))));
};

export { FileUploadItem };
