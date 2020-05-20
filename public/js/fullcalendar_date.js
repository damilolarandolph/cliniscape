/*!
FullCalendar Day Grid Plugin v4.4.0
Docs & License: https://fullcalendar.io/
(c) 2019 Adam Shaw
*/
! function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports, require("@fullcalendar/core")) : "function" == typeof define && define.amd ? define(["exports", "@fullcalendar/core"], t) : t((e = e || self).FullCalendarDayGrid = {}, e.FullCalendar)
}(this, function (e, t) {
    "use strict";
    var r = function (e, t) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            })(e, t)
    };

    function n(e, t) {
        function n() {
            this.constructor = e
        }
        r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    }
    var i = function () {
            return (i = Object.assign || function (e) {
                for (var t, r = 1, n = arguments.length; r < n; r++)
                    for (var i in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                return e
            }).apply(this, arguments)
        },
        o = function (e) {
            function r() {
                return null !== e && e.apply(this, arguments) || this
            }
            return n(r, e), r.prototype.buildRenderRange = function (r, n, i) {
                var o, s = this.dateEnv,
                    l = e.prototype.buildRenderRange.call(this, r, n, i),
                    a = l.start,
                    d = l.end;
                if (/^(year|month)$/.test(n) && (a = s.startOfWeek(a), (o = s.startOfWeek(d)).valueOf() !== d.valueOf() && (d = t.addWeeks(o, 1))), this.options.monthMode && this.options.fixedWeekCount) {
                    var c = Math.ceil(t.diffWeeks(a, d));
                    d = t.addWeeks(d, 6 - c)
                }
                return {
                    start: a,
                    end: d
                }
            }, r
        }(t.DateProfileGenerator),
        s = function () {
            function e(e) {
                var t = this;
                this.isHidden = !0, this.margin = 10, this.documentMousedown = function (e) {
                    t.el && !t.el.contains(e.target) && t.hide()
                }, this.options = e
            }
            return e.prototype.show = function () {
                this.isHidden && (this.el || this.render(), this.el.style.display = "", this.position(), this.isHidden = !1, this.trigger("show"))
            }, e.prototype.hide = function () {
                this.isHidden || (this.el.style.display = "none", this.isHidden = !0, this.trigger("hide"))
            }, e.prototype.render = function () {
                var e = this,
                    r = this.options,
                    n = this.el = t.createElement("div", {
                        className: "fc-popover " + (r.className || ""),
                        style: {
                            top: "0",
                            left: "0"
                        }
                    });
                "function" == typeof r.content && r.content(n), r.parentEl.appendChild(n), t.listenBySelector(n, "click", ".fc-close", function (t) {
                    e.hide()
                }), r.autoHide && document.addEventListener("mousedown", this.documentMousedown)
            }, e.prototype.destroy = function () {
                this.hide(), this.el && (t.removeElement(this.el), this.el = null), document.removeEventListener("mousedown", this.documentMousedown)
            }, e.prototype.position = function () {
                var e, r, n = this.options,
                    i = this.el,
                    o = i.getBoundingClientRect(),
                    s = t.computeRect(i.offsetParent),
                    l = t.computeClippingRect(n.parentEl);
                e = n.top || 0, r = void 0 !== n.left ? n.left : void 0 !== n.right ? n.right - o.width : 0, e = Math.min(e, l.bottom - o.height - this.margin), e = Math.max(e, l.top + this.margin), r = Math.min(r, l.right - o.width - this.margin), r = Math.max(r, l.left + this.margin), t.applyStyle(i, {
                    top: e - s.top,
                    left: r - s.left
                })
            }, e.prototype.trigger = function (e) {
                this.options[e] && this.options[e].apply(this, Array.prototype.slice.call(arguments, 1))
            }, e
        }(),
        l = function (e) {
            function r() {
                return null !== e && e.apply(this, arguments) || this
            }
            return n(r, e), r.prototype.renderSegHtml = function (e, r) {
                var n, i, o = this.context,
                    s = e.eventRange,
                    l = s.def,
                    a = s.ui,
                    d = l.allDay,
                    c = t.computeEventDraggable(o, l, a),
                    h = d && e.isStart && t.computeEventStartResizable(o, l, a),
                    p = d && e.isEnd && t.computeEventEndResizable(o, l, a),
                    u = this.getSegClasses(e, c, h || p, r),
                    f = t.cssToStr(this.getSkinCss(a)),
                    m = "";
                return u.unshift("fc-day-grid-event", "fc-h-event"), e.isStart && (n = this.getTimeText(s)) && (m = '<span class="fc-time">' + t.htmlEscape(n) + "</span>"), i = '<span class="fc-title">' + (t.htmlEscape(l.title || "") || "&nbsp;") + "</span>", '<a class="' + u.join(" ") + '"' + (l.url ? ' href="' + t.htmlEscape(l.url) + '"' : "") + (f ? ' style="' + f + '"' : "") + '><div class="fc-content">' + ("rtl" === o.options.dir ? i + " " + m : m + " " + i) + "</div>" + (h ? '<div class="fc-resizer fc-start-resizer"></div>' : "") + (p ? '<div class="fc-resizer fc-end-resizer"></div>' : "") + "</a>"
            }, r.prototype.computeEventTimeFormat = function () {
                return {
                    hour: "numeric",
                    minute: "2-digit",
                    omitZeroMinute: !0,
                    meridiem: "narrow"
                }
            }, r.prototype.computeDisplayEventEnd = function () {
                return !1
            }, r
        }(t.FgEventRenderer),
        a = function (e) {
            function r(t) {
                var r = e.call(this) || this;
                return r.dayGrid = t, r
            }
            return n(r, e), r.prototype.attachSegs = function (e, t) {
                var r = this.rowStructs = this.renderSegRows(e);
                this.dayGrid.rowEls.forEach(function (e, t) {
                    e.querySelector(".fc-content-skeleton > table").appendChild(r[t].tbodyEl)
                }), t || this.dayGrid.removeSegPopover()
            }, r.prototype.detachSegs = function () {
                for (var e, r = this.rowStructs || []; e = r.pop();) t.removeElement(e.tbodyEl);
                this.rowStructs = null
            }, r.prototype.renderSegRows = function (e) {
                var t, r, n = [];
                for (t = this.groupSegRows(e), r = 0; r < t.length; r++) n.push(this.renderSegRow(r, t[r]));
                return n
            }, r.prototype.renderSegRow = function (e, r) {
                var n, i, o, s, l, a, d, c = this.context.isRtl,
                    h = this.dayGrid,
                    p = h.colCnt,
                    u = this.buildSegLevels(r),
                    f = Math.max(1, u.length),
                    m = document.createElement("tbody"),
                    g = [],
                    y = [],
                    v = [];

                function b(e) {
                    for (; o < e;)(d = (v[n - 1] || [])[o]) ? d.rowSpan = (d.rowSpan || 1) + 1 : (d = document.createElement("td"), s.appendChild(d)), y[n][o] = d, v[n][o] = d, o++
                }
                for (n = 0; n < f; n++) {
                    if (i = u[n], o = 0, s = document.createElement("tr"), g.push([]), y.push([]), v.push([]), i)
                        for (l = 0; l < i.length; l++) {
                            a = i[l];
                            var S = c ? p - 1 - a.lastCol : a.firstCol,
                                w = c ? p - 1 - a.firstCol : a.lastCol;
                            for (b(S), d = t.createElement("td", {
                                    className: "fc-event-container"
                                }, a.el), S !== w ? d.colSpan = w - S + 1 : v[n][o] = d; o <= w;) y[n][o] = d, g[n][o] = a, o++;
                            s.appendChild(d)
                        }
                    b(p);
                    var C = h.renderProps.renderIntroHtml();
                    C && (c ? t.appendToElement(s, C) : t.prependToElement(s, C)), m.appendChild(s)
                }
                return {
                    row: e,
                    tbodyEl: m,
                    cellMatrix: y,
                    segMatrix: g,
                    segLevels: u,
                    segs: r
                }
            }, r.prototype.buildSegLevels = function (e) {
                var t, r, n, i = this.context.isRtl,
                    o = this.dayGrid.colCnt,
                    s = [];
                for (e = this.sortEventSegs(e), t = 0; t < e.length; t++) {
                    for (r = e[t], n = 0; n < s.length && d(r, s[n]); n++);
                    r.level = n, r.leftCol = i ? o - 1 - r.lastCol : r.firstCol, r.rightCol = i ? o - 1 - r.firstCol : r.lastCol, (s[n] || (s[n] = [])).push(r)
                }
                for (n = 0; n < s.length; n++) s[n].sort(c);
                return s
            }, r.prototype.groupSegRows = function (e) {
                var t, r = [];
                for (t = 0; t < this.dayGrid.rowCnt; t++) r.push([]);
                for (t = 0; t < e.length; t++) r[e[t].row].push(e[t]);
                return r
            }, r.prototype.computeDisplayEventEnd = function () {
                return 1 === this.dayGrid.colCnt
            }, r
        }(l);

    function d(e, t) {
        var r, n;
        for (r = 0; r < t.length; r++)
            if ((n = t[r]).firstCol <= e.lastCol && n.lastCol >= e.firstCol) return !0;
        return !1
    }

    function c(e, t) {
        return e.leftCol - t.leftCol
    }
    var h = function (e) {
            function r() {
                return null !== e && e.apply(this, arguments) || this
            }
            return n(r, e), r.prototype.attachSegs = function (e, r) {
                var n = r.sourceSeg,
                    i = this.rowStructs = this.renderSegRows(e);
                this.dayGrid.rowEls.forEach(function (e, r) {
                    var o, s, l = t.htmlToElement('<div class="fc-mirror-skeleton"><table></table></div>');
                    n && n.row === r ? o = n.el : (o = e.querySelector(".fc-content-skeleton tbody")) || (o = e.querySelector(".fc-content-skeleton table")), s = o.getBoundingClientRect().top - e.getBoundingClientRect().top, l.style.top = s + "px", l.querySelector("table").appendChild(i[r].tbodyEl), e.appendChild(l)
                })
            }, r
        }(a),
        p = function (e) {
            function r(t) {
                var r = e.call(this) || this;
                return r.fillSegTag = "td", r.dayGrid = t, r
            }
            return n(r, e), r.prototype.renderSegs = function (t, r, n) {
                "bgEvent" === t && (n = n.filter(function (e) {
                    return e.eventRange.def.allDay
                })), e.prototype.renderSegs.call(this, t, r, n)
            }, r.prototype.attachSegs = function (e, t) {
                var r, n, i, o = [];
                for (r = 0; r < t.length; r++) n = t[r], i = this.renderFillRow(e, n), this.dayGrid.rowEls[n.row].appendChild(i), o.push(i);
                return o
            }, r.prototype.renderFillRow = function (e, r) {
                var n, i, o, s = this.dayGrid,
                    l = this.context.isRtl,
                    a = s.colCnt,
                    d = l ? a - 1 - r.lastCol : r.firstCol,
                    c = (l ? a - 1 - r.firstCol : r.lastCol) + 1;
                n = "businessHours" === e ? "bgevent" : e.toLowerCase(), o = (i = t.htmlToElement('<div class="fc-' + n + '-skeleton"><table><tr></tr></table></div>')).getElementsByTagName("tr")[0], d > 0 && t.appendToElement(o, new Array(d + 1).join('<td style="pointer-events:none"></td>')), r.el.colSpan = c - d, o.appendChild(r.el), c < a && t.appendToElement(o, new Array(a - c + 1).join('<td style="pointer-events:none"></td>'));
                var h = s.renderProps.renderIntroHtml();
                return h && (l ? t.appendToElement(o, h) : t.prependToElement(o, h)), i
            }, r
        }(t.FillRenderer),
        u = function (e) {
            function r(r) {
                var n = e.call(this, r) || this,
                    i = n.eventRenderer = new f(n),
                    o = n.renderFrame = t.memoizeRendering(n._renderFrame);
                return n.renderFgEvents = t.memoizeRendering(i.renderSegs.bind(i), i.unrender.bind(i), [o]), n.renderEventSelection = t.memoizeRendering(i.selectByInstanceId.bind(i), i.unselectByInstanceId.bind(i), [n.renderFgEvents]), n.renderEventDrag = t.memoizeRendering(i.hideByHash.bind(i), i.showByHash.bind(i), [o]), n.renderEventResize = t.memoizeRendering(i.hideByHash.bind(i), i.showByHash.bind(i), [o]), n
            }
            return n(r, e), r.prototype.firstContext = function (e) {
                e.calendar.registerInteractiveComponent(this, {
                    el: this.el,
                    useEventCenter: !1
                })
            }, r.prototype.render = function (e, t) {
                this.renderFrame(e.date), this.renderFgEvents(t, e.fgSegs), this.renderEventSelection(e.eventSelection), this.renderEventDrag(e.eventDragInstances), this.renderEventResize(e.eventResizeInstances)
            }, r.prototype.destroy = function () {
                e.prototype.destroy.call(this), this.renderFrame.unrender(), this.context.calendar.unregisterInteractiveComponent(this)
            }, r.prototype._renderFrame = function (e) {
                var r = this.context,
                    n = r.theme,
                    i = r.dateEnv,
                    o = r.options,
                    s = i.format(e, t.createFormatter(o.dayPopoverFormat));
                this.el.innerHTML = '<div class="fc-header ' + n.getClass("popoverHeader") + '"><span class="fc-title">' + t.htmlEscape(s) + '</span><span class="fc-close ' + n.getIconClass("close") + '"></span></div><div class="fc-body ' + n.getClass("popoverContent") + '"><div class="fc-event-container"></div></div>', this.segContainerEl = this.el.querySelector(".fc-event-container")
            }, r.prototype.queryHit = function (e, r, n, i) {
                var o = this.props.date;
                if (e < n && r < i) return {
                    component: this,
                    dateSpan: {
                        allDay: !0,
                        range: {
                            start: o,
                            end: t.addDays(o, 1)
                        }
                    },
                    dayEl: this.el,
                    rect: {
                        left: 0,
                        top: 0,
                        right: n,
                        bottom: i
                    },
                    layer: 1
                }
            }, r
        }(t.DateComponent),
        f = function (e) {
            function r(t) {
                var r = e.call(this) || this;
                return r.dayTile = t, r
            }
            return n(r, e), r.prototype.attachSegs = function (e) {
                for (var t = 0, r = e; t < r.length; t++) {
                    var n = r[t];
                    this.dayTile.segContainerEl.appendChild(n.el)
                }
            }, r.prototype.detachSegs = function (e) {
                for (var r = 0, n = e; r < n.length; r++) {
                    var i = n[r];
                    t.removeElement(i.el)
                }
            }, r
        }(l),
        m = function () {
            function e(e) {
                this.context = e
            }
            return e.prototype.renderHtml = function (e) {
                var t = [];
                e.renderIntroHtml && t.push(e.renderIntroHtml());
                for (var r = 0, n = e.cells; r < n.length; r++) {
                    var i = n[r];
                    t.push(g(i.date, e.dateProfile, this.context, i.htmlAttrs))
                }
                return e.cells.length || t.push('<td class="fc-day ' + this.context.theme.getClass("widgetContent") + '"></td>'), "rtl" === this.context.options.dir && t.reverse(), "<tr>" + t.join("") + "</tr>"
            }, e
        }();

    function g(e, r, n, i) {
        var o = n.dateEnv,
            s = n.theme,
            l = t.rangeContainsMarker(r.activeRange, e),
            a = t.getDayClasses(e, r, n);
        return a.unshift("fc-day", s.getClass("widgetContent")), '<td class="' + a.join(" ") + '"' + (l ? ' data-date="' + o.formatIso(e, {
            omitTime: !0
        }) + '"' : "") + (i ? " " + i : "") + "></td>"
    }
    var y = t.createFormatter({
            day: "numeric"
        }),
        v = t.createFormatter({
            week: "numeric"
        }),
        b = function (e) {
            function r(r, n) {
                var i = e.call(this, r) || this;
                i.bottomCoordPadding = 0, i.isCellSizesDirty = !1, i.renderProps = n;
                var o = i.eventRenderer = new a(i),
                    s = i.fillRenderer = new p(i);
                i.mirrorRenderer = new h(i);
                var l = i.renderCells = t.memoizeRendering(i._renderCells, i._unrenderCells);
                return i.renderBusinessHours = t.memoizeRendering(s.renderSegs.bind(s, "businessHours"), s.unrender.bind(s, "businessHours"), [l]), i.renderDateSelection = t.memoizeRendering(s.renderSegs.bind(s, "highlight"), s.unrender.bind(s, "highlight"), [l]), i.renderBgEvents = t.memoizeRendering(s.renderSegs.bind(s, "bgEvent"), s.unrender.bind(s, "bgEvent"), [l]), i.renderFgEvents = t.memoizeRendering(o.renderSegs.bind(o), o.unrender.bind(o), [l]), i.renderEventSelection = t.memoizeRendering(o.selectByInstanceId.bind(o), o.unselectByInstanceId.bind(o), [i.renderFgEvents]), i.renderEventDrag = t.memoizeRendering(i._renderEventDrag, i._unrenderEventDrag, [l]), i.renderEventResize = t.memoizeRendering(i._renderEventResize, i._unrenderEventResize, [l]), i
            }
            return n(r, e), r.prototype.render = function (e, t) {
                var r = e.cells;
                this.rowCnt = r.length, this.colCnt = r[0].length, this.renderCells(r, e.isRigid), this.renderBusinessHours(t, e.businessHourSegs), this.renderDateSelection(t, e.dateSelectionSegs), this.renderBgEvents(t, e.bgEventSegs), this.renderFgEvents(t, e.fgEventSegs), this.renderEventSelection(e.eventSelection), this.renderEventDrag(e.eventDrag), this.renderEventResize(e.eventResize), this.segPopoverTile && this.updateSegPopoverTile()
            }, r.prototype.destroy = function () {
                e.prototype.destroy.call(this), this.renderCells.unrender()
            }, r.prototype.getCellRange = function (e, r) {
                var n = this.props.cells[e][r].date;
                return {
                    start: n,
                    end: t.addDays(n, 1)
                }
            }, r.prototype.updateSegPopoverTile = function (e, t) {
                var r = this.props;
                this.segPopoverTile.receiveProps({
                    date: e || this.segPopoverTile.props.date,
                    fgSegs: t || this.segPopoverTile.props.fgSegs,
                    eventSelection: r.eventSelection,
                    eventDragInstances: r.eventDrag ? r.eventDrag.affectedInstances : null,
                    eventResizeInstances: r.eventResize ? r.eventResize.affectedInstances : null
                }, this.context)
            }, r.prototype._renderCells = function (e, r) {
                var n, i, o = this.context,
                    s = o.calendar,
                    l = o.view,
                    a = o.isRtl,
                    d = o.dateEnv,
                    c = this.rowCnt,
                    h = this.colCnt,
                    p = "";
                for (n = 0; n < c; n++) p += this.renderDayRowHtml(n, r);
                for (this.el.innerHTML = p, this.rowEls = t.findElements(this.el, ".fc-row"), this.cellEls = t.findElements(this.el, ".fc-day, .fc-disabled-day"), a && this.cellEls.reverse(), this.rowPositions = new t.PositionCache(this.el, this.rowEls, !1, !0), this.colPositions = new t.PositionCache(this.el, this.cellEls.slice(0, h), !0, !1), n = 0; n < c; n++)
                    for (i = 0; i < h; i++) s.publiclyTrigger("dayRender", [{
                        date: d.toDate(e[n][i].date),
                        el: this.getCellEl(n, i),
                        view: l
                    }]);
                this.isCellSizesDirty = !0
            }, r.prototype._unrenderCells = function () {
                this.removeSegPopover()
            }, r.prototype.renderDayRowHtml = function (e, t) {
                var r = this.context.theme,
                    n = ["fc-row", "fc-week", r.getClass("dayRow")];
                t && n.push("fc-rigid");
                var i = new m(this.context);
                return '<div class="' + n.join(" ") + '"><div class="fc-bg"><table class="' + r.getClass("tableGrid") + '">' + i.renderHtml({
                    cells: this.props.cells[e],
                    dateProfile: this.props.dateProfile,
                    renderIntroHtml: this.renderProps.renderBgIntroHtml
                }) + '</table></div><div class="fc-content-skeleton"><table>' + (this.getIsNumbersVisible() ? "<thead>" + this.renderNumberTrHtml(e) + "</thead>" : "") + "</table></div></div>"
            }, r.prototype.getIsNumbersVisible = function () {
                return this.getIsDayNumbersVisible() || this.renderProps.cellWeekNumbersVisible || this.renderProps.colWeekNumbersVisible
            }, r.prototype.getIsDayNumbersVisible = function () {
                return this.rowCnt > 1
            }, r.prototype.renderNumberTrHtml = function (e) {
                var t = this.context.isRtl,
                    r = this.renderProps.renderNumberIntroHtml(e, this);
                return "<tr>" + (t ? "" : r) + this.renderNumberCellsHtml(e) + (t ? r : "") + "</tr>"
            }, r.prototype.renderNumberCellsHtml = function (e) {
                var t, r, n = [];
                for (t = 0; t < this.colCnt; t++) r = this.props.cells[e][t].date, n.push(this.renderNumberCellHtml(r));
                return this.context.isRtl && n.reverse(), n.join("")
            }, r.prototype.renderNumberCellHtml = function (e) {
                var r, n, i = this.context,
                    o = i.dateEnv,
                    s = i.options,
                    l = "",
                    a = t.rangeContainsMarker(this.props.dateProfile.activeRange, e),
                    d = this.getIsDayNumbersVisible() && a;
                return d || this.renderProps.cellWeekNumbersVisible ? ((r = t.getDayClasses(e, this.props.dateProfile, this.context)).unshift("fc-day-top"), this.renderProps.cellWeekNumbersVisible && (n = o.weekDow), l += '<td class="' + r.join(" ") + '"' + (a ? ' data-date="' + o.formatIso(e, {
                    omitTime: !0
                }) + '"' : "") + ">", this.renderProps.cellWeekNumbersVisible && e.getUTCDay() === n && (l += t.buildGotoAnchorHtml(s, o, {
                    date: e,
                    type: "week"
                }, {
                    class: "fc-week-number"
                }, o.format(e, v))), d && (l += t.buildGotoAnchorHtml(s, o, e, {
                    class: "fc-day-number"
                }, o.format(e, y))), l += "</td>") : "<td></td>"
            }, r.prototype.updateSize = function (e) {
                var t = this.context.calendar,
                    r = this.fillRenderer,
                    n = this.eventRenderer,
                    i = this.mirrorRenderer;
                (e || this.isCellSizesDirty || t.isEventsUpdated) && (this.buildPositionCaches(), this.isCellSizesDirty = !1), r.computeSizes(e), n.computeSizes(e), i.computeSizes(e), r.assignSizes(e), n.assignSizes(e), i.assignSizes(e)
            }, r.prototype.buildPositionCaches = function () {
                this.buildColPositions(), this.buildRowPositions()
            }, r.prototype.buildColPositions = function () {
                this.colPositions.build()
            }, r.prototype.buildRowPositions = function () {
                this.rowPositions.build(), this.rowPositions.bottoms[this.rowCnt - 1] += this.bottomCoordPadding
            }, r.prototype.positionToHit = function (e, t) {
                var r = this.colPositions,
                    n = this.rowPositions,
                    i = r.leftToIndex(e),
                    o = n.topToIndex(t);
                if (null != o && null != i) return {
                    row: o,
                    col: i,
                    dateSpan: {
                        range: this.getCellRange(o, i),
                        allDay: !0
                    },
                    dayEl: this.getCellEl(o, i),
                    relativeRect: {
                        left: r.lefts[i],
                        right: r.rights[i],
                        top: n.tops[o],
                        bottom: n.bottoms[o]
                    }
                }
            }, r.prototype.getCellEl = function (e, t) {
                return this.cellEls[e * this.colCnt + t]
            }, r.prototype._renderEventDrag = function (e) {
                e && (this.eventRenderer.hideByHash(e.affectedInstances), this.fillRenderer.renderSegs("highlight", this.context, e.segs))
            }, r.prototype._unrenderEventDrag = function (e) {
                e && (this.eventRenderer.showByHash(e.affectedInstances), this.fillRenderer.unrender("highlight", this.context))
            }, r.prototype._renderEventResize = function (e) {
                e && (this.eventRenderer.hideByHash(e.affectedInstances), this.fillRenderer.renderSegs("highlight", this.context, e.segs), this.mirrorRenderer.renderSegs(this.context, e.segs, {
                    isResizing: !0,
                    sourceSeg: e.sourceSeg
                }))
            }, r.prototype._unrenderEventResize = function (e) {
                e && (this.eventRenderer.showByHash(e.affectedInstances), this.fillRenderer.unrender("highlight", this.context), this.mirrorRenderer.unrender(this.context, e.segs, {
                    isResizing: !0,
                    sourceSeg: e.sourceSeg
                }))
            }, r.prototype.removeSegPopover = function () {
                this.segPopover && this.segPopover.hide()
            }, r.prototype.limitRows = function (e) {
                var t, r, n = this.eventRenderer.rowStructs || [];
                for (t = 0; t < n.length; t++) this.unlimitRow(t), !1 !== (r = !!e && ("number" == typeof e ? e : this.computeRowLevelLimit(t))) && this.limitRow(t, r)
            }, r.prototype.computeRowLevelLimit = function (e) {
                var r, n, i = this.rowEls[e].getBoundingClientRect().bottom,
                    o = t.findChildren(this.eventRenderer.rowStructs[e].tbodyEl);
                for (r = 0; r < o.length; r++)
                    if ((n = o[r]).classList.remove("fc-limited"), n.getBoundingClientRect().bottom > i) return r;
                return !1
            }, r.prototype.limitRow = function (e, r) {
                var n, i, o, s, l, a, d, c, h, p, u, f, m, g, y, v = this,
                    b = this.colCnt,
                    S = this.context.isRtl,
                    w = this.eventRenderer.rowStructs[e],
                    C = [],
                    E = 0,
                    R = function (n) {
                        for (; E < n;)(a = v.getCellSegs(e, E, r)).length && (h = i[r - 1][E], y = v.renderMoreLink(e, E, a), g = t.createElement("div", null, y), h.appendChild(g), C.push(g)), E++
                    };
                if (r && r < w.segLevels.length) {
                    for (n = w.segLevels[r - 1], i = w.cellMatrix, (o = t.findChildren(w.tbodyEl).slice(r)).forEach(function (e) {
                            e.classList.add("fc-limited")
                        }), s = 0; s < n.length; s++) {
                        l = n[s];
                        var H = S ? b - 1 - l.lastCol : l.firstCol,
                            k = S ? b - 1 - l.firstCol : l.lastCol;
                        for (R(H), c = [], d = 0; E <= k;) a = this.getCellSegs(e, E, r), c.push(a), d += a.length, E++;
                        if (d) {
                            for (p = (h = i[r - 1][H]).rowSpan || 1, u = [], f = 0; f < c.length; f++) m = t.createElement("td", {
                                className: "fc-more-cell",
                                rowSpan: p
                            }), a = c[f], y = this.renderMoreLink(e, H + f, [l].concat(a)), g = t.createElement("div", null, y), m.appendChild(g), u.push(m), C.push(m);
                            h.classList.add("fc-limited"), t.insertAfterElement(h, u), o.push(h)
                        }
                    }
                    R(this.colCnt), w.moreEls = C, w.limitedEls = o
                }
            }, r.prototype.unlimitRow = function (e) {
                var r = this.eventRenderer.rowStructs[e];
                r.moreEls && (r.moreEls.forEach(t.removeElement), r.moreEls = null), r.limitedEls && (r.limitedEls.forEach(function (e) {
                    e.classList.remove("fc-limited")
                }), r.limitedEls = null)
            }, r.prototype.renderMoreLink = function (e, r, n) {
                var i = this,
                    o = this.context,
                    s = o.calendar,
                    l = o.view,
                    a = o.dateEnv,
                    d = o.options,
                    c = o.isRtl,
                    h = t.createElement("a", {
                        className: "fc-more"
                    });
                return h.innerText = this.getMoreLinkText(n.length), h.addEventListener("click", function (t) {
                    var o = d.eventLimitClick,
                        h = c ? i.colCnt - r - 1 : r,
                        p = i.props.cells[e][h].date,
                        u = t.currentTarget,
                        f = i.getCellEl(e, r),
                        m = i.getCellSegs(e, r),
                        g = i.resliceDaySegs(m, p),
                        y = i.resliceDaySegs(n, p);
                    "function" == typeof o && (o = s.publiclyTrigger("eventLimitClick", [{
                        date: a.toDate(p),
                        allDay: !0,
                        dayEl: f,
                        moreEl: u,
                        segs: g,
                        hiddenSegs: y,
                        jsEvent: t,
                        view: l
                    }])), "popover" === o ? i.showSegPopover(e, r, u, g) : "string" == typeof o && s.zoomTo(p, o)
                }), h
            }, r.prototype.showSegPopover = function (e, r, n, i) {
                var o, l, a = this,
                    d = this.context,
                    c = d.calendar,
                    h = d.view,
                    p = d.theme,
                    f = d.isRtl,
                    m = f ? this.colCnt - r - 1 : r,
                    g = n.parentNode;
                o = 1 === this.rowCnt ? h.el : this.rowEls[e], l = {
                    className: "fc-more-popover " + p.getClass("popover"),
                    parentEl: h.el,
                    top: t.computeRect(o).top,
                    autoHide: !0,
                    content: function (t) {
                        a.segPopoverTile = new u(t), a.updateSegPopoverTile(a.props.cells[e][m].date, i)
                    },
                    hide: function () {
                        a.segPopoverTile.destroy(), a.segPopoverTile = null, a.segPopover.destroy(), a.segPopover = null
                    }
                }, f ? l.right = t.computeRect(g).right + 1 : l.left = t.computeRect(g).left - 1, this.segPopover = new s(l), this.segPopover.show(), c.releaseAfterSizingTriggers()
            }, r.prototype.resliceDaySegs = function (e, r) {
                for (var n = r, o = {
                        start: n,
                        end: t.addDays(n, 1)
                    }, s = [], l = 0, a = e; l < a.length; l++) {
                    var d = a[l],
                        c = d.eventRange,
                        h = c.range,
                        p = t.intersectRanges(h, o);
                    p && s.push(i({}, d, {
                        eventRange: {
                            def: c.def,
                            ui: i({}, c.ui, {
                                durationEditable: !1
                            }),
                            instance: c.instance,
                            range: p
                        },
                        isStart: d.isStart && p.start.valueOf() === h.start.valueOf(),
                        isEnd: d.isEnd && p.end.valueOf() === h.end.valueOf()
                    }))
                }
                return s
            }, r.prototype.getMoreLinkText = function (e) {
                var t = this.context.options.eventLimitText;
                return "function" == typeof t ? t(e) : "+" + e + " " + t
            }, r.prototype.getCellSegs = function (e, t, r) {
                for (var n, i = this.eventRenderer.rowStructs[e].segMatrix, o = r || 0, s = []; o < i.length;)(n = i[o][t]) && s.push(n), o++;
                return s
            }, r
        }(t.DateComponent),
        S = t.createFormatter({
            week: "numeric"
        }),
        w = function (e) {
            function r() {
                var r = null !== e && e.apply(this, arguments) || this;
                return r.processOptions = t.memoize(r._processOptions), r.renderSkeleton = t.memoizeRendering(r._renderSkeleton, r._unrenderSkeleton), r.renderHeadIntroHtml = function () {
                    var e = r.context,
                        n = e.theme,
                        i = e.options;
                    return r.colWeekNumbersVisible ? '<th class="fc-week-number ' + n.getClass("widgetHeader") + '" ' + r.weekNumberStyleAttr() + "><span>" + t.htmlEscape(i.weekLabel) + "</span></th>" : ""
                }, r.renderDayGridNumberIntroHtml = function (e, n) {
                    var i = r.context,
                        o = i.options,
                        s = i.dateEnv,
                        l = n.props.cells[e][0].date;
                    return r.colWeekNumbersVisible ? '<td class="fc-week-number" ' + r.weekNumberStyleAttr() + ">" + t.buildGotoAnchorHtml(o, s, {
                        date: l,
                        type: "week",
                        forceOff: 1 === n.colCnt
                    }, s.format(l, S)) + "</td>" : ""
                }, r.renderDayGridBgIntroHtml = function () {
                    var e = r.context.theme;
                    return r.colWeekNumbersVisible ? '<td class="fc-week-number ' + e.getClass("widgetContent") + '" ' + r.weekNumberStyleAttr() + "></td>" : ""
                }, r.renderDayGridIntroHtml = function () {
                    return r.colWeekNumbersVisible ? '<td class="fc-week-number" ' + r.weekNumberStyleAttr() + "></td>" : ""
                }, r
            }
            return n(r, e), r.prototype._processOptions = function (e) {
                e.weekNumbers ? e.weekNumbersWithinDays ? (this.cellWeekNumbersVisible = !0, this.colWeekNumbersVisible = !1) : (this.cellWeekNumbersVisible = !1, this.colWeekNumbersVisible = !0) : (this.colWeekNumbersVisible = !1, this.cellWeekNumbersVisible = !1)
            }, r.prototype.render = function (t, r) {
                e.prototype.render.call(this, t, r), this.processOptions(r.options), this.renderSkeleton(r)
            }, r.prototype.destroy = function () {
                e.prototype.destroy.call(this), this.renderSkeleton.unrender()
            }, r.prototype._renderSkeleton = function (e) {
                this.el.classList.add("fc-dayGrid-view"), this.el.innerHTML = this.renderSkeletonHtml(), this.scroller = new t.ScrollComponent("hidden", "auto");
                var r = this.scroller.el;
                this.el.querySelector(".fc-body > tr > td").appendChild(r), r.classList.add("fc-day-grid-container");
                var n = t.createElement("div", {
                    className: "fc-day-grid"
                });
                r.appendChild(n), this.dayGrid = new b(n, {
                    renderNumberIntroHtml: this.renderDayGridNumberIntroHtml,
                    renderBgIntroHtml: this.renderDayGridBgIntroHtml,
                    renderIntroHtml: this.renderDayGridIntroHtml,
                    colWeekNumbersVisible: this.colWeekNumbersVisible,
                    cellWeekNumbersVisible: this.cellWeekNumbersVisible
                })
            }, r.prototype._unrenderSkeleton = function () {
                this.el.classList.remove("fc-dayGrid-view"), this.dayGrid.destroy(), this.scroller.destroy()
            }, r.prototype.renderSkeletonHtml = function () {
                var e = this.context,
                    t = e.theme,
                    r = e.options;
                return '<table class="' + t.getClass("tableGrid") + '">' + (r.columnHeader ? '<thead class="fc-head"><tr><td class="fc-head-container ' + t.getClass("widgetHeader") + '">&nbsp;</td></tr></thead>' : "") + '<tbody class="fc-body"><tr><td class="' + t.getClass("widgetContent") + '"></td></tr></tbody></table>'
            }, r.prototype.weekNumberStyleAttr = function () {
                return null != this.weekNumberWidth ? 'style="width:' + this.weekNumberWidth + 'px"' : ""
            }, r.prototype.hasRigidRows = function () {
                var e = this.context.options.eventLimit;
                return e && "number" != typeof e
            }, r.prototype.updateSize = function (t, r, n) {
                e.prototype.updateSize.call(this, t, r, n), this.dayGrid.updateSize(t)
            }, r.prototype.updateBaseSize = function (e, r, n) {
                var i, o, s = this.dayGrid,
                    l = this.context.options.eventLimit,
                    a = this.header ? this.header.el : null;
                s.rowEls ? (this.colWeekNumbersVisible && (this.weekNumberWidth = t.matchCellWidths(t.findElements(this.el, ".fc-week-number"))), this.scroller.clear(), a && t.uncompensateScroll(a), s.removeSegPopover(), l && "number" == typeof l && s.limitRows(l), i = this.computeScrollerHeight(r), this.setGridHeight(i, n), l && "number" != typeof l && s.limitRows(l), n || (this.scroller.setHeight(i), ((o = this.scroller.getScrollbarWidths()).left || o.right) && (a && t.compensateScroll(a, o), i = this.computeScrollerHeight(r), this.scroller.setHeight(i)), this.scroller.lockOverflow(o))) : n || (i = this.computeScrollerHeight(r), this.scroller.setHeight(i))
            }, r.prototype.computeScrollerHeight = function (e) {
                return e - t.subtractInnerElHeight(this.el, this.scroller.el)
            }, r.prototype.setGridHeight = function (e, r) {
                this.context.options.monthMode ? (r && (e *= this.dayGrid.rowCnt / 6), t.distributeHeight(this.dayGrid.rowEls, e, !r)) : r ? t.undistributeHeight(this.dayGrid.rowEls) : t.distributeHeight(this.dayGrid.rowEls, e, !0)
            }, r.prototype.computeDateScroll = function (e) {
                return {
                    top: 0
                }
            }, r.prototype.queryDateScroll = function () {
                return {
                    top: this.scroller.getScrollTop()
                }
            }, r.prototype.applyDateScroll = function (e) {
                void 0 !== e.top && this.scroller.setScrollTop(e.top)
            }, r
        }(t.View);
    w.prototype.dateProfileGeneratorClass = o;
    var C = function (e) {
            function t(t) {
                var r = e.call(this, t.el) || this;
                return r.slicer = new E, r.dayGrid = t, r
            }
            return n(t, e), t.prototype.firstContext = function (e) {
                e.calendar.registerInteractiveComponent(this, {
                    el: this.dayGrid.el
                })
            }, t.prototype.destroy = function () {
                e.prototype.destroy.call(this), this.context.calendar.unregisterInteractiveComponent(this)
            }, t.prototype.render = function (e, t) {
                var r = this.dayGrid,
                    n = e.dateProfile,
                    o = e.dayTable;
                r.receiveProps(i({}, this.slicer.sliceProps(e, n, e.nextDayThreshold, t.calendar, r, o), {
                    dateProfile: n,
                    cells: o.cells,
                    isRigid: e.isRigid
                }), t)
            }, t.prototype.buildPositionCaches = function () {
                this.dayGrid.buildPositionCaches()
            }, t.prototype.queryHit = function (e, t) {
                var r = this.dayGrid.positionToHit(e, t);
                if (r) return {
                    component: this.dayGrid,
                    dateSpan: r.dateSpan,
                    dayEl: r.dayEl,
                    rect: {
                        left: r.relativeRect.left,
                        right: r.relativeRect.right,
                        top: r.relativeRect.top,
                        bottom: r.relativeRect.bottom
                    },
                    layer: 0
                }
            }, t
        }(t.DateComponent),
        E = function (e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return n(t, e), t.prototype.sliceRange = function (e, t) {
                return t.sliceRange(e)
            }, t
        }(t.Slicer),
        R = function (e) {
            function r() {
                var r = null !== e && e.apply(this, arguments) || this;
                return r.buildDayTable = t.memoize(H), r
            }
            return n(r, e), r.prototype.render = function (t, r) {
                e.prototype.render.call(this, t, r);
                var n = this.props.dateProfile,
                    i = this.dayTable = this.buildDayTable(n, t.dateProfileGenerator);
                this.header && this.header.receiveProps({
                    dateProfile: n,
                    dates: i.headerDates,
                    datesRepDistinctDays: 1 === i.rowCnt,
                    renderIntroHtml: this.renderHeadIntroHtml
                }, r), this.simpleDayGrid.receiveProps({
                    dateProfile: n,
                    dayTable: i,
                    businessHours: t.businessHours,
                    dateSelection: t.dateSelection,
                    eventStore: t.eventStore,
                    eventUiBases: t.eventUiBases,
                    eventSelection: t.eventSelection,
                    eventDrag: t.eventDrag,
                    eventResize: t.eventResize,
                    isRigid: this.hasRigidRows(),
                    nextDayThreshold: this.context.nextDayThreshold
                }, r)
            }, r.prototype._renderSkeleton = function (r) {
                e.prototype._renderSkeleton.call(this, r), r.options.columnHeader && (this.header = new t.DayHeader(this.el.querySelector(".fc-head-container"))), this.simpleDayGrid = new C(this.dayGrid)
            }, r.prototype._unrenderSkeleton = function () {
                e.prototype._unrenderSkeleton.call(this), this.header && this.header.destroy(), this.simpleDayGrid.destroy()
            }, r
        }(w);

    function H(e, r) {
        var n = new t.DaySeries(e.renderRange, r);
        return new t.DayTable(n, /year|month|week/.test(e.currentRangeUnit))
    }
    var k = t.createPlugin({
        defaultView: "dayGridMonth",
        views: {
            dayGrid: R,
            dayGridDay: {
                type: "dayGrid",
                duration: {
                    days: 1
                }
            },
            dayGridWeek: {
                type: "dayGrid",
                duration: {
                    weeks: 1
                }
            },
            dayGridMonth: {
                type: "dayGrid",
                duration: {
                    months: 1
                },
                monthMode: !0,
                fixedWeekCount: !0
            }
        }
    });
    e.AbstractDayGridView = w, e.DayBgRow = m, e.DayGrid = b, e.DayGridSlicer = E, e.DayGridView = R, e.SimpleDayGrid = C, e.buildBasicDayTable = H, e.default = k, Object.defineProperty(e, "__esModule", {
        value: !0
    })
});
