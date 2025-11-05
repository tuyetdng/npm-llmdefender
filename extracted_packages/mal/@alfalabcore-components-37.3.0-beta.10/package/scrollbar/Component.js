var React = require('react');
var mergeRefs = require('react-merge-refs');
var cn = require('classnames');
var throttle = require('lodash.throttle');
var debounce = require('lodash.debounce');
var memoize = require('lodash.memoize');
var resizeObserver = require('@juggle/resize-observer');
var canUseDOM = require('can-use-dom');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var mergeRefs__default = /*#__PURE__*/_interopDefaultCompat(mergeRefs);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var throttle__default = /*#__PURE__*/_interopDefaultCompat(throttle);
var debounce__default = /*#__PURE__*/_interopDefaultCompat(debounce);
var memoize__default = /*#__PURE__*/_interopDefaultCompat(memoize);
var canUseDOM__default = /*#__PURE__*/_interopDefaultCompat(canUseDOM);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var __assign = function () {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar)
                    ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
    return to.concat(ar || Array.prototype.slice.call(from));
}

// Helper function to retrieve options from element attributes
function getElementWindow(element) {
    if (!element ||
        !element.ownerDocument ||
        !element.ownerDocument.defaultView) {
        return window;
    }
    return element.ownerDocument.defaultView;
}
function getElementDocument(element) {
    if (!element || !element.ownerDocument) {
        return document;
    }
    return element.ownerDocument;
}

var cachedScrollbarWidth = null;
var cachedDevicePixelRatio = null;
if (canUseDOM__default.default) {
    window.addEventListener('resize', function () {
        if (cachedDevicePixelRatio !== window.devicePixelRatio) {
            cachedDevicePixelRatio = window.devicePixelRatio;
            cachedScrollbarWidth = null;
        }
    });
}
function scrollbarWidth(el) {
    if (cachedScrollbarWidth === null) {
        var document_1 = getElementDocument(el);
        if (typeof document_1 === 'undefined') {
            cachedScrollbarWidth = 0;
            return cachedScrollbarWidth;
        }
        var body = document_1.body;
        var box = document_1.createElement('div');
        box.classList.add('simplebar-hide-scrollbar');
        body.appendChild(box);
        var width = box.getBoundingClientRect().right;
        body.removeChild(box);
        cachedScrollbarWidth = width;
    }
    return cachedScrollbarWidth;
}

