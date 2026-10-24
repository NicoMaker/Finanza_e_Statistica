// «1 su N» per un rapporto a/b di BigInt
function bUnoSu(a, b) {
  if (a === 0n) return "mai";
  const q = (b * 100n) / a; // due decimali
  const i = q / 100n,
    d = q % 100n;
  return (
    "1 su " + bFmt(i) + (i < 1000n && d ? "," + String(d).padStart(2, "0") : "")
  );
}
