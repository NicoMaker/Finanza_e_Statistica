// Il robot lavora a intervalli regolari (ROBOT.intervalloMs), solo mentre la scheda è aperta
const blLive = () =>
  cur == "bl" && !atHome && document.getElementById("bl-log");
