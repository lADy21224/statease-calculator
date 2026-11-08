/* SELECTABLE CHARTS — rendered with native SVG/CSS; no chart library required. */
const chartPalette = ["#315b87","#5b83b4","#8eacd0","#b4c9e2","#d2dfef","#426b9f","#7896bf","#a5bad4","#24466f","#c0d4eb"];
function renderSelectedChart() {
  const host = document.getElementById("chartVisual");
  if (!host) return;
  const pairs = (window.currentChartPairs || []).slice(0, 20);
  const type = document.getElementById("chartType").value;
  if (!pairs.length) { host.textContent = "No chart data available."; return; }
  const max = Math.max(1, ...pairs.map(p => p.freq));
  const labels = pairs.map(p => String(p.value));
  const values = pairs.map(p => p.freq);
  const colors = pairs.map((_, i) => chartPalette[i % chartPalette.length]);
  const total = values.reduce((a,b) => a+b, 0);

  if (type === "pie" || type === "doughnut") {
    let cursor = 0;
    const segments = values.map((value, i) => {
      const from = cursor; cursor += value / total * 100;
      return `${colors[i]} ${from}% ${cursor}%`;
    });
    const legend = pairs.map((p, i) =>
      `<div class="chart-legend-item"><span class="chart-legend-swatch" style="background:${colors[i]}"></span><span>${escapeHTML(labels[i])}: ${p.freq} (${(p.freq/total*100).toFixed(1)}%)</span></div>`
    ).join("");
    host.innerHTML = `<div class="pie-layout"><div class="pie-graphic ${type === "doughnut" ? "doughnut" : ""}" style="background:conic-gradient(${segments.join(",")})" aria-label="${type} chart"></div><div class="chart-legend">${legend}</div></div>`;
    document.getElementById("chartNote").textContent = `Each slice represents a value's share of the ${total} total observations.`;
    return;
  }

  if (type === "line") {
    const width = 760, height = 300, left = 48, right = 20, top = 20, bottom = 58;
    const plotW = width-left-right, plotH = height-top-bottom;
    const points = values.map((v,i) => {
      const x = left + (values.length === 1 ? plotW/2 : i*plotW/(values.length-1));
      const y = top + plotH - (v/max)*plotH;
      return `${x},${y}`;
    }).join(" ");
    const circles = values.map((v,i) => {
      const x = left + (values.length === 1 ? plotW/2 : i*plotW/(values.length-1));
      const y = top + plotH - (v/max)*plotH;
      return `<circle cx="${x}" cy="${y}" r="5" fill="#315b87"><title>${escapeHTML(labels[i])}: ${v}</title></circle><text x="${x}" y="${height-28}" text-anchor="middle" font-size="11" fill="#35547f">${escapeHTML(labels[i].slice(0,10))}</text>`;
    }).join("");
    host.innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Line graph of frequencies"><line x1="${left}" y1="${top+plotH}" x2="${width-right}" y2="${top+plotH}" stroke="#9bb1cc"/><line x1="${left}" y1="${top}" x2="${left}" y2="${top+plotH}" stroke="#9bb1cc"/><polyline points="${points}" fill="none" stroke="#315b87" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>${circles}</svg>`;
    document.getElementById("chartNote").textContent = "The line connects each data value in ascending order; the vertical position shows its frequency.";
    return;
  }

  if (type === "column") {
    const width = 800, height = 320, left = 45, bottom = 65, top = 20;
    const plotH = height-top-bottom, slot = (width-left-20)/pairs.length, barW = Math.min(48, slot*.65);
    const bars = pairs.map((p,i) => {
      const h = p.freq/max*plotH, x = left+i*slot+(slot-barW)/2, y=top+plotH-h;
      return `<rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="4" fill="${colors[i]}"><title>${escapeHTML(labels[i])}: ${p.freq}</title></rect><text x="${x+barW/2}" y="${height-39}" text-anchor="middle" font-size="11" fill="#35547f">${escapeHTML(labels[i].slice(0,9))}</text><text x="${x+barW/2}" y="${Math.max(13,y-6)}" text-anchor="middle" font-size="11" fill="#17365f">${p.freq}</text>`;
    }).join("");
    host.innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Column chart of frequencies"><line x1="${left}" y1="${top+plotH}" x2="${width-15}" y2="${top+plotH}" stroke="#9bb1cc"/>${bars}</svg>`;
    document.getElementById("chartNote").textContent = "Column height represents the frequency of each value.";
    return;
  }

  const rows = pairs.map((p,i) => {
    const width = Math.max(1, p.freq/max*100);
    return `<div class="frequency-bar-row"><span class="frequency-bar-label">${escapeHTML(labels[i])}</span><div class="frequency-bar-track"><div class="frequency-bar-fill" style="width:${width}%;background:${colors[i]}"></div></div><span class="frequency-bar-count">${p.freq}</span></div>`;
  }).join("");
  host.innerHTML = `<div class="frequency-chart">${rows}</div>`;
  document.getElementById("chartNote").textContent = "Bar length represents frequency. Values are displayed in ascending order.";
}

