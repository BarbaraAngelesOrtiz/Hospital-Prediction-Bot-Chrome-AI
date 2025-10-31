// popup.js

// --- Global data ---
let hospitalData = [];
let predictionsData = [];

// --- Utility functions ---
function normalizeNumeric(value) {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "number") return value;
  const s = String(value).replace(",", ".").trim();
  const n = Number(s);
  return isNaN(n) ? null : n;
}

function normalizeCSV(data) {
  return data.map(row => {
    const out = {};
    Object.keys(row).forEach(k => out[k] = normalizeNumeric(row[k]) ?? row[k]);
    return out;
  });
}

function average(arr) {
  const nums = arr.filter(v => typeof v === "number" && !isNaN(v));
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function averageByColumn(data, cols, valueCol) {
  return cols.map(c => {
    const subset = data.filter(r => r[c] === 1).map(r => r[valueCol]).filter(v => typeof v === "number");
    return { name: c.replace(/^hospital_|^province_/, ""), avg: average(subset) };
  });
}

// --- DOM Elements ---
const fileHospital = document.getElementById("fileHospital");
const filePred = document.getElementById("filePredictions");
const analyzeBtn = document.getElementById("analyzeBtn");
const botInput = document.getElementById("botInput");
const botBtn = document.getElementById("botBtn");
const outputDiv = document.getElementById("output");

// --- Enable/Disable Buttons ---
function setButtons(enable) {
  document.querySelectorAll(".quick-btn").forEach(b => b.disabled = !enable);
  botBtn.disabled = !enable;
}

// Initially disabled
setButtons(false);

// --- CSV Loader ---
function loadCSV(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split("\n").filter(l => l.trim() !== "");
      const headers = lines[0].split(",");
      const data = lines.slice(1).map(l => {
        const vals = l.split(",");
        const obj = {};
        headers.forEach((h,i) => obj[h.trim()] = vals[i]?.trim() ?? null);
        return obj;
      });
      resolve(normalizeCSV(data));
    };
    reader.onerror = () => reject("Error reading file");
    reader.readAsText(file);
  });
}

// --- Load CSVs ---
fileHospital.addEventListener("change", async e => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    hospitalData = await loadCSV(file);
    outputDiv.innerText = `✅ Hospital data loaded (${hospitalData.length} rows)`;
    setButtons(true);
  } catch (err) {
    outputDiv.innerText = `❌ Error loading hospital CSV: ${err}`;
  }
});

filePred.addEventListener("change", async e => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    predictionsData = await loadCSV(file);
    outputDiv.innerText += `\n✅ Predictions loaded (${predictionsData.length} rows)`;
  } catch (err) {
    outputDiv.innerText += `\n❌ Error loading predictions CSV: ${err}`;
  }
});

// --- Analyze Button ---
analyzeBtn.addEventListener("click", () => {
  if (!hospitalData.length) {
    outputDiv.innerText = "⚠️ Load hospital data first.";
    return;
  }
  const occupiedCol = "occupied_beds_ward";

  const avgOccupied = average(hospitalData.map(r => r[occupiedCol]));

  outputDiv.innerHTML = `📊 Average ward beds occupied (total): <b>${avgOccupied.toFixed(2)}</b>`;
});

