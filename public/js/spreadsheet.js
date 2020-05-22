/*
@license

dhtmlxSpreadsheet v.3.1.4 GPL

This software is covered by GPL license.
To use it in non-GPL project, you need obtain Commercial or Enterprise license
Please contact sales@dhtmlx.com. Usage without proper license is prohibited.
(c) XB Software.

*/
if (window.dhx && (window.dhx_legacy = dhx, delete window.dhx), function (t, e) {
        "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.dhx = e() : t.dhx = e()
    }(window, function () {
        return function (t) {
            var e = {};

            function n(i) {
                if (e[i]) return e[i].exports;
                var o = e[i] = {
                    i: i,
                    l: !1,
                    exports: {}
                };
                return t[i].call(o.exports, o, o.exports, n), o.l = !0, o.exports
            }
            return n.m = t, n.c = e, n.d = function (t, e, i) {
                n.o(t, e) || Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: i
                })
            }, n.r = function (t) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                    value: "Module"
                }), Object.defineProperty(t, "__esModule", {
                    value: !0
                })
            }, n.t = function (t, e) {
                if (1 & e && (t = n(t)), 8 & e) return t;
                if (4 & e && "object" == typeof t && t && t.__esModule) return t;
                var i = Object.create(null);
                if (n.r(i), Object.defineProperty(i, "default", {
                        enumerable: !0,
                        value: t
                    }), 2 & e && "string" != typeof t)
                    for (var o in t) n.d(i, o, function (e) {
                        return t[e]
                    }.bind(null, o));
                return i
            }, n.n = function (t) {
                var e = t && t.__esModule ? function () {
                    return t.default
                } : function () {
                    return t
                };
                return n.d(e, "a", e), e
            }, n.o = function (t, e) {
                return Object.prototype.hasOwnProperty.call(t, e)
            }, n.p = "/codebase/", n(n.s = 42)
        }([function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(54);
            e.el = i.defineElement, e.sv = i.defineSvgElement, e.view = i.defineView, e.create = i.createView, e.inject = i.injectView, e.disableHelp = function () {
                i.DEVMODE.mutations = !1, i.DEVMODE.warnings = !1, i.DEVMODE.verbose = !1, i.DEVMODE.UNKEYED_INPUT = !1
            }, e.resizer = function (t) {
                return e.el("iframe", {
                    _hooks: {
                        didInsert: function (e) {
                            var n = function () {
                                var n = e.el.offsetHeight,
                                    i = e.el.offsetWidth;
                                t(i, n)
                            };
                            e.el.contentWindow.onresize = n, n()
                        }
                    },
                    style: "position:absolute;left:0;top:-100%;width:100%;height:100%;margin:1px 0 0;border:none;opacity:0;visibility:hidden;pointer-events:none;"
                })
            }
        }, function (t, e, n) {
            "use strict";
            (function (t) {
                Object.defineProperty(e, "__esModule", {
                    value: !0
                });
                var i = n(2);

                function o(t) {
                    if (!t) return "";
                    var e = (t = --t) % 26,
                        n = String.fromCharCode(65 + e),
                        i = Math.floor(t / 26);
                    return i > 0 ? o(i) + n : n
                }

                function r(t) {
                    return t ? (t = t.toUpperCase()).split("").reduce(function (t, e, n, i) {
                        return t += (e.charCodeAt(0) - 64) * Math.pow(26, i.length - (n + 1))
                    }, 0) : -1
                }

                function s(t, e) {
                    if (!e) return {};
                    var n = e.match(/([a-zA-Z]*\d*):([a-zA-Z]*\d*)/);
                    if (n) return {
                        start: s(t, n[1]),
                        end: s(t, n[2])
                    };
                    var i = a(e);
                    if (!i) return {};
                    var o = t.data.getId(i.row),
                        r = t.config.columns[i.col];
                    return o && r && r.id ? {
                        col: r.id,
                        row: o
                    } : {}
                }

                function a(t) {
                    var e = t.match(/([a-zA-Z]*)(\d*)/);
                    if (e && e[1] && e[2]) return {
                        col: r(e[1]),
                        row: parseInt(e[2], 10) - 1
                    }
                }

                function l(t, e) {
                    return "" + o(e) + (t + 1)
                }

                function c(t) {
                    return new RegExp(/([A-Z]+\d+:[A-Z]+\d+)|(?:,)([A-Z]+\d+)/).test(t)
                }

                function u(t) {
                    var e = t.split(":").map(function (t) {
                        return a(t)
                    });
                    return {
                        start: {
                            row: Math.min(e[0].row, e[1].row),
                            col: Math.min(e[0].col, e[1].col)
                        },
                        end: {
                            row: Math.max(e[0].row, e[1].row),
                            col: Math.max(e[0].col, e[1].col)
                        }
                    }
                }

                function d(t, e) {
                    void 0 === e && (e = "row");
                    var n = [],
                        i = "row" === e ? "col" : "row";
                    if (t)
                        for (var o = u(t), r = o.start, s = o.end, a = r[e]; a <= s[e]; a++)
                            for (var c = r[i]; c <= s[i]; c++) {
                                var d = "row" === e ? l(a, c) : l(c, a);
                                n.push(d)
                            }
                    return n
                }
                e.getLetterFromNumber = o, e.getNumberFromLetter = r, e.getCellIds = s, e.getCellIndex = a, e.getCellNameByIndex = l, e.getCellNameById = function (t, e, n) {
                    if (!e) return "";
                    var r = t.data.getIndex(e) + 1,
                        s = i.findIndex(t.config.columns, function (t) {
                            return n === t.id
                        });
                    return r < 0 || s < 0 ? void 0 : "" + o(s) + r
                }, e.getCellInfo = function (t, e) {
                    var n = s(t, e);
                    if (n.start && (n = n.start), !n || !e) return {
                        locked: !1
                    };
                    var i = t.data.getItem(n.row);
                    return i ? (i.$info || (i.$info = {}), i.$info[n.col] || (i.$info[n.col] = {}), t.data.getItem(n.row).$info[n.col]) : {}
                }, e.updateCellInfo = function (t, e, n) {
                    var o = s(t, e),
                        r = t.data.getItem(o.row);
                    if (!r) return {};
                    r.$info || (r.$info = {}), r.$info[o.col] || (r.$info[o.col] = {}), i.extend(r.$info[o.col], n)
                }, e.isRangeId = c, e.getRangeIndexes = u, e.getRangeArray = d, e.getRangeMatrix = function (t, e) {
                    void 0 === e && (e = "row");
                    var n = [],
                        i = "row" === e ? "col" : "row";
                    if (t)
                        for (var o = u(t), r = o.start, s = o.end, a = r[e]; a <= s[e]; a++) {
                            for (var c = [], d = r[i]; d <= s[i]; d++) {
                                var f = "row" === e ? l(a, d) : l(d, a);
                                c.push(f)
                            }
                            n.push(c)
                        }
                    return n
                }, e.getNextRangeCell = function (t, e, n) {
                    void 0 === n && (n = "row");
                    var i = d(t, n);
                    return i[i.indexOf(e) + 1] || i[0]
                }, e.getPrevRangeCell = function (t, e, n) {
                    void 0 === n && (n = "row");
                    var i = d(t, n);
                    return i[i.indexOf(e) - 1] || i[i.length - 1]
                }, e.getCellsArray = function (t) {
                    if (t) return t.split(",").reduce(function (t, e) {
                        return c(e = e.toUpperCase()) ? t = t.concat(d(e)) : t.push(e), t
                    }, [])
                }, e.extendConfig = function (t, e, n) {
                    for (var o in void 0 === t && (t = {}), void 0 === e && (e = {}), void 0 === n && (n = !0), t) {
                        var r = e[o],
                            s = t[o];
                        s && "validate" in s && (e[o] = s.validate(r) ? r : s.default, t[o] = s.default)
                    }
                    return i.extend(t, e, n)
                }, e.isWasmSupported = function () {
                    try {
                        if ("object" == typeof WebAssembly && "function" == typeof WebAssembly.instantiate) {
                            var t = new WebAssembly.Module(Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0));
                            if (t instanceof WebAssembly.Module) return new WebAssembly.Instance(t) instanceof WebAssembly.Instance
                        }
                    } catch (t) {
                        return !1
                    }
                    return !1
                }, e.fetchFile = function (e, n, i) {
                    return new t(function (t, o) {
                        var r = new XMLHttpRequest;
                        r.open(n, e, !0), r.responseType = i, r.onload = function () {
                            var e = r.response;
                            e ? t(e) : o(r)
                        }, r.onerror = function () {
                            return o(r)
                        }, r.send(null)
                    })
                }
            }).call(this, n(10))
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = (new Date).valueOf();
            e.uid = function () {
                return "u" + i++
            }, e.extend = function t(e, n, i) {
                if (void 0 === i && (i = !0), n)
                    for (var o in n) {
                        var r = n[o],
                            s = e[o];
                        !i || "object" != typeof s || s instanceof Date || s instanceof Array ? e[o] = r : t(s, r)
                    }
                return e
            }, e.copy = function (t) {
                var e = {};
                for (var n in t) e[n] = t[n];
                return e
            }, e.naturalSort = function (t) {
                return t.sort(function (t, e) {
                    return "string" == typeof t ? t.localeCompare(e) : t - e
                })
            }, e.findIndex = function (t, e) {
                for (var n = t.length, i = 0; i < n; i++)
                    if (e(t[i])) return i;
                return -1
            }, e.isEqualString = function (t, e) {
                if (t.length > e.length) return !1;
                for (var n = 0; n < t.length; n++)
                    if (t[n].toLowerCase() !== e[n].toLowerCase()) return !1;
                return !0
            }, e.singleOuterClick = function (t) {
                var e = function (n) {
                    t(n) && document.removeEventListener("click", e)
                };
                document.addEventListener("click", e)
            }
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__assign || function () {
                return (i = Object.assign || function (t) {
                    for (var e, n = 1, i = arguments.length; n < i; n++)
                        for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                    return t
                }).apply(this, arguments)
            };

            function o(t, e) {
                for (void 0 === e && (e = "dhx_id"), t instanceof Event && (t = t.target); t;) {
                    if (t.getAttribute && t.getAttribute(e)) return t;
                    t = t.parentNode
                }
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), n(44), e.toNode = function (t) {
                return "string" == typeof t && (t = document.getElementById(t) || document.querySelector(t)), t || document.body
            }, e.eventHandler = function (t, e) {
                var n = Object.keys(e);
                return function (i) {
                    for (var o = t(i), r = i.target; r;) {
                        var s = r.getAttribute && r.getAttribute("class") || "";
                        if (s.length)
                            for (var a = s.split(" "), l = 0; l < n.length; l++)
                                if (a.indexOf(n[l]) > -1) return e[n[l]](i, o);
                        r = r.parentNode
                    }
                    return !0
                }
            }, e.locate = function (t, e) {
                void 0 === e && (e = "dhx_id");
                var n = o(t, e);
                return n ? n.getAttribute(e) : ""
            }, e.locateNode = o, e.getBox = function (t) {
                var e = t.getBoundingClientRect(),
                    n = document.body,
                    i = window.pageYOffset || n.scrollTop,
                    o = window.pageXOffset || n.scrollLeft;
                return {
                    top: e.top + i,
                    left: e.left + o,
                    right: n.offsetWidth - e.right,
                    bottom: n.offsetHeight - e.bottom,
                    width: e.right - e.left,
                    height: e.bottom - e.top
                }
            };
            var r, s = -1;

            function a(t) {
                var e = t.getBoundingClientRect();
                return {
                    left: e.left + window.pageXOffset,
                    right: e.right + window.pageXOffset,
                    top: e.top + window.pageYOffset,
                    bottom: e.bottom + window.pageYOffset
                }
            }

            function l(t, e) {
                var n = e.mode === r.bottom || e.mode === r.top ? function (t, e) {
                    var n, o, s = c(),
                        a = s.rightBorder,
                        l = s.bottomBorder - t.bottom - e.height,
                        d = t.top - e.height;
                    e.mode === r.bottom ? l >= 0 ? o = t.bottom : d >= 0 && (o = d) : d >= 0 ? o = d : l >= 0 && (o = t.bottom);
                    if (l < 0 && d < 0) {
                        if (e.auto) return u(t, i(i({}, e), {
                            mode: r.right,
                            auto: !1
                        }));
                        o = l > d ? t.bottom : d
                    }
                    if (e.centering) n = function (t, e, n) {
                        var i = t.right - t.left,
                            o = (e - i) / 2,
                            r = t.left - o,
                            s = t.right + o;
                        if (r >= 0 && s <= n) return r;
                        if (r < 0) return 0;
                        return n - e
                    }(t, e.width, a);
                    else {
                        var f = a - t.left - e.width,
                            h = t.right - e.width;
                        n = f >= 0 ? t.left : h >= 0 ? h : h > f ? t.left : h
                    }
                    return {
                        left: n,
                        top: o
                    }
                }(t, e) : u(t, e);
                return {
                    left: n.left + "px",
                    top: n.top + "px",
                    minWidth: e.width + "px",
                    position: "absolute"
                }
            }

            function c() {
                return {
                    rightBorder: window.pageXOffset + window.innerWidth,
                    bottomBorder: window.pageYOffset + window.innerHeight
                }
            }

            function u(t, e) {
                var n, o, s = c(),
                    a = s.rightBorder,
                    l = s.bottomBorder,
                    d = a - t.right - e.width,
                    f = t.left - e.width;
                if (e.mode === r.right ? d >= 0 ? n = t.right : f >= 0 && (n = f) : f >= 0 ? n = f : d >= 0 && (n = t.right), f < 0 && d < 0) {
                    if (e.auto) return u(t, i(i({}, e), {
                        mode: r.bottom,
                        auto: !1
                    }));
                    n = f > d ? f : t.right
                }
                if (e.centering) o = function (t, e, n) {
                    var i = (e - (t.bottom - t.top)) / 2,
                        o = t.top - i,
                        r = t.bottom + i;
                    return o >= 0 && r <= n ? o : o < 0 ? 0 : n - e
                }(t, e.width, a);
                else {
                    var h = t.bottom - e.height,
                        p = l - t.top - e.height;
                    o = p >= 0 ? t.top : h > 0 ? h : h > p ? h : t.top
                }
                return {
                    left: n,
                    top: o
                }
            }
            e.getScrollbarWidth = function () {
                    if (s > -1) return s;
                    var t = document.createElement("div");
                    return document.body.appendChild(t), t.style.cssText = "position: absolute;left: -99999px;overflow:scroll;width: 100px;height: 100px;", s = t.offsetWidth - t.clientWidth, document.body.removeChild(t), s
                }, e.fitPosition = function (t, e) {
                    return l(a(t), e)
                }, e.isIE = function () {
                    var t = window.navigator.userAgent;
                    return t.indexOf("MSIE ") > -1 || t.indexOf("Trident/") > -1
                }, e.getRealPosition = a,
                function (t) {
                    t.left = "left", t.right = "right", t.bottom = "bottom", t.top = "top"
                }(r = e.Position || (e.Position = {})), e.calculatePosition = l
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                function (t) {
                    t.beforeValueChange = "beforeValueChange", t.afterValueChange = "afterValueChange", t.beforeStyleChange = "beforeStyleChange", t.afterStyleChange = "afterStyleChange", t.beforeFormatChange = "beforeFormatChange", t.afterFormatChange = "afterFormatChange", t.beforeSelectionSet = "beforeSelectionSet", t.afterSelectionSet = "afterSelectionSet", t.beforeRowAdd = "beforeRowAdd", t.afterRowAdd = "afterRowAdd", t.beforeRowDelete = "beforeRowDelete", t.afterRowDelete = "afterRowDelete", t.beforeColumnAdd = "beforeColumnAdd", t.afterColumnAdd = "afterColumnAdd", t.beforeColumnDelete = "beforeColumnDelete", t.afterColumnDelete = "afterColumnDelete", t.beforeFocusSet = "beforeFocusSet", t.afterFocusSet = "afterFocusSet", t.beforeEditStart = "beforeEditStart", t.afterEditStart = "afterEditStart", t.beforeEditEnd = "beforeEditEnd", t.afterEditEnd = "afterEditEnd", t.groupFill = "groupFill", t.editLineInput = "editLineInput", t.editLineFocus = "editLineFocus", t.editLineBlur = "editLineBlur", t.cellInput = "cellInput", t.gridRedraw = "gridRedraw"
                }(e.SpreadsheetEvents || (e.SpreadsheetEvents = {})),
                function (t) {
                    t.setCellStyle = "setCellStyle", t.setCellValue = "setCellValue", t.setCellFormat = "setCellFormat", t.removeCellStyles = "removeCellStyles", t.lockCell = "lockCell", t.deleteRow = "deleteRow", t.addRow = "addRow", t.deleteColumn = "deleteColumn", t.addColumn = "addColumn", t.groupAction = "groupAction", t.groupRowAction = "groupRowAction", t.groupColAction = "groupColAction"
                }(e.Actions || (e.Actions = {}))
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(0),
                o = n(9);
            e.getCss = function (t) {
                var e = "";
                return t.type !== o.ItemType.button && t.size && (e += " " + t.size), t.active && (e += " active"), t.$disabled && (e += " disabled"), t.css && (e += " " + t.css), e
            }, e.getButtonCss = function (t) {
                var e = " ";
                switch (e += "link" === t.name ? "dhx_btn--link" : "dhx_btn--flat", e += "large" === t.size ? " dhx_btn--large" : " dhx_btn--small", t.usage) {
                    case "danger":
                        e += " dhx_btn--danger";
                        break;
                    case "secondary":
                        e += " dhx_btn--secondary";
                        break;
                    case "success":
                        e += " dhx_btn--success"
                }
                return e
            }, e.counter = function (t) {
                if (t.count) return i.el(".counter", t.count)
            }, e.icon = function (t) {
                void 0 === t && (t = "");
                var e = "dhx-icon-block ";
                return "dxi" === t.slice(0, 3) && (e += "dxi "), i.el("div", {
                    class: e + t
                })
            }
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            e.default = {
                undo: "Undo",
                redo: "Redo",
                textColor: "Text color",
                backgroundColor: "Background color",
                bold: "Bold",
                italic: "Italic",
                lockCell: "Lock cell",
                unlockCell: "Unlock cell",
                format: "Format",
                edit: "Edit",
                clear: "Clear",
                clearValue: "Clear value",
                clearStyles: "Clear styles",
                clearAll: "Clear all",
                insert: "Insert",
                columns: "Columns",
                rows: "Rows",
                addColumn: "Add column",
                removeColumn: "Remove column",
                addRow: "Add row",
                removeRow: "Remove row",
                underline: "Underline",
                align: "Align",
                left: "Left",
                right: "Right",
                center: "Center",
                help: "Help",
                common: "common",
                number: "number",
                currency: "currency",
                percent: "percent",
                downloadAs: "Download as...",
                importAs: "Import as...",
                import: "Import",
                export: "Export",
                file: "File",
                numberFormat: "Number format"
            }
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = function () {
                function t(t) {
                    this.events = {}, this.context = t || this
                }
                return t.prototype.on = function (t, e, n) {
                    var i = t.toLowerCase();
                    this.events[i] = this.events[i] || [], this.events[i].push({
                        callback: e,
                        context: n || this.context
                    })
                }, t.prototype.detach = function (t, e) {
                    var n = t.toLowerCase(),
                        i = this.events[n];
                    if (e)
                        for (var o = i.length - 1; o >= 0; o--) i[o].context === e && i.splice(o, 1);
                    else this.events[n] = []
                }, t.prototype.fire = function (t, e) {
                    void 0 === e && (e = []);
                    var n = t.toLowerCase();
                    return !this.events[n] || this.events[n].map(function (t) {
                        return t.callback.apply(t.context, e)
                    }).indexOf(!1) < 0
                }, t
            }();
            e.EventSystem = i, e.EventsMixin = function (t) {
                var e = new i(t = t || {});
                t.detachEvent = e.detach.bind(e), t.attachEvent = e.on.bind(e), t.callEvent = e.fire.bind(e)
            }
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(2),
                o = n(3),
                r = function () {
                    function t(t, e) {
                        this._uid = i.uid(), this.config = e || {}
                    }
                    return t.prototype.mount = function (t, e) {
                        e && (this._view = e), t && this._view && this._view.mount && (this._container = o.toNode(t), this._container.tagName ? this._view.mount(this._container) : this._container.attach && this._container.attach(this))
                    }, t.prototype.getRootView = function () {
                        return this._view
                    }, t.prototype.paint = function () {
                        this._view && (this._view.node || this._container) && (this._doNotRepaint = !1, this._view.redraw())
                    }, t
                }();
            e.View = r
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(17);
            e.DataEvents = i.DataEvents,
                function (t) {
                    t.button = "button", t.input = "input", t.separator = "separator", t.text = "text", t.iconButton = "iconButton", t.imageButton = "imageButton", t.spacer = "spacer", t.menuItem = "menuItem", t.imageButtonText = "imageButtonText", t.block = "block", t.customHTMLButton = "customButton", t.selectButton = "selectButton", t.dhxButton = "dhx-button"
                }(e.ItemType || (e.ItemType = {})),
                function (t) {
                    t.inputCreated = "inputcreated", t.click = "click", t.openMenu = "openMenu"
                }(e.ToolbarEvents || (e.ToolbarEvents = {})),
                function (t) {
                    t.pointer = "pointer", t.click = "click"
                }(e.NavigationType || (e.NavigationType = {}))
        }, function (t, e, n) {
            (function (e, n) {
                ! function () {
                    var i = 1,
                        o = {},
                        r = !1;

                    function s(t) {
                        e.setImmediate ? n(t) : e.importScripts ? setTimeout(t) : (o[++i] = t, e.postMessage(i, "*"))
                    }

                    function a(t) {
                        "use strict";
                        if ("function" != typeof t && void 0 != t) throw TypeError();
                        if ("object" != typeof this || this && this.then) throw TypeError();
                        var e, n, i = this,
                            o = 0,
                            r = 0,
                            l = [];
                        i.promise = i, i.resolve = function (t) {
                            return e = i.fn, n = i.er, o || (r = t, o = 1, s(d)), i
                        }, i.reject = function (t) {
                            return e = i.fn, n = i.er, o || (r = t, o = 2, s(d)), i
                        }, i._d = 1, i.then = function (t, e) {
                            if (1 != this._d) throw TypeError();
                            var n = new a;
                            return n.fn = t, n.er = e, 3 == o ? n.resolve(r) : 4 == o ? n.reject(r) : l.push(n), n
                        }, i.catch = function (t) {
                            return i.then(null, t)
                        };
                        var c = function (t) {
                            o = t || 4, l.map(function (t) {
                                3 == o && t.resolve(r) || t.reject(r)
                            })
                        };
                        try {
                            "function" == typeof t && t(i.resolve, i.reject)
                        } catch (t) {
                            i.reject(t)
                        }
                        return i;

                        function u(t, e, n, i) {
                            if (2 == o) return i();
                            if ("object" != typeof r && "function" != typeof r || "function" != typeof t) i();
                            else try {
                                var s = 0;
                                t.call(r, function (t) {
                                    s++ || (r = t, e())
                                }, function (t) {
                                    s++ || (r = t, n())
                                })
                            } catch (t) {
                                r = t, n()
                            }
                        }

                        function d() {
                            var t;
                            try {
                                t = r && r.then
                            } catch (t) {
                                return r = t, o = 2, d()
                            }
                            u(t, function () {
                                o = 1, d()
                            }, function () {
                                o = 2, d()
                            }, function () {
                                try {
                                    1 == o && "function" == typeof e ? r = e(r) : 2 == o && "function" == typeof n && (r = n(r), o = 1)
                                } catch (t) {
                                    return r = t, c()
                                }
                                r == i ? (r = TypeError(), c()) : u(t, function () {
                                    c(3)
                                }, c, function () {
                                    c(1 == o && 3)
                                })
                            })
                        }
                    }(e = this).setImmediate || e.addEventListener("message", function (t) {
                        if (t.source == e)
                            if (r) s(o[t.data]);
                            else {
                                r = !0;
                                try {
                                    o[t.data]()
                                } catch (t) {}
                                delete o[t.data], r = !1
                            }
                    }), a.resolve = function (t) {
                        if (1 != this._d) throw TypeError();
                        return t instanceof a ? t : new a(function (e) {
                            e(t)
                        })
                    }, a.reject = function (t) {
                        if (1 != this._d) throw TypeError();
                        return new a(function (e, n) {
                            n(t)
                        })
                    }, a.all = function (t) {
                        if (1 != this._d) throw TypeError();
                        if (!(t instanceof Array)) return a.reject(TypeError());
                        var e = new a;
                        return function n(i, o) {
                            return o ? e.resolve(o) : i ? e.reject(i) : (0 == t.reduce(function (t, e) {
                                return e && e.then ? t + 1 : t
                            }, 0) && e.resolve(t), void t.map(function (e, i) {
                                e && e.then && e.then(function (e) {
                                    return t[i] = e, n(), e
                                }, n)
                            }))
                        }(), e
                    }, a.race = function (t) {
                        if (1 != this._d) throw TypeError();
                        if (!(t instanceof Array)) return a.reject(TypeError());
                        if (0 == t.length) return new a;
                        var e = new a;
                        return function n(i, o) {
                            return o ? e.resolve(o) : i ? e.reject(i) : (0 == t.reduce(function (t, e) {
                                return e && e.then ? t + 1 : t
                            }, 0) && e.resolve(t), void t.map(function (t, e) {
                                t && t.then && t.then(function (t) {
                                    n(null, t)
                                }, n)
                            }))
                        }(), e
                    }, a._d = 1, t.exports = a
                }()
            }).call(this, n(24), n(46).setImmediate)
        }, function (t, e, n) {
            "use strict";

            function i(t) {
                for (var n in t) e.hasOwnProperty(n) || (e[n] = t[n])
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), i(n(12)), i(n(33)), i(n(36)), i(n(61)), i(n(18)), i(n(13)), i(n(34)), i(n(35)), i(n(63))
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(17);
            e.DataEvents = i.DataEvents, e.DragBehaviour = i.DragBehaviour, e.DragMode = i.DragMode,
                function (t) {
                    t[t.all = 1] = "all", t[t.specific = 2] = "specific", t[t.leafs = 3] = "leafs"
                }(e.TreeFilterType || (e.TreeFilterType = {}))
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(18),
                o = n(34),
                r = n(35);
            e.isEqualObj = function (t, e) {
                for (var n in t)
                    if (t[n] !== e[n]) return !1;
                return !0
            }, e.naturalCompare = function (t, e) {
                var n = [],
                    i = [];
                for (t.replace(/(\d+)|(\D+)/g, function (t, e, i) {
                        n.push([e || 1 / 0, i || ""])
                    }), e.replace(/(\d+)|(\D+)/g, function (t, e, n) {
                        i.push([e || 1 / 0, n || ""])
                    }); n.length && i.length;) {
                    var o = n.shift(),
                        r = i.shift(),
                        s = o[0] - r[0] || o[1].localeCompare(r[1]);
                    if (s) return s
                }
                return n.length - i.length
            }, e.findByConf = function (t, e) {
                if ("function" == typeof e) {
                    if (e.call(this, t)) return t
                } else if (e.by && e.match && t[e.by] === e.match) return t
            }, e.isDebug = function () {
                var t = window.dhx;
                if (void 0 !== t) return void 0 !== t.debug && t.debug
            }, e.dhxWarning = function (t) {
                console.warn(t)
            }, e.dhxError = function (t) {
                throw new Error(t)
            }, e.toProxy = function (t) {
                var e = typeof t;
                return "string" === e ? new i.DataProxy(t) : "object" === e ? t : void 0
            }, e.toDataDriver = function (t) {
                if ("string" == typeof t) switch (t) {
                    case "csv":
                        return new o.CsvDriver;
                    case "json":
                        return new r.JsonDriver;
                    default:
                        console.warn("incorrect driver type", t)
                } else if ("object" == typeof t) return t
            }
        }, function (t, e, n) {
            "use strict";

            function i(t) {
                if ("#" === t.substr(0, 1)) return t;
                var e = /(.*?)rgb[a]?\((\d+), *(\d+), *(\d+),* *([\d]*)\)/.exec(t);
                return e ? "#" + parseInt(e[2], 10).toString(16) + parseInt(e[3], 10).toString(16) + parseInt(e[4], 10).toString(16) : ""
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.rgbToHex = i, e.transpose = function (t, e) {
                for (var n = [], i = 0; i < t.length; i++)
                    for (var o = t[i], r = 0; r < o.length; r++) {
                        n[r] = n[r] || [];
                        var s = e ? e(o[r]) : o[r];
                        n[r].push(s)
                    }
                return n
            }, e.getStrWidth = function (t, e) {
                void 0 === e && (e = "14px Arial");
                var n = document.createElement("canvas").getContext("2d");
                return n.font = e, Math.round(n.measureText(t).width)
            }, e.getStyleByClass = function (t, e, n, o) {
                var r = e.querySelector("." + n),
                    s = function (t, e) {
                        return "string" == typeof e ? (t.insertAdjacentHTML("beforeend", e), t.lastChild) : (t.appendChild(e), e)
                    }(r, '<div class="' + t + '"></div>'),
                    a = window.getComputedStyle(s),
                    l = {
                        color: "rgb(0, 0, 0)" === a.color ? o.color : i(a.color),
                        background: "rgba(0, 0, 0, 0)" === a.backgroundColor ? o.background : i(a.backgroundColor),
                        fontSize: parseFloat(a.fontSize)
                    };
                return r.removeChild(s), l.color === o.color && l.background === o.background && l.fontSize === o.fontSize ? null : l
            }, e.removeHTMLTags = function (t) {
                return ("" + (t || "")).replace(/<[^>]*>/g, "").replace(/[\"]/g, "&quot;").trim()
            }, e.isCssSupport = function (t, e) {
                try {
                    return CSS.supports(t, e)
                } catch (i) {
                    var n = document.createElement("div");
                    return n.style[t] = e, n.style[t] === e
                }
            }
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(1);

            function o(t, e) {
                return '<div class="dhx_custom_header_cell">' + t + '\n\t<div class="dhx_resizer_grip_wrap">\n\t\t\t<div class="dhx_resizer_grip" dhx_id=' + e + '>\n\t\t\t\t<div class="dhx_resizer_grip_line"></div>\n\t\t\t</div>\n\t\t</div>\n\t\t</div>'
            }
            e.getHeaderCell = o, e.updateColumns = function (t) {
                var e = 0;
                t.columns.map(function (t, n) {
                    if (t.width = t.width || 120, e += t.width, "$index" !== t.id) {
                        var r = i.getLetterFromNumber(n);
                        t.header = [{
                            text: o(r, n),
                            css: ""
                        }], t.$letter = r
                    }
                }), t.$totalWidth = e
            }, e.updateRowsIndex = function (t) {
                t.map(function (t, e) {
                    t.$index = e + 1
                })
            }, e.removeRowsCss = function (t) {
                t.data.map(function (e) {
                    t.removeRowCss(e.id, "dhx_selected_row")
                })
            }
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(2),
                o = n(6),
                r = {},
                s = [],
                a = {
                    decimal: ".",
                    thousands: ","
                },
                l = "$";

            function c(t) {
                return s[i.findIndex(s, function (e) {
                    return e.id === t
                })]
            }

            function u(t) {
                return !isNaN(t - parseFloat(t))
            }

            function d(t) {
                var e = a;
                return ("" + t).replace(new RegExp("[" + e.thousands + "$%s ]", "g"), "").replace(new RegExp("[" + e.decimal + "]", "g"), ".")
            }
            e.initFormat = function (t) {
                r = t.config, s = [{
                    name: o.default.common,
                    id: "common",
                    mask: "",
                    example: "2702.31"
                }, {
                    name: o.default.number,
                    id: "number",
                    mask: "#,##0.00",
                    example: "2702.31"
                }, {
                    name: o.default.percent,
                    id: "percent",
                    mask: "#,##0.00%",
                    example: "27.0231"
                }, {
                    name: o.default.currency,
                    id: "currency",
                    mask: "$#,##0.00",
                    example: "2702.31"
                }], r.formats.forEach(function (t) {
                    var e = i.findIndex(s, function (e) {
                        return e.id === t.id
                    });
                    e >= 0 ? s[e] = t : s.push(t)
                });
                var e = v(c("number").mask);
                a = {
                    decimal: e.decimalSeparator,
                    thousands: e.thousandsSeparator
                };
                var n = v(c("currency").mask);
                l = n.currency || l, r.formats = s, s.forEach(function (t) {
                    v(t.mask)
                })
            }, e.getDefaultFormats = function () {
                return s
            }, e.getFormat = c, e.getDefaultFormatsMap = function () {
                return s.reduce(function (t, e) {
                    return t[e.mask] = e.id, t
                }, {})
            }, e.isNumeric = u, e.getPureNumber = function (t) {
                var e = "string" == typeof t && t.indexOf("%") > -1,
                    n = parseFloat(("" + t).replace(/[^.\d]/g, ""));
                return e ? n / 100 : n
            }, e.getCleanValue = d, e.getUnformattedValue = function (t, e) {
                if ("common" === e) return t;
                var n = d(t);
                return "percent" === e ? (parseFloat(n) / 100).toFixed(4) : n
            }, e.detectCellFormat = function (t) {
                if (!u(d(t))) return "";
                var e = "" + t,
                    n = e.indexOf("%"),
                    i = 0 === e.indexOf("$");
                return 0 === n || n === e.length - 1 ? c("percent").mask : i ? c("currency").mask : c("number").mask
            };
            var f = "([,. ]{0,1})",
                h = new RegExp("(\\[\\$[\\w\\W]*?\\]|[\\$]{0,1})([#0]*)" + f + "([#0]*)" + f + "([#0]*)([%]{0,1})(\\[\\$[\\w\\W]*?\\]|[\\$]{0,1})"),
                p = new RegExp("\\[\\$([\\w\\W]*?)\\]|(\\$)");
            var g = {};

            function v(t) {
                if (t && "string" == typeof t) {
                    if (g[t]) return g[t];
                    var e = function (t) {
                        return {
                            currencyBefore: t[1],
                            digits: t[2],
                            thousandsSeparator: t[3],
                            optionalDigits: t[4],
                            decimalSeparator: t[5],
                            decimalDigits: t[6],
                            percent: t[7],
                            currencyAfter: t[8],
                            decimalLength: 0
                        }
                    }(t.match(h));
                    if (!e.decimalSeparator && e.thousandsSeparator && (e.decimalSeparator = e.thousandsSeparator, e.decimalDigits = e.optionalDigits, e.thousandsSeparator = "", e.optionalDigits = ""), e.currencyBefore) {
                        var n = e.currencyBefore.match(p);
                        e.currencyBefore = n[1] || n[2]
                    }
                    if (e.currencyAfter) {
                        n = e.currencyAfter.match(p);
                        e.currencyAfter = n[1] || n[2]
                    }
                    return e.percent && (e.currencyBefore = "", e.currencyAfter = ""), e.decimalLength = e.decimalDigits ? e.decimalDigits.split("0").length - 1 : e.decimalLength, g[t] = e, e
                }
            }
            e.getFormattedValue = function (t, e) {
                return e ? function (t, e) {
                    if (!e) return t;
                    if (!u(t)) return t;
                    var n = "";
                    e.currencyBefore && (n += e.currencyBefore);
                    var i = parseFloat(t),
                        o = i < 0;
                    return o && (i = Math.abs(i)), e.percent && (i *= 100), n += function (t, e, n) {
                        void 0 === e && (e = "");
                        var i = t.toString().split(".");
                        return i[0] = i[0].replace(/\B(?=(\d{3})+(?!\d))/g, e), i.join(n)
                    }(i.toFixed(e.decimalLength), e.thousandsSeparator, e.decimalSeparator), n += e.percent, e.currencyAfter && (n += e.currencyAfter), o && (n = "-" + n), n
                }(t, v(e)) : t
            }
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                function (t) {
                    t.afterAdd = "afteradd", t.beforeAdd = "beforeadd", t.removeAll = "removeall", t.beforeRemove = "beforeremove", t.afterRemove = "afterremove", t.change = "change", t.load = "load"
                }(e.DataEvents || (e.DataEvents = {})),
                function (t) {
                    t.beforeDrag = "beforedrag", t.beforeDrop = "beforeDrop", t.dragStart = "dragstart", t.dragEnd = "dragend", t.canDrop = "candrop", t.cancelDrop = "canceldrop", t.dropComplete = "dropcomplete", t.dragOut = "dragOut", t.dragIn = "dragIn"
                }(e.DragEvents || (e.DragEvents = {})),
                function (t) {
                    t.target = "target", t.both = "both", t.source = "source"
                }(e.DragMode || (e.DragMode = {})),
                function (t) {
                    t.child = "child", t.sibling = "sibling", t.complex = "complex"
                }(e.DragBehaviour || (e.DragBehaviour = {})),
                function (t) {
                    t.beforeUnSelect = "beforeunselect", t.afterUnSelect = "afterunselect", t.beforeSelect = "beforeselect", t.afterSelect = "afterselect"
                }(e.SelectionEvents || (e.SelectionEvents = {}))
        }, function (t, e, n) {
            "use strict";
            (function (t) {
                Object.defineProperty(e, "__esModule", {
                    value: !0
                });
                var n = function () {
                    function e(t) {
                        this.url = t
                    }
                    return e.prototype.load = function () {
                        return this._ajax(this.url)
                    }, e.prototype.save = function (t, e) {
                        return this._ajax(this.url, t, {
                            insert: "POST",
                            delete: "DELETE",
                            update: "POST"
                        } [e] || "POST")
                    }, e.prototype._ajax = function (e, n, i) {
                        return void 0 === i && (i = "GET"), new t(function (t, o) {
                            var r = new XMLHttpRequest;
                            switch (r.onload = function () {
                                r.status >= 200 && r.status < 300 ? t(r.response || r.responseText) : o({
                                    status: r.status,
                                    statusText: r.statusText
                                })
                            }, r.onerror = function () {
                                o({
                                    status: r.status,
                                    statusText: r.statusText
                                })
                            }, r.open(i, e), r.setRequestHeader("Content-Type", "application/json"), i) {
                                case "POST":
                                case "DELETE":
                                case "PUT":
                                    r.send(JSON.stringify(n));
                                    break;
                                case "GET":
                                default:
                                    r.send()
                            }
                        })
                    }, e
                }();
                e.DataProxy = n
            }).call(this, n(10))
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                function (t) {
                    t.sort = "sort", t.expand = "expand", t.headerInput = "headerInput", t.cellClick = "cellClick", t.cellRightClick = "cellRightClick", t.cellMouseOver = "cellMouseOver", t.cellMouseDown = "cellMouseDown", t.cellDblClick = "cellDblClick", t.headerCellClick = "headerCellClick", t.footerCellClick = "footerCellClick", t.headerCellMouseOver = "headerCellMouseOver", t.footerCellMouseOver = "footerCellMouseOver", t.headerCellMouseDown = "headerCellMouseDown", t.footerCellMouseDown = "footerCellMouseDown", t.headerCellDblClick = "headerCellDblClick", t.footerCellDblClick = "footerCellDblClick"
                }(e.GridEvents || (e.GridEvents = {}))
        }, function (t, e, n) {
            "use strict";

            function i(t) {
                for (var n in t) e.hasOwnProperty(n) || (e[n] = t[n])
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), i(n(40)), i(n(85)), i(n(86)), i(n(87)), i(n(25)), i(n(9))
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.getRealPosition = function (t) {
                var e = t.getBoundingClientRect();
                return {
                    left: e.left + window.pageXOffset,
                    right: e.right + window.pageXOffset,
                    top: e.top + window.pageYOffset,
                    bottom: e.bottom + window.pageYOffset
                }
            }, e.calculatePosition = function (t, e) {
                var n = window.pageXOffset + window.innerWidth,
                    i = window.pageYOffset + window.innerHeight,
                    o = {
                        left: null,
                        top: null,
                        minWidth: e.width + "px",
                        position: "absolute"
                    };
                return "bottom" === e.mode ? (t.left + e.width > n ? o.left = t.left - e.width + "px" : o.left = t.left + "px", t.bottom + e.height > i ? o.top = t.top - e.height + "px" : o.top = t.bottom + "px") : (t.right + e.width > n ? o.left = t.left - e.width + "px" : o.left = t.right + "px", t.top + e.height > i ? o.top = t.bottom - e.height + "px" : o.top = t.top + "px"), o
            }, e.addInGroups = function (t, e) {
                t[e.group] ? (e.active && (t[e.group].active = e.id), t[e.group].elements.push(e.id)) : t[e.group] = {
                    active: e.active ? e.id : null,
                    elements: [e.id]
                }
            }
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__assign || function () {
                return (i = Object.assign || function (t) {
                    for (var e, n = 1, i = arguments.length; n < i; n++)
                        for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                    return t
                }).apply(this, arguments)
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = n(2),
                r = n(88),
                s = n(89),
                a = n(90),
                l = n(91),
                c = n(92),
                u = n(93),
                d = n(94),
                f = n(95),
                h = n(96),
                p = n(97),
                g = n(98),
                v = n(99);
            e.actions = {
                setCellStyle: g.SetCellStyle,
                setCellValue: v.SetCellValue,
                setCellFormat: p.SetCellFormat,
                removeCellStyles: h.RemoveCellStyles,
                lockCell: f.LockCell,
                deleteRow: l.DeleteRow,
                addRow: s.AddRow,
                deleteColumn: a.DeleteColumn,
                addColumn: r.AddColumn,
                groupAction: c.GroupAction,
                groupRowAction: d.GroupRowAction,
                groupColAction: u.GroupColAction
            };
            var _ = function () {
                function t(t) {
                    this._config = t, this._actions = [], this._redoActions = []
                }
                return t.prototype.execute = function (t, n) {
                    if (Array.isArray(t)) {
                        var r = function (t, n) {
                            var o = t.map(function (t) {
                                var o = t.groupAction || t.action;
                                if (o) return new e.actions[o](i(i({}, t), n))
                            });
                            return {
                                do: function () {
                                    o.map(function (t) {
                                        return t.do()
                                    })
                                },
                                undo: function () {
                                    o.map(function (t) {
                                        return t.undo()
                                    })
                                }
                            }
                        }(t, this._config);
                        return r.do(), void this._actions.push(r)
                    }
                    if (o.extend(n, this._config), e.actions[t]) {
                        var s = new e.actions[t](n);
                        s.do(), this._actions.push(s)
                    }
                }, t.prototype.undo = function () {
                    var t = this._actions.pop();
                    t && (t.undo(), this._redoActions.push(t))
                }, t.prototype.redo = function () {
                    var t = this._redoActions.pop();
                    t && (t.do(), this._actions.push(t))
                }, t
            }();
            e.ActionsManager = _
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__assign || function () {
                return (i = Object.assign || function (t) {
                    for (var e, n = 1, i = arguments.length; n < i; n++)
                        for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                    return t
                }).apply(this, arguments)
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = n(20),
                r = n(6),
                s = n(16),
                a = n(1);

            function l(t, e) {
                return '<div class="dxi dhx_button__icon dxi-format-color-' + e + ' dhx_spreadsheet_colorpicker" style="border-color: ' + t + '"></div>'
            }

            function c(t, e, n) {
                void 0 === n && (n = "2702.31");
                var i = s.getFormattedValue(n, e);
                return '<div class="dhx_format-item"><span class="dhx_format-name">' + (r.default[t] || t) + ' </span><span class="dhx_format-helper">(' + i + ")</span></div>"
            }
            e.getColorpickerTemplate = l, e.updateToolbar = function (t, e) {
                e = i({
                        locked: !1,
                        format: "common"
                    }, e),
                    function (e) {
                        for (var n in e) switch (n) {
                            case "color":
                                t.data.update(n, {
                                    html: l(e[n] || "#4C4C4C", "text")
                                });
                                break;
                            case "background":
                                t.data.update(n, {
                                    html: l(e[n] || "#FFF", "fill")
                                });
                                break;
                            case "text-align":
                                t.data.update("align-left", {
                                    active: "left" === e[n]
                                }), t.data.update("align-right", {
                                    active: "right" === e[n]
                                }), t.data.update("align-center", {
                                    active: "center" === e[n]
                                });
                                break;
                            case "font-weight":
                                t.data.update("font-weight-bold", {
                                    active: "bold" === e[n]
                                });
                                break;
                            case "font-style":
                                t.data.update("font-style-italic", {
                                    active: "italic" === e[n]
                                });
                                break;
                            case "text-decoration":
                                t.data.update("text-decoration-underline", {
                                    active: "underline" === e[n]
                                })
                        }
                    }(i({
                        color: "#4C4C4C",
                        background: "#FFF",
                        "text-align": "left",
                        "font-style": "",
                        "font-weight": "",
                        "text-decoration": ""
                    }, dhx.css.get(e.css)));
                var n = t.data.getItem("format");
                for (var o in n && n.childs.map(function (t) {
                        return t.active = !1
                    }), e) switch (o) {
                    case "locked":
                        t.data.getItem("lock") && t.data.update("lock", {
                            active: e[o]
                        });
                        break;
                    case "format":
                        var r = s.getDefaultFormatsMap()[e[o]] || "common",
                            a = s.getFormat(r);
                        t.data.update("format", {
                            value: a.name || r
                        }), t.data.getItem(r) && t.data.update(r, {
                            active: !0
                        })
                }
            }, e.getToggledValue = function (t, e, n, i) {
                var o = a.getCellInfo(t, e);
                return (dhx.css.get(o.css) || {})[n] ? "" : i
            }, e.getFormatItem = c, e.getFormatsDropdown = function (t) {
                return t.formats.map(function (t) {
                    return {
                        id: t.id,
                        type: o.ItemType.customHTMLButton,
                        css: "dhx_format-name-wrap",
                        html: c(t.name, t.mask, t.example)
                    }
                })
            }
        }, function (t, e) {
            var n;
            n = function () {
                return this
            }();
            try {
                n = n || new Function("return this")()
            } catch (t) {
                "object" == typeof window && (n = window)
            }
            t.exports = n
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(73),
                o = n(74),
                r = n(75),
                s = n(76),
                a = n(77),
                l = n(78),
                c = n(79),
                u = n(80),
                d = n(81),
                f = n(82),
                h = n(83),
                p = n(9);

            function g(t, e) {
                if (t.$hidden) return null;
                switch (t.type) {
                    case p.ItemType.button:
                        return i.button(t);
                    case p.ItemType.text:
                        return h.text(t);
                    case p.ItemType.separator:
                        return d.separator(t);
                    case p.ItemType.spacer:
                        return f.spacer(t);
                    case p.ItemType.input:
                        return c.input(t, e);
                    case p.ItemType.imageButton:
                        return a.imageButton(t);
                    case p.ItemType.iconButton:
                        return s.iconButton(t);
                    case p.ItemType.selectButton:
                    case p.ItemType.menuItem:
                        return u.menuItem(t);
                    case p.ItemType.imageButtonText:
                        return l.imageButtonText(t);
                    case p.ItemType.customHTMLButton:
                        return o.customHTMLButton(t);
                    case p.ItemType.dhxButton:
                        return r.dhx_button(t);
                    case p.ItemType.block:
                    default:
                        throw new Error("unknown item type")
                }
            }
            e.itemfactory = g, e.createFactory = function (t, e) {
                void 0 === e && (e = []);
                var n = {};
                return e.forEach(function (t) {
                        return n[t] = !0
                    }),
                    function (e, i) {
                        return e.type = e.type || t, n[e.type] && (e.type = t), g(e, i)
                    }
            }
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__extends || function () {
                    var t = function (e, n) {
                        return (t = Object.setPrototypeOf || {
                                __proto__: []
                            }
                            instanceof Array && function (t, e) {
                                t.__proto__ = e
                            } || function (t, e) {
                                for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                            })(e, n)
                    };
                    return function (e, n) {
                        function i() {
                            this.constructor = e
                        }
                        t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
                    }
                }(),
                o = this && this.__assign || function () {
                    return (o = Object.assign || function (t) {
                        for (var e, n = 1, i = arguments.length; n < i; n++)
                            for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                        return t
                    }).apply(this, arguments)
                };
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var r = n(2),
                s = n(0),
                a = n(7),
                l = n(84),
                c = n(3),
                u = n(8),
                d = n(11),
                f = n(21),
                h = n(25),
                p = n(9),
                g = function (t) {
                    function e(e, n) {
                        var i = t.call(this, e, r.extend({
                            popupWidth: 175,
                            popupHeight: 36
                        }, n)) || this;
                        return i._isContextMenu = !1, i._documentHaveListener = !1, i.events = new a.EventSystem, i.data = new d.TreeCollection({}, i.events), i._documentClick = function (t) {
                            c.locate(t, "dhx_widget_id") !== i._uid && i._documentHaveListener && (document.removeEventListener("click", i._documentClick), i._documentHaveListener = !1, i._close())
                        }, i._currentRoot = i.data.getRoot(), i._factory = h.createFactory(p.ItemType.menuItem), i._init(), i._initHandlers(), i._initEvents(), i
                    }
                    return i(e, t), e.prototype.paint = function () {
                        t.prototype.paint.call(this), this._vpopups.redraw()
                    }, e.prototype.disable = function (t) {
                        this._setProp(t, "$disabled", !0)
                    }, e.prototype.enable = function (t) {
                        this._setProp(t, "$disabled", !1)
                    }, e.prototype.show = function (t) {
                        this._setProp(t, "$hidden", !1)
                    }, e.prototype.hide = function (t) {
                        this._setProp(t, "$hidden", !0)
                    }, e.prototype.destructor = function () {
                        l.keyManager.removeHotKey(null, this)
                    }, e.prototype._close = function () {
                        this.config.navigationType === p.NavigationType.click && (this._isActive = !1), clearTimeout(this._currentTimeout), this._activeMenu = null, this.paint()
                    }, e.prototype._init = function () {
                        var t = this;
                        this._vpopups = s.create({
                            render: function () {
                                return s.el("div", o({
                                    dhx_widget_id: t._uid,
                                    class: "menu-popups" + (t._isContextMenu ? " context-menu" : "")
                                }, t._handlers), t._drawPopups())
                            }
                        }), this._vpopups.mount(document.body)
                    }, e.prototype._initHandlers = function () {
                        var t = this;
                        this._isActive = this.config.navigationType !== p.NavigationType.click, this._handlers = {
                            onmousemove: function (e) {
                                if (t._isActive) {
                                    var n = c.locateNode(e);
                                    if (n) {
                                        var i = n.getAttribute("dhx_id");
                                        if (t._activeMenu !== i) {
                                            if (t._activeMenu = i, t.data.haveChilds(i)) {
                                                var o = f.getRealPosition(n);
                                                t.data.update(i, {
                                                    $position: o
                                                }, !1)
                                            }
                                            t._activeItemChange(i)
                                        }
                                    } else t._activeItemChange(null)
                                }
                            },
                            onmouseleave: function () {
                                t.config.navigationType !== p.NavigationType.click && t._activeItemChange(null)
                            },
                            onclick: function (e) {
                                var n = c.locateNode(e);
                                if (n) {
                                    var i = n.getAttribute("dhx_id");
                                    switch (t.data.getItem(i).type) {
                                        case p.ItemType.selectButton:
                                        case p.ItemType.menuItem:
                                            if (i === t._currentRoot) return void t._close();
                                            if (t._isActive || (t._isActive = !0), t._setRoot(i), t._activeMenu = i, t.data.haveChilds(i)) {
                                                var o = f.getRealPosition(n);
                                                t.data.update(i, {
                                                    $position: o
                                                }, !1), t._activeItemChange(i)
                                            } else t._onMenuItemClick(i, e);
                                            break;
                                        case p.ItemType.dhxButton:
                                        case p.ItemType.imageButtonText:
                                        case p.ItemType.iconButton:
                                        case p.ItemType.imageButton:
                                        case p.ItemType.button:
                                        case p.ItemType.customHTMLButton:
                                            t._onMenuItemClick(i, e);
                                            break;
                                        case p.ItemType.separator:
                                        case p.ItemType.input:
                                        case p.ItemType.text:
                                        case p.ItemType.spacer:
                                            t._close();
                                        default:
                                            return
                                    }
                                }
                            }
                        }
                    }, e.prototype._initEvents = function () {
                        var t = this,
                            e = null;
                        this.data.events.on(p.DataEvents.change, function () {
                            t.paint(), e && clearTimeout(e), e = setTimeout(function () {
                                t._normalizeData(), t._resetHotkeys(), e = null, t.paint()
                            }, 100)
                        }), this.events.on(p.ToolbarEvents.click, function (e) {
                            var n = t.data.getItem(e),
                                i = t.data.getItem(n.parent);
                            if (i && i.type === p.ItemType.selectButton && t.data.update(n.parent, {
                                    value: n.value,
                                    icon: n.icon
                                }), n.group) {
                                var o = t._groups[n.group];
                                o.active && t.data.update(o.active, {
                                    active: !1
                                }), o.active = n.id, t.data.update(n.id, {
                                    active: !0
                                })
                            }
                        })
                    }, e.prototype._drawPopups = function () {
                        var t = this,
                            e = this._activeMenu;
                        if (!this._isContextMenu && !e) return null;
                        var n = this._currentRoot;
                        return this._isContextMenu && !this._activePosition ? null : this._getParents(e, n).map(function (e) {
                            if (!t.data.haveChilds(e)) return null;
                            var i = t.data.getItem(e) || {},
                                o = 0,
                                r = 0;
                            t.data.eachChild(e, function (t) {
                                t.$hidden || ("separator" === t.type || t.separator ? r++ : o++)
                            }, !1);
                            var a, l, c = i.width || t.config.popupWidth;
                            t._isContextMenu && t._activePosition && e === n ? (a = t._activePosition, l = t.config.popupHeight * o + 5 * r) : l = ((a = i.$position).bottom - a.top) * o + 5 * r;
                            var u = t._getMode(i, n, a === t._activePosition);
                            return s.el("div", {
                                class: "dhx_widget menu-popup",
                                style: f.calculatePosition(a, {
                                    mode: u,
                                    width: c,
                                    height: l
                                })
                            }, t._drawMenuItems(e))
                        }).reverse()
                    }, e.prototype._onMenuItemClick = function (t, e) {
                        var n = this.data.getItem(t);
                        n.$disabled || (n.twoState && this.data.update(n.id, {
                            active: !n.active
                        }), this.events.fire(p.ToolbarEvents.click, [t, e]), this._close())
                    }, e.prototype._activeItemChange = function (t) {
                        var e = this;
                        t && !this._documentHaveListener && this._listenOuterClick(), t && this.data.haveChilds(t) ? (this.events.fire(p.ToolbarEvents.openMenu), this._activeMenu = t, clearTimeout(this._currentTimeout), this.paint()) : (this._activeMenu = t, clearTimeout(this._currentTimeout), this._currentTimeout = setTimeout(function () {
                            return e.paint()
                        }, 400))
                    }, e.prototype._resetHotkeys = function () {
                        var t = this;
                        l.keyManager.removeHotKey(null, this), this.data.map(function (e) {
                            e.hotkey && l.keyManager.addHotKey(e.hotkey, function () {
                                return t._onMenuItemClick(e.id, null)
                            }, t)
                        })
                    }, e.prototype._listenOuterClick = function () {
                        document.addEventListener("click", this._documentClick), this._documentHaveListener = !0
                    }, e.prototype._getMode = function (t, e, n) {
                        return void 0 === n && (n = !1), t.parent === e ? "bottom" : "right"
                    }, e.prototype._drawMenuItems = function (t) {
                        var e = this;
                        return this.data.map(function (t) {
                            return e._factory(t, e.events)
                        }, t, !1)
                    }, e.prototype._normalizeData = function () {
                        var t = this,
                            e = this.data.getRoot(),
                            n = {};
                        this.data.eachChild(e, function (e) {
                            t.data.haveChilds(e.id) && e.parent !== t.data.getRoot() && (e.$openIcon = "right"), e.group && f.addInGroups(n, e)
                        }, !0), this._groups = n
                    }, e.prototype._setRoot = function (t) {}, e.prototype._getParents = function (t, e) {
                        var n = [],
                            i = !1,
                            o = this.data.getItem(t),
                            r = o && o.$disabled;
                        return this.data.eachParent(t, function (t) {
                            t.id === e ? (n.push(t.id), i = !0) : i || n.push(t.id)
                        }, !r), this._isContextMenu && this._activePosition && n.push(e), n
                    }, e.prototype._setProp = function (t, e, n) {
                        var i, o = this;
                        Array.isArray(t) ? t.forEach(function (t) {
                            var i;
                            return o.data.update(t, ((i = {})[e] = n, i))
                        }) : this.data.update(t, ((i = {})[e] = n, i))
                    }, e
                }(u.View);
            e.MenuBase = g
        }, function (t, e, n) {
            "use strict";

            function i(t) {
                for (var n in t) e.hasOwnProperty(n) || (e[n] = t[n])
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), i(n(28)), i(n(45)), i(n(29))
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(3),
                o = n(29);
            ! function (t) {
                t.right = "right", t.bottom = "bottom", t.center = "center"
            }(e.Position || (e.Position = {}));
            var r = new WeakMap,
                s = [],
                a = document.createElement("div");

            function l(t, e) {
                e && clearTimeout(r.get(t));
                var n = s.indexOf(t);
                n < 0 ? document.body.removeChild(t) : (a.removeChild(t), s.splice(n, 1), 0 === s.length && document.body.removeChild(a))
            }
            a.className = "dhx-message-container", e.message = function (t) {
                "string" == typeof t && (t = {
                    text: t
                });
                var e = document.createElement("div");
                if (e.className = "dhx-message " + (t.css || ""), e.innerHTML = '<span class="message-text">' + t.text + '</span> <div class="dxi ' + t.icon + '"></div>', t.at) {
                    e.style.position = "absolute";
                    var n = t.at,
                        c = n.node,
                        u = n.position,
                        d = i.toNode(c).getBoundingClientRect();
                    document.body.appendChild(e);
                    var f = e.getBoundingClientRect(),
                        h = f.width,
                        p = f.height,
                        g = o.findPosition(d, u, h, p),
                        v = g.left,
                        _ = g.top,
                        m = g.pos;
                    e.className += " " + m, e.style.left = v + "px", e.style.top = _ + "px"
                } else 0 === s.length && document.body.appendChild(a), s.push(e), a.appendChild(e);
                if (t.expire) {
                    var y = setTimeout(function () {
                        return l(e)
                    }, t.expire);
                    r.set(e, y)
                }
                e.onclick = function () {
                    return l(e, !0)
                }
            }
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i, o = n(3),
                r = n(28);

            function s(t, e, n, o) {
                var s, a, l;
                switch (e) {
                    case r.Position.center:
                        return (a = t.left + window.pageXOffset + (t.width - n) / 2) + 8 < window.pageXOffset && (a = t.left + window.pageXOffset), {
                            left: a,
                            top: l = t.top + window.pageYOffset + (t.height - o) / 2,
                            pos: s = i.center
                        };
                    case r.Position.right:
                        return s = i.right, (a = t.right + window.pageXOffset) + n + 8 > window.innerWidth + window.pageXOffset && (a = window.pageXOffset + t.left - n, s = i.left), {
                            left: a,
                            top: l = window.pageYOffset + t.top + (t.height - o) / 2,
                            pos: s
                        };
                    case r.Position.bottom:
                        return (a = window.pageXOffset + t.left + (t.width - n) / 2) < window.pageXOffset && (a = window.pageXOffset + t.left), s = i.bottom, (l = window.pageYOffset + t.bottom) + o + 8 > window.innerHeight + window.pageYOffset && (l = window.pageYOffset + t.top - o, s = i.top), {
                            left: a,
                            top: l,
                            pos: s
                        }
                }
            }! function (t) {
                t.left = "left", t.right = "right", t.top = "top", t.bottom = "bottom", t.center = "center"
            }(i = e.RealPosition || (e.RealPosition = {})), e.findPosition = s;
            var a = document.createElement("div"),
                l = document.createElement("span");
            l.className = "tooltip-text", a.appendChild(l), a.style.position = "absolute";
            var c = null,
                u = null,
                d = !1,
                f = null;

            function h(t, e, n, o, r) {
                void 0 === r && (r = !1);
                var c = t.getBoundingClientRect();
                l.textContent = e, document.body.appendChild(a), a.className = "dhx-tooltip" + (r ? " forced" : "");
                var u = a.getBoundingClientRect(),
                    f = s(c, n, u.width, u.height),
                    h = f.left,
                    p = f.top,
                    g = f.pos;
                switch (g) {
                    case i.bottom:
                    case i.top:
                    case i.left:
                    case i.right:
                    case i.center:
                        a.style.left = h + "px", a.style.top = p + "px"
                }
                a.className += " " + g + " " + (o || ""), d = !0, r || setTimeout(function () {
                    a.className += " animate-tooltip"
                })
            }

            function p(t, e, n, i, o) {
                void 0 === o && (o = !1);
                var r = function () {
                        d || (c && clearTimeout(c), c = setTimeout(function () {
                            h(t, e, n, i)
                        }, 750))
                    },
                    s = function () {
                        d && u && (f = setTimeout(function () {
                            document.body.removeChild(a), d = !1, f = null
                        }, 200)), clearTimeout(c), o || document.removeEventListener("mousemove", r), document.removeEventListener("mouseout", s), document.removeEventListener("click", s), u = null
                    };
                o ? h(t, e, n, i, o) : document.addEventListener("mousemove", r), document.addEventListener("mouseout", s), document.addEventListener("click", s)
            }

            function g(t, e) {
                var n = o.toNode(e.node);
                n !== u && (u = n, f ? (clearTimeout(f), f = null, p(n, t, e.position, e.css, !0)) : p(n, t, e.position || r.Position.bottom, e.css))
            }

            function v(t) {
                var e = o.locateNode(t, "dhx_tooltip_text");
                e && g(e.getAttribute("dhx_tooltip_text"), {
                    position: e.getAttribute("dhx_tooltip_position") || r.Position.bottom,
                    node: e
                })
            }
            e.tooltip = g, e.enableTooltip = function () {
                document.addEventListener("mousemove", v)
            }, e.disableTooltip = function () {
                document.removeEventListener("mousemove", v)
            }
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                function (t) {
                    t.beforeHide = "beforehide", t.beforeShow = "beforeshow", t.afterHide = "afterhide", t.afterShow = "aftershow"
                }(e.PopupEvents || (e.PopupEvents = {}))
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__extends || function () {
                var t = function (e, n) {
                    return (t = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function (t, e) {
                            t.__proto__ = e
                        } || function (t, e) {
                            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                        })(e, n)
                };
                return function (e, n) {
                    function i() {
                        this.constructor = e
                    }
                    t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
                }
            }();
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = n(0),
                r = n(8),
                s = function (t) {
                    function e(e) {
                        var n = t.call(this, null, e) || this,
                            i = n._popup = document.createElement("div");
                        return i.className = "dhx-popup dhx_widget", i.style.position = "absolute", n._initHandlers(), n.mount(i, o.create({
                            render: function () {
                                return n.toVDOM()
                            }
                        })), n
                    }
                    return i(e, t), e.prototype.attach = function (t, e) {
                        return this._html = null, "object" == typeof t ? this._ui = t : "string" == typeof t ? this._ui = new window.dhx[t](null, e) : "function" == typeof t && (t.prototype instanceof r.View ? this._ui = new t(null, e) : this._ui = {
                            getRootView: function () {
                                return t(e)
                            }
                        }), this.paint(), this._ui
                    }, e.prototype.attachHTML = function (t) {
                        this._html = t, this.paint()
                    }, e.prototype.getWidget = function () {
                        return this._ui
                    }, e.prototype.toVDOM = function () {
                        if (this._html) return o.el(".inner-html-content", {
                            ".innerHTML": this._html
                        });
                        var t = this._ui ? this._ui.getRootView() : null;
                        return t && t.render && (t = o.inject(t)), t
                    }, e
                }(r.View);
            e.Wrapper = s
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                function (t) {
                    t.colorChange = "colorChange"
                }(e.ColorpickerEvents || (e.ColorpickerEvents = {}))
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__assign || function () {
                return (i = Object.assign || function (t) {
                    for (var e, n = 1, i = arguments.length; n < i; n++)
                        for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                    return t
                }).apply(this, arguments)
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = n(7),
                r = n(59),
                s = n(60),
                a = n(18),
                l = n(13),
                c = n(12),
                u = n(2),
                d = function () {
                    function t(t, e) {
                        this.config = t || {}, this._order = [], this._pull = {}, this._changes = {
                            order: []
                        }, this._initOrder = null, this._sort = new s.Sort, this._loader = new r.Loader(this, this._changes), this.events = e || new o.EventSystem(this)
                    }
                    return t.prototype.add = function (t, e) {
                        if (this.events.fire(c.DataEvents.beforeAdd, [t])) {
                            var n = this._addCore(t, e);
                            return this._onChange("add", t.id, t), this.events.fire(c.DataEvents.afterAdd, [t]), n
                        }
                    }, t.prototype.remove = function (t) {
                        var e = this._pull[t];
                        if (e) {
                            if (!this.events.fire(c.DataEvents.beforeRemove, [e])) return;
                            this._removeCore(e.id), this._onChange("remove", t, e)
                        }
                        this.events.fire(c.DataEvents.afterRemove, [e])
                    }, t.prototype.removeAll = function () {
                        this._removeAll(), this.events.fire(c.DataEvents.removeAll), this.events.fire(c.DataEvents.change)
                    }, t.prototype.exists = function (t) {
                        return !!this._pull[t]
                    }, t.prototype.getNearId = function (t) {
                        if (!this._pull[t]) return this._order[0].id || ""
                    }, t.prototype.getItem = function (t) {
                        return this._pull[t]
                    }, t.prototype.update = function (t, e, n) {
                        var i = this.getItem(t);
                        if (i) {
                            if (l.isEqualObj(e, i)) return;
                            e.id && t !== e.id ? (l.dhxWarning("this method doesn't allow change id"), l.isDebug()) : (u.extend(this._pull[t], e, !1), this.config.update && this.config.update(this._pull[t]), n || this._onChange("update", t, this._pull[t]))
                        } else l.dhxWarning("item not found")
                    }, t.prototype.getIndex = function (t) {
                        var e = u.findIndex(this._order, function (e) {
                            return e.id === t
                        });
                        return this._pull[t] && e >= 0 ? e : -1
                    }, t.prototype.getId = function (t) {
                        if (this._order[t]) return this._order[t].id
                    }, t.prototype.getLength = function () {
                        return this._order.length
                    }, t.prototype.filter = function (t, e) {
                        var n = this;
                        if ((e = u.extend({
                                add: !1,
                                multiple: !0
                            }, e)).add || (this._order = this._initOrder || this._order, this._initOrder = null), this._filters = this._filters || {}, e.multiple && t || (this._filters = {}), t) {
                            if ("function" == typeof t) {
                                this._filters._ = {
                                    match: "_",
                                    compare: t
                                }
                            } else t.match ? (t.compare = t.compare || function (t, e) {
                                return t === e
                            }, this._filters[t.by] = t) : delete this._filters[t.by];
                            var i = this._order.filter(function (t) {
                                return Object.keys(n._filters).every(function (e) {
                                    return t[e] ? n._filters[e].compare(t[e], n._filters[e].match, t) : n._filters[e].compare(t)
                                })
                            });
                            this._initOrder || (this._initOrder = this._order, this._order = i)
                        }
                        this.events.fire(c.DataEvents.change)
                    }, t.prototype.find = function (t) {
                        for (var e in this._pull) {
                            var n = l.findByConf(this._pull[e], t);
                            if (n) return n
                        }
                        return null
                    }, t.prototype.findAll = function (t) {
                        var e = [];
                        for (var n in this._pull) {
                            var i = l.findByConf(this._pull[n], t);
                            i && e.push(i)
                        }
                        return e
                    }, t.prototype.sort = function (t) {
                        this._sort.sort(this._order, t), this._initOrder && this._initOrder.length && this._sort.sort(this._initOrder, t), this.events.fire(c.DataEvents.change)
                    }, t.prototype.copy = function (t, e, n, o) {
                        if (!this.exists(t)) return null;
                        var r = u.uid();
                        return n ? o ? void n.add(i({}, this.getItem(t)), e, o) : n.exists(t) ? (n.add(i(i({}, this.getItem(t)), {
                            id: r
                        }), e), r) : (n.add(this.getItem(t), e), t) : (this.add(i(i({}, this.getItem(t)), {
                            id: r
                        }), e), r)
                    }, t.prototype.move = function (t, e, n, i) {
                        if (n && n !== this && this.exists(t)) {
                            var o = this.getItem(t);
                            return n.exists(t) && (o.id = u.uid()), i && (o.parent = i), n.add(o, e), this.remove(o.id), o.id
                        }
                        if (this.getIndex(t) === e) return null;
                        var r = this._order.splice(this.getIndex(t), 1)[0];
                        return -1 === e && (e = this._order.length), this._order.splice(e, 0, r), this.events.fire(c.DataEvents.change), t
                    }, t.prototype.load = function (t, e) {
                        return "string" == typeof t && (t = new a.DataProxy(t)), this._loader.load(t, e)
                    }, t.prototype.parse = function (t, e) {
                        return this._removeAll(), this._loader.parse(t, e)
                    }, t.prototype.$parse = function (t) {
                        var e = this.config.approximate;
                        e && (t = this._approximate(t, e.value, e.maxNum)), this._parse_data(t), this.events.fire(c.DataEvents.change), this.events.fire(c.DataEvents.load)
                    }, t.prototype.save = function (t) {
                        this._loader.save(t)
                    }, t.prototype.isSaved = function () {
                        return !this._changes.order.length
                    }, t.prototype.map = function (t) {
                        for (var e = [], n = 0; n < this._order.length; n++) e.push(t.call(this, this._order[n], n));
                        return e
                    }, t.prototype.reduce = function (t, e) {
                        for (var n = 0; n < this._order.length; n++) e = t.call(this, e, this._order[n], n);
                        return e
                    }, t.prototype.serialize = function () {
                        return this.map(function (t) {
                            var e = i({}, t);
                            return Object.keys(e).forEach(function (t) {
                                "$" === t[0] && delete e[t]
                            }), e
                        })
                    }, t.prototype.getInitialData = function () {
                        return this._initOrder
                    }, t.prototype._removeAll = function () {
                        this._pull = {}, this._order = [], this._changes.order = [], this._initOrder = null
                    }, t.prototype._addCore = function (t, e) {
                        return this.config.init && (t = this.config.init(t)), t.id = t.id ? t.id.toString() : u.uid(), this._pull[t.id] && l.dhxError("Item already exist"), this._initOrder && this._initOrder.length && this._addToOrder(this._initOrder, t, e), this._addToOrder(this._order, t, e), t.id
                    }, t.prototype._removeCore = function (t) {
                        this.getIndex(t) >= 0 && (this._order = this._order.filter(function (e) {
                            return e.id !== t
                        }), delete this._pull[t]), this._initOrder && this._initOrder.length && (this._initOrder = this._initOrder.filter(function (e) {
                            return e.id !== t
                        }))
                    }, t.prototype._parse_data = function (t) {
                        var e = this._order.length;
                        this.config.prep && (t = this.config.prep(t));
                        for (var n = 0, i = t; n < i.length; n++) {
                            var o = i[n];
                            this.config.init && (o = this.config.init(o)), o.id = o.id || u.uid(), this._pull[o.id] = o, this._order[e++] = o
                        }
                    }, t.prototype._approximate = function (t, e, n) {
                        for (var i = t.length, o = e.length, r = Math.floor(i / n), s = Array(Math.ceil(i / r)), a = 0, l = 0; l < i; l += r) {
                            for (var c = u.copy(t[l]), d = Math.min(i, l + r), f = 0; f < o; f++) {
                                for (var h = 0, p = l; p < d; p++) h += t[p][e[f]];
                                c[e[f]] = h / (d - l)
                            }
                            s[a++] = c
                        }
                        return s
                    }, t.prototype._onChange = function (t, e, n) {
                        for (var o = 0, r = this._changes.order; o < r.length; o++) {
                            var s = r[o];
                            if (s.id === e && !s.saving) return s.error && (s.error = !1), s = i(i({}, s), {
                                obj: n,
                                status: t
                            }), void this.events.fire(c.DataEvents.change, [e, t, n])
                        }
                        this._changes.order.push({
                            id: e,
                            status: t,
                            obj: i({}, n),
                            saving: !1
                        }), this.events.fire(c.DataEvents.change, [e, t, n])
                    }, t.prototype._addToOrder = function (t, e, n) {
                        n >= 0 && t[n] ? (this._pull[e.id] = e, t.splice(n, 0, e)) : (this._pull[e.id] = e, t.push(e))
                    }, t
                }();
            e.DataCollection = d
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__assign || function () {
                return (i = Object.assign || function (t) {
                    for (var e, n = 1, i = arguments.length; n < i; n++)
                        for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                    return t
                }).apply(this, arguments)
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = function () {
                function t(t) {
                    void 0 === t && (t = {});
                    this.config = i(i({}, {
                        skipHeader: 0,
                        nameByHeader: !1,
                        row: "\n",
                        column: ","
                    }), t), this.config.nameByHeader && (this.config.skipHeader = 1)
                }
                return t.prototype.getFields = function (t, e) {
                    for (var n = t.trim().split(this.config.column), i = {}, o = 0; o < n.length; o++) i[e ? e[o] : o + 1] = n[o];
                    return i
                }, t.prototype.getRows = function (t) {
                    return t.trim().split(this.config.row)
                }, t.prototype.toJsonArray = function (t) {
                    var e = this,
                        n = this.getRows(t),
                        i = this.config.names;
                    if (this.config.skipHeader) {
                        var o = n.splice(0, this.config.skipHeader);
                        this.config.nameByHeader && (i = o[0].trim().split(this.config.column))
                    }
                    return n.map(function (t) {
                        return e.getFields(t, i)
                    })
                }, t
            }();
            e.CsvDriver = o
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = function () {
                function t() {}
                return t.prototype.toJsonArray = function (t) {
                    return this.getRows(t)
                }, t.prototype.getFields = function (t) {
                    return t
                }, t.prototype.getRows = function (t) {
                    return "string" == typeof t ? JSON.parse(t) : t
                }, t
            }();
            e.JsonDriver = i
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__extends || function () {
                    var t = function (e, n) {
                        return (t = Object.setPrototypeOf || {
                                __proto__: []
                            }
                            instanceof Array && function (t, e) {
                                t.__proto__ = e
                            } || function (t, e) {
                                for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                            })(e, n)
                    };
                    return function (e, n) {
                        function i() {
                            this.constructor = e
                        }
                        t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
                    }
                }(),
                o = this && this.__assign || function () {
                    return (o = Object.assign || function (t) {
                        for (var e, n = 1, i = arguments.length; n < i; n++)
                            for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                        return t
                    }).apply(this, arguments)
                },
                r = this && this.__spreadArrays || function () {
                    for (var t = 0, e = 0, n = arguments.length; e < n; e++) t += arguments[e].length;
                    var i = Array(t),
                        o = 0;
                    for (e = 0; e < n; e++)
                        for (var r = arguments[e], s = 0, a = r.length; s < a; s++, o++) i[o] = r[s];
                    return i
                };
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var s = n(2),
                a = n(33),
                l = n(18),
                c = n(13),
                u = n(12);

            function d(t, e, n, i) {
                void 0 !== i && -1 !== i && t[n] && t[n][i] ? t[n].splice(i, 0, e) : (t[n] || (t[n] = []), t[n].push(e))
            }
            var f = function (t) {
                function e(e, n) {
                    var i, o = t.call(this, e, n) || this,
                        r = o._root = "_ROOT_" + s.uid();
                    return o._childs = ((i = {})[r] = [], i), o._initChilds = null, o
                }
                return i(e, t), e.prototype.add = function (e, n, i) {
                    void 0 === n && (n = -1), void 0 === i && (i = this._root), "object" != typeof e && (e = {
                        value: e
                    }), e.parent = e.parent ? e.parent.toString() : i;
                    var o = t.prototype.add.call(this, e, n);
                    if (Array.isArray(e.childs))
                        for (var r = 0, s = e.childs; r < s.length; r++) {
                            var a = s[r];
                            this.add(a, -1, e.id)
                        }
                    return o
                }, e.prototype.getRoot = function () {
                    return this._root
                }, e.prototype.getParent = function (t, e) {
                    if (void 0 === e && (e = !1), !this._pull[t]) return null;
                    var n = this._pull[t].parent;
                    return e ? this._pull[n] : n
                }, e.prototype.getChilds = function (t) {
                    return this._childs && this._childs[t] ? this._childs[t] : []
                }, e.prototype.getLength = function (t) {
                    return void 0 === t && (t = this._root), this._childs[t] ? this._childs[t].length : null
                }, e.prototype.removeAll = function (e) {
                    var n;
                    if (e)
                        for (var i = 0, o = r(this._childs[e]); i < o.length; i++) {
                            var s = o[i];
                            this.remove(s.id)
                        } else {
                            t.prototype.removeAll.call(this);
                            var a = this._root;
                            this._initChilds = null, this._childs = ((n = {})[a] = [], n)
                        }
                }, e.prototype.getIndex = function (t) {
                    var e = this.getParent(t);
                    return e && this._childs[e] ? s.findIndex(this._childs[e], function (e) {
                        return e.id === t
                    }) : -1
                }, e.prototype.sort = function (t) {
                    var e = this._childs;
                    for (var n in e) this._sort.sort(e[n], t);
                    this.events.fire(u.DataEvents.change)
                }, e.prototype.map = function (t, e, n) {
                    void 0 === e && (e = this._root), void 0 === n && (n = !0);
                    var i = [];
                    if (!this.haveChilds(e)) return i;
                    for (var o = 0; o < this._childs[e].length; o++)
                        if (i.push(t.call(this, this._childs[e][o], o)), n) {
                            var r = this.map(t, this._childs[e][o].id, n);
                            i = i.concat(r)
                        } return i
                }, e.prototype.filter = function (t) {
                    if (t) {
                        this._initChilds || (this._initChilds = this._childs), t.type = t.type || u.TreeFilterType.all;
                        var e = {};
                        this._recursiveFilter(t, this._root, 0, e), this._childs = e, this.events.fire(u.DataEvents.change)
                    } else this.restoreOrder()
                }, e.prototype.restoreOrder = function () {
                    this._initChilds && (this._childs = this._initChilds, this._initChilds = null), this.events.fire(u.DataEvents.change)
                }, e.prototype.copy = function (t, n, i, r) {
                    if (void 0 === i && (i = this), void 0 === r && (r = this._root), !this.exists(t)) return null;
                    var a = o({}, this._childs)[t];
                    if (i === this && !this.canCopy(t, r)) return null;
                    if (i instanceof e) {
                        if (this.exists(t)) {
                            var l = o({}, this.getItem(t));
                            i.exists(t) ? l.id = s.uid() : l.id = t, l.parent = r, i.add(l, n), t = l.id
                        }
                        if (a)
                            for (var c = 0, u = a; c < u.length; c++) {
                                var d = u[c].id,
                                    f = this.getIndex(d);
                                this.copy(d, f, i, t)
                            }
                        return t
                    }
                    i.add(this._pull[t])
                }, e.prototype.move = function (t, n, i, o) {
                    if (void 0 === i && (i = this), void 0 === o && (o = this._root), !this.exists(t)) return null;
                    if (i !== this) {
                        if (!(i instanceof e)) return i.add(this._pull[t]), void this.remove(t);
                        var r = this.copy(t, n, i, o);
                        return this.remove(t), r
                    }
                    if (!this.canCopy(t, o)) return null;
                    var s = this.getParent(t),
                        a = this.getIndex(t),
                        l = this._childs[s].splice(a, 1)[0];
                    return l.parent = o, this._childs[s].length || delete this._childs[s], this.haveChilds(o) || (this._childs[o] = []), -1 === n ? n = this._childs[o].push(l) : this._childs[o].splice(n, 0, l), this.events.fire(u.DataEvents.change), t
                }, e.prototype.eachChild = function (t, e, n, i) {
                    if (void 0 === n && (n = !0), void 0 === i && (i = function () {
                            return !0
                        }), this.haveChilds(t))
                        for (var o = 0; o < this._childs[t].length; o++) e.call(this, this._childs[t][o], o), n && i(this._childs[t][o]) && this.eachChild(this._childs[t][o].id, e, n, i)
                }, e.prototype.getNearId = function (t) {
                    return t
                }, e.prototype.loadChilds = function (t, e) {
                    var n = this;
                    void 0 === e && (e = "json");
                    var i = this.config.autoload + "?id=" + t;
                    new l.DataProxy(i).load().then(function (i) {
                        i = (e = c.toDataDriver(e)).toJsonArray(i), n._parse_data(i, t), n.events.fire(u.DataEvents.change)
                    })
                }, e.prototype.refreshChilds = function (t, e) {
                    void 0 === e && (e = "json"), this.removeAll(t), this.loadChilds(t, e)
                }, e.prototype.eachParent = function (t, e, n) {
                    void 0 === n && (n = !1);
                    var i = this.getItem(t);
                    if (i && (n && e.call(this, i), i.parent !== this._root)) {
                        var o = this.getItem(i.parent);
                        e.call(this, o), this.eachParent(i.parent, e)
                    }
                }, e.prototype.haveChilds = function (t) {
                    return t in this._childs
                }, e.prototype.canCopy = function (t, e) {
                    if (t === e) return !1;
                    var n = !0;
                    return this.eachParent(e, function (e) {
                        return e.id === t ? n = !1 : null
                    }), n
                }, e.prototype.serialize = function (t) {
                    return this._serialize(this._root, t)
                }, e.prototype.getId = function (t, e) {
                    if (void 0 === e && (e = this._root), this._childs[e] && this._childs[e][t]) return this._childs[e][t].id
                }, e.prototype._removeAll = function (e) {
                    var n;
                    if (e)
                        for (var i = 0, o = r(this._childs[e]); i < o.length; i++) {
                            var s = o[i];
                            this.remove(s.id)
                        } else {
                            t.prototype._removeAll.call(this);
                            var a = this._root;
                            this._initChilds = null, this._childs = ((n = {})[a] = [], n)
                        }
                }, e.prototype._removeCore = function (t) {
                    if (this._pull[t]) {
                        var e = this.getParent(t);
                        this._childs[e] = this._childs[e].filter(function (e) {
                            return e.id !== t
                        }), e === this._root || this._childs[e].length || delete this._childs[e], this._initChilds && this._initChilds[e] && (this._initChilds[e] = this._initChilds[e].filter(function (e) {
                            return e.id !== t
                        }), e === this._root || this._initChilds[e].length || delete this._initChilds[e]), this._fastDeleteChilds(this._childs, t), this._initChilds && this._fastDeleteChilds(this._initChilds, t)
                    }
                }, e.prototype._addToOrder = function (t, e, n) {
                    var i = this._childs,
                        o = this._initChilds,
                        r = e.parent;
                    this._pull[e.id] = e, d(i, e, r, n), o && d(o, e, r, n)
                }, e.prototype._parse_data = function (t, e) {
                    void 0 === e && (e = this._root);
                    for (var n = 0, i = t; n < i.length; n++) {
                        var o = i[n];
                        this.config.init && (o = this.config.init(o)), "object" != typeof o && (o = {
                            value: o
                        }), o.id = o.id ? o.id.toString() : s.uid(), o.parent = o.parent ? o.parent.toString() : e, this._pull[o.id] = o, this._childs[o.parent] || (this._childs[o.parent] = []), this._childs[o.parent].push(o), o.childs && o.childs instanceof Object && this._parse_data(o.childs, o.id)
                    }
                }, e.prototype._fastDeleteChilds = function (t, e) {
                    if (this._pull[e] && delete this._pull[e], t[e]) {
                        for (var n = 0; n < t[e].length; n++) this._fastDeleteChilds(t, t[e][n].id);
                        delete t[e]
                    }
                }, e.prototype._recursiveFilter = function (t, e, n, i) {
                    var o = this,
                        r = this._childs[e];
                    if (r) {
                        var s = function (e) {
                            switch (t.type) {
                                case u.TreeFilterType.all:
                                    return !0;
                                case u.TreeFilterType.specific:
                                    return n === t.specific;
                                case u.TreeFilterType.leafs:
                                    return !o.haveChilds(e.id)
                            }
                        };
                        if (t.by && t.match) {
                            var a = function (e) {
                                return !s(e) || -1 !== e[t.by].toString().toLowerCase().indexOf(t.match.toString().toLowerCase())
                            };
                            i[e] = r.filter(a)
                        } else if (t.rule && "function" == typeof t.rule) {
                            a = function (e) {
                                return !s(e) || t.rule(e)
                            };
                            var l = r.filter(a);
                            l.length && (i[e] = l)
                        }
                        for (var c = 0, d = r; c < d.length; c++) {
                            var f = d[c];
                            this._recursiveFilter(t, f.id, n + 1, i)
                        }
                    }
                }, e.prototype._serialize = function (t, e) {
                    var n = this;
                    return void 0 === t && (t = this._root), this.map(function (t) {
                        var i = {};
                        for (var o in t) "parent" !== o && "childs" !== o && (i[o] = t[o]);
                        return e && (i = e(i)), n.haveChilds(t.id) && (i.childs = n._serialize(t.id, e)), i
                    }, t, !1)
                }, e
            }(a.DataCollection);
            e.TreeCollection = f
        }, function (t, e, n) {
            "use strict";

            function i(t) {
                for (var n in t) e.hasOwnProperty(n) || (e[n] = t[n])
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), i(n(64)), i(n(19))
        }, function (t, e, n) {
            "use strict";

            function i(t, e) {
                t[e] && ("string" == typeof t[e] ? t[e] = [{
                    text: "" + t[e]
                }] : t[e] = t[e].map(function (t) {
                    return "string" == typeof t && (t = {
                        text: t
                    }), t
                }))
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.normalizeColumns = function (t) {
                for (var e = 0, n = t; e < n.length; e++) {
                    var o = n[e];
                    o.$cellCss = o.$cellCss || {}, i(o, "header"), i(o, "footer"), o.width = o.width || 100
                }
            }, e.countColumns = function (t, e) {
                var n = 0,
                    i = 0,
                    o = !1,
                    r = 0,
                    s = !1;
                return e.map(function (t) {
                    if (n = Math.max(n, t.header.length), i += t.width, t.footer && !s && (s = !0), !o)
                        for (var e = 0, r = t.header; e < r.length; e++)
                            if (r[e].colspan) return void(o = !0)
                }), e.map(function (t) {
                    if (t.header.length < n)
                        for (var e = 0; e < n; e++) t.header[e] = t.header[e] || {
                            text: ""
                        };
                    t.header.map(function (t) {
                        t.css = t.css || "", t.text || /dhx_cell_empty/.test(t.css) || (t.css += " dhx_cell_empty")
                    }), "" === t.header[0].text && r++
                }), t.$totalWidth = i, t.$headerLevel = n, t.$colspans = o, t.$footer = s, r
            }, e.calculatePositions = function (t, e, n, i) {
                for (var o = i.$totalWidth / i.columns.length, r = Math.round(t / o), s = Math.round(e / i.rowHeight), a = Math.round(n.top / i.rowHeight) || 0, l = a - 1 >= 0 ? a - 1 : 0, c = a + s + 1, u = 0, d = n.left, f = 0; f < i.columns.length && (d -= i.columns[f].width) + o / 2 > 0; f++) u++;
                return {
                    xStart: u - 1 >= 0 ? u - 1 : 0,
                    xEnd: u + r + 1,
                    yStart: l,
                    yEnd: c
                }
            }, e.getUnique = function (t, e) {
                return t.filter(function (t, n, i) {
                    return n === i.reduce(function (n, i, o) {
                        return i[e] === t[e] ? o : n
                    }, -1)
                }).sort(function (t, n) {
                    return t[e] > n[e] ? 1 : -1
                })
            }
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__spreadArrays || function () {
                for (var t = 0, e = 0, n = arguments.length; e < n; e++) t += arguments[e].length;
                var i = Array(t),
                    o = 0;
                for (e = 0; e < n; e++)
                    for (var r = arguments[e], s = 0, a = r.length; s < a; s++, o++) i[o] = r[s];
                return i
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = n(0),
                r = n(19);

            function s(t, e, n, i) {
                t.fire(r.GridEvents.headerInput, [i.target.value, e, n])
            }

            function a(t, e, n) {
                var i = t.id,
                    o = e.data.map(function (t) {
                        return parseFloat(t[i]) || 0
                    }),
                    r = o;
                return "tree" === e.type && (r = e.data.reduce(function (t, e) {
                    return 0 === e.$level && t.push(parseFloat(e[i]) || 0), t
                }, [])), n(o, r)
            }
            e.content = {
                inputFilter: {
                    toHtml: function (t, e) {
                        return o.el("input", {
                            type: "text",
                            class: "dhx_grid_filter",
                            oninput: [s, e.events, t.id, "inputFilter"],
                            style: {
                                width: t.width - 20
                            },
                            _key: t.id
                        })
                    },
                    match: function (t, e) {
                        return new RegExp("^" + e, "i").test(t)
                    }
                },
                selectFilter: {
                    toHtml: function (t, e) {
                        return o.el("select", {
                            type: "text",
                            class: "dhx_grid_filter",
                            oninput: [s, e.events, t.id, "selectFilter"],
                            style: {
                                width: t.width - 20
                            },
                            _key: t.id
                        }, i([o.el("option", {
                            value: ""
                        }, "")], t.$uniqueData.map(function (e) {
                            return o.el("option", {
                                value: e[t.id]
                            }, e[t.id])
                        })))
                    },
                    match: function (t, e) {
                        return t === e
                    }
                },
                sum: {
                    calculate: function (t, e) {
                        return e.reduce(function (t, e) {
                            return t + (parseFloat(e) || 0)
                        }, 0).toFixed(3)
                    },
                    toHtml: function (t, e) {
                        return a(t, e, this.calculate)
                    }
                },
                avg: {
                    calculate: function (t, e) {
                        return (e.reduce(function (t, e) {
                            return t + e
                        }, 0) / t.length).toFixed(3)
                    },
                    toHtml: function (t, e) {
                        return a(t, e, this.calculate)
                    }
                },
                min: {
                    calculate: function (t) {
                        return Math.min.apply(Math, t).toFixed(3)
                    },
                    toHtml: function (t, e) {
                        return a(t, e, this.calculate)
                    }
                },
                max: {
                    calculate: function (t) {
                        return Math.max.apply(Math, t).toFixed(3)
                    },
                    toHtml: function (t, e) {
                        return a(t, e, this.calculate)
                    }
                },
                count: {
                    calculate: function (t, e) {
                        return e.reduce(function (t, e) {
                            return t + e
                        }, 0)
                    },
                    toHtml: function (t, e) {
                        return a(t, e, this.calculate)
                    }
                }
            }
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__extends || function () {
                var t = function (e, n) {
                    return (t = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function (t, e) {
                            t.__proto__ = e
                        } || function (t, e) {
                            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                        })(e, n)
                };
                return function (e, n) {
                    function i() {
                        this.constructor = e
                    }
                    t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
                }
            }();
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = n(2),
                r = n(0),
                s = n(3),
                a = n(27),
                l = n(9),
                c = n(21),
                u = n(25),
                d = function (t) {
                    function e(e, n) {
                        var i = t.call(this, e, o.extend({
                            navigationType: "click"
                        }, n)) || this;
                        i._currentRoot = null, i._factory = u.createFactory(l.ItemType.button);
                        return i.mount(e, r.create({
                            render: function () {
                                return i._draw()
                            }
                        })), i
                    }
                    return i(e, t), e.prototype.getValues = function () {
                        var t = {};
                        for (var e in this.data.eachChild(this.data.getRoot(), function (e) {
                                e.twoState ? t[e.id] = e.active : e.type === l.ItemType.input && (t[e.id] = e.value)
                            }, !1), this._groups) this._groups[e].active && (t[e] = this._groups[e].active);
                        return t
                    }, e.prototype.setValues = function (t) {
                        for (var e in t) {
                            if (this._groups[e]) this._groups[e].active && (this.data.update(this._groups[e].active, {
                                active: !1
                            }), this._groups[e].active = t[e], this.data.update(t[e], {
                                active: !0
                            }));
                            else this.data.getItem(e).type === l.ItemType.input ? this.data.update(e, {
                                value: t[e]
                            }) : this.data.update(e, {
                                active: t[e]
                            })
                        }
                    }, e.prototype._initHandlers = function () {
                        var e = this;
                        t.prototype._initHandlers.call(this), this._onInput = function (t) {
                            var n = s.locate(t);
                            e.data.update(n, {
                                value: t.target.value
                            })
                        }, this._showTooltip = function (t) {
                            var n = s.locateNode(t);
                            if (n) {
                                var i = n.getAttribute("dhx_id"),
                                    o = e.data.getItem(i);
                                o.tooltip && a.tooltip(o.tooltip, {
                                    node: n,
                                    position: a.Position.bottom
                                })
                            }
                        }
                    }, e.prototype._draw = function () {
                        var t = this;
                        return r.el(".toolbar.dhx_widget" + (this.config.css ? "." + this.config.css : ""), {
                            dhx_widget_id: this._uid,
                            onclick: this._handlers.onclick,
                            oninput: this._onInput,
                            onmouseover: this._showTooltip
                        }, this.data.map(function (e) {
                            return t._factory(e, t.events)
                        }, this.data.getRoot(), !1))
                    }, e.prototype._getMode = function (t, e) {
                        return t.id === e ? "bottom" : "right"
                    }, e.prototype._close = function () {
                        this._activeMenu = null, this._activePosition = null, this._currentRoot = null, this.paint()
                    }, e.prototype._normalizeData = function () {
                        var t = this,
                            e = this.data.getRoot(),
                            n = {};
                        this.data.eachChild(e, function (i) {
                            i.type !== l.ItemType.menuItem && i.type !== l.ItemType.selectButton || t.data.haveChilds(i.id) && (t.data.eachChild(i.id, function (t) {
                                return t.type = t.type || l.ItemType.menuItem
                            }, !1), i.parent !== e ? i.$openIcon = "right" : i.$openIcon = "bot"), i.group && c.addInGroups(n, i)
                        }, !0), this._groups = n
                    }, e.prototype._setRoot = function (t) {
                        this.data.getParent(t) === this.data.getRoot() && (this._currentRoot = t)
                    }, e
                }(n(26).MenuBase);
            e.Toolbar = d
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(16),
                o = n(1);

            function r(t, e) {
                var n = o.getCellIndex(t),
                    i = o.getCellIndex(e),
                    r = i.col - n.col,
                    s = i.row - n.row;
                return {
                    x: r,
                    y: s,
                    isLargerByX: Math.abs(r) > Math.abs(s)
                }
            }

            function s(t) {
                var e = t.map(function (t) {
                        return parseFloat(t)
                    }),
                    n = e.reduce(function (t, e) {
                        return t + e
                    }, 0),
                    i = e.length;
                return (n / i * 2 - 2 * e[0]) / (i - 1)
            }
            e.getLastCopyingCell = function (t, e) {
                if (o.isRangeId(t)) {
                    var n = t.split(":"),
                        i = n[0],
                        s = n[1];
                    r(i, s).isLargerByX, t = s
                }
                var a = o.getCellIndex(t),
                    l = r(t, e),
                    c = l.x,
                    u = l.y,
                    d = l.isLargerByX,
                    f = a.row + u,
                    h = a.col + c,
                    p = d ? h : a.col,
                    g = d ? a.row : f;
                return o.getCellNameByIndex(g, p)
            }, e.getCellsDiff = r, e.getProgressionStep = s, e.getAutoFilledCells = function (t, e, n) {
                var r = t.filter(function (t) {
                    return i.isNumeric(t)
                });
                1 === r.length && r.push(+r[0] + 1);
                var a = o.getCellsArray(e),
                    l = s(r),
                    c = parseFloat(r[r.length - 1]),
                    u = 0,
                    d = function (t, e) {
                        var n = o.getCellIndex(t),
                            i = o.getCellIndex(e);
                        return n.row === i.row ? n.col > i.col : n.row > i.row
                    }(e.split(":")[0], n.split(":")[0]);
                d && (l = -l, c = parseFloat(r[0]), u = r.length - 1);
                var f = o.getCellsArray(n).filter(function (t) {
                        return -1 === a.indexOf(t)
                    }),
                    h = f.map(function () {
                        var e = t[u];
                        return i.isNumeric(t[u]) && (e = (c += l).toFixed(5)), u = d ? void 0 !== t[u - 1] ? u - 1 : r.length - 1 : void 0 !== t[u + 1] ? u + 1 : 0, e
                    });
                return d && (h = h.reverse()), {
                    cells: f[0] + ":" + f[f.length - 1],
                    value: h
                }
            }
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(43);
            e.css = i.cssManager;
            var o = n(6),
                r = n(27);
            e.message = r.message;
            var s = window.dhx = window.dhx || {};
            e.i18n = s.i18n || {}, e.i18n.setLocale = function (t, n) {
                var i = e.i18n[t];
                for (var o in n) i[o] = n[o]
            }, e.i18n.spreadsheet = e.i18n.spreadsheet || o.default, s.css = s.css || i.cssManager, n(50);
            var a = n(51);
            e.Spreadsheet = a.Spreadsheet
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(2),
                o = function () {
                    function t() {
                        this._classes = {};
                        var t = document.createElement("style");
                        t.id = "dhx_generated_styles", this._styleCont = document.head.appendChild(t)
                    }
                    return t.prototype.update = function () {
                        document.head.appendChild(this._styleCont), this._styleCont.innerHTML = this._generateCss()
                    }, t.prototype.remove = function (t) {
                        delete this._classes[t], this.update()
                    }, t.prototype.add = function (t, e, n) {
                        void 0 === n && (n = !1);
                        var i = this._toCssString(t),
                            o = this._findSameClassId(i);
                        return o && e && e !== o ? (this._classes[e] = this._classes[o], e) : o || this._addNewClass(i, e, n)
                    }, t.prototype.get = function (t) {
                        if (this._classes[t]) {
                            for (var e = {}, n = 0, i = this._classes[t].split(";"); n < i.length; n++) {
                                var o = i[n];
                                if (o) {
                                    var r = o.split(":");
                                    e[r[0]] = r[1]
                                }
                            }
                            return e
                        }
                        return null
                    }, t.prototype._findSameClassId = function (t) {
                        for (var e in this._classes)
                            if (t === this._classes[e]) return e;
                        return null
                    }, t.prototype._addNewClass = function (t, e, n) {
                        var o = e || "dhx_generated_class_" + i.uid();
                        return this._classes[o] = t, n || this.update(), o
                    }, t.prototype._toCssString = function (t) {
                        var e = "";
                        for (var n in t) {
                            var i = t[n];
                            e += n.replace(/[A-Z]{1}/g, function (t) {
                                return "-" + t.toLowerCase()
                            }) + ":" + i + ";"
                        }
                        return e
                    }, t.prototype._generateCss = function () {
                        var t = "";
                        for (var e in this._classes) {
                            t += "." + e + "{" + this._classes[e] + "}\n"
                        }
                        return t
                    }, t
                }();
            e.CssManager = o, e.cssManager = new o
        }, function (t, e) {
            if (Element && !Element.prototype.matches) {
                var n = Element.prototype;
                n.matches = n.matchesSelector || n.mozMatchesSelector || n.msMatchesSelector || n.oMatchesSelector || n.webkitMatchesSelector
            }
        }, function (t, e, n) {
            "use strict";
            (function (t) {
                Object.defineProperty(e, "__esModule", {
                    value: !0
                });
                var i = n(49);

                function o(t) {
                    var e = document.activeElement;
                    e.classList.contains("apply-button") || e.classList.contains("reject-button") || t.preventDefault()
                }

                function r(t) {
                    var e = document.createElement("div");
                    return e.className = "dhx-blocker " + (t || ""), document.body.appendChild(e), document.addEventListener("keydown", o),
                        function () {
                            document.body.removeChild(e), document.removeEventListener("keydown", o)
                        }
                }
                e.blockScreen = r, e.alert = function (e) {
                    var n = e.buttons && e.buttons[0] ? e.buttons[0] : i.default.apply,
                        o = r(e.blockerCss);
                    return new t(function (t) {
                        var i = document.createElement("div");
                        i.className = "dhx-alert " + (e.css || ""), i.innerHTML = '\n\t\t\t<div class="message-box-header">\n\t\t\t\t<div class="mesage-box-title">' + e.header + '</div>\n\t\t\t</div>\n\t\t\t<div class="alert-message">' + e.text + '</div>\n\t\t\t<div class="action-button ' + (e.buttonsAlignment ? e.buttonsAlignment : "") + '">\n\t\t\t\t<button class="apply-button alert-btn dhx_btn dhx_btn--flat">' + n + "</button>\n\t\t\t</div>", document.body.appendChild(i), i.querySelector(".apply-button").focus(), i.querySelector("button").addEventListener("click", function () {
                            o(), document.body.removeChild(i), t(!0)
                        })
                    })
                }, e.confirm = function (e) {
                    var n = e.buttons && e.buttons[1] ? e.buttons[1] : i.default.apply,
                        o = e.buttons && e.buttons[0] ? e.buttons[0] : i.default.reject,
                        s = r(e.blockerCss);
                    return new t(function (t) {
                        var i = document.createElement("div");
                        i.className = "dhx-confirm " + (e.css || ""), i.innerHTML = '\n\t\t\t<div class="message-box-header">\n\t\t\t\t<div class="mesage-box-title">' + e.header + '</div>\n\t\t\t</div>\n\t\t\t<div class="confirm-message">' + e.text + '</div>\n\t\t\t<div class="action-button ' + (e.buttonsAlignment ? e.buttonsAlignment : "") + '">\n\t\t\t\t<button class="reject-button dhx_btn dhx_btn--link">' + o + '</button>\n\t\t\t\t<button class="apply-button dhx_btn dhx_btn--flat">' + n + "</button>\n\t\t\t</div>", document.body.appendChild(i), i.querySelector(".reject-button").focus();
                        var r = function (e) {
                            "BUTTON" === e.target.tagName && function (e) {
                                s(), i.removeEventListener("click", r), document.body.removeChild(i), t(e)
                            }(e.target.classList.contains("apply-button"))
                        };
                        i.addEventListener("click", r)
                    })
                }
            }).call(this, n(10))
        }, function (t, e, n) {
            (function (t) {
                var i = void 0 !== t && t || "undefined" != typeof self && self || window,
                    o = Function.prototype.apply;

                function r(t, e) {
                    this._id = t, this._clearFn = e
                }
                e.setTimeout = function () {
                    return new r(o.call(setTimeout, i, arguments), clearTimeout)
                }, e.setInterval = function () {
                    return new r(o.call(setInterval, i, arguments), clearInterval)
                }, e.clearTimeout = e.clearInterval = function (t) {
                    t && t.close()
                }, r.prototype.unref = r.prototype.ref = function () {}, r.prototype.close = function () {
                    this._clearFn.call(i, this._id)
                }, e.enroll = function (t, e) {
                    clearTimeout(t._idleTimeoutId), t._idleTimeout = e
                }, e.unenroll = function (t) {
                    clearTimeout(t._idleTimeoutId), t._idleTimeout = -1
                }, e._unrefActive = e.active = function (t) {
                    clearTimeout(t._idleTimeoutId);
                    var e = t._idleTimeout;
                    e >= 0 && (t._idleTimeoutId = setTimeout(function () {
                        t._onTimeout && t._onTimeout()
                    }, e))
                }, n(47), e.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== t && t.setImmediate || this && this.setImmediate, e.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== t && t.clearImmediate || this && this.clearImmediate
            }).call(this, n(24))
        }, function (t, e, n) {
            (function (t, e) {
                ! function (t, n) {
                    "use strict";
                    if (!t.setImmediate) {
                        var i, o = 1,
                            r = {},
                            s = !1,
                            a = t.document,
                            l = Object.getPrototypeOf && Object.getPrototypeOf(t);
                        l = l && l.setTimeout ? l : t, "[object process]" === {}.toString.call(t.process) ? i = function (t) {
                            e.nextTick(function () {
                                u(t)
                            })
                        } : function () {
                            if (t.postMessage && !t.importScripts) {
                                var e = !0,
                                    n = t.onmessage;
                                return t.onmessage = function () {
                                    e = !1
                                }, t.postMessage("", "*"), t.onmessage = n, e
                            }
                        }() ? function () {
                            var e = "setImmediate$" + Math.random() + "$",
                                n = function (n) {
                                    n.source === t && "string" == typeof n.data && 0 === n.data.indexOf(e) && u(+n.data.slice(e.length))
                                };
                            t.addEventListener ? t.addEventListener("message", n, !1) : t.attachEvent("onmessage", n), i = function (n) {
                                t.postMessage(e + n, "*")
                            }
                        }() : t.MessageChannel ? function () {
                            var t = new MessageChannel;
                            t.port1.onmessage = function (t) {
                                u(t.data)
                            }, i = function (e) {
                                t.port2.postMessage(e)
                            }
                        }() : a && "onreadystatechange" in a.createElement("script") ? function () {
                            var t = a.documentElement;
                            i = function (e) {
                                var n = a.createElement("script");
                                n.onreadystatechange = function () {
                                    u(e), n.onreadystatechange = null, t.removeChild(n), n = null
                                }, t.appendChild(n)
                            }
                        }() : i = function (t) {
                            setTimeout(u, 0, t)
                        }, l.setImmediate = function (t) {
                            "function" != typeof t && (t = new Function("" + t));
                            for (var e = new Array(arguments.length - 1), n = 0; n < e.length; n++) e[n] = arguments[n + 1];
                            var s = {
                                callback: t,
                                args: e
                            };
                            return r[o] = s, i(o), o++
                        }, l.clearImmediate = c
                    }

                    function c(t) {
                        delete r[t]
                    }

                    function u(t) {
                        if (s) setTimeout(u, 0, t);
                        else {
                            var e = r[t];
                            if (e) {
                                s = !0;
                                try {
                                    ! function (t) {
                                        var e = t.callback,
                                            i = t.args;
                                        switch (i.length) {
                                            case 0:
                                                e();
                                                break;
                                            case 1:
                                                e(i[0]);
                                                break;
                                            case 2:
                                                e(i[0], i[1]);
                                                break;
                                            case 3:
                                                e(i[0], i[1], i[2]);
                                                break;
                                            default:
                                                e.apply(n, i)
                                        }
                                    }(e)
                                } finally {
                                    c(t), s = !1
                                }
                            }
                        }
                    }
                }("undefined" == typeof self ? void 0 === t ? this : t : self)
            }).call(this, n(24), n(48))
        }, function (t, e) {
            var n, i, o = t.exports = {};

            function r() {
                throw new Error("setTimeout has not been defined")
            }

            function s() {
                throw new Error("clearTimeout has not been defined")
            }

            function a(t) {
                if (n === setTimeout) return setTimeout(t, 0);
                if ((n === r || !n) && setTimeout) return n = setTimeout, setTimeout(t, 0);
                try {
                    return n(t, 0)
                } catch (e) {
                    try {
                        return n.call(null, t, 0)
                    } catch (e) {
                        return n.call(this, t, 0)
                    }
                }
            }! function () {
                try {
                    n = "function" == typeof setTimeout ? setTimeout : r
                } catch (t) {
                    n = r
                }
                try {
                    i = "function" == typeof clearTimeout ? clearTimeout : s
                } catch (t) {
                    i = s
                }
            }();
            var l, c = [],
                u = !1,
                d = -1;

            function f() {
                u && l && (u = !1, l.length ? c = l.concat(c) : d = -1, c.length && h())
            }

            function h() {
                if (!u) {
                    var t = a(f);
                    u = !0;
                    for (var e = c.length; e;) {
                        for (l = c, c = []; ++d < e;) l && l[d].run();
                        d = -1, e = c.length
                    }
                    l = null, u = !1,
                        function (t) {
                            if (i === clearTimeout) return clearTimeout(t);
                            if ((i === s || !i) && clearTimeout) return i = clearTimeout, clearTimeout(t);
                            try {
                                i(t)
                            } catch (e) {
                                try {
                                    return i.call(null, t)
                                } catch (e) {
                                    return i.call(this, t)
                                }
                            }
                        }(t)
                }
            }

            function p(t, e) {
                this.fun = t, this.array = e
            }

            function g() {}
            o.nextTick = function (t) {
                var e = new Array(arguments.length - 1);
                if (arguments.length > 1)
                    for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
                c.push(new p(t, e)), 1 !== c.length || u || a(h)
            }, p.prototype.run = function () {
                this.fun.apply(null, this.array)
            }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = g, o.addListener = g, o.once = g, o.off = g, o.removeListener = g, o.removeAllListeners = g, o.emit = g, o.prependListener = g, o.prependOnceListener = g, o.listeners = function (t) {
                return []
            }, o.binding = function (t) {
                throw new Error("process.binding is not supported")
            }, o.cwd = function () {
                return "/"
            }, o.chdir = function (t) {
                throw new Error("process.chdir is not supported")
            }, o.umask = function () {
                return 0
            }
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            e.default = {
                apply: "apply",
                reject: "reject"
            }
        }, function (t, e, n) {}, function (t, e, n) {
            "use strict";
            var i = this && this.__extends || function () {
                var t = function (e, n) {
                    return (t = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function (t, e) {
                            t.__proto__ = e
                        } || function (t, e) {
                            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                        })(e, n)
                };
                return function (e, n) {
                    function i() {
                        this.constructor = e
                    }
                    t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
                }
            }();
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = n(52),
                r = n(0),
                s = n(7),
                a = n(3),
                l = n(8),
                c = n(11),
                u = n(37),
                d = n(70),
                f = n(20),
                h = n(22),
                p = n(100),
                g = n(101),
                v = n(102),
                _ = n(103),
                m = n(15),
                y = n(104),
                w = n(105),
                x = n(16),
                b = n(1),
                C = n(41),
                k = n(23),
                S = n(106),
                I = n(6),
                O = n(109),
                E = n(4),
                A = n(2),
                M = n(111),
                D = n(112),
                T = n(113),
                P = function (t) {
                    function e(e, n) {
                        var i = t.call(this, e, n) || this;
                        i.container = null === e ? e : a.toNode(e), i._sizes = {
                            rowsCount: 1e3,
                            colsCount: 200
                        }, i.config = b.extendConfig({
                            rowsCount: {
                                validate: function (t) {
                                    return t >= 0
                                },
                                default: 1e3
                            },
                            colsCount: {
                                validate: function (t) {
                                    return t >= 0
                                },
                                default: 25
                            },
                            menu: {
                                validate: function (t) {
                                    return "boolean" == typeof t
                                },
                                default: !1
                            },
                            editLine: {
                                validate: function (t) {
                                    return "boolean" == typeof t
                                },
                                default: !0
                            },
                            readonly: {
                                validate: function (t) {
                                    return "boolean" == typeof t
                                },
                                default: !1
                            },
                            autoFormat: {
                                validate: function (t) {
                                    return "boolean" == typeof t
                                },
                                default: !0
                            },
                            importModulePath: {
                                validate: function (t) {
                                    return "string" == typeof t
                                },
                                default: "https://cdn.dhtmlx.com/libs/excel2json/1.0/worker.js"
                            },
                            exportModulePath: {
                                validate: function (t) {
                                    return "string" == typeof t
                                },
                                default: "https://cdn.dhtmlx.com/libs/json2excel/1.0/worker.js"
                            },
                            formats: {
                                validate: function (t) {
                                    return t instanceof Array
                                },
                                default: []
                            }
                        }, i.config), i.events = new s.EventSystem, x.initFormat(i), i._initLayout(), i._colorPicker = new o.Colorpicker, i._setEventsHandlers(), i._actionsManager = new h.ActionsManager({
                            spreadsheet: i,
                            editLine: i._editLine,
                            grid: i._grid
                        }), i._buffer = new y.BufferManager(i, i._grid, i._callAction), i.selection = new O.Selection(i, i._grid, i._buffer);
                        var r = i._grid.getRootView();
                        return r.hooks = r.hooks || {}, r.hooks.didMount = function (t) {
                            i.config.readonly || t.node.el.addEventListener("contextmenu", function (t) {
                                i.contextMenu.data.update("lock", {
                                    value: i.isLocked(i.selection.getSelectedCell()) ? I.default.unlockCell : I.default.lockCell
                                }), i.contextMenu.showAt(t), t.preventDefault()
                            }), i.container = i._layout.getRootView().node.el, S.initHotkeys(i, i._grid, i._buffer), r.hooks.didRedraw = function (t) {
                                i.events.fire(E.SpreadsheetEvents.gridRedraw, [t])
                            }
                        }, i._generateGridStruct(), i.selection.setSelectedCell("A1"), i.export = new M.Exporter(i, i._grid), i
                    }
                    return i(e, t), e.prototype.destructor = function () {
                        this._layout.getRootView().unmount(), this.contextMenu.destructor(), this.menu.destructor(), this.toolbar.destructor()
                    }, e.prototype.paint = function () {
                        this.config.rowsCount === this._sizes.rowsCount && this.config.colsCount === this._sizes.colsCount || this._generateGridStruct(), this._layout.paint(), this._grid.paint()
                    }, e.prototype.load = function (t, e) {
                        var n = this;
                        if ("xlsx" === e) {
                            if (!b.isWasmSupported()) throw new Error("WebAssembly is not supported by your browser");
                            return this._xlsxProxy = this._xlsxProxy || new T.XlsxProxy(this), this._xlsxProxy.load(t).then(function (t) {
                                n.parse(t, e)
                            })
                        }
                        return c.toProxy(t).load().then(function (t) {
                            n.parse(t, e)
                        })
                    }, e.prototype.parse = function (t, e) {
                        var n;
                        if ("csv" === e && (e = new w.CustomCsvDriver), "xlsx" === e && (e = new D.XlsxDriver), t = c.toDataDriver(e || "json").toJsonArray(t, this, this._grid), this._grid.data.map(function (t) {
                                for (var e in t) "id" !== e && "$index" !== e && (t[e] = "")
                            }), this._grid.config.columns.map(function (t) {
                                t.$cellCss = {}
                            }), "styles" in t) {
                            var i = t.styles;
                            for (var o in i) {
                                var r = i[o];
                                dhx.css.add(r, o)
                            }
                            t = t.data, dhx.css.update()
                        }
                        this._updateGridSizes(t);
                        for (var s = 0, a = t; s < a.length; s++) {
                            var l = a[s],
                                u = b.getCellIds(this._grid, l.cell),
                                d = x.getCleanValue(l.value),
                                f = void 0,
                                h = void 0;
                            x.isNumeric(d) ? (h = l.format || (this.config.autoFormat ? x.detectCellFormat(l.value) : ""), f = this.config.autoFormat && h.indexOf("%") > -1 ? (parseFloat(d) / 100).toFixed(4) : d) : f = l.value, this._grid.data.update(u.row, ((n = {})[u.col] = f, n), !0), l.css && (this._grid.addCellCss(u.row, u.col, l.css), b.updateCellInfo(this._grid, l.cell.toUpperCase(), {
                                css: l.css
                            })), b.updateCellInfo(this._grid, l.cell.toUpperCase(), {
                                format: h
                            })
                        }
                        this._grid.data.events.fire(c.DataEvents.change), this.selection.setSelectedCell("A1")
                    }, e.prototype.serialize = function () {
                        var t = this,
                            e = [],
                            n = {};
                        this._grid.data.map(function (i) {
                            for (var o in i)
                                if ("id" !== o && "$index" !== o) {
                                    var r = b.getCellNameById(t._grid, i.id, o),
                                        s = i[o],
                                        a = {
                                            cell: r
                                        };
                                    if (i.$info && i.$info[o] && i.$info[o].css && (a.css = i.$info[o].css, n[a.css] = dhx.css.get(a.css)), i.$info && i.$info[o] && void 0 !== i.$info[o].format) {
                                        var l = x.getFormat(x.getDefaultFormatsMap()[i.$info[o].format]);
                                        a.format = l && l.id || i.$info[o].format
                                    }
                                    s && (a.value = s), r && (a.value || a.css) && e.push(a)
                                }
                        });
                        var i = this._grid.config.columns.reduce(function (t, e, n) {
                            return 0 !== n && 120 !== e.width && (t[n] = {
                                width: e.width
                            }), t
                        }, {});
                        return Object.keys(n).length > 0 ? {
                            data: e,
                            styles: n,
                            columns: i,
                            formats: this.config.formats
                        } : e
                    }, e.prototype.setValue = function (t, e) {
                        if (t && (this._checkForMissedCells(t), this.events.fire(E.SpreadsheetEvents.beforeValueChange, [t, e]))) {
                            var n = b.getCellIds(this._grid, t);
                            this._callAction({
                                row: n.row,
                                col: n.col,
                                cell: t,
                                val: e,
                                action: E.Actions.setCellValue,
                                groupAction: E.Actions.groupAction
                            }), this._grid.paint(), this.events.fire(E.SpreadsheetEvents.afterValueChange, [t, e])
                        }
                    }, e.prototype.getValue = function (t) {
                        if (t) {
                            if (t = t.toUpperCase(), b.isRangeId(t)) {
                                var e = [];
                                return this.eachCell(function (t, n) {
                                    e.push(n)
                                }, t), e
                            }
                            var n = b.getCellIds(this._grid, t),
                                i = this._grid.data.getItem(n.row);
                            return i ? i[n.col] : void 0
                        }
                    }, e.prototype.eachCell = function (t, e) {
                        e = e || this.selection.getSelectedCell();
                        for (var n = 0, i = b.getCellsArray(e); n < i.length; n++) {
                            var o = i[n],
                                r = b.getCellIds(this._grid, o),
                                s = r.row,
                                a = r.col,
                                l = this._grid.data.getItem(s),
                                c = l ? l[a] : null;
                            void 0 !== c && t(o, c)
                        }
                    }, e.prototype.getStyle = function (t) {
                        var e = this;
                        if (t) {
                            if (b.isRangeId(t)) {
                                var n = [];
                                return this.eachCell(function (t) {
                                    n.push(e.getStyle(t) || {})
                                }, t), n
                            }
                            var i = b.getCellInfo(this._grid, t);
                            return dhx.css.get(i.css)
                        }
                    }, e.prototype.setStyle = function (t, e) {
                        if (t && e && this.events.fire(E.SpreadsheetEvents.beforeStyleChange, [t, e])) {
                            var n = b.getCellIds(this._grid, t),
                                i = n.row,
                                o = n.col;
                            Object.keys(e).length ? this._callAction({
                                val: e,
                                row: i,
                                col: o,
                                cell: t,
                                action: E.Actions.setCellStyle,
                                groupAction: E.Actions.groupAction
                            }) : this._callAction({
                                row: i,
                                col: o,
                                cell: t,
                                action: E.Actions.removeCellStyles,
                                groupAction: E.Actions.groupAction
                            })
                        }
                    }, e.prototype.getFormat = function (t) {
                        var e = this;
                        if (b.isRangeId(t)) {
                            var n = [];
                            return this.eachCell(function (t) {
                                n.push(b.getCellInfo(e._grid, t).format || "")
                            }, t), n
                        }
                        var i = b.getCellInfo(this._grid, t).format;
                        return x.getDefaultFormatsMap()[i] || i
                    }, e.prototype.setFormat = function (t, e) {
                        this._callAction({
                            val: e,
                            cell: t,
                            action: E.Actions.setCellFormat,
                            groupAction: E.Actions.groupAction
                        })
                    }, e.prototype.isLocked = function (t) {
                        var e = this;
                        if ("start" in b.getCellIds(this._grid, t)) {
                            var n = !1;
                            return this.eachCell(function (t) {
                                if (!n) {
                                    var i = b.getCellInfo(e._grid, t).locked;
                                    n = i
                                }
                            }, t), n
                        }
                        return !!b.getCellInfo(this._grid, t).locked
                    }, e.prototype.lock = function (t) {
                        var e = b.getCellIds(this._grid, t);
                        this._callAction({
                            row: e.row,
                            col: e.col,
                            val: !0,
                            cell: t,
                            action: E.Actions.lockCell,
                            groupAction: E.Actions.groupAction
                        }), this._grid.paint()
                    }, e.prototype.unlock = function (t) {
                        var e = b.getCellIds(this._grid, t);
                        this._callAction({
                            row: e.row,
                            col: e.col,
                            val: !1,
                            cell: t,
                            action: E.Actions.lockCell,
                            groupAction: E.Actions.groupAction
                        }), this._grid.paint()
                    }, e.prototype.addRow = function (t) {
                        this.events.fire(E.SpreadsheetEvents.beforeRowAdd, [t]) && (this._callAction({
                            cell: t,
                            action: E.Actions.addRow,
                            groupAction: E.Actions.groupRowAction
                        }), this.events.fire(E.SpreadsheetEvents.afterRowAdd, [t]))
                    }, e.prototype.deleteRow = function (t) {
                        if (this.events.fire(E.SpreadsheetEvents.beforeRowDelete, [t])) {
                            var e = b.getCellIds(this._grid, t);
                            this._callAction({
                                row: e.row,
                                col: e.col,
                                cell: t,
                                action: E.Actions.deleteRow,
                                groupAction: E.Actions.groupRowAction
                            }), this.events.fire(E.SpreadsheetEvents.afterRowDelete, [t])
                        }
                    }, e.prototype.addColumn = function (t) {
                        this.events.fire(E.SpreadsheetEvents.beforeColumnAdd, [t]) && (this._callAction({
                            cell: t,
                            action: E.Actions.addColumn,
                            groupAction: E.Actions.groupColAction
                        }), this.events.fire(E.SpreadsheetEvents.afterColumnAdd, [t]))
                    }, e.prototype.deleteColumn = function (t) {
                        this.events.fire(E.SpreadsheetEvents.beforeColumnDelete, [t]) && (this._callAction({
                            cell: t,
                            action: E.Actions.deleteColumn,
                            groupAction: E.Actions.groupColAction
                        }), this.events.fire(E.SpreadsheetEvents.afterColumnDelete, [t]))
                    }, e.prototype.undo = function () {
                        this._actionsManager.undo()
                    }, e.prototype.redo = function () {
                        this._actionsManager.redo()
                    }, e.prototype.startEdit = function (t, e) {
                        if (!this.config.readonly) {
                            var n = this.selection.getFocusedCell();
                            if (t || (t = n), t = t.toUpperCase(), this._checkForMissedCells(t), this.events.fire(E.SpreadsheetEvents.beforeEditStart, [t, e]))
                                if (!this.isLocked(t)) n !== t && (this.endEdit(!0), this.selection.setSelectedCell(t)), b.getCellInfo(this._grid, t).edited || (b.updateCellInfo(this._grid, t, {
                                    edited: !0,
                                    nextValue: e
                                }), this.events.fire(E.SpreadsheetEvents.afterEditStart, [t, e]))
                        }
                    }, e.prototype.endEdit = function (t) {
                        var e = this.selection.getFocusedCell(),
                            n = b.getCellInfo(this._grid, e);
                        if (n.edited) {
                            if (!this.events.fire(E.SpreadsheetEvents.beforeEditEnd, [e, n.nextValue])) return;
                            t || void 0 === n.nextValue || this.setValue(e, n.nextValue), n.edited = !1, n.nextValue = void 0, this._editLine.setValue(this.getValue(e)), this._editLine.blur(), this.events.fire(E.SpreadsheetEvents.afterEditEnd, [e, n.nextValue])
                        }
                    }, e.prototype._callAction = function (t) {
                        t && !this.config.readonly && (Array.isArray(t) ? this._actionsManager.execute(t) : b.isRangeId(t.cell) ? this._actionsManager.execute(t.groupAction, t) : this._actionsManager.execute(t.action, t))
                    }, e.prototype._initLayout = function () {
                        this._grid = new u.Grid(null, {
                            rowHeight: 32,
                            width: 100,
                            height: 100,
                            headerRowHeight: 32,
                            disableHeaderSort: !0,
                            splitAt: 1
                        }), this.menu = new f.Menu(null, {
                            navigationType: "click"
                        }), this.menu.data.parse(g.getMenuStruct(this.config)), this.toolbar = new f.Toolbar;
                        var t = v.getToolbarStruct(this.config.toolbarBlocks, this.config);
                        this.toolbar.data.parse(t), this.contextMenu = new f.ContextMenu, this.contextMenu.data.parse(p.getContextMenuStruct()), this._editLine = new _.EditLine(null, {
                            events: this.events
                        });
                        var e = this._layout = new d.Layout(this.container, {
                            height: "100%",
                            rows: [{
                                id: "menu",
                                css: "menu_wrapper"
                            }, {
                                id: "toolbar",
                                css: "toolbar_wrapper"
                            }, {
                                id: "editLine",
                                css: "editLine_wrapper"
                            }, {
                                id: "grid",
                                css: "dhx-spreadsheet-grid"
                            }],
                            css: "dhx-spreadsheet"
                        });
                        e.cell("menu").attach(this.menu, this), e.cell("toolbar").attach(this.toolbar, this), e.cell("grid").attach(this._grid, this), e.cell("editLine").attach(this._editLine, this), this.config.editLine && !this.config.readonly || e.cell("editLine").hide(), this.config.menu && !this.config.readonly || e.cell("menu").hide(), !this.config.readonly && t && t.length || e.cell("toolbar").hide(), this.mount(null, this._layout.getRootView())
                    }, e.prototype._generateGridStruct = function () {
                        var t = this,
                            e = this.serialize(),
                            n = this.config,
                            i = n.rowsCount,
                            o = n.colsCount;
                        (i > 7e4 || o > 200) && (this.config.rowsCount = Math.min(this.config.rowsCount, 7e4), this.config.colsCount = Math.min(this.config.colsCount, 200));
                        for (var s = [], a = 1; a <= i; a++) {
                            for (var l = {
                                    id: "" + a,
                                    $index: a
                                }, c = 1; c <= o; c++) l[c] = "";
                            s.push(l)
                        }
                        var u, d = [{
                                id: "$index",
                                width: 40,
                                header: [{
                                    text: ""
                                }],
                                template: function (e, n) {
                                    return t._grid.data.getIndex(n.id) + 1
                                }
                            }],
                            f = !1,
                            h = function (e) {
                                requestAnimationFrame(function () {
                                    f && t._restoreFocus(e)
                                })
                            },
                            p = function (e) {
                                var n = e.el;
                                n.focus(), n.setSelectionRange(n.value.length, n.value.length), n.addEventListener("blur", h), t._editLine.setValue(n.value), f = !0
                            },
                            g = function () {
                                f = !1, document.removeEventListener("blur", h)
                            },
                            v = function (e, n) {
                                f && t.events.fire(E.SpreadsheetEvents.cellInput, [e, n.target.value])
                            };
                        this.events.on(E.SpreadsheetEvents.gridRedraw, function () {
                            u = null
                        });
                        var _ = function (e, n, i) {
                            u || (u = t.selection.getFocusedCell());
                            var o = function (t) {
                                    return n.$info && n.$info[i.id] && n.$info[i.id][t]
                                },
                                s = o("locked"),
                                a = o("edited"),
                                l = o("nextValue"),
                                c = o("css"),
                                d = dhx.css.get(c),
                                f = o("format") || "",
                                h = i.$letter + n.$index,
                                _ = void 0 === l || null === l ? e : l;
                            if (u && a) return r.el("input.dhx_cell_input", {
                                oninput: [v, h],
                                _hooks: {
                                    didInsert: p,
                                    didRemove: g
                                },
                                class: c,
                                _key: "selection_input",
                                dhx_id: "cell_input",
                                value: _
                            });
                            var m = f ? x.getFormattedValue(_, f) : _,
                                y = d && "right" === d["text-align"] ? "right" : "none";
                            return r.el(".dhx_spreadsheet_cell.dhx_noselect", {
                                style: {
                                    float: y
                                }
                            }, [s && r.el(".dhx_lock_icon.dxi.dxi-key"), m])
                        };
                        for (a = 1; a <= o; a++) {
                            var y = b.getLetterFromNumber(a);
                            d.push({
                                id: "" + a,
                                width: 120,
                                $letter: y,
                                header: [{
                                    text: m.getHeaderCell(y, a)
                                }],
                                template: _
                            })
                        }
                        this._grid.setHeader(d), this._grid.data.parse(s), this.parse(e), this._sizes.rowsCount = this.config.rowsCount, this._sizes.colsCount = this.config.colsCount
                    }, e.prototype._checkForMissedCells = function (t) {
                        var e = b.isRangeId(t) ? b.getRangeIndexes(t).end : b.getCellIndex(t);
                        (e.row > this.config.rowsCount || e.col > this.config.colsCount) && (this.config.rowsCount = Math.max(this.config.rowsCount, e.row + 1), this.config.colsCount = Math.max(this.config.colsCount, e.col), this._generateGridStruct())
                    }, e.prototype._updateGridSizes = function (t) {
                        var e = t.reduce(function (t, e) {
                            var n = b.getCellIndex(e.cell);
                            return t.row = Math.max(t.row, n.row + 1), t.col = Math.max(t.col, n.col), t
                        }, {
                            row: this.config.rowsCount,
                            col: this.config.colsCount
                        });
                        (e.row > this.config.rowsCount || e.col > this.config.colsCount) && (this.config.rowsCount = Math.max(e.row + 1, this.config.rowsCount), this.config.colsCount = Math.max(e.col + 1, this.config.colsCount), this._generateGridStruct())
                    }, e.prototype._updateToolbar = function (t) {
                        if (t === this.selection.getFocusedCell()) {
                            var e = b.getCellInfo(this._grid, t);
                            k.updateToolbar(this.toolbar, e)
                        }
                    }, e.prototype._setEventsHandlers = function () {
                        var t = this;
                        this.events.on(E.SpreadsheetEvents.editLineInput, function (e) {
                            var n = t.selection.getFocusedCell();
                            t.events.fire(E.SpreadsheetEvents.cellInput, [n, e])
                        }), this.events.on(E.SpreadsheetEvents.editLineFocus, function () {
                            var e = t.selection.getFocusedCell();
                            t.startEdit(e), requestAnimationFrame(function () {
                                t._editLine.focus()
                            })
                        }), this.events.on(E.SpreadsheetEvents.cellInput, function (e, n) {
                            t.isLocked(e) || (b.updateCellInfo(t._grid, e, {
                                nextValue: n
                            }), t._grid.paint())
                        }), this._grid.events.on(u.GridEvents.cellMouseDown, function () {
                            t.contextMenu._close()
                        }), this.events.on(E.SpreadsheetEvents.beforeSelectionSet, function () {
                            if (t.config.readonly) return !1;
                            t.endEdit()
                        }), this.events.on(E.SpreadsheetEvents.afterSelectionSet, function () {
                            t._grid.paint()
                        }), this.events.on(E.SpreadsheetEvents.afterFocusSet, function (e) {
                            var n = t.getValue(e),
                                i = b.getCellInfo(t._grid, e);
                            k.updateToolbar(t.toolbar, i), t._editLine.setValue(n), i.locked && t._editLine.lock(), t._grid.paint()
                        }), this.events.on(E.SpreadsheetEvents.afterStyleChange, function (e) {
                            t._updateToolbar(e)
                        }), this.events.on(E.SpreadsheetEvents.afterFormatChange, function (e) {
                            t._updateToolbar(e)
                        }), this.events.on(E.SpreadsheetEvents.afterEditStart, function () {
                            t._grid.paint()
                        }), this.events.on(E.SpreadsheetEvents.afterEditEnd, function () {
                            t._grid.paint()
                        }), this.toolbar.events.on(f.ToolbarEvents.click, function (e, n) {
                            t._handleAction(e, n)
                        }), this.contextMenu.events.on(f.ToolbarEvents.click, function (e, n) {
                            t._handleAction(e, n)
                        }), this.menu.events.on(f.ToolbarEvents.click, function (e, n) {
                            t._handleAction(e, n)
                        }), this._colorPicker.events.on(o.ColorpickerEvents.colorChange, function (e) {
                            var n, i = t.selection.getSelectedCell();
                            t.setStyle(i, ((n = {})[t._colorpickerTarget] = e, n)), requestAnimationFrame(function () {
                                t._colorpickerTarget = null, S.focusHandler.setFocusState(!0), t._activeInput && (t._activeInput.focus(), t._activeInput = null)
                            })
                        }), this.events.on(E.SpreadsheetEvents.editLineBlur, function (e, n) {
                            t._restoreFocus(n)
                        }), this.events.on(E.SpreadsheetEvents.groupFill, function (e, n) {
                            t._fillCells(e, n)
                        })
                    }, e.prototype._handleAction = function (t, e) {
                        var n, i = this.selection.getSelectedCell();
                        requestAnimationFrame(function () {
                            S.focusHandler.setFocusState(!0)
                        });
                        var o = "";
                        switch (-1 !== A.findIndex(this.config.formats, function (e) {
                            return e.id === t
                        }) && (o = t, t = "format"), t) {
                            case "undo":
                                this._actionsManager.undo();
                                break;
                            case "redo":
                                this._actionsManager.redo();
                                break;
                            case "color":
                            case "background":
                                this._colorpickerTarget = t;
                                var r = b.getCellInfo(this._grid, i),
                                    s = (dhx.css.get(r.css) || {})[t] || {
                                        background: "#FFFFFF",
                                        color: "#4C4C4C"
                                    } [t];
                                this._colorPicker.setValue(s);
                                var l = a.locateNode(e, "dhx_id");
                                this._colorPicker.show(l);
                                break;
                            case "align-left":
                            case "align-right":
                            case "align-center":
                            case "align-justify":
                                var c = t.split("-")[1];
                                this.setStyle(i, {
                                    "text-align": c
                                });
                                break;
                            case "font-weight-bold":
                            case "font-style-italic":
                            case "text-decoration-underline":
                                var u = t.split("-"),
                                    d = u.pop(),
                                    f = u.join("-");
                                d = k.getToggledValue(this._grid, i, f, d), this.setStyle(i, ((n = {})[f] = d, n));
                                break;
                            case "clear-value":
                                this.setValue(i, "");
                                break;
                            case "clear-styles":
                                this.setStyle(i, {});
                                break;
                            case "clear-all":
                                this._callAction([{
                                    cell: i,
                                    action: E.Actions.setCellStyle,
                                    groupAction: b.isRangeId(i) ? E.Actions.groupAction : null,
                                    val: ""
                                }, {
                                    cell: i,
                                    action: E.Actions.setCellValue,
                                    groupAction: b.isRangeId(i) ? E.Actions.groupAction : null,
                                    val: ""
                                }]);
                                break;
                            case "lock":
                                if (this.isLocked(i)) return void this.unlock(i);
                                this.lock(i);
                                break;
                            case "remove-row":
                                this.deleteRow(i);
                                break;
                            case "add-row":
                                this.addRow(i);
                                break;
                            case "remove-col":
                                this.deleteColumn(i);
                                break;
                            case "add-col":
                                this.addColumn(i);
                                break;
                            case "help":
                                window.open("https://dhtmlx-docs.gitbook.io/spreadsheet-user-guide/");
                                break;
                            case "format":
                                this.setFormat(i, o), this.paint();
                                break;
                            case "export-xlsx":
                                this.export.xlsx();
                                break;
                            case "import-xlsx":
                                this.load("", "xlsx")
                        }
                    }, e.prototype._fillCells = function (t, e) {
                        var n = this,
                            i = [t],
                            o = [e];
                        if (b.isRangeId(t)) {
                            var r = C.getCellsDiff(t.split(":")[1], e.split(":")[1]).isLargerByX ? "row" : "col";
                            i = b.getRangeMatrix(t, r).map(function (t) {
                                return t.length > 1 ? t[0] + ":" + t[t.length - 1] : t[0]
                            }), o = b.getRangeMatrix(e, r).map(function (t) {
                                return t.length > 1 ? t[0] + ":" + t[t.length - 1] : t[0]
                            })
                        }
                        var s = i.reduce(function (t, e, i) {
                            var r = n.getValue(e),
                                s = o[i];
                            if (Array.isArray(r)) {
                                if (e === s) return t;
                                var a = C.getAutoFilledCells(r, e, s);
                                s = a.cells, r = a.value
                            }
                            var l = n.getStyle(e),
                                c = n.getFormat(e);
                            return t.push({
                                cell: s,
                                action: E.Actions.setCellFormat,
                                groupAction: b.isRangeId(s) ? E.Actions.groupAction : null,
                                val: c
                            }, {
                                cell: s,
                                action: E.Actions.setCellStyle,
                                groupAction: b.isRangeId(s) ? E.Actions.groupAction : null,
                                val: l
                            }, {
                                cell: s,
                                action: E.Actions.setCellValue,
                                groupAction: b.isRangeId(s) ? E.Actions.groupAction : null,
                                val: r
                            }), t
                        }, []);
                        this._callAction(s), this.selection.setSelectedCell(e)
                    }, e.prototype._restoreFocus = function (t) {
                        var e = this._editLine.getRootView().node.el,
                            n = this.selection.getFocusedCell();
                        if (!n || b.getCellInfo(this._grid, n).edited) {
                            if (!S.focusHandler.getFocusState()) return this._colorpickerTarget ? void(this._activeInput = t.target) : void this.endEdit();
                            var i = t.target,
                                o = t.relatedTarget;
                            if (!(e.contains(o) || e.contains(i) && o && "cell_input" === o.getAttribute("dhx_id"))) {
                                var r = i;
                                r.focus(), setTimeout(function () {
                                    r.setSelectionRange(r.value.length, r.value.length)
                                }, 100)
                            }
                        }
                    }, e
                }(l.View);
            e.Spreadsheet = P
        }, function (t, e, n) {
            "use strict";

            function i(t) {
                for (var n in t) e.hasOwnProperty(n) || (e[n] = t[n])
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), i(n(53)), i(n(32))
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__extends || function () {
                    var t = function (e, n) {
                        return (t = Object.setPrototypeOf || {
                                __proto__: []
                            }
                            instanceof Array && function (t, e) {
                                t.__proto__ = e
                            } || function (t, e) {
                                for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                            })(e, n)
                    };
                    return function (e, n) {
                        function i() {
                            this.constructor = e
                        }
                        t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
                    }
                }(),
                o = this && this.__spreadArrays || function () {
                    for (var t = 0, e = 0, n = arguments.length; e < n; e++) t += arguments[e].length;
                    var i = Array(t),
                        o = 0;
                    for (e = 0; e < n; e++)
                        for (var r = arguments[e], s = 0, a = r.length; s < a; s++, o++) i[o] = r[s];
                    return i
                };
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var r = n(0),
                s = n(7),
                a = n(3),
                l = n(8),
                c = n(55),
                u = n(57),
                d = n(58),
                f = n(32),
                h = function (t) {
                    function e(e) {
                        void 0 === e && (e = {
                            css: ""
                        });
                        var n = t.call(this, null, e) || this;
                        n._handleGripMove = function (t) {
                            var e = n.getRootView().refs.picker_palette.el.getBoundingClientRect(),
                                i = t.clientY - e.top,
                                o = t.clientX - e.left;
                            n._calculatePaletteGrip(i, o), n.paint()
                        }, n._handleRangeMove = function (t) {
                            var e = n.getRootView().refs.hue_range.el.getBoundingClientRect(),
                                i = t.clientX - e.left - 3;
                            n._calculateRangeGrip(i), n.paint()
                        }, n._popup = new c.Popup({
                            css: " dhx_colorpicker_popup " + n.config.css
                        }), n.events = new s.EventSystem(n), n._pickerState = {
                            hsv: {
                                h: 0,
                                s: 1,
                                v: 1
                            },
                            currentView: "palette",
                            customColors: [],
                            customHex: ""
                        }, n._handlers = {
                            click: {
                                ".dhx_palette_cell": n._onColorClick.bind(n)
                            },
                            mousedown: function (t) {
                                var e = a.locate(t);
                                n._pickerState.customHex = "";
                                var i = n.getRootView().refs[e].el.getBoundingClientRect();
                                "picker_palette" === e ? n._calculatePaletteGrip(t.clientY - i.top, t.clientX - i.left) : n._calculateRangeGrip(t.clientX - i.left);
                                var o = "picker_palette" === e ? n._handleGripMove : n._handleRangeMove;
                                document.addEventListener("mousemove", o), document.addEventListener("mouseup", function () {
                                    document.removeEventListener("mousemove", o)
                                }), n.paint()
                            },
                            buttonsClick: function (t) {
                                n._pickerState.currentView = "palette", n.paint(), "cancel" !== t && ("apply" === t && -1 === n._pickerState.customColors.indexOf(n._pickerState.background) && n._pickerState.customColors.push(n._pickerState.background), n._selected = n._pickerState.background, n.events.fire(f.ColorpickerEvents.colorChange, [n._selected]), setTimeout(function () {
                                    n._popup.hide()
                                }, 1))
                            },
                            customColorClick: function () {
                                n._pickerState.currentView = "picker", n.paint()
                            },
                            oninput: function (t) {
                                n._inputTimeout && clearTimeout(n._inputTimeout), n._inputTimeout = setTimeout(function () {
                                    var e = t.target.value; - 1 === e.indexOf("#") && (e = "#" + e), n._pickerState.customHex = e, u.isHex(e) && (n._pickerState.hsv = u.HexToHSV(e), n.paint())
                                }, 100)
                            },
                            contextmenu: {
                                ".dhx_palette_cell": function (t, e) {
                                    t.preventDefault();
                                    var i = n._pickerState.customColors.indexOf(e.data.color); - 1 !== i && n._pickerState.customColors.splice(i, 1), n.paint()
                                }
                            }
                        };
                        var i = r.create({
                            render: function () {
                                return n._getContent()
                            }
                        });
                        return n.mount(n._popup, i), n
                    }
                    return i(e, t), e.prototype.setValue = function (t) {
                        this._selected = t || null
                    }, e.prototype.show = function (t, e) {
                        void 0 === e && (e = "bottom"), this._popup.show(a.toNode(t), {
                            mode: e,
                            centering: !0
                        })
                    }, e.prototype.hide = function () {
                        this._popup.hide()
                    }, e.prototype._calculatePaletteGrip = function (t, e) {
                        var n = this.getRootView().refs.picker_palette.el.getBoundingClientRect(),
                            i = n.height,
                            o = n.width;
                        t = t < 0 ? 0 : t > i ? i : t, e = e < 0 ? 0 : e > o ? o : e;
                        var r = Math.round(e / (o / 100)),
                            s = 100 - Math.round(t / (i / 100));
                        this._pickerState.hsv.s = r / 100, this._pickerState.hsv.v = s / 100
                    }, e.prototype._calculateRangeGrip = function (t) {
                        var e = this.getRootView().refs.hue_range.el.getBoundingClientRect().width;
                        t = t < 0 ? 0 : t > e ? e : t, this._pickerState.rangeLeft = t, this._pickerState.hsv.h = Math.round(t / e * 360)
                    }, e.prototype._getCells = function (t, e) {
                        var n = this;
                        return void 0 === e && (e = ""), t.reduce(function (t, i) {
                            var o = n._selected === i ? "dhx_selected" : "";
                            return t.push(r.el(".dhx_palette_cell", {
                                class: o + " " + e,
                                _data: {
                                    color: i
                                },
                                style: "background:" + i
                            })), t
                        }, [])
                    }, e.prototype._onColorClick = function (t, e) {
                        this._selected = e.data.color, this.events.fire(f.ColorpickerEvents.colorChange, [this._selected]), this._popup.hide()
                    }, e.prototype._getGrayShades = function () {
                        return r.el(".dhx_palette_row", this._getCells(d.grayShades))
                    }, e.prototype._getPalette = function () {
                        var t = this;
                        return d.palette.reduce(function (e, n) {
                            return e.push(r.el(".dhx_palette_col", t._getCells(n.colors))), e
                        }, [])
                    }, e.prototype._getPicker = function () {
                        var t = u.HSVtoRGB(this._pickerState.hsv);
                        this._pickerState.background = u.RGBToHex(t);
                        var e = u.RGBToHex(u.HSVtoRGB({
                                h: this._pickerState.hsv.h,
                                s: 1,
                                v: 1
                            })),
                            n = this.getRootView(),
                            i = n.refs ? n.refs.picker_palette.el.getBoundingClientRect() : {
                                height: 200,
                                width: 218,
                                x: 0,
                                y: 0
                            },
                            o = i.height - 2,
                            s = i.width - 2,
                            a = o - this._pickerState.hsv.v * o - 4,
                            l = this._pickerState.hsv.s * s - 4,
                            c = i.width - 6,
                            d = c - (360 - this._pickerState.hsv.h) / 360 * c,
                            f = this._pickerState.customHex ? this._pickerState.customHex.replace("#", "") : this._pickerState.background.replace("#", "");
                        return r.el(".picker_wrap", {}, [r.el(".dhx_picker_palette", {
                            style: {
                                height: 132,
                                background: e
                            },
                            onmousedown: this._handlers.mousedown,
                            dhx_id: "picker_palette",
                            _ref: "picker_palette"
                        }, [r.el(".dhx_palette_grip", {
                            style: {
                                top: a,
                                left: l
                            }
                        })]), r.el(".dhx_hue_range", {
                            style: {
                                height: 16
                            },
                            onmousedown: this._handlers.mousedown,
                            dhx_id: "hue_range",
                            _key: "hue_range",
                            _ref: "hue_range"
                        }, [r.el(".dhx_range_grip", {
                            style: {
                                left: d
                            }
                        })]), r.el(".dhx_color_value", [r.el(".dhx_current_color", {
                            style: {
                                background: this._pickerState.background
                            }
                        }), r.el(".dhx_hex_input_wrap", [r.el("input", {
                            class: "dhx_hex_input",
                            value: f,
                            oninput: this._handlers.oninput,
                            maxlength: "7",
                            _key: "hex_input"
                        })])]), r.el(".dhx_picker_buttons", [r.el("button", {
                            class: "dhx_btn dhx_btn--link dhx_cancel",
                            onclick: [this._handlers.buttonsClick, "cancel"]
                        }, "cancel"), r.el("button", {
                            class: "dhx_btn dhx_btn--flat dhx_apply",
                            onclick: [this._handlers.buttonsClick, "apply"]
                        }, "apply")])])
                    }, e.prototype._getContent = function () {
                        var t = "palette" === this._pickerState.currentView ? o([this._getGrayShades()], this._getPalette(), [r.el(".dhx_custom_colors", [r.el(".dhx_custom_colors_header", ["Custom colors", r.el("span.hint", " (Right click to delete)")]), r.el(".dhx_custom_palette.dhx_palette_row", o(this._getCells(this._pickerState.customColors, "custom_color_cell"), [r.el(".dhx_show_picker", {
                            class: "dxi dxi-plus",
                            onclick: this._handlers.customColorClick
                        })]))])]) : [this._getPicker()];
                        return r.el(".dhx_colorpicker_wrap", [r.el(".dhx_palette", {
                            onclick: this._handlers.click,
                            oncontextmenu: this._handlers.contextmenu
                        }, t)])
                    }, e
                }(l.View);
            e.Colorpicker = h
        }, function (t, e, n) {
            /**
             * Copyright (c) 2017, Leon Sorokin
             * All rights reserved. (MIT Licensed)
             *
             * domvm.js (DOM ViewModel)
             * A thin, fast, dependency-free vdom view layer
             * @preserve https://github.com/leeoniya/domvm (v3.2.6, micro build)
             */
            t.exports = function () {
                "use strict";
                var t = 1,
                    e = 2,
                    n = 3,
                    i = 4,
                    o = 5,
                    r = "undefined" != typeof window,
                    s = (r ? window : {}).requestAnimationFrame,
                    a = {};

                function l() {}
                var c = Array.isArray;

                function u(t) {
                    return null != t
                }

                function d(t) {
                    return null != t && t.constructor === Object
                }

                function f(t, e, n, i) {
                    t.splice.apply(t, [n, i].concat(e))
                }

                function h(t) {
                    var e = typeof t;
                    return "string" === e || "number" === e
                }

                function p(t) {
                    return "function" == typeof t
                }

                function g(t) {
                    for (var e = arguments, n = 1; n < e.length; n++)
                        for (var i in e[n]) t[i] = e[n][i];
                    return t
                }

                function v(t, e) {
                    for (var n = [], i = e; i < t.length; i++) n.push(t[i]);
                    return n
                }

                function _(t, e) {
                    for (var n in t)
                        if (t[n] !== e[n]) return !1;
                    return !0
                }

                function m(t, e) {
                    var n = t.length;
                    if (e.length !== n) return !1;
                    for (var i = 0; i < n; i++)
                        if (t[i] !== e[i]) return !1;
                    return !0
                }

                function y(t) {
                    if (!s) return t;
                    var e, n, i;

                    function o() {
                        e = 0, t.apply(n, i)
                    }
                    return function () {
                        n = this, i = arguments, e || (e = s(o))
                    }
                }

                function w(t) {
                    return "o" === t[0] && "n" === t[1]
                }

                function x(t) {
                    return "_" === t[0]
                }

                function b(t) {
                    return "style" === t
                }

                function C(t) {
                    t && t.el && t.el.offsetHeight
                }

                function k(t) {
                    return null != t.node && null != t.node.el
                }

                function S(t, e) {
                    switch (e) {
                        case "value":
                        case "checked":
                        case "selected":
                            return !0
                    }
                    return !1
                }

                function I(t) {
                    for (t = t || a; null == t.vm && t.parent;) t = t.parent;
                    return t.vm
                }

                function O() {}
                var E = O.prototype = {
                    constructor: O,
                    type: null,
                    vm: null,
                    key: null,
                    ref: null,
                    data: null,
                    hooks: null,
                    ns: null,
                    el: null,
                    tag: null,
                    attrs: null,
                    body: null,
                    flags: 0,
                    _class: null,
                    _diff: null,
                    _dead: !1,
                    _lis: !1,
                    idx: null,
                    parent: null
                };

                function A(t) {
                    var n = new O;
                    return n.type = e, n.body = t, n
                }
                var M = {},
                    D = /\[(\w+)(?:=(\w+))?\]/g,
                    T = 1,
                    P = 2,
                    j = 4,
                    R = 8;

                function F(e, n, i, o) {
                    var r = new O;
                    r.type = t, u(o) && (r.flags = o), r.attrs = n;
                    var s = function (t) {
                        var e, n, i, o, r = M[t];
                        if (null == r)
                            for (M[t] = r = {
                                    tag: (e = t.match(/^[-\w]+/)) ? e[0] : "div",
                                    id: (n = t.match(/#([-\w]+)/)) ? n[1] : null,
                                    class: (i = t.match(/\.([-\w.]+)/)) ? i[1].replace(/\./g, " ") : null,
                                    attrs: null
                                }; o = D.exec(t);) null == r.attrs && (r.attrs = {}), r.attrs[o[1]] = o[2] || "";
                        return r
                    }(e);
                    if (r.tag = s.tag, s.id || s.class || s.attrs) {
                        var a = r.attrs || {};
                        if (s.id && !u(a.id) && (a.id = s.id), s.class && (r._class = s.class, a.class = s.class + (u(a.class) ? " " + a.class : "")), s.attrs)
                            for (var l in s.attrs) u(a[l]) || (a[l] = s.attrs[l]);
                        r.attrs = a
                    }
                    var c = r.attrs;
                    return u(c) && (u(c._key) && (r.key = c._key), u(c._ref) && (r.ref = c._ref), u(c._hooks) && (r.hooks = c._hooks), u(c._data) && (r.data = c._data), u(c._flags) && (r.flags = c._flags), u(r.key) || (u(r.ref) ? r.key = r.ref : u(c.id) ? r.key = c.id : u(c.name) && (r.key = c.name + ("radio" === c.type || "checkbox" === c.type ? c.value : "")))), null != i && (r.body = i), r
                }

                function L(t, n, r, s) {
                    if (t.type !== o && t.type !== i) {
                        t.parent = n, t.idx = r, t.vm = s, null != t.ref && function (t, e, n) {
                            var i = ["refs"].concat(e.split("."));
                            ! function (t, e, n) {
                                for (var i; i = e.shift();) 0 === e.length ? t[i] = n : t[i] = t = t[i] || {}
                            }(t, i, n)
                        }(I(t), t.ref, t);
                        var a = t.hooks,
                            l = s && s.hooks;
                        (a && (a.willRemove || a.didRemove) || l && (l.willUnmount || l.didUnmount)) && function (t) {
                            for (; t = t.parent;) t.flags |= T
                        }(t), c(t.body) && function (t) {
                            for (var n = t.body, i = 0; i < n.length; i++) {
                                var o = n[i];
                                !1 === o || null == o ? n.splice(i--, 1) : c(o) ? f(n, o, i--, 1) : (null == o.type && (n[i] = o = A("" + o)), o.type === e ? null == o.body || "" === o.body ? n.splice(i--, 1) : i > 0 && n[i - 1].type === e ? (n[i - 1].body += o.body, n.splice(i--, 1)) : L(o, t, i, null) : L(o, t, i, null))
                            }
                        }(t)
                    }
                }
                var H = {
                    animationIterationCount: !0,
                    boxFlex: !0,
                    boxFlexGroup: !0,
                    boxOrdinalGroup: !0,
                    columnCount: !0,
                    flex: !0,
                    flexGrow: !0,
                    flexPositive: !0,
                    flexShrink: !0,
                    flexNegative: !0,
                    flexOrder: !0,
                    gridRow: !0,
                    gridColumn: !0,
                    order: !0,
                    lineClamp: !0,
                    borderImageOutset: !0,
                    borderImageSlice: !0,
                    borderImageWidth: !0,
                    fontWeight: !0,
                    lineHeight: !0,
                    opacity: !0,
                    orphans: !0,
                    tabSize: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0,
                    fillOpacity: !0,
                    floodOpacity: !0,
                    stopOpacity: !0,
                    strokeDasharray: !0,
                    strokeDashoffset: !0,
                    strokeMiterlimit: !0,
                    strokeOpacity: !0,
                    strokeWidth: !0
                };

                function B(t, e) {
                    return isNaN(e) || H[t] ? e : e + "px"
                }

                function V(t, e) {
                    var n = (t.attrs || a).style,
                        i = e ? (e.attrs || a).style : null;
                    if (null == n || h(n)) t.el.style.cssText = n;
                    else {
                        for (var o in n) {
                            var r = n[o];
                            (null == i || null != r && r !== i[o]) && (t.el.style[o] = B(o, r))
                        }
                        if (i)
                            for (var s in i) null == n[s] && (t.el.style[s] = "")
                    }
                }
                var $ = [];

                function N(t, e, n, i, o) {
                    if (null != t) {
                        var r = n.hooks[e];
                        if (r) {
                            if ("d" !== e[0] || "i" !== e[1] || "d" !== e[2]) return r(n, i);
                            o ? C(n.parent) && r(n, i) : $.push([r, n, i])
                        }
                    }
                }

                function W(t) {
                    var e;
                    if ($.length)
                        for (C(t.node); e = $.shift();) e[0](e[1], e[2])
                }
                var z = r ? document : null;

                function G(t) {
                    return t.nextSibling
                }

                function X(t, e, n) {
                    var i = e._node,
                        o = i.vm;
                    if (c(i.body))
                        if ((i.flags & T) === T)
                            for (var r = 0; r < i.body.length; r++) X(e, i.body[r].el);
                        else Y(i);
                    delete e._node, t.removeChild(e), N(i.hooks, "didRemove", i, null, n), null != o && (N(o.hooks, "didUnmount", o, o.data, n), o.node = null)
                }

                function U(t, e) {
                    var n = e._node;
                    if (!n._dead) {
                        var i = function t(e) {
                            var n = e.vm,
                                i = null != n && N(n.hooks, "willUnmount", n, n.data),
                                o = N(e.hooks, "willRemove", e);
                            if ((e.flags & T) === T && c(e.body))
                                for (var r = 0; r < e.body.length; r++) t(e.body[r]);
                            return i || o
                        }(n);
                        null != i && function (t) {
                            return "object" == typeof t && p(t.then)
                        }(i) ? (n._dead = !0, i.then(function (t, e, n) {
                            return function () {
                                return t.apply(n, e)
                            }
                        }(X, [t, e, !0]))) : X(t, e)
                    }
                }

                function Y(t) {
                    for (var e = t.body, n = 0; n < e.length; n++) {
                        var i = e[n];
                        delete i.el._node, null != i.vm && (i.vm.node = null), c(i.body) && Y(i)
                    }
                }

                function K(t) {
                    var e = t.el;
                    if (0 == (t.flags & T)) c(t.body) && Y(t), e.textContent = null;
                    else {
                        var n = e.firstChild;
                        do {
                            var i = G(n);
                            U(e, n)
                        } while (n = i)
                    }
                }

                function q(t, e, n) {
                    var i = e._node,
                        o = null != e.parentNode,
                        r = e !== n && o ? null : i.vm;
                    null != r && N(r.hooks, "willMount", r, r.data), N(i.hooks, o ? "willReinsert" : "willInsert", i), t.insertBefore(e, n), N(i.hooks, o ? "didReinsert" : "didInsert", i), null != r && N(r.hooks, "didMount", r, r.data)
                }

                function J(t, e, n) {
                    q(t, e, n ? G(n) : null)
                }
                var Z = {},
                    Q = l;

                function tt(t, e, n) {
                    t[e] = n
                }

                function et(t, e, n, i, o) {
                    var r = t.apply(o, e.concat([n, i, o, o.data]));
                    o.onevent(n, i, o, o.data, e), Q.call(null, n, i, o, o.data, e), !1 === r && (n.preventDefault(), n.stopPropagation())
                }

                function nt(t) {
                    var e, n, i = function (t) {
                            for (; null == t._node;) t = t.parentNode;
                            return t._node
                        }(t.target),
                        o = I(i),
                        r = t.currentTarget._node.attrs["on" + t.type];
                    if (c(r)) e = r[0], n = r.slice(1), et(e, n, t, i, o);
                    else
                        for (var s in r)
                            if (t.target.matches(s)) {
                                var a = r[s];
                                c(a) ? (e = a[0], n = a.slice(1)) : (e = a, n = []), et(e, n, t, i, o)
                            }
                }

                function it(t, e, n, i) {
                    if (n !== i) {
                        var o = t.el;
                        null == n || p(n) ? tt(o, e, n) : null == i && tt(o, e, nt)
                    }
                }

                function ot(t, e, n) {
                    "." === e[0] && (e = e.substr(1), n = !0), n ? t.el[e] = "" : t.el.removeAttribute(e)
                }

                function rt(t, e, n, i, o) {
                    var r = t.el;
                    null == n ? !o && ot(t, e, !1) : null != t.ns ? r.setAttribute(e, n) : "class" === e ? r.className = n : "id" === e || "boolean" == typeof n || i ? r[e] = n : "." === e[0] ? r[e.substr(1)] = n : r.setAttribute(e, n)
                }

                function st(t, e, n) {
                    var i = t.attrs || a,
                        o = e.attrs || a;
                    if (i === o);
                    else {
                        for (var r in i) {
                            var s = i[r],
                                l = S(t.tag, r),
                                c = l ? t.el[r] : o[r];
                            s === c || (b(r) ? V(t, e) : x(r) || (w(r) ? it(t, r, s, c) : rt(t, r, s, l, n)))
                        }
                        for (var r in o) !(r in i) && !x(r) && ot(t, r, S(t.tag, r) || w(r))
                    }
                }

                function at(t, e, n, o) {
                    return t.type === i && (e = t.data, n = t.key, o = t.opts, t = t.view), new bt(t, e, n, o)
                }

                function lt(t) {
                    for (var e = 0; e < t.body.length; e++) {
                        var r = t.body[e],
                            s = r.type;
                        if (s <= n) q(t.el, ct(r));
                        else if (s === i) {
                            var a = at(r.view, r.data, r.key, r.opts)._redraw(t, e, !1);
                            s = a.node.type, q(t.el, ct(a.node))
                        } else if (s === o) {
                            var a = r.vm;
                            a._redraw(t, e), s = a.node.type, q(t.el, a.node.el)
                        }
                    }
                }

                function ct(i, o) {
                    return null == i.el && (i.type === t ? (i.el = o || function (t, e) {
                        return null != e ? z.createElementNS(e, t) : z.createElement(t)
                    }(i.tag, i.ns), null != i.attrs && st(i, a, !0), (i.flags & R) === R && i.body.body(i), c(i.body) ? lt(i) : null != i.body && "" !== i.body && (i.el.textContent = i.body)) : i.type === e ? i.el = o || function (t) {
                        return z.createTextNode(t)
                    }(i.body) : i.type === n && (i.el = o || function (t) {
                        return z.createComment(t)
                    }(i.body))), i.el._node = i, i.el
                }
                window.lisMove = ht;
                var ut = 1,
                    dt = 2;

                function ft(t, e, n, i, o, r, s, a) {
                    return function (l, c, u, d, f, h) {
                        var p, g;
                        if (null != d[i]) {
                            if (null == (p = d[i]._node)) return void(d[i] = t(d[i]));
                            if (function (t) {
                                    return t.parent
                                }(p) !== l) return g = t(d[i]), null != p.vm ? p.vm.unmount(!0) : U(c, d[i]), void(d[i] = g)
                        }
                        if (d[o] == f) return dt;
                        if (null == d[o].el) n(c, ct(d[o]), d[i]), d[o] = e(d[o], u);
                        else if (d[o].el === d[i]) d[o] = e(d[o], u), d[i] = t(d[i]);
                        else {
                            if (h || p !== d[s]) return h && null != d[i] ? ht(t, e, n, i, o, c, u, p, d) : ut;
                            g = d[i], d[i] = t(g), a(c, g, d[r]), d[r] = g
                        }
                    }
                }

                function ht(t, e, n, i, o, r, s, a, l) {
                    if (a._lis) n(r, l[o].el, l[i]), l[o] = e(l[o], s);
                    else {
                        var c = function (t, e) {
                            var n, i = 0,
                                o = e.length - 1;
                            if (o <= 2147483647)
                                for (; i <= o;) {
                                    if (e[n = i + o >> 1] === t) return n;
                                    e[n] < t ? i = n + 1 : o = n - 1
                                } else
                                    for (; i <= o;) {
                                        if (n = Math.floor((i + o) / 2), e[n] === t) return n;
                                        e[n] < t ? i = n + 1 : o = n - 1
                                    }
                            return i == e.length ? null : i
                        }(a.idx, l.tombs);
                        a._lis = !0;
                        var u = t(l[i]);
                        n(r, l[i], null != c ? s[l.tombs[c]].el : c), null == c ? l.tombs.push(a.idx) : l.tombs.splice(c, 0, a.idx), l[i] = u
                    }
                }
                var pt = ft(G, function (t, e) {
                        return e[t.idx + 1]
                    }, q, "lftSib", "lftNode", "rgtSib", "rgtNode", J),
                    gt = ft(function (t) {
                        return t.previousSibling
                    }, function (t, e) {
                        return e[t.idx - 1]
                    }, J, "rgtSib", "rgtNode", "lftSib", "lftNode", q);

                function vt(t, e, n, i) {
                    for (var o = Array.prototype.slice.call(e.childNodes), r = [], s = 0; s < o.length; s++) {
                        var a = o[s]._node;
                        a.parent === t && r.push(a.idx)
                    }
                    for (var l = function (t) {
                            var e, n, i = t.slice(),
                                o = [];
                            o.push(0);
                            for (var r = 0, s = t.length; r < s; ++r) {
                                var a = o[o.length - 1];
                                if (t[a] < t[r]) i[r] = a, o.push(r);
                                else {
                                    for (e = 0, n = o.length - 1; e < n;) {
                                        var l = (e + n) / 2 | 0;
                                        t[o[l]] < t[r] ? e = l + 1 : n = l
                                    }
                                    t[r] < t[o[e]] && (e > 0 && (i[r] = o[e - 1]), o[e] = r)
                                }
                            }
                            for (e = o.length, n = o[e - 1]; e-- > 0;) o[e] = n, n = i[n];
                            return o
                        }(r).map(function (t) {
                            return r[t]
                        }), c = 0; c < l.length; c++) n[l[c]]._lis = !0;
                    for (i.tombs = l;;) {
                        var u = pt(t, e, n, i, null, !0);
                        if (u === dt) break
                    }
                }

                function _t(t) {
                    return t.el._node.parent !== t.parent
                }

                function mt(t, e, n) {
                    return e[n]
                }

                function yt(t, e, n) {
                    for (; n < e.length; n++) {
                        var r = e[n];
                        if (null != r.vm) {
                            if (t.type === i && r.vm.view === t.view && r.vm.key === t.key || t.type === o && r.vm === t.vm) return r
                        } else if (!_t(r) && t.tag === r.tag && t.type === r.type && t.key === r.key && (t.flags & ~T) == (r.flags & ~T)) return r
                    }
                    return null
                }

                function wt(t, e, n) {
                    return e[e._keys[t.key]]
                }

                function xt(r, s) {
                    N(s.hooks, "willRecycle", s, r);
                    var l = r.el = s.el,
                        u = s.body,
                        d = r.body;
                    if (l._node = r, r.type !== e || d === u) {
                        null == r.attrs && null == s.attrs || st(r, s, !1);
                        var f = c(u),
                            h = c(d),
                            p = (r.flags & R) === R;
                        f ? h || p ? function (e, r) {
                            var s = e.body,
                                l = s.length,
                                c = r.body,
                                u = c.length,
                                d = (e.flags & R) === R,
                                f = (e.flags & P) === P,
                                h = (e.flags & j) === j,
                                p = !f && e.type === t,
                                g = !0,
                                v = h ? wt : f || d ? mt : yt;
                            if (h) {
                                for (var _ = {}, m = 0; m < c.length; m++) _[c[m].key] = m;
                                c._keys = _
                            }
                            if (p && 0 === l) return K(r), void(d && (e.body = []));
                            var y, w, x = 0,
                                b = !1,
                                C = 0;
                            if (d) var S = {
                                    key: null
                                },
                                I = Array(l);
                            for (var m = 0; m < l; m++) {
                                if (d) {
                                    var O = !1,
                                        E = null;
                                    g && (h && (S.key = s.key(m)), y = v(S, c, C)), null != y ? (w = y.idx, !0 === (E = s.diff(m, y)) ? ((A = y).parent = e, A.idx = m, A._lis = !1) : O = !0) : O = !0, O && (L(A = s.tpl(m), e, m), A._diff = null != E ? E : s.diff(m), null != y && xt(A, y)), I[m] = A
                                } else {
                                    var A = s[m],
                                        M = A.type;
                                    if (M <= n)(y = g && v(A, c, C)) && (xt(A, y), w = y.idx);
                                    else if (M === i) {
                                        if (y = g && v(A, c, C)) {
                                            w = y.idx;
                                            var D = y.vm._update(A.data, e, m)
                                        } else var D = at(A.view, A.data, A.key, A.opts)._redraw(e, m, !1);
                                        M = D.node.type
                                    } else if (M === o) {
                                        var T = k(A.vm),
                                            D = A.vm._update(A.data, e, m, T);
                                        M = D.node.type
                                    }
                                }
                                if (!h && null != y && (w === C ? ++C === u && l > u && (y = null, g = !1) : b = !0, u > 100 && b && ++x % 10 == 0))
                                    for (; C < u && _t(c[C]);) C++
                            }
                            d && (e.body = I), p && function (t, e) {
                                var n = e.body,
                                    i = t.el,
                                    o = t.body,
                                    r = {
                                        lftNode: o[0],
                                        rgtNode: o[o.length - 1],
                                        lftSib: (n[0] || a).el,
                                        rgtSib: (n[n.length - 1] || a).el
                                    };
                                t: for (;;) {
                                    for (;;) {
                                        var s = pt(t, i, o, r, null, !1);
                                        if (s === ut) break;
                                        if (s === dt) break t
                                    }
                                    for (;;) {
                                        var l = gt(t, i, o, r, r.lftNode, !1);
                                        if (l === ut) break;
                                        if (l === dt) break t
                                    }
                                    vt(t, i, o, r);
                                    break
                                }
                            }(e, r)
                        }(r, s) : d !== u && (null != d ? l.textContent = d : K(s)) : h ? (K(s), lt(r)) : d !== u && (l.firstChild ? l.firstChild.nodeValue = d : l.textContent = d), N(s.hooks, "didRecycle", s, r)
                    } else l.nodeValue = d
                }

                function bt(t, e, n, i) {
                    var o = this;
                    o.view = t, o.data = e, o.key = n, i && (o.opts = i, o.config(i));
                    var r = d(t) ? t : t.call(o, o, e, n, i);
                    p(r) ? o.render = r : (o.render = r.render, o.config(r)), o._redrawAsync = y(function (t) {
                        return o.redraw(!0)
                    }), o._updateAsync = y(function (t) {
                        return o.update(t, !0)
                    }), o.init && o.init.call(o, o, o.data, o.key, i)
                }
                var Ct = bt.prototype = {
                    constructor: bt,
                    _diff: null,
                    init: null,
                    view: null,
                    key: null,
                    data: null,
                    state: null,
                    api: null,
                    opts: null,
                    node: null,
                    hooks: null,
                    onevent: l,
                    refs: null,
                    render: null,
                    mount: function (t, e) {
                        var n = this;
                        return e ? (K({
                            el: t,
                            flags: 0
                        }), n._redraw(null, null, !1), t.nodeName.toLowerCase() !== n.node.tag ? (ct(n.node), q(t.parentNode, n.node.el, t), t.parentNode.removeChild(t)) : q(t.parentNode, ct(n.node, t), t)) : (n._redraw(null, null), t && q(t, n.node.el)), t && W(n), n
                    },
                    unmount: function (t) {
                        var e = this.node;
                        U(e.el.parentNode, e.el), t || W(this)
                    },
                    config: function (t) {
                        var e = this;
                        t.init && (e.init = t.init), t.diff && (e.diff = t.diff), t.onevent && (e.onevent = t.onevent), t.hooks && (e.hooks = g(e.hooks || {}, t.hooks)), t.onemit && (e.onemit = g(e.onemit || {}, t.onemit))
                    },
                    parent: function () {
                        return I(this.node.parent)
                    },
                    root: function () {
                        for (var t = this.node; t.parent;) t = t.parent;
                        return t.vm
                    },
                    redraw: function (t) {
                        return t ? this._redraw(null, null, k(this)) : this._redrawAsync(), this
                    },
                    update: function (t, e) {
                        return e ? this._update(t, null, null, k(this)) : this._updateAsync(t), this
                    },
                    _update: function (t, e, n, i) {
                        var o = this;
                        return null != t && o.data !== t && (N(o.hooks, "willUpdate", o, t), o.data = t), o._redraw(e, n, i)
                    },
                    _redraw: function (t, e, n) {
                        var i, o, r = null == t,
                            s = this,
                            a = s.node && s.node.el && s.node.el.parentNode,
                            l = s.node;
                        if (null != s.diff && (i = s._diff, s._diff = o = s.diff(s, s.data), null != l)) {
                            var u = c(i) ? m : _,
                                d = i === o || u(i, o);
                            if (d) return kt(s, l, t, e)
                        }
                        a && N(s.hooks, "willRedraw", s, s.data);
                        var f = s.render.call(s, s, s.data, i, o);
                        if (f === l) return kt(s, l, t, e);
                        if (s.refs = null, null != s.key && f.key !== s.key && (f.key = s.key), s.node = f, t ? (L(f, t, e, s), t.body[e] = f) : l && l.parent ? (L(f, l.parent, l.idx, s), l.parent.body[l.idx] = f) : L(f, null, null, s), !1 !== n)
                            if (l)
                                if (l.tag !== f.tag || l.key !== f.key) {
                                    l.vm = f.vm = null;
                                    var h = l.el.parentNode,
                                        p = G(l.el);
                                    U(h, l.el), q(h, ct(f), p), l.el = f.el, f.vm = s
                                } else xt(f, l);
                        else ct(f);
                        return a && N(s.hooks, "didRedraw", s, s.data), r && a && W(s), s
                    },
                    _redrawAsync: null,
                    _updateAsync: null
                };

                function kt(t, e, n, i) {
                    return null != n && (n.body[i] = e, e.idx = i, e.parent = n, e._lis = !1), t
                }

                function St(t, e, n, i) {
                    var o, r;
                    return null == n ? d(e) ? o = e : r = e : (o = e, r = n), F(t, o, r, i)
                }
                var It = "http://www.w3.org/2000/svg";

                function Ot(t, e, n, i) {
                    this.view = t, this.data = e, this.key = n, this.opts = i
                }

                function Et(t) {
                    this.vm = t
                }
                Ot.prototype = {
                    constructor: Ot,
                    type: i,
                    view: null,
                    data: null,
                    key: null,
                    opts: null
                }, Et.prototype = {
                    constructor: Et,
                    type: o,
                    vm: null
                };
                var At = {
                    config: function (t) {
                        Q = t.onevent || Q, t.onemit && function (t) {
                            g(Z, t)
                        }(t.onemit)
                    },
                    ViewModel: bt,
                    VNode: O,
                    createView: at,
                    defineElement: St,
                    defineSvgElement: function (t, e, n, i) {
                        var o = St(t, e, n, i);
                        return o.ns = It, o
                    },
                    defineText: A,
                    defineComment: function (t) {
                        var e = new O;
                        return e.type = n, e.body = t, e
                    },
                    defineView: function (t, e, n, i) {
                        return new Ot(t, e, n, i)
                    },
                    injectView: function (t) {
                        return new Et(t)
                    },
                    injectElement: function (e) {
                        var n = new O;
                        return n.type = t, n.el = n.key = e, n
                    },
                    lazyList: function (t, e) {
                        var n = t.length,
                            i = {
                                items: t,
                                length: n,
                                key: function (n) {
                                    return e.key(t[n], n)
                                },
                                diff: function (n, i) {
                                    var o = e.diff(t[n], n);
                                    if (null == i) return o;
                                    var r = i._diff,
                                        s = o === r || c(r) ? m(o, r) : _(o, r);
                                    return s || o
                                },
                                tpl: function (n) {
                                    return e.tpl(t[n], n)
                                },
                                map: function (t) {
                                    return e.tpl = t, i
                                },
                                body: function (t) {
                                    for (var e = Array(n), o = 0; o < n; o++) {
                                        var r = i.tpl(o);
                                        r._diff = i.diff(o), e[o] = r, L(r, t, o)
                                    }
                                    t.body = e
                                }
                            };
                        return i
                    },
                    FIXED_BODY: P,
                    DEEP_REMOVE: T,
                    KEYED_LIST: j,
                    LAZY_LIST: R
                };

                function Mt(t) {
                    var e, n, i = arguments,
                        o = i.length;
                    if (o > 1) {
                        var r = 1;
                        d(i[1]) && (n = i[1], r = 2), e = o === r + 1 && (h(i[r]) || c(i[r]) || n && (n._flags & R) === R) ? i[r] : v(i, r)
                    }
                    return F(t, n, e)
                }
                return E.patch = function (t, e) {
                    ! function (t, e, n) {
                        if (null != e.type) {
                            if (null != t.vm) return;
                            L(e, t.parent, t.idx, null), t.parent.body[t.idx] = e, xt(e, t), n && C(e), W(I(e))
                        } else {
                            var i = Object.create(t);
                            i.attrs = g({}, t.attrs);
                            var o = g(t.attrs, e);
                            if (null != t._class) {
                                var r = o.class;
                                o.class = null != r && "" !== r ? t._class + " " + r : t._class
                            }
                            st(t, i), n && C(t)
                        }
                    }(this, t, e)
                }, Ct.emit = function (t) {
                    var e = this,
                        n = e,
                        i = v(arguments, 1).concat(n, n.data);
                    do {
                        var o = e.onemit,
                            r = o ? o[t] : null;
                        if (r) {
                            r.apply(e, i);
                            break
                        }
                    } while (e = e.parent());
                    Z[t] && Z[t].apply(e, i)
                }, Ct.onemit = null, Ct.body = function () {
                    return function t(e, n) {
                        var i = e.body;
                        if (c(i))
                            for (var o = 0; o < i.length; o++) {
                                var r = i[o];
                                null != r.vm ? n.push(r.vm) : t(r, n)
                            }
                        return n
                    }(this.node, [])
                }, At.defineElementSpread = Mt, At.defineSvgElementSpread = function () {
                    var t = Mt.apply(null, arguments);
                    return t.ns = It, t
                }, At
            }()
        }, function (t, e, n) {
            "use strict";

            function i(t) {
                for (var n in t) e.hasOwnProperty(n) || (e[n] = t[n])
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), i(n(56)), i(n(31)), i(n(30))
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__extends || function () {
                    var t = function (e, n) {
                        return (t = Object.setPrototypeOf || {
                                __proto__: []
                            }
                            instanceof Array && function (t, e) {
                                t.__proto__ = e
                            } || function (t, e) {
                                for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                            })(e, n)
                    };
                    return function (e, n) {
                        function i() {
                            this.constructor = e
                        }
                        t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
                    }
                }(),
                o = this && this.__assign || function () {
                    return (o = Object.assign || function (t) {
                        for (var e, n = 1, i = arguments.length; n < i; n++)
                            for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                        return t
                    }).apply(this, arguments)
                };
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var r = n(2),
                s = n(0),
                a = n(7),
                l = n(3),
                c = n(30),
                u = function (t) {
                    function e(e) {
                        void 0 === e && (e = {});
                        var n = t.call(this, r.extend({}, e)) || this;
                        return n.events = e.events || new a.EventSystem, n._isActive = !1, n
                    }
                    return i(e, t), e.prototype.show = function (t, e, n) {
                        var i = this;
                        void 0 === e && (e = {}), !1 !== this.events.fire(c.PopupEvents.beforeShow) && (this._isActive && this.hide(), n && this.attach(n), setTimeout(function () {
                            document.body.appendChild(i._popup);
                            var n = i._popup.getBoundingClientRect(),
                                r = n.width,
                                s = n.height,
                                a = l.fitPosition(t, o(o({}, e), {
                                    width: r,
                                    height: s
                                })),
                                u = a.left,
                                d = a.top;
                            i._popup.style.left = u, i._popup.style.top = d, i._isActive = !0, i.events.fire(c.PopupEvents.afterShow), i._outerClickDestructor = i._detectOuterClick(t)
                        }))
                    }, e.prototype.hide = function () {
                        this._hide(!1)
                    }, e.prototype.isVisible = function () {
                        return this._isActive
                    }, e.prototype.toVDOM = function () {
                        return s.el("div", {
                            class: "dhx-popup-content " + (this.config.css || ""),
                            _key: this._uid
                        }, [t.prototype.toVDOM.call(this)])
                    }, e.prototype._initHandlers = function () {
                        this._handlers = {}
                    }, e.prototype._detectOuterClick = function (t) {
                        var e = this,
                            n = function (i) {
                                for (var o = i.target; o;) {
                                    if (o === t || o === e._popup) return;
                                    o = o.parentNode
                                }
                                e._hide(!0) && document.removeEventListener("click", n)
                            };
                        return document.addEventListener("click", n),
                            function () {
                                return document.removeEventListener("click", n)
                            }
                    }, e.prototype._hide = function (t) {
                        if (this._isActive) return !1 !== this.events.fire(c.PopupEvents.beforeHide, [t]) && (document.body.removeChild(this._popup), this._isActive = !1, this._outerClickDestructor && (this._outerClickDestructor(), this._outerClickDestructor = null), this.events.fire(c.PopupEvents.afterHide), !0)
                    }, e
                }(n(31).Wrapper);
            e.Popup = u
        }, function (t, e, n) {
            "use strict";

            function i(t) {
                t = t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (t, e, n, i) {
                    return e + e + n + n + i + i
                });
                var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
                return e ? {
                    r: parseInt(e[1], 16),
                    g: parseInt(e[2], 16),
                    b: parseInt(e[3], 16)
                } : null
            }

            function o(t) {
                var e, n, i = t.r / 255,
                    o = t.g / 255,
                    r = t.b / 255,
                    s = Math.max(i, o, r),
                    a = s - Math.min(i, o, r),
                    l = function (t) {
                        return (s - t) / 6 / a + .5
                    };
                if (0 === a) e = n = 0;
                else {
                    n = a / s;
                    var c = l(i),
                        u = l(o),
                        d = l(r);
                    i === s ? e = d - u : o === s ? e = 1 / 3 + c - d : r === s && (e = 2 / 3 + u - c), e < 0 ? e += 1 : e > 1 && (e -= 1)
                }
                return {
                    h: Math.floor(360 * e),
                    s: n,
                    v: s
                }
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.HSVtoRGB = function (t) {
                var e = {
                        r: 0,
                        g: 0,
                        b: 0
                    },
                    n = t.h / 60,
                    i = t.s,
                    o = t.v,
                    r = Math.floor(n) % 6,
                    s = n - Math.floor(n),
                    a = 255 * o * (1 - i),
                    l = 255 * o * (1 - i * s),
                    c = 255 * o * (1 - i * (1 - s));
                switch (o *= 255, r) {
                    case 0:
                        e.r = o, e.g = c, e.b = a;
                        break;
                    case 1:
                        e.r = l, e.g = o, e.b = a;
                        break;
                    case 2:
                        e.r = a, e.g = o, e.b = c;
                        break;
                    case 3:
                        e.r = a, e.g = l, e.b = o;
                        break;
                    case 4:
                        e.r = c, e.g = a, e.b = o;
                        break;
                    case 5:
                        e.r = o, e.g = a, e.b = l
                }
                for (var u in e) e[u] = Math.round(e[u]);
                return e
            }, e.RGBToHex = function (t) {
                return Object.keys(t).reduce(function (e, n) {
                    var i = t[n].toString(16).toUpperCase();
                    return e + (i = 1 === i.length ? "0" + i : i)
                }, "#")
            }, e.HexToRGB = i, e.RGBToHSV = o, e.HexToHSV = function (t) {
                return o(i(t))
            }, e.isHex = function (t) {
                return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t)
            }
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.grayShades = ["#000000", "#4C4C4C", "#666666", "#808080", "#999999", "#B3B3B3", "#CCCCCC", "#E6E6E6", "#F2F2F2", "#FFFFFF"], e.palette = [{
                colors: ["#D4DAE4", "#B0B8CD", "#949DB1", "#727A8C", "#5E6677", "#3F4757", "#1D2534"]
            }, {
                colors: ["#FFCDD2", "#FE9998", "#F35C4E", "#E94633", "#D73C2D", "#CA3626", "#BB2B1A"]
            }, {
                colors: ["#F9E6AD", "#F4D679", "#EDB90F", "#EAA100", "#EA8F00", "#EA7E00", "#EA5D00"]
            }, {
                colors: ["#BCE4CE", "#90D2AF", "#33B579", "#36955F", "#247346", "#1D5B38", "#17492D"]
            }, {
                colors: ["#BDF0E9", "#92E7DC", "#02D7C5", "#11B3A5", "#018B80", "#026B60", "#024F43"]
            }, {
                colors: ["#B3E5FC", "#81D4FA", "#29B6F6", "#039BE5", "#0288D1", "#0277BD", "#01579B"]
            }, {
                colors: ["#AEC1FF", "#88A3F9", "#5874CD", "#2349AE", "#163FA2", "#083596", "#002381"]
            }, {
                colors: ["#C5C0DA", "#9F97C1", "#7E6BAD", "#584A8F", "#4F4083", "#473776", "#3A265F"]
            }, {
                colors: ["#D6BDCC", "#C492AC", "#A9537C", "#963A64", "#81355A", "#6E3051", "#4C2640"]
            }, {
                colors: ["#D2C5C1", "#B4A09A", "#826358", "#624339", "#5D4037", "#4E342E", "#3E2723"]
            }]
        }, function (t, e, n) {
            "use strict";
            (function (t) {
                Object.defineProperty(e, "__esModule", {
                    value: !0
                });
                var i = n(13),
                    o = function () {
                        function e(t, e) {
                            this._parent = t, this._changes = e
                        }
                        return e.prototype.load = function (t, e) {
                            var n = this;
                            return this._parent.loadData = t.load().then(function (t) {
                                n._parent.removeAll(), n.parse(t, e)
                            })
                        }, e.prototype.parse = function (t, e) {
                            void 0 === e && (e = "json"), t = (e = i.toDataDriver(e)).toJsonArray(t), this._parent.$parse(t)
                        }, e.prototype.save = function (e) {
                            for (var n = this, o = function (o) {
                                    if (o.saving || o.pending) i.dhxWarning("item is saving");
                                    else {
                                        var s = r._findPrevState(o.id);
                                        if (s && s.saving) {
                                            var a = new t(function (t, r) {
                                                s.promise.then(function () {
                                                    o.pending = !1, t(n._setPromise(o, e))
                                                }).catch(function (t) {
                                                    n._removeFromOrder(s), n._setPromise(o, e), i.dhxWarning(t), r(t)
                                                })
                                            });
                                            r._addToChain(a), o.pending = !0
                                        } else r._setPromise(o, e)
                                    }
                                }, r = this, s = 0, a = this._changes.order; s < a.length; s++) {
                                o(a[s])
                            }
                            this._parent.saveData.then(function () {
                                n._saving = !1
                            })
                        }, e.prototype._setPromise = function (t, e) {
                            var n = this;
                            return t.promise = e.save(t.obj, t.status), t.promise.then(function () {
                                n._removeFromOrder(t)
                            }).catch(function (e) {
                                t.saving = !1, t.error = !0, i.dhxError(e)
                            }), t.saving = !0, this._saving = !0, this._addToChain(t.promise), t.promise
                        }, e.prototype._addToChain = function (t) {
                            this._parent.saveData && this._saving ? this._parent.saveData = this._parent.saveData.then(function () {
                                return t
                            }) : this._parent.saveData = t
                        }, e.prototype._findPrevState = function (t) {
                            for (var e = 0, n = this._changes.order; e < n.length; e++) {
                                var i = n[e];
                                if (i.id === t) return i
                            }
                            return null
                        }, e.prototype._removeFromOrder = function (t) {
                            this._changes.order = this._changes.order.filter(function (e) {
                                return !i.isEqualObj(e, t)
                            })
                        }, e
                    }();
                e.Loader = o
            }).call(this, n(10))
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(13),
                o = function () {
                    function t() {}
                    return t.prototype.sort = function (t, e) {
                        var n = this;
                        e.rule && "function" == typeof e.rule ? this._sort(t, e) : e.by && (e.rule = function (t, o) {
                            var r = n._checkVal(e.as, t[e.by]),
                                s = n._checkVal(e.as, o[e.by]);
                            return i.naturalCompare(r.toString(), s.toString())
                        }, this._sort(t, e))
                    }, t.prototype._checkVal = function (t, e) {
                        return t ? t.call(this, e) : e
                    }, t.prototype._sort = function (t, e) {
                        var n = this,
                            i = {
                                asc: 1,
                                desc: -1
                            };
                        return t.sort(function (t, o) {
                            return e.rule.call(n, t, o) * (i[e.dir] || i.asc)
                        })
                    }, t
                }();
            e.Sort = o
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i, o = n(3),
                r = n(17),
                s = n(62),
                a = n(36),
                l = n(12);

            function c(t) {
                var e = t.y,
                    n = function (t) {
                        for (t instanceof Event && (t = t.target); t && t.getAttribute;) {
                            if (t.getAttribute("dhx_id")) return t;
                            t = t.parentNode
                        }
                    }(t);
                if (!n) return null;
                var i = n.childNodes[0].getBoundingClientRect();
                return (e - i.top) / i.height
            }! function (t) {
                t[t.top = 0] = "top", t[t.bot = 1] = "bot", t[t.in = 2] = "in"
            }(i || (i = {}));
            var u = function () {
                function t() {
                    var t = this;
                    this._transferData = {}, this._canMove = !0, this._ghostTopPadding = -17, this._onMouseMove = function (e) {
                        if (t._transferData.id) {
                            var n = e.pageX,
                                i = e.pageY;
                            if (!t._transferData.ghost) {
                                if (Math.abs(t._transferData.x - n) < 3 && Math.abs(t._transferData.y - i) < 3) return;
                                var o = t._onDragStart(t._transferData.id, t._transferData.targetId);
                                if (!o) return void t._endDrop();
                                t._transferData.ghost = o, document.body.appendChild(t._transferData.ghost)
                            }
                            t._moveGhost(n, i), t._onDrag(e)
                        }
                    }, this._onMouseUp = function () {
                        t._transferData.x && (t._transferData.ghost ? (t._removeGhost(), t._onDrop()) : t._endDrop(), document.removeEventListener("mousemove", t._onMouseMove), document.removeEventListener("mouseup", t._onMouseUp))
                    }
                }
                return t.prototype.setItem = function (t, e, n) {
                    s.collectionStore.setItem(t, e, n)
                }, t.prototype.onMouseDown = function (t) {
                    if (1 === t.which) {
                        document.addEventListener("mousemove", this._onMouseMove), document.addEventListener("mouseup", this._onMouseUp);
                        var e = o.locate(t, "dhx_id"),
                            n = o.locate(t, "dhx_collection_id");
                        e && n && (this._transferData.x = t.x, this._transferData.y = t.y, this._transferData.targetId = n, this._transferData.id = e)
                    }
                }, t.prototype._moveGhost = function (t, e) {
                    if (this._transferData.ghost) {
                        var n = this._transferData.ghost.offsetWidth / 2;
                        this._transferData.ghost.style.left = t - n + "px", this._transferData.ghost.style.top = e + this._ghostTopPadding + "px"
                    }
                }, t.prototype._removeGhost = function () {
                    document.body.removeChild(this._transferData.ghost)
                }, t.prototype._onDrop = function () {
                    if (this._canMove) {
                        var t = s.collectionStore.getItem(this._lastCollectionId),
                            e = s.collectionStore.getItemConfig(this._lastCollectionId);
                        if (t && e.mode !== l.DragMode.source) {
                            var n = {
                                    id: this._lastId,
                                    target: t
                                },
                                i = {
                                    id: this._transferData.id,
                                    target: this._transferData.target
                                };
                            i.target.events.fire(r.DragEvents.beforeDrop, [i, n]) && (this._move(i, n), n.target.events.fire(r.DragEvents.dropComplete, [n.id, this._transferData.dropPosition])), this._endDrop()
                        } else this._endDrop()
                    } else this._endDrop()
                }, t.prototype._onDragStart = function (t, e) {
                    var n = s.collectionStore.getItem(e),
                        i = s.collectionStore.getItemConfig(e);
                    if (i.dragMode === l.DragMode.target) return null;
                    var o = n.data.getItem(t);
                    n.events.fire(r.DragEvents.dragStart);
                    var a = function (t) {
                        var e = document.createElement("div");
                        return e.textContent = t.value || t.text, e.className = "drag-ghost", e
                    }(o);
                    return n.events.fire(r.DragEvents.beforeDrag, [o, a]) && t ? (this._toggleTextSelection(!0), this._transferData.target = n, this._transferData.dragConfig = i, a) : null
                }, t.prototype._onDrag = function (t) {
                    var e = t.x,
                        n = t.y,
                        u = document.elementFromPoint(e, n),
                        d = o.locate(u, "dhx_id");
                    if (d) {
                        var f, h, p = o.locate(u, "dhx_collection_id");
                        if (this._transferData.dragConfig.behaviour === l.DragBehaviour.complex) {
                            var g = c(t);
                            this._transferData.dropPosition = g <= .25 ? i.top : g >= .75 ? i.bot : i.in
                        } else if (this._lastId === d && this._lastCollectionId === p) return;
                        if (d && p || !this._canMove)
                            if (f = [h = {
                                    id: this._transferData.id,
                                    target: this._transferData.target
                                }, {
                                    id: d,
                                    target: s.collectionStore.getItem(p)
                                }], h.target.events.fire(r.DragEvents.dragOut, f), p !== this._transferData.targetId || !(h.target.data instanceof a.TreeCollection) || h.target.data instanceof a.TreeCollection && h.target.data.canCopy(h.id, d)) this._cancelCanDrop(), this._lastId = d, this._lastCollectionId = p, f.push(this._transferData.dropPosition), h.target.events.fire(r.DragEvents.dragIn, f) && this._canDrop();
                            else this._cancelCanDrop();
                        else this._cancelCanDrop()
                    } else this._cancelCanDrop()
                }, t.prototype._move = function (t, e) {
                    var n = t.target.data,
                        o = e.target.data,
                        r = 0,
                        s = e.id;
                    switch (this._transferData.dragConfig.behaviour) {
                        case l.DragBehaviour.child:
                            break;
                        case l.DragBehaviour.sibling:
                            s = o.getParent(s), r = o.getIndex(e.id) + 1;
                            break;
                        case l.DragBehaviour.complex:
                            var a = this._transferData.dropPosition;
                            a === i.top ? (s = o.getParent(s), r = o.getIndex(e.id)) : a === i.bot && (s = o.getParent(s), r = o.getIndex(e.id) + 1)
                    }
                    this._transferData.dragConfig.copy ? n.copy(t.id, r, o, s) : n.move(t.id, r, o, s)
                }, t.prototype._endDrop = function () {
                    this._toggleTextSelection(!1), this._transferData.target && this._transferData.target.events.fire(r.DragEvents.dragEnd), this._cancelCanDrop(), this._canMove = !0, this._transferData = {}, this._lastId = null, this._lastCollectionId = null
                }, t.prototype._cancelCanDrop = function () {
                    this._canMove = !1;
                    var t = s.collectionStore.getItem(this._lastCollectionId);
                    t && this._lastId && t.events.fire(r.DragEvents.cancelDrop, [this._lastId])
                }, t.prototype._canDrop = function () {
                    this._canMove = !0;
                    var t = s.collectionStore.getItem(this._lastCollectionId);
                    t && this._lastId && t.events.fire(r.DragEvents.canDrop, [this._lastId, this._transferData.dropPosition])
                }, t.prototype._toggleTextSelection = function (t) {
                    t ? document.body.classList.add("dhx-no-select") : document.body.classList.remove("dhx-no-select")
                }, t
            }();
            e.dragManager = new u
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = function () {
                function t() {
                    this._store = {}
                }
                return t.prototype.setItem = function (t, e, n) {
                    this._store[t] = {
                        target: e,
                        config: n
                    }
                }, t.prototype.getItem = function (t) {
                    return this._store[t] ? this._store[t].target : null
                }, t.prototype.getItemConfig = function (t) {
                    return this._store[t] ? this._store[t].config : null
                }, t
            }();
            e.collectionStore = new i
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(7),
                o = n(17),
                r = n(12),
                s = function () {
                    function t(t, e, n) {
                        var o = this;
                        this.events = n || new i.EventSystem, this._data = e, this._data.events.on(r.DataEvents.removeAll, function () {
                            o._selected = null
                        }), this._data.events.on(r.DataEvents.change, function () {
                            if (o._selected) {
                                var t = o._data.getNearId(o._selected);
                                t !== o._selected && (o._selected = null, t && o.add(t))
                            }
                        })
                    }
                    return t.prototype.getId = function () {
                        return this._selected
                    }, t.prototype.getItem = function () {
                        return this._selected ? this._data.getItem(this._selected) : null
                    }, t.prototype.remove = function (t) {
                        return !(t = t || this._selected) || !!this.events.fire(o.SelectionEvents.beforeUnSelect, [t]) && (this._data.update(t, {
                            $selected: !1
                        }), this._selected = null, this.events.fire(o.SelectionEvents.afterUnSelect, [t]), !0)
                    }, t.prototype.add = function (t) {
                        this._selected !== t && (this.remove(), this.events.fire(o.SelectionEvents.beforeSelect, [t]) && (this._selected = t, this._data.update(t, {
                            $selected: !0
                        }), this.events.fire(o.SelectionEvents.afterSelect, [t])))
                    }, t
                }();
            e.Selection = s
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__extends || function () {
                    var t = function (e, n) {
                        return (t = Object.setPrototypeOf || {
                                __proto__: []
                            }
                            instanceof Array && function (t, e) {
                                t.__proto__ = e
                            } || function (t, e) {
                                for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                            })(e, n)
                    };
                    return function (e, n) {
                        function i() {
                            this.constructor = e
                        }
                        t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
                    }
                }(),
                o = this && this.__assign || function () {
                    return (o = Object.assign || function (t) {
                        for (var e, n = 1, i = arguments.length; n < i; n++)
                            for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                        return t
                    }).apply(this, arguments)
                };
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var r = n(0),
                s = n(7),
                a = n(3),
                l = n(8),
                c = n(11),
                u = n(38),
                d = n(65),
                f = n(14),
                h = n(66),
                p = n(69),
                g = n(19),
                v = n(2),
                _ = n(39),
                m = function (t) {
                    function e(e, n) {
                        var i = t.call(this, e, n) || this;
                        i._defConfig = {
                            rowHeight: 40,
                            headerRowHeight: 40,
                            columns: [],
                            data: []
                        }, i.content = _.content, i.config = o(o({}, i._defConfig), n), i._scroll = {
                            top: 0,
                            left: 0
                        }, i._htmlEvents = {
                            onclick: a.eventHandler(function (t) {
                                return a.locate(t)
                            }, {
                                dhx_grid_header_cell: function (t, e) {
                                    i.config.disableHeaderSort || i.events.fire(g.GridEvents.sort, [e])
                                },
                                dhx_grid_expand_cell: function (t, e) {
                                    return i.events.fire(g.GridEvents.expand, [e])
                                }
                            }),
                            onscroll: function (t) {
                                i._scroll = {
                                    top: t.target.scrollTop,
                                    left: t.target.scrollLeft
                                }, i.paint()
                            }
                        }, i._init(), i.config.columns && i._parseColumns(), i.config.data && i.config.columns && i.data.parse(i.config.data);
                        var s = r.create({
                            render: function (t, e) {
                                return h.render(t, e, i._currentData)
                            }
                        }, i);
                        return i.mount(e, s), i
                    }
                    return i(e, t), e.prototype.destructor = function () {
                        this.getRootView().unmount()
                    }, e.prototype.setHeader = function (t) {
                        this.config.columns = t, this._parseColumns()
                    }, e.prototype.sort = function (t, e) {
                        e ? this._sortDir = e : this._sortBy === t ? this._sortDir = "asc" === this._sortDir ? "desc" : "asc" : this._sortDir = "desc", this._sortBy = t, this.data.sort({
                            by: t,
                            dir: this._sortDir,
                            as: function (t) {
                                return "" + t
                            }
                        })
                    }, e.prototype.addRowCss = function (t, e) {
                        var n = this.data.getItem(t),
                            i = n.$css || "";
                        if (!i.match(new RegExp(e, "g"))) {
                            n.$css = i + " " + e;
                            var o = v.findIndex(this._currentData, function (t) {
                                return t.id === n.id
                            });
                            o >= 0 && (this._currentData[o].$css = n.$css), this.paint()
                        }
                    }, e.prototype.removeRowCss = function (t, e) {
                        var n = this.data.getItem(t),
                            i = n.$css ? n.$css.replace(e, "") : "";
                        n.$css = i
                    }, e.prototype.addCellCss = function (t, e, n) {
                        var i = this._getColumn(e);
                        i && (i.$cellCss[t] ? i.$cellCss[t] += i.$cellCss[t].match(new RegExp(n, "g")) ? "" : " " + n : this.data.getItem(t) && (i.$cellCss[t] = n + " "), this.paint())
                    }, e.prototype.removeCellCss = function (t, e, n) {
                        var i = this._getColumn(e);
                        i && (i.$cellCss[t] ? (i.$cellCss[t] = i.$cellCss[t].replace(n, ""), this.paint()) : this.data.getItem(t) && (i.$cellCss[t] = ""))
                    }, e.prototype.getScrollState = function () {
                        return {
                            x: this._scroll.left,
                            y: this._scroll.top
                        }
                    }, e.prototype.scroll = function (t, e) {
                        var n = this.getRootView().refs.grid_body.el;
                        n.scrollLeft = "number" == typeof t ? t : n.scrollLeft, n.scrollTop = "number" == typeof e ? e : n.scrollTop
                    }, e.prototype.scrollTo = function (t, e) {
                        var n = v.findIndex(this.config.columns, function (t) {
                                return t.id === e
                            }),
                            i = this.config.splitAt ? this.config.columns.slice(0, this.config.splitAt).reduce(function (t, e) {
                                return t + e.width
                            }, 0) : 0,
                            o = this.config.columns.slice(0, n).reduce(function (t, e) {
                                return t + e.width
                            }, 0) - i,
                            r = this.data.getIndex(t) * this.config.rowHeight,
                            s = this.getScrollState(),
                            a = this.config.width + s.x,
                            l = this.config.height + s.y - this.config.headerRowHeight * this.config.$headerLevel,
                            c = r - s.y - this.config.rowHeight,
                            u = o - s.x - this.config.columns[n].width,
                            d = r + 2 * this.config.rowHeight + 17 - l,
                            f = o + 2 * this.config.columns[n].width + 17 - a,
                            h = c > 0 && d < 0 ? 0 : c < 0 ? c : d,
                            p = u > 0 && f < 0 ? 0 : u < 0 ? u : f;
                        this.scroll(p + s.x, h + s.y)
                    }, e.prototype.adjustColumnWidth = function (t) {
                        var e = v.findIndex(this.config.columns, function (e) {
                                return e.id === t
                            }),
                            n = this.config.columns[e];
                        this.data.map(function (t) {
                            n.maxWidth = n.maxWidth || n.width, n.maxWidth = Math.max(f.getStrWidth(f.removeHTMLTags(t[n.id])) + 20, n.maxWidth)
                        }), this.config.$totalWidth = this.config.columns.reduce(function (t, e) {
                            return e.width = e.maxWidth || e.width, t + e.width
                        }, 0), this.paint()
                    }, e.prototype._getColumn = function (t) {
                        for (var e = 0, n = this.config.columns; e < n.length; e++) {
                            var i = n[e];
                            if (i.id === t) return i
                        }
                    }, e.prototype._init = function () {
                        var t = this;
                        this.events = new s.EventSystem(this), this._attachDataCollection(), this.data.events.on(c.DataEvents.load, function () {
                            t._parseData()
                        }), this.data.events.on(c.DataEvents.change, function () {
                            t._currentData = t.data.map(function (t) {
                                return t
                            }) || [], t._checkMarks(), t.config.columnsAutoWidth && ("number" == typeof t.config.columnsAutoWidth ? t._setAutoWidth(t.config.columnsAutoWidth) : t._setAutoWidth()), t._render()
                        }), this.export = new d.Exporter(this), this._setEventHandlers()
                    }, e.prototype._setEventHandlers = function () {
                        var t = this;
                        this.events.on(g.GridEvents.sort, function (e) {
                            return t.sort(e)
                        }), this.events.on(g.GridEvents.expand, function (e) {
                            var n = t.data.getItem(e);
                            t.data.update(e, {
                                $opened: !n.$opened
                            })
                        }), this.events.on(g.GridEvents.headerInput, function (e, n, i) {
                            t.data.filter({
                                by: n,
                                match: e,
                                compare: t.content[i].match
                            }, {
                                multiple: !0
                            })
                        })
                    }, e.prototype._attachDataCollection = function () {
                        var t = this,
                            e = function (e) {
                                return e.spans && (t.config.spans = e.spans, e = e.data), e
                            };
                        "tree" === this.config.type ? this.data = new p.TreeGridCollection({
                            prep: e
                        }, this.events) : this.data = new c.DataCollection({
                            prep: e
                        }, this.events)
                    }, e.prototype._setMarks = function (t, e) {
                        for (var n = this.data.map(function (e) {
                                return {
                                    id: e.id,
                                    data: e[t.id],
                                    row: e
                                }
                            }), i = this.data.map(function (e) {
                                return e[t.id]
                            }), o = function (n) {
                                var o = e(n.data, i, n.row, t);
                                if (o) {
                                    t.$cellCss = t.$cellCss || {};
                                    var r = (t.$cellCss[n.id] || "").split(" ");
                                    o.split(" ").map(function (t) {
                                        -1 === r.indexOf(t) && r.push(t)
                                    }), t.$cellCss[n.id] = r.join(" ")
                                }
                            }, r = 0, s = n; r < s.length; r++) {
                            o(s[r])
                        }
                    }, e.prototype._checkMarks = function () {
                        var t = this;
                        this.config.columns.map(function (e) {
                            var n = e.mark;
                            n && ("function" == typeof n ? t._setMarks(e, n) : t._setMarks(e, function (t, e) {
                                var i = e.filter(function (t) {
                                        return null !== t
                                    }),
                                    o = Math.min.apply(Math, i),
                                    r = Math.max.apply(Math, i);
                                return n.max && r === parseFloat(t) ? n.max : !(!n.min || o !== parseFloat(t)) && n.min
                            }))
                        })
                    }, e.prototype._parseColumns = function () {
                        var t = this.config.columns;
                        u.normalizeColumns(t), u.countColumns(this.config, t), "tree" === this.config.type && t.length && this._getTreeHeadersWidth()
                    }, e.prototype._setAutoWidth = function (t) {
                        var e = this;
                        this.data.map(function (n) {
                            e.config.columns.map(function (e, i) {
                                if (t && t <= i) return e;
                                e.maxWidth = e.maxWidth || e.width, e.maxWidth = Math.max(f.getStrWidth(f.removeHTMLTags(n[e.id])) + 20, e.maxWidth)
                            })
                        }), this.config.$totalWidth = this.config.columns.reduce(function (t, e) {
                            return e.width = e.maxWidth || e.width, t + e.width
                        }, 0)
                    }, e.prototype._detectColsTypes = function () {
                        var t = this.data.getItem(this.data.getId(0));
                        this.config.columns = this.config.columns.map(function (e) {
                            if (e.type) return e;
                            var n = parseFloat(t[e.id]),
                                i = isNaN(n) ? t[e.id] : n;
                            return e.type = typeof i, e
                        })
                    }, e.prototype._parseData = function () {
                        this.data.getId(0) && (this.config.columns.length && (this._detectColsTypes(), "tree" === this.config.type && this._getTreeHeadersWidth()), this._currentData = this.data.serialize() || []), this._checkFilters(), this._checkMarks(), this._render()
                    }, e.prototype._checkFilters = function () {
                        var t = this._currentData;
                        this.config.columns.map(function (e) {
                            e.header.map(function (n) {
                                n.content && (e.$uniqueData = u.getUnique(t, e.id))
                            })
                        })
                    }, e.prototype._getTreeHeadersWidth = function () {
                        if ("getMaxLevel" in this.data) {
                            var t = this.data.getMaxLevel(),
                                e = this.config.columns[0],
                                n = 45 * t,
                                i = 0;
                            this.data.map(function (t) {
                                i = Math.max(f.getStrWidth(f.removeHTMLTags("" + t[e.id])), i)
                            });
                            var o = Math.max(i + n, e.width);
                            this.config.$totalWidth = this.config.$totalWidth - e.width + o, this.config.columns[0].width = o
                        }
                    }, e.prototype._render = function () {
                        this.paint()
                    }, e
                }(l.View);
            e.Grid = m
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(14),
                o = function () {
                    function t(t) {
                        this._view = t
                    }
                    return t.prototype.xls = function (t) {
                        return this._export(t)
                    }, t.prototype._export = function (t) {
                        void 0 === t && (t = {});
                        for (var e = this._view.config.columns, n = {}, o = i.transpose(this._view.config.columns.map(function (t) {
                                return t.header.map(function (t) {
                                    return t.text || " "
                                })
                            })), r = [], s = {
                                default: {
                                    color: "#000000",
                                    background: "#FFFFFF",
                                    fontSize: 14
                                }
                            }, a = [], l = {}, c = this._view.data.serialize().map(function (t, o) {
                                return n[t.id] = o, e.map(function (e, n) {
                                    return l[e.id] = n, i.removeHTMLTags(t[e.id])
                                })
                            }), u = 0, d = e; u < d.length; u++) {
                            var f = d[u];
                            for (var h in r.push({
                                    width: f.width
                                }), f.$cellCss) {
                                var p = f.$cellCss[h],
                                    g = p.split("").reduce(function (t, e) {
                                        var n = (t << 5) - t + e.charCodeAt(0);
                                        return Math.abs(n & n)
                                    }, 0).toString();
                                if (!s[g]) {
                                    var v = document.body,
                                        _ = i.getStyleByClass(p, v, "dhx_grid_row", s.default);
                                    _ && (s[g] = _)
                                }
                                s[g] && a.push([n[h], f.id, g])
                            }
                        }
                        var m = {
                            name: t.name || "data",
                            columns: r,
                            header: o,
                            data: c,
                            styles: {
                                cells: a,
                                css: s
                            }
                        };
                        if (t.url) {
                            var y = document.createElement("form");
                            y.setAttribute("target", "_blank"), y.setAttribute("action", t.url), y.setAttribute("method", "POST"), y.style.visibility = "hidden";
                            var w = document.createElement("textarea");
                            w.setAttribute("name", "data"), w.value = JSON.stringify(m), y.appendChild(w), document.body.appendChild(y), y.submit(), setTimeout(function () {
                                y.parentNode.removeChild(y)
                            }, 100)
                        }
                        return m
                    }, t
                }();
            e.Exporter = o
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__assign || function () {
                    return (i = Object.assign || function (t) {
                        for (var e, n = 1, i = arguments.length; n < i; n++)
                            for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                        return t
                    }).apply(this, arguments)
                },
                o = this && this.__spreadArrays || function () {
                    for (var t = 0, e = 0, n = arguments.length; e < n; e++) t += arguments[e].length;
                    var i = Array(t),
                        o = 0;
                    for (e = 0; e < n; e++)
                        for (var r = arguments[e], s = 0, a = r.length; s < a; s++, o++) i[o] = r[s];
                    return i
                };
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var r = n(0),
                s = n(3),
                a = n(38),
                l = n(14),
                c = n(67),
                u = n(68);

            function d(t, e) {
                var n, s, a = u.getRows(t, e),
                    l = u.getSpans(t, e),
                    c = t.splitAt >= 0 && u.getRows(i(i({}, t), {
                        currentColumns: t.columns.slice(0, t.splitAt),
                        positions: i(i({}, t.positions), {
                            xStart: 0,
                            xEnd: t.splitAt
                        })
                    }), e),
                    d = ((n = {
                        position: "sticky"
                    })[e.position] = 0, n);
                return e.sticky || (d.left = -t.scroll.left, s = -t.scroll.left, d.position = "relative"), r.el(".dhx_" + e.name + "_wrapper", {
                    class: e.sticky ? "" : "dhx_compatible_" + e.name,
                    style: i(i({}, d), {
                        left: e.sticky ? s : 0,
                        height: t[e.name + "Height"],
                        width: e.sticky ? t.$totalWidth : e.wrapper.width - 2,
                        zIndex: 9999
                    })
                }, [r.el(".dhx_grid_" + e.name, {
                    style: {
                        height: t[e.name + "Height"],
                        left: s,
                        paddingLeft: e.shifts.x,
                        width: t.$totalWidth
                    }
                }, o(a, [r.el(".dhx_" + e.name + "_spans", {
                    style: {
                        marginLeft: -e.shifts.x
                    }
                }, l), c && r.el(".dhx_" + e.name + "_fixed_cols", {
                    style: {
                        position: "absolute",
                        top: 0,
                        left: t.scroll.left + "px",
                        height: "100%"
                    }
                }, c)])), r.el("div", {
                    style: {
                        width: t.$totalWidth
                    }
                })])
            }
            e.render = function (t, e, n) {
                if (t && t.node && t.node.parent && t.node.parent.el) {
                    var o = t.node.parent.el;
                    e.config.width = o.clientWidth || 1, e.config.height = o.clientHeight || 1
                }
                var u = e.config;
                if (!e.data || !u.columns.length) return r.el(".dhx_grid");
                u.$totalHeight = n.length * u.rowHeight;
                var f = {
                        width: u.width ? u.width : e._container.clientWidth,
                        height: u.height ? u.height : e._container.clientHeight
                    },
                    h = function (t, e, n) {
                        var o = t.config,
                            r = a.calculatePositions(n.width, n.height, t._scroll, o);
                        return i(i({}, o), {
                            data: e,
                            scroll: t._scroll,
                            positions: r,
                            headerHeight: o.$headerLevel * o.headerRowHeight,
                            footerHeight: 40,
                            firstColId: o.columns[0].id,
                            events: t.events,
                            currentColumns: o.columns.slice(r.xStart, r.xEnd),
                            sortBy: t._sortBy,
                            sortDir: t._sortDir
                        })
                    }(e, n, f),
                    p = c.getShifts(h),
                    g = c.getContent(h),
                    v = c.getContentSpans(h),
                    _ = h.splitAt >= 0 && function (t) {
                        var e = t.columns.slice(0, t.splitAt);
                        return t.fixedColumnsWidth = e.reduce(function (t, e) {
                            return t + (e.width || 100)
                        }, 0), c.getContent(i(i({}, t), {
                            columns: e,
                            positions: i(i({}, t.positions), {
                                xStart: 0,
                                xEnd: t.splitAt
                            })
                        }))
                    }(h),
                    m = l.isCssSupport("position", "sticky"),
                    y = f.height - 2;
                y = m ? y : y - h.headerHeight;
                var w = h.$footer;
                y = w ? m ? y : y - h.footerHeight : y;
                var x = d(h, {
                        wrapper: f,
                        sticky: m,
                        shifts: p,
                        name: "header",
                        position: "top"
                    }),
                    b = w ? d(h, {
                        wrapper: f,
                        sticky: m,
                        shifts: p,
                        name: "footer",
                        position: "bottom"
                    }) : null,
                    C = u.$totalWidth <= f.width ? 0 : s.getScrollbarWidth(),
                    k = (m ? y : y + h.headerHeight) - C;
                return r.el(".dhx_grid", [r.resizer(function () {
                    return e.paint()
                }), r.el(".dhx_grid_content", {
                    style: i({}, f),
                    onclick: e._htmlEvents.onclick
                }, [m ? null : x, r.el(".dhx_grid_body", {
                    style: {
                        height: y,
                        width: f.width - 2
                    },
                    onscroll: e._htmlEvents.onscroll,
                    _ref: "grid_body"
                }, [m ? x : null, r.el(".dhx_data_wrap", {
                    style: {
                        height: u.$totalHeight,
                        width: u.$totalWidth,
                        "padding-left": p.x,
                        "padding-top": p.y
                    }
                }, [r.el(".dhx_grid_data", g), r.el(".dhx_grid_spans", v), r.el(".dhx_grid_selection", {
                    _ref: "selection"
                })]), m ? b : null]), _ && r.el(".dhx_grid_fixed_cols_wrap", {
                    style: {
                        height: k,
                        paddingTop: h.headerHeight,
                        overflow: "hidden",
                        width: h.fixedColumnsWidth
                    }
                }, [r.el(".dhx_grid_fixed_cols", {
                    style: {
                        top: -h.scroll.top + h.headerHeight + "px",
                        paddingTop: p.y,
                        height: u.$totalHeight,
                        position: "absolute"
                    }
                }, _)]), m ? null : b])])
            }
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(2),
                o = n(0),
                r = n(14),
                s = n(19);

            function a(t, e, n, i) {
                n.events.fire(s.GridEvents.cellClick, [t, e, i])
            }

            function l(t, e, n, i) {
                n.events.fire(s.GridEvents.cellMouseDown, [t, e, i])
            }

            function c(t, e, n, i) {
                n.events.fire(s.GridEvents.cellRightClick, [t, e, i])
            }

            function u(t, e, n, i) {
                n.events.fire(s.GridEvents.cellMouseOver, [t, e, i])
            }

            function d(t, e, n, i) {
                n.events.fire(s.GridEvents.cellDblClick, [t, e, i])
            }
            e.getContent = function (t) {
                if (!t.data || !t.columns) return [];
                var e = t.positions,
                    n = t.data ? t.data.slice(e.yStart, e.yEnd) : [],
                    i = t.columns.slice(e.xStart, e.xEnd);
                return n.map(function (e) {
                    var n = "";
                    return t.rowCss && (n = t.rowCss(e)), e.$css && (n += e.$css), o.el(".dhx_grid_row", {
                        style: {
                            height: t.rowHeight
                        },
                        dhx_grid_row: e.id,
                        class: n
                    }, i.map(function (n) {
                        var i = (n.template || function (t, e, n) {
                            return t || 0 === t ? t : ""
                        })(e[n.id], e, n);
                        return i = "string" == typeof i ? o.el("div.dhx_cell_content", {
                            ".innerHTML": i
                        }) : i, "tree" === t.type && t.firstColId === n.id ? function (t, e, n, i) {
                            return o.el(".dhx_grid_cell", {
                                class: "dhx_tree_cell " + (n.$cellCss[e.id] || "") + " " + (e.$childs ? "dhx_grid_expand_cell" : ""),
                                style: {
                                    width: n.width,
                                    lineHeight: i.rowHeight + "px",
                                    paddingLeft: 24 * e.$level
                                },
                                dhx_id: e.id
                            }, [e.$childs ? o.el(".dhx_grid_expand_cell_icon", {
                                class: e.$opened ? "dxi dxi-chevron-up" : "dxi dxi-chevron-down",
                                dhx_id: e.id,
                                style: {
                                    lineHeight: i.rowHeight + "px"
                                }
                            }) : null, o.el(".dhx_tree_cell", {
                                title: r.removeHTMLTags(e[n.id]),
                                style: {
                                    width: n.width - 10 * e.$level,
                                    height: "100%",
                                    textAlign: "left"
                                }
                            }, [t])])
                        }(i, e, n, t) : o.el(".dhx_grid_cell", {
                            class: ((n.$cellCss[e.id] || "") + " dhx_" + n.type + "_cell").replace(/\s+/g, " "),
                            style: {
                                width: n.width,
                                lineHeight: t.rowHeight + "px"
                            },
                            onclick: [a, e, n, t],
                            onmousedown: [l, e, n, t],
                            oncontextmenu: [c, e, n, t],
                            ondblclick: [d, e, n, t],
                            onmouseover: [u, e, n, t],
                            title: r.removeHTMLTags(e[n.id])
                        }, [i])
                    }))
                })
            }, e.getContentSpans = function (t) {
                var e = [],
                    n = t.columns;
                if (!n.length) return null;
                if (!t.spans) return null;
                for (var r = t.spans.sort(function (t, e) {
                        return t.row - e.row
                    }), s = t.rowHeight, a = function (a) {
                        var l = r[a].row,
                            c = r[a].column,
                            u = r[a].rowspan;
                        if (1 === u) return "continue";
                        for (var d = i.findIndex(n, function (t) {
                                return t.id === c
                            }), f = n[d], h = i.findIndex(t.data, function (t) {
                                return t.id === l
                            }), p = t.data[h], g = void 0 === p[c] ? "" : p[c], v = t.rowHeight * h, _ = 0, m = d - 1; m >= 0; m--) _ += n[m].width;
                        var y = f.header[0].text ? "dhx_span_cell" : "dhx_span_cell dhx_span_cell--title";
                        0 === h && (y += " dhx_span_first_row"), 0 === d && (y += " dhx_span_first_col"), d === n.length - 1 && (y += " dhx_span_last_col"), e.push(o.el("div", {
                            class: y,
                            style: {
                                width: f.width,
                                height: u * s,
                                top: v,
                                left: _,
                                lineHeight: t.rowHeight + "px"
                            }
                        }, g))
                    }, l = 0; l < r.length; l++) a(l);
                return e
            }, e.getShifts = function (t) {
                return {
                    x: t.columns.slice(0, t.positions.xStart).reduce(function (t, e) {
                        return t + e.width
                    }, 0),
                    y: t.positions.yStart * t.rowHeight
                }
            }
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__assign || function () {
                return (i = Object.assign || function (t) {
                    for (var e, n = 1, i = arguments.length; n < i; n++)
                        for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                    return t
                }).apply(this, arguments)
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = n(0),
                r = n(14),
                s = n(39);

            function a(t, e, n) {
                return {
                    onclick: [l, t, e, n],
                    onmouseover: [l, t, e, n],
                    onmousedown: [l, t, e, n],
                    ondblclick: [l, t, e, n]
                }
            }

            function l(t, e, n, i) {
                n.events.fire(e + "Cell" + i.type, [t, i])
            }
            e.getRows = function (t, e) {
                if (!t.data || !t.columns) return [];
                var n = e.name,
                    l = t.currentColumns,
                    c = t[n + "RowHeight"] || 40,
                    u = function (t, e) {
                        var n = t.map(function (t) {
                            return t[e] || [{}]
                        });
                        return r.transpose(n)
                    }(l, n);
                return u.map(function (e, d) {
                    return o.el(".dhx_" + n + "_row", {
                        style: {
                            height: c
                        }
                    }, e.map(function (e, f) {
                        var h = e.css || "",
                            p = d === u.length - 1,
                            g = l[f];
                        return t.sortBy && "" + g.id === t.sortBy && p && (h += " dhx_sort dhx_sort--" + (t.sortDir || "asc")), h += " dhx_" + (g.type || "string") + "_cell ", e.content ? function (t, e, n, r, l) {
                            void 0 === l && (l = "");
                            var c = n[name + "RowHeight"] || 40;
                            return o.el(".dhx_grid_" + r + "_cell", i({
                                class: l,
                                style: {
                                    width: e.width,
                                    lineHeight: c + "px"
                                }
                            }, a(e, r, n)), [s.content[t.content].toHtml(e, n)])
                        }(e, g, t, n, h) : o.el(".dhx_grid_" + n + "_cell", i(i({
                            class: h,
                            dhx_id: g.id,
                            _key: f,
                            style: {
                                width: g.width,
                                lineHeight: c + "px"
                            }
                        }, a(g, n, t)), {
                            title: r.removeHTMLTags(e.text),
                            ".innerHTML": e.text
                        }))
                    }))
                })
            }, e.getSpans = function (t, e) {
                var n = t.columns,
                    i = r.transpose(n.map(function (t) {
                        return t[e.name] || []
                    })),
                    s = t[name + "RowHeight"] || 40,
                    a = 0;
                return i.map(function (e, i) {
                    return a = 0, o.el(".dhx_span_row", {
                        style: {
                            top: s * i + "px",
                            height: s
                        }
                    }, e.map(function (e, l) {
                        return a += n[l].width, e.colspan ? o.el(".dhx_span_cell", {
                            style: {
                                width: function (t, e, n) {
                                    return t.reduce(function (t, i, o) {
                                        return t += o >= n && o < n + e ? i.width : 0
                                    }, 0)
                                }(t.columns, e.colspan, l),
                                height: s,
                                left: a - n[l].width,
                                top: s * i,
                                lineHeight: s + "px"
                            },
                            title: r.removeHTMLTags(e.text),
                            ".innerHTML": e.text
                        }) : null
                    }).filter(function (t) {
                        return !!t
                    }))
                })
            }
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__extends || function () {
                    var t = function (e, n) {
                        return (t = Object.setPrototypeOf || {
                                __proto__: []
                            }
                            instanceof Array && function (t, e) {
                                t.__proto__ = e
                            } || function (t, e) {
                                for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                            })(e, n)
                    };
                    return function (e, n) {
                        function i() {
                            this.constructor = e
                        }
                        t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
                    }
                }(),
                o = this && this.__assign || function () {
                    return (o = Object.assign || function (t) {
                        for (var e, n = 1, i = arguments.length; n < i; n++)
                            for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                        return t
                    }).apply(this, arguments)
                };
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var r = n(2),
                s = function (t) {
                    function e(e, n) {
                        return t.call(this, e, n) || this
                    }
                    return i(e, t), e.prototype.eachChild = function (e, n, i, o) {
                        void 0 === i && (i = !0), o = o || function (t) {
                            return !1 !== t.$opened
                        }, t.prototype.eachChild.call(this, e, n, i, o)
                    }, e.prototype.getMaxLevel = function () {
                        var t = this,
                            e = 1;
                        return this.map(function (n) {
                            var i = t.getLevel(n.id);
                            e = Math.max(i, e)
                        }), e
                    }, e.prototype.getLevel = function (t) {
                        var e = 0;
                        return this.eachParent(t, function () {
                            e++
                        }), e
                    }, e.prototype.serialize = function () {
                        var t = this,
                            e = [];
                        return this.eachChild(this.getRoot(), function (n) {
                            if (n) {
                                var i = o(o({}, n), {
                                    $level: t.getLevel(n.id),
                                    $childs: t.haveChilds(n.id)
                                });
                                t.haveChilds(n.id) && void 0 === n.$opened && (n.$opened = i.$opened = !0), e.push(i)
                            }
                        }), e
                    }, e.prototype.map = function (t, e, n) {
                        void 0 === e && (e = this._root), void 0 === n && (n = !0);
                        var i = [];
                        if (!this.haveChilds(e)) return i;
                        for (var o = 0; o < this._childs[e].length; o++)
                            if (i.push(t.call(this, this._childs[e][o], o)), n && this._childs[e][o].$opened) {
                                var r = this.map(t, this._childs[e][o].id, n);
                                i = i.concat(r)
                            } return i
                    }, e.prototype.getId = function (t) {
                        return Object.keys(this._pull)[t]
                    }, e.prototype._parse_data = function (t, e) {
                        void 0 === e && (e = this._root);
                        for (var n = 0, i = t; n < i.length; n++) {
                            var o = i[n];
                            this.config.init && (o = this.config.init(o)), o.id = o.id ? o.id.toString() : r.uid(), o.parent = o.parent ? o.parent.toString() : e, this._pull[o.id] = o, this._childs[o.parent] || (this._childs[o.parent] = []), this._childs[o.parent].push(o), o.$level = this.getLevel(o.id), o.childs && o.childs instanceof Object && this._parse_data(o.childs, o.id)
                        }
                        this._checkChilds()
                    }, e.prototype._checkChilds = function () {
                        var t = this;
                        this.eachChild(this._root, function (e) {
                            e.$childs = t.haveChilds(e.id)
                        })
                    }, e
                }(n(11).TreeCollection);
            e.TreeGridCollection = s
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                    value: !0
                }),
                function (t) {
                    for (var n in t) e.hasOwnProperty(n) || (e[n] = t[n])
                }(n(71))
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__extends || function () {
                var t = function (e, n) {
                    return (t = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function (t, e) {
                            t.__proto__ = e
                        } || function (t, e) {
                            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                        })(e, n)
                };
                return function (e, n) {
                    function i() {
                        this.constructor = e
                    }
                    t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
                }
            }();
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = n(72),
                r = n(0),
                s = function (t) {
                    function e(e, n) {
                        var i = t.call(this, e, n) || this;
                        if (i._root = i.config.parent || i, i._all = {}, i._parseConfig(), i.config.views && (i.config.activeView = i.config.activeView || i._cells[0].id, i._isViewLayout = !0), i._css += (n.parent ? "" : " dhx_widget") + (i._xLayout ? " layout_x" : " layout_y"), !n.parent) {
                            var o = r.create({
                                render: function () {
                                    return i.toVDOM()
                                }
                            }, i);
                            i.mount(e, o)
                        }
                        return i
                    }
                    return i(e, t), e.prototype.cell = function (t) {
                        return this._root._all[t]
                    }, e.prototype.toVDOM = function () {
                        if (this._isViewLayout) {
                            var e = [this.cell(this.config.activeView).toVDOM()];
                            return t.prototype.toVDOM.call(this, e)
                        }
                        var n = [];
                        return this._cells.forEach(function (t) {
                            var e = t.toVDOM();
                            Array.isArray(e) ? n.push.apply(n, e) : n.push(e)
                        }), t.prototype.toVDOM.call(this, n)
                    }, e.prototype.removeCell = function (t) {
                        var e = this.config.parent || this;
                        if (e !== this) return e.removeCell(t);
                        var n = this.cell(t);
                        if (n) {
                            var i = n.getParent();
                            delete this._all[t];
                            for (var o = i._cells, r = -1, s = 0; s < o.length; s++)
                                if (o[s].id === t) {
                                    r = s;
                                    break
                                } - 1 !== r && o.splice(r, 1), i.paint()
                        }
                    }, e.prototype.addCell = function (t, e) {
                        void 0 === e && (e = -1);
                        var n = this._createCell(t);
                        e < 0 && (e = this._cells.length + e + 1), this._cells.splice(e, 0, n), this.paint()
                    }, e.prototype.getId = function (t) {
                        return t < 0 && (t = this._cells.length + t), this._cells[t] ? this._cells[t].id : void 0
                    }, e.prototype.getRefs = function (t) {
                        return this._root.getRootView().refs[t]
                    }, e.prototype._parseConfig = function () {
                        var t = this,
                            e = this.config,
                            n = e.rows || e.cols || e.views;
                        this._xLayout = !e.rows, this._cells = n.map(function (e) {
                            return t._createCell(e)
                        })
                    }, e.prototype._createCell = function (t) {
                        var n;
                        return t.rows || t.cols || t.views ? (t.parent = this._root, n = new e(this, t)) : n = new o.Cell(this, t), this._root._all[n.id] = n, n
                    }, e
                }(o.Cell);
            e.Layout = s
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__extends || function () {
                    var t = function (e, n) {
                        return (t = Object.setPrototypeOf || {
                                __proto__: []
                            }
                            instanceof Array && function (t, e) {
                                t.__proto__ = e
                            } || function (t, e) {
                                for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                            })(e, n)
                    };
                    return function (e, n) {
                        function i() {
                            this.constructor = e
                        }
                        t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
                    }
                }(),
                o = this && this.__assign || function () {
                    return (o = Object.assign || function (t) {
                        for (var e, n = 1, i = arguments.length; n < i; n++)
                            for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                        return t
                    }).apply(this, arguments)
                };
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var r, s = n(2),
                a = n(0),
                l = n(8);
            ! function (t) {
                t[t.unknown = 0] = "unknown", t[t.percents = 1] = "percents", t[t.pixels = 2] = "pixels", t[t.mixedpx1 = 3] = "mixedpx1", t[t.mixedpx2 = 4] = "mixedpx2", t[t.mixedperc1 = 5] = "mixedperc1", t[t.mixedperc2 = 6] = "mixedperc2"
            }(r || (r = {}));
            var c = function (t) {
                function e(e, n) {
                    var i = t.call(this, e, n) || this,
                        o = e;
                    return o && o.isVisible && (i._parent = o), i._initHandlers(), i.id = i.config.id || s.uid(), i._css = "", i
                }
                return i(e, t), e.prototype.paint = function () {
                    if (this.isVisible()) {
                        var t = this.getRootView();
                        t ? t.redraw() : this._parent.paint()
                    }
                }, e.prototype.isVisible = function () {
                    if (!this._parent) return !(!this._container || !this._container.tagName);
                    var t = this._parent.config.activeView;
                    return (!t || t === this.id) && (!this.config.hidden && (!this._parent || this._parent.isVisible()))
                }, e.prototype.hide = function () {
                    this.config.hidden = !0, this._parent && this._parent.paint && this._parent.paint()
                }, e.prototype.show = function () {
                    this._parent && this._parent.config.activeView ? this._parent.config.activeView = this.id : this.config.hidden = !1, this._parent && !this._parent.isVisible() && this._parent.show(), this.paint()
                }, e.prototype.getParent = function () {
                    return this._parent
                }, e.prototype.destructor = function () {
                    this.config = null
                }, e.prototype.getWidget = function () {
                    return this._ui
                }, e.prototype.attach = function (t, e) {
                    return "object" == typeof t ? this._ui = t : "string" == typeof t ? this._ui = new window.dhx[t](null, e) : "function" == typeof t && (t.prototype instanceof l.View ? this._ui = new t(null, e) : this._ui = {
                        getRootView: function () {
                            return t(e)
                        }
                    }), this.paint(), this._ui
                }, e.prototype.toVDOM = function (t) {
                    if (!this.config.hidden) {
                        var e, n = this._css + " " + (this.config.css || ""),
                            i = this._calculateStyle();
                        if (this.config.html) e = [a.el("div", {
                            ".innerHTML": this.config.html
                        })];
                        else if (this._ui) {
                            var r = this._ui.getRootView();
                            r.render && (r = a.inject(r)), e = [r]
                        } else e = t || null;
                        var s = this.config.canResize && !this._isLastCell() ? a.el(".resizer." + (this._isXDirection() ? "x" : "y"), o(o({}, this._resizerHandlers), {
                                _ref: "resizer_" + this._uid
                            }), [a.el("div", {
                                class: "dxi " + (this._isXDirection() ? "dxi-dots-vertical" : "dxi-dots-horizontal")
                            })]) : null,
                            l = {};
                        if (this.config.on)
                            for (var c in this.config.on) l["on" + c] = this.config.on[c];
                        var u = a.el("div", o(o({
                            _key: this._uid,
                            style: i,
                            _ref: this._uid
                        }, l), {
                            class: "dhx_cell " + n + (this.config.collapsed ? " collapsed" : "")
                        }), [this.config.header ? a.el("div", {
                            class: "dhx_cell_header",
                            onclick: this._handlers.collapse
                        }, [a.el(".header-text", this.config.header), a.el(".header-action-icon", [a.el("div", {
                            class: "dxi " + this.config.headerIcon
                        })])]) : null, this.config.collapsed ? null : a.el("div", {
                            class: "dhx_cell_content"
                        }, e), this.config.footer ? a.el("div", {
                            class: "dhx_cell_footer"
                        }, this.config.footer) : null]);
                        return s ? [u, s] : u
                    }
                }, e.prototype._initHandlers = function () {
                    var t = this,
                        e = {
                            left: null,
                            top: null,
                            isActive: !1,
                            range: null,
                            xLayout: null,
                            nextCell: null,
                            size: null,
                            resizerLength: null,
                            mode: null,
                            percentsum: null
                        },
                        n = function () {
                            e.isActive = !1, document.body.classList.remove("dhx-no-select"), document.removeEventListener("mouseup", n), document.removeEventListener("mousemove", i)
                        },
                        i = function (n) {
                            if (e.isActive && e.mode !== r.unknown) {
                                var i = e.xLayout ? n.x - e.range.min - window.pageXOffset : n.y - e.range.min - window.pageYOffset,
                                    o = e.xLayout ? "width" : "height";
                                switch (i < 0 ? i = e.resizerLength / 2 : i > e.size && (i = e.size - e.resizerLength), e.mode) {
                                    case r.pixels:
                                        t.config[o] = i - e.resizerLength / 2 + "px", e.nextCell.config[o] = e.size - i - e.resizerLength / 2 + "px";
                                        break;
                                    case r.mixedpx1:
                                        t.config[o] = i - e.resizerLength / 2 + "px";
                                        break;
                                    case r.mixedpx2:
                                        e.nextCell.config[o] = e.size - i - e.resizerLength / 2 + "px";
                                        break;
                                    case r.percents:
                                        t.config[o] = i / e.size * e.percentsum + "%", e.nextCell.config[o] = (e.size - i) / e.size * e.percentsum + "%";
                                        break;
                                    case r.mixedperc1:
                                        t.config[o] = i / e.size * e.percentsum + "%";
                                        break;
                                    case r.mixedperc2:
                                        e.nextCell.config[o] = (e.size - i) / e.size * e.percentsum + "%"
                                }
                                t.paint()
                            }
                        };
                    this._handlers = {
                        collapse: function () {
                            t.config.canCollapse && (t.config.collapsed = !t.config.collapsed, t.paint())
                        }
                    }, this._resizerHandlers = {
                        onmousedown: function (o) {
                            if (3 !== o.which) {
                                e.isActive && n(), document.body.classList.add("dhx-no-select");
                                var s = t._getCellView(),
                                    a = t._getNextCell(),
                                    l = a._getCellView(),
                                    c = t._getResizerView(),
                                    u = s.el.getBoundingClientRect(),
                                    d = c.el.getBoundingClientRect(),
                                    f = l.el.getBoundingClientRect();
                                if (e.xLayout = t._isXDirection(), e.left = u.left + window.pageXOffset, e.top = u.top + window.pageYOffset, e.range = function (t, e, n) {
                                        return void 0 === n && (n = !0), n ? {
                                            min: t.left + window.pageXOffset,
                                            max: e.right + window.pageXOffset
                                        } : {
                                            min: t.top + window.pageYOffset,
                                            max: e.bottom + window.pageYOffset
                                        }
                                    }(u, f, e.xLayout), e.size = e.range.max - e.range.min, e.isActive = !0, e.nextCell = a, e.resizerLength = e.xLayout ? d.width : d.height, e.mode = function (t, e, n) {
                                        var i = t ? "width" : "height",
                                            o = e[i] && -1 !== e[i].indexOf("%"),
                                            s = n[i] && -1 !== n[i].indexOf("%"),
                                            a = e[i] && -1 !== e[i].indexOf("px"),
                                            l = n[i] && -1 !== n[i].indexOf("px");
                                        return o && s ? r.percents : a && l ? r.pixels : a && !l ? r.mixedpx1 : l && !a ? r.mixedpx2 : o ? r.mixedperc1 : s ? r.mixedperc2 : r.unknown
                                    }(e.xLayout, t.config, a.config), e.mode === r.percents) {
                                    var h = e.xLayout ? "width" : "height";
                                    e.percentsum = parseFloat(t.config[h]) + parseFloat(a.config[h])
                                }
                                if (e.mode === r.mixedperc1) {
                                    h = e.xLayout ? "width" : "height";
                                    e.percentsum = 1 / (u[h] / (e.size - e.resizerLength)) * parseFloat(t.config[h])
                                }
                                if (e.mode === r.mixedperc2) {
                                    h = e.xLayout ? "width" : "height";
                                    e.percentsum = 1 / (f[h] / (e.size - e.resizerLength)) * parseFloat(a.config[h])
                                }
                                document.addEventListener("mouseup", n), document.addEventListener("mousemove", i)
                            }
                        },
                        ondragstart: function (t) {
                            return t.preventDefault()
                        }
                    }
                }, e.prototype._isLastCell = function () {
                    var t = this._parent;
                    return t && t._cells.indexOf(this) === t._cells.length - 1
                }, e.prototype._getNextCell = function () {
                    var t = this._parent,
                        e = t._cells.indexOf(this);
                    return t._cells[e + 1]
                }, e.prototype._getCellView = function () {
                    return this._parent.getRefs(this._uid)
                }, e.prototype._getResizerView = function () {
                    return this._parent.getRefs("resizer_" + this._uid)
                }, e.prototype._isXDirection = function () {
                    return this._parent && this._parent._xLayout
                }, e.prototype._calculateStyle = function () {
                    var t = this.config,
                        e = {};
                    return this._isXDirection() ? (void 0 !== this.config.width && (e.flex = "0 0 " + t.width), void 0 !== t.height && (e.height = t.height)) : (void 0 !== this.config.height && (e.flex = "0 0 " + t.height), void 0 !== t.width && (e.width = t.width)), e
                }, e
            }(l.View);
            e.Cell = c
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(0),
                o = n(5);
            e.button = function (t) {
                return i.el("div", {
                    class: "button-container main-btn element" + o.getCss(t) + (t.value ? "" : " no-text"),
                    dhx_id: t.id
                }, [o.counter(t), t.icon ? o.icon(t.icon) : null, t.value ? i.el(".button-text", t.value) : null])
            }
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(0),
                o = n(5);
            e.customHTMLButton = function (t) {
                return i.el("div", {
                    class: "button-container custom-html-btn element" + o.getCss(t),
                    dhx_id: t.id
                }, [o.counter(t), i.el(".html-content", {
                    ".innerHTML": t.html
                }), t.value ? i.el(".button-text", t.value) : null])
            }
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(0),
                o = n(5);
            e.dhx_button = function (t) {
                return i.el("button", {
                    class: "dhx_btn" + o.getCss(t) + o.getButtonCss(t),
                    dhx_id: t.id
                }, [t.icon ? o.icon(t.icon) : null, t.value ? i.el(".item-value", t.value) : null])
            }
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(0),
                o = n(5);
            e.iconButton = function (t) {
                return i.el("div", {
                    class: "icon-btn element" + o.getCss(t),
                    dhx_id: t.id
                }, [o.counter(t), o.icon(t.icon), t.css && -1 !== t.css.indexOf("ripple") ? i.el(".ripple-container-outside") : null])
            }
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(0),
                o = n(5);
            e.imageButton = function (t) {
                return i.el("div", {
                    class: "button-container img-btn element" + o.getCss(t),
                    dhx_id: t.id
                }, [o.counter(t), i.el(".img-button-wrapper", [i.el("img.img-button", {
                    src: t.src
                })])])
            }
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(0),
                o = n(5);
            e.imageButtonText = function (t) {
                return i.el("div", {
                    class: "button-container img-text-btn element" + o.getCss(t),
                    dhx_id: t.id
                }, [o.counter(t), i.el("img.img-button", {
                    src: t.src
                }), i.el(".button-text", t.value)])
            }
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(0),
                o = n(9),
                r = n(5);
            e.input = function (t, e) {
                return i.el("div", {
                    dhx_id: t.id,
                    class: "input-container element" + r.getCss(t)
                }, [i.el(".input-wrapper", [i.el("input.text-input", {
                    placeholder: t.placeholder,
                    value: t.value,
                    style: {
                        width: t.width ? t.width : null
                    },
                    _hooks: {
                        didInsert: function (n) {
                            e && e.fire(o.ToolbarEvents.inputCreated, [t.id, n.el])
                        }
                    },
                    _key: t.id
                }), i.el(".input-animation")]), t.icon ? r.icon(t.icon) : null])
            }
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(0),
                o = n(5);
            e.menuItem = function (t) {
                return i.el("div", {
                    class: "menu-item element" + o.getCss(t),
                    dhx_id: t.id
                }, [t.icon ? o.icon(t.icon) : null, t.value ? i.el("span.menu-item-content", t.value) : null, t.$openIcon ? i.el(".dhx-icon.sub-menu-opener", [i.el(".dxi." + ("right" === t.$openIcon ? ".dxi-menu-right" : ".dxi-menu-down"))]) : null, t.hotkey ? i.el(".hotkey", t.hotkey) : null])
            }
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(0);
            e.separator = function (t) {
                return i.el(".separator")
            }
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(0);
            e.spacer = function (t) {
                return i.el(".spacer")
            }
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(0),
                o = n(5);
            e.text = function (t) {
                return i.el("div", {
                    class: "text element" + o.getCss(t),
                    dhx_id: t.id
                }, t.value)
            }
        }, function (t, e, n) {
            "use strict";

            function i(t) {
                for (var e = t.toLowerCase().match(/\w+/g), n = 0, i = "", o = 0; o < e.length; o++) {
                    var r = e[o];
                    "ctrl" === r ? n += 4 : "shift" === r ? n += 2 : "alt" === r ? n += 1 : i = r
                }
                return n + i
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = function () {
                function t() {
                    var t = this;
                    this._keysStorage = {}, document.addEventListener("keydown", function (e) {
                        var n = (e.ctrlKey ? 4 : 0) + (e.shiftKey ? 2 : 0) + (e.altKey ? 1 : 0) + e.key.toLowerCase(),
                            i = t._keysStorage[n];
                        i && i.handler(e)
                    })
                }
                return t.prototype.addHotKey = function (t, e, n) {
                    var o = i(t);
                    this._keysStorage[o] = {
                        handler: e,
                        scope: n
                    }
                }, t.prototype.removeHotKey = function (t, e) {
                    var n = this._keysStorage;
                    t && delete n[o = i(t)];
                    if (e)
                        for (var o in n) n[o].scope === e && delete n[o]
                }, t.prototype.exist = function (t) {
                    var e = i(t);
                    return !!this._keysStorage[e]
                }, t
            }();
            e.keyManager = new o
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__extends || function () {
                var t = function (e, n) {
                    return (t = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function (t, e) {
                            t.__proto__ = e
                        } || function (t, e) {
                            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                        })(e, n)
                };
                return function (e, n) {
                    function i() {
                        this.constructor = e
                    }
                    t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
                }
            }();
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = n(3),
                r = n(21),
                s = function (t) {
                    function e() {
                        var e = null !== t && t.apply(this, arguments) || this;
                        return e._isContextMenu = !0, e
                    }
                    return i(e, t), e.prototype.showAt = function (t, e) {
                        if (void 0 === e && (e = "bottom"), t instanceof MouseEvent) this._changeActivePosition({
                            left: window.pageXOffset + t.x + 1,
                            right: window.pageXOffset + t.x + 1,
                            top: window.pageYOffset + t.y,
                            bottom: window.pageYOffset + t.y
                        }, e);
                        else {
                            var n = o.toNode(t);
                            this._changeActivePosition(r.getRealPosition(n), e)
                        }
                    }, e.prototype._close = function () {
                        this._activeMenu = null, this._changeActivePosition(null, null)
                    }, e.prototype._normalizeData = function () {
                        var t = this,
                            e = this.data.getRoot();
                        this.data.eachChild(e, function (e) {
                            t.data.haveChilds(e.id) && (e.$openIcon = "right")
                        }, !0)
                    }, e.prototype._getMode = function (t, e, n) {
                        return n ? this._mode : "right"
                    }, e.prototype._changeActivePosition = function (t, e) {
                        this._activePosition = t, this._mode = e, this._listenOuterClick(), this.paint()
                    }, e
                }(n(26).MenuBase);
            e.ContextMenu = s
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__extends || function () {
                    var t = function (e, n) {
                        return (t = Object.setPrototypeOf || {
                                __proto__: []
                            }
                            instanceof Array && function (t, e) {
                                t.__proto__ = e
                            } || function (t, e) {
                                for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                            })(e, n)
                    };
                    return function (e, n) {
                        function i() {
                            this.constructor = e
                        }
                        t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
                    }
                }(),
                o = this && this.__assign || function () {
                    return (o = Object.assign || function (t) {
                        for (var e, n = 1, i = arguments.length; n < i; n++)
                            for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                        return t
                    }).apply(this, arguments)
                };
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var r = n(0),
                s = function (t) {
                    function e(e, n) {
                        var i = t.call(this, e, n) || this;
                        return i.mount(e, r.create({
                            render: function () {
                                return i._draw()
                            }
                        })), i
                    }
                    return i(e, t), e.prototype._draw = function () {
                        return r.el("div", o({
                            dhx_widget_id: this._uid,
                            class: "main-menu"
                        }, this._handlers), this._drawMenuItems(this.data.getRoot()))
                    }, e
                }(n(26).MenuBase);
            e.Menu = s
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__extends || function () {
                var t = function (e, n) {
                    return (t = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function (t, e) {
                            t.__proto__ = e
                        } || function (t, e) {
                            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                        })(e, n)
                };
                return function (e, n) {
                    function i() {
                        this.constructor = e
                    }
                    t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
                }
            }();
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = n(0),
                r = n(21),
                s = n(40),
                a = n(9),
                l = function (t) {
                    function e() {
                        return null !== t && t.apply(this, arguments) || this
                    }
                    return i(e, t), e.prototype._draw = function () {
                        var t = this;
                        return o.el(".ribbon.dhx_widget", {
                            dhx_widget_id: this._uid,
                            onclick: this._handlers.onclick
                        }, this.data.map(function (e) {
                            return t._drawBlock(e.id)
                        }, this.data.getRoot(), !1))
                    }, e.prototype._setRoot = function (t) {
                        var e = this.data.getParent(t);
                        this.data.getItem(e).type === a.ItemType.block && (this._currentRoot = t)
                    }, e.prototype._normalizeData = function () {
                        var t = this,
                            e = this.data.getRoot(),
                            n = {};
                        this.data.eachChild(e, function (e) {
                            if (e.type === a.ItemType.menuItem && t.data.haveChilds(e.id)) {
                                t.data.eachChild(e.id, function (t) {
                                    return t.type = t.type || a.ItemType.menuItem
                                }, !1);
                                var i = t.data.getParent(e.id),
                                    o = t.data.getItem(i);
                                e.$openIcon = o.type === a.ItemType.block ? "bot" : "right"
                            }
                            e.group && r.addInGroups(n, e)
                        }, !0), this._groups = n
                    }, e.prototype._drawBlock = function (t) {
                        var e = this,
                            n = this.data.getItem(t);
                        if (!n) return null;
                        var i = "row" === n.direction ? " ribbon-row" : " ribbon-cols",
                            r = this.data.map(function (t) {
                                return t.type === a.ItemType.block ? e._drawBlock(t.id) : e._factory(t)
                            }, t, !1);
                        return o.el("div", {
                            class: "ribbon-item-block" + i
                        }, [o.el(".block-content", r), n.label ? o.el(".block-label", [o.el("span", n.label)]) : null])
                    }, e
                }(s.Toolbar);
            e.Ribbon = l
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__assign || function () {
                return (i = Object.assign || function (t) {
                    for (var e, n = 1, i = arguments.length; n < i; n++)
                        for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                    return t
                }).apply(this, arguments)
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = n(2),
                r = n(15),
                s = n(1),
                a = function () {
                    function t(t) {
                        this.config = t
                    }
                    return t.prototype.do = function () {
                        var t = this.config.cell;
                        this._index || (this._index = s.getCellIndex(t).col);
                        var e = i(i({}, this.config.grid.config.columns[1]), {
                            $cellCss: {},
                            header: [{
                                text: ""
                            }]
                        });
                        e.id = o.uid(), this.config.grid.data.map(function (t) {
                            t[e.id] = ""
                        }), this.config.grid.config.columns.splice(this._index, 0, e), r.updateColumns(this.config.grid.config), this.config.spreadsheet.selection.setSelectedCell(t), this.config.grid.paint()
                    }, t.prototype.undo = function () {
                        this.config.grid.config.columns.splice(this._index, 1), r.updateColumns(this.config.grid.config), this.config.spreadsheet.selection.setSelectedCell(this.config.cell)
                    }, t
                }();
            e.AddColumn = a
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__assign || function () {
                return (i = Object.assign || function (t) {
                    for (var e, n = 1, i = arguments.length; n < i; n++)
                        for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                    return t
                }).apply(this, arguments)
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = n(15),
                r = n(1),
                s = function () {
                    function t(t) {
                        this.config = t
                    }
                    return t.prototype.do = function () {
                        var t = this.config.cell;
                        this._index || (this._index = r.getCellIndex(t).row);
                        var e = i({}, this.config.grid.data.getItem(this.config.grid.data.getId(0)));
                        for (var n in e) e[n] = "";
                        this.config.grid.data.add(e, this._index), o.updateRowsIndex(this.config.grid.data), o.removeRowsCss(this.config.grid), this.config.spreadsheet.selection.setSelectedCell(t), this.config.grid.paint()
                    }, t.prototype.undo = function () {
                        this.config.grid.data.remove(this.config.grid.data.getId(this._index)), o.updateRowsIndex(this.config.grid.data), o.removeRowsCss(this.config.grid), this.config.spreadsheet.selection.setSelectedCell(this.config.cell)
                    }, t
                }();
            e.AddRow = s
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__assign || function () {
                return (i = Object.assign || function (t) {
                    for (var e, n = 1, i = arguments.length; n < i; n++)
                        for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                    return t
                }).apply(this, arguments)
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = n(2),
                r = n(15),
                s = n(1),
                a = function () {
                    function t(t) {
                        this.config = t
                    }
                    return t.prototype.do = function () {
                        var t = this.config.cell;
                        if (this._index || (this._index = s.getCellIndex(t).col), this._column = this.config.grid.config.columns.splice(this._index, 1)[0], this.config.grid.config.columns.length <= 1) {
                            var e = i(i({}, this._column), {
                                $cellCss: {},
                                header: [{
                                    text: ""
                                }]
                            });
                            e.id = o.uid(), this.config.grid.config.columns.push(e)
                        }
                        r.updateColumns(this.config.grid.config), this.config.spreadsheet.selection.setSelectedCell(t), this.config.grid.paint()
                    }, t.prototype.undo = function () {
                        this.config.grid.config.columns.splice(this._index, 0, this._column), r.updateColumns(this.config.grid.config), this.config.spreadsheet.selection.setSelectedCell(this.config.cell)
                    }, t
                }();
            e.DeleteColumn = a
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__assign || function () {
                return (i = Object.assign || function (t) {
                    for (var e, n = 1, i = arguments.length; n < i; n++)
                        for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                    return t
                }).apply(this, arguments)
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = n(15),
                r = n(1),
                s = function () {
                    function t(t) {
                        this.config = t
                    }
                    return t.prototype.do = function () {
                        var t = this.config,
                            e = t.row,
                            n = t.cell;
                        if (this._item || (this._item = i({}, this.config.grid.data.getItem(e)), this._index = r.getCellIndex(n).row), this.config.grid.data.remove(e), !this.config.grid.data.getLength()) {
                            var s = this.config.grid.config.columns.reduce(function (t, e) {
                                return t[e.id] = "", t
                            }, {});
                            this.config.grid.data.add(s)
                        }
                        o.updateRowsIndex(this.config.grid.data), this.config.spreadsheet.selection.setSelectedCell(n)
                    }, t.prototype.undo = function () {
                        this.config.grid.data.add(this._item, this._index), o.updateRowsIndex(this.config.grid.data), o.removeRowsCss(this.config.grid), this.config.spreadsheet.selection.setSelectedCell(this.config.cell)
                    }, t
                }();
            e.DeleteRow = s
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__assign || function () {
                return (i = Object.assign || function (t) {
                    for (var e, n = 1, i = arguments.length; n < i; n++)
                        for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                    return t
                }).apply(this, arguments)
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = n(1),
                r = n(22),
                s = function () {
                    function t(t) {
                        this.config = t, this._actions = []
                    }
                    return t.prototype.do = function () {
                        var t = this;
                        if (!this._actions.length) {
                            var e = this.config.val,
                                n = 0;
                            Array.isArray(e) && (e = e[n]), this.config.spreadsheet.eachCell(function (s) {
                                var a = o.getCellIds(t.config.grid, s),
                                    l = a.row,
                                    c = a.col,
                                    u = new r.actions[t.config.action](i(i({}, t.config), {
                                        row: l,
                                        col: c,
                                        cell: s,
                                        val: e
                                    }));
                                t._actions.push(u), Array.isArray(t.config.val) && (n + 1 >= t.config.val.length ? n = 0 : n += 1, e = t.config.val[n])
                            }, this.config.cell)
                        }
                        for (var s = 0, a = this._actions; s < a.length; s++) {
                            a[s].do()
                        }
                        this.config.spreadsheet.selection.setSelectedCell(this.config.cell)
                    }, t.prototype.undo = function () {
                        for (var t = 0, e = this._actions; t < e.length; t++) {
                            e[t].undo()
                        }
                        var n = this.config.cell.split(":")[0];
                        this.config.spreadsheet.selection.setSelectedCell(n)
                    }, t
                }();
            e.GroupAction = s
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__assign || function () {
                return (i = Object.assign || function (t) {
                    for (var e, n = 1, i = arguments.length; n < i; n++)
                        for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                    return t
                }).apply(this, arguments)
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = n(1),
                r = n(22),
                s = function () {
                    function t(t) {
                        this.config = t, this._actions = []
                    }
                    return t.prototype.do = function () {
                        var t = this;
                        if (!this._actions.length) {
                            var e = o.getCellIds(this.config.grid, this.config.cell).start.row,
                                n = this.config.cell.split(":")[0];
                            this.config.spreadsheet.eachCell(function (s) {
                                var a = o.getCellIds(t.config.grid, s),
                                    l = a.row,
                                    c = a.col;
                                if (l === e) {
                                    var u = new r.actions[t.config.action](i(i({}, t.config), {
                                        row: l,
                                        col: c,
                                        cell: n
                                    }));
                                    t._actions.push(u)
                                }
                            }, this.config.cell)
                        }
                        for (var s = this._actions.length - 1; s >= 0; s--) this._actions[s].do()
                    }, t.prototype.undo = function () {
                        for (var t = 0; t < this._actions.length; t++) this._actions[t].undo()
                    }, t
                }();
            e.GroupColAction = s
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__assign || function () {
                return (i = Object.assign || function (t) {
                    for (var e, n = 1, i = arguments.length; n < i; n++)
                        for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                    return t
                }).apply(this, arguments)
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = n(1),
                r = n(22),
                s = function () {
                    function t(t) {
                        this.config = t, this._actions = []
                    }
                    return t.prototype.do = function () {
                        var t = this;
                        if (!this._actions.length) {
                            var e = o.getCellIds(this.config.grid, this.config.cell).start.col,
                                n = this.config.cell.split(":")[0];
                            this.config.spreadsheet.eachCell(function (s) {
                                var a = o.getCellIds(t.config.grid, s),
                                    l = a.row,
                                    c = a.col;
                                if (c === e) {
                                    var u = new r.actions[t.config.action](i(i({}, t.config), {
                                        row: l,
                                        col: c,
                                        cell: n
                                    }));
                                    t._actions.push(u)
                                }
                            }, this.config.cell)
                        }
                        for (var s = this._actions.length - 1; s >= 0; s--) this._actions[s].do()
                    }, t.prototype.undo = function () {
                        for (var t = this._actions.length - 1; t >= 0; t--) this._actions[t].undo()
                    }, t
                }();
            e.GroupRowAction = s
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(1),
                o = n(4),
                r = function () {
                    function t(t) {
                        this.config = t
                    }
                    return t.prototype.do = function () {
                        var t = this.config,
                            e = t.val,
                            n = t.cell;
                        i.getCellInfo(this.config.grid, n).locked = e, e ? this.config.editLine.lock() : this.config.editLine.unlock(), this.config.spreadsheet.events.fire(o.SpreadsheetEvents.afterFocusSet, [n])
                    }, t.prototype.undo = function () {
                        var t = this.config,
                            e = t.val,
                            n = t.cell;
                        i.getCellInfo(this.config.grid, n).locked = !e, this.config.spreadsheet.events.fire(o.SpreadsheetEvents.afterFocusSet, [n]), e ? this.config.editLine.unlock() : this.config.editLine.lock()
                    }, t
                }();
            e.LockCell = r
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(1),
                o = n(4),
                r = function () {
                    function t(t) {
                        this.config = t
                    }
                    return t.prototype.do = function () {
                        var t = this.config.cell,
                            e = i.getCellIds(this.config.grid, t),
                            n = e.row,
                            r = e.col,
                            s = i.getCellInfo(this.config.grid, t);
                        s.locked || (this.config.grid.removeCellCss(n, r, s.css), this.config.prev = s.css, i.updateCellInfo(this.config.grid, t, {
                            css: ""
                        }), this.config.spreadsheet.events.fire(o.SpreadsheetEvents.afterSelectionSet, [t]), this.config.spreadsheet.events.fire(o.SpreadsheetEvents.afterStyleChange, [t]))
                    }, t.prototype.undo = function () {
                        var t = this.config,
                            e = t.row,
                            n = t.col,
                            r = t.cell;
                        i.getCellInfo(this.config.grid, r).locked || (i.updateCellInfo(this.config.grid, r, {
                            css: this.config.prev
                        }), this.config.grid.addCellCss(e, n, this.config.prev), this.config.spreadsheet.events.fire(o.SpreadsheetEvents.afterStyleChange, [r]))
                    }, t
                }();
            e.RemoveCellStyles = r
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(16),
                o = n(1),
                r = n(4),
                s = function () {
                    function t(t) {
                        this.config = t
                    }
                    return t.prototype.do = function () {
                        var t = this.config.cell,
                            e = this.config.val,
                            n = i.getFormat(e);
                        e = n && n.mask || e;
                        var s = o.getCellInfo(this.config.grid, t);
                        s.locked || this.config.spreadsheet.events.fire(r.SpreadsheetEvents.beforeFormatChange, [t, e]) && (this.config.prev = s.format, o.updateCellInfo(this.config.grid, t, {
                            format: e || ""
                        }), this.config.spreadsheet.events.fire(r.SpreadsheetEvents.afterFormatChange, [t, e]), this.config.grid.paint())
                    }, t.prototype.undo = function () {
                        var t = this.config.val,
                            e = this.config.prev;
                        this.config.val = e, this.config.prev = t, this.do(), this.config.val = t, this.config.prev = e
                    }, t
                }();
            e.SetCellFormat = s
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__assign || function () {
                return (i = Object.assign || function (t) {
                    for (var e, n = 1, i = arguments.length; n < i; n++)
                        for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                    return t
                }).apply(this, arguments)
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = n(1),
                r = n(4),
                s = function () {
                    function t(t) {
                        this.config = t
                    }
                    return t.prototype.do = function () {
                        var t = this.config.cell,
                            e = o.getCellIds(this.config.grid, t),
                            n = e.row,
                            s = e.col,
                            a = o.getCellInfo(this.config.grid, t);
                        if (!a.locked) {
                            if ("string" != typeof this.config.val) {
                                var l = dhx.css.get(a.css) || {};
                                Array.isArray(this.config.val) && (this.config.val = this.config.val[0]);
                                var c = dhx.css.add(i(i({}, l), this.config.val));
                                this.config.val = c
                            }
                            var u = this.config.val;
                            this.config.spreadsheet.events.fire(r.SpreadsheetEvents.beforeStyleChange, [t, dhx.css.get(u)]) && (this.config.prev = a.css, this.config.grid.removeCellCss(n, s, a.css), o.updateCellInfo(this.config.grid, t, {
                                css: u
                            }), this.config.grid.addCellCss(n, s, u), this.config.spreadsheet.events.fire(r.SpreadsheetEvents.afterStyleChange, [this.config.cell, dhx.css.get(u)]))
                        }
                    }, t.prototype.undo = function () {
                        var t = this.config.val,
                            e = this.config.prev;
                        this.config.val = e || "", this.config.prev = t || "", this.do(), this.config.val = t, this.config.prev = e
                    }, t
                }();
            e.SetCellStyle = s
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(16),
                o = n(1),
                r = n(4),
                s = function () {
                    function t(t) {
                        this.config = t
                    }
                    return t.prototype.do = function () {
                        var t, e = this.config,
                            n = e.val,
                            s = e.cell,
                            a = o.getCellIds(this.config.grid, s),
                            l = a.row,
                            c = a.col;
                        if (!this.config.spreadsheet.isLocked(s) && this.config.spreadsheet.events.fire(r.SpreadsheetEvents.beforeValueChange, [s, n])) {
                            var u, d = i.getCleanValue(n);
                            if (this.config.spreadsheet.config.autoFormat && i.isNumeric(d)) {
                                var f = o.getCellInfo(this.config.grid, s).format,
                                    h = f || i.detectCellFormat(n);
                                u = !f && h.indexOf("%") > -1 ? (parseFloat(d) / 100).toFixed(4) : d, o.updateCellInfo(this.config.grid, s, {
                                    format: h
                                })
                            } else u = n;
                            this.config.prev = this.config.spreadsheet.getValue(s), this.config.grid.data.update(l, ((t = {})[c] = u, t)), o.updateCellInfo(this.config.grid, s, {
                                nextValue: void 0
                            }), this.config.spreadsheet.selection.setSelectedCell(this.config.cell), this.config.spreadsheet.events.fire(r.SpreadsheetEvents.afterValueChange, [this.config.cell, d])
                        }
                    }, t.prototype.undo = function () {
                        var t = this.config.val,
                            e = this.config.prev;
                        this.config.val = e, this.config.prev = t, this.do(), this.config.val = t, this.config.prev = e
                    }, t
                }();
            e.SetCellValue = s
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(6);
            e.getContextMenuStruct = function () {
                return [{
                    id: "lock",
                    value: i.default.lockCell,
                    icon: "dxi-key"
                }, {
                    id: "clear",
                    value: i.default.clear,
                    icon: "dxi-eraser",
                    childs: [{
                        id: "clear-value",
                        value: i.default.clearValue
                    }, {
                        id: "clear-styles",
                        value: i.default.clearStyles
                    }, {
                        id: "clear-all",
                        value: i.default.clearAll
                    }]
                }, {
                    id: "columns",
                    value: i.default.columns,
                    icon: "dxi-table-column",
                    childs: [{
                        id: "add-col",
                        value: i.default.addColumn,
                        icon: "dxi-table-column-plus-before"
                    }, {
                        id: "remove-col",
                        value: i.default.removeColumn,
                        icon: "dxi-table-column-remove"
                    }]
                }, {
                    id: "rows",
                    value: i.default.rows,
                    icon: "dxi-table-row",
                    childs: [{
                        id: "add-row",
                        value: i.default.addRow,
                        icon: "dxi-table-row-plus-after"
                    }, {
                        id: "remove-row",
                        value: i.default.removeRow,
                        icon: "dxi-table-row-remove"
                    }]
                }]
            }
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(20),
                o = n(23),
                r = n(6);
            e.getMenuStruct = function (t) {
                return [{
                    id: "file",
                    open: !0,
                    value: r.default.file,
                    childs: [{
                        id: "import",
                        value: r.default.importAs,
                        icon: "dxi-file-import",
                        childs: [{
                            id: "import-xlsx",
                            value: "Microsoft Excel(.xlsx)",
                            icon: "dxi-file-excel"
                        }]
                    }, {
                        id: "download",
                        value: r.default.downloadAs,
                        icon: "dxi-file-export",
                        childs: [{
                            id: "export-xlsx",
                            value: "Microsoft Excel(.xlsx)",
                            icon: "dxi-file-excel"
                        }]
                    }]
                }, {
                    id: "edit",
                    value: r.default.edit,
                    childs: [{
                        id: "undo",
                        value: r.default.undo,
                        icon: "dxi-undo"
                    }, {
                        id: "redo",
                        value: r.default.redo,
                        icon: "dxi-redo"
                    }, {
                        type: i.ItemType.separator
                    }, {
                        id: "lock",
                        value: r.default.lockCell,
                        icon: "dxi-key"
                    }, {
                        type: i.ItemType.separator
                    }, {
                        id: "clear",
                        value: r.default.clear,
                        icon: "dxi-eraser",
                        childs: [{
                            id: "clear-value",
                            value: r.default.clearValue
                        }, {
                            id: "clear-styles",
                            value: r.default.clearStyles
                        }, {
                            id: "clear-all",
                            value: r.default.clearAll
                        }]
                    }]
                }, {
                    id: "insert",
                    value: r.default.insert,
                    childs: [{
                        id: "columns",
                        value: r.default.columns,
                        icon: "dxi-table-column",
                        childs: [{
                            id: "add-col",
                            value: r.default.addColumn,
                            icon: "dxi-table-column-plus-before"
                        }, {
                            id: "remove-col",
                            value: r.default.removeColumn,
                            icon: "dxi-table-column-remove"
                        }]
                    }, {
                        id: "rows",
                        value: r.default.rows,
                        icon: "dxi-table-row",
                        childs: [{
                            id: "add-row",
                            value: r.default.addRow,
                            icon: "dxi-table-row-plus-after"
                        }, {
                            id: "remove-row",
                            value: r.default.removeRow,
                            icon: "dxi-table-row-remove"
                        }]
                    }]
                }, {
                    id: "configuration",
                    value: r.default.format,
                    childs: [{
                        id: "font-weight-bold",
                        value: r.default.bold,
                        icon: "dxi-format-bold"
                    }, {
                        id: "font-style-italic",
                        value: r.default.italic,
                        icon: "dxi-format-italic"
                    }, {
                        id: "text-decoration-underline",
                        value: r.default.underline,
                        icon: "dxi-format-underline"
                    }, {
                        type: i.ItemType.separator
                    }, {
                        id: "align",
                        value: r.default.align,
                        childs: [{
                            id: "align-left",
                            value: r.default.left,
                            icon: "dxi-format-align-left"
                        }, {
                            id: "align-center",
                            value: r.default.center,
                            icon: "dxi-format-align-center"
                        }, {
                            id: "align-right",
                            value: r.default.right,
                            icon: "dxi-format-align-right"
                        }]
                    }, {
                        id: "format",
                        type: i.ItemType.menuItem,
                        value: r.default.numberFormat,
                        childs: o.getFormatsDropdown(t)
                    }]
                }, {
                    id: "help",
                    value: r.default.help
                }]
            }
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__spreadArrays || function () {
                for (var t = 0, e = 0, n = arguments.length; e < n; e++) t += arguments[e].length;
                var i = Array(t),
                    o = 0;
                for (e = 0; e < n; e++)
                    for (var r = arguments[e], s = 0, a = r.length; s < a; s++, o++) i[o] = r[s];
                return i
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = n(20),
                r = n(23),
                s = n(6),
                a = {
                    undo: "Z",
                    redo: "Y",
                    bold: "B",
                    italic: "I",
                    underline: "U"
                };

            function l(t) {
                return !!navigator.platform.match(/(Mac)/i) ? "⌘+" + a[t] : "ctrl+" + a[t]
            }
            e.getHotKey = l, e.getToolbarStruct = function (t, e) {
                var n = {
                        undo: [{
                            id: "undo",
                            type: o.ItemType.button,
                            icon: "dxi-undo",
                            tooltip: s.default.undo + " (" + l("undo") + ")"
                        }, {
                            id: "redo",
                            type: o.ItemType.button,
                            icon: "dxi-redo",
                            tooltip: s.default.redo + " (" + l("redo") + ")"
                        }],
                        colors: [{
                            id: "color",
                            type: o.ItemType.customHTMLButton,
                            html: r.getColorpickerTemplate("#4C4C4C", "text"),
                            tooltip: s.default.textColor
                        }, {
                            id: "background",
                            type: o.ItemType.customHTMLButton,
                            html: r.getColorpickerTemplate("#FFF", "fill"),
                            tooltip: s.default.backgroundColor
                        }],
                        lock: [{
                            id: "lock",
                            type: o.ItemType.button,
                            icon: "dxi-key",
                            tooltip: s.default.lockCell
                        }],
                        file: [{
                            id: "export",
                            type: o.ItemType.menuItem,
                            icon: "dxi-file-export",
                            tooltip: s.default.export,
                            childs: [{
                                id: "export-xlsx",
                                value: "Microsoft Excel(.xlsx)",
                                icon: "dxi-file-excel"
                            }]
                        }, {
                            id: "import",
                            type: o.ItemType.menuItem,
                            icon: "dxi-file-import",
                            tooltip: s.default.import,
                            childs: [{
                                id: "import-xlsx",
                                value: "Microsoft Excel(.xlsx)",
                                icon: "dxi-file-excel"
                            }]
                        }],
                        columns: [{
                            id: "add-col",
                            type: o.ItemType.button,
                            icon: "dxi-table-column-plus-before",
                            tooltip: s.default.addColumn
                        }, {
                            id: "remove-col",
                            type: o.ItemType.button,
                            icon: "dxi-table-column-remove dxi-flip-h",
                            tooltip: s.default.removeColumn
                        }],
                        rows: [{
                            id: "add-row",
                            type: o.ItemType.button,
                            icon: "dxi-table-row-plus-after",
                            tooltip: s.default.addRow
                        }, {
                            id: "remove-row",
                            type: o.ItemType.button,
                            icon: "dxi-table-row-remove",
                            tooltip: s.default.removeRow
                        }],
                        clear: [{
                            type: "menuItem",
                            icon: "dxi-eraser",
                            id: "clear-group",
                            tooltip: s.default.clear,
                            childs: [{
                                id: "clear-value",
                                value: s.default.clearValue
                            }, {
                                id: "clear-styles",
                                value: s.default.clearStyles
                            }, {
                                id: "clear-all",
                                value: s.default.clearAll
                            }]
                        }],
                        align: [{
                            id: "align-left",
                            type: o.ItemType.button,
                            icon: "dxi-format-align-left",
                            tooltip: s.default.align + " " + s.default.left
                        }, {
                            id: "align-center",
                            type: o.ItemType.button,
                            icon: "dxi-format-align-center",
                            tooltip: s.default.align + " " + s.default.center
                        }, {
                            id: "align-right",
                            type: o.ItemType.button,
                            icon: "dxi-format-align-right",
                            tooltip: s.default.align + " " + s.default.right
                        }],
                        decoration: [{
                            id: "font-weight-bold",
                            type: o.ItemType.button,
                            icon: "dxi-format-bold",
                            tooltip: s.default.bold + " (" + l("bold") + ")"
                        }, {
                            id: "font-style-italic",
                            type: o.ItemType.button,
                            icon: "dxi-format-italic",
                            tooltip: s.default.italic + " (" + l("italic") + ")"
                        }, {
                            id: "text-decoration-underline",
                            type: o.ItemType.button,
                            icon: "dxi-format-underline",
                            tooltip: s.default.underline + " (" + l("underline") + ")"
                        }],
                        help: [{
                            id: "help",
                            type: o.ItemType.button,
                            icon: "dxi-help-circle-outline",
                            tooltip: s.default.help
                        }],
                        format: [{
                            id: "format",
                            type: o.ItemType.menuItem,
                            tooltip: s.default.numberFormat,
                            css: "dhx_format-dropdown",
                            childs: r.getFormatsDropdown(e)
                        }]
                    },
                    a = ["undo", "colors", "decoration", "align", "format", "help"],
                    c = (t = t || a).indexOf("default");
                return -1 !== c && t.splice.apply(t, i([c, 1], a)), (t = t.filter(function (t, e, n) {
                    return n.indexOf(t) === e
                })).reduce(function (t, e, i, r) {
                    return n[e] && (t.push.apply(t, n[e]), i !== r.length - 1 && t.push({
                        type: o.ItemType.separator
                    })), t
                }, [])
            }
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__extends || function () {
                var t = function (e, n) {
                    return (t = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function (t, e) {
                            t.__proto__ = e
                        } || function (t, e) {
                            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                        })(e, n)
                };
                return function (e, n) {
                    function i() {
                        this.constructor = e
                    }
                    t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
                }
            }();
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = n(0),
                r = n(8),
                s = n(4),
                a = function (t) {
                    function e(e, n) {
                        void 0 === n && (n = {});
                        var i = t.call(this, e, n) || this;
                        i._htmlEvents = {
                            oninput: function (t) {
                                i.config.events.fire(s.SpreadsheetEvents.editLineInput, [t.target.value])
                            },
                            onfocus: function (t) {
                                i.config.events.fire(s.SpreadsheetEvents.editLineFocus, [t.target.value, t])
                            },
                            onblur: function (t) {
                                i.config.events.fire(s.SpreadsheetEvents.editLineBlur, [t.target.value, t])
                            }
                        }, i.config.events.on(s.SpreadsheetEvents.cellInput, function (t, e) {
                            i._value = e, i.paint()
                        });
                        return i.mount(e, o.create({
                            render: function () {
                                return i._render()
                            }
                        })), i
                    }
                    return i(e, t), e.prototype.focus = function () {
                        this.getRootView().refs.input.el.focus()
                    }, e.prototype.blur = function () {
                        this.getRootView().refs.input.el.blur()
                    }, e.prototype.lock = function () {
                        this._locked = !0, this.paint()
                    }, e.prototype.unlock = function () {
                        this._locked = !1, this.paint()
                    }, e.prototype.setValue = function (t) {
                        this.unlock(), this._value = t, this.paint()
                    }, e.prototype.clean = function () {
                        var t = this;
                        setTimeout(function () {
                            t._value = "", t.paint()
                        }, 1)
                    }, e.prototype._render = function () {
                        return o.el(".dhx_edit_line", {}, [o.el(".input-wrapper", [o.el("input.dhx_edit_line_input", {
                            oninput: this._htmlEvents.oninput,
                            onfocus: this._htmlEvents.onfocus,
                            onblur: this._htmlEvents.onblur,
                            value: this._value || "",
                            _ref: "input",
                            disabled: this._locked
                        }), o.el(".input-animation")])])
                    }, e
                }(r.View);
            e.EditLine = a
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(4),
                o = n(1),
                r = function () {
                    function t(t, e, n) {
                        this._spreadsheet = t, this._grid = e, this._callAction = n.bind(t), this._buffer = {
                            value: "",
                            styles: {},
                            cell: "",
                            cells: "",
                            operation: "",
                            inserted: !1
                        }
                    }
                    return t.prototype.store = function (t) {
                        var e = this._spreadsheet.selection.getSelectedCell(),
                            n = this._spreadsheet.selection.getFocusedCell();
                        o.getCellInfo(this._grid, n).edited || (o.isRangeId(e) && -1 === e.indexOf(":") ? this._buffer.cell = null : (this._buffer.value = this._spreadsheet.getValue(e), this._buffer.styles = this._spreadsheet.getStyle(e), this._buffer.cells = e, this._buffer.cell = n, this._buffer.operation = t, this._buffer.inserted = !1, this._grid.paint()))
                    }, t.prototype.paste = function () {
                        if (this._buffer.cell) {
                            this._buffer.inserted = !0;
                            var t = this._spreadsheet.selection.getSelectedCell(),
                                e = this._spreadsheet.getFormat(this._buffer.cells),
                                n = t,
                                r = !1;
                            if (o.isRangeId(this._buffer.cells)) {
                                r = !0;
                                var s = o.getRangeIndexes(this._buffer.cells),
                                    a = o.getCellIndex(t),
                                    l = {
                                        row: s.end.row - s.start.row,
                                        col: s.end.col - s.start.col
                                    },
                                    c = o.getCellNameByIndex(a.row + l.row, a.col + l.col);
                                if (o.isRangeId(t)) o.getCellsArray(this._buffer.cells).length > o.getCellsArray(t).length && (n = t.split(":")[0] + ":" + c);
                                else n += ":" + c
                            }
                            var u = o.isRangeId(n),
                                d = Array.isArray(this._buffer.styles) ? this._buffer.styles.map(function (t) {
                                    return dhx.css.add(t)
                                }) : dhx.css.add(this._buffer.styles),
                                f = [];
                            "cut" === this._buffer.operation && (f.push({
                                cell: this._buffer.cells,
                                action: i.Actions.setCellFormat,
                                groupAction: u ? i.Actions.groupAction : null,
                                val: ""
                            }, {
                                cell: this._buffer.cells,
                                action: i.Actions.setCellValue,
                                val: "",
                                groupAction: r ? i.Actions.groupAction : null
                            }, {
                                cell: this._buffer.cells,
                                action: i.Actions.setCellStyle,
                                val: "",
                                groupAction: r ? i.Actions.groupAction : null
                            }), this._buffer.operation = "copy"), f.push({
                                cell: n,
                                action: i.Actions.setCellFormat,
                                groupAction: u ? i.Actions.groupAction : null,
                                val: e
                            }, {
                                cell: n,
                                action: i.Actions.setCellValue,
                                val: this._buffer.value,
                                groupAction: u ? i.Actions.groupAction : null
                            }, {
                                cell: n,
                                action: i.Actions.setCellStyle,
                                val: d,
                                groupAction: u ? i.Actions.groupAction : null
                            }), this._callAction(f)
                        }
                    }, t.prototype.getStruct = function () {
                        return this._buffer
                    }, t
                }();
            e.BufferManager = r
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__extends || function () {
                var t = function (e, n) {
                    return (t = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function (t, e) {
                            t.__proto__ = e
                        } || function (t, e) {
                            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                        })(e, n)
                };
                return function (e, n) {
                    function i() {
                        this.constructor = e
                    }
                    t(e, n), e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
                }
            }();
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = n(11),
                r = n(1),
                s = function (t) {
                    function e() {
                        return null !== t && t.apply(this, arguments) || this
                    }
                    return i(e, t), e.prototype.toJsonArray = function (e) {
                        return t.prototype.toJsonArray.call(this, e).reduce(function (t, e, n) {
                            for (var i in e) t.push({
                                value: e[i],
                                cell: r.getCellNameByIndex(n, parseFloat(i))
                            });
                            return t
                        }, [])
                    }, e
                }(o.CsvDriver);
            e.CustomCsvDriver = s
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__assign || function () {
                    return (i = Object.assign || function (t) {
                        for (var e, n = 1, i = arguments.length; n < i; n++)
                            for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                        return t
                    }).apply(this, arguments)
                },
                o = this;
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var r = n(107),
                s = n(108),
                a = n(1),
                l = n(23),
                c = n(4);

            function u(t, e, n, i, o) {
                if (!a.getCellInfo(e, t.selection.getFocusedCell()).edited) {
                    var r = a.getCellIndex(t.selection.getFocusedCell()),
                        s = f(e, o),
                        l = i ? r[o] + i : n;
                    l >= s.min && l <= s.max && (r[o] = l);
                    var c = a.getCellNameByIndex(r.row, r.col);
                    t.selection.setSelectedCell(c);
                    var u = a.getCellIds(e, c);
                    e.scrollTo(u.row, u.col)
                }
            }

            function d(t, e, n, o) {
                var r = t.selection.getFocusedCell();
                if (!a.getCellInfo(e, r).edited) {
                    var s, l, c = a.getCellIndex(r),
                        u = t.selection.getSelectedCell().split(",")[0];
                    if (-1 === u.indexOf(":")) s = i({}, c), l = c;
                    else {
                        var d = a.getRangeIndexes(u);
                        d.end[o] > c[o] ? (s = i({}, d.end), l = d.start) : (s = i({}, d.start), l = d.end)
                    }
                    var h = f(e, o);
                    if (s[o] + n >= h.min && s[o] + n <= h.max) {
                        s[o] += n;
                        var p = a.getCellNameByIndex(s.row, s.col);
                        if (p === (l = a.getCellNameByIndex(l.row, l.col))) return void t.selection.setSelectedCell(p);
                        t.selection.setSelectedCell(p + ":" + l), t.selection.setFocusedCell(r)
                    }
                }
            }

            function f(t, e) {
                return "row" === e ? {
                    min: 0,
                    max: t.data.getLength() - 1
                } : {
                    min: 1,
                    max: t.config.columns.length - 1
                }
            }
            e.focusHandler = {
                inFocus: null,
                getFocusState: function () {
                    return o.inFocus
                },
                setFocusState: function (t) {
                    return o.inFocus = t
                }
            }, e.initHotkeys = function (t, n, i) {
                var o, f = function (t, n) {
                    r.keyManager.addHotKey(t, function (t) {
                        e.focusHandler.getFocusState() && n(t)
                    })
                };
                t.events.on(c.SpreadsheetEvents.afterEditStart, function (t) {
                    o = t
                }), t.events.on(c.SpreadsheetEvents.afterEditEnd, function () {
                    o = null
                }), document.addEventListener("mousedown", function (n) {
                    var i = n.target;
                    e.focusHandler.setFocusState(function (t, e) {
                        for (var n = e.parentNode; null !== n;) {
                            if (n === t) return !0;
                            n = n.parentNode
                        }
                        return !1
                    }(t.container, i) || i.isEqualNode(t.container))
                }), t.container.addEventListener("mouseenter", function (t) {
                    null === e.focusHandler.getFocusState() && e.focusHandler.setFocusState(!0)
                }), document.addEventListener("keydown", function (n) {
                    if (e.focusHandler.getFocusState() && s.isPrintableKey(n)) {
                        var i = t.selection.getFocusedCell();
                        i && i !== o && (n.preventDefault(), t.startEdit(i, n.key))
                    }
                }), f("escape", function () {
                    var e = t.selection.getSelectedCell(),
                        i = a.getCellIds(n, e),
                        o = n.data.getItem(i.row)[i.col];
                    e && (a.updateCellInfo(n, e, {
                        nextValue: o
                    }), t.endEdit(), n.paint())
                }), f("delete", function () {
                    if (!o) {
                        var e = t.selection.getSelectedCell();
                        e && t.setValue(e, ""), n.paint()
                    }
                });
                var h = function (t) {
                    var e = i.getStruct();
                    t !== JSON.stringify(e.value) ? (i.store("copy"), e.value = t, i.paste()) : i.paste()
                };
                window.clipboardData ? (f("ctrl+c", function () {
                    e.focusHandler.getFocusState() && !o && (i.store("copy"), window.clipboardData && (window.clipboardData.setData("text/html", s.getHtmlData(t)), window.clipboardData.setData("text", JSON.stringify(t.getValue(t.selection.getSelectedCell())))))
                }), f("ctrl+x", function () {
                    e.focusHandler.getFocusState() && !o && (i.store("cut"), window.clipboardData && (window.clipboardData.setData("text/html", s.getHtmlData(t)), window.clipboardData.setData("text", JSON.stringify(t.getValue(t.selection.getSelectedCell())))))
                }), f("ctrl+v", function () {
                    if (e.focusHandler.getFocusState() && !o && window.clipboardData) {
                        var t = window.clipboardData.getData("text");
                        h(t)
                    }
                })) : (document.addEventListener("cut", function (n) {
                    e.focusHandler.getFocusState() && !o && (i.store("cut"), n.clipboardData.setData("text/html", s.getHtmlData(t)), n.clipboardData.setData("text/plain", JSON.stringify(t.getValue(t.selection.getSelectedCell()))), n.preventDefault())
                }), document.addEventListener("copy", function (n) {
                    e.focusHandler.getFocusState() && !o && (i.store("copy"), n.clipboardData.setData("text/html", s.getHtmlData(t)), n.clipboardData.setData("text/plain", JSON.stringify(t.getValue(t.selection.getSelectedCell()))), n.preventDefault())
                }), document.addEventListener("paste", function (t) {
                    if (e.focusHandler.getFocusState() && !o) {
                        var n = t.clipboardData.getData("text");
                        h(n), t.preventDefault()
                    }
                })), f("enter", function () {
                    var e = t.selection.getSelectedCell(),
                        i = t.selection.getFocusedCell();
                    if (o) {
                        var r = a.getCellIndex(o);
                        r.row = r.row + 1 === n.data.getLength() ? r.row : r.row + 1, t.selection.setSelectedCell(a.getCellNameByIndex(r.row, r.col)), o = "", a.isRangeId(e) && (t.selection.setSelectedCell(e), t.selection.setFocusedCell(a.getNextRangeCell(e, i, "col")))
                    } else {
                        if (a.isRangeId(e)) return t.endEdit(), t.selection.setSelectedCell(e), void t.selection.setFocusedCell(a.getNextRangeCell(e, i, "col"));
                        t.startEdit(e)
                    }
                }), f("f2", function () {
                    t.startEdit(t.selection.getSelectedCell())
                }), f("pageUp", function (t) {
                    t.preventDefault();
                    var e = n.getRootView().refs.grid_body;
                    e.el.scrollTop -= e.el.clientHeight
                }), f("pageDown", function (t) {
                    t.preventDefault();
                    var e = n.getRootView().refs.grid_body;
                    e.el.scrollTop += e.el.clientHeight - n.config.rowHeight
                }), f("ctrl+a", function (i) {
                    if (e.focusHandler.getFocusState() && !o) {
                        i.preventDefault();
                        var r = a.getCellNameByIndex(0, 1),
                            s = a.getCellNameByIndex(n.data.getLength() - 1, n.config.columns.length - 1);
                        t.selection.setSelectedCell(r + ":" + s)
                    }
                }), f("shift+arrowLeft", function () {
                    d(t, n, -1, "col")
                }), f("shift+arrowRight", function () {
                    d(t, n, 1, "col")
                }), f("shift+arrowDown", function () {
                    d(t, n, 1, "row")
                }), f("shift+arrowUp", function () {
                    d(t, n, -1, "row")
                }), f("ctrl+enter", function () {
                    t.endEdit()
                }), f("shift+enter", function () {
                    var e = t.selection.getSelectedCell();
                    if (a.isRangeId(e)) {
                        var i = t.selection.getFocusedCell();
                        return t.endEdit(), t.selection.setSelectedCell(e), void t.selection.setFocusedCell(a.getPrevRangeCell(e, i, "col"))
                    }
                    u(t, n, null, -1, "row")
                }), f("tab", function (e) {
                    e.preventDefault();
                    var i = t.selection.getSelectedCell();
                    if (a.isRangeId(i)) {
                        var o = t.selection.getFocusedCell();
                        return t.endEdit(), t.selection.setSelectedCell(i), void t.selection.setFocusedCell(a.getNextRangeCell(i, o))
                    }
                    u(t, n, null, 1, "col")
                }), f("shift+tab", function (e) {
                    e.preventDefault();
                    var i = t.selection.getSelectedCell();
                    if (a.isRangeId(i)) {
                        var o = t.selection.getFocusedCell();
                        return t.endEdit(), t.selection.setSelectedCell(i), void t.selection.setFocusedCell(a.getPrevRangeCell(i, o))
                    }
                    u(t, n, null, -1, "col")
                }), f("arrowLeft", function (e) {
                    o || (e.preventDefault(), u(t, n, null, -1, "col"))
                }), f("arrowRight", function (e) {
                    o || (e.preventDefault(), u(t, n, null, 1, "col"))
                }), f("arrowDown", function (e) {
                    o || (e.preventDefault(), u(t, n, null, 1, "row"))
                }), f("arrowUp", function (e) {
                    o || (e.preventDefault(), u(t, n, null, -1, "row"))
                }), f("ctrl+arrowLeft", function () {
                    u(t, n, 1, null, "col")
                }), f("ctrl+arrowRight", function () {
                    u(t, n, n.config.columns.length - 1, null, "col")
                }), f("ctrl+arrowDown", function () {
                    u(t, n, n.data.getLength() - 1, null, "row")
                }), f("ctrl+arrowUp", function () {
                    u(t, n, 0, null, "row")
                }), f("home", function (e) {
                    e.preventDefault(), u(t, n, 1, null, "col")
                }), f("end", function (e) {
                    e.preventDefault(), u(t, n, n.config.columns.length - 1, null, "col")
                }), f("ctrl+home", function () {
                    u(t, n, 0, null, "row"), u(t, n, 1, null, "col")
                }), f("ctrl+end", function () {
                    u(t, n, n.data.getLength() - 1, null, "row"), u(t, n, n.config.columns.length - 1, null, "col")
                }), f("ctrl+z", function () {
                    t.undo()
                }), f("ctrl+y", function (e) {
                    e.preventDefault(), t.redo()
                }), f("ctrl+shift+z", function () {
                    t.redo()
                }), f("ctrl+b", function () {
                    var e = t.selection.getSelectedCell(),
                        i = l.getToggledValue(n, e, "font-weight", "bold");
                    t.setStyle(t.selection.getSelectedCell(), {
                        "font-weight": i
                    })
                }), f("ctrl+i", function () {
                    var e = t.selection.getSelectedCell(),
                        i = l.getToggledValue(n, e, "font-style", "italic");
                    t.setStyle(t.selection.getSelectedCell(), {
                        "font-style": i
                    })
                }), f("ctrl+u", function (e) {
                    e.preventDefault();
                    var i = t.selection.getSelectedCell(),
                        o = l.getToggledValue(n, i, "text-decoration", "underline");
                    t.setStyle(t.selection.getSelectedCell(), {
                        "text-decoration": o
                    })
                }), f("backspace", function () {
                    o || t.setValue(t.selection.getSelectedCell(), "")
                })
            }
        }, function (t, e, n) {
            "use strict";

            function i(t) {
                for (var e = t.toLowerCase().match(/\w+/g), n = 0, i = "", o = 0; o < e.length; o++) {
                    var r = e[o];
                    "ctrl" === r ? n += 4 : "shift" === r ? n += 2 : "alt" === r ? n += 1 : i = r
                }
                return n + i
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = function () {
                function t() {
                    var t = this;
                    this._keysStorage = {}, document.addEventListener("keydown", function (e) {
                        var n = (e.ctrlKey || e.metaKey ? 4 : 0) + (e.shiftKey ? 2 : 0) + (e.altKey ? 1 : 0) + (e.which >= 48 && e.which <= 57 || e.which >= 65 && e.which <= 90 ? String.fromCharCode(e.which) : e.key).toLowerCase(),
                            i = t._keysStorage[n];
                        if (i)
                            for (var o = 0; o < i.length; o++) i[o].handler(e)
                    })
                }
                return t.prototype.addHotKey = function (t, e, n) {
                    var o = i(t);
                    this._keysStorage[o] || (this._keysStorage[o] = []), this._keysStorage[o].push({
                        handler: e,
                        scope: n
                    })
                }, t.prototype.removeHotKey = function (t, e) {
                    var n = this._keysStorage;
                    t && delete n[o = i(t)];
                    if (e)
                        for (var o in n) {
                            for (var r = [], s = 0; s < n[o].length; s++) n[o][s].scope === e && r.push(s);
                            if (n[o].length === r.length) delete n[o];
                            else
                                for (s = r.length - 1; s >= 0; s--) n[o].splice(r[s], 1)
                        }
                }, t.prototype.exist = function (t) {
                    var e = i(t);
                    return !!this._keysStorage[e]
                }, t
            }();
            e.keyManager = new o
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(1);
            e.isPrintableKey = function (t) {
                if (!(t.ctrlKey || t.altKey || t.metaKey)) {
                    var e = t.which || t.keyCode;
                    return e >= 65 && e <= 90 || e >= 48 && e <= 57 || e >= 96 && e <= 105 || !!{
                        32: " ",
                        106: "*",
                        107: "+",
                        109: "-",
                        110: ".",
                        111: "/",
                        186: ";",
                        187: "=",
                        188: ",",
                        189: "-",
                        190: ".",
                        191: "/",
                        192: "`",
                        219: "[",
                        220: "\\",
                        221: "]",
                        222: "'"
                    } [e] || !1
                }
            }, e.getHtmlData = function (t) {
                var e = t.selection.getSelectedCell();
                return i.isRangeId(e) ? '\n\t\x3c!--StartFragment--\x3e\n\t\t<table id="customers">\n\t\t\t<tbody style="box-sizing: inherit;">\n\t\t\t\t' + i.getRangeMatrix(t.selection.getSelectedCell()).reduce(function (e, n) {
                    return e + '<tr style="box-sizing: inherit;">' + n.reduce(function (e, n) {
                        var i = t.getValue(n),
                            o = t.getStyle(n) || {};
                        return e + ' <th style="' + Object.keys(o).reduce(function (t, e) {
                            return "" + t + e + ":" + o[e] + ";"
                        }, "") + '">\n\t\t\t' + i + "</th>"
                    }, "") + "</tr>"
                }, "") + "\n\t\t\t</tbody>\n\t\t</table>\n\t\x3c!--EndFragment--\x3e" : t.getValue(e)
            }
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__spreadArrays || function () {
                for (var t = 0, e = 0, n = arguments.length; e < n; e++) t += arguments[e].length;
                var i = Array(t),
                    o = 0;
                for (e = 0; e < n; e++)
                    for (var r = arguments[e], s = 0, a = r.length; s < a; s++, o++) i[o] = r[s];
                return i
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = n(2),
                r = n(0),
                s = n(37),
                a = n(110),
                l = n(1),
                c = n(41),
                u = n(4),
                d = function () {
                    function t(t, e, n) {
                        this._spreadsheet = t, this._grid = e, this._bufferManager = n, this._selected = [], this._focusedCell = {
                            row: "",
                            col: "",
                            cell: ""
                        }, this._events = t.events, this._setHandlers()
                    }
                    return t.prototype.setSelectedCell = function (t) {
                        if (t && this._events.fire(u.SpreadsheetEvents.beforeSelectionSet, [t])) {
                            this._removeHeadersCss();
                            var e = t.split(",");
                            this._selected = e;
                            var n = this._selected[this._selected.length - 1];
                            l.isRangeId(n) && (n = n.split(":")[0]), this.setFocusedCell(n), this._setHeadersCss(), this._mousePressed ? this._grid.paint() : this._events.fire(u.SpreadsheetEvents.afterSelectionSet, [this.getSelectedCell()])
                        }
                    }, t.prototype.getSelectedCell = function () {
                        if (this._selected.length) return this._selected.join(",")
                    }, t.prototype.getFocusedCell = function () {
                        if (this._focusedCell && this._focusedCell.cell) return this._focusedCell.cell
                    }, t.prototype.setFocusedCell = function (t) {
                        if (t = t.toUpperCase(), this._events.fire(u.SpreadsheetEvents.beforeFocusSet, [t])) {
                            var e = l.getCellIds(this._grid, t),
                                n = e.row,
                                i = e.col;
                            this._focusedCell = {
                                row: n,
                                col: i,
                                cell: t,
                                edit: !1
                            }, this._events.fire(u.SpreadsheetEvents.afterFocusSet, [t])
                        }
                    }, t.prototype._isInRange = function (t, e) {
                        if (!e || !t || -1 === e.indexOf(":")) return !1;
                        var n = l.getCellIndex(t),
                            i = n.row,
                            o = n.col,
                            r = l.getRangeIndexes(e),
                            s = r.start,
                            a = r.end,
                            c = function (t, e, n) {
                                return (t - e) * (t - n) <= 0
                            };
                        return !(!s || !a) && (c(i, s.row, a.row) && c(o, s.col, a.col))
                    }, t.prototype._removeHeadersCss = function () {
                        var t = this;
                        this.getSelectedCell() && (this._spreadsheet.eachCell(function (e) {
                            var n = l.getCellIndex(e),
                                i = t._grid.data.getId(n.row);
                            void 0 !== i && t._grid.removeRowCss(i, "dhx_selected_row");
                            var o = t._grid.config.columns[n.col];
                            void 0 !== o && (o.header[0].css = o.header[0].css.replace(" dhx_selected_header", ""))
                        }), this._grid.data.exists(this._focusedCell.row) && this._grid.removeRowCss(this._focusedCell.row, "dhx_selected_row"))
                    }, t.prototype._setHeadersCss = function () {
                        var t = this;
                        this.getSelectedCell() && this._spreadsheet.eachCell(function (e) {
                            var n = l.getCellIndex(e),
                                i = t._grid.data.getId(n.row);
                            void 0 !== i && t._grid.addRowCss(i, "dhx_selected_row");
                            var o = t._grid.config.columns[n.col];
                            void 0 === o || RegExp(/dhx_selected_header/).test(o.header[0].css) || (o.header[0].css += " dhx_selected_header")
                        })
                    }, t.prototype._selectRow = function (t) {
                        var e = this._grid.config.columns[1],
                            n = this._grid.config.columns[this._grid.config.columns.length - 1];
                        this.setSelectedCell(l.getCellNameById(this._grid, t.id, e.id) + ":" + l.getCellNameById(this._grid, t.id, n.id))
                    }, t.prototype._selectColumn = function (t) {
                        var e = this._grid.data.getId(0),
                            n = this._grid.data.getId(this._grid.data.getLength() - 1),
                            i = this._grid.data.getItem(e),
                            o = this._grid.data.getItem(n);
                        this.setSelectedCell(l.getCellNameById(this._grid, i.id, t.id) + ":" + l.getCellNameById(this._grid, o.id, t.id))
                    }, t.prototype._setGroupSelectionHandlers = function () {
                        var t = this;
                        this._grid.events.on(s.GridEvents.cellMouseOver, function (e, n) {
                            if (!l.getCellInfo(t._grid, t.getFocusedCell()).edited && t._mousePressed) {
                                if ("index" !== t._pressedArea && "$index" === n.id) return;
                                if ("header" === t._pressedArea && "$index" !== n.id) {
                                    var o = t._grid.data.getId(t._grid.data.getLength() - 1),
                                        r = t._grid.data.getItem(o);
                                    return void t.setSelectedCell(t._focusedCell.cell + ":" + l.getCellNameById(t._grid, r.id, n.id))
                                }
                                var s = t._grid.config.columns[t._grid.config.columns.length - 1],
                                    a = l.getCellNameById(t._grid, e.id, "index" === t._pressedArea ? s.id : n.id),
                                    u = t._focusedCell.cell,
                                    d = i(t._selected);
                                if (t._focusedCell.cell !== a) {
                                    if ("fillHandle" === t._pressedArea) {
                                        a = c.getLastCopyingCell(t._cellsToCopy, a);
                                        var f = t._isInRange(a, t._cellsToCopy);
                                        (a === u || f) && (a = t._cellsToCopy.split(":")[1])
                                    }
                                    var h = u + ":" + a;
                                    d[d.length - 1] = h;
                                    var p = t.getFocusedCell();
                                    t.setSelectedCell(d.join(",")), t.setFocusedCell(p)
                                }
                            }
                        }), this._grid.events.on(s.GridEvents.headerCellMouseOver, function (e) {
                            if ("cell" !== t._pressedArea && t._mousePressed && "header" === t._pressedArea && "$index" !== e.id) {
                                var n = t._grid.data.getId(t._grid.data.getLength() - 1),
                                    i = t._grid.data.getItem(n);
                                t.setSelectedCell(t._focusedCell.cell + ":" + l.getCellNameById(t._grid, i.id, e.id))
                            }
                        })
                    }, t.prototype._setHandlers = function () {
                        var t, e, n = this;
                        document.addEventListener("mouseup", function () {
                            if (n._mousePressed) {
                                if (n._mousePressed = !1, "fillHandle" === n._pressedArea) {
                                    var t = n.getSelectedCell();
                                    t !== n._cellsToCopy && n._events.fire(u.SpreadsheetEvents.groupFill, [n._cellsToCopy, t]), n._cellsToCopy = ""
                                }
                                n._pressedArea = null, document.removeEventListener("mousemove", c), e && clearTimeout(e), n._selected.length && n._events.fire(u.SpreadsheetEvents.afterSelectionSet, [n.getSelectedCell()]), n._grid.paint()
                            }
                        });
                        var c = function (i) {
                            e && clearTimeout(e);
                            var o = n._grid.getScrollState();
                            i.clientX > t.width + t.left - 50 && n._grid.scroll(o.x + 50, o.y), i.clientX < t.left + 50 && n._grid.scroll(o.x - 50, o.y), i.clientY > t.height + t.top - 50 && n._grid.scroll(o.x, o.y + 50), i.clientY < t.top + 50 && n._grid.scroll(o.x, o.y - 50), e = setTimeout(function () {
                                c(i)
                            }, 100)
                        };
                        this._grid.events.on(s.GridEvents.cellMouseDown, function (e, i, o) {
                            if (n._mousePressed = !0, t = n._grid.getRootView().node.el.getBoundingClientRect(), document.addEventListener("mousemove", c), "$index" === i.id) return n._pressedArea = "index", void n._selectRow(e);
                            n._pressedArea = "cell";
                            var r = l.getCellNameById(n._grid, e.id, i.id),
                                s = l.getCellInfo(n._grid, r);
                            if (!(3 === o.which && n._isInRange(r, n._selected[n._selected.length - 1]) || s.edited))
                                if (o.shiftKey) n.setSelectedCell(n._focusedCell.cell + ":" + l.getCellNameById(n._grid, e.id, i.id));
                                else if (o.ctrlKey || o.metaKey) {
                                var a = n.getSelectedCell();
                                a && n.setSelectedCell(a + "," + r)
                            } else n.setSelectedCell(r)
                        }), this._grid.events.on(s.GridEvents.headerCellMouseDown, function (t, e) {
                            var i = e.target.getAttribute("dhx_id");
                            if (i) {
                                if ("$index" === i) {
                                    var o = l.getCellNameByIndex(0, 1),
                                        r = l.getCellNameByIndex(n._grid.data.getLength() - 1, n._grid.config.columns.length - 1);
                                    return void n.setSelectedCell(o + ":" + r)
                                }
                                n._resizedColumn = n._grid.config.columns[i].id, a.startResize(n._grid, n._resizedColumn, e, function () {
                                    n._resizedColumn = null, n._grid.paint()
                                })
                            } else n._pressedArea = "header", n._selectColumn(t), n._mousePressed = !0
                        }), this._setGroupSelectionHandlers(), this._grid.events.on(s.GridEvents.cellDblClick, function (t, e) {
                            "$index" !== e.id && n._spreadsheet.startEdit(l.getCellNameById(n._grid, t.id, e.id))
                        }), this._grid.events.on(s.GridEvents.headerCellDblClick, function (t, e) {
                            e.target.getAttribute("dhx_id") && n._grid.adjustColumnWidth(t.id)
                        }), this._events.on(u.SpreadsheetEvents.gridRedraw, function (t) {
                            var e = n.getSelectedCell(),
                                s = n.getFocusedCell();
                            if (e && s) {
                                var a, u, d = function (t) {
                                        return {
                                            x: n._grid.config.columns.slice(0, t.col).reduce(function (t, e) {
                                                return t + e.width
                                            }, 0),
                                            y: t.row * n._grid.config.rowHeight,
                                            width: n._grid.config.columns[t.col].width + 1,
                                            height: n._grid.config.rowHeight + 1
                                        }
                                    },
                                    f = function (t) {
                                        var e = d(t.start),
                                            n = d(t.end);
                                        return {
                                            x: e.x,
                                            y: e.y,
                                            width: n.x - e.x + n.width,
                                            height: n.y - e.y + n.height
                                        }
                                    },
                                    h = n._selected.map(function (t) {
                                        if (l.isRangeId(t)) {
                                            var e = f(l.getRangeIndexes(t));
                                            return r.el(".dhx_group_selection", {
                                                style: {
                                                    top: e.y,
                                                    left: e.x,
                                                    width: e.width,
                                                    height: e.height
                                                }
                                            })
                                        }
                                        if (1 !== n._selected.length) {
                                            var i = d(l.getCellIndex(t)),
                                                o = i.x,
                                                s = i.y,
                                                a = i.width,
                                                c = i.height;
                                            return r.el(".dhx_group_selection", {
                                                style: {
                                                    width: a,
                                                    height: c,
                                                    top: s,
                                                    left: o,
                                                    position: "absolute",
                                                    pointerEvents: "none"
                                                }
                                            })
                                        }
                                    }),
                                    p = d(l.getCellIndex(s)),
                                    g = r.el(".dhx_selected_cell", {
                                        style: {
                                            width: p.width,
                                            height: p.height,
                                            top: p.y,
                                            left: p.x,
                                            position: "absolute",
                                            pointerEvents: "none"
                                        }
                                    }),
                                    v = n._bufferManager.getStruct();
                                if (v.cell && !v.inserted) {
                                    var _ = l.getCellsArray(v.cells),
                                        m = l.getCellIndex(_[0]),
                                        y = l.getCellIndex(_[_.length - 1]),
                                        w = f({
                                            start: m,
                                            end: y
                                        });
                                    a = r.el(".dhx_copy_selection", {
                                        style: {
                                            top: w.y,
                                            left: w.x,
                                            width: w.width,
                                            height: w.height
                                        }
                                    })
                                }
                                if (n._resizedColumn) {
                                    var x = o.findIndex(n._grid.config.columns, function (t) {
                                            return t.id === n._resizedColumn
                                        }),
                                        b = d({
                                            row: 0,
                                            col: x
                                        }),
                                        C = n._grid.config.$totalHeight;
                                    u = r.el(".resize_line", {
                                        style: {
                                            top: b.y,
                                            left: b.x + b.width - 1.5,
                                            height: C
                                        }
                                    })
                                }
                                var k = n._selected[n._selected.length - 1];
                                if (l.isRangeId(k)) {
                                    var S = l.getRangeArray(k);
                                    k = S[S.length - 1]
                                }
                                var I, O = d(l.getCellIndex(k));
                                l.getCellInfo(n._grid, n.getFocusedCell()).edited || (I = r.el(".dhx_selection_grip", {
                                    dhx_id: "selection_grip",
                                    style: {
                                        position: "absolute",
                                        left: O.x + O.width - 6,
                                        top: O.y + O.height - 6
                                    },
                                    onmousedown: function () {
                                        n._mousePressed = !0, document.addEventListener("mousemove", c), n._pressedArea = "fillHandle", n._cellsToCopy = n.getSelectedCell()
                                    }
                                })), t.refs.selection.patch(r.el(".dhx_grid_selection", i([a, g], h, [u, I])))
                            }
                        })
                    }, t
                }();
            e.Selection = d
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__spreadArrays || function () {
                for (var t = 0, e = 0, n = arguments.length; e < n; e++) t += arguments[e].length;
                var i = Array(t),
                    o = 0;
                for (e = 0; e < n; e++)
                    for (var r = arguments[e], s = 0, a = r.length; s < a; s++, o++) i[o] = r[s];
                return i
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = n(2);
            e.startResize = function (t, e, n, r) {
                var s = n.clientX,
                    a = 0,
                    l = function (n) {
                        var r = o.findIndex(t.config.columns, function (t) {
                            return t.id === e
                        });
                        a = a || t.config.columns[r].width;
                        var l = n.clientX - s,
                            c = i(t.config.columns),
                            u = a + l;
                        c[r].width = u <= 20 ? 20 : u, t.setHeader(c), t.paint()
                    },
                    c = function () {
                        document.removeEventListener("mousemove", l), document.removeEventListener("mouseup", c), r()
                    };
                document.addEventListener("mousemove", l), document.addEventListener("mouseup", c), t.paint()
            }
        }, function (t, e, n) {
            "use strict";
            var i = this && this.__assign || function () {
                return (i = Object.assign || function (t) {
                    for (var e, n = 1, i = arguments.length; n < i; n++)
                        for (var o in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                    return t
                }).apply(this, arguments)
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = n(2),
                r = n(1),
                s = function () {
                    function t(t, e) {
                        this._spreadsheet = t, this._grid = e
                    }
                    return t.prototype.xlsx = function () {
                        if (!r.isWasmSupported()) throw new Error("WebAssembly is not supported by your browser");
                        var t = [],
                            e = [{
                                id: ""
                            }];
                        this._grid.data.map(function (n, r) {
                            Object.keys(n).map(function (s) {
                                if ("id" !== s && "$info" !== s && "$index" !== s && "$css" !== s) {
                                    var a = null;
                                    if (n.$info && n.$info[s]) {
                                        var l = n.$info[s],
                                            c = l.format || "",
                                            u = l.css || "",
                                            d = c + u;
                                        if (-1 === (a = o.findIndex(e, function (t) {
                                                return t.id === d
                                            }))) {
                                            var f = {
                                                    "text-align": "align",
                                                    "font-size": "fontSize",
                                                    "font-weight": "fontWeight",
                                                    "font-style": "fontStyle",
                                                    "text-decoration": "textDecoration"
                                                },
                                                h = dhx.css.get(u) || {},
                                                p = Object.keys(h).reduce(function (t, e) {
                                                    return t[f[e] || e] = h[e], t
                                                }, {});
                                            e.push(i(i({
                                                format: c
                                            }, p), {
                                                id: d
                                            })), a = e.length - 1
                                        }
                                    }
                                    t[r] = t[r] || [];
                                    var g = !n[s] && a,
                                        v = n[s] || g ? {
                                            v: "" + n[s],
                                            s: a
                                        } : null;
                                    t[r].push(v)
                                }
                            })
                        });
                        var n = this._grid.config.columns.map(function (t) {
                                return {
                                    width: t.width
                                }
                            }).splice(1),
                            s = {
                                data: [{
                                    cells: t,
                                    cols: n
                                }],
                                styles: e
                            },
                            a = this._spreadsheet.config.exportModulePath;
                        this._getXlsxWorker(a).postMessage({
                            type: "convert",
                            data: s
                        })
                    }, t.prototype._getXlsxWorker = function (t) {
                        if (!this._xlsxWorker) {
                            var e = window.URL.createObjectURL(new Blob(["importScripts('" + t + "');"], {
                                type: "text/javascript"
                            }));
                            this._xlsxWorker = new Worker(e), this._xlsxWorker.addEventListener("message", function (t) {
                                if ("ready" === t.data.type) {
                                    var e = document.createElement("a");
                                    e.href = URL.createObjectURL(t.data.blob), e.download = "data.xlsx", document.body.appendChild(e), e.click(), document.body.removeChild(e)
                                }
                            })
                        }
                        return this._xlsxWorker
                    }, t
                }();
            e.Exporter = s
        }, function (t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(1),
                o = function () {
                    function t() {}
                    return t.prototype.toJsonArray = function (t, e, n) {
                        var o = [],
                            r = [],
                            s = {};
                        return t.styles.forEach(function (t, e) {
                            var n = ["background", "color", "textAlign", "textDecoration", "fontWeight", "fontStyle"].reduce(function (e, n) {
                                return t[n] && (e[n] = t[n]), e
                            }, {});
                            r.push(t.format), s["imported_class" + e] = n
                        }), t.data[0].cols.forEach(function (t, e) {
                            var i = n.config.columns[e + 1];
                            i && (i.width = t.width)
                        }), t.data[0].cells.forEach(function (t, e) {
                            t.forEach(function (t, n) {
                                var s = {
                                    cell: i.getCellNameByIndex(e, n + 1),
                                    value: t.v,
                                    css: ["imported_class" + t.s],
                                    format: r[t.s]
                                };
                                o.push(s)
                            })
                        }), {
                            data: o,
                            styles: s
                        }
                    }, t
                }();
            e.XlsxDriver = o
        }, function (t, e, n) {
            "use strict";
            (function (t) {
                Object.defineProperty(e, "__esModule", {
                    value: !0
                });
                var i = n(1),
                    o = function () {
                        function e(t) {
                            this._spreadsheet = t
                        }
                        return e.prototype.load = function (e) {
                            var n = this;
                            return new t(function (t) {
                                n._getFile(e).then(function (e) {
                                    var i = n._spreadsheet.config.importModulePath,
                                        o = n._getXlsxWorker(i);
                                    o.postMessage({
                                        type: "convert",
                                        data: e
                                    }), o.onmessage = function (e) {
                                        "ready" === e.data.type && t(e.data)
                                    }
                                })
                            })
                        }, e.prototype._getXlsxWorker = function (t) {
                            if (!this._xlsxWorker) {
                                var e = window.URL.createObjectURL(new Blob(["importScripts('" + t + "');"], {
                                    type: "text/javascript"
                                }));
                                this._xlsxWorker = new Worker(e)
                            }
                            return this._xlsxWorker
                        }, e.prototype._getFile = function (e) {
                            return new t(function (t) {
                                if (e) return i.fetchFile(e, "GET", "arraybuffer").then(function (e) {
                                    t(e)
                                });
                                var n = document.createElement("input");
                                n.type = "file", n.accept = ".xlsx", n.click(), n.addEventListener("change", function (e) {
                                    var n = new FileReader;
                                    n.onload = function () {
                                        var e = n.result,
                                            i = new Uint8Array(e);
                                        t(i)
                                    }, n.readAsArrayBuffer(e.target.files[0])
                                })
                            })
                        }, e
                    }();
                e.XlsxProxy = o
            }).call(this, n(10))
        }])
    }), window.dhx_legacy) {
    if (window.dhx)
        for (var key in dhx) dhx_legacy[key] = dhx[key];
    window.dhx = dhx_legacy, delete window.dhx_legacy
}
