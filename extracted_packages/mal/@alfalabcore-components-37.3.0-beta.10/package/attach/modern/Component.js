import React, { useState, useRef, useEffect } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { Button } from '../../button/modern';
import { KeyboardFocusable } from '../../keyboard-focusable/modern';
import { ProgressBar } from '../../progress-bar/modern';
import { PaperclipMIcon } from '@alfalab/icons-glyph/PaperclipMIcon';
import { PaperclipSIcon } from '@alfalab/icons-glyph/PaperclipSIcon';
import { pluralize } from '@alfalab/utils';
import { truncateFilename } from './utils/index.js';

const styles = {"component":"attach__component_ttrdg","label":"attach__label_ttrdg","control":"attach__control_ttrdg","xxs":"attach__xxs_ttrdg","file":"attach__file_ttrdg","noFile":"attach__noFile_ttrdg","xs":"attach__xs_ttrdg","s":"attach__s_ttrdg","m":"attach__m_ttrdg","l":"attach__l_ttrdg","clear":"attach__clear_ttrdg","progressBar":"attach__progressBar_ttrdg","disabled":"attach__disabled_ttrdg","icon":"attach__icon_ttrdg","focused":"attach__focused_ttrdg"};
require('./index.css');

const MULTIPLE_TEXTS = ['файл', 'файла', 'файлов'];
const Attach = React.forwardRef(({ size = 's', accept, buttonContent = 'Выберите файл', buttonProps = {}, className, fileClassName, noFileClassName, disabled, dataTestId, id, maxFilenameLength, multiple, noFileText = 'Нет файла', progressBarPercent, defaultValue, value, onChange, onClear, ...restProps }, ref) => {
    const uncontrolled = value === undefined;
    const [files, setFiles] = useState(defaultValue || []);
    const inputRef = useRef(null);
    const labelRef = useRef(null);
    const buttonRef = useRef(null);
    const getDefaultLeftAddon = () => {
        let IconComponent;
        if (['xs', 'xxs'].includes(size)) {
            IconComponent = PaperclipSIcon;
        }
        else {
            IconComponent = PaperclipMIcon;
        }
        return React.createElement(IconComponent, { className: styles.icon });
    };
    const handleInputChange = (event) => {
        const filesArray = event.target.files ? Array.from(event.target.files) : [];
        if (onChange) {
            onChange(event, { files: filesArray });
        }
        if (uncontrolled && event.target.files) {
            setFiles(filesArray);
        }
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };
    const handleButtonClick = (event) => {
        if (labelRef.current) {
            labelRef.current.click();
        }
        if (buttonRef.current) {
            buttonRef.current.focus();
        }
        if (buttonProps.onClick) {
            buttonProps.onClick(event);
        }
    };
    const handleClearClick = (ev) => {
        if (uncontrolled) {
            setFiles([]);
        }
        if (onClear) {
            onClear(ev);
        }
    };
    const statusTextContent = files.length === 1 ? (truncateFilename(files[0].name, maxFilenameLength)) : (React.createElement("abbr", { title: files.map((file) => file.name).join() },
        files.length,
        " ",
        pluralize(files.length, ...MULTIPLE_TEXTS)));
    useEffect(() => {
        if (!uncontrolled) {
            setFiles(value || []);
        }
    }, [uncontrolled, value]);
    return (React.createElement("div", { className: cn(styles.component, styles[size], {
            [styles.disabled]: disabled,
        }, className) },
        React.createElement(Button, { ...buttonProps, size: size, disabled: disabled, view: buttonProps?.view || 'secondary', leftAddons: buttonProps?.leftAddons || getDefaultLeftAddon(), onClick: handleButtonClick, ref: buttonRef },
            React.createElement("span", null, buttonContent)),
        React.createElement("label", { className: styles.label, htmlFor: id, ref: labelRef },
            React.createElement("input", { ...restProps, className: styles.control, accept: accept, disabled: disabled, id: id, multiple: multiple, tabIndex: -1, type: 'file', onChange: handleInputChange, ref: mergeRefs([ref, inputRef]), "data-test-id": dataTestId })),
        files && files.length > 0 ? (React.createElement("div", { className: cn(styles.file, fileClassName) },
            React.createElement("span", null, statusTextContent),
            React.createElement(KeyboardFocusable, null, (targetRef, focused) => (React.createElement("button", { "aria-label": '\u043E\u0447\u0438\u0441\u0442\u0438\u0442\u044C', type: 'button', className: cn(styles.clear, {
                    [styles.focused]: focused,
                }), onClick: handleClearClick, ref: targetRef }))),
            progressBarPercent && (React.createElement(ProgressBar, { className: styles.progressBar, value: progressBarPercent, view: 'positive' })))) : (React.createElement("div", { className: cn(styles.noFile, noFileClassName) }, noFileText))));
});
/**
 * Для отображения в сторибуке
 */
Attach.defaultProps = {
    size: 's',
    buttonContent: 'Выберите файл',
    noFileText: 'Нет файла',
};

export { Attach };
