var tslib_es6 = require('./tslib.es6-bbd6cd2a.js');
var React = require('react');
var mergeRefs = require('react-merge-refs');
var cn = require('classnames');
var coreComponentsBaseModal = require('../../base-modal/cssm');
var ResponsiveContext = require('./ResponsiveContext.js');
var desktopStyles = require('./desktop.module.css');
var mobileStyles = require('./mobile.module.css');
var transitions = require('./transitions.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var mergeRefs__default = /*#__PURE__*/_interopDefaultCompat(mergeRefs);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var desktopStyles__default = /*#__PURE__*/_interopDefaultCompat(desktopStyles);
var mobileStyles__default = /*#__PURE__*/_interopDefaultCompat(mobileStyles);
var transitions__default = /*#__PURE__*/_interopDefaultCompat(transitions);

var Modal = React.forwardRef(function (_a, ref) {
    var _b;
    var _c = _a.size, size = _c === void 0 ? 's' : _c, fixedPosition = _a.fixedPosition, fullscreen = _a.fullscreen, children = _a.children, className = _a.className, wrapperClassName = _a.wrapperClassName, _d = _a.transitionProps, transitionProps = _d === void 0 ? {} : _d, view = _a.view, restProps = tslib_es6.__rest(_a, ["size", "fixedPosition", "fullscreen", "children", "className", "wrapperClassName", "transitionProps", "view"]);
    // TODO: удалить, после удаления пропсы fullscreen
    var componentSize = fullscreen ? 'fullscreen' : size;
    var modalRef = React.useRef(null);
    var handleEntered = function (node, isAppearing) {
        if (fixedPosition && modalRef.current) {
            var content = modalRef.current.querySelector(".".concat(desktopStyles__default.default.component));
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
            wrapperClassName: cn__default.default(desktopStyles__default.default.wrapper, wrapperClassName, (_b = {},
                _b[desktopStyles__default.default.fullscreen] = componentSize === 'fullscreen',
                _b)),
            className: cn__default.default(desktopStyles__default.default.component, className, desktopStyles__default.default[componentSize]),
            backdropProps: tslib_es6.__assign({ invisible: componentSize === 'fullscreen' }, restProps.backdropProps),
            transitionProps: tslib_es6.__assign(tslib_es6.__assign({ classNames: transitions__default.default }, transitionProps), { onEntered: handleEntered }),
        }
        : {
            ref: ref,
            transitionProps: tslib_es6.__assign({ classNames: transitions__default.default }, transitionProps),
            className: cn__default.default(className, mobileStyles__default.default.component),
        };
    var contextValue = React.useMemo(function () { return ({ size: componentSize, view: view }); }, [componentSize, view]);
    return (React__default.default.createElement(ResponsiveContext.ResponsiveContext.Provider, { value: contextValue },
        React__default.default.createElement(coreComponentsBaseModal.BaseModal, tslib_es6.__assign({}, restProps, baseModalProps), children)));
});

exports.Modal = Modal;
