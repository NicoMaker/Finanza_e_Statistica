function comDesc0(id, P) {
  const { n, k, L, w, sz } = P,
    sep = P.sep,
    ord = (c) => c.map((i) => L[i]).join(sep),
    ins = (c) => "{" + c.map((i) => L[i]).join(", ") + "}";
  switch (id) {
    case "ds":
      return {
        nome: "Disposizioni semplici",
        o: "sì",
        r: "no",
        fml: `${comI("D")}<sub>n,k</sub> = ${fr("n!", "(n−k)!")}`,
        val: bDisp(n, k),
        passo:
          k > n
            ? `k = ${k} è maggiore di n = ${n}: senza ripetizioni non si possono scegliere ${k} elementi su ${n}.`
            : `D(${n},${k}) = ${n}! / (${n}−${k})! = ${comProd(n, k)}`,
        en: (l) => enumDisp(n, k, l),
        fm: ord,
      };
    case "dr":
      return {
        nome: "Disposizioni con ripetizione",
        o: "sì",
        r: "sì",
        fml: `${comI("D′")}<sub>n,k</sub> = ${comI("n")}<sup>${comI("k")}</sup>`,
        val: bDispRip(n, k),
        passo: `D′(${n},${k}) = ${n}<sup>${k}</sup> = ${k ? Array(Math.min(k, 6)).fill(n).join(" · ") + (k > 6 ? " · …" : "") : "1"}`,
        en: (l) => enumDispRip(n, k, l),
        fm: ord,
      };
    case "ps":
      return {
        nome: "Permutazioni semplici",
        o: "sì",
        r: "no",
        fml: `${comI("P")}<sub>n</sub> = ${comI("n")}!`,
        val: bFact(n),
        passo: `P(${n}) = ${n}! = ${comProd(n, n)}`,
        en: (l) => enumPerm(n, l),
        fm: ord,
      };
    case "pr": {
      if (!w) return null;
      const m = w.cnt.reduce((a, b) => a + b, 0);
      return {
        nome: "Permutazioni con ripetizione (anagrammi)",
        o: "sì",
        r: "elementi uguali",
        fml: `${fr("n!", "n<sub>1</sub>!·…·n<sub>r</sub>!")}`,
        val: bMulti(w.cnt),
        passo: `${m}! / (${w.cnt.map((c) => c + "!").join(" · ")}) &nbsp;con &nbsp;${w.ch.map((c, i) => c + "×" + w.cnt[i]).join(", ")}`,
        en: (l) => enumMulti(w.cnt, l),
        fm: (c) => c.map((i) => w.ch[i]).join(""),
      };
    }
    case "cs":
      return {
        nome: "Combinazioni semplici",
        o: "no",
        r: "no",
        fml: `${comI("C")}<sub>n,k</sub> = ${fr("n!", "k!·(n−k)!")}`,
        val: bComb(n, k),
        passo:
          k > n
            ? `k = ${k} è maggiore di n = ${n}: senza ripetizioni non si possono scegliere ${k} elementi su ${n}.`
            : `C(${n},${k}) = ${n}! / (${k}!·${n - k}!) = ${comProd(n, Math.min(k, n - k))} / ${Math.min(k, n - k)}!`,
        en: (l) => enumComb(n, k, l),
        fm: ins,
      };
    case "cr":
      return {
        nome: "Combinazioni con ripetizione",
        o: "no",
        r: "sì",
        fml: `${comI("C′")}<sub>n,k</sub> = ${comI("C")}<sub>n+k−1,k</sub>`,
        val: bCombRip(n, k),
        passo: `C′(${n},${k}) = C(${n}+${k}−1, ${k}) = C(${n + k - 1}, ${k})`,
        en: (l) => enumCombRip(n, k, l),
        fm: ins,
      };
    case "pc":
      return {
        nome: "Permutazioni circolari",
        o: "sì (in cerchio)",
        r: "no",
        fml: `(${comI("n")}−1)!`,
        val: bCirc(n),
        passo: `(${n}−1)! = ${Math.max(0, n - 1)}! — il primo elemento è fisso, gli altri si dispongono attorno`,
        en: (l) => enumCirc(n, l),
        fm: ord,
      };
    case "br":
      return {
        nome: "Collane (cerchio rovesciabile)",
        o: "sì (in cerchio)",
        r: "no",
        fml: `(${comI("n")}−1)! / 2`,
        val: bCollana(n),
        passo:
          n <= 2
            ? `con ${n} elementi c’è una sola collana`
            : `(${n}−1)! / 2 = ${bFmt(bFact(n - 1))} / 2`,
        en: (l) => enumCollana(n, l),
        fm: ord,
      };
    case "de":
      return {
        nome: "Sconvolgimenti (derangement)",
        o: "sì",
        r: "no",
        fml: `!${comI("n")} = ${comI("n")}!·Σ (−1)<sup>i</sup>/i!`,
        val: bDerang(n),
        passo: `!${n} = ${n}!·(1 − 1/1! + 1/2! − … ± 1/${n}!) ≈ ${n}!/e`,
        en: (l) => enumDerang(n, l),
        fm: ord,
      };
    case "st":
      if (n > 200) return null;
      return {
        nome: "Partizioni in k gruppi (Stirling)",
        o: "no",
        r: "no",
        fml: `${comI("S")}(${comI("n")},${comI("k")})`,
        val: bStirling2(n, k),
        passo: `S(${n},${k}) = ${k}·S(${n - 1},${k}) + S(${n - 1},${k - 1}) — gruppi non vuoti e non ordinati`,
        en: (l) => enumStirling(n, k, l),
        fm: (g) =>
          g.map((b) => "{" + b.map((i) => L[i]).join(sep) + "}").join(" "),
      };
    case "pm": {
      if (!sz || !sz.length) return null;
      return {
        nome: "Principio moltiplicativo",
        o: "sì (passi in sequenza)",
        r: "—",
        fml: `${comI("n")}<sub>1</sub>·${comI("n")}<sub>2</sub>·…·${comI("n")}<sub>m</sub>`,
        val: bProd(sz),
        passo: `${sz.join(" · ")} = ${bFmt(bProd(sz))}`,
        en: (l) => enumProdotto(sz, l),
        fm: (c) => c.map((i) => i + 1).join("·"),
      };
    }
  }
  return null;
}
