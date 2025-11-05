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

var guttersStyles = {"row":"grid__row_1y9sm","gutter-8":"grid__gutter-8_1y9sm","col":"grid__col_1y9sm","gutter-16":"grid__gutter-16_1y9sm","gutter-24":"grid__gutter-24_1y9sm","gutter-mobile-8":"grid__gutter-mobile-8_1y9sm","gutter-mobile-16":"grid__gutter-mobile-16_1y9sm","gutter-mobile-24":"grid__gutter-mobile-24_1y9sm","gutter-mobile-s-8":"grid__gutter-mobile-s-8_1y9sm","gutter-mobile-s-16":"grid__gutter-mobile-s-16_1y9sm","gutter-mobile-s-24":"grid__gutter-mobile-s-24_1y9sm","gutter-mobile-m-8":"grid__gutter-mobile-m-8_1y9sm","gutter-mobile-m-16":"grid__gutter-mobile-m-16_1y9sm","gutter-mobile-m-24":"grid__gutter-mobile-m-24_1y9sm","gutter-mobile-l-8":"grid__gutter-mobile-l-8_1y9sm","gutter-mobile-l-16":"grid__gutter-mobile-l-16_1y9sm","gutter-mobile-l-24":"grid__gutter-mobile-l-24_1y9sm","gutter-tablet-8":"grid__gutter-tablet-8_1y9sm","gutter-tablet-16":"grid__gutter-tablet-16_1y9sm","gutter-tablet-24":"grid__gutter-tablet-24_1y9sm","gutter-tablet-s-8":"grid__gutter-tablet-s-8_1y9sm","gutter-tablet-s-16":"grid__gutter-tablet-s-16_1y9sm","gutter-tablet-s-24":"grid__gutter-tablet-s-24_1y9sm","gutter-tablet-m-8":"grid__gutter-tablet-m-8_1y9sm","gutter-tablet-m-16":"grid__gutter-tablet-m-16_1y9sm","gutter-tablet-m-24":"grid__gutter-tablet-m-24_1y9sm","gutter-desktop-8":"grid__gutter-desktop-8_1y9sm","gutter-desktop-16":"grid__gutter-desktop-16_1y9sm","gutter-desktop-24":"grid__gutter-desktop-24_1y9sm","gutter-desktop-s-8":"grid__gutter-desktop-s-8_1y9sm","gutter-desktop-s-16":"grid__gutter-desktop-s-16_1y9sm","gutter-desktop-s-24":"grid__gutter-desktop-s-24_1y9sm","gutter-desktop-m-8":"grid__gutter-desktop-m-8_1y9sm","gutter-desktop-m-16":"grid__gutter-desktop-m-16_1y9sm","gutter-desktop-m-24":"grid__gutter-desktop-m-24_1y9sm","gutter-desktop-l-8":"grid__gutter-desktop-l-8_1y9sm","gutter-desktop-l-16":"grid__gutter-desktop-l-16_1y9sm","gutter-desktop-l-24":"grid__gutter-desktop-l-24_1y9sm","gutter-desktop-xl-8":"grid__gutter-desktop-xl-8_1y9sm","gutter-desktop-xl-16":"grid__gutter-desktop-xl-16_1y9sm","gutter-desktop-xl-24":"grid__gutter-desktop-xl-24_1y9sm"};
require('./gutters.css');

export { __spreadArray as _, guttersStyles as g };
