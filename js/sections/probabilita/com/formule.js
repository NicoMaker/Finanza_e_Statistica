FM.com = eq(
  `<b>Principio moltiplicativo</b><i>N</i> = <i>n</i><sub>1</sub>·<i>n</i><sub>2</sub>·…·<i>n</i><sub>m</sub> &nbsp;(una scelta per ogni passo)`,
  `<b>Disposizioni semplici</b><i>D</i><sub>n,k</sub> = ${fr("<i>n</i>!", "(<i>n</i>−<i>k</i>)!")} &nbsp;(l’ordine conta, niente ripetizioni, <i>k</i> ≤ <i>n</i>)`,
  `<b>Disposizioni con ripetizione</b><i>D′</i><sub>n,k</sub> = <i>n</i><sup><i>k</i></sup> &nbsp;(l’ordine conta, gli elementi si possono ripetere)`,
  `<b>Permutazioni semplici</b><i>P</i><sub>n</sub> = <i>n</i>! &nbsp;(tutti gli elementi, ordine che conta: <i>D</i><sub>n,n</sub>)`,
  `<b>Permutazioni con ripetizione</b><i>P</i><sub>n</sub><sup>(n<sub>1</sub>,…,n<sub>r</sub>)</sup> = ${fr("<i>n</i>!", "<i>n</i><sub>1</sub>!·<i>n</i><sub>2</sub>!·…·<i>n</i><sub>r</sub>!")} &nbsp;(anagrammi: elementi uguali ripetuti)`,
  `<b>Combinazioni semplici</b><i>C</i><sub>n,k</sub> = ${fr("<i>n</i>!", "<i>k</i>!·(<i>n</i>−<i>k</i>)!")} = ${fr("<i>D</i><sub>n,k</sub>", "<i>k</i>!")} &nbsp;(l’ordine non conta, niente ripetizioni)`,
  `<b>Combinazioni con ripetizione</b><i>C′</i><sub>n,k</sub> = <i>C</i><sub>n+k−1,k</sub> = ${fr("(<i>n</i>+<i>k</i>−1)!", "<i>k</i>!·(<i>n</i>−1)!")} &nbsp;(l’ordine non conta, gli elementi si possono ripetere)`,
  `<b>Permutazioni circolari</b>(<i>n</i>−1)! &nbsp;(giro di tavolo) , &nbsp;<b>Collane</b>(<i>n</i>−1)!/2 &nbsp;(si possono anche rovesciare)`,
  `<b>Sconvolgimenti</b>!<i>n</i> = <i>n</i>!·Σ<sub>i=0..n</sub> ${fr("(−1)<sup>i</sup>", "<i>i</i>!")} &nbsp;(nessun elemento al suo posto)`,
  `<b>Partizioni</b><i>S</i>(<i>n</i>,<i>k</i>) = <i>k</i>·<i>S</i>(<i>n</i>−1,<i>k</i>) + <i>S</i>(<i>n</i>−1,<i>k</i>−1) , &nbsp;<i>B</i><sub>n</sub> = Σ<sub>k</sub> <i>S</i>(<i>n</i>,<i>k</i>) , &nbsp;suriezioni = <i>k</i>!·<i>S</i>(<i>n</i>,<i>k</i>)`,
  `<b>Probabilità</b><i>P</i> = ${fr("casi favorevoli", "casi possibili")} &nbsp;(casi equiprobabili: ogni caso ha probabilità 1/<i>N</i>)`,
);