document.getElementById("chartType").addEventListener("change", renderSelectedChart);





/* EDIT YOUR 8 TEAM MEMBERS HERE */

const TEAM_MEMBERS = [

  {
    name: "Lady Ann Ermita",
    role: "Team Leader",
    image: "images/member1.jpg"
  },
  {
    name: "Member 2",
    role: "Team Member",
    image: "images/member2.jpg"
  },
  {
    name: "Member 3",
    role: "Team Member",
    image: "images/member3.jpg"
  },
  {
    name: "Member 4",
    role: "Team Member",
    image: "images/member4.jpg"
  },
  {
    name: "Member 5",
    role: "Team Member",
    image: "images/member5.jpg"
  },
  {
    name: "Member 6",
    role: "Team Member",
    image: "images/member6.jpg"
  },
  {
    name: "Member 7",
    role: "Team Member",
    image: "images/member7.jpg"
  },
  {
    name: "Member 8",
    role: "Team Member",
    image: "images/member8.jpg"
  }
];


/* PROFILE ICON */

const personSvg = `

<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"

stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">

  <circle cx="12" cy="7.5" r="3.4"></circle>

  <path d="M4.8 20c.6-4.1 3.3-6.3 7.2-6.3s6.6 2.2 7.2 6.3"></path>

</svg>`;



const teamGrid = document.getElementById("teamGrid");
teamGrid.classList.add("org-chart");

function makeMemberCard(member, isLeader = false) {
  const card = document.createElement("article");
  card.className = "member-card" + (isLeader ? " leader-card" : "");

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  if (member.image) {
    const img = document.createElement("img");
    img.src = member.image;
    img.alt = member.name + " profile picture";
    img.loading = "eager";
    avatar.appendChild(img);
  } else {
    avatar.innerHTML = personSvg;
  }

  const info = document.createElement("div");
  info.className = "member-info";
  if (isLeader) {
    const kicker = document.createElement("p");
    kicker.className = "leader-kicker";
    info.appendChild(kicker);
  }

  const name = document.createElement("div");
  name.className = "member-name";
  name.textContent = member.name;

  const role = document.createElement("div");
  role.className = "member-role";
  role.textContent = member.role;

  info.append(name, role);
  card.append(avatar, info);
  return card;
}

// Clear the chart container and rebuild a clean hierarchy: leader first, team below.
teamGrid.replaceChildren();
const leaderWrap = document.createElement("div");
leaderWrap.className = "leader-wrap";
leaderWrap.appendChild(makeMemberCard(TEAM_MEMBERS[0], true));
teamGrid.appendChild(leaderWrap);

const membersArea = document.createElement("section");
membersArea.className = "members-area";
membersArea.setAttribute("aria-label", "Team members");
const membersHeading = document.createElement("div");
membersHeading.className = "members-heading";
const membersTitle = document.createElement("strong");
membersTitle.textContent = "The team";
const membersCount = document.createElement("span");
membersCount.className = "members-count";
membersCount.textContent = (TEAM_MEMBERS.length - 1) + " members";
membersHeading.append(membersTitle, membersCount);
membersArea.appendChild(membersHeading);

