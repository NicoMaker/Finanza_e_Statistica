const sr = () => {
    RS = srch(pq.value);
    sel = 0;
    rp();
  },
  openP = () => {
    pal.hidden = false;
    pq.value = "";
    sr();
    pq.focus();
  },
  closeP = () => {
    pal.hidden = true;
  };
