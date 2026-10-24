addEventListener("resize", () => {
  clearTimeout(rz);
  rz = setTimeout(calc, 150);
});
