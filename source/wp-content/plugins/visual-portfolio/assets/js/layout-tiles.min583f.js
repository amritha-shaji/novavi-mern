!(function () {
  const t = window.jQuery,
    { screenSizes: o } = window.VPData;
  if (void 0 !== window.Isotope && void 0 !== window.Isotope.LayoutMode) {
    const e = window.Isotope.LayoutMode.modes.masonry;
    if (e) {
      const n = e.prototype.measureColumns;
      e.prototype.measureColumns = function () {
        let e = !0;
        if (!this.columnWidth) {
          const n = t(this.element).closest(
            '.vp-portfolio[data-vp-layout="tiles"]'
          );
          if (n.length && n[0].vpf) {
            this.getContainerWidth();
            const { vpf: t } = n[0],
              i = t.getTilesSettings();
            let s = parseInt(i[0], 10) || 1,
              p = s - 1,
              a = Math.min(o.length - 1, p);
            for (; 0 <= a; a -= 1)
              0 < p && void 0 !== o[a] && window.innerWidth <= o[a] && (s = p),
                (p -= 1);
            s &&
              ((this.columnWidth = this.containerWidth / s),
              (this.columnWidth += this.gutter),
              (this.cols = s),
              (e = !1));
          }
        }
        e && n.call(this);
      };
    }
  }
  t(document).on("extendClass.vpf", (t, o) => {
    "vpf" === t.namespace &&
      (o.prototype.getTilesSettings = function () {
        const t = this.options.tilesType.split(/[:|]/);
        return void 0 === t[t.length - 1] || t[t.length - 1] || t.pop(), t;
      });
  }),
    t(document).on("initOptions.vpf", (t, o) => {
      "vpf" === t.namespace &&
        ((o.defaults.tilesType = "3|1,1|"),
        o.options.tilesType || (o.options.tilesType = o.defaults.tilesType));
    }),
    t(document).on("initLayout.vpf", (t, e) => {
      if ("vpf" !== t.namespace) return;
      if ("tiles" !== e.options.layout) return;
      const n = e.getTilesSettings(),
        i = parseInt(n[0], 10) || 1;
      if (
        (n.shift(),
        e.addStyle(".vp-portfolio__item-wrap", {
          width: "".concat(100 / i, "%"),
        }),
        n && n.length)
      )
        for (let t = 0; t < n.length; t += 1) {
          const o = n[t].split(","),
            s = parseFloat(o[0]) || 1,
            p = parseFloat(o[1]) || 1;
          let a = ".vp-portfolio__item-wrap";
          1 < n.length &&
            (a += ":nth-of-type(".concat(n.length, "n+").concat(t + 1, ")")),
            s &&
              1 !== s &&
              e.addStyle(a, { width: "".concat((100 * s) / i, "%") }),
            e.addStyle("".concat(a, " .vp-portfolio__item-img-wrap::before"), {
              "padding-top": "".concat(100 * p, "%"),
            });
        }
      let s = i - 1,
        p = Math.min(o.length - 1, s);
      for (; 0 <= p; p -= 1)
        0 < s &&
          void 0 !== o[p] &&
          (e.addStyle(
            ".vp-portfolio__item-wrap",
            { width: "".concat(100 / s, "%") },
            "screen and (max-width: ".concat(o[p], "px)")
          ),
          e.addStyle(
            ".vp-portfolio__item-wrap:nth-of-type(n)",
            { width: "".concat(100 / s, "%") },
            "screen and (max-width: ".concat(o[p], "px)")
          )),
          (s -= 1);
    });
})();
