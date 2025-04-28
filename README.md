# 📈 Stock Market Analysis Dashboard

A live Stock Market Dashboard that visualizes the stock prices, book values, and profit percentages of major companies such as Apple (AAPL), Microsoft (MSFT), Tesla (TSLA), and more.

🔗 **Live Demo**: [Visit Website](https://stockmarketanalysis.netlify.app/)

---

## 🛠 Features

- 📊 Interactive line charts of stock prices over different time ranges (1 month, 3 months, 1 year, 5 years).
- 🔄 Dynamic button creation for selecting time ranges and stocks.
- 💬 Company Summary information display.
- 🧮 Display of Book Value and Profit % with conditional color coding (green for positive profit, red for low/negative profit).

---

## 🚀 Technologies Used

- **HTML5**
- **CSS3**
- **Vanilla JavaScript**
- **Plotly.js** (Chart library)
- **Netlify** (Deployment)

---

## 📦 API Endpoints Used

- `GET /api/stocks/getstocksdata` — Fetch stock price history.
- `GET /api/stocks/getstockstatsdata` — Fetch Book Value and Profit %.
- `GET /api/stocks/getstocksprofiledata` — Fetch Company summary descriptions.

---

## 🧠 Concepts Demonstrated

- DOM Manipulation (creating elements dynamically, adding event listeners)
- Fetch API (making GET requests to backend APIs)
- Data Parsing and Transformation (formatting timestamps to readable dates)
- Dynamic Chart Rendering using Plotly.js
- Async/Await and Promises
- Conditional Styling (changing colors based on profit percentage)
- Deployment with Netlify

---

## 🔥 How to Run Locally

1. Clone the repository:

```bash
git clone  https://github.com/AVI-Panwar/Stock_Market_Analysis.git