var SimpleBar = /** @class */ (function () {
    function SimpleBar(element, options) {
        var _this = this;
        /**
         * On scroll event handling
         */
        this.onScroll = function () {
            var elWindow = getElementWindow(_this.el);
            if (!_this.scrollXTicking) {
                elWindow.requestAnimationFrame(_this.scrollX);
                _this.scrollXTicking = true;
            }
            if (!_this.scrollYTicking) {
                elWindow.requestAnimationFrame(_this.scrollY);
                _this.scrollYTicking = true;
            }
        };
        this.scrollX = function () {
            if (_this.axis.x.isOverflowing) {
                _this.showScrollbar('x');
                _this.positionScrollbar('x');
            }
            _this.scrollXTicking = false;
        };
        this.scrollY = function () {
            if (_this.axis.y.isOverflowing) {
                _this.showScrollbar('y');
                _this.positionScrollbar('y');
            }
            _this.scrollYTicking = false;
        };
        this.onMouseEnter = function () {
            _this.showScrollbar('x');
            _this.showScrollbar('y');
        };
        this.onMouseMove = function (e) {
            _this.mouseX = e.clientX;
            _this.mouseY = e.clientY;
            if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
                _this.onMouseMoveForAxis('x');
            }
            if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
                _this.onMouseMoveForAxis('y');
            }
        };
        this.onMouseLeave = function () {
            _this.onMouseMove.cancel();
            if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
                _this.onMouseLeaveForAxis('x');
            }
            if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
                _this.onMouseLeaveForAxis('y');
            }
            _this.mouseX = -1;
            _this.mouseY = -1;
        };
        this.onWindowResize = function () {
            // Recalculate scrollbarWidth in case it's a zoom
            _this.scrollbarWidth = _this.getScrollbarWidth();
            _this.hideNativeScrollbar();
        };
        /**
         * Hide Scrollbar
         */
        this.hideScrollbars = function () {
            _this.axis.x.track.rect = _this.axis.x.track.el.getBoundingClientRect();
            _this.axis.y.track.rect = _this.axis.y.track.el.getBoundingClientRect();
            if (!_this.isWithinBounds(_this.axis.y.track.rect)) {
                _this.axis.y.scrollbar.el.classList.remove(_this.classNames.visible);
                _this.axis.y.isVisible = false;
            }
            if (!_this.isWithinBounds(_this.axis.x.track.rect)) {
                _this.axis.x.scrollbar.el.classList.remove(_this.classNames.visible);
                _this.axis.x.isVisible = false;
            }
        };
        this.onPointerEvent = function (e) {
            var isWithinTrackXBounds, isWithinTrackYBounds;
            _this.axis.x.track.rect = _this.axis.x.track.el.getBoundingClientRect();
            _this.axis.y.track.rect = _this.axis.y.track.el.getBoundingClientRect();
            if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
                isWithinTrackXBounds = _this.isWithinBounds(_this.axis.x.track.rect);
            }
            if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
                isWithinTrackYBounds = _this.isWithinBounds(_this.axis.y.track.rect);
            }
            // If any pointer event is called on the scrollbar
            if (isWithinTrackXBounds || isWithinTrackYBounds) {
                // Preventing the event's default action stops text being
                // selectable during the drag.
                e.preventDefault();
                // Prevent event leaking
                e.stopPropagation();
                if (e.type === 'mousedown') {
                    if (isWithinTrackXBounds) {
                        _this.axis.x.scrollbar.rect = _this.axis.x.scrollbar.el.getBoundingClientRect();
                        if (_this.isWithinBounds(_this.axis.x.scrollbar.rect)) {
                            _this.onDragStart(e, 'x');
                        }
                        else {
                            _this.onTrackClick(e, 'x');
                        }
                    }
                    if (isWithinTrackYBounds) {
                        _this.axis.y.scrollbar.rect = _this.axis.y.scrollbar.el.getBoundingClientRect();
                        if (_this.isWithinBounds(_this.axis.y.scrollbar.rect)) {
                            _this.onDragStart(e, 'y');
                        }
                        else {
                            _this.onTrackClick(e, 'y');
                        }
                    }
                }
            }
        };
        /**
         * Drag scrollbar handle
         */
        this.drag = function (e) {
            var eventOffset;
            var track = _this.axis[_this.draggedAxis].track;
            var trackSize = track.rect[_this.axis[_this.draggedAxis].sizeAttr];
            var scrollbar = _this.axis[_this.draggedAxis].scrollbar;
            var contentSize = _this.contentWrapperEl[_this.axis[_this.draggedAxis].scrollSizeAttr];
            var hostSize = parseInt(_this.elStyles[_this.axis[_this.draggedAxis].sizeAttr], 10);
            e.preventDefault();
            e.stopPropagation();
            if (_this.draggedAxis === 'y') {
                eventOffset = e.pageY;
            }
            else {
                eventOffset = e.pageX;
            }
            // Calculate how far the user's mouse is from the top/left of the scrollbar (minus the dragOffset).
            var dragPos = eventOffset -
                track.rect[_this.axis[_this.draggedAxis].offsetAttr] -
                _this.axis[_this.draggedAxis].dragOffset;
            // Convert the mouse position into a percentage of the scrollbar height/width.
            var dragPerc = dragPos / (trackSize - scrollbar.size);
            // Scroll the content by the same percentage.
            var scrollPos = dragPerc * (contentSize - hostSize);
            // Fix browsers inconsistency on RTL
            if (_this.draggedAxis === 'x') {
                scrollPos =
                    _this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollbarInverted
                        ? scrollPos - (trackSize + scrollbar.size)
                        : scrollPos;
                scrollPos =
                    _this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollingInverted
                        ? -scrollPos
                        : scrollPos;
            }
            _this.contentWrapperEl[_this.axis[_this.draggedAxis].scrollOffsetAttr] = scrollPos;
        };
        /**
         * End scroll handle drag
         */
        this.onEndDrag = function (e) {
            var elDocument = getElementDocument(_this.el);
            var elWindow = getElementWindow(_this.el);
            e.preventDefault();
            e.stopPropagation();
            _this.el.classList.remove(_this.classNames.dragging);
            elDocument.removeEventListener('mousemove', _this.drag, true);
            elDocument.removeEventListener('mouseup', _this.onEndDrag, true);
            _this.removePreventClickId = elWindow.setTimeout(function () {
                // Remove these asynchronously so we still suppress click events
                // generated simultaneously with mouseup.
                elDocument.removeEventListener('click', _this.preventClick, true);
                elDocument.removeEventListener('dblclick', _this.preventClick, true);
                _this.removePreventClickId = null;
            });
        };
        /**
         * Handler to ignore click events during drag
         */
        this.preventClick = function (e) {
            e.preventDefault();
            e.stopPropagation();
        };
        this.el = element;
        this.minScrollbarWidth = 20;
        this.options = __assign(__assign({}, SimpleBar.defaultOptions), options);
        this.classNames = __assign(__assign({}, SimpleBar.defaultOptions.classNames), this.options.classNames);
        this.axis = {
            x: {
                scrollOffsetAttr: 'scrollLeft',
                sizeAttr: 'width',
                scrollSizeAttr: 'scrollWidth',
                offsetSizeAttr: 'offsetWidth',
                offsetAttr: 'left',
                overflowAttr: 'overflowX',
                dragOffset: 0,
                isOverflowing: true,
                isVisible: false,
                forceVisible: false,
                track: {},
                scrollbar: {}
            },
            y: {
                scrollOffsetAttr: 'scrollTop',
                sizeAttr: 'height',
                scrollSizeAttr: 'scrollHeight',
                offsetSizeAttr: 'offsetHeight',
                offsetAttr: 'top',
                overflowAttr: 'overflowY',
                dragOffset: 0,
                isOverflowing: true,
                isVisible: false,
                forceVisible: false,
                track: {},
                scrollbar: {}
            }
        };
        this.removePreventClickId = null;
        // Don't re-instantiate over an existing one
        if (SimpleBar.instances.has(this.el)) {
            return;
        }
        this.recalculate = throttle__default.default(this.recalculate.bind(this), 64);
        this.onMouseMove = throttle__default.default(this.onMouseMove.bind(this), 64);
        this.hideScrollbars = debounce__default.default(this.hideScrollbars.bind(this), this.options.timeout);
        this.onWindowResize = debounce__default.default(this.onWindowResize.bind(this), 64, {
            leading: true
        });
        SimpleBar.getRtlHelpers = memoize__default.default(SimpleBar.getRtlHelpers);
        this.init();
    }
    /**
     * Static properties
     */
    /**
     * Helper to fix browsers inconsistency on RTL:
     *  - Firefox inverts the scrollbar initial position
     *  - IE11 inverts both scrollbar position and scrolling offset
     * Directly inspired by @KingSora's OverlayScrollbars https://github.com/KingSora/OverlayScrollbars/blob/master/js/OverlayScrollbars.js#L1634
     */
    SimpleBar.getRtlHelpers = function () {
        var dummyDiv = document.createElement('div');
        dummyDiv.innerHTML =
            '<div class="hs-dummy-scrollbar-size"><div style="height: 200%; width: 200%; margin: 10px 0;"></div></div>';
        var scrollbarDummyEl = dummyDiv.firstElementChild;
        document.body.appendChild(scrollbarDummyEl);
        var dummyContainerChild = scrollbarDummyEl.firstElementChild;
        scrollbarDummyEl.scrollLeft = 0;
        var dummyContainerOffset = SimpleBar.getOffset(scrollbarDummyEl);
        var dummyContainerChildOffset = SimpleBar.getOffset(dummyContainerChild);
        scrollbarDummyEl.scrollLeft = 999;
        var dummyContainerScrollOffsetAfterScroll = SimpleBar.getOffset(dummyContainerChild);
        return {
            // determines if the scrolling is responding with negative values
            isRtlScrollingInverted: dummyContainerOffset.left !== dummyContainerChildOffset.left &&
                dummyContainerChildOffset.left -
                    dummyContainerScrollOffsetAfterScroll.left !==
                    0,
            // determines if the origin scrollbar position is inverted or not (positioned on left or right)
            isRtlScrollbarInverted: dummyContainerOffset.left !== dummyContainerChildOffset.left
        };
    };
    SimpleBar.getOffset = function (el) {
        var rect = el.getBoundingClientRect();
        var elDocument = getElementDocument(el);
        var elWindow = getElementWindow(el);
        return {
            top: rect.top +
                (elWindow.pageYOffset || elDocument.documentElement.scrollTop),
            left: rect.left +
                (elWindow.pageXOffset || elDocument.documentElement.scrollLeft)
        };
    };
    SimpleBar.prototype.init = function () {
        // Save a reference to the instance, so we know this DOM node has already been instancied
        SimpleBar.instances.set(this.el, this);
        // We stop here on server-side
        if (canUseDOM__default.default) {
            this.initDOM();
            this.setAccessibilityAttributes();
            this.scrollbarWidth = this.getScrollbarWidth();
            this.recalculate();
            this.initListeners();
        }
    };
    SimpleBar.prototype.initDOM = function () {
        var _this = this;
        // make sure this element doesn't have the elements yet
        if (Array.prototype.filter.call(this.el.children, function (child) {
            return child.classList.contains(_this.classNames.wrapper);
        }).length) {
            // assume that element has his DOM already initiated
            this.wrapperEl = this.el.querySelector(".".concat(this.classNames.wrapper));
            this.contentWrapperEl =
                this.options.scrollableNode ||
                    this.el.querySelector(".".concat(this.classNames.contentWrapper));
            this.contentEl =
                this.options.contentNode ||
                    this.el.querySelector(".".concat(this.classNames.contentEl));
            this.offsetEl = this.el.querySelector(".".concat(this.classNames.offset));
            this.maskEl = this.el.querySelector(".".concat(this.classNames.mask));
            this.placeholderEl = this.findChild(this.wrapperEl, ".".concat(this.classNames.placeholder));
            this.heightAutoObserverWrapperEl = this.el.querySelector(".".concat(this.classNames.heightAutoObserverWrapperEl));
            this.heightAutoObserverEl = this.el.querySelector(".".concat(this.classNames.heightAutoObserverEl));
            this.axis.x.track.el = this.findChild(this.el, ".".concat(this.classNames.track, ".").concat(this.classNames.horizontal));
            this.axis.y.track.el = this.findChild(this.el, ".".concat(this.classNames.track, ".").concat(this.classNames.vertical));
        }
        else {
            // Prepare DOM
            this.wrapperEl = document.createElement('div');
            this.contentWrapperEl = document.createElement('div');
            this.offsetEl = document.createElement('div');
            this.maskEl = document.createElement('div');
            this.contentEl = document.createElement('div');
            this.placeholderEl = document.createElement('div');
            this.heightAutoObserverWrapperEl = document.createElement('div');
            this.heightAutoObserverEl = document.createElement('div');
            this.wrapperEl.classList.add(this.classNames.wrapper);
            this.contentWrapperEl.classList.add(this.classNames.contentWrapper);
            this.offsetEl.classList.add(this.classNames.offset);
            this.maskEl.classList.add(this.classNames.mask);
            this.contentEl.classList.add(this.classNames.contentEl);
            this.placeholderEl.classList.add(this.classNames.placeholder);
            this.heightAutoObserverWrapperEl.classList.add(this.classNames.heightAutoObserverWrapperEl);
            this.heightAutoObserverEl.classList.add(this.classNames.heightAutoObserverEl);
            while (this.el.firstChild) {
                this.contentEl.appendChild(this.el.firstChild);
            }
            this.contentWrapperEl.appendChild(this.contentEl);
            this.offsetEl.appendChild(this.contentWrapperEl);
            this.maskEl.appendChild(this.offsetEl);
            this.heightAutoObserverWrapperEl.appendChild(this.heightAutoObserverEl);
            this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl);
            this.wrapperEl.appendChild(this.maskEl);
            this.wrapperEl.appendChild(this.placeholderEl);
            this.el.appendChild(this.wrapperEl);
        }
        if (!this.axis.x.track.el || !this.axis.y.track.el) {
            var track = document.createElement('div');
            var scrollbar = document.createElement('div');
            track.classList.add(this.classNames.track);
            scrollbar.classList.add(this.classNames.scrollbar);
            track.appendChild(scrollbar);
            this.axis.x.track.el = track.cloneNode(true);
            this.axis.x.track.el.classList.add(this.classNames.horizontal);
            this.axis.y.track.el = track.cloneNode(true);
            this.axis.y.track.el.classList.add(this.classNames.vertical);
            this.el.appendChild(this.axis.x.track.el);
            this.el.appendChild(this.axis.y.track.el);
        }
        this.axis.x.scrollbar.el = this.axis.x.track.el.querySelector(".".concat(this.classNames.scrollbar));
        this.axis.y.scrollbar.el = this.axis.y.track.el.querySelector(".".concat(this.classNames.scrollbar));
        if (!this.options.autoHide) {
            this.axis.x.scrollbar.el.classList.add(this.classNames.visible);
            this.axis.y.scrollbar.el.classList.add(this.classNames.visible);
        }
        this.el.setAttribute('data-simplebar', 'init');
    };
    SimpleBar.prototype.setAccessibilityAttributes = function () {
        var ariaLabel = this.options.ariaLabel || 'scrollable content';
        this.contentWrapperEl.setAttribute('tabindex', '0');
        this.contentWrapperEl.setAttribute('role', 'region');
        this.contentWrapperEl.setAttribute('aria-label', ariaLabel);
    };
    SimpleBar.prototype.initListeners = function () {
        var _this = this;
        var elWindow = getElementWindow(this.el);
        // Event listeners
        if (this.options.autoHide) {
            this.el.addEventListener('mouseenter', this.onMouseEnter);
        }
        ['mousedown', 'click', 'dblclick'].forEach(function (e) {
            _this.el.addEventListener(e, _this.onPointerEvent, true);
        });
        ['touchstart', 'touchend', 'touchmove'].forEach(function (e) {
            _this.el.addEventListener(e, _this.onPointerEvent, {
                capture: true,
                passive: true
            });
        });
        this.el.addEventListener('mousemove', this.onMouseMove);
        this.el.addEventListener('mouseleave', this.onMouseLeave);
        this.contentWrapperEl.addEventListener('scroll', this.onScroll);
        // Browser zoom triggers a window resize
        elWindow.addEventListener('resize', this.onWindowResize);
        // Hack for https://github.com/WICG/ResizeObserver/issues/38
        var resizeObserverStarted = false;
        var resizeObserver$1 = elWindow.ResizeObserver || resizeObserver.ResizeObserver;
        this.resizeObserver = new resizeObserver$1(function () {
            if (!resizeObserverStarted)
                return;
            _this.recalculate();
        });
        this.resizeObserver.observe(this.el);
        this.resizeObserver.observe(this.contentEl);
        elWindow.requestAnimationFrame(function () {
            resizeObserverStarted = true;
        });
        // This is required to detect horizontal scroll. Vertical scroll only needs the resizeObserver.
        this.mutationObserver = new elWindow.MutationObserver(this.recalculate);
        this.mutationObserver.observe(this.contentEl, {
            childList: true,
            subtree: true,
            characterData: true
        });
    };
    SimpleBar.prototype.recalculate = function () {
        var elWindow = getElementWindow(this.el);
        this.elStyles = elWindow.getComputedStyle(this.el);
        this.isRtl = this.elStyles.direction === 'rtl';
        var isHeightAuto = this.heightAutoObserverEl.offsetHeight <= 1;
        var isWidthAuto = this.heightAutoObserverEl.offsetWidth <= 1;
        var contentElOffsetWidth = this.contentEl.offsetWidth;
        var contentWrapperElOffsetWidth = this.contentWrapperEl.offsetWidth;
        var elOverflowX = this.elStyles.overflowX;
        var elOverflowY = this.elStyles.overflowY;
        this.contentEl.style.padding = "".concat(this.elStyles.paddingTop, " ").concat(this.elStyles.paddingRight, " ").concat(this.elStyles.paddingBottom, " ").concat(this.elStyles.paddingLeft);
        this.wrapperEl.style.margin = "-".concat(this.elStyles.paddingTop, " -").concat(this.elStyles.paddingRight, " -").concat(this.elStyles.paddingBottom, " -").concat(this.elStyles.paddingLeft);
        var contentElScrollHeight = this.contentEl.scrollHeight;
        var contentElScrollWidth = this.contentEl.scrollWidth;
        this.contentWrapperEl.style.height = isHeightAuto ? 'auto' : '100%';
        // Determine placeholder size
        this.placeholderEl.style.width = isWidthAuto
            ? "".concat(contentElOffsetWidth, "px")
            : 'auto';
        this.placeholderEl.style.height = "".concat(contentElScrollHeight, "px");
        var contentWrapperElOffsetHeight = this.contentWrapperEl.offsetHeight;
        this.axis.x.isOverflowing = contentElScrollWidth > contentElOffsetWidth;
        this.axis.y.isOverflowing =
            contentElScrollHeight > contentWrapperElOffsetHeight;
        // Set isOverflowing to false if user explicitely set hidden overflow
        this.axis.x.isOverflowing =
            elOverflowX === 'hidden' ? false : this.axis.x.isOverflowing;
        this.axis.y.isOverflowing =
            elOverflowY === 'hidden' ? false : this.axis.y.isOverflowing;
        this.axis.x.forceVisible =
            this.options.forceVisible === 'x' || this.options.forceVisible === true;
        this.axis.y.forceVisible =
            this.options.forceVisible === 'y' || this.options.forceVisible === true;
        this.hideNativeScrollbar();
        // Set isOverflowing to false if scrollbar is not necessary (content is shorter than offset)
        var offsetForXScrollbar = this.axis.x.isOverflowing
            ? this.scrollbarWidth
            : 0;
        var offsetForYScrollbar = this.axis.y.isOverflowing
            ? this.scrollbarWidth
            : 0;
        this.axis.x.isOverflowing =
            this.axis.x.isOverflowing &&
                contentElScrollWidth > contentWrapperElOffsetWidth - offsetForYScrollbar;
        this.axis.y.isOverflowing =
            this.axis.y.isOverflowing &&
                contentElScrollHeight >
                    contentWrapperElOffsetHeight - offsetForXScrollbar;
        this.axis.x.scrollbar.size = this.getScrollbarSize('x');
        this.axis.y.scrollbar.size = this.getScrollbarSize('y');
        this.axis.x.scrollbar.el.style.width = "".concat(this.axis.x.scrollbar.size, "px");
        this.axis.y.scrollbar.el.style.height = "".concat(this.axis.y.scrollbar.size, "px");
        this.positionScrollbar('x');
        this.positionScrollbar('y');
        this.toggleTrackVisibility('x');
        this.toggleTrackVisibility('y');
    };
    /**
     * Calculate scrollbar size
     */
    SimpleBar.prototype.getScrollbarSize = function (axis) {
        if (axis === void 0) { axis = 'y'; }
        if (!this.axis[axis].isOverflowing) {
            return 0;
        }
        var contentSize = this.contentEl[this.axis[axis].scrollSizeAttr];
        var trackSize = this.axis[axis].track.el[this.axis[axis].offsetSizeAttr];
        var scrollbarSize;
        var scrollbarRatio = trackSize / contentSize;
        // Calculate new height/position of drag handle.
        scrollbarSize = Math.max(~~(scrollbarRatio * trackSize), this.options.scrollbarMinSize);
        if (this.options.scrollbarMaxSize) {
            scrollbarSize = Math.min(scrollbarSize, this.options.scrollbarMaxSize);
        }
        return scrollbarSize;
    };
    SimpleBar.prototype.positionScrollbar = function (axis) {
        if (axis === void 0) { axis = 'y'; }
        if (!this.axis[axis].isOverflowing) {
            return;
        }
        var contentSize = this.contentWrapperEl[this.axis[axis].scrollSizeAttr];
        var trackSize = this.axis[axis].track.el[this.axis[axis].offsetSizeAttr];
        var hostSize = parseInt(this.elStyles[this.axis[axis].sizeAttr], 10);
        var scrollbar = this.axis[axis].scrollbar;
        var scrollOffset = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
        scrollOffset =
            axis === 'x' &&
                this.isRtl &&
                SimpleBar.getRtlHelpers().isRtlScrollingInverted
                ? -scrollOffset
                : scrollOffset;
        var scrollPourcent = scrollOffset / (contentSize - hostSize);
        var handleOffset = ~~((trackSize - scrollbar.size) * scrollPourcent);
        handleOffset =
            axis === 'x' &&
                this.isRtl &&
                SimpleBar.getRtlHelpers().isRtlScrollbarInverted
                ? handleOffset + (trackSize - scrollbar.size)
                : handleOffset;
        scrollbar.el.style.transform =
            axis === 'x'
                ? "translate3d(".concat(handleOffset, "px, 0, 0)")
                : "translate3d(0, ".concat(handleOffset, "px, 0)");
    };
    SimpleBar.prototype.toggleTrackVisibility = function (axis) {
        if (axis === void 0) { axis = 'y'; }
        var track = this.axis[axis].track.el;
        var scrollbar = this.axis[axis].scrollbar.el;
        if (this.axis[axis].isOverflowing || this.axis[axis].forceVisible) {
            track.style.visibility = 'visible';
            this.contentWrapperEl.style[this.axis[axis].overflowAttr] = 'scroll';
        }
        else {
            track.style.visibility = 'hidden';
            this.contentWrapperEl.style[this.axis[axis].overflowAttr] = 'hidden';
        }
        // Even if forceVisible is enabled, scrollbar itself should be hidden
        if (this.axis[axis].isOverflowing) {
            scrollbar.style.display = 'block';
        }
        else {
            scrollbar.style.display = 'none';
        }
    };
    SimpleBar.prototype.hideNativeScrollbar = function () {
        this.offsetEl.style[this.isRtl ? 'left' : 'right'] =
            this.axis.y.isOverflowing || this.axis.y.forceVisible
                ? "-".concat(this.scrollbarWidth, "px")
                : 0;
        this.offsetEl.style.bottom =
            this.axis.x.isOverflowing || this.axis.x.forceVisible
                ? "-".concat(this.scrollbarWidth, "px")
                : 0;
    };
    SimpleBar.prototype.onMouseMoveForAxis = function (axis) {
        if (axis === void 0) { axis = 'y'; }
        this.axis[axis].track.rect = this.axis[axis].track.el.getBoundingClientRect();
        this.axis[axis].scrollbar.rect = this.axis[axis].scrollbar.el.getBoundingClientRect();
        var isWithinScrollbarBoundsX = this.isWithinBounds(this.axis[axis].scrollbar.rect);
        if (isWithinScrollbarBoundsX) {
            this.axis[axis].scrollbar.el.classList.add(this.classNames.hover);
        }
        else {
            this.axis[axis].scrollbar.el.classList.remove(this.classNames.hover);
        }
        if (this.isWithinBounds(this.axis[axis].track.rect)) {
            this.showScrollbar(axis);
            this.axis[axis].track.el.classList.add(this.classNames.hover);
        }
        else {
            this.axis[axis].track.el.classList.remove(this.classNames.hover);
        }
    };
    SimpleBar.prototype.onMouseLeaveForAxis = function (axis) {
        if (axis === void 0) { axis = 'y'; }
        this.axis[axis].track.el.classList.remove(this.classNames.hover);
        this.axis[axis].scrollbar.el.classList.remove(this.classNames.hover);
    };
    /**
     * Show scrollbar
     */
    SimpleBar.prototype.showScrollbar = function (axis) {
        if (axis === void 0) { axis = 'y'; }
        var scrollbar = this.axis[axis].scrollbar.el;
        if (!this.axis[axis].isVisible) {
            scrollbar.classList.add(this.classNames.visible);
            this.axis[axis].isVisible = true;
        }
        if (this.options.autoHide) {
            this.hideScrollbars();
        }
    };
    /**
     * on scrollbar handle drag movement starts
     */
    SimpleBar.prototype.onDragStart = function (e, axis) {
        if (axis === void 0) { axis = 'y'; }
        var elDocument = getElementDocument(this.el);
        var elWindow = getElementWindow(this.el);
        var scrollbar = this.axis[axis].scrollbar;
        // Measure how far the user's mouse is from the top of the scrollbar drag handle.
        var eventOffset = axis === 'y' ? e.pageY : e.pageX;
        this.axis[axis].dragOffset =
            eventOffset - scrollbar.rect[this.axis[axis].offsetAttr];
        this.draggedAxis = axis;
        this.el.classList.add(this.classNames.dragging);
        elDocument.addEventListener('mousemove', this.drag, true);
        elDocument.addEventListener('mouseup', this.onEndDrag, true);
        if (this.removePreventClickId === null) {
            elDocument.addEventListener('click', this.preventClick, true);
            elDocument.addEventListener('dblclick', this.preventClick, true);
        }
        else {
            elWindow.clearTimeout(this.removePreventClickId);
            this.removePreventClickId = null;
        }
    };
    SimpleBar.prototype.onTrackClick = function (e, axis) {
        var _this = this;
        if (axis === void 0) { axis = 'y'; }
        if (!this.options.clickOnTrack)
            return;
        var elWindow = getElementWindow(this.el);
        this.axis[axis].scrollbar.rect = this.axis[axis].scrollbar.el.getBoundingClientRect();
        var scrollbar = this.axis[axis].scrollbar;
        var scrollbarOffset = scrollbar.rect[this.axis[axis].offsetAttr];
        var hostSize = parseInt(this.elStyles[this.axis[axis].sizeAttr], 10);
        var scrolled = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
        var t = axis === 'y'
            ? this.mouseY - scrollbarOffset
            : this.mouseX - scrollbarOffset;
        var dir = t < 0 ? -1 : 1;
        var scrollSize = dir === -1 ? scrolled - hostSize : scrolled + hostSize;
        var scrollTo = function () {
            var _a, _b;
            if (dir === -1) {
                if (scrolled > scrollSize) {
                    scrolled -= _this.options.clickOnTrackSpeed;
                    _this.contentWrapperEl.scrollTo((_a = {},
                        _a[_this.axis[axis].offsetAttr] = scrolled,
                        _a));
                    elWindow.requestAnimationFrame(scrollTo);
                }
            }
            else {
                if (scrolled < scrollSize) {
                    scrolled += _this.options.clickOnTrackSpeed;
                    _this.contentWrapperEl.scrollTo((_b = {},
                        _b[_this.axis[axis].offsetAttr] = scrolled,
                        _b));
                    elWindow.requestAnimationFrame(scrollTo);
                }
            }
        };
        scrollTo();
    };
    /**
     * Getter for content element
     */
    SimpleBar.prototype.getContentElement = function () {
        return this.contentEl;
    };
    /**
     * Getter for original scrolling element
     */
    SimpleBar.prototype.getScrollElement = function () {
        return this.contentWrapperEl;
    };
    SimpleBar.prototype.getScrollbarWidth = function () {
        // Try/catch for FF 56 throwing on undefined computedStyles
        try {
            // Detect browsers supporting CSS scrollbar styling and do not calculate
            if (getComputedStyle(this.contentWrapperEl, '::-webkit-scrollbar')
                .display === 'none' ||
                'scrollbarWidth' in document.documentElement.style ||
                '-ms-overflow-style' in document.documentElement.style) {
                return 0;
            }
            else {
                return scrollbarWidth(this.el);
            }
        }
        catch (e) {
            return scrollbarWidth(this.el);
        }
    };
    SimpleBar.prototype.removeListeners = function () {
        var _this = this;
        var elWindow = getElementWindow(this.el);
        // Event listeners
        if (this.options.autoHide) {
            this.el.removeEventListener('mouseenter', this.onMouseEnter);
        }
        ['mousedown', 'click', 'dblclick'].forEach(function (e) {
            _this.el.removeEventListener(e, _this.onPointerEvent, true);
        });
        ['touchstart', 'touchend', 'touchmove'].forEach(function (e) {
            _this.el.removeEventListener(e, _this.onPointerEvent, {
                capture: true,
                passive: true
            });
        });
        this.el.removeEventListener('mousemove', this.onMouseMove);
        this.el.removeEventListener('mouseleave', this.onMouseLeave);
        if (this.contentWrapperEl) {
            this.contentWrapperEl.removeEventListener('scroll', this.onScroll);
        }
        elWindow.removeEventListener('resize', this.onWindowResize);
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
        }
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        // Cancel all debounced functions
        this.recalculate.cancel();
        this.onMouseMove.cancel();
        this.hideScrollbars.cancel();
        this.onWindowResize.cancel();
    };
    /**
     * UnMount mutation observer and delete SimpleBar instance from DOM element
     */
    SimpleBar.prototype.unMount = function () {
        this.removeListeners();
        SimpleBar.instances.delete(this.el);
    };
    /**
     * Check if mouse is within bounds
     */
    SimpleBar.prototype.isWithinBounds = function (bbox) {
        return (this.mouseX >= bbox.left &&
            this.mouseX <= bbox.left + bbox.width &&
            this.mouseY >= bbox.top &&
            this.mouseY <= bbox.top + bbox.height);
    };
    /**
     * Find element children matches query
     */
    SimpleBar.prototype.findChild = function (el, query) {
        var matches = el.matches ||
            el.webkitMatchesSelector ||
            el.mozMatchesSelector ||
            el.msMatchesSelector;
        return Array.prototype.filter.call(el.children, function (child) {
            return matches.call(child, query);
        })[0];
    };
    SimpleBar.defaultOptions = {
        autoHide: true,
        forceVisible: false,
        clickOnTrack: true,
        clickOnTrackSpeed: 40,
        classNames: {
            contentEl: 'simplebar-content',
            contentWrapper: 'simplebar-content-wrapper',
            offset: 'simplebar-offset',
            mask: 'simplebar-mask',
            wrapper: 'simplebar-wrapper',
            placeholder: 'simplebar-placeholder',
            scrollbar: 'simplebar-scrollbar',
            track: 'simplebar-track',
            heightAutoObserverWrapperEl: 'simplebar-height-auto-observer-wrapper',
            heightAutoObserverEl: 'simplebar-height-auto-observer',
            visible: 'simplebar-visible',
            horizontal: 'simplebar-horizontal',
            vertical: 'simplebar-vertical',
            hover: 'simplebar-hover',
            dragging: 'simplebar-dragging'
        },
        scrollbarMinSize: 25,
        scrollbarMaxSize: 0,
        timeout: 1000
    };
    SimpleBar.instances = new WeakMap();
    return SimpleBar;
}());

