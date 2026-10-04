
      const f2 = (n) =>
        isFinite(n)
          ? n.toLocaleString("it-IT", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : "—";
      const f4 = (n) =>
        isFinite(n)
          ? n.toLocaleString("it-IT", {
              minimumFractionDigits: 4,
              maximumFractionDigits: 4,
            })
          : "—";
      const nums = (s) =>
        s
          .split(/[;\s]+/)
          .filter(Boolean)
          .map((x) => parseFloat(x.replace(",", ".")))
          .filter((x) => !isNaN(x));
      const K = (l, v, h) =>
        `<div class="k${h ? " h" : ""}"><span>${l}</span><b>${v}</b></div>`;
      const ks = (a) => `<div class="ks">${a.join("")}</div>`;
      const PAL = ["#3b6fd8", "#d4a62a", "#12a07a", "#e0475f"];
      let gid = 0;
      const nice = (a, b, n = 5) => {
        const r = b - a || 1,
          s = 10 ** Math.floor(Math.log10(r / n)),
          e = r / n / s,
          st = (e < 1.5 ? 1 : e < 3 ? 2 : e < 7 ? 5 : 10) * s,
          t = [];
        for (
          let v = Math.floor(a / st + 1e-9) * st;
          v <= b + st * 0.001;
          v += st
        )
          t.push(+v.toFixed(10));
        return t;
      };
      const sh = (n) => {
        const a = Math.abs(n);
        return a >= 1e6
          ? (n / 1e6).toLocaleString("it-IT", { maximumFractionDigits: 1 }) +
              " M"
          : a >= 1e4
            ? (n / 1e3).toLocaleString("it-IT", { maximumFractionDigits: 1 }) +
              " k"
            : n.toLocaleString("it-IT", { maximumFractionDigits: 2 });
      };
      function plot(o) {
        const W = Math.min(760, out.clientWidth || 600),
          S = W < 420,
          H = S ? 215 : 260,
          L = S ? 42 : 50,
          R = 10,
          T = 16,
          B = 30,
          id = "g" + gid++,
          xs = o.xs,
          bs = o.bars || [],
          ls = o.lines || [],
          yf = o.yf || f2,
          xf = o.xf || sh,
          n = xs.length,
          all = [...bs, ...ls],
          vals = [];
        if (bs.length || o.zero) vals.push(0);
        xs.forEach((_, i) => {
          let p = 0,
            q = 0;
          bs.forEach((b) => {
            const v = b.v[i];
            if (o.stack) {
              v >= 0 ? (p += v) : (q += v);
            } else vals.push(v);
          });
          if (o.stack) vals.push(p, q);
        });
        ls.forEach((l) => vals.push(...l.v));
        (o.marks || []).forEach((m) => vals.push(m.y));
        let lo = Math.min(...vals),
          hi = Math.max(...vals);
        if (!bs.length && !o.zero) {
          const p = (hi - lo) * 0.06 || 1;
          lo -= p;
          hi += p;
        }
        const yt = nice(lo, hi),
          y0 = yt[0],
          y1 = yt[yt.length - 1],
          xm = Math.min(...xs),
          xM = Math.max(...xs),
          st = n > 1 ? (xM - xm) / (n - 1) : 1;
        let x0 = xm,
          x1 = xM;
        if (bs.length) {
          x0 -= st / 2;
          x1 += st / 2;
        } else if (x0 == x1) {
          x0--;
          x1++;
        }
        const X = (x) => L + ((x - x0) / (x1 - x0)) * (W - L - R),
          Y = (y) => T + ((y1 - y) / (y1 - y0)) * (H - T - B),
          b0 = Y(Math.min(Math.max(0, y0), y1));
        let s = `<defs>${ls.map((l, i) => (l.a ? `<linearGradient id="${id}${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${l.c}" stop-opacity=".35"/><stop offset="1" stop-color="${l.c}" stop-opacity="0"/></linearGradient>` : "")).join("")}</defs>`;
        yt.forEach(
          (t) =>
            (s += `<line class="gr" x1="${L}" x2="${W - R}" y1="${Y(t)}" y2="${Y(t)}"/><text class="ax" x="${L - 6}" y="${Y(t) + 3.5}" text-anchor="end">${sh(t)}</text>`),
        );
        if (y0 < 0 && y1 > 0)
          s += `<line class="z" x1="${L}" x2="${W - R}" y1="${Y(0)}" y2="${Y(0)}"/>`;
        nice(xm, xM, S ? 4 : 7)
          .filter((t) => t >= xm - 1e-9 && t <= xM + 1e-9)
          .forEach(
            (t) =>
              (s += `<text class="ax" x="${X(t)}" y="${H - 10}" text-anchor="middle">${xf(t)}</text>`),
          );
        const bw = X(x0 + st) - X(x0),
          gw = (bw * 0.7) / (o.stack ? 1 : bs.length),
          ps = Array(n).fill(0),
          ng = Array(n).fill(0);
        bs.forEach((b, k) =>
          xs.forEach((x, i) => {
            const v = b.v[i];
            if (!v) return;
            let a = 0;
            if (o.stack) {
              a = v >= 0 ? ps[i] : ng[i];
              v >= 0 ? (ps[i] += v) : (ng[i] += v);
            }
            const yA = Y(a),
              yB = Y(a + v),
              xl =
                X(x) -
                (gw * (o.stack ? 1 : bs.length)) / 2 +
                (o.stack ? 0 : k * gw);
            s += `<rect x="${xl}" y="${Math.min(yA, yB)}" width="${Math.max(1, gw)}" height="${Math.max(1, Math.abs(yA - yB))}" rx="${Math.min(3, gw / 2)}" fill="${b.c}" opacity=".92"/>`;
          }),
        );
        ls.forEach((l, k) => {
          const d = xs
            .map(
              (x, i) =>
                (i ? "L" : "M") + X(x).toFixed(1) + " " + Y(l.v[i]).toFixed(1),
            )
            .join("");
          if (l.a)
            s += `<path d="${d}L${X(xs[n - 1])} ${b0}L${X(xs[0])} ${b0}Z" fill="url(#${id}${k})"/>`;
          s += `<path d="${d}" fill="none" stroke="${l.c}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"${l.d ? ` stroke-dasharray="${l.d}"` : ""}/>`;
        });
        const k = Math.ceil(n / 120),
          hw = (W - L - R) / Math.ceil(n / k);
        xs.forEach((x, i) => {
          if (i % k) return;
          const tp =
            `<b>${o.lb ? o.lb[i] : xf(x)}</b><br>` +
            all
              .map(
                (q) =>
                  `<i style='background:${q.c}'></i>${q.n}: <b>${yf(q.v[i])}</b>`,
              )
              .join("<br>");
          s += `<rect class="hit" x="${X(x) - hw / 2}" y="${T}" width="${hw}" height="${H - T - B}" data-tip="${tp}"/>`;
        });
        (o.vl || []).forEach((m) => {
          const x = X(m.x);
          s += `<line x1="${x}" x2="${x}" y1="${T}" y2="${H - B}" stroke="${m.c}" stroke-width="1.5" stroke-dasharray="4 4"/><text class="ax" x="${Math.min(W - R - 50, Math.max(L + 50, x))}" y="${T - 4}" text-anchor="middle" style="fill:${m.c};font-weight:700">${m.l}</text>`;
        });
        (o.marks || []).forEach(
          (m) =>
            (s += `<circle cx="${X(m.x)}" cy="${Y(m.y)}" r="5.5" fill="${m.c}" stroke="var(--card)" stroke-width="2" data-tip="${m.l}"/>`),
        );
        return `<div class="ch"><h3>${o.t}</h3><div class="lg">${all.map((q) => `<span><i style="background:${q.c}"></i>${q.n}</span>`).join("")}</div><svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${s}</svg></div>`;
      }
      function donut(t, p, c) {
        const tot = p.reduce((a, x) => a + x.v, 0) || 1,
          r = 54,
          C = 2 * Math.PI * r;
        let o = 0;
        const arcs = p
          .map((x) => {
            const l = (x.v / tot) * C,
              e = `<circle cx="70" cy="70" r="${r}" fill="none" stroke="${x.c}" stroke-width="18" stroke-dasharray="${l} ${C - l}" stroke-dashoffset="${-o}" transform="rotate(-90 70 70)" data-tip="<i style='background:${x.c}'></i>${x.n}: <b>${f2(x.v)}</b>"/>`;
            o += l;
            return e;
          })
          .join("");
        return `<div class="ch dn"><svg width="140" height="140" viewBox="0 0 140 140">${arcs}<text x="70" y="70" text-anchor="middle" style="font-size:19px;font-weight:700;fill:var(--tx)">${f2((p[1].v / tot) * 100)}%</text><text class="ax" x="70" y="87" text-anchor="middle">${c}</text></svg><div><h3>${t}</h3><div class="lg">${p.map((x) => `<span><i style="background:${x.c}"></i>${x.n}: <b>${f2(x.v)}</b></span>`).join("")}</div></div></div>`;
      }
      function ammCh(R, C, t0, ti) {
        const g = Math.ceil(R.length / 60),
          G = [];
        for (let j = 0; j < R.length; j += g) {
          const q = R.slice(j, j + g);
          G.push([
            q[0][0],
            q[q.length - 1][0],
            q.reduce((a, r) => a + r[2], 0),
            q.reduce((a, r) => a + r[3], 0),
          ]);
        }
        const RR = (t0 ? [[0, 0, 0, 0, C]] : []).concat(R);
        return (
          donut(
            "Capitale e interessi",
            [
              { n: "Capitale", v: C, c: PAL[0] },
              { n: "Interessi", v: ti, c: PAL[1] },
            ],
            "interessi",
          ) +
          plot({
            t: "Composizione della rata" + (g > 1 ? " (aggregata)" : ""),
            xs: G.map((_, j) => j + 1),
            stack: 1,
            bars: [
              { n: "Quota capitale", c: PAL[0], v: G.map((x) => x[2]) },
              { n: "Quota interessi", c: PAL[1], v: G.map((x) => x[3]) },
            ],
            lb: G.map((x) =>
              g > 1 ? `Periodi ${x[0]}–${x[1]}` : `Periodo ${x[0]}`,
            ),
            xf: (x) => Math.round(R[0][0] + (x - 1) * g),
          }) +
          plot({
            t: "Debito residuo",
            xs: RR.map((r) => r[0]),
            zero: 1,
            lines: [
              { n: "Debito residuo", c: PAL[2], a: 1, v: RR.map((r) => r[4]) },
            ],
            lb: RR.map((r) => "Periodo " + r[0]),
          })
        );
      }
      function ricPlan(v, N, i) {
        const C = v.C,
          m = +v.m,
          i2 = (1 + v.rr / 100) ** (1 / m) - 1,
          s = i2 ? (C * i2) / ((1 + i2) ** N - 1) : C / N,
          I = C * i,
          R = [];
        let F = 0;
        for (let k = 1; k <= N; k++) {
          const g = F * i2;
          F += g + s;
          R.push([k, I, s, g, k == N ? C : F, I + s]);
        }
        const out_ = I + s,
          tot = out_ * N,
          ig = C - N * s,
          net = N * I - ig,
          q = (j) => {
            let z = 0;
            for (let k = 1; k <= N; k++) z += out_ * (1 + j) ** -k;
            return z - C;
          };
        let lo = 0,
          hi = 1;
        for (let z = 0; z < 80; z++) {
          const mid = (lo + hi) / 2;
          q(mid) > 0 ? (lo = mid) : (hi = mid);
        }
        const cost = ((1 + lo) ** m - 1) * 100,
          xs = [...Array(N + 1).keys()],
          fund = [0, ...R.map((r) => r[4])];
        return (
          ks([
            K("Rata costitutiva", f2(s), 1),
            K("Interessi al creditore (per periodo)", f2(I)),
            K("Esborso periodico totale", f2(out_)),
            K("Totale versato", f2(tot)),
            K("Interessi maturati sul fondo", f2(ig)),
            K("Interessi netti a carico", f2(net)),
            K("Costo effettivo annuo", f2(cost) + "%"),
            K("Tasso periodale ricostituzione", f4(i2 * 100) + "%"),
          ]) +
          `<p class="note">Americano con ricostituzione: ogni periodo paghi gli interessi C·i al creditore e versi la rata costitutiva s in un fondo che rende i′ (periodale). Alla scadenza il fondo vale esattamente C e rimborsa il prestito in un’unica soluzione. Se i′ &lt; i il costo effettivo supera il tasso del prestito.</p>` +
          `<div class="tb"><table><tr><th>Periodo</th><th>Interessi al creditore</th><th>Rata costitutiva</th><th>Interessi sul fondo</th><th>Capitale costituito</th><th>Esborso totale</th></tr>${R.map(
            (r) =>
              `<tr><td>${r[0]}</td>${r
                .slice(1)
                .map((x) => `<td>${f2(x)}</td>`)
                .join("")}</tr>`,
          ).join("")}</table></div>` +
          plot({
            t: "Esborso periodico: interessi e rata costitutiva",
            xs: R.map((r) => r[0]),
            stack: 1,
            bars: [
              { n: "Interessi al creditore", c: PAL[1], v: R.map((r) => r[1]) },
              { n: "Rata costitutiva", c: PAL[0], v: R.map((r) => r[2]) },
            ],
            lb: R.map((r) => "Periodo " + r[0]),
          }) +
          plot({
            t: "Costituzione del capitale",
            xs,
            zero: 1,
            lines: [
              { n: "Capitale costituito", c: PAL[2], a: 1, v: fund },
              {
                n: "Debito da rimborsare",
                c: PAL[3],
                d: "5 4",
                v: xs.map(() => C),
              },
            ],
            lb: xs.map((t) => "Periodo " + t),
          })
        );
      }
      function somCh(C, i, n) {
        if (!(n > 0)) return "";
        const xs = [...Array(41)].map((_, j) => (n * j) / 40);
        return plot({
          t: "Capitalizzazione e attualizzazione",
          xs,
          zero: 1,
          lines: [
            {
              n: "Montante C(1+i)^t",
              c: PAL[0],
              a: 1,
              v: xs.map((t) => C * (1 + i) ** t),
            },
            {
              n: "Valore attuale C(1+i)^−t",
              c: PAL[2],
              a: 1,
              v: xs.map((t) => C * (1 + i) ** -t),
            },
          ],
          lb: xs.map((t) => "t = " + sh(t)),
        });
      }
      function rendCh(fl, i, a) {
        const N = fl.length;
        if (N < 1) return "";
        const ts = fl.map((_, k) => k + a);
        let A = 0;
        const ac = fl.map((x) => (A = A * (1 + i) + x)),
          xe = a ? ts : ts.concat(N),
          ye = a ? ac : ac.concat(A * (1 + i));
        return (
          plot({
            t: "Rata nominale e valore attuale",
            xs: ts,
            bars: [
              { n: "Rata", c: PAL[0], v: fl },
              {
                n: "Valore attuale",
                c: PAL[2],
                v: fl.map((x, k) => x * (1 + i) ** -(k + a)),
              },
            ],
            lb: ts.map((t) => "t = " + t),
          }) +
          plot({
            t: "Montante accumulato nel tempo",
            xs: xe,
            zero: 1,
            lines: [{ n: "Montante", c: PAL[1], a: 1, v: ye }],
            lb: xe.map((t) => "t = " + t),
          })
        );
      }
      function conCh(C, i, dl, t) {
        if (!isFinite(dl)) return "";
        const T0 = t > 0 ? t : 1,
          xs = [...Array(41)].map((_, j) => (T0 * j) / 40),
          xm = Math.max(20, Math.ceil(i * 180)),
          ys = [...Array(41)].map((_, j) => (xm * j) / 40);
        return (
          plot({
            t: "Capitalizzazione continua (= composta) vs semplice",
            xs,
            zero: 1,
            lines: [
              {
                n: "Continua C·e^(δt)",
                c: PAL[0],
                a: 1,
                v: xs.map((x) => C * Math.exp(dl * x)),
              },
              {
                n: "Interesse semplice",
                c: PAL[1],
                d: "5 4",
                v: xs.map((x) => C * (1 + i * x)),
              },
              {
                n: "Sconto C·e^(−δt)",
                c: PAL[2],
                v: xs.map((x) => C * Math.exp(-dl * x)),
              },
            ],
            lb: xs.map((x) => "t = " + sh(x)),
          }) +
          plot({
            t: "Relazione tra i e δ",
            xs: ys,
            lines: [
              {
                n: "δ = ln(1+i)",
                c: PAL[0],
                a: 1,
                v: ys.map((x) => Math.log(1 + x / 100) * 100),
              },
              { n: "δ = i", c: PAL[1], d: "5 4", v: ys },
            ],
            marks: [
              {
                x: i * 100,
                y: dl * 100,
                c: PAL[3],
                l: `i = ${f2(i * 100)}% → δ = ${f2(dl * 100)}%`,
              },
            ],
            yf: (x) => f2(x) + "%",
            xf: (x) => sh(x) + "%",
            lb: ys.map((x) => "i = " + f2(x) + "%"),
          })
        );
      }
      function durCh(ts, cf, Y, P, Dm, Dx, Cv) {
        const pv = ts.map((t, j) => cf[j] * (1 + Y) ** -t),
          pa = (y) => ts.reduce((s, t, j) => s + cf[j] * (1 + y) ** -t, 0),
          a = Math.max(0.0005, Y - 0.04),
          b = Y + 0.04,
          ys = [...Array(41)].map((_, j) => a + ((b - a) * j) / 40),
          ap = (y, c) => P * (1 - Dx * (y - Y) + c * 0.5 * Cv * (y - Y) ** 2),
          f1 =
            ts.length <= 150
              ? { bars: [{ n: "Valore attuale del flusso", c: PAL[0], v: pv }] }
              : {
                  lines: [
                    { n: "Valore attuale del flusso", c: PAL[0], a: 1, v: pv },
                  ],
                };
        return (
          plot({
            t: "Flussi attualizzati e duration",
            xs: ts,
            ...f1,
            zero: 1,
            vl: [{ x: Dm, l: "Duration " + f2(Dm) + " anni", c: PAL[1] }],
            lb: ts.map((t) => "t = " + f2(t) + " anni"),
          }) +
          plot({
            t: "Prezzo in funzione del rendimento",
            xs: ys.map((y) => y * 100),
            lines: [
              { n: "Prezzo reale", c: PAL[0], a: 1, v: ys.map(pa) },
              {
                n: "Approx. duration",
                c: PAL[1],
                d: "5 4",
                v: ys.map((y) => ap(y, 0)),
              },
              {
                n: "Duration + convessità",
                c: PAL[2],
                d: "2 3",
                v: ys.map((y) => ap(y, 1)),
              },
            ],
            marks: [
              {
                x: Y * 100,
                y: P,
                c: PAL[3],
                l: "Prezzo " + f2(P) + " a " + f2(Y * 100) + "%",
              },
            ],
            xf: (x) => f2(x) + "%",
            lb: ys.map((y) => "Rendimento " + f2(y * 100) + "%"),
          })
        );
      }
      function npvCh(f, r, van, irr) {
        const N = (x) => f.reduce((s, c, k) => s + c / (1 + x) ** k, 0),
          xs = f.map((_, k) => k),
          ip = isNaN(irr) ? 0 : irr * 100;
        let A = 0;
        const cum = f.map((c, k) => (A += c / (1 + r) ** k)),
          xa = Math.max(-90, Math.min(0, ip * 1.3)),
          xb = Math.max(20, r * 160, ip * 1.4),
          rs = [...Array(51)].map((_, j) => xa + ((xb - xa) * j) / 50);
        return (
          plot({
            t: "Flussi di cassa e VAN cumulato",
            xs,
            stack: 1,
            bars: [
              { n: "Entrate", c: PAL[2], v: f.map((c) => (c > 0 ? c : 0)) },
              { n: "Uscite", c: PAL[3], v: f.map((c) => (c < 0 ? c : 0)) },
            ],
            lines: [{ n: "VAN cumulato", c: PAL[1], v: cum }],
            lb: xs.map((k) => "t = " + k),
          }) +
          plot({
            t: "VAN al variare del tasso",
            xs: rs,
            zero: 1,
            lines: [
              { n: "VAN", c: PAL[0], a: 1, v: rs.map((x) => N(x / 100)) },
            ],
            marks: [
              {
                x: r * 100,
                y: van,
                c: PAL[1],
                l: "VAN " + f2(van) + " al " + f2(r * 100) + "%",
              },
            ].concat(
              isNaN(irr)
                ? []
                : [{ x: ip, y: 0, c: PAL[3], l: "TIR " + f2(ip) + "%" }],
            ),
            xf: (x) => sh(x) + "%",
            lb: rs.map((x) => "Tasso " + f2(x) + "%"),
          })
        );
      }
      const tbl = (R) =>
        `<div class="tb"><table><tr><th>Rata</th><th>Importo</th><th>Quota capitale</th><th>Quota interessi</th><th>Debito residuo</th></tr>${R.map(
          (r) =>
            `<tr><td>${r[0]}</td>${r
              .slice(1)
              .map((x) => `<td>${f2(x)}</td>`)
              .join("")}</tr>`,
        ).join("")}</table></div>`;
      function preCh(C, i, N) {
        const ms = [
            ...new Set(
              [...Array(20)].map((_, j) =>
                Math.max(1, Math.round(N * (0.25 + (1.75 * j) / 19))),
              ),
            ),
          ].sort((a, b) => a - b),
          r = (m) => (i ? (C * i) / (1 - (1 + i) ** -m) : C / m),
          xs = ms.map((m) => m / 12),
          lb = ms.map((m) => m + " mesi");
        return (
          plot({
            t: "Rata mensile al variare della durata (anni)",
            xs,
            lines: [{ n: "Rata mensile", c: PAL[0], a: 1, v: ms.map(r) }],
            marks: [
              {
                x: N / 12,
                y: r(N),
                c: PAL[3],
                l: "La tua scelta: " + N + " mesi, rata " + f2(r(N)),
              },
            ],
            lb,
          }) +
          plot({
            t: "Interessi totali al variare della durata (anni)",
            xs,
            lines: [
              {
                n: "Interessi totali",
                c: PAL[1],
                a: 1,
                v: ms.map((m) => r(m) * m - C),
              },
            ],
            marks: [
              {
                x: N / 12,
                y: r(N) * N - C,
                c: PAL[3],
                l:
                  "La tua scelta: " +
                  N +
                  " mesi, interessi " +
                  f2(r(N) * N - C),
              },
            ],
            lb,
          })
        );
      }
      const fr = (a, b) =>
          `<span class="fr"><span>${a}</span><span>${b}</span></span>`,
        eq = (...a) => a.map((x) => `<div class="eq">${x}</div>`).join(""),
        FM = {
          amm: eq(
            `<b>Francese</b><i>R</i> = ${fr("<i>C</i>·<i>i</i>", "1 − <i>v</i><sup>n</sup>")} = ${fr("<i>C</i>", "<i>a</i><sub>n⌉i</sub>")} , &nbsp;<i>I</i><sub>k</sub> = <i>i</i>·<i>D</i><sub>k−1</sub> , &nbsp;<i>C</i><sub>k</sub> = <i>R</i> − <i>I</i><sub>k</sub>`,
            `<b>Italiano</b><i>C</i><sub>k</sub> = ${fr("<i>C</i>", "<i>n</i>")} , &nbsp;<i>I</i><sub>k</sub> = <i>i</i>·<i>D</i><sub>k−1</sub> , &nbsp;<i>R</i><sub>k</sub> = <i>C</i><sub>k</sub> + <i>I</i><sub>k</sub>`,
            `<b>Tedesco</b><i>R</i> = ${fr("<i>C</i>·<i>d</i>", "1 − (1−<i>d</i>)<sup>n</sup>")} , &nbsp;<i>d</i> = ${fr("<i>i</i>", "1+<i>i</i>")} &nbsp;(interessi anticipati)`,
            `<b>Americano</b><i>R</i><sub>k</sub> = <i>C</i>·<i>i</i> (<i>k</i> &lt; <i>n</i>) , &nbsp;<i>R</i><sub>n</sub> = <i>C</i>·<i>i</i> + <i>C</i>`,
            `<b>Ricostituzione</b><i>s</i> = ${fr("<i>C</i>·<i>i′</i>", "(1+<i>i′</i>)<sup>n</sup> − 1")} = ${fr("<i>C</i>", "<i>s</i><sub>n⌉i′</sub>")} , &nbsp;<i>F</i><sub>k</sub> = <i>F</i><sub>k−1</sub>(1+<i>i′</i>) + <i>s</i> , &nbsp;<i>F</i><sub>n</sub> = <i>C</i> , &nbsp;esborso = <i>C</i>·<i>i</i> + <i>s</i>`,
            `<b>Tasso del periodo</b><i>i</i><sub>m</sub> = (1+<i>i</i>)<sup>1/m</sup> − 1 , &nbsp;<i>v</i> = (1+<i>i</i>)<sup>−1</sup>`,
          ),
          pre: eq(
            `<b>Rata</b><i>R</i> = ${fr("<i>C</i>·<i>i</i>", "1 − (1+<i>i</i>)<sup>−n</sup>")} , &nbsp;<i>i</i> = ${fr("TAN", "12")}`,
            `<b>TAEG</b>(1+<i>j</i>)<sup>12</sup> − 1 &nbsp;con&nbsp; Σ<sub>k=1…n</sub> (<i>R</i>+<i>s</i>)(1+<i>j</i>)<sup>−k</sup> = <i>C</i> − <i>e</i>`,
            `<b>Sostenibilità</b>${fr("<i>R</i>", "reddito netto")} ≤ ${fr("1", "3")}`,
            `<b>Tasso variabile</b><i>R′</i> = ${fr("<i>D</i><sub>k</sub>·<i>i′</i>", "1 − (1+<i>i′</i>)<sup>−(n−k)</sup>")}`,
          ),
          val: eq(
            `<b>Somma</b><i>M</i> = <i>C</i>(1+<i>i</i>)<sup>n</sup> , &nbsp;<i>V</i> = <i>M</i>(1+<i>i</i>)<sup>−n</sup>`,
            `<b>Posticipata</b><i>V</i> = <i>R</i>·<i>a</i><sub>n⌉i</sub> = <i>R</i> ${fr("1 − <i>v</i><sup>n</sup>", "<i>i</i>")} , &nbsp;<i>M</i> = <i>R</i>·<i>s</i><sub>n⌉i</sub> = <i>R</i> ${fr("(1+<i>i</i>)<sup>n</sup> − 1", "<i>i</i>")}`,
            `<b>Anticipata</b><i>ä</i><sub>n⌉i</sub> = (1+<i>i</i>)·<i>a</i><sub>n⌉i</sub> , &nbsp;<i>s̈</i><sub>n⌉i</sub> = (1+<i>i</i>)·<i>s</i><sub>n⌉i</sub>`,
            `<b>Rate variabili</b><i>V</i> = Σ<sub>k</sub> <i>R</i><sub>k</sub>·<i>v</i><sup>k</sup> , &nbsp;<i>M</i> = <i>V</i>(1+<i>i</i>)<sup>n</sup>`,
          ),
          con: eq(
            `<b>Intensità</b><i>δ</i> = ln(1+<i>i</i>) , &nbsp;<i>i</i> = e<sup><i>δ</i></sup> − 1`,
            `<b>Montante</b><i>M</i> = <i>C</i>·e<sup><i>δt</i></sup> , &nbsp;<b>Valore attuale</b><i>V</i> = <i>C</i>·e<sup>−<i>δt</i></sup>`,
          ),
          dur: eq(
            `<b>Prezzo</b><i>P</i> = Σ<sub>t</sub> <i>F</i><sub>t</sub>·<i>v</i><sup>t</sup>`,
            `<b>Duration</b><i>D</i> = ${fr("Σ<sub>t</sub> <i>t</i>·<i>F</i><sub>t</sub>·<i>v</i><sup>t</sup>", "Σ<sub>t</sub> <i>F</i><sub>t</sub>·<i>v</i><sup>t</sup>")} , &nbsp;<i>D</i><sup>*</sup> = ${fr("<i>D</i>", "1+<i>i</i>")}`,
            `<b>Convessità</b><i>C</i> = ${fr("Σ<sub>t</sub> <i>t</i>(<i>t</i>+1)·<i>F</i><sub>t</sub>·<i>v</i><sup>t+2</sup>", "<i>P</i>")}`,
            `<b>Variazione</b>${fr("Δ<i>P</i>", "<i>P</i>")} ≈ −<i>D</i><sup>*</sup>·Δ<i>i</i> + ½·<i>C</i>·Δ<i>i</i><sup>2</sup>`,
          ),
          flu: eq(
            `<b>Duration</b><i>D</i> = ${fr("Σ <i>F</i>·<i>v</i>(<i>t</i>)·<i>t</i>", "Σ <i>F</i>·<i>v</i>(<i>t</i>)")} , &nbsp;<b>Scadenza media</b>${fr("Σ <i>F</i>·<i>t</i>", "Σ <i>F</i>")}`,
            `<b>In t*</b><i>D</i>(<i>t*</i>) = <i>t*</i> + ${fr("Σ <i>F</i>·(<i>t</i>−<i>t*</i>)·<i>v</i>(<i>t</i>−<i>t*</i>)", "Σ <i>F</i>·<i>v</i>(<i>t</i>−<i>t*</i>)")}`,
            `<b>Prezzo</b>Δ<i>P</i> ≈ −${fr("<i>D</i>·<i>P</i>·Δ<i>r</i>", "1+<i>r</i>")}`,
          ),
          npv: eq(
            `<b>VAN</b><i>VAN</i>(<i>r</i>) = Σ<sub>t=0…n</sub> <i>F</i><sub>t</sub>(1+<i>r</i>)<sup>−t</sup>`,
            `<b>TIR</b>trova <i>r*</i> tale che <i>VAN</i>(<i>r*</i>) = 0`,
            `<b>Criterio</b><i>VAN</i> &gt; 0 ⇒ il progetto crea valore ; &nbsp;<i>r*</i> &gt; <i>r</i> ⇒ accettabile`,
          ),
        };
      FM.vc = eq(
        `<b>Medie</b><i>μ</i><sub>X</sub> = ${fr("Σ <i>x</i><sub>k</sub>", "<i>n</i>")} , &nbsp;<i>μ</i><sub>Y</sub> = ${fr("Σ <i>y</i><sub>k</sub>", "<i>n</i>")}`,
        `<b>Varianza</b><i>σ</i><sub>X</sub><sup>2</sup> = ${fr("Σ (<i>x</i><sub>k</sub> − <i>μ</i><sub>X</sub>)<sup>2</sup>", "<i>n</i>")} &nbsp;(popolazione) , &nbsp;<i>s</i><sub>X</sub><sup>2</sup> = ${fr("Σ (<i>x</i><sub>k</sub> − <i>μ</i><sub>X</sub>)<sup>2</sup>", "<i>n</i> − 1")} &nbsp;(campionaria)`,
        `<b>Covarianza</b><i>σ</i><sub>XY</sub> = ${fr("Σ (<i>x</i><sub>k</sub> − <i>μ</i><sub>X</sub>)(<i>y</i><sub>k</sub> − <i>μ</i><sub>Y</sub>)", "<i>n</i>")} = <i>E</i>[<i>XY</i>] − <i>μ</i><sub>X</sub>·<i>μ</i><sub>Y</sub>`,
        `<b>Correlazione</b><i>ρ</i> = ${fr("<i>σ</i><sub>XY</sub>", "<i>σ</i><sub>X</sub>·<i>σ</i><sub>Y</sub>")} , &nbsp;−1 ≤ <i>ρ</i> ≤ 1`,
        `<b>Regressione</b><i>y</i> = <i>a</i> + <i>b</i>·<i>x</i> , &nbsp;<i>b</i> = ${fr("<i>σ</i><sub>XY</sub>", "<i>σ</i><sub>X</sub><sup>2</sup>")} , &nbsp;<i>a</i> = <i>μ</i><sub>Y</sub> − <i>b</i>·<i>μ</i><sub>X</sub>`,
        `<b>Portafoglio</b><i>σ</i><sub>P</sub><sup>2</sup> = <i>w</i><sup>2</sup><i>σ</i><sub>X</sub><sup>2</sup> + (1−<i>w</i>)<sup>2</sup><i>σ</i><sub>Y</sub><sup>2</sup> + 2<i>w</i>(1−<i>w</i>)<i>σ</i><sub>XY</sub> , &nbsp;<i>w</i>* = ${fr("<i>σ</i><sub>Y</sub><sup>2</sup> − <i>σ</i><sub>XY</sub>", "<i>σ</i><sub>X</sub><sup>2</sup> + <i>σ</i><sub>Y</sub><sup>2</sup> − 2<i>σ</i><sub>XY</sub>")}`,
      );
      const T = {
        amm: {
          n: "Ammortamento",
          s: "a",
          fm: FM.amm,
          f: [
            { k: "C", l: "Capitale (€)", v: 100000 },
            { k: "r", l: "Tasso annuo effettivo (%)", v: 4 },
            { k: "n", l: "Durata (anni)", v: 10 },
            {
              k: "m",
              l: "Rate per anno",
              t: "s",
              o: [
                [1, "Annuale"],
                [2, "Semestrale"],
                [4, "Trimestrale"],
                [12, "Mensile"],
              ],
              v: 12,
            },
            {
              k: "t",
              l: "Metodo",
              t: "s",
              o: [
                ["fr", "Francese (rata costante)"],
                ["it", "Italiano (quota capitale costante)"],
                ["de", "Tedesco (interessi anticipati)"],
                ["am", "Americano (rimborso a scadenza)"],
              ],
              v: "fr",
            },
            {
              k: "ric",
              l: "Prospetto con rata costitutiva del capitale",
              t: "s",
              o: [
                ["n", "No (solo interessi)"],
                ["s", "Sì (fondo di ricostituzione)"],
              ],
              v: "s",
              s: (v) => v.t == "am",
            },
            {
              k: "rr",
              l: "Tasso annuo effettivo di ricostituzione (%)",
              v: 3,
              s: (v) => v.t == "am" && v.ric == "s",
            },
          ],
          c(v) {
            const m = +v.m,
              N = Math.round(v.n * m),
              i = (1 + v.r / 100) ** (1 / m) - 1,
              C = v.C,
              R = [];
            let E = C,
              t0 = 1;
            if (N < 1 || N > 600)
              return '<p class="err">Durata non valida.</p>';
            if (v.t == "am" && v.ric == "s") return ricPlan(v, N, i);
            if (v.t == "fr") {
              const p = (C * i) / (1 - (1 + i) ** -N) || C / N;
              for (let k = 1; k <= N; k++) {
                const I = E * i,
                  Q = p - I;
                E -= Q;
                R.push([k, p, Q, I, E]);
              }
            }
            if (v.t == "it") {
              const Q = C / N;
              for (let k = 1; k <= N; k++) {
                const I = E * i;
                E -= Q;
                R.push([k, Q + I, Q, I, E]);
              }
            }
            if (v.t == "am") {
              for (let k = 1; k <= N; k++) {
                const I = C * i,
                  Q = k == N ? C : 0;
                E = C - Q;
                R.push([k, I + Q, Q, I, E]);
              }
            }
            if (v.t == "de") {
              t0 = 0;
              const d = i / (1 + i),
                p = (C * d) / (1 - (1 - d) ** N) || C / N;
              for (let k = 0; k < N; k++) {
                const I = i * (E - p),
                  Q = p - I;
                E -= Q;
                R.push([k, p, Q, I, Math.max(E, 0)]);
              }
            }
            const tot = R.reduce((a, r) => a + r[1], 0),
              ti = tot - C;
            return (
              ks([
                K(
                  v.t == "fr" || v.t == "de" ? "Rata costante" : "Prima rata",
                  f2(R[0][1]),
                  1,
                ),
                K("Totale interessi", f2(ti)),
                K("Totale pagato", f2(tot)),
                K("Tasso periodale", f4(i * 100) + "%"),
              ]) +
              (v.t == "de"
                ? '<p class="note">Interessi anticipati: le rate sono pagate all\'inizio di ogni periodo (t = 0 … n−1).</p>'
                : "") +
              (v.t == "am"
                ? '<p class="note">Per vedere il prospetto con la rata costitutiva del capitale, scegli «Sì» in «Prospetto con rata costitutiva».</p>'
                : "") +
              `<div class="tb"><table><tr><th>${t0 ? "Rata" : "Epoca t"}</th><th>Importo</th><th>Quota capitale</th><th>Quota interessi</th><th>Debito residuo</th></tr>${R.map(
                (r) =>
                  `<tr><td>${r[0]}</td>${r
                    .slice(1)
                    .map((x) => `<td>${f2(x)}</td>`)
                    .join("")}</tr>`,
              ).join("")}</table></div>` +
              ammCh(R, C, t0, ti)
            );
          },
        },
        pre: {
          n: "Prestito personale",
          s: "€",
          fm: FM.pre,
          f: [
            { k: "C", l: "Importo del prestito (€)", v: 10000 },
            { k: "r", l: "TAN – tasso annuo nominale (%)", v: 7 },
            { k: "n", l: "Durata", v: 60 },
            {
              k: "nu",
              l: "Unità di durata",
              t: "s",
              o: [
                [1, "Mesi"],
                [12, "Anni"],
              ],
              v: 1,
            },
            { k: "w", l: "Reddito netto mensile (€, facoltativo)", v: 0 },
            { k: "e", l: "Spese di istruttoria (€, per il TAEG)", v: 0 },
            { k: "ei", l: "Spese di incasso per rata (€, per il TAEG)", v: 0 },
            {
              k: "k",
              l: "Simulazione tasso variabile: rate già pagate",
              v: 12,
            },
            { k: "r2", l: "Nuovo TAN dopo le rate pagate (%)", v: 9 },
          ],
          c(v) {
            const N = Math.round(v.n * v.nu),
              C = v.C,
              i = v.r / 1200,
              rt = (c, i, n) => (i ? (c * i) / (1 - (1 + i) ** -n) : c / n);
            if (!(N >= 1 && N <= 600) || !(C > 0))
              return '<p class="err">Controlla importo e durata (max 600 mesi).</p>';
            const p = rt(C, i, N),
              R = [];
            let E = C;
            for (let k = 1; k <= N; k++) {
              const I = E * i,
                Q = p - I;
              E -= Q;
              R.push([k, p, Q, I, Math.max(E, 0)]);
            }
            const tot = p * N,
              ti = tot - C,
              x = p + v.ei,
              g = (j) => {
                let s = 0;
                for (let k = 1; k <= N; k++) s += x * (1 + j) ** -k;
                return s - (C - v.e);
              };
            let lo = 0,
              hi = 1;
            for (let q = 0; q < 80; q++) {
              const m = (lo + hi) / 2;
              g(m) > 0 ? (lo = m) : (hi = m);
            }
            const taeg = ((1 + lo) ** 12 - 1) * 100,
              qw = v.w > 0 ? p / v.w : 0,
              inc =
                v.w > 0
                  ? `<p class="note" style="color:${qw <= 1 / 3 ? "#10b981" : "#f43f5e"};font-weight:600">La rata è il ${f2(qw * 100)}% del reddito netto: ${qw <= 1 / 3 ? "entro" : "oltre"} la soglia prudenziale di un terzo (33,33%).</p>`
                  : "",
              k = Math.max(0, Math.min(N - 1, Math.round(v.k))),
              Ek = k ? R[k - 1][4] : C,
              M = N - k,
              p2 = rt(Ek, v.r2 / 1200, M);
            return (
              ks([
                K("Rata mensile", f2(p), 1),
                K("Totale interessi", f2(ti)),
                K("Totale rimborsato", f2(tot)),
                K("TAEG", f2(taeg) + "%"),
              ]) +
              inc +
              `<p class="note">Piano francese a tasso fisso: rata = C·i / (1 − (1+i)^−n), con i = TAN/12. Il TAEG include solo le spese che inserisci.</p>` +
              `<h3 style="font-size:.95rem;margin:18px 0 10px">Simulazione tasso variabile</h3>` +
              ks([
                K("Debito residuo dopo " + k + " rate", f2(Ek)),
                K("Durata residua", M + " mesi"),
                K("Nuova rata", f2(p2), 1),
                K(
                  "Variazione della rata",
                  (p2 >= p ? "+" : "−") + f2(Math.abs(p2 - p)),
                ),
              ]) +
              tbl(R) +
              ammCh(R, C, 1, ti) +
              preCh(C, i, N)
            );
          },
        },
        val: {
          n: "Valore attuale e montante",
          s: "v",
          fm: FM.val,
          f: [
            {
              k: "m",
              l: "Operazione",
              t: "s",
              o: [
                ["s", "Somma singola"],
                ["c", "Rendita a rata costante"],
                ["v", "Rendita a rate variabili"],
              ],
              v: "c",
            },
            { k: "C", l: "Importo / rata (€)", v: 1000, s: (v) => v.m != "v" },
            {
              k: "fl",
              l: "Rate (separate da ; o a capo)",
              t: "a",
              v: "1000; 1200; 1500; 1800",
              s: (v) => v.m == "v",
            },
            { k: "n", l: "Durata (periodi)", v: 5, s: (v) => v.m != "v" },
            { k: "i", l: "Tasso per periodo (%)", v: 3 },
            {
              k: "p",
              l: "Rate",
              t: "s",
              o: [
                ["p", "Posticipate (fine periodo)"],
                ["a", "Anticipate (inizio periodo)"],
              ],
              v: "p",
              s: (v) => v.m != "s",
            },
          ],
          c(v) {
            const i = v.i / 100;
            let pv, fv, N;
            if (v.m == "s") {
              N = v.n;
              pv = v.C * (1 + i) ** -N;
              fv = v.C * (1 + i) ** N;
              return (
                ks([
                  K("Valore attuale", f2(pv), 1),
                  K("Montante", f2(fv)),
                  K("Fattore di sconto", f4((1 + i) ** -N)),
                ]) + somCh(v.C, i, N)
              );
            }
            const fl =
                v.m == "c"
                  ? Array(Math.max(0, Math.round(v.n))).fill(v.C)
                  : nums(v.fl),
              a = v.p == "a" ? 0 : 1;
            N = fl.length;
            pv = fl.reduce((s, x, k) => s + x * (1 + i) ** -(k + a), 0);
            fv = pv * (1 + i) ** N;
            return (
              ks([
                K("Valore attuale (t=0)", f2(pv), 1),
                K("Montante (t=" + N + ")", f2(fv)),
                K("Totale rate", f2(fl.reduce((s, x) => s + x, 0))),
                K("Numero rate", N),
              ]) +
              `<p class="note">${v.p == "a" ? "Anticipata: rate a t = 0 … n−1." : "Posticipata: rate a t = 1 … n."} Montante valutato a t = n.</p>` +
              rendCh(fl, i, a)
            );
          },
        },
        con: {
          n: "Tasso continuo",
          s: "δ",
          fm: FM.con,
          f: [
            {
              k: "d",
              l: "Dato di partenza",
              t: "s",
              o: [
                ["i", "Tasso annuo effettivo i"],
                ["d", "Intensità istantanea δ"],
              ],
              v: "i",
            },
            { k: "x", l: "Valore (%)", v: 5 },
            { k: "C", l: "Capitale (€)", v: 1000 },
            { k: "t", l: "Tempo (anni)", v: 3 },
          ],
          c(v) {
            const i = v.d == "i" ? v.x / 100 : Math.exp(v.x / 100) - 1,
              dl = Math.log(1 + i);
            return (
              ks([
                K("Intensità δ = ln(1+i)", f4(dl * 100) + "%", 1),
                K("Tasso effettivo i = e^δ − 1", f4(i * 100) + "%"),
                K("Montante C·e^(δt)", f2(v.C * Math.exp(dl * v.t))),
                K("Valore attuale C·e^(−δt)", f2(v.C * Math.exp(-dl * v.t))),
              ]) + conCh(v.C, i, dl, v.t)
            );
          },
        },
        dur: {
          n: "Duration e convessità",
          s: "D",
          fm: FM.dur,
          f: [
            { k: "F", l: "Valore nominale (€)", v: 1000 },
            { k: "c", l: "Cedola annua (%)", v: 5 },
            { k: "a", l: "Scadenza", v: 5 },
            {
              k: "au",
              l: "Unità di scadenza",
              t: "s",
              o: [
                [1, "Anni"],
                [1 / 12, "Mesi"],
                [7 / 365, "Settimane"],
                [1 / 365, "Giorni"],
              ],
              v: 1,
            },
            { k: "p", l: "Frequenza cedola: numero a scelta", v: 1 },
            {
              k: "pu",
              l: "Il numero indica…",
              t: "s",
              o: [
                ["f", "Cedole all'anno (es. 12 = mensili)"],
                [1 / 12, "Cedola ogni N mesi"],
                [7 / 365, "Cedola ogni N settimane"],
                [1 / 365, "Cedola ogni N giorni"],
                [1, "Cedola ogni N anni"],
              ],
              v: "f",
            },
            { k: "y", l: "Rendimento annuo effettivo (%)", v: 4 },
            { k: "dr", l: "Variazione del tasso Δr (punti %)", v: 1 },
          ],
          c(v) {
            const T = v.a * v.au,
              p = v.pu == "f" ? 1 / v.p : v.p * v.pu,
              Y = v.y / 100;
            if (!(T > 0) || !(p > 0) || !isFinite(p))
              return '<p class="err">Scadenza o periodicità non valide.</p>';
            if (T / p > 5000)
              return '<p class="err">Troppe cedole (max 5000): aumenta la periodicità.</p>';
            const ts = [];
            for (let k = 1; k * p < T - 1e-9; k++) ts.push(k * p);
            ts.push(T);
            let P = 0,
              D = 0,
              X = 0,
              prev = 0;
            const cfs = [];
            ts.forEach((t, j) => {
              const last = j == ts.length - 1,
                cf = ((v.F * v.c) / 100) * (t - prev) + (last ? v.F : 0),
                d = (1 + Y) ** -t;
              cfs.push(cf);
              prev = t;
              P += cf * d;
              D += cf * d * t;
              X += (cf * t * (t + 1) * d) / (1 + Y) ** 2;
            });
            const Dm = D / P,
              Dx = Dm / (1 + Y),
              Cv = X / P,
              dr = v.dr / 100,
              dP = -Dx * P * dr,
              dP2 = P * (-Dx * dr + 0.5 * Cv * dr * dr);
            return (
              ks([
                K("Prezzo", f2(P), 1),
                K("Duration (Macaulay)", f4(Dm) + " anni"),
                K("Duration modificata", f4(Dx)),
                K("Convessità", f4(Cv)),
                K("Numero cedole", ts.length),
              ]) +
              ks([
                K("ΔP ≈ −D·P·Δr/(1+r)", f2(dP)),
                K("Nuovo prezzo P′", f2(P + dP)),
                K("Variazione %", f2((dP / P) * 100) + "%"),
                K("P′ con convessità", f2(P + dP2)),
              ]) +
              `<p class="note">Cedola ogni ${f4(p * 365).replace(/,0+$/, "")} giorni circa (${f4(p)} anni). D = Σ F·v(t)·t / Σ F·v(t): la media dei tempi pesata per i flussi attualizzati. Se i tassi salgono il prezzo scende, e viceversa.</p>` +
              durCh(ts, cfs, Y, P, Dm, Dx, Cv)
            );
          },
        },
        flu: {
          n: "Duration di un flusso",
          s: "Σ",
          fm: FM.flu,
          f: [
            {
              k: "fl",
              l: "Importi (separati da ; o a capo)",
              t: "a",
              v: "5000; 4000; 3000; 5000",
            },
            {
              k: "tt",
              l: "Scadenze in anni (stesso ordine)",
              t: "a",
              v: "1,3; 2,6; 3,4; 4,3",
            },
            { k: "i", l: "Tasso annuo effettivo (%)", v: 10 },
            { k: "tx", l: "Tempo di valutazione t* (anni)", v: 0 },
            { k: "dr", l: "Variazione del tasso Δr (punti %)", v: 1 },
          ],
          c(v) {
            const F = nums(v.fl),
              t = nums(v.tt),
              n = Math.min(F.length, t.length),
              Y = v.i / 100;
            if (n < 1 || Y <= -1)
              return '<p class="err">Inserisci importi e scadenze (stesso numero) e un tasso valido.</p>';
            const q = F.slice(0, n)
                .map((f, k) => [t[k], f])
                .sort((a, b) => a[0] - b[0]),
              ts = q.map((x) => x[0]),
              cf = q.map((x) => x[1]),
              S = cf.reduce((a, b) => a + b, 0),
              sm = (g) => cf.reduce((s, f, k) => s + f * g(ts[k]), 0),
              P = sm((x) => (1 + Y) ** -x),
              D = sm((x) => x * (1 + Y) ** -x) / P,
              Dx = D / (1 + Y),
              Cv = sm((x) => x * (x + 1) * (1 + Y) ** (-x - 2)) / P,
              ta = v.tx,
              Da =
                ta +
                sm((x) => (x - ta) * (1 + Y) ** -(x - ta)) /
                  sm((x) => (1 + Y) ** -(x - ta)),
              dr = v.dr / 100,
              dP = -Dx * P * dr,
              dP2 = P * (-Dx * dr + 0.5 * Cv * dr * dr);
            return (
              ks([
                K("Duration D", f4(D) + " anni", 1),
                K("Scadenza media aritmetica", f4(sm((x) => x) / S) + " anni"),
                K("Valore attuale (REA)", f2(P)),
                K("Duration in t* = " + sh(ta), f4(Da) + " anni"),
                K("Duration modificata", f4(Dx)),
                K("Convessità", f4(Cv)),
              ]) +
              ks([
                K("ΔP ≈ −D·P·Δr/(1+r)", f2(dP)),
                K("Nuovo valore P′", f2(P + dP)),
                K("Variazione %", f2((dP / P) * 100) + "%"),
                K("P′ con convessità", f2(P + dP2)),
              ]) +
              `<p class="note">D = Σ F·v(t)·t / Σ F·v(t). Scadenza media aritmetica = Σ F·t / Σ F (non richiede il tasso). La duration non cambia scegliendo un diverso t*: D(t*) = t* + Σ F·(t−t*)·v(t−t*) / Σ F·v(t−t*).</p>` +
              (Y > 0 ? durCh(ts, cf, Y, P, D, Dx, Cv) : "")
            );
          },
        },
        npv: {
          n: "VAN e TIR",
          s: "r*",
          fm: FM.npv,
          f: [
            { k: "r", l: "Tasso di attualizzazione (%)", v: 8 },
            {
              k: "fl",
              l: "Flussi di cassa da t = 0 (separati da ; o a capo)",
              t: "a",
              v: "-1000; 300; 400; 500; 200",
            },
          ],
          c(v) {
            const f = nums(v.fl),
              r = v.r / 100;
            if (f.length < 2)
              return '<p class="err">Inserisci almeno due flussi.</p>';
            const N = (x) => f.reduce((s, c, k) => s + c / (1 + x) ** k, 0),
              van = N(r);
            let lo = -0.9999,
              hi = 100,
              irr = NaN;
            if (N(lo) * N(hi) < 0) {
              for (let j = 0; j < 200; j++) {
                const mid = (lo + hi) / 2;
                N(lo) * N(mid) <= 0 ? (hi = mid) : (lo = mid);
              }
              irr = (lo + hi) / 2;
            }
            let cum = 0,
              pb = "—";
            f.forEach((c, k) => {
              if (pb == "—" && (cum += c) >= 0 && k > 0) pb = k + " periodi";
            });
            let dc = 0,
              dpb = "—";
            f.forEach((c, k) => {
              dc += c / (1 + r) ** k;
              if (dpb == "—" && dc >= 0 && k > 0) dpb = k + " periodi";
            });
            const pi = f[0] < 0 ? 1 + van / -f[0] : NaN;
            return (
              ks([
                K("VAN (NPV)", f2(van), 1),
                K(
                  "TIR (IRR)",
                  isNaN(irr) ? "non definito" : f4(irr * 100) + "%",
                ),
                K("Payback", pb),
                K("Payback scontato", dpb),
                K("Indice di profitabilità", isFinite(pi) ? f4(pi) : "—"),
              ]) +
              `<p class="note">${van > 0 ? "VAN positivo: il progetto crea valore." : "VAN non positivo: il progetto non remunera il costo del capitale."}</p>` +
              npvCh(f, r, van, irr)
            );
          },
        },
        vc: {
          n: "Varianza e covarianza",
          s: "σ",
          fm: FM.vc,
          f: [
            {
              k: "x",
              l: "Serie X (separati da ; o a capo)",
              t: "a",
              v: "5; 7; 9; 4; 6; 8",
            },
            {
              k: "y",
              l: "Serie Y (stesso numero di valori)",
              t: "a",
              v: "3; 8; 6; 2; 5; 7",
            },
            {
              k: "k",
              l: "Tipo di calcolo",
              t: "s",
              o: [
                ["c", "Campionaria (divisore n − 1)"],
                ["p", "Popolazione (divisore n)"],
              ],
              v: "c",
            },
            { k: "w", l: "Peso di X nel portafoglio (%)", v: 50 },
          ],
          c(v) {
            const X = nums(v.x),
              Y = nums(v.y),
              n = Math.min(X.length, Y.length);
            if (n < 2)
              return '<p class="err">Inserisci almeno due valori per X e per Y (stesso numero).</p>';
            const x = X.slice(0, n),
              y = Y.slice(0, n),
              d = v.k == "c" ? n - 1 : n,
              mx = x.reduce((a, b) => a + b, 0) / n,
              my = y.reduce((a, b) => a + b, 0) / n,
              dx = x.map((a) => a - mx),
              dy = y.map((a) => a - my),
              vx = dx.reduce((a, b) => a + b * b, 0) / d,
              vy = dy.reduce((a, b) => a + b * b, 0) / d,
              cv = dx.reduce((a, b, k) => a + b * dy[k], 0) / d,
              sx = Math.sqrt(vx),
              sy = Math.sqrt(vy),
              rho = cv / (sx * sy),
              b = cv / vx,
              a = my - b * mx,
              w = v.w / 100,
              vp = w * w * vx + (1 - w) ** 2 * vy + 2 * w * (1 - w) * cv,
              den = vx + vy - 2 * cv,
              wm = den > 1e-12 ? (vy - cv) / den : NaN;
            const pad = (Math.max(...x) - Math.min(...x) || 1) * 0.1,
              xa = Math.min(...x) - pad,
              xb = Math.max(...x) + pad,
              ws = [...Array(41)].map((_, j) => j * 2.5),
              vpw = (q) => {
                q /= 100;
                return q * q * vx + (1 - q) ** 2 * vy + 2 * q * (1 - q) * cv;
              };
            const note = isFinite(rho)
              ? Math.abs(rho) < 0.1
                ? "praticamente nessuna relazione lineare"
                : rho > 0
                  ? "le due serie tendono a muoversi nello stesso verso"
                  : "le due serie tendono a muoversi in verso opposto"
              : "correlazione non definita (varianza nulla)";
            return (
              ks([
                K("Covarianza σXY", f4(cv), 1),
                K("Varianza X", f4(vx)),
                K("Varianza Y", f4(vy)),
                K("Dev. standard X", f4(sx)),
                K("Dev. standard Y", f4(sy)),
                K("Correlazione ρ", f4(rho)),
                K("Media X", f4(mx)),
                K("Media Y", f4(my)),
              ]) +
              `<p class="note">${v.k == "c" ? "Stime campionarie (n − 1)." : "Valori di popolazione (n)."} Covarianza ${cv > 0 ? "positiva" : cv < 0 ? "negativa" : "nulla"}: ${note}.${vx > 0 ? ` Retta di regressione: y = ${f4(a)} ${b < 0 ? "−" : "+"} ${f4(Math.abs(b))}·x , R² = ${f4(rho * rho)}.` : ""}</p>` +
              `<h3 style="font-size:.95rem;margin:18px 0 10px">Portafoglio di due titoli (X con peso w, Y con 1 − w)</h3>` +
              ks([
                K("Peso w di X", f2(v.w) + "%"),
                K("Varianza di portafoglio", f4(vp), 1),
                K(
                  "Dev. standard di portafoglio",
                  f4(Math.sqrt(Math.max(vp, 0))),
                ),
                K(
                  "Peso di X a varianza minima",
                  isFinite(wm) ? f2(wm * 100) + "%" : "—",
                ),
              ]) +
              `<div class="tb"><table><tr><th>k</th><th>x</th><th>y</th><th>x − μX</th><th>y − μY</th><th>(x − μX)(y − μY)</th></tr>${x.map((q, k) => `<tr><td>${k + 1}</td><td>${f4(q)}</td><td>${f4(y[k])}</td><td>${f4(dx[k])}</td><td>${f4(dy[k])}</td><td>${f4(dx[k] * dy[k])}</td></tr>`).join("")}</table></div>` +
              plot({
                t: "Diagramma di dispersione e retta di regressione",
                xs: [xa, xb],
                lines:
                  vx > 0
                    ? [
                        {
                          n: "Retta di regressione",
                          c: PAL[1],
                          v: [a + b * xa, a + b * xb],
                        },
                      ]
                    : [],
                marks: x
                  .map((q, k) => ({
                    x: q,
                    y: y[k],
                    c: PAL[0],
                    l: `(${f2(q)} ; ${f2(y[k])})`,
                  }))
                  .concat([
                    {
                      x: mx,
                      y: my,
                      c: PAL[3],
                      l: `Baricentro (${f2(mx)} ; ${f2(my)})`,
                    },
                  ]),
                xf: (q) => sh(q),
                yf: f2,
              }) +
              plot({
                t: "Varianza di portafoglio al variare del peso di X",
                xs: ws,
                lines: [
                  {
                    n: "Varianza di portafoglio",
                    c: PAL[0],
                    a: 1,
                    v: ws.map(vpw),
                  },
                ],
                marks: [
                  {
                    x: Math.min(100, Math.max(0, v.w)),
                    y: vpw(Math.min(100, Math.max(0, v.w))),
                    c: PAL[1],
                    l: "Tua scelta: w = " + f2(v.w) + "%",
                  },
                ].concat(
                  isFinite(wm) && wm >= 0 && wm <= 1
                    ? [
                        {
                          x: wm * 100,
                          y: vpw(wm * 100),
                          c: PAL[3],
                          l: "Varianza minima: w = " + f2(wm * 100) + "%",
                        },
                      ]
                    : [],
                ),
                xf: (q) => sh(q) + "%",
                yf: f4,
                lb: ws.map((q) => "w = " + f2(q) + "%"),
              })
            );
          },
        },
      };
      const TB = (h, r) =>
          `<div class="tb"><table><tr>${h.map((x) => `<th>${x}</th>`).join("")}</tr>${r.map((q) => `<tr>${q.map((x) => `<td>${x}</td>`).join("")}</tr>`).join("")}</table></div>`,
        ER = (m) => `<p class="err">${m}</p>`,
        ncdf = (x) => {
          const t = 1 / (1 + 0.2316419 * Math.abs(x)),
            p =
              0.3989422804014327 *
              Math.exp((-x * x) / 2) *
              t *
              (0.31938153 +
                t *
                  (-0.356563782 +
                    t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
          return x > 0 ? 1 - p : p;
        },
        npdf = (x) => 0.3989422804014327 * Math.exp((-x * x) / 2),
        bsf = (S, K, T, r, s, q) => {
          const sq = s * Math.sqrt(T),
            d1 = (Math.log(S / K) + (r - q + (s * s) / 2) * T) / sq,
            d2 = d1 - sq,
            dq = Math.exp(-q * T),
            er = Math.exp(-r * T);
          return {
            d1,
            d2,
            dq,
            er,
            c: S * dq * ncdf(d1) - K * er * ncdf(d2),
            p: K * er * ncdf(-d2) - S * dq * ncdf(-d1),
          };
        };
      FM.tas = eq(
        `<b>Effettivo ↔ nominale</b><i>i</i> = (1 + ${fr("<i>j</i><sub>m</sub>", "<i>m</i>")})<sup>m</sup> − 1 , &nbsp;<i>j</i><sub>m</sub> = <i>m</i>[(1+<i>i</i>)<sup>1/m</sup> − 1]`,
        `<b>Sconto</b><i>d</i> = ${fr("<i>i</i>", "1+<i>i</i>")} , &nbsp;<i>i</i> = ${fr("<i>d</i>", "1−<i>d</i>")} , &nbsp;<i>v</i> = 1 − <i>d</i>`,
        `<b>Intensità</b><i>δ</i> = ln(1+<i>i</i>) = lim<sub>m→∞</sub> <i>j</i><sub>m</sub>`,
      );
      FM.reg = eq(
        `<b>Semplice</b><i>M</i> = <i>C</i>(1+<i>it</i>) , &nbsp;<b>Sconto razionale</b><i>V</i> = ${fr("<i>M</i>", "1+<i>it</i>")}`,
        `<b>Composto</b><i>M</i> = <i>C</i>(1+<i>i</i>)<sup>t</sup> , &nbsp;<i>V</i> = <i>M</i>(1+<i>i</i>)<sup>−t</sup>`,
        `<b>Commerciale</b><i>V</i> = <i>M</i>(1 − <i>dt</i>) , &nbsp;<i>D</i> = <i>M</i>·<i>d</i>·<i>t</i>`,
        `<b>Equivalenza</b><i>d</i> = ${fr("<i>i</i>", "1+<i>i</i>·<i>t</i>")} &nbsp;(stesso valore attuale a scadenza <i>t</i>)`,
      );
      FM.obb = eq(
        `<b>Prezzo</b><i>P</i> = Σ<sub>k</sub> ${fr("<i>c</i>·<i>F</i>", "<i>f</i>")}(1+<i>y</i>)<sup>−k/f</sup> + <i>F</i>(1+<i>y</i>)<sup>−n</sup>`,
        `<b>Rendimento</b>trova <i>y</i> tale che <i>P</i>(<i>y</i>) = prezzo di mercato`,
        `<b>Current yield</b>${fr("<i>c</i>·<i>F</i>", "<i>P</i>")} , &nbsp;<b>Zero coupon</b><i>y</i> = (<i>F</i>/<i>P</i>)<sup>1/n</sup> − 1`,
      );
      FM.pac = eq(
        `<b>Montante</b><i>M</i> = <i>C</i><sub>0</sub>(1+<i>i</i>)<sup>N</sup> + <i>R</i>·<i>s</i><sub>N⌉i</sub> &nbsp;(anticipati: ×(1+<i>i</i>) sulle rate)`,
        `<b>Versamento</b><i>R</i> = ${fr("<i>G</i> − <i>C</i><sub>0</sub>(1+<i>i</i>)<sup>N</sup>", "<i>u</i>·<i>s</i><sub>N⌉i</sub>")}`,
        `<b>Tempo</b><i>N</i> = ${fr("ln[(<i>G</i>·<i>i</i> + <i>R</i>·<i>u</i>) / (<i>C</i><sub>0</sub>·<i>i</i> + <i>R</i>·<i>u</i>)]", "ln(1+<i>i</i>)")} , &nbsp;<i>u</i> = 1 (posticipati) o 1+<i>i</i> (anticipati)`,
      );
      FM.ren = eq(
        `<b>Perpetua</b><i>V</i> = ${fr("<i>R</i>", "<i>i</i>")}`,
        `<b>Gordon</b><i>V</i> = ${fr("<i>R</i>", "<i>i</i> − <i>g</i>")} &nbsp;(<i>i</i> &gt; <i>g</i>)`,
        `<b>Differita</b><i>V</i> = <i>R</i>·<i>a</i><sub>n⌉i</sub>·(1+<i>i</i>)<sup>−s</sup>`,
        `<b>Aritmetica</b><i>V</i> = (<i>R</i> + ${fr("<i>D</i>", "<i>i</i>")})<i>a</i><sub>n⌉i</sub> − ${fr("<i>D</i>·<i>n</i>·<i>v</i><sup>n</sup>", "<i>i</i>")}`,
        `<b>Geometrica</b><i>V</i> = <i>R</i> ${fr("1 − ((1+<i>g</i>)/(1+<i>i</i>))<sup>n</sup>", "<i>i</i> − <i>g</i>")}`,
      );
      FM.inf = eq(
        `<b>Fisher</b>1 + <i>i</i> = (1 + <i>r</i>)(1 + <i>π</i>) , &nbsp;<i>r</i> = ${fr("<i>i</i> − <i>π</i>", "1 + <i>π</i>")} ≈ <i>i</i> − <i>π</i>`,
        `<b>Netto imposta</b><i>i</i><sub>n</sub> = <i>i</i>(1 − <i>τ</i>)`,
        `<b>Potere d’acquisto</b><i>M</i><sub>reale</sub> = <i>M</i>(1+<i>π</i>)<sup>−t</sup>`,
      );
      FM.cap = eq(
        `<b>CAPM</b><i>E</i>[<i>R</i>] = <i>r</i><sub>f</sub> + <i>β</i>(<i>r</i><sub>m</sub> − <i>r</i><sub>f</sub>)`,
        `<b>Sharpe</b>${fr("<i>R</i><sub>p</sub> − <i>r</i><sub>f</sub>", "<i>σ</i><sub>p</sub>")} , &nbsp;<b>Treynor</b>${fr("<i>R</i><sub>p</sub> − <i>r</i><sub>f</sub>", "<i>β</i>")}`,
        `<b>Alpha di Jensen</b><i>α</i> = <i>R</i><sub>p</sub> − [<i>r</i><sub>f</sub> + <i>β</i>(<i>r</i><sub>m</sub> − <i>r</i><sub>f</sub>)]`,
        `<b>Beta</b><i>β</i> = ${fr("<i>σ</i><sub>iM</sub>", "<i>σ</i><sub>M</sub><sup>2</sup>")}`,
      );
      FM.rnd = eq(
        `<b>Rendimento</b><i>r</i><sub>k</sub> = ${fr("<i>P</i><sub>k</sub>", "<i>P</i><sub>k−1</sub>")} − 1`,
        `<b>CAGR</b>(<i>P</i><sub>n</sub> / <i>P</i><sub>0</sub>)<sup>f/n</sup> − 1 &nbsp;(<i>f</i> periodi all’anno)`,
        `<b>Volatilità annua</b><i>σ</i><sub>a</sub> = <i>σ</i>·√<i>f</i> , &nbsp;<b>VaR</b> = <i>z</i>·<i>σ</i> − <i>μ</i>`,
        `<b>Drawdown</b><i>DD</i><sub>k</sub> = ${fr("<i>P</i><sub>k</sub>", "max<sub>j≤k</sub> <i>P</i><sub>j</sub>")} − 1`,
      );
      FM.opz = eq(
        `<b>Call</b><i>C</i> = <i>S</i>e<sup>−qT</sup><i>N</i>(<i>d</i><sub>1</sub>) − <i>K</i>e<sup>−rT</sup><i>N</i>(<i>d</i><sub>2</sub>)`,
        `<b>Put</b><i>P</i> = <i>K</i>e<sup>−rT</sup><i>N</i>(−<i>d</i><sub>2</sub>) − <i>S</i>e<sup>−qT</sup><i>N</i>(−<i>d</i><sub>1</sub>)`,
        `<b>d</b><sub>1</sub> = ${fr("ln(<i>S</i>/<i>K</i>) + (<i>r</i> − <i>q</i> + <i>σ</i><sup>2</sup>/2)<i>T</i>", "<i>σ</i>√<i>T</i>")} , &nbsp;<i>d</i><sub>2</sub> = <i>d</i><sub>1</sub> − <i>σ</i>√<i>T</i>`,
        `<b>Parità put-call</b><i>C</i> − <i>P</i> = <i>S</i>e<sup>−qT</sup> − <i>K</i>e<sup>−rT</sup>`,
      );
      Object.assign(T, {
        tas: {
          n: "Tassi e conversioni",
          s: "i",
          fm: FM.tas,
          f: [
            {
              k: "d",
              l: "Dato di partenza",
              t: "s",
              o: [
                ["i", "Tasso annuo effettivo i"],
                ["j", "Tasso nominale convertibile j(m)"],
                ["d", "Tasso annuo di sconto d"],
              ],
              v: "i",
            },
            { k: "x", l: "Valore (%)", v: 5 },
            { k: "m", l: "Frazionamenti annui m", v: 12 },
          ],
          c(v) {
            const m = Math.max(1, Math.round(v.m)),
              x = v.x / 100,
              i =
                v.d == "i"
                  ? x
                  : v.d == "j"
                    ? (1 + x / m) ** m - 1
                    : x / (1 - x);
            if (!isFinite(i) || i <= -1) return ER("Valore non valido.");
            const ms = [1, 2, 3, 4, 6, 12, 52, 365],
              m2 = [...Array(24)].map((_, k) => k + 1),
              dl = Math.log(1 + i);
            return (
              ks([
                K("Tasso effettivo i", f4(i * 100) + "%", 1),
                K(
                  "Nominale j(" + m + ")",
                  f4(m * ((1 + i) ** (1 / m) - 1) * 100) + "%",
                ),
                K(
                  "Tasso periodale i(" + m + ")",
                  f4(((1 + i) ** (1 / m) - 1) * 100) + "%",
                ),
                K("Tasso di sconto d", f4((i / (1 + i)) * 100) + "%"),
                K("Intensità δ", f4(dl * 100) + "%"),
                K("Fattore di sconto v", f4(1 / (1 + i))),
              ]) +
              `<p class="note">Tassi equivalenti: producono lo stesso montante in un anno. Al crescere di m il nominale j(m) tende a δ = ln(1+i).</p>` +
              TB(
                ["m", "Tasso periodale", "Nominale j(m)"],
                ms.map((k) => [
                  k,
                  f4(((1 + i) ** (1 / k) - 1) * 100) + "%",
                  f4(k * ((1 + i) ** (1 / k) - 1) * 100) + "%",
                ]),
              ) +
              plot({
                t: "Nominale j(m) al crescere di m",
                xs: m2,
                lines: [
                  {
                    n: "j(m)",
                    c: PAL[0],
                    a: 1,
                    v: m2.map((k) => k * ((1 + i) ** (1 / k) - 1) * 100),
                  },
                  {
                    n: "δ (limite)",
                    c: PAL[1],
                    d: "5 4",
                    v: m2.map(() => dl * 100),
                  },
                ],
                yf: (q) => f4(q) + "%",
                lb: m2.map((k) => "m = " + k),
              })
            );
          },
        },
        reg: {
          n: "Regimi e sconto",
          s: "t",
          fm: FM.reg,
          f: [
            { k: "C", l: "Capitale / valore nominale (€)", v: 1000 },
            { k: "t", l: "Tempo (anni)", v: 2 },
            { k: "i", l: "Tasso di interesse annuo i (%)", v: 5 },
            { k: "d", l: "Tasso di sconto annuo d (%)", v: 4.5 },
          ],
          c(v) {
            const C = v.C,
              t = v.t,
              i = v.i / 100,
              d = v.d / 100;
            if (!(t >= 0) || i <= -1) return ER("Tempo o tasso non validi.");
            const T0 = t > 0 ? t : 1,
              xs = [...Array(41)].map((_, j) => (T0 * j) / 40);
            return (
              ks([
                K("Montante semplice", f2(C * (1 + i * t)), 1),
                K("Montante composto", f2(C * (1 + i) ** t)),
                K("Valore attuale razionale", f2(C / (1 + i * t))),
                K("Valore attuale commerciale", f2(C * (1 - d * t))),
                K("Valore attuale composto", f2(C * (1 + i) ** -t)),
                K("Sconto commerciale", f2(C * d * t)),
                K("d equivalente a i", f4((i / (1 + i * t)) * 100) + "%"),
              ]) +
              (d * t >= 1
                ? '<p class="err">Con d·t ≥ 1 lo sconto commerciale non ha senso (valore ≤ 0).</p>'
                : '<p class="note">Dopo 1 anno semplice e composto coincidono; prima il semplice rende di più, dopo il composto. Lo sconto commerciale usa d, quello razionale e composto usano i.</p>') +
              plot({
                t: "Montante: regime semplice e composto",
                xs,
                zero: 1,
                lines: [
                  {
                    n: "Semplice",
                    c: PAL[1],
                    d: "5 4",
                    v: xs.map((x) => C * (1 + i * x)),
                  },
                  {
                    n: "Composto",
                    c: PAL[0],
                    a: 1,
                    v: xs.map((x) => C * (1 + i) ** x),
                  },
                ],
                lb: xs.map((x) => "t = " + sh(x)),
              }) +
              plot({
                t: "Valore attuale: tre tipi di sconto",
                xs,
                zero: 1,
                lines: [
                  {
                    n: "Razionale",
                    c: PAL[1],
                    v: xs.map((x) => C / (1 + i * x)),
                  },
                  {
                    n: "Commerciale",
                    c: PAL[3],
                    d: "5 4",
                    v: xs.map((x) => Math.max(0, C * (1 - d * x))),
                  },
                  {
                    n: "Composto",
                    c: PAL[0],
                    a: 1,
                    v: xs.map((x) => C * (1 + i) ** -x),
                  },
                ],
                lb: xs.map((x) => "t = " + sh(x)),
              })
            );
          },
        },
        obb: {
          n: "Obbligazioni",
          s: "B",
          fm: FM.obb,
          f: [
            {
              k: "m",
              l: "Cosa calcolare",
              t: "s",
              o: [
                ["p", "Prezzo dal rendimento"],
                ["y", "Rendimento (YTM) dal prezzo"],
              ],
              v: "p",
            },
            { k: "F", l: "Valore nominale (€)", v: 1000 },
            { k: "c", l: "Cedola annua (%)", v: 4 },
            { k: "n", l: "Scadenza (anni)", v: 5 },
            { k: "f", l: "Cedole all’anno", v: 1 },
            {
              k: "y",
              l: "Rendimento annuo effettivo (%)",
              v: 3,
              s: (v) => v.m == "p",
            },
            {
              k: "P",
              l: "Prezzo di mercato (€)",
              v: 1050,
              s: (v) => v.m == "y",
            },
          ],
          c(v) {
            const f = Math.round(v.f),
              N = Math.round(v.n * f),
              F = v.F,
              cf = (F * v.c) / 100 / f;
            if (!(f >= 1) || !(N >= 1 && N <= 2000))
              return ER("Scadenza o frequenza non valide.");
            const pr = (y) => {
              let s = 0;
              for (let k = 1; k <= N; k++)
                s += (cf + (k == N ? F : 0)) * (1 + y) ** (-k / f);
              return s;
            };
            let Y, P;
            if (v.m == "p") {
              Y = v.y / 100;
              P = pr(Y);
            } else {
              P = v.P;
              let lo = -0.99,
                hi = 10;
              if (!(P > 0) || !(pr(lo) >= P) || !(pr(hi) <= P))
                return ER("Rendimento non trovato per questo prezzo.");
              for (let q = 0; q < 120; q++) {
                const mid = (lo + hi) / 2;
                pr(mid) > P ? (lo = mid) : (hi = mid);
              }
              Y = (lo + hi) / 2;
            }
            const a = Math.max(-0.02, Y - 0.06),
              b = Y + 0.06,
              ys = [...Array(41)].map((_, j) => a + ((b - a) * j) / 40);
            return (
              ks([
                K("Prezzo", f2(P), 1),
                K("Rendimento effettivo annuo", f4(Y * 100) + "%"),
                K(
                  "Rendimento nominale annuo",
                  f4(f * ((1 + Y) ** (1 / f) - 1) * 100) + "%",
                ),
                K("Current yield", f4(((F * v.c) / 100 / P) * 100) + "%"),
                K(
                  P > F
                    ? "Premio sul nominale"
                    : P < F
                      ? "Sconto sul nominale"
                      : "Alla pari",
                  f2(P - F),
                ),
                K("Cedole totali", f2(cf * N)),
              ]) +
              `<p class="note">${P > F ? "Prezzo sopra la pari: cedola maggiore del rendimento." : P < F ? "Prezzo sotto la pari: cedola minore del rendimento." : "Prezzo alla pari: rendimento uguale alla cedola."} Flussi: ${N} cedole da ${f2(cf)}${N > 0 ? ", rimborso di " + f2(F) + " in coda" : ""}.</p>` +
              plot({
                t: "Prezzo in funzione del rendimento",
                xs: ys.map((y) => y * 100),
                lines: [{ n: "Prezzo", c: PAL[0], a: 1, v: ys.map(pr) }],
                marks: [
                  {
                    x: Y * 100,
                    y: P,
                    c: PAL[3],
                    l: "Prezzo " + f2(P) + " a " + f2(Y * 100) + "%",
                  },
                ],
                xf: (x) => f2(x) + "%",
                lb: ys.map((y) => "Rendimento " + f2(y * 100) + "%"),
              })
            );
          },
        },
        pac: {
          n: "Piano di accumulo",
          s: "P",
          fm: FM.pac,
          f: [
            {
              k: "m",
              l: "Cosa calcolare",
              t: "s",
              o: [
                ["m", "Montante finale"],
                ["r", "Versamento periodico necessario"],
                ["t", "Tempo per raggiungere l’obiettivo"],
              ],
              v: "m",
            },
            { k: "C0", l: "Capitale iniziale (€)", v: 1000 },
            {
              k: "R",
              l: "Versamento periodico (€)",
              v: 200,
              s: (v) => v.m != "r",
            },
            { k: "G", l: "Obiettivo (€)", v: 50000, s: (v) => v.m != "m" },
            { k: "r", l: "Tasso annuo effettivo (%)", v: 4 },
            { k: "n", l: "Durata (anni)", v: 10, s: (v) => v.m != "t" },
            {
              k: "f",
              l: "Versamenti per anno",
              t: "s",
              o: [
                [1, "Annuali"],
                [2, "Semestrali"],
                [4, "Trimestrali"],
                [12, "Mensili"],
              ],
              v: 12,
            },
            {
              k: "p",
              l: "Versamenti",
              t: "s",
              o: [
                ["p", "Posticipati (fine periodo)"],
                ["a", "Anticipati (inizio periodo)"],
              ],
              v: "p",
            },
          ],
          c(v) {
            const f = +v.f,
              i = (1 + v.r / 100) ** (1 / f) - 1,
              u = v.p == "a" ? 1 + i : 1,
              sN = (N) => (i ? ((1 + i) ** N - 1) / i : N);
            let N = Math.round(v.n * f),
              R = v.R;
            if (v.m == "t") {
              if (!(v.R > 0)) return ER("Il versamento deve essere positivo.");
              const Nn = i
                ? Math.log((v.G * i + v.R * u) / (v.C0 * i + v.R * u)) /
                  Math.log(1 + i)
                : (v.G - v.C0) / v.R;
              if (!isFinite(Nn) || Nn < 0)
                return ER("Obiettivo non raggiungibile con questi dati.");
              N = Math.max(1, Math.ceil(Nn - 1e-9));
            }
            if (v.m == "r") R = (v.G - v.C0 * (1 + i) ** N) / (u * sN(N));
            if (!(N >= 1 && N <= 1200))
              return ER("Durata non valida (da 1 a 1200 versamenti).");
            const B = [v.C0],
              V = [v.C0];
            let b = v.C0;
            for (let k = 1; k <= N; k++) {
              b = v.p == "a" ? (b + R) * (1 + i) : b * (1 + i) + R;
              B.push(b);
              V.push(v.C0 + R * k);
            }
            const M = B[N],
              vers = V[N];
            return (
              ks([
                K("Montante finale", f2(M), 1),
                K(
                  v.m == "r" ? "Versamento necessario" : "Versamento periodico",
                  f2(R),
                ),
                K("Totale versato", f2(vers)),
                K("Interessi maturati", f2(M - vers)),
                K("Numero versamenti", N),
                K("Durata", f2(N / f) + " anni"),
                K("Tasso periodale", f4(i * 100) + "%"),
              ]) +
              (v.m == "r" && R < 0
                ? '<p class="note">Il capitale iniziale basta già a superare l’obiettivo: il versamento risulta negativo.</p>'
                : "") +
              plot({
                t: "Crescita del capitale",
                xs: B.map((_, k) => k),
                stack: 1,
                bars: [
                  { n: "Totale versato", c: PAL[0], v: V },
                  {
                    n: "Interessi maturati",
                    c: PAL[1],
                    v: B.map((x, k) => x - V[k]),
                  },
                ],
                lb: B.map((_, k) => "Periodo " + k),
              })
            );
          },
        },
        ren: {
          n: "Rendite speciali",
          s: "R",
          fm: FM.ren,
          f: [
            {
              k: "m",
              l: "Tipo di rendita",
              t: "s",
              o: [
                ["p", "Perpetua (rata costante)"],
                ["c", "Perpetua crescente (Gordon)"],
                ["d", "Differita (rata costante)"],
                ["a", "Crescente aritmetica"],
                ["g", "Crescente geometrica"],
              ],
              v: "p",
            },
            { k: "R", l: "Prima rata (€)", v: 1000 },
            { k: "i", l: "Tasso per periodo (%)", v: 4 },
            {
              k: "n",
              l: "Numero di rate",
              v: 10,
              s: (v) => v.m != "p" && v.m != "c",
            },
            {
              k: "s",
              l: "Periodi di differimento",
              v: 3,
              s: (v) => v.m == "d",
            },
            {
              k: "g",
              l: "Tasso di crescita g (%)",
              v: 2,
              s: (v) => v.m == "c" || v.m == "g",
            },
            {
              k: "D",
              l: "Incremento per rata Δ (€)",
              v: 100,
              s: (v) => v.m == "a",
            },
          ],
          c(v) {
            const i = v.i / 100,
              R = v.R,
              g = v.g / 100;
            if (v.m == "p" || v.m == "c") {
              const gg = v.m == "c" ? g : 0;
              if (!(i > gg) || i <= 0)
                return ER(
                  v.m == "c"
                    ? "Serve i > g > −100%."
                    : "Serve un tasso positivo.",
                );
              const V = R / (i - gg),
                L = Math.min(300, Math.max(20, Math.ceil(4 / (i - gg)))),
                xs = [...Array(L)].map((_, k) => k + 1);
              let A = 0;
              const cum = xs.map(
                (k) => (A += R * (1 + gg) ** (k - 1) * (1 + i) ** -k),
              );
              return (
                ks([
                  K("Valore attuale", f2(V), 1),
                  K("Rata / valore", f4((R / V) * 100) + "%"),
                  K(
                    "Duration di Macaulay",
                    f4((1 + i) / (i - gg)) + " periodi",
                  ),
                ]) +
                `<p class="note">Rendita illimitata: il valore è la somma di infiniti termini che convergono.</p>` +
                plot({
                  t: "Somma dei valori attuali che converge",
                  xs,
                  zero: 1,
                  lines: [
                    { n: "Somma parziale", c: PAL[0], a: 1, v: cum },
                    {
                      n: "Valore limite",
                      c: PAL[1],
                      d: "5 4",
                      v: xs.map(() => V),
                    },
                  ],
                  lb: xs.map((k) => k + " rate"),
                })
              );
            }
            const n = Math.round(v.n),
              s = Math.round(v.s) || 0;
            if (!(n >= 1 && n <= 1000) || s < 0 || i <= -1)
              return ER("Numero di rate non valido.");
            let fl =
              v.m == "a"
                ? Array.from({ length: n }, (_, k) => R + k * v.D)
                : v.m == "g"
                  ? Array.from({ length: n }, (_, k) => R * (1 + g) ** k)
                  : Array(n).fill(R);
            if (v.m == "d") fl = Array(s).fill(0).concat(fl);
            const N = fl.length,
              pv = fl.reduce((a, x, k) => a + x * (1 + i) ** -(k + 1), 0);
            return (
              ks([
                K("Valore attuale", f2(pv), 1),
                K("Montante (t=" + N + ")", f2(pv * (1 + i) ** N)),
                K("Totale rate", f2(fl.reduce((a, x) => a + x, 0))),
                K("Ultima rata", f2(fl[N - 1])),
              ]) +
              `<p class="note">Rate posticipate (t = 1 … ${N}).${v.m == "d" ? " Le prime " + s + " epoche hanno rata nulla." : ""}</p>` +
              rendCh(fl, i, 1)
            );
          },
        },
        inf: {
          n: "Inflazione e tassi reali",
          s: "π",
          fm: FM.inf,
          f: [
            { k: "C", l: "Capitale (€)", v: 10000 },
            { k: "i", l: "Tasso nominale annuo (%)", v: 3 },
            { k: "p", l: "Inflazione annua (%)", v: 2 },
            { k: "t", l: "Durata (anni)", v: 10 },
            { k: "tau", l: "Imposta sugli interessi (%)", v: 26 },
          ],
          c(v) {
            const C = v.C,
              i = v.i / 100,
              p = v.p / 100,
              tau = v.tau / 100,
              t = v.t;
            if (i <= -1 || p <= -1 || !(t >= 0)) return ER("Dati non validi.");
            const iN = i * (1 - tau),
              xs = [...Array(41)].map((_, j) => ((t || 1) * j) / 40),
              Ml = C * (1 + i) ** t,
              Mn = C * (1 + iN) ** t;
            return (
              ks([
                K(
                  "Tasso reale (Fisher)",
                  f4(((1 + i) / (1 + p) - 1) * 100) + "%",
                  1,
                ),
                K("Tasso reale approssimato i − π", f4((i - p) * 100) + "%"),
                K("Tasso netto d’imposta", f4(iN * 100) + "%"),
                K(
                  "Tasso reale netto",
                  f4(((1 + iN) / (1 + p) - 1) * 100) + "%",
                ),
                K("Montante lordo", f2(Ml)),
                K("Montante netto", f2(Mn)),
                K("Valore reale del netto", f2(Mn / (1 + p) ** t)),
                K(
                  "Capitale per tenere il potere d’acquisto",
                  f2(C * (1 + p) ** t),
                ),
              ]) +
              `<p class="note">L’imposta è applicata al tasso annuo (semplificazione). Se il tasso reale netto è negativo, il capitale perde potere d’acquisto.</p>` +
              plot({
                t: "Montante e potere d’acquisto",
                xs,
                zero: 1,
                lines: [
                  {
                    n: "Montante lordo",
                    c: PAL[0],
                    v: xs.map((x) => C * (1 + i) ** x),
                  },
                  {
                    n: "Montante netto",
                    c: PAL[2],
                    a: 1,
                    v: xs.map((x) => C * (1 + iN) ** x),
                  },
                  {
                    n: "Valore reale del netto",
                    c: PAL[1],
                    v: xs.map((x) => C * ((1 + iN) / (1 + p)) ** x),
                  },
                  {
                    n: "Capitale per il potere d’acquisto",
                    c: PAL[3],
                    d: "5 4",
                    v: xs.map((x) => C * (1 + p) ** x),
                  },
                ],
                lb: xs.map((x) => "t = " + sh(x)),
              })
            );
          },
        },
        cap: {
          n: "CAPM e rischio",
          s: "β",
          fm: FM.cap,
          f: [
            { k: "rf", l: "Tasso privo di rischio (%)", v: 2 },
            { k: "rm", l: "Rendimento atteso del mercato (%)", v: 8 },
            { k: "beta", l: "Beta del titolo", v: 1.2 },
            { k: "rp", l: "Rendimento del portafoglio (%)", v: 9 },
            { k: "sp", l: "Volatilità del portafoglio σ (%)", v: 15 },
            { k: "sm", l: "Volatilità del mercato σ (%)", v: 12 },
            {
              k: "a",
              l: "Rendimenti del titolo (facoltativo, per calcolare il beta)",
              t: "a",
              v: "",
            },
            {
              k: "b",
              l: "Rendimenti del mercato (facoltativo)",
              t: "a",
              v: "",
            },
          ],
          c(v) {
            const A = nums(v.a),
              B = nums(v.b),
              nn = Math.min(A.length, B.length);
            let beta = v.beta,
              fs = false;
            if (nn >= 2) {
              const a = A.slice(0, nn),
                b = B.slice(0, nn),
                ma = a.reduce((x, y) => x + y, 0) / nn,
                mb = b.reduce((x, y) => x + y, 0) / nn,
                cv = a.reduce((s, x, k) => s + (x - ma) * (b[k] - mb), 0),
                vb = b.reduce((s, x) => s + (x - mb) ** 2, 0);
              if (vb > 0) {
                beta = cv / vb;
                fs = true;
              }
            }
            const rf = v.rf,
              rm = v.rm,
              ce = rf + beta * (rm - rf),
              xs = [...Array(26)].map((_, k) => k * 0.1);
            return (
              ks([
                K("Rendimento atteso CAPM", f2(ce) + "%", 1),
                K("Beta usato", f4(beta)),
                K("Premio di mercato rm − rf", f2(rm - rf) + "%"),
                K("Premio atteso del titolo", f2(beta * (rm - rf)) + "%"),
                K("Indice di Sharpe", v.sp > 0 ? f4((v.rp - rf) / v.sp) : "—"),
                K("Sharpe del mercato", v.sm > 0 ? f4((rm - rf) / v.sm) : "—"),
                K(
                  "Indice di Treynor",
                  beta ? f4((v.rp - rf) / beta) + "%" : "—",
                ),
                K("Alpha di Jensen", f2(v.rp - ce) + "%"),
              ]) +
              `<p class="note">${fs ? "Beta calcolato dalle serie inserite (cov/var)." : "Beta inserito manualmente."} ${v.rp - ce > 0 ? "Alpha positivo: il portafoglio ha reso più di quanto richiesto dal suo rischio sistematico." : "Alpha non positivo: rendimento non superiore a quello richiesto dal rischio."}</p>` +
              plot({
                t: "Security Market Line",
                xs,
                lines: [
                  {
                    n: "SML: rf + β(rm − rf)",
                    c: PAL[0],
                    a: 1,
                    v: xs.map((b) => rf + b * (rm - rf)),
                  },
                ],
                marks: [
                  {
                    x: 1,
                    y: rm,
                    c: PAL[1],
                    l: "Mercato (β = 1): " + f2(rm) + "%",
                  },
                  {
                    x: beta,
                    y: ce,
                    c: PAL[3],
                    l: "CAPM: " + f2(ce) + "% con β = " + f4(beta),
                  },
                  {
                    x: beta,
                    y: v.rp,
                    c: PAL[2],
                    l: "Portafoglio: " + f2(v.rp) + "%",
                  },
                ],
                yf: (q) => f2(q) + "%",
                xf: (q) => f2(q),
                lb: xs.map((b) => "β = " + f2(b)),
              })
            );
          },
        },
        rnd: {
          n: "Rendimenti e volatilità",
          s: "μ",
          fm: FM.rnd,
          f: [
            {
              k: "pr",
              l: "Prezzi (separati da ; o a capo)",
              t: "a",
              v: "100; 102; 101; 105; 107; 104; 110; 112",
            },
            {
              k: "fr",
              l: "Periodicità dei prezzi",
              t: "s",
              o: [
                [252, "Giornaliera (252 / anno)"],
                [52, "Settimanale (52 / anno)"],
                [12, "Mensile (12 / anno)"],
                [4, "Trimestrale (4 / anno)"],
                [1, "Annuale (1 / anno)"],
              ],
              v: 12,
            },
            { k: "rf", l: "Tasso privo di rischio annuo (%)", v: 2 },
            {
              k: "z",
              l: "Confidenza del VaR",
              t: "s",
              o: [
                [1.645, "95%"],
                [2.326, "99%"],
              ],
              v: 1.645,
            },
          ],
          c(v) {
            const P = nums(v.pr),
              n = P.length,
              f = +v.fr,
              z = +v.z;
            if (n < 3 || P.some((x) => !(x > 0)))
              return ER("Inserisci almeno 3 prezzi positivi.");
            const r = P.slice(1).map((p, k) => p / P[k] - 1),
              m = r.reduce((a, b) => a + b, 0) / r.length,
              sd = Math.sqrt(
                r.reduce((a, b) => a + (b - m) ** 2, 0) / (r.length - 1),
              ),
              cagr = (P[n - 1] / P[0]) ** (f / (n - 1)) - 1,
              va = sd * Math.sqrt(f);
            let mx = 0;
            const rmx = P.map((p) => (mx = Math.max(mx, p))),
              dd = P.map((p, k) => (p / rmx[k] - 1) * 100),
              xs = P.map((_, k) => k);
            return (
              ks([
                K("Rendimento totale", f2((P[n - 1] / P[0] - 1) * 100) + "%"),
                K("Rendimento annuo composto (CAGR)", f2(cagr * 100) + "%", 1),
                K("Rendimento medio periodale", f4(m * 100) + "%"),
                K("Volatilità periodale", f4(sd * 100) + "%"),
                K("Volatilità annua", f2(va * 100) + "%"),
                K(
                  "Indice di Sharpe",
                  va > 0 ? f4((m * f - v.rf / 100) / va) : "—",
                ),
                K("Massimo drawdown", f2(Math.min(...dd)) + "%"),
                K(
                  "VaR parametrico (per periodo)",
                  f2((z * sd - m) * 100) + "%",
                ),
              ]) +
              plot({
                t: "Andamento dei prezzi",
                xs,
                lines: [
                  { n: "Prezzo", c: PAL[0], a: 1, v: P },
                  { n: "Massimo storico", c: PAL[1], d: "5 4", v: rmx },
                ],
                lb: xs.map((k) => "Periodo " + k),
              }) +
              plot({
                t: "Rendimenti periodali (%)",
                xs: r.map((_, k) => k + 1),
                bars: [
                  { n: "Rendimento", c: PAL[2], v: r.map((x) => x * 100) },
                ],
                yf: (q) => f2(q) + "%",
                lb: r.map((_, k) => "Periodo " + (k + 1)),
              }) +
              plot({
                t: "Drawdown (%)",
                xs,
                zero: 1,
                lines: [{ n: "Drawdown", c: PAL[3], a: 1, v: dd }],
                yf: (q) => f2(q) + "%",
                lb: xs.map((k) => "Periodo " + k),
              })
            );
          },
        },
        opz: {
          n: "Opzioni (Black–Scholes)",
          s: "Δ",
          fm: FM.opz,
          f: [
            { k: "S", l: "Prezzo del sottostante S (€)", v: 100 },
            { k: "K", l: "Prezzo di esercizio K (€)", v: 100 },
            { k: "T", l: "Scadenza (anni)", v: 1 },
            { k: "r", l: "Tasso privo di rischio annuo continuo (%)", v: 3 },
            { k: "s", l: "Volatilità annua σ (%)", v: 20 },
            { k: "q", l: "Dividend yield continuo (%)", v: 0 },
          ],
          c(v) {
            const S = v.S,
              K_ = v.K,
              T = v.T,
              r = v.r / 100,
              s = v.s / 100,
              q = v.q / 100;
            if (!(S > 0 && K_ > 0 && T > 0 && s > 0))
              return ER("S, K, scadenza e volatilità devono essere positivi.");
            const b = bsf(S, K_, T, r, s, q),
              ph = npdf(b.d1),
              sT = Math.sqrt(T),
              th = (-S * b.dq * ph * s) / (2 * sT),
              xs = [...Array(41)].map((_, j) => K_ * (0.5 + j / 40)),
              cc = (x) => bsf(x, K_, T, r, s, q);
            return (
              ks([
                K("Prezzo Call", f4(b.c), 1),
                K("Prezzo Put", f4(b.p), 1),
                K("d1", f4(b.d1)),
                K("d2", f4(b.d2)),
                K(
                  "Parità C − P",
                  f4(b.c - b.p) + " (teorico " + f4(S * b.dq - K_ * b.er) + ")",
                ),
              ]) +
              ks([
                K(
                  "Delta Call / Put",
                  f4(b.dq * ncdf(b.d1)) + " / " + f4(b.dq * (ncdf(b.d1) - 1)),
                ),
                K("Gamma", f4((b.dq * ph) / (S * s * sT))),
                K("Vega (per 1% di σ)", f4((S * b.dq * ph * sT) / 100)),
                K(
                  "Theta Call / Put (al giorno)",
                  f4(
                    (th -
                      r * K_ * b.er * ncdf(b.d2) +
                      q * S * b.dq * ncdf(b.d1)) /
                      365,
                  ) +
                    " / " +
                    f4(
                      (th +
                        r * K_ * b.er * ncdf(-b.d2) -
                        q * S * b.dq * ncdf(-b.d1)) /
                        365,
                    ),
                ),
                K(
                  "Rho Call / Put (per 1% di r)",
                  f4((K_ * T * b.er * ncdf(b.d2)) / 100) +
                    " / " +
                    f4((-K_ * T * b.er * ncdf(-b.d2)) / 100),
                ),
              ]) +
              `<p class="note">Opzioni europee, modello di Black–Scholes–Merton con dividendo continuo.</p>` +
              plot({
                t: "Valore dell’opzione al variare del sottostante",
                xs,
                zero: 1,
                lines: [
                  {
                    n: "Call (BS)",
                    c: PAL[0],
                    a: 1,
                    v: xs.map((x) => cc(x).c),
                  },
                  { n: "Put (BS)", c: PAL[3], v: xs.map((x) => cc(x).p) },
                  {
                    n: "Valore intrinseco call",
                    c: PAL[0],
                    d: "5 4",
                    v: xs.map((x) => Math.max(x - K_, 0)),
                  },
                  {
                    n: "Valore intrinseco put",
                    c: PAL[3],
                    d: "5 4",
                    v: xs.map((x) => Math.max(K_ - x, 0)),
                  },
                ],
                marks: [
                  {
                    x: S,
                    y: b.c,
                    c: PAL[1],
                    l: "Call a S = " + f2(S) + ": " + f4(b.c),
                  },
                  {
                    x: S,
                    y: b.p,
                    c: PAL[2],
                    l: "Put a S = " + f2(S) + ": " + f4(b.p),
                  },
                ],
                yf: f4,
                lb: xs.map((x) => "S = " + f2(x)),
              })
            );
          },
        },
      });
      const FLG = {
        fr: '<svg class="fl" viewBox="0 0 3 2" preserveAspectRatio="none"><rect width="1" height="2" fill="#0055A4"/><rect x="1" width="1" height="2" fill="#fff"/><rect x="2" width="1" height="2" fill="#EF4135"/></svg>',
        it: '<svg class="fl" viewBox="0 0 3 2" preserveAspectRatio="none"><rect width="1" height="2" fill="#009246"/><rect x="1" width="1" height="2" fill="#fff"/><rect x="2" width="1" height="2" fill="#CE2B37"/></svg>',
        de: '<svg class="fl" viewBox="0 0 3 2" preserveAspectRatio="none"><rect width="3" height="2" fill="#000"/><rect y=".667" width="3" height="1.333" fill="#DD0000"/><rect y="1.333" width="3" height=".667" fill="#FFCE00"/></svg>',
        am:
          '<svg class="fl" viewBox="0 0 19 10" preserveAspectRatio="none"><rect width="19" height="10" fill="#fff"/>' +
          [0, 2, 4, 6, 8, 10, 12]
            .map(
              (k) =>
                `<rect y="${(k * 10) / 13}" width="19" height="${10 / 13}" fill="#B22234"/>`,
            )
            .join("") +
          '<rect width="7.6" height="5.385" fill="#3C3B6E"/></svg>',
      };
      const ICO = {
        "amm.m": ["📅", "🗓️", "🧾", "🔄"],
        "amm.ric": { n: "🚫", s: "🏦" },
        "pre.nu": ["🗓️", "📅"],
        "val.m": { s: "💶", c: "🔁", v: "📈" },
        "val.p": { p: "⏭️", a: "⏮️" },
        "con.d": { i: "％", d: "δ" },
        "dur.au": ["📅", "🗓️", "📆", "⏱️"],
        "dur.pu": ["🔢", "🗓️", "📆", "⏱️", "🎆"],
        "vc.k": { c: "🧪", p: "🌍" },
        "tas.d": { i: "📊", j: "🔄", d: "🏷️" },
        "obb.m": { p: "💶", y: "🎯" },
        "pac.m": { m: "💰", r: "🎯", t: "⏱️" },
        "pac.f": ["📅", "🗓️", "🧾", "🔄"],
        "pac.p": { p: "⏭️", a: "⏮️" },
        "ren.m": { p: "♾️", c: "📈", d: "⏳", a: "📶", g: "🚀" },
        "rnd.fr": ["⏱️", "📆", "🗓️", "🧾", "🎆"],
        "rnd.z": ["🛡️", "🔒"],
      };
      function ic(t, f, v, j) {
        if (t == "amm" && f == "t" && FLG[v]) return FLG[v];
        const m = ICO[t + "." + f],
          e = Array.isArray(m) ? m[j] : m && m[v];
        return `<span class="ic">${e || "◆"}</span>`;
      }
      const TH = {
        amm: [
          "🏦",
          "#10b981",
          "Piani di rimborso: francese, italiano, tedesco, americano con rata costitutiva",
        ],
        pre: [
          "💳",
          "#84cc16",
          "Rata, interessi totali, TAEG, sostenibilità e tasso variabile",
        ],
        val: ["🧮", "#f5b800", "Valore attuale e montante di somme e rendite"],
        reg: [
          "✂️",
          "#d946ef",
          "Interesse semplice e composto, sconto razionale e commerciale",
        ],
        tas: [
          "🔄",
          "#fb7185",
          "Tassi equivalenti, nominali convertibili e di sconto",
        ],
        con: [
          "🌀",
          "#8b5cf6",
          "Capitalizzazione continua e intensità istantanea δ",
        ],
        ren: [
          "♾️",
          "#f97316",
          "Perpetue, Gordon, differite, crescenti aritmetiche e geometriche",
        ],
        pac: [
          "🌱",
          "#22c55e",
          "Piani di accumulo: montante, versamento, tempo per l’obiettivo",
        ],
        obb: [
          "🏛️",
          "#14b8a6",
          "Prezzo e rendimento a scadenza di obbligazioni e zero coupon",
        ],
        dur: [
          "⏳",
          "#0891b2",
          "Duration di Macaulay, duration modificata e convessità",
        ],
        flu: [
          "🌊",
          "#6366f1",
          "Duration e scadenza media di un flusso qualsiasi",
        ],
        npv: ["📈", "#a855f7", "VAN, TIR, payback e indice di profitabilità"],
        inf: [
          "🔥",
          "#e11d48",
          "Inflazione, tasso reale di Fisher e imposte sugli interessi",
        ],
        vc: [
          "📊",
          "#3b82f6",
          "Varianza, covarianza, correlazione, regressione e portafoglio",
        ],
        rnd: [
          "📉",
          "#0ea5e9",
          "Rendimenti, volatilità, drawdown e VaR da serie di prezzi",
        ],
        cap: ["🎯", "#ec4899", "CAPM, beta, Sharpe, Treynor e alpha di Jensen"],
        opz: ["🧪", "#dc2626", "Black–Scholes: prezzo di call e put e greche"],
      };
      const HD = {
        e: "Σ",
        t: "Matematica Finanziaria",
        d: "Ammortamenti · Rendite · Duration · VAN e TIR · Statistica · Obbligazioni · Opzioni",
      };
      function theme() {
        const w = document.querySelector(".w"),
          lg = w.querySelector(".logo"),
          h = w.querySelector("header h1"),
          pp = w.querySelector("header p");
        if (atHome) {
          ["--ac", "--gold", "--ac2"].forEach((q) => w.style.removeProperty(q));
          lg.textContent = HD.e;
          h.textContent = HD.t;
          pp.textContent = HD.d;
          return;
        }
        const t = TH[cur];
        w.style.setProperty("--ac", t[1]);
        w.style.setProperty("--gold", t[1]);
        w.style.setProperty(
          "--ac2",
          "color-mix(in srgb," + t[1] + " 42%,#07101f)",
        );
        lg.textContent = t[0];
        h.textContent = T[cur].n;
        pp.textContent = t[2];
      }
      let cur = "amm";
      const V = {};
      let an;
      function build(sc, set) {
        nav.innerHTML = grp.t
          .map(
            (k, j) =>
              `<button class="${k == cur ? "on" : ""}" data-k="${k}" style="--tc:${TH[k][1]}"><b class="sy">${TH[k][0]}</b>${T[k].n}${j < 9 ? `<em class="nb">${j + 1}</em>` : ""}</button>`,
          )
          .join("");
        ft.innerHTML = `<span class="sy">${TH[cur][0]}</span>${T[cur].n}`;
        theme();
        fm.innerHTML = T[cur].fm;
        form.innerHTML = T[cur].f
          .map((x) => {
            const id = "f_" + x.k,
              t = x.t || "n";
            return (
              `<div data-f="${x.k}"><label for="${id}">${x.l}</label>` +
              (t == "s"
                ? `<div class="seg" data-s="${id}">${x.o.map((o, j) => `<button type="button" class="sg${o[0] == x.v ? " on" : ""}" data-v="${o[0]}">${ic(cur, x.k, o[0], j)}<span>${o[1]}</span></button>`).join("")}</div><select id="${id}" hidden>${x.o.map((o) => `<option value="${o[0]}"${o[0] == x.v ? " selected" : ""}>${o[1]}</option>`).join("")}</select>`
                : t == "a"
                  ? `<textarea id="${id}" rows="3">${x.v}</textarea>`
                  : `<input id="${id}" inputmode="decimal" value="${x.v}">`) +
              "</div>"
            );
          })
          .join("");
        ap(set || {});
        calc();
        out.classList.add("an");
        clearTimeout(an);
        an = setTimeout(() => out.classList.remove("an"), 700);
        if (sc) {
          const a = nav.querySelector(".on");
          if (a) a.scrollIntoView({ inline: "center", block: "nearest" });
          const y =
            main.getBoundingClientRect().top + scrollY - navw.offsetHeight - 12;
          if (scrollY > y)
            scrollTo({ top: Math.max(0, y), behavior: "smooth" });
        }
      }
      function calc() {
        const d = T[cur],
          v = {};
        d.f.forEach((x) => {
          const e = document.getElementById("f_" + x.k),
            t = x.t || "n";
          v[x.k] = t == "n" ? parseFloat(e.value.replace(",", ".")) : e.value;
          if (t == "n" && isNaN(v[x.k])) v[x.k] = 0;
        });
        d.f.forEach((x) => {
          document.querySelector(`[data-f="${x.k}"]`).style.display =
            !x.s || x.s(v) ? "" : "none";
        });
        form.querySelectorAll(".seg").forEach((g) => {
          const sv = document.getElementById(g.dataset.s).value;
          g.querySelectorAll(".sg").forEach((b) =>
            b.classList.toggle("on", b.dataset.v == sv),
          );
        });
        try {
          out.innerHTML = d.c(v);
        } catch (e) {
          out.innerHTML = '<p class="err">Controlla i dati inseriti.</p>';
        }
      }
      nav.onclick = (e) => {
        const k = (e.target.closest("[data-k]") || { dataset: {} }).dataset.k;
        if (k) {
          cur = k;
          build(1);
        }
      };
      function go(d) {
        const ks = grp.t;
        cur = ks[(ks.indexOf(cur) + d + ks.length) % ks.length];
        build(1);
      }
      pv.onclick = () => go(-1);
      nx.onclick = () => go(1);
      document.addEventListener("keydown", (e) => {
        if (atHome || (e.key != "ArrowLeft" && e.key != "ArrowRight")) return;
        if (e.ctrlKey || e.metaKey || e.shiftKey) return;
        if (
          (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) ||
            (e.target.classList && e.target.classList.contains("sg"))) &&
          !e.altKey
        )
          return;
        e.preventDefault();
        go(e.key == "ArrowLeft" ? -1 : 1);
        const b = nav.querySelector(".on");
        if (b) b.scrollIntoView({ inline: "center", block: "nearest" });
      });
      function san(e) {
        const t = e.target;
        if (t.tagName != "INPUT" && t.tagName != "TEXTAREA") return;
        const re = t.tagName == "INPUT" ? /[^0-9.,+\-]/g : /[^0-9.,;+\-\s]/g,
          o = t.value,
          n = o.replace(re, "");
        if (n !== o) {
          const p = t.selectionStart - (o.length - n.length);
          t.value = n;
          try {
            t.setSelectionRange(Math.max(0, p), Math.max(0, p));
          } catch (x) {}
        }
      }
      form.addEventListener("input", (e) => {
        san(e);
        calc();
      });
      form.addEventListener("change", (e) => {
        san(e);
        calc();
      });
      const tip = document.createElement("div");
      tip.id = "tip";
      document.body.appendChild(tip);
      ["pointermove", "pointerdown"].forEach((ev) =>
        document.addEventListener(ev, (e) => {
          const t = e.target.closest && e.target.closest("[data-tip]");
          if (!t) {
            tip.style.opacity = 0;
            return;
          }
          tip.innerHTML = t.dataset.tip;
          tip.style.opacity = 1;
          const w = tip.offsetWidth;
          tip.style.left =
            Math.max(8, Math.min(innerWidth - w - 8, e.clientX + 14)) + "px";
          tip.style.top = e.clientY + 16 + "px";
        }),
      );
      let rz;
      addEventListener("resize", () => {
        clearTimeout(rz);
        rz = setTimeout(calc, 150);
      });
      const ap = (o) =>
        Object.entries(o).forEach(([k, v]) => {
          const e = document.getElementById("f_" + k);
          if (e) e.value = v;
        });
      const OPT = [
        [
          "amm",
          "Ammortamento francese",
          "mutuo a rata costante, quota capitale crescente",
          { t: "fr" },
        ],
        [
          "amm",
          "Ammortamento italiano",
          "quota capitale costante, rate decrescenti",
          { t: "it" },
        ],
        [
          "amm",
          "Ammortamento tedesco",
          "interessi anticipati, rata costante",
          { t: "de" },
        ],
        [
          "amm",
          "Ammortamento americano",
          "rimborso a scadenza, solo interessi",
          { t: "am", ric: "n" },
        ],
        [
          "amm",
          "Ammortamento americano con rata costitutiva",
          "fondo di ricostituzione del capitale, rata costitutiva",
          { t: "am", ric: "s" },
          "rr",
        ],
        [
          "amm",
          "Rata costitutiva",
          "prospetto di costituzione del capitale, fondo di ammortamento",
          { t: "am", ric: "s" },
          "rr",
        ],
        [
          "amm",
          "Rate mensili",
          "piano di ammortamento mensile",
          { m: 12 },
          "m",
        ],
        [
          "amm",
          "Rate trimestrali",
          "piano di ammortamento trimestrale",
          { m: 4 },
          "m",
        ],
        ["pre", "Prestito personale", "rata, interessi totali, TAEG"],
        ["pre", "TAEG", "spese di istruttoria e di incasso", {}, "e"],
        [
          "pre",
          "Sostenibilità della rata",
          "rata entro un terzo del reddito netto",
          {},
          "w",
        ],
        [
          "pre",
          "Prestito a tasso variabile",
          "nuova rata dopo variazione del tasso",
          {},
          "r2",
        ],
        [
          "val",
          "Valore attuale di una somma",
          "attualizzazione, sconto composto",
          { m: "s" },
          "C",
        ],
        [
          "val",
          "Montante di una somma",
          "capitalizzazione composta",
          { m: "s" },
          "C",
        ],
        [
          "val",
          "Rendita posticipata a rata costante",
          "valore attuale e montante",
          { m: "c", p: "p" },
        ],
        [
          "val",
          "Rendita anticipata a rata costante",
          "valore attuale e montante",
          { m: "c", p: "a" },
        ],
        [
          "val",
          "Rendita a rate variabili posticipata",
          "valore attuale e montante",
          { m: "v", p: "p" },
          "fl",
        ],
        [
          "val",
          "Rendita a rate variabili anticipata",
          "valore attuale e montante",
          { m: "v", p: "a" },
          "fl",
        ],
        [
          "con",
          "Tasso continuo da tasso effettivo",
          "δ = ln(1+i), intensità istantanea",
          { d: "i" },
        ],
        ["con", "Tasso effettivo da intensità δ", "i = e^δ − 1", { d: "d" }],
        [
          "dur",
          "Duration di un’obbligazione",
          "Macaulay e modificata, durata media finanziaria",
        ],
        ["dur", "Convessità", "correzione del secondo ordine"],
        [
          "dur",
          "Cedole mensili",
          "12 cedole all’anno",
          { p: 12, pu: "f" },
          "p",
        ],
        [
          "dur",
          "Cedole semestrali",
          "2 cedole all’anno",
          { p: 2, pu: "f" },
          "p",
        ],
        ["dur", "Cedole annuali", "1 cedola all’anno", { p: 1, pu: "f" }, "p"],
        ["dur", "Variazione del prezzo per Δr", "ΔP ≈ −D·P·Δr/(1+r)", {}, "dr"],
        ["flu", "Duration di un flusso", "importi e scadenze libere"],
        [
          "flu",
          "Scadenza media aritmetica",
          "senza tasso di interesse",
          {},
          "fl",
        ],
        ["flu", "Duration al tempo t*", "tempo di valutazione", {}, "tx"],
        ["vc", "Varianza", "varianza campionaria e di popolazione", {}, "x"],
        ["vc", "Covarianza", "covarianza tra due serie", {}, "x"],
        ["vc", "Correlazione", "coefficiente di correlazione ρ", {}, "x"],
        ["vc", "Retta di regressione", "minimi quadrati, R²", {}, "x"],
        ["vc", "Deviazione standard", "scarto quadratico medio", {}, "x"],
        [
          "vc",
          "Varianza di portafoglio",
          "due titoli, peso a varianza minima",
          {},
          "w",
        ],
        [
          "tas",
          "Tassi equivalenti",
          "tasso effettivo, nominale convertibile, sconto",
        ],
        [
          "tas",
          "Tasso nominale convertibile",
          "j(m), frazionamento",
          { d: "j" },
          "x",
        ],
        ["tas", "Tasso di sconto", "d = i/(1+i), anticipato", { d: "d" }, "x"],
        ["reg", "Interesse semplice", "regime semplice, montante"],
        [
          "reg",
          "Sconto commerciale",
          "sconto razionale, commerciale, composto",
          {},
          "d",
        ],
        [
          "obb",
          "Prezzo di un’obbligazione",
          "prezzo dal rendimento, cedole",
          { m: "p" },
        ],
        [
          "obb",
          "Rendimento a scadenza YTM",
          "rendimento dal prezzo, current yield",
          { m: "y" },
          "P",
        ],
        ["obb", "Zero coupon", "obbligazione senza cedola", { c: 0 }, "c"],
        [
          "pac",
          "Piano di accumulo",
          "PAC, montante di versamenti periodici",
          { m: "m" },
        ],
        [
          "pac",
          "Versamento per un obiettivo",
          "rata necessaria per raggiungere un capitale",
          { m: "r" },
          "G",
        ],
        [
          "pac",
          "Tempo per raggiungere un obiettivo",
          "quanti anni servono",
          { m: "t" },
          "G",
        ],
        ["ren", "Rendita perpetua", "valore attuale illimitato", { m: "p" }],
        [
          "ren",
          "Formula di Gordon",
          "perpetua crescente, dividendi",
          { m: "c" },
          "g",
        ],
        [
          "ren",
          "Rendita differita",
          "pagamenti che partono dopo s periodi",
          { m: "d" },
          "s",
        ],
        [
          "ren",
          "Rendita crescente aritmetica",
          "rate in progressione aritmetica",
          { m: "a" },
          "D",
        ],
        [
          "ren",
          "Rendita crescente geometrica",
          "rate in progressione geometrica",
          { m: "g" },
          "g",
        ],
        [
          "inf",
          "Tasso reale di Fisher",
          "inflazione, potere d’acquisto",
          {},
          "p",
        ],
        [
          "inf",
          "Imposta sugli interessi",
          "rendimento netto, tassazione",
          {},
          "tau",
        ],
        ["cap", "CAPM", "rendimento atteso, security market line", {}, "beta"],
        [
          "cap",
          "Indice di Sharpe",
          "rendimento corretto per il rischio",
          {},
          "sp",
        ],
        ["cap", "Alpha di Jensen", "extra-rendimento, Treynor", {}, "rp"],
        [
          "cap",
          "Beta da serie storiche",
          "covarianza con il mercato / varianza",
          {},
          "a",
        ],
        [
          "rnd",
          "Volatilità storica",
          "rendimenti da prezzi, deviazione standard",
          {},
          "pr",
        ],
        ["rnd", "Massimo drawdown", "perdita massima dal picco", {}, "pr"],
        ["rnd", "CAGR", "rendimento annuo composto", {}, "pr"],
        ["rnd", "Value at Risk", "VaR parametrico", {}, "z"],
        ["opz", "Opzione call", "Black-Scholes, prezzo call"],
        ["opz", "Opzione put", "Black-Scholes, prezzo put"],
        ["opz", "Greche", "delta, gamma, vega, theta, rho", {}, "s"],
        ["npv", "Indice di profitabilità", "payback scontato", {}, "fl"],
        ["npv", "VAN", "valore attuale netto, NPV", {}, "r"],
        ["npv", "TIR", "tasso interno di rendimento, IRR", {}, "fl"],
      ];
      const GEN = Object.keys(T).flatMap((k) =>
          T[k].f.flatMap((x) =>
            x.t == "s"
              ? x.o.map((o) => [
                  k,
                  o[1],
                  "Imposta «" + x.l + "»",
                  { [x.k]: o[0] },
                  x.k,
                ])
              : [[k, x.l, "Vai al campo", {}, x.k]],
          ),
        ),
        ALL = Object.keys(T)
          .map((k) => [k, T[k].n, "Apri la sezione", {}])
          .concat(OPT)
          .concat(GEN),
        nz = (t) =>
          t
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
      let RS = [],
        sel = 0;
      const srch = (q) => {
        const w = nz(q).split(/\s+/).filter(Boolean);
        return ALL.map((o) => {
          const h = nz(o[1] + " " + o[2] + " " + T[o[0]].n);
          let sc = 0;
          for (const x of w) {
            const j = h.indexOf(x);
            if (j < 0) return null;
            sc += j;
          }
          return [sc, o];
        })
          .filter(Boolean)
          .sort((a, b) => a[0] - b[0])
          .map((x) => x[1])
          .slice(0, 40);
      };
      function rp() {
        pl.innerHTML = RS.length
          ? RS.map(
              (o, i) =>
                `<div class="pi${i == sel ? " on" : ""}" data-i="${i}" role="option"><span class="pg" style="background:${TH[o[0]][1]};font-style:normal">${TH[o[0]][0]}</span><div><b>${o[1]}</b><small>${o[2]} · ${T[o[0]].n}</small></div><kbd>↵</kbd></div>`,
            ).join("")
          : '<div class="pe">Nessun risultato</div>';
        const e = pl.querySelector(".on");
        if (e) e.scrollIntoView({ block: "nearest" });
      }
      const sr = () => {
          RS = srch(pq.value);
          sel = 0;
          rp();
        },
        openP = () => {
          pal.hidden = false;
          pq.value = "";
          sr();
          pq.focus();
        },
        closeP = () => {
          pal.hidden = true;
        };
      function goTo(o) {
        const set = o[3] || {},
          g = GR.find((x) => x.t.includes(o[0])),
          sw = atHome || g !== grp || o[0] !== cur;
        atHome = false;
        grp = g;
        cur = o[0];
        view();
        if (sw) build(1, set);
        else {
          ap(set);
          calc();
        }
        if (o[4]) {
          const e = document.getElementById("f_" + o[4]);
          if (e) {
            e.focus();
            if (e.select) e.select();
          }
        }
      }
      sb.onclick = openP;
      pq.oninput = sr;
      pal.addEventListener("mousedown", (e) => {
        if (e.target === pal) closeP();
      });
      pl.addEventListener("click", (e) => {
        const i = e.target.closest(".pi");
        if (i) {
          const o = RS[+i.dataset.i];
          closeP();
          goTo(o);
        }
      });
      pl.addEventListener("mousemove", (e) => {
        const i = e.target.closest(".pi");
        if (i && +i.dataset.i !== sel) {
          sel = +i.dataset.i;
          pl.querySelectorAll(".pi").forEach((x, j) =>
            x.classList.toggle("on", j == sel),
          );
        }
      });
      pq.addEventListener("keydown", (e) => {
        if (e.key == "ArrowDown" || e.key == "ArrowUp") {
          e.preventDefault();
          if (RS.length) {
            sel =
              (sel + (e.key == "ArrowDown" ? 1 : -1) + RS.length) % RS.length;
            rp();
          }
        } else if (e.key == "Enter") {
          e.preventDefault();
          const o = RS[sel];
          if (o) {
            closeP();
            goTo(o);
          }
        } else if (e.key == "Escape") closeP();
      });
      document.addEventListener("keydown", (e) => {
        const ty =
          /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) ||
          !!(e.target.classList && e.target.classList.contains("sg"));
        if (
          ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() == "k") ||
          (!ty && e.key == "/")
        ) {
          e.preventDefault();
          openP();
          return;
        }
        if (e.key == "Escape" && !atHome && pal.hidden && !ty) {
          toHome();
          return;
        }
        if (
          !ty &&
          pal.hidden &&
          !e.ctrlKey &&
          !e.metaKey &&
          !e.altKey &&
          /^[1-9]$/.test(e.key)
        ) {
          if (atHome) {
            if (GR[e.key - 1]) openG(e.key - 1);
          } else {
            const k = grp.t[e.key - 1];
            if (k) {
              cur = k;
              build(1);
            }
          }
        }
      });
      form.addEventListener("click", (e) => {
        const b = e.target.closest && e.target.closest(".sg");
        if (!b) return;
        const sel = document.getElementById(b.parentNode.dataset.s);
        if (sel.value != b.dataset.v) {
          sel.value = b.dataset.v;
          sel.dispatchEvent(new Event("change", { bubbles: true }));
        }
      });
      form.addEventListener("keydown", (e) => {
        const t = e.target;
        if (e.key == "Escape") {
          t.blur();
          return;
        }
        if (
          t.classList &&
          t.classList.contains("sg") &&
          /^Arrow(Left|Right|Up|Down)$/.test(e.key)
        ) {
          e.preventDefault();
          const bs = [...t.parentNode.children],
            n =
              bs[
                (bs.indexOf(t) + (/Left|Up/.test(e.key) ? -1 : 1) + bs.length) %
                  bs.length
              ];
          n.click();
          n.focus();
          return;
        }
        if (
          e.key == "Enter" &&
          (t.tagName == "INPUT" ||
            t.tagName == "SELECT" ||
            (t.classList && t.classList.contains("sg")))
        ) {
          e.preventDefault();
          const f = [...form.querySelectorAll("input,textarea,.sg.on")].filter(
              (x) => x.offsetParent,
            ),
            n = f[f.indexOf(t) + 1] || f[0];
          n.focus();
          if (n.select) n.select();
        }
        if (
          (e.key == "ArrowUp" || e.key == "ArrowDown") &&
          t.tagName == "INPUT" &&
          !e.ctrlKey &&
          !e.metaKey
        ) {
          e.preventDefault();
          const n = parseFloat(t.value.replace(",", ".")) || 0;
          t.value = +(
            n +
            (e.shiftKey ? 10 : e.altKey ? 0.1 : 1) *
              (e.key == "ArrowUp" ? 1 : -1)
          ).toFixed(6);
          calc();
        }
      });
      tg.onclick = () => {
        const r = document.documentElement,
          d = r.dataset.theme
            ? r.dataset.theme == "dark"
            : matchMedia("(prefers-color-scheme:dark)").matches;
        r.dataset.theme = d ? "light" : "dark";
      };
      const GR = [
        {
          n: "Prestiti & Ammortamenti",
          i: "🏠",
          c: "#10b981",
          t: ["amm", "pre"],
        },
        {
          n: "Valore attuale & Tassi",
          i: "🧮",
          c: "#f5b800",
          t: ["val", "reg", "tas", "con"],
        },
        { n: "Rendite & Accumulo", i: "💰", c: "#f97316", t: ["ren", "pac"] },
        {
          n: "Obbligazioni & Duration",
          i: "🏛️",
          c: "#14b8a6",
          t: ["obb", "dur", "flu"],
        },
        {
          n: "Investimenti & Inflazione",
          i: "📈",
          c: "#a855f7",
          t: ["npv", "inf"],
        },
        { n: "Statistica", i: "📊", c: "#3b82f6", t: ["vc", "rnd"] },
        { n: "Rischio & CAPM", i: "⚖️", c: "#06b6d4", t: ["cap"] },
        { n: "Opzioni", i: "🎯", c: "#ef4444", t: ["opz"] },
      ];
      let atHome = true,
        grp = GR[0];
      hm.innerHTML =
        `<h2 class="ht">Dove vuoi andare?</h2><p class="hs">Le schede sono divise per sezione: scegline una per entrare, poi usa «Home» per tornare qui.</p>` +
        GR.map(
          (g, k) =>
            `<section class="hsec" style="--c:${g.c}"><button class="hh" data-g="${k}" style="--c:${g.c}"><span class="gi">${g.i}</span><span>${g.n}</span><small class="hp">${g.t.length} ${g.t.length == 1 ? "scheda" : "schede"}</small><em class="nb">${k + 1}</em><span class="go">Apri sezione →</span></button><div class="hg">${g.t.map((x, j) => `<button class="hc sm" data-t="${x}" style="--c:${TH[x][1]};--d:${(k * 3 + j) * 35}ms"><span class="hi">${TH[x][0]}</span><b>${T[x].n}</b><span class="hl">${TH[x][2]}</span></button>`).join("")}</div></section>`,
        ).join("");
      function view() {
        theme();
        hm.style.display = atHome ? "" : "none";
        navw.style.display = atHome ? "none" : "";
        main.style.display = atHome ? "none" : "";
        hn.innerHTML = atHome
          ? "<kbd>1</kbd>–<kbd>8</kbd> apri una sezione · <kbd>←</kbd><kbd>→</kbd><kbd>↑</kbd><kbd>↓</kbd> muoviti · <kbd>Invio</kbd> apri · <kbd>/</kbd> o <kbd>Ctrl</kbd>+<kbd>K</kbd> cerca"
          : `<kbd>←</kbd><kbd>→</kbd> cambia scheda · <kbd>1</kbd>–<kbd>${grp.t.length}</kbd> vai a · <kbd>/</kbd> o <kbd>Ctrl</kbd>+<kbd>K</kbd> cerca · <kbd>↑</kbd><kbd>↓</kbd> nei campi cambiano il valore · <kbd>Invio</kbd> campo successivo · <kbd>Esc</kbd> esci dal campo, poi torna alla home`;
      }
      function openT(x) {
        grp = GR.find((g) => g.t.includes(x));
        atHome = false;
        cur = x;
        view();
        build(1);
        scrollTo({ top: 0 });
        try {
          history.pushState({ in: 1 }, "");
        } catch (e) {}
      }
      function openG(k) {
        atHome = false;
        grp = GR[k];
        cur = grp.t[0];
        view();
        build(1);
        scrollTo({ top: 0 });
        try {
          history.pushState({ in: 1 }, "");
        } catch (e) {}
      }
      function toHome() {
        atHome = true;
        view();
        const c = hm.querySelector('[data-t="' + cur + '"]');
        scrollTo({ top: 0 });
        if (c) c.focus({ preventScroll: true });
      }
      hm.addEventListener("click", (e) => {
        const t = e.target.closest("[data-t]");
        if (t) {
          openT(t.dataset.t);
          return;
        }
        const c = e.target.closest("[data-g]");
        if (c) openG(+c.dataset.g);
      });
      bk.onclick = () => {
        if (history.state && history.state.in) {
          try {
            history.back();
            setTimeout(() => {
              if (!atHome) toHome();
            }, 200);
            return;
          } catch (e) {}
        }
        toHome();
      };
      addEventListener("popstate", () => {
        if (!atHome) toHome();
      });
      document.querySelector(".logo").onclick = () => {
        if (!atHome) bk.onclick();
      };
      document.addEventListener("keydown", (e) => {
        if (!atHome || !pal.hidden || e.ctrlKey || e.metaKey || e.altKey)
          return;
        const m = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[
          e.key
        ];
        if (!m) return;
        const cs = [...hm.querySelectorAll(".hc")],
          i = cs.indexOf(document.activeElement);
        e.preventDefault();
        cs[
          i < 0 ? (m > 0 ? 0 : cs.length - 1) : (i + m + cs.length) % cs.length
        ].focus();
      });
      view();
      build();