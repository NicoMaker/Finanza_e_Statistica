const nums = (s) =>
  s
    .split(/[;\s]+/)
    .filter(Boolean)
    .map((x) => pn(x))
    .filter((x) => !isNaN(x));
