function _stRiga(n) {
  for (let i = _st.length; i <= n; i++) {
    const prev = _st[i - 1],
      nx = Array(i + 1).fill(0n);
    for (let j = 1; j <= i; j++)
      nx[j] = BigInt(j) * (prev[j] || 0n) + (prev[j - 1] || 0n);
    _st.push(nx);
  }
  return _st[n];
}
