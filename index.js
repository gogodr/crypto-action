const Binance = require("node-binance-api");
const moment = require("moment");
const { calculateRSI, calculateMACD, calculateMovingAverages, calculateBollingerBands } = require("./financials");

const binance = new Binance();

async function getHourlyPricesForPastWeek(symbol, period) {
  const interval = "1h";
  const start = moment().subtract(period, "days");
  const end = moment();
  const startTime = start.valueOf();
  const endTime = end.valueOf();
  const limit = period * 24;
  const prices = await binance.futuresCandles(symbol, interval, {
    startTime,
    endTime,
    limit,
  });
  return prices.map((tick) => parseFloat(tick[4]));
}
function suggestAction(prices) {
  const rsi = calculateRSI(prices, 14);
  const macd = calculateMACD(prices, 12, 26, 9);
  const sma = calculateMovingAverages(prices, 20);
  const bb = calculateBollingerBands(prices, 20, 2);
  const lastPrice = prices.slice(-1)[0];
  const lastRsi = rsi.slice(-1)[0];
  const lastMacdHistogram = macd.histogram.slice(-1)[0];
  const lastSma = sma.slice(-1)[0];
  const lastBbUpper = bb.slice(-1)[0].upper;
  const lastBbLower = bb.slice(-1)[0].lower;

  console.log(" - lastPrice", lastPrice);
  console.log(" - lastSma", lastSma);
  console.log(" - lastBbUpper", lastBbUpper);
  console.log(" - lastBbLower", lastBbLower);
  console.log(" - lastRsi", lastRsi);
  console.log(" - lastMacdHistogram", lastMacdHistogram);
  if (
    lastPrice > lastSma &&
    lastPrice > lastBbUpper &&
    lastRsi < 30 &&
    lastMacdHistogram > 0
  ) {
    return "LONG";
  } else if (
    lastPrice < lastSma &&
    lastPrice < lastBbLower &&
    lastRsi > 70 &&
    lastMacdHistogram < 0
  ) {
    return "SHORT";
  } else {
    return "HOLD";
  }
}
async function main() {
  const symbols = ["BTCUSDT", "LTCUSDT", "DOGEUSDT", "1000SHIBUSDT", "SOLUSDT"];
  const period = 5; // Days
  for (const symbol of symbols) {
    const prices = await getHourlyPricesForPastWeek(symbol, period);
    console.log("===========================");
    console.log("Current Price (Futures)", symbol, prices.slice(-1)[0]);
    const action = suggestAction(prices);
    console.log("Action:", action);
  }
}
main();
