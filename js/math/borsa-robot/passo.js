// Un passo della simulazione: nuovi prezzi, decisione, punto sulla curva del capitale
BL.passo = () => {
  BL.updatePrices();
  BL.decide();
  BL.S.curve.push(BL.total());
  if (BL.S.curve.length > ROBOT.maxPuntiCurva) BL.S.curve.shift();
};
