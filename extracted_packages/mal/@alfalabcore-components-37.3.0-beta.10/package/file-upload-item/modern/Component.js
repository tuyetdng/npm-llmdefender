import React from 'react';
import cn from 'classnames';
import { IconButton } from '../../icon-button/modern';
import { Link } from '../../link/modern';
import { Spinner } from '../../spinner/modern';
import { AlertCircleMIcon } from '@alfalab/icons-glyph/AlertCircleMIcon';
import { CheckmarkCircleMIcon } from '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import { ClockMIcon } from '@alfalab/icons-glyph/ClockMIcon';
import { CrossSIcon } from '@alfalab/icons-glyph/CrossSIcon';
import { PointerDownSIcon } from '@alfalab/icons-glyph/PointerDownSIcon';
import { humanFileSize, fileIcon } from './utils.js';
import '@alfalab/icons-glyph/DocumentDocMIcon';
import '@alfalab/icons-glyph/DocumentImageMIcon';
import '@alfalab/icons-glyph/DocumentPdfMIcon';
import '@alfalab/icons-glyph/DocumentTxtMIcon';
import '@alfalab/icons-glyph/DocumentUnknownMIcon';

const styles = {"component":"file-upload-item__component_1ovgz","infoSection":"file-upload-item__infoSection_1ovgz","info":"file-upload-item__info_1ovgz","icon":"file-upload-item__icon_1ovgz","errorIcon":"file-upload-item__errorIcon_1ovgz","successIcon":"file-upload-item__successIcon_1ovgz","name":"file-upload-item__name_1ovgz","meta":"file-upload-item__meta_1ovgz","size":"file-upload-item__size_1ovgz","delete":"file-upload-item__delete_1ovgz","download":"file-upload-item__download_1ovgz","errorWrapper":"file-upload-item__errorWrapper_1ovgz","restore":"file-upload-item__restore_1ovgz","spinnerWrapper":"file-upload-item__spinnerWrapper_1ovgz","spinner":"file-upload-item__spinner_1ovgz","uploadPercent":"file-upload-item__uploadPercent_1ovgz"};
require('./index.css');

const FileUploadItem = ({ className, children, id = '0', name = '', size, icon: Icon = fileIcon(name), uploadDate, downloadLink, download, uploadStatus, uploadPercent = 0, error, showDelete, showRestore, onDelete, onDownload, onRestore, disableButtons, dataTestId, }) => {
    const handleDownload = (event) => {
        if (onDownload) {
            event.preventDefault();
            onDownload(id);
        }
    };
    const handleDelete = () => {
        if (onDelete)
            onDelete(id);
    };
    const handleRestore = () => {
        if (onRestore)
            onRestore(id);
    };
    const renderIcon = () => {
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
    const renderInfoSection = () => {
        const shouldShownError = uploadStatus === 'ERROR' || !!error;
        const errorContent = uploadStatus === 'ERROR' && !error ? 'Не удалось загрузить файл' : error;
        return (React.createElement("div", { className: styles.infoSection },
            React.createElement("div", { className: styles.name }, name),
            shouldShownError && (React.createElement("div", { className: styles.errorWrapper, role: 'alert' }, errorContent))));
    };
    const showMeta = !showRestore && (!uploadStatus || uploadStatus === 'SUCCESS');
    const showDownload = Boolean(downloadLink) && !showRestore;
    return (React.createElement("div", { className: cn(className, styles.component, uploadStatus && styles[uploadStatus.toLocaleLowerCase()]), "data-test-id": dataTestId },
        React.createElement("div", { className: styles.info },
            renderIcon(),
            renderInfoSection(),
            children,
            uploadStatus === 'UPLOADING' && (React.createElement("span", { className: styles.uploadPercent }, `${Math.round(uploadPercent)}%`)),
            showMeta && (React.createElement("div", { className: styles.meta },
                uploadDate && React.createElement("span", { key: uploadDate }, uploadDate),
                size && (React.createElement("span", { key: size, className: styles.size }, humanFileSize(size)))))),
        showRestore && (React.createElement(Link, { pseudo: true, className: styles.restore, onClick: handleRestore }, "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C")),
        showDownload && (React.createElement(IconButton, { size: 'xxs', icon: PointerDownSIcon, className: styles.download, "aria-label": '\u0441\u043A\u0430\u0447\u0430\u0442\u044C', href: downloadLink, onClick: handleDownload, disabled: disableButtons, download: download })),
        showDelete && !showRestore && (React.createElement(IconButton, { size: 'xxs', icon: CrossSIcon, onClick: handleDelete, disabled: disableButtons, className: styles.delete, "aria-label": '\u0443\u0434\u0430\u043B\u0438\u0442\u044C' }))));
};

export { FileUploadItem };
