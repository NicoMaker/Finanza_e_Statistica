/* Intro splash: resta visibile ~2.3s poi sfuma. Click/tasto per saltarla. */
(function () {
  var root = document.documentElement;
  var splash = document.getElementById("introSplash");
  if (!splash) return;
  if (!root.classList.contains("intro-on")) { splash.remove(); return; }

  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var MIN = reduce ? 600 : 2300;
  var start = Date.now();
  var done = false;

  function end() {
    if (done) return;
    done = true;
    splash.classList.add("is-out");
    setTimeout(function () {
      splash.remove();
      root.classList.remove("intro-on");
    }, 650);
  }

  function schedule() {
    setTimeout(end, Math.max(0, MIN - (Date.now() - start)));
  }

  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule);

  setTimeout(end, 4500);                       // sicurezza
  splash.addEventListener("click", end);
  document.addEventListener("keydown", end, { once: true });
})();