// --- Bot logic ---
async function runBot(question) {
  if (!hospitalData.length) {
    botOutput.innerText = "⚠️ Load hospital data first.";
    return;
  }

  const q = question.toLowerCase().trim();
  const columns = Object.keys(hospitalData[0]);
  const occupiedCol = "occupied_beds_ward";

  // --- Average beds ---
  if (q.includes("average") && q.includes("beds")) {
    const avgOccupied = average(hospitalData.map(r => r[occupiedCol]));
    botOutput.innerHTML = `📊 Average occupied ward beds (total): <b>${avgOccupied.toFixed(2)}</b>`;
    return;
  }

  // --- Most occupied hospital ---
  if (q.includes("most occupied") || q.includes("highest occupancy")) {
    const hospCols = columns.filter(c => c.startsWith("hospital_"));
    const avgs = averageByColumn(hospitalData, hospCols, occupiedCol);
    avgs.sort((a,b)=>b.avg - a.avg);
    botOutput.innerHTML = `🏥 Most occupied hospital: <b>${avgs[0].name}</b> (${avgs[0].avg.toFixed(2)} beds)`;
    return;
  }

  // --- Least occupied hospital ---
  if (q.includes("lowest") && q.includes("hospital")) {
    const hospCols = columns.filter(c => c.startsWith("hospital_"));
    const avgs = averageByColumn(hospitalData, hospCols, occupiedCol);
    avgs.sort((a,b)=>a.avg - b.avg);
    botOutput.innerHTML = `🏥 Least occupied hospital: <b>${avgs[0].name}</b> (${avgs[0].avg.toFixed(2)} beds)`;
    return;
  }

  // --- Province with highest occupancy ---
  if (q.includes("province") && (q.includes("occupancy") || q.includes("occupied"))) {
    const provCols = columns.filter(c => c.startsWith("province_"));
    const avgs = averageByColumn(hospitalData, provCols, occupiedCol);
    avgs.sort((a,b)=>b.avg - a.avg);
    botOutput.innerHTML = `🗺️ Province with highest average ward occupancy: <b>${avgs[0].name}</b> (${avgs[0].avg.toFixed(2)} beds)`;
    return;
  }

  // --- Quick predictions trend button ---
  if (q.includes("next day prediction trend")) {
    if (!predictionsData.length) {
      botOutput.innerText = "⚠️ Load predictions CSV first.";
      return;
    }
    const vals = predictionsData.map(r => normalizeNumeric(r.beds_available_ward)).filter(v=>v!==null);
    if (vals.length < 3) {
      botOutput.innerText = "Not enough prediction data to analyze trend.";
      return;
    }
    const diff = vals[vals.length-1] - vals[vals.length-2];
    const trend = diff>0 ? "increasing 📈" : diff<0 ? "decreasing 📉" : "stable ➖";
    botOutput.innerHTML = `📆 Next day prediction trend: <b>${trend}</b>`;
    return;
  }

  // --- Date query (real + prediction) ---
  if (/^\d{4}-\d{2}-\d{2}$/.test(q)) {
    const rowPred = predictionsData.find(r => r.date === q);
    const rowReal = hospitalData.find(r => r.date === q);

    let html = `📅 Date: <b>${q}</b><br>`;

    if (rowReal) {
      html += `🏥 Real data - Occupied beds total: <b>${normalizeNumeric(rowReal.occupied_beds_ward)}</b><br>`;
    } else {
      html += `🏥 Real data: N/A<br>`;
    }

    if (rowPred) {
      html += `📈 Predicted beds available total: <b>${normalizeNumeric(rowPred.beds_available_ward)}</b>`;
    } else {
      html += `📈 Prediction: N/A`;
    }

    botOutput.innerHTML = html;
    return;
  }

    // --- Simulated APIs ---
  if (q.includes("prompt")) {
    botOutput.innerHTML = `💭 <b>Prompt API</b><br>Simulated structured output for: "${question}"`;
    return;
  }
  if (q.includes("summarizer")) {
    botOutput.innerHTML = `📄 <b>Summarizer API</b><br>Summary: Hospital occupancy is stable with minor variations.`;
    return;
  }
  if (q.includes("translator")) {
    botOutput.innerHTML = `🌐 <b>Translator API</b><br>Simulated translation: "Average ward occupancy: ${average(hospitalData.map(r => r.occupied_beds_ward)).toFixed(1)} beds"`;
    return;
  }


  // --- Fallback ---
  botOutput.innerHTML = `🤖 Sorry, I didn't understand your question.<br>
Try asking:<br>
- "average beds"<br>
- "most occupied hospital"<br>
- "hospital with lowest occupancy"<br>
- "province with highest occupancy"<br>
- "next day prediction trend"<br>
- a date (YYYY-MM-DD)`;
}

// --- Run bot button ---
botBtn.addEventListener("click", () => {
  const q = botInput.value.trim();
  if (!q) return;
  runBot(q);
});

// --- Quick buttons ---
document.querySelectorAll(".quick-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    botInput.value = btn.innerText;
    runBot(btn.innerText);
  });
});
