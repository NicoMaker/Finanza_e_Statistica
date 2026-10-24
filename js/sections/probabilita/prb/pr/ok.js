const prOk = (...a) => a.every((x) => isFinite(x) && x >= 0 && x <= 100);
