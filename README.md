# Crypto Action
This is a simple crypto trading indicator function that uses financial indicators to suggest whether to buy, sell or hold a cryptocurrency.

The algorithm uses the following indicators to make the suggestion:

- Moving Average Convergence Divergence (MACD)
- Bollinger Bands
- Relative Strength Index (RSI)
- Simple Moving Average (SMA)

The algorithm calculates the values of these indicators based on the past week's hourly prices and suggests a buy, sell, or hold action based on the following rules:

- Buy: If the MACD line crosses above the signal line, the price is above the upper Bollinger Band, the RSI is below 70, and the price is above the SMA.
- Sell: If the MACD line crosses below the signal line, the price is below the lower Bollinger Band, the RSI is above 30, and the price is below the SMA.
- Hold: In all other cases.

## Usage
### Prerequisites
You will need to have Node.js installed on your machine.

### Installation
1. Clone this repository:
```bash
git clone https://github.com/gogodr/crypto-action
```
2. Install dependencies:
```bash
cd crypto-action
npm install
```
### Running
Simply execute the following command:

```bash
npm start
```
This will retrieve the past week's hourly prices for BTC from Binance using the API and make a suggestion to buy, sell, or hold based on the algorithm.
![image](https://user-images.githubusercontent.com/2740936/226249471-0042993c-e349-49c8-8977-96adae96f730.png)


Note that this is just a simple example and you should always be careful when working with financial data and consult a financial advisor if you have any questions or concerns.
