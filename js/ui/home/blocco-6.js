if (window.ResizeObserver) {
  const _hd = document.getElementById("stk");
  if (_hd) new ResizeObserver(updateHeaderHeight).observe(_hd);
  const _nv = document.getElementById("navw");
  if (_nv) new ResizeObserver(updateHeaderHeight).observe(_nv);
}
