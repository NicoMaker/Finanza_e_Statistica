const pn = (s) => {
  s = String(s).trim();
  return parseFloat(
    (MIGL.test(s) ? s.replace(/\./g, "") : s).replace(",", "."),
  );
};
