// Mantissa e potenza di dieci di un BigInt
const _bSci = (b) => {
  const s = b.toString(),
    m = s[0] + (s.length > 1 ? "," + s.slice(1, 5).replace(/0+$/, "") : "");
  return [m.replace(/,$/, ""), s.length - 1, s.length];
};