// Keep the requested visual rows: 2–4 first, then 5–8 beneath them.
const firstRow = document.createElement("div");
firstRow.className = "member-grid member-grid--three";
TEAM_MEMBERS.slice(1, 4).forEach(member => firstRow.appendChild(makeMemberCard(member)));
membersArea.appendChild(firstRow);

const secondRow = document.createElement("div");
secondRow.className = "member-grid member-grid--four";
TEAM_MEMBERS.slice(4, 8).forEach(member => secondRow.appendChild(makeMemberCard(member)));
membersArea.appendChild(secondRow);
teamGrid.appendChild(membersArea);


/* SIDEBAR NAVIGATION */

document.querySelectorAll(".nav button").forEach(button => {

  button.addEventListener("click", () => {

    document.querySelectorAll(".nav button").forEach(item => {

      item.classList.toggle("active", item === button);

    });



    document.querySelectorAll(".page").forEach(page => {

      page.classList.toggle("active", page.id === button.dataset.page);

    });



    const mainContent = document.querySelector(".main");
    if (mainContent) mainContent.scrollTo({ top: 0, behavior: "auto" });
    window.scrollTo({ top: 0, behavior: "auto" });

  });

});



/* CALCULATOR */

const dataInput = document.getElementById("dataInput");

const dataType = document.getElementById("dataType");



dataType.addEventListener("change", () => {

  document.getElementById("frequencyHelp").style.display =

    dataType.value === "frequency" ? "block" : "none";

});



const HISTORY_STORAGE_KEY = "stateeaseCalculationHistory";
let historyItems = [];
let editingHistoryIndex = null;
try {
  const savedHistory = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY) || "[]");
  if (Array.isArray(savedHistory)) historyItems = savedHistory.slice(0, 50);
} catch (error) {
  historyItems = [];
}

function saveHistory() {
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(historyItems.slice(0, 50)));
  } catch (error) {
    // The calculator still works if browser storage is disabled or unavailable.
  }
}

function parseDataNumber(token) {
  const value = String(token ?? "").trim();
  if (!value) return NaN;

  // Fractions such as 1/2, -3/4, or 1.5/2.5.
  const fraction = value.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+))\/([+-]?(?:\d+(?:\.\d*)?|\.\d+))$/);
  if (fraction) {
    const numerator = Number(fraction[1]);
    const denominator = Number(fraction[2]);
    if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) return NaN;
    const result = numerator / denominator;
    return Number.isFinite(result) ? result : NaN;
  }

  // Percentages are converted to their decimal equivalent.
  if (value.endsWith("%")) {
    const percentage = value.slice(0, -1).trim();
    if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(percentage)) return NaN;
    const result = Number(percentage) / 100;
    return Number.isFinite(result) ? result : NaN;
  }

  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(value)) return NaN;
  const result = Number(value);
  return Number.isFinite(result) ? result : NaN;
}

function formatNumber(number, places) {
  return Number(number.toFixed(places)).toLocaleString("en-US", {
    maximumFractionDigits: places,
    minimumFractionDigits: 0
  });
}



