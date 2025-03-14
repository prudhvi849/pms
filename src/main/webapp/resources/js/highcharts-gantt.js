/*
 Highcharts Gantt JS v9.3.2 (2021-11-29)

 (c) 2017-2021 Lars Cabrera, Torstein Honsi, Jon Arild Nygard & Oystein Moseng

 License: www.highcharts.com/license
*/
'use strict';
(function(X, N) {
    "object" === typeof module && module.exports ? (N["default"] = N, module.exports = X.document ? N(X) : N) : "function" === typeof define && define.amd ? define("highcharts/highcharts-gantt", function() {
        return N(X)
    }) : (X.Highcharts && X.Highcharts.error(16, !0), X.Highcharts = N(X))
})("undefined" !== typeof window ? window : this, function(X) {
    function N(E, a, B, H) {
        E.hasOwnProperty(a) || (E[a] = H.apply(null, B))
    }
    var a = {};
    N(a, "Core/Globals.js", [], function() {
        var E = "undefined" !== typeof X ? X : "undefined" !== typeof window ?
            window : {},
            a;
        (function(a) {
            a.SVG_NS = "http://www.w3.org/2000/svg";
            a.product = "Highcharts";
            a.version = "9.3.2";
            a.win = E;
            a.doc = a.win.document;
            a.svg = a.doc && a.doc.createElementNS && !!a.doc.createElementNS(a.SVG_NS, "svg").createSVGRect;
            a.userAgent = a.win.navigator && a.win.navigator.userAgent || "";
            a.isChrome = -1 !== a.userAgent.indexOf("Chrome");
            a.isFirefox = -1 !== a.userAgent.indexOf("Firefox");
            a.isMS = /(edge|msie|trident)/i.test(a.userAgent) && !a.win.opera;
            a.isSafari = !a.isChrome && -1 !== a.userAgent.indexOf("Safari");
            a.isTouchDevice =
                /(Mobile|Android|Windows Phone)/.test(a.userAgent);
            a.isWebKit = -1 !== a.userAgent.indexOf("AppleWebKit");
            a.deg2rad = 2 * Math.PI / 360;
            a.hasBidiBug = a.isFirefox && 4 > parseInt(a.userAgent.split("Firefox/")[1], 10);
            a.hasTouch = !!a.win.TouchEvent;
            a.marginNames = ["plotTop", "marginRight", "marginBottom", "plotLeft"];
            a.noop = function() {};
            a.supportsPassiveEvents = function() {
                var E = !1;
                if (!a.isMS) {
                    var t = Object.defineProperty({}, "passive", {
                        get: function() {
                            E = !0
                        }
                    });
                    a.win.addEventListener && a.win.removeEventListener && (a.win.addEventListener("testPassive",
                        a.noop, t), a.win.removeEventListener("testPassive", a.noop, t))
                }
                return E
            }();
            a.charts = [];
            a.dateFormats = {};
            a.seriesTypes = {};
            a.symbolSizes = {};
            a.chartCount = 0
        })(a || (a = {}));
        "";
        return a
    });
    N(a, "Core/Utilities.js", [a["Core/Globals.js"]], function(a) {
        function E(D, b, k, d) {
            var C = b ? "Highcharts error" : "Highcharts warning";
            32 === D && (D = C + ": Deprecated member");
            var r = m(D),
                e = r ? C + " #" + D + ": www.highcharts.com/errors/" + D + "/" : D.toString();
            if ("undefined" !== typeof d) {
                var P = "";
                r && (e += "?");
                G(d, function(k, u) {
                    P += "\n - " + u + ": " + k;
                    r && (e += encodeURI(u) + "=" + encodeURI(k))
                });
                e += P
            }
            M(a, "displayError", {
                chart: k,
                code: D,
                message: e,
                params: d
            }, function() {
                if (b) throw Error(e);
                w.console && -1 === E.messages.indexOf(e) && console.warn(e)
            });
            E.messages.push(e)
        }

        function B(D, b) {
            var k = {};
            G(D, function(d, C) {
                if (I(D[C], !0) && !D.nodeType && b[C]) d = B(D[C], b[C]), Object.keys(d).length && (k[C] = d);
                else if (I(D[C]) || D[C] !== b[C]) k[C] = D[C]
            });
            return k
        }

        function H(D, b) {
            return parseInt(D, b || 10)
        }

        function y(D) {
            return "string" === typeof D
        }

        function F(D) {
            D = Object.prototype.toString.call(D);
            return "[object Array]" === D || "[object Array Iterator]" === D
        }

        function I(D, b) {
            return !!D && "object" === typeof D && (!b || !F(D))
        }

        function x(D) {
            return I(D) && "number" === typeof D.nodeType
        }

        function q(D) {
            var b = D && D.constructor;
            return !(!I(D, !0) || x(D) || !b || !b.name || "Object" === b.name)
        }

        function m(b) {
            return "number" === typeof b && !isNaN(b) && Infinity > b && -Infinity < b
        }

        function h(b) {
            return "undefined" !== typeof b && null !== b
        }

        function c(b, d, k) {
            var D;
            y(d) ? h(k) ? b.setAttribute(d, k) : b && b.getAttribute && ((D = b.getAttribute(d)) || "class" !==
                d || (D = b.getAttribute(d + "Name"))) : G(d, function(k, D) {
                h(k) ? b.setAttribute(D, k) : b.removeAttribute(D)
            });
            return D
        }

        function n(b, d) {
            var k;
            b || (b = {});
            for (k in d) b[k] = d[k];
            return b
        }

        function z() {
            for (var b = arguments, d = b.length, k = 0; k < d; k++) {
                var e = b[k];
                if ("undefined" !== typeof e && null !== e) return e
            }
        }

        function g(b, d) {
            a.isMS && !a.svg && d && "undefined" !== typeof d.opacity && (d.filter = "alpha(opacity=" + 100 * d.opacity + ")");
            n(b.style, d)
        }

        function f(b, d) {
            return 1E14 < b ? b : parseFloat(b.toPrecision(d || 14))
        }

        function e(b, d, k) {
            var D = a.getStyle ||
                e;
            if ("width" === d) return d = Math.min(b.offsetWidth, b.scrollWidth), k = b.getBoundingClientRect && b.getBoundingClientRect().width, k < d && k >= d - 1 && (d = Math.floor(k)), Math.max(0, d - (D(b, "padding-left", !0) || 0) - (D(b, "padding-right", !0) || 0));
            if ("height" === d) return Math.max(0, Math.min(b.offsetHeight, b.scrollHeight) - (D(b, "padding-top", !0) || 0) - (D(b, "padding-bottom", !0) || 0));
            w.getComputedStyle || E(27, !0);
            if (b = w.getComputedStyle(b, void 0)) {
                var C = b.getPropertyValue(d);
                z(k, "opacity" !== d) && (C = H(C))
            }
            return C
        }

        function G(b, d,
            k) {
            for (var D in b) Object.hasOwnProperty.call(b, D) && d.call(k || b[D], b[D], D, b)
        }

        function J(b, d, k) {
            function D(d, k) {
                var u = b.removeEventListener || a.removeEventListenerPolyfill;
                u && u.call(b, d, k, !1)
            }

            function C(k) {
                var r;
                if (b.nodeName) {
                    if (d) {
                        var u = {};
                        u[d] = !0
                    } else u = k;
                    G(u, function(u, b) {
                        if (k[b])
                            for (r = k[b].length; r--;) D(b, k[b][r].fn)
                    })
                }
            }
            var r = "function" === typeof b && b.prototype || b;
            if (Object.hasOwnProperty.call(r, "hcEvents")) {
                var e = r.hcEvents;
                d ? (r = e[d] || [], k ? (e[d] = r.filter(function(b) {
                    return k !== b.fn
                }), D(d, k)) : (C(e),
                    e[d] = [])) : (C(e), delete r.hcEvents)
            }
        }

        function M(b, d, k, e) {
            k = k || {};
            if (l.createEvent && (b.dispatchEvent || b.fireEvent && b !== a)) {
                var D = l.createEvent("Events");
                D.initEvent(d, !0, !0);
                k = n(D, k);
                b.dispatchEvent ? b.dispatchEvent(k) : b.fireEvent(d, k)
            } else if (b.hcEvents) {
                k.target || n(k, {
                    preventDefault: function() {
                        k.defaultPrevented = !0
                    },
                    target: b,
                    type: d
                });
                D = [];
                for (var r = b, C = !1; r.hcEvents;) Object.hasOwnProperty.call(r, "hcEvents") && r.hcEvents[d] && (D.length && (C = !0), D.unshift.apply(D, r.hcEvents[d])), r = Object.getPrototypeOf(r);
                C && D.sort(function(b, d) {
                    return b.order - d.order
                });
                D.forEach(function(d) {
                    !1 === d.fn.call(b, k) && k.preventDefault()
                })
            }
            e && !k.defaultPrevented && e.call(b, k)
        }
        var p = a.charts,
            l = a.doc,
            w = a.win;
        (E || (E = {})).messages = [];
        Math.easeInOutSine = function(b) {
            return -.5 * (Math.cos(Math.PI * b) - 1)
        };
        var b = Array.prototype.find ? function(b, d) {
            return b.find(d)
        } : function(b, d) {
            var k, D = b.length;
            for (k = 0; k < D; k++)
                if (d(b[k], k)) return b[k]
        };
        G({
            map: "map",
            each: "forEach",
            grep: "filter",
            reduce: "reduce",
            some: "some"
        }, function(b, d) {
            a[d] = function(k) {
                var D;
                E(32, !1, void 0, (D = {}, D["Highcharts." + d] = "use Array." + b, D));
                return Array.prototype[b].apply(k, [].slice.call(arguments, 1))
            }
        });
        var v, d = function() {
            var b = Math.random().toString(36).substring(2, 9) + "-",
                d = 0;
            return function() {
                return "highcharts-" + (v ? "" : b) + d++
            }
        }();
        w.jQuery && (w.jQuery.fn.highcharts = function() {
            var b = [].slice.call(arguments);
            if (this[0]) return b[0] ? (new(a[y(b[0]) ? b.shift() : "Chart"])(this[0], b[0], b[1]), this) : p[c(this[0], "data-highcharts-chart")]
        });
        b = {
            addEvent: function(b, d, k, e) {
                void 0 === e && (e = {});
                var D = "function" === typeof b && b.prototype || b;
                Object.hasOwnProperty.call(D, "hcEvents") || (D.hcEvents = {});
                D = D.hcEvents;
                a.Point && b instanceof a.Point && b.series && b.series.chart && (b.series.chart.runTrackerClick = !0);
                var r = b.addEventListener || a.addEventListenerPolyfill;
                r && r.call(b, d, k, a.supportsPassiveEvents ? {
                    passive: void 0 === e.passive ? -1 !== d.indexOf("touch") : e.passive,
                    capture: !1
                } : !1);
                D[d] || (D[d] = []);
                D[d].push({
                    fn: k,
                    order: "number" === typeof e.order ? e.order : Infinity
                });
                D[d].sort(function(b, d) {
                    return b.order -
                        d.order
                });
                return function() {
                    J(b, d, k)
                }
            },
            arrayMax: function(b) {
                for (var d = b.length, k = b[0]; d--;) b[d] > k && (k = b[d]);
                return k
            },
            arrayMin: function(b) {
                for (var d = b.length, k = b[0]; d--;) b[d] < k && (k = b[d]);
                return k
            },
            attr: c,
            clamp: function(b, d, k) {
                return b > d ? b < k ? b : k : d
            },
            cleanRecursively: B,
            clearTimeout: function(b) {
                h(b) && clearTimeout(b)
            },
            correctFloat: f,
            createElement: function(b, d, k, e, p) {
                b = l.createElement(b);
                d && n(b, d);
                p && g(b, {
                    padding: "0",
                    border: "none",
                    margin: "0"
                });
                k && g(b, k);
                e && e.appendChild(b);
                return b
            },
            css: g,
            defined: h,
            destroyObjectProperties: function(b,
                d) {
                G(b, function(k, e) {
                    k && k !== d && k.destroy && k.destroy();
                    delete b[e]
                })
            },
            discardElement: function(b) {
                b && b.parentElement && b.parentElement.removeChild(b)
            },
            erase: function(b, d) {
                for (var k = b.length; k--;)
                    if (b[k] === d) {
                        b.splice(k, 1);
                        break
                    }
            },
            error: E,
            extend: n,
            extendClass: function(b, d) {
                var k = function() {};
                k.prototype = new b;
                n(k.prototype, d);
                return k
            },
            find: b,
            fireEvent: M,
            getMagnitude: function(b) {
                return Math.pow(10, Math.floor(Math.log(b) / Math.LN10))
            },
            getNestedProperty: function(b, d) {
                for (b = b.split("."); b.length && h(d);) {
                    var k =
                        b.shift();
                    if ("undefined" === typeof k || "__proto__" === k) return;
                    d = d[k];
                    if (!h(d) || "function" === typeof d || "number" === typeof d.nodeType || d === w) return
                }
                return d
            },
            getStyle: e,
            inArray: function(b, d, k) {
                E(32, !1, void 0, {
                    "Highcharts.inArray": "use Array.indexOf"
                });
                return d.indexOf(b, k)
            },
            isArray: F,
            isClass: q,
            isDOMElement: x,
            isFunction: function(b) {
                return "function" === typeof b
            },
            isNumber: m,
            isObject: I,
            isString: y,
            keys: function(b) {
                E(32, !1, void 0, {
                    "Highcharts.keys": "use Object.keys"
                });
                return Object.keys(b)
            },
            merge: function() {
                var b,
                    d = arguments,
                    k = {},
                    e = function(b, d) {
                        "object" !== typeof b && (b = {});
                        G(d, function(k, r) {
                            "__proto__" !== r && "constructor" !== r && (!I(k, !0) || q(k) || x(k) ? b[r] = d[r] : b[r] = e(b[r] || {}, k))
                        });
                        return b
                    };
                !0 === d[0] && (k = d[1], d = Array.prototype.slice.call(d, 2));
                var l = d.length;
                for (b = 0; b < l; b++) k = e(k, d[b]);
                return k
            },
            normalizeTickInterval: function(b, d, k, e, l) {
                var r = b;
                k = z(k, 1);
                var D = b / k;
                d || (d = l ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === e && (1 === k ? d = d.filter(function(b) {
                    return 0 === b % 1
                }) : .1 >= k && (d = [1 / k])));
                for (e = 0; e < d.length &&
                    !(r = d[e], l && r * k >= b || !l && D <= (d[e] + (d[e + 1] || d[e])) / 2); e++);
                return r = f(r * k, -Math.round(Math.log(.001) / Math.LN10))
            },
            objectEach: G,
            offset: function(b) {
                var d = l.documentElement;
                b = b.parentElement || b.parentNode ? b.getBoundingClientRect() : {
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0
                };
                return {
                    top: b.top + (w.pageYOffset || d.scrollTop) - (d.clientTop || 0),
                    left: b.left + (w.pageXOffset || d.scrollLeft) - (d.clientLeft || 0),
                    width: b.width,
                    height: b.height
                }
            },
            pad: function(b, d, k) {
                return Array((d || 2) + 1 - String(b).replace("-", "").length).join(k || "0") +
                    b
            },
            pick: z,
            pInt: H,
            relativeLength: function(b, d, k) {
                return /%$/.test(b) ? d * parseFloat(b) / 100 + (k || 0) : parseFloat(b)
            },
            removeEvent: J,
            splat: function(b) {
                return F(b) ? b : [b]
            },
            stableSort: function(b, d) {
                var k = b.length,
                    e, l;
                for (l = 0; l < k; l++) b[l].safeI = l;
                b.sort(function(b, k) {
                    e = d(b, k);
                    return 0 === e ? b.safeI - k.safeI : e
                });
                for (l = 0; l < k; l++) delete b[l].safeI
            },
            syncTimeout: function(b, d, k) {
                if (0 < d) return setTimeout(b, d, k);
                b.call(0, k);
                return -1
            },
            timeUnits: {
                millisecond: 1,
                second: 1E3,
                minute: 6E4,
                hour: 36E5,
                day: 864E5,
                week: 6048E5,
                month: 24192E5,
                year: 314496E5
            },
            uniqueKey: d,
            useSerialIds: function(b) {
                return v = z(b, v)
            },
            wrap: function(b, d, k) {
                var e = b[d];
                b[d] = function() {
                    var b = Array.prototype.slice.call(arguments),
                        d = arguments,
                        l = this;
                    l.proceed = function() {
                        e.apply(l, arguments.length ? arguments : d)
                    };
                    b.unshift(e);
                    b = k.apply(this, b);
                    l.proceed = null;
                    return b
                }
            }
        };
        "";
        return b
    });
    N(a, "Core/Chart/ChartDefaults.js", [], function() {
        return {
            panning: {
                enabled: !1,
                type: "x"
            },
            styledMode: !1,
            borderRadius: 0,
            colorCount: 10,
            defaultSeriesType: "line",
            ignoreHiddenSeries: !0,
            spacing: [10,
                10, 15, 10
            ],
            resetZoomButton: {
                theme: {
                    zIndex: 6
                },
                position: {
                    align: "right",
                    x: -10,
                    y: 10
                }
            },
            zoomBySingleTouch: !1,
            width: null,
            height: null,
            borderColor: "#335cad",
            backgroundColor: "#ffffff",
            plotBorderColor: "#cccccc"
        }
    });
    N(a, "Core/Color/Color.js", [a["Core/Globals.js"], a["Core/Utilities.js"]], function(a, t) {
        var E = t.isNumber,
            H = t.merge,
            y = t.pInt;
        t = function() {
            function t(E) {
                this.rgba = [NaN, NaN, NaN, NaN];
                this.input = E;
                var x = a.Color;
                if (x && x !== t) return new x(E);
                if (!(this instanceof t)) return new t(E);
                this.init(E)
            }
            t.parse = function(a) {
                return a ?
                    new t(a) : t.None
            };
            t.prototype.init = function(a) {
                var x;
                if ("object" === typeof a && "undefined" !== typeof a.stops) this.stops = a.stops.map(function(c) {
                    return new t(c[1])
                });
                else if ("string" === typeof a) {
                    this.input = a = t.names[a.toLowerCase()] || a;
                    if ("#" === a.charAt(0)) {
                        var q = a.length;
                        var m = parseInt(a.substr(1), 16);
                        7 === q ? x = [(m & 16711680) >> 16, (m & 65280) >> 8, m & 255, 1] : 4 === q && (x = [(m & 3840) >> 4 | (m & 3840) >> 8, (m & 240) >> 4 | m & 240, (m & 15) << 4 | m & 15, 1])
                    }
                    if (!x)
                        for (m = t.parsers.length; m-- && !x;) {
                            var h = t.parsers[m];
                            (q = h.regex.exec(a)) && (x = h.parse(q))
                        }
                }
                x &&
                    (this.rgba = x)
            };
            t.prototype.get = function(a) {
                var x = this.input,
                    q = this.rgba;
                if ("object" === typeof x && "undefined" !== typeof this.stops) {
                    var m = H(x);
                    m.stops = [].slice.call(m.stops);
                    this.stops.forEach(function(h, c) {
                        m.stops[c] = [m.stops[c][0], h.get(a)]
                    });
                    return m
                }
                return q && E(q[0]) ? "rgb" === a || !a && 1 === q[3] ? "rgb(" + q[0] + "," + q[1] + "," + q[2] + ")" : "a" === a ? "" + q[3] : "rgba(" + q.join(",") + ")" : x
            };
            t.prototype.brighten = function(a) {
                var x = this.rgba;
                if (this.stops) this.stops.forEach(function(m) {
                    m.brighten(a)
                });
                else if (E(a) && 0 !== a)
                    for (var q =
                            0; 3 > q; q++) x[q] += y(255 * a), 0 > x[q] && (x[q] = 0), 255 < x[q] && (x[q] = 255);
                return this
            };
            t.prototype.setOpacity = function(a) {
                this.rgba[3] = a;
                return this
            };
            t.prototype.tweenTo = function(a, x) {
                var q = this.rgba,
                    m = a.rgba;
                if (!E(q[0]) || !E(m[0])) return a.input || "none";
                a = 1 !== m[3] || 1 !== q[3];
                return (a ? "rgba(" : "rgb(") + Math.round(m[0] + (q[0] - m[0]) * (1 - x)) + "," + Math.round(m[1] + (q[1] - m[1]) * (1 - x)) + "," + Math.round(m[2] + (q[2] - m[2]) * (1 - x)) + (a ? "," + (m[3] + (q[3] - m[3]) * (1 - x)) : "") + ")"
            };
            t.names = {
                white: "#ffffff",
                black: "#000000"
            };
            t.parsers = [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function(a) {
                    return [y(a[1]), y(a[2]), y(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function(a) {
                    return [y(a[1]), y(a[2]), y(a[3]), 1]
                }
            }];
            t.None = new t("");
            return t
        }();
        "";
        return t
    });
    N(a, "Core/Color/Palettes.js", [], function() {
        return {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" ")
        }
    });
    N(a, "Core/Time.js", [a["Core/Globals.js"], a["Core/Utilities.js"]], function(a, t) {
        var E = a.win,
            H = t.defined,
            y =
            t.error,
            F = t.extend,
            I = t.isObject,
            x = t.merge,
            q = t.objectEach,
            m = t.pad,
            h = t.pick,
            c = t.splat,
            n = t.timeUnits,
            z = a.isSafari && E.Intl && E.Intl.DateTimeFormat.prototype.formatRange,
            g = a.isSafari && E.Intl && !E.Intl.DateTimeFormat.prototype.formatRange;
        t = function() {
            function f(e) {
                this.options = {};
                this.variableTimezone = this.useUTC = !1;
                this.Date = E.Date;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.update(e)
            }
            f.prototype.get = function(e, f) {
                if (this.variableTimezone || this.timezoneOffset) {
                    var g = f.getTime(),
                        c = g - this.getTimezoneOffset(f);
                    f.setTime(c);
                    e = f["getUTC" + e]();
                    f.setTime(g);
                    return e
                }
                return this.useUTC ? f["getUTC" + e]() : f["get" + e]()
            };
            f.prototype.set = function(e, f, g) {
                if (this.variableTimezone || this.timezoneOffset) {
                    if ("Milliseconds" === e || "Seconds" === e || "Minutes" === e && 0 === this.getTimezoneOffset(f) % 36E5) return f["setUTC" + e](g);
                    var c = this.getTimezoneOffset(f);
                    c = f.getTime() - c;
                    f.setTime(c);
                    f["setUTC" + e](g);
                    e = this.getTimezoneOffset(f);
                    c = f.getTime() + e;
                    return f.setTime(c)
                }
                return this.useUTC || z && "FullYear" === e ? f["setUTC" + e](g) : f["set" + e](g)
            };
            f.prototype.update = function(e) {
                var f = h(e && e.useUTC, !0);
                this.options = e = x(!0, this.options || {}, e);
                this.Date = e.Date || E.Date || Date;
                this.timezoneOffset = (this.useUTC = f) && e.timezoneOffset;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.variableTimezone = f && !(!e.getTimezoneOffset && !e.timezone)
            };
            f.prototype.makeTime = function(e, f, c, n, p, l) {
                if (this.useUTC) {
                    var w = this.Date.UTC.apply(0, arguments);
                    var b = this.getTimezoneOffset(w);
                    w += b;
                    var v = this.getTimezoneOffset(w);
                    b !== v ? w += v - b : b - 36E5 !== this.getTimezoneOffset(w -
                        36E5) || g || (w -= 36E5)
                } else w = (new this.Date(e, f, h(c, 1), h(n, 0), h(p, 0), h(l, 0))).getTime();
                return w
            };
            f.prototype.timezoneOffsetFunction = function() {
                var e = this,
                    f = this.options,
                    g = f.getTimezoneOffset,
                    c = f.moment || E.moment;
                if (!this.useUTC) return function(e) {
                    return 6E4 * (new Date(e.toString())).getTimezoneOffset()
                };
                if (f.timezone) {
                    if (c) return function(e) {
                        return 6E4 * -c.tz(e, f.timezone).utcOffset()
                    };
                    y(25)
                }
                return this.useUTC && g ? function(e) {
                    return 6E4 * g(e.valueOf())
                } : function() {
                    return 6E4 * (e.timezoneOffset || 0)
                }
            };
            f.prototype.dateFormat =
                function(e, f, g) {
                    if (!H(f) || isNaN(f)) return a.defaultOptions.lang && a.defaultOptions.lang.invalidDate || "";
                    e = h(e, "%Y-%m-%d %H:%M:%S");
                    var c = this,
                        p = new this.Date(f),
                        l = this.get("Hours", p),
                        w = this.get("Day", p),
                        b = this.get("Date", p),
                        v = this.get("Month", p),
                        d = this.get("FullYear", p),
                        D = a.defaultOptions.lang,
                        C = D && D.weekdays,
                        k = D && D.shortWeekdays;
                    p = F({
                        a: k ? k[w] : C[w].substr(0, 3),
                        A: C[w],
                        d: m(b),
                        e: m(b, 2, " "),
                        w: w,
                        b: D.shortMonths[v],
                        B: D.months[v],
                        m: m(v + 1),
                        o: v + 1,
                        y: d.toString().substr(2, 2),
                        Y: d,
                        H: m(l),
                        k: l,
                        I: m(l % 12 || 12),
                        l: l %
                            12 || 12,
                        M: m(this.get("Minutes", p)),
                        p: 12 > l ? "AM" : "PM",
                        P: 12 > l ? "am" : "pm",
                        S: m(p.getSeconds()),
                        L: m(Math.floor(f % 1E3), 3)
                    }, a.dateFormats);
                    q(p, function(b, d) {
                        for (; - 1 !== e.indexOf("%" + d);) e = e.replace("%" + d, "function" === typeof b ? b.call(c, f) : b)
                    });
                    return g ? e.substr(0, 1).toUpperCase() + e.substr(1) : e
                };
            f.prototype.resolveDTLFormat = function(e) {
                return I(e, !0) ? e : (e = c(e), {
                    main: e[0],
                    from: e[1],
                    to: e[2]
                })
            };
            f.prototype.getTimeTicks = function(e, f, g, c) {
                var p = this,
                    l = [],
                    w = {},
                    b = new p.Date(f),
                    v = e.unitRange,
                    d = e.count || 1,
                    D;
                c = h(c, 1);
                if (H(f)) {
                    p.set("Milliseconds",
                        b, v >= n.second ? 0 : d * Math.floor(p.get("Milliseconds", b) / d));
                    v >= n.second && p.set("Seconds", b, v >= n.minute ? 0 : d * Math.floor(p.get("Seconds", b) / d));
                    v >= n.minute && p.set("Minutes", b, v >= n.hour ? 0 : d * Math.floor(p.get("Minutes", b) / d));
                    v >= n.hour && p.set("Hours", b, v >= n.day ? 0 : d * Math.floor(p.get("Hours", b) / d));
                    v >= n.day && p.set("Date", b, v >= n.month ? 1 : Math.max(1, d * Math.floor(p.get("Date", b) / d)));
                    if (v >= n.month) {
                        p.set("Month", b, v >= n.year ? 0 : d * Math.floor(p.get("Month", b) / d));
                        var C = p.get("FullYear", b)
                    }
                    v >= n.year && p.set("FullYear",
                        b, C - C % d);
                    v === n.week && (C = p.get("Day", b), p.set("Date", b, p.get("Date", b) - C + c + (C < c ? -7 : 0)));
                    C = p.get("FullYear", b);
                    c = p.get("Month", b);
                    var k = p.get("Date", b),
                        K = p.get("Hours", b);
                    f = b.getTime();
                    !p.variableTimezone && p.useUTC || !H(g) || (D = g - f > 4 * n.month || p.getTimezoneOffset(f) !== p.getTimezoneOffset(g));
                    f = b.getTime();
                    for (b = 1; f < g;) l.push(f), f = v === n.year ? p.makeTime(C + b * d, 0) : v === n.month ? p.makeTime(C, c + b * d) : !D || v !== n.day && v !== n.week ? D && v === n.hour && 1 < d ? p.makeTime(C, c, k, K + b * d) : f + v * d : p.makeTime(C, c, k + b * d * (v === n.day ? 1 : 7)),
                        b++;
                    l.push(f);
                    v <= n.hour && 1E4 > l.length && l.forEach(function(b) {
                        0 === b % 18E5 && "000000000" === p.dateFormat("%H%M%S%L", b) && (w[b] = "day")
                    })
                }
                l.info = F(e, {
                    higherRanks: w,
                    totalRange: v * d
                });
                return l
            };
            f.prototype.getDateFormat = function(e, f, c, g) {
                var p = this.dateFormat("%m-%d %H:%M:%S.%L", f),
                    l = {
                        millisecond: 15,
                        second: 12,
                        minute: 9,
                        hour: 6,
                        day: 3
                    },
                    w = "millisecond";
                for (b in n) {
                    if (e === n.week && +this.dateFormat("%w", f) === c && "00:00:00.000" === p.substr(6)) {
                        var b = "week";
                        break
                    }
                    if (n[b] > e) {
                        b = w;
                        break
                    }
                    if (l[b] && p.substr(l[b]) !== "01-01 00:00:00.000".substr(l[b])) break;
                    "week" !== b && (w = b)
                }
                if (b) var v = this.resolveDTLFormat(g[b]).main;
                return v
            };
            return f
        }();
        "";
        return t
    });
    N(a, "Core/DefaultOptions.js", [a["Core/Chart/ChartDefaults.js"], a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Color/Palettes.js"], a["Core/Time.js"], a["Core/Utilities.js"]], function(a, t, B, H, y, F) {
        t = t.parse;
        var E = F.merge,
            x = {
                colors: H.colors,
                symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
                lang: {
                    loading: "Loading...",
                    months: "January February March April May June July August September October November December".split(" "),
                    shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                    weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                    decimalPoint: ".",
                    numericSymbols: "kMGTPE".split(""),
                    resetZoom: "Reset zoom",
                    resetZoomTitle: "Reset zoom level 1:1",
                    thousandsSep: " "
                },
                global: {},
                time: {
                    Date: void 0,
                    getTimezoneOffset: void 0,
                    timezone: void 0,
                    timezoneOffset: 0,
                    useUTC: !0
                },
                chart: a,
                title: {
                    text: "Chart title",
                    align: "center",
                    margin: 15,
                    widthAdjust: -44
                },
                subtitle: {
                    text: "",
                    align: "center",
                    widthAdjust: -44
                },
                caption: {
                    margin: 15,
                    text: "",
                    align: "left",
                    verticalAlign: "bottom"
                },
                plotOptions: {},
                labels: {
                    style: {
                        position: "absolute",
                        color: "#333333"
                    }
                },
                legend: {
                    enabled: !0,
                    align: "center",
                    alignColumns: !0,
                    className: "highcharts-no-tooltip",
                    layout: "horizontal",
                    labelFormatter: function() {
                        return this.name
                    },
                    borderColor: "#999999",
                    borderRadius: 0,
                    navigation: {
                        activeColor: "#003399",
                        inactiveColor: "#cccccc"
                    },
                    itemStyle: {
                        color: "#333333",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: "bold",
                        textOverflow: "ellipsis"
                    },
                    itemHoverStyle: {
                        color: "#000000"
                    },
                    itemHiddenStyle: {
                        color: "#cccccc"
                    },
                    shadow: !1,
                    itemCheckboxStyle: {
                        position: "absolute",
                        width: "13px",
                        height: "13px"
                    },
                    squareSymbol: !0,
                    symbolPadding: 5,
                    verticalAlign: "bottom",
                    x: 0,
                    y: 0,
                    title: {
                        style: {
                            fontWeight: "bold"
                        }
                    }
                },
                loading: {
                    labelStyle: {
                        fontWeight: "bold",
                        position: "relative",
                        top: "45%"
                    },
                    style: {
                        position: "absolute",
                        backgroundColor: "#ffffff",
                        opacity: .5,
                        textAlign: "center"
                    }
                },
                tooltip: {
                    enabled: !0,
                    animation: B.svg,
                    borderRadius: 3,
                    dateTimeLabelFormats: {
                        millisecond: "%A, %b %e, %H:%M:%S.%L",
                        second: "%A, %b %e, %H:%M:%S",
                        minute: "%A, %b %e, %H:%M",
                        hour: "%A, %b %e, %H:%M",
                        day: "%A, %b %e, %Y",
                        week: "Week from %A, %b %e, %Y",
                        month: "%B %Y",
                        year: "%Y"
                    },
                    footerFormat: "",
                    headerShape: "callout",
                    hideDelay: 500,
                    padding: 8,
                    shape: "callout",
                    shared: !1,
                    snap: B.isTouchDevice ? 25 : 10,
                    headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                    pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
                    backgroundColor: t("#f7f7f7").setOpacity(.85).get(),
                    borderWidth: 1,
                    shadow: !0,
                    stickOnContact: !1,
                    style: {
                        color: "#333333",
                        cursor: "default",
                        fontSize: "12px",
                        whiteSpace: "nowrap"
                    },
                    useHTML: !1
                },
                credits: {
                    enabled: !0,
                    href: "",
                    position: {
                        align: "right",
                        x: -10,
                        verticalAlign: "bottom",
                        y: -5
                    },
                    style: {
                        cursor: "pointer",
                        color: "#999999",
                        fontSize: "9px"
                    },
                    text: ""
                }
            };
        x.chart.styledMode = !1;
        "";
        var q = new y(E(x.global, x.time));
        a = {
            defaultOptions: x,
            defaultTime: q,
            getOptions: function() {
                return x
            },
            setOptions: function(m) {
                E(!0, x, m);
                if (m.time || m.global) B.time ? B.time.update(E(x.global, x.time,
                    m.global, m.time)) : B.time = q;
                return x
            }
        };
        "";
        return a
    });
    N(a, "Core/Animation/Fx.js", [a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Utilities.js"]], function(a, t, B) {
        var E = a.parse,
            y = t.win,
            F = B.isNumber,
            I = B.objectEach;
        return function() {
            function a(q, m, h) {
                this.pos = NaN;
                this.options = m;
                this.elem = q;
                this.prop = h
            }
            a.prototype.dSetter = function() {
                var q = this.paths,
                    m = q && q[0];
                q = q && q[1];
                var h = this.now || 0,
                    c = [];
                if (1 !== h && m && q)
                    if (m.length === q.length && 1 > h)
                        for (var n = 0; n < q.length; n++) {
                            for (var z = m[n], g = q[n], f = [], e = 0; e < g.length; e++) {
                                var G =
                                    z[e],
                                    J = g[e];
                                F(G) && F(J) && ("A" !== g[0] || 4 !== e && 5 !== e) ? f[e] = G + h * (J - G) : f[e] = J
                            }
                            c.push(f)
                        } else c = q;
                    else c = this.toD || [];
                this.elem.attr("d", c, void 0, !0)
            };
            a.prototype.update = function() {
                var q = this.elem,
                    m = this.prop,
                    h = this.now,
                    c = this.options.step;
                if (this[m + "Setter"]) this[m + "Setter"]();
                else q.attr ? q.element && q.attr(m, h, null, !0) : q.style[m] = h + this.unit;
                c && c.call(q, h, this)
            };
            a.prototype.run = function(q, m, h) {
                var c = this,
                    n = c.options,
                    z = function(e) {
                        return z.stopped ? !1 : c.step(e)
                    },
                    g = y.requestAnimationFrame || function(e) {
                        setTimeout(e,
                            13)
                    },
                    f = function() {
                        for (var e = 0; e < a.timers.length; e++) a.timers[e]() || a.timers.splice(e--, 1);
                        a.timers.length && g(f)
                    };
                q !== m || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = q, this.end = m, this.unit = h, this.now = this.start, this.pos = 0, z.elem = this.elem, z.prop = this.prop, z() && 1 === a.timers.push(z) && g(f)) : (delete n.curAnim[this.prop], n.complete && 0 === Object.keys(n.curAnim).length && n.complete.call(this.elem))
            };
            a.prototype.step = function(q) {
                var m = +new Date,
                    h = this.options,
                    c = this.elem,
                    n = h.complete,
                    z = h.duration,
                    g = h.curAnim;
                if (c.attr && !c.element) q = !1;
                else if (q || m >= z + this.startTime) {
                    this.now = this.end;
                    this.pos = 1;
                    this.update();
                    var f = g[this.prop] = !0;
                    I(g, function(e) {
                        !0 !== e && (f = !1)
                    });
                    f && n && n.call(c);
                    q = !1
                } else this.pos = h.easing((m - this.startTime) / z), this.now = this.start + (this.end - this.start) * this.pos, this.update(), q = !0;
                return q
            };
            a.prototype.initPath = function(q, m, h) {
                function c(e, l) {
                    for (; e.length < M;) {
                        var p = e[0],
                            b = l[M - e.length];
                        b && "M" === p[0] && (e[0] = "C" === b[0] ? ["C", p[1], p[2], p[1], p[2], p[1], p[2]] : ["L", p[1],
                            p[2]
                        ]);
                        e.unshift(p);
                        f && (p = e.pop(), e.push(e[e.length - 1], p))
                    }
                }

                function n(p, l) {
                    for (; p.length < M;)
                        if (l = p[Math.floor(p.length / e) - 1].slice(), "C" === l[0] && (l[1] = l[5], l[2] = l[6]), f) {
                            var w = p[Math.floor(p.length / e)].slice();
                            p.splice(p.length / 2, 0, l, w)
                        } else p.push(l)
                }
                var z = q.startX,
                    g = q.endX;
                h = h.slice();
                var f = q.isArea,
                    e = f ? 2 : 1;
                m = m && m.slice();
                if (!m) return [h, h];
                if (z && g && g.length) {
                    for (q = 0; q < z.length; q++)
                        if (z[q] === g[0]) {
                            var G = q;
                            break
                        } else if (z[0] === g[g.length - z.length + q]) {
                        G = q;
                        var J = !0;
                        break
                    } else if (z[z.length - 1] === g[g.length -
                            z.length + q]) {
                        G = z.length - q;
                        break
                    }
                    "undefined" === typeof G && (m = [])
                }
                if (m.length && F(G)) {
                    var M = h.length + G * e;
                    J ? (c(m, h), n(h, m)) : (c(h, m), n(m, h))
                }
                return [m, h]
            };
            a.prototype.fillSetter = function() {
                a.prototype.strokeSetter.apply(this, arguments)
            };
            a.prototype.strokeSetter = function() {
                this.elem.attr(this.prop, E(this.start).tweenTo(E(this.end), this.pos), void 0, !0)
            };
            a.timers = [];
            return a
        }()
    });
    N(a, "Core/Animation/AnimationUtilities.js", [a["Core/Animation/Fx.js"], a["Core/Utilities.js"]], function(a, t) {
        function E(c) {
            return q(c) ?
                m({
                    duration: 500,
                    defer: 0
                }, c) : {
                    duration: c ? 500 : 0,
                    defer: 0
                }
        }

        function H(c, h) {
            for (var g = a.timers.length; g--;) a.timers[g].elem !== c || h && h !== a.timers[g].prop || (a.timers[g].stopped = !0)
        }
        var y = t.defined,
            F = t.getStyle,
            I = t.isArray,
            x = t.isNumber,
            q = t.isObject,
            m = t.merge,
            h = t.objectEach,
            c = t.pick;
        return {
            animate: function(c, z, g) {
                var f, e = "",
                    n, J;
                if (!q(g)) {
                    var M = arguments;
                    g = {
                        duration: M[2],
                        easing: M[3],
                        complete: M[4]
                    }
                }
                x(g.duration) || (g.duration = 400);
                g.easing = "function" === typeof g.easing ? g.easing : Math[g.easing] || Math.easeInOutSine;
                g.curAnim = m(z);
                h(z, function(p, l) {
                    H(c, l);
                    J = new a(c, g, l);
                    n = void 0;
                    "d" === l && I(z.d) ? (J.paths = J.initPath(c, c.pathArray, z.d), J.toD = z.d, f = 0, n = 1) : c.attr ? f = c.attr(l) : (f = parseFloat(F(c, l)) || 0, "opacity" !== l && (e = "px"));
                    n || (n = p);
                    "string" === typeof n && n.match("px") && (n = n.replace(/px/g, ""));
                    J.run(f, n, e)
                })
            },
            animObject: E,
            getDeferredAnimation: function(c, h, g) {
                var f = E(h),
                    e = 0,
                    n = 0;
                (g ? [g] : c.series).forEach(function(c) {
                    c = E(c.options.animation);
                    e = h && y(h.defer) ? f.defer : Math.max(e, c.duration + c.defer);
                    n = Math.min(f.duration, c.duration)
                });
                c.renderer.forExport && (e = 0);
                return {
                    defer: Math.max(0, e - n),
                    duration: Math.min(e, n)
                }
            },
            setAnimation: function(n, h) {
                h.renderer.globalAnimation = c(n, h.options.chart.animation, !0)
            },
            stop: H
        }
    });
    N(a, "Core/Renderer/HTML/AST.js", [a["Core/Globals.js"], a["Core/Utilities.js"]], function(a, t) {
        var E = a.SVG_NS,
            H = t.attr,
            y = t.createElement,
            F = t.error,
            I = t.isFunction,
            x = t.isString,
            q = t.objectEach,
            m = t.splat,
            h = (t = a.win.trustedTypes) && I(t.createPolicy) && t.createPolicy("highcharts", {
                createHTML: function(c) {
                    return c
                }
            }),
            c = h ? h.createHTML("") :
            "";
        try {
            var n = !!(new DOMParser).parseFromString(c, "text/html")
        } catch (z) {
            n = !1
        }
        I = function() {
            function z(c) {
                this.nodes = "string" === typeof c ? this.parseMarkup(c) : c
            }
            z.filterUserAttributes = function(c) {
                q(c, function(f, e) {
                    var g = !0; - 1 === z.allowedAttributes.indexOf(e) && (g = !1); - 1 !== ["background", "dynsrc", "href", "lowsrc", "src"].indexOf(e) && (g = x(f) && z.allowedReferences.some(function(e) {
                        return 0 === f.indexOf(e)
                    }));
                    g || (F("Highcharts warning: Invalid attribute '" + e + "' in config"), delete c[e])
                });
                return c
            };
            z.setElementHTML =
                function(c, f) {
                    c.innerHTML = z.emptyHTML;
                    f && (new z(f)).addToDOM(c)
                };
            z.prototype.addToDOM = function(c) {
                function f(e, c) {
                    var g;
                    m(e).forEach(function(e) {
                        var p = e.tagName,
                            l = e.textContent ? a.doc.createTextNode(e.textContent) : void 0;
                        if (p)
                            if ("#text" === p) var w = l;
                            else if (-1 !== z.allowedTags.indexOf(p)) {
                            p = a.doc.createElementNS("svg" === p ? E : c.namespaceURI || E, p);
                            var b = e.attributes || {};
                            q(e, function(e, d) {
                                "tagName" !== d && "attributes" !== d && "children" !== d && "textContent" !== d && (b[d] = e)
                            });
                            H(p, z.filterUserAttributes(b));
                            l && p.appendChild(l);
                            f(e.children || [], p);
                            w = p
                        } else F("Highcharts warning: Invalid tagName " + p + " in config");
                        w && c.appendChild(w);
                        g = w
                    });
                    return g
                }
                return f(this.nodes, c)
            };
            z.prototype.parseMarkup = function(c) {
                var f = [];
                c = c.trim();
                if (n) c = (new DOMParser).parseFromString(h ? h.createHTML(c) : c, "text/html");
                else {
                    var e = y("div");
                    e.innerHTML = c;
                    c = {
                        body: e
                    }
                }
                var g = function(e, c) {
                    var p = e.nodeName.toLowerCase(),
                        l = {
                            tagName: p
                        };
                    "#text" === p && (l.textContent = e.textContent || "");
                    if (p = e.attributes) {
                        var f = {};
                        [].forEach.call(p, function(b) {
                            f[b.name] = b.value
                        });
                        l.attributes = f
                    }
                    if (e.childNodes.length) {
                        var b = [];
                        [].forEach.call(e.childNodes, function(e) {
                            g(e, b)
                        });
                        b.length && (l.children = b)
                    }
                    c.push(l)
                };
                [].forEach.call(c.body.childNodes, function(e) {
                    return g(e, f)
                });
                return f
            };
            z.allowedAttributes = "aria-controls aria-describedby aria-expanded aria-haspopup aria-hidden aria-label aria-labelledby aria-live aria-pressed aria-readonly aria-roledescription aria-selected class clip-path color colspan cx cy d dx dy disabled fill height href id in markerHeight markerWidth offset opacity orient padding paddingLeft paddingRight patternUnits r refX refY role scope slope src startOffset stdDeviation stroke stroke-linecap stroke-width style tableValues result rowspan summary target tabindex text-align textAnchor textLength title type valign width x x1 x2 y y1 y2 zIndex".split(" ");
            z.allowedReferences = "ttps:// http:/ / ../ ./ #".split(" ");
            z.allowedTags = "a abbr b br button caption circle clipPath code dd defs div dl dt em feComponentTransfer feFuncA feFuncB feFuncG feFuncR feGaussianBlur feOffset feMerge feMergeNode filter h1 h2 h3 h4 h5 h6 hr i img li linearGradient marker ol p path pattern pre rect small span stop strong style sub sup svg table text thead tbody tspan td th tr u ul #text".split(" ");
            z.emptyHTML = c;
            return z
        }();
        "";
        return I
    });
    N(a, "Core/FormatUtilities.js",
        [a["Core/DefaultOptions.js"], a["Core/Utilities.js"]],
        function(a, t) {
            function E(m, h, c, n) {
                m = +m || 0;
                h = +h;
                var z = H.lang,
                    g = (m.toString().split(".")[1] || "").split("e")[0].length,
                    f = m.toString().split("e"),
                    e = h;
                if (-1 === h) h = Math.min(g, 20);
                else if (!I(h)) h = 2;
                else if (h && f[1] && 0 > f[1]) {
                    var G = h + +f[1];
                    0 <= G ? (f[0] = (+f[0]).toExponential(G).split("e")[0], h = G) : (f[0] = f[0].split(".")[0] || 0, m = 20 > h ? (f[0] * Math.pow(10, f[1])).toFixed(h) : 0, f[1] = 0)
                }
                G = (Math.abs(f[1] ? f[0] : m) + Math.pow(10, -Math.max(h, g) - 1)).toFixed(h);
                g = String(q(G));
                var J = 3 < g.length ? g.length % 3 : 0;
                c = x(c, z.decimalPoint);
                n = x(n, z.thousandsSep);
                m = (0 > m ? "-" : "") + (J ? g.substr(0, J) + n : "");
                m = 0 > +f[1] && !e ? "0" : m + g.substr(J).replace(/(\d{3})(?=\d)/g, "$1" + n);
                h && (m += c + G.slice(-h));
                f[1] && 0 !== +m && (m += "e" + f[1]);
                return m
            }
            var H = a.defaultOptions,
                y = a.defaultTime,
                F = t.getNestedProperty,
                I = t.isNumber,
                x = t.pick,
                q = t.pInt;
            return {
                dateFormat: function(m, h, c) {
                    return y.dateFormat(m, h, c)
                },
                format: function(m, h, c) {
                    var n = "{",
                        z = !1,
                        g = /f$/,
                        f = /\.([0-9])/,
                        e = H.lang,
                        G = c && c.time || y;
                    c = c && c.numberFormatter || E;
                    for (var J = []; m;) {
                        var M = m.indexOf(n);
                        if (-1 === M) break;
                        var p = m.slice(0, M);
                        if (z) {
                            p = p.split(":");
                            n = F(p.shift() || "", h);
                            if (p.length && "number" === typeof n)
                                if (p = p.join(":"), g.test(p)) {
                                    var l = parseInt((p.match(f) || ["", "-1"])[1], 10);
                                    null !== n && (n = c(n, l, e.decimalPoint, -1 < p.indexOf(",") ? e.thousandsSep : ""))
                                } else n = G.dateFormat(p, n);
                            J.push(n)
                        } else J.push(p);
                        m = m.slice(M + 1);
                        n = (z = !z) ? "}" : "{"
                    }
                    J.push(m);
                    return J.join("")
                },
                numberFormat: E
            }
        });
    N(a, "Core/Renderer/RendererUtilities.js", [a["Core/Utilities.js"]], function(a) {
        var E = a.clamp,
            B = a.pick,
            H = a.stableSort,
            y;
        (function(a) {
            function t(a, q, m) {
                var h = a,
                    c = h.reducedLen || q,
                    n = function(e, c) {
                        return (c.rank || 0) - (e.rank || 0)
                    },
                    z = function(e, c) {
                        return e.target - c.target
                    },
                    g, f = !0,
                    e = [],
                    G = 0;
                for (g = a.length; g--;) G += a[g].size;
                if (G > c) {
                    H(a, n);
                    for (G = g = 0; G <= c;) G += a[g].size, g++;
                    e = a.splice(g - 1, a.length)
                }
                H(a, z);
                for (a = a.map(function(e) {
                        return {
                            size: e.size,
                            targets: [e.target],
                            align: B(e.align, .5)
                        }
                    }); f;) {
                    for (g = a.length; g--;) c = a[g], n = (Math.min.apply(0, c.targets) + Math.max.apply(0, c.targets)) / 2, c.pos = E(n - c.size * c.align,
                        0, q - c.size);
                    g = a.length;
                    for (f = !1; g--;) 0 < g && a[g - 1].pos + a[g - 1].size > a[g].pos && (a[g - 1].size += a[g].size, a[g - 1].targets = a[g - 1].targets.concat(a[g].targets), a[g - 1].align = .5, a[g - 1].pos + a[g - 1].size > q && (a[g - 1].pos = q - a[g - 1].size), a.splice(g, 1), f = !0)
                }
                h.push.apply(h, e);
                g = 0;
                a.some(function(e) {
                    var c = 0;
                    return (e.targets || []).some(function() {
                        h[g].pos = e.pos + c;
                        if ("undefined" !== typeof m && Math.abs(h[g].pos - h[g].target) > m) return h.slice(0, g + 1).forEach(function(e) {
                                return delete e.pos
                            }), h.reducedLen = (h.reducedLen || q) - .1 *
                            q, h.reducedLen > .1 * q && t(h, q, m), !0;
                        c += h[g].size;
                        g++;
                        return !1
                    })
                });
                H(h, z);
                return h
            }
            a.distribute = t
        })(y || (y = {}));
        return y
    });
    N(a, "Core/Renderer/SVG/SVGElement.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Renderer/HTML/AST.js"], a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Utilities.js"]], function(a, t, B, H, y) {
        var E = a.animate,
            I = a.animObject,
            x = a.stop,
            q = H.deg2rad,
            m = H.doc,
            h = H.noop,
            c = H.svg,
            n = H.SVG_NS,
            z = H.win,
            g = y.addEvent,
            f = y.attr,
            e = y.createElement,
            G = y.css,
            J = y.defined,
            M = y.erase,
            p = y.extend,
            l = y.fireEvent,
            w = y.isArray,
            b = y.isFunction,
            v = y.isNumber,
            d = y.isString,
            D = y.merge,
            C = y.objectEach,
            k = y.pick,
            K = y.pInt,
            O = y.syncTimeout,
            r = y.uniqueKey;
        a = function() {
            function A() {
                this.element = void 0;
                this.onEvents = {};
                this.opacity = 1;
                this.renderer = void 0;
                this.SVG_NS = n;
                this.symbolCustomAttribs = "x y width height r start end innerR anchorX anchorY rounded".split(" ")
            }
            A.prototype._defaultGetter = function(b) {
                b = k(this[b + "Value"], this[b], this.element ? this.element.getAttribute(b) : null, 0);
                /^[\-0-9\.]+$/.test(b) && (b = parseFloat(b));
                return b
            };
            A.prototype._defaultSetter = function(b, d, u) {
                u.setAttribute(d, b)
            };
            A.prototype.add = function(b) {
                var d = this.renderer,
                    u = this.element;
                b && (this.parentGroup = b);
                this.parentInverted = b && b.inverted;
                "undefined" !== typeof this.textStr && "text" === this.element.nodeName && d.buildText(this);
                this.added = !0;
                if (!b || b.handleZ || this.zIndex) var L = this.zIndexSetter();
                L || (b ? b.element : d.box).appendChild(u);
                if (this.onAdd) this.onAdd();
                return this
            };
            A.prototype.addClass = function(b, d) {
                var u = d ? "" : this.attr("class") || "";
                b = (b || "").split(/ /g).reduce(function(b,
                    d) {
                    -1 === u.indexOf(d) && b.push(d);
                    return b
                }, u ? [u] : []).join(" ");
                b !== u && this.attr("class", b);
                return this
            };
            A.prototype.afterSetters = function() {
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            };
            A.prototype.align = function(b, e, u) {
                var L = {},
                    r = this.renderer,
                    l = r.alignedObjects,
                    c, f, p;
                if (b) {
                    if (this.alignOptions = b, this.alignByTranslate = e, !u || d(u)) this.alignTo = c = u || "renderer", M(l, this), l.push(this), u = void 0
                } else b = this.alignOptions, e = this.alignByTranslate, c = this.alignTo;
                u = k(u, r[c], "scrollablePlotBox" ===
                    c ? r.plotBox : void 0, r);
                c = b.align;
                var v = b.verticalAlign;
                r = (u.x || 0) + (b.x || 0);
                l = (u.y || 0) + (b.y || 0);
                "right" === c ? f = 1 : "center" === c && (f = 2);
                f && (r += (u.width - (b.width || 0)) / f);
                L[e ? "translateX" : "x"] = Math.round(r);
                "bottom" === v ? p = 1 : "middle" === v && (p = 2);
                p && (l += (u.height - (b.height || 0)) / p);
                L[e ? "translateY" : "y"] = Math.round(l);
                this[this.placed ? "animate" : "attr"](L);
                this.placed = !0;
                this.alignAttr = L;
                return this
            };
            A.prototype.alignSetter = function(b) {
                var d = {
                    left: "start",
                    center: "middle",
                    right: "end"
                };
                d[b] && (this.alignValue = b, this.element.setAttribute("text-anchor",
                    d[b]))
            };
            A.prototype.animate = function(b, d, u) {
                var L = this,
                    e = I(k(d, this.renderer.globalAnimation, !0));
                d = e.defer;
                k(m.hidden, m.msHidden, m.webkitHidden, !1) && (e.duration = 0);
                0 !== e.duration ? (u && (e.complete = u), O(function() {
                    L.element && E(L, b, e)
                }, d)) : (this.attr(b, void 0, u), C(b, function(b, d) {
                    e.step && e.step.call(this, b, {
                        prop: d,
                        pos: 1,
                        elem: this
                    })
                }, this));
                return this
            };
            A.prototype.applyTextOutline = function(b) {
                var d = this.element; - 1 !== b.indexOf("contrast") && (b = b.replace(/contrast/g, this.renderer.getContrast(d.style.fill)));
                var u = b.split(" ");
                b = u[u.length - 1];
                if ((u = u[0]) && "none" !== u && H.svg) {
                    this.fakeTS = !0;
                    this.ySetter = this.xSetter;
                    u = u.replace(/(^[\d\.]+)(.*?)$/g, function(b, d, u) {
                        return 2 * Number(d) + u
                    });
                    this.removeTextOutline();
                    var L = m.createElementNS(n, "tspan");
                    f(L, {
                        "class": "highcharts-text-outline",
                        fill: b,
                        stroke: b,
                        "stroke-width": u,
                        "stroke-linejoin": "round"
                    });
                    [].forEach.call(d.childNodes, function(b) {
                        var d = b.cloneNode(!0);
                        d.removeAttribute && ["fill", "stroke", "stroke-width", "stroke"].forEach(function(b) {
                            return d.removeAttribute(b)
                        });
                        L.appendChild(d)
                    });
                    var k = m.createElementNS(n, "tspan");
                    k.textContent = "\u200b";
                    ["x", "y"].forEach(function(b) {
                        var u = d.getAttribute(b);
                        u && k.setAttribute(b, u)
                    });
                    L.appendChild(k);
                    d.insertBefore(L, d.firstChild)
                }
            };
            A.prototype.attr = function(b, d, u, L) {
                var k = this.element,
                    e = this.symbolCustomAttribs,
                    r, l = this,
                    c, f;
                if ("string" === typeof b && "undefined" !== typeof d) {
                    var p = b;
                    b = {};
                    b[p] = d
                }
                "string" === typeof b ? l = (this[b + "Getter"] || this._defaultGetter).call(this, b, k) : (C(b, function(d, u) {
                    c = !1;
                    L || x(this, u);
                    this.symbolName && -1 !==
                        e.indexOf(u) && (r || (this.symbolAttr(b), r = !0), c = !0);
                    !this.rotation || "x" !== u && "y" !== u || (this.doTransform = !0);
                    c || (f = this[u + "Setter"] || this._defaultSetter, f.call(this, d, u, k), !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(u) && this.updateShadows(u, d, f))
                }, this), this.afterSetters());
                u && u.call(this);
                return l
            };
            A.prototype.clip = function(b) {
                return this.attr("clip-path", b ? "url(" + this.renderer.url + "#" + b.id + ")" : "none")
            };
            A.prototype.crisp = function(b, d) {
                d = d || b.strokeWidth ||
                    0;
                var u = Math.round(d) % 2 / 2;
                b.x = Math.floor(b.x || this.x || 0) + u;
                b.y = Math.floor(b.y || this.y || 0) + u;
                b.width = Math.floor((b.width || this.width || 0) - 2 * u);
                b.height = Math.floor((b.height || this.height || 0) - 2 * u);
                J(b.strokeWidth) && (b.strokeWidth = d);
                return b
            };
            A.prototype.complexColor = function(b, d, u) {
                var L = this.renderer,
                    k, e, c, f, p, v, A, g, n, P, K = [],
                    h;
                l(this.renderer, "complexColor", {
                    args: arguments
                }, function() {
                    b.radialGradient ? e = "radialGradient" : b.linearGradient && (e = "linearGradient");
                    if (e) {
                        c = b[e];
                        p = L.gradients;
                        v = b.stops;
                        n = u.radialReference;
                        w(c) && (b[e] = c = {
                            x1: c[0],
                            y1: c[1],
                            x2: c[2],
                            y2: c[3],
                            gradientUnits: "userSpaceOnUse"
                        });
                        "radialGradient" === e && n && !J(c.gradientUnits) && (f = c, c = D(c, L.getRadialAttr(n, f), {
                            gradientUnits: "userSpaceOnUse"
                        }));
                        C(c, function(b, d) {
                            "id" !== d && K.push(d, b)
                        });
                        C(v, function(b) {
                            K.push(b)
                        });
                        K = K.join(",");
                        if (p[K]) P = p[K].attr("id");
                        else {
                            c.id = P = r();
                            var l = p[K] = L.createElement(e).attr(c).add(L.defs);
                            l.radAttr = f;
                            l.stops = [];
                            v.forEach(function(b) {
                                0 === b[1].indexOf("rgba") ? (k = B.parse(b[1]), A = k.get("rgb"), g = k.get("a")) : (A = b[1], g = 1);
                                b = L.createElement("stop").attr({
                                    offset: b[0],
                                    "stop-color": A,
                                    "stop-opacity": g
                                }).add(l);
                                l.stops.push(b)
                            })
                        }
                        h = "url(" + L.url + "#" + P + ")";
                        u.setAttribute(d, h);
                        u.gradient = K;
                        b.toString = function() {
                            return h
                        }
                    }
                })
            };
            A.prototype.css = function(b) {
                var d = this.styles,
                    u = {},
                    L = this.element,
                    k = ["textOutline", "textOverflow", "width"],
                    e = "",
                    r = !d;
                b && b.color && (b.fill = b.color);
                d && C(b, function(b, k) {
                    d && d[k] !== b && (u[k] = b, r = !0)
                });
                if (r) {
                    d && (b = p(d, u));
                    if (b)
                        if (null === b.width || "auto" === b.width) delete this.textWidth;
                        else if ("text" === L.nodeName.toLowerCase() && b.width) var l = this.textWidth =
                        K(b.width);
                    this.styles = b;
                    l && !c && this.renderer.forExport && delete b.width;
                    if (L.namespaceURI === this.SVG_NS) {
                        var v = function(b, d) {
                            return "-" + d.toLowerCase()
                        };
                        C(b, function(b, d) {
                            -1 === k.indexOf(d) && (e += d.replace(/([A-Z])/g, v) + ":" + b + ";")
                        });
                        e && f(L, "style", e)
                    } else G(L, b);
                    this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), b && b.textOutline && this.applyTextOutline(b.textOutline))
                }
                return this
            };
            A.prototype.dashstyleSetter = function(b) {
                var d = this["stroke-width"];
                "inherit" === d && (d = 1);
                if (b = b && b.toLowerCase()) {
                    var u =
                        b.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (b = u.length; b--;) u[b] = "" + K(u[b]) * k(d, NaN);
                    b = u.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", b)
                }
            };
            A.prototype.destroy = function() {
                var b = this,
                    d = b.element || {},
                    u = b.renderer,
                    k = d.ownerSVGElement,
                    e = u.isSVG && "SPAN" === d.nodeName && b.parentGroup ||
                    void 0;
                d.onclick = d.onmouseout = d.onmouseover = d.onmousemove = d.point = null;
                x(b);
                if (b.clipPath && k) {
                    var r = b.clipPath;
                    [].forEach.call(k.querySelectorAll("[clip-path],[CLIP-PATH]"), function(b) {
                        -1 < b.getAttribute("clip-path").indexOf(r.element.id) && b.removeAttribute("clip-path")
                    });
                    b.clipPath = r.destroy()
                }
                if (b.stops) {
                    for (k = 0; k < b.stops.length; k++) b.stops[k].destroy();
                    b.stops.length = 0;
                    b.stops = void 0
                }
                b.safeRemoveChild(d);
                for (u.styledMode || b.destroyShadows(); e && e.div && 0 === e.div.childNodes.length;) d = e.parentGroup,
                    b.safeRemoveChild(e.div), delete e.div, e = d;
                b.alignTo && M(u.alignedObjects, b);
                C(b, function(d, u) {
                    b[u] && b[u].parentGroup === b && b[u].destroy && b[u].destroy();
                    delete b[u]
                })
            };
            A.prototype.destroyShadows = function() {
                (this.shadows || []).forEach(function(b) {
                    this.safeRemoveChild(b)
                }, this);
                this.shadows = void 0
            };
            A.prototype.destroyTextPath = function(b, d) {
                var u = b.getElementsByTagName("text")[0];
                if (u) {
                    if (u.removeAttribute("dx"), u.removeAttribute("dy"), d.element.setAttribute("id", ""), this.textPathWrapper && u.getElementsByTagName("textPath").length) {
                        for (b =
                            this.textPathWrapper.element.childNodes; b.length;) u.appendChild(b[0]);
                        u.removeChild(this.textPathWrapper.element)
                    }
                } else if (b.getAttribute("dx") || b.getAttribute("dy")) b.removeAttribute("dx"), b.removeAttribute("dy");
                this.textPathWrapper && (this.textPathWrapper = this.textPathWrapper.destroy())
            };
            A.prototype.dSetter = function(b, d, u) {
                w(b) && ("string" === typeof b[0] && (b = this.renderer.pathToSegments(b)), this.pathArray = b, b = b.reduce(function(b, d, u) {
                    return d && d.join ? (u ? b + " " : "") + d.join(" ") : (d || "").toString()
                }, ""));
                /(NaN| {2}|^$)/.test(b) && (b = "M 0 0");
                this[d] !== b && (u.setAttribute(d, b), this[d] = b)
            };
            A.prototype.fadeOut = function(b) {
                var d = this;
                d.animate({
                    opacity: 0
                }, {
                    duration: k(b, 150),
                    complete: function() {
                        d.attr({
                            y: -9999
                        }).hide()
                    }
                })
            };
            A.prototype.fillSetter = function(b, d, u) {
                "string" === typeof b ? u.setAttribute(d, b) : b && this.complexColor(b, d, u)
            };
            A.prototype.getBBox = function(d, e) {
                var u = this.renderer,
                    L = this.element,
                    r = this.styles,
                    l = this.textStr,
                    c = u.cache,
                    f = u.cacheKeys,
                    v = L.namespaceURI === this.SVG_NS;
                e = k(e, this.rotation, 0);
                var D =
                    u.styledMode ? L && A.prototype.getStyle.call(L, "font-size") : r && r.fontSize,
                    w;
                if (J(l)) {
                    var C = l.toString(); - 1 === C.indexOf("<") && (C = C.replace(/[0-9]/g, "0"));
                    C += ["", e, D, this.textWidth, r && r.textOverflow, r && r.fontWeight].join()
                }
                C && !d && (w = c[C]);
                if (!w) {
                    if (v || u.forExport) {
                        try {
                            var g = this.fakeTS && function(b) {
                                var d = L.querySelector(".highcharts-text-outline");
                                d && G(d, {
                                    display: b
                                })
                            };
                            b(g) && g("none");
                            w = L.getBBox ? p({}, L.getBBox()) : {
                                width: L.offsetWidth,
                                height: L.offsetHeight
                            };
                            b(g) && g("")
                        } catch (W) {
                            ""
                        }
                        if (!w || 0 > w.width) w = {
                            width: 0,
                            height: 0
                        }
                    } else w = this.htmlGetBBox();
                    u.isSVG && (d = w.width, u = w.height, v && (w.height = u = {
                        "11px,17": 14,
                        "13px,20": 16
                    } [(D || "") + "," + Math.round(u)] || u), e && (v = e * q, w.width = Math.abs(u * Math.sin(v)) + Math.abs(d * Math.cos(v)), w.height = Math.abs(u * Math.cos(v)) + Math.abs(d * Math.sin(v))));
                    if (C && ("" === l || 0 < w.height)) {
                        for (; 250 < f.length;) delete c[f.shift()];
                        c[C] || f.push(C);
                        c[C] = w
                    }
                }
                return w
            };
            A.prototype.getStyle = function(b) {
                return z.getComputedStyle(this.element || this, "").getPropertyValue(b)
            };
            A.prototype.hasClass = function(b) {
                return -1 !==
                    ("" + this.attr("class")).split(" ").indexOf(b)
            };
            A.prototype.hide = function(b) {
                b ? this.attr({
                    y: -9999
                }) : this.attr({
                    visibility: "hidden"
                });
                return this
            };
            A.prototype.htmlGetBBox = function() {
                return {
                    height: 0,
                    width: 0,
                    x: 0,
                    y: 0
                }
            };
            A.prototype.init = function(b, d) {
                this.element = "span" === d ? e(d) : m.createElementNS(this.SVG_NS, d);
                this.renderer = b;
                l(this, "afterInit")
            };
            A.prototype.invert = function(b) {
                this.inverted = b;
                this.updateTransform();
                return this
            };
            A.prototype.on = function(b, d) {
                var u = this.onEvents;
                if (u[b]) u[b]();
                u[b] = g(this.element,
                    b, d);
                return this
            };
            A.prototype.opacitySetter = function(b, d, u) {
                this.opacity = b = Number(Number(b).toFixed(3));
                u.setAttribute(d, b)
            };
            A.prototype.removeClass = function(b) {
                return this.attr("class", ("" + this.attr("class")).replace(d(b) ? new RegExp("(^| )" + b + "( |$)") : b, " ").replace(/ +/g, " ").trim())
            };
            A.prototype.removeTextOutline = function() {
                var b = this.element.querySelector("tspan.highcharts-text-outline");
                b && this.safeRemoveChild(b)
            };
            A.prototype.safeRemoveChild = function(b) {
                var d = b.parentNode;
                d && d.removeChild(b)
            };
            A.prototype.setRadialReference = function(b) {
                var d = this.element.gradient && this.renderer.gradients[this.element.gradient];
                this.element.radialReference = b;
                d && d.radAttr && d.animate(this.renderer.getRadialAttr(b, d.radAttr));
                return this
            };
            A.prototype.setTextPath = function(b, d) {
                var u = this.element,
                    k = this.text ? this.text.element : u,
                    e = {
                        textAnchor: "text-anchor"
                    },
                    l = !1,
                    c = this.textPathWrapper,
                    f = !c;
                d = D(!0, {
                    enabled: !0,
                    attributes: {
                        dy: -5,
                        startOffset: "50%",
                        textAnchor: "middle"
                    }
                }, d);
                var p = t.filterUserAttributes(d.attributes);
                if (b && d && d.enabled) {
                    c && null === c.element.parentNode ? (f = !0, c = c.destroy()) : c && this.removeTextOutline.call(c.parentGroup);
                    this.options && this.options.padding && (p.dx = -this.options.padding);
                    c || (this.textPathWrapper = c = this.renderer.createElement("textPath"), l = !0);
                    var w = c.element;
                    (d = b.element.getAttribute("id")) || b.element.setAttribute("id", d = r());
                    if (f)
                        for (k.setAttribute("y", 0), v(p.dx) && k.setAttribute("x", -p.dx), b = [].slice.call(k.childNodes), f = 0; f < b.length; f++) {
                            var A = b[f];
                            A.nodeType !== z.Node.TEXT_NODE && "tspan" !==
                                A.nodeName || w.appendChild(A)
                        }
                    l && c && c.add({
                        element: k
                    });
                    w.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.renderer.url + "#" + d);
                    J(p.dy) && (w.parentNode.setAttribute("dy", p.dy), delete p.dy);
                    J(p.dx) && (w.parentNode.setAttribute("dx", p.dx), delete p.dx);
                    C(p, function(b, d) {
                        w.setAttribute(e[d] || d, b)
                    });
                    u.removeAttribute("transform");
                    this.removeTextOutline.call(c);
                    this.text && !this.renderer.styledMode && this.attr({
                        fill: "none",
                        "stroke-width": 0
                    });
                    this.applyTextOutline = this.updateTransform = h
                } else c && (delete this.updateTransform,
                    delete this.applyTextOutline, this.destroyTextPath(u, b), this.updateTransform(), this.options && this.options.rotation && this.applyTextOutline(this.options.style.textOutline));
                return this
            };
            A.prototype.shadow = function(b, d, u) {
                var k = [],
                    e = this.element,
                    r = this.oldShadowOptions,
                    c = {
                        color: "#000000",
                        offsetX: this.parentInverted ? -1 : 1,
                        offsetY: this.parentInverted ? -1 : 1,
                        opacity: .15,
                        width: 3
                    },
                    l = !1,
                    v;
                !0 === b ? v = c : "object" === typeof b && (v = p(c, b));
                v && (v && r && C(v, function(b, d) {
                        b !== r[d] && (l = !0)
                    }), l && this.destroyShadows(), this.oldShadowOptions =
                    v);
                if (!v) this.destroyShadows();
                else if (!this.shadows) {
                    var w = v.opacity / v.width;
                    var D = this.parentInverted ? "translate(" + v.offsetY + ", " + v.offsetX + ")" : "translate(" + v.offsetX + ", " + v.offsetY + ")";
                    for (c = 1; c <= v.width; c++) {
                        var A = e.cloneNode(!1);
                        var g = 2 * v.width + 1 - 2 * c;
                        f(A, {
                            stroke: b.color || "#000000",
                            "stroke-opacity": w * c,
                            "stroke-width": g,
                            transform: D,
                            fill: "none"
                        });
                        A.setAttribute("class", (A.getAttribute("class") || "") + " highcharts-shadow");
                        u && (f(A, "height", Math.max(f(A, "height") - g, 0)), A.cutHeight = g);
                        d ? d.element.appendChild(A) :
                            e.parentNode && e.parentNode.insertBefore(A, e);
                        k.push(A)
                    }
                    this.shadows = k
                }
                return this
            };
            A.prototype.show = function(b) {
                return this.attr({
                    visibility: b ? "inherit" : "visible"
                })
            };
            A.prototype.strokeSetter = function(b, d, u) {
                this[d] = b;
                this.stroke && this["stroke-width"] ? (A.prototype.fillSetter.call(this, this.stroke, "stroke", u), u.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === d && 0 === b && this.hasStroke ? (u.removeAttribute("stroke"), this.hasStroke = !1) : this.renderer.styledMode && this["stroke-width"] &&
                    (u.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0)
            };
            A.prototype.strokeWidth = function() {
                if (!this.renderer.styledMode) return this["stroke-width"] || 0;
                var b = this.getStyle("stroke-width"),
                    d = 0;
                if (b.indexOf("px") === b.length - 2) d = K(b);
                else if ("" !== b) {
                    var u = m.createElementNS(n, "rect");
                    f(u, {
                        width: b,
                        "stroke-width": 0
                    });
                    this.element.parentNode.appendChild(u);
                    d = u.getBBox().width;
                    u.parentNode.removeChild(u)
                }
                return d
            };
            A.prototype.symbolAttr = function(b) {
                var d = this;
                "x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function(u) {
                    d[u] =
                        k(b[u], d[u])
                });
                d.attr({
                    d: d.renderer.symbols[d.symbolName](d.x, d.y, d.width, d.height, d)
                })
            };
            A.prototype.textSetter = function(b) {
                b !== this.textStr && (delete this.textPxLength, this.textStr = b, this.added && this.renderer.buildText(this))
            };
            A.prototype.titleSetter = function(b) {
                var d = this.element,
                    u = d.getElementsByTagName("title")[0] || m.createElementNS(this.SVG_NS, "title");
                d.insertBefore ? d.insertBefore(u, d.firstChild) : d.appendChild(u);
                u.textContent = String(k(b, "")).replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g,
                    ">")
            };
            A.prototype.toFront = function() {
                var b = this.element;
                b.parentNode.appendChild(b);
                return this
            };
            A.prototype.translate = function(b, d) {
                return this.attr({
                    translateX: b,
                    translateY: d
                })
            };
            A.prototype.updateShadows = function(b, d, u) {
                var k = this.shadows;
                if (k)
                    for (var e = k.length; e--;) u.call(k[e], "height" === b ? Math.max(d - (k[e].cutHeight || 0), 0) : "d" === b ? this.d : d, b, k[e])
            };
            A.prototype.updateTransform = function() {
                var b = this.scaleX,
                    d = this.scaleY,
                    u = this.inverted,
                    e = this.rotation,
                    r = this.matrix,
                    c = this.element,
                    l = this.translateX ||
                    0,
                    f = this.translateY || 0;
                u && (l += this.width, f += this.height);
                l = ["translate(" + l + "," + f + ")"];
                J(r) && l.push("matrix(" + r.join(",") + ")");
                u ? l.push("rotate(90) scale(-1,1)") : e && l.push("rotate(" + e + " " + k(this.rotationOriginX, c.getAttribute("x"), 0) + " " + k(this.rotationOriginY, c.getAttribute("y") || 0) + ")");
                (J(b) || J(d)) && l.push("scale(" + k(b, 1) + " " + k(d, 1) + ")");
                l.length && c.setAttribute("transform", l.join(" "))
            };
            A.prototype.visibilitySetter = function(b, d, u) {
                "inherit" === b ? u.removeAttribute(d) : this[d] !== b && u.setAttribute(d,
                    b);
                this[d] = b
            };
            A.prototype.xGetter = function(b) {
                "circle" === this.element.nodeName && ("x" === b ? b = "cx" : "y" === b && (b = "cy"));
                return this._defaultGetter(b)
            };
            A.prototype.zIndexSetter = function(b, d) {
                var u = this.renderer,
                    k = this.parentGroup,
                    e = (k || u).element || u.box,
                    r = this.element;
                u = e === u.box;
                var c = !1;
                var l = this.added;
                var f;
                J(b) ? (r.setAttribute("data-z-index", b), b = +b, this[d] === b && (l = !1)) : J(this[d]) && r.removeAttribute("data-z-index");
                this[d] = b;
                if (l) {
                    (b = this.zIndex) && k && (k.handleZ = !0);
                    d = e.childNodes;
                    for (f = d.length - 1; 0 <=
                        f && !c; f--) {
                        k = d[f];
                        l = k.getAttribute("data-z-index");
                        var p = !J(l);
                        if (k !== r)
                            if (0 > b && p && !u && !f) e.insertBefore(r, d[f]), c = !0;
                            else if (K(l) <= b || p && (!J(b) || 0 <= b)) e.insertBefore(r, d[f + 1] || null), c = !0
                    }
                    c || (e.insertBefore(r, d[u ? 3 : 0] || null), c = !0)
                }
                return c
            };
            return A
        }();
        a.prototype["stroke-widthSetter"] = a.prototype.strokeSetter;
        a.prototype.yGetter = a.prototype.xGetter;
        a.prototype.matrixSetter = a.prototype.rotationOriginXSetter = a.prototype.rotationOriginYSetter = a.prototype.rotationSetter = a.prototype.scaleXSetter = a.prototype.scaleYSetter =
            a.prototype.translateXSetter = a.prototype.translateYSetter = a.prototype.verticalAlignSetter = function(b, d) {
                this[d] = b;
                this.doTransform = !0
            };
        "";
        return a
    });
    N(a, "Core/Renderer/RendererRegistry.js", [a["Core/Globals.js"]], function(a) {
        var E;
        (function(E) {
            E.rendererTypes = {};
            var t;
            E.getRendererType = function(a) {
                void 0 === a && (a = t);
                return E.rendererTypes[a] || E.rendererTypes[t]
            };
            E.registerRendererType = function(y, F, I) {
                E.rendererTypes[y] = F;
                if (!t || I) t = y, a.Renderer = F
            }
        })(E || (E = {}));
        return E
    });
    N(a, "Core/Renderer/SVG/SVGLabel.js",
        [a["Core/Renderer/SVG/SVGElement.js"], a["Core/Utilities.js"]],
        function(a, t) {
            var E = this && this.__extends || function() {
                    var a = function(h, c) {
                        a = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(c, h) {
                            c.__proto__ = h
                        } || function(c, h) {
                            for (var g in h) h.hasOwnProperty(g) && (c[g] = h[g])
                        };
                        return a(h, c)
                    };
                    return function(h, c) {
                        function n() {
                            this.constructor = h
                        }
                        a(h, c);
                        h.prototype = null === c ? Object.create(c) : (n.prototype = c.prototype, new n)
                    }
                }(),
                H = t.defined,
                y = t.extend,
                F = t.isNumber,
                I = t.merge,
                x = t.pick,
                q = t.removeEvent;
            return function(m) {
                function h(c, n, a, g, f, e, G, J, M, p) {
                    var l = m.call(this) || this;
                    l.paddingLeftSetter = l.paddingSetter;
                    l.paddingRightSetter = l.paddingSetter;
                    l.init(c, "g");
                    l.textStr = n;
                    l.x = a;
                    l.y = g;
                    l.anchorX = e;
                    l.anchorY = G;
                    l.baseline = M;
                    l.className = p;
                    l.addClass("button" === p ? "highcharts-no-tooltip" : "highcharts-label");
                    p && l.addClass("highcharts-" + p);
                    l.text = c.text(void 0, 0, 0, J).attr({
                        zIndex: 1
                    });
                    var w;
                    "string" === typeof f && ((w = /^url\((.*?)\)$/.test(f)) || l.renderer.symbols[f]) && (l.symbolKey = f);
                    l.bBox = h.emptyBBox;
                    l.padding =
                        3;
                    l.baselineOffset = 0;
                    l.needsBox = c.styledMode || w;
                    l.deferredAttr = {};
                    l.alignFactor = 0;
                    return l
                }
                E(h, m);
                h.prototype.alignSetter = function(c) {
                    c = {
                        left: 0,
                        center: .5,
                        right: 1
                    } [c];
                    c !== this.alignFactor && (this.alignFactor = c, this.bBox && F(this.xSetting) && this.attr({
                        x: this.xSetting
                    }))
                };
                h.prototype.anchorXSetter = function(c, n) {
                    this.anchorX = c;
                    this.boxAttr(n, Math.round(c) - this.getCrispAdjust() - this.xSetting)
                };
                h.prototype.anchorYSetter = function(c, n) {
                    this.anchorY = c;
                    this.boxAttr(n, c - this.ySetting)
                };
                h.prototype.boxAttr = function(c,
                    n) {
                    this.box ? this.box.attr(c, n) : this.deferredAttr[c] = n
                };
                h.prototype.css = function(c) {
                    if (c) {
                        var n = {};
                        c = I(c);
                        h.textProps.forEach(function(g) {
                            "undefined" !== typeof c[g] && (n[g] = c[g], delete c[g])
                        });
                        this.text.css(n);
                        var z = "width" in n;
                        "fontSize" in n || "fontWeight" in n ? this.updateTextPadding() : z && this.updateBoxSize()
                    }
                    return a.prototype.css.call(this, c)
                };
                h.prototype.destroy = function() {
                    q(this.element, "mouseenter");
                    q(this.element, "mouseleave");
                    this.text && this.text.destroy();
                    this.box && (this.box = this.box.destroy());
                    a.prototype.destroy.call(this)
                };
                h.prototype.fillSetter = function(c, n) {
                    c && (this.needsBox = !0);
                    this.fill = c;
                    this.boxAttr(n, c)
                };
                h.prototype.getBBox = function() {
                    this.textStr && 0 === this.bBox.width && 0 === this.bBox.height && this.updateBoxSize();
                    var c = this.padding,
                        n = x(this.paddingLeft, c);
                    return {
                        width: this.width,
                        height: this.height,
                        x: this.bBox.x - n,
                        y: this.bBox.y - c
                    }
                };
                h.prototype.getCrispAdjust = function() {
                    return this.renderer.styledMode && this.box ? this.box.strokeWidth() % 2 / 2 : (this["stroke-width"] ? parseInt(this["stroke-width"],
                        10) : 0) % 2 / 2
                };
                h.prototype.heightSetter = function(c) {
                    this.heightSetting = c
                };
                h.prototype.onAdd = function() {
                    var c = this.textStr;
                    this.text.add(this);
                    this.attr({
                        text: H(c) ? c : "",
                        x: this.x,
                        y: this.y
                    });
                    this.box && H(this.anchorX) && this.attr({
                        anchorX: this.anchorX,
                        anchorY: this.anchorY
                    })
                };
                h.prototype.paddingSetter = function(c, n) {
                    F(c) ? c !== this[n] && (this[n] = c, this.updateTextPadding()) : this[n] = void 0
                };
                h.prototype.rSetter = function(c, n) {
                    this.boxAttr(n, c)
                };
                h.prototype.shadow = function(c) {
                    c && !this.renderer.styledMode && (this.updateBoxSize(),
                        this.box && this.box.shadow(c));
                    return this
                };
                h.prototype.strokeSetter = function(c, n) {
                    this.stroke = c;
                    this.boxAttr(n, c)
                };
                h.prototype["stroke-widthSetter"] = function(c, n) {
                    c && (this.needsBox = !0);
                    this["stroke-width"] = c;
                    this.boxAttr(n, c)
                };
                h.prototype["text-alignSetter"] = function(c) {
                    this.textAlign = c
                };
                h.prototype.textSetter = function(c) {
                    "undefined" !== typeof c && this.text.attr({
                        text: c
                    });
                    this.updateTextPadding()
                };
                h.prototype.updateBoxSize = function() {
                    var c = this.text.element.style,
                        n = {},
                        a = this.padding,
                        g = this.bBox = F(this.widthSetting) &&
                        F(this.heightSetting) && !this.textAlign || !H(this.text.textStr) ? h.emptyBBox : this.text.getBBox();
                    this.width = this.getPaddedWidth();
                    this.height = (this.heightSetting || g.height || 0) + 2 * a;
                    c = this.renderer.fontMetrics(c && c.fontSize, this.text);
                    this.baselineOffset = a + Math.min((this.text.firstLineMetrics || c).b, g.height || Infinity);
                    this.heightSetting && (this.baselineOffset += (this.heightSetting - c.h) / 2);
                    this.needsBox && (this.box || (a = this.box = this.symbolKey ? this.renderer.symbol(this.symbolKey) : this.renderer.rect(), a.addClass(("button" ===
                        this.className ? "" : "highcharts-label-box") + (this.className ? " highcharts-" + this.className + "-box" : "")), a.add(this)), a = this.getCrispAdjust(), n.x = a, n.y = (this.baseline ? -this.baselineOffset : 0) + a, n.width = Math.round(this.width), n.height = Math.round(this.height), this.box.attr(y(n, this.deferredAttr)), this.deferredAttr = {})
                };
                h.prototype.updateTextPadding = function() {
                    var c = this.text;
                    this.updateBoxSize();
                    var n = this.baseline ? 0 : this.baselineOffset,
                        h = x(this.paddingLeft, this.padding);
                    H(this.widthSetting) && this.bBox &&
                        ("center" === this.textAlign || "right" === this.textAlign) && (h += {
                            center: .5,
                            right: 1
                        } [this.textAlign] * (this.widthSetting - this.bBox.width));
                    if (h !== c.x || n !== c.y) c.attr("x", h), c.hasBoxWidthChanged && (this.bBox = c.getBBox(!0)), "undefined" !== typeof n && c.attr("y", n);
                    c.x = h;
                    c.y = n
                };
                h.prototype.widthSetter = function(c) {
                    this.widthSetting = F(c) ? c : void 0
                };
                h.prototype.getPaddedWidth = function() {
                    var c = this.padding,
                        n = x(this.paddingLeft, c);
                    c = x(this.paddingRight, c);
                    return (this.widthSetting || this.bBox.width || 0) + n + c
                };
                h.prototype.xSetter =
                    function(c) {
                        this.x = c;
                        this.alignFactor && (c -= this.alignFactor * this.getPaddedWidth(), this["forceAnimate:x"] = !0);
                        this.xSetting = Math.round(c);
                        this.attr("translateX", this.xSetting)
                    };
                h.prototype.ySetter = function(c) {
                    this.ySetting = this.y = Math.round(c);
                    this.attr("translateY", this.ySetting)
                };
                h.emptyBBox = {
                    width: 0,
                    height: 0,
                    x: 0,
                    y: 0
                };
                h.textProps = "color direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow width".split(" ");
                return h
            }(a)
        });
    N(a, "Core/Renderer/SVG/Symbols.js",
        [a["Core/Utilities.js"]],
        function(a) {
            function E(a, q, m, h, c) {
                var n = [];
                if (c) {
                    var z = c.start || 0,
                        g = I(c.r, m);
                    m = I(c.r, h || m);
                    var f = (c.end || 0) - .001;
                    h = c.innerR;
                    var e = I(c.open, .001 > Math.abs((c.end || 0) - z - 2 * Math.PI)),
                        G = Math.cos(z),
                        J = Math.sin(z),
                        M = Math.cos(f),
                        p = Math.sin(f);
                    z = I(c.longArc, .001 > f - z - Math.PI ? 0 : 1);
                    n.push(["M", a + g * G, q + m * J], ["A", g, m, 0, z, I(c.clockwise, 1), a + g * M, q + m * p]);
                    y(h) && n.push(e ? ["M", a + h * M, q + h * p] : ["L", a + h * M, q + h * p], ["A", h, h, 0, z, y(c.clockwise) ? 1 - c.clockwise : 0, a + h * G, q + h * J]);
                    e || n.push(["Z"])
                }
                return n
            }

            function B(a,
                q, m, h, c) {
                return c && c.r ? H(a, q, m, h, c) : [
                    ["M", a, q],
                    ["L", a + m, q],
                    ["L", a + m, q + h],
                    ["L", a, q + h],
                    ["Z"]
                ]
            }

            function H(a, q, m, h, c) {
                c = c && c.r || 0;
                return [
                    ["M", a + c, q],
                    ["L", a + m - c, q],
                    ["C", a + m, q, a + m, q, a + m, q + c],
                    ["L", a + m, q + h - c],
                    ["C", a + m, q + h, a + m, q + h, a + m - c, q + h],
                    ["L", a + c, q + h],
                    ["C", a, q + h, a, q + h, a, q + h - c],
                    ["L", a, q + c],
                    ["C", a, q, a, q, a + c, q]
                ]
            }
            var y = a.defined,
                F = a.isNumber,
                I = a.pick;
            return {
                arc: E,
                callout: function(a, q, m, h, c) {
                    var n = Math.min(c && c.r || 0, m, h),
                        z = n + 6,
                        g = c && c.anchorX;
                    c = c && c.anchorY || 0;
                    var f = H(a, q, m, h, {
                        r: n
                    });
                    if (!F(g)) return f;
                    a + g >= m ?
                        c > q + z && c < q + h - z ? f.splice(3, 1, ["L", a + m, c - 6], ["L", a + m + 6, c], ["L", a + m, c + 6], ["L", a + m, q + h - n]) : f.splice(3, 1, ["L", a + m, h / 2], ["L", g, c], ["L", a + m, h / 2], ["L", a + m, q + h - n]) : 0 >= a + g ? c > q + z && c < q + h - z ? f.splice(7, 1, ["L", a, c + 6], ["L", a - 6, c], ["L", a, c - 6], ["L", a, q + n]) : f.splice(7, 1, ["L", a, h / 2], ["L", g, c], ["L", a, h / 2], ["L", a, q + n]) : c && c > h && g > a + z && g < a + m - z ? f.splice(5, 1, ["L", g + 6, q + h], ["L", g, q + h + 6], ["L", g - 6, q + h], ["L", a + n, q + h]) : c && 0 > c && g > a + z && g < a + m - z && f.splice(1, 1, ["L", g - 6, q], ["L", g, q - 6], ["L", g + 6, q], ["L", m - n, q]);
                    return f
                },
                circle: function(a,
                    q, m, h) {
                    return E(a + m / 2, q + h / 2, m / 2, h / 2, {
                        start: .5 * Math.PI,
                        end: 2.5 * Math.PI,
                        open: !1
                    })
                },
                diamond: function(a, q, m, h) {
                    return [
                        ["M", a + m / 2, q],
                        ["L", a + m, q + h / 2],
                        ["L", a + m / 2, q + h],
                        ["L", a, q + h / 2],
                        ["Z"]
                    ]
                },
                rect: B,
                roundedRect: H,
                square: B,
                triangle: function(a, q, m, h) {
                    return [
                        ["M", a + m / 2, q],
                        ["L", a + m, q + h],
                        ["L", a, q + h],
                        ["Z"]
                    ]
                },
                "triangle-down": function(a, q, m, h) {
                    return [
                        ["M", a, q],
                        ["L", a + m, q],
                        ["L", a + m / 2, q + h],
                        ["Z"]
                    ]
                }
            }
        });
    N(a, "Core/Renderer/SVG/TextBuilder.js", [a["Core/Renderer/HTML/AST.js"], a["Core/Globals.js"], a["Core/Utilities.js"]], function(a,
        t, B) {
        var E = t.doc,
            y = t.SVG_NS,
            F = t.win,
            I = B.attr,
            x = B.isString,
            q = B.objectEach,
            m = B.pick;
        return function() {
            function h(c) {
                var a = c.styles;
                this.renderer = c.renderer;
                this.svgElement = c;
                this.width = c.textWidth;
                this.textLineHeight = a && a.lineHeight;
                this.textOutline = a && a.textOutline;
                this.ellipsis = !(!a || "ellipsis" !== a.textOverflow);
                this.noWrap = !(!a || "nowrap" !== a.whiteSpace);
                this.fontSize = a && a.fontSize
            }
            h.prototype.buildSVG = function() {
                var c = this.svgElement,
                    n = c.element,
                    h = c.renderer,
                    g = m(c.textStr, "").toString(),
                    f = -1 !== g.indexOf("<"),
                    e = n.childNodes;
                h = this.width && !c.added && h.box;
                var G = /<br.*?>/g,
                    J = [g, this.ellipsis, this.noWrap, this.textLineHeight, this.textOutline, this.fontSize, this.width].join();
                if (J !== c.textCache) {
                    c.textCache = J;
                    delete c.actualWidth;
                    for (J = e.length; J--;) n.removeChild(e[J]);
                    f || this.ellipsis || this.width || -1 !== g.indexOf(" ") && (!this.noWrap || G.test(g)) ? "" !== g && (h && h.appendChild(n), g = new a(g), this.modifyTree(g.nodes), g.addToDOM(c.element), this.modifyDOM(), this.ellipsis && -1 !== (n.textContent || "").indexOf("\u2026") && c.attr("title",
                        this.unescapeEntities(c.textStr || "", ["&lt;", "&gt;"])), h && h.removeChild(n)) : n.appendChild(E.createTextNode(this.unescapeEntities(g)));
                    x(this.textOutline) && c.applyTextOutline && c.applyTextOutline(this.textOutline)
                }
            };
            h.prototype.modifyDOM = function() {
                var c = this,
                    a = this.svgElement,
                    h = I(a.element, "x");
                a.firstLineMetrics = void 0;
                for (var g; g = a.element.firstChild;)
                    if (/^[\s\u200B]*$/.test(g.textContent || " ")) a.element.removeChild(g);
                    else break;
                [].forEach.call(a.element.querySelectorAll("tspan.highcharts-br"), function(e,
                    f) {
                    e.nextSibling && e.previousSibling && (0 === f && 1 === e.previousSibling.nodeType && (a.firstLineMetrics = a.renderer.fontMetrics(void 0, e.previousSibling)), I(e, {
                        dy: c.getLineHeight(e.nextSibling),
                        x: h
                    }))
                });
                var f = this.width || 0;
                if (f) {
                    var e = function(e, g) {
                            var p = e.textContent || "",
                                l = p.replace(/([^\^])-/g, "$1- ").split(" "),
                                w = !c.noWrap && (1 < l.length || 1 < a.element.childNodes.length),
                                b = c.getLineHeight(g),
                                v = 0,
                                d = a.actualWidth;
                            if (c.ellipsis) p && c.truncate(e, p, void 0, 0, Math.max(0, f - parseInt(c.fontSize || 12, 10)), function(b, d) {
                                return b.substring(0,
                                    d) + "\u2026"
                            });
                            else if (w) {
                                p = [];
                                for (w = []; g.firstChild && g.firstChild !== e;) w.push(g.firstChild), g.removeChild(g.firstChild);
                                for (; l.length;) l.length && !c.noWrap && 0 < v && (p.push(e.textContent || ""), e.textContent = l.join(" ").replace(/- /g, "-")), c.truncate(e, void 0, l, 0 === v ? d || 0 : 0, f, function(b, d) {
                                    return l.slice(0, d).join(" ").replace(/- /g, "-")
                                }), d = a.actualWidth, v++;
                                w.forEach(function(b) {
                                    g.insertBefore(b, e)
                                });
                                p.forEach(function(d) {
                                    g.insertBefore(E.createTextNode(d), e);
                                    d = E.createElementNS(y, "tspan");
                                    d.textContent =
                                        "\u200b";
                                    I(d, {
                                        dy: b,
                                        x: h
                                    });
                                    g.insertBefore(d, e)
                                })
                            }
                        },
                        G = function(c) {
                            [].slice.call(c.childNodes).forEach(function(f) {
                                f.nodeType === F.Node.TEXT_NODE ? e(f, c) : (-1 !== f.className.baseVal.indexOf("highcharts-br") && (a.actualWidth = 0), G(f))
                            })
                        };
                    G(a.element)
                }
            };
            h.prototype.getLineHeight = function(c) {
                var a;
                c = c.nodeType === F.Node.TEXT_NODE ? c.parentElement : c;
                this.renderer.styledMode || (a = c && /(px|em)$/.test(c.style.fontSize) ? c.style.fontSize : this.fontSize || this.renderer.style.fontSize || 12);
                return this.textLineHeight ? parseInt(this.textLineHeight.toString(),
                    10) : this.renderer.fontMetrics(a, c || this.svgElement.element).h
            };
            h.prototype.modifyTree = function(c) {
                var a = this,
                    h = function(g, f) {
                        var e = g.attributes;
                        e = void 0 === e ? {} : e;
                        var n = g.children,
                            J = g.tagName,
                            m = a.renderer.styledMode;
                        if ("b" === J || "strong" === J) m ? e["class"] = "highcharts-strong" : e.style = "font-weight:bold;" + (e.style || "");
                        else if ("i" === J || "em" === J) m ? e["class"] = "highcharts-emphasized" : e.style = "font-style:italic;" + (e.style || "");
                        x(e.style) && (e.style = e.style.replace(/(;| |^)color([ :])/, "$1fill$2"));
                        "br" === J ?
                            (e["class"] = "highcharts-br", g.textContent = "\u200b", (f = c[f + 1]) && f.textContent && (f.textContent = f.textContent.replace(/^ +/gm, ""))) : "a" === J && n && n.some(function(e) {
                                return "#text" === e.tagName
                            }) && (g.children = [{
                                children: n,
                                tagName: "tspan"
                            }]);
                        "#text" !== J && "a" !== J && (g.tagName = "tspan");
                        g.attributes = e;
                        n && n.filter(function(e) {
                            return "#text" !== e.tagName
                        }).forEach(h)
                    };
                c.forEach(h)
            };
            h.prototype.truncate = function(c, a, h, g, f, e) {
                var n = this.svgElement,
                    J = n.renderer,
                    m = n.rotation,
                    p = [],
                    l = h ? 1 : 0,
                    w = (a || h || "").length,
                    b = w,
                    v, d = function(b,
                        d) {
                        d = d || b;
                        var k = c.parentNode;
                        if (k && "undefined" === typeof p[d])
                            if (k.getSubStringLength) try {
                                p[d] = g + k.getSubStringLength(0, h ? d + 1 : d)
                            } catch (O) {
                                ""
                            } else J.getSpanWidth && (c.textContent = e(a || h, b), p[d] = g + J.getSpanWidth(n, c));
                        return p[d]
                    };
                n.rotation = 0;
                var D = d(c.textContent.length);
                if (g + D > f) {
                    for (; l <= w;) b = Math.ceil((l + w) / 2), h && (v = e(h, b)), D = d(b, v && v.length - 1), l === w ? l = w + 1 : D > f ? w = b - 1 : l = b;
                    0 === w ? c.textContent = "" : a && w === a.length - 1 || (c.textContent = v || e(a || h, b))
                }
                h && h.splice(0, b);
                n.actualWidth = D;
                n.rotation = m
            };
            h.prototype.unescapeEntities =
                function(c, a) {
                    q(this.renderer.escapes, function(h, g) {
                        a && -1 !== a.indexOf(h) || (c = c.toString().replace(new RegExp(h, "g"), g))
                    });
                    return c
                };
            return h
        }()
    });
    N(a, "Core/Renderer/SVG/SVGRenderer.js", [a["Core/Renderer/HTML/AST.js"], a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Renderer/RendererRegistry.js"], a["Core/Renderer/SVG/SVGElement.js"], a["Core/Renderer/SVG/SVGLabel.js"], a["Core/Renderer/SVG/Symbols.js"], a["Core/Renderer/SVG/TextBuilder.js"], a["Core/Utilities.js"]], function(a, t, B, H, y, F, I, x, q) {
        var m =
            B.charts,
            h = B.deg2rad,
            c = B.doc,
            n = B.isFirefox,
            z = B.isMS,
            g = B.isWebKit,
            f = B.noop,
            e = B.SVG_NS,
            G = B.symbolSizes,
            J = B.win,
            M = q.addEvent,
            p = q.attr,
            l = q.createElement,
            w = q.css,
            b = q.defined,
            v = q.destroyObjectProperties,
            d = q.extend,
            D = q.isArray,
            C = q.isNumber,
            k = q.isObject,
            K = q.isString,
            O = q.merge,
            r = q.pick,
            A = q.pInt,
            P = q.uniqueKey,
            V;
        B = function() {
            function u(b, d, u, e, k, r, c) {
                this.width = this.url = this.style = this.isSVG = this.imgCount = this.height = this.gradients = this.globalAnimation = this.defs = this.chartIndex = this.cacheKeys = this.cache = this.boxWrapper =
                    this.box = this.alignedObjects = void 0;
                this.init(b, d, u, e, k, r, c)
            }
            u.prototype.init = function(b, d, u, e, k, r, l) {
                var L = this.createElement("svg").attr({
                        version: "1.1",
                        "class": "highcharts-root"
                    }),
                    f = L.element;
                l || L.css(this.getStyle(e));
                b.appendChild(f);
                p(b, "dir", "ltr"); - 1 === b.innerHTML.indexOf("xmlns") && p(f, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = f;
                this.boxWrapper = L;
                this.alignedObjects = [];
                this.url = this.getReferenceURL();
                this.createElement("desc").add().element.appendChild(c.createTextNode("Created with Highcharts 9.3.2"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = r;
                this.forExport = k;
                this.styledMode = l;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(d, u, !1);
                var v;
                n && b.getBoundingClientRect && (d = function() {
                    w(b, {
                        left: 0,
                        top: 0
                    });
                    v = b.getBoundingClientRect();
                    w(b, {
                        left: Math.ceil(v.left) - v.left + "px",
                        top: Math.ceil(v.top) - v.top + "px"
                    })
                }, d(), this.unSubPixelFix = M(J, "resize", d))
            };
            u.prototype.definition = function(b) {
                return (new a([b])).addToDOM(this.defs.element)
            };
            u.prototype.getReferenceURL =
                function() {
                    if ((n || g) && c.getElementsByTagName("base").length) {
                        if (!b(V)) {
                            var d = P();
                            d = (new a([{
                                tagName: "svg",
                                attributes: {
                                    width: 8,
                                    height: 8
                                },
                                children: [{
                                    tagName: "defs",
                                    children: [{
                                        tagName: "clipPath",
                                        attributes: {
                                            id: d
                                        },
                                        children: [{
                                            tagName: "rect",
                                            attributes: {
                                                width: 4,
                                                height: 4
                                            }
                                        }]
                                    }]
                                }, {
                                    tagName: "rect",
                                    attributes: {
                                        id: "hitme",
                                        width: 8,
                                        height: 8,
                                        "clip-path": "url(#" + d + ")",
                                        fill: "rgba(0,0,0,0.001)"
                                    }
                                }]
                            }])).addToDOM(c.body);
                            w(d, {
                                position: "fixed",
                                top: 0,
                                left: 0,
                                zIndex: 9E5
                            });
                            var u = c.elementFromPoint(6, 6);
                            V = "hitme" === (u && u.id);
                            c.body.removeChild(d)
                        }
                        if (V) return J.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20")
                    }
                    return ""
                };
            u.prototype.getStyle = function(b) {
                return this.style = d({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, b)
            };
            u.prototype.setStyle = function(b) {
                this.boxWrapper.css(this.getStyle(b))
            };
            u.prototype.isHidden = function() {
                return !this.boxWrapper.getBBox().width
            };
            u.prototype.destroy = function() {
                var b = this.defs;
                this.box =
                    null;
                this.boxWrapper = this.boxWrapper.destroy();
                v(this.gradients || {});
                this.gradients = null;
                b && (this.defs = b.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            };
            u.prototype.createElement = function(b) {
                var d = new this.Element;
                d.init(this, b);
                return d
            };
            u.prototype.getRadialAttr = function(b, d) {
                return {
                    cx: b[0] - b[2] / 2 + (d.cx || 0) * b[2],
                    cy: b[1] - b[2] / 2 + (d.cy || 0) * b[2],
                    r: (d.r || 0) * b[2]
                }
            };
            u.prototype.buildText = function(b) {
                (new x(b)).buildSVG()
            };
            u.prototype.getContrast = function(b) {
                b = t.parse(b).rgba;
                b[0] *= 1;
                b[1] *= 1.2;
                b[2] *= .5;
                return 459 < b[0] + b[1] + b[2] ? "#000000" : "#FFFFFF"
            };
            u.prototype.button = function(b, u, e, k, r, c, l, f, v, p) {
                var L = this.label(b, u, e, v, void 0, void 0, p, void 0, "button"),
                    w = this.styledMode,
                    A = 0,
                    D = r ? O(r) : {};
                b = D && D.style || {};
                D = a.filterUserAttributes(D);
                L.attr(O({
                    padding: 8,
                    r: 2
                }, D));
                if (!w) {
                    D = O({
                        fill: "#f7f7f7",
                        stroke: "#cccccc",
                        "stroke-width": 1,
                        style: {
                            color: "#333333",
                            cursor: "pointer",
                            fontWeight: "normal"
                        }
                    }, {
                        style: b
                    }, D);
                    var g = D.style;
                    delete D.style;
                    c = O(D, {
                        fill: "#e6e6e6"
                    }, a.filterUserAttributes(c || {}));
                    var C = c.style;
                    delete c.style;
                    l = O(D, {
                        fill: "#e6ebf5",
                        style: {
                            color: "#000000",
                            fontWeight: "bold"
                        }
                    }, a.filterUserAttributes(l || {}));
                    var h = l.style;
                    delete l.style;
                    f = O(D, {
                        style: {
                            color: "#cccccc"
                        }
                    }, a.filterUserAttributes(f || {}));
                    var K = f.style;
                    delete f.style
                }
                M(L.element, z ? "mouseover" : "mouseenter", function() {
                    3 !== A && L.setState(1)
                });
                M(L.element, z ? "mouseout" : "mouseleave", function() {
                    3 !== A && L.setState(A)
                });
                L.setState = function(b) {
                    1 !== b && (L.state = A = b);
                    L.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][b || 0]);
                    w || L.attr([D, c, l, f][b || 0]).css([g, C, h, K][b || 0])
                };
                w || L.attr(D).css(d({
                    cursor: "default"
                }, g));
                return L.on("touchstart", function(b) {
                    return b.stopPropagation()
                }).on("click", function(b) {
                    3 !== A && k.call(L, b)
                })
            };
            u.prototype.crispLine = function(d, u, e) {
                void 0 === e && (e = "round");
                var k = d[0],
                    c = d[1];
                b(k[1]) && k[1] === c[1] && (k[1] = c[1] = Math[e](k[1]) - u % 2 / 2);
                b(k[2]) && k[2] === c[2] && (k[2] = c[2] = Math[e](k[2]) + u % 2 / 2);
                return d
            };
            u.prototype.path = function(b) {
                var u = this.styledMode ? {} : {
                    fill: "none"
                };
                D(b) ? u.d = b : k(b) && d(u, b);
                return this.createElement("path").attr(u)
            };
            u.prototype.circle = function(b, d, u) {
                b = k(b) ? b : "undefined" === typeof b ? {} : {
                    x: b,
                    y: d,
                    r: u
                };
                d = this.createElement("circle");
                d.xSetter = d.ySetter = function(b, d, u) {
                    u.setAttribute("c" + d, b)
                };
                return d.attr(b)
            };
            u.prototype.arc = function(b, d, u, e, c, r) {
                k(b) ? (e = b, d = e.y, u = e.r, b = e.x) : e = {
                    innerR: e,
                    start: c,
                    end: r
                };
                b = this.symbol("arc", b, d, u, u, e);
                b.r = u;
                return b
            };
            u.prototype.rect = function(b, d, u, e, c, r) {
                c = k(b) ? b.r : c;
                var l = this.createElement("rect");
                b = k(b) ? b : "undefined" === typeof b ? {} : {
                    x: b,
                    y: d,
                    width: Math.max(u, 0),
                    height: Math.max(e, 0)
                };
                this.styledMode || ("undefined" !== typeof r && (b["stroke-width"] = r, b = l.crisp(b)), b.fill = "none");
                c && (b.r = c);
                l.rSetter = function(b, d, u) {
                    l.r = b;
                    p(u, {
                        rx: b,
                        ry: b
                    })
                };
                l.rGetter = function() {
                    return l.r || 0
                };
                return l.attr(b)
            };
            u.prototype.setSize = function(b, d, u) {
                this.width = b;
                this.height = d;
                this.boxWrapper.animate({
                    width: b,
                    height: d
                }, {
                    step: function() {
                        this.attr({
                            viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                        })
                    },
                    duration: r(u,
                        !0) ? void 0 : 0
                });
                this.alignElements()
            };
            u.prototype.g = function(b) {
                var d = this.createElement("g");
                return b ? d.attr({
                    "class": "highcharts-" + b
                }) : d
            };
            u.prototype.image = function(b, d, u, e, k, c) {
                var r = {
                        preserveAspectRatio: "none"
                    },
                    l = function(b, d) {
                        b.setAttributeNS ? b.setAttributeNS("http://www.w3.org/1999/xlink", "href", d) : b.setAttribute("hc-svg-href", d)
                    };
                C(d) && (r.x = d);
                C(u) && (r.y = u);
                C(e) && (r.width = e);
                C(k) && (r.height = k);
                var f = this.createElement("image").attr(r);
                d = function(d) {
                    l(f.element, b);
                    c.call(f, d)
                };
                c ? (l(f.element,
                    "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="), u = new J.Image, M(u, "load", d), u.src = b, u.complete && d({})) : l(f.element, b);
                return f
            };
            u.prototype.symbol = function(u, e, k, f, v, p) {
                var L = this,
                    D = /^url\((.*?)\)$/,
                    A = D.test(u),
                    a = !A && (this.symbols[u] ? u : "circle"),
                    g = a && this.symbols[a],
                    C;
                if (g) {
                    "number" === typeof e && (C = g.call(this.symbols, Math.round(e || 0), Math.round(k || 0), f || 0, v || 0, p));
                    var h = this.path(C);
                    L.styledMode || h.attr("fill", "none");
                    d(h, {
                        symbolName: a || void 0,
                        x: e,
                        y: k,
                        width: f,
                        height: v
                    });
                    p && d(h, p)
                } else if (A) {
                    var K = u.match(D)[1];
                    var n = h = this.image(K);
                    n.imgwidth = r(G[K] && G[K].width, p && p.width);
                    n.imgheight = r(G[K] && G[K].height, p && p.height);
                    var Q = function(b) {
                        return b.attr({
                            width: b.width,
                            height: b.height
                        })
                    };
                    ["width", "height"].forEach(function(d) {
                        n[d + "Setter"] = function(d, u) {
                            var e = this["img" + u];
                            this[u] = d;
                            b(e) && (p && "within" === p.backgroundSize && this.width && this.height && (e = Math.round(e * Math.min(this.width / this.imgwidth, this.height / this.imgheight))), this.element && this.element.setAttribute(u, e),
                                this.alignByTranslate || (d = ((this[u] || 0) - e) / 2, this.attr("width" === u ? {
                                    translateX: d
                                } : {
                                    translateY: d
                                })))
                        }
                    });
                    b(e) && n.attr({
                        x: e,
                        y: k
                    });
                    n.isImg = !0;
                    b(n.imgwidth) && b(n.imgheight) ? Q(n) : (n.attr({
                        width: 0,
                        height: 0
                    }), l("img", {
                        onload: function() {
                            var b = m[L.chartIndex];
                            0 === this.width && (w(this, {
                                position: "absolute",
                                top: "-999em"
                            }), c.body.appendChild(this));
                            G[K] = {
                                width: this.width,
                                height: this.height
                            };
                            n.imgwidth = this.width;
                            n.imgheight = this.height;
                            n.element && Q(n);
                            this.parentNode && this.parentNode.removeChild(this);
                            L.imgCount--;
                            if (!L.imgCount && b && !b.hasLoaded) b.onload()
                        },
                        src: K
                    }), this.imgCount++)
                }
                return h
            };
            u.prototype.clipRect = function(b, d, u, e) {
                var k = P() + "-",
                    c = this.createElement("clipPath").attr({
                        id: k
                    }).add(this.defs);
                b = this.rect(b, d, u, e, 0).add(c);
                b.id = k;
                b.clipPath = c;
                b.count = 0;
                return b
            };
            u.prototype.text = function(d, u, e, k) {
                var c = {};
                if (k && (this.allowHTML || !this.forExport)) return this.html(d, u, e);
                c.x = Math.round(u || 0);
                e && (c.y = Math.round(e));
                b(d) && (c.text = d);
                d = this.createElement("text").attr(c);
                if (!k || this.forExport && !this.allowHTML) d.xSetter =
                    function(b, d, u) {
                        for (var e = u.getElementsByTagName("tspan"), k = u.getAttribute(d), c = 0, r; c < e.length; c++) r = e[c], r.getAttribute(d) === k && r.setAttribute(d, b);
                        u.setAttribute(d, b)
                    };
                return d
            };
            u.prototype.fontMetrics = function(b, d) {
                b = !this.styledMode && /px/.test(b) || !J.getComputedStyle ? b || d && d.style && d.style.fontSize || this.style && this.style.fontSize : d && y.prototype.getStyle.call(d, "font-size");
                b = /px/.test(b) ? A(b) : 12;
                d = 24 > b ? b + 3 : Math.round(1.2 * b);
                return {
                    h: d,
                    b: Math.round(.8 * d),
                    f: b
                }
            };
            u.prototype.rotCorr = function(b, d,
                u) {
                var e = b;
                d && u && (e = Math.max(e * Math.cos(d * h), 4));
                return {
                    x: -b / 3 * Math.sin(d * h),
                    y: e
                }
            };
            u.prototype.pathToSegments = function(b) {
                for (var d = [], u = [], e = {
                        A: 8,
                        C: 7,
                        H: 2,
                        L: 3,
                        M: 3,
                        Q: 5,
                        S: 5,
                        T: 3,
                        V: 2
                    }, k = 0; k < b.length; k++) K(u[0]) && C(b[k]) && u.length === e[u[0].toUpperCase()] && b.splice(k, 0, u[0].replace("M", "L").replace("m", "l")), "string" === typeof b[k] && (u.length && d.push(u.slice(0)), u.length = 0), u.push(b[k]);
                d.push(u.slice(0));
                return d
            };
            u.prototype.label = function(b, d, u, e, k, c, r, l, f) {
                return new F(this, b, d, u, e, k, c, r, l, f)
            };
            u.prototype.alignElements =
                function() {
                    this.alignedObjects.forEach(function(b) {
                        return b.align()
                    })
                };
            return u
        }();
        d(B.prototype, {
            Element: y,
            SVG_NS: e,
            escapes: {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "'": "&#39;",
                '"': "&quot;"
            },
            symbols: I,
            draw: f
        });
        H.registerRendererType("svg", B, !0);
        "";
        return B
    });
    N(a, "Core/Renderer/HTML/HTMLElement.js", [a["Core/Globals.js"], a["Core/Renderer/SVG/SVGElement.js"], a["Core/Utilities.js"]], function(a, t, B) {
        var E = this && this.__extends || function() {
                var c = function(a, f) {
                    c = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof
                    Array && function(e, c) {
                        e.__proto__ = c
                    } || function(e, c) {
                        for (var f in c) c.hasOwnProperty(f) && (e[f] = c[f])
                    };
                    return c(a, f)
                };
                return function(a, f) {
                    function e() {
                        this.constructor = a
                    }
                    c(a, f);
                    a.prototype = null === f ? Object.create(f) : (e.prototype = f.prototype, new e)
                }
            }(),
            y = a.isFirefox,
            F = a.isMS,
            I = a.isWebKit,
            x = a.win,
            q = B.css,
            m = B.defined,
            h = B.extend,
            c = B.pick,
            n = B.pInt;
        return function(a) {
            function g() {
                return null !== a && a.apply(this, arguments) || this
            }
            E(g, a);
            g.compose = function(c) {
                if (-1 === g.composedClasses.indexOf(c)) {
                    g.composedClasses.push(c);
                    var e = g.prototype,
                        f = c.prototype;
                    f.getSpanCorrection = e.getSpanCorrection;
                    f.htmlCss = e.htmlCss;
                    f.htmlGetBBox = e.htmlGetBBox;
                    f.htmlUpdateTransform = e.htmlUpdateTransform;
                    f.setSpanRotation = e.setSpanRotation
                }
                return c
            };
            g.prototype.getSpanCorrection = function(c, e, a) {
                this.xCorr = -c * a;
                this.yCorr = -e
            };
            g.prototype.htmlCss = function(f) {
                var e = "SPAN" === this.element.tagName && f && "width" in f,
                    a = c(e && f.width, void 0);
                if (e) {
                    delete f.width;
                    this.textWidth = a;
                    var g = !0
                }
                f && "ellipsis" === f.textOverflow && (f.whiteSpace = "nowrap", f.overflow =
                    "hidden");
                this.styles = h(this.styles, f);
                q(this.element, f);
                g && this.htmlUpdateTransform();
                return this
            };
            g.prototype.htmlGetBBox = function() {
                var c = this.element;
                return {
                    x: c.offsetLeft,
                    y: c.offsetTop,
                    width: c.offsetWidth,
                    height: c.offsetHeight
                }
            };
            g.prototype.htmlUpdateTransform = function() {
                if (this.added) {
                    var c = this.renderer,
                        e = this.element,
                        a = this.translateX || 0,
                        g = this.translateY || 0,
                        h = this.x || 0,
                        p = this.y || 0,
                        l = this.textAlign || "left",
                        w = {
                            left: 0,
                            center: .5,
                            right: 1
                        } [l],
                        b = this.styles;
                    b = b && b.whiteSpace;
                    q(e, {
                        marginLeft: a,
                        marginTop: g
                    });
                    !c.styledMode && this.shadows && this.shadows.forEach(function(b) {
                        q(b, {
                            marginLeft: a + 1,
                            marginTop: g + 1
                        })
                    });
                    this.inverted && [].forEach.call(e.childNodes, function(b) {
                        c.invertChild(b, e)
                    });
                    if ("SPAN" === e.tagName) {
                        var v = this.rotation,
                            d = this.textWidth && n(this.textWidth),
                            D = [v, l, e.innerHTML, this.textWidth, this.textAlign].join(),
                            C = void 0;
                        C = !1;
                        if (d !== this.oldTextWidth) {
                            if (this.textPxLength) var k = this.textPxLength;
                            else q(e, {
                                width: "",
                                whiteSpace: b || "nowrap"
                            }), k = e.offsetWidth;
                            (d > this.oldTextWidth || k > d) && (/[ \-]/.test(e.textContent ||
                                e.innerText) || "ellipsis" === e.style.textOverflow) && (q(e, {
                                width: k > d || v ? d + "px" : "auto",
                                display: "block",
                                whiteSpace: b || "normal"
                            }), this.oldTextWidth = d, C = !0)
                        }
                        this.hasBoxWidthChanged = C;
                        D !== this.cTT && (C = c.fontMetrics(e.style.fontSize, e).b, !m(v) || v === (this.oldRotation || 0) && l === this.oldAlign || this.setSpanRotation(v, w, C), this.getSpanCorrection(!m(v) && this.textPxLength || e.offsetWidth, C, w, v, l));
                        q(e, {
                            left: h + (this.xCorr || 0) + "px",
                            top: p + (this.yCorr || 0) + "px"
                        });
                        this.cTT = D;
                        this.oldRotation = v;
                        this.oldAlign = l
                    }
                } else this.alignOnAdd = !0
            };
            g.prototype.setSpanRotation = function(c, e, a) {
                var f = {},
                    g = F && !/Edge/.test(x.navigator.userAgent) ? "-ms-transform" : I ? "-webkit-transform" : y ? "MozTransform" : x.opera ? "-o-transform" : void 0;
                g && (f[g] = f.transform = "rotate(" + c + "deg)", f[g + (y ? "Origin" : "-origin")] = f.transformOrigin = 100 * e + "% " + a + "px", q(this.element, f))
            };
            g.composedClasses = [];
            return g
        }(t)
    });
    N(a, "Core/Renderer/HTML/HTMLRenderer.js", [a["Core/Renderer/HTML/AST.js"], a["Core/Renderer/SVG/SVGElement.js"], a["Core/Renderer/SVG/SVGRenderer.js"], a["Core/Utilities.js"]],
        function(a, t, B, H) {
            var E = this && this.__extends || function() {
                    var a = function(h, c) {
                        a = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(c, a) {
                            c.__proto__ = a
                        } || function(c, a) {
                            for (var g in a) a.hasOwnProperty(g) && (c[g] = a[g])
                        };
                        return a(h, c)
                    };
                    return function(h, c) {
                        function n() {
                            this.constructor = h
                        }
                        a(h, c);
                        h.prototype = null === c ? Object.create(c) : (n.prototype = c.prototype, new n)
                    }
                }(),
                F = H.attr,
                I = H.createElement,
                x = H.extend,
                q = H.pick;
            return function(m) {
                function h() {
                    return null !== m && m.apply(this, arguments) || this
                }
                E(h, m);
                h.compose = function(c) {
                    -1 === h.composedClasses.indexOf(c) && (h.composedClasses.push(c), c.prototype.html = h.prototype.html);
                    return c
                };
                h.prototype.html = function(c, h, m) {
                    var g = this.createElement("span"),
                        f = g.element,
                        e = g.renderer,
                        n = e.isSVG,
                        J = function(e, c) {
                            ["opacity", "visibility"].forEach(function(l) {
                                e[l + "Setter"] = function(f, b, v) {
                                    var d = e.div ? e.div.style : c;
                                    t.prototype[l + "Setter"].call(this, f, b, v);
                                    d && (d[b] = f)
                                }
                            });
                            e.addedSetters = !0
                        };
                    g.textSetter = function(e) {
                        e !== this.textStr && (delete this.bBox, delete this.oldTextWidth,
                            a.setElementHTML(this.element, q(e, "")), this.textStr = e, g.doTransform = !0)
                    };
                    n && J(g, g.element.style);
                    g.xSetter = g.ySetter = g.alignSetter = g.rotationSetter = function(e, c) {
                        "align" === c ? g.alignValue = g.textAlign = e : g[c] = e;
                        g.doTransform = !0
                    };
                    g.afterSetters = function() {
                        this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1)
                    };
                    g.attr({
                        text: c,
                        x: Math.round(h),
                        y: Math.round(m)
                    }).css({
                        position: "absolute"
                    });
                    e.styledMode || g.css({
                        fontFamily: this.style.fontFamily,
                        fontSize: this.style.fontSize
                    });
                    f.style.whiteSpace = "nowrap";
                    g.css = g.htmlCss;
                    n && (g.add = function(c) {
                        var p = e.box.parentNode,
                            l = [];
                        if (this.parentGroup = c) {
                            var a = c.div;
                            if (!a) {
                                for (; c;) l.push(c), c = c.parentGroup;
                                l.reverse().forEach(function(b) {
                                    function e(d, e) {
                                        b[e] = d;
                                        "translateX" === e ? f.left = d + "px" : f.top = d + "px";
                                        b.doTransform = !0
                                    }
                                    var d = F(b.element, "class"),
                                        c = b.styles || {};
                                    a = b.div = b.div || I("div", d ? {
                                        className: d
                                    } : void 0, {
                                        position: "absolute",
                                        left: (b.translateX || 0) + "px",
                                        top: (b.translateY || 0) + "px",
                                        display: b.display,
                                        opacity: b.opacity,
                                        cursor: c.cursor,
                                        pointerEvents: c.pointerEvents,
                                        visibility: b.visibility
                                    }, a || p);
                                    var f = a.style;
                                    x(b, {
                                        classSetter: function(b) {
                                            return function(d) {
                                                this.element.setAttribute("class", d);
                                                b.className = d
                                            }
                                        }(a),
                                        on: function() {
                                            l[0].div && g.on.apply({
                                                element: l[0].div,
                                                onEvents: b.onEvents
                                            }, arguments);
                                            return b
                                        },
                                        translateXSetter: e,
                                        translateYSetter: e
                                    });
                                    b.addedSetters || J(b)
                                })
                            }
                        } else a = p;
                        a.appendChild(f);
                        g.added = !0;
                        g.alignOnAdd && g.htmlUpdateTransform();
                        return g
                    });
                    return g
                };
                h.composedClasses = [];
                return h
            }(B)
        });
    N(a, "Core/Axis/AxisDefaults.js", [], function() {
        var a;
        (function(a) {
            a.defaultXAxisOptions = {
                alignTicks: !0,
                allowDecimals: void 0,
                panningEnabled: !0,
                zIndex: 2,
                zoomEnabled: !0,
                dateTimeLabelFormats: {
                    millisecond: {
                        main: "%H:%M:%S.%L",
                        range: !1
                    },
                    second: {
                        main: "%H:%M:%S",
                        range: !1
                    },
                    minute: {
                        main: "%H:%M",
                        range: !1
                    },
                    hour: {
                        main: "%H:%M",
                        range: !1
                    },
                    day: {
                        main: "%e. %b"
                    },
                    week: {
                        main: "%e. %b"
                    },
                    month: {
                        main: "%b '%y"
                    },
                    year: {
                        main: "%Y"
                    }
                },
                endOnTick: !1,
                gridLineDashStyle: "Solid",
                gridZIndex: 1,
                labels: {
                    autoRotation: void 0,
                    autoRotationLimit: 80,
                    distance: void 0,
                    enabled: !0,
                    indentation: 10,
                    overflow: "justify",
                    padding: 5,
                    reserveSpace: void 0,
                    rotation: void 0,
                    staggerLines: 0,
                    step: 0,
                    useHTML: !1,
                    x: 0,
                    zIndex: 7,
                    style: {
                        color: "#666666",
                        cursor: "default",
                        fontSize: "11px"
                    }
                },
                maxPadding: .01,
                minorGridLineDashStyle: "Solid",
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: .01,
                offset: void 0,
                opposite: !1,
                reversed: void 0,
                reversedStacks: !1,
                showEmpty: !0,
                showFirstLabel: !0,
                showLastLabel: !0,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickPixelInterval: 100,
                tickmarkPlacement: "between",
                tickPosition: "outside",
                title: {
                    align: "middle",
                    rotation: 0,
                    useHTML: !1,
                    x: 0,
                    y: 0,
                    style: {
                        color: "#666666"
                    }
                },
                type: "linear",
                uniqueNames: !0,
                visible: !0,
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                gridLineWidth: void 0,
                tickColor: "#ccd6eb"
            };
            a.defaultYAxisOptions = {
                reversedStacks: !0,
                endOnTick: !0,
                maxPadding: .05,
                minPadding: .05,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    animation: {},
                    allowOverlap: !1,
                    enabled: !1,
                    crop: !0,
                    overflow: "justify",
                    formatter: function() {
                        var a = this.axis.chart.numberFormatter;
                        return a(this.total, -1)
                    },
                    style: {
                        color: "#000000",
                        fontSize: "11px",
                        fontWeight: "bold",
                        textOutline: "1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            };
            a.defaultLeftAxisOptions = {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            };
            a.defaultRightAxisOptions = {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            };
            a.defaultBottomAxisOptions = {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                margin: 15,
                title: {
                    rotation: 0
                }
            };
            a.defaultTopAxisOptions = {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                margin: 15,
                title: {
                    rotation: 0
                }
            }
        })(a ||
            (a = {}));
        return a
    });
    N(a, "Core/Foundation.js", [a["Core/Utilities.js"]], function(a) {
        var E = a.addEvent,
            B = a.isFunction,
            H = a.objectEach,
            y = a.removeEvent,
            F;
        (function(a) {
            a.registerEventOptions = function(a, q) {
                a.eventOptions = a.eventOptions || {};
                H(q.events, function(m, h) {
                    a.eventOptions[h] !== m && (a.eventOptions[h] && (y(a, h, a.eventOptions[h]), delete a.eventOptions[h]), B(m) && (a.eventOptions[h] = m, E(a, h, m)))
                })
            }
        })(F || (F = {}));
        return F
    });
    N(a, "Core/Axis/Tick.js", [a["Core/FormatUtilities.js"], a["Core/Globals.js"], a["Core/Utilities.js"]],
        function(a, t, B) {
            var E = t.deg2rad,
                y = B.clamp,
                F = B.correctFloat,
                I = B.defined,
                x = B.destroyObjectProperties,
                q = B.extend,
                m = B.fireEvent,
                h = B.isNumber,
                c = B.merge,
                n = B.objectEach,
                z = B.pick;
            t = function() {
                function g(c, e, a, g, h) {
                    this.isNewLabel = this.isNew = !0;
                    this.axis = c;
                    this.pos = e;
                    this.type = a || "";
                    this.parameters = h || {};
                    this.tickmarkOffset = this.parameters.tickmarkOffset;
                    this.options = this.parameters.options;
                    m(this, "init");
                    a || g || this.addLabel()
                }
                g.prototype.addLabel = function() {
                    var c = this,
                        e = c.axis,
                        g = e.options,
                        n = e.chart,
                        M = e.categories,
                        p = e.logarithmic,
                        l = e.names,
                        w = c.pos,
                        b = z(c.options && c.options.labels, g.labels),
                        v = e.tickPositions,
                        d = w === v[0],
                        D = w === v[v.length - 1],
                        C = (!b.step || 1 === b.step) && 1 === e.tickInterval;
                    v = v.info;
                    var k = c.label,
                        K;
                    M = this.parameters.category || (M ? z(M[w], l[w], w) : w);
                    p && h(M) && (M = F(p.lin2log(M)));
                    if (e.dateTime)
                        if (v) {
                            var O = n.time.resolveDTLFormat(g.dateTimeLabelFormats[!g.grid && v.higherRanks[w] || v.unitName]);
                            var r = O.main
                        } else h(M) && (r = e.dateTime.getXDateFormat(M, g.dateTimeLabelFormats || {}));
                    c.isFirst = d;
                    c.isLast = D;
                    var A = {
                        axis: e,
                        chart: n,
                        dateTimeLabelFormat: r,
                        isFirst: d,
                        isLast: D,
                        pos: w,
                        tick: c,
                        tickPositionInfo: v,
                        value: M
                    };
                    m(this, "labelFormat", A);
                    var P = function(d) {
                        return b.formatter ? b.formatter.call(d, d) : b.format ? (d.text = e.defaultLabelFormatter.call(d), a.format(b.format, d, n)) : e.defaultLabelFormatter.call(d, d)
                    };
                    g = P.call(A, A);
                    var V = O && O.list;
                    c.shortenLabel = V ? function() {
                        for (K = 0; K < V.length; K++)
                            if (q(A, {
                                    dateTimeLabelFormat: V[K]
                                }), k.attr({
                                    text: P.call(A, A)
                                }), k.getBBox().width < e.getSlotWidth(c) - 2 * b.padding) return;
                        k.attr({
                            text: ""
                        })
                    } : void 0;
                    C && e._addedPlotLB && c.moveLabel(g, b);
                    I(k) || c.movedLabel ? k && k.textStr !== g && !C && (!k.textWidth || b.style.width || k.styles.width || k.css({
                        width: null
                    }), k.attr({
                        text: g
                    }), k.textPxLength = k.getBBox().width) : (c.label = k = c.createLabel({
                        x: 0,
                        y: 0
                    }, g, b), c.rotation = 0)
                };
                g.prototype.createLabel = function(a, e, g) {
                    var f = this.axis,
                        h = f.chart;
                    if (a = I(e) && g.enabled ? h.renderer.text(e, a.x, a.y, g.useHTML).add(f.labelGroup) : null) h.styledMode || a.css(c(g.style)), a.textPxLength = a.getBBox().width;
                    return a
                };
                g.prototype.destroy = function() {
                    x(this,
                        this.axis)
                };
                g.prototype.getPosition = function(c, e, a, g) {
                    var f = this.axis,
                        p = f.chart,
                        l = g && p.oldChartHeight || p.chartHeight;
                    c = {
                        x: c ? F(f.translate(e + a, null, null, g) + f.transB) : f.left + f.offset + (f.opposite ? (g && p.oldChartWidth || p.chartWidth) - f.right - f.left : 0),
                        y: c ? l - f.bottom + f.offset - (f.opposite ? f.height : 0) : F(l - f.translate(e + a, null, null, g) - f.transB)
                    };
                    c.y = y(c.y, -1E5, 1E5);
                    m(this, "afterGetPosition", {
                        pos: c
                    });
                    return c
                };
                g.prototype.getLabelPosition = function(c, e, a, g, h, p, l, w) {
                    var b = this.axis,
                        f = b.transA,
                        d = b.isLinked && b.linkedParent ?
                        b.linkedParent.reversed : b.reversed,
                        D = b.staggerLines,
                        C = b.tickRotCorr || {
                            x: 0,
                            y: 0
                        },
                        k = g || b.reserveSpaceDefault ? 0 : -b.labelOffset * ("center" === b.labelAlign ? .5 : 1),
                        K = {},
                        n = h.y;
                    I(n) || (n = 0 === b.side ? a.rotation ? -8 : -a.getBBox().height : 2 === b.side ? C.y + 8 : Math.cos(a.rotation * E) * (C.y - a.getBBox(!1, 0).height / 2));
                    c = c + h.x + k + C.x - (p && g ? p * f * (d ? -1 : 1) : 0);
                    e = e + n - (p && !g ? p * f * (d ? 1 : -1) : 0);
                    D && (a = l / (w || 1) % D, b.opposite && (a = D - a - 1), e += b.labelOffset / D * a);
                    K.x = c;
                    K.y = Math.round(e);
                    m(this, "afterGetLabelPosition", {
                        pos: K,
                        tickmarkOffset: p,
                        index: l
                    });
                    return K
                };
                g.prototype.getLabelSize = function() {
                    return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
                };
                g.prototype.getMarkPath = function(c, e, a, g, h, p) {
                    return p.crispLine([
                        ["M", c, e],
                        ["L", c + (h ? 0 : -a), e + (h ? a : 0)]
                    ], g)
                };
                g.prototype.handleOverflow = function(c) {
                    var e = this.axis,
                        a = e.options.labels,
                        f = c.x,
                        g = e.chart.chartWidth,
                        p = e.chart.spacing,
                        l = z(e.labelLeft, Math.min(e.pos, p[3]));
                    p = z(e.labelRight, Math.max(e.isRadial ? 0 : e.pos + e.len, g - p[1]));
                    var w = this.label,
                        b = this.rotation,
                        v = {
                            left: 0,
                            center: .5,
                            right: 1
                        } [e.labelAlign ||
                            w.attr("align")
                        ],
                        d = w.getBBox().width,
                        D = e.getSlotWidth(this),
                        C = {},
                        k = D,
                        h = 1,
                        n;
                    if (b || "justify" !== a.overflow) 0 > b && f - v * d < l ? n = Math.round(f / Math.cos(b * E) - l) : 0 < b && f + v * d > p && (n = Math.round((g - f) / Math.cos(b * E)));
                    else if (g = f + (1 - v) * d, f - v * d < l ? k = c.x + k * (1 - v) - l : g > p && (k = p - c.x + k * v, h = -1), k = Math.min(D, k), k < D && "center" === e.labelAlign && (c.x += h * (D - k - v * (D - Math.min(d, k)))), d > k || e.autoRotation && (w.styles || {}).width) n = k;
                    n && (this.shortenLabel ? this.shortenLabel() : (C.width = Math.floor(n) + "px", (a.style || {}).textOverflow || (C.textOverflow =
                        "ellipsis"), w.css(C)))
                };
                g.prototype.moveLabel = function(c, e) {
                    var a = this,
                        f = a.label,
                        g = a.axis,
                        p = g.reversed,
                        l = !1;
                    f && f.textStr === c ? (a.movedLabel = f, l = !0, delete a.label) : n(g.ticks, function(b) {
                        l || b.isNew || b === a || !b.label || b.label.textStr !== c || (a.movedLabel = b.label, l = !0, b.labelPos = a.movedLabel.xy, delete b.label)
                    });
                    if (!l && (a.labelPos || f)) {
                        var w = a.labelPos || f.xy;
                        f = g.horiz ? p ? 0 : g.width + g.left : w.x;
                        g = g.horiz ? w.y : p ? g.width + g.left : 0;
                        a.movedLabel = a.createLabel({
                            x: f,
                            y: g
                        }, c, e);
                        a.movedLabel && a.movedLabel.attr({
                            opacity: 0
                        })
                    }
                };
                g.prototype.render = function(c, e, a) {
                    var f = this.axis,
                        g = f.horiz,
                        p = this.pos,
                        l = z(this.tickmarkOffset, f.tickmarkOffset);
                    p = this.getPosition(g, p, l, e);
                    l = p.x;
                    var w = p.y;
                    f = g && l === f.pos + f.len || !g && w === f.pos ? -1 : 1;
                    g = z(a, this.label && this.label.newOpacity, 1);
                    a = z(a, 1);
                    this.isActive = !0;
                    this.renderGridLine(e, a, f);
                    this.renderMark(p, a, f);
                    this.renderLabel(p, e, g, c);
                    this.isNew = !1;
                    m(this, "afterRender")
                };
                g.prototype.renderGridLine = function(c, e, a) {
                    var f = this.axis,
                        g = f.options,
                        p = {},
                        l = this.pos,
                        w = this.type,
                        b = z(this.tickmarkOffset,
                            f.tickmarkOffset),
                        v = f.chart.renderer,
                        d = this.gridLine,
                        D = g.gridLineWidth,
                        C = g.gridLineColor,
                        k = g.gridLineDashStyle;
                    "minor" === this.type && (D = g.minorGridLineWidth, C = g.minorGridLineColor, k = g.minorGridLineDashStyle);
                    d || (f.chart.styledMode || (p.stroke = C, p["stroke-width"] = D || 0, p.dashstyle = k), w || (p.zIndex = 1), c && (e = 0), this.gridLine = d = v.path().attr(p).addClass("highcharts-" + (w ? w + "-" : "") + "grid-line").add(f.gridGroup));
                    if (d && (a = f.getPlotLinePath({
                            value: l + b,
                            lineWidth: d.strokeWidth() * a,
                            force: "pass",
                            old: c
                        }))) d[c || this.isNew ?
                        "attr" : "animate"]({
                        d: a,
                        opacity: e
                    })
                };
                g.prototype.renderMark = function(c, e, a) {
                    var f = this.axis,
                        g = f.options,
                        p = f.chart.renderer,
                        l = this.type,
                        w = f.tickSize(l ? l + "Tick" : "tick"),
                        b = c.x;
                    c = c.y;
                    var v = z(g["minor" !== l ? "tickWidth" : "minorTickWidth"], !l && f.isXAxis ? 1 : 0);
                    g = g["minor" !== l ? "tickColor" : "minorTickColor"];
                    var d = this.mark,
                        D = !d;
                    w && (f.opposite && (w[0] = -w[0]), d || (this.mark = d = p.path().addClass("highcharts-" + (l ? l + "-" : "") + "tick").add(f.axisGroup), f.chart.styledMode || d.attr({
                        stroke: g,
                        "stroke-width": v
                    })), d[D ? "attr" : "animate"]({
                        d: this.getMarkPath(b,
                            c, w[0], d.strokeWidth() * a, f.horiz, p),
                        opacity: e
                    }))
                };
                g.prototype.renderLabel = function(c, e, a, g) {
                    var f = this.axis,
                        p = f.horiz,
                        l = f.options,
                        w = this.label,
                        b = l.labels,
                        v = b.step;
                    f = z(this.tickmarkOffset, f.tickmarkOffset);
                    var d = c.x;
                    c = c.y;
                    var D = !0;
                    w && h(d) && (w.xy = c = this.getLabelPosition(d, c, w, p, b, f, g, v), this.isFirst && !this.isLast && !l.showFirstLabel || this.isLast && !this.isFirst && !l.showLastLabel ? D = !1 : !p || b.step || b.rotation || e || 0 === a || this.handleOverflow(c), v && g % v && (D = !1), D && h(c.y) ? (c.opacity = a, w[this.isNewLabel ? "attr" :
                        "animate"](c), this.isNewLabel = !1) : (w.attr("y", -9999), this.isNewLabel = !0))
                };
                g.prototype.replaceMovedLabel = function() {
                    var c = this.label,
                        e = this.axis,
                        a = e.reversed;
                    if (c && !this.isNew) {
                        var g = e.horiz ? a ? e.left : e.width + e.left : c.xy.x;
                        a = e.horiz ? c.xy.y : a ? e.width + e.top : e.top;
                        c.animate({
                            x: g,
                            y: a,
                            opacity: 0
                        }, void 0, c.destroy);
                        delete this.label
                    }
                    e.isDirty = !0;
                    this.label = this.movedLabel;
                    delete this.movedLabel
                };
                return g
            }();
            "";
            return t
        });
    N(a, "Core/Axis/Axis.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Axis/AxisDefaults.js"],
        a["Core/Color/Color.js"], a["Core/DefaultOptions.js"], a["Core/Foundation.js"], a["Core/Globals.js"], a["Core/Axis/Tick.js"], a["Core/Utilities.js"]
    ], function(a, t, B, H, y, F, I, x) {
        var q = a.animObject,
            m = H.defaultOptions,
            h = y.registerEventOptions,
            c = F.deg2rad,
            n = x.arrayMax,
            z = x.arrayMin,
            g = x.clamp,
            f = x.correctFloat,
            e = x.defined,
            G = x.destroyObjectProperties,
            J = x.erase,
            M = x.error,
            p = x.extend,
            l = x.fireEvent,
            w = x.getMagnitude,
            b = x.isArray,
            v = x.isNumber,
            d = x.isString,
            D = x.merge,
            C = x.normalizeTickInterval,
            k = x.objectEach,
            K = x.pick,
            O =
            x.relativeLength,
            r = x.removeEvent,
            A = x.splat,
            P = x.syncTimeout;
        a = function() {
            function a(b, d) {
                this.zoomEnabled = this.width = this.visible = this.userOptions = this.translationSlope = this.transB = this.transA = this.top = this.ticks = this.tickRotCorr = this.tickPositions = this.tickmarkOffset = this.tickInterval = this.tickAmount = this.side = this.series = this.right = this.positiveValuesOnly = this.pos = this.pointRangePadding = this.pointRange = this.plotLinesAndBandsGroups = this.plotLinesAndBands = this.paddedTicks = this.overlap = this.options =
                    this.offset = this.names = this.minPixelPadding = this.minorTicks = this.minorTickInterval = this.min = this.maxLabelLength = this.max = this.len = this.left = this.labelFormatter = this.labelEdge = this.isLinked = this.height = this.hasVisibleSeries = this.hasNames = this.eventOptions = this.coll = this.closestPointRange = this.chart = this.categories = this.bottom = this.alternateBands = void 0;
                this.init(b, d)
            }
            a.prototype.init = function(b, d) {
                var u = d.isX;
                this.chart = b;
                this.horiz = b.inverted && !this.isZAxis ? !u : u;
                this.isXAxis = u;
                this.coll = this.coll ||
                    (u ? "xAxis" : "yAxis");
                l(this, "init", {
                    userOptions: d
                });
                this.opposite = K(d.opposite, this.opposite);
                this.side = K(d.side, this.side, this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3);
                this.setOptions(d);
                var c = this.options,
                    k = c.labels,
                    a = c.type;
                this.userOptions = d;
                this.minPixelPadding = 0;
                this.reversed = K(c.reversed, this.reversed);
                this.visible = c.visible;
                this.zoomEnabled = c.zoomEnabled;
                this.hasNames = "category" === a || !0 === c.categories;
                this.categories = c.categories || this.hasNames;
                this.names || (this.names = [], this.names.keys = {});
                this.plotLinesAndBandsGroups = {};
                this.positiveValuesOnly = !!this.logarithmic;
                this.isLinked = e(c.linkedTo);
                this.ticks = {};
                this.labelEdge = [];
                this.minorTicks = {};
                this.plotLinesAndBands = [];
                this.alternateBands = {};
                this.len = 0;
                this.minRange = this.userMinRange = c.minRange || c.maxZoom;
                this.range = c.range;
                this.offset = c.offset || 0;
                this.min = this.max = null;
                d = K(c.crosshair, A(b.options.tooltip.crosshairs)[u ? 0 : 1]);
                this.crosshair = !0 === d ? {} : d; - 1 === b.axes.indexOf(this) && (u ? b.axes.splice(b.xAxis.length, 0, this) : b.axes.push(this),
                    b[this.coll].push(this));
                this.series = this.series || [];
                b.inverted && !this.isZAxis && u && "undefined" === typeof this.reversed && (this.reversed = !0);
                this.labelRotation = v(k.rotation) ? k.rotation : void 0;
                h(this, c);
                l(this, "afterInit")
            };
            a.prototype.setOptions = function(b) {
                this.options = D(t.defaultXAxisOptions, "yAxis" === this.coll && t.defaultYAxisOptions, [t.defaultTopAxisOptions, t.defaultRightAxisOptions, t.defaultBottomAxisOptions, t.defaultLeftAxisOptions][this.side], D(m[this.coll], b));
                l(this, "afterSetOptions", {
                    userOptions: b
                })
            };
            a.prototype.defaultLabelFormatter = function(b) {
                var d = this.axis;
                b = this.chart.numberFormatter;
                var u = v(this.value) ? this.value : NaN,
                    e = d.chart.time,
                    c = this.dateTimeLabelFormat,
                    k = m.lang,
                    a = k.numericSymbols;
                k = k.numericSymbolMagnitude || 1E3;
                var r = d.logarithmic ? Math.abs(u) : d.tickInterval,
                    l = a && a.length;
                if (d.categories) var f = "" + this.value;
                else if (c) f = e.dateFormat(c, u);
                else if (l && 1E3 <= r)
                    for (; l-- && "undefined" === typeof f;) d = Math.pow(k, l + 1), r >= d && 0 === 10 * u % d && null !== a[l] && 0 !== u && (f = b(u / d, -1) + a[l]);
                "undefined" === typeof f &&
                    (f = 1E4 <= Math.abs(u) ? b(u, -1) : b(u, -1, void 0, ""));
                return f
            };
            a.prototype.getSeriesExtremes = function() {
                var b = this,
                    d = b.chart,
                    c;
                l(this, "getSeriesExtremes", null, function() {
                    b.hasVisibleSeries = !1;
                    b.dataMin = b.dataMax = b.threshold = null;
                    b.softThreshold = !b.isXAxis;
                    b.stacking && b.stacking.buildStacks();
                    b.series.forEach(function(u) {
                        if (u.visible || !d.options.chart.ignoreHiddenSeries) {
                            var k = u.options,
                                a = k.threshold;
                            b.hasVisibleSeries = !0;
                            b.positiveValuesOnly && 0 >= a && (a = null);
                            if (b.isXAxis) {
                                if (k = u.xData, k.length) {
                                    k = b.logarithmic ?
                                        k.filter(b.validatePositiveValue) : k;
                                    c = u.getXExtremes(k);
                                    var r = c.min;
                                    var l = c.max;
                                    v(r) || r instanceof Date || (k = k.filter(v), c = u.getXExtremes(k), r = c.min, l = c.max);
                                    k.length && (b.dataMin = Math.min(K(b.dataMin, r), r), b.dataMax = Math.max(K(b.dataMax, l), l))
                                }
                            } else if (u = u.applyExtremes(), v(u.dataMin) && (r = u.dataMin, b.dataMin = Math.min(K(b.dataMin, r), r)), v(u.dataMax) && (l = u.dataMax, b.dataMax = Math.max(K(b.dataMax, l), l)), e(a) && (b.threshold = a), !k.softThreshold || b.positiveValuesOnly) b.softThreshold = !1
                        }
                    })
                });
                l(this, "afterGetSeriesExtremes")
            };
            a.prototype.translate = function(b, d, e, c, k, a) {
                var u = this.linkedParent || this,
                    r = c && u.old ? u.old.min : u.min,
                    l = u.minPixelPadding;
                k = (u.isOrdinal || u.brokenAxis && u.brokenAxis.hasBreaks || u.logarithmic && k) && u.lin2val;
                var f = 1,
                    g = 0;
                c = c && u.old ? u.old.transA : u.transA;
                c || (c = u.transA);
                e && (f *= -1, g = u.len);
                u.reversed && (f *= -1, g -= f * (u.sector || u.len));
                d ? (b = (b * f + g - l) / c + r, k && (b = u.lin2val(b))) : (k && (b = u.val2lin(b)), b = v(r) ? f * (b - r) * c + g + f * l + (v(a) ? c * a : 0) : void 0);
                return b
            };
            a.prototype.toPixels = function(b, d) {
                return this.translate(b,
                    !1, !this.horiz, null, !0) + (d ? 0 : this.pos)
            };
            a.prototype.toValue = function(b, d) {
                return this.translate(b - (d ? 0 : this.pos), !0, !this.horiz, null, !0)
            };
            a.prototype.getPlotLinePath = function(b) {
                function d(b, d, e) {
                    if ("pass" !== C && b < d || b > e) C ? b = g(b, d, e) : z = !0;
                    return b
                }
                var e = this,
                    c = e.chart,
                    u = e.left,
                    k = e.top,
                    a = b.old,
                    r = b.value,
                    f = b.lineWidth,
                    p = a && c.oldChartHeight || c.chartHeight,
                    A = a && c.oldChartWidth || c.chartWidth,
                    D = e.transB,
                    w = b.translatedValue,
                    C = b.force,
                    h, n, O, m, z;
                b = {
                    value: r,
                    lineWidth: f,
                    old: a,
                    force: C,
                    acrossPanes: b.acrossPanes,
                    translatedValue: w
                };
                l(this, "getPlotLinePath", b, function(b) {
                    w = K(w, e.translate(r, null, null, a));
                    w = g(w, -1E5, 1E5);
                    h = O = Math.round(w + D);
                    n = m = Math.round(p - w - D);
                    v(w) ? e.horiz ? (n = k, m = p - e.bottom, h = O = d(h, u, u + e.width)) : (h = u, O = A - e.right, n = m = d(n, k, k + e.height)) : (z = !0, C = !1);
                    b.path = z && !C ? null : c.renderer.crispLine([
                        ["M", h, n],
                        ["L", O, m]
                    ], f || 1)
                });
                return b.path
            };
            a.prototype.getLinearTickPositions = function(b, d, e) {
                var c = f(Math.floor(d / b) * b);
                e = f(Math.ceil(e / b) * b);
                var u = [],
                    k;
                f(c + b) === c && (k = 20);
                if (this.single) return [d];
                for (d = c; d <=
                    e;) {
                    u.push(d);
                    d = f(d + b, k);
                    if (d === a) break;
                    var a = d
                }
                return u
            };
            a.prototype.getMinorTickInterval = function() {
                var b = this.options;
                return !0 === b.minorTicks ? K(b.minorTickInterval, "auto") : !1 === b.minorTicks ? null : b.minorTickInterval
            };
            a.prototype.getMinorTickPositions = function() {
                var b = this.options,
                    d = this.tickPositions,
                    e = this.minorTickInterval,
                    c = this.pointRangePadding || 0,
                    k = this.min - c;
                c = this.max + c;
                var a = c - k,
                    r = [];
                if (a && a / e < this.len / 3) {
                    var l = this.logarithmic;
                    if (l) this.paddedTicks.forEach(function(b, d, c) {
                        d && r.push.apply(r,
                            l.getLogTickPositions(e, c[d - 1], c[d], !0))
                    });
                    else if (this.dateTime && "auto" === this.getMinorTickInterval()) r = r.concat(this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(e), k, c, b.startOfWeek));
                    else
                        for (b = k + (d[0] - k) % e; b <= c && b !== r[0]; b += e) r.push(b)
                }
                0 !== r.length && this.trimTicks(r);
                return r
            };
            a.prototype.adjustForMinRange = function() {
                var b = this.options,
                    d = this.logarithmic,
                    c = this.min,
                    k = this.max,
                    a = 0,
                    r, l, f, g;
                this.isXAxis && "undefined" === typeof this.minRange && !d && (e(b.min) || e(b.max) || e(b.floor) || e(b.ceiling) ?
                    this.minRange = null : (this.series.forEach(function(b) {
                        f = b.xData;
                        g = b.xIncrement ? 1 : f.length - 1;
                        if (1 < f.length)
                            for (r = g; 0 < r; r--)
                                if (l = f[r] - f[r - 1], !a || l < a) a = l
                    }), this.minRange = Math.min(5 * a, this.dataMax - this.dataMin)));
                if (k - c < this.minRange) {
                    var p = this.dataMax - this.dataMin >= this.minRange;
                    var v = this.minRange;
                    var w = (v - k + c) / 2;
                    w = [c - w, K(b.min, c - w)];
                    p && (w[2] = this.logarithmic ? this.logarithmic.log2lin(this.dataMin) : this.dataMin);
                    c = n(w);
                    k = [c + v, K(b.max, c + v)];
                    p && (k[2] = d ? d.log2lin(this.dataMax) : this.dataMax);
                    k = z(k);
                    k - c < v &&
                        (w[0] = k - v, w[1] = K(b.min, k - v), c = n(w))
                }
                this.min = c;
                this.max = k
            };
            a.prototype.getClosest = function() {
                var b;
                this.categories ? b = 1 : this.series.forEach(function(d) {
                    var c = d.closestPointRange,
                        k = d.visible || !d.chart.options.chart.ignoreHiddenSeries;
                    !d.noSharedTooltip && e(c) && k && (b = e(b) ? Math.min(b, c) : c)
                });
                return b
            };
            a.prototype.nameToX = function(d) {
                var c = b(this.categories),
                    k = c ? this.categories : this.names,
                    u = d.options.x;
                d.series.requireSorting = !1;
                e(u) || (u = this.options.uniqueNames ? c ? k.indexOf(d.name) : K(k.keys[d.name], -1) :
                    d.series.autoIncrement());
                if (-1 === u) {
                    if (!c) var a = k.length
                } else a = u;
                "undefined" !== typeof a && (this.names[a] = d.name, this.names.keys[d.name] = a);
                return a
            };
            a.prototype.updateNames = function() {
                var b = this,
                    d = this.names;
                0 < d.length && (Object.keys(d.keys).forEach(function(b) {
                    delete d.keys[b]
                }), d.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach(function(d) {
                    d.xIncrement = null;
                    if (!d.points || d.isDirtyData) b.max = Math.max(b.max, d.xData.length - 1), d.processData(), d.generatePoints();
                    d.data.forEach(function(c,
                        e) {
                        if (c && c.options && "undefined" !== typeof c.name) {
                            var k = b.nameToX(c);
                            "undefined" !== typeof k && k !== c.x && (c.x = k, d.xData[e] = k)
                        }
                    })
                }))
            };
            a.prototype.setAxisTranslation = function() {
                var b = this,
                    c = b.max - b.min,
                    e = b.linkedParent,
                    k = !!b.categories,
                    a = b.isXAxis,
                    r = b.axisPointRange || 0,
                    f = 0,
                    g = 0,
                    p = b.transA;
                if (a || k || r) {
                    var v = b.getClosest();
                    e ? (f = e.minPointOffset, g = e.pointRangePadding) : b.series.forEach(function(c) {
                        var e = k ? 1 : a ? K(c.options.pointRange, v, 0) : b.axisPointRange || 0,
                            u = c.options.pointPlacement;
                        r = Math.max(r, e);
                        if (!b.single ||
                            k) c = c.is("xrange") ? !a : a, f = Math.max(f, c && d(u) ? 0 : e / 2), g = Math.max(g, c && "on" === u ? 0 : e)
                    });
                    e = b.ordinal && b.ordinal.slope && v ? b.ordinal.slope / v : 1;
                    b.minPointOffset = f *= e;
                    b.pointRangePadding = g *= e;
                    b.pointRange = Math.min(r, b.single && k ? 1 : c);
                    a && (b.closestPointRange = v)
                }
                b.translationSlope = b.transA = p = b.staticScale || b.len / (c + g || 1);
                b.transB = b.horiz ? b.left : b.bottom;
                b.minPixelPadding = p * f;
                l(this, "afterSetAxisTranslation")
            };
            a.prototype.minFromRange = function() {
                return this.max - this.range
            };
            a.prototype.setTickInterval = function(b) {
                var d =
                    this.chart,
                    c = this.logarithmic,
                    k = this.options,
                    a = this.isXAxis,
                    u = this.isLinked,
                    r = k.tickPixelInterval,
                    g = this.categories,
                    p = this.softThreshold,
                    A = k.maxPadding,
                    D = k.minPadding,
                    h = v(k.tickInterval) && 0 <= k.tickInterval ? k.tickInterval : void 0,
                    n = v(this.threshold) ? this.threshold : null;
                this.dateTime || g || u || this.getTickAmount();
                var O = K(this.userMin, k.min);
                var m = K(this.userMax, k.max);
                if (u) {
                    this.linkedParent = d[this.coll][k.linkedTo];
                    var z = this.linkedParent.getExtremes();
                    this.min = K(z.min, z.dataMin);
                    this.max = K(z.max, z.dataMax);
                    k.type !== this.linkedParent.options.type && M(11, 1, d)
                } else {
                    if (p && e(n))
                        if (this.dataMin >= n) z = n, D = 0;
                        else if (this.dataMax <= n) {
                        var q = n;
                        A = 0
                    }
                    this.min = K(O, z, this.dataMin);
                    this.max = K(m, q, this.dataMax)
                }
                c && (this.positiveValuesOnly && !b && 0 >= Math.min(this.min, K(this.dataMin, this.min)) && M(10, 1, d), this.min = f(c.log2lin(this.min), 16), this.max = f(c.log2lin(this.max), 16));
                this.range && e(this.max) && (this.userMin = this.min = O = Math.max(this.dataMin, this.minFromRange()), this.userMax = m = this.max, this.range = null);
                l(this, "foundExtremes");
                this.beforePadding && this.beforePadding();
                this.adjustForMinRange();
                !(g || this.axisPointRange || this.stacking && this.stacking.usePercentage || u) && e(this.min) && e(this.max) && (d = this.max - this.min) && (!e(O) && D && (this.min -= d * D), !e(m) && A && (this.max += d * A));
                v(this.userMin) || (v(k.softMin) && k.softMin < this.min && (this.min = O = k.softMin), v(k.floor) && (this.min = Math.max(this.min, k.floor)));
                v(this.userMax) || (v(k.softMax) && k.softMax > this.max && (this.max = m = k.softMax), v(k.ceiling) && (this.max = Math.min(this.max, k.ceiling)));
                p &&
                    e(this.dataMin) && (n = n || 0, !e(O) && this.min < n && this.dataMin >= n ? this.min = this.options.minRange ? Math.min(n, this.max - this.minRange) : n : !e(m) && this.max > n && this.dataMax <= n && (this.max = this.options.minRange ? Math.max(n, this.min + this.minRange) : n));
                v(this.min) && v(this.max) && !this.chart.polar && this.min > this.max && (e(this.options.min) ? this.max = this.min : e(this.options.max) && (this.min = this.max));
                this.tickInterval = this.min === this.max || "undefined" === typeof this.min || "undefined" === typeof this.max ? 1 : u && this.linkedParent &&
                    !h && r === this.linkedParent.options.tickPixelInterval ? h = this.linkedParent.tickInterval : K(h, this.tickAmount ? (this.max - this.min) / Math.max(this.tickAmount - 1, 1) : void 0, g ? 1 : (this.max - this.min) * r / Math.max(this.len, r));
                if (a && !b) {
                    var G = this.min !== (this.old && this.old.min) || this.max !== (this.old && this.old.max);
                    this.series.forEach(function(b) {
                        b.forceCrop = b.forceCropping && b.forceCropping();
                        b.processData(G)
                    });
                    l(this, "postProcessData", {
                        hasExtemesChanged: G
                    })
                }
                this.setAxisTranslation();
                l(this, "initialAxisTranslation");
                this.pointRange && !h && (this.tickInterval = Math.max(this.pointRange, this.tickInterval));
                b = K(k.minTickInterval, this.dateTime && !this.series.some(function(b) {
                    return b.noSharedTooltip
                }) ? this.closestPointRange : 0);
                !h && this.tickInterval < b && (this.tickInterval = b);
                this.dateTime || this.logarithmic || h || (this.tickInterval = C(this.tickInterval, void 0, w(this.tickInterval), K(k.allowDecimals, .5 > this.tickInterval || void 0 !== this.tickAmount), !!this.tickAmount));
                this.tickAmount || (this.tickInterval = this.unsquish());
                this.setTickPositions()
            };
            a.prototype.setTickPositions = function() {
                var b = this.options,
                    d = b.tickPositions,
                    c = this.getMinorTickInterval(),
                    k = this.hasVerticalPanning(),
                    a = "colorAxis" === this.coll,
                    r = (a || !k) && b.startOnTick;
                k = (a || !k) && b.endOnTick;
                a = b.tickPositioner;
                this.tickmarkOffset = this.categories && "between" === b.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === c && this.tickInterval ? this.tickInterval / 5 : c;
                this.single = this.min === this.max && e(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !==
                    b.allowDecimals);
                this.tickPositions = c = d && d.slice();
                !c && (this.ordinal && this.ordinal.positions || !((this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200)) ? c = this.dateTime ? this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(this.tickInterval, b.units), this.min, this.max, b.startOfWeek, this.ordinal && this.ordinal.positions, this.closestPointRange, !0) : this.logarithmic ? this.logarithmic.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min,
                    this.max) : (c = [this.min, this.max], M(19, !1, this.chart)), c.length > this.len && (c = [c[0], c.pop()], c[0] === c[1] && (c.length = 1)), this.tickPositions = c, a && (a = a.apply(this, [this.min, this.max]))) && (this.tickPositions = c = a);
                this.paddedTicks = c.slice(0);
                this.trimTicks(c, r, k);
                this.isLinked || (this.single && 2 > c.length && !this.categories && !this.series.some(function(b) {
                    return b.is("heatmap") && "between" === b.options.pointPlacement
                }) && (this.min -= .5, this.max += .5), d || a || this.adjustTickAmount());
                l(this, "afterSetTickPositions")
            };
            a.prototype.trimTicks = function(b, d, c) {
                var k = b[0],
                    a = b[b.length - 1],
                    u = !this.isOrdinal && this.minPointOffset || 0;
                l(this, "trimTicks");
                if (!this.isLinked) {
                    if (d && -Infinity !== k) this.min = k;
                    else
                        for (; this.min - u > b[0];) b.shift();
                    if (c) this.max = a;
                    else
                        for (; this.max + u < b[b.length - 1];) b.pop();
                    0 === b.length && e(k) && !this.options.tickPositions && b.push((a + k) / 2)
                }
            };
            a.prototype.alignToOthers = function() {
                var b = {},
                    d = this.options,
                    c;
                !1 !== this.chart.options.chart.alignTicks && d.alignTicks && !1 !== d.startOnTick && !1 !== d.endOnTick && !this.logarithmic &&
                    this.chart[this.coll].forEach(function(d) {
                        var k = d.options;
                        k = [d.horiz ? k.left : k.top, k.width, k.height, k.pane].join();
                        d.series.length && (b[k] ? c = !0 : b[k] = 1)
                    });
                return c
            };
            a.prototype.getTickAmount = function() {
                var b = this.options,
                    d = b.tickPixelInterval,
                    c = b.tickAmount;
                !e(b.tickInterval) && !c && this.len < d && !this.isRadial && !this.logarithmic && b.startOnTick && b.endOnTick && (c = 2);
                !c && this.alignToOthers() && (c = Math.ceil(this.len / d) + 1);
                4 > c && (this.finalTickAmt = c, c = 5);
                this.tickAmount = c
            };
            a.prototype.adjustTickAmount = function() {
                var b =
                    this.options,
                    d = this.tickInterval,
                    c = this.tickPositions,
                    k = this.tickAmount,
                    a = this.finalTickAmt,
                    r = c && c.length,
                    l = K(this.threshold, this.softThreshold ? 0 : null);
                if (this.hasData() && v(this.min) && v(this.max)) {
                    if (r < k) {
                        for (; c.length < k;) c.length % 2 || this.min === l ? c.push(f(c[c.length - 1] + d)) : c.unshift(f(c[0] - d));
                        this.transA *= (r - 1) / (k - 1);
                        this.min = b.startOnTick ? c[0] : Math.min(this.min, c[0]);
                        this.max = b.endOnTick ? c[c.length - 1] : Math.max(this.max, c[c.length - 1])
                    } else r > k && (this.tickInterval *= 2, this.setTickPositions());
                    if (e(a)) {
                        for (d =
                            b = c.length; d--;)(3 === a && 1 === d % 2 || 2 >= a && 0 < d && d < b - 1) && c.splice(d, 1);
                        this.finalTickAmt = void 0
                    }
                }
            };
            a.prototype.setScale = function() {
                var b = !1,
                    d = !1;
                this.series.forEach(function(c) {
                    b = b || c.isDirtyData || c.isDirty;
                    d = d || c.xAxis && c.xAxis.isDirty || !1
                });
                this.setAxisSize();
                var c = this.len !== (this.old && this.old.len);
                c || b || d || this.isLinked || this.forceRedraw || this.userMin !== (this.old && this.old.userMin) || this.userMax !== (this.old && this.old.userMax) || this.alignToOthers() ? (this.stacking && this.stacking.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.isDirty || (this.isDirty = c || this.min !== (this.old && this.old.min) || this.max !== (this.old && this.old.max))) : this.stacking && this.stacking.cleanStacks();
                b && this.panningState && (this.panningState.isDirty = !0);
                l(this, "afterSetScale")
            };
            a.prototype.setExtremes = function(b, d, c, k, e) {
                var a = this,
                    u = a.chart;
                c = K(c, !0);
                a.series.forEach(function(b) {
                    delete b.kdTree
                });
                e = p(e, {
                    min: b,
                    max: d
                });
                l(a, "setExtremes", e, function() {
                    a.userMin = b;
                    a.userMax = d;
                    a.eventArgs = e;
                    c && u.redraw(k)
                })
            };
            a.prototype.zoom = function(b, d) {
                var c = this,
                    k = this.dataMin,
                    a = this.dataMax,
                    u = this.options,
                    r = Math.min(k, K(u.min, k)),
                    f = Math.max(a, K(u.max, a));
                b = {
                    newMin: b,
                    newMax: d
                };
                l(this, "zoom", b, function(b) {
                    var d = b.newMin,
                        u = b.newMax;
                    if (d !== c.min || u !== c.max) c.allowZoomOutside || (e(k) && (d < r && (d = r), d > f && (d = f)), e(a) && (u < r && (u = r), u > f && (u = f))), c.displayBtn = "undefined" !== typeof d || "undefined" !== typeof u, c.setExtremes(d, u, !1, void 0, {
                        trigger: "zoom"
                    });
                    b.zoomed = !0
                });
                return b.zoomed
            };
            a.prototype.setAxisSize = function() {
                var b = this.chart,
                    d = this.options,
                    c = d.offsets || [0, 0, 0, 0],
                    k = this.horiz,
                    e = this.width = Math.round(O(K(d.width, b.plotWidth - c[3] + c[1]), b.plotWidth)),
                    a = this.height = Math.round(O(K(d.height, b.plotHeight - c[0] + c[2]), b.plotHeight)),
                    r = this.top = Math.round(O(K(d.top, b.plotTop + c[0]), b.plotHeight, b.plotTop));
                d = this.left = Math.round(O(K(d.left, b.plotLeft + c[3]), b.plotWidth, b.plotLeft));
                this.bottom = b.chartHeight - a - r;
                this.right = b.chartWidth - e - d;
                this.len = Math.max(k ? e : a, 0);
                this.pos = k ? d : r
            };
            a.prototype.getExtremes = function() {
                var b = this.logarithmic;
                return {
                    min: b ? f(b.lin2log(this.min)) : this.min,
                    max: b ? f(b.lin2log(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            };
            a.prototype.getThreshold = function(b) {
                var d = this.logarithmic,
                    c = d ? d.lin2log(this.min) : this.min;
                d = d ? d.lin2log(this.max) : this.max;
                null === b || -Infinity === b ? b = c : Infinity === b ? b = d : c > b ? b = c : d < b && (b = d);
                return this.translate(b, 0, 1, 0, 1)
            };
            a.prototype.autoLabelAlign = function(b) {
                var d = (K(b, 0) - 90 * this.side + 720) % 360;
                b = {
                    align: "center"
                };
                l(this, "autoLabelAlign",
                    b,
                    function(b) {
                        15 < d && 165 > d ? b.align = "right" : 195 < d && 345 > d && (b.align = "left")
                    });
                return b.align
            };
            a.prototype.tickSize = function(b) {
                var d = this.options,
                    c = K(d["tick" === b ? "tickWidth" : "minorTickWidth"], "tick" === b && this.isXAxis && !this.categories ? 1 : 0),
                    k = d["tick" === b ? "tickLength" : "minorTickLength"];
                if (c && k) {
                    "inside" === d[b + "Position"] && (k = -k);
                    var e = [k, c]
                }
                b = {
                    tickSize: e
                };
                l(this, "afterTickSize", b);
                return b.tickSize
            };
            a.prototype.labelMetrics = function() {
                var b = this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style.fontSize,
                    this.ticks[b] && this.ticks[b].label)
            };
            a.prototype.unsquish = function() {
                var b = this.options.labels,
                    d = this.horiz,
                    k = this.tickInterval,
                    e = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / k),
                    a = b.rotation,
                    r = this.labelMetrics(),
                    l = Math.max(this.max - this.min, 0),
                    g = function(b) {
                        var d = b / (e || 1);
                        d = 1 < d ? Math.ceil(d) : 1;
                        d * k > l && Infinity !== b && Infinity !== e && l && (d = Math.ceil(l / k));
                        return f(d * k)
                    },
                    p = k,
                    w, A, D = Number.MAX_VALUE;
                if (d) {
                    if (!b.staggerLines && !b.step)
                        if (v(a)) var C = [a];
                        else e < b.autoRotationLimit && (C = b.autoRotation);
                    C &&
                        C.forEach(function(b) {
                            if (b === a || b && -90 <= b && 90 >= b) {
                                A = g(Math.abs(r.h / Math.sin(c * b)));
                                var d = A + Math.abs(b / 360);
                                d < D && (D = d, w = b, p = A)
                            }
                        })
                } else b.step || (p = g(r.h));
                this.autoRotation = C;
                this.labelRotation = K(w, v(a) ? a : 0);
                return p
            };
            a.prototype.getSlotWidth = function(b) {
                var d = this.chart,
                    c = this.horiz,
                    k = this.options.labels,
                    e = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    a = d.margin[3];
                if (b && v(b.slotWidth)) return b.slotWidth;
                if (c && 2 > k.step) return k.rotation ? 0 : (this.staggerLines || 1) * this.len / e;
                if (!c) {
                    b = k.style.width;
                    if (void 0 !== b) return parseInt(String(b), 10);
                    if (a) return a - d.spacing[3]
                }
                return .33 * d.chartWidth
            };
            a.prototype.renderUnsquish = function() {
                var b = this.chart,
                    c = b.renderer,
                    k = this.tickPositions,
                    e = this.ticks,
                    a = this.options.labels,
                    r = a.style,
                    l = this.horiz,
                    f = this.getSlotWidth(),
                    g = Math.max(1, Math.round(f - 2 * a.padding)),
                    p = {},
                    v = this.labelMetrics(),
                    w = r.textOverflow,
                    A = 0;
                d(a.rotation) || (p.rotation = a.rotation || 0);
                k.forEach(function(b) {
                    b = e[b];
                    b.movedLabel && b.replaceMovedLabel();
                    b && b.label && b.label.textPxLength > A && (A = b.label.textPxLength)
                });
                this.maxLabelLength = A;
                if (this.autoRotation) A > g && A > v.h ? p.rotation = this.labelRotation : this.labelRotation = 0;
                else if (f) {
                    var D = g;
                    if (!w) {
                        var C = "clip";
                        for (g = k.length; !l && g--;) {
                            var h = k[g];
                            if (h = e[h].label) h.styles && "ellipsis" === h.styles.textOverflow ? h.css({
                                textOverflow: "clip"
                            }) : h.textPxLength > f && h.css({
                                width: f + "px"
                            }), h.getBBox().height > this.len / k.length - (v.h - v.f) && (h.specificTextOverflow = "ellipsis")
                        }
                    }
                }
                p.rotation && (D = A > .5 * b.chartHeight ? .33 * b.chartHeight : A, w || (C = "ellipsis"));
                if (this.labelAlign = a.align || this.autoLabelAlign(this.labelRotation)) p.align =
                    this.labelAlign;
                k.forEach(function(b) {
                    var d = (b = e[b]) && b.label,
                        c = r.width,
                        k = {};
                    d && (d.attr(p), b.shortenLabel ? b.shortenLabel() : D && !c && "nowrap" !== r.whiteSpace && (D < d.textPxLength || "SPAN" === d.element.tagName) ? (k.width = D + "px", w || (k.textOverflow = d.specificTextOverflow || C), d.css(k)) : d.styles && d.styles.width && !k.width && !c && d.css({
                        width: null
                    }), delete d.specificTextOverflow, b.rotation = p.rotation)
                }, this);
                this.tickRotCorr = c.rotCorr(v.b, this.labelRotation || 0, 0 !== this.side)
            };
            a.prototype.hasData = function() {
                return this.series.some(function(b) {
                        return b.hasData()
                    }) ||
                    this.options.showEmpty && e(this.min) && e(this.max)
            };
            a.prototype.addTitle = function(b) {
                var d = this.chart.renderer,
                    c = this.horiz,
                    k = this.opposite,
                    e = this.options.title,
                    a = this.chart.styledMode,
                    r;
                this.axisTitle || ((r = e.textAlign) || (r = (c ? {
                        low: "left",
                        middle: "center",
                        high: "right"
                    } : {
                        low: k ? "right" : "left",
                        middle: "center",
                        high: k ? "left" : "right"
                    })[e.align]), this.axisTitle = d.text(e.text || "", 0, 0, e.useHTML).attr({
                        zIndex: 7,
                        rotation: e.rotation,
                        align: r
                    }).addClass("highcharts-axis-title"), a || this.axisTitle.css(D(e.style)), this.axisTitle.add(this.axisGroup),
                    this.axisTitle.isNew = !0);
                a || e.style.width || this.isRadial || this.axisTitle.css({
                    width: this.len + "px"
                });
                this.axisTitle[b ? "show" : "hide"](b)
            };
            a.prototype.generateTick = function(b) {
                var d = this.ticks;
                d[b] ? d[b].addLabel() : d[b] = new I(this, b)
            };
            a.prototype.getOffset = function() {
                var b = this,
                    d = this,
                    c = d.chart,
                    a = d.horiz,
                    r = d.options,
                    f = d.side,
                    g = d.ticks,
                    p = d.tickPositions,
                    v = d.coll,
                    w = d.axisParent,
                    A = c.renderer,
                    D = c.inverted && !d.isZAxis ? [1, 0, 3, 2][f] : f,
                    C = d.hasData(),
                    h = r.title,
                    n = r.labels,
                    O = c.axisOffset;
                c = c.clipOffset;
                var m = [-1,
                        1, 1, -1
                    ][f],
                    z = r.className,
                    q, G = 0,
                    J = 0,
                    P = 0;
                d.showAxis = q = C || r.showEmpty;
                d.staggerLines = d.horiz && n.staggerLines || void 0;
                if (!d.axisGroup) {
                    var M = function(d, c, k) {
                        return A.g(d).attr({
                            zIndex: k
                        }).addClass("highcharts-" + v.toLowerCase() + c + " " + (b.isRadial ? "highcharts-radial-axis" + c + " " : "") + (z || "")).add(w)
                    };
                    d.gridGroup = M("grid", "-grid", r.gridZIndex);
                    d.axisGroup = M("axis", "", r.zIndex);
                    d.labelGroup = M("axis-labels", "-labels", n.zIndex)
                }
                C || d.isLinked ? (p.forEach(function(b) {
                        d.generateTick(b)
                    }), d.renderUnsquish(), d.reserveSpaceDefault =
                    0 === f || 2 === f || {
                        1: "left",
                        3: "right"
                    } [f] === d.labelAlign, K(n.reserveSpace, "center" === d.labelAlign ? !0 : null, d.reserveSpaceDefault) && p.forEach(function(b) {
                        P = Math.max(g[b].getLabelSize(), P)
                    }), d.staggerLines && (P *= d.staggerLines), d.labelOffset = P * (d.opposite ? -1 : 1)) : k(g, function(b, d) {
                    b.destroy();
                    delete g[d]
                });
                if (h && h.text && !1 !== h.enabled && (d.addTitle(q), q && !1 !== h.reserveSpace)) {
                    d.titleOffset = G = d.axisTitle.getBBox()[a ? "height" : "width"];
                    var V = h.offset;
                    J = e(V) ? 0 : K(h.margin, a ? 5 : 10)
                }
                d.renderLine();
                d.offset = m * K(r.offset,
                    O[f] ? O[f] + (r.margin || 0) : 0);
                d.tickRotCorr = d.tickRotCorr || {
                    x: 0,
                    y: 0
                };
                h = 0 === f ? -d.labelMetrics().h : 2 === f ? d.tickRotCorr.y : 0;
                C = Math.abs(P) + J;
                P && (C = C - h + m * (a ? K(n.y, d.tickRotCorr.y + 8 * m) : n.x));
                d.axisTitleMargin = K(V, C);
                d.getMaxLabelDimensions && (d.maxLabelDimensions = d.getMaxLabelDimensions(g, p));
                "colorAxis" !== v && (a = this.tickSize("tick"), O[f] = Math.max(O[f], (d.axisTitleMargin || 0) + G + m * d.offset, C, p && p.length && a ? a[0] + m * d.offset : 0), r = !d.axisLine || r.offset ? 0 : 2 * Math.floor(d.axisLine.strokeWidth() / 2), c[D] = Math.max(c[D],
                    r));
                l(this, "afterGetOffset")
            };
            a.prototype.getLinePath = function(b) {
                var d = this.chart,
                    c = this.opposite,
                    k = this.offset,
                    e = this.horiz,
                    a = this.left + (c ? this.width : 0) + k;
                k = d.chartHeight - this.bottom - (c ? this.height : 0) + k;
                c && (b *= -1);
                return d.renderer.crispLine([
                    ["M", e ? this.left : a, e ? k : this.top],
                    ["L", e ? d.chartWidth - this.right : a, e ? k : d.chartHeight - this.bottom]
                ], b)
            };
            a.prototype.renderLine = function() {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.chart.styledMode ||
                    this.axisLine.attr({
                        stroke: this.options.lineColor,
                        "stroke-width": this.options.lineWidth,
                        zIndex: 7
                    }))
            };
            a.prototype.getTitlePosition = function() {
                var b = this.horiz,
                    d = this.left,
                    c = this.top,
                    k = this.len,
                    e = this.options.title,
                    a = b ? d : c,
                    r = this.opposite,
                    f = this.offset,
                    g = e.x,
                    p = e.y,
                    v = this.axisTitle,
                    w = this.chart.renderer.fontMetrics(e.style.fontSize, v);
                v = Math.max(v.getBBox(null, 0).height - w.h - 1, 0);
                k = {
                    low: a + (b ? 0 : k),
                    middle: a + k / 2,
                    high: a + (b ? k : 0)
                } [e.align];
                d = (b ? c + this.height : d) + (b ? 1 : -1) * (r ? -1 : 1) * this.axisTitleMargin + [-v, v,
                    w.f, -v
                ][this.side];
                b = {
                    x: b ? k + g : d + (r ? this.width : 0) + f + g,
                    y: b ? d + p - (r ? this.height : 0) + f : k + p
                };
                l(this, "afterGetTitlePosition", {
                    titlePosition: b
                });
                return b
            };
            a.prototype.renderMinorTick = function(b, d) {
                var c = this.minorTicks;
                c[b] || (c[b] = new I(this, b, "minor"));
                d && c[b].isNew && c[b].render(null, !0);
                c[b].render(null, !1, 1)
            };
            a.prototype.renderTick = function(b, d, c) {
                var k = this.ticks;
                if (!this.isLinked || b >= this.min && b <= this.max || this.grid && this.grid.isColumn) k[b] || (k[b] = new I(this, b)), c && k[b].isNew && k[b].render(d, !0, -1), k[b].render(d)
            };
            a.prototype.render = function() {
                var b = this,
                    d = b.chart,
                    c = b.logarithmic,
                    e = b.options,
                    a = b.isLinked,
                    r = b.tickPositions,
                    f = b.axisTitle,
                    g = b.ticks,
                    p = b.minorTicks,
                    w = b.alternateBands,
                    A = e.stackLabels,
                    D = e.alternateGridColor,
                    C = b.tickmarkOffset,
                    h = b.axisLine,
                    n = b.showAxis,
                    K = q(d.renderer.globalAnimation),
                    O, m;
                b.labelEdge.length = 0;
                b.overlap = !1;
                [g, p, w].forEach(function(b) {
                    k(b, function(b) {
                        b.isActive = !1
                    })
                });
                if (b.hasData() || a) {
                    var z = b.chart.hasRendered && b.old && v(b.old.min);
                    b.minorTickInterval && !b.categories && b.getMinorTickPositions().forEach(function(d) {
                        b.renderMinorTick(d,
                            z)
                    });
                    r.length && (r.forEach(function(d, c) {
                        b.renderTick(d, c, z)
                    }), C && (0 === b.min || b.single) && (g[-1] || (g[-1] = new I(b, -1, null, !0)), g[-1].render(-1)));
                    D && r.forEach(function(k, e) {
                        m = "undefined" !== typeof r[e + 1] ? r[e + 1] + C : b.max - C;
                        0 === e % 2 && k < b.max && m <= b.max + (d.polar ? -C : C) && (w[k] || (w[k] = new F.PlotLineOrBand(b)), O = k + C, w[k].options = {
                            from: c ? c.lin2log(O) : O,
                            to: c ? c.lin2log(m) : m,
                            color: D,
                            className: "highcharts-alternate-grid"
                        }, w[k].render(), w[k].isActive = !0)
                    });
                    b._addedPlotLB || (b._addedPlotLB = !0, (e.plotLines || []).concat(e.plotBands || []).forEach(function(d) {
                        b.addPlotBandOrLine(d)
                    }))
                } [g, p, w].forEach(function(b) {
                    var c = [],
                        e = K.duration;
                    k(b, function(b, d) {
                        b.isActive || (b.render(d, !1, 0), b.isActive = !1, c.push(d))
                    });
                    P(function() {
                        for (var d = c.length; d--;) b[c[d]] && !b[c[d]].isActive && (b[c[d]].destroy(), delete b[c[d]])
                    }, b !== w && d.hasRendered && e ? e : 0)
                });
                h && (h[h.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(h.strokeWidth())
                }), h.isPlaced = !0, h[n ? "show" : "hide"](n));
                f && n && (e = b.getTitlePosition(), v(e.y) ? (f[f.isNew ? "attr" : "animate"](e), f.isNew = !1) : (f.attr("y",
                    -9999), f.isNew = !0));
                A && A.enabled && b.stacking && b.stacking.renderStackTotals();
                b.old = {
                    len: b.len,
                    max: b.max,
                    min: b.min,
                    transA: b.transA,
                    userMax: b.userMax,
                    userMin: b.userMin
                };
                b.isDirty = !1;
                l(this, "afterRender")
            };
            a.prototype.redraw = function() {
                this.visible && (this.render(), this.plotLinesAndBands.forEach(function(b) {
                    b.render()
                }));
                this.series.forEach(function(b) {
                    b.isDirty = !0
                })
            };
            a.prototype.getKeepProps = function() {
                return this.keepProps || a.keepProps
            };
            a.prototype.destroy = function(b) {
                var d = this,
                    c = d.plotLinesAndBands,
                    e = this.eventOptions;
                l(this, "destroy", {
                    keepEvents: b
                });
                b || r(d);
                [d.ticks, d.minorTicks, d.alternateBands].forEach(function(b) {
                    G(b)
                });
                if (c)
                    for (b = c.length; b--;) c[b].destroy();
                "axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function(b) {
                    d[b] && (d[b] = d[b].destroy())
                });
                for (var a in d.plotLinesAndBandsGroups) d.plotLinesAndBandsGroups[a] = d.plotLinesAndBandsGroups[a].destroy();
                k(d, function(b, c) {
                    -1 === d.getKeepProps().indexOf(c) && delete d[c]
                });
                this.eventOptions = e
            };
            a.prototype.drawCrosshair =
                function(b, d) {
                    var c = this.crosshair,
                        k = K(c && c.snap, !0),
                        a = this.chart,
                        r, f = this.cross;
                    l(this, "drawCrosshair", {
                        e: b,
                        point: d
                    });
                    b || (b = this.cross && this.cross.e);
                    if (c && !1 !== (e(d) || !k)) {
                        k ? e(d) && (r = K("colorAxis" !== this.coll ? d.crosshairPos : null, this.isXAxis ? d.plotX : this.len - d.plotY)) : r = b && (this.horiz ? b.chartX - this.pos : this.len - b.chartY + this.pos);
                        if (e(r)) {
                            var g = {
                                value: d && (this.isXAxis ? d.x : K(d.stackY, d.y)),
                                translatedValue: r
                            };
                            a.polar && p(g, {
                                isCrosshair: !0,
                                chartX: b && b.chartX,
                                chartY: b && b.chartY,
                                point: d
                            });
                            g = this.getPlotLinePath(g) ||
                                null
                        }
                        if (!e(g)) {
                            this.hideCrosshair();
                            return
                        }
                        k = this.categories && !this.isRadial;
                        f || (this.cross = f = a.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (k ? "category " : "thin ") + (c.className || "")).attr({
                            zIndex: K(c.zIndex, 2)
                        }).add(), a.styledMode || (f.attr({
                            stroke: c.color || (k ? B.parse("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                            "stroke-width": K(c.width, 1)
                        }).css({
                            "pointer-events": "none"
                        }), c.dashStyle && f.attr({
                            dashstyle: c.dashStyle
                        })));
                        f.show().attr({
                            d: g
                        });
                        k && !c.width && f.attr({
                            "stroke-width": this.transA
                        });
                        this.cross.e = b
                    } else this.hideCrosshair();
                    l(this, "afterDrawCrosshair", {
                        e: b,
                        point: d
                    })
                };
            a.prototype.hideCrosshair = function() {
                this.cross && this.cross.hide();
                l(this, "afterHideCrosshair")
            };
            a.prototype.hasVerticalPanning = function() {
                var b = this.chart.options.chart.panning;
                return !!(b && b.enabled && /y/.test(b.type))
            };
            a.prototype.validatePositiveValue = function(b) {
                return v(b) && 0 < b
            };
            a.prototype.update = function(b, d) {
                var c = this.chart;
                b = D(this.userOptions, b);
                this.destroy(!0);
                this.init(c, b);
                c.isDirtyBox = !0;
                K(d, !0) && c.redraw()
            };
            a.prototype.remove = function(b) {
                for (var d = this.chart, c = this.coll, k = this.series, e = k.length; e--;) k[e] && k[e].remove(!1);
                J(d.axes, this);
                J(d[c], this);
                d[c].forEach(function(b, d) {
                    b.options.index = b.userOptions.index = d
                });
                this.destroy();
                d.isDirtyBox = !0;
                K(b, !0) && d.redraw()
            };
            a.prototype.setTitle = function(b, d) {
                this.update({
                    title: b
                }, d)
            };
            a.prototype.setCategories = function(b, d) {
                this.update({
                    categories: b
                }, d)
            };
            a.defaultOptions = t.defaultXAxisOptions;
            a.keepProps = "extKey hcEvents names series userMax userMin".split(" ");
            return a
        }();
        "";
        return a
    });
    N(a, "Core/Axis/DateTimeAxis.js", [a["Core/Utilities.js"]], function(a) {
        var E = a.addEvent,
            B = a.getMagnitude,
            H = a.normalizeTickInterval,
            y = a.timeUnits,
            F;
        (function(a) {
            function x() {
                return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
            }

            function q(c) {
                "datetime" !== c.userOptions.type ? this.dateTime = void 0 : this.dateTime || (this.dateTime = new h(this))
            }
            var m = [];
            a.compose = function(c) {
                -1 === m.indexOf(c) && (m.push(c), c.keepProps.push("dateTime"), c.prototype.getTimeTicks = x, E(c, "init",
                    q));
                return c
            };
            var h = function() {
                function c(c) {
                    this.axis = c
                }
                c.prototype.normalizeTimeTickInterval = function(c, a) {
                    var g = a || [
                        ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                        ["second", [1, 2, 5, 10, 15, 30]],
                        ["minute", [1, 2, 5, 10, 15, 30]],
                        ["hour", [1, 2, 3, 4, 6, 8, 12]],
                        ["day", [1, 2]],
                        ["week", [1, 2]],
                        ["month", [1, 2, 3, 4, 6]],
                        ["year", null]
                    ];
                    a = g[g.length - 1];
                    var f = y[a[0]],
                        e = a[1],
                        h;
                    for (h = 0; h < g.length && !(a = g[h], f = y[a[0]], e = a[1], g[h + 1] && c <= (f * e[e.length - 1] + y[g[h + 1][0]]) / 2); h++);
                    f === y.year && c < 5 * f && (e = [1, 2, 5]);
                    c = H(c / f, e, "year" === a[0] ?
                        Math.max(B(c / f), 1) : 1);
                    return {
                        unitRange: f,
                        count: c,
                        unitName: a[0]
                    }
                };
                c.prototype.getXDateFormat = function(c, a) {
                    var g = this.axis;
                    return g.closestPointRange ? g.chart.time.getDateFormat(g.closestPointRange, c, g.options.startOfWeek, a) || a.year : a.day
                };
                return c
            }();
            a.Additions = h
        })(F || (F = {}));
        return F
    });
    N(a, "Core/Axis/LogarithmicAxis.js", [a["Core/Utilities.js"]], function(a) {
        var E = a.addEvent,
            B = a.getMagnitude,
            H = a.normalizeTickInterval,
            y = a.pick,
            F;
        (function(a) {
            function x(c) {
                var a = this.logarithmic;
                "logarithmic" !== c.userOptions.type ?
                    this.logarithmic = void 0 : a || (this.logarithmic = new h(this))
            }

            function q() {
                var c = this.logarithmic;
                c && (this.lin2val = function(a) {
                    return c.lin2log(a)
                }, this.val2lin = function(a) {
                    return c.log2lin(a)
                })
            }
            var m = [];
            a.compose = function(c) {
                -1 === m.indexOf(c) && (m.push(c), c.keepProps.push("logarithmic"), E(c, "init", x), E(c, "afterInit", q));
                return c
            };
            var h = function() {
                function c(c) {
                    this.axis = c
                }
                c.prototype.getLogTickPositions = function(c, a, g, f) {
                    var e = this.axis,
                        h = e.len,
                        n = e.options,
                        m = [];
                    f || (this.minorAutoInterval = void 0);
                    if (.5 <=
                        c) c = Math.round(c), m = e.getLinearTickPositions(c, a, g);
                    else if (.08 <= c) {
                        var p = Math.floor(a),
                            l, w = n = void 0;
                        for (h = .3 < c ? [1, 2, 4] : .15 < c ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; p < g + 1 && !w; p++) {
                            var b = h.length;
                            for (l = 0; l < b && !w; l++) {
                                var v = this.log2lin(this.lin2log(p) * h[l]);
                                v > a && (!f || n <= g) && "undefined" !== typeof n && m.push(n);
                                n > g && (w = !0);
                                n = v
                            }
                        }
                    } else a = this.lin2log(a), g = this.lin2log(g), c = f ? e.getMinorTickInterval() : n.tickInterval, c = y("auto" === c ? null : c, this.minorAutoInterval, n.tickPixelInterval / (f ? 5 : 1) * (g - a) / ((f ? h / e.tickPositions.length :
                        h) || 1)), c = H(c, void 0, B(c)), m = e.getLinearTickPositions(c, a, g).map(this.log2lin), f || (this.minorAutoInterval = c / 5);
                    f || (e.tickInterval = c);
                    return m
                };
                c.prototype.lin2log = function(c) {
                    return Math.pow(10, c)
                };
                c.prototype.log2lin = function(c) {
                    return Math.log(c) / Math.LN10
                };
                return c
            }();
            a.Additions = h
        })(F || (F = {}));
        return F
    });
    N(a, "Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js", [a["Core/Utilities.js"]], function(a) {
        var E = a.erase,
            B = a.extend,
            H = a.isNumber,
            y;
        (function(a) {
            var t = [],
                x;
            a.compose = function(a, h) {
                x || (x = a); - 1 ===
                    t.indexOf(h) && (t.push(h), B(h.prototype, q.prototype));
                return h
            };
            var q = function() {
                function a() {}
                a.prototype.getPlotBandPath = function(a, c, n) {
                    void 0 === n && (n = this.options);
                    var h = this.getPlotLinePath({
                            value: c,
                            force: !0,
                            acrossPanes: n.acrossPanes
                        }),
                        g = [],
                        f = this.horiz;
                    c = !H(this.min) || !H(this.max) || a < this.min && c < this.min || a > this.max && c > this.max;
                    a = this.getPlotLinePath({
                        value: a,
                        force: !0,
                        acrossPanes: n.acrossPanes
                    });
                    n = 1;
                    if (a && h) {
                        if (c) {
                            var e = a.toString() === h.toString();
                            n = 0
                        }
                        for (c = 0; c < a.length; c += 2) {
                            var m = a[c],
                                q = a[c +
                                    1],
                                M = h[c],
                                p = h[c + 1];
                            "M" !== m[0] && "L" !== m[0] || "M" !== q[0] && "L" !== q[0] || "M" !== M[0] && "L" !== M[0] || "M" !== p[0] && "L" !== p[0] || (f && M[1] === m[1] ? (M[1] += n, p[1] += n) : f || M[2] !== m[2] || (M[2] += n, p[2] += n), g.push(["M", m[1], m[2]], ["L", q[1], q[2]], ["L", p[1], p[2]], ["L", M[1], M[2]], ["Z"]));
                            g.isFlat = e
                        }
                    }
                    return g
                };
                a.prototype.addPlotBand = function(a) {
                    return this.addPlotBandOrLine(a, "plotBands")
                };
                a.prototype.addPlotLine = function(a) {
                    return this.addPlotBandOrLine(a, "plotLines")
                };
                a.prototype.addPlotBandOrLine = function(a, c) {
                    var h = this,
                        m = this.userOptions,
                        g = new x(this, a);
                    this.visible && (g = g.render());
                    if (g) {
                        this._addedPlotLB || (this._addedPlotLB = !0, (m.plotLines || []).concat(m.plotBands || []).forEach(function(c) {
                            h.addPlotBandOrLine(c)
                        }));
                        if (c) {
                            var f = m[c] || [];
                            f.push(a);
                            m[c] = f
                        }
                        this.plotLinesAndBands.push(g)
                    }
                    return g
                };
                a.prototype.removePlotBandOrLine = function(a) {
                    var c = this.plotLinesAndBands,
                        h = this.options,
                        m = this.userOptions;
                    if (c) {
                        for (var g = c.length; g--;) c[g].id === a && c[g].destroy();
                        [h.plotLines || [], m.plotLines || [], h.plotBands || [], m.plotBands || []].forEach(function(c) {
                            for (g = c.length; g--;)(c[g] || {}).id === a && E(c, c[g])
                        })
                    }
                };
                a.prototype.removePlotBand = function(a) {
                    this.removePlotBandOrLine(a)
                };
                a.prototype.removePlotLine = function(a) {
                    this.removePlotBandOrLine(a)
                };
                return a
            }()
        })(y || (y = {}));
        return y
    });
    N(a, "Core/Axis/PlotLineOrBand/PlotLineOrBand.js", [a["Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js"], a["Core/Utilities.js"]], function(a, t) {
        var E = t.arrayMax,
            H = t.arrayMin,
            y = t.defined,
            F = t.destroyObjectProperties,
            I = t.erase,
            x = t.fireEvent,
            q = t.merge,
            m = t.objectEach,
            h = t.pick;
        t = function() {
            function c(c, a) {
                this.axis = c;
                a && (this.options = a, this.id = a.id)
            }
            c.compose = function(h) {
                return a.compose(c, h)
            };
            c.prototype.render = function() {
                x(this, "render");
                var c = this,
                    a = c.axis,
                    g = a.horiz,
                    f = a.logarithmic,
                    e = c.options,
                    G = e.color,
                    J = h(e.zIndex, 0),
                    M = e.events,
                    p = {},
                    l = a.chart.renderer,
                    w = e.label,
                    b = c.label,
                    v = e.to,
                    d = e.from,
                    D = e.value,
                    C = c.svgElem,
                    k = [],
                    K = y(d) && y(v);
                k = y(D);
                var O = !C,
                    r = {
                        "class": "highcharts-plot-" + (K ? "band " : "line ") + (e.className || "")
                    },
                    A = K ? "bands" : "lines";
                f && (d = f.log2lin(d), v = f.log2lin(v),
                    D = f.log2lin(D));
                a.chart.styledMode || (k ? (r.stroke = G || "#999999", r["stroke-width"] = h(e.width, 1), e.dashStyle && (r.dashstyle = e.dashStyle)) : K && (r.fill = G || "#e6ebf5", e.borderWidth && (r.stroke = e.borderColor, r["stroke-width"] = e.borderWidth)));
                p.zIndex = J;
                A += "-" + J;
                (f = a.plotLinesAndBandsGroups[A]) || (a.plotLinesAndBandsGroups[A] = f = l.g("plot-" + A).attr(p).add());
                O && (c.svgElem = C = l.path().attr(r).add(f));
                if (k) k = a.getPlotLinePath({
                    value: D,
                    lineWidth: C.strokeWidth(),
                    acrossPanes: e.acrossPanes
                });
                else if (K) k = a.getPlotBandPath(d,
                    v, e);
                else return;
                !c.eventsAdded && M && (m(M, function(b, d) {
                    C.on(d, function(b) {
                        M[d].apply(c, [b])
                    })
                }), c.eventsAdded = !0);
                (O || !C.d) && k && k.length ? C.attr({
                    d: k
                }) : C && (k ? (C.show(!0), C.animate({
                    d: k
                })) : C.d && (C.hide(), b && (c.label = b = b.destroy())));
                w && (y(w.text) || y(w.formatter)) && k && k.length && 0 < a.width && 0 < a.height && !k.isFlat ? (w = q({
                    align: g && K && "center",
                    x: g ? !K && 4 : 10,
                    verticalAlign: !g && K && "middle",
                    y: g ? K ? 16 : 10 : K ? 6 : -4,
                    rotation: g && !K && 90
                }, w), this.renderLabel(w, k, K, J)) : b && b.hide();
                return c
            };
            c.prototype.renderLabel = function(c,
                a, g, f) {
                var e = this.axis,
                    h = e.chart.renderer,
                    n = this.label;
                n || (this.label = n = h.text(this.getLabelText(c), 0, 0, c.useHTML).attr({
                    align: c.textAlign || c.align,
                    rotation: c.rotation,
                    "class": "highcharts-plot-" + (g ? "band" : "line") + "-label " + (c.className || ""),
                    zIndex: f
                }).add(), e.chart.styledMode || n.css(q({
                    textOverflow: "ellipsis"
                }, c.style)));
                f = a.xBounds || [a[0][1], a[1][1], g ? a[2][1] : a[0][1]];
                a = a.yBounds || [a[0][2], a[1][2], g ? a[2][2] : a[0][2]];
                g = H(f);
                h = H(a);
                n.align(c, !1, {
                    x: g,
                    y: h,
                    width: E(f) - g,
                    height: E(a) - h
                });
                n.alignValue && "left" !==
                    n.alignValue || n.css({
                        width: (90 === n.rotation ? e.height - (n.alignAttr.y - e.top) : e.width - (n.alignAttr.x - e.left)) + "px"
                    });
                n.show(!0)
            };
            c.prototype.getLabelText = function(c) {
                return y(c.formatter) ? c.formatter.call(this) : c.text
            };
            c.prototype.destroy = function() {
                I(this.axis.plotLinesAndBands, this);
                delete this.axis;
                F(this)
            };
            return c
        }();
        "";
        "";
        return t
    });
    N(a, "Core/Tooltip.js", [a["Core/FormatUtilities.js"], a["Core/Globals.js"], a["Core/Renderer/RendererUtilities.js"], a["Core/Renderer/RendererRegistry.js"], a["Core/Utilities.js"]],
        function(a, t, B, H, y) {
            var E = a.format,
                I = t.doc,
                x = B.distribute,
                q = y.addEvent,
                m = y.clamp,
                h = y.css,
                c = y.defined,
                n = y.discardElement,
                z = y.extend,
                g = y.fireEvent,
                f = y.isArray,
                e = y.isNumber,
                G = y.isString,
                J = y.merge,
                M = y.pick,
                p = y.splat,
                l = y.syncTimeout;
            a = function() {
                function a(b, c) {
                    this.allowShared = !0;
                    this.container = void 0;
                    this.crosshairs = [];
                    this.distance = 0;
                    this.isHidden = !0;
                    this.isSticky = !1;
                    this.now = {};
                    this.options = {};
                    this.outside = !1;
                    this.chart = b;
                    this.init(b, c)
                }
                a.prototype.applyFilter = function() {
                    var b = this.chart;
                    b.renderer.definition({
                        tagName: "filter",
                        attributes: {
                            id: "drop-shadow-" + b.index,
                            opacity: .5
                        },
                        children: [{
                            tagName: "feGaussianBlur",
                            attributes: {
                                "in": "SourceAlpha",
                                stdDeviation: 1
                            }
                        }, {
                            tagName: "feOffset",
                            attributes: {
                                dx: 1,
                                dy: 1
                            }
                        }, {
                            tagName: "feComponentTransfer",
                            children: [{
                                tagName: "feFuncA",
                                attributes: {
                                    type: "linear",
                                    slope: .3
                                }
                            }]
                        }, {
                            tagName: "feMerge",
                            children: [{
                                tagName: "feMergeNode"
                            }, {
                                tagName: "feMergeNode",
                                attributes: {
                                    "in": "SourceGraphic"
                                }
                            }]
                        }]
                    })
                };
                a.prototype.bodyFormatter = function(b) {
                    return b.map(function(b) {
                        var d = b.series.tooltipOptions;
                        return (d[(b.point.formatPrefix ||
                            "point") + "Formatter"] || b.point.tooltipFormatter).call(b.point, d[(b.point.formatPrefix || "point") + "Format"] || "")
                    })
                };
                a.prototype.cleanSplit = function(b) {
                    this.chart.series.forEach(function(c) {
                        var d = c && c.tt;
                        d && (!d.isActive || b ? c.tt = d.destroy() : d.isActive = !1)
                    })
                };
                a.prototype.defaultFormatter = function(b) {
                    var c = this.points || p(this);
                    var d = [b.tooltipFooterHeaderFormatter(c[0])];
                    d = d.concat(b.bodyFormatter(c));
                    d.push(b.tooltipFooterHeaderFormatter(c[0], !0));
                    return d
                };
                a.prototype.destroy = function() {
                    this.label && (this.label =
                        this.label.destroy());
                    this.split && this.tt && (this.cleanSplit(!0), this.tt = this.tt.destroy());
                    this.renderer && (this.renderer = this.renderer.destroy(), n(this.container));
                    y.clearTimeout(this.hideTimer);
                    y.clearTimeout(this.tooltipTimeout)
                };
                a.prototype.getAnchor = function(b, c) {
                    var d = this.chart,
                        a = d.pointer,
                        e = d.inverted,
                        k = d.plotTop,
                        l = d.plotLeft,
                        f, r, g = 0,
                        v = 0;
                    b = p(b);
                    this.followPointer && c ? ("undefined" === typeof c.chartX && (c = a.normalize(c)), a = [c.chartX - l, c.chartY - k]) : b[0].tooltipPos ? a = b[0].tooltipPos : (b.forEach(function(b) {
                        f =
                            b.series.yAxis;
                        r = b.series.xAxis;
                        g += b.plotX || 0;
                        v += b.plotLow ? (b.plotLow + (b.plotHigh || 0)) / 2 : b.plotY || 0;
                        r && f && (e ? (g += k + d.plotHeight - r.len - r.pos, v += l + d.plotWidth - f.len - f.pos) : (g += r.pos - l, v += f.pos - k))
                    }), g /= b.length, v /= b.length, a = [e ? d.plotWidth - v : g, e ? d.plotHeight - g : v], this.shared && 1 < b.length && c && (e ? a[0] = c.chartX - l : a[1] = c.chartY - k));
                    return a.map(Math.round)
                };
                a.prototype.getLabel = function() {
                    var b = this,
                        a = this.chart.styledMode,
                        d = this.options,
                        e = this.split && this.allowShared,
                        l = "tooltip" + (c(d.className) ? " " + d.className :
                            ""),
                        k = d.style.pointerEvents || (!this.followPointer && d.stickOnContact ? "auto" : "none"),
                        f = function() {
                            b.inContact = !0
                        },
                        g = function(d) {
                            var c = b.chart.hoverSeries;
                            b.inContact = b.shouldStickOnContact() && b.chart.pointer.inClass(d.relatedTarget, "highcharts-tooltip");
                            if (!b.inContact && c && c.onMouseOut) c.onMouseOut()
                        },
                        r, p = this.chart.renderer;
                    if (b.label) {
                        var w = !b.label.hasClass("highcharts-label");
                        (e && !w || !e && w) && b.destroy()
                    }
                    if (!this.label) {
                        if (this.outside) {
                            w = this.chart.options.chart.style;
                            var n = H.getRendererType();
                            this.container = r = t.doc.createElement("div");
                            r.className = "highcharts-tooltip-container";
                            h(r, {
                                position: "absolute",
                                top: "1px",
                                pointerEvents: k,
                                zIndex: Math.max(this.options.style.zIndex || 0, (w && w.zIndex || 0) + 3)
                            });
                            q(r, "mouseenter", f);
                            q(r, "mouseleave", g);
                            t.doc.body.appendChild(r);
                            this.renderer = p = new n(r, 0, 0, w, void 0, void 0, p.styledMode)
                        }
                        e ? this.label = p.g(l) : (this.label = p.label("", 0, 0, d.shape, void 0, void 0, d.useHTML, void 0, l).attr({
                            padding: d.padding,
                            r: d.borderRadius
                        }), a || this.label.attr({
                            fill: d.backgroundColor,
                            "stroke-width": d.borderWidth
                        }).css(d.style).css({
                            pointerEvents: k
                        }).shadow(d.shadow));
                        a && d.shadow && (this.applyFilter(), this.label.attr({
                            filter: "url(#drop-shadow-" + this.chart.index + ")"
                        }));
                        if (b.outside && !b.split) {
                            var u = this.label,
                                m = u.xSetter,
                                z = u.ySetter;
                            u.xSetter = function(d) {
                                m.call(u, b.distance);
                                r.style.left = d + "px"
                            };
                            u.ySetter = function(d) {
                                z.call(u, b.distance);
                                r.style.top = d + "px"
                            }
                        }
                        this.label.on("mouseenter", f).on("mouseleave", g).attr({
                            zIndex: 8
                        }).add()
                    }
                    return this.label
                };
                a.prototype.getPosition = function(b,
                    c, d) {
                    var a = this.chart,
                        e = this.distance,
                        k = {},
                        l = a.inverted && d.h || 0,
                        f = this.outside,
                        r = f ? I.documentElement.clientWidth - 2 * e : a.chartWidth,
                        g = f ? Math.max(I.body.scrollHeight, I.documentElement.scrollHeight, I.body.offsetHeight, I.documentElement.offsetHeight, I.documentElement.clientHeight) : a.chartHeight,
                        p = a.pointer.getChartPosition(),
                        v = function(k) {
                            var l = "x" === k;
                            return [k, l ? r : g, l ? b : c].concat(f ? [l ? b * p.scaleX : c * p.scaleY, l ? p.left - e + (d.plotX + a.plotLeft) * p.scaleX : p.top - e + (d.plotY + a.plotTop) * p.scaleY, 0, l ? r : g] : [l ? b : c, l ?
                                d.plotX + a.plotLeft : d.plotY + a.plotTop, l ? a.plotLeft : a.plotTop, l ? a.plotLeft + a.plotWidth : a.plotTop + a.plotHeight
                            ])
                        },
                        w = v("y"),
                        h = v("x"),
                        n;
                    v = !!d.negative;
                    !a.polar && a.hoverSeries && a.hoverSeries.yAxis && a.hoverSeries.yAxis.reversed && (v = !v);
                    var m = !this.followPointer && M(d.ttBelow, !a.inverted === v),
                        q = function(b, d, c, a, r, g, v) {
                            var w = f ? "y" === b ? e * p.scaleY : e * p.scaleX : e,
                                h = (c - a) / 2,
                                A = a < r - e,
                                u = r + e + a < d,
                                D = r - w - c + h;
                            r = r + w - h;
                            if (m && u) k[b] = r;
                            else if (!m && A) k[b] = D;
                            else if (A) k[b] = Math.min(v - a, 0 > D - l ? D : D - l);
                            else if (u) k[b] = Math.max(g, r +
                                l + c > d ? r : r + l);
                            else return !1
                        },
                        z = function(b, d, c, a, r) {
                            var l;
                            r < e || r > d - e ? l = !1 : k[b] = r < c / 2 ? 1 : r > d - a / 2 ? d - a - 2 : r - c / 2;
                            return l
                        },
                        Q = function(b) {
                            var d = w;
                            w = h;
                            h = d;
                            n = b
                        },
                        G = function() {
                            !1 !== q.apply(0, w) ? !1 !== z.apply(0, h) || n || (Q(!0), G()) : n ? k.x = k.y = 0 : (Q(!0), G())
                        };
                    (a.inverted || 1 < this.len) && Q();
                    G();
                    return k
                };
                a.prototype.hide = function(b) {
                    var c = this;
                    y.clearTimeout(this.hideTimer);
                    b = M(b, this.options.hideDelay);
                    this.isHidden || (this.hideTimer = l(function() {
                        c.getLabel().fadeOut(b ? void 0 : b);
                        c.isHidden = !0
                    }, b))
                };
                a.prototype.init = function(b,
                    c) {
                    this.chart = b;
                    this.options = c;
                    this.crosshairs = [];
                    this.now = {
                        x: 0,
                        y: 0
                    };
                    this.isHidden = !0;
                    this.split = c.split && !b.inverted && !b.polar;
                    this.shared = c.shared || this.split;
                    this.outside = M(c.outside, !(!b.scrollablePixelsX && !b.scrollablePixelsY))
                };
                a.prototype.shouldStickOnContact = function() {
                    return !(this.followPointer || !this.options.stickOnContact)
                };
                a.prototype.isStickyOnContact = function() {
                    return !(!this.shouldStickOnContact() || !this.inContact)
                };
                a.prototype.move = function(b, c, d, a) {
                    var e = this,
                        k = e.now,
                        l = !1 !== e.options.animation &&
                        !e.isHidden && (1 < Math.abs(b - k.x) || 1 < Math.abs(c - k.y)),
                        f = e.followPointer || 1 < e.len;
                    z(k, {
                        x: l ? (2 * k.x + b) / 3 : b,
                        y: l ? (k.y + c) / 2 : c,
                        anchorX: f ? void 0 : l ? (2 * k.anchorX + d) / 3 : d,
                        anchorY: f ? void 0 : l ? (k.anchorY + a) / 2 : a
                    });
                    e.getLabel().attr(k);
                    e.drawTracker();
                    l && (y.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
                        e && e.move(b, c, d, a)
                    }, 32))
                };
                a.prototype.refresh = function(b, c) {
                    var d = this.chart,
                        a = this.options,
                        e = p(b),
                        k = e[0],
                        l = [],
                        w = a.formatter || this.defaultFormatter,
                        r = this.shared,
                        v = d.styledMode,
                        h = {};
                    if (a.enabled) {
                        y.clearTimeout(this.hideTimer);
                        this.allowShared = !(!f(b) && b.series && b.series.noSharedTooltip);
                        this.followPointer = !this.split && k.series.tooltipOptions.followPointer;
                        b = this.getAnchor(b, c);
                        var n = b[0],
                            u = b[1];
                        r && this.allowShared ? (d.pointer.applyInactiveState(e), e.forEach(function(b) {
                            b.setState("hover");
                            l.push(b.getLabelConfig())
                        }), h = {
                            x: k.category,
                            y: k.y
                        }, h.points = l) : h = k.getLabelConfig();
                        this.len = l.length;
                        w = w.call(h, this);
                        r = k.series;
                        this.distance = M(r.tooltipOptions.distance, 16);
                        if (!1 === w) this.hide();
                        else {
                            if (this.split && this.allowShared) this.renderSplit(w,
                                e);
                            else {
                                var m = n,
                                    q = u;
                                c && d.pointer.isDirectTouch && (m = c.chartX - d.plotLeft, q = c.chartY - d.plotTop);
                                if (d.polar || !1 === r.options.clip || e.some(function(b) {
                                        return b.series.shouldShowTooltip(m, q)
                                    })) c = this.getLabel(), a.style.width && !v || c.css({
                                    width: this.chart.spacingBox.width + "px"
                                }), c.attr({
                                    text: w && w.join ? w.join("") : w
                                }), c.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + M(k.colorIndex, r.colorIndex)), v || c.attr({
                                    stroke: a.borderColor || k.color || r.color || "#666666"
                                }), this.updatePosition({
                                    plotX: n,
                                    plotY: u,
                                    negative: k.negative,
                                    ttBelow: k.ttBelow,
                                    h: b[2] || 0
                                });
                                else {
                                    this.hide();
                                    return
                                }
                            }
                            this.isHidden && this.label && this.label.attr({
                                opacity: 1
                            }).show();
                            this.isHidden = !1
                        }
                        g(this, "refresh")
                    }
                };
                a.prototype.renderSplit = function(b, c) {
                    function d(b, d, c, e, k) {
                        void 0 === k && (k = !0);
                        c ? (d = y ? 0 : N, b = m(b - e / 2, U.left, U.right - e - (a.outside ? B : 0))) : (d -= H, b = k ? b - e - E : b + E, b = m(b, k ? b : U.left, U.right));
                        return {
                            x: b,
                            y: d
                        }
                    }
                    var a = this,
                        e = a.chart,
                        k = a.chart,
                        l = k.chartWidth,
                        f = k.chartHeight,
                        r = k.plotHeight,
                        g = k.plotLeft,
                        p = k.plotTop,
                        w = k.pointer,
                        v = k.scrollablePixelsY;
                    v = void 0 === v ? 0 : v;
                    var h = k.scrollablePixelsX,
                        n = k.scrollingContainer;
                    n = void 0 === n ? {
                        scrollLeft: 0,
                        scrollTop: 0
                    } : n;
                    var q = n.scrollLeft;
                    n = n.scrollTop;
                    var J = k.styledMode,
                        E = a.distance,
                        Q = a.options,
                        Y = a.options.positioner,
                        U = a.outside && "number" !== typeof h ? I.documentElement.getBoundingClientRect() : {
                            left: q,
                            right: q + l,
                            top: n,
                            bottom: n + f
                        },
                        t = a.getLabel(),
                        F = this.renderer || e.renderer,
                        y = !(!e.xAxis[0] || !e.xAxis[0].opposite);
                    e = w.getChartPosition();
                    var B = e.left;
                    e = e.top;
                    var H = p + n,
                        ba = 0,
                        N = r - v;
                    G(b) && (b = [!1, b]);
                    b = b.slice(0, c.length +
                        1).reduce(function(b, e, k) {
                        if (!1 !== e && "" !== e) {
                            k = c[k - 1] || {
                                isHeader: !0,
                                plotX: c[0].plotX,
                                plotY: r,
                                series: {}
                            };
                            var l = k.isHeader,
                                f = l ? a : k.series;
                            e = e.toString();
                            var w = f.tt,
                                v = k.isHeader;
                            var h = k.series;
                            var A = "highcharts-color-" + M(k.colorIndex, h.colorIndex, "none");
                            w || (w = {
                                padding: Q.padding,
                                r: Q.borderRadius
                            }, J || (w.fill = Q.backgroundColor, w["stroke-width"] = Q.borderWidth), w = F.label("", 0, 0, Q[v ? "headerShape" : "shape"], void 0, void 0, Q.useHTML).addClass((v ? "highcharts-tooltip-header " : "") + "highcharts-tooltip-box " + A).attr(w).add(t));
                            w.isActive = !0;
                            w.attr({
                                text: e
                            });
                            J || w.css(Q.style).shadow(Q.shadow).attr({
                                stroke: Q.borderColor || k.color || h.color || "#333333"
                            });
                            f = f.tt = w;
                            v = f.getBBox();
                            e = v.width + f.strokeWidth();
                            l && (ba = v.height, N += ba, y && (H -= ba));
                            h = k.plotX;
                            h = void 0 === h ? 0 : h;
                            A = k.plotY;
                            A = void 0 === A ? 0 : A;
                            w = k.series;
                            if (k.isHeader) {
                                h = g + h;
                                var u = p + r / 2
                            } else {
                                var D = w.xAxis,
                                    C = w.yAxis;
                                h = D.pos + m(h, -E, D.len + E);
                                w.shouldShowTooltip(0, C.pos - p + A, {
                                    ignoreX: !0
                                }) && (u = C.pos + A)
                            }
                            h = m(h, U.left - E, U.right + E);
                            "number" === typeof u ? (v = v.height + 1, A = Y ? Y.call(a, e, v, k) : d(h,
                                u, l, e), b.push({
                                align: Y ? 0 : void 0,
                                anchorX: h,
                                anchorY: u,
                                boxWidth: e,
                                point: k,
                                rank: M(A.rank, l ? 1 : 0),
                                size: v,
                                target: A.y,
                                tt: f,
                                x: A.x
                            })) : f.isActive = !1
                        }
                        return b
                    }, []);
                    !Y && b.some(function(b) {
                        var d = (a.outside ? B : 0) + b.anchorX;
                        return d < U.left && d + b.boxWidth < U.right ? !0 : d < B - U.left + b.boxWidth && U.right - d > d
                    }) && (b = b.map(function(b) {
                        var c = d(b.anchorX, b.anchorY, b.point.isHeader, b.boxWidth, !1);
                        return z(b, {
                            target: c.y,
                            x: c.x
                        })
                    }));
                    a.cleanSplit();
                    x(b, N);
                    var Z = B,
                        ca = B;
                    b.forEach(function(b) {
                        var d = b.x,
                            c = b.boxWidth;
                        b = b.isHeader;
                        b || (a.outside &&
                            B + d < Z && (Z = B + d), !b && a.outside && Z + c > ca && (ca = B + d))
                    });
                    b.forEach(function(b) {
                        var d = b.x,
                            c = b.anchorX,
                            k = b.pos,
                            e = b.point.isHeader;
                        k = {
                            visibility: "undefined" === typeof k ? "hidden" : "inherit",
                            x: d,
                            y: k + H,
                            anchorX: c,
                            anchorY: b.anchorY
                        };
                        if (a.outside && d < c) {
                            var r = B - Z;
                            0 < r && (e || (k.x = d + r, k.anchorX = c + r), e && (k.x = (ca - Z) / 2, k.anchorX = c + r))
                        }
                        b.tt.attr(k)
                    });
                    b = a.container;
                    v = a.renderer;
                    a.outside && b && v && (k = t.getBBox(), v.setSize(k.width + k.x, k.height + k.y, !1), b.style.left = Z + "px", b.style.top = e + "px")
                };
                a.prototype.drawTracker = function() {
                    if (this.followPointer ||
                        !this.options.stickOnContact) this.tracker && this.tracker.destroy();
                    else {
                        var b = this.chart,
                            c = this.label,
                            d = this.shared ? b.hoverPoints : b.hoverPoint;
                        if (c && d) {
                            var a = {
                                x: 0,
                                y: 0,
                                width: 0,
                                height: 0
                            };
                            d = this.getAnchor(d);
                            var e = c.getBBox();
                            d[0] += b.plotLeft - c.translateX;
                            d[1] += b.plotTop - c.translateY;
                            a.x = Math.min(0, d[0]);
                            a.y = Math.min(0, d[1]);
                            a.width = 0 > d[0] ? Math.max(Math.abs(d[0]), e.width - d[0]) : Math.max(Math.abs(d[0]), e.width);
                            a.height = 0 > d[1] ? Math.max(Math.abs(d[1]), e.height - Math.abs(d[1])) : Math.max(Math.abs(d[1]), e.height);
                            this.tracker ? this.tracker.attr(a) : (this.tracker = c.renderer.rect(a).addClass("highcharts-tracker").add(c), b.styledMode || this.tracker.attr({
                                fill: "rgba(0,0,0,0)"
                            }))
                        }
                    }
                };
                a.prototype.styledModeFormat = function(b) {
                    return b.replace('style="font-size: 10px"', 'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class="highcharts-color-{$1.colorIndex}"')
                };
                a.prototype.tooltipFooterHeaderFormatter = function(b, c) {
                    var d = b.series,
                        a = d.tooltipOptions,
                        l = d.xAxis,
                        k = l && l.dateTime;
                    l = {
                        isFooter: c,
                        labelConfig: b
                    };
                    var f = a.xDateFormat,
                        p = a[c ? "footerFormat" : "headerFormat"];
                    g(this, "headerFormatter", l, function(c) {
                        k && !f && e(b.key) && (f = k.getXDateFormat(b.key, a.dateTimeLabelFormats));
                        k && f && (b.point && b.point.tooltipDateKeys || ["key"]).forEach(function(b) {
                            p = p.replace("{point." + b + "}", "{point." + b + ":" + f + "}")
                        });
                        d.chart.styledMode && (p = this.styledModeFormat(p));
                        c.text = E(p, {
                            point: b,
                            series: d
                        }, this.chart)
                    });
                    return l.text
                };
                a.prototype.update = function(b) {
                    this.destroy();
                    J(!0, this.chart.options.tooltip.userOptions, b);
                    this.init(this.chart, J(!0, this.options, b))
                };
                a.prototype.updatePosition = function(b) {
                    var c = this.chart,
                        d = this.options,
                        a = c.pointer,
                        e = this.getLabel();
                    a = a.getChartPosition();
                    var k = (d.positioner || this.getPosition).call(this, e.width, e.height, b),
                        l = b.plotX + c.plotLeft;
                    b = b.plotY + c.plotTop;
                    if (this.outside) {
                        d = d.borderWidth + 2 * this.distance;
                        this.renderer.setSize(e.width + d, e.height + d, !1);
                        if (1 !== a.scaleX || 1 !== a.scaleY) h(this.container, {
                            transform: "scale(" + a.scaleX + ", " + a.scaleY + ")"
                        }), l *= a.scaleX, b *= a.scaleY;
                        l += a.left -
                            k.x;
                        b += a.top - k.y
                    }
                    this.move(Math.round(k.x), Math.round(k.y || 0), l, b)
                };
                return a
            }();
            "";
            return a
        });
    N(a, "Core/Series/Point.js", [a["Core/Renderer/HTML/AST.js"], a["Core/Animation/AnimationUtilities.js"], a["Core/DefaultOptions.js"], a["Core/FormatUtilities.js"], a["Core/Utilities.js"]], function(a, t, B, H, y) {
        var E = t.animObject,
            I = B.defaultOptions,
            x = H.format,
            q = y.addEvent,
            m = y.defined,
            h = y.erase,
            c = y.extend,
            n = y.fireEvent,
            z = y.getNestedProperty,
            g = y.isArray,
            f = y.isFunction,
            e = y.isNumber,
            G = y.isObject,
            J = y.merge,
            M = y.objectEach,
            p = y.pick,
            l = y.syncTimeout,
            w = y.removeEvent,
            b = y.uniqueKey;
        t = function() {
            function v() {
                this.colorIndex = this.category = void 0;
                this.formatPrefix = "point";
                this.id = void 0;
                this.isNull = !1;
                this.percentage = this.options = this.name = void 0;
                this.selected = !1;
                this.total = this.series = void 0;
                this.visible = !0;
                this.x = void 0
            }
            v.prototype.animateBeforeDestroy = function() {
                var b = this,
                    a = {
                        x: b.startXPos,
                        opacity: 0
                    },
                    e = b.getGraphicalProps();
                e.singular.forEach(function(d) {
                    b[d] = b[d].animate("dataLabel" === d ? {
                        x: b[d].startXPos,
                        y: b[d].startYPos,
                        opacity: 0
                    } : a)
                });
                e.plural.forEach(function(d) {
                    b[d].forEach(function(d) {
                        d.element && d.animate(c({
                            x: b.startXPos
                        }, d.startYPos ? {
                            x: d.startXPos,
                            y: d.startYPos
                        } : {}))
                    })
                })
            };
            v.prototype.applyOptions = function(b, a) {
                var d = this.series,
                    k = d.options.pointValKey || d.pointValKey;
                b = v.prototype.optionsToObject.call(this, b);
                c(this, b);
                this.options = this.options ? c(this.options, b) : b;
                b.group && delete this.group;
                b.dataLabels && delete this.dataLabels;
                k && (this.y = v.prototype.getNestedProperty.call(this, k));
                this.formatPrefix = (this.isNull =
                    p(this.isValid && !this.isValid(), null === this.x || !e(this.y))) ? "null" : "point";
                this.selected && (this.state = "select");
                "name" in this && "undefined" === typeof a && d.xAxis && d.xAxis.hasNames && (this.x = d.xAxis.nameToX(this));
                "undefined" === typeof this.x && d ? this.x = "undefined" === typeof a ? d.autoIncrement() : a : e(b.x) && d.options.relativeXValue && (this.x = d.autoIncrement(b.x));
                return this
            };
            v.prototype.destroy = function() {
                function b() {
                    if (c.graphic || c.dataLabel || c.dataLabels) w(c), c.destroyElements();
                    for (r in c) c[r] = null
                }
                var c =
                    this,
                    a = c.series,
                    e = a.chart;
                a = a.options.dataSorting;
                var f = e.hoverPoints,
                    g = E(c.series.chart.renderer.globalAnimation),
                    r;
                c.legendItem && e.legend.destroyItem(c);
                f && (c.setState(), h(f, c), f.length || (e.hoverPoints = null));
                if (c === e.hoverPoint) c.onMouseOut();
                a && a.enabled ? (this.animateBeforeDestroy(), l(b, g.duration)) : b();
                e.pointCount--
            };
            v.prototype.destroyElements = function(b) {
                var d = this;
                b = d.getGraphicalProps(b);
                b.singular.forEach(function(b) {
                    d[b] = d[b].destroy()
                });
                b.plural.forEach(function(b) {
                    d[b].forEach(function(b) {
                        b.element &&
                            b.destroy()
                    });
                    delete d[b]
                })
            };
            v.prototype.firePointEvent = function(b, c, a) {
                var d = this,
                    e = this.series.options;
                (e.point.events[b] || d.options && d.options.events && d.options.events[b]) && d.importEvents();
                "click" === b && e.allowPointSelect && (a = function(b) {
                    d.select && d.select(null, b.ctrlKey || b.metaKey || b.shiftKey)
                });
                n(d, b, c, a)
            };
            v.prototype.getClassName = function() {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") +
                    ("undefined" !== typeof this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
            };
            v.prototype.getGraphicalProps = function(b) {
                var d = this,
                    c = [],
                    a = {
                        singular: [],
                        plural: []
                    },
                    e;
                b = b || {
                    graphic: 1,
                    dataLabel: 1
                };
                b.graphic && c.push("graphic", "upperGraphic", "shadowGroup");
                b.dataLabel && c.push("dataLabel", "dataLabelUpper", "connector");
                for (e = c.length; e--;) {
                    var l = c[e];
                    d[l] &&
                        a.singular.push(l)
                } ["dataLabel", "connector"].forEach(function(c) {
                    var e = c + "s";
                    b[c] && d[e] && a.plural.push(e)
                });
                return a
            };
            v.prototype.getLabelConfig = function() {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            };
            v.prototype.getNestedProperty = function(b) {
                if (b) return 0 === b.indexOf("custom.") ? z(b, this.options) : this[b]
            };
            v.prototype.getZone = function() {
                var b = this.series,
                    c = b.zones;
                b = b.zoneAxis || "y";
                var a, e = 0;
                for (a = c[e]; this[b] >= a.value;) a = c[++e];
                this.nonZonedColor || (this.nonZonedColor = this.color);
                this.color = a && a.color && !this.options.color ? a.color : this.nonZonedColor;
                return a
            };
            v.prototype.hasNewShapeType = function() {
                return (this.graphic && (this.graphic.symbolName || this.graphic.element.nodeName)) !== this.shapeType
            };
            v.prototype.init = function(d, c, a) {
                this.series = d;
                this.applyOptions(c, a);
                this.id = m(this.id) ? this.id : b();
                this.resolveColor();
                d.chart.pointCount++;
                n(this, "afterInit");
                return this
            };
            v.prototype.optionsToObject = function(b) {
                var d = this.series,
                    c = d.options.keys,
                    a = c || d.pointArrayMap || ["y"],
                    l = a.length,
                    f = {},
                    r = 0,
                    p = 0;
                if (e(b) || null === b) f[a[0]] = b;
                else if (g(b))
                    for (!c && b.length > l && (d = typeof b[0], "string" === d ? f.name = b[0] : "number" === d && (f.x = b[0]), r++); p < l;) c && "undefined" === typeof b[r] || (0 < a[p].indexOf(".") ? v.prototype.setNestedProperty(f, b[r], a[p]) : f[a[p]] = b[r]), r++, p++;
                else "object" === typeof b && (f = b, b.dataLabels && (d._hasPointLabels = !0), b.marker && (d._hasPointMarkers = !0));
                return f
            };
            v.prototype.resolveColor = function() {
                var b = this.series,
                    c = b.chart.styledMode;
                var a = b.chart.options.chart.colorCount;
                delete this.nonZonedColor;
                if (b.options.colorByPoint) {
                    if (!c) {
                        a = b.options.colors || b.chart.options.colors;
                        var e = a[b.colorCounter];
                        a = a.length
                    }
                    c = b.colorCounter;
                    b.colorCounter++;
                    b.colorCounter === a && (b.colorCounter = 0)
                } else c || (e = b.color), c = b.colorIndex;
                this.colorIndex = p(this.options.colorIndex, c);
                this.color = p(this.options.color, e)
            };
            v.prototype.setNestedProperty = function(b, c, a) {
                a.split(".").reduce(function(b,
                    d, a, e) {
                    b[d] = e.length - 1 === a ? c : G(b[d], !0) ? b[d] : {};
                    return b[d]
                }, b);
                return b
            };
            v.prototype.tooltipFormatter = function(b) {
                var d = this.series,
                    c = d.tooltipOptions,
                    a = p(c.valueDecimals, ""),
                    e = c.valuePrefix || "",
                    l = c.valueSuffix || "";
                d.chart.styledMode && (b = d.chart.tooltip.styledModeFormat(b));
                (d.pointArrayMap || ["y"]).forEach(function(d) {
                    d = "{point." + d;
                    if (e || l) b = b.replace(RegExp(d + "}", "g"), e + d + "}" + l);
                    b = b.replace(RegExp(d + "}", "g"), d + ":,." + a + "f}")
                });
                return x(b, {
                    point: this,
                    series: this.series
                }, d.chart)
            };
            v.prototype.update =
                function(b, c, a, e) {
                    function d() {
                        k.applyOptions(b);
                        var d = l && k.hasDummyGraphic;
                        d = null === k.y ? !d : d;
                        l && d && (k.graphic = l.destroy(), delete k.hasDummyGraphic);
                        G(b, !0) && (l && l.element && b && b.marker && "undefined" !== typeof b.marker.symbol && (k.graphic = l.destroy()), b && b.dataLabels && k.dataLabel && (k.dataLabel = k.dataLabel.destroy()), k.connector && (k.connector = k.connector.destroy()));
                        w = k.index;
                        r.updateParallelArrays(k, w);
                        g.data[w] = G(g.data[w], !0) || G(b, !0) ? k.options : p(b, g.data[w]);
                        r.isDirty = r.isDirtyData = !0;
                        !r.fixedBox &&
                            r.hasCartesianSeries && (f.isDirtyBox = !0);
                        "point" === g.legendType && (f.isDirtyLegend = !0);
                        c && f.redraw(a)
                    }
                    var k = this,
                        r = k.series,
                        l = k.graphic,
                        f = r.chart,
                        g = r.options,
                        w;
                    c = p(c, !0);
                    !1 === e ? d() : k.firePointEvent("update", {
                        options: b
                    }, d)
                };
            v.prototype.remove = function(b, c) {
                this.series.removePoint(this.series.data.indexOf(this), b, c)
            };
            v.prototype.select = function(b, c) {
                var d = this,
                    a = d.series,
                    e = a.chart;
                this.selectedStaging = b = p(b, !d.selected);
                d.firePointEvent(b ? "select" : "unselect", {
                    accumulate: c
                }, function() {
                    d.selected = d.options.selected =
                        b;
                    a.options.data[a.data.indexOf(d)] = d.options;
                    d.setState(b && "select");
                    c || e.getSelectedPoints().forEach(function(b) {
                        var c = b.series;
                        b.selected && b !== d && (b.selected = b.options.selected = !1, c.options.data[c.data.indexOf(b)] = b.options, b.setState(e.hoverPoints && c.options.inactiveOtherPoints ? "inactive" : ""), b.firePointEvent("unselect"))
                    })
                });
                delete this.selectedStaging
            };
            v.prototype.onMouseOver = function(b) {
                var d = this.series.chart,
                    c = d.pointer;
                b = b ? c.normalize(b) : c.getChartCoordinatesFromPoint(this, d.inverted);
                c.runPointActions(b,
                    this)
            };
            v.prototype.onMouseOut = function() {
                var b = this.series.chart;
                this.firePointEvent("mouseOut");
                this.series.options.inactiveOtherPoints || (b.hoverPoints || []).forEach(function(b) {
                    b.setState()
                });
                b.hoverPoints = b.hoverPoint = null
            };
            v.prototype.importEvents = function() {
                if (!this.hasImportedEvents) {
                    var b = this,
                        c = J(b.series.options.point, b.options).events;
                    b.events = c;
                    M(c, function(d, c) {
                        f(d) && q(b, c, d)
                    });
                    this.hasImportedEvents = !0
                }
            };
            v.prototype.setState = function(b, l) {
                var d = this.series,
                    k = this.state,
                    f = d.options.states[b ||
                        "normal"] || {},
                    g = I.plotOptions[d.type].marker && d.options.marker,
                    r = g && !1 === g.enabled,
                    w = g && g.states && g.states[b || "normal"] || {},
                    h = !1 === w.enabled,
                    v = this.marker || {},
                    u = d.chart,
                    D = g && d.markerAttribs,
                    m = d.halo,
                    q, z = d.stateMarkerGraphic;
                b = b || "";
                if (!(b === this.state && !l || this.selected && "select" !== b || !1 === f.enabled || b && (h || r && !1 === w.enabled) || b && v.states && v.states[b] && !1 === v.states[b].enabled)) {
                    this.state = b;
                    D && (q = d.markerAttribs(this, b));
                    if (this.graphic && !this.hasDummyGraphic) {
                        k && this.graphic.removeClass("highcharts-point-" +
                            k);
                        b && this.graphic.addClass("highcharts-point-" + b);
                        if (!u.styledMode) {
                            var G = d.pointAttribs(this, b);
                            var Q = p(u.options.chart.animation, f.animation);
                            d.options.inactiveOtherPoints && e(G.opacity) && ((this.dataLabels || []).forEach(function(b) {
                                b && b.animate({
                                    opacity: G.opacity
                                }, Q)
                            }), this.connector && this.connector.animate({
                                opacity: G.opacity
                            }, Q));
                            this.graphic.animate(G, Q)
                        }
                        q && this.graphic.animate(q, p(u.options.chart.animation, w.animation, g.animation));
                        z && z.hide()
                    } else {
                        if (b && w) {
                            k = v.symbol || d.symbol;
                            z && z.currentSymbol !==
                                k && (z = z.destroy());
                            if (q)
                                if (z) z[l ? "animate" : "attr"]({
                                    x: q.x,
                                    y: q.y
                                });
                                else k && (d.stateMarkerGraphic = z = u.renderer.symbol(k, q.x, q.y, q.width, q.height).add(d.markerGroup), z.currentSymbol = k);
                            !u.styledMode && z && "inactive" !== this.state && z.attr(d.pointAttribs(this, b))
                        }
                        z && (z[b && this.isInside ? "show" : "hide"](), z.element.point = this, z.addClass(this.getClassName(), !0))
                    }
                    f = f.halo;
                    q = (z = this.graphic || z) && z.visibility || "inherit";
                    f && f.size && z && "hidden" !== q && !this.isCluster ? (m || (d.halo = m = u.renderer.path().add(z.parentGroup)),
                        m.show()[l ? "animate" : "attr"]({
                            d: this.haloPath(f.size)
                        }), m.attr({
                            "class": "highcharts-halo highcharts-color-" + p(this.colorIndex, d.colorIndex) + (this.className ? " " + this.className : ""),
                            visibility: q,
                            zIndex: -1
                        }), m.point = this, u.styledMode || m.attr(c({
                            fill: this.color || d.color,
                            "fill-opacity": f.opacity
                        }, a.filterUserAttributes(f.attributes || {})))) : m && m.point && m.point.haloPath && m.animate({
                        d: m.point.haloPath(0)
                    }, null, m.hide);
                    n(this, "afterSetState", {
                        state: b
                    })
                }
            };
            v.prototype.haloPath = function(b) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) -
                    b, this.plotY - b, 2 * b, 2 * b)
            };
            return v
        }();
        "";
        return t
    });
    N(a, "Core/Pointer.js", [a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Tooltip.js"], a["Core/Utilities.js"]], function(a, t, B, H) {
        var E = a.parse,
            F = t.charts,
            I = t.noop,
            x = H.addEvent,
            q = H.attr,
            m = H.css,
            h = H.defined,
            c = H.extend,
            n = H.find,
            z = H.fireEvent,
            g = H.isNumber,
            f = H.isObject,
            e = H.objectEach,
            G = H.offset,
            J = H.pick,
            M = H.splat;
        a = function() {
            function a(c, a) {
                this.lastValidTouch = {};
                this.pinchDown = [];
                this.runChartClick = !1;
                this.eventsToUnbind = [];
                this.chart = c;
                this.hasDragged = !1;
                this.options = a;
                this.init(c, a)
            }
            a.prototype.applyInactiveState = function(c) {
                var a = [],
                    b;
                (c || []).forEach(function(c) {
                    b = c.series;
                    a.push(b);
                    b.linkedParent && a.push(b.linkedParent);
                    b.linkedSeries && (a = a.concat(b.linkedSeries));
                    b.navigatorSeries && a.push(b.navigatorSeries)
                });
                this.chart.series.forEach(function(b) {
                    -1 === a.indexOf(b) ? b.setState("inactive", !0) : b.options.inactiveOtherPoints && b.setAllPointsToState("inactive")
                })
            };
            a.prototype.destroy = function() {
                var c = this;
                this.eventsToUnbind.forEach(function(c) {
                    return c()
                });
                this.eventsToUnbind = [];
                t.chartCount || (a.unbindDocumentMouseUp && (a.unbindDocumentMouseUp = a.unbindDocumentMouseUp()), a.unbindDocumentTouchEnd && (a.unbindDocumentTouchEnd = a.unbindDocumentTouchEnd()));
                clearInterval(c.tooltipTimeout);
                e(c, function(a, b) {
                    c[b] = void 0
                })
            };
            a.prototype.drag = function(c) {
                var a = this.chart,
                    b = a.options.chart,
                    e = this.zoomHor,
                    d = this.zoomVert,
                    l = a.plotLeft,
                    g = a.plotTop,
                    k = a.plotWidth,
                    p = a.plotHeight,
                    h = this.mouseDownX || 0,
                    r = this.mouseDownY || 0,
                    A = f(b.panning) ? b.panning && b.panning.enabled : b.panning,
                    n = b.panKey && c[b.panKey + "Key"],
                    m = c.chartX,
                    u = c.chartY,
                    q = this.selectionMarker;
                if (!q || !q.touch)
                    if (m < l ? m = l : m > l + k && (m = l + k), u < g ? u = g : u > g + p && (u = g + p), this.hasDragged = Math.sqrt(Math.pow(h - m, 2) + Math.pow(r - u, 2)), 10 < this.hasDragged) {
                        var z = a.isInsidePlot(h - l, r - g, {
                            visiblePlotOnly: !0
                        });
                        !a.hasCartesianSeries && !a.mapView || !this.zoomX && !this.zoomY || !z || n || q || (this.selectionMarker = q = a.renderer.rect(l, g, e ? 1 : k, d ? 1 : p, 0).attr({
                            "class": "highcharts-selection-marker",
                            zIndex: 7
                        }).add(), a.styledMode || q.attr({
                            fill: b.selectionMarkerFill ||
                                E("#335cad").setOpacity(.25).get()
                        }));
                        q && e && (e = m - h, q.attr({
                            width: Math.abs(e),
                            x: (0 < e ? 0 : e) + h
                        }));
                        q && d && (e = u - r, q.attr({
                            height: Math.abs(e),
                            y: (0 < e ? 0 : e) + r
                        }));
                        z && !q && A && a.pan(c, b.panning)
                    }
            };
            a.prototype.dragStart = function(c) {
                var a = this.chart;
                a.mouseIsDown = c.type;
                a.cancelClick = !1;
                a.mouseDownX = this.mouseDownX = c.chartX;
                a.mouseDownY = this.mouseDownY = c.chartY
            };
            a.prototype.drop = function(a) {
                var e = this,
                    b = this.chart,
                    l = this.hasPinched;
                if (this.selectionMarker) {
                    var d = this.selectionMarker,
                        f = d.attr ? d.attr("x") : d.x,
                        p = d.attr ?
                        d.attr("y") : d.y,
                        k = d.attr ? d.attr("width") : d.width,
                        n = d.attr ? d.attr("height") : d.height,
                        q = {
                            originalEvent: a,
                            xAxis: [],
                            yAxis: [],
                            x: f,
                            y: p,
                            width: k,
                            height: n
                        },
                        r = !!b.mapView;
                    if (this.hasDragged || l) b.axes.forEach(function(b) {
                        if (b.zoomEnabled && h(b.min) && (l || e[{
                                xAxis: "zoomX",
                                yAxis: "zoomY"
                            } [b.coll]]) && g(f) && g(p)) {
                            var d = b.horiz,
                                c = "touchend" === a.type ? b.minPixelPadding : 0,
                                w = b.toValue((d ? f : p) + c);
                            d = b.toValue((d ? f + k : p + n) - c);
                            q[b.coll].push({
                                axis: b,
                                min: Math.min(w, d),
                                max: Math.max(w, d)
                            });
                            r = !0
                        }
                    }), r && z(b, "selection", q, function(d) {
                        b.zoom(c(d,
                            l ? {
                                animation: !1
                            } : null))
                    });
                    g(b.index) && (this.selectionMarker = this.selectionMarker.destroy());
                    l && this.scaleGroups()
                }
                b && g(b.index) && (m(b.container, {
                    cursor: b._cursor
                }), b.cancelClick = 10 < this.hasDragged, b.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            };
            a.prototype.findNearestKDPoint = function(c, a, b) {
                var e = this.chart,
                    d = e.hoverPoint;
                e = e.tooltip;
                if (d && e && e.isStickyOnContact()) return d;
                var l;
                c.forEach(function(d) {
                    var c = !(d.noSharedTooltip && a) && 0 > d.options.findNearestPointBy.indexOf("y");
                    d =
                        d.searchPoint(b, c);
                    if ((c = f(d, !0) && d.series) && !(c = !f(l, !0))) {
                        c = l.distX - d.distX;
                        var e = l.dist - d.dist,
                            g = (d.series.group && d.series.group.zIndex) - (l.series.group && l.series.group.zIndex);
                        c = 0 < (0 !== c && a ? c : 0 !== e ? e : 0 !== g ? g : l.series.index > d.series.index ? -1 : 1)
                    }
                    c && (l = d)
                });
                return l
            };
            a.prototype.getChartCoordinatesFromPoint = function(c, a) {
                var b = c.series,
                    e = b.xAxis;
                b = b.yAxis;
                var d = c.shapeArgs;
                if (e && b) {
                    var l = J(c.clientX, c.plotX),
                        f = c.plotY || 0;
                    c.isNode && d && g(d.x) && g(d.y) && (l = d.x, f = d.y);
                    return a ? {
                        chartX: b.len + b.pos - f,
                        chartY: e.len +
                            e.pos - l
                    } : {
                        chartX: l + e.pos,
                        chartY: f + b.pos
                    }
                }
                if (d && d.x && d.y) return {
                    chartX: d.x,
                    chartY: d.y
                }
            };
            a.prototype.getChartPosition = function() {
                if (this.chartPosition) return this.chartPosition;
                var c = this.chart.container,
                    a = G(c);
                this.chartPosition = {
                    left: a.left,
                    top: a.top,
                    scaleX: 1,
                    scaleY: 1
                };
                var b = c.offsetWidth;
                c = c.offsetHeight;
                2 < b && 2 < c && (this.chartPosition.scaleX = a.width / b, this.chartPosition.scaleY = a.height / c);
                return this.chartPosition
            };
            a.prototype.getCoordinates = function(c) {
                var a = {
                    xAxis: [],
                    yAxis: []
                };
                this.chart.axes.forEach(function(b) {
                    a[b.isXAxis ?
                        "xAxis" : "yAxis"].push({
                        axis: b,
                        value: b.toValue(c[b.horiz ? "chartX" : "chartY"])
                    })
                });
                return a
            };
            a.prototype.getHoverData = function(c, a, b, e, d, g) {
                var l = [];
                e = !(!e || !c);
                var k = {
                    chartX: g ? g.chartX : void 0,
                    chartY: g ? g.chartY : void 0,
                    shared: d
                };
                z(this, "beforeGetHoverData", k);
                var p = a && !a.stickyTracking ? [a] : b.filter(function(b) {
                    return k.filter ? k.filter(b) : b.visible && !(!d && b.directTouch) && J(b.options.enableMouseTracking, !0) && b.stickyTracking
                });
                var h = e || !g ? c : this.findNearestKDPoint(p, d, g);
                a = h && h.series;
                h && (d && !a.noSharedTooltip ?
                    (p = b.filter(function(b) {
                        return k.filter ? k.filter(b) : b.visible && !(!d && b.directTouch) && J(b.options.enableMouseTracking, !0) && !b.noSharedTooltip
                    }), p.forEach(function(b) {
                        var d = n(b.points, function(b) {
                            return b.x === h.x && !b.isNull
                        });
                        f(d) && (b.chart.isBoosting && (d = b.getPoint(d)), l.push(d))
                    })) : l.push(h));
                k = {
                    hoverPoint: h
                };
                z(this, "afterGetHoverData", k);
                return {
                    hoverPoint: k.hoverPoint,
                    hoverSeries: a,
                    hoverPoints: l
                }
            };
            a.prototype.getPointFromEvent = function(c) {
                c = c.target;
                for (var a; c && !a;) a = c.point, c = c.parentNode;
                return a
            };
            a.prototype.onTrackerMouseOut = function(c) {
                c = c.relatedTarget || c.toElement;
                var a = this.chart.hoverSeries;
                this.isDirectTouch = !1;
                if (!(!a || !c || a.stickyTracking || this.inClass(c, "highcharts-tooltip") || this.inClass(c, "highcharts-series-" + a.index) && this.inClass(c, "highcharts-tracker"))) a.onMouseOut()
            };
            a.prototype.inClass = function(c, a) {
                for (var b; c;) {
                    if (b = q(c, "class")) {
                        if (-1 !== b.indexOf(a)) return !0;
                        if (-1 !== b.indexOf("highcharts-container")) return !1
                    }
                    c = c.parentNode
                }
            };
            a.prototype.init = function(c, a) {
                this.options =
                    a;
                this.chart = c;
                this.runChartClick = !(!a.chart.events || !a.chart.events.click);
                this.pinchDown = [];
                this.lastValidTouch = {};
                B && (c.tooltip = new B(c, a.tooltip), this.followTouchMove = J(a.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            };
            a.prototype.normalize = function(a, e) {
                var b = a.touches,
                    f = b ? b.length ? b.item(0) : J(b.changedTouches, a.changedTouches)[0] : a;
                e || (e = this.getChartPosition());
                b = f.pageX - e.left;
                f = f.pageY - e.top;
                b /= e.scaleX;
                f /= e.scaleY;
                return c(a, {
                    chartX: Math.round(b),
                    chartY: Math.round(f)
                })
            };
            a.prototype.onContainerClick =
                function(a) {
                    var e = this.chart,
                        b = e.hoverPoint;
                    a = this.normalize(a);
                    var f = e.plotLeft,
                        d = e.plotTop;
                    e.cancelClick || (b && this.inClass(a.target, "highcharts-tracker") ? (z(b.series, "click", c(a, {
                        point: b
                    })), e.hoverPoint && b.firePointEvent("click", a)) : (c(a, this.getCoordinates(a)), e.isInsidePlot(a.chartX - f, a.chartY - d, {
                        visiblePlotOnly: !0
                    }) && z(e, "click", a)))
                };
            a.prototype.onContainerMouseDown = function(c) {
                var a = 1 === ((c.buttons || c.button) & 1);
                c = this.normalize(c);
                if (t.isFirefox && 0 !== c.button) this.onContainerMouseMove(c);
                if ("undefined" === typeof c.button || a) this.zoomOption(c), a && c.preventDefault && c.preventDefault(), this.dragStart(c)
            };
            a.prototype.onContainerMouseLeave = function(c) {
                var e = F[J(a.hoverChartIndex, -1)],
                    b = this.chart.tooltip;
                b && b.shouldStickOnContact() && this.inClass(c.relatedTarget, "highcharts-tooltip-container") || (c = this.normalize(c), e && (c.relatedTarget || c.toElement) && (e.pointer.reset(), e.pointer.chartPosition = void 0), b && !b.isHidden && this.reset())
            };
            a.prototype.onContainerMouseEnter = function(c) {
                delete this.chartPosition
            };
            a.prototype.onContainerMouseMove = function(c) {
                var a = this.chart;
                c = this.normalize(c);
                this.setHoverChartIndex();
                c.preventDefault || (c.returnValue = !1);
                ("mousedown" === a.mouseIsDown || this.touchSelect(c)) && this.drag(c);
                a.openMenu || !this.inClass(c.target, "highcharts-tracker") && !a.isInsidePlot(c.chartX - a.plotLeft, c.chartY - a.plotTop, {
                    visiblePlotOnly: !0
                }) || (this.inClass(c.target, "highcharts-no-tooltip") ? this.reset(!1, 0) : this.runPointActions(c))
            };
            a.prototype.onDocumentTouchEnd = function(c) {
                var e = F[J(a.hoverChartIndex,
                    -1)];
                e && e.pointer.drop(c)
            };
            a.prototype.onContainerTouchMove = function(c) {
                if (this.touchSelect(c)) this.onContainerMouseMove(c);
                else this.touch(c)
            };
            a.prototype.onContainerTouchStart = function(c) {
                if (this.touchSelect(c)) this.onContainerMouseDown(c);
                else this.zoomOption(c), this.touch(c, !0)
            };
            a.prototype.onDocumentMouseMove = function(c) {
                var a = this.chart,
                    b = this.chartPosition;
                c = this.normalize(c, b);
                var e = a.tooltip;
                !b || e && e.isStickyOnContact() || a.isInsidePlot(c.chartX - a.plotLeft, c.chartY - a.plotTop, {
                        visiblePlotOnly: !0
                    }) ||
                    this.inClass(c.target, "highcharts-tracker") || this.reset()
            };
            a.prototype.onDocumentMouseUp = function(c) {
                var e = F[J(a.hoverChartIndex, -1)];
                e && e.pointer.drop(c)
            };
            a.prototype.pinch = function(a) {
                var e = this,
                    b = e.chart,
                    f = e.pinchDown,
                    d = a.touches || [],
                    g = d.length,
                    l = e.lastValidTouch,
                    k = e.hasZoom,
                    p = {},
                    h = 1 === g && (e.inClass(a.target, "highcharts-tracker") && b.runTrackerClick || e.runChartClick),
                    r = {},
                    A = e.selectionMarker;
                1 < g ? e.initiated = !0 : 1 === g && this.followTouchMove && (e.initiated = !1);
                k && e.initiated && !h && !1 !== a.cancelable &&
                    a.preventDefault();
                [].map.call(d, function(b) {
                    return e.normalize(b)
                });
                "touchstart" === a.type ? ([].forEach.call(d, function(b, d) {
                    f[d] = {
                        chartX: b.chartX,
                        chartY: b.chartY
                    }
                }), l.x = [f[0].chartX, f[1] && f[1].chartX], l.y = [f[0].chartY, f[1] && f[1].chartY], b.axes.forEach(function(d) {
                    if (d.zoomEnabled) {
                        var c = b.bounds[d.horiz ? "h" : "v"],
                            a = d.minPixelPadding,
                            e = d.toPixels(Math.min(J(d.options.min, d.dataMin), d.dataMin)),
                            k = d.toPixels(Math.max(J(d.options.max, d.dataMax), d.dataMax)),
                            f = Math.max(e, k);
                        c.min = Math.min(d.pos, Math.min(e,
                            k) - a);
                        c.max = Math.max(d.pos + d.len, f + a)
                    }
                }), e.res = !0) : e.followTouchMove && 1 === g ? this.runPointActions(e.normalize(a)) : f.length && (z(b, "touchpan", {
                    originalEvent: a
                }, function() {
                    A || (e.selectionMarker = A = c({
                        destroy: I,
                        touch: !0
                    }, b.plotBox));
                    e.pinchTranslate(f, d, p, A, r, l);
                    e.hasPinched = k;
                    e.scaleGroups(p, r)
                }), e.res && (e.res = !1, this.reset(!1, 0)))
            };
            a.prototype.pinchTranslate = function(c, a, b, e, d, f) {
                this.zoomHor && this.pinchTranslateDirection(!0, c, a, b, e, d, f);
                this.zoomVert && this.pinchTranslateDirection(!1, c, a, b, e, d, f)
            };
            a.prototype.pinchTranslateDirection =
                function(c, a, b, e, d, f, g, k) {
                    var l = this.chart,
                        p = c ? "x" : "y",
                        r = c ? "X" : "Y",
                        h = "chart" + r,
                        v = c ? "width" : "height",
                        n = l["plot" + (c ? "Left" : "Top")],
                        u = l.inverted,
                        w = l.bounds[c ? "h" : "v"],
                        m = 1 === a.length,
                        q = a[0][h],
                        D = !m && a[1][h];
                    a = function() {
                        "number" === typeof J && 20 < Math.abs(q - D) && (z = k || Math.abs(G - J) / Math.abs(q - D));
                        Q = (n - G) / z + q;
                        C = l["plot" + (c ? "Width" : "Height")] / z
                    };
                    var C, Q, z = k || 1,
                        G = b[0][h],
                        J = !m && b[1][h];
                    a();
                    b = Q;
                    if (b < w.min) {
                        b = w.min;
                        var M = !0
                    } else b + C > w.max && (b = w.max - C, M = !0);
                    M ? (G -= .8 * (G - g[p][0]), "number" === typeof J && (J -= .8 * (J - g[p][1])),
                        a()) : g[p] = [G, J];
                    u || (f[p] = Q - n, f[v] = C);
                    f = u ? 1 / z : z;
                    d[v] = C;
                    d[p] = b;
                    e[u ? c ? "scaleY" : "scaleX" : "scale" + r] = z;
                    e["translate" + r] = f * n + (G - f * q)
                };
            a.prototype.reset = function(c, a) {
                var b = this.chart,
                    e = b.hoverSeries,
                    d = b.hoverPoint,
                    f = b.hoverPoints,
                    g = b.tooltip,
                    k = g && g.shared ? f : d;
                c && k && M(k).forEach(function(b) {
                    b.series.isCartesian && "undefined" === typeof b.plotX && (c = !1)
                });
                if (c) g && k && M(k).length && (g.refresh(k), g.shared && f ? f.forEach(function(b) {
                    b.setState(b.state, !0);
                    b.series.isCartesian && (b.series.xAxis.crosshair && b.series.xAxis.drawCrosshair(null,
                        b), b.series.yAxis.crosshair && b.series.yAxis.drawCrosshair(null, b))
                }) : d && (d.setState(d.state, !0), b.axes.forEach(function(b) {
                    b.crosshair && d.series[b.coll] === b && b.drawCrosshair(null, d)
                })));
                else {
                    if (d) d.onMouseOut();
                    f && f.forEach(function(b) {
                        b.setState()
                    });
                    if (e) e.onMouseOut();
                    g && g.hide(a);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    b.axes.forEach(function(b) {
                        b.hideCrosshair()
                    });
                    this.hoverX = b.hoverPoints = b.hoverPoint = null
                }
            };
            a.prototype.runPointActions = function(c, e) {
                var b = this.chart,
                    f = b.tooltip && b.tooltip.options.enabled ? b.tooltip : void 0,
                    d = f ? f.shared : !1,
                    g = e || b.hoverPoint,
                    l = g && g.series || b.hoverSeries;
                e = this.getHoverData(g, l, b.series, (!c || "touchmove" !== c.type) && (!!e || l && l.directTouch && this.isDirectTouch), d, c);
                g = e.hoverPoint;
                l = e.hoverSeries;
                var k = e.hoverPoints;
                e = l && l.tooltipOptions.followPointer && !l.tooltipOptions.split;
                d = d && l && !l.noSharedTooltip;
                if (g && (g !== b.hoverPoint || f && f.isHidden)) {
                    (b.hoverPoints || []).forEach(function(b) {
                        -1 === k.indexOf(b) && b.setState()
                    });
                    if (b.hoverSeries !==
                        l) l.onMouseOver();
                    this.applyInactiveState(k);
                    (k || []).forEach(function(b) {
                        b.setState("hover")
                    });
                    b.hoverPoint && b.hoverPoint.firePointEvent("mouseOut");
                    if (!g.series) return;
                    b.hoverPoints = k;
                    b.hoverPoint = g;
                    g.firePointEvent("mouseOver");
                    f && f.refresh(d ? k : g, c)
                } else e && f && !f.isHidden && (g = f.getAnchor([{}], c), b.isInsidePlot(g[0], g[1], {
                    visiblePlotOnly: !0
                }) && f.updatePosition({
                    plotX: g[0],
                    plotY: g[1]
                }));
                this.unDocMouseMove || (this.unDocMouseMove = x(b.container.ownerDocument, "mousemove", function(b) {
                    var d = F[a.hoverChartIndex];
                    if (d) d.pointer.onDocumentMouseMove(b)
                }), this.eventsToUnbind.push(this.unDocMouseMove));
                b.axes.forEach(function(d) {
                    var a = J((d.crosshair || {}).snap, !0),
                        e;
                    a && ((e = b.hoverPoint) && e.series[d.coll] === d || (e = n(k, function(b) {
                        return b.series[d.coll] === d
                    })));
                    e || !a ? d.drawCrosshair(c, e) : d.hideCrosshair()
                })
            };
            a.prototype.scaleGroups = function(c, a) {
                var b = this.chart;
                b.series.forEach(function(e) {
                    var d = c || e.getPlotBox();
                    e.group && (e.xAxis && e.xAxis.zoomEnabled || b.mapView) && (e.group.attr(d), e.markerGroup && (e.markerGroup.attr(d),
                        e.markerGroup.clip(a ? b.clipRect : null)), e.dataLabelsGroup && e.dataLabelsGroup.attr(d))
                });
                b.clipRect.attr(a || b.clipBox)
            };
            a.prototype.setDOMEvents = function() {
                var c = this,
                    e = this.chart.container,
                    b = e.ownerDocument;
                e.onmousedown = this.onContainerMouseDown.bind(this);
                e.onmousemove = this.onContainerMouseMove.bind(this);
                e.onclick = this.onContainerClick.bind(this);
                this.eventsToUnbind.push(x(e, "mouseenter", this.onContainerMouseEnter.bind(this)));
                this.eventsToUnbind.push(x(e, "mouseleave", this.onContainerMouseLeave.bind(this)));
                a.unbindDocumentMouseUp || (a.unbindDocumentMouseUp = x(b, "mouseup", this.onDocumentMouseUp.bind(this)));
                for (var f = this.chart.renderTo.parentElement; f && "BODY" !== f.tagName;) this.eventsToUnbind.push(x(f, "scroll", function() {
                    delete c.chartPosition
                })), f = f.parentElement;
                t.hasTouch && (this.eventsToUnbind.push(x(e, "touchstart", this.onContainerTouchStart.bind(this), {
                    passive: !1
                })), this.eventsToUnbind.push(x(e, "touchmove", this.onContainerTouchMove.bind(this), {
                    passive: !1
                })), a.unbindDocumentTouchEnd || (a.unbindDocumentTouchEnd =
                    x(b, "touchend", this.onDocumentTouchEnd.bind(this), {
                        passive: !1
                    })))
            };
            a.prototype.setHoverChartIndex = function() {
                var c = this.chart,
                    e = t.charts[J(a.hoverChartIndex, -1)];
                if (e && e !== c) e.pointer.onContainerMouseLeave({
                    relatedTarget: !0
                });
                e && e.mouseIsDown || (a.hoverChartIndex = c.index)
            };
            a.prototype.touch = function(c, a) {
                var b = this.chart,
                    e;
                this.setHoverChartIndex();
                if (1 === c.touches.length)
                    if (c = this.normalize(c), (e = b.isInsidePlot(c.chartX - b.plotLeft, c.chartY - b.plotTop, {
                            visiblePlotOnly: !0
                        })) && !b.openMenu) {
                        a && this.runPointActions(c);
                        if ("touchmove" === c.type) {
                            a = this.pinchDown;
                            var d = a[0] ? 4 <= Math.sqrt(Math.pow(a[0].chartX - c.chartX, 2) + Math.pow(a[0].chartY - c.chartY, 2)) : !1
                        }
                        J(d, !0) && this.pinch(c)
                    } else a && this.reset();
                else 2 === c.touches.length && this.pinch(c)
            };
            a.prototype.touchSelect = function(c) {
                return !(!this.chart.options.chart.zoomBySingleTouch || !c.touches || 1 !== c.touches.length)
            };
            a.prototype.zoomOption = function(c) {
                var a = this.chart,
                    b = a.options.chart;
                a = a.inverted;
                var e = b.zoomType || "";
                /touch/.test(c.type) && (e = J(b.pinchType, e));
                this.zoomX =
                    c = /x/.test(e);
                this.zoomY = b = /y/.test(e);
                this.zoomHor = c && !a || b && a;
                this.zoomVert = b && !a || c && a;
                this.hasZoom = c || b
            };
            return a
        }();
        "";
        return a
    });
    N(a, "Core/MSPointer.js", [a["Core/Globals.js"], a["Core/Pointer.js"], a["Core/Utilities.js"]], function(a, t, B) {
        function E() {
            var c = [];
            c.item = function(c) {
                return this[c]
            };
            n(g, function(a) {
                c.push({
                    pageX: a.pageX,
                    pageY: a.pageY,
                    target: a.target
                })
            });
            return c
        }

        function y(c, a, f, g) {
            var e = I[t.hoverChartIndex || NaN];
            "touch" !== c.pointerType && c.pointerType !== c.MSPOINTER_TYPE_TOUCH || !e ||
                (e = e.pointer, g(c), e[a]({
                    type: f,
                    target: c.currentTarget,
                    preventDefault: q,
                    touches: E()
                }))
        }
        var F = this && this.__extends || function() {
                var c = function(a, e) {
                    c = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(c, a) {
                        c.__proto__ = a
                    } || function(c, a) {
                        for (var e in a) a.hasOwnProperty(e) && (c[e] = a[e])
                    };
                    return c(a, e)
                };
                return function(a, e) {
                    function f() {
                        this.constructor = a
                    }
                    c(a, e);
                    a.prototype = null === e ? Object.create(e) : (f.prototype = e.prototype, new f)
                }
            }(),
            I = a.charts,
            x = a.doc,
            q = a.noop,
            m = a.win,
            h = B.addEvent,
            c = B.css,
            n = B.objectEach,
            z = B.removeEvent,
            g = {},
            f = !!m.PointerEvent;
        return function(e) {
            function n() {
                return null !== e && e.apply(this, arguments) || this
            }
            F(n, e);
            n.isRequired = function() {
                return !(a.hasTouch || !m.PointerEvent && !m.MSPointerEvent)
            };
            n.prototype.batchMSEvents = function(c) {
                c(this.chart.container, f ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                c(this.chart.container, f ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                c(x, f ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
            };
            n.prototype.destroy =
                function() {
                    this.batchMSEvents(z);
                    e.prototype.destroy.call(this)
                };
            n.prototype.init = function(a, f) {
                e.prototype.init.call(this, a, f);
                this.hasZoom && c(a.container, {
                    "-ms-touch-action": "none",
                    "touch-action": "none"
                })
            };
            n.prototype.onContainerPointerDown = function(c) {
                y(c, "onContainerTouchStart", "touchstart", function(c) {
                    g[c.pointerId] = {
                        pageX: c.pageX,
                        pageY: c.pageY,
                        target: c.currentTarget
                    }
                })
            };
            n.prototype.onContainerPointerMove = function(c) {
                y(c, "onContainerTouchMove", "touchmove", function(c) {
                    g[c.pointerId] = {
                        pageX: c.pageX,
                        pageY: c.pageY
                    };
                    g[c.pointerId].target || (g[c.pointerId].target = c.currentTarget)
                })
            };
            n.prototype.onDocumentPointerUp = function(c) {
                y(c, "onDocumentTouchEnd", "touchend", function(c) {
                    delete g[c.pointerId]
                })
            };
            n.prototype.setDOMEvents = function() {
                e.prototype.setDOMEvents.call(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(h)
            };
            return n
        }(t)
    });
    N(a, "Core/Legend/Legend.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/FormatUtilities.js"], a["Core/Globals.js"], a["Core/Series/Point.js"], a["Core/Renderer/RendererUtilities.js"],
        a["Core/Utilities.js"]
    ], function(a, t, B, H, y, F) {
        var E = a.animObject,
            x = a.setAnimation,
            q = t.format;
        a = B.isFirefox;
        var m = B.marginNames;
        B = B.win;
        var h = y.distribute,
            c = F.addEvent,
            n = F.createElement,
            z = F.css,
            g = F.defined,
            f = F.discardElement,
            e = F.find,
            G = F.fireEvent,
            J = F.isNumber,
            M = F.merge,
            p = F.pick,
            l = F.relativeLength,
            w = F.stableSort,
            b = F.syncTimeout;
        y = F.wrap;
        F = function() {
            function a(b, c) {
                this.allItems = [];
                this.contentGroup = this.box = void 0;
                this.display = !1;
                this.group = void 0;
                this.offsetWidth = this.maxLegendWidth = this.maxItemWidth =
                    this.legendWidth = this.legendHeight = this.lastLineHeight = this.lastItemY = this.itemY = this.itemX = this.itemMarginTop = this.itemMarginBottom = this.itemHeight = this.initialItemY = 0;
                this.options = {};
                this.padding = 0;
                this.pages = [];
                this.proximate = !1;
                this.scrollGroup = void 0;
                this.widthOption = this.totalItemWidth = this.titleHeight = this.symbolWidth = this.symbolHeight = 0;
                this.chart = b;
                this.init(b, c)
            }
            a.prototype.init = function(b, a) {
                this.chart = b;
                this.setOptions(a);
                a.enabled && (this.render(), c(this.chart, "endResize", function() {
                        this.legend.positionCheckboxes()
                    }),
                    this.proximate ? this.unchartrender = c(this.chart, "render", function() {
                        this.legend.proximatePositions();
                        this.legend.positionItems()
                    }) : this.unchartrender && this.unchartrender())
            };
            a.prototype.setOptions = function(b) {
                var c = p(b.padding, 8);
                this.options = b;
                this.chart.styledMode || (this.itemStyle = b.itemStyle, this.itemHiddenStyle = M(this.itemStyle, b.itemHiddenStyle));
                this.itemMarginTop = b.itemMarginTop || 0;
                this.itemMarginBottom = b.itemMarginBottom || 0;
                this.padding = c;
                this.initialItemY = c - 5;
                this.symbolWidth = p(b.symbolWidth,
                    16);
                this.pages = [];
                this.proximate = "proximate" === b.layout && !this.chart.inverted;
                this.baseline = void 0
            };
            a.prototype.update = function(b, c) {
                var d = this.chart;
                this.setOptions(M(!0, this.options, b));
                this.destroy();
                d.isDirtyLegend = d.isDirtyBox = !0;
                p(c, !0) && d.redraw();
                G(this, "afterUpdate")
            };
            a.prototype.colorizeItem = function(b, c) {
                b.legendGroup[c ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                if (!this.chart.styledMode) {
                    var d = this.options,
                        a = b.legendItem,
                        e = b.legendLine,
                        f = b.legendSymbol,
                        r = this.itemHiddenStyle.color;
                    d = c ? d.itemStyle.color : r;
                    var g = c ? b.color || r : r,
                        l = b.options && b.options.marker,
                        p = {
                            fill: g
                        };
                    a && a.css({
                        fill: d,
                        color: d
                    });
                    e && e.attr({
                        stroke: g
                    });
                    f && (l && f.isMarker && (p = b.pointAttribs(), c || (p.stroke = p.fill = r)), f.attr(p))
                }
                G(this, "afterColorizeItem", {
                    item: b,
                    visible: c
                })
            };
            a.prototype.positionItems = function() {
                this.allItems.forEach(this.positionItem, this);
                this.chart.isResizing || this.positionCheckboxes()
            };
            a.prototype.positionItem = function(b) {
                var c = this,
                    d = this.options,
                    a = d.symbolPadding,
                    e = !d.rtl,
                    f = b._legendItemPos;
                d =
                    f[0];
                f = f[1];
                var r = b.checkbox,
                    l = b.legendGroup;
                l && l.element && (a = {
                    translateX: e ? d : this.legendWidth - d - 2 * a - 4,
                    translateY: f
                }, e = function() {
                    G(c, "afterPositionItem", {
                        item: b
                    })
                }, g(l.translateY) ? l.animate(a, void 0, e) : (l.attr(a), e()));
                r && (r.x = d, r.y = f)
            };
            a.prototype.destroyItem = function(b) {
                var c = b.checkbox;
                ["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(function(c) {
                    b[c] && (b[c] = b[c].destroy())
                });
                c && f(b.checkbox)
            };
            a.prototype.destroy = function() {
                function b(b) {
                    this[b] && (this[b] = this[b].destroy())
                }
                this.getAllItems().forEach(function(c) {
                    ["legendItem",
                        "legendGroup"
                    ].forEach(b, c)
                });
                "clipRect up down pager nav box title group".split(" ").forEach(b, this);
                this.display = null
            };
            a.prototype.positionCheckboxes = function() {
                var b = this.group && this.group.alignAttr,
                    c = this.clipHeight || this.legendHeight,
                    a = this.titleHeight;
                if (b) {
                    var e = b.translateY;
                    this.allItems.forEach(function(d) {
                        var k = d.checkbox;
                        if (k) {
                            var f = e + a + k.y + (this.scrollOffset || 0) + 3;
                            z(k, {
                                left: b.translateX + d.checkboxOffset + k.x - 20 + "px",
                                top: f + "px",
                                display: this.proximate || f > e - 6 && f < e + c - 6 ? "" : "none"
                            })
                        }
                    }, this)
                }
            };
            a.prototype.renderTitle = function() {
                var b = this.options,
                    c = this.padding,
                    a = b.title,
                    e = 0;
                a.text && (this.title || (this.title = this.chart.renderer.label(a.text, c - 3, c - 4, null, null, null, b.useHTML, null, "legend-title").attr({
                    zIndex: 1
                }), this.chart.styledMode || this.title.css(a.style), this.title.add(this.group)), a.width || this.title.css({
                    width: this.maxLegendWidth + "px"
                }), b = this.title.getBBox(), e = b.height, this.offsetWidth = b.width, this.contentGroup.attr({
                    translateY: e
                }));
                this.titleHeight = e
            };
            a.prototype.setText = function(b) {
                var c =
                    this.options;
                b.legendItem.attr({
                    text: c.labelFormat ? q(c.labelFormat, b, this.chart) : c.labelFormatter.call(b)
                })
            };
            a.prototype.renderItem = function(b) {
                var c = this.chart,
                    d = c.renderer,
                    a = this.options,
                    e = this.symbolWidth,
                    f = a.symbolPadding || 0,
                    r = this.itemStyle,
                    g = this.itemHiddenStyle,
                    l = "horizontal" === a.layout ? p(a.itemDistance, 20) : 0,
                    h = !a.rtl,
                    u = !b.series,
                    n = !u && b.series.drawLegendSymbol ? b.series : b,
                    v = n.options,
                    w = this.createCheckboxForItem && v && v.showCheckbox,
                    m = a.useHTML,
                    q = b.options.className,
                    Q = b.legendItem;
                v = e + f + l + (w ?
                    20 : 0);
                Q || (b.legendGroup = d.g("legend-item").addClass("highcharts-" + n.type + "-series highcharts-color-" + b.colorIndex + (q ? " " + q : "") + (u ? " highcharts-series-" + b.index : "")).attr({
                    zIndex: 1
                }).add(this.scrollGroup), b.legendItem = Q = d.text("", h ? e + f : -f, this.baseline || 0, m), c.styledMode || Q.css(M(b.visible ? r : g)), Q.attr({
                    align: h ? "left" : "right",
                    zIndex: 2
                }).add(b.legendGroup), this.baseline || (this.fontMetrics = d.fontMetrics(c.styledMode ? 12 : r.fontSize, Q), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, Q.attr("y", this.baseline),
                    this.symbolHeight = a.symbolHeight || this.fontMetrics.f, a.squareSymbol && (this.symbolWidth = p(a.symbolWidth, Math.max(this.symbolHeight, 16)), v = this.symbolWidth + f + l + (w ? 20 : 0), h && Q.attr("x", this.symbolWidth + f))), n.drawLegendSymbol(this, b), this.setItemEvents && this.setItemEvents(b, Q, m));
                w && !b.checkbox && this.createCheckboxForItem && this.createCheckboxForItem(b);
                this.colorizeItem(b, b.visible);
                !c.styledMode && r.width || Q.css({
                    width: (a.itemWidth || this.widthOption || c.spacingBox.width) - v + "px"
                });
                this.setText(b);
                c = Q.getBBox();
                d = this.fontMetrics && this.fontMetrics.h || 0;
                b.itemWidth = b.checkboxOffset = a.itemWidth || b.legendItemWidth || c.width + v;
                this.maxItemWidth = Math.max(this.maxItemWidth, b.itemWidth);
                this.totalItemWidth += b.itemWidth;
                this.itemHeight = b.itemHeight = Math.round(b.legendItemHeight || (c.height > 1.5 * d ? c.height : d))
            };
            a.prototype.layoutItem = function(b) {
                var c = this.options,
                    d = this.padding,
                    a = "horizontal" === c.layout,
                    e = b.itemHeight,
                    f = this.itemMarginBottom,
                    r = this.itemMarginTop,
                    g = a ? p(c.itemDistance, 20) : 0,
                    l = this.maxLegendWidth;
                c = c.alignColumns &&
                    this.totalItemWidth > l ? this.maxItemWidth : b.itemWidth;
                a && this.itemX - d + c > l && (this.itemX = d, this.lastLineHeight && (this.itemY += r + this.lastLineHeight + f), this.lastLineHeight = 0);
                this.lastItemY = r + this.itemY + f;
                this.lastLineHeight = Math.max(e, this.lastLineHeight);
                b._legendItemPos = [this.itemX, this.itemY];
                a ? this.itemX += c : (this.itemY += r + e + f, this.lastLineHeight = e);
                this.offsetWidth = this.widthOption || Math.max((a ? this.itemX - d - (b.checkbox ? 0 : g) : c) + d, this.offsetWidth)
            };
            a.prototype.getAllItems = function() {
                var b = [];
                this.chart.series.forEach(function(c) {
                    var d =
                        c && c.options;
                    c && p(d.showInLegend, g(d.linkedTo) ? !1 : void 0, !0) && (b = b.concat(c.legendItems || ("point" === d.legendType ? c.data : c)))
                });
                G(this, "afterGetAllItems", {
                    allItems: b
                });
                return b
            };
            a.prototype.getAlignment = function() {
                var b = this.options;
                return this.proximate ? b.align.charAt(0) + "tv" : b.floating ? "" : b.align.charAt(0) + b.verticalAlign.charAt(0) + b.layout.charAt(0)
            };
            a.prototype.adjustMargins = function(b, c) {
                var a = this.chart,
                    d = this.options,
                    e = this.getAlignment();
                e && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function(k,
                    f) {
                    k.test(e) && !g(b[f]) && (a[m[f]] = Math.max(a[m[f]], a.legend[(f + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][f] * d[f % 2 ? "x" : "y"] + p(d.margin, 12) + c[f] + (a.titleOffset[f] || 0)))
                })
            };
            a.prototype.proximatePositions = function() {
                var b = this.chart,
                    c = [],
                    a = "left" === this.options.align;
                this.allItems.forEach(function(d) {
                    var k;
                    var f = a;
                    if (d.yAxis) {
                        d.xAxis.options.reversed && (f = !f);
                        d.points && (k = e(f ? d.points : d.points.slice(0).reverse(), function(b) {
                            return J(b.plotY)
                        }));
                        f = this.itemMarginTop + d.legendItem.getBBox().height + this.itemMarginBottom;
                        var g = d.yAxis.top - b.plotTop;
                        d.visible ? (k = k ? k.plotY : d.yAxis.height, k += g - .3 * f) : k = g + d.yAxis.height;
                        c.push({
                            target: k,
                            size: f,
                            item: d
                        })
                    }
                }, this);
                h(c, b.plotHeight).forEach(function(c) {
                    c.item._legendItemPos && (c.item._legendItemPos[1] = b.plotTop - b.spacing[0] + c.pos)
                })
            };
            a.prototype.render = function() {
                var b = this.chart,
                    c = b.renderer,
                    a = this.options,
                    e = this.padding,
                    f = this.getAllItems(),
                    g = this.group,
                    r = this.box;
                this.itemX = e;
                this.itemY = this.initialItemY;
                this.lastItemY = this.offsetWidth = 0;
                this.widthOption = l(a.width, b.spacingBox.width -
                    e);
                var p = b.spacingBox.width - 2 * e - a.x; - 1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (p /= 2);
                this.maxLegendWidth = this.widthOption || p;
                g || (this.group = g = c.g("legend").addClass(a.className || "").attr({
                    zIndex: 7
                }).add(), this.contentGroup = c.g().attr({
                    zIndex: 1
                }).add(g), this.scrollGroup = c.g().add(this.contentGroup));
                this.renderTitle();
                w(f, function(b, c) {
                    return (b.options && b.options.legendIndex || 0) - (c.options && c.options.legendIndex || 0)
                });
                a.reversed && f.reverse();
                this.allItems = f;
                this.display = p = !!f.length;
                this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
                f.forEach(this.renderItem, this);
                f.forEach(this.layoutItem, this);
                f = (this.widthOption || this.offsetWidth) + e;
                var h = this.lastItemY + this.lastLineHeight + this.titleHeight;
                h = this.handleOverflow(h);
                h += e;
                r || (this.box = r = c.rect().addClass("highcharts-legend-box").attr({
                    r: a.borderRadius
                }).add(g), r.isNew = !0);
                b.styledMode || r.attr({
                    stroke: a.borderColor,
                    "stroke-width": a.borderWidth || 0,
                    fill: a.backgroundColor || "none"
                }).shadow(a.shadow);
                0 < f &&
                    0 < h && (r[r.isNew ? "attr" : "animate"](r.crisp.call({}, {
                        x: 0,
                        y: 0,
                        width: f,
                        height: h
                    }, r.strokeWidth())), r.isNew = !1);
                r[p ? "show" : "hide"]();
                b.styledMode && "none" === g.getStyle("display") && (f = h = 0);
                this.legendWidth = f;
                this.legendHeight = h;
                p && this.align();
                this.proximate || this.positionItems();
                G(this, "afterRender")
            };
            a.prototype.align = function(b) {
                void 0 === b && (b = this.chart.spacingBox);
                var c = this.chart,
                    a = this.options,
                    d = b.y;
                /(lth|ct|rth)/.test(this.getAlignment()) && 0 < c.titleOffset[0] ? d += c.titleOffset[0] : /(lbh|cb|rbh)/.test(this.getAlignment()) &&
                    0 < c.titleOffset[2] && (d -= c.titleOffset[2]);
                d !== b.y && (b = M(b, {
                    y: d
                }));
                this.group.align(M(a, {
                    width: this.legendWidth,
                    height: this.legendHeight,
                    verticalAlign: this.proximate ? "top" : a.verticalAlign
                }), !0, b)
            };
            a.prototype.handleOverflow = function(b) {
                var c = this,
                    a = this.chart,
                    d = a.renderer,
                    e = this.options,
                    f = e.y,
                    g = "top" === e.verticalAlign,
                    l = this.padding,
                    h = e.maxHeight,
                    n = e.navigation,
                    u = p(n.animation, !0),
                    v = n.arrowSize || 12,
                    w = this.pages,
                    m = this.allItems,
                    q = function(b) {
                        "number" === typeof b ? M.attr({
                            height: b
                        }) : M && (c.clipRect = M.destroy(),
                            c.contentGroup.clip());
                        c.contentGroup.div && (c.contentGroup.div.style.clip = b ? "rect(" + l + "px,9999px," + (l + b) + "px,0)" : "auto")
                    },
                    z = function(b) {
                        c[b] = d.circle(0, 0, 1.3 * v).translate(v / 2, v / 2).add(J);
                        a.styledMode || c[b].attr("fill", "rgba(0,0,0,0.0001)");
                        return c[b]
                    },
                    Q, G;
                f = a.spacingBox.height + (g ? -f : f) - l;
                var J = this.nav,
                    M = this.clipRect;
                "horizontal" !== e.layout || "middle" === e.verticalAlign || e.floating || (f /= 2);
                h && (f = Math.min(f, h));
                w.length = 0;
                b && 0 < f && b > f && !1 !== n.enabled ? (this.clipHeight = Q = Math.max(f - 20 - this.titleHeight -
                    l, 0), this.currentPage = p(this.currentPage, 1), this.fullHeight = b, m.forEach(function(b, c) {
                    var a = b._legendItemPos[1],
                        d = Math.round(b.legendItem.getBBox().height),
                        e = w.length;
                    if (!e || a - w[e - 1] > Q && (G || a) !== w[e - 1]) w.push(G || a), e++;
                    b.pageIx = e - 1;
                    G && (m[c - 1].pageIx = e - 1);
                    c === m.length - 1 && a + d - w[e - 1] > Q && d <= Q && (w.push(a), b.pageIx = e);
                    a !== G && (G = a)
                }), M || (M = c.clipRect = d.clipRect(0, l, 9999, 0), c.contentGroup.clip(M)), q(Q), J || (this.nav = J = d.g().attr({
                    zIndex: 1
                }).add(this.group), this.up = d.symbol("triangle", 0, 0, v, v).add(J), z("upTracker").on("click",
                    function() {
                        c.scroll(-1, u)
                    }), this.pager = d.text("", 15, 10).addClass("highcharts-legend-navigation"), a.styledMode || this.pager.css(n.style), this.pager.add(J), this.down = d.symbol("triangle-down", 0, 0, v, v).add(J), z("downTracker").on("click", function() {
                    c.scroll(1, u)
                })), c.scroll(0), b = f) : J && (q(), this.nav = J.destroy(), this.scrollGroup.attr({
                    translateY: 1
                }), this.clipHeight = 0);
                return b
            };
            a.prototype.scroll = function(c, a) {
                var d = this,
                    e = this.chart,
                    f = this.pages,
                    g = f.length,
                    r = this.clipHeight,
                    l = this.options.navigation,
                    h = this.pager,
                    n = this.padding,
                    u = this.currentPage + c;
                u > g && (u = g);
                0 < u && ("undefined" !== typeof a && x(a, e), this.nav.attr({
                    translateX: n,
                    translateY: r + this.padding + 7 + this.titleHeight,
                    visibility: "visible"
                }), [this.up, this.upTracker].forEach(function(b) {
                    b.attr({
                        "class": 1 === u ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    })
                }), h.attr({
                    text: u + "/" + g
                }), [this.down, this.downTracker].forEach(function(b) {
                        b.attr({
                            x: 18 + this.pager.getBBox().width,
                            "class": u === g ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                        })
                    },
                    this), e.styledMode || (this.up.attr({
                    fill: 1 === u ? l.inactiveColor : l.activeColor
                }), this.upTracker.css({
                    cursor: 1 === u ? "default" : "pointer"
                }), this.down.attr({
                    fill: u === g ? l.inactiveColor : l.activeColor
                }), this.downTracker.css({
                    cursor: u === g ? "default" : "pointer"
                })), this.scrollOffset = -f[u - 1] + this.initialItemY, this.scrollGroup.animate({
                    translateY: this.scrollOffset
                }), this.currentPage = u, this.positionCheckboxes(), c = E(p(a, e.renderer.globalAnimation, !0)), b(function() {
                    G(d, "afterScroll", {
                        currentPage: u
                    })
                }, c.duration))
            };
            a.prototype.setItemEvents =
                function(b, c, a) {
                    var d = this,
                        e = d.chart.renderer.boxWrapper,
                        f = b instanceof H,
                        g = "highcharts-legend-" + (f ? "point" : "series") + "-active",
                        l = d.chart.styledMode,
                        h = function(c) {
                            d.allItems.forEach(function(a) {
                                b !== a && [a].concat(a.linkedSeries || []).forEach(function(b) {
                                    b.setState(c, !f)
                                })
                            })
                        };
                    (a ? [c, b.legendSymbol] : [b.legendGroup]).forEach(function(a) {
                        if (a) a.on("mouseover", function() {
                            b.visible && h("inactive");
                            b.setState("hover");
                            b.visible && e.addClass(g);
                            l || c.css(d.options.itemHoverStyle)
                        }).on("mouseout", function() {
                            d.chart.styledMode ||
                                c.css(M(b.visible ? d.itemStyle : d.itemHiddenStyle));
                            h("");
                            e.removeClass(g);
                            b.setState()
                        }).on("click", function(c) {
                            var a = function() {
                                b.setVisible && b.setVisible();
                                h(b.visible ? "inactive" : "")
                            };
                            e.removeClass(g);
                            c = {
                                browserEvent: c
                            };
                            b.firePointEvent ? b.firePointEvent("legendItemClick", c, a) : G(b, "legendItemClick", c, a)
                        })
                    })
                };
            a.prototype.createCheckboxForItem = function(b) {
                b.checkbox = n("input", {
                        type: "checkbox",
                        className: "highcharts-legend-checkbox",
                        checked: b.selected,
                        defaultChecked: b.selected
                    }, this.options.itemCheckboxStyle,
                    this.chart.container);
                c(b.checkbox, "click", function(c) {
                    G(b.series || b, "checkboxClick", {
                        checked: c.target.checked,
                        item: b
                    }, function() {
                        b.select()
                    })
                })
            };
            return a
        }();
        (/Trident\/7\.0/.test(B.navigator && B.navigator.userAgent) || a) && y(F.prototype, "positionItem", function(b, c) {
            var a = this,
                d = function() {
                    c._legendItemPos && b.call(a, c)
                };
            d();
            a.bubbleLegend || setTimeout(d)
        });
        "";
        return F
    });
    N(a, "Core/Series/SeriesRegistry.js", [a["Core/Globals.js"], a["Core/DefaultOptions.js"], a["Core/Series/Point.js"], a["Core/Utilities.js"]],
        function(a, t, B, H) {
            var E = t.defaultOptions,
                F = H.error,
                I = H.extendClass,
                x = H.merge,
                q;
            (function(m) {
                function h(c, a) {
                    var h = E.plotOptions || {},
                        g = a.defaultOptions;
                    a.prototype.pointClass || (a.prototype.pointClass = B);
                    a.prototype.type = c;
                    g && (h[c] = g);
                    m.seriesTypes[c] = a
                }
                m.seriesTypes = a.seriesTypes;
                m.getSeries = function(c, a) {
                    void 0 === a && (a = {});
                    var h = c.options.chart;
                    h = a.type || h.type || h.defaultSeriesType || "";
                    var g = m.seriesTypes[h];
                    m || F(17, !0, c, {
                        missingModuleFor: h
                    });
                    h = new g;
                    "function" === typeof h.init && h.init(c, a);
                    return h
                };
                m.registerSeriesType = h;
                m.seriesType = function(c, a, q, g, f) {
                    var e = E.plotOptions || {};
                    a = a || "";
                    e[c] = x(e[a], q);
                    h(c, I(m.seriesTypes[a] || function() {}, g));
                    m.seriesTypes[c].prototype.type = c;
                    f && (m.seriesTypes[c].prototype.pointClass = I(B, f));
                    return m.seriesTypes[c]
                }
            })(q || (q = {}));
            return q
        });
    N(a, "Core/Chart/Chart.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Axis/Axis.js"], a["Core/FormatUtilities.js"], a["Core/Foundation.js"], a["Core/Globals.js"], a["Core/Legend/Legend.js"], a["Core/MSPointer.js"], a["Core/DefaultOptions.js"],
        a["Core/Pointer.js"], a["Core/Renderer/RendererRegistry.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Renderer/SVG/SVGRenderer.js"], a["Core/Time.js"], a["Core/Utilities.js"], a["Core/Renderer/HTML/AST.js"]
    ], function(a, t, B, H, y, F, I, x, q, m, h, c, n, z, g) {
        var f = a.animate,
            e = a.animObject,
            G = a.setAnimation,
            J = B.numberFormat,
            M = H.registerEventOptions,
            p = y.charts,
            l = y.doc,
            w = y.marginNames,
            b = y.svg,
            v = y.win,
            d = x.defaultOptions,
            D = x.defaultTime,
            C = h.seriesTypes,
            k = z.addEvent,
            K = z.attr,
            O = z.cleanRecursively,
            r = z.createElement,
            A =
            z.css,
            P = z.defined,
            E = z.discardElement,
            u = z.erase,
            L = z.error,
            aa = z.extend,
            da = z.find,
            R = z.fireEvent,
            ea = z.getStyle,
            Q = z.isArray,
            Y = z.isNumber,
            U = z.isObject,
            fa = z.isString,
            T = z.merge,
            W = z.objectEach,
            S = z.pick,
            ha = z.pInt,
            ba = z.relativeLength,
            N = z.removeEvent,
            Z = z.splat,
            ca = z.syncTimeout,
            ia = z.uniqueKey;
        a = function() {
            function a(b, c, a) {
                this.series = this.renderTo = this.renderer = this.pointer = this.pointCount = this.plotWidth = this.plotTop = this.plotLeft = this.plotHeight = this.plotBox = this.options = this.numberFormatter = this.margin = this.legend =
                    this.labelCollectors = this.isResizing = this.index = this.eventOptions = this.container = this.colorCounter = this.clipBox = this.chartWidth = this.chartHeight = this.bounds = this.axisOffset = this.axes = void 0;
                this.sharedClips = {};
                this.yAxis = this.xAxis = this.userOptions = this.titleOffset = this.time = this.symbolCounter = this.spacingBox = this.spacing = void 0;
                this.getArgs(b, c, a)
            }
            a.chart = function(b, c, d) {
                return new a(b, c, d)
            };
            a.prototype.getArgs = function(b, c, a) {
                fa(b) || b.nodeName ? (this.renderTo = b, this.init(c, a)) : this.init(b, c)
            };
            a.prototype.init =
                function(b, c) {
                    var a = b.plotOptions || {};
                    R(this, "init", {
                        args: arguments
                    }, function() {
                        var e = T(d, b),
                            k = e.chart;
                        W(e.plotOptions, function(b, c) {
                            U(b) && (b.tooltip = a[c] && T(a[c].tooltip) || void 0)
                        });
                        e.tooltip.userOptions = b.chart && b.chart.forExport && b.tooltip.userOptions || b.tooltip;
                        this.userOptions = b;
                        this.margin = [];
                        this.spacing = [];
                        this.bounds = {
                            h: {},
                            v: {}
                        };
                        this.labelCollectors = [];
                        this.callback = c;
                        this.isResizing = 0;
                        this.options = e;
                        this.axes = [];
                        this.series = [];
                        this.time = b.time && Object.keys(b.time).length ? new n(b.time) : y.time;
                        this.numberFormatter = k.numberFormatter || J;
                        this.styledMode = k.styledMode;
                        this.hasCartesianSeries = k.showAxes;
                        this.index = p.length;
                        p.push(this);
                        y.chartCount++;
                        M(this, k);
                        this.xAxis = [];
                        this.yAxis = [];
                        this.pointCount = this.colorCounter = this.symbolCounter = 0;
                        R(this, "afterInit");
                        this.firstRender()
                    })
                };
            a.prototype.initSeries = function(b) {
                var c = this.options.chart;
                c = b.type || c.type || c.defaultSeriesType;
                var a = C[c];
                a || L(17, !0, this, {
                    missingModuleFor: c
                });
                c = new a;
                "function" === typeof c.init && c.init(this, b);
                return c
            };
            a.prototype.setSeriesData =
                function() {
                    this.getSeriesOrderByLinks().forEach(function(b) {
                        b.points || b.data || !b.enabledDataSorting || b.setData(b.options.data, !1)
                    })
                };
            a.prototype.getSeriesOrderByLinks = function() {
                return this.series.concat().sort(function(b, c) {
                    return b.linkedSeries.length || c.linkedSeries.length ? c.linkedSeries.length - b.linkedSeries.length : 0
                })
            };
            a.prototype.orderSeries = function(b) {
                var c = this.series;
                b = b || 0;
                for (var a = c.length; b < a; ++b) c[b] && (c[b].index = b, c[b].name = c[b].getName())
            };
            a.prototype.isInsidePlot = function(b, c, a) {
                void 0 ===
                    a && (a = {});
                var d = this.inverted,
                    e = this.plotBox,
                    k = this.plotLeft,
                    f = this.plotTop,
                    g = this.scrollablePlotBox,
                    r = 0;
                var l = 0;
                a.visiblePlotOnly && this.scrollingContainer && (l = this.scrollingContainer, r = l.scrollLeft, l = l.scrollTop);
                var h = a.series;
                e = a.visiblePlotOnly && g || e;
                g = a.inverted ? c : b;
                c = a.inverted ? b : c;
                b = {
                    x: g,
                    y: c,
                    isInsidePlot: !0
                };
                if (!a.ignoreX) {
                    var p = h && (d ? h.yAxis : h.xAxis) || {
                        pos: k,
                        len: Infinity
                    };
                    g = a.paneCoordinates ? p.pos + g : k + g;
                    g >= Math.max(r + k, p.pos) && g <= Math.min(r + k + e.width, p.pos + p.len) || (b.isInsidePlot = !1)
                }!a.ignoreY &&
                    b.isInsidePlot && (d = h && (d ? h.xAxis : h.yAxis) || {
                        pos: f,
                        len: Infinity
                    }, a = a.paneCoordinates ? d.pos + c : f + c, a >= Math.max(l + f, d.pos) && a <= Math.min(l + f + e.height, d.pos + d.len) || (b.isInsidePlot = !1));
                R(this, "afterIsInsidePlot", b);
                return b.isInsidePlot
            };
            a.prototype.redraw = function(b) {
                R(this, "beforeRedraw");
                var c = this.hasCartesianSeries ? this.axes : this.colorAxis || [],
                    a = this.series,
                    d = this.pointer,
                    e = this.legend,
                    k = this.userOptions.legend,
                    f = this.renderer,
                    g = f.isHidden(),
                    r = [],
                    l = this.isDirtyBox,
                    h = this.isDirtyLegend;
                this.setResponsive &&
                    this.setResponsive(!1);
                G(this.hasRendered ? b : !1, this);
                g && this.temporaryDisplay();
                this.layOutTitles();
                for (b = a.length; b--;) {
                    var p = a[b];
                    if (p.options.stacking || p.options.centerInCategory) {
                        var u = !0;
                        if (p.isDirty) {
                            var n = !0;
                            break
                        }
                    }
                }
                if (n)
                    for (b = a.length; b--;) p = a[b], p.options.stacking && (p.isDirty = !0);
                a.forEach(function(b) {
                    b.isDirty && ("point" === b.options.legendType ? ("function" === typeof b.updateTotals && b.updateTotals(), h = !0) : k && (k.labelFormatter || k.labelFormat) && (h = !0));
                    b.isDirtyData && R(b, "updatedData")
                });
                h && e &&
                    e.options.enabled && (e.render(), this.isDirtyLegend = !1);
                u && this.getStacks();
                c.forEach(function(b) {
                    b.updateNames();
                    b.setScale()
                });
                this.getMargins();
                c.forEach(function(b) {
                    b.isDirty && (l = !0)
                });
                c.forEach(function(b) {
                    var c = b.min + "," + b.max;
                    b.extKey !== c && (b.extKey = c, r.push(function() {
                        R(b, "afterSetExtremes", aa(b.eventArgs, b.getExtremes()));
                        delete b.eventArgs
                    }));
                    (l || u) && b.redraw()
                });
                l && this.drawChartBox();
                R(this, "predraw");
                a.forEach(function(b) {
                    (l || b.isDirty) && b.visible && b.redraw();
                    b.isDirtyData = !1
                });
                d && d.reset(!0);
                f.draw();
                R(this, "redraw");
                R(this, "render");
                g && this.temporaryDisplay(!0);
                r.forEach(function(b) {
                    b.call()
                })
            };
            a.prototype.get = function(b) {
                function c(c) {
                    return c.id === b || c.options && c.options.id === b
                }
                for (var a = this.series, d = da(this.axes, c) || da(this.series, c), e = 0; !d && e < a.length; e++) d = da(a[e].points || [], c);
                return d
            };
            a.prototype.getAxes = function() {
                var b = this,
                    c = this.options,
                    a = c.xAxis = Z(c.xAxis || {});
                c = c.yAxis = Z(c.yAxis || {});
                R(this, "getAxes");
                a.forEach(function(b, c) {
                    b.index = c;
                    b.isX = !0
                });
                c.forEach(function(b, c) {
                    b.index =
                        c
                });
                a.concat(c).forEach(function(c) {
                    new t(b, c)
                });
                R(this, "afterGetAxes")
            };
            a.prototype.getSelectedPoints = function() {
                return this.series.reduce(function(b, c) {
                    c.getPointsCollection().forEach(function(c) {
                        S(c.selectedStaging, c.selected) && b.push(c)
                    });
                    return b
                }, [])
            };
            a.prototype.getSelectedSeries = function() {
                return this.series.filter(function(b) {
                    return b.selected
                })
            };
            a.prototype.setTitle = function(b, c, a) {
                this.applyDescription("title", b);
                this.applyDescription("subtitle", c);
                this.applyDescription("caption", void 0);
                this.layOutTitles(a)
            };
            a.prototype.applyDescription = function(b, c) {
                var a = this,
                    d = "title" === b ? {
                        color: "#333333",
                        fontSize: this.options.isStock ? "16px" : "18px"
                    } : {
                        color: "#666666"
                    };
                d = this.options[b] = T(!this.styledMode && {
                    style: d
                }, this.options[b], c);
                var e = this[b];
                e && c && (this[b] = e = e.destroy());
                d && !e && (e = this.renderer.text(d.text, 0, 0, d.useHTML).attr({
                        align: d.align,
                        "class": "highcharts-" + b,
                        zIndex: d.zIndex || 4
                    }).add(), e.update = function(c) {
                        a[{
                            title: "setTitle",
                            subtitle: "setSubtitle",
                            caption: "setCaption"
                        } [b]](c)
                    }, this.styledMode ||
                    e.css(d.style), this[b] = e)
            };
            a.prototype.layOutTitles = function(b) {
                var c = [0, 0, 0],
                    a = this.renderer,
                    d = this.spacingBox;
                ["title", "subtitle", "caption"].forEach(function(b) {
                    var e = this[b],
                        k = this.options[b],
                        f = k.verticalAlign || "top";
                    b = "title" === b ? "top" === f ? -3 : 0 : "top" === f ? c[0] + 2 : 0;
                    var g;
                    if (e) {
                        this.styledMode || (g = k.style && k.style.fontSize);
                        g = a.fontMetrics(g, e).b;
                        e.css({
                            width: (k.width || d.width + (k.widthAdjust || 0)) + "px"
                        });
                        var r = Math.round(e.getBBox(k.useHTML).height);
                        e.align(aa({
                                y: "bottom" === f ? g : b + g,
                                height: r
                            }, k), !1,
                            "spacingBox");
                        k.floating || ("top" === f ? c[0] = Math.ceil(c[0] + r) : "bottom" === f && (c[2] = Math.ceil(c[2] + r)))
                    }
                }, this);
                c[0] && "top" === (this.options.title.verticalAlign || "top") && (c[0] += this.options.title.margin);
                c[2] && "bottom" === this.options.caption.verticalAlign && (c[2] += this.options.caption.margin);
                var e = !this.titleOffset || this.titleOffset.join(",") !== c.join(",");
                this.titleOffset = c;
                R(this, "afterLayOutTitles");
                !this.isDirtyBox && e && (this.isDirtyBox = this.isDirtyLegend = e, this.hasRendered && S(b, !0) && this.isDirtyBox &&
                    this.redraw())
            };
            a.prototype.getChartSize = function() {
                var b = this.options.chart,
                    c = b.width;
                b = b.height;
                var a = this.renderTo;
                P(c) || (this.containerWidth = ea(a, "width"));
                P(b) || (this.containerHeight = ea(a, "height"));
                this.chartWidth = Math.max(0, c || this.containerWidth || 600);
                this.chartHeight = Math.max(0, ba(b, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
            };
            a.prototype.temporaryDisplay = function(b) {
                var c = this.renderTo;
                if (b)
                    for (; c && c.style;) c.hcOrigStyle && (A(c, c.hcOrigStyle), delete c.hcOrigStyle),
                        c.hcOrigDetached && (l.body.removeChild(c), c.hcOrigDetached = !1), c = c.parentNode;
                else
                    for (; c && c.style;) {
                        l.body.contains(c) || c.parentNode || (c.hcOrigDetached = !0, l.body.appendChild(c));
                        if ("none" === ea(c, "display", !1) || c.hcOricDetached) c.hcOrigStyle = {
                            display: c.style.display,
                            height: c.style.height,
                            overflow: c.style.overflow
                        }, b = {
                            display: "block",
                            overflow: "hidden"
                        }, c !== this.renderTo && (b.height = 0), A(c, b), c.offsetWidth || c.style.setProperty("display", "block", "important");
                        c = c.parentNode;
                        if (c === l.body) break
                    }
            };
            a.prototype.setClassName =
                function(b) {
                    this.container.className = "highcharts-container " + (b || "")
                };
            a.prototype.getContainer = function() {
                var a = this.options,
                    d = a.chart,
                    e = ia(),
                    k, f = this.renderTo;
                f || (this.renderTo = f = d.renderTo);
                fa(f) && (this.renderTo = f = l.getElementById(f));
                f || L(13, !0, this);
                var h = ha(K(f, "data-highcharts-chart"));
                Y(h) && p[h] && p[h].hasRendered && p[h].destroy();
                K(f, "data-highcharts-chart", this.index);
                f.innerHTML = g.emptyHTML;
                d.skipClone || f.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                h = this.chartWidth;
                var u = this.chartHeight;
                A(f, {
                    overflow: "hidden"
                });
                this.styledMode || (k = aa({
                    position: "relative",
                    overflow: "hidden",
                    width: h + "px",
                    height: u + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                    userSelect: "none",
                    "touch-action": "manipulation",
                    outline: "none"
                }, d.style || {}));
                this.container = e = r("div", {
                    id: e
                }, k, f);
                this._cursor = e.style.cursor;
                this.renderer = new(d.renderer || !b ? m.getRendererType(d.renderer) : c)(e, h, u, void 0, d.forExport, a.exporting && a.exporting.allowHTML, this.styledMode);
                G(void 0,
                    this);
                this.setClassName(d.className);
                if (this.styledMode)
                    for (var n in a.defs) this.renderer.definition(a.defs[n]);
                else this.renderer.setStyle(d.style);
                this.renderer.chartIndex = this.index;
                R(this, "afterGetContainer")
            };
            a.prototype.getMargins = function(b) {
                var c = this.spacing,
                    a = this.margin,
                    d = this.titleOffset;
                this.resetMargins();
                d[0] && !P(a[0]) && (this.plotTop = Math.max(this.plotTop, d[0] + c[0]));
                d[2] && !P(a[2]) && (this.marginBottom = Math.max(this.marginBottom, d[2] + c[2]));
                this.legend && this.legend.display && this.legend.adjustMargins(a,
                    c);
                R(this, "getMargins");
                b || this.getAxisMargins()
            };
            a.prototype.getAxisMargins = function() {
                var b = this,
                    c = b.axisOffset = [0, 0, 0, 0],
                    a = b.colorAxis,
                    d = b.margin,
                    e = function(b) {
                        b.forEach(function(b) {
                            b.visible && b.getOffset()
                        })
                    };
                b.hasCartesianSeries ? e(b.axes) : a && a.length && e(a);
                w.forEach(function(a, e) {
                    P(d[e]) || (b[a] += c[e])
                });
                b.setChartSize()
            };
            a.prototype.reflow = function(b) {
                var c = this,
                    a = c.options.chart,
                    d = c.renderTo,
                    e = P(a.width) && P(a.height),
                    k = a.width || ea(d, "width");
                a = a.height || ea(d, "height");
                d = b ? b.target : v;
                delete c.pointer.chartPosition;
                if (!e && !c.isPrinting && k && a && (d === v || d === l)) {
                    if (k !== c.containerWidth || a !== c.containerHeight) z.clearTimeout(c.reflowTimeout), c.reflowTimeout = ca(function() {
                        c.container && c.setSize(void 0, void 0, !1)
                    }, b ? 100 : 0);
                    c.containerWidth = k;
                    c.containerHeight = a
                }
            };
            a.prototype.setReflow = function(b) {
                var c = this;
                !1 === b || this.unbindReflow ? !1 === b && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = k(v, "resize", function(b) {
                    c.options && c.reflow(b)
                }), k(this, "destroy", this.unbindReflow))
            };
            a.prototype.setSize =
                function(b, c, a) {
                    var d = this,
                        k = d.renderer;
                    d.isResizing += 1;
                    G(a, d);
                    a = k.globalAnimation;
                    d.oldChartHeight = d.chartHeight;
                    d.oldChartWidth = d.chartWidth;
                    "undefined" !== typeof b && (d.options.chart.width = b);
                    "undefined" !== typeof c && (d.options.chart.height = c);
                    d.getChartSize();
                    d.styledMode || (a ? f : A)(d.container, {
                        width: d.chartWidth + "px",
                        height: d.chartHeight + "px"
                    }, a);
                    d.setChartSize(!0);
                    k.setSize(d.chartWidth, d.chartHeight, a);
                    d.axes.forEach(function(b) {
                        b.isDirty = !0;
                        b.setScale()
                    });
                    d.isDirtyLegend = !0;
                    d.isDirtyBox = !0;
                    d.layOutTitles();
                    d.getMargins();
                    d.redraw(a);
                    d.oldChartHeight = null;
                    R(d, "resize");
                    ca(function() {
                        d && R(d, "endResize", null, function() {
                            --d.isResizing
                        })
                    }, e(a).duration)
                };
            a.prototype.setChartSize = function(b) {
                var c = this.inverted,
                    a = this.renderer,
                    d = this.chartWidth,
                    e = this.chartHeight,
                    k = this.options.chart,
                    f = this.spacing,
                    g = this.clipOffset,
                    r, h, l, p;
                this.plotLeft = r = Math.round(this.plotLeft);
                this.plotTop = h = Math.round(this.plotTop);
                this.plotWidth = l = Math.max(0, Math.round(d - r - this.marginRight));
                this.plotHeight = p = Math.max(0, Math.round(e -
                    h - this.marginBottom));
                this.plotSizeX = c ? p : l;
                this.plotSizeY = c ? l : p;
                this.plotBorderWidth = k.plotBorderWidth || 0;
                this.spacingBox = a.spacingBox = {
                    x: f[3],
                    y: f[0],
                    width: d - f[3] - f[1],
                    height: e - f[0] - f[2]
                };
                this.plotBox = a.plotBox = {
                    x: r,
                    y: h,
                    width: l,
                    height: p
                };
                c = 2 * Math.floor(this.plotBorderWidth / 2);
                d = Math.ceil(Math.max(c, g[3]) / 2);
                e = Math.ceil(Math.max(c, g[0]) / 2);
                this.clipBox = {
                    x: d,
                    y: e,
                    width: Math.floor(this.plotSizeX - Math.max(c, g[1]) / 2 - d),
                    height: Math.max(0, Math.floor(this.plotSizeY - Math.max(c, g[2]) / 2 - e))
                };
                b || (this.axes.forEach(function(b) {
                    b.setAxisSize();
                    b.setAxisTranslation()
                }), a.alignElements());
                R(this, "afterSetChartSize", {
                    skipAxes: b
                })
            };
            a.prototype.resetMargins = function() {
                R(this, "resetMargins");
                var b = this,
                    c = b.options.chart;
                ["margin", "spacing"].forEach(function(a) {
                    var d = c[a],
                        e = U(d) ? d : [d, d, d, d];
                    ["Top", "Right", "Bottom", "Left"].forEach(function(d, k) {
                        b[a][k] = S(c[a + d], e[k])
                    })
                });
                w.forEach(function(c, a) {
                    b[c] = S(b.margin[a], b.spacing[a])
                });
                b.axisOffset = [0, 0, 0, 0];
                b.clipOffset = [0, 0, 0, 0]
            };
            a.prototype.drawChartBox = function() {
                var b = this.options.chart,
                    c = this.renderer,
                    a = this.chartWidth,
                    d = this.chartHeight,
                    e = this.styledMode,
                    k = this.plotBGImage,
                    f = b.backgroundColor,
                    g = b.plotBackgroundColor,
                    r = b.plotBackgroundImage,
                    h = this.plotLeft,
                    l = this.plotTop,
                    p = this.plotWidth,
                    u = this.plotHeight,
                    n = this.plotBox,
                    A = this.clipRect,
                    v = this.clipBox,
                    w = this.chartBackground,
                    m = this.plotBackground,
                    q = this.plotBorder,
                    Q, z = "animate";
                w || (this.chartBackground = w = c.rect().addClass("highcharts-background").add(), z = "attr");
                if (e) var K = Q = w.strokeWidth();
                else {
                    K = b.borderWidth || 0;
                    Q = K + (b.shadow ? 8 : 0);
                    f = {
                        fill: f || "none"
                    };
                    if (K || w["stroke-width"]) f.stroke = b.borderColor, f["stroke-width"] = K;
                    w.attr(f).shadow(b.shadow)
                }
                w[z]({
                    x: Q / 2,
                    y: Q / 2,
                    width: a - Q - K % 2,
                    height: d - Q - K % 2,
                    r: b.borderRadius
                });
                z = "animate";
                m || (z = "attr", this.plotBackground = m = c.rect().addClass("highcharts-plot-background").add());
                m[z](n);
                e || (m.attr({
                    fill: g || "none"
                }).shadow(b.plotShadow), r && (k ? (r !== k.attr("href") && k.attr("href", r), k.animate(n)) : this.plotBGImage = c.image(r, h, l, p, u).add()));
                A ? A.animate({
                    width: v.width,
                    height: v.height
                }) : this.clipRect = c.clipRect(v);
                z = "animate";
                q || (z = "attr", this.plotBorder = q = c.rect().addClass("highcharts-plot-border").attr({
                    zIndex: 1
                }).add());
                e || q.attr({
                    stroke: b.plotBorderColor,
                    "stroke-width": b.plotBorderWidth || 0,
                    fill: "none"
                });
                q[z](q.crisp({
                    x: h,
                    y: l,
                    width: p,
                    height: u
                }, -q.strokeWidth()));
                this.isDirtyBox = !1;
                R(this, "afterDrawChartBox")
            };
            a.prototype.propFromSeries = function() {
                var b = this,
                    c = b.options.chart,
                    a = b.options.series,
                    d, e, k;
                ["inverted", "angular", "polar"].forEach(function(f) {
                    e = C[c.type || c.defaultSeriesType];
                    k = c[f] || e && e.prototype[f];
                    for (d = a &&
                        a.length; !k && d--;)(e = C[a[d].type]) && e.prototype[f] && (k = !0);
                    b[f] = k
                })
            };
            a.prototype.linkSeries = function() {
                var b = this,
                    c = b.series;
                c.forEach(function(b) {
                    b.linkedSeries.length = 0
                });
                c.forEach(function(c) {
                    var a = c.options.linkedTo;
                    fa(a) && (a = ":previous" === a ? b.series[c.index - 1] : b.get(a)) && a.linkedParent !== c && (a.linkedSeries.push(c), c.linkedParent = a, a.enabledDataSorting && c.setDataSortingOptions(), c.visible = S(c.options.visible, a.options.visible, c.visible))
                });
                R(this, "afterLinkSeries")
            };
            a.prototype.renderSeries = function() {
                this.series.forEach(function(b) {
                    b.translate();
                    b.render()
                })
            };
            a.prototype.renderLabels = function() {
                var b = this,
                    c = b.options.labels;
                c.items && c.items.forEach(function(a) {
                    var d = aa(c.style, a.style),
                        e = ha(d.left) + b.plotLeft,
                        k = ha(d.top) + b.plotTop + 12;
                    delete d.left;
                    delete d.top;
                    b.renderer.text(a.html, e, k).attr({
                        zIndex: 2
                    }).css(d).add()
                })
            };
            a.prototype.render = function() {
                var b = this.axes,
                    c = this.colorAxis,
                    a = this.renderer,
                    d = this.options,
                    e = function(b) {
                        b.forEach(function(b) {
                            b.visible && b.render()
                        })
                    },
                    k = 0;
                this.setTitle();
                this.legend = new F(this, d.legend);
                this.getStacks &&
                    this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                d = this.plotWidth;
                b.some(function(b) {
                    if (b.horiz && b.visible && b.options.labels.enabled && b.series.length) return k = 21, !0
                });
                var f = this.plotHeight = Math.max(this.plotHeight - k, 0);
                b.forEach(function(b) {
                    b.setScale()
                });
                this.getAxisMargins();
                var g = 1.1 < d / this.plotWidth,
                    r = 1.05 < f / this.plotHeight;
                if (g || r) b.forEach(function(b) {
                    (b.horiz && g || !b.horiz && r) && b.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries ? e(b) : c && c.length && e(c);
                this.seriesGroup || (this.seriesGroup = a.g("series-group").attr({
                    zIndex: 3
                }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            };
            a.prototype.addCredits = function(b) {
                var c = this,
                    a = T(!0, this.options.credits, b);
                a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() {
                        a.href && (v.location.href = a.href)
                    }).attr({
                        align: a.position.align,
                        zIndex: 8
                    }), c.styledMode ||
                    this.credits.css(a.style), this.credits.add().align(a.position), this.credits.update = function(b) {
                        c.credits = c.credits.destroy();
                        c.addCredits(b)
                    })
            };
            a.prototype.destroy = function() {
                var b = this,
                    c = b.axes,
                    a = b.series,
                    d = b.container,
                    e = d && d.parentNode,
                    k;
                R(b, "destroy");
                b.renderer.forExport ? u(p, b) : p[b.index] = void 0;
                y.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                N(b);
                for (k = c.length; k--;) c[k] = c[k].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (k = a.length; k--;) a[k] = a[k].destroy();
                "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function(c) {
                    var a = b[c];
                    a && a.destroy && (b[c] = a.destroy())
                });
                d && (d.innerHTML = g.emptyHTML, N(d), e && E(d));
                W(b, function(c, a) {
                    delete b[a]
                })
            };
            a.prototype.firstRender = function() {
                var b = this,
                    c = b.options;
                if (!b.isReadyToRender || b.isReadyToRender()) {
                    b.getContainer();
                    b.resetMargins();
                    b.setChartSize();
                    b.propFromSeries();
                    b.getAxes();
                    (Q(c.series) ?
                        c.series : []).forEach(function(c) {
                        b.initSeries(c)
                    });
                    b.linkSeries();
                    b.setSeriesData();
                    R(b, "beforeRender");
                    q && (I.isRequired() ? b.pointer = new I(b, c) : b.pointer = new q(b, c));
                    b.render();
                    b.pointer.getChartPosition();
                    if (!b.renderer.imgCount && !b.hasLoaded) b.onload();
                    b.temporaryDisplay(!0)
                }
            };
            a.prototype.onload = function() {
                this.callbacks.concat([this.callback]).forEach(function(b) {
                    b && "undefined" !== typeof this.index && b.apply(this, [this])
                }, this);
                R(this, "load");
                R(this, "render");
                P(this.index) && this.setReflow(this.options.chart.reflow);
                this.hasLoaded = !0
            };
            a.prototype.addSeries = function(b, c, a) {
                var d = this,
                    e;
                b && (c = S(c, !0), R(d, "addSeries", {
                    options: b
                }, function() {
                    e = d.initSeries(b);
                    d.isDirtyLegend = !0;
                    d.linkSeries();
                    e.enabledDataSorting && e.setData(b.data, !1);
                    R(d, "afterAddSeries", {
                        series: e
                    });
                    c && d.redraw(a)
                }));
                return e
            };
            a.prototype.addAxis = function(b, c, a, d) {
                return this.createAxis(c ? "xAxis" : "yAxis", {
                    axis: b,
                    redraw: a,
                    animation: d
                })
            };
            a.prototype.addColorAxis = function(b, c, a) {
                return this.createAxis("colorAxis", {
                    axis: b,
                    redraw: c,
                    animation: a
                })
            };
            a.prototype.createAxis =
                function(b, c) {
                    b = new t(this, T(c.axis, {
                        index: this[b].length,
                        isX: "xAxis" === b
                    }));
                    S(c.redraw, !0) && this.redraw(c.animation);
                    return b
                };
            a.prototype.showLoading = function(b) {
                var c = this,
                    a = c.options,
                    d = a.loading,
                    e = function() {
                        h && A(h, {
                            left: c.plotLeft + "px",
                            top: c.plotTop + "px",
                            width: c.plotWidth + "px",
                            height: c.plotHeight + "px"
                        })
                    },
                    h = c.loadingDiv,
                    l = c.loadingSpan;
                h || (c.loadingDiv = h = r("div", {
                    className: "highcharts-loading highcharts-loading-hidden"
                }, null, c.container));
                l || (c.loadingSpan = l = r("span", {
                        className: "highcharts-loading-inner"
                    },
                    null, h), k(c, "redraw", e));
                h.className = "highcharts-loading";
                g.setElementHTML(l, S(b, a.lang.loading, ""));
                c.styledMode || (A(h, aa(d.style, {
                    zIndex: 10
                })), A(l, d.labelStyle), c.loadingShown || (A(h, {
                    opacity: 0,
                    display: ""
                }), f(h, {
                    opacity: d.style.opacity || .5
                }, {
                    duration: d.showDuration || 0
                })));
                c.loadingShown = !0;
                e()
            };
            a.prototype.hideLoading = function() {
                var b = this.options,
                    c = this.loadingDiv;
                c && (c.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || f(c, {
                    opacity: 0
                }, {
                    duration: b.loading.hideDuration || 100,
                    complete: function() {
                        A(c, {
                            display: "none"
                        })
                    }
                }));
                this.loadingShown = !1
            };
            a.prototype.update = function(b, c, a, d) {
                var e = this,
                    k = {
                        credits: "addCredits",
                        title: "setTitle",
                        subtitle: "setSubtitle",
                        caption: "setCaption"
                    },
                    f = b.isResponsiveOptions,
                    g = [],
                    r, h;
                R(e, "update", {
                    options: b
                });
                f || e.setResponsive(!1, !0);
                b = O(b, e.options);
                e.userOptions = T(e.userOptions, b);
                var l = b.chart;
                if (l) {
                    T(!0, e.options.chart, l);
                    "className" in l && e.setClassName(l.className);
                    "reflow" in l && e.setReflow(l.reflow);
                    if ("inverted" in l || "polar" in l || "type" in
                        l) {
                        e.propFromSeries();
                        var p = !0
                    }
                    "alignTicks" in l && (p = !0);
                    "events" in l && M(this, l);
                    W(l, function(b, c) {
                        -1 !== e.propsRequireUpdateSeries.indexOf("chart." + c) && (r = !0); - 1 !== e.propsRequireDirtyBox.indexOf(c) && (e.isDirtyBox = !0); - 1 !== e.propsRequireReflow.indexOf(c) && (f ? e.isDirtyBox = !0 : h = !0)
                    });
                    !e.styledMode && l.style && e.renderer.setStyle(e.options.chart.style || {})
                }!e.styledMode && b.colors && (this.options.colors = b.colors);
                b.time && (this.time === D && (this.time = new n(b.time)), T(!0, e.options.time, b.time));
                W(b, function(c,
                    a) {
                    if (e[a] && "function" === typeof e[a].update) e[a].update(c, !1);
                    else if ("function" === typeof e[k[a]]) e[k[a]](c);
                    else "colors" !== a && -1 === e.collectionsWithUpdate.indexOf(a) && T(!0, e.options[a], b[a]);
                    "chart" !== a && -1 !== e.propsRequireUpdateSeries.indexOf(a) && (r = !0)
                });
                this.collectionsWithUpdate.forEach(function(c) {
                    if (b[c]) {
                        var d = [];
                        e[c].forEach(function(b, c) {
                            b.options.isInternal || d.push(S(b.options.index, c))
                        });
                        Z(b[c]).forEach(function(b, k) {
                            var f = P(b.id),
                                g;
                            f && (g = e.get(b.id));
                            !g && e[c] && (g = e[c][d ? d[k] : k]) && f &&
                                P(g.options.id) && (g = void 0);
                            g && g.coll === c && (g.update(b, !1), a && (g.touched = !0));
                            !g && a && e.collectionsWithInit[c] && (e.collectionsWithInit[c][0].apply(e, [b].concat(e.collectionsWithInit[c][1] || []).concat([!1])).touched = !0)
                        });
                        a && e[c].forEach(function(b) {
                            b.touched || b.options.isInternal ? delete b.touched : g.push(b)
                        })
                    }
                });
                g.forEach(function(b) {
                    b.chart && b.remove && b.remove(!1)
                });
                p && e.axes.forEach(function(b) {
                    b.update({}, !1)
                });
                r && e.getSeriesOrderByLinks().forEach(function(b) {
                    b.chart && b.update({}, !1)
                }, this);
                p = l &&
                    l.width;
                l = l && (fa(l.height) ? ba(l.height, p || e.chartWidth) : l.height);
                h || Y(p) && p !== e.chartWidth || Y(l) && l !== e.chartHeight ? e.setSize(p, l, d) : S(c, !0) && e.redraw(d);
                R(e, "afterUpdate", {
                    options: b,
                    redraw: c,
                    animation: d
                })
            };
            a.prototype.setSubtitle = function(b, c) {
                this.applyDescription("subtitle", b);
                this.layOutTitles(c)
            };
            a.prototype.setCaption = function(b, c) {
                this.applyDescription("caption", b);
                this.layOutTitles(c)
            };
            a.prototype.showResetZoom = function() {
                function b() {
                    c.zoomOut()
                }
                var c = this,
                    a = d.lang,
                    e = c.options.chart.resetZoomButton,
                    k = e.theme,
                    f = k.states,
                    g = "chart" === e.relativeTo || "spacingBox" === e.relativeTo ? null : "scrollablePlotBox";
                R(this, "beforeShowResetZoom", null, function() {
                    c.resetZoomButton = c.renderer.button(a.resetZoom, null, null, b, k, f && f.hover).attr({
                        align: e.position.align,
                        title: a.resetZoomTitle
                    }).addClass("highcharts-reset-zoom").add().align(e.position, !1, g)
                });
                R(this, "afterShowResetZoom")
            };
            a.prototype.zoomOut = function() {
                R(this, "selection", {
                    resetSelection: !0
                }, this.zoom)
            };
            a.prototype.zoom = function(b) {
                var c = this,
                    a = c.pointer,
                    d = c.inverted ? a.mouseDownX : a.mouseDownY,
                    e = !1,
                    k;
                !b || b.resetSelection ? (c.axes.forEach(function(b) {
                    k = b.zoom()
                }), a.initiated = !1) : b.xAxis.concat(b.yAxis).forEach(function(b) {
                    var f = b.axis,
                        g = c.inverted ? f.left : f.top,
                        r = c.inverted ? g + f.width : g + f.height,
                        l = f.isXAxis,
                        h = !1;
                    if (!l && d >= g && d <= r || l || !P(d)) h = !0;
                    a[l ? "zoomX" : "zoomY"] && h && (k = f.zoom(b.min, b.max), f.displayBtn && (e = !0))
                });
                var f = c.resetZoomButton;
                e && !f ? c.showResetZoom() : !e && U(f) && (c.resetZoomButton = f.destroy());
                k && c.redraw(S(c.options.chart.animation, b && b.animation,
                    100 > c.pointCount))
            };
            a.prototype.pan = function(b, c) {
                var a = this,
                    d = a.hoverPoints;
                c = "object" === typeof c ? c : {
                    enabled: c,
                    type: "x"
                };
                var e = a.options.chart,
                    k = a.options.mapNavigation && a.options.mapNavigation.enabled;
                e && e.panning && (e.panning = c);
                var f = c.type,
                    g;
                R(this, "pan", {
                    originalEvent: b
                }, function() {
                    d && d.forEach(function(b) {
                        b.setState()
                    });
                    var c = a.xAxis;
                    "xy" === f ? c = c.concat(a.yAxis) : "y" === f && (c = a.yAxis);
                    var e = {};
                    c.forEach(function(c) {
                        if (c.options.panningEnabled && !c.options.isInternal) {
                            var d = c.horiz,
                                r = b[d ? "chartX" :
                                    "chartY"];
                            d = d ? "mouseDownX" : "mouseDownY";
                            var l = a[d],
                                h = c.minPointOffset || 0,
                                p = c.reversed && !a.inverted || !c.reversed && a.inverted ? -1 : 1,
                                u = c.getExtremes(),
                                n = c.toValue(l - r, !0) + h * p,
                                A = c.toValue(l + c.len - r, !0) - (h * p || c.isXAxis && c.pointRangePadding || 0),
                                v = A < n;
                            p = c.hasVerticalPanning();
                            l = v ? A : n;
                            n = v ? n : A;
                            var w = c.panningState;
                            !p || c.isXAxis || w && !w.isDirty || c.series.forEach(function(b) {
                                var c = b.getProcessedData(!0);
                                c = b.getExtremes(c.yData, !0);
                                w || (w = {
                                    startMin: Number.MAX_VALUE,
                                    startMax: -Number.MAX_VALUE
                                });
                                Y(c.dataMin) && Y(c.dataMax) &&
                                    (w.startMin = Math.min(S(b.options.threshold, Infinity), c.dataMin, w.startMin), w.startMax = Math.max(S(b.options.threshold, -Infinity), c.dataMax, w.startMax))
                            });
                            p = Math.min(S(w && w.startMin, u.dataMin), h ? u.min : c.toValue(c.toPixels(u.min) - c.minPixelPadding));
                            A = Math.max(S(w && w.startMax, u.dataMax), h ? u.max : c.toValue(c.toPixels(u.max) + c.minPixelPadding));
                            c.panningState = w;
                            c.isOrdinal || (h = p - l, 0 < h && (n += h, l = p), h = n - A, 0 < h && (n = A, l -= h), c.series.length && l !== u.min && n !== u.max && l >= p && n <= A && (c.setExtremes(l, n, !1, !1, {
                                    trigger: "pan"
                                }),
                                a.resetZoomButton || k || l === p || n === A || !f.match("y") || (a.showResetZoom(), c.displayBtn = !1), g = !0), e[d] = r)
                        }
                    });
                    W(e, function(b, c) {
                        a[c] = b
                    });
                    g && a.redraw(!1);
                    A(a.container, {
                        cursor: "move"
                    })
                })
            };
            return a
        }();
        aa(a.prototype, {
            callbacks: [],
            collectionsWithInit: {
                xAxis: [a.prototype.addAxis, [!0]],
                yAxis: [a.prototype.addAxis, [!1]],
                series: [a.prototype.addSeries]
            },
            collectionsWithUpdate: ["xAxis", "yAxis", "series"],
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireReflow: "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" ")
        });
        "";
        return a
    });
    N(a, "Core/Legend/LegendSymbol.js", [a["Core/Utilities.js"]], function(a) {
        var E = a.merge,
            B = a.pick,
            H;
        (function(a) {
            a.drawLineMarker = function(a) {
                var t = this.options,
                    x = a.symbolWidth,
                    q = a.symbolHeight,
                    m = q / 2,
                    h = this.chart.renderer,
                    c = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var n = {},
                    z = t.marker;
                this.chart.styledMode || (n = {
                    "stroke-width": t.lineWidth || 0
                }, t.dashStyle && (n.dashstyle = t.dashStyle));
                this.legendLine = h.path([
                    ["M", 0, a],
                    ["L", x, a]
                ]).addClass("highcharts-graph").attr(n).add(c);
                z && !1 !== z.enabled && x && (t = Math.min(B(z.radius, m), m), 0 === this.symbol.indexOf("url") && (z = E(z, {
                    width: q,
                    height: q
                }), t = 0), this.legendSymbol = x = h.symbol(this.symbol, x / 2 - t, a - t, 2 * t, 2 * t, z).addClass("highcharts-point").add(c), x.isMarker = !0)
            };
            a.drawRectangle =
                function(a, t) {
                    var x = a.symbolHeight,
                        q = a.options.squareSymbol;
                    t.legendSymbol = this.chart.renderer.rect(q ? (a.symbolWidth - x) / 2 : 0, a.baseline - x + 1, q ? x : a.symbolWidth, x, B(a.options.symbolRadius, x / 2)).addClass("highcharts-point").attr({
                        zIndex: 3
                    }).add(t.legendGroup)
                }
        })(H || (H = {}));
        return H
    });
    N(a, "Core/Series/SeriesDefaults.js", [], function() {
        return {
            lineWidth: 2,
            allowPointSelect: !1,
            crisp: !0,
            showCheckbox: !1,
            animation: {
                duration: 1E3
            },
            events: {},
            marker: {
                enabledThreshold: 2,
                lineColor: "#ffffff",
                lineWidth: 0,
                radius: 4,
                states: {
                    normal: {
                        animation: !0
                    },
                    hover: {
                        animation: {
                            duration: 50
                        },
                        enabled: !0,
                        radiusPlus: 2,
                        lineWidthPlus: 1
                    },
                    select: {
                        fillColor: "#cccccc",
                        lineColor: "#000000",
                        lineWidth: 2
                    }
                }
            },
            point: {
                events: {}
            },
            dataLabels: {
                animation: {},
                align: "center",
                defer: !0,
                formatter: function() {
                    var a = this.series.chart.numberFormatter;
                    return "number" !== typeof this.y ? "" : a(this.y, -1)
                },
                padding: 5,
                style: {
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "contrast",
                    textOutline: "1px contrast"
                },
                verticalAlign: "bottom",
                x: 0,
                y: 0
            },
            cropThreshold: 300,
            opacity: 1,
            pointRange: 0,
            softThreshold: !0,
            states: {
                normal: {
                    animation: !0
                },
                hover: {
                    animation: {
                        duration: 50
                    },
                    lineWidthPlus: 1,
                    marker: {},
                    halo: {
                        size: 10,
                        opacity: .25
                    }
                },
                select: {
                    animation: {
                        duration: 0
                    }
                },
                inactive: {
                    animation: {
                        duration: 50
                    },
                    opacity: .2
                }
            },
            stickyTracking: !0,
            turboThreshold: 1E3,
            findNearestPointBy: "x"
        }
    });
    N(a, "Core/Series/Series.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/DefaultOptions.js"], a["Core/Foundation.js"], a["Core/Globals.js"], a["Core/Legend/LegendSymbol.js"], a["Core/Series/Point.js"], a["Core/Series/SeriesDefaults.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Renderer/SVG/SVGElement.js"],
        a["Core/Utilities.js"]
    ], function(a, t, B, H, y, F, I, x, q, m) {
        var h = a.animObject,
            c = a.setAnimation,
            n = t.defaultOptions,
            z = B.registerEventOptions,
            g = H.hasTouch,
            f = H.svg,
            e = H.win,
            G = x.seriesTypes,
            J = m.addEvent,
            M = m.arrayMax,
            p = m.arrayMin,
            l = m.clamp,
            w = m.cleanRecursively,
            b = m.correctFloat,
            v = m.defined,
            d = m.erase,
            D = m.error,
            C = m.extend,
            k = m.find,
            K = m.fireEvent,
            O = m.getNestedProperty,
            r = m.isArray,
            A = m.isNumber,
            P = m.isString,
            E = m.merge,
            u = m.objectEach,
            L = m.pick,
            aa = m.removeEvent,
            da = m.splat,
            R = m.syncTimeout;
        a = function() {
            function a() {
                this.zones =
                    this.yAxis = this.xAxis = this.userOptions = this.tooltipOptions = this.processedYData = this.processedXData = this.points = this.options = this.linkedSeries = this.index = this.eventsToUnbind = this.eventOptions = this.data = this.chart = this._i = void 0
            }
            a.prototype.init = function(b, c) {
                K(this, "init", {
                    options: c
                });
                var a = this,
                    d = b.series;
                this.eventsToUnbind = [];
                a.chart = b;
                a.options = a.setOptions(c);
                c = a.options;
                a.linkedSeries = [];
                a.bindAxes();
                C(a, {
                    name: c.name,
                    state: "",
                    visible: !1 !== c.visible,
                    selected: !0 === c.selected
                });
                z(this, c);
                var e =
                    c.events;
                if (e && e.click || c.point && c.point.events && c.point.events.click || c.allowPointSelect) b.runTrackerClick = !0;
                a.getColor();
                a.getSymbol();
                a.parallelArrays.forEach(function(b) {
                    a[b + "Data"] || (a[b + "Data"] = [])
                });
                a.isCartesian && (b.hasCartesianSeries = !0);
                var k;
                d.length && (k = d[d.length - 1]);
                a._i = L(k && k._i, -1) + 1;
                a.opacity = a.options.opacity;
                b.orderSeries(this.insert(d));
                c.dataSorting && c.dataSorting.enabled ? a.setDataSortingOptions() : a.points || a.data || a.setData(c.data, !1);
                K(this, "afterInit")
            };
            a.prototype.is = function(b) {
                return G[b] &&
                    this instanceof G[b]
            };
            a.prototype.insert = function(b) {
                var c = this.options.index,
                    a;
                if (A(c)) {
                    for (a = b.length; a--;)
                        if (c >= L(b[a].options.index, b[a]._i)) {
                            b.splice(a + 1, 0, this);
                            break
                        } - 1 === a && b.unshift(this);
                    a += 1
                } else b.push(this);
                return L(a, b.length - 1)
            };
            a.prototype.bindAxes = function() {
                var b = this,
                    c = b.options,
                    a = b.chart,
                    d;
                K(this, "bindAxes", null, function() {
                    (b.axisTypes || []).forEach(function(e) {
                        var k = 0;
                        a[e].forEach(function(a) {
                            d = a.options;
                            if (c[e] === k && !d.isInternal || "undefined" !== typeof c[e] && c[e] === d.id || "undefined" ===
                                typeof c[e] && 0 === d.index) b.insert(a.series), b[e] = a, a.isDirty = !0;
                            d.isInternal || k++
                        });
                        b[e] || b.optionalAxis === e || D(18, !0, a)
                    })
                });
                K(this, "afterBindAxes")
            };
            a.prototype.updateParallelArrays = function(b, c) {
                var a = b.series,
                    d = arguments,
                    e = A(c) ? function(d) {
                        var e = "y" === d && a.toYData ? a.toYData(b) : b[d];
                        a[d + "Data"][c] = e
                    } : function(b) {
                        Array.prototype[c].apply(a[b + "Data"], Array.prototype.slice.call(d, 2))
                    };
                a.parallelArrays.forEach(e)
            };
            a.prototype.hasData = function() {
                return this.visible && "undefined" !== typeof this.dataMax &&
                    "undefined" !== typeof this.dataMin || this.visible && this.yData && 0 < this.yData.length
            };
            a.prototype.autoIncrement = function(b) {
                var c = this.options,
                    a = c.pointIntervalUnit,
                    d = c.relativeXValue,
                    e = this.chart.time,
                    k = this.xIncrement,
                    f;
                k = L(k, c.pointStart, 0);
                this.pointInterval = f = L(this.pointInterval, c.pointInterval, 1);
                d && A(b) && (f *= b);
                a && (c = new e.Date(k), "day" === a ? e.set("Date", c, e.get("Date", c) + f) : "month" === a ? e.set("Month", c, e.get("Month", c) + f) : "year" === a && e.set("FullYear", c, e.get("FullYear", c) + f), f = c.getTime() - k);
                if (d &&
                    A(b)) return k + f;
                this.xIncrement = k + f;
                return k
            };
            a.prototype.setDataSortingOptions = function() {
                var b = this.options;
                C(this, {
                    requireSorting: !1,
                    sorted: !1,
                    enabledDataSorting: !0,
                    allowDG: !1
                });
                v(b.pointRange) || (b.pointRange = 1)
            };
            a.prototype.setOptions = function(b) {
                var c = this.chart,
                    a = c.options,
                    d = a.plotOptions,
                    e = c.userOptions || {};
                b = E(b);
                c = c.styledMode;
                var k = {
                    plotOptions: d,
                    userOptions: b
                };
                K(this, "setOptions", k);
                var f = k.plotOptions[this.type],
                    g = e.plotOptions || {};
                this.userOptions = k.userOptions;
                e = E(f, d.series, e.plotOptions &&
                    e.plotOptions[this.type], b);
                this.tooltipOptions = E(n.tooltip, n.plotOptions.series && n.plotOptions.series.tooltip, n.plotOptions[this.type].tooltip, a.tooltip.userOptions, d.series && d.series.tooltip, d[this.type].tooltip, b.tooltip);
                this.stickyTracking = L(b.stickyTracking, g[this.type] && g[this.type].stickyTracking, g.series && g.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : e.stickyTracking);
                null === f.marker && delete e.marker;
                this.zoneAxis = e.zoneAxis;
                d = this.zones = (e.zones || []).slice();
                !e.negativeColor && !e.negativeFillColor || e.zones || (a = {
                    value: e[this.zoneAxis + "Threshold"] || e.threshold || 0,
                    className: "highcharts-negative"
                }, c || (a.color = e.negativeColor, a.fillColor = e.negativeFillColor), d.push(a));
                d.length && v(d[d.length - 1].value) && d.push(c ? {} : {
                    color: this.color,
                    fillColor: this.fillColor
                });
                K(this, "afterSetOptions", {
                    options: e
                });
                return e
            };
            a.prototype.getName = function() {
                return L(this.options.name, "Series " + (this.index + 1))
            };
            a.prototype.getCyclic = function(b, c, a) {
                var d = this.chart,
                    e = this.userOptions,
                    k = b + "Index",
                    f = b + "Counter",
                    g = a ? a.length : L(d.options.chart[b + "Count"], d[b + "Count"]);
                if (!c) {
                    var r = L(e[k], e["_" + k]);
                    v(r) || (d.series.length || (d[f] = 0), e["_" + k] = r = d[f] % g, d[f] += 1);
                    a && (c = a[r])
                }
                "undefined" !== typeof r && (this[k] = r);
                this[b] = c
            };
            a.prototype.getColor = function() {
                this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.color = "#cccccc" : this.getCyclic("color", this.options.color || n.plotOptions[this.type].color, this.chart.options.colors)
            };
            a.prototype.getPointsCollection = function() {
                return (this.hasGroupedData ?
                    this.points : this.data) || []
            };
            a.prototype.getSymbol = function() {
                this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
            };
            a.prototype.findPointIndex = function(b, c) {
                var a = b.id,
                    d = b.x,
                    e = this.points,
                    f = this.options.dataSorting,
                    g, r;
                if (a) f = this.chart.get(a), f instanceof F && (g = f);
                else if (this.linkedParent || this.enabledDataSorting || this.options.relativeXValue)
                    if (g = function(c) {
                            return !c.touched && c.index === b.index
                        }, f && f.matchByName ? g = function(c) {
                            return !c.touched && c.name === b.name
                        } : this.options.relativeXValue &&
                        (g = function(c) {
                            return !c.touched && c.options.x === b.x
                        }), g = k(e, g), !g) return;
                if (g) {
                    var l = g && g.index;
                    "undefined" !== typeof l && (r = !0)
                }
                "undefined" === typeof l && A(d) && (l = this.xData.indexOf(d, c)); - 1 !== l && "undefined" !== typeof l && this.cropped && (l = l >= this.cropStart ? l - this.cropStart : l);
                !r && A(l) && e[l] && e[l].touched && (l = void 0);
                return l
            };
            a.prototype.updateData = function(b, c) {
                var a = this.options,
                    d = a.dataSorting,
                    e = this.points,
                    k = [],
                    f = this.requireSorting,
                    g = b.length === e.length,
                    r, l, h, p = !0;
                this.xIncrement = null;
                b.forEach(function(b,
                    c) {
                    var l = v(b) && this.pointClass.prototype.optionsToObject.call({
                            series: this
                        }, b) || {},
                        p = l.x;
                    if (l.id || A(p)) {
                        if (l = this.findPointIndex(l, h), -1 === l || "undefined" === typeof l ? k.push(b) : e[l] && b !== a.data[l] ? (e[l].update(b, !1, null, !1), e[l].touched = !0, f && (h = l + 1)) : e[l] && (e[l].touched = !0), !g || c !== l || d && d.enabled || this.hasDerivedData) r = !0
                    } else k.push(b)
                }, this);
                if (r)
                    for (b = e.length; b--;)(l = e[b]) && !l.touched && l.remove && l.remove(!1, c);
                else !g || d && d.enabled ? p = !1 : (b.forEach(function(b, c) {
                    b !== e[c].y && e[c].update && e[c].update(b,
                        !1, null, !1)
                }), k.length = 0);
                e.forEach(function(b) {
                    b && (b.touched = !1)
                });
                if (!p) return !1;
                k.forEach(function(b) {
                    this.addPoint(b, !1, null, null, !1)
                }, this);
                null === this.xIncrement && this.xData && this.xData.length && (this.xIncrement = M(this.xData), this.autoIncrement());
                return !0
            };
            a.prototype.setData = function(b, c, a, d) {
                var e = this,
                    k = e.points,
                    f = k && k.length || 0,
                    g = e.options,
                    l = e.chart,
                    h = g.dataSorting,
                    p = e.xAxis,
                    u = g.turboThreshold,
                    n = this.xData,
                    v = this.yData,
                    w = e.pointArrayMap;
                w = w && w.length;
                var m = g.keys,
                    q, z = 0,
                    K = 1,
                    G = null;
                b = b || [];
                var C = b.length;
                c = L(c, !0);
                h && h.enabled && (b = this.sortData(b));
                !1 !== d && C && f && !e.cropped && !e.hasGroupedData && e.visible && !e.isSeriesBoosting && (q = this.updateData(b, a));
                if (!q) {
                    e.xIncrement = null;
                    e.colorCounter = 0;
                    this.parallelArrays.forEach(function(b) {
                        e[b + "Data"].length = 0
                    });
                    if (u && C > u)
                        if (G = e.getFirstValidPoint(b), A(G))
                            for (a = 0; a < C; a++) n[a] = this.autoIncrement(), v[a] = b[a];
                        else if (r(G))
                        if (w)
                            if (G.length === w)
                                for (a = 0; a < C; a++) n[a] = this.autoIncrement(), v[a] = b[a];
                            else
                                for (a = 0; a < C; a++) d = b[a], n[a] = d[0], v[a] = d.slice(1,
                                    w + 1);
                    else if (m && (z = m.indexOf("x"), K = m.indexOf("y"), z = 0 <= z ? z : 0, K = 0 <= K ? K : 1), 1 === G.length && (K = 0), z === K)
                        for (a = 0; a < C; a++) n[a] = this.autoIncrement(), v[a] = b[a][K];
                    else
                        for (a = 0; a < C; a++) d = b[a], n[a] = d[z], v[a] = d[K];
                    else D(12, !1, l);
                    else
                        for (a = 0; a < C; a++) "undefined" !== typeof b[a] && (d = {
                            series: e
                        }, e.pointClass.prototype.applyOptions.apply(d, [b[a]]), e.updateParallelArrays(d, a));
                    v && P(v[0]) && D(14, !0, l);
                    e.data = [];
                    e.options.data = e.userOptions.data = b;
                    for (a = f; a--;) k[a] && k[a].destroy && k[a].destroy();
                    p && (p.minRange = p.userMinRange);
                    e.isDirty = l.isDirtyBox = !0;
                    e.isDirtyData = !!k;
                    a = !1
                }
                "point" === g.legendType && (this.processData(), this.generatePoints());
                c && l.redraw(a)
            };
            a.prototype.sortData = function(b) {
                var c = this,
                    a = c.options.dataSorting.sortKey || "y",
                    d = function(b, c) {
                        return v(c) && b.pointClass.prototype.optionsToObject.call({
                            series: b
                        }, c) || {}
                    };
                b.forEach(function(a, e) {
                    b[e] = d(c, a);
                    b[e].index = e
                }, this);
                b.concat().sort(function(b, c) {
                    b = O(a, b);
                    c = O(a, c);
                    return c < b ? -1 : c > b ? 1 : 0
                }).forEach(function(b, c) {
                    b.x = c
                }, this);
                c.linkedSeries && c.linkedSeries.forEach(function(c) {
                    var a =
                        c.options,
                        e = a.data;
                    a.dataSorting && a.dataSorting.enabled || !e || (e.forEach(function(a, k) {
                        e[k] = d(c, a);
                        b[k] && (e[k].x = b[k].x, e[k].index = k)
                    }), c.setData(e, !1))
                });
                return b
            };
            a.prototype.getProcessedData = function(b) {
                var c = this.xAxis,
                    a = this.options,
                    d = a.cropThreshold,
                    e = b || this.getExtremesFromAll || a.getExtremesFromAll,
                    k = this.isCartesian;
                b = c && c.val2lin;
                a = !(!c || !c.logarithmic);
                var f = 0,
                    g = this.xData,
                    r = this.yData,
                    l = this.requireSorting;
                var h = !1;
                var p = g.length;
                if (c) {
                    h = c.getExtremes();
                    var u = h.min;
                    var n = h.max;
                    h = c.categories &&
                        !c.names.length
                }
                if (k && this.sorted && !e && (!d || p > d || this.forceCrop))
                    if (g[p - 1] < u || g[0] > n) g = [], r = [];
                    else if (this.yData && (g[0] < u || g[p - 1] > n)) {
                    var A = this.cropData(this.xData, this.yData, u, n);
                    g = A.xData;
                    r = A.yData;
                    f = A.start;
                    A = !0
                }
                for (d = g.length || 1; --d;)
                    if (c = a ? b(g[d]) - b(g[d - 1]) : g[d] - g[d - 1], 0 < c && ("undefined" === typeof v || c < v)) var v = c;
                    else 0 > c && l && !h && (D(15, !1, this.chart), l = !1);
                return {
                    xData: g,
                    yData: r,
                    cropped: A,
                    cropStart: f,
                    closestPointRange: v
                }
            };
            a.prototype.processData = function(b) {
                var c = this.xAxis;
                if (this.isCartesian &&
                    !this.isDirty && !c.isDirty && !this.yAxis.isDirty && !b) return !1;
                b = this.getProcessedData();
                this.cropped = b.cropped;
                this.cropStart = b.cropStart;
                this.processedXData = b.xData;
                this.processedYData = b.yData;
                this.closestPointRange = this.basePointRange = b.closestPointRange;
                K(this, "afterProcessData")
            };
            a.prototype.cropData = function(b, c, a, d, e) {
                var k = b.length,
                    f, g = 0,
                    r = k;
                e = L(e, this.cropShoulder);
                for (f = 0; f < k; f++)
                    if (b[f] >= a) {
                        g = Math.max(0, f - e);
                        break
                    } for (a = f; a < k; a++)
                    if (b[a] > d) {
                        r = a + e;
                        break
                    } return {
                    xData: b.slice(g, r),
                    yData: c.slice(g,
                        r),
                    start: g,
                    end: r
                }
            };
            a.prototype.generatePoints = function() {
                var b = this.options,
                    c = b.data,
                    a = this.processedXData,
                    d = this.processedYData,
                    e = this.pointClass,
                    k = a.length,
                    f = this.cropStart || 0,
                    g = this.hasGroupedData,
                    r = b.keys,
                    l = [];
                b = b.dataGrouping && b.dataGrouping.groupAll ? f : 0;
                var h, p, u = this.data;
                if (!u && !g) {
                    var n = [];
                    n.length = c.length;
                    u = this.data = n
                }
                r && g && (this.options.keys = !1);
                for (p = 0; p < k; p++) {
                    n = f + p;
                    if (g) {
                        var A = (new e).init(this, [a[p]].concat(da(d[p])));
                        A.dataGroup = this.groupMap[b + p];
                        A.dataGroup.options && (A.options =
                            A.dataGroup.options, C(A, A.dataGroup.options), delete A.dataLabels)
                    } else(A = u[n]) || "undefined" === typeof c[n] || (u[n] = A = (new e).init(this, c[n], a[p]));
                    A && (A.index = g ? b + p : n, l[p] = A)
                }
                this.options.keys = r;
                if (u && (k !== (h = u.length) || g))
                    for (p = 0; p < h; p++) p !== f || g || (p += k), u[p] && (u[p].destroyElements(), u[p].plotX = void 0);
                this.data = u;
                this.points = l;
                K(this, "afterGeneratePoints")
            };
            a.prototype.getXExtremes = function(b) {
                return {
                    min: p(b),
                    max: M(b)
                }
            };
            a.prototype.getExtremes = function(b, c) {
                var a = this.xAxis,
                    d = this.yAxis,
                    e = this.processedXData ||
                    this.xData,
                    k = [],
                    f = this.requireSorting ? this.cropShoulder : 0;
                d = d ? d.positiveValuesOnly : !1;
                var g, l = 0,
                    h = 0,
                    u = 0;
                b = b || this.stackedYData || this.processedYData || [];
                var n = b.length;
                if (a) {
                    var v = a.getExtremes();
                    l = v.min;
                    h = v.max
                }
                for (g = 0; g < n; g++) {
                    var w = e[g];
                    v = b[g];
                    var m = (A(v) || r(v)) && (v.length || 0 < v || !d);
                    w = c || this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || !a || (e[g + f] || w) >= l && (e[g - f] || w) <= h;
                    if (m && w)
                        if (m = v.length)
                            for (; m--;) A(v[m]) && (k[u++] = v[m]);
                        else k[u++] = v
                }
                b = {
                    activeYData: k,
                    dataMin: p(k),
                    dataMax: M(k)
                };
                K(this, "afterGetExtremes", {
                    dataExtremes: b
                });
                return b
            };
            a.prototype.applyExtremes = function() {
                var b = this.getExtremes();
                this.dataMin = b.dataMin;
                this.dataMax = b.dataMax;
                return b
            };
            a.prototype.getFirstValidPoint = function(b) {
                for (var c = b.length, a = 0, d = null; null === d && a < c;) d = b[a], a++;
                return d
            };
            a.prototype.translate = function() {
                this.processedXData || this.processData();
                this.generatePoints();
                var c = this.options,
                    a = c.stacking,
                    d = this.xAxis,
                    e = d.categories,
                    k = this.enabledDataSorting,
                    f = this.yAxis,
                    g = this.points,
                    h = g.length,
                    p =
                    this.pointPlacementToXValue(),
                    u = !!p,
                    n = c.threshold,
                    w = c.startFromThreshold ? n : 0,
                    m = this.zoneAxis || "y",
                    q, z, G = Number.MAX_VALUE;
                for (q = 0; q < h; q++) {
                    var C = g[q],
                        J = C.x,
                        D = void 0,
                        O = void 0,
                        M = C.y,
                        P = C.low,
                        x = a && f.stacking && f.stacking.stacks[(this.negStacks && M < (w ? 0 : n) ? "-" : "") + this.stackKey];
                    if (f.positiveValuesOnly && !f.validatePositiveValue(M) || d.positiveValuesOnly && !d.validatePositiveValue(J)) C.isNull = !0;
                    C.plotX = z = b(l(d.translate(J, 0, 0, 0, 1, p, "flags" === this.type), -1E5, 1E5));
                    if (a && this.visible && x && x[J]) {
                        var t = this.getStackIndicator(t,
                            J, this.index);
                        C.isNull || (D = x[J], O = D.points[t.key])
                    }
                    r(O) && (P = O[0], M = O[1], P === w && t.key === x[J].base && (P = L(A(n) && n, f.min)), f.positiveValuesOnly && 0 >= P && (P = null), C.total = C.stackTotal = D.total, C.percentage = D.total && C.y / D.total * 100, C.stackY = M, this.irregularWidths || D.setOffset(this.pointXOffset || 0, this.barW || 0));
                    C.yBottom = v(P) ? l(f.translate(P, 0, 1, 0, 1), -1E5, 1E5) : null;
                    this.dataModify && (M = this.dataModify.modifyValue(M, q));
                    C.plotY = void 0;
                    A(M) && (D = f.translate(M, !1, !0, !1, !0), "undefined" !== typeof D && (C.plotY = l(D,
                        -1E5, 1E5)));
                    C.isInside = this.isPointInside(C);
                    C.clientX = u ? b(d.translate(J, 0, 0, 0, 1, p)) : z;
                    C.negative = C[m] < (c[m + "Threshold"] || n || 0);
                    C.category = e && "undefined" !== typeof e[C.x] ? e[C.x] : C.x;
                    if (!C.isNull && !1 !== C.visible) {
                        "undefined" !== typeof E && (G = Math.min(G, Math.abs(z - E)));
                        var E = z
                    }
                    C.zone = this.zones.length ? C.getZone() : void 0;
                    !C.graphic && this.group && k && (C.isNew = !0)
                }
                this.closestPointRangePx = G;
                K(this, "afterTranslate")
            };
            a.prototype.getValidPoints = function(b, c, a) {
                var d = this.chart;
                return (b || this.points || []).filter(function(b) {
                    return c &&
                        !d.isInsidePlot(b.plotX, b.plotY, {
                            inverted: d.inverted
                        }) ? !1 : !1 !== b.visible && (a || !b.isNull)
                })
            };
            a.prototype.getClipBox = function() {
                var b = this.chart,
                    c = this.xAxis,
                    a = this.yAxis,
                    d = E(b.clipBox);
                c && c.len !== b.plotSizeX && (d.width = c.len);
                a && a.len !== b.plotSizeY && (d.height = a.len);
                return d
            };
            a.prototype.getSharedClipKey = function() {
                return this.sharedClipKey = (this.options.xAxis || 0) + "," + (this.options.yAxis || 0)
            };
            a.prototype.setClip = function() {
                var b = this.chart,
                    c = this.group,
                    a = this.markerGroup,
                    d = b.sharedClips;
                b = b.renderer;
                var e = this.getClipBox(),
                    k = this.getSharedClipKey(),
                    f = d[k];
                f ? f.animate(e) : d[k] = f = b.clipRect(e);
                c && c.clip(!1 === this.options.clip ? void 0 : f);
                a && a.clip()
            };
            a.prototype.animate = function(b) {
                var c = this.chart,
                    a = this.group,
                    d = this.markerGroup,
                    e = c.inverted,
                    k = h(this.options.animation),
                    f = [this.getSharedClipKey(), k.duration, k.easing, k.defer].join(),
                    g = c.sharedClips[f],
                    r = c.sharedClips[f + "m"];
                if (b && a) k = this.getClipBox(), g ? g.attr("height", k.height) : (k.width = 0, e && (k.x = c.plotHeight), g = c.renderer.clipRect(k), c.sharedClips[f] =
                    g, r = c.renderer.clipRect({
                        x: e ? (c.plotSizeX || 0) + 99 : -99,
                        y: e ? -c.plotLeft : -c.plotTop,
                        width: 99,
                        height: e ? c.chartWidth : c.chartHeight
                    }), c.sharedClips[f + "m"] = r), a.clip(g), d && d.clip(r);
                else if (g && !g.hasClass("highcharts-animating")) {
                    c = this.getClipBox();
                    var l = k.step;
                    d && d.element.childNodes.length && (k.step = function(b, c) {
                        l && l.apply(c, arguments);
                        r && r.element && r.attr(c.prop, "width" === c.prop ? b + 99 : b)
                    });
                    g.addClass("highcharts-animating").animate(c, k)
                }
            };
            a.prototype.afterAnimate = function() {
                var b = this;
                this.setClip();
                u(this.chart.sharedClips,
                    function(c, a, d) {
                        c && !b.chart.container.querySelector('[clip-path="url(#' + c.id + ')"]') && (c.destroy(), delete d[a])
                    });
                this.finishedAnimating = !0;
                K(this, "afterAnimate")
            };
            a.prototype.drawPoints = function() {
                var b = this.points,
                    c = this.chart,
                    a = this.options.marker,
                    d = this[this.specialGroup] || this.markerGroup,
                    e = this.xAxis,
                    k = L(a.enabled, !e || e.isRadial ? !0 : null, this.closestPointRangePx >= a.enabledThreshold * a.radius),
                    f, g;
                if (!1 !== a.enabled || this._hasPointMarkers)
                    for (f = 0; f < b.length; f++) {
                        var r = b[f];
                        var l = (g = r.graphic) ? "animate" :
                            "attr";
                        var h = r.marker || {};
                        var p = !!r.marker;
                        if ((k && "undefined" === typeof h.enabled || h.enabled) && !r.isNull && !1 !== r.visible) {
                            var u = L(h.symbol, this.symbol, "rect");
                            var n = this.markerAttribs(r, r.selected && "select");
                            this.enabledDataSorting && (r.startXPos = e.reversed ? -(n.width || 0) : e.width);
                            var A = !1 !== r.isInside;
                            g ? g[A ? "show" : "hide"](A).animate(n) : A && (0 < (n.width || 0) || r.hasImage) && (r.graphic = g = c.renderer.symbol(u, n.x, n.y, n.width, n.height, p ? h : a).add(d), this.enabledDataSorting && c.hasRendered && (g.attr({
                                    x: r.startXPos
                                }),
                                l = "animate"));
                            g && "animate" === l && g[A ? "show" : "hide"](A).animate(n);
                            if (g && !c.styledMode) g[l](this.pointAttribs(r, r.selected && "select"));
                            g && g.addClass(r.getClassName(), !0)
                        } else g && (r.graphic = g.destroy())
                    }
            };
            a.prototype.markerAttribs = function(b, c) {
                var a = this.options,
                    d = a.marker,
                    e = b.marker || {},
                    k = e.symbol || d.symbol,
                    f = L(e.radius, d.radius);
                c && (d = d.states[c], c = e.states && e.states[c], f = L(c && c.radius, d && d.radius, f + (d && d.radiusPlus || 0)));
                b.hasImage = k && 0 === k.indexOf("url");
                b.hasImage && (f = 0);
                b = {
                    x: a.crisp ? Math.floor(b.plotX -
                        f) : b.plotX - f,
                    y: b.plotY - f
                };
                f && (b.width = b.height = 2 * f);
                return b
            };
            a.prototype.pointAttribs = function(b, c) {
                var a = this.options.marker,
                    d = b && b.options,
                    e = d && d.marker || {},
                    k = d && d.color,
                    f = b && b.color,
                    g = b && b.zone && b.zone.color,
                    r = this.color;
                b = L(e.lineWidth, a.lineWidth);
                d = 1;
                r = k || g || f || r;
                k = e.fillColor || a.fillColor || r;
                f = e.lineColor || a.lineColor || r;
                c = c || "normal";
                a = a.states[c] || {};
                c = e.states && e.states[c] || {};
                b = L(c.lineWidth, a.lineWidth, b + L(c.lineWidthPlus, a.lineWidthPlus, 0));
                k = c.fillColor || a.fillColor || k;
                f = c.lineColor ||
                    a.lineColor || f;
                d = L(c.opacity, a.opacity, d);
                return {
                    stroke: f,
                    "stroke-width": b,
                    fill: k,
                    opacity: d
                }
            };
            a.prototype.destroy = function(b) {
                var c = this,
                    a = c.chart,
                    k = /AppleWebKit\/533/.test(e.navigator.userAgent),
                    f = c.data || [],
                    g, r, l, h;
                K(c, "destroy");
                this.removeEvents(b);
                (c.axisTypes || []).forEach(function(b) {
                    (h = c[b]) && h.series && (d(h.series, c), h.isDirty = h.forceRedraw = !0)
                });
                c.legendItem && c.chart.legend.destroyItem(c);
                for (r = f.length; r--;)(l = f[r]) && l.destroy && l.destroy();
                c.clips && c.clips.forEach(function(b) {
                    return b.destroy()
                });
                m.clearTimeout(c.animationTimeout);
                u(c, function(b, c) {
                    b instanceof q && !b.survive && (g = k && "group" === c ? "hide" : "destroy", b[g]())
                });
                a.hoverSeries === c && (a.hoverSeries = void 0);
                d(a.series, c);
                a.orderSeries();
                u(c, function(a, d) {
                    b && "hcEvents" === d || delete c[d]
                })
            };
            a.prototype.applyZones = function() {
                var b = this,
                    c = this.chart,
                    a = c.renderer,
                    d = this.zones,
                    e = this.clips || [],
                    k = this.graph,
                    f = this.area,
                    g = Math.max(c.chartWidth, c.chartHeight),
                    r = this[(this.zoneAxis || "y") + "Axis"],
                    h = c.inverted,
                    p, u, n, A, v, w, m, q, z = !1;
                if (d.length && (k ||
                        f) && r && "undefined" !== typeof r.min) {
                    var C = r.reversed;
                    var K = r.horiz;
                    k && !this.showLine && k.hide();
                    f && f.hide();
                    var G = r.getExtremes();
                    d.forEach(function(d, J) {
                        p = C ? K ? c.plotWidth : 0 : K ? 0 : r.toPixels(G.min) || 0;
                        p = l(L(u, p), 0, g);
                        u = l(Math.round(r.toPixels(L(d.value, G.max), !0) || 0), 0, g);
                        z && (p = u = r.toPixels(G.max));
                        A = Math.abs(p - u);
                        v = Math.min(p, u);
                        w = Math.max(p, u);
                        r.isXAxis ? (n = {
                            x: h ? w : v,
                            y: 0,
                            width: A,
                            height: g
                        }, K || (n.x = c.plotHeight - n.x)) : (n = {
                            x: 0,
                            y: h ? w : v,
                            width: g,
                            height: A
                        }, K && (n.y = c.plotWidth - n.y));
                        h && a.isVML && (n = r.isXAxis ? {
                            x: 0,
                            y: C ? v : w,
                            height: n.width,
                            width: c.chartWidth
                        } : {
                            x: n.y - c.plotLeft - c.spacingBox.x,
                            y: 0,
                            width: n.height,
                            height: c.chartHeight
                        });
                        e[J] ? e[J].animate(n) : e[J] = a.clipRect(n);
                        m = b["zone-area-" + J];
                        q = b["zone-graph-" + J];
                        k && q && q.clip(e[J]);
                        f && m && m.clip(e[J]);
                        z = d.value > G.max;
                        b.resetZones && 0 === u && (u = void 0)
                    });
                    this.clips = e
                } else b.visible && (k && k.show(!0), f && f.show(!0))
            };
            a.prototype.invertGroups = function(b) {
                function c() {
                    ["group", "markerGroup"].forEach(function(c) {
                        a[c] && (d.renderer.isVML && a[c].attr({
                                width: a.yAxis.len,
                                height: a.xAxis.len
                            }),
                            a[c].width = a.yAxis.len, a[c].height = a.xAxis.len, a[c].invert(a.isRadialSeries ? !1 : b))
                    })
                }
                var a = this,
                    d = a.chart;
                a.xAxis && (a.eventsToUnbind.push(J(d, "resize", c)), c(), a.invertGroups = c)
            };
            a.prototype.plotGroup = function(b, c, a, d, e) {
                var k = this[b],
                    f = !k;
                a = {
                    visibility: a,
                    zIndex: d || .1
                };
                "undefined" === typeof this.opacity || this.chart.styledMode || "inactive" === this.state || (a.opacity = this.opacity);
                f && (this[b] = k = this.chart.renderer.g().add(e));
                k.addClass("highcharts-" + c + " highcharts-series-" + this.index + " highcharts-" + this.type +
                    "-series " + (v(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (k.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                k.attr(a)[f ? "attr" : "animate"](this.getPlotBox());
                return k
            };
            a.prototype.getPlotBox = function() {
                var b = this.chart,
                    c = this.xAxis,
                    a = this.yAxis;
                b.inverted && (c = a, a = this.xAxis);
                return {
                    translateX: c ? c.left : b.plotLeft,
                    translateY: a ? a.top : b.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            };
            a.prototype.removeEvents = function(b) {
                b || aa(this);
                this.eventsToUnbind.length && (this.eventsToUnbind.forEach(function(b) {
                        b()
                    }),
                    this.eventsToUnbind.length = 0)
            };
            a.prototype.render = function() {
                var b = this,
                    c = b.chart,
                    a = b.options,
                    d = h(a.animation),
                    e = b.visible ? "inherit" : "hidden",
                    k = a.zIndex,
                    f = b.hasRendered,
                    g = c.seriesGroup,
                    r = c.inverted;
                c = !b.finishedAnimating && c.renderer.isSVG ? d.duration : 0;
                K(this, "render");
                var l = b.plotGroup("group", "series", e, k, g);
                b.markerGroup = b.plotGroup("markerGroup", "markers", e, k, g);
                !1 !== a.clip && b.setClip();
                b.animate && c && b.animate(!0);
                l.inverted = L(b.invertible, b.isCartesian) ? r : !1;
                b.drawGraph && (b.drawGraph(), b.applyZones());
                b.visible && b.drawPoints();
                b.drawDataLabels && b.drawDataLabels();
                b.redrawPoints && b.redrawPoints();
                b.drawTracker && !1 !== b.options.enableMouseTracking && b.drawTracker();
                b.invertGroups(r);
                b.animate && c && b.animate();
                f || (c && d.defer && (c += d.defer), b.animationTimeout = R(function() {
                    b.afterAnimate()
                }, c || 0));
                b.isDirty = !1;
                b.hasRendered = !0;
                K(b, "afterRender")
            };
            a.prototype.redraw = function() {
                var b = this.chart,
                    c = this.isDirty || this.isDirtyData,
                    a = this.group,
                    d = this.xAxis,
                    e = this.yAxis;
                a && (b.inverted && a.attr({
                    width: b.plotWidth,
                    height: b.plotHeight
                }), a.animate({
                    translateX: L(d && d.left, b.plotLeft),
                    translateY: L(e && e.top, b.plotTop)
                }));
                this.translate();
                this.render();
                c && delete this.kdTree
            };
            a.prototype.searchPoint = function(b, c) {
                var a = this.xAxis,
                    d = this.yAxis,
                    e = this.chart.inverted;
                return this.searchKDTree({
                    clientX: e ? a.len - b.chartY + a.pos : b.chartX - a.pos,
                    plotY: e ? d.len - b.chartX + d.pos : b.chartY - d.pos
                }, c, b)
            };
            a.prototype.buildKDTree = function(b) {
                function c(b, d, e) {
                    var k = b && b.length;
                    if (k) {
                        var f = a.kdAxisArray[d % e];
                        b.sort(function(b, c) {
                            return b[f] -
                                c[f]
                        });
                        k = Math.floor(k / 2);
                        return {
                            point: b[k],
                            left: c(b.slice(0, k), d + 1, e),
                            right: c(b.slice(k + 1), d + 1, e)
                        }
                    }
                }
                this.buildingKdTree = !0;
                var a = this,
                    d = -1 < a.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                delete a.kdTree;
                R(function() {
                    a.kdTree = c(a.getValidPoints(null, !a.directTouch), d, d);
                    a.buildingKdTree = !1
                }, a.options.kdNow || b && "touchstart" === b.type ? 0 : 1)
            };
            a.prototype.searchKDTree = function(b, c, a) {
                function d(b, c, a, r) {
                    var l = c.point,
                        h = e.kdAxisArray[a % r],
                        p = l,
                        u = v(b[k]) && v(l[k]) ? Math.pow(b[k] - l[k], 2) : null;
                    var n = v(b[f]) && v(l[f]) ?
                        Math.pow(b[f] - l[f], 2) : null;
                    n = (u || 0) + (n || 0);
                    l.dist = v(n) ? Math.sqrt(n) : Number.MAX_VALUE;
                    l.distX = v(u) ? Math.sqrt(u) : Number.MAX_VALUE;
                    h = b[h] - l[h];
                    n = 0 > h ? "left" : "right";
                    u = 0 > h ? "right" : "left";
                    c[n] && (n = d(b, c[n], a + 1, r), p = n[g] < p[g] ? n : l);
                    c[u] && Math.sqrt(h * h) < p[g] && (b = d(b, c[u], a + 1, r), p = b[g] < p[g] ? b : p);
                    return p
                }
                var e = this,
                    k = this.kdAxisArray[0],
                    f = this.kdAxisArray[1],
                    g = c ? "distX" : "dist";
                c = -1 < e.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                this.kdTree || this.buildingKdTree || this.buildKDTree(a);
                if (this.kdTree) return d(b,
                    this.kdTree, c, c)
            };
            a.prototype.pointPlacementToXValue = function() {
                var b = this.options,
                    c = b.pointRange,
                    a = this.xAxis;
                b = b.pointPlacement;
                "between" === b && (b = a.reversed ? -.5 : .5);
                return A(b) ? b * (c || a.pointRange) : 0
            };
            a.prototype.isPointInside = function(b) {
                var c = this.chart,
                    a = this.xAxis,
                    d = this.yAxis;
                return "undefined" !== typeof b.plotY && "undefined" !== typeof b.plotX && 0 <= b.plotY && b.plotY <= (d ? d.len : c.plotHeight) && 0 <= b.plotX && b.plotX <= (a ? a.len : c.plotWidth)
            };
            a.prototype.drawTracker = function() {
                var b = this,
                    c = b.options,
                    a = c.trackByArea,
                    d = [].concat(a ? b.areaPath : b.graphPath),
                    e = b.chart,
                    k = e.pointer,
                    r = e.renderer,
                    l = e.options.tooltip.snap,
                    h = b.tracker,
                    p = function(c) {
                        if (e.hoverSeries !== b) b.onMouseOver()
                    },
                    u = "rgba(192,192,192," + (f ? .0001 : .002) + ")";
                h ? h.attr({
                    d: d
                }) : b.graph && (b.tracker = r.path(d).attr({
                    visibility: b.visible ? "visible" : "hidden",
                    zIndex: 2
                }).addClass(a ? "highcharts-tracker-area" : "highcharts-tracker-line").add(b.group), e.styledMode || b.tracker.attr({
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    stroke: u,
                    fill: a ? u : "none",
                    "stroke-width": b.graph.strokeWidth() +
                        (a ? 0 : 2 * l)
                }), [b.tracker, b.markerGroup, b.dataLabelsGroup].forEach(function(b) {
                    if (b && (b.addClass("highcharts-tracker").on("mouseover", p).on("mouseout", function(b) {
                            k.onTrackerMouseOut(b)
                        }), c.cursor && !e.styledMode && b.css({
                            cursor: c.cursor
                        }), g)) b.on("touchstart", p)
                }));
                K(this, "afterDrawTracker")
            };
            a.prototype.addPoint = function(b, c, a, d, e) {
                var k = this.options,
                    f = this.data,
                    g = this.chart,
                    r = this.xAxis;
                r = r && r.hasNames && r.names;
                var l = k.data,
                    h = this.xData,
                    p;
                c = L(c, !0);
                var u = {
                    series: this
                };
                this.pointClass.prototype.applyOptions.apply(u,
                    [b]);
                var n = u.x;
                var A = h.length;
                if (this.requireSorting && n < h[A - 1])
                    for (p = !0; A && h[A - 1] > n;) A--;
                this.updateParallelArrays(u, "splice", A, 0, 0);
                this.updateParallelArrays(u, A);
                r && u.name && (r[n] = u.name);
                l.splice(A, 0, b);
                p && (this.data.splice(A, 0, null), this.processData());
                "point" === k.legendType && this.generatePoints();
                a && (f[0] && f[0].remove ? f[0].remove(!1) : (f.shift(), this.updateParallelArrays(u, "shift"), l.shift()));
                !1 !== e && K(this, "addPoint", {
                    point: u
                });
                this.isDirtyData = this.isDirty = !0;
                c && g.redraw(d)
            };
            a.prototype.removePoint =
                function(b, a, d) {
                    var e = this,
                        k = e.data,
                        f = k[b],
                        g = e.points,
                        r = e.chart,
                        l = function() {
                            g && g.length === k.length && g.splice(b, 1);
                            k.splice(b, 1);
                            e.options.data.splice(b, 1);
                            e.updateParallelArrays(f || {
                                series: e
                            }, "splice", b, 1);
                            f && f.destroy();
                            e.isDirty = !0;
                            e.isDirtyData = !0;
                            a && r.redraw()
                        };
                    c(d, r);
                    a = L(a, !0);
                    f ? f.firePointEvent("remove", null, l) : l()
                };
            a.prototype.remove = function(b, c, a, d) {
                function e() {
                    k.destroy(d);
                    f.isDirtyLegend = f.isDirtyBox = !0;
                    f.linkSeries();
                    L(b, !0) && f.redraw(c)
                }
                var k = this,
                    f = k.chart;
                !1 !== a ? K(k, "remove", null,
                    e) : e()
            };
            a.prototype.update = function(b, c) {
                b = w(b, this.userOptions);
                K(this, "update", {
                    options: b
                });
                var a = this,
                    d = a.chart,
                    e = a.userOptions,
                    k = a.initialType || a.type,
                    f = d.options.plotOptions,
                    g = G[k].prototype,
                    r = a.finishedAnimating && {
                        animation: !1
                    },
                    l = {},
                    h, p = ["eventOptions", "navigatorSeries", "baseSeries"],
                    u = b.type || e.type || d.options.chart.type,
                    n = !(this.hasDerivedData || u && u !== this.type || "undefined" !== typeof b.pointStart || "undefined" !== typeof b.pointInterval || "undefined" !== typeof b.relativeXValue || a.hasOptionChanged("dataGrouping") ||
                        a.hasOptionChanged("pointStart") || a.hasOptionChanged("pointInterval") || a.hasOptionChanged("pointIntervalUnit") || a.hasOptionChanged("keys"));
                u = u || k;
                n && (p.push("data", "isDirtyData", "points", "processedXData", "processedYData", "xIncrement", "cropped", "_hasPointMarkers", "_hasPointLabels", "clips", "nodes", "layout", "mapMap", "mapData", "minY", "maxY", "minX", "maxX"), !1 !== b.visible && p.push("area", "graph"), a.parallelArrays.forEach(function(b) {
                    p.push(b + "Data")
                }), b.data && (b.dataSorting && C(a.options.dataSorting, b.dataSorting),
                    this.setData(b.data, !1)));
                b = E(e, r, {
                    index: "undefined" === typeof e.index ? a.index : e.index,
                    pointStart: L(f && f.series && f.series.pointStart, e.pointStart, a.xData[0])
                }, !n && {
                    data: a.options.data
                }, b);
                n && b.data && (b.data = a.options.data);
                p = ["group", "markerGroup", "dataLabelsGroup", "transformGroup"].concat(p);
                p.forEach(function(b) {
                    p[b] = a[b];
                    delete a[b]
                });
                f = !1;
                if (G[u]) {
                    if (f = u !== a.type, a.remove(!1, !1, !1, !0), f)
                        if (Object.setPrototypeOf) Object.setPrototypeOf(a, G[u].prototype);
                        else {
                            r = Object.hasOwnProperty.call(a, "hcEvents") &&
                                a.hcEvents;
                            for (h in g) a[h] = void 0;
                            C(a, G[u].prototype);
                            r ? a.hcEvents = r : delete a.hcEvents
                        }
                } else D(17, !0, d, {
                    missingModuleFor: u
                });
                p.forEach(function(b) {
                    a[b] = p[b]
                });
                a.init(d, b);
                if (n && this.points) {
                    var A = a.options;
                    !1 === A.visible ? (l.graphic = 1, l.dataLabel = 1) : a._hasPointLabels || (b = A.marker, g = A.dataLabels, !b || !1 !== b.enabled && (e.marker && e.marker.symbol) === b.symbol || (l.graphic = 1), g && !1 === g.enabled && (l.dataLabel = 1));
                    this.points.forEach(function(b) {
                        b && b.series && (b.resolveColor(), Object.keys(l).length && b.destroyElements(l),
                            !1 === A.showInLegend && b.legendItem && d.legend.destroyItem(b))
                    }, this)
                }
                a.initialType = k;
                d.linkSeries();
                f && a.linkedSeries.length && (a.isDirtyData = !0);
                K(this, "afterUpdate");
                L(c, !0) && d.redraw(n ? void 0 : !1)
            };
            a.prototype.setName = function(b) {
                this.name = this.options.name = this.userOptions.name = b;
                this.chart.isDirtyLegend = !0
            };
            a.prototype.hasOptionChanged = function(b) {
                var c = this.options[b],
                    a = this.chart.options.plotOptions,
                    d = this.userOptions[b];
                return d ? c !== d : c !== L(a && a[this.type] && a[this.type][b], a && a.series && a.series[b],
                    c)
            };
            a.prototype.onMouseOver = function() {
                var b = this.chart,
                    c = b.hoverSeries;
                b.pointer.setHoverChartIndex();
                if (c && c !== this) c.onMouseOut();
                this.options.events.mouseOver && K(this, "mouseOver");
                this.setState("hover");
                b.hoverSeries = this
            };
            a.prototype.onMouseOut = function() {
                var b = this.options,
                    c = this.chart,
                    a = c.tooltip,
                    d = c.hoverPoint;
                c.hoverSeries = null;
                if (d) d.onMouseOut();
                this && b.events.mouseOut && K(this, "mouseOut");
                !a || this.stickyTracking || a.shared && !this.noSharedTooltip || a.hide();
                c.series.forEach(function(b) {
                    b.setState("",
                        !0)
                })
            };
            a.prototype.setState = function(b, c) {
                var a = this,
                    d = a.options,
                    e = a.graph,
                    k = d.inactiveOtherPoints,
                    f = d.states,
                    g = L(f[b || "normal"] && f[b || "normal"].animation, a.chart.options.chart.animation),
                    r = d.lineWidth,
                    l = 0,
                    h = d.opacity;
                b = b || "";
                if (a.state !== b && ([a.group, a.markerGroup, a.dataLabelsGroup].forEach(function(c) {
                        c && (a.state && c.removeClass("highcharts-series-" + a.state), b && c.addClass("highcharts-series-" + b))
                    }), a.state = b, !a.chart.styledMode)) {
                    if (f[b] && !1 === f[b].enabled) return;
                    b && (r = f[b].lineWidth || r + (f[b].lineWidthPlus ||
                        0), h = L(f[b].opacity, h));
                    if (e && !e.dashstyle)
                        for (d = {
                                "stroke-width": r
                            }, e.animate(d, g); a["zone-graph-" + l];) a["zone-graph-" + l].animate(d, g), l += 1;
                    k || [a.group, a.markerGroup, a.dataLabelsGroup, a.labelBySeries].forEach(function(b) {
                        b && b.animate({
                            opacity: h
                        }, g)
                    })
                }
                c && k && a.points && a.setAllPointsToState(b || void 0)
            };
            a.prototype.setAllPointsToState = function(b) {
                this.points.forEach(function(c) {
                    c.setState && c.setState(b)
                })
            };
            a.prototype.setVisible = function(b, c) {
                var a = this,
                    d = a.chart,
                    e = a.legendItem,
                    k = d.options.chart.ignoreHiddenSeries,
                    f = a.visible,
                    g = (a.visible = b = a.options.visible = a.userOptions.visible = "undefined" === typeof b ? !f : b) ? "show" : "hide";
                ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function(b) {
                    if (a[b]) a[b][g]()
                });
                if (d.hoverSeries === a || (d.hoverPoint && d.hoverPoint.series) === a) a.onMouseOut();
                e && d.legend.colorizeItem(a, b);
                a.isDirty = !0;
                a.options.stacking && d.series.forEach(function(b) {
                    b.options.stacking && b.visible && (b.isDirty = !0)
                });
                a.linkedSeries.forEach(function(c) {
                    c.setVisible(b, !1)
                });
                k && (d.isDirtyBox = !0);
                K(a, g);
                !1 !== c && d.redraw()
            };
            a.prototype.show = function() {
                this.setVisible(!0)
            };
            a.prototype.hide = function() {
                this.setVisible(!1)
            };
            a.prototype.select = function(b) {
                this.selected = b = this.options.selected = "undefined" === typeof b ? !this.selected : b;
                this.checkbox && (this.checkbox.checked = b);
                K(this, b ? "select" : "unselect")
            };
            a.prototype.shouldShowTooltip = function(b, c, a) {
                void 0 === a && (a = {});
                a.series = this;
                a.visiblePlotOnly = !0;
                return this.chart.isInsidePlot(b, c, a)
            };
            a.defaultOptions = I;
            return a
        }();
        C(a.prototype, {
            axisTypes: ["xAxis",
                "yAxis"
            ],
            coll: "series",
            colorCounter: 0,
            cropShoulder: 1,
            directTouch: !1,
            drawLegendSymbol: y.drawLineMarker,
            isCartesian: !0,
            kdAxisArray: ["clientX", "plotY"],
            parallelArrays: ["x", "y"],
            pointClass: F,
            requireSorting: !0,
            sorted: !0
        });
        x.series = a;
        "";
        "";
        return a
    });
    N(a, "Extensions/ScrollablePlotArea.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Axis/Axis.js"], a["Core/Chart/Chart.js"], a["Core/Series/Series.js"], a["Core/Renderer/RendererRegistry.js"], a["Core/Utilities.js"]], function(a, t, B, H, y, F) {
        var E = a.stop,
            x =
            F.addEvent,
            q = F.createElement,
            m = F.merge,
            h = F.pick;
        x(B, "afterSetChartSize", function(c) {
            var a = this.options.chart.scrollablePlotArea,
                h = a && a.minWidth;
            a = a && a.minHeight;
            if (!this.renderer.forExport) {
                if (h) {
                    if (this.scrollablePixelsX = h = Math.max(0, h - this.chartWidth)) {
                        this.scrollablePlotBox = this.renderer.scrollablePlotBox = m(this.plotBox);
                        this.plotBox.width = this.plotWidth += h;
                        this.inverted ? this.clipBox.height += h : this.clipBox.width += h;
                        var g = {
                            1: {
                                name: "right",
                                value: h
                            }
                        }
                    }
                } else a && (this.scrollablePixelsY = h = Math.max(0,
                    a - this.chartHeight)) && (this.scrollablePlotBox = this.renderer.scrollablePlotBox = m(this.plotBox), this.plotBox.height = this.plotHeight += h, this.inverted ? this.clipBox.width += h : this.clipBox.height += h, g = {
                    2: {
                        name: "bottom",
                        value: h
                    }
                });
                g && !c.skipAxes && this.axes.forEach(function(c) {
                    g[c.side] ? c.getPlotLinePath = function() {
                        var a = g[c.side].name,
                            f = this[a];
                        this[a] = f - g[c.side].value;
                        var h = t.prototype.getPlotLinePath.apply(this, arguments);
                        this[a] = f;
                        return h
                    } : (c.setAxisSize(), c.setAxisTranslation())
                })
            }
        });
        x(B, "render", function() {
            this.scrollablePixelsX ||
                this.scrollablePixelsY ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed()
        });
        B.prototype.setUpScrolling = function() {
            var c = this,
                a = {
                    WebkitOverflowScrolling: "touch",
                    overflowX: "hidden",
                    overflowY: "hidden"
                };
            this.scrollablePixelsX && (a.overflowX = "auto");
            this.scrollablePixelsY && (a.overflowY = "auto");
            this.scrollingParent = q("div", {
                className: "highcharts-scrolling-parent"
            }, {
                position: "relative"
            }, this.renderTo);
            this.scrollingContainer = q("div", {
                    className: "highcharts-scrolling"
                },
                a, this.scrollingParent);
            x(this.scrollingContainer, "scroll", function() {
                c.pointer && delete c.pointer.chartPosition
            });
            this.innerContainer = q("div", {
                className: "highcharts-inner-container"
            }, null, this.scrollingContainer);
            this.innerContainer.appendChild(this.container);
            this.setUpScrolling = null
        };
        B.prototype.moveFixedElements = function() {
            var c = this.container,
                a = this.fixedRenderer,
                h = ".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-drillup-button .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(" "),
                g;
            this.scrollablePixelsX && !this.inverted ? g = ".highcharts-yaxis" : this.scrollablePixelsX && this.inverted ? g = ".highcharts-xaxis" : this.scrollablePixelsY && !this.inverted ? g = ".highcharts-xaxis" : this.scrollablePixelsY && this.inverted && (g = ".highcharts-yaxis");
            g && h.push(g + ":not(.highcharts-radial-axis)", g + "-labels:not(.highcharts-radial-axis-labels)");
            h.forEach(function(f) {
                [].forEach.call(c.querySelectorAll(f), function(c) {
                    (c.namespaceURI === a.SVG_NS ? a.box : a.box.parentNode).appendChild(c);
                    c.style.pointerEvents = "auto"
                })
            })
        };
        B.prototype.applyFixed = function() {
            var c = !this.fixedDiv,
                a = this.options.chart,
                m = a.scrollablePlotArea,
                g = y.getRendererType();
            c ? (this.fixedDiv = q("div", {
                className: "highcharts-fixed"
            }, {
                position: "absolute",
                overflow: "hidden",
                pointerEvents: "none",
                zIndex: (a.style && a.style.zIndex || 0) + 2,
                top: 0
            }, null, !0), this.scrollingContainer && this.scrollingContainer.parentNode.insertBefore(this.fixedDiv, this.scrollingContainer), this.renderTo.style.overflow = "visible", this.fixedRenderer = a = new g(this.fixedDiv, this.chartWidth, this.chartHeight,
                this.options.chart.style), this.scrollableMask = a.path().attr({
                fill: this.options.chart.backgroundColor || "#fff",
                "fill-opacity": h(m.opacity, .85),
                zIndex: -1
            }).addClass("highcharts-scrollable-mask").add(), x(this, "afterShowResetZoom", this.moveFixedElements), x(this, "afterDrilldown", this.moveFixedElements), x(this, "afterLayOutTitles", this.moveFixedElements)) : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
            if (this.scrollableDirty || c) this.scrollableDirty = !1, this.moveFixedElements();
            a = this.chartWidth +
                (this.scrollablePixelsX || 0);
            g = this.chartHeight + (this.scrollablePixelsY || 0);
            E(this.container);
            this.container.style.width = a + "px";
            this.container.style.height = g + "px";
            this.renderer.boxWrapper.attr({
                width: a,
                height: g,
                viewBox: [0, 0, a, g].join(" ")
            });
            this.chartBackground.attr({
                width: a,
                height: g
            });
            this.scrollingContainer.style.height = this.chartHeight + "px";
            c && (m.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixelsX * m.scrollPositionX), m.scrollPositionY && (this.scrollingContainer.scrollTop = this.scrollablePixelsY *
                m.scrollPositionY));
            g = this.axisOffset;
            c = this.plotTop - g[0] - 1;
            m = this.plotLeft - g[3] - 1;
            a = this.plotTop + this.plotHeight + g[2] + 1;
            g = this.plotLeft + this.plotWidth + g[1] + 1;
            var f = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0),
                e = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
            c = this.scrollablePixelsX ? [
                ["M", 0, c],
                ["L", this.plotLeft - 1, c],
                ["L", this.plotLeft - 1, a],
                ["L", 0, a],
                ["Z"],
                ["M", f, c],
                ["L", this.chartWidth, c],
                ["L", this.chartWidth, a],
                ["L", f, a],
                ["Z"]
            ] : this.scrollablePixelsY ? [
                ["M", m, 0],
                ["L", m, this.plotTop -
                    1
                ],
                ["L", g, this.plotTop - 1],
                ["L", g, 0],
                ["Z"],
                ["M", m, e],
                ["L", m, this.chartHeight],
                ["L", g, this.chartHeight],
                ["L", g, e],
                ["Z"]
            ] : [
                ["M", 0, 0]
            ];
            "adjustHeight" !== this.redrawTrigger && this.scrollableMask.attr({
                d: c
            })
        };
        x(t, "afterInit", function() {
            this.chart.scrollableDirty = !0
        });
        x(H, "show", function() {
            this.chart.scrollableDirty = !0
        });
        ""
    });
    N(a, "Core/Axis/StackingAxis.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Axis/Axis.js"], a["Core/Utilities.js"]], function(a, t, B) {
        var E = a.getDeferredAnimation,
            y = B.addEvent,
            F =
            B.destroyObjectProperties,
            I = B.fireEvent,
            x = B.isNumber,
            q = B.objectEach,
            m;
        (function(a) {
            function c() {
                var c = this.stacking;
                if (c) {
                    var a = c.stacks;
                    q(a, function(c, e) {
                        F(c);
                        a[e] = null
                    });
                    c && c.stackTotalGroup && c.stackTotalGroup.destroy()
                }
            }

            function h() {
                this.stacking || (this.stacking = new g(this))
            }
            var m = [];
            a.compose = function(a) {
                -1 === m.indexOf(a) && (m.push(a), y(a, "init", h), y(a, "destroy", c));
                return a
            };
            var g = function() {
                function c(c) {
                    this.oldStacks = {};
                    this.stacks = {};
                    this.stacksTouched = 0;
                    this.axis = c
                }
                c.prototype.buildStacks =
                    function() {
                        var c = this.axis,
                            a = c.series,
                            f = c.options.reversedStacks,
                            g = a.length,
                            h;
                        if (!c.isXAxis) {
                            this.usePercentage = !1;
                            for (h = g; h--;) {
                                var l = a[f ? h : g - h - 1];
                                l.setStackedPoints();
                                l.setGroupedPoints()
                            }
                            for (h = 0; h < g; h++) a[h].modifyStacks();
                            I(c, "afterBuildStacks")
                        }
                    };
                c.prototype.cleanStacks = function() {
                    if (!this.axis.isXAxis) {
                        if (this.oldStacks) var c = this.stacks = this.oldStacks;
                        q(c, function(c) {
                            q(c, function(c) {
                                c.cumulative = c.total
                            })
                        })
                    }
                };
                c.prototype.resetStacks = function() {
                    var c = this,
                        a = c.stacks;
                    c.axis.isXAxis || q(a, function(a) {
                        q(a,
                            function(e, f) {
                                x(e.touched) && e.touched < c.stacksTouched ? (e.destroy(), delete a[f]) : (e.total = null, e.cumulative = null)
                            })
                    })
                };
                c.prototype.renderStackTotals = function() {
                    var c = this.axis,
                        a = c.chart,
                        f = a.renderer,
                        g = this.stacks;
                    c = E(a, c.options.stackLabels && c.options.stackLabels.animation || !1);
                    var h = this.stackTotalGroup = this.stackTotalGroup || f.g("stack-labels").attr({
                        visibility: "visible",
                        zIndex: 6,
                        opacity: 0
                    }).add();
                    h.translate(a.plotLeft, a.plotTop);
                    q(g, function(c) {
                        q(c, function(c) {
                            c.render(h)
                        })
                    });
                    h.animate({
                            opacity: 1
                        },
                        c)
                };
                return c
            }();
            a.Additions = g
        })(m || (m = {}));
        return m
    });
    N(a, "Extensions/Stacking.js", [a["Core/Axis/Axis.js"], a["Core/Chart/Chart.js"], a["Core/FormatUtilities.js"], a["Core/Globals.js"], a["Core/Series/Series.js"], a["Core/Axis/StackingAxis.js"], a["Core/Utilities.js"]], function(a, t, B, H, y, F, I) {
        var x = B.format,
            q = I.correctFloat,
            m = I.defined,
            h = I.destroyObjectProperties,
            c = I.isArray,
            n = I.isNumber,
            z = I.objectEach,
            g = I.pick,
            f = function() {
                function c(c, a, e, f, g) {
                    var l = c.chart.inverted;
                    this.axis = c;
                    this.isNegative = e;
                    this.options =
                        a = a || {};
                    this.x = f;
                    this.total = null;
                    this.points = {};
                    this.hasValidPoints = !1;
                    this.stack = g;
                    this.rightCliff = this.leftCliff = 0;
                    this.alignOptions = {
                        align: a.align || (l ? e ? "left" : "right" : "center"),
                        verticalAlign: a.verticalAlign || (l ? "middle" : e ? "bottom" : "top"),
                        y: a.y,
                        x: a.x
                    };
                    this.textAlign = a.textAlign || (l ? e ? "right" : "left" : "center")
                }
                c.prototype.destroy = function() {
                    h(this, this.axis)
                };
                c.prototype.render = function(c) {
                    var a = this.axis.chart,
                        e = this.options,
                        f = e.format;
                    f = f ? x(f, this, a) : e.formatter.call(this);
                    this.label ? this.label.attr({
                        text: f,
                        visibility: "hidden"
                    }) : (this.label = a.renderer.label(f, null, null, e.shape, null, null, e.useHTML, !1, "stack-labels"), f = {
                        r: e.borderRadius || 0,
                        text: f,
                        rotation: e.rotation,
                        padding: g(e.padding, 5),
                        visibility: "hidden"
                    }, a.styledMode || (f.fill = e.backgroundColor, f.stroke = e.borderColor, f["stroke-width"] = e.borderWidth, this.label.css(e.style)), this.label.attr(f), this.label.added || this.label.add(c));
                    this.label.labelrank = a.plotSizeY
                };
                c.prototype.setOffset = function(c, a, e, f, l) {
                    var h = this.axis,
                        b = h.chart;
                    f = h.translate(h.stacking.usePercentage ?
                        100 : f ? f : this.total, 0, 0, 0, 1);
                    e = h.translate(e ? e : 0);
                    e = m(f) && Math.abs(f - e);
                    c = g(l, b.xAxis[0].translate(this.x)) + c;
                    h = m(f) && this.getStackBox(b, this, c, f, a, e, h);
                    a = this.label;
                    e = this.isNegative;
                    c = "justify" === g(this.options.overflow, "justify");
                    var p = this.textAlign;
                    a && h && (l = a.getBBox(), f = a.padding, p = "left" === p ? b.inverted ? -f : f : "right" === p ? l.width : b.inverted && "center" === p ? l.width / 2 : b.inverted ? e ? l.width + f : -f : l.width / 2, e = b.inverted ? l.height / 2 : e ? -f : l.height, this.alignOptions.x = g(this.options.x, 0), this.alignOptions.y =
                        g(this.options.y, 0), h.x -= p, h.y -= e, a.align(this.alignOptions, null, h), b.isInsidePlot(a.alignAttr.x + p - this.alignOptions.x, a.alignAttr.y + e - this.alignOptions.y) ? a.show() : (a.alignAttr.y = -9999, c = !1), c && y.prototype.justifyDataLabel.call(this.axis, a, this.alignOptions, a.alignAttr, l, h), a.attr({
                            x: a.alignAttr.x,
                            y: a.alignAttr.y
                        }), g(!c && this.options.crop, !0) && ((b = n(a.x) && n(a.y) && b.isInsidePlot(a.x - f + a.width, a.y) && b.isInsidePlot(a.x + f, a.y)) || a.hide()))
                };
                c.prototype.getStackBox = function(c, a, e, f, g, h, b) {
                    var l = a.axis.reversed,
                        d = c.inverted,
                        p = b.height + b.pos - (d ? c.plotLeft : c.plotTop);
                    a = a.isNegative && !l || !a.isNegative && l;
                    return {
                        x: d ? a ? f - b.right : f - h + b.pos - c.plotLeft : e + c.xAxis[0].transB - c.plotLeft,
                        y: d ? b.height - e - g : a ? p - f - h : p - f,
                        width: d ? h : g,
                        height: d ? g : h
                    }
                };
                return c
            }();
        t.prototype.getStacks = function() {
            var c = this,
                a = c.inverted;
            c.yAxis.forEach(function(c) {
                c.stacking && c.stacking.stacks && c.hasVisibleSeries && (c.stacking.oldStacks = c.stacking.stacks)
            });
            c.series.forEach(function(e) {
                var f = e.xAxis && e.xAxis.options || {};
                !e.options.stacking || !0 !==
                    e.visible && !1 !== c.options.chart.ignoreHiddenSeries || (e.stackKey = [e.type, g(e.options.stack, ""), a ? f.top : f.left, a ? f.height : f.width].join())
            })
        };
        F.compose(a);
        y.prototype.setGroupedPoints = function() {
            var c = this.yAxis.stacking;
            this.options.centerInCategory && (this.is("column") || this.is("columnrange")) && !this.options.stacking && 1 < this.chart.series.length ? y.prototype.setStackedPoints.call(this, "group") : c && z(c.stacks, function(a, e) {
                "group" === e.slice(-5) && (z(a, function(c) {
                    return c.destroy()
                }), delete c.stacks[e])
            })
        };
        y.prototype.setStackedPoints = function(a) {
            var e = a || this.options.stacking;
            if (e && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var h = this.processedXData,
                    n = this.processedYData,
                    p = [],
                    l = n.length,
                    w = this.options,
                    b = w.threshold,
                    v = g(w.startFromThreshold && b, 0);
                w = w.stack;
                a = a ? this.type + "," + e : this.stackKey;
                var d = "-" + a,
                    z = this.negStacks,
                    C = this.yAxis,
                    k = C.stacking.stacks,
                    K = C.stacking.oldStacks,
                    O, r;
                C.stacking.stacksTouched += 1;
                for (r = 0; r < l; r++) {
                    var A = h[r];
                    var P = n[r];
                    var x = this.getStackIndicator(x,
                        A, this.index);
                    var u = x.key;
                    var L = (O = z && P < (v ? 0 : b)) ? d : a;
                    k[L] || (k[L] = {});
                    k[L][A] || (K[L] && K[L][A] ? (k[L][A] = K[L][A], k[L][A].total = null) : k[L][A] = new f(C, C.options.stackLabels, O, A, w));
                    L = k[L][A];
                    null !== P ? (L.points[u] = L.points[this.index] = [g(L.cumulative, v)], m(L.cumulative) || (L.base = u), L.touched = C.stacking.stacksTouched, 0 < x.index && !1 === this.singleStacks && (L.points[u][0] = L.points[this.index + "," + A + ",0"][0])) : L.points[u] = L.points[this.index] = null;
                    "percent" === e ? (O = O ? a : d, z && k[O] && k[O][A] ? (O = k[O][A], L.total = O.total =
                        Math.max(O.total, L.total) + Math.abs(P) || 0) : L.total = q(L.total + (Math.abs(P) || 0))) : "group" === e ? (c(P) && (P = P[0]), null !== P && (L.total = (L.total || 0) + 1)) : L.total = q(L.total + (P || 0));
                    L.cumulative = "group" === e ? (L.total || 1) - 1 : g(L.cumulative, v) + (P || 0);
                    null !== P && (L.points[u].push(L.cumulative), p[r] = L.cumulative, L.hasValidPoints = !0)
                }
                "percent" === e && (C.stacking.usePercentage = !0);
                "group" !== e && (this.stackedYData = p);
                C.stacking.oldStacks = {}
            }
        };
        y.prototype.modifyStacks = function() {
            var c = this,
                a = c.stackKey,
                f = c.yAxis.stacking.stacks,
                g = c.processedXData,
                h, l = c.options.stacking;
            c[l + "Stacker"] && [a, "-" + a].forEach(function(a) {
                for (var b = g.length, e, d; b--;)
                    if (e = g[b], h = c.getStackIndicator(h, e, c.index, a), d = (e = f[a] && f[a][e]) && e.points[h.key]) c[l + "Stacker"](d, e, b)
            })
        };
        y.prototype.percentStacker = function(c, a, f) {
            a = a.total ? 100 / a.total : 0;
            c[0] = q(c[0] * a);
            c[1] = q(c[1] * a);
            this.stackedYData[f] = c[1]
        };
        y.prototype.getStackIndicator = function(c, a, f, g) {
            !m(c) || c.x !== a || g && c.key !== g ? c = {
                x: a,
                index: 0,
                key: g
            } : c.index++;
            c.key = [f, a, c.index].join();
            return c
        };
        H.StackItem =
            f;
        "";
        return H.StackItem
    });
    N(a, "Series/Line/LineSeries.js", [a["Core/Series/Series.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function(a, t, B) {
        var E = this && this.__extends || function() {
                var a = function(x, q) {
                    a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(a, h) {
                        a.__proto__ = h
                    } || function(a, h) {
                        for (var c in h) h.hasOwnProperty(c) && (a[c] = h[c])
                    };
                    return a(x, q)
                };
                return function(x, q) {
                    function m() {
                        this.constructor = x
                    }
                    a(x, q);
                    x.prototype = null === q ? Object.create(q) : (m.prototype = q.prototype,
                        new m)
                }
            }(),
            y = B.defined,
            F = B.merge;
        B = function(t) {
            function x() {
                var a = null !== t && t.apply(this, arguments) || this;
                a.data = void 0;
                a.options = void 0;
                a.points = void 0;
                return a
            }
            E(x, t);
            x.prototype.drawGraph = function() {
                var a = this,
                    m = this.options,
                    h = (this.gappedPath || this.getGraphPath).call(this),
                    c = this.chart.styledMode,
                    n = [
                        ["graph", "highcharts-graph"]
                    ];
                c || n[0].push(m.lineColor || this.color || "#cccccc", m.dashStyle);
                n = a.getZonesGraphs(n);
                n.forEach(function(n, g) {
                    var f = n[0],
                        e = a[f],
                        q = e ? "animate" : "attr";
                    e ? (e.endX = a.preventGraphAnimation ?
                        null : h.xMap, e.animate({
                            d: h
                        })) : h.length && (a[f] = e = a.chart.renderer.path(h).addClass(n[1]).attr({
                        zIndex: 1
                    }).add(a.group));
                    e && !c && (f = {
                        stroke: n[2],
                        "stroke-width": m.lineWidth,
                        fill: a.fillGraph && a.color || "none"
                    }, n[3] ? f.dashstyle = n[3] : "square" !== m.linecap && (f["stroke-linecap"] = f["stroke-linejoin"] = "round"), e[q](f).shadow(2 > g && m.shadow));
                    e && (e.startX = h.xMap, e.isArea = h.isArea)
                })
            };
            x.prototype.getGraphPath = function(a, m, h) {
                var c = this,
                    n = c.options,
                    q = [],
                    g = [],
                    f, e = n.step;
                a = a || c.points;
                var G = a.reversed;
                G && a.reverse();
                (e = {
                    right: 1,
                    center: 2
                } [e] || e && 3) && G && (e = 4 - e);
                a = this.getValidPoints(a, !1, !(n.connectNulls && !m && !h));
                a.forEach(function(z, G) {
                    var p = z.plotX,
                        l = z.plotY,
                        w = a[G - 1];
                    (z.leftCliff || w && w.rightCliff) && !h && (f = !0);
                    z.isNull && !y(m) && 0 < G ? f = !n.connectNulls : z.isNull && !m ? f = !0 : (0 === G || f ? G = [
                        ["M", z.plotX, z.plotY]
                    ] : c.getPointSpline ? G = [c.getPointSpline(a, z, G)] : e ? (G = 1 === e ? [
                        ["L", w.plotX, l]
                    ] : 2 === e ? [
                        ["L", (w.plotX + p) / 2, w.plotY],
                        ["L", (w.plotX + p) / 2, l]
                    ] : [
                        ["L", p, w.plotY]
                    ], G.push(["L", p, l])) : G = [
                        ["L", p, l]
                    ], g.push(z.x), e && (g.push(z.x),
                        2 === e && g.push(z.x)), q.push.apply(q, G), f = !1)
                });
                q.xMap = g;
                return c.graphPath = q
            };
            x.prototype.getZonesGraphs = function(a) {
                this.zones.forEach(function(m, h) {
                    h = ["zone-graph-" + h, "highcharts-graph highcharts-zone-graph-" + h + " " + (m.className || "")];
                    this.chart.styledMode || h.push(m.color || this.color, m.dashStyle || this.options.dashStyle);
                    a.push(h)
                }, this);
                return a
            };
            x.defaultOptions = F(a.defaultOptions, {});
            return x
        }(a);
        t.registerSeriesType("line", B);
        "";
        return B
    });
    N(a, "Series/Area/AreaSeries.js", [a["Core/Color/Color.js"],
        a["Core/Legend/LegendSymbol.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]
    ], function(a, t, B, H) {
        var E = this && this.__extends || function() {
                var a = function(c, h) {
                    a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(c, a) {
                        c.__proto__ = a
                    } || function(c, a) {
                        for (var f in a) a.hasOwnProperty(f) && (c[f] = a[f])
                    };
                    return a(c, h)
                };
                return function(c, h) {
                    function n() {
                        this.constructor = c
                    }
                    a(c, h);
                    c.prototype = null === h ? Object.create(h) : (n.prototype = h.prototype, new n)
                }
            }(),
            F = a.parse,
            I = B.seriesTypes.line;
        a =
            H.extend;
        var x = H.merge,
            q = H.objectEach,
            m = H.pick;
        H = function(a) {
            function c() {
                var c = null !== a && a.apply(this, arguments) || this;
                c.data = void 0;
                c.options = void 0;
                c.points = void 0;
                return c
            }
            E(c, a);
            c.prototype.drawGraph = function() {
                this.areaPath = [];
                a.prototype.drawGraph.apply(this);
                var c = this,
                    h = this.areaPath,
                    g = this.options,
                    f = [
                        ["area", "highcharts-area", this.color, g.fillColor]
                    ];
                this.zones.forEach(function(a, h) {
                    f.push(["zone-area-" + h, "highcharts-area highcharts-zone-area-" + h + " " + a.className, a.color || c.color, a.fillColor ||
                        g.fillColor
                    ])
                });
                f.forEach(function(a) {
                    var e = a[0],
                        f = c[e],
                        n = f ? "animate" : "attr",
                        p = {};
                    f ? (f.endX = c.preventGraphAnimation ? null : h.xMap, f.animate({
                        d: h
                    })) : (p.zIndex = 0, f = c[e] = c.chart.renderer.path(h).addClass(a[1]).add(c.group), f.isArea = !0);
                    c.chart.styledMode || (p.fill = m(a[3], F(a[2]).setOpacity(m(g.fillOpacity, .75)).get()));
                    f[n](p);
                    f.startX = h.xMap;
                    f.shiftUnit = g.step ? 2 : 1
                })
            };
            c.prototype.getGraphPath = function(c) {
                var a = I.prototype.getGraphPath,
                    g = this.options,
                    f = g.stacking,
                    e = this.yAxis,
                    h, n = [],
                    q = [],
                    p = this.index,
                    l =
                    e.stacking.stacks[this.stackKey],
                    w = g.threshold,
                    b = Math.round(e.getThreshold(g.threshold));
                g = m(g.connectNulls, "percent" === f);
                var v = function(a, d, g) {
                    var k = c[a];
                    a = f && l[k.x].points[p];
                    var h = k[g + "Null"] || 0;
                    g = k[g + "Cliff"] || 0;
                    k = !0;
                    if (g || h) {
                        var v = (h ? a[0] : a[1]) + g;
                        var m = a[0] + g;
                        k = !!h
                    } else !f && c[d] && c[d].isNull && (v = m = w);
                    "undefined" !== typeof v && (q.push({
                        plotX: D,
                        plotY: null === v ? b : e.getThreshold(v),
                        isNull: k,
                        isCliff: !0
                    }), n.push({
                        plotX: D,
                        plotY: null === m ? b : e.getThreshold(m),
                        doCurve: !1
                    }))
                };
                c = c || this.points;
                f && (c = this.getStackPoints(c));
                for (h = 0; h < c.length; h++) {
                    f || (c[h].leftCliff = c[h].rightCliff = c[h].leftNull = c[h].rightNull = void 0);
                    var d = c[h].isNull;
                    var D = m(c[h].rectPlotX, c[h].plotX);
                    var C = f ? m(c[h].yBottom, b) : b;
                    if (!d || g) g || v(h, h - 1, "left"), d && !f && g || (q.push(c[h]), n.push({
                        x: h,
                        plotX: D,
                        plotY: C
                    })), g || v(h, h + 1, "right")
                }
                h = a.call(this, q, !0, !0);
                n.reversed = !0;
                d = a.call(this, n, !0, !0);
                (C = d[0]) && "M" === C[0] && (d[0] = ["L", C[1], C[2]]);
                d = h.concat(d);
                d.length && d.push(["Z"]);
                a = a.call(this, q, !1, g);
                d.xMap = h.xMap;
                this.areaPath = d;
                return a
            };
            c.prototype.getStackPoints =
                function(c) {
                    var a = this,
                        g = [],
                        f = [],
                        e = this.xAxis,
                        h = this.yAxis,
                        n = h.stacking.stacks[this.stackKey],
                        x = {},
                        p = h.series,
                        l = p.length,
                        w = h.options.reversedStacks ? 1 : -1,
                        b = p.indexOf(a);
                    c = c || this.points;
                    if (this.options.stacking) {
                        for (var v = 0; v < c.length; v++) c[v].leftNull = c[v].rightNull = void 0, x[c[v].x] = c[v];
                        q(n, function(b, c) {
                            null !== b.total && f.push(c)
                        });
                        f.sort(function(b, c) {
                            return b - c
                        });
                        var d = p.map(function(b) {
                            return b.visible
                        });
                        f.forEach(function(c, v) {
                            var k = 0,
                                q, C;
                            if (x[c] && !x[c].isNull) g.push(x[c]), [-1, 1].forEach(function(e) {
                                var k =
                                    1 === e ? "rightNull" : "leftNull",
                                    g = 0,
                                    r = n[f[v + e]];
                                if (r)
                                    for (var h = b; 0 <= h && h < l;) {
                                        var A = p[h].index;
                                        q = r.points[A];
                                        q || (A === a.index ? x[c][k] = !0 : d[h] && (C = n[c].points[A]) && (g -= C[1] - C[0]));
                                        h += w
                                    }
                                x[c][1 === e ? "rightCliff" : "leftCliff"] = g
                            });
                            else {
                                for (var r = b; 0 <= r && r < l;) {
                                    if (q = n[c].points[p[r].index]) {
                                        k = q[1];
                                        break
                                    }
                                    r += w
                                }
                                k = m(k, 0);
                                k = h.translate(k, 0, 1, 0, 1);
                                g.push({
                                    isNull: !0,
                                    plotX: e.translate(c, 0, 0, 0, 1),
                                    x: c,
                                    plotY: k,
                                    yBottom: k
                                })
                            }
                        })
                    }
                    return g
                };
            c.defaultOptions = x(I.defaultOptions, {
                threshold: 0
            });
            return c
        }(I);
        a(H.prototype, {
            singleStacks: !1,
            drawLegendSymbol: t.drawRectangle
        });
        B.registerSeriesType("area", H);
        "";
        return H
    });
    N(a, "Series/Spline/SplineSeries.js", [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function(a, t) {
        var E = this && this.__extends || function() {
                var a = function(x, q) {
                    a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(a, h) {
                        a.__proto__ = h
                    } || function(a, h) {
                        for (var c in h) h.hasOwnProperty(c) && (a[c] = h[c])
                    };
                    return a(x, q)
                };
                return function(x, q) {
                    function m() {
                        this.constructor = x
                    }
                    a(x, q);
                    x.prototype = null === q ? Object.create(q) :
                        (m.prototype = q.prototype, new m)
                }
            }(),
            H = a.seriesTypes.line,
            y = t.merge,
            F = t.pick;
        t = function(a) {
            function x() {
                var q = null !== a && a.apply(this, arguments) || this;
                q.data = void 0;
                q.options = void 0;
                q.points = void 0;
                return q
            }
            E(x, a);
            x.prototype.getPointSpline = function(a, m, h) {
                var c = m.plotX || 0,
                    n = m.plotY || 0,
                    q = a[h - 1];
                h = a[h + 1];
                if (q && !q.isNull && !1 !== q.doCurve && !m.isCliff && h && !h.isNull && !1 !== h.doCurve && !m.isCliff) {
                    a = q.plotY || 0;
                    var g = h.plotX || 0;
                    h = h.plotY || 0;
                    var f = 0;
                    var e = (1.5 * c + (q.plotX || 0)) / 2.5;
                    var G = (1.5 * n + a) / 2.5;
                    g = (1.5 * c +
                        g) / 2.5;
                    var J = (1.5 * n + h) / 2.5;
                    g !== e && (f = (J - G) * (g - c) / (g - e) + n - J);
                    G += f;
                    J += f;
                    G > a && G > n ? (G = Math.max(a, n), J = 2 * n - G) : G < a && G < n && (G = Math.min(a, n), J = 2 * n - G);
                    J > h && J > n ? (J = Math.max(h, n), G = 2 * n - J) : J < h && J < n && (J = Math.min(h, n), G = 2 * n - J);
                    m.rightContX = g;
                    m.rightContY = J
                }
                m = ["C", F(q.rightContX, q.plotX, 0), F(q.rightContY, q.plotY, 0), F(e, c, 0), F(G, n, 0), c, n];
                q.rightContX = q.rightContY = void 0;
                return m
            };
            x.defaultOptions = y(H.defaultOptions);
            return x
        }(H);
        a.registerSeriesType("spline", t);
        "";
        return t
    });
    N(a, "Series/AreaSpline/AreaSplineSeries.js",
        [a["Series/Area/AreaSeries.js"], a["Series/Spline/SplineSeries.js"], a["Core/Legend/LegendSymbol.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]],
        function(a, t, B, H, y) {
            var E = this && this.__extends || function() {
                    var a = function(h, c) {
                        a = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(a, c) {
                            a.__proto__ = c
                        } || function(a, c) {
                            for (var g in c) c.hasOwnProperty(g) && (a[g] = c[g])
                        };
                        return a(h, c)
                    };
                    return function(h, c) {
                        function n() {
                            this.constructor = h
                        }
                        a(h, c);
                        h.prototype = null === c ? Object.create(c) :
                            (n.prototype = c.prototype, new n)
                    }
                }(),
                I = a.prototype,
                x = y.extend,
                q = y.merge;
            y = function(m) {
                function h() {
                    var a = null !== m && m.apply(this, arguments) || this;
                    a.data = void 0;
                    a.points = void 0;
                    a.options = void 0;
                    return a
                }
                E(h, m);
                h.defaultOptions = q(t.defaultOptions, a.defaultOptions);
                return h
            }(t);
            x(y.prototype, {
                getGraphPath: I.getGraphPath,
                getStackPoints: I.getStackPoints,
                drawGraph: I.drawGraph,
                drawLegendSymbol: B.drawRectangle
            });
            H.registerSeriesType("areaspline", y);
            "";
            return y
        });
    N(a, "Series/Column/ColumnSeries.js", [a["Core/Animation/AnimationUtilities.js"],
        a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Legend/LegendSymbol.js"], a["Core/Series/Series.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]
    ], function(a, t, B, H, y, F, I) {
        var x = this && this.__extends || function() {
                var a = function(c, b) {
                    a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(b, a) {
                        b.__proto__ = a
                    } || function(b, a) {
                        for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c])
                    };
                    return a(c, b)
                };
                return function(c, b) {
                    function e() {
                        this.constructor = c
                    }
                    a(c, b);
                    c.prototype = null === b ? Object.create(b) :
                        (e.prototype = b.prototype, new e)
                }
            }(),
            q = a.animObject,
            m = t.parse,
            h = B.hasTouch;
        a = B.noop;
        var c = I.clamp,
            n = I.css,
            z = I.defined,
            g = I.extend,
            f = I.fireEvent,
            e = I.isArray,
            G = I.isNumber,
            J = I.merge,
            M = I.pick,
            p = I.objectEach;
        I = function(a) {
            function l() {
                var b = null !== a && a.apply(this, arguments) || this;
                b.borderWidth = void 0;
                b.data = void 0;
                b.group = void 0;
                b.options = void 0;
                b.points = void 0;
                return b
            }
            x(l, a);
            l.prototype.animate = function(b) {
                var a = this,
                    d = this.yAxis,
                    e = a.options,
                    f = this.chart.inverted,
                    k = {},
                    h = f ? "translateX" : "translateY";
                if (b) k.scaleY =
                    .001, b = c(d.toPixels(e.threshold), d.pos, d.pos + d.len), f ? k.translateX = b - d.len : k.translateY = b, a.clipBox && a.setClip(), a.group.attr(k);
                else {
                    var l = Number(a.group.attr(h));
                    a.group.animate({
                        scaleY: 1
                    }, g(q(a.options.animation), {
                        step: function(b, c) {
                            a.group && (k[h] = l + c.pos * (d.pos - l), a.group.attr(k))
                        }
                    }))
                }
            };
            l.prototype.init = function(b, c) {
                a.prototype.init.apply(this, arguments);
                var d = this;
                b = d.chart;
                b.hasRendered && b.series.forEach(function(b) {
                    b.type === d.type && (b.isDirty = !0)
                })
            };
            l.prototype.getColumnMetrics = function() {
                var b =
                    this,
                    a = b.options,
                    c = b.xAxis,
                    e = b.yAxis,
                    f = c.options.reversedStacks;
                f = c.reversed && !f || !c.reversed && f;
                var k = {},
                    g, h = 0;
                !1 === a.grouping ? h = 1 : b.chart.series.forEach(function(a) {
                    var c = a.yAxis,
                        d = a.options;
                    if (a.type === b.type && (a.visible || !b.chart.options.chart.ignoreHiddenSeries) && e.len === c.len && e.pos === c.pos) {
                        if (d.stacking && "group" !== d.stacking) {
                            g = a.stackKey;
                            "undefined" === typeof k[g] && (k[g] = h++);
                            var f = k[g]
                        } else !1 !== d.grouping && (f = h++);
                        a.columnIndex = f
                    }
                });
                var r = Math.min(Math.abs(c.transA) * (c.ordinal && c.ordinal.slope ||
                        a.pointRange || c.closestPointRange || c.tickInterval || 1), c.len),
                    l = r * a.groupPadding,
                    p = (r - 2 * l) / (h || 1);
                a = Math.min(a.maxPointWidth || c.len, M(a.pointWidth, p * (1 - 2 * a.pointPadding)));
                b.columnMetrics = {
                    width: a,
                    offset: (p - a) / 2 + (l + ((b.columnIndex || 0) + (f ? 1 : 0)) * p - r / 2) * (f ? -1 : 1),
                    paddedWidth: p,
                    columnCount: h
                };
                return b.columnMetrics
            };
            l.prototype.crispCol = function(b, a, c, e) {
                var d = this.chart,
                    f = this.borderWidth,
                    g = -(f % 2 ? .5 : 0);
                f = f % 2 ? .5 : 1;
                d.inverted && d.renderer.isVML && (f += 1);
                this.options.crisp && (c = Math.round(b + c) + g, b = Math.round(b) +
                    g, c -= b);
                e = Math.round(a + e) + f;
                g = .5 >= Math.abs(a) && .5 < e;
                a = Math.round(a) + f;
                e -= a;
                g && e && (--a, e += 1);
                return {
                    x: b,
                    y: a,
                    width: c,
                    height: e
                }
            };
            l.prototype.adjustForMissingColumns = function(b, a, c, f) {
                var d = this,
                    k = this.options.stacking;
                if (!c.isNull && 1 < f.columnCount) {
                    var g = 0,
                        h = 0;
                    p(this.yAxis.stacking && this.yAxis.stacking.stacks, function(b) {
                        if ("number" === typeof c.x && (b = b[c.x.toString()])) {
                            var a = b.points[d.index],
                                f = b.total;
                            k ? (a && (g = h), b.hasValidPoints && h++) : e(a) && (g = a[1], h = f || 0)
                        }
                    });
                    b = (c.plotX || 0) + ((h - 1) * f.paddedWidth + a) /
                        2 - a - g * f.paddedWidth
                }
                return b
            };
            l.prototype.translate = function() {
                var b = this,
                    a = b.chart,
                    d = b.options,
                    e = b.dense = 2 > b.closestPointRange * b.xAxis.transA;
                e = b.borderWidth = M(d.borderWidth, e ? 0 : 1);
                var f = b.xAxis,
                    k = b.yAxis,
                    g = d.threshold,
                    h = b.translatedThreshold = k.getThreshold(g),
                    r = M(d.minPointLength, 5),
                    l = b.getColumnMetrics(),
                    p = l.width,
                    n = b.pointXOffset = l.offset,
                    u = b.dataMin,
                    m = b.dataMax,
                    w = b.barW = Math.max(p, 1 + 2 * e);
                a.inverted && (h -= .5);
                d.pointPadding && (w = Math.ceil(w));
                y.prototype.translate.apply(b);
                b.points.forEach(function(e) {
                    var A =
                        M(e.yBottom, h),
                        v = 999 + Math.abs(A),
                        q = e.plotX || 0;
                    v = c(e.plotY, -v, k.len + v);
                    var C = Math.min(v, A),
                        K = Math.max(v, A) - C,
                        L = p,
                        O = q + n,
                        D = w;
                    r && Math.abs(K) < r && (K = r, q = !k.reversed && !e.negative || k.reversed && e.negative, G(g) && G(m) && e.y === g && m <= g && (k.min || 0) < g && (u !== m || (k.max || 0) <= g) && (q = !q), C = Math.abs(C - h) > r ? A - r : h - (q ? r : 0));
                    z(e.options.pointWidth) && (L = D = Math.ceil(e.options.pointWidth), O -= Math.round((L - p) / 2));
                    d.centerInCategory && (O = b.adjustForMissingColumns(O, L, e, l));
                    e.barX = O;
                    e.pointWidth = L;
                    e.tooltipPos = a.inverted ? [c(k.len +
                        k.pos - a.plotLeft - v, k.pos - a.plotLeft, k.len + k.pos - a.plotLeft), f.len + f.pos - a.plotTop - O - D / 2, K] : [f.left - a.plotLeft + O + D / 2, c(v + k.pos - a.plotTop, k.pos - a.plotTop, k.len + k.pos - a.plotTop), K];
                    e.shapeType = b.pointClass.prototype.shapeType || "rect";
                    e.shapeArgs = b.crispCol.apply(b, e.isNull ? [O, h, D, 0] : [O, C, D, K])
                })
            };
            l.prototype.drawGraph = function() {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            };
            l.prototype.pointAttribs = function(b, a) {
                var c = this.options,
                    e = this.pointAttrToOptions || {},
                    f = e.stroke ||
                    "borderColor",
                    k = e["stroke-width"] || "borderWidth",
                    g = b && b.color || this.color,
                    h = b && b[f] || c[f] || g;
                e = b && b.options.dashStyle || c.dashStyle;
                var r = b && b[k] || c[k] || this[k] || 0,
                    l = M(b && b.opacity, c.opacity, 1);
                if (b && this.zones.length) {
                    var p = b.getZone();
                    g = b.options.color || p && (p.color || b.nonZonedColor) || this.color;
                    p && (h = p.borderColor || h, e = p.dashStyle || e, r = p.borderWidth || r)
                }
                a && b && (b = J(c.states[a], b.options.states && b.options.states[a] || {}), a = b.brightness, g = b.color || "undefined" !== typeof a && m(g).brighten(b.brightness).get() ||
                    g, h = b[f] || h, r = b[k] || r, e = b.dashStyle || e, l = M(b.opacity, l));
                f = {
                    fill: g,
                    stroke: h,
                    "stroke-width": r,
                    opacity: l
                };
                e && (f.dashstyle = e);
                return f
            };
            l.prototype.drawPoints = function() {
                var b = this,
                    a = this.chart,
                    c = b.options,
                    e = a.renderer,
                    f = c.animationLimit || 250,
                    k;
                b.points.forEach(function(d) {
                    var g = d.graphic,
                        h = !!g,
                        l = g && a.pointCount < f ? "animate" : "attr";
                    if (G(d.plotY) && null !== d.y) {
                        k = d.shapeArgs;
                        g && d.hasNewShapeType() && (g = g.destroy());
                        b.enabledDataSorting && (d.startXPos = b.xAxis.reversed ? -(k ? k.width || 0 : 0) : b.xAxis.width);
                        g || (d.graphic =
                            g = e[d.shapeType](k).add(d.group || b.group)) && b.enabledDataSorting && a.hasRendered && a.pointCount < f && (g.attr({
                            x: d.startXPos
                        }), h = !0, l = "animate");
                        if (g && h) g[l](J(k));
                        if (c.borderRadius) g[l]({
                            r: c.borderRadius
                        });
                        a.styledMode || g[l](b.pointAttribs(d, d.selected && "select")).shadow(!1 !== d.allowShadow && c.shadow, null, c.stacking && !c.borderRadius);
                        g && (g.addClass(d.getClassName(), !0), g.attr({
                            visibility: d.visible ? "inherit" : "hidden"
                        }))
                    } else g && (d.graphic = g.destroy())
                })
            };
            l.prototype.drawTracker = function() {
                var b = this,
                    a =
                    b.chart,
                    c = a.pointer,
                    g = function(b) {
                        var a = c.getPointFromEvent(b);
                        "undefined" !== typeof a && (c.isDirectTouch = !0, a.onMouseOver(b))
                    },
                    l;
                b.points.forEach(function(b) {
                    l = e(b.dataLabels) ? b.dataLabels : b.dataLabel ? [b.dataLabel] : [];
                    b.graphic && (b.graphic.element.point = b);
                    l.forEach(function(a) {
                        a.div ? a.div.point = b : a.element.point = b
                    })
                });
                b._hasTracking || (b.trackerGroups.forEach(function(d) {
                    if (b[d]) {
                        b[d].addClass("highcharts-tracker").on("mouseover", g).on("mouseout", function(b) {
                            c.onTrackerMouseOut(b)
                        });
                        if (h) b[d].on("touchstart",
                            g);
                        !a.styledMode && b.options.cursor && b[d].css(n).css({
                            cursor: b.options.cursor
                        })
                    }
                }), b._hasTracking = !0);
                f(this, "afterDrawTracker")
            };
            l.prototype.remove = function() {
                var b = this,
                    a = b.chart;
                a.hasRendered && a.series.forEach(function(a) {
                    a.type === b.type && (a.isDirty = !0)
                });
                y.prototype.remove.apply(b, arguments)
            };
            l.defaultOptions = J(y.defaultOptions, {
                borderRadius: 0,
                centerInCategory: !1,
                groupPadding: .2,
                marker: null,
                pointPadding: .1,
                minPointLength: 0,
                cropThreshold: 50,
                pointRange: null,
                states: {
                    hover: {
                        halo: !1,
                        brightness: .1
                    },
                    select: {
                        color: "#cccccc",
                        borderColor: "#000000"
                    }
                },
                dataLabels: {
                    align: void 0,
                    verticalAlign: void 0,
                    y: void 0
                },
                startFromThreshold: !0,
                stickyTracking: !1,
                tooltip: {
                    distance: 6
                },
                threshold: 0,
                borderColor: "#ffffff"
            });
            return l
        }(y);
        g(I.prototype, {
            cropShoulder: 0,
            directTouch: !0,
            drawLegendSymbol: H.drawRectangle,
            getSymbol: a,
            negStacks: !0,
            trackerGroups: ["group", "dataLabelsGroup"]
        });
        F.registerSeriesType("column", I);
        "";
        "";
        return I
    });
    N(a, "Core/Series/DataLabel.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/FormatUtilities.js"],
        a["Core/Utilities.js"]
    ], function(a, t, B) {
        var E = a.getDeferredAnimation,
            y = t.format,
            F = B.defined,
            I = B.extend,
            x = B.fireEvent,
            q = B.isArray,
            m = B.merge,
            h = B.objectEach,
            c = B.pick,
            n = B.splat,
            z;
        (function(a) {
            function f(a, b, e, d, f) {
                var g = this,
                    k = this.chart,
                    h = this.isCartesian && k.inverted,
                    l = this.enabledDataSorting,
                    r = c(a.dlBox && a.dlBox.centerX, a.plotX, -9999),
                    p = c(a.plotY, -9999),
                    n = b.getBBox(),
                    m = e.rotation,
                    u = e.align,
                    w = k.isInsidePlot(r, Math.round(p), {
                        inverted: h,
                        paneCoordinates: !0,
                        series: g
                    }),
                    v = function(c) {
                        l && g.xAxis && !q && g.setDataLabelStartPos(a,
                            b, f, w, c)
                    },
                    q = "justify" === c(e.overflow, l ? "none" : "justify"),
                    z = this.visible && !1 !== a.visible && (a.series.forceDL || l && !q || w || c(e.inside, !!this.options.stacking) && d && k.isInsidePlot(r, h ? d.x + 1 : d.y + d.height - 1, {
                        inverted: h,
                        paneCoordinates: !0,
                        series: g
                    }));
                if (z) {
                    var G = k.renderer.fontMetrics(k.styledMode ? void 0 : e.style.fontSize, b).b;
                    d = I({
                        x: h ? this.yAxis.len - p : r,
                        y: Math.round(h ? this.xAxis.len - r : p),
                        width: 0,
                        height: 0
                    }, d);
                    I(e, {
                        width: n.width,
                        height: n.height
                    });
                    m ? (q = !1, r = k.renderer.rotCorr(G, m), r = {
                        x: d.x + (e.x || 0) + d.width / 2 +
                            r.x,
                        y: d.y + (e.y || 0) + {
                            top: 0,
                            middle: .5,
                            bottom: 1
                        } [e.verticalAlign] * d.height
                    }, v(r), b[f ? "attr" : "animate"](r).attr({
                        align: u
                    }), v = (m + 720) % 360, v = 180 < v && 360 > v, "left" === u ? r.y -= v ? n.height : 0 : "center" === u ? (r.x -= n.width / 2, r.y -= n.height / 2) : "right" === u && (r.x -= n.width, r.y -= v ? 0 : n.height), b.placed = !0, b.alignAttr = r) : (v(d), b.align(e, void 0, d), r = b.alignAttr);
                    q && 0 <= d.height ? this.justifyDataLabel(b, e, r, n, d, f) : c(e.crop, !0) && (z = k.isInsidePlot(r.x, r.y, {
                        paneCoordinates: !0,
                        series: g
                    }) && k.isInsidePlot(r.x + n.width, r.y + n.height, {
                        paneCoordinates: !0,
                        series: g
                    }));
                    if (e.shape && !m) b[f ? "attr" : "animate"]({
                        anchorX: h ? k.plotWidth - a.plotY : a.plotX,
                        anchorY: h ? k.plotHeight - a.plotX : a.plotY
                    })
                }
                f && l && (b.placed = !1);
                z || l && !q || (b.hide(!0), b.placed = !1)
            }

            function e(a, b) {
                var c = b.filter;
                return c ? (b = c.operator, a = a[c.property], c = c.value, ">" === b && a > c || "<" === b && a < c || ">=" === b && a >= c || "<=" === b && a <= c || "==" === b && a == c || "===" === b && a === c ? !0 : !1) : !0
            }

            function g() {
                var a = this,
                    b = a.chart,
                    f = a.options,
                    d = a.points,
                    g = a.hasRendered || 0,
                    l = b.renderer,
                    k = f.dataLabels,
                    p, m = k.animation;
                m = k.defer ? E(b,
                    m, a) : {
                    defer: 0,
                    duration: 0
                };
                k = t(t(b.options.plotOptions && b.options.plotOptions.series && b.options.plotOptions.series.dataLabels, b.options.plotOptions && b.options.plotOptions[a.type] && b.options.plotOptions[a.type].dataLabels), k);
                x(this, "drawDataLabels");
                if (q(k) || k.enabled || a._hasPointLabels) {
                    var r = a.plotGroup("dataLabelsGroup", "data-labels", g ? "inherit" : "hidden", k.zIndex || 6);
                    r.attr({
                        opacity: +g
                    });
                    !g && (g = a.dataLabelsGroup) && (a.visible && r.show(!0), g[f.animation ? "animate" : "attr"]({
                        opacity: 1
                    }, m));
                    d.forEach(function(d) {
                        p =
                            n(t(k, d.dlOptions || d.options && d.options.dataLabels));
                        p.forEach(function(k, g) {
                            var p = k.enabled && (!d.isNull || d.dataLabelOnNull) && e(d, k),
                                n = d.connectors ? d.connectors[g] : d.connector,
                                m = d.dataLabels ? d.dataLabels[g] : d.dataLabel,
                                A = c(k.distance, d.labelDistance),
                                q = !m;
                            if (p) {
                                var v = d.getLabelConfig();
                                var w = c(k[d.formatPrefix + "Format"], k.format);
                                v = F(w) ? y(w, v, b) : (k[d.formatPrefix + "Formatter"] || k.formatter).call(v, k);
                                w = k.style;
                                var z = k.rotation;
                                b.styledMode || (w.color = c(k.color, w.color, a.color, "#000000"), "contrast" ===
                                    w.color ? (d.contrastColor = l.getContrast(d.color || a.color), w.color = !F(A) && k.inside || 0 > A || f.stacking ? d.contrastColor : "#000000") : delete d.contrastColor, f.cursor && (w.cursor = f.cursor));
                                var C = {
                                    r: k.borderRadius || 0,
                                    rotation: z,
                                    padding: k.padding,
                                    zIndex: 1
                                };
                                b.styledMode || (C.fill = k.backgroundColor, C.stroke = k.borderColor, C["stroke-width"] = k.borderWidth);
                                h(C, function(b, a) {
                                    "undefined" === typeof b && delete C[a]
                                })
                            }!m || p && F(v) && !!m.div === !!k.useHTML || (d.dataLabel = m = d.dataLabel && d.dataLabel.destroy(), d.dataLabels && (1 ===
                                d.dataLabels.length ? delete d.dataLabels : delete d.dataLabels[g]), g || delete d.dataLabel, n && (d.connector = d.connector.destroy(), d.connectors && (1 === d.connectors.length ? delete d.connectors : delete d.connectors[g])));
                            p && F(v) && (m ? C.text = v : (d.dataLabels = d.dataLabels || [], m = d.dataLabels[g] = z ? l.text(v, 0, -9999, k.useHTML).addClass("highcharts-data-label") : l.label(v, 0, -9999, k.shape, null, null, k.useHTML, null, "data-label"), g || (d.dataLabel = m), m.addClass(" highcharts-data-label-color-" + d.colorIndex + " " + (k.className ||
                                "") + (k.useHTML ? " highcharts-tracker" : ""))), m.options = k, m.attr(C), b.styledMode || m.css(w).shadow(k.shadow), m.added || m.add(r), k.textPath && !k.useHTML && (m.setTextPath(d.getDataLabelPath && d.getDataLabelPath(m) || d.graphic, k.textPath), d.dataLabelPath && !k.textPath.enabled && (d.dataLabelPath = d.dataLabelPath.destroy())), a.alignDataLabel(d, m, k, null, q))
                        })
                    })
                }
                x(this, "afterDrawDataLabels")
            }

            function z(a, b, c, d, e, f) {
                var k = this.chart,
                    g = b.align,
                    h = b.verticalAlign,
                    r = a.box ? 0 : a.padding || 0,
                    l = b.x;
                l = void 0 === l ? 0 : l;
                var p = b.y;
                p = void 0 === p ? 0 : p;
                var n = (c.x || 0) + r;
                if (0 > n) {
                    "right" === g && 0 <= l ? (b.align = "left", b.inside = !0) : l -= n;
                    var u = !0
                }
                n = (c.x || 0) + d.width - r;
                n > k.plotWidth && ("left" === g && 0 >= l ? (b.align = "right", b.inside = !0) : l += k.plotWidth - n, u = !0);
                n = c.y + r;
                0 > n && ("bottom" === h && 0 <= p ? (b.verticalAlign = "top", b.inside = !0) : p -= n, u = !0);
                n = (c.y || 0) + d.height - r;
                n > k.plotHeight && ("top" === h && 0 >= p ? (b.verticalAlign = "bottom", b.inside = !0) : p += k.plotHeight - n, u = !0);
                u && (b.x = l, b.y = p, a.placed = !f, a.align(b, void 0, e));
                return u
            }

            function t(a, b) {
                var c = [],
                    d;
                if (q(a) &&
                    !q(b)) c = a.map(function(a) {
                    return m(a, b)
                });
                else if (q(b) && !q(a)) c = b.map(function(b) {
                    return m(a, b)
                });
                else if (q(a) || q(b))
                    for (d = Math.max(a.length, b.length); d--;) c[d] = m(a[d], b[d]);
                else c = m(a, b);
                return c
            }

            function p(a, b, c, d, e) {
                var f = this.chart,
                    k = f.inverted,
                    g = this.xAxis,
                    h = g.reversed,
                    l = k ? b.height / 2 : b.width / 2;
                a = (a = a.pointWidth) ? a / 2 : 0;
                b.startXPos = k ? e.x : h ? -l - a : g.width - l + a;
                b.startYPos = k ? h ? this.yAxis.height - l + a : -l - a : e.y;
                d ? "hidden" === b.visibility && (b.show(), b.attr({
                    opacity: 0
                }).animate({
                    opacity: 1
                })) : b.attr({
                    opacity: 1
                }).animate({
                        opacity: 0
                    },
                    void 0, b.hide);
                f.hasRendered && (c && b.attr({
                    x: b.startXPos,
                    y: b.startYPos
                }), b.placed = !0)
            }
            var l = [];
            a.compose = function(a) {
                if (-1 === l.indexOf(a)) {
                    var b = a.prototype;
                    l.push(a);
                    b.alignDataLabel = f;
                    b.drawDataLabels = g;
                    b.justifyDataLabel = z;
                    b.setDataLabelStartPos = p
                }
            }
        })(z || (z = {}));
        "";
        return z
    });
    N(a, "Series/Column/ColumnDataLabel.js", [a["Core/Series/DataLabel.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function(a, t, B) {
        var E = t.series,
            y = B.merge,
            F = B.pick,
            I;
        (function(x) {
            function q(a, c, n, m, g) {
                var f =
                    this.chart.inverted,
                    e = a.series,
                    h = (e.xAxis ? e.xAxis.len : this.chart.plotSizeX) || 0;
                e = (e.yAxis ? e.yAxis.len : this.chart.plotSizeY) || 0;
                var q = a.dlBox || a.shapeArgs,
                    z = F(a.below, a.plotY > F(this.translatedThreshold, e)),
                    p = F(n.inside, !!this.options.stacking);
                q && (m = y(q), 0 > m.y && (m.height += m.y, m.y = 0), q = m.y + m.height - e, 0 < q && q < m.height && (m.height -= q), f && (m = {
                    x: e - m.y - m.height,
                    y: h - m.x - m.width,
                    width: m.height,
                    height: m.width
                }), p || (f ? (m.x += z ? 0 : m.width, m.width = 0) : (m.y += z ? m.height : 0, m.height = 0)));
                n.align = F(n.align, !f || p ? "center" :
                    z ? "right" : "left");
                n.verticalAlign = F(n.verticalAlign, f || p ? "middle" : z ? "top" : "bottom");
                E.prototype.alignDataLabel.call(this, a, c, n, m, g);
                n.inside && a.contrastColor && c.css({
                    color: a.contrastColor
                })
            }
            var m = [];
            x.compose = function(h) {
                a.compose(E); - 1 === m.indexOf(h) && (m.push(h), h.prototype.alignDataLabel = q)
            }
        })(I || (I = {}));
        return I
    });
    N(a, "Series/Bar/BarSeries.js", [a["Series/Column/ColumnSeries.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function(a, t, B) {
        var E = this && this.__extends || function() {
                var a =
                    function(x, q) {
                        a = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(a, h) {
                            a.__proto__ = h
                        } || function(a, h) {
                            for (var c in h) h.hasOwnProperty(c) && (a[c] = h[c])
                        };
                        return a(x, q)
                    };
                return function(x, q) {
                    function m() {
                        this.constructor = x
                    }
                    a(x, q);
                    x.prototype = null === q ? Object.create(q) : (m.prototype = q.prototype, new m)
                }
            }(),
            y = B.extend,
            F = B.merge;
        B = function(t) {
            function x() {
                var a = null !== t && t.apply(this, arguments) || this;
                a.data = void 0;
                a.options = void 0;
                a.points = void 0;
                return a
            }
            E(x, t);
            x.defaultOptions = F(a.defaultOptions, {});
            return x
        }(a);
        y(B.prototype, {
            inverted: !0
        });
        t.registerSeriesType("bar", B);
        "";
        return B
    });
    N(a, "Series/Scatter/ScatterSeries.js", [a["Series/Column/ColumnSeries.js"], a["Series/Line/LineSeries.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function(a, t, B, H) {
        var E = this && this.__extends || function() {
                var a = function(m, h) {
                    a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(a, h) {
                        a.__proto__ = h
                    } || function(a, h) {
                        for (var c in h) h.hasOwnProperty(c) && (a[c] = h[c])
                    };
                    return a(m, h)
                };
                return function(m,
                    h) {
                    function c() {
                        this.constructor = m
                    }
                    a(m, h);
                    m.prototype = null === h ? Object.create(h) : (c.prototype = h.prototype, new c)
                }
            }(),
            F = H.addEvent,
            I = H.extend,
            x = H.merge;
        H = function(a) {
            function m() {
                var h = null !== a && a.apply(this, arguments) || this;
                h.data = void 0;
                h.options = void 0;
                h.points = void 0;
                return h
            }
            E(m, a);
            m.prototype.applyJitter = function() {
                var a = this,
                    c = this.options.jitter,
                    n = this.points.length;
                c && this.points.forEach(function(h, g) {
                    ["x", "y"].forEach(function(f, e) {
                        var m = "plot" + f.toUpperCase();
                        if (c[f] && !h.isNull) {
                            var q = a[f +
                                "Axis"];
                            var z = c[f] * q.transA;
                            if (q && !q.isLog) {
                                var p = Math.max(0, h[m] - z);
                                q = Math.min(q.len, h[m] + z);
                                e = 1E4 * Math.sin(g + e * n);
                                h[m] = p + (q - p) * (e - Math.floor(e));
                                "x" === f && (h.clientX = h.plotX)
                            }
                        }
                    })
                })
            };
            m.prototype.drawGraph = function() {
                this.options.lineWidth ? a.prototype.drawGraph.call(this) : this.graph && (this.graph = this.graph.destroy())
            };
            m.defaultOptions = x(t.defaultOptions, {
                lineWidth: 0,
                findNearestPointBy: "xy",
                jitter: {
                    x: 0,
                    y: 0
                },
                marker: {
                    enabled: !0
                },
                tooltip: {
                    headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',
                    pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
                }
            });
            return m
        }(t);
        I(H.prototype, {
            drawTracker: a.prototype.drawTracker,
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1
        });
        F(H, "afterTranslate", function() {
            this.applyJitter()
        });
        B.registerSeriesType("scatter", H);
        "";
        return H
    });
    N(a, "Series/CenteredUtilities.js", [a["Core/Globals.js"], a["Core/Series/Series.js"], a["Core/Utilities.js"]], function(a, t, B) {
        var E = a.deg2rad,
            y = B.isNumber,
            F = B.pick,
            I = B.relativeLength,
            x;
        (function(a) {
            a.getCenter = function() {
                var a = this.options,
                    h = this.chart,
                    c = 2 * (a.slicedOffset || 0),
                    n = h.plotWidth - 2 * c,
                    q = h.plotHeight - 2 * c,
                    g = a.center,
                    f = Math.min(n, q),
                    e = a.size,
                    G = a.innerSize || 0;
                "string" === typeof e && (e = parseFloat(e));
                "string" === typeof G && (G = parseFloat(G));
                a = [F(g[0], "50%"), F(g[1], "50%"), F(e && 0 > e ? void 0 : a.size, "100%"), F(G && 0 > G ? void 0 : a.innerSize || 0, "0%")];
                !h.angular || this instanceof t || (a[3] = 0);
                for (g = 0; 4 > g; ++g) e = a[g], h = 2 > g || 2 === g && /%$/.test(e), a[g] = I(e, [n, q, f, a[2]][g]) +
                    (h ? c : 0);
                a[3] > a[2] && (a[3] = a[2]);
                return a
            };
            a.getStartAndEndRadians = function(a, h) {
                a = y(a) ? a : 0;
                h = y(h) && h > a && 360 > h - a ? h : a + 360;
                return {
                    start: E * (a + -90),
                    end: E * (h + -90)
                }
            }
        })(x || (x = {}));
        "";
        return x
    });
    N(a, "Series/Pie/PiePoint.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Series/Point.js"], a["Core/Utilities.js"]], function(a, t, B) {
        var E = this && this.__extends || function() {
                var a = function(c, h) {
                    a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(a, c) {
                        a.__proto__ = c
                    } || function(a, c) {
                        for (var f in c) c.hasOwnProperty(f) &&
                            (a[f] = c[f])
                    };
                    return a(c, h)
                };
                return function(c, h) {
                    function n() {
                        this.constructor = c
                    }
                    a(c, h);
                    c.prototype = null === h ? Object.create(h) : (n.prototype = h.prototype, new n)
                }
            }(),
            y = a.setAnimation,
            F = B.addEvent,
            I = B.defined;
        a = B.extend;
        var x = B.isNumber,
            q = B.pick,
            m = B.relativeLength;
        t = function(a) {
            function c() {
                var c = null !== a && a.apply(this, arguments) || this;
                c.labelDistance = void 0;
                c.options = void 0;
                c.series = void 0;
                return c
            }
            E(c, a);
            c.prototype.getConnectorPath = function() {
                var a = this.labelPosition,
                    c = this.series.options.dataLabels,
                    g = this.connectorShapes,
                    f = c.connectorShape;
                g[f] && (f = g[f]);
                return f.call(this, {
                    x: a.final.x,
                    y: a.final.y,
                    alignment: a.alignment
                }, a.connectorPosition, c)
            };
            c.prototype.getTranslate = function() {
                return this.sliced ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                }
            };
            c.prototype.haloPath = function(a) {
                var c = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(c.x, c.y, c.r + a, c.r + a, {
                    innerR: c.r - 1,
                    start: c.start,
                    end: c.end
                })
            };
            c.prototype.init = function() {
                var c = this;
                a.prototype.init.apply(this,
                    arguments);
                this.name = q(this.name, "Slice");
                var h = function(a) {
                    c.slice("select" === a.type)
                };
                F(this, "select", h);
                F(this, "unselect", h);
                return this
            };
            c.prototype.isValid = function() {
                return x(this.y) && 0 <= this.y
            };
            c.prototype.setVisible = function(a, c) {
                var g = this,
                    f = this.series,
                    e = f.chart,
                    h = f.options.ignoreHiddenPoint;
                c = q(c, h);
                a !== this.visible && (this.visible = this.options.visible = a = "undefined" === typeof a ? !this.visible : a, f.options.data[f.data.indexOf(this)] = this.options, ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(function(c) {
                    if (g[c]) g[c][a ?
                        "show" : "hide"
                    ](a)
                }), this.legendItem && e.legend.colorizeItem(this, a), a || "hover" !== this.state || this.setState(""), h && (f.isDirty = !0), c && e.redraw())
            };
            c.prototype.slice = function(a, c, g) {
                var f = this.series;
                y(g, f.chart);
                q(c, !0);
                this.sliced = this.options.sliced = I(a) ? a : !this.sliced;
                f.options.data[f.data.indexOf(this)] = this.options;
                this.graphic && this.graphic.animate(this.getTranslate());
                this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
            };
            return c
        }(t);
        a(t.prototype, {
            connectorShapes: {
                fixedOffset: function(a,
                    c, n) {
                    var h = c.breakAt;
                    c = c.touchingSliceAt;
                    return [
                        ["M", a.x, a.y], n.softConnector ? ["C", a.x + ("left" === a.alignment ? -5 : 5), a.y, 2 * h.x - c.x, 2 * h.y - c.y, h.x, h.y] : ["L", h.x, h.y],
                        ["L", c.x, c.y]
                    ]
                },
                straight: function(a, c) {
                    c = c.touchingSliceAt;
                    return [
                        ["M", a.x, a.y],
                        ["L", c.x, c.y]
                    ]
                },
                crookedLine: function(a, c, n) {
                    c = c.touchingSliceAt;
                    var h = this.series,
                        g = h.center[0],
                        f = h.chart.plotWidth,
                        e = h.chart.plotLeft;
                    h = a.alignment;
                    var q = this.shapeArgs.r;
                    n = m(n.crookDistance, 1);
                    f = "left" === h ? g + q + (f + e - g - q) * (1 - n) : e + (g - q) * n;
                    n = ["L", f, a.y];
                    g = !0;
                    if ("left" ===
                        h ? f > a.x || f < c.x : f < a.x || f > c.x) g = !1;
                    a = [
                        ["M", a.x, a.y]
                    ];
                    g && a.push(n);
                    a.push(["L", c.x, c.y]);
                    return a
                }
            }
        });
        return t
    });
    N(a, "Series/Pie/PieSeries.js", [a["Series/CenteredUtilities.js"], a["Series/Column/ColumnSeries.js"], a["Core/Globals.js"], a["Core/Legend/LegendSymbol.js"], a["Series/Pie/PiePoint.js"], a["Core/Series/Series.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Renderer/SVG/Symbols.js"], a["Core/Utilities.js"]], function(a, t, B, H, y, F, I, x, q) {
        var m = this && this.__extends || function() {
                var a = function(c, e) {
                    a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(a, c) {
                        a.__proto__ = c
                    } || function(a, c) {
                        for (var e in c) c.hasOwnProperty(e) && (a[e] = c[e])
                    };
                    return a(c, e)
                };
                return function(c, e) {
                    function f() {
                        this.constructor = c
                    }
                    a(c, e);
                    c.prototype = null === e ? Object.create(e) : (f.prototype = e.prototype, new f)
                }
            }(),
            h = a.getStartAndEndRadians;
        B = B.noop;
        var c = q.clamp,
            n = q.extend,
            z = q.fireEvent,
            g = q.merge,
            f = q.pick,
            e = q.relativeLength;
        q = function(a) {
            function n() {
                var c = null !== a && a.apply(this, arguments) || this;
                c.center = void 0;
                c.data = void 0;
                c.maxLabelDistance =
                    void 0;
                c.options = void 0;
                c.points = void 0;
                return c
            }
            m(n, a);
            n.prototype.animate = function(a) {
                var c = this,
                    e = c.points,
                    g = c.startAngleRad;
                a || e.forEach(function(b) {
                    var a = b.graphic,
                        d = b.shapeArgs;
                    a && d && (a.attr({
                        r: f(b.startR, c.center && c.center[3] / 2),
                        start: g,
                        end: g
                    }), a.animate({
                        r: d.r,
                        start: d.start,
                        end: d.end
                    }, c.options.animation))
                })
            };
            n.prototype.drawEmpty = function() {
                var a = this.startAngleRad,
                    c = this.endAngleRad,
                    e = this.options;
                if (0 === this.total && this.center) {
                    var f = this.center[0];
                    var b = this.center[1];
                    this.graph || (this.graph =
                        this.chart.renderer.arc(f, b, this.center[1] / 2, 0, a, c).addClass("highcharts-empty-series").add(this.group));
                    this.graph.attr({
                        d: x.arc(f, b, this.center[2] / 2, 0, {
                            start: a,
                            end: c,
                            innerR: this.center[3] / 2
                        })
                    });
                    this.chart.styledMode || this.graph.attr({
                        "stroke-width": e.borderWidth,
                        fill: e.fillColor || "none",
                        stroke: e.color || "#cccccc"
                    })
                } else this.graph && (this.graph = this.graph.destroy())
            };
            n.prototype.drawPoints = function() {
                var a = this.chart.renderer;
                this.points.forEach(function(c) {
                    c.graphic && c.hasNewShapeType() && (c.graphic =
                        c.graphic.destroy());
                    c.graphic || (c.graphic = a[c.shapeType](c.shapeArgs).add(c.series.group), c.delayedRendering = !0)
                })
            };
            n.prototype.generatePoints = function() {
                a.prototype.generatePoints.call(this);
                this.updateTotals()
            };
            n.prototype.getX = function(a, e, f) {
                var g = this.center,
                    b = this.radii ? this.radii[f.index] || 0 : g[2] / 2;
                a = Math.asin(c((a - g[1]) / (b + f.labelDistance), -1, 1));
                return g[0] + (e ? -1 : 1) * Math.cos(a) * (b + f.labelDistance) + (0 < f.labelDistance ? (e ? -1 : 1) * this.options.dataLabels.padding : 0)
            };
            n.prototype.hasData = function() {
                return !!this.processedXData.length
            };
            n.prototype.redrawPoints = function() {
                var a = this,
                    c = a.chart,
                    e = c.renderer,
                    f = a.options.shadow,
                    b, h, d, n;
                this.drawEmpty();
                !f || a.shadowGroup || c.styledMode || (a.shadowGroup = e.g("shadow").attr({
                    zIndex: -1
                }).add(a.group));
                a.points.forEach(function(l) {
                    var k = {};
                    h = l.graphic;
                    if (!l.isNull && h) {
                        var p = void 0;
                        n = l.shapeArgs;
                        b = l.getTranslate();
                        c.styledMode || (p = l.shadowGroup, f && !p && (p = l.shadowGroup = e.g("shadow").add(a.shadowGroup)), p && p.attr(b), d = a.pointAttribs(l, l.selected && "select"));
                        l.delayedRendering ? (h.setRadialReference(a.center).attr(n).attr(b),
                            c.styledMode || h.attr(d).attr({
                                "stroke-linejoin": "round"
                            }).shadow(f, p), l.delayedRendering = !1) : (h.setRadialReference(a.center), c.styledMode || g(!0, k, d), g(!0, k, n, b), h.animate(k));
                        h.attr({
                            visibility: l.visible ? "inherit" : "hidden"
                        });
                        h.addClass(l.getClassName(), !0)
                    } else h && (l.graphic = h.destroy())
                })
            };
            n.prototype.sortByAngle = function(a, c) {
                a.sort(function(a, e) {
                    return "undefined" !== typeof a.angle && (e.angle - a.angle) * c
                })
            };
            n.prototype.translate = function(a) {
                this.generatePoints();
                var c = this.options,
                    g = c.slicedOffset,
                    n = g + (c.borderWidth || 0),
                    b = h(c.startAngle, c.endAngle),
                    m = this.startAngleRad = b.start;
                b = (this.endAngleRad = b.end) - m;
                var d = this.points,
                    q = c.dataLabels.distance;
                c = c.ignoreHiddenPoint;
                var C = d.length,
                    k, K = 0;
                a || (this.center = a = this.getCenter());
                for (k = 0; k < C; k++) {
                    var G = d[k];
                    var r = m + K * b;
                    !G.isValid() || c && !G.visible || (K += G.percentage / 100);
                    var A = m + K * b;
                    var x = {
                        x: a[0],
                        y: a[1],
                        r: a[2] / 2,
                        innerR: a[3] / 2,
                        start: Math.round(1E3 * r) / 1E3,
                        end: Math.round(1E3 * A) / 1E3
                    };
                    G.shapeType = "arc";
                    G.shapeArgs = x;
                    G.labelDistance = f(G.options.dataLabels &&
                        G.options.dataLabels.distance, q);
                    G.labelDistance = e(G.labelDistance, x.r);
                    this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, G.labelDistance);
                    A = (A + r) / 2;
                    A > 1.5 * Math.PI ? A -= 2 * Math.PI : A < -Math.PI / 2 && (A += 2 * Math.PI);
                    G.slicedTranslation = {
                        translateX: Math.round(Math.cos(A) * g),
                        translateY: Math.round(Math.sin(A) * g)
                    };
                    x = Math.cos(A) * a[2] / 2;
                    var t = Math.sin(A) * a[2] / 2;
                    G.tooltipPos = [a[0] + .7 * x, a[1] + .7 * t];
                    G.half = A < -Math.PI / 2 || A > Math.PI / 2 ? 1 : 0;
                    G.angle = A;
                    r = Math.min(n, G.labelDistance / 5);
                    G.labelPosition = {
                        natural: {
                            x: a[0] + x +
                                Math.cos(A) * G.labelDistance,
                            y: a[1] + t + Math.sin(A) * G.labelDistance
                        },
                        "final": {},
                        alignment: 0 > G.labelDistance ? "center" : G.half ? "right" : "left",
                        connectorPosition: {
                            breakAt: {
                                x: a[0] + x + Math.cos(A) * r,
                                y: a[1] + t + Math.sin(A) * r
                            },
                            touchingSliceAt: {
                                x: a[0] + x,
                                y: a[1] + t
                            }
                        }
                    }
                }
                z(this, "afterTranslate")
            };
            n.prototype.updateTotals = function() {
                var a = this.points,
                    c = a.length,
                    e = this.options.ignoreHiddenPoint,
                    f, b = 0;
                for (f = 0; f < c; f++) {
                    var g = a[f];
                    !g.isValid() || e && !g.visible || (b += g.y)
                }
                this.total = b;
                for (f = 0; f < c; f++) g = a[f], g.percentage = 0 < b && (g.visible ||
                    !e) ? g.y / b * 100 : 0, g.total = b
            };
            n.defaultOptions = g(F.defaultOptions, {
                center: [null, null],
                clip: !1,
                colorByPoint: !0,
                dataLabels: {
                    allowOverlap: !0,
                    connectorPadding: 5,
                    connectorShape: "fixedOffset",
                    crookDistance: "70%",
                    distance: 30,
                    enabled: !0,
                    formatter: function() {
                        return this.point.isNull ? void 0 : this.point.name
                    },
                    softConnector: !0,
                    x: 0
                },
                fillColor: void 0,
                ignoreHiddenPoint: !0,
                inactiveOtherPoints: !0,
                legendType: "point",
                marker: null,
                size: null,
                showInLegend: !1,
                slicedOffset: 10,
                stickyTracking: !1,
                tooltip: {
                    followPointer: !0
                },
                borderColor: "#ffffff",
                borderWidth: 1,
                lineWidth: void 0,
                states: {
                    hover: {
                        brightness: .1
                    }
                }
            });
            return n
        }(F);
        n(q.prototype, {
            axisTypes: [],
            directTouch: !0,
            drawGraph: void 0,
            drawLegendSymbol: H.drawRectangle,
            drawTracker: t.prototype.drawTracker,
            getCenter: a.getCenter,
            getSymbol: B,
            isCartesian: !1,
            noSharedTooltip: !0,
            pointAttribs: t.prototype.pointAttribs,
            pointClass: y,
            requireSorting: !1,
            searchPoint: B,
            trackerGroups: ["group", "dataLabelsGroup"]
        });
        I.registerSeriesType("pie", q);
        "";
        return q
    });
    N(a, "Series/Pie/PieDataLabel.js", [a["Core/Series/DataLabel.js"],
        a["Core/Globals.js"], a["Core/Renderer/RendererUtilities.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]
    ], function(a, t, B, H, y) {
        var E = t.noop,
            I = B.distribute,
            x = H.series,
            q = y.arrayMax,
            m = y.clamp,
            h = y.defined,
            c = y.merge,
            n = y.pick,
            z = y.relativeLength,
            g;
        (function(f) {
            function e() {
                var a = this,
                    e = a.data,
                    b = a.chart,
                    f = a.options.dataLabels || {},
                    d = f.connectorPadding,
                    g = b.plotWidth,
                    p = b.plotHeight,
                    k = b.plotLeft,
                    m = Math.round(b.chartWidth / 3),
                    G = a.center,
                    r = G[2] / 2,
                    A = G[1],
                    z = [
                        [],
                        []
                    ],
                    t = [0, 0, 0, 0],
                    u = a.dataLabelPositioners,
                    L, J, E, y, F, M, B, H, N, T, W, S;
                a.visible && (f.enabled || a._hasPointLabels) && (e.forEach(function(b) {
                    b.dataLabel && b.visible && b.dataLabel.shortened && (b.dataLabel.attr({
                        width: "auto"
                    }).css({
                        width: "auto",
                        textOverflow: "clip"
                    }), b.dataLabel.shortened = !1)
                }), x.prototype.drawDataLabels.apply(a), e.forEach(function(b) {
                    b.dataLabel && (b.visible ? (z[b.half].push(b), b.dataLabel._pos = null, !h(f.style.width) && !h(b.options.dataLabels && b.options.dataLabels.style && b.options.dataLabels.style.width) && b.dataLabel.getBBox().width > m && (b.dataLabel.css({
                        width: Math.round(.7 *
                            m) + "px"
                    }), b.dataLabel.shortened = !0)) : (b.dataLabel = b.dataLabel.destroy(), b.dataLabels && 1 === b.dataLabels.length && delete b.dataLabels))
                }), z.forEach(function(c, e) {
                    var l = c.length,
                        m = [],
                        q;
                    if (l) {
                        a.sortByAngle(c, e - .5);
                        if (0 < a.maxLabelDistance) {
                            var v = Math.max(0, A - r - a.maxLabelDistance);
                            var w = Math.min(A + r + a.maxLabelDistance, b.plotHeight);
                            c.forEach(function(a) {
                                0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, A - r - a.labelDistance), a.bottom = Math.min(A + r + a.labelDistance, b.plotHeight), q = a.dataLabel.getBBox().height ||
                                    21, a.distributeBox = {
                                        target: a.labelPosition.natural.y - a.top + q / 2,
                                        size: q,
                                        rank: a.y
                                    }, m.push(a.distributeBox))
                            });
                            v = w + q - v;
                            I(m, v, v / 5)
                        }
                        for (W = 0; W < l; W++) {
                            L = c[W];
                            M = L.labelPosition;
                            y = L.dataLabel;
                            T = !1 === L.visible ? "hidden" : "inherit";
                            N = v = M.natural.y;
                            m && h(L.distributeBox) && ("undefined" === typeof L.distributeBox.pos ? T = "hidden" : (B = L.distributeBox.size, N = u.radialDistributionY(L)));
                            delete L.positionIndex;
                            if (f.justify) H = u.justify(L, r, G);
                            else switch (f.alignTo) {
                                case "connectors":
                                    H = u.alignToConnectors(c, e, g, k);
                                    break;
                                case "plotEdges":
                                    H =
                                        u.alignToPlotEdges(y, e, g, k);
                                    break;
                                default:
                                    H = u.radialDistributionX(a, L, N, v)
                            }
                            y._attr = {
                                visibility: T,
                                align: M.alignment
                            };
                            S = L.options.dataLabels || {};
                            y._pos = {
                                x: H + n(S.x, f.x) + ({
                                    left: d,
                                    right: -d
                                } [M.alignment] || 0),
                                y: N + n(S.y, f.y) - 10
                            };
                            M.final.x = H;
                            M.final.y = N;
                            n(f.crop, !0) && (F = y.getBBox().width, v = null, H - F < d && 1 === e ? (v = Math.round(F - H + d), t[3] = Math.max(v, t[3])) : H + F > g - d && 0 === e && (v = Math.round(H + F - g + d), t[1] = Math.max(v, t[1])), 0 > N - B / 2 ? t[0] = Math.max(Math.round(-N + B / 2), t[0]) : N + B / 2 > p && (t[2] = Math.max(Math.round(N + B / 2 - p), t[2])),
                                y.sideOverflow = v)
                        }
                    }
                }), 0 === q(t) || this.verifyDataLabelOverflow(t)) && (this.placeDataLabels(), this.points.forEach(function(d) {
                    S = c(f, d.options.dataLabels);
                    if (J = n(S.connectorWidth, 1)) {
                        var e;
                        E = d.connector;
                        if ((y = d.dataLabel) && y._pos && d.visible && 0 < d.labelDistance) {
                            T = y._attr.visibility;
                            if (e = !E) d.connector = E = b.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + d.colorIndex + (d.className ? " " + d.className : "")).add(a.dataLabelsGroup), b.styledMode || E.attr({
                                "stroke-width": J,
                                stroke: S.connectorColor ||
                                    d.color || "#666666"
                            });
                            E[e ? "attr" : "animate"]({
                                d: d.getConnectorPath()
                            });
                            E.attr("visibility", T)
                        } else E && (d.connector = E.destroy())
                    }
                }))
            }

            function g() {
                this.points.forEach(function(a) {
                    var c = a.dataLabel,
                        b;
                    c && a.visible && ((b = c._pos) ? (c.sideOverflow && (c._attr.width = Math.max(c.getBBox().width - c.sideOverflow, 0), c.css({
                        width: c._attr.width + "px",
                        textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis"
                    }), c.shortened = !0), c.attr(c._attr), c[c.moved ? "animate" : "attr"](b), c.moved = !0) : c && c.attr({
                        y: -9999
                    }));
                    delete a.distributeBox
                }, this)
            }

            function t(a) {
                var c = this.center,
                    b = this.options,
                    e = b.center,
                    d = b.minSize || 80,
                    f = null !== b.size;
                if (!f) {
                    if (null !== e[0]) var g = Math.max(c[2] - Math.max(a[1], a[3]), d);
                    else g = Math.max(c[2] - a[1] - a[3], d), c[0] += (a[3] - a[1]) / 2;
                    null !== e[1] ? g = m(g, d, c[2] - Math.max(a[0], a[2])) : (g = m(g, d, c[2] - a[0] - a[2]), c[1] += (a[0] - a[2]) / 2);
                    g < c[2] ? (c[2] = g, c[3] = Math.min(z(b.innerSize || 0, g), g), this.translate(c), this.drawDataLabels && this.drawDataLabels()) : f = !0
                }
                return f
            }
            var y = [],
                p = {
                    radialDistributionY: function(a) {
                        return a.top +
                            a.distributeBox.pos
                    },
                    radialDistributionX: function(a, c, b, e) {
                        return a.getX(b < c.top + 2 || b > c.bottom - 2 ? e : b, c.half, c)
                    },
                    justify: function(a, c, b) {
                        return b[0] + (a.half ? -1 : 1) * (c + a.labelDistance)
                    },
                    alignToPlotEdges: function(a, c, b, e) {
                        a = a.getBBox().width;
                        return c ? a + e : b - a - e
                    },
                    alignToConnectors: function(a, c, b, e) {
                        var d = 0,
                            f;
                        a.forEach(function(b) {
                            f = b.dataLabel.getBBox().width;
                            f > d && (d = f)
                        });
                        return c ? d + e : b - d - e
                    }
                };
            f.compose = function(c) {
                a.compose(x); - 1 === y.indexOf(c) && (y.push(c), c = c.prototype, c.dataLabelPositioners = p, c.alignDataLabel =
                    E, c.drawDataLabels = e, c.placeDataLabels = g, c.verifyDataLabelOverflow = t)
            }
        })(g || (g = {}));
        return g
    });
    N(a, "Extensions/OverlappingDataLabels.js", [a["Core/Chart/Chart.js"], a["Core/Utilities.js"]], function(a, t) {
        function E(a, h) {
            var c = !1;
            if (a) {
                var n = a.newOpacity;
                a.oldOpacity !== n && (a.alignAttr && a.placed ? (a[n ? "removeClass" : "addClass"]("highcharts-data-label-hidden"), c = !0, a.alignAttr.opacity = n, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, function() {
                        h.styledMode || a.css({
                            pointerEvents: n ? "auto" : "none"
                        })
                    }), y(h, "afterHideOverlappingLabel")) :
                    a.attr({
                        opacity: n
                    }));
                a.isOld = !0
            }
            return c
        }
        var H = t.addEvent,
            y = t.fireEvent,
            F = t.isArray,
            I = t.isNumber,
            x = t.objectEach,
            q = t.pick;
        H(a, "render", function() {
            var a = this,
                h = [];
            (this.labelCollectors || []).forEach(function(a) {
                h = h.concat(a())
            });
            (this.yAxis || []).forEach(function(a) {
                a.stacking && a.options.stackLabels && !a.options.stackLabels.allowOverlap && x(a.stacking.stacks, function(a) {
                    x(a, function(a) {
                        a.label && "hidden" !== a.label.visibility && h.push(a.label)
                    })
                })
            });
            (this.series || []).forEach(function(c) {
                var n = c.options.dataLabels;
                c.visible && (!1 !== n.enabled || c._hasPointLabels) && (n = function(c) {
                    return c.forEach(function(c) {
                        c.visible && (F(c.dataLabels) ? c.dataLabels : c.dataLabel ? [c.dataLabel] : []).forEach(function(f) {
                            var e = f.options;
                            f.labelrank = q(e.labelrank, c.labelrank, c.shapeArgs && c.shapeArgs.height);
                            e.allowOverlap ? (f.oldOpacity = f.opacity, f.newOpacity = 1, E(f, a)) : h.push(f)
                        })
                    })
                }, n(c.nodes || []), n(c.points))
            });
            this.hideOverlappingLabels(h)
        });
        a.prototype.hideOverlappingLabels = function(a) {
            var h = this,
                c = a.length,
                n = h.renderer,
                m, g, f, e = !1;
            var q = function(a) {
                var c, e = a.box ? 0 : a.padding || 0,
                    b = c = 0,
                    f;
                if (a && (!a.alignAttr || a.placed)) {
                    var d = a.alignAttr || {
                        x: a.attr("x"),
                        y: a.attr("y")
                    };
                    var g = a.parentGroup;
                    a.width || (c = a.getBBox(), a.width = c.width, a.height = c.height, c = n.fontMetrics(null, a.element).h);
                    var h = a.width - 2 * e;
                    (f = {
                        left: "0",
                        center: "0.5",
                        right: "1"
                    } [a.alignValue]) ? b = +f * h: I(a.x) && Math.round(a.x) !== a.translateX && (b = a.x - a.translateX);
                    return {
                        x: d.x + (g.translateX || 0) + e - (b || 0),
                        y: d.y + (g.translateY || 0) + e - c,
                        width: a.width - 2 * e,
                        height: a.height - 2 * e
                    }
                }
            };
            for (g =
                0; g < c; g++)
                if (m = a[g]) m.oldOpacity = m.opacity, m.newOpacity = 1, m.absoluteBox = q(m);
            a.sort(function(a, c) {
                return (c.labelrank || 0) - (a.labelrank || 0)
            });
            for (g = 0; g < c; g++) {
                var t = (q = a[g]) && q.absoluteBox;
                for (m = g + 1; m < c; ++m) {
                    var x = (f = a[m]) && f.absoluteBox;
                    !t || !x || q === f || 0 === q.newOpacity || 0 === f.newOpacity || x.x >= t.x + t.width || x.x + x.width <= t.x || x.y >= t.y + t.height || x.y + x.height <= t.y || ((q.labelrank < f.labelrank ? q : f).newOpacity = 0)
                }
            }
            a.forEach(function(a) {
                E(a, h) && (e = !0)
            });
            e && y(h, "afterHideAllOverlappingLabels")
        }
    });
    N(a, "Core/Responsive.js",
        [a["Core/Utilities.js"]],
        function(a) {
            var t = a.extend,
                E = a.find,
                H = a.isArray,
                y = a.isObject,
                F = a.merge,
                I = a.objectEach,
                x = a.pick,
                q = a.splat,
                m = a.uniqueKey,
                h;
            (function(a) {
                var c = [];
                a.compose = function(a) {
                    -1 === c.indexOf(a) && (c.push(a), t(a.prototype, h.prototype));
                    return a
                };
                var h = function() {
                    function a() {}
                    a.prototype.currentOptions = function(a) {
                        function c(a, e, g, h) {
                            var b;
                            I(a, function(a, d) {
                                if (!h && -1 < f.collectionsWithUpdate.indexOf(d) && e[d])
                                    for (a = q(a), g[d] = [], b = 0; b < Math.max(a.length, e[d].length); b++) e[d][b] && (void 0 ===
                                        a[b] ? g[d][b] = e[d][b] : (g[d][b] = {}, c(a[b], e[d][b], g[d][b], h + 1)));
                                else y(a) ? (g[d] = H(a) ? [] : {}, c(a, e[d] || {}, g[d], h + 1)) : g[d] = "undefined" === typeof e[d] ? null : e[d]
                            })
                        }
                        var f = this,
                            g = {};
                        c(a, this.options, g, 0);
                        return g
                    };
                    a.prototype.matchResponsiveRule = function(a, c) {
                        var e = a.condition;
                        (e.callback || function() {
                            return this.chartWidth <= x(e.maxWidth, Number.MAX_VALUE) && this.chartHeight <= x(e.maxHeight, Number.MAX_VALUE) && this.chartWidth >= x(e.minWidth, 0) && this.chartHeight >= x(e.minHeight, 0)
                        }).call(this) && c.push(a._id)
                    };
                    a.prototype.setResponsive =
                        function(a, c) {
                            var e = this,
                                f = this.options.responsive,
                                g = this.currentResponsive,
                                h = [];
                            !c && f && f.rules && f.rules.forEach(function(a) {
                                "undefined" === typeof a._id && (a._id = m());
                                e.matchResponsiveRule(a, h)
                            }, this);
                            c = F.apply(void 0, h.map(function(a) {
                                return E((f || {}).rules || [], function(c) {
                                    return c._id === a
                                })
                            }).map(function(a) {
                                return a && a.chartOptions
                            }));
                            c.isResponsiveOptions = !0;
                            h = h.toString() || void 0;
                            h !== (g && g.ruleIds) && (g && this.update(g.undoOptions, a, !0), h ? (g = this.currentOptions(c), g.isResponsiveOptions = !0, this.currentResponsive = {
                                ruleIds: h,
                                mergedOptions: c,
                                undoOptions: g
                            }, this.update(c, a, !0)) : this.currentResponsive = void 0)
                        };
                    return a
                }()
            })(h || (h = {}));
            "";
            "";
            return h
        });
    N(a, "masters/highcharts.src.js", [a["Core/Globals.js"], a["Core/Utilities.js"], a["Core/DefaultOptions.js"], a["Core/Animation/Fx.js"], a["Core/Animation/AnimationUtilities.js"], a["Core/Renderer/HTML/AST.js"], a["Core/FormatUtilities.js"], a["Core/Renderer/RendererUtilities.js"], a["Core/Renderer/SVG/SVGElement.js"], a["Core/Renderer/SVG/SVGRenderer.js"], a["Core/Renderer/HTML/HTMLElement.js"],
        a["Core/Renderer/HTML/HTMLRenderer.js"], a["Core/Axis/Axis.js"], a["Core/Axis/DateTimeAxis.js"], a["Core/Axis/LogarithmicAxis.js"], a["Core/Axis/PlotLineOrBand/PlotLineOrBand.js"], a["Core/Axis/Tick.js"], a["Core/Tooltip.js"], a["Core/Series/Point.js"], a["Core/Pointer.js"], a["Core/MSPointer.js"], a["Core/Legend/Legend.js"], a["Core/Chart/Chart.js"], a["Core/Series/Series.js"], a["Core/Series/SeriesRegistry.js"], a["Series/Column/ColumnSeries.js"], a["Series/Column/ColumnDataLabel.js"], a["Series/Pie/PieSeries.js"],
        a["Series/Pie/PieDataLabel.js"], a["Core/Series/DataLabel.js"], a["Core/Responsive.js"], a["Core/Color/Color.js"], a["Core/Time.js"]
    ], function(a, t, B, H, y, F, I, x, q, m, h, c, n, z, g, f, e, G, J, M, p, l, w, b, v, d, D, C, k, K, O, r, A) {
        a.animate = y.animate;
        a.animObject = y.animObject;
        a.getDeferredAnimation = y.getDeferredAnimation;
        a.setAnimation = y.setAnimation;
        a.stop = y.stop;
        a.timers = H.timers;
        a.AST = F;
        a.Axis = n;
        a.Chart = w;
        a.chart = w.chart;
        a.Fx = H;
        a.Legend = l;
        a.PlotLineOrBand = f;
        a.Point = J;
        a.Pointer = p.isRequired() ? p : M;
        a.Series = b;
        a.SVGElement =
            q;
        a.SVGRenderer = m;
        a.Tick = e;
        a.Time = A;
        a.Tooltip = G;
        a.Color = r;
        a.color = r.parse;
        c.compose(m);
        h.compose(q);
        a.defaultOptions = B.defaultOptions;
        a.getOptions = B.getOptions;
        a.time = B.defaultTime;
        a.setOptions = B.setOptions;
        a.dateFormat = I.dateFormat;
        a.format = I.format;
        a.numberFormat = I.numberFormat;
        a.addEvent = t.addEvent;
        a.arrayMax = t.arrayMax;
        a.arrayMin = t.arrayMin;
        a.attr = t.attr;
        a.clearTimeout = t.clearTimeout;
        a.correctFloat = t.correctFloat;
        a.createElement = t.createElement;
        a.css = t.css;
        a.defined = t.defined;
        a.destroyObjectProperties =
            t.destroyObjectProperties;
        a.discardElement = t.discardElement;
        a.distribute = x.distribute;
        a.erase = t.erase;
        a.error = t.error;
        a.extend = t.extend;
        a.extendClass = t.extendClass;
        a.find = t.find;
        a.fireEvent = t.fireEvent;
        a.getMagnitude = t.getMagnitude;
        a.getStyle = t.getStyle;
        a.inArray = t.inArray;
        a.isArray = t.isArray;
        a.isClass = t.isClass;
        a.isDOMElement = t.isDOMElement;
        a.isFunction = t.isFunction;
        a.isNumber = t.isNumber;
        a.isObject = t.isObject;
        a.isString = t.isString;
        a.keys = t.keys;
        a.merge = t.merge;
        a.normalizeTickInterval = t.normalizeTickInterval;
        a.objectEach = t.objectEach;
        a.offset = t.offset;
        a.pad = t.pad;
        a.pick = t.pick;
        a.pInt = t.pInt;
        a.relativeLength = t.relativeLength;
        a.removeEvent = t.removeEvent;
        a.seriesType = v.seriesType;
        a.splat = t.splat;
        a.stableSort = t.stableSort;
        a.syncTimeout = t.syncTimeout;
        a.timeUnits = t.timeUnits;
        a.uniqueKey = t.uniqueKey;
        a.useSerialIds = t.useSerialIds;
        a.wrap = t.wrap;
        D.compose(d);
        K.compose(b);
        z.compose(n);
        g.compose(n);
        k.compose(C);
        f.compose(n);
        O.compose(w);
        return a
    });
    N(a, "Series/XRange/XRangePoint.js", [a["Core/Series/Point.js"], a["Core/Series/SeriesRegistry.js"],
        a["Core/Utilities.js"]
    ], function(a, t, B) {
        var E = this && this.__extends || function() {
            var a = function(t, y) {
                a = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(a, q) {
                    a.__proto__ = q
                } || function(a, q) {
                    for (var m in q) q.hasOwnProperty(m) && (a[m] = q[m])
                };
                return a(t, y)
            };
            return function(t, y) {
                function x() {
                    this.constructor = t
                }
                a(t, y);
                t.prototype = null === y ? Object.create(y) : (x.prototype = y.prototype, new x)
            }
        }();
        B = B.extend;
        t = function(t) {
            function y() {
                var a = null !== t && t.apply(this, arguments) || this;
                a.options = void 0;
                a.series =
                    void 0;
                return a
            }
            E(y, t);
            y.getColorByCategory = function(a, t) {
                var q = a.options.colors || a.chart.options.colors;
                a = t.y % (q ? q.length : a.chart.options.chart.colorCount);
                return {
                    colorIndex: a,
                    color: q && q[a]
                }
            };
            y.prototype.resolveColor = function() {
                var a = this.series;
                if (a.options.colorByPoint && !this.options.color) {
                    var t = y.getColorByCategory(a, this);
                    a.chart.styledMode || (this.color = t.color);
                    this.options.colorIndex || (this.colorIndex = t.colorIndex)
                } else this.color || (this.color = a.color)
            };
            y.prototype.init = function() {
                a.prototype.init.apply(this,
                    arguments);
                this.y || (this.y = 0);
                return this
            };
            y.prototype.setState = function() {
                a.prototype.setState.apply(this, arguments);
                this.series.drawPoint(this, this.series.getAnimationVerb())
            };
            y.prototype.getLabelConfig = function() {
                var t = a.prototype.getLabelConfig.call(this),
                    x = this.series.yAxis.categories;
                t.x2 = this.x2;
                t.yCategory = this.yCategory = x && x[this.y];
                return t
            };
            y.prototype.isValid = function() {
                return "number" === typeof this.x && "number" === typeof this.x2
            };
            return y
        }(t.seriesTypes.column.prototype.pointClass);
        B(t.prototype, {
            ttBelow: !1,
            tooltipDateKeys: ["x", "x2"]
        });
        return t
    });
    N(a, "Series/XRange/XRangeComposition.js", [a["Core/Axis/Axis.js"], a["Core/Utilities.js"]], function(a, t) {
        var B = t.addEvent,
            E = t.pick;
        B(a, "afterGetSeriesExtremes", function() {
            var a = this.series,
                t;
            if (this.isXAxis) {
                var B = E(this.dataMax, -Number.MAX_VALUE);
                a.forEach(function(a) {
                    a.x2Data && a.x2Data.forEach(function(a) {
                        a > B && (B = a, t = !0)
                    })
                });
                t && (this.dataMax = B)
            }
        })
    });
    N(a, "Series/XRange/XRangeSeries.js", [a["Core/Globals.js"], a["Core/Color/Color.js"], a["Core/Series/SeriesRegistry.js"],
        a["Core/Utilities.js"], a["Series/XRange/XRangePoint.js"]
    ], function(a, t, B, H, y) {
        var F = this && this.__extends || function() {
                var a = function(c, e) {
                    a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(a, c) {
                        a.__proto__ = c
                    } || function(a, c) {
                        for (var b in c) c.hasOwnProperty(b) && (a[b] = c[b])
                    };
                    return a(c, e)
                };
                return function(c, e) {
                    function f() {
                        this.constructor = c
                    }
                    a(c, e);
                    c.prototype = null === e ? Object.create(e) : (f.prototype = e.prototype, new f)
                }
            }(),
            I = t.parse,
            x = B.series,
            q = B.seriesTypes.column,
            m = q.prototype,
            h = H.clamp,
            c = H.correctFloat,
            n = H.defined;
        t = H.extend;
        var z = H.find,
            g = H.isNumber,
            f = H.isObject,
            e = H.merge,
            G = H.pick;
        H = function(a) {
            function t() {
                var c = null !== a && a.apply(this, arguments) || this;
                c.data = void 0;
                c.options = void 0;
                c.points = void 0;
                return c
            }
            F(t, a);
            t.prototype.init = function() {
                q.prototype.init.apply(this, arguments);
                this.options.stacking = void 0
            };
            t.prototype.getColumnMetrics = function() {
                function a() {
                    c.series.forEach(function(b) {
                        var a = b.xAxis;
                        b.xAxis = b.yAxis;
                        b.yAxis = a
                    })
                }
                var c = this.chart;
                a();
                var e = m.getColumnMetrics.call(this);
                a();
                return e
            };
            t.prototype.cropData = function(a, c, e, b) {
                c = x.prototype.cropData.call(this, this.x2Data, c, e, b);
                c.xData = a.slice(c.start, c.end);
                return c
            };
            t.prototype.findPointIndex = function(a) {
                var c = this.cropped,
                    e = this.cropStart,
                    b = this.points,
                    f = a.id;
                if (f) var d = (d = z(b, function(b) {
                    return b.id === f
                })) ? d.index : void 0;
                "undefined" === typeof d && (d = (d = z(b, function(b) {
                    return b.x === a.x && b.x2 === a.x2 && !b.touched
                })) ? d.index : void 0);
                c && g(d) && g(e) && d >= e && (d -= e);
                return d
            };
            t.prototype.translatePoint = function(a) {
                var c = this.xAxis,
                    p = this.yAxis,
                    b = this.columnMetrics,
                    m = this.options,
                    d = m.minPointLength || 0,
                    q = (a.shapeArgs && a.shapeArgs.width || 0) / 2,
                    C = this.pointXOffset = b.offset,
                    k = a.plotX,
                    K = G(a.x2, a.x + (a.len || 0)),
                    t = c.translate(K, 0, 0, 0, 1);
                K = Math.abs(t - k);
                var r = this.chart.inverted,
                    A = G(m.borderWidth, 1) % 2 / 2,
                    z = b.offset,
                    x = Math.round(b.width);
                d && (d -= K, 0 > d && (d = 0), k -= d / 2, t += d / 2);
                k = Math.max(k, -10);
                t = h(t, -10, c.len + 10);
                n(a.options.pointWidth) && (z -= (Math.ceil(a.options.pointWidth) - x) / 2, x = Math.ceil(a.options.pointWidth));
                m.pointPlacement && g(a.plotY) &&
                    p.categories && (a.plotY = p.translate(a.y, 0, 1, 0, 1, m.pointPlacement));
                m = Math.floor(Math.min(k, t)) + A;
                m = {
                    x: m,
                    y: Math.floor(a.plotY + z) + A,
                    width: Math.floor(Math.max(k, t)) + A - m,
                    height: x,
                    r: this.options.borderRadius
                };
                a.shapeArgs = m;
                r ? a.tooltipPos[1] += C + q : a.tooltipPos[0] -= q + C - m.width / 2;
                q = m.x;
                C = q + m.width;
                0 > q || C > c.len ? (q = h(q, 0, c.len), C = h(C, 0, c.len), t = C - q, a.dlBox = e(m, {
                    x: q,
                    width: C - q,
                    centerX: t ? t / 2 : null
                })) : a.dlBox = null;
                q = a.tooltipPos;
                C = r ? 1 : 0;
                t = r ? 0 : 1;
                b = this.columnMetrics ? this.columnMetrics.offset : -b.width / 2;
                q[C] = r ? q[C] +
                    m.width / 2 : q[C] + (c.reversed ? -1 : 0) * m.width;
                q[t] = h(q[t] + (r ? -1 : 1) * b, 0, p.len - 1);
                if (p = a.partialFill) f(p) && (p = p.amount), g(p) || (p = 0), a.partShapeArgs = e(m, {
                    r: this.options.borderRadius
                }), k = Math.max(Math.round(K * p + a.plotX - k), 0), a.clipRectArgs = {
                    x: c.reversed ? m.x + K - k : m.x,
                    y: m.y,
                    width: k,
                    height: m.height
                }
            };
            t.prototype.translate = function() {
                m.translate.apply(this, arguments);
                this.points.forEach(function(a) {
                    this.translatePoint(a)
                }, this)
            };
            t.prototype.drawPoint = function(a, c) {
                var g = this.options,
                    b = this.chart.renderer,
                    h = a.graphic,
                    d = a.shapeType,
                    l = a.shapeArgs,
                    p = a.partShapeArgs,
                    k = a.clipRectArgs,
                    n = a.partialFill,
                    m = g.stacking && !g.borderRadius,
                    r = a.state,
                    A = g.states[r || "normal"] || {},
                    q = "undefined" === typeof r ? "attr" : c;
                r = this.pointAttribs(a, r);
                A = G(this.chart.options.chart.animation, A.animation);
                if (a.isNull || !1 === a.visible) h && (a.graphic = h.destroy());
                else {
                    if (h) h.rect[c](l);
                    else a.graphic = h = b.g("point").addClass(a.getClassName()).add(a.group || this.group), h.rect = b[d](e(l)).addClass(a.getClassName()).addClass("highcharts-partfill-original").add(h);
                    p && (h.partRect ? (h.partRect[c](e(p)), h.partialClipRect[c](e(k))) : (h.partialClipRect = b.clipRect(k.x, k.y, k.width, k.height), h.partRect = b[d](p).addClass("highcharts-partfill-overlay").add(h).clip(h.partialClipRect)));
                    this.chart.styledMode || (h.rect[c](r, A).shadow(g.shadow, null, m), p && (f(n) || (n = {}), f(g.partialFill) && (n = e(g.partialFill, n)), a = n.fill || I(r.fill).brighten(-.3).get() || I(a.color || this.color).brighten(-.3).get(), r.fill = a, h.partRect[q](r, A).shadow(g.shadow, null, m)))
                }
            };
            t.prototype.drawPoints = function() {
                var a =
                    this,
                    c = a.getAnimationVerb();
                a.points.forEach(function(e) {
                    a.drawPoint(e, c)
                })
            };
            t.prototype.getAnimationVerb = function() {
                return this.chart.pointCount < (this.options.animationLimit || 250) ? "animate" : "attr"
            };
            t.prototype.isPointInside = function(c) {
                var e = c.shapeArgs,
                    f = c.plotX,
                    b = c.plotY;
                return e ? "undefined" !== typeof f && "undefined" !== typeof b && 0 <= b && b <= this.yAxis.len && 0 <= (e.x || 0) + (e.width || 0) && f <= this.xAxis.len : a.prototype.isPointInside.apply(this, arguments)
            };
            t.defaultOptions = e(q.defaultOptions, {
                colorByPoint: !0,
                dataLabels: {
                    formatter: function() {
                        var a = this.point.partialFill;
                        f(a) && (a = a.amount);
                        if (g(a) && 0 < a) return c(100 * a) + "%"
                    },
                    inside: !0,
                    verticalAlign: "middle"
                },
                tooltip: {
                    headerFormat: '<span style="font-size: 10px">{point.x} - {point.x2}</span><br/>',
                    pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.yCategory}</b><br/>'
                },
                borderRadius: 3,
                pointRange: 0
            });
            return t
        }(q);
        t(H.prototype, {
            type: "xrange",
            parallelArrays: ["x", "x2", "y"],
            requireSorting: !1,
            animate: x.prototype.animate,
            cropShoulder: 1,
            getExtremesFromAll: !0,
            autoIncrement: a.noop,
            buildKDTree: a.noop,
            pointClass: y
        });
        B.registerSeriesType("xrange", H);
        "";
        return H
    });
    N(a, "Series/Gantt/GanttPoint.js", [a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function(a, t) {
        var B = this && this.__extends || function() {
                var a = function(t, y) {
                    a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(a, q) {
                        a.__proto__ = q
                    } || function(a, q) {
                        for (var m in q) q.hasOwnProperty(m) && (a[m] = q[m])
                    };
                    return a(t, y)
                };
                return function(t, y) {
                    function x() {
                        this.constructor =
                            t
                    }
                    a(t, y);
                    t.prototype = null === y ? Object.create(y) : (x.prototype = y.prototype, new x)
                }
            }(),
            E = t.pick;
        return function(a) {
            function t() {
                var t = null !== a && a.apply(this, arguments) || this;
                t.options = void 0;
                t.series = void 0;
                return t
            }
            B(t, a);
            t.setGanttPointAliases = function(a) {
                function t(q, m) {
                    "undefined" !== typeof m && (a[q] = m)
                }
                t("x", E(a.start, a.x));
                t("x2", E(a.end, a.x2));
                t("partialFill", E(a.completed, a.partialFill))
            };
            t.prototype.applyOptions = function(y, x) {
                y = a.prototype.applyOptions.call(this, y, x);
                t.setGanttPointAliases(y);
                return y
            };
            t.prototype.isValid = function() {
                return ("number" === typeof this.start || "number" === typeof this.x) && ("number" === typeof this.end || "number" === typeof this.x2 || this.milestone)
            };
            return t
        }(a.seriesTypes.xrange.prototype.pointClass)
    });
    N(a, "Core/Axis/BrokenAxis.js", [a["Extensions/Stacking.js"], a["Core/Utilities.js"]], function(a, t) {
        var B = t.addEvent,
            E = t.find,
            y = t.fireEvent,
            F = t.isArray,
            I = t.isNumber,
            x = t.pick,
            q;
        (function(m) {
            function h() {
                "undefined" !== typeof this.brokenAxis && this.brokenAxis.setBreaks(this.options.breaks,
                    !1)
            }

            function c() {
                this.brokenAxis && this.brokenAxis.hasBreaks && (this.options.ordinal = !1)
            }

            function n() {
                var a = this.brokenAxis;
                if (a && a.hasBreaks) {
                    for (var c = this.tickPositions, e = this.tickPositions.info, b = [], f = 0; f < c.length; f++) a.isInAnyBreak(c[f]) || b.push(c[f]);
                    this.tickPositions = b;
                    this.tickPositions.info = e
                }
            }

            function q() {
                this.brokenAxis || (this.brokenAxis = new M(this))
            }

            function g() {
                var a = this.options.connectNulls,
                    c = this.points,
                    e = this.xAxis,
                    b = this.yAxis;
                if (this.isDirty)
                    for (var f = c.length; f--;) {
                        var d = c[f],
                            g = !(null === d.y && !1 === a) && (e && e.brokenAxis && e.brokenAxis.isInAnyBreak(d.x, !0) || b && b.brokenAxis && b.brokenAxis.isInAnyBreak(d.y, !0));
                        d.visible = g ? !1 : !1 !== d.options.visible
                    }
            }

            function f() {
                this.drawBreaks(this.xAxis, ["x"]);
                this.drawBreaks(this.yAxis, x(this.pointArrayMap, ["y"]))
            }

            function e(a, c) {
                var e = this,
                    b = e.points,
                    f, d, g, h;
                if (a && a.brokenAxis && a.brokenAxis.hasBreaks) {
                    var k = a.brokenAxis;
                    c.forEach(function(c) {
                        f = k && k.breakArray || [];
                        d = a.isXAxis ? a.min : x(e.options.threshold, a.min);
                        b.forEach(function(b) {
                            h = x(b["stack" +
                                c.toUpperCase()], b[c]);
                            f.forEach(function(c) {
                                if (I(d) && I(h)) {
                                    g = !1;
                                    if (d < c.from && h > c.to || d > c.from && h < c.from) g = "pointBreak";
                                    else if (d < c.from && h > c.from && h < c.to || d > c.from && h > c.to && h < c.from) g = "pointInBreak";
                                    g && y(a, g, {
                                        point: b,
                                        brk: c
                                    })
                                }
                            })
                        })
                    })
                }
            }

            function t() {
                var c = this.currentDataGrouping,
                    e = c && c.gapSize;
                c = this.points.slice();
                var f = this.yAxis,
                    b = this.options.gapSize,
                    g = c.length - 1,
                    d;
                if (b && 0 < g)
                    for ("value" !== this.options.gapUnit && (b *= this.basePointRange), e && e > b && e >= this.basePointRange && (b = e), d = void 0; g--;) d && !1 !==
                        d.visible || (d = c[g + 1]), e = c[g], !1 !== d.visible && !1 !== e.visible && (d.x - e.x > b && (d = (e.x + d.x) / 2, c.splice(g + 1, 0, {
                            isNull: !0,
                            x: d
                        }), f.stacking && this.options.stacking && (d = f.stacking.stacks[this.stackKey][d] = new a(f, f.options.stackLabels, !1, d, this.stack), d.total = 0)), d = e);
                return this.getGraphPath(c)
            }
            var J = [];
            m.compose = function(a, l) {
                -1 === J.indexOf(a) && (J.push(a), a.keepProps.push("brokenAxis"), B(a, "init", q), B(a, "afterInit", h), B(a, "afterSetTickPositions", n), B(a, "afterSetOptions", c));
                if (-1 === J.indexOf(l)) {
                    J.push(l);
                    var p = l.prototype;
                    p.drawBreaks = e;
                    p.gappedPath = t;
                    B(l, "afterGeneratePoints", g);
                    B(l, "afterRender", f)
                }
                return a
            };
            var M = function() {
                function a(a) {
                    this.hasBreaks = !1;
                    this.axis = a
                }
                a.isInBreak = function(a, c) {
                    var b = a.repeat || Infinity,
                        e = a.from,
                        d = a.to - a.from;
                    c = c >= e ? (c - e) % b : b - (e - c) % b;
                    return a.inclusive ? c <= d : c < d && 0 !== c
                };
                a.lin2Val = function(c) {
                    var e = this.brokenAxis;
                    e = e && e.breakArray;
                    if (!e || !I(c)) return c;
                    var b;
                    for (b = 0; b < e.length; b++) {
                        var f = e[b];
                        if (f.from >= c) break;
                        else f.to < c ? c += f.len : a.isInBreak(f, c) && (c += f.len)
                    }
                    return c
                };
                a.val2Lin = function(c) {
                    var e = this.brokenAxis;
                    e = e && e.breakArray;
                    if (!e || !I(c)) return c;
                    var b = c,
                        f;
                    for (f = 0; f < e.length; f++) {
                        var d = e[f];
                        if (d.to <= c) b -= d.len;
                        else if (d.from >= c) break;
                        else if (a.isInBreak(d, c)) {
                            b -= c - d.from;
                            break
                        }
                    }
                    return b
                };
                a.prototype.findBreakAt = function(a, c) {
                    return E(c, function(b) {
                        return b.from < a && a < b.to
                    })
                };
                a.prototype.isInAnyBreak = function(c, e) {
                    var b = this.axis,
                        f = b.options.breaks || [],
                        d = f.length,
                        g;
                    if (d && I(c)) {
                        for (; d--;)
                            if (a.isInBreak(f[d], c)) {
                                var h = !0;
                                g || (g = x(f[d].showPoints, !b.isXAxis))
                            } var k =
                            h && e ? h && !g : h
                    }
                    return k
                };
                a.prototype.setBreaks = function(c, e) {
                    var b = this,
                        f = b.axis,
                        d = F(c) && !!c.length;
                    f.isDirty = b.hasBreaks !== d;
                    b.hasBreaks = d;
                    f.options.breaks = f.userOptions.breaks = c;
                    f.forceRedraw = !0;
                    f.series.forEach(function(a) {
                        a.isDirty = !0
                    });
                    d || f.val2lin !== a.val2Lin || (delete f.val2lin, delete f.lin2val);
                    d && (f.userOptions.ordinal = !1, f.lin2val = a.lin2Val, f.val2lin = a.val2Lin, f.setExtremes = function(a, c, d, e, g) {
                        if (b.hasBreaks) {
                            for (var k = this.options.breaks || [], h; h = b.findBreakAt(a, k);) a = h.to;
                            for (; h = b.findBreakAt(c,
                                    k);) c = h.from;
                            c < a && (c = a)
                        }
                        f.constructor.prototype.setExtremes.call(this, a, c, d, e, g)
                    }, f.setAxisTranslation = function() {
                        f.constructor.prototype.setAxisTranslation.call(this);
                        b.unitLength = void 0;
                        if (b.hasBreaks) {
                            var c = f.options.breaks || [],
                                d = [],
                                e = [],
                                g = x(f.pointRangePadding, 0),
                                h = 0,
                                r, l = f.userMin || f.min,
                                n = f.userMax || f.max,
                                p;
                            c.forEach(function(b) {
                                r = b.repeat || Infinity;
                                I(l) && I(n) && (a.isInBreak(b, l) && (l += b.to % r - l % r), a.isInBreak(b, n) && (n -= n % r - b.from % r))
                            });
                            c.forEach(function(a) {
                                m = a.from;
                                r = a.repeat || Infinity;
                                if (I(l) &&
                                    I(n)) {
                                    for (; m - r > l;) m -= r;
                                    for (; m < l;) m += r;
                                    for (p = m; p < n; p += r) d.push({
                                        value: p,
                                        move: "in"
                                    }), d.push({
                                        value: p + a.to - a.from,
                                        move: "out",
                                        size: a.breakSize
                                    })
                                }
                            });
                            d.sort(function(a, b) {
                                return a.value === b.value ? ("in" === a.move ? 0 : 1) - ("in" === b.move ? 0 : 1) : a.value - b.value
                            });
                            var u = 0;
                            var m = l;
                            d.forEach(function(a) {
                                u += "in" === a.move ? 1 : -1;
                                1 === u && "in" === a.move && (m = a.value);
                                0 === u && I(m) && (e.push({
                                    from: m,
                                    to: a.value,
                                    len: a.value - m - (a.size || 0)
                                }), h += a.value - m - (a.size || 0))
                            });
                            b.breakArray = e;
                            I(l) && I(n) && I(f.min) && (b.unitLength = n - l - h + g, y(f,
                                "afterBreaks"), f.staticScale ? f.transA = f.staticScale : b.unitLength && (f.transA *= (n - f.min + g) / b.unitLength), g && (f.minPixelPadding = f.transA * (f.minPointOffset || 0)), f.min = l, f.max = n)
                        }
                    });
                    x(e, !0) && f.chart.redraw()
                };
                return a
            }();
            m.Additions = M
        })(q || (q = {}));
        return q
    });
    N(a, "Core/Axis/GridAxis.js", [a["Core/Axis/Axis.js"], a["Core/Axis/AxisDefaults.js"], a["Core/Globals.js"], a["Core/Utilities.js"]], function(a, t, B, H) {
        var y = B.dateFormats,
            F = H.addEvent,
            E = H.defined,
            x = H.erase,
            q = H.find,
            m = H.isArray,
            h = H.isNumber,
            c = H.merge,
            n =
            H.pick,
            z = H.timeUnits,
            g = H.wrap,
            f;
        (function(e) {
            function f(a, b) {
                var c = {
                    width: 0,
                    height: 0
                };
                b.forEach(function(b) {
                    b = a[b];
                    if (H.isObject(b, !0)) {
                        var d = H.isObject(b.label, !0) ? b.label : {};
                        b = d.getBBox ? d.getBBox().height : 0;
                        d.textStr && !h(d.textPxLength) && (d.textPxLength = d.getBBox().width);
                        var e = h(d.textPxLength) ? Math.round(d.textPxLength) : 0;
                        d.textStr && (e = Math.round(d.getBBox().width));
                        c.height = Math.max(b, c.height);
                        c.width = Math.max(e, c.width)
                    }
                });
                "treegrid" === this.options.type && this.treeGrid && this.treeGrid.mapOfPosToGridNode &&
                    (c.width += this.options.labels.indentation * ((this.treeGrid.mapOfPosToGridNode[-1].height || 0) - 1));
                return c
            }

            function J() {
                var a = this.grid;
                (a && a.columns || []).forEach(function(a) {
                    a.getOffset()
                })
            }

            function y(a) {
                if (!0 === (this.options.grid || {}).enabled) {
                    var b = this.axisTitle,
                        c = this.height,
                        d = this.horiz,
                        f = this.left,
                        k = this.offset,
                        g = this.opposite,
                        h = this.options,
                        r = this.top,
                        l = this.width,
                        u = this.tickSize(),
                        m = b && b.getBBox().width,
                        p = h.title.x,
                        q = h.title.y,
                        A = n(h.title.margin, d ? 5 : 10);
                    b = this.chart.renderer.fontMetrics(h.title.style.fontSize,
                        b).f;
                    u = (d ? r + c : f) + (d ? 1 : -1) * (g ? -1 : 1) * (u ? u[0] / 2 : 0) + (this.side === e.Side.bottom ? b : 0);
                    a.titlePosition.x = d ? f - (m || 0) / 2 - A + p : u + (g ? l : 0) + k + p;
                    a.titlePosition.y = d ? u - (g ? c : 0) + (g ? b : -b) / 2 + k + q : r - A + q
                }
            }

            function p() {
                var b = this.chart,
                    d = this.options.grid;
                d = void 0 === d ? {} : d;
                var e = this.userOptions;
                if (d.enabled) {
                    var f = this.options;
                    f.labels.align = n(f.labels.align, "center");
                    this.categories || (f.showLastLabel = !1);
                    this.labelRotation = 0;
                    f.labels.rotation = 0
                }
                if (d.columns) {
                    f = this.grid.columns = [];
                    for (var k = this.grid.columnIndex = 0; ++k <
                        d.columns.length;) {
                        var g = c(e, d.columns[d.columns.length - k - 1], {
                            linkedTo: 0,
                            type: "category",
                            scrollbar: {
                                enabled: !1
                            }
                        });
                        delete g.grid.columns;
                        g = new a(this.chart, g);
                        g.grid.isColumn = !0;
                        g.grid.columnIndex = k;
                        x(b.axes, g);
                        x(b[this.coll], g);
                        f.push(g)
                    }
                }
            }

            function l() {
                var a = this.grid,
                    b = this.options;
                if (!0 === (b.grid || {}).enabled) {
                    var c = this.min || 0,
                        d = this.max || 0;
                    this.maxLabelDimensions = this.getMaxLabelDimensions(this.ticks, this.tickPositions);
                    this.rightWall && this.rightWall.destroy();
                    if (this.grid && this.grid.isOuterAxis() &&
                        this.axisLine) {
                        var f = b.lineWidth;
                        if (f) {
                            f = this.getLinePath(f);
                            var k = f[0],
                                g = f[1],
                                h = ((this.tickSize("tick") || [1])[0] - 1) * (this.side === e.Side.top || this.side === e.Side.left ? -1 : 1);
                            "M" === k[0] && "L" === g[0] && (this.horiz ? (k[2] += h, g[2] += h) : (k[1] += h, g[1] += h));
                            !this.horiz && this.chart.marginRight && (k = [k, ["L", this.left, k[2] || 0]], h = ["L", this.chart.chartWidth - this.chart.marginRight, this.toPixels(d + this.tickmarkOffset)], g = [
                                ["M", g[1] || 0, this.toPixels(d + this.tickmarkOffset)], h
                            ], this.grid.upperBorder || 0 === c % 1 || (this.grid.upperBorder =
                                this.grid.renderBorder(k)), this.grid.upperBorder && (this.grid.upperBorder.attr({
                                stroke: b.lineColor,
                                "stroke-width": b.lineWidth
                            }), this.grid.upperBorder.animate({
                                d: k
                            })), this.grid.lowerBorder || 0 === d % 1 || (this.grid.lowerBorder = this.grid.renderBorder(g)), this.grid.lowerBorder && (this.grid.lowerBorder.attr({
                                stroke: b.lineColor,
                                "stroke-width": b.lineWidth
                            }), this.grid.lowerBorder.animate({
                                d: g
                            })));
                            this.grid.axisLineExtra ? (this.grid.axisLineExtra.attr({
                                    stroke: b.lineColor,
                                    "stroke-width": b.lineWidth
                                }), this.grid.axisLineExtra.animate({
                                    d: f
                                })) :
                                this.grid.axisLineExtra = this.grid.renderBorder(f);
                            this.axisLine[this.showAxis ? "show" : "hide"](!0)
                        }
                    }(a && a.columns || []).forEach(function(a) {
                        a.render()
                    });
                    if (!this.horiz && this.chart.hasRendered && (this.scrollbar || this.linkedParent && this.linkedParent.scrollbar)) {
                        a = this.tickmarkOffset;
                        b = this.tickPositions[this.tickPositions.length - 1];
                        f = this.tickPositions[0];
                        for (g = void 0;
                            (g = this.hiddenLabels.pop()) && g.element;) g.show();
                        (g = this.ticks[f].label) && (c - f > a ? this.hiddenLabels.push(g.hide()) : g.show());
                        (g = this.ticks[b].label) &&
                        (b - d > a ? this.hiddenLabels.push(g.hide()) : g.show());
                        (c = this.ticks[b].mark) && (b - d < a && 0 < b - d && this.ticks[b].isLast ? c.hide() : this.ticks[b - 1] && c.show())
                    }
                }
            }

            function w() {
                var a = this.tickPositions && this.tickPositions.info,
                    b = this.options,
                    c = this.userOptions.labels || {};
                (b.grid || {}).enabled && (this.horiz ? (this.series.forEach(function(a) {
                    a.options.pointRange = 0
                }), a && b.dateTimeLabelFormats && b.labels && !E(c.align) && (!1 === b.dateTimeLabelFormats[a.unitName].range || 1 < a.count) && (b.labels.align = "left", E(c.x) || (b.labels.x =
                    3))) : "treegrid" !== this.options.type && this.grid && this.grid.columns && (this.minPointOffset = this.tickInterval))
            }

            function b(a) {
                var b = this.options;
                a = a.userOptions;
                var d = b && H.isObject(b.grid, !0) ? b.grid : {};
                if (!0 === d.enabled) {
                    var e = c(!0, {
                        className: "highcharts-grid-axis " + (a.className || ""),
                        dateTimeLabelFormats: {
                            hour: {
                                list: ["%H:%M", "%H"]
                            },
                            day: {
                                list: ["%A, %e. %B", "%a, %e. %b", "%E"]
                            },
                            week: {
                                list: ["Week %W", "W%W"]
                            },
                            month: {
                                list: ["%B", "%b", "%o"]
                            }
                        },
                        grid: {
                            borderWidth: 1
                        },
                        labels: {
                            padding: 2,
                            style: {
                                fontSize: "13px"
                            }
                        },
                        margin: 0,
                        title: {
                            text: null,
                            reserveSpace: !1,
                            rotation: 0
                        },
                        units: [
                            ["millisecond", [1, 10, 100]],
                            ["second", [1, 10]],
                            ["minute", [1, 5, 15]],
                            ["hour", [1, 6]],
                            ["day", [1]],
                            ["week", [1]],
                            ["month", [1]],
                            ["year", null]
                        ]
                    }, a);
                    "xAxis" === this.coll && (E(a.linkedTo) && !E(a.tickPixelInterval) && (e.tickPixelInterval = 350), E(a.tickPixelInterval) || !E(a.linkedTo) || E(a.tickPositioner) || E(a.tickInterval) || (e.tickPositioner = function(a, b) {
                        var c = this.linkedParent && this.linkedParent.tickPositions && this.linkedParent.tickPositions.info;
                        if (c) {
                            for (var d =
                                    e.units || [], f = void 0, k = void 0, g = void 0, h = 0; h < d.length; h++)
                                if (d[h][0] === c.unitName) {
                                    f = h;
                                    break
                                } d[f + 1] ? (g = d[f + 1][0], k = (d[f + 1][1] || [1])[0]) : "year" === c.unitName && (g = "year", k = 10 * c.count);
                            c = z[g];
                            this.tickInterval = c * k;
                            return this.getTimeTicks({
                                unitRange: c,
                                count: k,
                                unitName: g
                            }, a, b, this.options.startOfWeek)
                        }
                    }));
                    c(!0, this.options, e);
                    this.horiz && (b.minPadding = n(a.minPadding, 0), b.maxPadding = n(a.maxPadding, 0));
                    h(b.grid.borderWidth) && (b.tickWidth = b.lineWidth = d.borderWidth)
                }
            }

            function v(a) {
                a = (a = a.userOptions) && a.grid || {};
                var b = a.columns;
                a.enabled && b && c(!0, this.options, b[b.length - 1])
            }

            function d() {
                (this.grid.columns || []).forEach(function(a) {
                    a.setScale()
                })
            }

            function D(a) {
                var b = t.defaultLeftAxisOptions,
                    c = this.horiz,
                    d = this.maxLabelDimensions,
                    e = this.options.grid;
                e = void 0 === e ? {} : e;
                e.enabled && d && (b = 2 * Math.abs(b.labels.x), c = c ? e.cellHeight || b + d.height : b + d.width, m(a.tickSize) ? a.tickSize[0] = c : a.tickSize = [c, 0])
            }

            function C() {
                this.axes.forEach(function(a) {
                    (a.grid && a.grid.columns || []).forEach(function(a) {
                        a.setAxisSize();
                        a.setAxisTranslation()
                    })
                })
            }

            function k(a) {
                var b = this.grid;
                (b.columns || []).forEach(function(b) {
                    b.destroy(a.keepEvents)
                });
                b.columns = void 0
            }

            function K(a) {
                a = a.userOptions || {};
                var b = a.grid || {};
                b.enabled && E(b.borderColor) && (a.tickColor = a.lineColor = b.borderColor);
                this.grid || (this.grid = new V(this));
                this.hiddenLabels = []
            }

            function O(a) {
                var b = this.label,
                    c = this.axis,
                    d = c.reversed,
                    f = c.chart,
                    k = c.options.grid || {},
                    g = c.options.labels,
                    r = g.align,
                    l = e.Side[c.side],
                    n = a.tickmarkOffset,
                    m = c.tickPositions,
                    p = this.pos - n;
                m = h(m[a.index + 1]) ? m[a.index + 1] - n :
                    (c.max || 0) + n;
                var u = c.tickSize("tick");
                n = u ? u[0] : 0;
                u = u ? u[1] / 2 : 0;
                if (!0 === k.enabled) {
                    if ("top" === l) {
                        k = c.top + c.offset;
                        var q = k - n
                    } else "bottom" === l ? (q = f.chartHeight - c.bottom + c.offset, k = q + n) : (k = c.top + c.len - (c.translate(d ? m : p) || 0), q = c.top + c.len - (c.translate(d ? p : m) || 0));
                    "right" === l ? (l = f.chartWidth - c.right + c.offset, d = l + n) : "left" === l ? (d = c.left + c.offset, l = d - n) : (l = Math.round(c.left + (c.translate(d ? m : p) || 0)) - u, d = Math.min(Math.round(c.left + (c.translate(d ? p : m) || 0)) - u, c.left + c.len));
                    this.slotWidth = d - l;
                    a.pos.x = "left" ===
                        r ? l : "right" === r ? d : l + (d - l) / 2;
                    a.pos.y = q + (k - q) / 2;
                    f = f.renderer.fontMetrics(g.style.fontSize, b && b.element);
                    b = b ? b.getBBox().height : 0;
                    g.useHTML ? a.pos.y += f.b + -(b / 2) : (b = Math.round(b / f.h), a.pos.y += (f.b - (f.h - f.f)) / 2 + -((b - 1) * f.h / 2));
                    a.pos.x += c.horiz && g.x || 0
                }
            }

            function r(a) {
                var b = a.axis,
                    d = a.value;
                if (b.options.grid && b.options.grid.enabled) {
                    var e = b.tickPositions,
                        f = (b.linkedParent || b).series[0],
                        k = d === e[0];
                    e = d === e[e.length - 1];
                    var g = f && q(f.options.data, function(a) {
                            return a[b.isXAxis ? "x" : "y"] === d
                        }),
                        h = void 0;
                    g && f.is("gantt") &&
                        (h = c(g), B.seriesTypes.gantt.prototype.pointClass.setGanttPointAliases(h));
                    a.isFirst = k;
                    a.isLast = e;
                    a.point = h
                }
            }

            function A() {
                var a = this.options,
                    b = this.categories,
                    c = this.tickPositions,
                    d = c[0],
                    e = c[c.length - 1],
                    f = this.linkedParent && this.linkedParent.min || this.min,
                    k = this.linkedParent && this.linkedParent.max || this.max,
                    g = this.tickInterval;
                !0 !== (a.grid || {}).enabled || b || !this.horiz && !this.isLinked || (d < f && d + g > f && !a.startOnTick && (c[0] = f), e > k && e - g < k && !a.endOnTick && (c[c.length - 1] = k))
            }

            function P(a) {
                var b = this.options.grid;
                return !0 === (void 0 === b ? {} : b).enabled && this.categories ? this.tickInterval : a.apply(this, Array.prototype.slice.call(arguments, 1))
            }(function(a) {
                a[a.top = 0] = "top";
                a[a.right = 1] = "right";
                a[a.bottom = 2] = "bottom";
                a[a.left = 3] = "left"
            })(e.Side || (e.Side = {}));
            e.compose = function(a, c, e) {
                -1 === a.keepProps.indexOf("grid") && (a.keepProps.push("grid"), a.prototype.getMaxLabelDimensions = f, g(a.prototype, "unsquish", P), F(a, "init", K), F(a, "afterGetOffset", J), F(a, "afterGetTitlePosition", y), F(a, "afterInit", p), F(a, "afterRender", l),
                    F(a, "afterSetAxisTranslation", w), F(a, "afterSetOptions", b), F(a, "afterSetOptions", v), F(a, "afterSetScale", d), F(a, "afterTickSize", D), F(a, "trimTicks", A), F(a, "destroy", k));
                F(c, "afterSetChartSize", C);
                F(e, "afterGetLabelPosition", O);
                F(e, "labelFormat", r);
                return a
            };
            var V = function() {
                function a(a) {
                    this.axis = a
                }
                a.prototype.isOuterAxis = function() {
                    var a = this.axis,
                        b = a.grid.columnIndex,
                        c = a.linkedParent && a.linkedParent.grid.columns || a.grid.columns,
                        d = b ? a.linkedParent : a,
                        e = -1,
                        f = 0;
                    a.chart[a.coll].forEach(function(b, c) {
                        b.side !==
                            a.side || b.options.isInternal || (f = c, b === d && (e = c))
                    });
                    return f === e && (h(b) ? c.length === b : !0)
                };
                a.prototype.renderBorder = function(a) {
                    var b = this.axis,
                        c = b.chart.renderer,
                        d = b.options;
                    a = c.path(a).addClass("highcharts-axis-line").add(b.axisBorder);
                    c.styledMode || a.attr({
                        stroke: d.lineColor,
                        "stroke-width": d.lineWidth,
                        zIndex: 7
                    });
                    return a
                };
                return a
            }();
            e.Additions = V
        })(f || (f = {}));
        y.E = function(a) {
            return this.dateFormat("%a", a, !0).charAt(0)
        };
        y.W = function(a) {
            a = new this.Date(a);
            var c = (this.get("Day", a) + 6) % 7,
                e = new this.Date(a.valueOf());
            this.set("Date", e, this.get("Date", a) - c + 3);
            c = new this.Date(this.get("FullYear", e), 0, 1);
            4 !== this.get("Day", c) && (this.set("Month", a, 0), this.set("Date", a, 1 + (11 - this.get("Day", c)) % 7));
            return (1 + Math.floor((e.valueOf() - c.valueOf()) / 6048E5)).toString()
        };
        "";
        return f
    });
    N(a, "Gantt/Tree.js", [a["Core/Utilities.js"]], function(a) {
        var t = a.extend,
            B = a.isNumber,
            E = a.pick,
            y = function(a, t) {
                var q = a.reduce(function(a, h) {
                    var c = E(h.parent, "");
                    "undefined" === typeof a[c] && (a[c] = []);
                    a[c].push(h);
                    return a
                }, {});
                Object.keys(q).forEach(function(a,
                    h) {
                    var c = q[a];
                    "" !== a && -1 === t.indexOf(a) && (c.forEach(function(a) {
                        h[""].push(a)
                    }), delete h[a])
                });
                return q
            },
            F = function(a, x, q, m, h, c) {
                var n = 0,
                    z = 0,
                    g = c && c.after,
                    f = c && c.before;
                x = {
                    data: m,
                    depth: q - 1,
                    id: a,
                    level: q,
                    parent: x
                };
                var e, G;
                "function" === typeof f && f(x, c);
                f = (h[a] || []).map(function(f) {
                    var g = F(f.id, a, q + 1, f, h, c),
                        p = f.start;
                    f = !0 === f.milestone ? p : f.end;
                    e = !B(e) || p < e ? p : e;
                    G = !B(G) || f > G ? f : G;
                    n = n + 1 + g.descendants;
                    z = Math.max(g.height + 1, z);
                    return g
                });
                m && (m.start = E(m.start, e), m.end = E(m.end, G));
                t(x, {
                    children: f,
                    descendants: n,
                    height: z
                });
                "function" === typeof g && g(x, c);
                return x
            };
        return {
            getListOfParents: y,
            getNode: F,
            getTree: function(a, t) {
                var q = a.map(function(a) {
                    return a.id
                });
                a = y(a, q);
                return F("", null, 1, null, a, t)
            }
        }
    });
    N(a, "Core/Axis/TreeGridTick.js", [a["Core/Utilities.js"]], function(a) {
        var t = a.addEvent,
            B = a.isObject,
            E = a.isNumber,
            y = a.pick,
            F = a.wrap,
            I;
        (function(a) {
            function q() {
                this.treeGrid || (this.treeGrid = new z(this))
            }

            function m(a, c) {
                a = a.treeGrid;
                var e = !a.labelIcon,
                    f = c.renderer,
                    g = c.xy,
                    h = c.options,
                    n = h.width || 0,
                    l = h.height || 0,
                    m = g.x -
                    n / 2 - (h.padding || 0);
                g = g.y - l / 2;
                var b = c.collapsed ? 90 : 180,
                    q = c.show && E(g),
                    d = a.labelIcon;
                d || (a.labelIcon = d = f.path(f.symbols[h.type](h.x || 0, h.y || 0, n, l)).addClass("highcharts-label-icon").add(c.group));
                d.attr({
                    y: q ? 0 : -9999
                });
                f.styledMode || d.attr({
                    cursor: "pointer",
                    fill: y(c.color, "#666666"),
                    "stroke-width": 1,
                    stroke: h.lineColor,
                    strokeWidth: h.lineWidth || 0
                });
                d[e ? "attr" : "animate"]({
                    translateX: m,
                    translateY: g,
                    rotation: b
                })
            }

            function h(a, c, e, h, n, m, p, l, q) {
                var b = y(this.options && this.options.labels, m);
                m = this.pos;
                var f = this.axis,
                    d = "treegrid" === f.options.type;
                a = a.apply(this, [c, e, h, n, b, p, l, q]);
                d && (c = b && B(b.symbol, !0) ? b.symbol : {}, b = b && E(b.indentation) ? b.indentation : 0, m = (m = (f = f.treeGrid.mapOfPosToGridNode) && f[m]) && m.depth || 1, a.x += (c.width || 0) + 2 * (c.padding || 0) + (m - 1) * b);
                return a
            }

            function c(a) {
                var c = this,
                    e = c.pos,
                    g = c.axis,
                    h = c.label,
                    n = g.treeGrid.mapOfPosToGridNode,
                    p = g.options,
                    l = y(c.options && c.options.labels, p && p.labels),
                    q = l && B(l.symbol, !0) ? l.symbol : {},
                    b = (n = n && n[e]) && n.depth;
                p = "treegrid" === p.type;
                var v = -1 < g.tickPositions.indexOf(e);
                e = g.chart.styledMode;
                p && n && h && h.element && h.addClass("highcharts-treegrid-node-level-" + b);
                a.apply(c, Array.prototype.slice.call(arguments, 1));
                p && h && h.element && n && n.descendants && 0 < n.descendants && (g = g.treeGrid.isCollapsed(n), m(c, {
                        color: !e && h.styles && h.styles.color || "",
                        collapsed: g,
                        group: h.parentGroup,
                        options: q,
                        renderer: h.renderer,
                        show: v,
                        xy: h.xy
                    }), q = "highcharts-treegrid-node-" + (g ? "expanded" : "collapsed"), h.addClass("highcharts-treegrid-node-" + (g ? "collapsed" : "expanded")).removeClass(q), e || h.css({
                        cursor: "pointer"
                    }),
                    [h, c.treeGrid.labelIcon].forEach(function(a) {
                        a && !a.attachedTreeGridEvents && (t(a.element, "mouseover", function() {
                            h.addClass("highcharts-treegrid-node-active");
                            h.renderer.styledMode || h.css({
                                textDecoration: "underline"
                            })
                        }), t(a.element, "mouseout", function() {
                            var a = B(l.style) ? l.style : {};
                            h.removeClass("highcharts-treegrid-node-active");
                            h.renderer.styledMode || h.css({
                                textDecoration: a.textDecoration
                            })
                        }), t(a.element, "click", function() {
                            c.treeGrid.toggleCollapse()
                        }), a.attachedTreeGridEvents = !0)
                    }))
            }
            var n = !1;
            a.compose =
                function(a) {
                    n || (t(a, "init", q), F(a.prototype, "getLabelPosition", h), F(a.prototype, "renderLabel", c), a.prototype.collapse = function(a) {
                        this.treeGrid.collapse(a)
                    }, a.prototype.expand = function(a) {
                        this.treeGrid.expand(a)
                    }, a.prototype.toggleCollapse = function(a) {
                        this.treeGrid.toggleCollapse(a)
                    }, n = !0)
                };
            var z = function() {
                function a(a) {
                    this.tick = a
                }
                a.prototype.collapse = function(a) {
                    var c = this.tick,
                        f = c.axis,
                        g = f.brokenAxis;
                    g && f.treeGrid.mapOfPosToGridNode && (c = f.treeGrid.collapse(f.treeGrid.mapOfPosToGridNode[c.pos]),
                        g.setBreaks(c, y(a, !0)))
                };
                a.prototype.expand = function(a) {
                    var c = this.tick,
                        f = c.axis,
                        g = f.brokenAxis;
                    g && f.treeGrid.mapOfPosToGridNode && (c = f.treeGrid.expand(f.treeGrid.mapOfPosToGridNode[c.pos]), g.setBreaks(c, y(a, !0)))
                };
                a.prototype.toggleCollapse = function(a) {
                    var c = this.tick,
                        f = c.axis,
                        g = f.brokenAxis;
                    g && f.treeGrid.mapOfPosToGridNode && (c = f.treeGrid.toggleCollapse(f.treeGrid.mapOfPosToGridNode[c.pos]), g.setBreaks(c, y(a, !0)))
                };
                return a
            }();
            a.Additions = z
        })(I || (I = {}));
        return I
    });
    N(a, "Series/TreeUtilities.js", [a["Core/Color/Color.js"],
        a["Core/Utilities.js"]
    ], function(a, t) {
        function B(a, h) {
            var c = h.before,
                n = h.idRoot,
                m = h.mapIdToNode[n],
                g = h.points[a.i],
                f = g && g.options || {},
                e = [],
                t = 0;
            a.levelDynamic = a.level - (!1 !== h.levelIsConstant ? 0 : m.level);
            a.name = q(g && g.name, "");
            a.visible = n === a.id || !0 === h.visible;
            "function" === typeof c && (a = c(a, h));
            a.children.forEach(function(c, f) {
                var g = E({}, h);
                E(g, {
                    index: f,
                    siblings: a.children.length,
                    visible: a.visible
                });
                c = B(c, g);
                e.push(c);
                c.visible && (t += c.val)
            });
            c = q(f.value, t);
            a.visible = 0 <= c && (0 < t || a.visible);
            a.children =
                e;
            a.childrenTotal = t;
            a.isLeaf = a.visible && !t;
            a.val = c;
            return a
        }
        var E = t.extend,
            y = t.isArray,
            F = t.isNumber,
            I = t.isObject,
            x = t.merge,
            q = t.pick;
        return {
            getColor: function(m, h) {
                var c = h.index,
                    n = h.mapOptionsToLevel,
                    t = h.parentColor,
                    g = h.parentColorIndex,
                    f = h.series,
                    e = h.colors,
                    x = h.siblings,
                    y = f.points,
                    B = f.chart.options.chart,
                    p;
                if (m) {
                    y = y[m.i];
                    m = n[m.level] || {};
                    if (n = y && m.colorByPoint) {
                        var l = y.index % (e ? e.length : B.colorCount);
                        var w = e && e[l]
                    }
                    if (!f.chart.styledMode) {
                        e = y && y.options.color;
                        B = m && m.color;
                        if (p = t) p = (p = m && m.colorVariation) &&
                            "brightness" === p.key && c && x ? a.parse(t).brighten(c / x * p.to).get() : t;
                        p = q(e, B, w, p, f.color)
                    }
                    var b = q(y && y.options.colorIndex, m && m.colorIndex, l, g, h.colorIndex)
                }
                return {
                    color: p,
                    colorIndex: b
                }
            },
            getLevelOptions: function(a) {
                var h = null;
                if (I(a)) {
                    h = {};
                    var c = F(a.from) ? a.from : 1;
                    var n = a.levels;
                    var m = {};
                    var g = I(a.defaults) ? a.defaults : {};
                    y(n) && (m = n.reduce(function(a, e) {
                        if (I(e) && F(e.level)) {
                            var f = x({}, e);
                            var h = q(f.levelIsConstant, g.levelIsConstant);
                            delete f.levelIsConstant;
                            delete f.level;
                            e = e.level + (h ? 0 : c - 1);
                            I(a[e]) ? x(!0,
                                a[e], f) : a[e] = f
                        }
                        return a
                    }, {}));
                    n = F(a.to) ? a.to : 1;
                    for (a = 0; a <= n; a++) h[a] = x({}, g, I(m[a]) ? m[a] : {})
                }
                return h
            },
            setTreeValues: B,
            updateRootId: function(a) {
                if (I(a)) {
                    var h = I(a.options) ? a.options : {};
                    h = q(a.rootNode, h.rootId, "");
                    I(a.userOptions) && (a.userOptions.rootId = h);
                    a.rootNode = h
                }
                return h
            }
        }
    });
    N(a, "Core/Axis/TreeGridAxis.js", [a["Core/Axis/BrokenAxis.js"], a["Core/Axis/GridAxis.js"], a["Gantt/Tree.js"], a["Core/Axis/TreeGridTick.js"], a["Series/TreeUtilities.js"], a["Core/Utilities.js"]], function(a, t, B, H, y, F) {
        var E =
            y.getLevelOptions,
            x = F.addEvent,
            q = F.find,
            m = F.fireEvent,
            h = F.isArray,
            c = F.isObject,
            n = F.isString,
            z = F.merge,
            g = F.pick,
            f = F.wrap,
            e;
        (function(e) {
            function G(a, b) {
                var c = a.collapseEnd || 0;
                a = a.collapseStart || 0;
                c >= b && (a -= .5);
                return {
                    from: a,
                    to: c,
                    showPoints: !1
                }
            }

            function y(a, b, d) {
                var e = [],
                    f = [],
                    g = {},
                    k = "boolean" === typeof b ? b : !1,
                    h = {},
                    l = -1;
                a = B.getTree(a, {
                    after: function(a) {
                        a = h[a.pos];
                        var b = 0,
                            c = 0;
                        a.children.forEach(function(a) {
                            c += (a.descendants || 0) + 1;
                            b = Math.max((a.height || 0) + 1, b)
                        });
                        a.descendants = c;
                        a.height = b;
                        a.collapsed &&
                            f.push(a)
                    },
                    before: function(a) {
                        var b = c(a.data, !0) ? a.data : {},
                            d = n(b.name) ? b.name : "",
                            f = g[a.parent];
                        f = c(f, !0) ? h[f.pos] : null;
                        var r = function(a) {
                                return a.name === d
                            },
                            p;
                        k && c(f, !0) && (p = q(f.children, r)) ? (r = p.pos, p.nodes.push(a)) : r = l++;
                        h[r] || (h[r] = p = {
                            depth: f ? f.depth + 1 : 0,
                            name: d,
                            id: b.id,
                            nodes: [a],
                            children: [],
                            pos: r
                        }, -1 !== r && e.push(d), c(f, !0) && f.children.push(p));
                        n(a.id) && (g[a.id] = a);
                        p && !0 === b.collapsed && (p.collapsed = !0);
                        a.pos = r
                    }
                });
                h = function(a, b) {
                    var d = function(a, e, f) {
                        var g = e + (-1 === e ? 0 : b - 1),
                            k = (g - e) / 2,
                            h = e + k;
                        a.nodes.forEach(function(a) {
                            var b =
                                a.data;
                            c(b, !0) && (b.y = e + (b.seriesIndex || 0), delete b.seriesIndex);
                            a.pos = h
                        });
                        f[h] = a;
                        a.pos = h;
                        a.tickmarkOffset = k + .5;
                        a.collapseStart = g + .5;
                        a.children.forEach(function(a) {
                            d(a, g + 1, f);
                            g = (a.collapseEnd || 0) - .5
                        });
                        a.collapseEnd = g + .5;
                        return f
                    };
                    return d(a["-1"], -1, {})
                }(h, d);
                return {
                    categories: e,
                    mapOfIdToNode: g,
                    mapOfPosToGridNode: h,
                    collapsedNodes: f,
                    tree: a
                }
            }

            function p(a) {
                a.target.axes.filter(function(a) {
                    return "treegrid" === a.options.type
                }).forEach(function(b) {
                    var d = b.options || {},
                        e = d.labels,
                        f = d.uniqueNames;
                    d = d.max;
                    var g =
                        0;
                    if (!b.treeGrid.mapOfPosToGridNode || b.series.some(function(a) {
                            return !a.hasRendered || a.isDirtyData || a.isDirty
                        })) {
                        var l = b.series.reduce(function(a, b) {
                            b.visible && ((b.options.data || []).forEach(function(d) {
                                b.options.keys && b.options.keys.length && (d = b.pointClass.prototype.optionsToObject.call({
                                    series: b
                                }, d), b.pointClass.setGanttPointAliases(d));
                                c(d, !0) && (d.seriesIndex = g, a.push(d))
                            }), !0 === f && g++);
                            return a
                        }, []);
                        if (d && l.length < d)
                            for (var n = l.length; n <= d; n++) l.push({
                                name: n + "\u200b"
                            });
                        d = y(l, f || !1, !0 === f ? g : 1);
                        b.categories = d.categories;
                        b.treeGrid.mapOfPosToGridNode = d.mapOfPosToGridNode;
                        b.hasNames = !0;
                        b.treeGrid.tree = d.tree;
                        b.series.forEach(function(a) {
                            var b = (a.options.data || []).map(function(b) {
                                h(b) && a.options.keys && a.options.keys.length && l.forEach(function(a) {
                                    0 <= b.indexOf(a.x) && 0 <= b.indexOf(a.x2) && (b = a)
                                });
                                return c(b, !0) ? z(b) : b
                            });
                            a.visible && a.setData(b, !1)
                        });
                        b.treeGrid.mapOptionsToLevel = E({
                            defaults: e,
                            from: 1,
                            levels: e && e.levels,
                            to: b.treeGrid.tree && b.treeGrid.tree.height
                        });
                        "beforeRender" === a.type && (b.treeGrid.collapsedNodes =
                            d.collapsedNodes)
                    }
                })
            }

            function l(a, b) {
                var c = this.treeGrid.mapOptionsToLevel || {},
                    d = this.ticks,
                    e = d[b],
                    f;
                if ("treegrid" === this.options.type && this.treeGrid.mapOfPosToGridNode) {
                    var g = this.treeGrid.mapOfPosToGridNode[b];
                    (c = c[g.depth]) && (f = {
                        labels: c
                    });
                    !e && v ? d[b] = new v(this, b, void 0, void 0, {
                        category: g.name,
                        tickmarkOffset: g.tickmarkOffset,
                        options: f
                    }) : (e.parameters.category = g.name, e.options = f, e.addLabel())
                } else a.apply(this, Array.prototype.slice.call(arguments, 1))
            }

            function w(a, b, c) {
                var e = this,
                    f = "treegrid" ===
                    c.type;
                e.treeGrid || (e.treeGrid = new d(e));
                f && (x(b, "beforeRender", p), x(b, "beforeRedraw", p), x(b, "addSeries", function(a) {
                    a.options.data && (a = y(a.options.data, c.uniqueNames || !1, 1), e.treeGrid.collapsedNodes = (e.treeGrid.collapsedNodes || []).concat(a.collapsedNodes))
                }), x(e, "foundExtremes", function() {
                    e.treeGrid.collapsedNodes && e.treeGrid.collapsedNodes.forEach(function(a) {
                        var b = e.treeGrid.collapse(a);
                        e.brokenAxis && (e.brokenAxis.setBreaks(b, !1), e.treeGrid.collapsedNodes && (e.treeGrid.collapsedNodes = e.treeGrid.collapsedNodes.filter(function(b) {
                            return a.collapseStart !==
                                b.collapseStart || a.collapseEnd !== b.collapseEnd
                        })))
                    })
                }), x(e, "afterBreaks", function() {
                    "yAxis" === e.coll && !e.staticScale && e.chart.options.chart.height && (e.isDirty = !0)
                }), c = z({
                    grid: {
                        enabled: !0
                    },
                    labels: {
                        align: "left",
                        levels: [{
                            level: void 0
                        }, {
                            level: 1,
                            style: {
                                fontWeight: "bold"
                            }
                        }],
                        symbol: {
                            type: "triangle",
                            x: -5,
                            y: -5,
                            height: 10,
                            width: 10,
                            padding: 5
                        }
                    },
                    uniqueNames: !1
                }, c, {
                    reversed: !0,
                    grid: {
                        columns: void 0
                    }
                }));
                a.apply(e, [b, c]);
                f && (e.hasNames = !0, e.options.showLastLabel = !0)
            }

            function b(a) {
                var b = this.options;
                "treegrid" === b.type ?
                    (this.min = g(this.userMin, b.min, this.dataMin), this.max = g(this.userMax, b.max, this.dataMax), m(this, "foundExtremes"), this.setAxisTranslation(), this.tickmarkOffset = .5, this.tickInterval = 1, this.tickPositions = this.treeGrid.mapOfPosToGridNode ? this.treeGrid.getTickPositions() : []) : a.apply(this, Array.prototype.slice.call(arguments, 1))
            }
            var v;
            e.compose = function(c, d, e, g) {
                -1 === c.keepProps.indexOf("treeGrid") && (c.keepProps.push("treeGrid"), v = g, f(c.prototype, "generateTick", l), f(c.prototype, "init", w), f(c.prototype,
                    "setTickInterval", b), c.prototype.utils = {
                    getNode: B.getNode
                }, t.compose(c, d, g), a.compose(c, e), H.compose(g));
                return c
            };
            var d = function() {
                function a(a) {
                    this.axis = a
                }
                a.prototype.setCollapsedStatus = function(a) {
                    var b = this.axis,
                        c = b.chart;
                    b.series.forEach(function(b) {
                        var d = b.options.data;
                        if (a.id && d) {
                            var e = c.get(a.id);
                            b = d[b.data.indexOf(e)];
                            e && b && (e.collapsed = a.collapsed, b.collapsed = a.collapsed)
                        }
                    })
                };
                a.prototype.collapse = function(a) {
                    var b = this.axis,
                        c = b.options.breaks || [],
                        d = G(a, b.max);
                    c.push(d);
                    a.collapsed = !0;
                    b.treeGrid.setCollapsedStatus(a);
                    return c
                };
                a.prototype.expand = function(a) {
                    var b = this.axis,
                        c = b.options.breaks || [],
                        d = G(a, b.max);
                    a.collapsed = !1;
                    b.treeGrid.setCollapsedStatus(a);
                    return c.reduce(function(a, b) {
                        b.to === d.to && b.from === d.from || a.push(b);
                        return a
                    }, [])
                };
                a.prototype.getTickPositions = function() {
                    var a = this.axis,
                        b = Math.floor(a.min / a.tickInterval) * a.tickInterval,
                        c = Math.ceil(a.max / a.tickInterval) * a.tickInterval;
                    return Object.keys(a.treeGrid.mapOfPosToGridNode || {}).reduce(function(d, e) {
                        e = +e;
                        !(e >= b && e <= c) || a.brokenAxis && a.brokenAxis.isInAnyBreak(e) ||
                            d.push(e);
                        return d
                    }, [])
                };
                a.prototype.isCollapsed = function(a) {
                    var b = this.axis,
                        c = b.options.breaks || [],
                        d = G(a, b.max);
                    return c.some(function(a) {
                        return a.from === d.from && a.to === d.to
                    })
                };
                a.prototype.toggleCollapse = function(a) {
                    return this.isCollapsed(a) ? this.expand(a) : this.collapse(a)
                };
                return a
            }();
            e.Additions = d
        })(e || (e = {}));
        return e
    });
    N(a, "Extensions/CurrentDateIndication.js", [a["Core/Axis/Axis.js"], a["Core/Axis/PlotLineOrBand/PlotLineOrBand.js"], a["Core/Utilities.js"]], function(a, t, B) {
        var E = B.addEvent,
            y = B.merge;
        B = B.wrap;
        var F = {
            color: "#ccd6eb",
            width: 2,
            label: {
                format: "%a, %b %d %Y, %H:%M",
                formatter: function(a, t) {
                    return this.axis.chart.time.dateFormat(t || "", a)
                },
                rotation: 0,
                style: {
                    fontSize: "10px"
                }
            }
        };
        E(a, "afterSetOptions", function() {
            var a = this.options,
                t = a.currentDateIndicator;
            t && (t = "object" === typeof t ? y(F, t) : y(F), t.value = Date.now(), t.className = "highcharts-current-date-indicator", a.plotLines || (a.plotLines = []), a.plotLines.push(t))
        });
        E(t, "render", function() {
            this.label && this.label.attr({
                text: this.getLabelText(this.options.label)
            })
        });
        B(t.prototype, "getLabelText", function(a, t) {
            var q = this.options;
            return q && q.className && -1 !== q.className.indexOf("highcharts-current-date-indicator") && q.label && "function" === typeof q.label.formatter ? (q.value = Date.now(), q.label.formatter.call(this, q.value, q.label.format)) : a.call(this, t)
        })
    });
    N(a, "Extensions/StaticScale.js", [a["Core/Axis/Axis.js"], a["Core/Chart/Chart.js"], a["Core/Utilities.js"]], function(a, t, B) {
        var E = B.addEvent,
            y = B.defined,
            F = B.isNumber,
            I = B.pick;
        E(a, "afterSetOptions", function() {
            var a = this.chart.options.chart;
            !this.horiz && F(this.options.staticScale) && (!a.height || a.scrollablePlotArea && a.scrollablePlotArea.minHeight) && (this.staticScale = this.options.staticScale)
        });
        t.prototype.adjustHeight = function() {
            "adjustHeight" !== this.redrawTrigger && ((this.axes || []).forEach(function(a) {
                var q = a.chart,
                    m = !!q.initiatedScale && q.options.animation,
                    h = a.options.staticScale;
                if (a.staticScale && y(a.min)) {
                    var c = I(a.brokenAxis && a.brokenAxis.unitLength, a.max + a.tickInterval - a.min) * h;
                    c = Math.max(c, h);
                    h = c - q.plotHeight;
                    !q.scrollablePixelsY &&
                        1 <= Math.abs(h) && (q.plotHeight = c, q.redrawTrigger = "adjustHeight", q.setSize(void 0, q.chartHeight + h, m));
                    a.series.forEach(function(a) {
                        (a = a.sharedClipKey && q.sharedClips[a.sharedClipKey]) && a.attr(q.inverted ? {
                            width: q.plotHeight
                        } : {
                            height: q.plotHeight
                        })
                    })
                }
            }), this.initiatedScale = !0);
            this.redrawTrigger = null
        };
        E(t, "render", t.prototype.adjustHeight)
    });
    N(a, "Extensions/ArrowSymbols.js", [a["Core/Renderer/SVG/SVGRenderer.js"]], function(a) {
        function t(a, t, B, x) {
            return [
                ["M", a, t + x / 2],
                ["L", a + B, t],
                ["L", a, t + x / 2],
                ["L", a + B, t +
                    x
                ]
            ]
        }

        function B(a, t, B, x) {
            return [
                ["M", a + B, t],
                ["L", a, t + x / 2],
                ["L", a + B, t + x],
                ["Z"]
            ]
        }

        function E(a, t, E, x) {
            return B(a, t, E / 2, x)
        }
        a = a.prototype.symbols;
        a.arrow = t;
        a["arrow-filled"] = B;
        a["arrow-filled-half"] = E;
        a["arrow-half"] = function(a, B, E, x) {
            return t(a, B, E / 2, x)
        };
        a["triangle-left"] = B;
        a["triangle-left-half"] = E;
        return a
    });
    N(a, "Gantt/Connection.js", [a["Core/Globals.js"], a["Core/DefaultOptions.js"], a["Core/Series/Point.js"], a["Core/Utilities.js"]], function(a, t, B, H) {
        function y(a) {
            var c = a.shapeArgs;
            return c ? {
                xMin: c.x ||
                    0,
                xMax: (c.x || 0) + (c.width || 0),
                yMin: c.y || 0,
                yMax: (c.y || 0) + (c.height || 0)
            } : (c = a.graphic && a.graphic.getBBox()) ? {
                xMin: a.plotX - c.width / 2,
                xMax: a.plotX + c.width / 2,
                yMin: a.plotY - c.height / 2,
                yMax: a.plotY + c.height / 2
            } : null
        }
        "";
        var E = H.defined,
            I = H.error,
            x = H.extend,
            q = H.merge,
            m = H.objectEach,
            h = a.deg2rad,
            c = Math.max,
            n = Math.min;
        x(t.defaultOptions, {
            connectors: {
                type: "straight",
                lineWidth: 1,
                marker: {
                    enabled: !1,
                    align: "center",
                    verticalAlign: "middle",
                    inside: !1,
                    lineWidth: 1
                },
                startMarker: {
                    symbol: "diamond"
                },
                endMarker: {
                    symbol: "arrow-filled"
                }
            }
        });
        t = function() {
            function a(a, c, e) {
                this.toPoint = this.pathfinder = this.graphics = this.fromPoint = this.chart = void 0;
                this.init(a, c, e)
            }
            a.prototype.init = function(a, c, e) {
                this.fromPoint = a;
                this.toPoint = c;
                this.options = e;
                this.chart = a.series.chart;
                this.pathfinder = this.chart.pathfinder
            };
            a.prototype.renderPath = function(a, c, e) {
                var f = this.chart,
                    g = f.styledMode,
                    h = f.pathfinder,
                    n = !f.options.chart.forExport && !1 !== e,
                    l = this.graphics && this.graphics.path;
                h.group || (h.group = f.renderer.g().addClass("highcharts-pathfinder-group").attr({
                    zIndex: -1
                }).add(f.seriesGroup));
                h.group.translate(f.plotLeft, f.plotTop);
                l && l.renderer || (l = f.renderer.path().add(h.group), g || l.attr({
                    opacity: 0
                }));
                l.attr(c);
                a = {
                    d: a
                };
                g || (a.opacity = 1);
                l[n ? "animate" : "attr"](a, e);
                this.graphics = this.graphics || {};
                this.graphics.path = l
            };
            a.prototype.addMarker = function(a, c, e) {
                var f = this.fromPoint.series.chart,
                    g = f.pathfinder;
                f = f.renderer;
                var n = "start" === a ? this.fromPoint : this.toPoint,
                    p = n.getPathfinderAnchorPoint(c);
                if (c.enabled && ((e = "start" === a ? e[1] : e[e.length - 2]) && "M" === e[0] || "L" === e[0])) {
                    e = {
                        x: e[1],
                        y: e[2]
                    };
                    e = n.getRadiansToVector(e, p);
                    p = n.getMarkerVector(e, c.radius, p);
                    e = -e / h;
                    if (c.width && c.height) {
                        var l = c.width;
                        var m = c.height
                    } else l = m = 2 * c.radius;
                    this.graphics = this.graphics || {};
                    p = {
                        x: p.x - l / 2,
                        y: p.y - m / 2,
                        width: l,
                        height: m,
                        rotation: e,
                        rotationOriginX: p.x,
                        rotationOriginY: p.y
                    };
                    this.graphics[a] ? this.graphics[a].animate(p) : (this.graphics[a] = f.symbol(c.symbol).addClass("highcharts-point-connecting-path-" + a + "-marker").attr(p).add(g.group), f.styledMode || this.graphics[a].attr({
                        fill: c.color || this.fromPoint.color,
                        stroke: c.lineColor,
                        "stroke-width": c.lineWidth,
                        opacity: 0
                    }).animate({
                        opacity: 1
                    }, n.series.options.animation))
                }
            };
            a.prototype.getPath = function(a) {
                var c = this.pathfinder,
                    e = this.chart,
                    g = c.algorithms[a.type],
                    h = c.chartObstacles;
                if ("function" !== typeof g) return I('"' + a.type + '" is not a Pathfinder algorithm.'), {
                    path: [],
                    obstacles: []
                };
                g.requiresObstacles && !h && (h = c.chartObstacles = c.getChartObstacles(a), e.options.connectors.algorithmMargin = a.algorithmMargin, c.chartObstacleMetrics = c.getObstacleMetrics(h));
                return g(this.fromPoint.getPathfinderAnchorPoint(a.startMarker),
                    this.toPoint.getPathfinderAnchorPoint(a.endMarker), q({
                        chartObstacles: h,
                        lineObstacles: c.lineObstacles || [],
                        obstacleMetrics: c.chartObstacleMetrics,
                        hardBounds: {
                            xMin: 0,
                            xMax: e.plotWidth,
                            yMin: 0,
                            yMax: e.plotHeight
                        },
                        obstacleOptions: {
                            margin: a.algorithmMargin
                        },
                        startDirectionX: c.getAlgorithmStartDirection(a.startMarker)
                    }, a))
            };
            a.prototype.render = function() {
                var a = this.fromPoint,
                    f = a.series,
                    e = f.chart,
                    h = e.pathfinder,
                    m = q(e.options.connectors, f.options.connectors, a.options.connectors, this.options),
                    t = {};
                e.styledMode ||
                    (t.stroke = m.lineColor || a.color, t["stroke-width"] = m.lineWidth, m.dashStyle && (t.dashstyle = m.dashStyle));
                t["class"] = "highcharts-point-connecting-path highcharts-color-" + a.colorIndex;
                m = q(t, m);
                E(m.marker.radius) || (m.marker.radius = n(c(Math.ceil((m.algorithmMargin || 8) / 2) - 1, 1), 5));
                a = this.getPath(m);
                e = a.path;
                a.obstacles && (h.lineObstacles = h.lineObstacles || [], h.lineObstacles = h.lineObstacles.concat(a.obstacles));
                this.renderPath(e, t, f.options.animation);
                this.addMarker("start", q(m.marker, m.startMarker), e);
                this.addMarker("end",
                    q(m.marker, m.endMarker), e)
            };
            a.prototype.destroy = function() {
                this.graphics && (m(this.graphics, function(a) {
                    a.destroy()
                }), delete this.graphics)
            };
            return a
        }();
        a.Connection = t;
        x(B.prototype, {
            getPathfinderAnchorPoint: function(a) {
                var c = y(this);
                switch (a.align) {
                    case "right":
                        var f = "xMax";
                        break;
                    case "left":
                        f = "xMin"
                }
                switch (a.verticalAlign) {
                    case "top":
                        var e = "yMin";
                        break;
                    case "bottom":
                        e = "yMax"
                }
                return {
                    x: f ? c[f] : (c.xMin + c.xMax) / 2,
                    y: e ? c[e] : (c.yMin + c.yMax) / 2
                }
            },
            getRadiansToVector: function(a, c) {
                var f;
                E(c) || (f = y(this)) && (c = {
                    x: (f.xMin + f.xMax) / 2,
                    y: (f.yMin + f.yMax) / 2
                });
                return Math.atan2(c.y - a.y, a.x - c.x)
            },
            getMarkerVector: function(a, c, f) {
                var e = 2 * Math.PI,
                    g = y(this),
                    h = g.xMax - g.xMin,
                    n = g.yMax - g.yMin,
                    p = Math.atan2(n, h),
                    l = !1;
                h /= 2;
                var m = n / 2,
                    b = g.xMin + h;
                g = g.yMin + m;
                for (var q = b, d = g, t = 1, C = 1; a < -Math.PI;) a += e;
                for (; a > Math.PI;) a -= e;
                e = Math.tan(a);
                a > -p && a <= p ? (C = -1, l = !0) : a > p && a <= Math.PI - p ? C = -1 : a > Math.PI - p || a <= -(Math.PI - p) ? (t = -1, l = !0) : t = -1;
                l ? (q += t * h, d += C * h * e) : (q += n / (2 * e) * t, d += C * m);
                f.x !== b && (q = f.x);
                f.y !== g && (d = f.y);
                return {
                    x: q + c * Math.cos(a),
                    y: d -
                        c * Math.sin(a)
                }
            }
        });
        return t
    });
    N(a, "Gantt/PathfinderAlgorithms.js", [a["Core/Utilities.js"]], function(a) {
        function t(a, c, n) {
            n = n || 0;
            var h = a.length - 1;
            c -= 1e-7;
            for (var g, f; n <= h;)
                if (g = h + n >> 1, f = c - a[g].xMin, 0 < f) n = g + 1;
                else if (0 > f) h = g - 1;
            else return g;
            return 0 < n ? n - 1 : 0
        }

        function B(a, c) {
            for (var h = t(a, c.x + 1) + 1; h--;) {
                var m;
                if (m = a[h].xMax >= c.x) m = a[h], m = c.x <= m.xMax && c.x >= m.xMin && c.y <= m.yMax && c.y >= m.yMin;
                if (m) return h
            }
            return -1
        }

        function E(a) {
            var c = [];
            if (a.length) {
                c.push(["M", a[0].start.x, a[0].start.y]);
                for (var h = 0; h < a.length; ++h) c.push(["L",
                    a[h].end.x, a[h].end.y
                ])
            }
            return c
        }

        function y(a, c) {
            a.yMin = x(a.yMin, c.yMin);
            a.yMax = I(a.yMax, c.yMax);
            a.xMin = x(a.xMin, c.xMin);
            a.xMax = I(a.xMax, c.xMax)
        }
        var F = a.pick,
            I = Math.min,
            x = Math.max,
            q = Math.abs;
        a = function(a, c, n) {
            function h(a, c, b, e, d) {
                a = {
                    x: a.x,
                    y: a.y
                };
                a[c] = b[e || c] + (d || 0);
                return a
            }

            function g(a, c, b) {
                var e = q(c[b] - a[b + "Min"]) > q(c[b] - a[b + "Max"]);
                return h(c, b, a, b + (e ? "Max" : "Min"), e ? 1 : -1)
            }
            var f = [],
                e = F(n.startDirectionX, q(c.x - a.x) > q(c.y - a.y)) ? "x" : "y",
                m = n.chartObstacles,
                t = B(m, a);
            n = B(m, c);
            if (-1 < n) {
                var x = m[n];
                n = g(x,
                    c, e);
                x = {
                    start: n,
                    end: c
                };
                var p = n
            } else p = c; - 1 < t && (m = m[t], n = g(m, a, e), f.push({
                start: a,
                end: n
            }), n[e] >= a[e] === n[e] >= p[e] && (e = "y" === e ? "x" : "y", c = a[e] < c[e], f.push({
                start: n,
                end: h(n, e, m, e + (c ? "Max" : "Min"), c ? 1 : -1)
            }), e = "y" === e ? "x" : "y"));
            a = f.length ? f[f.length - 1].end : a;
            n = h(a, e, p);
            f.push({
                start: a,
                end: n
            });
            e = h(n, "y" === e ? "x" : "y", p);
            f.push({
                start: n,
                end: e
            });
            f.push(x);
            return {
                path: E(f),
                obstacles: f
            }
        };
        a.requiresObstacles = !0;
        var m = function(a, c, n) {
            function h(a, b, c) {
                var d, e = a.x < b.x ? 1 : -1;
                if (a.x < b.x) {
                    var f = a;
                    var g = b
                } else f = b, g = a;
                if (a.y < b.y) {
                    var k = a;
                    var h = b
                } else k = b, h = a;
                for (d = 0 > e ? I(t(D, g.x), D.length - 1) : 0; D[d] && (0 < e && D[d].xMin <= g.x || 0 > e && D[d].xMax >= f.x);) {
                    if (D[d].xMin <= g.x && D[d].xMax >= f.x && D[d].yMin <= h.y && D[d].yMax >= k.y) return c ? {
                        y: a.y,
                        x: a.x < b.x ? D[d].xMin - 1 : D[d].xMax + 1,
                        obstacle: D[d]
                    } : {
                        x: a.x,
                        y: a.y < b.y ? D[d].yMin - 1 : D[d].yMax + 1,
                        obstacle: D[d]
                    };
                    d += e
                }
                return b
            }

            function g(a, b, c, d, e) {
                var f = e.soft,
                    g = e.hard,
                    k = d ? "x" : "y",
                    r = {
                        x: b.x,
                        y: b.y
                    },
                    l = {
                        x: b.x,
                        y: b.y
                    };
                e = a[k + "Max"] >= f[k + "Max"];
                f = a[k + "Min"] <= f[k + "Min"];
                var n = a[k + "Max"] >= g[k + "Max"];
                g = a[k +
                    "Min"] <= g[k + "Min"];
                var m = q(a[k + "Min"] - b[k]),
                    p = q(a[k + "Max"] - b[k]);
                c = 10 > q(m - p) ? b[k] < c[k] : p < m;
                l[k] = a[k + "Min"];
                r[k] = a[k + "Max"];
                a = h(b, l, d)[k] !== l[k];
                b = h(b, r, d)[k] !== r[k];
                c = a ? b ? c : !0 : b ? !1 : c;
                c = f ? e ? c : !0 : e ? !1 : c;
                return g ? n ? c : !0 : n ? !1 : c
            }

            function f(a, c, e) {
                if (a.x === c.x && a.y === c.y) return [];
                var k = e ? "x" : "y",
                    r = n.obstacleOptions.margin;
                var l = {
                    soft: {
                        xMin: w,
                        xMax: b,
                        yMin: v,
                        yMax: d
                    },
                    hard: n.hardBounds
                };
                var m = B(D, a);
                if (-1 < m) {
                    m = D[m];
                    l = g(m, a, c, e, l);
                    y(m, n.hardBounds);
                    var q = e ? {
                        y: a.y,
                        x: m[l ? "xMax" : "xMin"] + (l ? 1 : -1)
                    } : {
                        x: a.x,
                        y: m[l ? "yMax" :
                            "yMin"] + (l ? 1 : -1)
                    };
                    var t = B(D, q); - 1 < t && (t = D[t], y(t, n.hardBounds), q[k] = l ? x(m[k + "Max"] - r + 1, (t[k + "Min"] + m[k + "Max"]) / 2) : I(m[k + "Min"] + r - 1, (t[k + "Max"] + m[k + "Min"]) / 2), a.x === q.x && a.y === q.y ? (p && (q[k] = l ? x(m[k + "Max"], t[k + "Max"]) + 1 : I(m[k + "Min"], t[k + "Min"]) - 1), p = !p) : p = !1);
                    a = [{
                        start: a,
                        end: q
                    }]
                } else k = h(a, {
                    x: e ? c.x : a.x,
                    y: e ? a.y : c.y
                }, e), a = [{
                    start: a,
                    end: {
                        x: k.x,
                        y: k.y
                    }
                }], k[e ? "x" : "y"] !== c[e ? "x" : "y"] && (l = g(k.obstacle, k, c, !e, l), y(k.obstacle, n.hardBounds), l = {
                    x: e ? k.x : k.obstacle[l ? "xMax" : "xMin"] + (l ? 1 : -1),
                    y: e ? k.obstacle[l ? "yMax" :
                        "yMin"] + (l ? 1 : -1) : k.y
                }, e = !e, a = a.concat(f({
                    x: k.x,
                    y: k.y
                }, l, e)));
                return a = a.concat(f(a[a.length - 1].end, c, !e))
            }

            function e(a, b, c) {
                var d = I(a.xMax - b.x, b.x - a.xMin) < I(a.yMax - b.y, b.y - a.yMin);
                c = g(a, b, c, d, {
                    soft: n.hardBounds,
                    hard: n.hardBounds
                });
                return d ? {
                    y: b.y,
                    x: a[c ? "xMax" : "xMin"] + (c ? 1 : -1)
                } : {
                    x: b.x,
                    y: a[c ? "yMax" : "yMin"] + (c ? 1 : -1)
                }
            }
            var m = F(n.startDirectionX, q(c.x - a.x) > q(c.y - a.y)),
                J = m ? "x" : "y",
                H = [],
                p = !1,
                l = n.obstacleMetrics,
                w = I(a.x, c.x) - l.maxWidth - 10,
                b = x(a.x, c.x) + l.maxWidth + 10,
                v = I(a.y, c.y) - l.maxHeight - 10,
                d = x(a.y, c.y) +
                l.maxHeight + 10,
                D = n.chartObstacles;
            var C = t(D, w);
            l = t(D, b);
            D = D.slice(C, l + 1);
            if (-1 < (l = B(D, c))) {
                var k = e(D[l], c, a);
                H.push({
                    end: c,
                    start: k
                });
                c = k
            }
            for (; - 1 < (l = B(D, c));) C = 0 > c[J] - a[J], k = {
                x: c.x,
                y: c.y
            }, k[J] = D[l][C ? J + "Max" : J + "Min"] + (C ? 1 : -1), H.push({
                end: c,
                start: k
            }), c = k;
            a = f(a, c, m);
            a = a.concat(H.reverse());
            return {
                path: E(a),
                obstacles: a
            }
        };
        m.requiresObstacles = !0;
        return {
            fastAvoid: m,
            straight: function(a, c) {
                return {
                    path: [
                        ["M", a.x, a.y],
                        ["L", c.x, c.y]
                    ],
                    obstacles: [{
                        start: a,
                        end: c
                    }]
                }
            },
            simpleConnect: a
        }
    });
    N(a, "Gantt/Pathfinder.js",
        [a["Gantt/Connection.js"], a["Core/Chart/Chart.js"], a["Core/Globals.js"], a["Core/DefaultOptions.js"], a["Core/Series/Point.js"], a["Core/Utilities.js"], a["Gantt/PathfinderAlgorithms.js"]],
        function(a, t, B, H, y, F, I) {
            function x(a) {
                var c = a.shapeArgs;
                return c ? {
                    xMin: c.x || 0,
                    xMax: (c.x || 0) + (c.width || 0),
                    yMin: c.y || 0,
                    yMax: (c.y || 0) + (c.height || 0)
                } : (c = a.graphic && a.graphic.getBBox()) ? {
                    xMin: a.plotX - c.width / 2,
                    xMax: a.plotX + c.width / 2,
                    yMin: a.plotY - c.height / 2,
                    yMax: a.plotY + c.height / 2
                } : null
            }

            function q(a) {
                for (var c = a.length, e =
                        0, b, g, d = [], h = function(a, b, c) {
                            c = f(c, 10);
                            var d = a.yMax + c > b.yMin - c && a.yMin - c < b.yMax + c,
                                e = a.xMax + c > b.xMin - c && a.xMin - c < b.xMax + c,
                                k = d ? a.xMin > b.xMax ? a.xMin - b.xMax : b.xMin - a.xMax : Infinity,
                                g = e ? a.yMin > b.yMax ? a.yMin - b.yMax : b.yMin - a.yMax : Infinity;
                            return e && d ? c ? h(a, b, Math.floor(c / 2)) : Infinity : E(k, g)
                        }; e < c; ++e)
                    for (b = e + 1; b < c; ++b) g = h(a[e], a[b]), 80 > g && d.push(g);
                d.push(80);
                return G(Math.floor(d.sort(function(a, b) {
                    return a - b
                })[Math.floor(d.length / 10)] / 2 - 1), 1)
            }

            function m(a) {
                if (a.options.pathfinder || a.series.reduce(function(a,
                        c) {
                        c.options && g(!0, c.options.connectors = c.options.connectors || {}, c.options.pathfinder);
                        return a || c.options && c.options.pathfinder
                    }, !1)) g(!0, a.options.connectors = a.options.connectors || {}, a.options.pathfinder), n('WARNING: Pathfinder options have been renamed. Use "chart.connectors" or "series.connectors" instead.')
            }
            "";
            var h = F.addEvent,
                c = F.defined,
                n = F.error,
                z = F.extend,
                g = F.merge,
                f = F.pick,
                e = F.splat,
                G = Math.max,
                E = Math.min;
            z(H.defaultOptions, {
                connectors: {
                    type: "straight",
                    lineWidth: 1,
                    marker: {
                        enabled: !1,
                        align: "center",
                        verticalAlign: "middle",
                        inside: !1,
                        lineWidth: 1
                    },
                    startMarker: {
                        symbol: "diamond"
                    },
                    endMarker: {
                        symbol: "arrow-filled"
                    }
                }
            });
            var M = function() {
                function g(a) {
                    this.lineObstacles = this.group = this.connections = this.chartObstacleMetrics = this.chartObstacles = this.chart = void 0;
                    this.init(a)
                }
                g.prototype.init = function(a) {
                    this.chart = a;
                    this.connections = [];
                    h(a, "redraw", function() {
                        this.pathfinder.update()
                    })
                };
                g.prototype.update = function(c) {
                    var f = this.chart,
                        b = this,
                        g = b.connections;
                    b.connections = [];
                    f.series.forEach(function(c) {
                        c.visible &&
                            !c.options.isInternal && c.points.forEach(function(c) {
                                var d = c.options;
                                d && d.dependency && (d.connect = d.dependency);
                                var g;
                                d = c.options && c.options.connect && e(c.options.connect);
                                c.visible && !1 !== c.isInside && d && d.forEach(function(d) {
                                    g = f.get("string" === typeof d ? d : d.to);
                                    g instanceof y && g.series.visible && g.visible && !1 !== g.isInside && b.connections.push(new a(c, g, "string" === typeof d ? {} : d))
                                })
                            })
                    });
                    for (var d = 0, h = void 0, l = void 0, k = g.length, n = b.connections.length; d < k; ++d) {
                        l = !1;
                        for (h = 0; h < n; ++h)
                            if (g[d].fromPoint === b.connections[h].fromPoint &&
                                g[d].toPoint === b.connections[h].toPoint) {
                                b.connections[h].graphics = g[d].graphics;
                                l = !0;
                                break
                            } l || g[d].destroy()
                    }
                    delete this.chartObstacles;
                    delete this.lineObstacles;
                    b.renderConnections(c)
                };
                g.prototype.renderConnections = function(a) {
                    a ? this.chart.series.forEach(function(a) {
                        var b = function() {
                            var b = a.chart.pathfinder;
                            (b && b.connections || []).forEach(function(b) {
                                b.fromPoint && b.fromPoint.series === a && b.render()
                            });
                            a.pathfinderRemoveRenderEvent && (a.pathfinderRemoveRenderEvent(), delete a.pathfinderRemoveRenderEvent)
                        };
                        !1 === a.options.animation ? b() : a.pathfinderRemoveRenderEvent = h(a, "afterAnimate", b)
                    }) : this.connections.forEach(function(a) {
                        a.render()
                    })
                };
                g.prototype.getChartObstacles = function(a) {
                    for (var e = [], b = this.chart.series, g = f(a.algorithmMargin, 0), d, h = 0, l = b.length; h < l; ++h)
                        if (b[h].visible && !b[h].options.isInternal) {
                            var k = 0,
                                n = b[h].points.length,
                                m = void 0;
                            for (m = void 0; k < n; ++k) m = b[h].points[k], m.visible && (m = x(m)) && e.push({
                                xMin: m.xMin - g,
                                xMax: m.xMax + g,
                                yMin: m.yMin - g,
                                yMax: m.yMax + g
                            })
                        } e = e.sort(function(a, b) {
                        return a.xMin -
                            b.xMin
                    });
                    c(a.algorithmMargin) || (d = a.algorithmMargin = q(e), e.forEach(function(a) {
                        a.xMin -= d;
                        a.xMax += d;
                        a.yMin -= d;
                        a.yMax += d
                    }));
                    return e
                };
                g.prototype.getObstacleMetrics = function(a) {
                    for (var c = 0, b = 0, e, d, f = a.length; f--;) e = a[f].xMax - a[f].xMin, d = a[f].yMax - a[f].yMin, c < e && (c = e), b < d && (b = d);
                    return {
                        maxHeight: b,
                        maxWidth: c
                    }
                };
                g.prototype.getAlgorithmStartDirection = function(a) {
                    var c = "top" !== a.verticalAlign && "bottom" !== a.verticalAlign;
                    return "left" !== a.align && "right" !== a.align ? c ? void 0 : !1 : c ? !0 : void 0
                };
                return g
            }();
            M.prototype.algorithms =
                I;
            B.Pathfinder = M;
            z(y.prototype, {
                getPathfinderAnchorPoint: function(a) {
                    var c = x(this);
                    switch (a.align) {
                        case "right":
                            var e = "xMax";
                            break;
                        case "left":
                            e = "xMin"
                    }
                    switch (a.verticalAlign) {
                        case "top":
                            var b = "yMin";
                            break;
                        case "bottom":
                            b = "yMax"
                    }
                    return {
                        x: e ? c[e] : (c.xMin + c.xMax) / 2,
                        y: b ? c[b] : (c.yMin + c.yMax) / 2
                    }
                },
                getRadiansToVector: function(a, e) {
                    var f;
                    c(e) || (f = x(this)) && (e = {
                        x: (f.xMin + f.xMax) / 2,
                        y: (f.yMin + f.yMax) / 2
                    });
                    return Math.atan2(e.y - a.y, a.x - e.x)
                },
                getMarkerVector: function(a, c, e) {
                    var b = 2 * Math.PI,
                        f = x(this),
                        d = f.xMax - f.xMin,
                        g = f.yMax - f.yMin,
                        h = Math.atan2(g, d),
                        k = !1;
                    d /= 2;
                    var l = g / 2,
                        m = f.xMin + d;
                    f = f.yMin + l;
                    for (var r = m, n = f, p = 1, q = 1; a < -Math.PI;) a += b;
                    for (; a > Math.PI;) a -= b;
                    b = Math.tan(a);
                    a > -h && a <= h ? (q = -1, k = !0) : a > h && a <= Math.PI - h ? q = -1 : a > Math.PI - h || a <= -(Math.PI - h) ? (p = -1, k = !0) : p = -1;
                    k ? (r += p * d, n += q * d * b) : (r += g / (2 * b) * p, n += q * l);
                    e.x !== m && (r = e.x);
                    e.y !== f && (n = e.y);
                    return {
                        x: r + c * Math.cos(a),
                        y: n - c * Math.sin(a)
                    }
                }
            });
            t.prototype.callbacks.push(function(a) {
                !1 !== a.options.connectors.enabled && (m(a), this.pathfinder = new M(this), this.pathfinder.update(!0))
            });
            return M
        });
    N(a, "Series/Gantt/GanttSeries.js", [a["Core/Axis/Axis.js"], a["Core/Chart/Chart.js"], a["Series/Gantt/GanttPoint.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Axis/Tick.js"], a["Core/Utilities.js"], a["Core/Axis/TreeGridAxis.js"]], function(a, t, B, H, y, F, I) {
        var x = this && this.__extends || function() {
                var a = function(c, f) {
                    a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(a, c) {
                        a.__proto__ = c
                    } || function(a, c) {
                        for (var e in c) c.hasOwnProperty(e) && (a[e] = c[e])
                    };
                    return a(c, f)
                };
                return function(c,
                    f) {
                    function e() {
                        this.constructor = c
                    }
                    a(c, f);
                    c.prototype = null === f ? Object.create(f) : (e.prototype = f.prototype, new e)
                }
            }(),
            q = H.series,
            m = H.seriesTypes.xrange,
            h = F.extend,
            c = F.isNumber,
            n = F.merge;
        I.compose(a, t, q, y);
        a = function(a) {
            function g() {
                var c = null !== a && a.apply(this, arguments) || this;
                c.data = void 0;
                c.options = void 0;
                c.points = void 0;
                return c
            }
            x(g, a);
            g.prototype.drawPoint = function(a, e) {
                var f = this.options,
                    g = this.chart.renderer,
                    h = a.shapeArgs,
                    n = a.plotY,
                    l = a.graphic,
                    q = a.selected && "select",
                    b = f.stacking && !f.borderRadius;
                if (a.options.milestone)
                    if (c(n) && null !== a.y && !1 !== a.visible) {
                        h = g.symbols.diamond(h.x || 0, h.y || 0, h.width || 0, h.height || 0);
                        if (l) l[e]({
                            d: h
                        });
                        else a.graphic = g.path(h).addClass(a.getClassName(), !0).add(a.group || this.group);
                        this.chart.styledMode || a.graphic.attr(this.pointAttribs(a, q)).shadow(f.shadow, null, b)
                    } else l && (a.graphic = l.destroy());
                else m.prototype.drawPoint.call(this, a, e)
            };
            g.prototype.translatePoint = function(a) {
                m.prototype.translatePoint.call(this, a);
                if (a.options.milestone) {
                    var c = a.shapeArgs;
                    var f =
                        c.height || 0;
                    a.shapeArgs = {
                        x: (c.x || 0) - f / 2,
                        y: c.y,
                        width: f,
                        height: f
                    }
                }
            };
            g.defaultOptions = n(m.defaultOptions, {
                grouping: !1,
                dataLabels: {
                    enabled: !0
                },
                tooltip: {
                    headerFormat: '<span style="font-size: 10px">{series.name}</span><br/>',
                    pointFormat: null,
                    pointFormatter: function() {
                        var a = this.series,
                            e = a.xAxis,
                            g = a.tooltipOptions.dateTimeLabelFormats,
                            h = e.options.startOfWeek,
                            n = a.tooltipOptions,
                            m = n.xDateFormat,
                            l = this.options.milestone,
                            q = "<b>" + (this.name || this.yCategory) + "</b>";
                        if (n.pointFormat) return this.tooltipFormatter(n.pointFormat);
                        !m && c(this.start) && (m = a.chart.time.getDateFormat(e.closestPointRange, this.start, h, g || {}));
                        e = a.chart.time.dateFormat(m, this.start);
                        a = a.chart.time.dateFormat(m, this.end);
                        q += "<br/>";
                        return l ? q + (e + "<br/>") : q + ("Start: " + e + "<br/>End: ") + (a + "<br/>")
                    }
                },
                connectors: {
                    type: "simpleConnect",
                    animation: {
                        reversed: !0
                    },
                    startMarker: {
                        enabled: !0,
                        symbol: "arrow-filled",
                        radius: 4,
                        fill: "#fa0",
                        align: "left"
                    },
                    endMarker: {
                        enabled: !1,
                        align: "right"
                    }
                }
            });
            return g
        }(m);
        h(a.prototype, {
            pointArrayMap: ["start", "end", "y"],
            pointClass: B,
            setData: q.prototype.setData
        });
        H.registerSeriesType("gantt", a);
        "";
        return a
    });
    N(a, "Core/Chart/GanttChart.js", [a["Core/Chart/Chart.js"], a["Core/DefaultOptions.js"], a["Core/Utilities.js"]], function(a, t, B) {
        var E = this && this.__extends || function() {
                var a = function(m, h) {
                    a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(a, h) {
                        a.__proto__ = h
                    } || function(a, h) {
                        for (var c in h) h.hasOwnProperty(c) && (a[c] = h[c])
                    };
                    return a(m, h)
                };
                return function(m, h) {
                    function c() {
                        this.constructor = m
                    }
                    a(m, h);
                    m.prototype = null === h ? Object.create(h) : (c.prototype =
                        h.prototype, new c)
                }
            }(),
            y = t.getOptions,
            F = B.isArray,
            I = B.merge,
            x = B.splat;
        a = function(a) {
            function m() {
                return null !== a && a.apply(this, arguments) || this
            }
            E(m, a);
            m.prototype.init = function(h, c) {
                var m = y(),
                    q = h.xAxis,
                    g = h.yAxis,
                    f;
                h.xAxis = h.yAxis = void 0;
                var e = I(!0, {
                    chart: {
                        type: "gantt"
                    },
                    title: {
                        text: null
                    },
                    legend: {
                        enabled: !1
                    },
                    navigator: {
                        series: {
                            type: "gantt"
                        },
                        yAxis: {
                            type: "category"
                        }
                    }
                }, h, {
                    isGantt: !0
                });
                h.xAxis = q;
                h.yAxis = g;
                e.xAxis = (F(h.xAxis) ? h.xAxis : [h.xAxis || {}, {}]).map(function(a, c) {
                    1 === c && (f = 0);
                    return I(m.xAxis, {
                        grid: {
                            enabled: !0
                        },
                        opposite: !0,
                        linkedTo: f
                    }, a, {
                        type: "datetime"
                    })
                });
                e.yAxis = x(h.yAxis || {}).map(function(a) {
                    return I(m.yAxis, {
                        grid: {
                            enabled: !0
                        },
                        staticScale: 50,
                        reversed: !0,
                        type: a.categories ? a.type : "treegrid"
                    }, a)
                });
                a.prototype.init.call(this, e, c)
            };
            return m
        }(a);
        (function(a) {
            a.ganttChart = function(m, h, c) {
                return new a(m, h, c)
            }
        })(a || (a = {}));
        return a
    });
    N(a, "Core/Axis/ScrollbarAxis.js", [a["Core/Utilities.js"]], function(a) {
        var t = a.addEvent,
            B = a.defined,
            E = a.pick;
        return function() {
            function a() {}
            a.compose = function(y, H) {
                if (-1 === a.composed.indexOf(y)) a.composed.push(y);
                else return y;
                var x = function(a) {
                    var m = E(a.options && a.options.min, a.min),
                        h = E(a.options && a.options.max, a.max);
                    return {
                        axisMin: m,
                        axisMax: h,
                        scrollMin: B(a.dataMin) ? Math.min(m, a.min, a.dataMin, E(a.threshold, Infinity)) : m,
                        scrollMax: B(a.dataMax) ? Math.max(h, a.max, a.dataMax, E(a.threshold, -Infinity)) : h
                    }
                };
                t(y, "afterInit", function() {
                    var a = this;
                    a.options && a.options.scrollbar && a.options.scrollbar.enabled && (a.options.scrollbar.vertical = !a.horiz, a.options.startOnTick = a.options.endOnTick = !1, a.scrollbar = new H(a.chart.renderer,
                        a.options.scrollbar, a.chart), t(a.scrollbar, "changed", function(m) {
                        var h = x(a),
                            c = h.axisMax,
                            n = h.scrollMin,
                            q = h.scrollMax - n;
                        B(h.axisMin) && B(c) && (a.horiz && !a.reversed || !a.horiz && a.reversed ? (h = n + q * this.to, n += q * this.from) : (h = n + q * (1 - this.from), n += q * (1 - this.to)), this.shouldUpdateExtremes(m.DOMType) ? a.setExtremes(n, h, !0, "mousemove" !== m.DOMType && "touchmove" !== m.DOMType, m) : this.setRange(this.from, this.to))
                    }))
                });
                t(y, "afterRender", function() {
                    var a = x(this),
                        m = a.scrollMin,
                        h = a.scrollMax;
                    a = this.scrollbar;
                    var c = this.axisTitleMargin +
                        (this.titleOffset || 0),
                        n = this.chart.scrollbarsOffsets,
                        t = this.options.margin || 0;
                    a && (this.horiz ? (this.opposite || (n[1] += c), a.position(this.left, this.top + this.height + 2 + n[1] - (this.opposite ? t : 0), this.width, this.height), this.opposite || (n[1] += t), c = 1) : (this.opposite && (n[0] += c), a.position(a.options.opposite ? this.left + this.width + 2 + n[0] - (this.opposite ? 0 : t) : this.opposite ? 0 : t, this.top, this.width, this.height), this.opposite && (n[0] += t), c = 0), n[c] += a.size + a.options.margin, isNaN(m) || isNaN(h) || !B(this.min) || !B(this.max) ||
                        this.min === this.max ? a.setRange(0, 1) : (n = (this.min - m) / (h - m), m = (this.max - m) / (h - m), this.horiz && !this.reversed || !this.horiz && this.reversed ? a.setRange(n, m) : a.setRange(1 - m, 1 - n)))
                });
                t(y, "afterGetOffset", function() {
                    var a = this.scrollbar && !this.scrollbar.options.opposite;
                    a = this.horiz ? 2 : a ? 3 : 1;
                    var m = this.scrollbar;
                    m && (this.chart.scrollbarsOffsets = [0, 0], this.chart.axisOffset[a] += m.size + m.options.margin)
                });
                return y
            };
            a.composed = [];
            return a
        }()
    });
    N(a, "Core/ScrollbarDefaults.js", [a["Core/Globals.js"]], function(a) {
        return {
            height: a.isTouchDevice ?
                20 : 14,
            barBorderRadius: 0,
            buttonBorderRadius: 0,
            liveRedraw: void 0,
            margin: 10,
            minWidth: 6,
            opposite: !0,
            step: .2,
            zIndex: 3,
            barBackgroundColor: "#cccccc",
            barBorderWidth: 1,
            barBorderColor: "#cccccc",
            buttonArrowColor: "#333333",
            buttonBackgroundColor: "#e6e6e6",
            buttonBorderColor: "#cccccc",
            buttonBorderWidth: 1,
            rifleColor: "#333333",
            trackBackgroundColor: "#f2f2f2",
            trackBorderColor: "#f2f2f2",
            trackBorderWidth: 1
        }
    });
    N(a, "Core/Scrollbar.js", [a["Core/DefaultOptions.js"], a["Core/Globals.js"], a["Core/Axis/ScrollbarAxis.js"], a["Core/ScrollbarDefaults.js"],
        a["Core/Utilities.js"]
    ], function(a, t, B, H, y) {
        var E = a.defaultOptions,
            I = y.addEvent,
            x = y.correctFloat,
            q = y.defined,
            m = y.destroyObjectProperties,
            h = y.fireEvent,
            c = y.merge,
            n = y.pick,
            z = y.removeEvent;
        a = function() {
            function a(a, c, g) {
                this._events = [];
                this.chart = void 0;
                this.from = this.chartY = this.chartX = 0;
                this.scrollbar = this.renderer = this.options = this.group = void 0;
                this.scrollbarButtons = [];
                this.scrollbarGroup = void 0;
                this.scrollbarLeft = 0;
                this.scrollbarRifles = void 0;
                this.scrollbarStrokeWidth = 1;
                this.to = this.size = this.scrollbarTop =
                    0;
                this.track = void 0;
                this.trackBorderWidth = 1;
                this.userOptions = void 0;
                this.y = this.x = 0;
                this.init(a, c, g)
            }
            a.compose = function(c) {
                B.compose(c, a)
            };
            a.swapXY = function(a, c) {
                c && a.forEach(function(a) {
                    for (var c = a.length, e, f = 0; f < c; f += 2) e = a[f + 1], "number" === typeof e && (a[f + 1] = a[f + 2], a[f + 2] = e)
                });
                return a
            };
            a.prototype.addEvents = function() {
                var a = this.options.inverted ? [1, 0] : [0, 1],
                    c = this.scrollbarButtons,
                    g = this.scrollbarGroup.element,
                    h = this.track.element,
                    m = this.mouseDownHandler.bind(this),
                    n = this.mouseMoveHandler.bind(this),
                    l = this.mouseUpHandler.bind(this);
                a = [
                    [c[a[0]].element, "click", this.buttonToMinClick.bind(this)],
                    [c[a[1]].element, "click", this.buttonToMaxClick.bind(this)],
                    [h, "click", this.trackClick.bind(this)],
                    [g, "mousedown", m],
                    [g.ownerDocument, "mousemove", n],
                    [g.ownerDocument, "mouseup", l]
                ];
                t.hasTouch && a.push([g, "touchstart", m], [g.ownerDocument, "touchmove", n], [g.ownerDocument, "touchend", l]);
                a.forEach(function(a) {
                    I.apply(null, a)
                });
                this._events = a
            };
            a.prototype.buttonToMaxClick = function(a) {
                var c = (this.to - this.from) * n(this.options.step,
                    .2);
                this.updatePosition(this.from + c, this.to + c);
                h(this, "changed", {
                    from: this.from,
                    to: this.to,
                    trigger: "scrollbar",
                    DOMEvent: a
                })
            };
            a.prototype.buttonToMinClick = function(a) {
                var c = x(this.to - this.from) * n(this.options.step, .2);
                this.updatePosition(x(this.from - c), x(this.to - c));
                h(this, "changed", {
                    from: this.from,
                    to: this.to,
                    trigger: "scrollbar",
                    DOMEvent: a
                })
            };
            a.prototype.cursorToScrollbarPosition = function(a) {
                var c = this.options;
                c = c.minWidth > this.calculatedWidth ? c.minWidth : 0;
                return {
                    chartX: (a.chartX - this.x - this.xOffset) /
                        (this.barWidth - c),
                    chartY: (a.chartY - this.y - this.yOffset) / (this.barWidth - c)
                }
            };
            a.prototype.destroy = function() {
                var a = this,
                    c = a.chart.scroller;
                a.removeEvents();
                ["track", "scrollbarRifles", "scrollbar", "scrollbarGroup", "group"].forEach(function(c) {
                    a[c] && a[c].destroy && (a[c] = a[c].destroy())
                });
                c && a === c.scrollbar && (c.scrollbar = null, m(c.scrollbarButtons))
            };
            a.prototype.drawScrollbarButton = function(c) {
                var e = this.renderer,
                    f = this.scrollbarButtons,
                    g = this.options,
                    h = this.size,
                    m = e.g().add(this.group);
                f.push(m);
                m = e.rect().addClass("highcharts-scrollbar-button").add(m);
                this.chart.styledMode || m.attr({
                    stroke: g.buttonBorderColor,
                    "stroke-width": g.buttonBorderWidth,
                    fill: g.buttonBackgroundColor
                });
                m.attr(m.crisp({
                    x: -.5,
                    y: -.5,
                    width: h + 1,
                    height: h + 1,
                    r: g.buttonBorderRadius
                }, m.strokeWidth()));
                m = e.path(a.swapXY([
                    ["M", h / 2 + (c ? -1 : 1), h / 2 - 3],
                    ["L", h / 2 + (c ? -1 : 1), h / 2 + 3],
                    ["L", h / 2 + (c ? 2 : -2), h / 2]
                ], g.vertical)).addClass("highcharts-scrollbar-arrow").add(f[c]);
                this.chart.styledMode || m.attr({
                    fill: g.buttonArrowColor
                })
            };
            a.prototype.init = function(a, e, g) {
                this.scrollbarButtons = [];
                this.renderer = a;
                this.userOptions = e;
                this.options = c(H, E.scrollbar, e);
                this.chart = g;
                this.size = n(this.options.size, this.options.height);
                e.enabled && (this.render(), this.addEvents())
            };
            a.prototype.mouseDownHandler = function(a) {
                a = this.chart.pointer.normalize(a);
                a = this.cursorToScrollbarPosition(a);
                this.chartX = a.chartX;
                this.chartY = a.chartY;
                this.initPositions = [this.from, this.to];
                this.grabbedCenter = !0
            };
            a.prototype.mouseMoveHandler = function(a) {
                var c = this.chart.pointer.normalize(a),
                    f = this.options.vertical ? "chartY" : "chartX",
                    g = this.initPositions || [];
                !this.grabbedCenter || a.touches && 0 === a.touches[0][f] || (c = this.cursorToScrollbarPosition(c)[f], f = this[f], f = c - f, this.hasDragged = !0, this.updatePosition(g[0] + f, g[1] + f), this.hasDragged && h(this, "changed", {
                    from: this.from,
                    to: this.to,
                    trigger: "scrollbar",
                    DOMType: a.type,
                    DOMEvent: a
                }))
            };
            a.prototype.mouseUpHandler = function(a) {
                this.hasDragged && h(this, "changed", {
                    from: this.from,
                    to: this.to,
                    trigger: "scrollbar",
                    DOMType: a.type,
                    DOMEvent: a
                });
                this.grabbedCenter = this.hasDragged = this.chartX = this.chartY = null
            };
            a.prototype.position =
                function(a, c, g, h) {
                    var e = this.options.vertical,
                        f = this.rendered ? "animate" : "attr",
                        l = 0;
                    this.x = a;
                    this.y = c + this.trackBorderWidth;
                    this.width = g;
                    this.xOffset = this.height = h;
                    this.yOffset = l;
                    e ? (this.width = this.yOffset = g = l = this.size, this.xOffset = c = 0, this.barWidth = h - 2 * g, this.x = a += this.options.margin) : (this.height = this.xOffset = h = c = this.size, this.barWidth = g - 2 * h, this.y += this.options.margin);
                    this.group[f]({
                        translateX: a,
                        translateY: this.y
                    });
                    this.track[f]({
                        width: g,
                        height: h
                    });
                    this.scrollbarButtons[1][f]({
                        translateX: e ? 0 : g - c,
                        translateY: e ? h - l : 0
                    })
                };
            a.prototype.removeEvents = function() {
                this._events.forEach(function(a) {
                    z.apply(null, a)
                });
                this._events.length = 0
            };
            a.prototype.render = function() {
                var c = this.renderer,
                    e = this.options,
                    g = this.size,
                    h = this.chart.styledMode,
                    m = c.g("scrollbar").attr({
                        zIndex: e.zIndex,
                        translateY: -99999
                    }).add();
                this.group = m;
                this.track = c.rect().addClass("highcharts-scrollbar-track").attr({
                    x: 0,
                    r: e.trackBorderRadius || 0,
                    height: g,
                    width: g
                }).add(m);
                h || this.track.attr({
                    fill: e.trackBackgroundColor,
                    stroke: e.trackBorderColor,
                    "stroke-width": e.trackBorderWidth
                });
                this.trackBorderWidth = this.track.strokeWidth();
                this.track.attr({
                    y: -this.trackBorderWidth % 2 / 2
                });
                this.scrollbarGroup = c.g().add(m);
                this.scrollbar = c.rect().addClass("highcharts-scrollbar-thumb").attr({
                    height: g,
                    width: g,
                    r: e.barBorderRadius || 0
                }).add(this.scrollbarGroup);
                this.scrollbarRifles = c.path(a.swapXY([
                    ["M", -3, g / 4],
                    ["L", -3, 2 * g / 3],
                    ["M", 0, g / 4],
                    ["L", 0, 2 * g / 3],
                    ["M", 3, g / 4],
                    ["L", 3, 2 * g / 3]
                ], e.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup);
                h || (this.scrollbar.attr({
                    fill: e.barBackgroundColor,
                    stroke: e.barBorderColor,
                    "stroke-width": e.barBorderWidth
                }), this.scrollbarRifles.attr({
                    stroke: e.rifleColor,
                    "stroke-width": 1
                }));
                this.scrollbarStrokeWidth = this.scrollbar.strokeWidth();
                this.scrollbarGroup.translate(-this.scrollbarStrokeWidth % 2 / 2, -this.scrollbarStrokeWidth % 2 / 2);
                this.drawScrollbarButton(0);
                this.drawScrollbarButton(1)
            };
            a.prototype.setRange = function(a, c) {
                var e = this.options,
                    f = e.vertical,
                    g = e.minWidth,
                    h = this.barWidth,
                    l = !this.rendered || this.hasDragged || this.chart.navigator && this.chart.navigator.hasDragged ?
                    "attr" : "animate";
                if (q(h)) {
                    var m = h * Math.min(c, 1);
                    a = Math.max(a, 0);
                    var b = Math.ceil(h * a);
                    this.calculatedWidth = m = x(m - b);
                    m < g && (b = (h - g + m) * a, m = g);
                    g = Math.floor(b + this.xOffset + this.yOffset);
                    h = m / 2 - .5;
                    this.from = a;
                    this.to = c;
                    f ? (this.scrollbarGroup[l]({
                        translateY: g
                    }), this.scrollbar[l]({
                        height: m
                    }), this.scrollbarRifles[l]({
                        translateY: h
                    }), this.scrollbarTop = g, this.scrollbarLeft = 0) : (this.scrollbarGroup[l]({
                            translateX: g
                        }), this.scrollbar[l]({
                            width: m
                        }), this.scrollbarRifles[l]({
                            translateX: h
                        }), this.scrollbarLeft = g, this.scrollbarTop =
                        0);
                    12 >= m ? this.scrollbarRifles.hide() : this.scrollbarRifles.show(!0);
                    !1 === e.showFull && (0 >= a && 1 <= c ? this.group.hide() : this.group.show());
                    this.rendered = !0
                }
            };
            a.prototype.shouldUpdateExtremes = function(a) {
                return n(this.options.liveRedraw, t.svg && !t.isTouchDevice && !this.chart.isBoosting) || "mouseup" === a || "touchend" === a || !q(a)
            };
            a.prototype.trackClick = function(a) {
                var c = this.chart.pointer.normalize(a),
                    f = this.to - this.from,
                    g = this.y + this.scrollbarTop,
                    m = this.x + this.scrollbarLeft;
                this.options.vertical && c.chartY > g ||
                    !this.options.vertical && c.chartX > m ? this.updatePosition(this.from + f, this.to + f) : this.updatePosition(this.from - f, this.to - f);
                h(this, "changed", {
                    from: this.from,
                    to: this.to,
                    trigger: "scrollbar",
                    DOMEvent: a
                })
            };
            a.prototype.update = function(a) {
                this.destroy();
                this.init(this.chart.renderer, c(!0, this.options, a), this.chart)
            };
            a.prototype.updatePosition = function(a, c) {
                1 < c && (a = x(1 - x(c - a)), c = 1);
                0 > a && (c = x(c - a), a = 0);
                this.from = a;
                this.to = c
            };
            a.defaultOptions = H;
            return a
        }();
        E.scrollbar = c(!0, a.defaultOptions, E.scrollbar);
        return a
    });
    N(a, "Extensions/RangeSelector.js", [a["Core/Axis/Axis.js"], a["Core/Chart/Chart.js"], a["Core/Globals.js"], a["Core/DefaultOptions.js"], a["Core/Renderer/SVG/SVGElement.js"], a["Core/Utilities.js"]], function(a, t, B, H, y, F) {
        function E(a) {
            if (-1 !== a.indexOf("%L")) return "text";
            var b = "aAdewbBmoyY".split("").some(function(b) {
                    return -1 !== a.indexOf("%" + b)
                }),
                c = "HkIlMS".split("").some(function(b) {
                    return -1 !== a.indexOf("%" + b)
                });
            return b && c ? "datetime-local" : b ? "date" : c ? "time" : "text"
        }
        var x = H.defaultOptions,
            q = F.addEvent,
            m = F.createElement,
            h = F.css,
            c = F.defined,
            n = F.destroyObjectProperties,
            z = F.discardElement,
            g = F.extend,
            f = F.find,
            e = F.fireEvent,
            G = F.isNumber,
            J = F.merge,
            M = F.objectEach,
            p = F.pad,
            l = F.pick,
            w = F.pInt,
            b = F.splat;
        g(x, {
            rangeSelector: {
                allButtonsEnabled: !1,
                buttons: void 0,
                buttonSpacing: 5,
                dropdown: "responsive",
                enabled: void 0,
                verticalAlign: "top",
                buttonTheme: {
                    width: 28,
                    height: 18,
                    padding: 2,
                    zIndex: 7
                },
                floating: !1,
                x: 0,
                y: 0,
                height: void 0,
                inputBoxBorderColor: "none",
                inputBoxHeight: 17,
                inputBoxWidth: void 0,
                inputDateFormat: "%b %e, %Y",
                inputDateParser: void 0,
                inputEditDateFormat: "%Y-%m-%d",
                inputEnabled: !0,
                inputPosition: {
                    align: "right",
                    x: 0,
                    y: 0
                },
                inputSpacing: 5,
                selected: void 0,
                buttonPosition: {
                    align: "left",
                    x: 0,
                    y: 0
                },
                inputStyle: {
                    color: "#335cad",
                    cursor: "pointer"
                },
                labelStyle: {
                    color: "#666666"
                }
            }
        });
        g(x.lang, {
            rangeSelectorZoom: "Zoom",
            rangeSelectorFrom: "",
            rangeSelectorTo: "\u2192"
        });
        var v = function() {
            function d(a) {
                this.buttons = void 0;
                this.buttonOptions = d.prototype.defaultButtons;
                this.initialButtonGroupWidth = 0;
                this.options = void 0;
                this.chart = a;
                this.init(a)
            }
            d.prototype.clickButton = function(d, f) {
                var g = this.chart,
                    k = this.buttonOptions[d],
                    h = g.xAxis[0],
                    m = g.scroller && g.scroller.getUnionExtremes() || h || {},
                    n = m.dataMin,
                    p = m.dataMax,
                    t = h && Math.round(Math.min(h.max, l(p, h.max))),
                    v = k.type;
                m = k._range;
                var w, x = k.dataGrouping;
                if (null !== n && null !== p) {
                    g.fixedRange = m;
                    this.setSelected(d);
                    x && (this.forcedDataGrouping = !0, a.prototype.setDataGrouping.call(h || {
                        chart: this.chart
                    }, x, !1), this.frozenStates = k.preserveDataGrouping);
                    if ("month" === v || "year" === v)
                        if (h) {
                            v = {
                                range: k,
                                max: t,
                                chart: g,
                                dataMin: n,
                                dataMax: p
                            };
                            var y = h.minFromRange.call(v);
                            G(v.newMax) && (t = v.newMax)
                        } else m = k;
                    else if (m) y = Math.max(t - m, n), t = Math.min(y + m, p);
                    else if ("ytd" === v)
                        if (h) "undefined" === typeof p && (n = Number.MAX_VALUE, p = Number.MIN_VALUE, g.series.forEach(function(a) {
                            a = a.xData;
                            n = Math.min(a[0], n);
                            p = Math.max(a[a.length - 1], p)
                        }), f = !1), t = this.getYTDExtremes(p, n, g.time.useUTC), y = w = t.min, t = t.max;
                        else {
                            this.deferredYTDClick = d;
                            return
                        }
                    else "all" === v && h && (g.navigator && g.navigator.baseSeries[0] && (g.navigator.baseSeries[0].xAxis.options.range =
                        void 0), y = n, t = p);
                    c(y) && (y += k._offsetMin);
                    c(t) && (t += k._offsetMax);
                    this.dropdown && (this.dropdown.selectedIndex = d + 1);
                    if (h) h.setExtremes(y, t, l(f, !0), void 0, {
                        trigger: "rangeSelectorButton",
                        rangeSelectorButton: k
                    });
                    else {
                        var z = b(g.options.xAxis)[0];
                        var C = z.range;
                        z.range = m;
                        var K = z.min;
                        z.min = w;
                        q(g, "load", function() {
                            z.range = C;
                            z.min = K
                        })
                    }
                    e(this, "afterBtnClick")
                }
            };
            d.prototype.setSelected = function(a) {
                this.selected = this.options.selected = a
            };
            d.prototype.init = function(a) {
                var b = this,
                    c = a.options.rangeSelector,
                    d = c.buttons ||
                    b.defaultButtons.slice(),
                    f = c.selected,
                    g = function() {
                        var a = b.minInput,
                            c = b.maxInput;
                        a && a.blur && e(a, "blur");
                        c && c.blur && e(c, "blur")
                    };
                b.chart = a;
                b.options = c;
                b.buttons = [];
                b.buttonOptions = d;
                this.eventsToUnbind = [];
                this.eventsToUnbind.push(q(a.container, "mousedown", g));
                this.eventsToUnbind.push(q(a, "resize", g));
                d.forEach(b.computeButtonRange);
                "undefined" !== typeof f && d[f] && this.clickButton(f, !1);
                this.eventsToUnbind.push(q(a, "load", function() {
                    a.xAxis && a.xAxis[0] && q(a.xAxis[0], "setExtremes", function(c) {
                        this.max -
                            this.min !== a.fixedRange && "rangeSelectorButton" !== c.trigger && "updatedData" !== c.trigger && b.forcedDataGrouping && !b.frozenStates && this.setDataGrouping(!1, !1)
                    })
                }))
            };
            d.prototype.updateButtonStates = function() {
                var a = this,
                    b = this.chart,
                    c = this.dropdown,
                    d = b.xAxis[0],
                    e = Math.round(d.max - d.min),
                    f = !d.hasVisibleSeries,
                    g = b.scroller && b.scroller.getUnionExtremes() || d,
                    h = g.dataMin,
                    l = g.dataMax;
                b = a.getYTDExtremes(l, h, b.time.useUTC);
                var m = b.min,
                    n = b.max,
                    p = a.selected,
                    q = G(p),
                    t = a.options.allButtonsEnabled,
                    v = a.buttons;
                a.buttonOptions.forEach(function(b,
                    g) {
                    var k = b._range,
                        r = b.type,
                        u = b.count || 1,
                        A = v[g],
                        w = 0,
                        x = b._offsetMax - b._offsetMin;
                    b = g === p;
                    var y = k > l - h,
                        z = k < d.minRange,
                        C = !1,
                        B = !1;
                    k = k === e;
                    ("month" === r || "year" === r) && e + 36E5 >= 864E5 * {
                        month: 28,
                        year: 365
                    } [r] * u - x && e - 36E5 <= 864E5 * {
                        month: 31,
                        year: 366
                    } [r] * u + x ? k = !0 : "ytd" === r ? (k = n - m + x === e, C = !b) : "all" === r && (k = d.max - d.min >= l - h, B = !b && q && k);
                    r = !t && (y || z || B || f);
                    u = b && k || k && !q && !C || b && a.frozenStates;
                    r ? w = 3 : u && (q = !0, w = 2);
                    A.state !== w && (A.setState(w), c && (c.options[g + 1].disabled = r, 2 === w && (c.selectedIndex = g + 1)), 0 === w && p === g && a.setSelected())
                })
            };
            d.prototype.computeButtonRange = function(a) {
                var b = a.type,
                    c = a.count || 1,
                    d = {
                        millisecond: 1,
                        second: 1E3,
                        minute: 6E4,
                        hour: 36E5,
                        day: 864E5,
                        week: 6048E5
                    };
                if (d[b]) a._range = d[b] * c;
                else if ("month" === b || "year" === b) a._range = 864E5 * {
                    month: 30,
                    year: 365
                } [b] * c;
                a._offsetMin = l(a.offsetMin, 0);
                a._offsetMax = l(a.offsetMax, 0);
                a._range += a._offsetMax - a._offsetMin
            };
            d.prototype.getInputValue = function(a) {
                a = "min" === a ? this.minInput : this.maxInput;
                var b = this.chart.options.rangeSelector,
                    c = this.chart.time;
                return a ? ("text" === a.type && b.inputDateParser ||
                    this.defaultInputDateParser)(a.value, c.useUTC, c) : 0
            };
            d.prototype.setInputValue = function(a, b) {
                var d = this.options,
                    e = this.chart.time,
                    f = "min" === a ? this.minInput : this.maxInput;
                a = "min" === a ? this.minDateBox : this.maxDateBox;
                if (f) {
                    var g = f.getAttribute("data-hc-time");
                    g = c(g) ? Number(g) : void 0;
                    c(b) && (c(g) && f.setAttribute("data-hc-time-previous", g), f.setAttribute("data-hc-time", b), g = b);
                    f.value = e.dateFormat(this.inputTypeFormats[f.type] || d.inputEditDateFormat, g);
                    a && a.attr({
                        text: e.dateFormat(d.inputDateFormat, g)
                    })
                }
            };
            d.prototype.setInputExtremes = function(a, b, c) {
                if (a = "min" === a ? this.minInput : this.maxInput) {
                    var d = this.inputTypeFormats[a.type],
                        e = this.chart.time;
                    d && (b = e.dateFormat(d, b), a.min !== b && (a.min = b), c = e.dateFormat(d, c), a.max !== c && (a.max = c))
                }
            };
            d.prototype.showInput = function(a) {
                var b = "min" === a ? this.minDateBox : this.maxDateBox;
                if ((a = "min" === a ? this.minInput : this.maxInput) && b && this.inputGroup) {
                    var c = "text" === a.type,
                        d = this.inputGroup,
                        e = d.translateX;
                    d = d.translateY;
                    var f = this.options.inputBoxWidth;
                    h(a, {
                        width: c ? b.width +
                            (f ? -2 : 20) + "px" : "auto",
                        height: c ? b.height - 2 + "px" : "auto",
                        border: "2px solid silver"
                    });
                    c && f ? h(a, {
                        left: e + b.x + "px",
                        top: d + "px"
                    }) : h(a, {
                        left: Math.min(Math.round(b.x + e - (a.offsetWidth - b.width) / 2), this.chart.chartWidth - a.offsetWidth) + "px",
                        top: d - (a.offsetHeight - b.height) / 2 + "px"
                    })
                }
            };
            d.prototype.hideInput = function(a) {
                (a = "min" === a ? this.minInput : this.maxInput) && h(a, {
                    top: "-9999em",
                    border: 0,
                    width: "1px",
                    height: "1px"
                })
            };
            d.prototype.defaultInputDateParser = function(a, b, c) {
                var d = a.split("/").join("-").split(" ").join("T"); -
                1 === d.indexOf("T") && (d += "T00:00");
                if (b) d += "Z";
                else {
                    var e;
                    if (e = B.isSafari) e = d, e = !(6 < e.length && (e.lastIndexOf("-") === e.length - 6 || e.lastIndexOf("+") === e.length - 6));
                    e && (e = (new Date(d)).getTimezoneOffset() / 60, d += 0 >= e ? "+" + p(-e) + ":00" : "-" + p(e) + ":00")
                }
                d = Date.parse(d);
                G(d) || (a = a.split("-"), d = Date.UTC(w(a[0]), w(a[1]) - 1, w(a[2])));
                c && b && G(d) && (d += c.getTimezoneOffset(d));
                return d
            };
            d.prototype.drawInput = function(a) {
                function b() {
                    var b = f.getInputValue(a),
                        d = c.xAxis[0],
                        e = c.scroller && c.scroller.xAxis ? c.scroller.xAxis :
                        d,
                        g = e.dataMin;
                    e = e.dataMax;
                    var h = f.maxInput,
                        k = f.minInput;
                    b !== Number(t.getAttribute("data-hc-time-previous")) && G(b) && (t.setAttribute("data-hc-time-previous", b), p && h && G(g) ? b > Number(h.getAttribute("data-hc-time")) ? b = void 0 : b < g && (b = g) : k && G(e) && (b < Number(k.getAttribute("data-hc-time")) ? b = void 0 : b > e && (b = e)), "undefined" !== typeof b && d.setExtremes(p ? b : d.min, p ? d.max : b, void 0, void 0, {
                        trigger: "rangeSelectorInput"
                    }))
                }
                var c = this.chart,
                    d = this.div,
                    e = this.inputGroup,
                    f = this,
                    k = c.renderer.style || {},
                    l = c.renderer,
                    n = c.options.rangeSelector,
                    p = "min" === a,
                    q = x.lang[p ? "rangeSelectorFrom" : "rangeSelectorTo"] || "";
                q = l.label(q, 0).addClass("highcharts-range-label").attr({
                    padding: q ? 2 : 0,
                    height: q ? n.inputBoxHeight : 0
                }).add(e);
                l = l.label("", 0).addClass("highcharts-range-input").attr({
                    padding: 2,
                    width: n.inputBoxWidth,
                    height: n.inputBoxHeight,
                    "text-align": "center"
                }).on("click", function() {
                    f.showInput(a);
                    f[a + "Input"].focus()
                });
                c.styledMode || l.attr({
                    stroke: n.inputBoxBorderColor,
                    "stroke-width": 1
                });
                l.add(e);
                var t = m("input", {
                        name: a,
                        className: "highcharts-range-selector"
                    },
                    void 0, d);
                t.setAttribute("type", E(n.inputDateFormat || "%b %e, %Y"));
                c.styledMode || (q.css(J(k, n.labelStyle)), l.css(J({
                    color: "#333333"
                }, k, n.inputStyle)), h(t, g({
                    position: "absolute",
                    border: 0,
                    boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                    width: "1px",
                    height: "1px",
                    padding: 0,
                    textAlign: "center",
                    fontSize: k.fontSize,
                    fontFamily: k.fontFamily,
                    top: "-9999em"
                }, n.inputStyle)));
                t.onfocus = function() {
                    f.showInput(a)
                };
                t.onblur = function() {
                    t === B.doc.activeElement && b();
                    f.hideInput(a);
                    f.setInputValue(a);
                    t.blur()
                };
                var v = !1;
                t.onchange =
                    function() {
                        v || (b(), f.hideInput(a), t.blur())
                    };
                t.onkeypress = function(a) {
                    13 === a.keyCode && b()
                };
                t.onkeydown = function(a) {
                    v = !0;
                    38 !== a.keyCode && 40 !== a.keyCode || b()
                };
                t.onkeyup = function() {
                    v = !1
                };
                return {
                    dateBox: l,
                    input: t,
                    label: q
                }
            };
            d.prototype.getPosition = function() {
                var a = this.chart,
                    b = a.options.rangeSelector;
                a = "top" === b.verticalAlign ? a.plotTop - a.axisOffset[0] : 0;
                return {
                    buttonTop: a + b.buttonPosition.y,
                    inputTop: a + b.inputPosition.y - 10
                }
            };
            d.prototype.getYTDExtremes = function(a, b, c) {
                var d = this.chart.time,
                    e = new d.Date(a),
                    f = d.get("FullYear", e);
                c = c ? d.Date.UTC(f, 0, 1) : +new d.Date(f, 0, 1);
                b = Math.max(b, c);
                e = e.getTime();
                return {
                    max: Math.min(a || e, e),
                    min: b
                }
            };
            d.prototype.render = function(a, b) {
                var d = this.chart,
                    e = d.renderer,
                    f = d.container,
                    g = d.options,
                    h = g.rangeSelector,
                    k = l(g.chart.style && g.chart.style.zIndex, 0) + 1;
                g = h.inputEnabled;
                if (!1 !== h.enabled) {
                    this.rendered || (this.group = e.g("range-selector-group").attr({
                            zIndex: 7
                        }).add(), this.div = m("div", void 0, {
                            position: "relative",
                            height: 0,
                            zIndex: k
                        }), this.buttonOptions.length && this.renderButtons(),
                        f.parentNode && f.parentNode.insertBefore(this.div, f), g && (this.inputGroup = e.g("input-group").add(this.group), e = this.drawInput("min"), this.minDateBox = e.dateBox, this.minLabel = e.label, this.minInput = e.input, e = this.drawInput("max"), this.maxDateBox = e.dateBox, this.maxLabel = e.label, this.maxInput = e.input));
                    if (g && (this.setInputValue("min", a), this.setInputValue("max", b), a = d.scroller && d.scroller.getUnionExtremes() || d.xAxis[0] || {}, c(a.dataMin) && c(a.dataMax) && (d = d.xAxis[0].minRange || 0, this.setInputExtremes("min",
                            a.dataMin, Math.min(a.dataMax, this.getInputValue("max")) - d), this.setInputExtremes("max", Math.max(a.dataMin, this.getInputValue("min")) + d, a.dataMax)), this.inputGroup)) {
                        var n = 0;
                        [this.minLabel, this.minDateBox, this.maxLabel, this.maxDateBox].forEach(function(a) {
                            if (a) {
                                var b = a.getBBox().width;
                                b && (a.attr({
                                    x: n
                                }), n += b + h.inputSpacing)
                            }
                        })
                    }
                    this.alignElements();
                    this.rendered = !0
                }
            };
            d.prototype.renderButtons = function() {
                var a = this,
                    b = this.buttons,
                    c = this.options,
                    d = x.lang,
                    f = this.chart.renderer,
                    g = J(c.buttonTheme),
                    h = g && g.states,
                    n = g.width || 28;
                delete g.width;
                delete g.states;
                this.buttonGroup = f.g("range-selector-buttons").add(this.group);
                var p = this.dropdown = m("select", void 0, {
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    padding: 0,
                    border: 0,
                    top: "-9999em",
                    cursor: "pointer",
                    opacity: .0001
                }, this.div);
                q(p, "touchstart", function() {
                    p.style.fontSize = "16px"
                });
                [
                    [B.isMS ? "mouseover" : "mouseenter"],
                    [B.isMS ? "mouseout" : "mouseleave"],
                    ["change", "click"]
                ].forEach(function(c) {
                    var d = c[0],
                        f = c[1];
                    q(p, d, function() {
                        var c = b[a.currentButtonIndex()];
                        c && e(c.element,
                            f || d)
                    })
                });
                this.zoomText = f.label(d && d.rangeSelectorZoom || "", 0).attr({
                    padding: c.buttonTheme.padding,
                    height: c.buttonTheme.height,
                    paddingLeft: 0,
                    paddingRight: 0
                }).add(this.buttonGroup);
                this.chart.styledMode || (this.zoomText.css(c.labelStyle), g["stroke-width"] = l(g["stroke-width"], 0));
                m("option", {
                    textContent: this.zoomText.textStr,
                    disabled: !0
                }, void 0, p);
                this.buttonOptions.forEach(function(c, d) {
                    m("option", {
                        textContent: c.title || c.text
                    }, void 0, p);
                    b[d] = f.button(c.text, 0, 0, function(b) {
                        var e = c.events && c.events.click,
                            f;
                        e && (f = e.call(c, b));
                        !1 !== f && a.clickButton(d);
                        a.isActive = !0
                    }, g, h && h.hover, h && h.select, h && h.disabled).attr({
                        "text-align": "center",
                        width: n
                    }).add(a.buttonGroup);
                    c.title && b[d].attr("title", c.title)
                })
            };
            d.prototype.alignElements = function() {
                var a = this,
                    b = this.buttonGroup,
                    c = this.buttons,
                    d = this.chart,
                    e = this.group,
                    f = this.inputGroup,
                    g = this.options,
                    h = this.zoomText,
                    m = d.options,
                    n = m.exporting && !1 !== m.exporting.enabled && m.navigation && m.navigation.buttonOptions;
                m = g.buttonPosition;
                var p = g.inputPosition,
                    q = g.verticalAlign,
                    t = function(b, c) {
                        return n && a.titleCollision(d) && "top" === q && "right" === c.align && c.y - b.getBBox().height - 12 < (n.y || 0) + (n.height || 0) + d.spacing[0] ? -40 : 0
                    },
                    v = d.plotLeft;
                if (e && m && p) {
                    var w = m.x - d.spacing[3];
                    if (b) {
                        this.positionButtons();
                        if (!this.initialButtonGroupWidth) {
                            var x = 0;
                            h && (x += h.getBBox().width + 5);
                            c.forEach(function(a, b) {
                                x += a.width;
                                b !== c.length - 1 && (x += g.buttonSpacing)
                            });
                            this.initialButtonGroupWidth = x
                        }
                        v -= d.spacing[3];
                        this.updateButtonStates();
                        h = t(b, m);
                        this.alignButtonGroup(h);
                        e.placed = b.placed = d.hasLoaded
                    }
                    b =
                        0;
                    f && (b = t(f, p), "left" === p.align ? w = v : "right" === p.align && (w = -Math.max(d.axisOffset[1], -b)), f.align({
                        y: p.y,
                        width: f.getBBox().width,
                        align: p.align,
                        x: p.x + w - 2
                    }, !0, d.spacingBox), f.placed = d.hasLoaded);
                    this.handleCollision(b);
                    e.align({
                        verticalAlign: q
                    }, !0, d.spacingBox);
                    f = e.alignAttr.translateY;
                    b = e.getBBox().height + 20;
                    t = 0;
                    "bottom" === q && (t = (t = d.legend && d.legend.options) && "bottom" === t.verticalAlign && t.enabled && !t.floating ? d.legend.legendHeight + l(t.margin, 10) : 0, b = b + t - 20, t = f - b - (g.floating ? 0 : g.y) - (d.titleOffset ? d.titleOffset[2] :
                        0) - 10);
                    if ("top" === q) g.floating && (t = 0), d.titleOffset && d.titleOffset[0] && (t = d.titleOffset[0]), t += d.margin[0] - d.spacing[0] || 0;
                    else if ("middle" === q)
                        if (p.y === m.y) t = f;
                        else if (p.y || m.y) t = 0 > p.y || 0 > m.y ? t - Math.min(p.y, m.y) : f - b;
                    e.translate(g.x, g.y + Math.floor(t));
                    m = this.minInput;
                    p = this.maxInput;
                    f = this.dropdown;
                    g.inputEnabled && m && p && (m.style.marginTop = e.translateY + "px", p.style.marginTop = e.translateY + "px");
                    f && (f.style.marginTop = e.translateY + "px")
                }
            };
            d.prototype.alignButtonGroup = function(a, b) {
                var c = this.chart,
                    d =
                    this.buttonGroup,
                    e = this.options.buttonPosition,
                    f = c.plotLeft - c.spacing[3],
                    g = e.x - c.spacing[3];
                "right" === e.align ? g += a - f : "center" === e.align && (g -= f / 2);
                d && d.align({
                    y: e.y,
                    width: l(b, this.initialButtonGroupWidth),
                    align: e.align,
                    x: g
                }, !0, c.spacingBox)
            };
            d.prototype.positionButtons = function() {
                var a = this.buttons,
                    b = this.chart,
                    c = this.options,
                    d = this.zoomText,
                    e = b.hasLoaded ? "animate" : "attr",
                    f = c.buttonPosition,
                    g = b.plotLeft,
                    h = g;
                d && "hidden" !== d.visibility && (d[e]({
                    x: l(g + f.x, g)
                }), h += f.x + d.getBBox().width + 5);
                this.buttonOptions.forEach(function(b,
                    d) {
                    if ("hidden" !== a[d].visibility) a[d][e]({
                        x: h
                    }), h += a[d].width + c.buttonSpacing;
                    else a[d][e]({
                        x: g
                    })
                })
            };
            d.prototype.handleCollision = function(a) {
                var b = this,
                    c = this.chart,
                    d = this.buttonGroup,
                    e = this.inputGroup,
                    f = this.options,
                    g = f.buttonPosition,
                    h = f.dropdown,
                    k = f.inputPosition;
                f = function() {
                    var a = 0;
                    b.buttons.forEach(function(b) {
                        b = b.getBBox();
                        b.width > a && (a = b.width)
                    });
                    return a
                };
                var l = function(b) {
                        if (e && d) {
                            var c = e.alignAttr.translateX + e.alignOptions.x - a + e.getBBox().x + 2,
                                f = e.alignOptions.width,
                                h = d.alignAttr.translateX +
                                d.getBBox().x;
                            return h + b > c && c + f > h && g.y < k.y + e.getBBox().height
                        }
                        return !1
                    },
                    m = function() {
                        e && d && e.attr({
                            translateX: e.alignAttr.translateX + (c.axisOffset[1] >= -a ? 0 : -a),
                            translateY: e.alignAttr.translateY + d.getBBox().height + 10
                        })
                    };
                if (d) {
                    if ("always" === h) {
                        this.collapseButtons(a);
                        l(f()) && m();
                        return
                    }
                    "never" === h && this.expandButtons()
                }
                e && d ? k.align === g.align || l(this.initialButtonGroupWidth + 20) ? "responsive" === h ? (this.collapseButtons(a), l(f()) && m()) : m() : "responsive" === h && this.expandButtons() : d && "responsive" === h && (this.initialButtonGroupWidth >
                    c.plotWidth ? this.collapseButtons(a) : this.expandButtons())
            };
            d.prototype.collapseButtons = function(a) {
                var b = this.buttons,
                    c = this.buttonOptions,
                    d = this.chart,
                    e = this.dropdown,
                    f = this.options,
                    g = this.zoomText,
                    h = d.userOptions.rangeSelector && d.userOptions.rangeSelector.buttonTheme || {},
                    k = function(a) {
                        return {
                            text: a ? a + " \u25be" : "\u25be",
                            width: "auto",
                            paddingLeft: l(f.buttonTheme.paddingLeft, h.padding, 8),
                            paddingRight: l(f.buttonTheme.paddingRight, h.padding, 8)
                        }
                    };
                g && g.hide();
                var m = !1;
                c.forEach(function(a, c) {
                    c = b[c];
                    2 !==
                        c.state ? c.hide() : (c.show(), c.attr(k(a.text)), m = !0)
                });
                m || (e && (e.selectedIndex = 0), b[0].show(), b[0].attr(k(this.zoomText && this.zoomText.textStr)));
                c = f.buttonPosition.align;
                this.positionButtons();
                "right" !== c && "center" !== c || this.alignButtonGroup(a, b[this.currentButtonIndex()].getBBox().width);
                this.showDropdown()
            };
            d.prototype.expandButtons = function() {
                var a = this.buttons,
                    b = this.buttonOptions,
                    c = this.options,
                    d = this.zoomText;
                this.hideDropdown();
                d && d.show();
                b.forEach(function(b, d) {
                    d = a[d];
                    d.show();
                    d.attr({
                        text: b.text,
                        width: c.buttonTheme.width || 28,
                        paddingLeft: l(c.buttonTheme.paddingLeft, "unset"),
                        paddingRight: l(c.buttonTheme.paddingRight, "unset")
                    });
                    2 > d.state && d.setState(0)
                });
                this.positionButtons()
            };
            d.prototype.currentButtonIndex = function() {
                var a = this.dropdown;
                return a && 0 < a.selectedIndex ? a.selectedIndex - 1 : 0
            };
            d.prototype.showDropdown = function() {
                var a = this.buttonGroup,
                    b = this.buttons,
                    c = this.chart,
                    d = this.dropdown;
                if (a && d) {
                    var e = a.translateX;
                    a = a.translateY;
                    b = b[this.currentButtonIndex()].getBBox();
                    h(d, {
                        left: c.plotLeft +
                            e + "px",
                        top: a + .5 + "px",
                        width: b.width + "px",
                        height: b.height + "px"
                    });
                    this.hasVisibleDropdown = !0
                }
            };
            d.prototype.hideDropdown = function() {
                var a = this.dropdown;
                a && (h(a, {
                    top: "-9999em",
                    width: "1px",
                    height: "1px"
                }), this.hasVisibleDropdown = !1)
            };
            d.prototype.getHeight = function() {
                var a = this.options,
                    b = this.group,
                    c = a.y,
                    d = a.buttonPosition.y,
                    e = a.inputPosition.y;
                if (a.height) return a.height;
                this.alignElements();
                a = b ? b.getBBox(!0).height + 13 + c : 0;
                b = Math.min(e, d);
                if (0 > e && 0 > d || 0 < e && 0 < d) a += Math.abs(b);
                return a
            };
            d.prototype.titleCollision =
                function(a) {
                    return !(a.options.title.text || a.options.subtitle.text)
                };
            d.prototype.update = function(a) {
                var b = this.chart;
                J(!0, b.options.rangeSelector, a);
                this.destroy();
                this.init(b);
                this.render()
            };
            d.prototype.destroy = function() {
                var a = this,
                    b = a.minInput,
                    c = a.maxInput;
                a.eventsToUnbind && (a.eventsToUnbind.forEach(function(a) {
                    return a()
                }), a.eventsToUnbind = void 0);
                n(a.buttons);
                b && (b.onfocus = b.onblur = b.onchange = null);
                c && (c.onfocus = c.onblur = c.onchange = null);
                M(a, function(b, c) {
                    b && "chart" !== c && (b instanceof y ? b.destroy() :
                        b instanceof window.HTMLElement && z(b));
                    b !== d.prototype[c] && (a[c] = null)
                }, this)
            };
            return d
        }();
        v.prototype.defaultButtons = [{
            type: "month",
            count: 1,
            text: "1m",
            title: "View 1 month"
        }, {
            type: "month",
            count: 3,
            text: "3m",
            title: "View 3 months"
        }, {
            type: "month",
            count: 6,
            text: "6m",
            title: "View 6 months"
        }, {
            type: "ytd",
            text: "YTD",
            title: "View year to date"
        }, {
            type: "year",
            count: 1,
            text: "1y",
            title: "View 1 year"
        }, {
            type: "all",
            text: "All",
            title: "View all"
        }];
        v.prototype.inputTypeFormats = {
            "datetime-local": "%Y-%m-%dT%H:%M:%S",
            date: "%Y-%m-%d",
            time: "%H:%M:%S"
        };
        a.prototype.minFromRange = function() {
            var a = this.range,
                b = a.type,
                c = this.max,
                d = this.chart.time,
                e = function(a, c) {
                    var e = "year" === b ? "FullYear" : "Month",
                        f = new d.Date(a),
                        g = d.get(e, f);
                    d.set(e, f, g + c);
                    g === d.get(e, f) && d.set("Date", f, 0);
                    return f.getTime() - a
                };
            if (G(a)) {
                var f = c - a;
                var g = a
            } else f = c + e(c, -a.count), this.chart && (this.chart.fixedRange = c - f);
            var h = l(this.dataMin, Number.MIN_VALUE);
            G(f) || (f = h);
            f <= h && (f = h, "undefined" === typeof g && (g = e(f, a.count)), this.newMax = Math.min(f + g, this.dataMax));
            G(c) || (f =
                void 0);
            return f
        };
        if (!B.RangeSelector) {
            var d = [],
                D = function(a) {
                    function b() {
                        e && (c = a.xAxis[0].getExtremes(), g = a.legend, l = e && e.options.verticalAlign, G(c.min) && e.render(c.min, c.max), g.display && "top" === l && l === g.options.verticalAlign && (h = J(a.spacingBox), h.y = "vertical" === g.options.layout ? a.plotTop : h.y + e.getHeight(), g.group.placed = !1, g.align(h)))
                    }
                    var c, e = a.rangeSelector,
                        g, h, l;
                    e && (f(d, function(b) {
                        return b[0] === a
                    }) || d.push([a, [q(a.xAxis[0], "afterSetExtremes", function(a) {
                        e && e.render(a.min, a.max)
                    }), q(a, "redraw",
                        b)]]), b())
                };
            q(t, "afterGetContainer", function() {
                this.options.rangeSelector && this.options.rangeSelector.enabled && (this.rangeSelector = new v(this))
            });
            q(t, "beforeRender", function() {
                var a = this.axes,
                    b = this.rangeSelector;
                b && (G(b.deferredYTDClick) && (b.clickButton(b.deferredYTDClick), delete b.deferredYTDClick), a.forEach(function(a) {
                    a.updateNames();
                    a.setScale()
                }), this.getAxisMargins(), b.render(), a = b.options.verticalAlign, b.options.floating || ("bottom" === a ? this.extraBottomMargin = !0 : "middle" !== a && (this.extraTopMargin = !0)))
            });
            q(t, "update", function(a) {
                var b = a.options.rangeSelector;
                a = this.rangeSelector;
                var d = this.extraBottomMargin,
                    e = this.extraTopMargin;
                b && b.enabled && !c(a) && this.options.rangeSelector && (this.options.rangeSelector.enabled = !0, this.rangeSelector = a = new v(this));
                this.extraTopMargin = this.extraBottomMargin = !1;
                a && (D(this), b = b && b.verticalAlign || a.options && a.options.verticalAlign, a.options.floating || ("bottom" === b ? this.extraBottomMargin = !0 : "middle" !== b && (this.extraTopMargin = !0)), this.extraBottomMargin !== d || this.extraTopMargin !==
                    e) && (this.isDirtyBox = !0)
            });
            q(t, "render", function() {
                var a = this.rangeSelector;
                a && !a.options.floating && (a.render(), a = a.options.verticalAlign, "bottom" === a ? this.extraBottomMargin = !0 : "middle" !== a && (this.extraTopMargin = !0))
            });
            q(t, "getMargins", function() {
                var a = this.rangeSelector;
                a && (a = a.getHeight(), this.extraTopMargin && (this.plotTop += a), this.extraBottomMargin && (this.marginBottom += a))
            });
            t.prototype.callbacks.push(D);
            q(t, "destroy", function() {
                for (var a = 0; a < d.length; a++) {
                    var b = d[a];
                    if (b[0] === this) {
                        b[1].forEach(function(a) {
                            return a()
                        });
                        d.splice(a, 1);
                        break
                    }
                }
            });
            B.RangeSelector = v
        }
        return v
    });
    N(a, "Core/Axis/NavigatorAxis.js", [a["Core/Globals.js"], a["Core/Utilities.js"]], function(a, t) {
        var B = a.isTouchDevice,
            E = t.addEvent,
            y = t.correctFloat,
            F = t.defined,
            I = t.isNumber,
            x = t.pick,
            q = function() {
                function a(a) {
                    this.axis = a
                }
                a.prototype.destroy = function() {
                    this.axis = void 0
                };
                a.prototype.toFixedRange = function(a, c, m, q) {
                    var g = this.axis,
                        f = g.chart;
                    f = f && f.fixedRange;
                    var e = (g.pointRange || 0) / 2;
                    a = x(m, g.translate(a, !0, !g.horiz));
                    c = x(q, g.translate(c, !0, !g.horiz));
                    g = f && (c - a) / f;
                    F(m) || (a = y(a + e));
                    F(q) || (c = y(c - e));
                    .7 < g && 1.3 > g && (q ? a = c - f : c = a + f);
                    I(a) && I(c) || (a = c = void 0);
                    return {
                        min: a,
                        max: c
                    }
                };
                return a
            }();
        return function() {
            function a() {}
            a.compose = function(a) {
                a.keepProps.push("navigatorAxis");
                E(a, "init", function() {
                    this.navigatorAxis || (this.navigatorAxis = new q(this))
                });
                E(a, "zoom", function(a) {
                    var c = this.chart.options,
                        h = c.navigator,
                        g = this.navigatorAxis,
                        f = c.chart.pinchType,
                        e = c.rangeSelector;
                    c = c.chart.zoomType;
                    this.isXAxis && (h && h.enabled || e && e.enabled) && ("y" === c ? a.zoomed = !1 : (!B && "xy" === c || B && "xy" === f) && this.options.range && (h = g.previousZoom, F(a.newMin) ? g.previousZoom = [this.min, this.max] : h && (a.newMin = h[0], a.newMax = h[1], g.previousZoom = void 0)));
                    "undefined" !== typeof a.zoomed && a.preventDefault()
                })
            };
            a.AdditionsClass = q;
            return a
        }()
    });
    N(a, "Core/Navigator.js", [a["Core/Axis/Axis.js"], a["Core/Chart/Chart.js"], a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Axis/NavigatorAxis.js"], a["Core/DefaultOptions.js"], a["Core/Renderer/RendererRegistry.js"], a["Core/Scrollbar.js"],
        a["Core/Series/Series.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]
    ], function(a, t, B, H, y, F, I, x, q, m, h) {
        B = B.parse;
        var c = H.hasTouch,
            n = H.isTouchDevice,
            z = F.defaultOptions,
            g = h.addEvent,
            f = h.clamp,
            e = h.correctFloat,
            E = h.defined,
            J = h.destroyObjectProperties,
            M = h.erase,
            p = h.extend,
            l = h.find,
            w = h.isArray,
            b = h.isNumber,
            v = h.merge,
            d = h.pick,
            D = h.removeEvent,
            C = h.splat,
            k = function(a) {
                for (var c = [], d = 1; d < arguments.length; d++) c[d - 1] = arguments[d];
                c = [].filter.call(c, b);
                if (c.length) return Math[a].apply(0, c)
            };
        F = "undefined" ===
            typeof m.seriesTypes.areaspline ? "line" : "areaspline";
        p(z, {
            navigator: {
                height: 40,
                margin: 25,
                maskInside: !0,
                handles: {
                    width: 7,
                    height: 15,
                    symbols: ["navigator-handle", "navigator-handle"],
                    enabled: !0,
                    lineWidth: 1,
                    backgroundColor: "#f2f2f2",
                    borderColor: "#999999"
                },
                maskFill: B("#6685c2").setOpacity(.3).get(),
                outlineColor: "#cccccc",
                outlineWidth: 1,
                series: {
                    type: F,
                    fillOpacity: .05,
                    lineWidth: 1,
                    compare: null,
                    dataGrouping: {
                        approximation: "average",
                        enabled: !0,
                        groupPixelWidth: 2,
                        firstAnchor: "firstPoint",
                        anchor: "middle",
                        lastAnchor: "lastPoint",
                        units: [
                            ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                            ["second", [1, 2, 5, 10, 15, 30]],
                            ["minute", [1, 2, 5, 10, 15, 30]],
                            ["hour", [1, 2, 3, 4, 6, 8, 12]],
                            ["day", [1, 2, 3, 4]],
                            ["week", [1, 2, 3]],
                            ["month", [1, 3, 6]],
                            ["year", null]
                        ]
                    },
                    dataLabels: {
                        enabled: !1,
                        zIndex: 2
                    },
                    id: "highcharts-navigator-series",
                    className: "highcharts-navigator-series",
                    lineColor: null,
                    marker: {
                        enabled: !1
                    },
                    threshold: null
                },
                xAxis: {
                    overscroll: 0,
                    className: "highcharts-navigator-xaxis",
                    tickLength: 0,
                    lineWidth: 0,
                    gridLineColor: "#e6e6e6",
                    gridLineWidth: 1,
                    tickPixelInterval: 200,
                    labels: {
                        align: "left",
                        style: {
                            color: "#999999"
                        },
                        x: 3,
                        y: -4
                    },
                    crosshair: !1
                },
                yAxis: {
                    className: "highcharts-navigator-yaxis",
                    gridLineWidth: 0,
                    startOnTick: !1,
                    endOnTick: !1,
                    minPadding: .1,
                    maxPadding: .1,
                    labels: {
                        enabled: !1
                    },
                    crosshair: !1,
                    title: {
                        text: null
                    },
                    tickLength: 0,
                    tickWidth: 0
                }
            }
        });
        I.getRendererType().prototype.symbols["navigator-handle"] = function(a, b, c, d, e) {
            a = (e && e.width || 0) / 2;
            b = Math.round(a / 3) + .5;
            e = e && e.height || 0;
            return [
                ["M", -a - 1, .5],
                ["L", a, .5],
                ["L", a, e + .5],
                ["L", -a - 1, e + .5],
                ["L", -a - 1, .5],
                ["M", -b, 4],
                ["L", -b, e - 3],
                ["M", b - 1, 4],
                ["L", b - 1, e - 3]
            ]
        };
        var K = function() {
            function h(a) {
                this.zoomedMin = this.zoomedMax = this.yAxis = this.xAxis = this.top = this.size = this.shades = this.rendered = this.range = this.outlineHeight = this.outline = this.opposite = this.navigatorSize = this.navigatorSeries = this.navigatorOptions = this.navigatorGroup = this.navigatorEnabled = this.left = this.height = this.handles = this.chart = this.baseSeries = void 0;
                this.init(a)
            }
            h.prototype.drawHandle = function(a, b, c, d) {
                var e = this.navigatorOptions.handles.height;
                this.handles[b][d](c ? {
                    translateX: Math.round(this.left + this.height / 2),
                    translateY: Math.round(this.top + parseInt(a, 10) + .5 - e)
                } : {
                    translateX: Math.round(this.left + parseInt(a, 10)),
                    translateY: Math.round(this.top + this.height / 2 - e / 2 - 1)
                })
            };
            h.prototype.drawOutline = function(a, b, c, d) {
                var e = this.navigatorOptions.maskInside,
                    f = this.outline.strokeWidth(),
                    g = f / 2,
                    h = f % 2 / 2;
                f = this.outlineHeight;
                var k = this.scrollbarHeight || 0,
                    l = this.size,
                    m = this.left - k,
                    n = this.top;
                c ? (m -= g, c = n + b + h, b = n + a + h, h = [
                    ["M", m + f, n - k - h],
                    ["L", m + f, c],
                    ["L", m, c],
                    ["L", m, b],
                    ["L", m + f,
                        b
                    ],
                    ["L", m + f, n + l + k]
                ], e && h.push(["M", m + f, c - g], ["L", m + f, b + g])) : (a += m + k - h, b += m + k - h, n += g, h = [
                    ["M", m, n],
                    ["L", a, n],
                    ["L", a, n + f],
                    ["L", b, n + f],
                    ["L", b, n],
                    ["L", m + l + 2 * k, n]
                ], e && h.push(["M", a - g, n], ["L", b + g, n]));
                this.outline[d]({
                    d: h
                })
            };
            h.prototype.drawMasks = function(a, b, c, d) {
                var e = this.left,
                    f = this.top,
                    g = this.height;
                if (c) {
                    var h = [e, e, e];
                    var k = [f, f + a, f + b];
                    var l = [g, g, g];
                    var m = [a, b - a, this.size - b]
                } else h = [e, e + a, e + b], k = [f, f, f], l = [a, b - a, this.size - b], m = [g, g, g];
                this.shades.forEach(function(a, b) {
                    a[d]({
                        x: h[b],
                        y: k[b],
                        width: l[b],
                        height: m[b]
                    })
                })
            };
            h.prototype.renderElements = function() {
                var a = this,
                    b = a.navigatorOptions,
                    c = b.maskInside,
                    d = a.chart,
                    e = d.renderer,
                    f, g = {
                        cursor: d.inverted ? "ns-resize" : "ew-resize"
                    };
                a.navigatorGroup = f = e.g("navigator").attr({
                    zIndex: 8,
                    visibility: "hidden"
                }).add();
                [!c, c, !c].forEach(function(c, h) {
                    a.shades[h] = e.rect().addClass("highcharts-navigator-mask" + (1 === h ? "-inside" : "-outside")).add(f);
                    d.styledMode || a.shades[h].attr({
                        fill: c ? b.maskFill : "rgba(0,0,0,0)"
                    }).css(1 === h && g)
                });
                a.outline = e.path().addClass("highcharts-navigator-outline").add(f);
                d.styledMode || a.outline.attr({
                    "stroke-width": b.outlineWidth,
                    stroke: b.outlineColor
                });
                b.handles.enabled && [0, 1].forEach(function(c) {
                    b.handles.inverted = d.inverted;
                    a.handles[c] = e.symbol(b.handles.symbols[c], -b.handles.width / 2 - 1, 0, b.handles.width, b.handles.height, b.handles);
                    a.handles[c].attr({
                        zIndex: 7 - c
                    }).addClass("highcharts-navigator-handle highcharts-navigator-handle-" + ["left", "right"][c]).add(f);
                    if (!d.styledMode) {
                        var h = b.handles;
                        a.handles[c].attr({
                            fill: h.backgroundColor,
                            stroke: h.borderColor,
                            "stroke-width": h.lineWidth
                        }).css(g)
                    }
                })
            };
            h.prototype.update = function(a) {
                (this.series || []).forEach(function(a) {
                    a.baseSeries && delete a.baseSeries.navigatorSeries
                });
                this.destroy();
                v(!0, this.chart.options.navigator, this.options, a);
                this.init(this.chart)
            };
            h.prototype.render = function(a, c, g, h) {
                var k = this.chart,
                    l = this.scrollbarHeight,
                    m, n = this.xAxis,
                    r = n.pointRange || 0;
                var p = n.navigatorAxis.fake ? k.xAxis[0] : n;
                var q = this.navigatorEnabled,
                    t, v = this.rendered;
                var A = k.inverted;
                var w = k.xAxis[0].minRange,
                    x = k.xAxis[0].options.maxRange;
                if (!this.hasDragged || E(g)) {
                    a =
                        e(a - r / 2);
                    c = e(c + r / 2);
                    if (!b(a) || !b(c))
                        if (v) g = 0, h = d(n.width, p.width);
                        else return;
                    this.left = d(n.left, k.plotLeft + l + (A ? k.plotWidth : 0));
                    this.size = t = m = d(n.len, (A ? k.plotHeight : k.plotWidth) - 2 * l);
                    k = A ? l : m + 2 * l;
                    g = d(g, n.toPixels(a, !0));
                    h = d(h, n.toPixels(c, !0));
                    b(g) && Infinity !== Math.abs(g) || (g = 0, h = k);
                    a = n.toValue(g, !0);
                    c = n.toValue(h, !0);
                    var y = Math.abs(e(c - a));
                    y < w ? this.grabbedLeft ? g = n.toPixels(c - w - r, !0) : this.grabbedRight && (h = n.toPixels(a + w + r, !0)) : E(x) && e(y - r) > x && (this.grabbedLeft ? g = n.toPixels(c - x - r, !0) : this.grabbedRight &&
                        (h = n.toPixels(a + x + r, !0)));
                    this.zoomedMax = f(Math.max(g, h), 0, t);
                    this.zoomedMin = f(this.fixedWidth ? this.zoomedMax - this.fixedWidth : Math.min(g, h), 0, t);
                    this.range = this.zoomedMax - this.zoomedMin;
                    t = Math.round(this.zoomedMax);
                    g = Math.round(this.zoomedMin);
                    q && (this.navigatorGroup.attr({
                        visibility: "visible"
                    }), v = v && !this.hasDragged ? "animate" : "attr", this.drawMasks(g, t, A, v), this.drawOutline(g, t, A, v), this.navigatorOptions.handles.enabled && (this.drawHandle(g, 0, A, v), this.drawHandle(t, 1, A, v)));
                    this.scrollbar && (A ? (A = this.top -
                        l, p = this.left - l + (q || !p.opposite ? 0 : (p.titleOffset || 0) + p.axisTitleMargin), l = m + 2 * l) : (A = this.top + (q ? this.height : -l), p = this.left - l), this.scrollbar.position(p, A, k, l), this.scrollbar.setRange(this.zoomedMin / (m || 1), this.zoomedMax / (m || 1)));
                    this.rendered = !0
                }
            };
            h.prototype.addMouseEvents = function() {
                var a = this,
                    b = a.chart,
                    d = b.container,
                    e = [],
                    f, h;
                a.mouseMoveHandler = f = function(b) {
                    a.onMouseMove(b)
                };
                a.mouseUpHandler = h = function(b) {
                    a.onMouseUp(b)
                };
                e = a.getPartsEvents("mousedown");
                e.push(g(b.renderTo, "mousemove", f), g(d.ownerDocument,
                    "mouseup", h));
                c && (e.push(g(b.renderTo, "touchmove", f), g(d.ownerDocument, "touchend", h)), e.concat(a.getPartsEvents("touchstart")));
                a.eventsToUnbind = e;
                a.series && a.series[0] && e.push(g(a.series[0].xAxis, "foundExtremes", function() {
                    b.navigator.modifyNavigatorAxisExtremes()
                }))
            };
            h.prototype.getPartsEvents = function(a) {
                var b = this,
                    c = [];
                ["shades", "handles"].forEach(function(d) {
                    b[d].forEach(function(e, f) {
                        c.push(g(e.element, a, function(a) {
                            b[d + "Mousedown"](a, f)
                        }))
                    })
                });
                return c
            };
            h.prototype.shadesMousedown = function(a,
                b) {
                a = this.chart.pointer.normalize(a);
                var c = this.chart,
                    d = this.xAxis,
                    e = this.zoomedMin,
                    f = this.left,
                    g = this.size,
                    h = this.range,
                    k = a.chartX;
                c.inverted && (k = a.chartY, f = this.top);
                if (1 === b) this.grabbedCenter = k, this.fixedWidth = h, this.dragOffset = k - e;
                else {
                    a = k - f - h / 2;
                    if (0 === b) a = Math.max(0, a);
                    else if (2 === b && a + h >= g)
                        if (a = g - h, this.reversedExtremes) {
                            a -= h;
                            var l = this.getUnionExtremes().dataMin
                        } else var m = this.getUnionExtremes().dataMax;
                    a !== e && (this.fixedWidth = h, b = d.navigatorAxis.toFixedRange(a, a + h, l, m), E(b.min) && c.xAxis[0].setExtremes(Math.min(b.min,
                        b.max), Math.max(b.min, b.max), !0, null, {
                        trigger: "navigator"
                    }))
                }
            };
            h.prototype.handlesMousedown = function(a, b) {
                this.chart.pointer.normalize(a);
                a = this.chart;
                var c = a.xAxis[0],
                    d = this.reversedExtremes;
                0 === b ? (this.grabbedLeft = !0, this.otherHandlePos = this.zoomedMax, this.fixedExtreme = d ? c.min : c.max) : (this.grabbedRight = !0, this.otherHandlePos = this.zoomedMin, this.fixedExtreme = d ? c.max : c.min);
                a.fixedRange = null
            };
            h.prototype.onMouseMove = function(a) {
                var b = this,
                    c = b.chart,
                    e = b.left,
                    f = b.navigatorSize,
                    g = b.range,
                    h = b.dragOffset,
                    k = c.inverted;
                a.touches && 0 === a.touches[0].pageX || (a = c.pointer.normalize(a), c = a.chartX, k && (e = b.top, c = a.chartY), b.grabbedLeft ? (b.hasDragged = !0, b.render(0, 0, c - e, b.otherHandlePos)) : b.grabbedRight ? (b.hasDragged = !0, b.render(0, 0, b.otherHandlePos, c - e)) : b.grabbedCenter && (b.hasDragged = !0, c < h ? c = h : c > f + h - g && (c = f + h - g), b.render(0, 0, c - h, c - h + g)), b.hasDragged && b.scrollbar && d(b.scrollbar.options.liveRedraw, H.svg && !n && !this.chart.isBoosting) && (a.DOMType = a.type, setTimeout(function() {
                    b.onMouseUp(a)
                }, 0)))
            };
            h.prototype.onMouseUp =
                function(a) {
                    var c = this.chart,
                        d = this.xAxis,
                        e = this.scrollbar,
                        f = a.DOMEvent || a,
                        g = c.inverted,
                        h = this.rendered && !this.hasDragged ? "animate" : "attr";
                    if (this.hasDragged && (!e || !e.hasDragged) || "scrollbar" === a.trigger) {
                        e = this.getUnionExtremes();
                        if (this.zoomedMin === this.otherHandlePos) var k = this.fixedExtreme;
                        else if (this.zoomedMax === this.otherHandlePos) var l = this.fixedExtreme;
                        this.zoomedMax === this.size && (l = this.reversedExtremes ? e.dataMin : e.dataMax);
                        0 === this.zoomedMin && (k = this.reversedExtremes ? e.dataMax : e.dataMin);
                        d = d.navigatorAxis.toFixedRange(this.zoomedMin, this.zoomedMax, k, l);
                        E(d.min) && c.xAxis[0].setExtremes(Math.min(d.min, d.max), Math.max(d.min, d.max), !0, this.hasDragged ? !1 : null, {
                            trigger: "navigator",
                            triggerOp: "navigator-drag",
                            DOMEvent: f
                        })
                    }
                    "mousemove" !== a.DOMType && "touchmove" !== a.DOMType && (this.grabbedLeft = this.grabbedRight = this.grabbedCenter = this.fixedWidth = this.fixedExtreme = this.otherHandlePos = this.hasDragged = this.dragOffset = null);
                    this.navigatorEnabled && b(this.zoomedMin) && b(this.zoomedMax) && (c = Math.round(this.zoomedMin),
                        a = Math.round(this.zoomedMax), this.shades && this.drawMasks(c, a, g, h), this.outline && this.drawOutline(c, a, g, h), this.navigatorOptions.handles.enabled && Object.keys(this.handles).length === this.handles.length && (this.drawHandle(c, 0, g, h), this.drawHandle(a, 1, g, h)))
                };
            h.prototype.removeEvents = function() {
                this.eventsToUnbind && (this.eventsToUnbind.forEach(function(a) {
                    a()
                }), this.eventsToUnbind = void 0);
                this.removeBaseSeriesEvents()
            };
            h.prototype.removeBaseSeriesEvents = function() {
                var a = this.baseSeries || [];
                this.navigatorEnabled &&
                    a[0] && (!1 !== this.navigatorOptions.adaptToUpdatedData && a.forEach(function(a) {
                        D(a, "updatedData", this.updatedDataHandler)
                    }, this), a[0].xAxis && D(a[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes))
            };
            h.prototype.init = function(b) {
                var c = b.options,
                    e = c.navigator,
                    f = e.enabled,
                    h = c.scrollbar,
                    l = h.enabled;
                c = f ? e.height : 0;
                var m = l ? h.height : 0;
                this.handles = [];
                this.shades = [];
                this.chart = b;
                this.setBaseSeries();
                this.height = c;
                this.scrollbarHeight = m;
                this.scrollbarEnabled = l;
                this.navigatorEnabled = f;
                this.navigatorOptions =
                    e;
                this.scrollbarOptions = h;
                this.outlineHeight = c + m;
                this.opposite = d(e.opposite, !(f || !b.inverted));
                var n = this;
                f = n.baseSeries;
                h = b.xAxis.length;
                l = b.yAxis.length;
                var p = f && f[0] && f[0].xAxis || b.xAxis[0] || {
                    options: {}
                };
                b.isDirtyBox = !0;
                n.navigatorEnabled ? (n.xAxis = new a(b, v({
                            breaks: p.options.breaks,
                            ordinal: p.options.ordinal
                        }, e.xAxis, {
                            id: "navigator-x-axis",
                            yAxis: "navigator-y-axis",
                            isX: !0,
                            type: "datetime",
                            index: h,
                            isInternal: !0,
                            offset: 0,
                            keepOrdinalPadding: !0,
                            startOnTick: !1,
                            endOnTick: !1,
                            minPadding: 0,
                            maxPadding: 0,
                            zoomEnabled: !1
                        },
                        b.inverted ? {
                            offsets: [m, 0, -m, 0],
                            width: c
                        } : {
                            offsets: [0, -m, 0, m],
                            height: c
                        })), n.yAxis = new a(b, v(e.yAxis, {
                        id: "navigator-y-axis",
                        alignTicks: !1,
                        offset: 0,
                        index: l,
                        isInternal: !0,
                        reversed: d(e.yAxis && e.yAxis.reversed, b.yAxis[0] && b.yAxis[0].reversed, !1),
                        zoomEnabled: !1
                    }, b.inverted ? {
                        width: c
                    } : {
                        height: c
                    })), f || e.series.data ? n.updateNavigatorSeries(!1) : 0 === b.series.length && (n.unbindRedraw = g(b, "beforeRedraw", function() {
                        0 < b.series.length && !n.series && (n.setBaseSeries(), n.unbindRedraw())
                    })), n.reversedExtremes = b.inverted &&
                    !n.xAxis.reversed || !b.inverted && n.xAxis.reversed, n.renderElements(), n.addMouseEvents()) : (n.xAxis = {
                    chart: b,
                    navigatorAxis: {
                        fake: !0
                    },
                    translate: function(a, c) {
                        var d = b.xAxis[0],
                            e = d.getExtremes(),
                            f = d.len - 2 * m,
                            g = k("min", d.options.min, e.dataMin);
                        d = k("max", d.options.max, e.dataMax) - g;
                        return c ? a * d / f + g : f * (a - g) / d
                    },
                    toPixels: function(a) {
                        return this.translate(a)
                    },
                    toValue: function(a) {
                        return this.translate(a, !0)
                    }
                }, n.xAxis.navigatorAxis.axis = n.xAxis, n.xAxis.navigatorAxis.toFixedRange = y.AdditionsClass.prototype.toFixedRange.bind(n.xAxis.navigatorAxis));
                b.options.scrollbar.enabled && (b.scrollbar = n.scrollbar = new x(b.renderer, v(b.options.scrollbar, {
                    margin: n.navigatorEnabled ? 0 : 10,
                    vertical: b.inverted
                }), b), g(n.scrollbar, "changed", function(a) {
                    var b = n.size,
                        c = b * this.to;
                    b *= this.from;
                    n.hasDragged = n.scrollbar.hasDragged;
                    n.render(0, 0, b, c);
                    this.shouldUpdateExtremes(a.DOMType) && setTimeout(function() {
                        n.onMouseUp(a)
                    })
                }));
                n.addBaseSeriesEvents();
                n.addChartEvents()
            };
            h.prototype.getUnionExtremes = function(a) {
                var b = this.chart.xAxis[0],
                    c = this.xAxis,
                    e = c.options,
                    f = b.options,
                    g;
                a && null === b.dataMin || (g = {
                    dataMin: d(e && e.min, k("min", f.min, b.dataMin, c.dataMin, c.min)),
                    dataMax: d(e && e.max, k("max", f.max, b.dataMax, c.dataMax, c.max))
                });
                return g
            };
            h.prototype.setBaseSeries = function(a, b) {
                var c = this.chart,
                    d = this.baseSeries = [];
                a = a || c.options && c.options.navigator.baseSeries || (c.series.length ? l(c.series, function(a) {
                    return !a.options.isInternal
                }).index : 0);
                (c.series || []).forEach(function(b, c) {
                    b.options.isInternal || !b.options.showInNavigator && (c !== a && b.options.id !== a || !1 === b.options.showInNavigator) ||
                        d.push(b)
                });
                this.xAxis && !this.xAxis.navigatorAxis.fake && this.updateNavigatorSeries(!0, b)
            };
            h.prototype.updateNavigatorSeries = function(a, b) {
                var c = this,
                    e = c.chart,
                    f = c.baseSeries,
                    g, h, k = c.navigatorOptions.series,
                    l, m = {
                        enableMouseTracking: !1,
                        index: null,
                        linkedTo: null,
                        group: "nav",
                        padXAxis: !1,
                        xAxis: "navigator-x-axis",
                        yAxis: "navigator-y-axis",
                        showInLegend: !1,
                        stacking: void 0,
                        isInternal: !0,
                        states: {
                            inactive: {
                                opacity: 1
                            }
                        }
                    },
                    n = c.series = (c.series || []).filter(function(a) {
                        var b = a.baseSeries;
                        return 0 > f.indexOf(b) ? (b && (D(b,
                            "updatedData", c.updatedDataHandler), delete b.navigatorSeries), a.chart && a.destroy(), !1) : !0
                    });
                f && f.length && f.forEach(function(a) {
                    var r = a.navigatorSeries,
                        q = p({
                            color: a.color,
                            visible: a.visible
                        }, w(k) ? z.navigator.series : k);
                    r && !1 === c.navigatorOptions.adaptToUpdatedData || (m.name = "Navigator " + f.length, g = a.options || {}, l = g.navigatorOptions || {}, q.dataLabels = C(q.dataLabels), h = v(g, m, q, l), h.pointRange = d(q.pointRange, l.pointRange, z.plotOptions[h.type || "line"].pointRange), q = l.data || q.data, c.hasNavigatorData = c.hasNavigatorData ||
                        !!q, h.data = q || g.data && g.data.slice(0), r && r.options ? r.update(h, b) : (a.navigatorSeries = e.initSeries(h), a.navigatorSeries.baseSeries = a, n.push(a.navigatorSeries)))
                });
                if (k.data && (!f || !f.length) || w(k)) c.hasNavigatorData = !1, k = C(k), k.forEach(function(a, b) {
                    m.name = "Navigator " + (n.length + 1);
                    h = v(z.navigator.series, {
                        color: e.series[b] && !e.series[b].options.isInternal && e.series[b].color || e.options.colors[b] || e.options.colors[0]
                    }, m, a);
                    h.data = a.data;
                    h.data && (c.hasNavigatorData = !0, n.push(e.initSeries(h)))
                });
                a && this.addBaseSeriesEvents()
            };
            h.prototype.addBaseSeriesEvents = function() {
                var a = this,
                    b = a.baseSeries || [];
                b[0] && b[0].xAxis && b[0].eventsToUnbind.push(g(b[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes));
                b.forEach(function(b) {
                    b.eventsToUnbind.push(g(b, "show", function() {
                        this.navigatorSeries && this.navigatorSeries.setVisible(!0, !1)
                    }));
                    b.eventsToUnbind.push(g(b, "hide", function() {
                        this.navigatorSeries && this.navigatorSeries.setVisible(!1, !1)
                    }));
                    !1 !== this.navigatorOptions.adaptToUpdatedData && b.xAxis && b.eventsToUnbind.push(g(b, "updatedData",
                        this.updatedDataHandler));
                    b.eventsToUnbind.push(g(b, "remove", function() {
                        this.navigatorSeries && (M(a.series, this.navigatorSeries), E(this.navigatorSeries.options) && this.navigatorSeries.remove(!1), delete this.navigatorSeries)
                    }))
                }, this)
            };
            h.prototype.getBaseSeriesMin = function(a) {
                return this.baseSeries.reduce(function(a, b) {
                    return Math.min(a, b.xData ? b.xData[0] : a)
                }, a)
            };
            h.prototype.modifyNavigatorAxisExtremes = function() {
                var a = this.xAxis,
                    b;
                "undefined" !== typeof a.getExtremes && (!(b = this.getUnionExtremes(!0)) ||
                    b.dataMin === a.min && b.dataMax === a.max || (a.min = b.dataMin, a.max = b.dataMax))
            };
            h.prototype.modifyBaseAxisExtremes = function() {
                var a = this.chart.navigator,
                    c = this.getExtremes(),
                    e = c.dataMin,
                    f = c.dataMax;
                c = c.max - c.min;
                var g = a.stickToMin,
                    h = a.stickToMax,
                    k = d(this.options.overscroll, 0),
                    l = a.series && a.series[0],
                    m = !!this.setExtremes;
                if (!this.eventArgs || "rangeSelectorButton" !== this.eventArgs.trigger) {
                    if (g) {
                        var n = e;
                        var p = n + c
                    }
                    h && (p = f + k, g || (n = Math.max(e, p - c, a.getBaseSeriesMin(l && l.xData ? l.xData[0] : -Number.MAX_VALUE))));
                    m && (g || h) && b(n) && (this.min = this.userMin = n, this.max = this.userMax = p)
                }
                a.stickToMin = a.stickToMax = null
            };
            h.prototype.updatedDataHandler = function() {
                var a = this.chart.navigator,
                    b = this.navigatorSeries;
                a.stickToMax = a.reversedExtremes ? 0 === Math.round(a.zoomedMin) : Math.round(a.zoomedMax) >= Math.round(a.size);
                a.stickToMin = a.shouldStickToMin(this, a);
                b && !a.hasNavigatorData && (b.options.pointStart = this.xData[0], b.setData(this.options.data, !1, null, !1))
            };
            h.prototype.shouldStickToMin = function(a, c) {
                c = c.getBaseSeriesMin(a.xData[0]);
                var d = a.xAxis;
                a = d.max;
                var e = d.min;
                d = d.options.range;
                return b(a) && b(e) ? d && 0 < a - c ? a - c < d : e <= c : !1
            };
            h.prototype.addChartEvents = function() {
                this.eventsToUnbind || (this.eventsToUnbind = []);
                this.eventsToUnbind.push(g(this.chart, "redraw", function() {
                    var a = this.navigator,
                        b = a && (a.baseSeries && a.baseSeries[0] && a.baseSeries[0].xAxis || this.xAxis[0]);
                    b && a.render(b.min, b.max)
                }), g(this.chart, "getMargins", function() {
                    var a = this.navigator,
                        b = a.opposite ? "plotTop" : "marginBottom";
                    this.inverted && (b = a.opposite ? "marginRight" : "plotLeft");
                    this[b] = (this[b] || 0) + (a.navigatorEnabled || !this.inverted ? a.outlineHeight : 0) + a.navigatorOptions.margin
                }))
            };
            h.prototype.destroy = function() {
                this.removeEvents();
                this.xAxis && (M(this.chart.xAxis, this.xAxis), M(this.chart.axes, this.xAxis));
                this.yAxis && (M(this.chart.yAxis, this.yAxis), M(this.chart.axes, this.yAxis));
                (this.series || []).forEach(function(a) {
                    a.destroy && a.destroy()
                });
                "series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" ").forEach(function(a) {
                    this[a] &&
                        this[a].destroy && this[a].destroy();
                    this[a] = null
                }, this);
                [this.handles].forEach(function(a) {
                    J(a)
                }, this)
            };
            return h
        }();
        H.Navigator || (H.Navigator = K, y.compose(a), g(t, "beforeShowResetZoom", function() {
            var a = this.options,
                b = a.navigator,
                c = a.rangeSelector;
            if ((b && b.enabled || c && c.enabled) && (!n && "x" === a.chart.zoomType || n && "x" === a.chart.pinchType)) return !1
        }), g(t, "beforeRender", function() {
            var a = this.options;
            if (a.navigator.enabled || a.scrollbar.enabled) this.scroller = this.navigator = new K(this)
        }), g(t, "afterSetChartSize",
            function() {
                var a = this.legend,
                    b = this.navigator;
                if (b) {
                    var c = a && a.options;
                    var e = b.xAxis;
                    var f = b.yAxis;
                    var g = b.scrollbarHeight;
                    this.inverted ? (b.left = b.opposite ? this.chartWidth - g - b.height : this.spacing[3] + g, b.top = this.plotTop + g) : (b.left = d(e.left, this.plotLeft + g), b.top = b.navigatorOptions.top || this.chartHeight - b.height - g - this.spacing[2] - (this.rangeSelector && this.extraBottomMargin ? this.rangeSelector.getHeight() : 0) - (c && "bottom" === c.verticalAlign && "proximate" !== c.layout && c.enabled && !c.floating ? a.legendHeight +
                        d(c.margin, 10) : 0) - (this.titleOffset ? this.titleOffset[2] : 0));
                    e && f && (this.inverted ? e.options.left = f.options.left = b.left : e.options.top = f.options.top = b.top, e.setAxisSize(), f.setAxisSize())
                }
            }), g(t, "update", function(a) {
            var b = a.options.navigator || {},
                c = a.options.scrollbar || {};
            this.navigator || this.scroller || !b.enabled && !c.enabled || (v(!0, this.options.navigator, b), v(!0, this.options.scrollbar, c), delete a.options.navigator, delete a.options.scrollbar)
        }), g(t, "afterUpdate", function(a) {
            this.navigator || this.scroller ||
                !this.options.navigator.enabled && !this.options.scrollbar.enabled || (this.scroller = this.navigator = new K(this), d(a.redraw, !0) && this.redraw(a.animation))
        }), g(t, "afterAddSeries", function() {
            this.navigator && this.navigator.setBaseSeries(null, !1)
        }), g(q, "afterUpdate", function() {
            this.chart.navigator && !this.options.isInternal && this.chart.navigator.setBaseSeries(null, !1)
        }), t.prototype.callbacks.push(function(a) {
            var b = a.navigator;
            b && a.xAxis[0] && (a = a.xAxis[0].getExtremes(), b.render(a.min, a.max))
        }));
        H.Navigator =
            K;
        return H.Navigator
    });
    N(a, "masters/modules/gantt.src.js", [a["Core/Globals.js"], a["Core/Chart/GanttChart.js"], a["Core/Scrollbar.js"]], function(a, t, B) {
        a.Scrollbar = B;
        a.GanttChart = t;
        a.ganttChart = t.ganttChart;
        B.compose(a.Axis)
    });
    N(a, "masters/highcharts-gantt.src.js", [a["masters/highcharts.src.js"]], function(a) {
        a.product = "Highcharts Gantt";
        return a
    });
    a["masters/highcharts-gantt.src.js"]._modules = a;
    return a["masters/highcharts-gantt.src.js"]
});
//# sourceMappingURL=highcharts-gantt.js.map