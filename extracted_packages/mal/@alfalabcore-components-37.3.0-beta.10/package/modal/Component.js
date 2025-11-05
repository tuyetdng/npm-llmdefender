var tslib_es6 = require('./tslib.es6-76668849.js');
var React = require('react');
var mergeRefs = require('react-merge-refs');
var cn = require('classnames');
var coreComponentsBaseModal = require('../base-modal');
var ResponsiveContext = require('./ResponsiveContext.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var mergeRefs__default = /*#__PURE__*/_interopDefaultCompat(mergeRefs);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var desktopStyles = {"wrapper":"modal__wrapper_u2qdw","component":"modal__component_u2qdw","fullscreen":"modal__fullscreen_u2qdw","s":"modal__s_u2qdw","m":"modal__m_u2qdw","l":"modal__l_u2qdw","xl":"modal__xl_u2qdw"};
require('./desktop.css');

var mobileStyles = {"component":"modal__component_nu45w"};
require('./mobile.css');

var transitions = {"appear":"modal__appear_12hcv","enter":"modal__enter_12hcv","appearActive":"modal__appearActive_12hcv","enterActive":"modal__enterActive_12hcv","exit":"modal__exit_12hcv","exitActive":"modal__exitActive_12hcv","exitDone":"modal__exitDone_12hcv"};
require('./transitions.css');

var Modal = React.forwardRef(function (_a, ref) {
    var _b;
    var _c = _a.size, size = _c === void 0 ? 's' : _c, fixedPosition = _a.fixedPosition, fullscreen = _a.fullscreen, children = _a.children, className = _a.className, wrapperClassName = _a.wrapperClassName, _d = _a.transitionProps, transitionProps = _d === void 0 ? {} : _d, view = _a.view, restProps = tslib_es6.__rest(_a, ["size", "fixedPosition", "fullscreen", "children", "className", "wrapperClassName", "transitionProps", "view"]);
    // TODO: удалить, после удаления пропсы fullscreen
    var componentSize = fullscreen ? 'fullscreen' : size;
    var modalRef = React.useRef(null);
    var handleEntered = function (node, isAppearing) {
        if (fixedPosition && modalRef.current) {
            var content = modalRef.current.querySelector(".".concat(desktopStyles.component));
            if (content) {
                var marginTop = window.getComputedStyle(content).marginTop;
                content.style.marginTop = marginTop;
            }
        }
        if (transitionProps.onEntered) {
            transitionProps.onEntered(node, isAppearing);
        }
    };
    var baseModalProps = view === 'desktop'
        ? {
            ref: mergeRefs__default.default([ref, modalRef]),
            wrapperClassName: cn__default.default(desktopStyles.wrapper, wrapperClassName, (_b = {},
                _b[desktopStyles.fullscreen] = componentSize === 'fullscreen',
                _b)),
            className: cn__default.default(desktopStyles.component, className, desktopStyles[componentSize]),
            backdropProps: tslib_es6.__assign({ invisible: componentSize === 'fullscreen' }, restProps.backdropProps),
            transitionProps: tslib_es6.__assign(tslib_es6.__assign({ classNames: transitions }, transitionProps), { onEntered: handleEntered }),
        }
        : {
            ref: ref,
            transitionProps: tslib_es6.__assign({ classNames: transitions }, transitionProps),
            className: cn__default.default(className, mobileStyles.component),
        };
    var contextValue = React.useMemo(function () { return ({ size: componentSize, view: view }); }, [componentSize, view]);
    return (React__default.default.createElement(ResponsiveContext.ResponsiveContext.Provider, { value: contextValue },
        React__default.default.createElement(coreComponentsBaseModal.BaseModal, tslib_es6.__assign({}, restProps, baseModalProps), children)));
});

exports.Modal = Modal;