function calculate() {

  const error = document.getElementById("errorMessage");

  error.textContent = "";
  // Hide any previous calculation while validating the new input so stale results are not mistaken for current results.
  document.getElementById("resultSection").style.display = "none";

  let pairs = [];



  if (dataType.value === "frequency") {

    const lines = dataInput.value.trim()

      .split(/[\n;]+/)

      .filter(line => line.trim());



    for (const line of lines) {

      const parts = line.split(/[,\t ]+/).filter(Boolean);



      if (parts.length !== 2) {

        error.textContent =

          "Enter each frequency row as value,frequency. Example: 5,2";

        return;

      }



      const value = parseDataNumber(parts[0]);

      const freq = Number(parts[1]);



      if (!Number.isFinite(value) || !Number.isSafeInteger(freq) || freq < 1) {

        error.textContent =

          "Use a finite numeric value and a positive whole-number frequency.";

        return;

      }



      pairs.push({value, freq});

    }

  } else {

    const rawInput = dataInput.value.trim();
    const values = rawInput
      .split(/[,\s;]+/)
      .filter(Boolean)
      .map(parseDataNumber);



    if (!values.length || values.some(value => !Number.isFinite(value))) {

      error.textContent = "Enter valid numbers, decimals, fractions (such as 1/2), or percentages (such as 25%). Check for a zero denominator or invalid value.";

      return;

    }

    if (values.length > 10000) {
      error.textContent = "This dataset contains " + values.length + " values. Please enter 10,000 values or fewer.";
      return;
    }

    const counts = new Map();



    values.forEach(value => {

      counts.set(value, (counts.get(value) || 0) + 1);

    });



    pairs = [...counts].map(([value, freq]) => ({value, freq}));

  }



  if (!pairs.length) {

    error.textContent = "Please enter your data first.";

    return;

  }



  // Merge repeated values in frequency-table input before any statistics are calculated.
  // This keeps the mode, frequency table, chart, and total data count consistent.
  const combinedFrequencies = new Map();
  pairs.forEach(({ value, freq }) => {
    combinedFrequencies.set(value, (combinedFrequencies.get(value) || 0) + freq);
  });
  pairs = [...combinedFrequencies].map(([value, freq]) => ({ value, freq }));

  const totalCount = pairs.reduce((total, pair) => total + pair.freq, 0);
  if (!Number.isSafeInteger(totalCount) || totalCount < 1 || totalCount > 10000) {
    error.textContent = "The total frequency must represent between 1 and 10,000 observations. Reduce the frequencies and try again.";
    return;
  }

  const expanded = [];



  pairs.forEach(pair => {

    for (let i = 0; i < pair.freq; i++) {

      expanded.push(pair.value);

    }

  });



  expanded.sort((a, b) => a - b);



  const n = expanded.length;

  const sum = expanded.reduce((a, b) => a + b, 0);

  const mean = sum / n;
  const minimum = expanded[0];
  const maximum = expanded[n - 1];
  const range = maximum - minimum;



  const median = n % 2

    ? expanded[Math.floor(n / 2)]

    : (expanded[n / 2 - 1] + expanded[n / 2]) / 2;

  if (![sum, mean, minimum, maximum, range, median].every(Number.isFinite)) {
    error.textContent = "These values exceed the calculator's supported numeric range. Please use values with a smaller magnitude.";
    return;
  }

  const maxFrequency = pairs.reduce((highest, pair) => Math.max(highest, pair.freq), 0);



  const modes = pairs

    .filter(pair => pair.freq === maxFrequency)

    .map(pair => pair.value)

    .sort((a, b) => a - b);



  const places = Number(document.getElementById("rounding").value);



  const modeText = maxFrequency === 1

    ? "No mode"

    : modes.map(value => formatNumber(value, places)).join(", ");

  const modeDescription = maxFrequency === 1
    ? "No mode · all values occur once"
    : modes.length > 1
      ? `Multimodal · ${modes.length} modes · frequency ${maxFrequency}`
      : "Unimodal · highest frequency: " + maxFrequency;

  document.getElementById("dataCountSummary").textContent = `Data count (n): ${n} value(s)`;



  /* SHOW RESULTS */

  document.getElementById("results").innerHTML = [

    ["Mean", formatNumber(mean, places), "Sum ÷ number of values"],

    ["Median", formatNumber(median, places), "Middle value of sorted data"],

    ["Mode", modeText, modeDescription],
    ["Range", formatNumber(range, places), "Maximum − minimum"]

  ].map(item => `

    <div class="result-card">

      <span>${item[0]}</span>

      <strong>${item[1]}</strong>

      <p>${item[2]}</p>

    </div>

  `).join("");



  document.getElementById("sortedData").textContent =

    expanded.map(value => formatNumber(value, places)).join(", ");



  /* SOLUTION STEPS */

  let medianExplanation;



  if (n % 2 === 1) {

    medianExplanation =

      "The middle position is " + (Math.floor(n / 2) + 1) +

      ", so the median is " + formatNumber(median, places);

  } else {

    medianExplanation =

      "Average the two middle values " +

      formatNumber(expanded[n / 2 - 1], places) + " and " +

      formatNumber(expanded[n / 2], places) +

      ", giving " + formatNumber(median, places);

  }



  const solution = document.getElementById("solution");



  solution.innerHTML = `

    <p><b class="step-label">Step 1 — Count (n):</b> ${n} value(s)</p>

    <p><b class="step-label">Step 2 — Mean:</b> Sum of values = ${formatNumber(sum, places)}.
      Mean = sum ÷ n = ${formatNumber(sum, places)} ÷ ${n}
      = <b>${formatNumber(mean, places)}</b>.</p>

    <p><b class="step-label">Step 3 — Median:</b> ${medianExplanation}.</p>

    <p><b class="step-label">Step 4 — Mode:</b>

      ${modeText === "No mode"

        ? "Every value occurs once, so there is no mode."

        : modes.length > 1
          ? "This dataset is multimodal. The modes are " + modeText + ", each occurring " + maxFrequency + " time(s)."
          : "The mode is " + modeText + ", occurring " + maxFrequency + " time(s)."}

    </p>

    <p><b class="step-label">Step 5 — Range:</b> Maximum − minimum =
      ${formatNumber(maximum, places)} − ${formatNumber(minimum, places)}
      = <b>${formatNumber(range, places)}</b>.</p>

  `;

  document.getElementById("interpretation").textContent =
    `The dataset contains ${n} value(s). The mean is ${formatNumber(mean, places)}, the median is ${formatNumber(median, places)}, and the mode is ${modeText}${maxFrequency === 1 ? " because every value occurs once" : modes.length > 1 ? " (multimodal)" : ""}. The values range from ${formatNumber(minimum, places)} to ${formatNumber(maximum, places)}, giving a range of ${formatNumber(range, places)}. The mean represents the arithmetic average, the median represents the center of the ordered data, and the mode identifies the most frequent value(s).`;



  solution.parentElement.style.display = "";



  /* FREQUENCY TABLE */

  document.getElementById("frequencyTable").innerHTML =

    [...pairs].sort((a, b) => a.value - b.value).map(pair => `

      <tr>

        <td>${formatNumber(pair.value, places)}</td>

        <td>${pair.freq}</td>

      </tr>

    `).join("");



  document.getElementById("frequencyTable").closest(".panel").style.display = "";

  // Keep the chart data available for switching chart types without recalculating.
  window.currentChartPairs = [...pairs].sort((a, b) => a.value - b.value);
  try { renderSelectedChart(); }
  catch (chartError) { console.error("Chart rendering failed:", chartError); }

  document.getElementById("resultSection").style.display = "block";



  const historyRecord = {
    n,
    mean: formatNumber(mean, places),
    median: formatNumber(median, places),
    mode: modeText,
    range: formatNumber(range, places),
    minimum: formatNumber(minimum, places),
    maximum: formatNumber(maximum, places),
    input: dataInput.value.trim(),
    dataType: dataType.value,
    createdAt: new Date().toISOString(),
    pairs: [...pairs].sort((a, b) => a.value - b.value).map(pair => ({ value: pair.value, freq: pair.freq })),
    sortedData: expanded.map(value => formatNumber(value, places)).join(", "),
    solution: solution.innerHTML,
    interpretation: document.getElementById("interpretation").textContent,
    places
  };
  if (editingHistoryIndex !== null && historyItems[editingHistoryIndex]) {
    historyItems[editingHistoryIndex] = historyRecord;
    editingHistoryIndex = null;
    document.getElementById("errorMessage").textContent = "History record updated successfully.";
  } else {
    historyItems.unshift(historyRecord);
  }
  historyItems = historyItems.slice(0, 50);
  saveHistory();
  renderHistory();

}