var defaultColors = {"component":"scrollbar__component_2g06a"};
require('./default.css');

var styles = {"component":"scrollbar__component_11c6t","wrapper":"scrollbar__wrapper_11c6t","heightAutoObserverWrapper":"scrollbar__heightAutoObserverWrapper_11c6t","heightAutoObserver":"scrollbar__heightAutoObserver_11c6t","-webkit-mask":"scrollbar__mask_11c6t","mask":"scrollbar__mask_11c6t","offset":"scrollbar__offset_11c6t","contentWrapper":"scrollbar__contentWrapper_11c6t","placeholder":"scrollbar__placeholder_11c6t","vertical":"scrollbar__vertical_11c6t","hover":"scrollbar__hover_11c6t","horizontal":"scrollbar__horizontal_11c6t","content":"scrollbar__content_11c6t"};
require('./index.css');

var invertedColors = {"component":"scrollbar__component_1kiec"};
require('./inverted.css');

var colorStylesMap = {
    default: defaultColors,
    inverted: invertedColors,
};
var classNames = {
    wrapper: styles.wrapper,
    heightAutoObserverEl: styles.heightAutoObserver,
    heightAutoObserverWrapperEl: styles.heightAutoObserverWrapper,
    mask: styles.mask,
    offset: styles.offset,
    contentWrapper: styles.contentWrapper,
    contentEl: styles.content,
    placeholder: styles.placeholder,
    vertical: styles.vertical,
    horizontal: styles.horizontal,
    hover: styles.hover,
    track: 'track',
    scrollbar: 'scrollbar',
    dragging: 'dragging',
    visible: 'visible',
};
var Scrollbar = React__default.default.forwardRef(function (_a, ref) {
    var _b = _a.colors, colors = _b === void 0 ? 'default' : _b, className = _a.className, children = _a.children, _c = _a.scrollableNodeProps, scrollableNodeProps = _c === void 0 ? { ref: null } : _c, _d = _a.contentNodeProps, contentNodeProps = _d === void 0 ? { ref: null } : _d, _e = _a.autoHide, autoHide = _e === void 0 ? true : _e, _f = _a.forceVisible, forceVisible = _f === void 0 ? false : _f, _g = _a.autoHideTimeout, autoHideTimeout = _g === void 0 ? 1000 : _g, _h = _a.clickOnTrack, clickOnTrack = _h === void 0 ? true : _h, _j = _a.horizontalAutoStretch, horizontalAutoStretch = _j === void 0 ? false : _j, _k = _a.widthPropName, widthPropName = _k === void 0 ? 'minWidth' : _k, htmlAttributes = __rest(_a, ["colors", "className", "children", "scrollableNodeProps", "contentNodeProps", "autoHide", "forceVisible", "autoHideTimeout", "clickOnTrack", "horizontalAutoStretch", "widthPropName"]);
    var elRef = React.useRef(null);
    var scrollableNodeRef = React.useRef(null);
    var contentNodeRef = React.useRef(null);
    var maskNodeRef = React.useRef(null);
    var colorStyles = colorStylesMap[colors];
    React.useEffect(function () {
        var instance;
        if (elRef.current) {
            instance = new SimpleBar(elRef.current, {
                autoHide: autoHide,
                forceVisible: forceVisible,
                clickOnTrack: clickOnTrack,
                classNames: classNames,
                timeout: autoHideTimeout,
                direction: 'ltr',
                scrollbarMinSize: 40,
                scrollableNode: scrollableNodeRef.current,
                contentNode: contentNodeRef.current,
            });
        }
        return function () {
            if (instance) {
                instance.unMount();
                instance = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    React.useEffect(function () {
        var mutationObserver = null;
        var contentNode = contentNodeRef.current;
        var rootNode = elRef.current;
        var scrollableNode = scrollableNodeRef.current;
        var maskNode = maskNodeRef.current;
        var setMinWidth = throttle__default.default(function () {
            if (contentNode && rootNode && scrollableNode && maskNode) {
                /*
                 * Устанавливаем min-width, чтобы максимально растянуть абсолютно позиционированный элемент.
                 * Затем контенту устанавливаем display: inline-block, чтобы его ширина была равна ширине содержимого.
                 */
                maskNode.style.minWidth = '4000px';
                contentNode.style.display = 'inline-block';
                var contentRect = contentNode.getBoundingClientRect();
                var newWidth = "".concat(Math.ceil(contentRect.width), "px");
                var prevWidth = rootNode.style[widthPropName];
                if (newWidth !== prevWidth) {
                    rootNode.style[widthPropName] = newWidth;
                }
                contentNode.style.display = '';
                maskNode.style.minWidth = '';
            }
        }, 200);
        if (horizontalAutoStretch && contentNode) {
            setMinWidth();
            mutationObserver = new MutationObserver(setMinWidth);
            mutationObserver.observe(contentNode, {
                childList: true,
                subtree: true,
                characterData: true,
            });
        }
        return function () {
            setMinWidth.cancel();
            if (mutationObserver) {
                mutationObserver.disconnect();
            }
        };
    }, [widthPropName, horizontalAutoStretch]);
    return (React__default.default.createElement("div", __assign({}, htmlAttributes, { ref: mergeRefs__default.default([elRef, ref]), "data-simplebar": true, className: cn__default.default(styles.component, colorStyles.component, className) }),
        React__default.default.createElement("div", { className: classNames.wrapper },
            React__default.default.createElement("div", { className: classNames.heightAutoObserverWrapperEl },
                React__default.default.createElement("div", { className: classNames.heightAutoObserverEl })),
            React__default.default.createElement("div", { className: classNames.mask, ref: maskNodeRef },
                React__default.default.createElement("div", { className: classNames.offset },
                    React__default.default.createElement("div", __assign({}, scrollableNodeProps, { ref: mergeRefs__default.default(__spreadArray([
                            scrollableNodeRef
                        ], (scrollableNodeProps.ref ? [scrollableNodeProps.ref] : []), true)), className: cn__default.default(classNames.contentWrapper, scrollableNodeProps === null || scrollableNodeProps === void 0 ? void 0 : scrollableNodeProps.className) }),
                        React__default.default.createElement("div", __assign({}, contentNodeProps, { ref: mergeRefs__default.default(__spreadArray([
                                contentNodeRef
                            ], (contentNodeProps.ref ? [contentNodeProps.ref] : []), true)), className: cn__default.default(classNames.contentEl, contentNodeProps === null || contentNodeProps === void 0 ? void 0 : contentNodeProps.className) }), children)))),
            React__default.default.createElement("div", { className: classNames.placeholder })),
        React__default.default.createElement("div", { className: cn__default.default(classNames.track, classNames.horizontal) },
            React__default.default.createElement("div", { className: classNames.scrollbar })),
        React__default.default.createElement("div", { className: cn__default.default(classNames.track, classNames.vertical) },
            React__default.default.createElement("div", { className: classNames.scrollbar }))));
});

exports.Scrollbar = Scrollbar;
