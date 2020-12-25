! function(t) {
    var e = {};

    function n(r) {
        if (e[r]) return e[r].exports;
        var o = e[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    n.m = t, n.c = e, n.d = function(t, e, r) {
        n.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: r
        })
    }, n.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, n.t = function(t, e) {
        if (1 & e && (t = n(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var o in t) n.d(r, o, function(e) {
                return t[e]
            }.bind(null, o));
        return r
    }, n.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return n.d(e, "a", e), e
    }, n.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, n.p = "", n(n.s = 73)
}([function(t, e, n) {
    var r, o = n(42),
        i = n(22),
        s = n(44),
        a = n(45),
        c = n(46);
    "undefined" != typeof ArrayBuffer && (r = n(47));
    var u = "undefined" != typeof navigator && /Android/i.test(navigator.userAgent),
        h = "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent),
        f = u || h;
    e.protocol = 3;
    var p = e.packets = {
            open: 0,
            close: 1,
            ping: 2,
            pong: 3,
            message: 4,
            upgrade: 5,
            noop: 6
        },
        l = o(p),
        d = {
            type: "error",
            data: "parser error"
        },
        y = n(48);

    function g(t, e, n) {
        for (var r = new Array(t.length), o = a(t.length, n), i = function(t, n, o) {
                e(n, (function(e, n) {
                    r[t] = n, o(e, r)
                }))
            }, s = 0; s < t.length; s++) i(s, t[s], o)
    }
    e.encodePacket = function(t, n, r, o) {
        "function" == typeof n && (o = n, n = !1), "function" == typeof r && (o = r, r = null);
        var i = void 0 === t.data ? void 0 : t.data.buffer || t.data;
        if ("undefined" != typeof ArrayBuffer && i instanceof ArrayBuffer) return function(t, n, r) {
            if (!n) return e.encodeBase64Packet(t, r);
            var o = t.data,
                i = new Uint8Array(o),
                s = new Uint8Array(1 + o.byteLength);
            s[0] = p[t.type];
            for (var a = 0; a < i.length; a++) s[a + 1] = i[a];
            return r(s.buffer)
        }(t, n, o);
        if (void 0 !== y && i instanceof y) return function(t, n, r) {
            if (!n) return e.encodeBase64Packet(t, r);
            if (f) return function(t, n, r) {
                if (!n) return e.encodeBase64Packet(t, r);
                var o = new FileReader;
                return o.onload = function() {
                    e.encodePacket({
                        type: t.type,
                        data: o.result
                    }, n, !0, r)
                }, o.readAsArrayBuffer(t.data)
            }(t, n, r);
            var o = new Uint8Array(1);
            o[0] = p[t.type];
            var i = new y([o.buffer, t.data]);
            return r(i)
        }(t, n, o);
        if (i && i.base64) return function(t, n) {
            var r = "b" + e.packets[t.type] + t.data.data;
            return n(r)
        }(t, o);
        var s = p[t.type];
        return void 0 !== t.data && (s += r ? c.encode(String(t.data), {
            strict: !1
        }) : String(t.data)), o("" + s)
    }, e.encodeBase64Packet = function(t, n) {
        var r, o = "b" + e.packets[t.type];
        if (void 0 !== y && t.data instanceof y) {
            var i = new FileReader;
            return i.onload = function() {
                var t = i.result.split(",")[1];
                n(o + t)
            }, i.readAsDataURL(t.data)
        }
        try {
            r = String.fromCharCode.apply(null, new Uint8Array(t.data))
        } catch (e) {
            for (var s = new Uint8Array(t.data), a = new Array(s.length), c = 0; c < s.length; c++) a[c] = s[c];
            r = String.fromCharCode.apply(null, a)
        }
        return o += btoa(r), n(o)
    }, e.decodePacket = function(t, n, r) {
        if (void 0 === t) return d;
        if ("string" == typeof t) {
            if ("b" === t.charAt(0)) return e.decodeBase64Packet(t.substr(1), n);
            if (r && !1 === (t = function(t) {
                    try {
                        t = c.decode(t, {
                            strict: !1
                        })
                    } catch (t) {
                        return !1
                    }
                    return t
                }(t))) return d;
            var o = t.charAt(0);
            return Number(o) == o && l[o] ? t.length > 1 ? {
                type: l[o],
                data: t.substring(1)
            } : {
                type: l[o]
            } : d
        }
        o = new Uint8Array(t)[0];
        var i = s(t, 1);
        return y && "blob" === n && (i = new y([i])), {
            type: l[o],
            data: i
        }
    }, e.decodeBase64Packet = function(t, e) {
        var n = l[t.charAt(0)];
        if (!r) return {
            type: n,
            data: {
                base64: !0,
                data: t.substr(1)
            }
        };
        var o = r.decode(t.substr(1));
        return "blob" === e && y && (o = new y([o])), {
            type: n,
            data: o
        }
    }, e.encodePayload = function(t, n, r) {
        "function" == typeof n && (r = n, n = null);
        var o = i(t);
        if (n && o) return y && !f ? e.encodePayloadAsBlob(t, r) : e.encodePayloadAsArrayBuffer(t, r);
        if (!t.length) return r("0:");
        g(t, (function(t, r) {
            e.encodePacket(t, !!o && n, !1, (function(t) {
                r(null, function(t) {
                    return t.length + ":" + t
                }(t))
            }))
        }), (function(t, e) {
            return r(e.join(""))
        }))
    }, e.decodePayload = function(t, n, r) {
        if ("string" != typeof t) return e.decodePayloadAsBinary(t, n, r);
        var o;
        if ("function" == typeof n && (r = n, n = null), "" === t) return r(d, 0, 1);
        for (var i, s, a = "", c = 0, u = t.length; c < u; c++) {
            var h = t.charAt(c);
            if (":" === h) {
                if ("" === a || a != (i = Number(a))) return r(d, 0, 1);
                if (a != (s = t.substr(c + 1, i)).length) return r(d, 0, 1);
                if (s.length) {
                    if (o = e.decodePacket(s, n, !1), d.type === o.type && d.data === o.data) return r(d, 0, 1);
                    if (!1 === r(o, c + i, u)) return
                }
                c += i, a = ""
            } else a += h
        }
        return "" !== a ? r(d, 0, 1) : void 0
    }, e.encodePayloadAsArrayBuffer = function(t, n) {
        if (!t.length) return n(new ArrayBuffer(0));
        g(t, (function(t, n) {
            e.encodePacket(t, !0, !0, (function(t) {
                return n(null, t)
            }))
        }), (function(t, e) {
            var r = e.reduce((function(t, e) {
                    var n;
                    return t + (n = "string" == typeof e ? e.length : e.byteLength).toString().length + n + 2
                }), 0),
                o = new Uint8Array(r),
                i = 0;
            return e.forEach((function(t) {
                var e = "string" == typeof t,
                    n = t;
                if (e) {
                    for (var r = new Uint8Array(t.length), s = 0; s < t.length; s++) r[s] = t.charCodeAt(s);
                    n = r.buffer
                }
                o[i++] = e ? 0 : 1;
                var a = n.byteLength.toString();
                for (s = 0; s < a.length; s++) o[i++] = parseInt(a[s]);
                o[i++] = 255;
                for (r = new Uint8Array(n), s = 0; s < r.length; s++) o[i++] = r[s]
            })), n(o.buffer)
        }))
    }, e.encodePayloadAsBlob = function(t, n) {
        g(t, (function(t, n) {
            e.encodePacket(t, !0, !0, (function(t) {
                var e = new Uint8Array(1);
                if (e[0] = 1, "string" == typeof t) {
                    for (var r = new Uint8Array(t.length), o = 0; o < t.length; o++) r[o] = t.charCodeAt(o);
                    t = r.buffer, e[0] = 0
                }
                var i = (t instanceof ArrayBuffer ? t.byteLength : t.size).toString(),
                    s = new Uint8Array(i.length + 1);
                for (o = 0; o < i.length; o++) s[o] = parseInt(i[o]);
                if (s[i.length] = 255, y) {
                    var a = new y([e.buffer, s.buffer, t]);
                    n(null, a)
                }
            }))
        }), (function(t, e) {
            return n(new y(e))
        }))
    }, e.decodePayloadAsBinary = function(t, n, r) {
        "function" == typeof n && (r = n, n = null);
        for (var o = t, i = []; o.byteLength > 0;) {
            for (var a = new Uint8Array(o), c = 0 === a[0], u = "", h = 1; 255 !== a[h]; h++) {
                if (u.length > 310) return r(d, 0, 1);
                u += a[h]
            }
            o = s(o, 2 + u.length), u = parseInt(u);
            var f = s(o, 0, u);
            if (c) try {
                f = String.fromCharCode.apply(null, new Uint8Array(f))
            } catch (t) {
                var p = new Uint8Array(f);
                f = "";
                for (h = 0; h < p.length; h++) f += String.fromCharCode(p[h])
            }
            i.push(f), o = s(o, u)
        }
        var l = i.length;
        i.forEach((function(t, o) {
            r(e.decodePacket(t, n, !0), o, l)
        }))
    }
}, function(t, e, n) {
    (function(r) {
        function o() {
            var t;
            try {
                t = e.storage.debug
            } catch (t) {}
            return !t && void 0 !== r && "env" in r && (t = r.env.DEBUG), t
        }(e = t.exports = n(32)).log = function() {
            return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
        }, e.formatArgs = function(t) {
            var n = this.useColors;
            if (t[0] = (n ? "%c" : "") + this.namespace + (n ? " %c" : " ") + t[0] + (n ? "%c " : " ") + "+" + e.humanize(this.diff), !n) return;
            var r = "color: " + this.color;
            t.splice(1, 0, r, "color: inherit");
            var o = 0,
                i = 0;
            t[0].replace(/%[a-zA-Z%]/g, (function(t) {
                "%%" !== t && (o++, "%c" === t && (i = o))
            })), t.splice(i, 0, r)
        }, e.save = function(t) {
            try {
                null == t ? e.storage.removeItem("debug") : e.storage.debug = t
            } catch (t) {}
        }, e.load = o, e.useColors = function() {
            if ("undefined" != typeof window && window.process && "renderer" === window.process.type) return !0;
            if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
            return "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)
        }, e.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
            try {
                return window.localStorage
            } catch (t) {}
        }(), e.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], e.formatters.j = function(t) {
            try {
                return JSON.stringify(t)
            } catch (t) {
                return "[UnexpectedJSONParseError]: " + t.message
            }
        }, e.enable(o())
    }).call(this, n(15))
}, function(t, e) {
    t.exports = function(t, e) {
        var n = function() {};
        n.prototype = e.prototype, t.prototype = new n, t.prototype.constructor = t
    }
}, function(t, e, n) {
    (function(r) {
        function o() {
            var t;
            try {
                t = e.storage.debug
            } catch (t) {}
            return !t && void 0 !== r && "env" in r && (t = r.env.DEBUG), t
        }(e = t.exports = n(49)).log = function() {
            return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
        }, e.formatArgs = function(t) {
            var n = this.useColors;
            if (t[0] = (n ? "%c" : "") + this.namespace + (n ? " %c" : " ") + t[0] + (n ? "%c " : " ") + "+" + e.humanize(this.diff), !n) return;
            var r = "color: " + this.color;
            t.splice(1, 0, r, "color: inherit");
            var o = 0,
                i = 0;
            t[0].replace(/%[a-zA-Z%]/g, (function(t) {
                "%%" !== t && (o++, "%c" === t && (i = o))
            })), t.splice(i, 0, r)
        }, e.save = function(t) {
            try {
                null == t ? e.storage.removeItem("debug") : e.storage.debug = t
            } catch (t) {}
        }, e.load = o, e.useColors = function() {
            if ("undefined" != typeof window && window.process && "renderer" === window.process.type) return !0;
            if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
            return "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)
        }, e.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
            try {
                return window.localStorage
            } catch (t) {}
        }(), e.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], e.formatters.j = function(t) {
            try {
                return JSON.stringify(t)
            } catch (t) {
                return "[UnexpectedJSONParseError]: " + t.message
            }
        }, e.enable(o())
    }).call(this, n(15))
}, function(t, e, n) {
    ! function(t) {
        "use strict";

        function e(t, e, n, r) {
            var o, i = !1,
                s = 0;

            function a() {
                o && clearTimeout(o)
            }

            function c() {
                for (var c = arguments.length, u = new Array(c), h = 0; h < c; h++) u[h] = arguments[h];
                var f = this,
                    p = Date.now() - s;

                function l() {
                    s = Date.now(), n.apply(f, u)
                }

                function d() {
                    o = void 0
                }
                i || (r && !o && l(), a(), void 0 === r && p > t ? l() : !0 !== e && (o = setTimeout(r ? d : l, void 0 === r ? t - p : t)))
            }
            return "boolean" != typeof e && (r = n, n = e, e = void 0), c.cancel = function() {
                a(), i = !0
            }, c
        }
        t.debounce = function(t, n, r) {
            return void 0 === r ? e(t, n, !1) : e(t, r, !1 !== n)
        }, t.throttle = e, Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }(e)
}, function(t, e, n) {
    var r = n(1)("socket.io-parser"),
        o = n(6),
        i = n(34),
        s = n(16),
        a = n(17);

    function c() {}
    e.protocol = 4, e.types = ["CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK"], e.CONNECT = 0, e.DISCONNECT = 1, e.EVENT = 2, e.ACK = 3, e.ERROR = 4, e.BINARY_EVENT = 5, e.BINARY_ACK = 6, e.Encoder = c, e.Decoder = f;
    var u = e.ERROR + '"encode error"';

    function h(t) {
        var n = "" + t.type;
        if (e.BINARY_EVENT !== t.type && e.BINARY_ACK !== t.type || (n += t.attachments + "-"), t.nsp && "/" !== t.nsp && (n += t.nsp + ","), null != t.id && (n += t.id), null != t.data) {
            var o = function(t) {
                try {
                    return JSON.stringify(t)
                } catch (t) {
                    return !1
                }
            }(t.data);
            if (!1 === o) return u;
            n += o
        }
        return r("encoded %j as %s", t, n), n
    }

    function f() {
        this.reconstructor = null
    }

    function p(t) {
        this.reconPack = t, this.buffers = []
    }

    function l(t) {
        return {
            type: e.ERROR,
            data: "parser error: " + t
        }
    }
    c.prototype.encode = function(t, n) {
        (r("encoding packet %j", t), e.BINARY_EVENT === t.type || e.BINARY_ACK === t.type) ? function(t, e) {
            i.removeBlobs(t, (function(t) {
                var n = i.deconstructPacket(t),
                    r = h(n.packet),
                    o = n.buffers;
                o.unshift(r), e(o)
            }))
        }(t, n) : n([h(t)])
    }, o(f.prototype), f.prototype.add = function(t) {
        var n;
        if ("string" == typeof t) n = function(t) {
            var n = 0,
                o = {
                    type: Number(t.charAt(0))
                };
            if (null == e.types[o.type]) return l("unknown packet type " + o.type);
            if (e.BINARY_EVENT === o.type || e.BINARY_ACK === o.type) {
                for (var i = "";
                    "-" !== t.charAt(++n) && (i += t.charAt(n), n != t.length););
                if (i != Number(i) || "-" !== t.charAt(n)) throw new Error("Illegal attachments");
                o.attachments = Number(i)
            }
            if ("/" === t.charAt(n + 1))
                for (o.nsp = ""; ++n;) {
                    if ("," === (c = t.charAt(n))) break;
                    if (o.nsp += c, n === t.length) break
                } else o.nsp = "/";
            var a = t.charAt(n + 1);
            if ("" !== a && Number(a) == a) {
                for (o.id = ""; ++n;) {
                    var c;
                    if (null == (c = t.charAt(n)) || Number(c) != c) {
                        --n;
                        break
                    }
                    if (o.id += t.charAt(n), n === t.length) break
                }
                o.id = Number(o.id)
            }
            if (t.charAt(++n)) {
                var u = function(t) {
                    try {
                        return JSON.parse(t)
                    } catch (t) {
                        return !1
                    }
                }(t.substr(n));
                if (!(!1 !== u && (o.type === e.ERROR || s(u)))) return l("invalid payload");
                o.data = u
            }
            return r("decoded %s as %j", t, o), o
        }(t), e.BINARY_EVENT === n.type || e.BINARY_ACK === n.type ? (this.reconstructor = new p(n), 0 === this.reconstructor.reconPack.attachments && this.emit("decoded", n)) : this.emit("decoded", n);
        else {
            if (!a(t) && !t.base64) throw new Error("Unknown type: " + t);
            if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
            (n = this.reconstructor.takeBinaryData(t)) && (this.reconstructor = null, this.emit("decoded", n))
        }
    }, f.prototype.destroy = function() {
        this.reconstructor && this.reconstructor.finishedReconstruction()
    }, p.prototype.takeBinaryData = function(t) {
        if (this.buffers.push(t), this.buffers.length === this.reconPack.attachments) {
            var e = i.reconstructPacket(this.reconPack, this.buffers);
            return this.finishedReconstruction(), e
        }
        return null
    }, p.prototype.finishedReconstruction = function() {
        this.reconPack = null, this.buffers = []
    }
}, function(t, e, n) {
    function r(t) {
        if (t) return function(t) {
            for (var e in r.prototype) t[e] = r.prototype[e];
            return t
        }(t)
    }
    t.exports = r, r.prototype.on = r.prototype.addEventListener = function(t, e) {
        return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this
    }, r.prototype.once = function(t, e) {
        function n() {
            this.off(t, n), e.apply(this, arguments)
        }
        return n.fn = e, this.on(t, n), this
    }, r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function(t, e) {
        if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
        var n, r = this._callbacks["$" + t];
        if (!r) return this;
        if (1 == arguments.length) return delete this._callbacks["$" + t], this;
        for (var o = 0; o < r.length; o++)
            if ((n = r[o]) === e || n.fn === e) {
                r.splice(o, 1);
                break
            } return 0 === r.length && delete this._callbacks["$" + t], this
    }, r.prototype.emit = function(t) {
        this._callbacks = this._callbacks || {};
        for (var e = new Array(arguments.length - 1), n = this._callbacks["$" + t], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
        if (n) {
            r = 0;
            for (var o = (n = n.slice(0)).length; r < o; ++r) n[r].apply(this, e)
        }
        return this
    }, r.prototype.listeners = function(t) {
        return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || []
    }, r.prototype.hasListeners = function(t) {
        return !!this.listeners(t).length
    }
}, function(t, e, n) {
    "use strict";
    (function(t) {
        /*!
         * The buffer module from node.js, for the browser.
         *
         * @author   Feross Aboukhadijeh <http://feross.org>
         * @license  MIT
         */
        var r = n(35),
            o = n(36),
            i = n(37);

        function s() {
            return c.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
        }

        function a(t, e) {
            if (s() < e) throw new RangeError("Invalid typed array length");
            return c.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = c.prototype : (null === t && (t = new c(e)), t.length = e), t
        }

        function c(t, e, n) {
            if (!(c.TYPED_ARRAY_SUPPORT || this instanceof c)) return new c(t, e, n);
            if ("number" == typeof t) {
                if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
                return f(this, t)
            }
            return u(this, t, e, n)
        }

        function u(t, e, n, r) {
            if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
            return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? function(t, e, n, r) {
                if (e.byteLength, n < 0 || e.byteLength < n) throw new RangeError("'offset' is out of bounds");
                if (e.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");
                e = void 0 === n && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, n) : new Uint8Array(e, n, r);
                c.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = c.prototype : t = p(t, e);
                return t
            }(t, e, n, r) : "string" == typeof e ? function(t, e, n) {
                "string" == typeof n && "" !== n || (n = "utf8");
                if (!c.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
                var r = 0 | d(e, n),
                    o = (t = a(t, r)).write(e, n);
                o !== r && (t = t.slice(0, o));
                return t
            }(t, e, n) : function(t, e) {
                if (c.isBuffer(e)) {
                    var n = 0 | l(e.length);
                    return 0 === (t = a(t, n)).length || e.copy(t, 0, 0, n), t
                }
                if (e) {
                    if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || (r = e.length) != r ? a(t, 0) : p(t, e);
                    if ("Buffer" === e.type && i(e.data)) return p(t, e.data)
                }
                var r;
                throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
            }(t, e)
        }

        function h(t) {
            if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
            if (t < 0) throw new RangeError('"size" argument must not be negative')
        }

        function f(t, e) {
            if (h(e), t = a(t, e < 0 ? 0 : 0 | l(e)), !c.TYPED_ARRAY_SUPPORT)
                for (var n = 0; n < e; ++n) t[n] = 0;
            return t
        }

        function p(t, e) {
            var n = e.length < 0 ? 0 : 0 | l(e.length);
            t = a(t, n);
            for (var r = 0; r < n; r += 1) t[r] = 255 & e[r];
            return t
        }

        function l(t) {
            if (t >= s()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s().toString(16) + " bytes");
            return 0 | t
        }

        function d(t, e) {
            if (c.isBuffer(t)) return t.length;
            if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
            "string" != typeof t && (t = "" + t);
            var n = t.length;
            if (0 === n) return 0;
            for (var r = !1;;) switch (e) {
                case "ascii":
                case "latin1":
                case "binary":
                    return n;
                case "utf8":
                case "utf-8":
                case void 0:
                    return j(t).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return 2 * n;
                case "hex":
                    return n >>> 1;
                case "base64":
                    return q(t).length;
                default:
                    if (r) return j(t).length;
                    e = ("" + e).toLowerCase(), r = !0
            }
        }

        function y(t, e, n) {
            var r = !1;
            if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
            if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
            if ((n >>>= 0) <= (e >>>= 0)) return "";
            for (t || (t = "utf8");;) switch (t) {
                case "hex":
                    return S(this, e, n);
                case "utf8":
                case "utf-8":
                    return x(this, e, n);
                case "ascii":
                    return R(this, e, n);
                case "latin1":
                case "binary":
                    return _(this, e, n);
                case "base64":
                    return B(this, e, n);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return T(this, e, n);
                default:
                    if (r) throw new TypeError("Unknown encoding: " + t);
                    t = (t + "").toLowerCase(), r = !0
            }
        }

        function g(t, e, n) {
            var r = t[e];
            t[e] = t[n], t[n] = r
        }

        function m(t, e, n, r, o) {
            if (0 === t.length) return -1;
            if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = o ? 0 : t.length - 1), n < 0 && (n = t.length + n), n >= t.length) {
                if (o) return -1;
                n = t.length - 1
            } else if (n < 0) {
                if (!o) return -1;
                n = 0
            }
            if ("string" == typeof e && (e = c.from(e, r)), c.isBuffer(e)) return 0 === e.length ? -1 : v(t, e, n, r, o);
            if ("number" == typeof e) return e &= 255, c.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(t, e, n) : Uint8Array.prototype.lastIndexOf.call(t, e, n) : v(t, [e], n, r, o);
            throw new TypeError("val must be string, number or Buffer")
        }

        function v(t, e, n, r, o) {
            var i, s = 1,
                a = t.length,
                c = e.length;
            if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                if (t.length < 2 || e.length < 2) return -1;
                s = 2, a /= 2, c /= 2, n /= 2
            }

            function u(t, e) {
                return 1 === s ? t[e] : t.readUInt16BE(e * s)
            }
            if (o) {
                var h = -1;
                for (i = n; i < a; i++)
                    if (u(t, i) === u(e, -1 === h ? 0 : i - h)) {
                        if (-1 === h && (h = i), i - h + 1 === c) return h * s
                    } else -1 !== h && (i -= i - h), h = -1
            } else
                for (n + c > a && (n = a - c), i = n; i >= 0; i--) {
                    for (var f = !0, p = 0; p < c; p++)
                        if (u(t, i + p) !== u(e, p)) {
                            f = !1;
                            break
                        } if (f) return i
                }
            return -1
        }

        function w(t, e, n, r) {
            n = Number(n) || 0;
            var o = t.length - n;
            r ? (r = Number(r)) > o && (r = o) : r = o;
            var i = e.length;
            if (i % 2 != 0) throw new TypeError("Invalid hex string");
            r > i / 2 && (r = i / 2);
            for (var s = 0; s < r; ++s) {
                var a = parseInt(e.substr(2 * s, 2), 16);
                if (isNaN(a)) return s;
                t[n + s] = a
            }
            return s
        }

        function b(t, e, n, r) {
            return Y(j(e, t.length - n), t, n, r)
        }

        function C(t, e, n, r) {
            return Y(function(t) {
                for (var e = [], n = 0; n < t.length; ++n) e.push(255 & t.charCodeAt(n));
                return e
            }(e), t, n, r)
        }

        function A(t, e, n, r) {
            return C(t, e, n, r)
        }

        function E(t, e, n, r) {
            return Y(q(e), t, n, r)
        }

        function k(t, e, n, r) {
            return Y(function(t, e) {
                for (var n, r, o, i = [], s = 0; s < t.length && !((e -= 2) < 0); ++s) n = t.charCodeAt(s), r = n >> 8, o = n % 256, i.push(o), i.push(r);
                return i
            }(e, t.length - n), t, n, r)
        }

        function B(t, e, n) {
            return 0 === e && n === t.length ? r.fromByteArray(t) : r.fromByteArray(t.slice(e, n))
        }

        function x(t, e, n) {
            n = Math.min(t.length, n);
            for (var r = [], o = e; o < n;) {
                var i, s, a, c, u = t[o],
                    h = null,
                    f = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
                if (o + f <= n) switch (f) {
                    case 1:
                        u < 128 && (h = u);
                        break;
                    case 2:
                        128 == (192 & (i = t[o + 1])) && (c = (31 & u) << 6 | 63 & i) > 127 && (h = c);
                        break;
                    case 3:
                        i = t[o + 1], s = t[o + 2], 128 == (192 & i) && 128 == (192 & s) && (c = (15 & u) << 12 | (63 & i) << 6 | 63 & s) > 2047 && (c < 55296 || c > 57343) && (h = c);
                        break;
                    case 4:
                        i = t[o + 1], s = t[o + 2], a = t[o + 3], 128 == (192 & i) && 128 == (192 & s) && 128 == (192 & a) && (c = (15 & u) << 18 | (63 & i) << 12 | (63 & s) << 6 | 63 & a) > 65535 && c < 1114112 && (h = c)
                }
                null === h ? (h = 65533, f = 1) : h > 65535 && (h -= 65536, r.push(h >>> 10 & 1023 | 55296), h = 56320 | 1023 & h), r.push(h), o += f
            }
            return function(t) {
                var e = t.length;
                if (e <= 4096) return String.fromCharCode.apply(String, t);
                var n = "",
                    r = 0;
                for (; r < e;) n += String.fromCharCode.apply(String, t.slice(r, r += 4096));
                return n
            }(r)
        }
        e.Buffer = c, e.SlowBuffer = function(t) {
            +t != t && (t = 0);
            return c.alloc(+t)
        }, e.INSPECT_MAX_BYTES = 50, c.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function() {
            try {
                var t = new Uint8Array(1);
                return t.__proto__ = {
                    __proto__: Uint8Array.prototype,
                    foo: function() {
                        return 42
                    }
                }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
            } catch (t) {
                return !1
            }
        }(), e.kMaxLength = s(), c.poolSize = 8192, c._augment = function(t) {
            return t.__proto__ = c.prototype, t
        }, c.from = function(t, e, n) {
            return u(null, t, e, n)
        }, c.TYPED_ARRAY_SUPPORT && (c.prototype.__proto__ = Uint8Array.prototype, c.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && c[Symbol.species] === c && Object.defineProperty(c, Symbol.species, {
            value: null,
            configurable: !0
        })), c.alloc = function(t, e, n) {
            return function(t, e, n, r) {
                return h(e), e <= 0 ? a(t, e) : void 0 !== n ? "string" == typeof r ? a(t, e).fill(n, r) : a(t, e).fill(n) : a(t, e)
            }(null, t, e, n)
        }, c.allocUnsafe = function(t) {
            return f(null, t)
        }, c.allocUnsafeSlow = function(t) {
            return f(null, t)
        }, c.isBuffer = function(t) {
            return !(null == t || !t._isBuffer)
        }, c.compare = function(t, e) {
            if (!c.isBuffer(t) || !c.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
            if (t === e) return 0;
            for (var n = t.length, r = e.length, o = 0, i = Math.min(n, r); o < i; ++o)
                if (t[o] !== e[o]) {
                    n = t[o], r = e[o];
                    break
                } return n < r ? -1 : r < n ? 1 : 0
        }, c.isEncoding = function(t) {
            switch (String(t).toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "latin1":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return !0;
                default:
                    return !1
            }
        }, c.concat = function(t, e) {
            if (!i(t)) throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === t.length) return c.alloc(0);
            var n;
            if (void 0 === e)
                for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
            var r = c.allocUnsafe(e),
                o = 0;
            for (n = 0; n < t.length; ++n) {
                var s = t[n];
                if (!c.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers');
                s.copy(r, o), o += s.length
            }
            return r
        }, c.byteLength = d, c.prototype._isBuffer = !0, c.prototype.swap16 = function() {
            var t = this.length;
            if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var e = 0; e < t; e += 2) g(this, e, e + 1);
            return this
        }, c.prototype.swap32 = function() {
            var t = this.length;
            if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var e = 0; e < t; e += 4) g(this, e, e + 3), g(this, e + 1, e + 2);
            return this
        }, c.prototype.swap64 = function() {
            var t = this.length;
            if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var e = 0; e < t; e += 8) g(this, e, e + 7), g(this, e + 1, e + 6), g(this, e + 2, e + 5), g(this, e + 3, e + 4);
            return this
        }, c.prototype.toString = function() {
            var t = 0 | this.length;
            return 0 === t ? "" : 0 === arguments.length ? x(this, 0, t) : y.apply(this, arguments)
        }, c.prototype.equals = function(t) {
            if (!c.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
            return this === t || 0 === c.compare(this, t)
        }, c.prototype.inspect = function() {
            var t = "",
                n = e.INSPECT_MAX_BYTES;
            return this.length > 0 && (t = this.toString("hex", 0, n).match(/.{2}/g).join(" "), this.length > n && (t += " ... ")), "<Buffer " + t + ">"
        }, c.prototype.compare = function(t, e, n, r, o) {
            if (!c.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
            if (void 0 === e && (e = 0), void 0 === n && (n = t ? t.length : 0), void 0 === r && (r = 0), void 0 === o && (o = this.length), e < 0 || n > t.length || r < 0 || o > this.length) throw new RangeError("out of range index");
            if (r >= o && e >= n) return 0;
            if (r >= o) return -1;
            if (e >= n) return 1;
            if (this === t) return 0;
            for (var i = (o >>>= 0) - (r >>>= 0), s = (n >>>= 0) - (e >>>= 0), a = Math.min(i, s), u = this.slice(r, o), h = t.slice(e, n), f = 0; f < a; ++f)
                if (u[f] !== h[f]) {
                    i = u[f], s = h[f];
                    break
                } return i < s ? -1 : s < i ? 1 : 0
        }, c.prototype.includes = function(t, e, n) {
            return -1 !== this.indexOf(t, e, n)
        }, c.prototype.indexOf = function(t, e, n) {
            return m(this, t, e, n, !0)
        }, c.prototype.lastIndexOf = function(t, e, n) {
            return m(this, t, e, n, !1)
        }, c.prototype.write = function(t, e, n, r) {
            if (void 0 === e) r = "utf8", n = this.length, e = 0;
            else if (void 0 === n && "string" == typeof e) r = e, n = this.length, e = 0;
            else {
                if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                e |= 0, isFinite(n) ? (n |= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0)
            }
            var o = this.length - e;
            if ((void 0 === n || n > o) && (n = o), t.length > 0 && (n < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
            r || (r = "utf8");
            for (var i = !1;;) switch (r) {
                case "hex":
                    return w(this, t, e, n);
                case "utf8":
                case "utf-8":
                    return b(this, t, e, n);
                case "ascii":
                    return C(this, t, e, n);
                case "latin1":
                case "binary":
                    return A(this, t, e, n);
                case "base64":
                    return E(this, t, e, n);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return k(this, t, e, n);
                default:
                    if (i) throw new TypeError("Unknown encoding: " + r);
                    r = ("" + r).toLowerCase(), i = !0
            }
        }, c.prototype.toJSON = function() {
            return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0)
            }
        };

        function R(t, e, n) {
            var r = "";
            n = Math.min(t.length, n);
            for (var o = e; o < n; ++o) r += String.fromCharCode(127 & t[o]);
            return r
        }

        function _(t, e, n) {
            var r = "";
            n = Math.min(t.length, n);
            for (var o = e; o < n; ++o) r += String.fromCharCode(t[o]);
            return r
        }

        function S(t, e, n) {
            var r = t.length;
            (!e || e < 0) && (e = 0), (!n || n < 0 || n > r) && (n = r);
            for (var o = "", i = e; i < n; ++i) o += N(t[i]);
            return o
        }

        function T(t, e, n) {
            for (var r = t.slice(e, n), o = "", i = 0; i < r.length; i += 2) o += String.fromCharCode(r[i] + 256 * r[i + 1]);
            return o
        }

        function P(t, e, n) {
            if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
            if (t + e > n) throw new RangeError("Trying to access beyond buffer length")
        }

        function F(t, e, n, r, o, i) {
            if (!c.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (e > o || e < i) throw new RangeError('"value" argument is out of bounds');
            if (n + r > t.length) throw new RangeError("Index out of range")
        }

        function O(t, e, n, r) {
            e < 0 && (e = 65535 + e + 1);
            for (var o = 0, i = Math.min(t.length - n, 2); o < i; ++o) t[n + o] = (e & 255 << 8 * (r ? o : 1 - o)) >>> 8 * (r ? o : 1 - o)
        }

        function I(t, e, n, r) {
            e < 0 && (e = 4294967295 + e + 1);
            for (var o = 0, i = Math.min(t.length - n, 4); o < i; ++o) t[n + o] = e >>> 8 * (r ? o : 3 - o) & 255
        }

        function U(t, e, n, r, o, i) {
            if (n + r > t.length) throw new RangeError("Index out of range");
            if (n < 0) throw new RangeError("Index out of range")
        }

        function L(t, e, n, r, i) {
            return i || U(t, 0, n, 4), o.write(t, e, n, r, 23, 4), n + 4
        }

        function M(t, e, n, r, i) {
            return i || U(t, 0, n, 8), o.write(t, e, n, r, 52, 8), n + 8
        }
        c.prototype.slice = function(t, e) {
            var n, r = this.length;
            if ((t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), (e = void 0 === e ? r : ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), e < t && (e = t), c.TYPED_ARRAY_SUPPORT)(n = this.subarray(t, e)).__proto__ = c.prototype;
            else {
                var o = e - t;
                n = new c(o, void 0);
                for (var i = 0; i < o; ++i) n[i] = this[i + t]
            }
            return n
        }, c.prototype.readUIntLE = function(t, e, n) {
            t |= 0, e |= 0, n || P(t, e, this.length);
            for (var r = this[t], o = 1, i = 0; ++i < e && (o *= 256);) r += this[t + i] * o;
            return r
        }, c.prototype.readUIntBE = function(t, e, n) {
            t |= 0, e |= 0, n || P(t, e, this.length);
            for (var r = this[t + --e], o = 1; e > 0 && (o *= 256);) r += this[t + --e] * o;
            return r
        }, c.prototype.readUInt8 = function(t, e) {
            return e || P(t, 1, this.length), this[t]
        }, c.prototype.readUInt16LE = function(t, e) {
            return e || P(t, 2, this.length), this[t] | this[t + 1] << 8
        }, c.prototype.readUInt16BE = function(t, e) {
            return e || P(t, 2, this.length), this[t] << 8 | this[t + 1]
        }, c.prototype.readUInt32LE = function(t, e) {
            return e || P(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
        }, c.prototype.readUInt32BE = function(t, e) {
            return e || P(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
        }, c.prototype.readIntLE = function(t, e, n) {
            t |= 0, e |= 0, n || P(t, e, this.length);
            for (var r = this[t], o = 1, i = 0; ++i < e && (o *= 256);) r += this[t + i] * o;
            return r >= (o *= 128) && (r -= Math.pow(2, 8 * e)), r
        }, c.prototype.readIntBE = function(t, e, n) {
            t |= 0, e |= 0, n || P(t, e, this.length);
            for (var r = e, o = 1, i = this[t + --r]; r > 0 && (o *= 256);) i += this[t + --r] * o;
            return i >= (o *= 128) && (i -= Math.pow(2, 8 * e)), i
        }, c.prototype.readInt8 = function(t, e) {
            return e || P(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
        }, c.prototype.readInt16LE = function(t, e) {
            e || P(t, 2, this.length);
            var n = this[t] | this[t + 1] << 8;
            return 32768 & n ? 4294901760 | n : n
        }, c.prototype.readInt16BE = function(t, e) {
            e || P(t, 2, this.length);
            var n = this[t + 1] | this[t] << 8;
            return 32768 & n ? 4294901760 | n : n
        }, c.prototype.readInt32LE = function(t, e) {
            return e || P(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
        }, c.prototype.readInt32BE = function(t, e) {
            return e || P(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
        }, c.prototype.readFloatLE = function(t, e) {
            return e || P(t, 4, this.length), o.read(this, t, !0, 23, 4)
        }, c.prototype.readFloatBE = function(t, e) {
            return e || P(t, 4, this.length), o.read(this, t, !1, 23, 4)
        }, c.prototype.readDoubleLE = function(t, e) {
            return e || P(t, 8, this.length), o.read(this, t, !0, 52, 8)
        }, c.prototype.readDoubleBE = function(t, e) {
            return e || P(t, 8, this.length), o.read(this, t, !1, 52, 8)
        }, c.prototype.writeUIntLE = function(t, e, n, r) {
            (t = +t, e |= 0, n |= 0, r) || F(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
            var o = 1,
                i = 0;
            for (this[e] = 255 & t; ++i < n && (o *= 256);) this[e + i] = t / o & 255;
            return e + n
        }, c.prototype.writeUIntBE = function(t, e, n, r) {
            (t = +t, e |= 0, n |= 0, r) || F(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
            var o = n - 1,
                i = 1;
            for (this[e + o] = 255 & t; --o >= 0 && (i *= 256);) this[e + o] = t / i & 255;
            return e + n
        }, c.prototype.writeUInt8 = function(t, e, n) {
            return t = +t, e |= 0, n || F(this, t, e, 1, 255, 0), c.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1
        }, c.prototype.writeUInt16LE = function(t, e, n) {
            return t = +t, e |= 0, n || F(this, t, e, 2, 65535, 0), c.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : O(this, t, e, !0), e + 2
        }, c.prototype.writeUInt16BE = function(t, e, n) {
            return t = +t, e |= 0, n || F(this, t, e, 2, 65535, 0), c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : O(this, t, e, !1), e + 2
        }, c.prototype.writeUInt32LE = function(t, e, n) {
            return t = +t, e |= 0, n || F(this, t, e, 4, 4294967295, 0), c.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : I(this, t, e, !0), e + 4
        }, c.prototype.writeUInt32BE = function(t, e, n) {
            return t = +t, e |= 0, n || F(this, t, e, 4, 4294967295, 0), c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : I(this, t, e, !1), e + 4
        }, c.prototype.writeIntLE = function(t, e, n, r) {
            if (t = +t, e |= 0, !r) {
                var o = Math.pow(2, 8 * n - 1);
                F(this, t, e, n, o - 1, -o)
            }
            var i = 0,
                s = 1,
                a = 0;
            for (this[e] = 255 & t; ++i < n && (s *= 256);) t < 0 && 0 === a && 0 !== this[e + i - 1] && (a = 1), this[e + i] = (t / s >> 0) - a & 255;
            return e + n
        }, c.prototype.writeIntBE = function(t, e, n, r) {
            if (t = +t, e |= 0, !r) {
                var o = Math.pow(2, 8 * n - 1);
                F(this, t, e, n, o - 1, -o)
            }
            var i = n - 1,
                s = 1,
                a = 0;
            for (this[e + i] = 255 & t; --i >= 0 && (s *= 256);) t < 0 && 0 === a && 0 !== this[e + i + 1] && (a = 1), this[e + i] = (t / s >> 0) - a & 255;
            return e + n
        }, c.prototype.writeInt8 = function(t, e, n) {
            return t = +t, e |= 0, n || F(this, t, e, 1, 127, -128), c.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1
        }, c.prototype.writeInt16LE = function(t, e, n) {
            return t = +t, e |= 0, n || F(this, t, e, 2, 32767, -32768), c.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : O(this, t, e, !0), e + 2
        }, c.prototype.writeInt16BE = function(t, e, n) {
            return t = +t, e |= 0, n || F(this, t, e, 2, 32767, -32768), c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : O(this, t, e, !1), e + 2
        }, c.prototype.writeInt32LE = function(t, e, n) {
            return t = +t, e |= 0, n || F(this, t, e, 4, 2147483647, -2147483648), c.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : I(this, t, e, !0), e + 4
        }, c.prototype.writeInt32BE = function(t, e, n) {
            return t = +t, e |= 0, n || F(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), c.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : I(this, t, e, !1), e + 4
        }, c.prototype.writeFloatLE = function(t, e, n) {
            return L(this, t, e, !0, n)
        }, c.prototype.writeFloatBE = function(t, e, n) {
            return L(this, t, e, !1, n)
        }, c.prototype.writeDoubleLE = function(t, e, n) {
            return M(this, t, e, !0, n)
        }, c.prototype.writeDoubleBE = function(t, e, n) {
            return M(this, t, e, !1, n)
        }, c.prototype.copy = function(t, e, n, r) {
            if (n || (n = 0), r || 0 === r || (r = this.length), e >= t.length && (e = t.length), e || (e = 0), r > 0 && r < n && (r = n), r === n) return 0;
            if (0 === t.length || 0 === this.length) return 0;
            if (e < 0) throw new RangeError("targetStart out of bounds");
            if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
            if (r < 0) throw new RangeError("sourceEnd out of bounds");
            r > this.length && (r = this.length), t.length - e < r - n && (r = t.length - e + n);
            var o, i = r - n;
            if (this === t && n < e && e < r)
                for (o = i - 1; o >= 0; --o) t[o + e] = this[o + n];
            else if (i < 1e3 || !c.TYPED_ARRAY_SUPPORT)
                for (o = 0; o < i; ++o) t[o + e] = this[o + n];
            else Uint8Array.prototype.set.call(t, this.subarray(n, n + i), e);
            return i
        }, c.prototype.fill = function(t, e, n, r) {
            if ("string" == typeof t) {
                if ("string" == typeof e ? (r = e, e = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), 1 === t.length) {
                    var o = t.charCodeAt(0);
                    o < 256 && (t = o)
                }
                if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
                if ("string" == typeof r && !c.isEncoding(r)) throw new TypeError("Unknown encoding: " + r)
            } else "number" == typeof t && (t &= 255);
            if (e < 0 || this.length < e || this.length < n) throw new RangeError("Out of range index");
            if (n <= e) return this;
            var i;
            if (e >>>= 0, n = void 0 === n ? this.length : n >>> 0, t || (t = 0), "number" == typeof t)
                for (i = e; i < n; ++i) this[i] = t;
            else {
                var s = c.isBuffer(t) ? t : j(new c(t, r).toString()),
                    a = s.length;
                for (i = 0; i < n - e; ++i) this[i + e] = s[i % a]
            }
            return this
        };
        var D = /[^+\/0-9A-Za-z-_]/g;

        function N(t) {
            return t < 16 ? "0" + t.toString(16) : t.toString(16)
        }

        function j(t, e) {
            var n;
            e = e || 1 / 0;
            for (var r = t.length, o = null, i = [], s = 0; s < r; ++s) {
                if ((n = t.charCodeAt(s)) > 55295 && n < 57344) {
                    if (!o) {
                        if (n > 56319) {
                            (e -= 3) > -1 && i.push(239, 191, 189);
                            continue
                        }
                        if (s + 1 === r) {
                            (e -= 3) > -1 && i.push(239, 191, 189);
                            continue
                        }
                        o = n;
                        continue
                    }
                    if (n < 56320) {
                        (e -= 3) > -1 && i.push(239, 191, 189), o = n;
                        continue
                    }
                    n = 65536 + (o - 55296 << 10 | n - 56320)
                } else o && (e -= 3) > -1 && i.push(239, 191, 189);
                if (o = null, n < 128) {
                    if ((e -= 1) < 0) break;
                    i.push(n)
                } else if (n < 2048) {
                    if ((e -= 2) < 0) break;
                    i.push(n >> 6 | 192, 63 & n | 128)
                } else if (n < 65536) {
                    if ((e -= 3) < 0) break;
                    i.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                } else {
                    if (!(n < 1114112)) throw new Error("Invalid code point");
                    if ((e -= 4) < 0) break;
                    i.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                }
            }
            return i
        }

        function q(t) {
            return r.toByteArray(function(t) {
                if ((t = function(t) {
                        return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
                    }(t).replace(D, "")).length < 2) return "";
                for (; t.length % 4 != 0;) t += "=";
                return t
            }(t))
        }

        function Y(t, e, n, r) {
            for (var o = 0; o < r && !(o + n >= e.length || o >= t.length); ++o) e[o + n] = t[o];
            return o
        }
    }).call(this, n(18))
}, function(t, e, n) {
    var r = n(40),
        o = n(9);
    t.exports = function(t) {
        var e = t.xdomain,
            n = t.xscheme,
            i = t.enablesXDR;
        try {
            if ("undefined" != typeof XMLHttpRequest && (!e || r)) return new XMLHttpRequest
        } catch (t) {}
        try {
            if ("undefined" != typeof XDomainRequest && !n && i) return new XDomainRequest
        } catch (t) {}
        if (!e) try {
            return new(o[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
        } catch (t) {}
    }
}, function(t, e) {
    t.exports = "undefined" != typeof self ? self : "undefined" != typeof window ? window : Function("return this")()
}, function(t, e, n) {
    var r = n(0),
        o = n(11);

    function i(t) {
        this.path = t.path, this.hostname = t.hostname, this.port = t.port, this.secure = t.secure, this.query = t.query, this.timestampParam = t.timestampParam, this.timestampRequests = t.timestampRequests, this.readyState = "", this.agent = t.agent || !1, this.socket = t.socket, this.enablesXDR = t.enablesXDR, this.withCredentials = t.withCredentials, this.pfx = t.pfx, this.key = t.key, this.passphrase = t.passphrase, this.cert = t.cert, this.ca = t.ca, this.ciphers = t.ciphers, this.rejectUnauthorized = t.rejectUnauthorized, this.forceNode = t.forceNode, this.isReactNative = t.isReactNative, this.extraHeaders = t.extraHeaders, this.localAddress = t.localAddress
    }
    t.exports = i, o(i.prototype), i.prototype.onError = function(t, e) {
        var n = new Error(t);
        return n.type = "TransportError", n.description = e, this.emit("error", n), this
    }, i.prototype.open = function() {
        return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", this.doOpen()), this
    }, i.prototype.close = function() {
        return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), this.onClose()), this
    }, i.prototype.send = function(t) {
        if ("open" !== this.readyState) throw new Error("Transport not open");
        this.write(t)
    }, i.prototype.onOpen = function() {
        this.readyState = "open", this.writable = !0, this.emit("open")
    }, i.prototype.onData = function(t) {
        var e = r.decodePacket(t, this.socket.binaryType);
        this.onPacket(e)
    }, i.prototype.onPacket = function(t) {
        this.emit("packet", t)
    }, i.prototype.onClose = function() {
        this.readyState = "closed", this.emit("close")
    }
}, function(t, e, n) {
    function r(t) {
        if (t) return function(t) {
            for (var e in r.prototype) t[e] = r.prototype[e];
            return t
        }(t)
    }
    t.exports = r, r.prototype.on = r.prototype.addEventListener = function(t, e) {
        return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this
    }, r.prototype.once = function(t, e) {
        function n() {
            this.off(t, n), e.apply(this, arguments)
        }
        return n.fn = e, this.on(t, n), this
    }, r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function(t, e) {
        if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
        var n, r = this._callbacks["$" + t];
        if (!r) return this;
        if (1 == arguments.length) return delete this._callbacks["$" + t], this;
        for (var o = 0; o < r.length; o++)
            if ((n = r[o]) === e || n.fn === e) {
                r.splice(o, 1);
                break
            } return 0 === r.length && delete this._callbacks["$" + t], this
    }, r.prototype.emit = function(t) {
        this._callbacks = this._callbacks || {};
        for (var e = new Array(arguments.length - 1), n = this._callbacks["$" + t], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
        if (n) {
            r = 0;
            for (var o = (n = n.slice(0)).length; r < o; ++r) n[r].apply(this, e)
        }
        return this
    }, r.prototype.listeners = function(t) {
        return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || []
    }, r.prototype.hasListeners = function(t) {
        return !!this.listeners(t).length
    }
}, function(t, e) {
    e.encode = function(t) {
        var e = "";
        for (var n in t) t.hasOwnProperty(n) && (e.length && (e += "&"), e += encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
        return e
    }, e.decode = function(t) {
        for (var e = {}, n = t.split("&"), r = 0, o = n.length; r < o; r++) {
            var i = n[r].split("=");
            e[decodeURIComponent(i[0])] = decodeURIComponent(i[1])
        }
        return e
    }
}, function(t, e, n) {
    var r = n(62).Symbol;
    t.exports = r
}, function(t, e) {
    t.exports = Object.freeze({
        ROUND_TIME: 300,
        GAME_TIME: 180,
        PLAYER_RADIUS: 20,
        PLAYER_MAX_HP: 100,
        PLAYER_SPEED: 400,
        PLAYER_FIRE_COOLDOWN: .25,
        BULLET_RADIUS: 10,
        BULLET_TT: 30,
        BULLET_SPEED: 800,
        BULLET_DAMAGE: 10,
        SCORE_BULLET_HIT: 20,
        SCORE_PER_SECOND: 1,
        MAP_SIZE: 2500,
        MSG_TYPES: {
            JOIN_GAME: "join_game",
            GAME_UPDATE: "update",
            INPUT: "input",
            GAME_OVER: "dead",
            REVERSE: "reverse_bullet_in_3_seconds_and_cooldown_10_seconds"
        }
    })
}, function(t, e) {
    var n, r, o = t.exports = {};

    function i() {
        throw new Error("setTimeout has not been defined")
    }

    function s() {
        throw new Error("clearTimeout has not been defined")
    }

    function a(t) {
        if (n === setTimeout) return setTimeout(t, 0);
        if ((n === i || !n) && setTimeout) return n = setTimeout, setTimeout(t, 0);
        try {
            return n(t, 0)
        } catch (e) {
            try {
                return n.call(null, t, 0)
            } catch (e) {
                return n.call(this, t, 0)
            }
        }
    }! function() {
        try {
            n = "function" == typeof setTimeout ? setTimeout : i
        } catch (t) {
            n = i
        }
        try {
            r = "function" == typeof clearTimeout ? clearTimeout : s
        } catch (t) {
            r = s
        }
    }();
    var c, u = [],
        h = !1,
        f = -1;

    function p() {
        h && c && (h = !1, c.length ? u = c.concat(u) : f = -1, u.length && l())
    }

    function l() {
        if (!h) {
            var t = a(p);
            h = !0;
            for (var e = u.length; e;) {
                for (c = u, u = []; ++f < e;) c && c[f].run();
                f = -1, e = u.length
            }
            c = null, h = !1,
                function(t) {
                    if (r === clearTimeout) return clearTimeout(t);
                    if ((r === s || !r) && clearTimeout) return r = clearTimeout, clearTimeout(t);
                    try {
                        r(t)
                    } catch (e) {
                        try {
                            return r.call(null, t)
                        } catch (e) {
                            return r.call(this, t)
                        }
                    }
                }(t)
        }
    }

    function d(t, e) {
        this.fun = t, this.array = e
    }

    function y() {}
    o.nextTick = function(t) {
        var e = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
        u.push(new d(t, e)), 1 !== u.length || h || a(l)
    }, d.prototype.run = function() {
        this.fun.apply(null, this.array)
    }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = y, o.addListener = y, o.once = y, o.off = y, o.removeListener = y, o.removeAllListeners = y, o.emit = y, o.prependListener = y, o.prependOnceListener = y, o.listeners = function(t) {
        return []
    }, o.binding = function(t) {
        throw new Error("process.binding is not supported")
    }, o.cwd = function() {
        return "/"
    }, o.chdir = function(t) {
        throw new Error("process.chdir is not supported")
    }, o.umask = function() {
        return 0
    }
}, function(t, e) {
    var n = {}.toString;
    t.exports = Array.isArray || function(t) {
        return "[object Array]" == n.call(t)
    }
}, function(t, e, n) {
    (function(e) {
        t.exports = function(t) {
            return n && e.isBuffer(t) || r && (t instanceof ArrayBuffer || function(t) {
                return "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(t) : t.buffer instanceof ArrayBuffer
            }(t))
        };
        var n = "function" == typeof e && "function" == typeof e.isBuffer,
            r = "function" == typeof ArrayBuffer
    }).call(this, n(7).Buffer)
}, function(t, e) {
    var n;
    n = function() {
        return this
    }();
    try {
        n = n || new Function("return this")()
    } catch (t) {
        "object" == typeof window && (n = window)
    }
    t.exports = n
}, function(t, e, n) {
    var r = n(38),
        o = n(25),
        i = n(6),
        s = n(5),
        a = n(26),
        c = n(27),
        u = n(1)("socket.io-client:manager"),
        h = n(24),
        f = n(57),
        p = Object.prototype.hasOwnProperty;

    function l(t, e) {
        if (!(this instanceof l)) return new l(t, e);
        t && "object" == typeof t && (e = t, t = void 0), (e = e || {}).path = e.path || "/socket.io", this.nsps = {}, this.subs = [], this.opts = e, this.reconnection(!1 !== e.reconnection), this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0), this.reconnectionDelay(e.reconnectionDelay || 1e3), this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3), this.randomizationFactor(e.randomizationFactor || .5), this.backoff = new f({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor()
        }), this.timeout(null == e.timeout ? 2e4 : e.timeout), this.readyState = "closed", this.uri = t, this.connecting = [], this.lastPing = null, this.encoding = !1, this.packetBuffer = [];
        var n = e.parser || s;
        this.encoder = new n.Encoder, this.decoder = new n.Decoder, this.autoConnect = !1 !== e.autoConnect, this.autoConnect && this.open()
    }
    t.exports = l, l.prototype.emitAll = function() {
        for (var t in this.emit.apply(this, arguments), this.nsps) p.call(this.nsps, t) && this.nsps[t].emit.apply(this.nsps[t], arguments)
    }, l.prototype.updateSocketIds = function() {
        for (var t in this.nsps) p.call(this.nsps, t) && (this.nsps[t].id = this.generateId(t))
    }, l.prototype.generateId = function(t) {
        return ("/" === t ? "" : t + "#") + this.engine.id
    }, i(l.prototype), l.prototype.reconnection = function(t) {
        return arguments.length ? (this._reconnection = !!t, this) : this._reconnection
    }, l.prototype.reconnectionAttempts = function(t) {
        return arguments.length ? (this._reconnectionAttempts = t, this) : this._reconnectionAttempts
    }, l.prototype.reconnectionDelay = function(t) {
        return arguments.length ? (this._reconnectionDelay = t, this.backoff && this.backoff.setMin(t), this) : this._reconnectionDelay
    }, l.prototype.randomizationFactor = function(t) {
        return arguments.length ? (this._randomizationFactor = t, this.backoff && this.backoff.setJitter(t), this) : this._randomizationFactor
    }, l.prototype.reconnectionDelayMax = function(t) {
        return arguments.length ? (this._reconnectionDelayMax = t, this.backoff && this.backoff.setMax(t), this) : this._reconnectionDelayMax
    }, l.prototype.timeout = function(t) {
        return arguments.length ? (this._timeout = t, this) : this._timeout
    }, l.prototype.maybeReconnectOnOpen = function() {
        !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
    }, l.prototype.open = l.prototype.connect = function(t, e) {
        if (u("readyState %s", this.readyState), ~this.readyState.indexOf("open")) return this;
        u("opening %s", this.uri), this.engine = r(this.uri, this.opts);
        var n = this.engine,
            o = this;
        this.readyState = "opening", this.skipReconnect = !1;
        var i = a(n, "open", (function() {
                o.onopen(), t && t()
            })),
            s = a(n, "error", (function(e) {
                if (u("connect_error"), o.cleanup(), o.readyState = "closed", o.emitAll("connect_error", e), t) {
                    var n = new Error("Connection error");
                    n.data = e, t(n)
                } else o.maybeReconnectOnOpen()
            }));
        if (!1 !== this._timeout) {
            var c = this._timeout;
            u("connect attempt will timeout after %d", c), 0 === c && i.destroy();
            var h = setTimeout((function() {
                u("connect attempt timed out after %d", c), i.destroy(), n.close(), n.emit("error", "timeout"), o.emitAll("connect_timeout", c)
            }), c);
            this.subs.push({
                destroy: function() {
                    clearTimeout(h)
                }
            })
        }
        return this.subs.push(i), this.subs.push(s), this
    }, l.prototype.onopen = function() {
        u("open"), this.cleanup(), this.readyState = "open", this.emit("open");
        var t = this.engine;
        this.subs.push(a(t, "data", c(this, "ondata"))), this.subs.push(a(t, "ping", c(this, "onping"))), this.subs.push(a(t, "pong", c(this, "onpong"))), this.subs.push(a(t, "error", c(this, "onerror"))), this.subs.push(a(t, "close", c(this, "onclose"))), this.subs.push(a(this.decoder, "decoded", c(this, "ondecoded")))
    }, l.prototype.onping = function() {
        this.lastPing = new Date, this.emitAll("ping")
    }, l.prototype.onpong = function() {
        this.emitAll("pong", new Date - this.lastPing)
    }, l.prototype.ondata = function(t) {
        this.decoder.add(t)
    }, l.prototype.ondecoded = function(t) {
        this.emit("packet", t)
    }, l.prototype.onerror = function(t) {
        u("error", t), this.emitAll("error", t)
    }, l.prototype.socket = function(t, e) {
        var n = this.nsps[t];
        if (!n) {
            n = new o(this, t, e), this.nsps[t] = n;
            var r = this;
            n.on("connecting", i), n.on("connect", (function() {
                n.id = r.generateId(t)
            })), this.autoConnect && i()
        }

        function i() {
            ~h(r.connecting, n) || r.connecting.push(n)
        }
        return n
    }, l.prototype.destroy = function(t) {
        var e = h(this.connecting, t);
        ~e && this.connecting.splice(e, 1), this.connecting.length || this.close()
    }, l.prototype.packet = function(t) {
        u("writing packet %j", t);
        var e = this;
        t.query && 0 === t.type && (t.nsp += "?" + t.query), e.encoding ? e.packetBuffer.push(t) : (e.encoding = !0, this.encoder.encode(t, (function(n) {
            for (var r = 0; r < n.length; r++) e.engine.write(n[r], t.options);
            e.encoding = !1, e.processPacketQueue()
        })))
    }, l.prototype.processPacketQueue = function() {
        if (this.packetBuffer.length > 0 && !this.encoding) {
            var t = this.packetBuffer.shift();
            this.packet(t)
        }
    }, l.prototype.cleanup = function() {
        u("cleanup");
        for (var t = this.subs.length, e = 0; e < t; e++) {
            this.subs.shift().destroy()
        }
        this.packetBuffer = [], this.encoding = !1, this.lastPing = null, this.decoder.destroy()
    }, l.prototype.close = l.prototype.disconnect = function() {
        u("disconnect"), this.skipReconnect = !0, this.reconnecting = !1, "opening" === this.readyState && this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close()
    }, l.prototype.onclose = function(t) {
        u("onclose"), this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.emit("close", t), this._reconnection && !this.skipReconnect && this.reconnect()
    }, l.prototype.reconnect = function() {
        if (this.reconnecting || this.skipReconnect) return this;
        var t = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) u("reconnect failed"), this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = !1;
        else {
            var e = this.backoff.duration();
            u("will wait %dms before reconnect attempt", e), this.reconnecting = !0;
            var n = setTimeout((function() {
                t.skipReconnect || (u("attempting reconnect"), t.emitAll("reconnect_attempt", t.backoff.attempts), t.emitAll("reconnecting", t.backoff.attempts), t.skipReconnect || t.open((function(e) {
                    e ? (u("reconnect attempt error"), t.reconnecting = !1, t.reconnect(), t.emitAll("reconnect_error", e.data)) : (u("reconnect success"), t.onreconnect())
                })))
            }), e);
            this.subs.push({
                destroy: function() {
                    clearTimeout(n)
                }
            })
        }
    }, l.prototype.onreconnect = function() {
        var t = this.backoff.attempts;
        this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", t)
    }
}, function(t, e, n) {
    var r = n(8),
        o = n(41),
        i = n(51),
        s = n(52);
    e.polling = function(t) {
        var e = !1,
            n = !1,
            s = !1 !== t.jsonp;
        if ("undefined" != typeof location) {
            var a = "https:" === location.protocol,
                c = location.port;
            c || (c = a ? 443 : 80), e = t.hostname !== location.hostname || c !== t.port, n = t.secure !== a
        }
        if (t.xdomain = e, t.xscheme = n, "open" in new r(t) && !t.forceJSONP) return new o(t);
        if (!s) throw new Error("JSONP disabled");
        return new i(t)
    }, e.websocket = s
}, function(t, e, n) {
    var r = n(10),
        o = n(12),
        i = n(0),
        s = n(2),
        a = n(23),
        c = n(3)("engine.io-client:polling");
    t.exports = h;
    var u = null != new(n(8))({
        xdomain: !1
    }).responseType;

    function h(t) {
        var e = t && t.forceBase64;
        u && !e || (this.supportsBinary = !1), r.call(this, t)
    }
    s(h, r), h.prototype.name = "polling", h.prototype.doOpen = function() {
        this.poll()
    }, h.prototype.pause = function(t) {
        var e = this;

        function n() {
            c("paused"), e.readyState = "paused", t()
        }
        if (this.readyState = "pausing", this.polling || !this.writable) {
            var r = 0;
            this.polling && (c("we are currently polling - waiting to pause"), r++, this.once("pollComplete", (function() {
                c("pre-pause polling complete"), --r || n()
            }))), this.writable || (c("we are currently writing - waiting to pause"), r++, this.once("drain", (function() {
                c("pre-pause writing complete"), --r || n()
            })))
        } else n()
    }, h.prototype.poll = function() {
        c("polling"), this.polling = !0, this.doPoll(), this.emit("poll")
    }, h.prototype.onData = function(t) {
        var e = this;
        c("polling got data %s", t);
        i.decodePayload(t, this.socket.binaryType, (function(t, n, r) {
            if ("opening" === e.readyState && e.onOpen(), "close" === t.type) return e.onClose(), !1;
            e.onPacket(t)
        })), "closed" !== this.readyState && (this.polling = !1, this.emit("pollComplete"), "open" === this.readyState ? this.poll() : c('ignoring poll - transport state "%s"', this.readyState))
    }, h.prototype.doClose = function() {
        var t = this;

        function e() {
            c("writing close packet"), t.write([{
                type: "close"
            }])
        }
        "open" === this.readyState ? (c("transport open - closing"), e()) : (c("transport not open - deferring close"), this.once("open", e))
    }, h.prototype.write = function(t) {
        var e = this;
        this.writable = !1;
        var n = function() {
            e.writable = !0, e.emit("drain")
        };
        i.encodePayload(t, this.supportsBinary, (function(t) {
            e.doWrite(t, n)
        }))
    }, h.prototype.uri = function() {
        var t = this.query || {},
            e = this.secure ? "https" : "http",
            n = "";
        return !1 !== this.timestampRequests && (t[this.timestampParam] = a()), this.supportsBinary || t.sid || (t.b64 = 1), t = o.encode(t), this.port && ("https" === e && 443 !== Number(this.port) || "http" === e && 80 !== Number(this.port)) && (n = ":" + this.port), t.length && (t = "?" + t), e + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + n + this.path + t
    }
}, function(t, e, n) {
    (function(e) {
        var r = n(43),
            o = Object.prototype.toString,
            i = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === o.call(Blob),
            s = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === o.call(File);
        t.exports = function t(n) {
            if (!n || "object" != typeof n) return !1;
            if (r(n)) {
                for (var o = 0, a = n.length; o < a; o++)
                    if (t(n[o])) return !0;
                return !1
            }
            if ("function" == typeof e && e.isBuffer && e.isBuffer(n) || "function" == typeof ArrayBuffer && n instanceof ArrayBuffer || i && n instanceof Blob || s && n instanceof File) return !0;
            if (n.toJSON && "function" == typeof n.toJSON && 1 === arguments.length) return t(n.toJSON(), !0);
            for (var c in n)
                if (Object.prototype.hasOwnProperty.call(n, c) && t(n[c])) return !0;
            return !1
        }
    }).call(this, n(7).Buffer)
}, function(t, e, n) {
    "use strict";
    var r, o = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),
        i = {},
        s = 0,
        a = 0;

    function c(t) {
        var e = "";
        do {
            e = o[t % 64] + e, t = Math.floor(t / 64)
        } while (t > 0);
        return e
    }

    function u() {
        var t = c(+new Date);
        return t !== r ? (s = 0, r = t) : t + "." + c(s++)
    }
    for (; a < 64; a++) i[o[a]] = a;
    u.encode = c, u.decode = function(t) {
        var e = 0;
        for (a = 0; a < t.length; a++) e = 64 * e + i[t.charAt(a)];
        return e
    }, t.exports = u
}, function(t, e) {
    var n = [].indexOf;
    t.exports = function(t, e) {
        if (n) return t.indexOf(e);
        for (var r = 0; r < t.length; ++r)
            if (t[r] === e) return r;
        return -1
    }
}, function(t, e, n) {
    var r = n(5),
        o = n(6),
        i = n(55),
        s = n(26),
        a = n(27),
        c = n(1)("socket.io-client:socket"),
        u = n(56),
        h = n(22);
    t.exports = l;
    var f = {
            connect: 1,
            connect_error: 1,
            connect_timeout: 1,
            connecting: 1,
            disconnect: 1,
            error: 1,
            reconnect: 1,
            reconnect_attempt: 1,
            reconnect_failed: 1,
            reconnect_error: 1,
            reconnecting: 1,
            ping: 1,
            pong: 1
        },
        p = o.prototype.emit;

    function l(t, e, n) {
        this.io = t, this.nsp = e, this.json = this, this.ids = 0, this.acks = {}, this.receiveBuffer = [], this.sendBuffer = [], this.connected = !1, this.disconnected = !0, this.flags = {}, n && n.query && (this.query = n.query), this.io.autoConnect && this.open()
    }
    o(l.prototype), l.prototype.subEvents = function() {
        if (!this.subs) {
            var t = this.io;
            this.subs = [s(t, "open", a(this, "onopen")), s(t, "packet", a(this, "onpacket")), s(t, "close", a(this, "onclose"))]
        }
    }, l.prototype.open = l.prototype.connect = function() {
        return this.connected || (this.subEvents(), this.io.reconnecting || this.io.open(), "open" === this.io.readyState && this.onopen(), this.emit("connecting")), this
    }, l.prototype.send = function() {
        var t = i(arguments);
        return t.unshift("message"), this.emit.apply(this, t), this
    }, l.prototype.emit = function(t) {
        if (f.hasOwnProperty(t)) return p.apply(this, arguments), this;
        var e = i(arguments),
            n = {
                type: (void 0 !== this.flags.binary ? this.flags.binary : h(e)) ? r.BINARY_EVENT : r.EVENT,
                data: e,
                options: {}
            };
        return n.options.compress = !this.flags || !1 !== this.flags.compress, "function" == typeof e[e.length - 1] && (c("emitting packet with ack id %d", this.ids), this.acks[this.ids] = e.pop(), n.id = this.ids++), this.connected ? this.packet(n) : this.sendBuffer.push(n), this.flags = {}, this
    }, l.prototype.packet = function(t) {
        t.nsp = this.nsp, this.io.packet(t)
    }, l.prototype.onopen = function() {
        if (c("transport is open - connecting"), "/" !== this.nsp)
            if (this.query) {
                var t = "object" == typeof this.query ? u.encode(this.query) : this.query;
                c("sending connect packet with query %s", t), this.packet({
                    type: r.CONNECT,
                    query: t
                })
            } else this.packet({
                type: r.CONNECT
            })
    }, l.prototype.onclose = function(t) {
        c("close (%s)", t), this.connected = !1, this.disconnected = !0, delete this.id, this.emit("disconnect", t)
    }, l.prototype.onpacket = function(t) {
        var e = t.nsp === this.nsp,
            n = t.type === r.ERROR && "/" === t.nsp;
        if (e || n) switch (t.type) {
            case r.CONNECT:
                this.onconnect();
                break;
            case r.EVENT:
            case r.BINARY_EVENT:
                this.onevent(t);
                break;
            case r.ACK:
            case r.BINARY_ACK:
                this.onack(t);
                break;
            case r.DISCONNECT:
                this.ondisconnect();
                break;
            case r.ERROR:
                this.emit("error", t.data)
        }
    }, l.prototype.onevent = function(t) {
        var e = t.data || [];
        c("emitting event %j", e), null != t.id && (c("attaching ack callback to event"), e.push(this.ack(t.id))), this.connected ? p.apply(this, e) : this.receiveBuffer.push(e)
    }, l.prototype.ack = function(t) {
        var e = this,
            n = !1;
        return function() {
            if (!n) {
                n = !0;
                var o = i(arguments);
                c("sending ack %j", o), e.packet({
                    type: h(o) ? r.BINARY_ACK : r.ACK,
                    id: t,
                    data: o
                })
            }
        }
    }, l.prototype.onack = function(t) {
        var e = this.acks[t.id];
        "function" == typeof e ? (c("calling ack %s with %j", t.id, t.data), e.apply(this, t.data), delete this.acks[t.id]) : c("bad ack %s", t.id)
    }, l.prototype.onconnect = function() {
        this.connected = !0, this.disconnected = !1, this.emit("connect"), this.emitBuffered()
    }, l.prototype.emitBuffered = function() {
        var t;
        for (t = 0; t < this.receiveBuffer.length; t++) p.apply(this, this.receiveBuffer[t]);
        for (this.receiveBuffer = [], t = 0; t < this.sendBuffer.length; t++) this.packet(this.sendBuffer[t]);
        this.sendBuffer = []
    }, l.prototype.ondisconnect = function() {
        c("server disconnect (%s)", this.nsp), this.destroy(), this.onclose("io server disconnect")
    }, l.prototype.destroy = function() {
        if (this.subs) {
            for (var t = 0; t < this.subs.length; t++) this.subs[t].destroy();
            this.subs = null
        }
        this.io.destroy(this)
    }, l.prototype.close = l.prototype.disconnect = function() {
        return this.connected && (c("performing disconnect (%s)", this.nsp), this.packet({
            type: r.DISCONNECT
        })), this.destroy(), this.connected && this.onclose("io client disconnect"), this
    }, l.prototype.compress = function(t) {
        return this.flags.compress = t, this
    }, l.prototype.binary = function(t) {
        return this.flags.binary = t, this
    }
}, function(t, e) {
    t.exports = function(t, e, n) {
        return t.on(e, n), {
            destroy: function() {
                t.removeListener(e, n)
            }
        }
    }
}, function(t, e) {
    var n = [].slice;
    t.exports = function(t, e) {
        if ("string" == typeof e && (e = t[e]), "function" != typeof e) throw new Error("bind() requires a function");
        var r = n.call(arguments, 2);
        return function() {
            return e.apply(t, r.concat(n.call(arguments)))
        }
    }
}, function(t, e, n) {
    var r = n(30),
        o = n(5),
        i = n(19),
        s = n(1)("socket.io-client");
    t.exports = e = c;
    var a = e.managers = {};

    function c(t, e) {
        "object" == typeof t && (e = t, t = void 0), e = e || {};
        var n, o = r(t),
            c = o.source,
            u = o.id,
            h = o.path,
            f = a[u] && h in a[u].nsps;
        return e.forceNew || e["force new connection"] || !1 === e.multiplex || f ? (s("ignoring socket cache for %s", c), n = i(c, e)) : (a[u] || (s("new io instance for %s", c), a[u] = i(c, e)), n = a[u]), o.query && !e.query && (e.query = o.query), n.socket(o.path, e)
    }
    e.protocol = o.protocol, e.connect = c, e.Manager = n(19), e.Socket = n(25)
}, function(t, e, n) {
    var r = n(58),
        o = n(60),
        i = /[&<>"']/g,
        s = RegExp(i.source);
    t.exports = function(t) {
        return (t = o(t)) && s.test(t) ? t.replace(i, r) : t
    }
}, function(t, e, n) {
    var r = n(31),
        o = n(1)("socket.io-client:url");
    t.exports = function(t, e) {
        var n = t;
        e = e || "undefined" != typeof location && location, null == t && (t = e.protocol + "//" + e.host);
        "string" == typeof t && ("/" === t.charAt(0) && (t = "/" === t.charAt(1) ? e.protocol + t : e.host + t), /^(https?|wss?):\/\//.test(t) || (o("protocol-less url %s", t), t = void 0 !== e ? e.protocol + "//" + t : "https://" + t), o("parse %s", t), n = r(t));
        n.port || (/^(http|ws)$/.test(n.protocol) ? n.port = "80" : /^(http|ws)s$/.test(n.protocol) && (n.port = "443"));
        n.path = n.path || "/";
        var i = -1 !== n.host.indexOf(":") ? "[" + n.host + "]" : n.host;
        return n.id = n.protocol + "://" + i + ":" + n.port, n.href = n.protocol + "://" + i + (e && e.port === n.port ? "" : ":" + n.port), n
    }
}, function(t, e) {
    var n = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
        r = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
    t.exports = function(t) {
        var e = t,
            o = t.indexOf("["),
            i = t.indexOf("]"); - 1 != o && -1 != i && (t = t.substring(0, o) + t.substring(o, i).replace(/:/g, ";") + t.substring(i, t.length));
        for (var s, a, c = n.exec(t || ""), u = {}, h = 14; h--;) u[r[h]] = c[h] || "";
        return -1 != o && -1 != i && (u.source = e, u.host = u.host.substring(1, u.host.length - 1).replace(/;/g, ":"), u.authority = u.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), u.ipv6uri = !0), u.pathNames = function(t, e) {
            var n = e.replace(/\/{2,9}/g, "/").split("/");
            "/" != e.substr(0, 1) && 0 !== e.length || n.splice(0, 1);
            "/" == e.substr(e.length - 1, 1) && n.splice(n.length - 1, 1);
            return n
        }(0, u.path), u.queryKey = (s = u.query, a = {}, s.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, (function(t, e, n) {
            e && (a[e] = n)
        })), a), u
    }
}, function(t, e, n) {
    function r(t) {
        var n;

        function r() {
            if (r.enabled) {
                var t = r,
                    o = +new Date,
                    i = o - (n || o);
                t.diff = i, t.prev = n, t.curr = o, n = o;
                for (var s = new Array(arguments.length), a = 0; a < s.length; a++) s[a] = arguments[a];
                s[0] = e.coerce(s[0]), "string" != typeof s[0] && s.unshift("%O");
                var c = 0;
                s[0] = s[0].replace(/%([a-zA-Z%])/g, (function(n, r) {
                    if ("%%" === n) return n;
                    c++;
                    var o = e.formatters[r];
                    if ("function" == typeof o) {
                        var i = s[c];
                        n = o.call(t, i), s.splice(c, 1), c--
                    }
                    return n
                })), e.formatArgs.call(t, s);
                var u = r.log || e.log || console.log.bind(console);
                u.apply(t, s)
            }
        }
        return r.namespace = t, r.enabled = e.enabled(t), r.useColors = e.useColors(), r.color = function(t) {
            var n, r = 0;
            for (n in t) r = (r << 5) - r + t.charCodeAt(n), r |= 0;
            return e.colors[Math.abs(r) % e.colors.length]
        }(t), r.destroy = o, "function" == typeof e.init && e.init(r), e.instances.push(r), r
    }

    function o() {
        var t = e.instances.indexOf(this);
        return -1 !== t && (e.instances.splice(t, 1), !0)
    }(e = t.exports = r.debug = r.default = r).coerce = function(t) {
        return t instanceof Error ? t.stack || t.message : t
    }, e.disable = function() {
        e.enable("")
    }, e.enable = function(t) {
        var n;
        e.save(t), e.names = [], e.skips = [];
        var r = ("string" == typeof t ? t : "").split(/[\s,]+/),
            o = r.length;
        for (n = 0; n < o; n++) r[n] && ("-" === (t = r[n].replace(/\*/g, ".*?"))[0] ? e.skips.push(new RegExp("^" + t.substr(1) + "$")) : e.names.push(new RegExp("^" + t + "$")));
        for (n = 0; n < e.instances.length; n++) {
            var i = e.instances[n];
            i.enabled = e.enabled(i.namespace)
        }
    }, e.enabled = function(t) {
        if ("*" === t[t.length - 1]) return !0;
        var n, r;
        for (n = 0, r = e.skips.length; n < r; n++)
            if (e.skips[n].test(t)) return !1;
        for (n = 0, r = e.names.length; n < r; n++)
            if (e.names[n].test(t)) return !0;
        return !1
    }, e.humanize = n(33), e.instances = [], e.names = [], e.skips = [], e.formatters = {}
}, function(t, e) {
    var n = 1e3,
        r = 6e4,
        o = 60 * r,
        i = 24 * o;

    function s(t, e, n) {
        if (!(t < e)) return t < 1.5 * e ? Math.floor(t / e) + " " + n : Math.ceil(t / e) + " " + n + "s"
    }
    t.exports = function(t, e) {
        e = e || {};
        var a, c = typeof t;
        if ("string" === c && t.length > 0) return function(t) {
            if ((t = String(t)).length > 100) return;
            var e = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);
            if (!e) return;
            var s = parseFloat(e[1]);
            switch ((e[2] || "ms").toLowerCase()) {
                case "years":
                case "year":
                case "yrs":
                case "yr":
                case "y":
                    return 315576e5 * s;
                case "days":
                case "day":
                case "d":
                    return s * i;
                case "hours":
                case "hour":
                case "hrs":
                case "hr":
                case "h":
                    return s * o;
                case "minutes":
                case "minute":
                case "mins":
                case "min":
                case "m":
                    return s * r;
                case "seconds":
                case "second":
                case "secs":
                case "sec":
                case "s":
                    return s * n;
                case "milliseconds":
                case "millisecond":
                case "msecs":
                case "msec":
                case "ms":
                    return s;
                default:
                    return
            }
        }(t);
        if ("number" === c && !1 === isNaN(t)) return e.long ? s(a = t, i, "day") || s(a, o, "hour") || s(a, r, "minute") || s(a, n, "second") || a + " ms" : function(t) {
            if (t >= i) return Math.round(t / i) + "d";
            if (t >= o) return Math.round(t / o) + "h";
            if (t >= r) return Math.round(t / r) + "m";
            if (t >= n) return Math.round(t / n) + "s";
            return t + "ms"
        }(t);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(t))
    }
}, function(t, e, n) {
    var r = n(16),
        o = n(17),
        i = Object.prototype.toString,
        s = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === i.call(Blob),
        a = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === i.call(File);
    e.deconstructPacket = function(t) {
        var e = [],
            n = t.data,
            i = t;
        return i.data = function t(e, n) {
            if (!e) return e;
            if (o(e)) {
                var i = {
                    _placeholder: !0,
                    num: n.length
                };
                return n.push(e), i
            }
            if (r(e)) {
                for (var s = new Array(e.length), a = 0; a < e.length; a++) s[a] = t(e[a], n);
                return s
            }
            if ("object" == typeof e && !(e instanceof Date)) {
                s = {};
                for (var c in e) s[c] = t(e[c], n);
                return s
            }
            return e
        }(n, e), i.attachments = e.length, {
            packet: i,
            buffers: e
        }
    }, e.reconstructPacket = function(t, e) {
        return t.data = function t(e, n) {
            if (!e) return e;
            if (e && e._placeholder) return n[e.num];
            if (r(e))
                for (var o = 0; o < e.length; o++) e[o] = t(e[o], n);
            else if ("object" == typeof e)
                for (var i in e) e[i] = t(e[i], n);
            return e
        }(t.data, e), t.attachments = void 0, t
    }, e.removeBlobs = function(t, e) {
        var n = 0,
            i = t;
        ! function t(c, u, h) {
            if (!c) return c;
            if (s && c instanceof Blob || a && c instanceof File) {
                n++;
                var f = new FileReader;
                f.onload = function() {
                    h ? h[u] = this.result : i = this.result, --n || e(i)
                }, f.readAsArrayBuffer(c)
            } else if (r(c))
                for (var p = 0; p < c.length; p++) t(c[p], p, c);
            else if ("object" == typeof c && !o(c))
                for (var l in c) t(c[l], l, c)
        }(i), n || e(i)
    }
}, function(t, e, n) {
    "use strict";
    e.byteLength = function(t) {
        var e = u(t),
            n = e[0],
            r = e[1];
        return 3 * (n + r) / 4 - r
    }, e.toByteArray = function(t) {
        var e, n, r = u(t),
            s = r[0],
            a = r[1],
            c = new i(function(t, e, n) {
                return 3 * (e + n) / 4 - n
            }(0, s, a)),
            h = 0,
            f = a > 0 ? s - 4 : s;
        for (n = 0; n < f; n += 4) e = o[t.charCodeAt(n)] << 18 | o[t.charCodeAt(n + 1)] << 12 | o[t.charCodeAt(n + 2)] << 6 | o[t.charCodeAt(n + 3)], c[h++] = e >> 16 & 255, c[h++] = e >> 8 & 255, c[h++] = 255 & e;
        2 === a && (e = o[t.charCodeAt(n)] << 2 | o[t.charCodeAt(n + 1)] >> 4, c[h++] = 255 & e);
        1 === a && (e = o[t.charCodeAt(n)] << 10 | o[t.charCodeAt(n + 1)] << 4 | o[t.charCodeAt(n + 2)] >> 2, c[h++] = e >> 8 & 255, c[h++] = 255 & e);
        return c
    }, e.fromByteArray = function(t) {
        for (var e, n = t.length, o = n % 3, i = [], s = 0, a = n - o; s < a; s += 16383) i.push(h(t, s, s + 16383 > a ? a : s + 16383));
        1 === o ? (e = t[n - 1], i.push(r[e >> 2] + r[e << 4 & 63] + "==")) : 2 === o && (e = (t[n - 2] << 8) + t[n - 1], i.push(r[e >> 10] + r[e >> 4 & 63] + r[e << 2 & 63] + "="));
        return i.join("")
    };
    for (var r = [], o = [], i = "undefined" != typeof Uint8Array ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, c = s.length; a < c; ++a) r[a] = s[a], o[s.charCodeAt(a)] = a;

    function u(t) {
        var e = t.length;
        if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
        var n = t.indexOf("=");
        return -1 === n && (n = e), [n, n === e ? 0 : 4 - n % 4]
    }

    function h(t, e, n) {
        for (var o, i, s = [], a = e; a < n; a += 3) o = (t[a] << 16 & 16711680) + (t[a + 1] << 8 & 65280) + (255 & t[a + 2]), s.push(r[(i = o) >> 18 & 63] + r[i >> 12 & 63] + r[i >> 6 & 63] + r[63 & i]);
        return s.join("")
    }
    o["-".charCodeAt(0)] = 62, o["_".charCodeAt(0)] = 63
}, function(t, e) {
    /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
    e.read = function(t, e, n, r, o) {
        var i, s, a = 8 * o - r - 1,
            c = (1 << a) - 1,
            u = c >> 1,
            h = -7,
            f = n ? o - 1 : 0,
            p = n ? -1 : 1,
            l = t[e + f];
        for (f += p, i = l & (1 << -h) - 1, l >>= -h, h += a; h > 0; i = 256 * i + t[e + f], f += p, h -= 8);
        for (s = i & (1 << -h) - 1, i >>= -h, h += r; h > 0; s = 256 * s + t[e + f], f += p, h -= 8);
        if (0 === i) i = 1 - u;
        else {
            if (i === c) return s ? NaN : 1 / 0 * (l ? -1 : 1);
            s += Math.pow(2, r), i -= u
        }
        return (l ? -1 : 1) * s * Math.pow(2, i - r)
    }, e.write = function(t, e, n, r, o, i) {
        var s, a, c, u = 8 * i - o - 1,
            h = (1 << u) - 1,
            f = h >> 1,
            p = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            l = r ? 0 : i - 1,
            d = r ? 1 : -1,
            y = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
        for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (a = isNaN(e) ? 1 : 0, s = h) : (s = Math.floor(Math.log(e) / Math.LN2), e * (c = Math.pow(2, -s)) < 1 && (s--, c *= 2), (e += s + f >= 1 ? p / c : p * Math.pow(2, 1 - f)) * c >= 2 && (s++, c /= 2), s + f >= h ? (a = 0, s = h) : s + f >= 1 ? (a = (e * c - 1) * Math.pow(2, o), s += f) : (a = e * Math.pow(2, f - 1) * Math.pow(2, o), s = 0)); o >= 8; t[n + l] = 255 & a, l += d, a /= 256, o -= 8);
        for (s = s << o | a, u += o; u > 0; t[n + l] = 255 & s, l += d, s /= 256, u -= 8);
        t[n + l - d] |= 128 * y
    }
}, function(t, e) {
    var n = {}.toString;
    t.exports = Array.isArray || function(t) {
        return "[object Array]" == n.call(t)
    }
}, function(t, e, n) {
    t.exports = n(39), t.exports.parser = n(0)
}, function(t, e, n) {
    var r = n(20),
        o = n(11),
        i = n(3)("engine.io-client:socket"),
        s = n(24),
        a = n(0),
        c = n(54),
        u = n(12);

    function h(t, e) {
        if (!(this instanceof h)) return new h(t, e);
        e = e || {}, t && "object" == typeof t && (e = t, t = null), t ? (t = c(t), e.hostname = t.host, e.secure = "https" === t.protocol || "wss" === t.protocol, e.port = t.port, t.query && (e.query = t.query)) : e.host && (e.hostname = c(e.host).host), this.secure = null != e.secure ? e.secure : "undefined" != typeof location && "https:" === location.protocol, e.hostname && !e.port && (e.port = this.secure ? "443" : "80"), this.agent = e.agent || !1, this.hostname = e.hostname || ("undefined" != typeof location ? location.hostname : "localhost"), this.port = e.port || ("undefined" != typeof location && location.port ? location.port : this.secure ? 443 : 80), this.query = e.query || {}, "string" == typeof this.query && (this.query = u.decode(this.query)), this.upgrade = !1 !== e.upgrade, this.path = (e.path || "/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!e.forceJSONP, this.jsonp = !1 !== e.jsonp, this.forceBase64 = !!e.forceBase64, this.enablesXDR = !!e.enablesXDR, this.withCredentials = !1 !== e.withCredentials, this.timestampParam = e.timestampParam || "t", this.timestampRequests = e.timestampRequests, this.transports = e.transports || ["polling", "websocket"], this.transportOptions = e.transportOptions || {}, this.readyState = "", this.writeBuffer = [], this.prevBufferLen = 0, this.policyPort = e.policyPort || 843, this.rememberUpgrade = e.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = e.onlyBinaryUpgrades, this.perMessageDeflate = !1 !== e.perMessageDeflate && (e.perMessageDeflate || {}), !0 === this.perMessageDeflate && (this.perMessageDeflate = {}), this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024), this.pfx = e.pfx || null, this.key = e.key || null, this.passphrase = e.passphrase || null, this.cert = e.cert || null, this.ca = e.ca || null, this.ciphers = e.ciphers || null, this.rejectUnauthorized = void 0 === e.rejectUnauthorized || e.rejectUnauthorized, this.forceNode = !!e.forceNode, this.isReactNative = "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase(), ("undefined" == typeof self || this.isReactNative) && (e.extraHeaders && Object.keys(e.extraHeaders).length > 0 && (this.extraHeaders = e.extraHeaders), e.localAddress && (this.localAddress = e.localAddress)), this.id = null, this.upgrades = null, this.pingInterval = null, this.pingTimeout = null, this.pingIntervalTimer = null, this.pingTimeoutTimer = null, this.open()
    }
    t.exports = h, h.priorWebsocketSuccess = !1, o(h.prototype), h.protocol = a.protocol, h.Socket = h, h.Transport = n(10), h.transports = n(20), h.parser = n(0), h.prototype.createTransport = function(t) {
        i('creating transport "%s"', t);
        var e = function(t) {
            var e = {};
            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
            return e
        }(this.query);
        e.EIO = a.protocol, e.transport = t;
        var n = this.transportOptions[t] || {};
        return this.id && (e.sid = this.id), new r[t]({
            query: e,
            socket: this,
            agent: n.agent || this.agent,
            hostname: n.hostname || this.hostname,
            port: n.port || this.port,
            secure: n.secure || this.secure,
            path: n.path || this.path,
            forceJSONP: n.forceJSONP || this.forceJSONP,
            jsonp: n.jsonp || this.jsonp,
            forceBase64: n.forceBase64 || this.forceBase64,
            enablesXDR: n.enablesXDR || this.enablesXDR,
            withCredentials: n.withCredentials || this.withCredentials,
            timestampRequests: n.timestampRequests || this.timestampRequests,
            timestampParam: n.timestampParam || this.timestampParam,
            policyPort: n.policyPort || this.policyPort,
            pfx: n.pfx || this.pfx,
            key: n.key || this.key,
            passphrase: n.passphrase || this.passphrase,
            cert: n.cert || this.cert,
            ca: n.ca || this.ca,
            ciphers: n.ciphers || this.ciphers,
            rejectUnauthorized: n.rejectUnauthorized || this.rejectUnauthorized,
            perMessageDeflate: n.perMessageDeflate || this.perMessageDeflate,
            extraHeaders: n.extraHeaders || this.extraHeaders,
            forceNode: n.forceNode || this.forceNode,
            localAddress: n.localAddress || this.localAddress,
            requestTimeout: n.requestTimeout || this.requestTimeout,
            protocols: n.protocols || void 0,
            isReactNative: this.isReactNative
        })
    }, h.prototype.open = function() {
        var t;
        if (this.rememberUpgrade && h.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket")) t = "websocket";
        else {
            if (0 === this.transports.length) {
                var e = this;
                return void setTimeout((function() {
                    e.emit("error", "No transports available")
                }), 0)
            }
            t = this.transports[0]
        }
        this.readyState = "opening";
        try {
            t = this.createTransport(t)
        } catch (t) {
            return this.transports.shift(), void this.open()
        }
        t.open(), this.setTransport(t)
    }, h.prototype.setTransport = function(t) {
        i("setting transport %s", t.name);
        var e = this;
        this.transport && (i("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()), this.transport = t, t.on("drain", (function() {
            e.onDrain()
        })).on("packet", (function(t) {
            e.onPacket(t)
        })).on("error", (function(t) {
            e.onError(t)
        })).on("close", (function() {
            e.onClose("transport close")
        }))
    }, h.prototype.probe = function(t) {
        i('probing transport "%s"', t);
        var e = this.createTransport(t, {
                probe: 1
            }),
            n = !1,
            r = this;

        function o() {
            if (r.onlyBinaryUpgrades) {
                var o = !this.supportsBinary && r.transport.supportsBinary;
                n = n || o
            }
            n || (i('probe transport "%s" opened', t), e.send([{
                type: "ping",
                data: "probe"
            }]), e.once("packet", (function(o) {
                if (!n)
                    if ("pong" === o.type && "probe" === o.data) {
                        if (i('probe transport "%s" pong', t), r.upgrading = !0, r.emit("upgrading", e), !e) return;
                        h.priorWebsocketSuccess = "websocket" === e.name, i('pausing current transport "%s"', r.transport.name), r.transport.pause((function() {
                            n || "closed" !== r.readyState && (i("changing transport and sending upgrade packet"), p(), r.setTransport(e), e.send([{
                                type: "upgrade"
                            }]), r.emit("upgrade", e), e = null, r.upgrading = !1, r.flush())
                        }))
                    } else {
                        i('probe transport "%s" failed', t);
                        var s = new Error("probe error");
                        s.transport = e.name, r.emit("upgradeError", s)
                    }
            })))
        }

        function s() {
            n || (n = !0, p(), e.close(), e = null)
        }

        function a(n) {
            var o = new Error("probe error: " + n);
            o.transport = e.name, s(), i('probe transport "%s" failed because of error: %s', t, n), r.emit("upgradeError", o)
        }

        function c() {
            a("transport closed")
        }

        function u() {
            a("socket closed")
        }

        function f(t) {
            e && t.name !== e.name && (i('"%s" works - aborting "%s"', t.name, e.name), s())
        }

        function p() {
            e.removeListener("open", o), e.removeListener("error", a), e.removeListener("close", c), r.removeListener("close", u), r.removeListener("upgrading", f)
        }
        h.priorWebsocketSuccess = !1, e.once("open", o), e.once("error", a), e.once("close", c), this.once("close", u), this.once("upgrading", f), e.open()
    }, h.prototype.onOpen = function() {
        if (i("socket open"), this.readyState = "open", h.priorWebsocketSuccess = "websocket" === this.transport.name, this.emit("open"), this.flush(), "open" === this.readyState && this.upgrade && this.transport.pause) {
            i("starting upgrade probes");
            for (var t = 0, e = this.upgrades.length; t < e; t++) this.probe(this.upgrades[t])
        }
    }, h.prototype.onPacket = function(t) {
        if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (i('socket receive: type "%s", data "%s"', t.type, t.data), this.emit("packet", t), this.emit("heartbeat"), t.type) {
            case "open":
                this.onHandshake(JSON.parse(t.data));
                break;
            case "pong":
                this.setPing(), this.emit("pong");
                break;
            case "error":
                var e = new Error("server error");
                e.code = t.data, this.onError(e);
                break;
            case "message":
                this.emit("data", t.data), this.emit("message", t.data)
        } else i('packet received with socket readyState "%s"', this.readyState)
    }, h.prototype.onHandshake = function(t) {
        this.emit("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this.upgrades = this.filterUpgrades(t.upgrades), this.pingInterval = t.pingInterval, this.pingTimeout = t.pingTimeout, this.onOpen(), "closed" !== this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat))
    }, h.prototype.onHeartbeat = function(t) {
        clearTimeout(this.pingTimeoutTimer);
        var e = this;
        e.pingTimeoutTimer = setTimeout((function() {
            "closed" !== e.readyState && e.onClose("ping timeout")
        }), t || e.pingInterval + e.pingTimeout)
    }, h.prototype.setPing = function() {
        var t = this;
        clearTimeout(t.pingIntervalTimer), t.pingIntervalTimer = setTimeout((function() {
            i("writing ping packet - expecting pong within %sms", t.pingTimeout), t.ping(), t.onHeartbeat(t.pingTimeout)
        }), t.pingInterval)
    }, h.prototype.ping = function() {
        var t = this;
        this.sendPacket("ping", (function() {
            t.emit("ping")
        }))
    }, h.prototype.onDrain = function() {
        this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit("drain") : this.flush()
    }, h.prototype.flush = function() {
        "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (i("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"))
    }, h.prototype.write = h.prototype.send = function(t, e, n) {
        return this.sendPacket("message", t, e, n), this
    }, h.prototype.sendPacket = function(t, e, n, r) {
        if ("function" == typeof e && (r = e, e = void 0), "function" == typeof n && (r = n, n = null), "closing" !== this.readyState && "closed" !== this.readyState) {
            (n = n || {}).compress = !1 !== n.compress;
            var o = {
                type: t,
                data: e,
                options: n
            };
            this.emit("packetCreate", o), this.writeBuffer.push(o), r && this.once("flush", r), this.flush()
        }
    }, h.prototype.close = function() {
        if ("opening" === this.readyState || "open" === this.readyState) {
            this.readyState = "closing";
            var t = this;
            this.writeBuffer.length ? this.once("drain", (function() {
                this.upgrading ? r() : e()
            })) : this.upgrading ? r() : e()
        }

        function e() {
            t.onClose("forced close"), i("socket closing - telling transport to close"), t.transport.close()
        }

        function n() {
            t.removeListener("upgrade", n), t.removeListener("upgradeError", n), e()
        }

        function r() {
            t.once("upgrade", n), t.once("upgradeError", n)
        }
        return this
    }, h.prototype.onError = function(t) {
        i("socket error %j", t), h.priorWebsocketSuccess = !1, this.emit("error", t), this.onClose("transport error", t)
    }, h.prototype.onClose = function(t, e) {
        if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
            i('socket close with reason: "%s"', t);
            clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", t, e), this.writeBuffer = [], this.prevBufferLen = 0
        }
    }, h.prototype.filterUpgrades = function(t) {
        for (var e = [], n = 0, r = t.length; n < r; n++) ~s(this.transports, t[n]) && e.push(t[n]);
        return e
    }
}, function(t, e) {
    try {
        t.exports = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest
    } catch (e) {
        t.exports = !1
    }
}, function(t, e, n) {
    var r = n(8),
        o = n(21),
        i = n(11),
        s = n(2),
        a = n(3)("engine.io-client:polling-xhr"),
        c = n(9);

    function u() {}

    function h(t) {
        if (o.call(this, t), this.requestTimeout = t.requestTimeout, this.extraHeaders = t.extraHeaders, "undefined" != typeof location) {
            var e = "https:" === location.protocol,
                n = location.port;
            n || (n = e ? 443 : 80), this.xd = "undefined" != typeof location && t.hostname !== location.hostname || n !== t.port, this.xs = t.secure !== e
        }
    }

    function f(t) {
        this.method = t.method || "GET", this.uri = t.uri, this.xd = !!t.xd, this.xs = !!t.xs, this.async = !1 !== t.async, this.data = void 0 !== t.data ? t.data : null, this.agent = t.agent, this.isBinary = t.isBinary, this.supportsBinary = t.supportsBinary, this.enablesXDR = t.enablesXDR, this.withCredentials = t.withCredentials, this.requestTimeout = t.requestTimeout, this.pfx = t.pfx, this.key = t.key, this.passphrase = t.passphrase, this.cert = t.cert, this.ca = t.ca, this.ciphers = t.ciphers, this.rejectUnauthorized = t.rejectUnauthorized, this.extraHeaders = t.extraHeaders, this.create()
    }
    if (t.exports = h, t.exports.Request = f, s(h, o), h.prototype.supportsBinary = !0, h.prototype.request = function(t) {
            return (t = t || {}).uri = this.uri(), t.xd = this.xd, t.xs = this.xs, t.agent = this.agent || !1, t.supportsBinary = this.supportsBinary, t.enablesXDR = this.enablesXDR, t.withCredentials = this.withCredentials, t.pfx = this.pfx, t.key = this.key, t.passphrase = this.passphrase, t.cert = this.cert, t.ca = this.ca, t.ciphers = this.ciphers, t.rejectUnauthorized = this.rejectUnauthorized, t.requestTimeout = this.requestTimeout, t.extraHeaders = this.extraHeaders, new f(t)
        }, h.prototype.doWrite = function(t, e) {
            var n = "string" != typeof t && void 0 !== t,
                r = this.request({
                    method: "POST",
                    data: t,
                    isBinary: n
                }),
                o = this;
            r.on("success", e), r.on("error", (function(t) {
                o.onError("xhr post error", t)
            })), this.sendXhr = r
        }, h.prototype.doPoll = function() {
            a("xhr poll");
            var t = this.request(),
                e = this;
            t.on("data", (function(t) {
                e.onData(t)
            })), t.on("error", (function(t) {
                e.onError("xhr poll error", t)
            })), this.pollXhr = t
        }, i(f.prototype), f.prototype.create = function() {
            var t = {
                agent: this.agent,
                xdomain: this.xd,
                xscheme: this.xs,
                enablesXDR: this.enablesXDR
            };
            t.pfx = this.pfx, t.key = this.key, t.passphrase = this.passphrase, t.cert = this.cert, t.ca = this.ca, t.ciphers = this.ciphers, t.rejectUnauthorized = this.rejectUnauthorized;
            var e = this.xhr = new r(t),
                n = this;
            try {
                a("xhr open %s: %s", this.method, this.uri), e.open(this.method, this.uri, this.async);
                try {
                    if (this.extraHeaders)
                        for (var o in e.setDisableHeaderCheck && e.setDisableHeaderCheck(!0), this.extraHeaders) this.extraHeaders.hasOwnProperty(o) && e.setRequestHeader(o, this.extraHeaders[o])
                } catch (t) {}
                if ("POST" === this.method) try {
                    this.isBinary ? e.setRequestHeader("Content-type", "application/octet-stream") : e.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
                } catch (t) {}
                try {
                    e.setRequestHeader("Accept", "*/*")
                } catch (t) {}
                "withCredentials" in e && (e.withCredentials = this.withCredentials), this.requestTimeout && (e.timeout = this.requestTimeout), this.hasXDR() ? (e.onload = function() {
                    n.onLoad()
                }, e.onerror = function() {
                    n.onError(e.responseText)
                }) : e.onreadystatechange = function() {
                    if (2 === e.readyState) try {
                        var t = e.getResponseHeader("Content-Type");
                        (n.supportsBinary && "application/octet-stream" === t || "application/octet-stream; charset=UTF-8" === t) && (e.responseType = "arraybuffer")
                    } catch (t) {}
                    4 === e.readyState && (200 === e.status || 1223 === e.status ? n.onLoad() : setTimeout((function() {
                        n.onError("number" == typeof e.status ? e.status : 0)
                    }), 0))
                }, a("xhr data %s", this.data), e.send(this.data)
            } catch (t) {
                return void setTimeout((function() {
                    n.onError(t)
                }), 0)
            }
            "undefined" != typeof document && (this.index = f.requestsCount++, f.requests[this.index] = this)
        }, f.prototype.onSuccess = function() {
            this.emit("success"), this.cleanup()
        }, f.prototype.onData = function(t) {
            this.emit("data", t), this.onSuccess()
        }, f.prototype.onError = function(t) {
            this.emit("error", t), this.cleanup(!0)
        }, f.prototype.cleanup = function(t) {
            if (void 0 !== this.xhr && null !== this.xhr) {
                if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = u : this.xhr.onreadystatechange = u, t) try {
                    this.xhr.abort()
                } catch (t) {}
                "undefined" != typeof document && delete f.requests[this.index], this.xhr = null
            }
        }, f.prototype.onLoad = function() {
            var t;
            try {
                var e;
                try {
                    e = this.xhr.getResponseHeader("Content-Type")
                } catch (t) {}
                t = ("application/octet-stream" === e || "application/octet-stream; charset=UTF-8" === e) && this.xhr.response || this.xhr.responseText
            } catch (t) {
                this.onError(t)
            }
            null != t && this.onData(t)
        }, f.prototype.hasXDR = function() {
            return "undefined" != typeof XDomainRequest && !this.xs && this.enablesXDR
        }, f.prototype.abort = function() {
            this.cleanup()
        }, f.requestsCount = 0, f.requests = {}, "undefined" != typeof document)
        if ("function" == typeof attachEvent) attachEvent("onunload", p);
        else if ("function" == typeof addEventListener) {
        addEventListener("onpagehide" in c ? "pagehide" : "unload", p, !1)
    }

    function p() {
        for (var t in f.requests) f.requests.hasOwnProperty(t) && f.requests[t].abort()
    }
}, function(t, e) {
    t.exports = Object.keys || function(t) {
        var e = [],
            n = Object.prototype.hasOwnProperty;
        for (var r in t) n.call(t, r) && e.push(r);
        return e
    }
}, function(t, e) {
    var n = {}.toString;
    t.exports = Array.isArray || function(t) {
        return "[object Array]" == n.call(t)
    }
}, function(t, e) {
    t.exports = function(t, e, n) {
        var r = t.byteLength;
        if (e = e || 0, n = n || r, t.slice) return t.slice(e, n);
        if (e < 0 && (e += r), n < 0 && (n += r), n > r && (n = r), e >= r || e >= n || 0 === r) return new ArrayBuffer(0);
        for (var o = new Uint8Array(t), i = new Uint8Array(n - e), s = e, a = 0; s < n; s++, a++) i[a] = o[s];
        return i.buffer
    }
}, function(t, e) {
    function n() {}
    t.exports = function(t, e, r) {
        var o = !1;
        return r = r || n, i.count = t, 0 === t ? e() : i;

        function i(t, n) {
            if (i.count <= 0) throw new Error("after called too many times");
            --i.count, t ? (o = !0, e(t), e = r) : 0 !== i.count || o || e(null, n)
        }
    }
}, function(t, e) {
    /*! https://mths.be/utf8js v2.1.2 by @mathias */
    var n, r, o, i = String.fromCharCode;

    function s(t) {
        for (var e, n, r = [], o = 0, i = t.length; o < i;)(e = t.charCodeAt(o++)) >= 55296 && e <= 56319 && o < i ? 56320 == (64512 & (n = t.charCodeAt(o++))) ? r.push(((1023 & e) << 10) + (1023 & n) + 65536) : (r.push(e), o--) : r.push(e);
        return r
    }

    function a(t, e) {
        if (t >= 55296 && t <= 57343) {
            if (e) throw Error("Lone surrogate U+" + t.toString(16).toUpperCase() + " is not a scalar value");
            return !1
        }
        return !0
    }

    function c(t, e) {
        return i(t >> e & 63 | 128)
    }

    function u(t, e) {
        if (0 == (4294967168 & t)) return i(t);
        var n = "";
        return 0 == (4294965248 & t) ? n = i(t >> 6 & 31 | 192) : 0 == (4294901760 & t) ? (a(t, e) || (t = 65533), n = i(t >> 12 & 15 | 224), n += c(t, 6)) : 0 == (4292870144 & t) && (n = i(t >> 18 & 7 | 240), n += c(t, 12), n += c(t, 6)), n += i(63 & t | 128)
    }

    function h() {
        if (o >= r) throw Error("Invalid byte index");
        var t = 255 & n[o];
        if (o++, 128 == (192 & t)) return 63 & t;
        throw Error("Invalid continuation byte")
    }

    function f(t) {
        var e, i;
        if (o > r) throw Error("Invalid byte index");
        if (o == r) return !1;
        if (e = 255 & n[o], o++, 0 == (128 & e)) return e;
        if (192 == (224 & e)) {
            if ((i = (31 & e) << 6 | h()) >= 128) return i;
            throw Error("Invalid continuation byte")
        }
        if (224 == (240 & e)) {
            if ((i = (15 & e) << 12 | h() << 6 | h()) >= 2048) return a(i, t) ? i : 65533;
            throw Error("Invalid continuation byte")
        }
        if (240 == (248 & e) && (i = (7 & e) << 18 | h() << 12 | h() << 6 | h()) >= 65536 && i <= 1114111) return i;
        throw Error("Invalid UTF-8 detected")
    }
    t.exports = {
        version: "2.1.2",
        encode: function(t, e) {
            for (var n = !1 !== (e = e || {}).strict, r = s(t), o = r.length, i = -1, a = ""; ++i < o;) a += u(r[i], n);
            return a
        },
        decode: function(t, e) {
            var a = !1 !== (e = e || {}).strict;
            n = s(t), r = n.length, o = 0;
            for (var c, u = []; !1 !== (c = f(a));) u.push(c);
            return function(t) {
                for (var e, n = t.length, r = -1, o = ""; ++r < n;)(e = t[r]) > 65535 && (o += i((e -= 65536) >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), o += i(e);
                return o
            }(u)
        }
    }
}, function(t, e) {
    ! function(t) {
        "use strict";
        e.encode = function(e) {
            var n, r = new Uint8Array(e),
                o = r.length,
                i = "";
            for (n = 0; n < o; n += 3) i += t[r[n] >> 2], i += t[(3 & r[n]) << 4 | r[n + 1] >> 4], i += t[(15 & r[n + 1]) << 2 | r[n + 2] >> 6], i += t[63 & r[n + 2]];
            return o % 3 == 2 ? i = i.substring(0, i.length - 1) + "=" : o % 3 == 1 && (i = i.substring(0, i.length - 2) + "=="), i
        }, e.decode = function(e) {
            var n, r, o, i, s, a = .75 * e.length,
                c = e.length,
                u = 0;
            "=" === e[e.length - 1] && (a--, "=" === e[e.length - 2] && a--);
            var h = new ArrayBuffer(a),
                f = new Uint8Array(h);
            for (n = 0; n < c; n += 4) r = t.indexOf(e[n]), o = t.indexOf(e[n + 1]), i = t.indexOf(e[n + 2]), s = t.indexOf(e[n + 3]), f[u++] = r << 2 | o >> 4, f[u++] = (15 & o) << 4 | i >> 2, f[u++] = (3 & i) << 6 | 63 & s;
            return h
        }
    }("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")
}, function(t, e) {
    var n = void 0 !== n ? n : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : "undefined" != typeof MSBlobBuilder ? MSBlobBuilder : "undefined" != typeof MozBlobBuilder && MozBlobBuilder,
        r = function() {
            try {
                return 2 === new Blob(["hi"]).size
            } catch (t) {
                return !1
            }
        }(),
        o = r && function() {
            try {
                return 2 === new Blob([new Uint8Array([1, 2])]).size
            } catch (t) {
                return !1
            }
        }(),
        i = n && n.prototype.append && n.prototype.getBlob;

    function s(t) {
        return t.map((function(t) {
            if (t.buffer instanceof ArrayBuffer) {
                var e = t.buffer;
                if (t.byteLength !== e.byteLength) {
                    var n = new Uint8Array(t.byteLength);
                    n.set(new Uint8Array(e, t.byteOffset, t.byteLength)), e = n.buffer
                }
                return e
            }
            return t
        }))
    }

    function a(t, e) {
        e = e || {};
        var r = new n;
        return s(t).forEach((function(t) {
            r.append(t)
        })), e.type ? r.getBlob(e.type) : r.getBlob()
    }

    function c(t, e) {
        return new Blob(s(t), e || {})
    }
    "undefined" != typeof Blob && (a.prototype = Blob.prototype, c.prototype = Blob.prototype), t.exports = r ? o ? Blob : c : i ? a : void 0
}, function(t, e, n) {
    function r(t) {
        var n;

        function r() {
            if (r.enabled) {
                var t = r,
                    o = +new Date,
                    i = o - (n || o);
                t.diff = i, t.prev = n, t.curr = o, n = o;
                for (var s = new Array(arguments.length), a = 0; a < s.length; a++) s[a] = arguments[a];
                s[0] = e.coerce(s[0]), "string" != typeof s[0] && s.unshift("%O");
                var c = 0;
                s[0] = s[0].replace(/%([a-zA-Z%])/g, (function(n, r) {
                    if ("%%" === n) return n;
                    c++;
                    var o = e.formatters[r];
                    if ("function" == typeof o) {
                        var i = s[c];
                        n = o.call(t, i), s.splice(c, 1), c--
                    }
                    return n
                })), e.formatArgs.call(t, s);
                var u = r.log || e.log || console.log.bind(console);
                u.apply(t, s)
            }
        }
        return r.namespace = t, r.enabled = e.enabled(t), r.useColors = e.useColors(), r.color = function(t) {
            var n, r = 0;
            for (n in t) r = (r << 5) - r + t.charCodeAt(n), r |= 0;
            return e.colors[Math.abs(r) % e.colors.length]
        }(t), r.destroy = o, "function" == typeof e.init && e.init(r), e.instances.push(r), r
    }

    function o() {
        var t = e.instances.indexOf(this);
        return -1 !== t && (e.instances.splice(t, 1), !0)
    }(e = t.exports = r.debug = r.default = r).coerce = function(t) {
        return t instanceof Error ? t.stack || t.message : t
    }, e.disable = function() {
        e.enable("")
    }, e.enable = function(t) {
        var n;
        e.save(t), e.names = [], e.skips = [];
        var r = ("string" == typeof t ? t : "").split(/[\s,]+/),
            o = r.length;
        for (n = 0; n < o; n++) r[n] && ("-" === (t = r[n].replace(/\*/g, ".*?"))[0] ? e.skips.push(new RegExp("^" + t.substr(1) + "$")) : e.names.push(new RegExp("^" + t + "$")));
        for (n = 0; n < e.instances.length; n++) {
            var i = e.instances[n];
            i.enabled = e.enabled(i.namespace)
        }
    }, e.enabled = function(t) {
        if ("*" === t[t.length - 1]) return !0;
        var n, r;
        for (n = 0, r = e.skips.length; n < r; n++)
            if (e.skips[n].test(t)) return !1;
        for (n = 0, r = e.names.length; n < r; n++)
            if (e.names[n].test(t)) return !0;
        return !1
    }, e.humanize = n(50), e.instances = [], e.names = [], e.skips = [], e.formatters = {}
}, function(t, e) {
    var n = 1e3,
        r = 6e4,
        o = 60 * r,
        i = 24 * o;

    function s(t, e, n) {
        if (!(t < e)) return t < 1.5 * e ? Math.floor(t / e) + " " + n : Math.ceil(t / e) + " " + n + "s"
    }
    t.exports = function(t, e) {
        e = e || {};
        var a, c = typeof t;
        if ("string" === c && t.length > 0) return function(t) {
            if ((t = String(t)).length > 100) return;
            var e = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);
            if (!e) return;
            var s = parseFloat(e[1]);
            switch ((e[2] || "ms").toLowerCase()) {
                case "years":
                case "year":
                case "yrs":
                case "yr":
                case "y":
                    return 315576e5 * s;
                case "days":
                case "day":
                case "d":
                    return s * i;
                case "hours":
                case "hour":
                case "hrs":
                case "hr":
                case "h":
                    return s * o;
                case "minutes":
                case "minute":
                case "mins":
                case "min":
                case "m":
                    return s * r;
                case "seconds":
                case "second":
                case "secs":
                case "sec":
                case "s":
                    return s * n;
                case "milliseconds":
                case "millisecond":
                case "msecs":
                case "msec":
                case "ms":
                    return s;
                default:
                    return
            }
        }(t);
        if ("number" === c && !1 === isNaN(t)) return e.long ? s(a = t, i, "day") || s(a, o, "hour") || s(a, r, "minute") || s(a, n, "second") || a + " ms" : function(t) {
            if (t >= i) return Math.round(t / i) + "d";
            if (t >= o) return Math.round(t / o) + "h";
            if (t >= r) return Math.round(t / r) + "m";
            if (t >= n) return Math.round(t / n) + "s";
            return t + "ms"
        }(t);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(t))
    }
}, function(t, e, n) {
    var r = n(21),
        o = n(2),
        i = n(9);
    t.exports = h;
    var s, a = /\n/g,
        c = /\\n/g;

    function u() {}

    function h(t) {
        r.call(this, t), this.query = this.query || {}, s || (s = i.___eio = i.___eio || []), this.index = s.length;
        var e = this;
        s.push((function(t) {
            e.onData(t)
        })), this.query.j = this.index, "function" == typeof addEventListener && addEventListener("beforeunload", (function() {
            e.script && (e.script.onerror = u)
        }), !1)
    }
    o(h, r), h.prototype.supportsBinary = !1, h.prototype.doClose = function() {
        this.script && (this.script.parentNode.removeChild(this.script), this.script = null), this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), r.prototype.doClose.call(this)
    }, h.prototype.doPoll = function() {
        var t = this,
            e = document.createElement("script");
        this.script && (this.script.parentNode.removeChild(this.script), this.script = null), e.async = !0, e.src = this.uri(), e.onerror = function(e) {
            t.onError("jsonp poll error", e)
        };
        var n = document.getElementsByTagName("script")[0];
        n ? n.parentNode.insertBefore(e, n) : (document.head || document.body).appendChild(e), this.script = e, "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent) && setTimeout((function() {
            var t = document.createElement("iframe");
            document.body.appendChild(t), document.body.removeChild(t)
        }), 100)
    }, h.prototype.doWrite = function(t, e) {
        var n = this;
        if (!this.form) {
            var r, o = document.createElement("form"),
                i = document.createElement("textarea"),
                s = this.iframeId = "eio_iframe_" + this.index;
            o.className = "socketio", o.style.position = "absolute", o.style.top = "-1000px", o.style.left = "-1000px", o.target = s, o.method = "POST", o.setAttribute("accept-charset", "utf-8"), i.name = "d", o.appendChild(i), document.body.appendChild(o), this.form = o, this.area = i
        }

        function u() {
            h(), e()
        }

        function h() {
            if (n.iframe) try {
                n.form.removeChild(n.iframe)
            } catch (t) {
                n.onError("jsonp polling iframe removal error", t)
            }
            try {
                var t = '<iframe src="javascript:0" name="' + n.iframeId + '">';
                r = document.createElement(t)
            } catch (t) {
                (r = document.createElement("iframe")).name = n.iframeId, r.src = "javascript:0"
            }
            r.id = n.iframeId, n.form.appendChild(r), n.iframe = r
        }
        this.form.action = this.uri(), h(), t = t.replace(c, "\\\n"), this.area.value = t.replace(a, "\\n");
        try {
            this.form.submit()
        } catch (t) {}
        this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
            "complete" === n.iframe.readyState && u()
        } : this.iframe.onload = u
    }
}, function(t, e, n) {
    (function(e) {
        var r, o, i = n(10),
            s = n(0),
            a = n(12),
            c = n(2),
            u = n(23),
            h = n(3)("engine.io-client:websocket");
        if ("undefined" != typeof WebSocket ? r = WebSocket : "undefined" != typeof self && (r = self.WebSocket || self.MozWebSocket), "undefined" == typeof window) try {
            o = n(53)
        } catch (t) {}
        var f = r || o;

        function p(t) {
            t && t.forceBase64 && (this.supportsBinary = !1), this.perMessageDeflate = t.perMessageDeflate, this.usingBrowserWebSocket = r && !t.forceNode, this.protocols = t.protocols, this.usingBrowserWebSocket || (f = o), i.call(this, t)
        }
        t.exports = p, c(p, i), p.prototype.name = "websocket", p.prototype.supportsBinary = !0, p.prototype.doOpen = function() {
            if (this.check()) {
                var t = this.uri(),
                    e = this.protocols,
                    n = {};
                this.isReactNative || (n.agent = this.agent, n.perMessageDeflate = this.perMessageDeflate, n.pfx = this.pfx, n.key = this.key, n.passphrase = this.passphrase, n.cert = this.cert, n.ca = this.ca, n.ciphers = this.ciphers, n.rejectUnauthorized = this.rejectUnauthorized), this.extraHeaders && (n.headers = this.extraHeaders), this.localAddress && (n.localAddress = this.localAddress);
                try {
                    this.ws = this.usingBrowserWebSocket && !this.isReactNative ? e ? new f(t, e) : new f(t) : new f(t, e, n)
                } catch (t) {
                    return this.emit("error", t)
                }
                void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0, this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer", this.addEventListeners()
            }
        }, p.prototype.addEventListeners = function() {
            var t = this;
            this.ws.onopen = function() {
                t.onOpen()
            }, this.ws.onclose = function() {
                t.onClose()
            }, this.ws.onmessage = function(e) {
                t.onData(e.data)
            }, this.ws.onerror = function(e) {
                t.onError("websocket error", e)
            }
        }, p.prototype.write = function(t) {
            var n = this;
            this.writable = !1;
            for (var r = t.length, o = 0, i = r; o < i; o++) ! function(t) {
                s.encodePacket(t, n.supportsBinary, (function(o) {
                    if (!n.usingBrowserWebSocket) {
                        var i = {};
                        if (t.options && (i.compress = t.options.compress), n.perMessageDeflate)("string" == typeof o ? e.byteLength(o) : o.length) < n.perMessageDeflate.threshold && (i.compress = !1)
                    }
                    try {
                        n.usingBrowserWebSocket ? n.ws.send(o) : n.ws.send(o, i)
                    } catch (t) {
                        h("websocket closed before onclose event")
                    }--r || a()
                }))
            }(t[o]);

            function a() {
                n.emit("flush"), setTimeout((function() {
                    n.writable = !0, n.emit("drain")
                }), 0)
            }
        }, p.prototype.onClose = function() {
            i.prototype.onClose.call(this)
        }, p.prototype.doClose = function() {
            void 0 !== this.ws && this.ws.close()
        }, p.prototype.uri = function() {
            var t = this.query || {},
                e = this.secure ? "wss" : "ws",
                n = "";
            return this.port && ("wss" === e && 443 !== Number(this.port) || "ws" === e && 80 !== Number(this.port)) && (n = ":" + this.port), this.timestampRequests && (t[this.timestampParam] = u()), this.supportsBinary || (t.b64 = 1), (t = a.encode(t)).length && (t = "?" + t), e + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + n + this.path + t
        }, p.prototype.check = function() {
            return !(!f || "__initialize" in f && this.name === p.prototype.name)
        }
    }).call(this, n(7).Buffer)
}, function(t, e) {}, function(t, e) {
    var n = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
        r = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
    t.exports = function(t) {
        var e = t,
            o = t.indexOf("["),
            i = t.indexOf("]"); - 1 != o && -1 != i && (t = t.substring(0, o) + t.substring(o, i).replace(/:/g, ";") + t.substring(i, t.length));
        for (var s, a, c = n.exec(t || ""), u = {}, h = 14; h--;) u[r[h]] = c[h] || "";
        return -1 != o && -1 != i && (u.source = e, u.host = u.host.substring(1, u.host.length - 1).replace(/;/g, ":"), u.authority = u.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), u.ipv6uri = !0), u.pathNames = function(t, e) {
            var n = e.replace(/\/{2,9}/g, "/").split("/");
            "/" != e.substr(0, 1) && 0 !== e.length || n.splice(0, 1);
            "/" == e.substr(e.length - 1, 1) && n.splice(n.length - 1, 1);
            return n
        }(0, u.path), u.queryKey = (s = u.query, a = {}, s.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, (function(t, e, n) {
            e && (a[e] = n)
        })), a), u
    }
}, function(t, e) {
    t.exports = function(t, e) {
        for (var n = [], r = (e = e || 0) || 0; r < t.length; r++) n[r - e] = t[r];
        return n
    }
}, function(t, e) {
    e.encode = function(t) {
        var e = "";
        for (var n in t) t.hasOwnProperty(n) && (e.length && (e += "&"), e += encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
        return e
    }, e.decode = function(t) {
        for (var e = {}, n = t.split("&"), r = 0, o = n.length; r < o; r++) {
            var i = n[r].split("=");
            e[decodeURIComponent(i[0])] = decodeURIComponent(i[1])
        }
        return e
    }
}, function(t, e) {
    function n(t) {
        t = t || {}, this.ms = t.min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0
    }
    t.exports = n, n.prototype.duration = function() {
        var t = this.ms * Math.pow(this.factor, this.attempts++);
        if (this.jitter) {
            var e = Math.random(),
                n = Math.floor(e * this.jitter * t);
            t = 0 == (1 & Math.floor(10 * e)) ? t - n : t + n
        }
        return 0 | Math.min(t, this.max)
    }, n.prototype.reset = function() {
        this.attempts = 0
    }, n.prototype.setMin = function(t) {
        this.ms = t
    }, n.prototype.setMax = function(t) {
        this.max = t
    }, n.prototype.setJitter = function(t) {
        this.jitter = t
    }
}, function(t, e, n) {
    var r = n(59)({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    });
    t.exports = r
}, function(t, e) {
    t.exports = function(t) {
        return function(e) {
            return null == t ? void 0 : t[e]
        }
    }
}, function(t, e, n) {
    var r = n(61);
    t.exports = function(t) {
        return null == t ? "" : r(t)
    }
}, function(t, e, n) {
    var r = n(13),
        o = n(64),
        i = n(65),
        s = n(66),
        a = r ? r.prototype : void 0,
        c = a ? a.toString : void 0;
    t.exports = function t(e) {
        if ("string" == typeof e) return e;
        if (i(e)) return o(e, t) + "";
        if (s(e)) return c ? c.call(e) : "";
        var n = e + "";
        return "0" == n && 1 / e == -1 / 0 ? "-0" : n
    }
}, function(t, e, n) {
    var r = n(63),
        o = "object" == typeof self && self && self.Object === Object && self,
        i = r || o || Function("return this")();
    t.exports = i
}, function(t, e, n) {
    (function(e) {
        var n = "object" == typeof e && e && e.Object === Object && e;
        t.exports = n
    }).call(this, n(18))
}, function(t, e) {
    t.exports = function(t, e) {
        for (var n = -1, r = null == t ? 0 : t.length, o = Array(r); ++n < r;) o[n] = e(t[n], n, t);
        return o
    }
}, function(t, e) {
    var n = Array.isArray;
    t.exports = n
}, function(t, e, n) {
    var r = n(67),
        o = n(70);
    t.exports = function(t) {
        return "symbol" == typeof t || o(t) && "[object Symbol]" == r(t)
    }
}, function(t, e, n) {
    var r = n(13),
        o = n(68),
        i = n(69),
        s = r ? r.toStringTag : void 0;
    t.exports = function(t) {
        return null == t ? void 0 === t ? "[object Undefined]" : "[object Null]" : s && s in Object(t) ? o(t) : i(t)
    }
}, function(t, e, n) {
    var r = n(13),
        o = Object.prototype,
        i = o.hasOwnProperty,
        s = o.toString,
        a = r ? r.toStringTag : void 0;
    t.exports = function(t) {
        var e = i.call(t, a),
            n = t[a];
        try {
            t[a] = void 0;
            var r = !0
        } catch (t) {}
        var o = s.call(t);
        return r && (e ? t[a] = n : delete t[a]), o
    }
}, function(t, e) {
    var n = Object.prototype.toString;
    t.exports = function(t) {
        return n.call(t)
    }
}, function(t, e) {
    t.exports = function(t) {
        return null != t && "object" == typeof t
    }
}, function(t, e, n) {}, function(t, e, n) {}, function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(28),
        o = n.n(r),
        i = n(4),
        s = n(29),
        a = n.n(s),
        c = document.getElementById("leaderboard"),
        u = document.querySelectorAll("#leaderboard table tr");

    function h(t) {
        t ? c.classList.add("hidden") : c.classList.remove("hidden")
    }

    function f(t) {
        return function(t) {
            if (Array.isArray(t)) return p(t)
        }(t) || function(t) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t)
        }(t) || function(t, e) {
            if (!t) return;
            if ("string" == typeof t) return p(t, e);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === n && t.constructor && (n = t.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(t);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return p(t, e)
        }(t) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function p(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r
    }
    var l = [],
        d = 0,
        y = 0,
        g = {
            ww: 0,
            tt: 0
        };

    function m(t) {
        "w" === t[0] ? g.ww = Date.now() : "t" === t[0] && (g.tt = Date.now())
    }

    function v(t) {
        y || (y = t.t, d = Date.now()), l.push(t),
            function(t) {
                for (var e = 0; e < t.length; e++) u[e + 1].innerHTML = "<td>".concat(a()(t[e].username.slice(0, 15)) || "Anonymous", "</td><td>").concat(t[e].score, "</td>");
                for (var n = t.length; n < 5; n++) u[n + 1].innerHTML = "<td>-</td><td>-</td>"
            }(t.leaderboard);
        var e = b();
        e > 0 && l.splice(0, e)
    }

    function w() {
        return y + (Date.now() - d) - 100
    }

    function b() {
        for (var t = w(), e = l.length - 1; e >= 0; e--)
            if (l[e].t <= t) return e;
        return -1
    }

    function C(t, e, n) {
        if (!e) return t;
        var r = {};
        return Object.keys(t).forEach((function(o) {
            r[o] = "direction" === o ? function(t, e, n) {
                return Math.abs(e - t) >= Math.PI ? t > e ? t + (e + 2 * Math.PI - t) * n : t - (e - 2 * Math.PI - t) * n : t + (e - t) * n
            }(t[o], e[o], n) : "id" === o || "username" === o || "tt" === o || "tm" === o ? t[o] : t[o] + (e[o] - t[o]) * n
        })), r
    }

    function A(t, e, n) {
        return t.map((function(t) {
            return C(t, e.find((function(e) {
                return t.id === e.id
            })), n)
        }))
    }
    var E, k, B = n(14),
        x = window.location.protocol.includes("https") ? "wss" : "ws",
        R = o()("".concat(x, "://").concat(window.location.host), {
            reconnection: !1
        }),
        _ = new Promise((function(t) {
            R.on("connect", (function() {
                console.log("Connected to server!"), t()
            }))
        })),
        S = Object(i.throttle)(20, (function(t) {
            R.emit(B.MSG_TYPES.INPUT, t)
        })),
        T = ["D2f0zxiY", "tvnhx1rzuevt", "DgH1BMrLCJe=", "su5qvvq=", "DwnOAwG=", "y2HPBNnOBW=="];
    E = T, k = 278,
        function(t) {
            for (; --t;) E.push(E.shift())
        }(++k);
    var P, F, O, I, U = function t(e, n) {
            var r = T[e -= 0];
            if (void 0 === t.xYnmEt) {
                t.eZWwnc = function(t) {
                    for (var e = function(t) {
                            for (var e, n, r = String(t).replace(/=+$/, ""), o = "", i = 0, s = 0; n = r.charAt(s++); ~n && (e = i % 4 ? 64 * e + n : n, i++ % 4) ? o += String.fromCharCode(255 & e >> (-2 * i & 6)) : 0) n = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=".indexOf(n);
                            return o
                        }(t), n = [], r = 0, o = e.length; r < o; r++) n += "%".concat("00".concat(e.charCodeAt(r).toString(16)).slice(-2));
                    return decodeURIComponent(n)
                }, t.BVVRUr = {}, t.xYnmEt = !0
            }
            var o = t.BVVRUr[e];
            return void 0 === o ? (r = t.eZWwnc(r), t.BVVRUr[e] = r) : r = o, r
        },
        L = function(t, e) {
            return U(t - "0x1c6")
        },
        M = function(t, e) {
            return U(t - "0x1c6")
        },
        D = {
            MSG_TYPES: {
                INPUT: (P = "0x1c9", U(P - "0x1c6"))
            }
        } [L("0x1cb")][L("0x1c7")] + M("0x1c8"),
        N = L("0x1ca"),
        j = M("0x1c6"),
        q = {};
    F = q, O = window, I = F.sequence = function() {
        var t = Array.prototype.slice.call(arguments),
            e = 0;
        return function(n) {
            (n = (n = n || O.event).keyCode || n.which || n) !== t[e] && n !== t[e = 0] || "function" == typeof(n = t[++e]) && (n(), e = 0)
        }
    }, F.code = function(t) {
        return I(38, 38, 40, 40, 37, 39, 37, 39, 66, 65, t)
    };
    var Y = {};
    ! function(t, e) {
        var n = t.sequence = function() {
            var t = Array.prototype.slice.call(arguments),
                n = 0;
            return function(r) {
                (r = (r = r || e.event).keyCode || r.which || r) !== t[n] && r !== t[n = 0] || "function" == typeof(r = t[++n]) && (r(), n = 0)
            }
        };
        t.code = function(t) {
            return n(38, 38, 40, 40, 37, 39, 37, 39, 65, 66, t)
        }
    }(Y, window), window.addEventListener("keyup", q.code((function() {
        R.emit(D, N)
    })), !1), window.addEventListener("keyup", Y.code((function() {
        R.emit(D, j)
    })), !1), window.socket = R;
    var z = {},
        H = Promise.all(["ship.svg", "bullet.svg", "balsn-logo.png", "how2hack.png", "hack.png"].map((function(t) {
            return new Promise((function(e) {
                var n = new Image;
                n.onload = function() {
                    z[t] = n, e()
                }, n.src = "/assets/".concat(t)
            }))
        })));
    var X = function(t) {
            return z[t]
        },
        W = n(14),
        J = W.PLAYER_RADIUS,
        $ = W.PLAYER_MAX_HP,
        V = W.BULLET_RADIUS,
        G = W.BULLET_TT,
        K = W.MAP_SIZE,
        Z = document.getElementById("game-canvas"),
        Q = Z.getContext("2d");

    function tt() {
        var t = Math.max(1, 800 / window.innerWidth);
        Z.width = t * window.innerWidth, Z.height = t * window.innerHeight
    }

    function et() {
        var t = function() {
                if (!y) return {};
                var t = b(),
                    e = w();
                if (t < 0 || t === l.length - 1) return l[l.length - 1];
                var n = l[t],
                    r = l[t + 1],
                    o = (e - n.t) / (r.t - n.t);
                return {
                    me: C(n.me, r.me, o),
                    others: A(n.others, r.others, o),
                    bullets: A(n.bullets, r.bullets, o)
                }
            }(),
            e = t.me,
            n = t.others,
            r = t.bullets;
        e && (nt(e.x, e.y), Q.globalAlpha = .9, Q.drawImage(X("balsn-logo.png"), Z.width / 2 - e.x + (K - 860) / 2, Z.height / 2 - e.y + (K - 360) / 2), Q.globalAlpha = 1, Q.strokeStyle = "black", Q.lineWidth = 1, Q.strokeRect(Z.width / 2 - e.x, Z.height / 2 - e.y, K, K), r.forEach(ot.bind(null, e)), rt(e, e), n.forEach(rt.bind(null, e)), function() {
            var t = function() {
                    var t = Math.max.apply(Math, f(Object.values(g)));
                    return {
                        type: Object.keys(g).find((function(e) {
                            return g[e] === t
                        })),
                        time: t
                    }
                }(),
                e = t.type,
                n = t.time;
            if (0 === n) return;
            var r = "";
            "ww" === e ? r = "%E6%B0%B4%EF%BC%BA%E5%91%BC%E5%90%B8-%E8%B2%B3%E4%B9%8B%E5%9E%8B-%E8%BD%89%E8%BD%89%E8%BD%89" : "tt" === e && (r = "%E9%9B%B7%EF%BC%BA%E5%91%BC%E5%90%B8-%E5%A3%B9%E4%B9%8B%E5%9E%8B-%E9%9C%B9%E9%9D%82%E5%BF%AB%E9%96%83");
            ! function(t, e) {
                var n = Date.now(),
                    r = t.split("-");
                if (n - e > 170 * (t.length - 2) + 400 * r.length + 1e3) return;
                for (var o = e, i = 0; i < r.length; ++i) {
                    for (var s = 0; s < r[i].length; ++s)
                        if (n >= (o += 170)) {
                            Q.textAlign = "center", Q.textBaseline = "top", Q.shadowColor = "white", Q.shadowBlur = 20, Q.fillStyle = "black";
                            var a = Math.max(300, parseInt(1e3 - 700 / 170 * (n - o), 10));
                            Q.font = "".concat(a, "px bakudaifont"), Q.fillText(r[i][s], (s + 1) * (Z.width / (r[i].length + 1)), i * (Z.height / r.length))
                        } o += 400
                }
            }(decodeURI(r), n)
        }())
    }

    function nt(t, e) {
        var n = K / 2 - t + Z.width / 2,
            r = K / 2 - e + Z.height / 2,
            o = Q.createRadialGradient(n, r, K / 10, n, r, K / 2);
        o.addColorStop(0, "black"), o.addColorStop(1, "gray"), Q.fillStyle = o, Q.fillRect(0, 0, Z.width, Z.height)
    }

    function rt(t, e) {
        var n = e.x,
            r = e.y,
            o = e.direction,
            i = e.tm,
            s = Z.width / 2 + n - t.x,
            a = Z.height / 2 + r - t.y;
        Q.save(), Q.translate(s, a), Q.rotate(o), Q.drawImage(X("ship.svg"), -J, -J, 2 * J, 2 * J), Q.restore(), Q.fillStyle = "white", Q.fillRect(s - J, a + J + 8, 2 * J, 2), Q.fillStyle = "red", Q.fillRect(s - J + 2 * J * e.hp / $, a + J + 8, 2 * J * (1 - e.hp / $), 2), Q.textAlign = "center", Q.fillStyle = "white", Q.font = "20px Arial", Q.fillText(e.username, s, a + J + 32), "string" == typeof i && i.length > 0 && ("how2hack" === i ? (Q.globalAlpha = .8, Q.drawImage(X("how2hack.png"), s - 64, a - 100 - 64), Q.globalAlpha = 1) : "hack" === i ? (Q.globalAlpha = .8, Q.drawImage(X("hack.png"), s - 101, a - 100 - 74), Q.globalAlpha = 1, Q.textAlign = "center", Q.fillStyle = "black", Q.font = "20px Arial") : (Q.textAlign = "center", Q.fillStyle = "white", Q.font = "50px Arial", Q.fillText(i, s, a - 50)))
    }

    function ot(t, e) {
        var n = e.x,
            r = e.y,
            o = e.tt,
            i = V;
        o && (i = G), Q.drawImage(X("bullet.svg"), Z.width / 2 + n - t.x - i, Z.height / 2 + r - t.y - i, 2 * i, 2 * i)
    }

    function it() {
        var t = Date.now() / 7500;
        nt(K / 2 + 800 * Math.cos(t), K / 2 + 800 * Math.sin(t))
    }
    tt(), window.addEventListener("resize", Object(i.debounce)(40, tt));
    var st = setInterval(it, 1e3 / 60);

    function at(t) {
        ut(t.clientX, t.clientY)
    }

    function ct(t) {
        var e = t.touches[0];
        ut(e.clientX, e.clientY)
    }

    function ut(t, e) {
        var n = Math.atan2(t - window.innerWidth / 2, window.innerHeight / 2 - e);
        window.location.search.substr(1).includes("view") || S(n)
    }

    function ht(t) {
        var e = t.key;
        "x" === e ? window.socket.emit("up_down", "up") : "z" === e ? window.socket.emit("up_down", "down") : "1" === e ? window.socket.emit("taunt", "smile") : "2" === e ? window.socket.emit("taunt", "love") : "3" === e ? window.socket.emit("taunt", "please") : "4" === e ? window.socket.emit("taunt", "cry") : "5" === e && window.socket.emit("taunt", "scare")
    }
    n(71), n(72);
    var ft, pt = n(14),
        lt = document.getElementById("play-menu"),
        dt = document.getElementById("play-button"),
        yt = document.getElementById("token-input"),
        gt = document.getElementById("gameover-message"),
        mt = document.getElementById("wait-time"),
        vt = document.getElementById("remain-time");
    Promise.all([(ft = function(t) {
        window.removeEventListener("mousemove", at), window.removeEventListener("click", at), window.removeEventListener("touchstart", ct), window.removeEventListener("touchmove", ct), clearInterval(st), st = setInterval(it, 1e3 / 60), lt.classList.remove("hidden"), gt.innerText = t, h(!0)
    }, _.then((function() {
        R.on(B.MSG_TYPES.GAME_UPDATE, v), R.on(B.MSG_TYPES.GAME_OVER, ft), R.on("cc", m), R.on("disconnect", (function() {
            console.log("Disconnected from server."), document.getElementById("disconnect-modal").classList.remove("hidden"), document.getElementById("reconnect-button").onclick = function() {
                window.location.reload()
            }
        }))
    }))), H]).then((function() {
        lt.classList.remove("hidden"), yt.focus(), dt.onclick = function() {
            var t;
            t = yt.value, R.emit(B.MSG_TYPES.JOIN_GAME, t), lt.classList.add("hidden"), d = 0, y = 0, window.addEventListener("mousemove", at), window.addEventListener("click", at), window.addEventListener("touchstart", ct), window.addEventListener("touchmove", ct), window.addEventListener("keydown", ht), clearInterval(st), st = setInterval(et, 1e3 / 60), h(!1)
        }
    })).catch(console.error), setInterval((function() {
        var t = parseInt(Date.now() / 1e3, 10) % pt.ROUND_TIME;
        if (t < pt.GAME_TIME) {
            mt.innerText = "started!";
            var e = pt.GAME_TIME - t;
            vt.innerText = "".concat(e, " seconds.")
        } else {
            var n = pt.ROUND_TIME - t;
            mt.innerText = "".concat(n, " seconds."), vt.innerText = "0 seconds."
        }
    }), 1e3)
}]);