/* HISTORY */

function escapeHTML(text) {

  return text.replace(/[&<>"']/g, char => ({

    "&": "&amp;",

    "<": "&lt;",

    ">": "&gt;",

    '"': "&quot;",

    "'": "&#39;"

  }[char]));

}



function formatHistoryDate(value) {
  return new Intl.DateTimeFormat("en-PH", {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit"
  }).format(new Date(value));
}

function renderHistory() {
  const historyList = document.getElementById("historyList");
  if (!historyItems.length) {
    historyList.className = "history-empty";
    historyList.textContent = "No calculations yet. Complete a calculation to see it here.";
    return;
  }

  historyList.className = "";
  historyList.innerHTML = historyItems.map((item, index) => `
    <article class="history-item">
      <div class="history-item-heading">
        <strong>Calculation ${historyItems.length - index}</strong>
        <small class="history-item-meta">${formatHistoryDate(item.createdAt)} · ${item.n} value(s)</small>
      </div>
      <div class="history-item-actions">
        <button class="btn secondary history-preview-btn" type="button" onclick="openHistoryPreview(${index})">Preview</button>
        <button class="btn secondary history-edit-btn" type="button" onclick="editHistoryRecord(${index})">Edit</button>
        <button class="btn danger history-delete-btn" type="button" onclick="deleteHistoryRecord(${index})">Delete</button>
      </div>
      <p style="font-size:13px;margin:3px 0 0;">
        Mean: <b>${escapeHTML(item.mean)}</b> · Median: <b>${escapeHTML(item.median)}</b> · Mode: <b>${escapeHTML(item.mode)}</b> · Range: <b>${escapeHTML(item.range)}</b>
      </p>
      <p class="history-item-data"><strong>Dataset:</strong> ${escapeHTML(item.input)}</p>
    </article>
  `).join("");
}

