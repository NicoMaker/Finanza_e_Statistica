BL.addLog = (type, title, reason) => {
  const L = BL.S.log;
  L.unshift({ type, title, reason, time: new Date() });
  if (L.length > ROBOT.maxVociDiario) L.pop();
};
