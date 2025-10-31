# 🏥 Hospital Bed Prediction ChromeAI Bot

An interactive Chrome extension built with JavaScript that analyzes hospital occupancy data and forecasts using CSV files.
It includes an integrated AI assistant capable of answering natural language questions based on both historical and forecasted data.

The CSV datasets used for historical and forecast analysis come from the project [Predictive Model of Health Deterioration in Hospitalized Patients in Spain](https://github.com/BarbaraAngelesOrtiz/Proyecto-Predicci-n-hospitalaria)

[Demo Video](https://youtu.be/jQM90Y5Fpbg)

----

## 🚀 Key Features

- Load real hospital occupancy data (hospital_data.csv) and optional forecast data (predictions.csv).
- Calculate averages by hospital and province automatically.
- Identify the most and least occupied hospitals and provinces.
- Detect daily and predicted trends in occupancy levels.
- Provide an interactive chat-style interface for natural language queries.
- Simulated integration with Chrome’s built-in AI models through mock APIs.

----

## 🧩 APIs Simulated

Although this version uses simulated AI outputs, it is built to emulate future integration with:

- Prompt API → for structured data responses.
- Summarizer API → to generate short summaries of occupancy trends.
- Translator API → to translate key metrics into other languages.

Each of these APIs is represented in the bot’s logic as a simulated output that demonstrates how the real APIs would behave once connected.

----

🎯 Problem Addressed

Hospitals generate large amounts of occupancy data daily, making it difficult to interpret trends and anticipate bed demand.
This project proposes a lightweight Chrome Extension that turns CSV datasets into accessible insights, bridging data analysis and conversational AI for healthcare management.

---

## 💬 Example Questions the Bot Can Answer

You can type natural language questions like the following:

| 🧠 Example Question                 | 📊 What It Does                                                                           |
| ----------------------------------- | ----------------------------------------------------------------------------------------- |
| **average beds**                    | Calculates the average number of occupied ward beds across all data                       |
| **most occupied hospital**          | Finds the hospital with the highest average ward occupancy                                |
| **hospital with lowest occupancy**  | Finds the hospital with the lowest average ward occupancy                                 |
| **province with highest occupancy** | Returns the province with the highest average ward occupancy                              |
| **next day prediction trend**       | Analyzes if the predicted occupancy for the next day is increasing, decreasing, or stable |
| **2025-09-15**                      | Returns the real and predicted occupancy data for that specific date (if available)       |
| **prompt**                          | Simulates a structured output API response                                                |
| **summarizer**                      | Returns a sample summary of occupancy trends                                              |
| **translator**                      | Simulates a translation output with current occupancy data                                |


If the question doesn’t match any known pattern, the bot will respond:

🤖 Sorry, I didn’t understand your question.
Try asking:

“average beds”

“most occupied hospital”

“hospital with lowest occupancy”

“province with highest occupancy”

“next day prediction trend”

a date (YYYY-MM-DD)

----

📊 Example Outputs
Example 1 – General overview

📊 Average occupied ward beds (total): 329.22

Example 2 – Most occupied hospital

🏥 Most occupied hospital: Saint Mary’s Hospital (458.11 beds)

Example 3 – Date query

📅 Date: 2025-09-15
🏥 Real data – Occupied beds total: 476
📈 Predicted beds available total: 495

Example 4 – Prediction trend

📆 Next day prediction trend: increasing 📈

Example 5 – Fallback response

🤖 Sorry, I didn’t understand your question.
Try asking one of the suggested phrases above.

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

💡 Next Steps

Future iterations will connect the current simulation layer to Chrome’s Gemini Nano and related APIs for real AI-driven summarization, forecasting, and translation.

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