function openHistoryPreview(index) {
  const item = historyItems[index];
  if (!item) return;
  document.getElementById("historyPreviewTitle").textContent = `Calculation ${historyItems.length - index}`;
  document.getElementById("historyPreviewMeta").textContent = `${formatHistoryDate(item.createdAt)} · ${item.n} observation(s)`;
  const stats = [
    ["Mean", item.mean], ["Median", item.median], ["Mode", item.mode], ["Range", item.range]
  ];
  document.getElementById("historyPreviewBody").innerHTML = `
    <section class="preview-section preview-dataset-section">
      <div class="preview-section-heading"><span class="preview-section-icon">01</span><div><h3>Entered dataset</h3><p>Original values used for this calculation</p></div></div>
      <div class="history-preview-dataset">${escapeHTML(item.input)}</div>
      <div class="preview-data-meta"><span>${item.n} observation(s)</span><span>${item.dataType === "frequency" ? "Frequency table" : "Ungrouped data"}</span></div>
    </section>
    <section class="preview-section preview-results-section">
      <div class="preview-section-heading"><span class="preview-section-icon">02</span><div><h3>Summary of results</h3><p>Measures of central tendency and spread</p></div></div>
      <div class="history-preview-stats">${stats.map(([label, value]) => `
        <div class="history-preview-stat"><span>${label}</span><strong>${escapeHTML(value)}</strong></div>
      `).join("")}</div>
      <div class="preview-minmax"><div><span>Minimum</span><strong>${escapeHTML(item.minimum)}</strong></div><div><span>Maximum</span><strong>${escapeHTML(item.maximum)}</strong></div></div>
    </section>
    <section class="preview-section">
      <div class="preview-section-heading"><span class="preview-section-icon">03</span><div><h3>Sorted dataset</h3><p>Values arranged from lowest to highest</p></div></div>
      <div class="history-preview-dataset sorted-preview-data">${escapeHTML(item.sortedData)}</div>
    </section>
    <section class="preview-section">
      <div class="preview-section-heading"><span class="preview-section-icon">04</span><div><h3>Frequency distribution</h3><p>Count of each distinct value</p></div></div>
      <div class="table-wrap preview-table-wrap"><table class="history-preview-table"><thead><tr><th>Value</th><th>Frequency</th></tr></thead><tbody>${item.pairs.map(pair => `<tr><td>${escapeHTML(formatNumber(pair.value, item.places))}</td><td>${pair.freq}</td></tr>`).join("")}</tbody></table></div>
    </section>
    <section class="preview-section preview-interpretation"><div class="preview-section-heading"><span class="preview-section-icon">05</span><div><h3>Interpretation</h3><p>What the calculated values indicate</p></div></div><p>${escapeHTML(item.interpretation)}</p></section>
    <details class="preview-steps"><summary><span>View calculation steps</span><span class="preview-steps-hint">Show details +</span></summary><div class="preview-steps-content">${item.solution}</div></details>
  `;
  const dialog = document.getElementById("historyPreviewDialog");
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "open");
}

