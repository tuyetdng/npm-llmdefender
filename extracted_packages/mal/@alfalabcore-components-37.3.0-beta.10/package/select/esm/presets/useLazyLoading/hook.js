import { b as __spreadArray, a as __assign } from '../../tslib.es6-0bbcaa10.js';
import React, { useReducer, useRef, useCallback, useEffect, useMemo } from 'react';
import { Skeleton } from '../../../../skeleton/esm';
import { Option } from '../../components/option/Component.js';
import '../../intersection-observer-b8a51493.js';
import 'classnames';
import '../../components/base-select-mobile/checkmark/Component.js';
import '../../../../badge/esm';
import '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import '@alfalab/icons-glyph/CheckmarkMIcon';
import '../../components/checkmark/Component.js';
import '../../../../checkbox/esm';

var styles = {"skeleton":"select__skeleton_1ldyn"};
require('./index.css');

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
    var _b = _a.limit, limit = _b === void 0 ? 10 : _b, _c = _a.initialOffset, initialOffset = _c === void 0 ? 0 : _c, optionsFetcher = _a.optionsFetcher, _d = _a.skeleton, skeleton = _d === void 0 ? React.createElement(Skeleton, { className: styles.skeleton, visible: true }) : _d, _e = _a.Option, Option$1 = _e === void 0 ? Option : _e;
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
                return __assign(__assign({}, state), { loading: true });
            }
            case 'FETCH_OPTIONS_BREAK': {
                return __assign(__assign({}, state), { loading: false });
            }
            case 'FETCH_OPTIONS_SUCCESS': {
                return __assign(__assign({}, state), { options: __spreadArray(__spreadArray([], state.options, true), action.payload.options, true), offset: state.offset + (action.payload.options.length ? 1 : 0), allOptionsLoaded: !action.payload.hasMore, loading: false });
            }
            case 'SET_IS_OPENED': {
                return __assign(__assign({}, state), { opened: action.payload });
            }
            case 'SET_QUERY_STRING': {
                return __assign(__assign({}, lazyLoadingInitialState), { opened: state.opened, loading: true, queryString: action.payload });
            }
            case 'RESET': {
                return __assign({}, lazyLoadingInitialState);
            }
            default: {
                return state;
            }
        }
    };
    var _f = useReducer(lazyLoadingReducer, lazyLoadingInitialState), _g = _f[0], opened = _g.opened, offset = _g.offset, options = _g.options, loading = _g.loading, allOptionsLoaded = _g.allOptionsLoaded, queryString = _g.queryString, dispatch = _f[1];
    var abortFetchingOptionsRef = useRef();
    var fetchNextOffsetOptions = useCallback(function () {
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
    var listRef = useRef(null);
    useEffect(function () {
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
    var onOpen = useCallback(function (payload) {
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
    var fetchNextOptionsRef = useRef();
    var fetchNextOptionsTimerRef = useRef();
    useEffect(function () {
        fetchNextOptionsRef.current = fetchNextOffsetOptions;
    }, [fetchNextOffsetOptions]);
    var onQueryStringChange = useCallback(function (_, payload) {
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
    var renderOption = function (props) { return (React.createElement(Option$1, __assign({}, props, { highlighted: loading ? false : props.highlighted }))); };
    var skeletonOptions = useMemo(function () {
        return Array(loading ? limit : 0)
            .fill(0)
            .map(function (_, key) { return ({
            key: "loading-".concat(key),
            disabled: true,
            content: skeleton,
        }); });
    }, [loading, limit, skeleton]);
    var reset = useCallback(function () {
        dispatch(actions.reset());
    }, []);
    return {
        optionsProps: {
            Option: renderOption,
            options: __spreadArray(__spreadArray([], options, true), skeletonOptions, true),
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

export { useLazyLoading };
