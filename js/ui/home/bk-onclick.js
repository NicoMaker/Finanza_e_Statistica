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