// Directly callable handlers are used by the History buttons so actions remain
// available even if event delegation is interrupted by another page script.
function editHistoryRecord(index) {
  const item = historyItems[index];
  if (!item) return;
  dataInput.value = item.input || "";
  dataType.value = item.dataType || "ungrouped";
  editingHistoryIndex = index;
  document.getElementById("frequencyHelp").style.display = dataType.value === "frequency" ? "block" : "none";
  const rounding = document.getElementById("rounding");
  if (rounding && Number.isInteger(item.places)) rounding.value = String(item.places);
  const errorMessage = document.getElementById("errorMessage");
  if (errorMessage) errorMessage.textContent = "Editing this history record. Make your changes, then click Calculate results to update this record.";
  document.getElementById("resultSection").style.display = "none";
  document.querySelectorAll('.page').forEach(page => page.classList.toggle('active', page.id === 'calculator'));
  document.querySelectorAll('[data-page]').forEach(button => button.classList.toggle('active', button.dataset.page === 'calculator'));
  document.getElementById("calculator").scrollIntoView({behavior:"smooth", block:"start"});
}

function deleteHistoryRecord(index) {
  if (!Number.isInteger(index) || !historyItems[index]) return;
  if (!window.confirm("Delete this calculation from history? This cannot be undone.")) return;
  historyItems.splice(index, 1);
  if (editingHistoryIndex === index) editingHistoryIndex = null;
  else if (editingHistoryIndex !== null && editingHistoryIndex > index) editingHistoryIndex -= 1;
  saveHistory();
  renderHistory();
}

// Keep globals explicit for inline button handlers in standalone HTML files.
window.editHistoryRecord = editHistoryRecord;
window.deleteHistoryRecord = deleteHistoryRecord;
window.openHistoryPreview = openHistoryPreview;

renderHistory();

function closeHistoryPreview() {
  const dialog = document.getElementById("historyPreviewDialog");
  if (typeof dialog.close === "function") dialog.close();
  else dialog.removeAttribute("open");
}
document.getElementById("closeHistoryPreviewBtn").addEventListener("click", closeHistoryPreview);
document.getElementById("closeHistoryPreviewFooterBtn").addEventListener("click", closeHistoryPreview);
document.getElementById("historyPreviewDialog").addEventListener("click", event => {
  if (event.target === event.currentTarget) closeHistoryPreview();
});



/* BUTTONS */
// The calculator button uses a direct inline handler so it remains usable
// even if an unrelated optional UI listener fails to initialize.
window.calculate = calculate;



const printGeneratedAt = document.getElementById("printGeneratedAt");
function updatePrintTimestamp() {
  if (!printGeneratedAt) return;
  printGeneratedAt.textContent = new Intl.DateTimeFormat("en-PH", {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit"
  }).format(new Date());
}
window.addEventListener("beforeprint", updatePrintTimestamp);

// Expose the PDF action globally and call it directly from the button's
// inline click handler. This avoids relying on the optional listener setup.
window.saveResultsAsPDF = function () {
  updatePrintTimestamp();
  // The button also has a native inline onclick fallback, so this listener
  // is only an enhancement and never blocks the browser print action.
};
const pdfButton = document.getElementById("printResultsBtn");
if (pdfButton) {
  pdfButton.disabled = false;
  pdfButton.addEventListener("click", window.saveResultsAsPDF, true);
}

