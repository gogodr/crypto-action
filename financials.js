function calculateRSI(prices, period) {
  let rsi = [];
  let gain = 0;
  let loss = 0;
  for (let i = 0; i < prices.length; i++) {
    if (i === 0) {
      rsi.push(null);
      continue;
    }
    let diff = prices[i] - prices[i - 1];
    if (diff > 0) {
      gain += diff;
    } else {
      loss -= diff;
    }
    if (i < period) {
      rsi.push(null);
      continue;
    }
    let avgGain = gain / period;
    let avgLoss = loss / period;
    let rs = avgGain / avgLoss;
    let currentRsi = 100 - 100 / (1 + rs);
    rsi.push(currentRsi);
  }
  return rsi;
}
function calculateBollingerBands(prices, period, deviation) {
  let bands = [];
  let ma = calculateMovingAverages(prices, period);
  for (let i = 0; i < prices.length; i++) {
    if (i < period - 1) {
      bands.push({ upper: null, middle: null, lower: null });
      continue;
    }
    let sum = 0;
    for (let j = i - period + 1; j <= i; j++) {
      sum += Math.pow(prices[j] - ma[i], 2);
    }
    let sd = Math.sqrt(sum / period);
    bands.push({
      upper: ma[i] + deviation * sd,
      middle: ma[i],
      lower: ma[i] - deviation * sd,
    });
  }
  return bands;
}
function calculateMovingAverages(prices, period) {
  let maArray = [];
  for (let i = 0; i < prices.length; i++) {
    if (i < period - 1) {
      maArray.push(null);
      continue;
    }
    let sum = 0;
    for (let j = i; j > i - period; j--) {
      sum += prices[j];
    }
    maArray.push(sum / period);
  }
  return maArray;
}
function calculateMACD(prices, shortPeriod, longPeriod, signalPeriod) {
  const shortMA = calculateMovingAverages(prices, shortPeriod);
  const longMA = calculateMovingAverages(prices, longPeriod);
  const macdLine = [];
  for (let i = 0; i < prices.length; i++) {
    if (i < longPeriod - 1) {
      macdLine.push(null);
      continue;
    }
    const currentMacd = shortMA[i] - longMA[i];
    macdLine.push(currentMacd);
  }
  const signalLine = calculateMovingAverages(macdLine, signalPeriod);
  const histogram = macdLine.map((macd, index) => {
    if (index < longPeriod + signalPeriod - 2) {
      return null;
    }
    return macd - signalLine[index];
  });
  return { macdLine, signalLine, histogram };
}

exports.calculateRSI = calculateRSI;
exports.calculateBollingerBands = calculateBollingerBands;
exports.calculateMovingAverages = calculateMovingAverages;
exports.calculateMACD = calculateMACD;
