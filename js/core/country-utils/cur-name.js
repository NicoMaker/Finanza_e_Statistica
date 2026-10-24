const curName = (code) => {
  try {
    return new Intl.DisplayNames(["it"], { type: "currency" }).of(code);
  } catch (e) {
    return code;
  }
};