document.getElementById("clearBtn").addEventListener("click", () => {

  dataInput.value = "";
  editingHistoryIndex = null;

  document.getElementById("errorMessage").textContent = "";

  document.getElementById("resultSection").style.display = "none";
  document.getElementById("fractionError").textContent = "";
  document.getElementById("percentageError").textContent = "";
  document.getElementById("fractionCalculation").textContent = "";
  document.getElementById("percentageCalculation").textContent = "";
  document.getElementById("fractionResult").textContent = "—";
  document.getElementById("percentageResult").textContent = "—";

});



document.getElementById("clearHistoryBtn").addEventListener("click", () => {

  historyItems = [];
  saveHistory();
  renderHistory();

});



/* LOG OUT BUTTON */

document.getElementById("logoutBtn").addEventListener("click", () => {

  const confirmLogout = confirm("Are you sure you want to log out?");

  if (confirmLogout) {

    alert("You have been logged out.");

  }

});


/* FRACTION AND PERCENTAGE CONVERTERS */
(function () {
  const get = (id) => document.getElementById(id);
  const cleanNumber = (value) => Number(value.toPrecision(10)).toString();
  const splitValues = (value) => value.trim().split(/[,;\s]+/).filter(Boolean);

  function showResults(output, calculation, rows) {
    output.classList.add("multi-result");
    output.textContent = rows.map(row => `${row.input}  →  ${row.result}`).join("\n");
    calculation.textContent = rows.map(row => row.calculation).join("\n");
  }

  function convertFraction() {
    const raw = get("fractionInput").value;
    const error = get("fractionError");
    const output = get("fractionResult");
    const calculation = get("fractionCalculation");
    error.textContent = "";
    output.classList.add("multi-result");
    if (!raw.trim()) {
      error.textContent = "Please enter at least one fraction, such as 1/2.";
      output.textContent = "—"; calculation.textContent = ""; return;
    }
    const values = splitValues(raw);
    const rows = [];
    const invalid = [];
    values.forEach(value => {
      const match = value.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+))\/([+-]?(?:\d+(?:\.\d*)?|\.\d+))$/);
      if (!match) { invalid.push(value); return; }
      const numerator = Number(match[1]);
      const denominator = Number(match[2]);
      if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) { invalid.push(value); return; }
      const result = cleanNumber(numerator / denominator);
      rows.push({ input: value, result, calculation: `${value}: ${cleanNumber(numerator)} ÷ ${cleanNumber(denominator)} = ${result}` });
    });
    if (invalid.length) error.textContent = `Invalid fraction(s): ${invalid.join(", ")}. Use formats like 1/2 or 3/4; denominator cannot be zero.`;
    if (!rows.length) { output.textContent = "—"; calculation.textContent = ""; return; }
    showResults(output, calculation, rows);
  }

  function convertPercentage() {
    const raw = get("percentageInput").value;
    const error = get("percentageError");
    const output = get("percentageResult");
    const calculation = get("percentageCalculation");
    error.textContent = "";
    output.classList.add("multi-result");
    if (!raw.trim()) {
      error.textContent = "Please enter at least one percentage, such as 25%.";
      output.textContent = "—"; calculation.textContent = ""; return;
    }
    const values = splitValues(raw);
    const rows = [];
    const invalid = [];
    values.forEach(value => {
      const numberText = value.replace(/%$/, "");
      if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(numberText)) { invalid.push(value); return; }
      const percentage = Number(numberText);
      if (!Number.isFinite(percentage)) { invalid.push(value); return; }
      const result = cleanNumber(percentage / 100);
      rows.push({ input: value, result, calculation: `${value}: ${cleanNumber(percentage)} ÷ 100 = ${result}` });
    });
    if (invalid.length) error.textContent = `Invalid percentage(s): ${invalid.join(", ")}. Use formats like 25%, 12.5%, or 50.`;
    if (!rows.length) { output.textContent = "—"; calculation.textContent = ""; return; }
    showResults(output, calculation, rows);
  }

  get("fractionConvertBtn").addEventListener("click", convertFraction);
  get("percentageConvertBtn").addEventListener("click", convertPercentage);
})();
