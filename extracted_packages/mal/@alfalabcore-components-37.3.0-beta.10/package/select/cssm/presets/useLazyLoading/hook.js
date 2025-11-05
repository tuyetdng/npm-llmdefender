var tslib_es6 = require('../../tslib.es6-0e9bf404.js');
var React = require('react');
var coreComponentsSkeleton = require('../../../../skeleton/cssm');
var components_option_Component = require('../../components/option/Component.js');
var styles = require('./index.module.css');
require('../../intersection-observer-9ec5cf59.js');
require('classnames');
require('../../components/base-select-mobile/checkmark/Component.js');
require('../../../../badge/cssm');
require('@alfalab/icons-glyph/CheckmarkCircleMIcon');
require('@alfalab/icons-glyph/CheckmarkMIcon');
require('../../components/base-select-mobile/checkmark/index.module.css');
require('../../components/checkmark/Component.js');
require('../../../../checkbox/cssm');
require('../../components/checkmark/index.module.css');
require('../../components/option/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var DEBOUNCE_TIMEOUT = 300;
var actions = {
    fetchOptionsStart: function () {
        return { type: 'FETCH_OPTIONS_START' };
    },
    fetchOptionsBreak: function () {
        return { type: 'FETCH_OPTIONS_BREAK' };
    },
    fetchOptionsSuccess: function (payload) {
        return { type: 'FETCH_OPTIONS_SUCCESS', payload: payload };
    },
    setIsOpened: function (opened) {
        return { type: 'SET_IS_OPENED', payload: opened };
    },
    setQueryString: function (qs) {
        return { type: 'SET_QUERY_STRING', payload: qs };
    },
    reset: function () {
        return { type: 'RESET' };
    },
};
function useLazyLoading(_a) {
    var _b = _a.limit, limit = _b === void 0 ? 10 : _b, _c = _a.initialOffset, initialOffset = _c === void 0 ? 0 : _c, optionsFetcher = _a.optionsFetcher, _d = _a.skeleton, skeleton = _d === void 0 ? React__default.default.createElement(coreComponentsSkeleton.Skeleton, { className: styles__default.default.skeleton, visible: true }) : _d, _e = _a.Option, Option = _e === void 0 ? components_option_Component.Option : _e;
    var initialOptions = [];
    var initialLoading = false;
    var lazyLoadingInitialState = {
        opened: false,
        offset: initialOffset,
        options: initialOptions,
        loading: initialLoading,
        allOptionsLoaded: false,
        queryString: '',
    };
    var lazyLoadingReducer = function (state, action) {
        switch (action.type) {
            case 'FETCH_OPTIONS_START': {
                return tslib_es6.__assign(tslib_es6.__assign({}, state), { loading: true });
            }
            case 'FETCH_OPTIONS_BREAK': {
                return tslib_es6.__assign(tslib_es6.__assign({}, state), { loading: false });
            }
            case 'FETCH_OPTIONS_SUCCESS': {
                return tslib_es6.__assign(tslib_es6.__assign({}, state), { options: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], state.options, true), action.payload.options, true), offset: state.offset + (action.payload.options.length ? 1 : 0), allOptionsLoaded: !action.payload.hasMore, loading: false });
            }
            case 'SET_IS_OPENED': {
                return tslib_es6.__assign(tslib_es6.__assign({}, state), { opened: action.payload });
            }
            case 'SET_QUERY_STRING': {
                return tslib_es6.__assign(tslib_es6.__assign({}, lazyLoadingInitialState), { opened: state.opened, loading: true, queryString: action.payload });
            }
            case 'RESET': {
                return tslib_es6.__assign({}, lazyLoadingInitialState);
            }
            default: {
                return state;
            }
        }
    };
    var _f = React.useReducer(lazyLoadingReducer, lazyLoadingInitialState), _g = _f[0], opened = _g.opened, offset = _g.offset, options = _g.options, loading = _g.loading, allOptionsLoaded = _g.allOptionsLoaded, queryString = _g.queryString, dispatch = _f[1];
    var abortFetchingOptionsRef = React.useRef();
    var fetchNextOffsetOptions = React.useCallback(function () {
        dispatch(actions.fetchOptionsStart());
        new Promise(function (resolve, reject) {
            var _a;
            // eslint-disable-next-line no-unused-expressions
            (_a = abortFetchingOptionsRef.current) === null || _a === void 0 ? void 0 : _a.call(abortFetchingOptionsRef);
            abortFetchingOptionsRef.current = reject;
            optionsFetcher(offset, limit, queryString).then(function (res) {
                resolve(res);
            });
        })
            .then(function (res) {
            dispatch(actions.fetchOptionsSuccess(res));
            abortFetchingOptionsRef.current = undefined;
        })
            .catch(
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        function () { });
    }, [optionsFetcher, offset, limit, queryString]);
    var listRef = React.useRef(null);
    React.useEffect(function () {
        var _a;
        var observer;
        if (opened && !loading && !allOptionsLoaded) {
            observer = new IntersectionObserver(function (_a) {
                var entry = _a[0];
                if (entry.isIntersecting) {
                    if (observer) {
                        observer.disconnect();
                    }
                    fetchNextOffsetOptions();
                }
            }, {
                root: listRef.current,
            });
            /*
             * Обсервим пересечение последней опции с контейнером.
             * Таким образом, загрузка следующей "страницы" начнется когда юзер доскроллит список
             * до верхнего края последней опции, что обеспечивает плавность
             */
            var options_1 = (_a = listRef.current) === null || _a === void 0 ? void 0 : _a.querySelectorAll('[role="option"]');
            var lastOption = options_1 === null || options_1 === void 0 ? void 0 : options_1[options_1.length - 1];
            if (lastOption) {
                observer.observe(lastOption);
            }
        }
        return function () {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [offset, fetchNextOffsetOptions, opened, allOptionsLoaded, initialOffset, loading]);
    var onOpen = React.useCallback(function (payload) {
        var _a, _b;
        if (payload.open) {
            if (options.length === initialOptions.length) {
                fetchNextOffsetOptions();
            }
        }
        else {
            // eslint-disable-next-line no-unused-expressions
            (_a = abortFetchingOptionsRef.current) === null || _a === void 0 ? void 0 : _a.call(abortFetchingOptionsRef);
            dispatch(actions.fetchOptionsBreak());
        }
        dispatch(actions.setIsOpened((_b = payload.open) !== null && _b !== void 0 ? _b : false));
    }, [initialOptions.length, fetchNextOffsetOptions, options.length]);
    var fetchNextOptionsRef = React.useRef();
    var fetchNextOptionsTimerRef = React.useRef();
    React.useEffect(function () {
        fetchNextOptionsRef.current = fetchNextOffsetOptions;
    }, [fetchNextOffsetOptions]);
    var onQueryStringChange = React.useCallback(function (_, payload) {
        var _a, _b;
        dispatch(actions.setQueryString(payload.value));
        /* eslint-disable no-unused-expressions */
        /*
         * Если во время загрузки опций юзер ввел новый текст в инпут,
         * нужно прервать текущую загрузку, чтобы неактуальные опции не попали в выдачу
         */
        (_a = abortFetchingOptionsRef.current) === null || _a === void 0 ? void 0 : _a.call(abortFetchingOptionsRef);
        (_b = listRef.current) === null || _b === void 0 ? void 0 : _b.scrollTo({ top: 0 });
        /* Дебаунсим ввод текста, чтобы не отправлять запрос к новым опциям на каждый чих */
        if (fetchNextOptionsTimerRef.current) {
            clearTimeout(fetchNextOptionsTimerRef.current);
        }
        fetchNextOptionsTimerRef.current = setTimeout(function () {
            var _a;
            /*
             * После дебаунса необходимо вызвать функцию-загрузчик,
             * содержащую актуальные на данный момент данные оффсета и queryString.
             * Поэтому мы не можем обратиться напрямую к функции fetchNextOptions,
             * так как она будет замкнута на старые значения, актуальные на момент вызова хэндлера,
             * так что берем ее из обновляемого рефа
             */
            (_a = fetchNextOptionsRef.current) === null || _a === void 0 ? void 0 : _a.call(fetchNextOptionsRef);
        }, DEBOUNCE_TIMEOUT);
        /* eslint-enable */
    }, []);
    var renderOption = function (props) { return (React__default.default.createElement(Option, tslib_es6.__assign({}, props, { highlighted: loading ? false : props.highlighted }))); };
    var skeletonOptions = React.useMemo(function () {
        return Array(loading ? limit : 0)
            .fill(0)
            .map(function (_, key) { return ({
            key: "loading-".concat(key),
            disabled: true,
            content: skeleton,
        }); });
    }, [loading, limit, skeleton]);
    var reset = React.useCallback(function () {
        dispatch(actions.reset());
    }, []);
    return {
        optionsProps: {
            Option: renderOption,
            options: tslib_es6.__spreadArray(tslib_es6.__spreadArray([], options, true), skeletonOptions, true),
            optionsListProps: {
                ref: listRef,
                inputProps: {
                    onChange: onQueryStringChange,
                    value: queryString,
                },
            },
            onOpen: onOpen,
        },
        reset: reset,
    };
}

exports.useLazyLoading = useLazyLoading;
