BL.toast = (msg) => {
  if (!blToast) {
    blToast = document.createElement("div");
    blToast.className = "bl-toast";
    document.body.appendChild(blToast);
  }
  blToast.textContent = msg;
  blToast.classList.add("show");
  clearTimeout(blToastTm);
  blToastTm = setTimeout(() => blToast.classList.remove("show"), 2200);
};
