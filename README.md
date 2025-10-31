# 🏥 Hospital Bed Prediction ChromeAI Bot

An interactive Chrome extension built with JavaScript that analyzes hospital occupancy data and forecasts using CSV files.
It includes an integrated AI assistant capable of answering natural language questions based on both historical and forecasted data.

The CSV datasets used for historical and forecast analysis come from the project [Predictive Model of Health Deterioration in Hospitalized Patients in Spain](https://github.com/BarbaraAngelesOrtiz/Proyecto-Predicci-n-hospitalaria)

----

## 🚀 Key Features

✅ Load and analyze historical hospital data (hospital_data.csv)

✅ Optional upload of forecast data (predicciones.csv)

✅ Automatic calculation of averages by hospital or province

✅ Detection of the day with the highest occupancy

✅ Identification of trends in forecast data

✅ Query for tomorrow’s forecast or the highest predicted value

✅ Chat-like interface with natural language interaction

----

## 💬 Example Questions the Bot Can Answer

You can type natural language questions like the following:

| 🧠 Example Question                       | 📊 What It Does                                               |
| ----------------------------------------- | ------------------------------------------------------------- |
| What is the overall average occupancy?    | Calculates the average occupancy across all records           |
| Which hospital has the highest occupancy? | Returns the hospital with the highest average bed use         |
| What is the highest recorded occupancy?   | Shows the maximum occupancy value and date                    |
| Average by hospital                       | Lists the average occupancy per hospital                      |
| Average by province                       | Lists the average occupancy per province                      |
| What’s the forecast for tomorrow?         | Displays the predicted bed occupancy for the next day         |
| What is the trend of the forecasts?       | Analyzes if the forecast values are increasing or decreasing  |
| Compare prediction vs. current occupancy  | Shows the difference between forecasted and current occupancy |
| Give me a summary                         | Provides a brief overview of occupancy and forecast trends    |
| 2025-09-15                                | Returns the data for a specific date if found in the dataset  |


If the question doesn’t match any known pattern, the bot will respond:

🤖 "Not sure how to answer that. Try including a date (YYYY-MM-DD) or month (YYYY-MM)."

----

## 📊 Example Outputs

Example 1 – General overview

🏥 Average occupancy across hospitals: 421.7 beds

📈 Forecast trend: increasing (+7.3%)

Example 2 – Specific date query

📅 Date: 2025-09-15

🏥 Occupancy: 476 beds

🔮 Predicted occupancy: 495 beds (+4.0% increase)

Example 3 – Forecast summary

🔮 Highest predicted occupancy: 501.01 beds (2025-10-16)

📉 Trend detected: slight decrease after mid-October

----

## 🧩 Technologies Used

- JavaScript – core logic and chatbot interaction
- PapaParse – CSV reading and parsing
- HTML + CSS – user interface and layout
- CSV files – input data for historical and forecast models

----

## 📂 Estructura del proyecto


```bash

Prediccion-Hospitalaria-Bot-ChromeAI/
│
├── popup.html                 # Main user interface
├── popup.js                   # Core bot logic (analysis + chat)
├── papaparse.min.js           # Library for reading and processing CSV files
├── manifest.json              # Chrome extension configuration
├── style.css                  # (optional) Visual styles
├── data
│      ├── hospital_data.csv   # Sample historical data
│      └── predicciones.csv    # Sample forecast data
│  
├── icon128.png                # High-resolution icon
├── icon48.png                 # Bot icon (for the extension)
├── icon16.png                 # Small icon that appears in the Chrome extensions bar
├── image/                     # Result images
└── README.md                  # Project documentation

````
----

## ⚙️ Cómo usarlo

1. Clone the repository:
````bash
git clone https://github.com/BarbaraAngelesOrtiz/Prediccion-Hospitalaria-ChromeAI.git
````
2. Open Chrome and go to chrome://extensions/

3. Enable Developer Mode

4. Click Load unpacked and select the project folder

5. Click the extension icon to open the popup window

6. Upload the CSV files

7. Ask a question in natural language (e.g., “Which hospital has the highest occupancy?”)

----

## Author
**Bárbara Ángeles Ortiz**

<img src="https://github.com/user-attachments/assets/30ea0d40-a7a9-4b19-a835-c474b5cc50fb" width="115">

[LinkedIn](https://www.linkedin.com/in/barbaraangelesortiz/) | [GitHub](https://github.com/BarbaraAngelesOrtiz)

![Status](https://img.shields.io/badge/status-finished-brightgreen) 📅 October 2025

![JavaScript](https://img.shields.io/badge/JavaScript-yellow)
![PapaParse](https://img.shields.io/badge/PapaParse-lightgrey)
![HTML+CSS](https://img.shields.io/badge/HTML%2BCSS-blue)
![CSV](https://img.shields.io/badge/CSV-brightgreen)
