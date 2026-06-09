const bloomData = [
  { region: "Changwon", date: "Mar 24", day: 0, normal: -5, temp: 8.6, last7: 10.8, note: "The earliest flowering date in the 2026 dataset." },
  { region: "Pohang", date: "Mar 26", day: 2, normal: -3, temp: 8.5, last7: 11.1, note: "A late-March bloom on the east coast." },
  { region: "Daegu", date: "Mar 26", day: 2, normal: -3, temp: 8.1, last7: 10.9, note: "An inland early bloom among the late-March cluster." },
  { region: "Busan", date: "Mar 26", day: 2, normal: -2, temp: 9.6, last7: 12.0, note: "A coastal station in the late-March bloom group." },
  { region: "Yeosu", date: "Mar 26", day: 2, normal: -5, temp: 8.7, last7: 11.0, note: "A southern station in the late-March bloom group." },
  { region: "Ulsan", date: "Mar 28", day: 4, normal: -1, temp: 8.5, last7: 11.6, note: "A coastal industrial region in the early group." },
  { region: "Jeonju", date: "Mar 28", day: 4, normal: -6, temp: 7.3, last7: 11.0, note: "A late-March bloom after steady pre-flowering warming." },
  { region: "Jeju", date: "Mar 28", day: 4, normal: 3, temp: 9.9, last7: 12.9, note: "Warm, but later than its normal flowering date in 2026." },
  { region: "Gwangju", date: "Mar 29", day: 5, normal: -2, temp: 9.1, last7: 13.1, note: "A warm southwest bloom within the March cluster." },
  { region: "Daejeon", date: "Mar 29", day: 5, normal: -6, temp: 8.2, last7: 12.6, note: "Central inland flowering arrived before April." },
  { region: "Seoul", date: "Mar 29", day: 5, normal: -10, temp: 8.2, last7: 12.0, note: "Not the first bloom, but the largest earlier-than-normal shift." },
  { region: "Cheongju", date: "Mar 29", day: 5, normal: -8, temp: 8.6, last7: 13.0, note: "One of the clearest earlier-than-normal shifts." },
  { region: "Andong", date: "Mar 30", day: 6, normal: -6, temp: 7.9, last7: 12.0, note: "A cooler inland case that still flowered in March." },
  { region: "Mokpo", date: "Mar 30", day: 6, normal: -4, temp: 7.7, last7: 10.8, note: "A coastal bloom near the transition into April." },
  { region: "Bukgangneung", date: "Apr 01", day: 8, normal: -3, temp: 8.1, last7: 10.3, note: "East coast flowering crossed into April." },
  { region: "Ulleungdo", date: "Apr 01", day: 8, normal: -4, temp: 8.7, last7: 11.4, note: "Island timing delayed into the first days of April." },
  { region: "Seogwipo", date: "Apr 02", day: 9, normal: 9, temp: 13.3, last7: 15.7, note: "The major later-than-normal exception in the dataset." },
  { region: "Hongseong", date: "Apr 02", day: 9, normal: null, temp: 8.2, last7: 11.3, note: "Early-April flowering; normal comparison was not listed in the source file." },
  { region: "Suwon", date: "Apr 03", day: 10, normal: -5, temp: 8.7, last7: 11.4, note: "Cooler pre-flowering conditions delayed bloom after Seoul." },
  { region: "Bukchuncheon", date: "Apr 04", day: 11, normal: -7, temp: 8.6, last7: 11.5, note: "A northern inland case with strong year-to-year variability." },
  { region: "Incheon", date: "Apr 05", day: 12, normal: -7, temp: 8.9, last7: 11.6, note: "A later coastal capital-region site, still earlier than normal." },
  { region: "Heuksando", date: "Apr 07", day: 14, normal: 1, temp: 9.3, last7: 10.2, note: "An island site that flowered slightly later than normal." },
  { region: "Baengnyeongdo", date: "Apr 15", day: 22, normal: -4, temp: 8.6, last7: 9.9, note: "The latest 2026 bloom, stretching the wave into mid-April." }
];

const timeline = document.querySelector("#bloom-timeline");
const selectedRegion = document.querySelector("#selected-region");
const selectedDate = document.querySelector("#selected-date");
const selectedNormal = document.querySelector("#selected-normal");
const selectedRank = document.querySelector("#selected-rank");
const selectedNote = document.querySelector("#selected-note");
const scrollMeter = document.querySelector(".scroll-meter span");

const mapPositions = {
  Seoul: { lat: 37.57, lon: 126.98 },
  Incheon: { lat: 37.46, lon: 126.70 },
  Suwon: { lat: 37.26, lon: 127.03 },
  Hongseong: { lat: 36.60, lon: 126.66 },
  Cheongju: { lat: 36.64, lon: 127.49 },
  Daejeon: { lat: 36.35, lon: 127.38 },
  Jeonju: { lat: 35.82, lon: 127.15 },
  Gwangju: { lat: 35.16, lon: 126.85 },
  Mokpo: { lat: 34.81, lon: 126.39 },
  Yeosu: { lat: 34.76, lon: 127.66 },
  Daegu: { lat: 35.87, lon: 128.60 },
  Andong: { lat: 36.57, lon: 128.73 },
  Pohang: { lat: 36.02, lon: 129.34 },
  Ulsan: { lat: 35.54, lon: 129.31 },
  Busan: { lat: 35.18, lon: 129.08 },
  Changwon: { lat: 35.23, lon: 128.68 },
  Bukchuncheon: { lat: 37.88, lon: 127.73 },
  Bukgangneung: { lat: 37.75, lon: 128.90 },
  Ulleungdo: { lat: 37.48, lon: 130.90 },
  Jeju: { lat: 33.50, lon: 126.53 },
  Seogwipo: { lat: 33.25, lon: 126.56 },
  Heuksando: { lat: 34.68, lon: 125.43 },
  Baengnyeongdo: { lat: 37.97, lon: 124.63 }
};

const nationalTrendData = [
  { year: 1973, day: 26 }, { year: 1974, day: 25 }, { year: 1975, day: 25 }, { year: 1976, day: 24 },
  { year: 1977, day: 25 }, { year: 1978, day: 23 }, { year: 1979, day: 25 }, { year: 1980, day: 22 },
  { year: 1981, day: 26 }, { year: 1982, day: 24 }, { year: 1983, day: 25 }, { year: 1984, day: 31 },
  { year: 1985, day: 26 }, { year: 1986, day: 25 }, { year: 1987, day: 26 }, { year: 1988, day: 30 },
  { year: 1989, day: 21 }, { year: 1990, day: 18 }, { year: 1991, day: 25 }, { year: 1992, day: 19 },
  { year: 1993, day: 25 }, { year: 1994, day: 24 }, { year: 1995, day: 25 }, { year: 1996, day: 33 },
  { year: 1997, day: 21 }, { year: 1998, day: 18 }, { year: 1999, day: 23 }, { year: 2000, day: 25 },
  { year: 2001, day: 22 }, { year: 2002, day: 13 }, { year: 2003, day: 21 }, { year: 2004, day: 18 },
  { year: 2005, day: 25 }, { year: 2006, day: 23 }, { year: 2007, day: 19 }, { year: 2008, day: 24 },
  { year: 2009, day: 16 }, { year: 2010, day: 24 }, { year: 2011, day: 26 }, { year: 2012, day: 29 },
  { year: 2013, day: 23 }, { year: 2014, day: 15 }, { year: 2015, day: 17 }, { year: 2016, day: 17 },
  { year: 2017, day: 18 }, { year: 2018, day: 15 }, { year: 2019, day: 13 }, { year: 2020, day: 12 },
  { year: 2021, day: 8 }, { year: 2022, day: 17 }, { year: 2023, day: 8 }, { year: 2024, day: 15 },
  { year: 2025, day: 16 }, { year: 2026, day: 15 }
];

const bukchuncheonTrendData = [
  { year: 2017, day: 26 }, { year: 2018, day: 21 }, { year: 2019, day: 22 },
  { year: 2020, day: 18 }, { year: 2021, day: 17 }, { year: 2022, day: 26 },
  { year: 2023, day: 17 }, { year: 2024, day: 20 }, { year: 2025, day: 24 },
  { year: 2026, day: 22 }
];

function normalText(value) {
  if (value === null || Number.isNaN(value)) return "normal not listed";
  if (value < 0) return `${Math.abs(value)} days earlier`;
  if (value > 0) return `${value} days later`;
  return "near normal";
}

function rankText(item) {
  const uniqueDays = [...new Set(bloomData.map((entry) => entry.day))].sort((a, b) => a - b);
  const rank = uniqueDays.indexOf(item.day) + 1;
  const suffix = rank === 1 ? "st" : rank === 2 ? "nd" : rank === 3 ? "rd" : "th";
  return `${rank}${suffix} date group`;
}

function setSelected(region) {
  const item = bloomData.find((entry) => entry.region === region) || bloomData[8];
  selectedRegion.textContent = item.region;
  selectedDate.textContent = item.date;
  selectedNormal.textContent = normalText(item.normal);
  selectedRank.textContent = rankText(item);
  selectedNote.textContent = item.note;

  document.querySelectorAll(".region-row").forEach((row) => {
    row.classList.toggle("is-active", row.dataset.region === item.region);
  });
  document.querySelectorAll(".map-point").forEach((point) => {
    point.classList.toggle("is-active", point.dataset.region === item.region);
    point.setAttribute("stroke-width", point.dataset.region === item.region ? "5" : "2.5");
    point.setAttribute("r", point.dataset.region === item.region ? "11" : "8");
  });
}

function drawTimeline() {
  const maxDay = Math.max(...bloomData.map((entry) => entry.day));
  timeline.innerHTML = bloomData.map((entry) => {
    const pos = (entry.day / maxDay) * 100;
    const phase = entry.day > 7 ? "late" : "early";
    return `
      <button class="region-row ${phase}" type="button" data-region="${entry.region}" aria-label="${entry.region}, flowering date ${entry.date}, ${normalText(entry.normal)}">
        <span class="region-name">${entry.region}</span>
        <span class="rail"><span class="dot" style="left:${pos}%"></span></span>
        <span class="region-date">${entry.date}</span>
      </button>
    `;
  }).join("");

  timeline.querySelectorAll(".region-row").forEach((row) => {
    row.addEventListener("click", () => setSelected(row.dataset.region));
  });
  setSelected("Changwon");
}

function drawTemperatureChart() {
  const charts = document.querySelectorAll(".temperature-chart");
  if (!charts.length) return;

  charts.forEach((svg) => {
  const compact = svg.classList.contains("compact");
  const width = 780;
  const height = compact ? 360 : 462;
  const margin = { top: 24, right: 32, bottom: 58, left: 58 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const xMin = 0;
  const xMax = 22;
  const yMin = 7;
  const yMax = 14;
  const x = (value) => margin.left + ((value - xMin) / (xMax - xMin)) * innerW;
  const y = (value) => margin.top + (1 - ((value - yMin) / (yMax - yMin))) * innerH;
  const selected = new Set(["Changwon", "Busan", "Seoul", "Seogwipo", "Baengnyeongdo"]);

  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.innerHTML = "";

  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  defs.innerHTML = `
    <linearGradient id="warmLine" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e85d8d"/>
      <stop offset="55%" stop-color="#f0b55f"/>
      <stop offset="100%" stop-color="#8eb8dd"/>
    </linearGradient>
    <filter id="softShadow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="10" stdDeviation="9" flood-color="#7b4059" flood-opacity="0.18"/>
    </filter>
  `;
  svg.appendChild(defs);

  const grid = document.createElementNS("http://www.w3.org/2000/svg", "g");
  for (let i = 0; i <= 4; i += 1) {
    const gy = margin.top + (innerH / 4) * i;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", margin.left);
    line.setAttribute("x2", width - margin.right);
    line.setAttribute("y1", gy);
    line.setAttribute("y2", gy);
    line.setAttribute("stroke", "rgba(89, 73, 84, 0.12)");
    grid.appendChild(line);
  }
  for (let i = 0; i <= 4; i += 1) {
    const gx = margin.left + (innerW / 4) * i;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", gx);
    line.setAttribute("x2", gx);
    line.setAttribute("y1", margin.top);
    line.setAttribute("y2", height - margin.bottom);
    line.setAttribute("stroke", "rgba(89, 73, 84, 0.1)");
    grid.appendChild(line);
  }
  svg.appendChild(grid);

  bloomData.forEach((entry) => {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("tabindex", "0");
    group.setAttribute("role", "button");
    group.setAttribute("aria-label", `${entry.region}: ${entry.date}, ${entry.temp} degrees Celsius 21-day average before flowering`);
    group.addEventListener("click", () => {
      setSelected(entry.region);
      document.querySelector("#map").scrollIntoView({ behavior: "smooth", block: "start" });
    });

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x(entry.day));
    circle.setAttribute("cy", y(entry.temp));
    circle.setAttribute("r", selected.has(entry.region) ? "9" : "6");
    circle.setAttribute("fill", entry.day > 7 ? "#8eb8dd" : "#e85d8d");
    circle.setAttribute("stroke", "#fff");
    circle.setAttribute("stroke-width", "3");
    circle.setAttribute("filter", "url(#softShadow)");
    group.appendChild(circle);

    if (selected.has(entry.region)) {
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", Math.min(x(entry.day) + 12, width - 120));
      text.setAttribute("y", y(entry.temp) - 10);
      text.setAttribute("class", "point-label");
      text.textContent = entry.region;
      group.appendChild(text);
    }
    svg.appendChild(group);
  });

  const xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
  xLabel.setAttribute("x", width / 2);
  xLabel.setAttribute("y", height - 16);
  xLabel.setAttribute("text-anchor", "middle");
  xLabel.setAttribute("class", "axis-label");
  xLabel.textContent = "Days after Mar 24 flowering wave start";
  svg.appendChild(xLabel);

  const yLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
  yLabel.setAttribute("x", 18);
  yLabel.setAttribute("y", height / 2);
  yLabel.setAttribute("text-anchor", "middle");
  yLabel.setAttribute("transform", `rotate(-90 18 ${height / 2})`);
  yLabel.setAttribute("class", "axis-label");
  yLabel.textContent = "21-day ASOS avg. temp";
  svg.appendChild(yLabel);

  const note = document.createElementNS("http://www.w3.org/2000/svg", "text");
  note.setAttribute("x", width - margin.right);
  note.setAttribute("y", margin.top + 14);
  note.setAttribute("text-anchor", "end");
  note.setAttribute("class", "chart-note");
  note.textContent = "No line connects regions; dots compare separate stations.";
  svg.appendChild(note);
  });
}

function drawTemperatureBarCharts() {
  const charts = document.querySelectorAll(".temperature-bar-chart");
  if (!charts.length) return;

  charts.forEach((svg) => {
    const compact = svg.classList.contains("compact");
    const width = 820;
    const height = compact ? 360 : 520;
    const margin = { top: 30, right: 96, bottom: 56, left: compact ? 132 : 150 };
    const selectedRegions = new Set(["Seogwipo", "Jeju", "Busan", "Gwangju", "Changwon", "Seoul", "Bukchuncheon", "Baengnyeongdo", "Mokpo", "Jeonju", "Incheon", "Heuksando"]);
    const data = bloomData
      .filter((entry) => !compact || selectedRegions.has(entry.region))
      .sort((a, b) => b.temp - a.temp);
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;
    const rowH = innerH / data.length;
    const xMin = 7;
    const xMax = 14;
    const x = (value) => margin.left + ((value - xMin) / (xMax - xMin)) * innerW;

    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.innerHTML = "";

    [8, 10, 12, 14].forEach((tick) => {
      const gx = x(tick);
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", gx);
      line.setAttribute("x2", gx);
      line.setAttribute("y1", margin.top - 6);
      line.setAttribute("y2", height - margin.bottom + 8);
      line.setAttribute("stroke", "rgba(89, 73, 84, 0.11)");
      svg.appendChild(line);

      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", gx);
      label.setAttribute("y", height - 22);
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("class", "tick-label");
      label.textContent = `${tick}C`;
      svg.appendChild(label);
    });

    data.forEach((entry, index) => {
      const y = margin.top + index * rowH + rowH * 0.18;
      const barH = Math.max(8, rowH * 0.54);
      const color = entry.day <= 6 ? "#e85d8d" : "#8eb8dd";

      const name = document.createElementNS("http://www.w3.org/2000/svg", "text");
      name.setAttribute("x", margin.left - 12);
      name.setAttribute("y", y + barH * 0.72);
      name.setAttribute("text-anchor", "end");
      name.setAttribute("class", "tick-label");
      name.textContent = entry.region;
      svg.appendChild(name);

      const bg = document.createElementNS("http://www.w3.org/2000/svg", "line");
      bg.setAttribute("x1", margin.left);
      bg.setAttribute("x2", width - margin.right);
      bg.setAttribute("y1", y + barH / 2);
      bg.setAttribute("y2", y + barH / 2);
      bg.setAttribute("stroke", "rgba(89, 73, 84, 0.08)");
      bg.setAttribute("stroke-width", barH);
      bg.setAttribute("stroke-linecap", "round");
      svg.appendChild(bg);

      const bar = document.createElementNS("http://www.w3.org/2000/svg", "line");
      bar.setAttribute("x1", margin.left);
      bar.setAttribute("x2", x(entry.temp));
      bar.setAttribute("y1", y + barH / 2);
      bar.setAttribute("y2", y + barH / 2);
      bar.setAttribute("stroke", color);
      bar.setAttribute("stroke-width", barH);
      bar.setAttribute("stroke-linecap", "round");
      bar.setAttribute("opacity", "0.82");
      svg.appendChild(bar);

      const value = document.createElementNS("http://www.w3.org/2000/svg", "text");
      value.setAttribute("x", Math.min(x(entry.temp) + 10, width - margin.right + 4));
      value.setAttribute("y", y + barH * 0.72);
      value.setAttribute("class", "chart-note");
      value.textContent = `${entry.temp.toFixed(1)}C · ${entry.date}`;
      svg.appendChild(value);
    });

    const axis = document.createElementNS("http://www.w3.org/2000/svg", "text");
    axis.setAttribute("x", margin.left + innerW / 2);
    axis.setAttribute("y", height - 4);
    axis.setAttribute("text-anchor", "middle");
    axis.setAttribute("class", "axis-label");
    axis.textContent = "21-day ASOS average temperature before flowering";
    svg.appendChild(axis);

    const note = document.createElementNS("http://www.w3.org/2000/svg", "text");
    note.setAttribute("x", width - margin.right);
    note.setAttribute("y", 20);
    note.setAttribute("text-anchor", "end");
    note.setAttribute("class", "chart-note");
    note.textContent = "Warmest station is not necessarily earliest bloom.";
    svg.appendChild(note);
  });
}

function drawKoreaHeatmap() {
  const svg = document.querySelector("#korea-heatmap");
  if (!svg) return;

  const width = 720;
  const height = 610;
  const bounds = { minLon: 124.2, maxLon: 131.25, minLat: 33.05, maxLat: 38.35 };
  const margin = { top: 38, right: 80, bottom: 42, left: 28 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const project = ({ lon, lat }) => ({
    x: margin.left + ((lon - bounds.minLon) / (bounds.maxLon - bounds.minLon)) * innerW,
    y: margin.top + (1 - ((lat - bounds.minLat) / (bounds.maxLat - bounds.minLat))) * innerH
  });
  const pathFromLonLat = (points) => points.map((point, index) => {
    const p = project(point);
    return `${index ? "L" : "M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  }).join(" ");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.innerHTML = "";

  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  defs.innerHTML = `
    <radialGradient id="mapGlowEarly" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#e85d8d" stop-opacity="0.46"/>
      <stop offset="100%" stop-color="#e85d8d" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="mapGlowLate" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#8eb8dd" stop-opacity="0.42"/>
      <stop offset="100%" stop-color="#8eb8dd" stop-opacity="0"/>
    </radialGradient>
  `;
  svg.appendChild(defs);

  const sea = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  sea.setAttribute("x", "18");
  sea.setAttribute("y", "16");
  sea.setAttribute("width", width - 36);
  sea.setAttribute("height", height - 36);
  sea.setAttribute("rx", "34");
  sea.setAttribute("fill", "rgba(142, 184, 221, 0.06)");
  svg.appendChild(sea);

  const grid = document.createElementNS("http://www.w3.org/2000/svg", "g");
  [125, 126, 127, 128, 129, 130, 131].forEach((lon) => {
    const a = project({ lon, lat: bounds.minLat });
    const b = project({ lon, lat: bounds.maxLat });
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", a.x);
    line.setAttribute("x2", b.x);
    line.setAttribute("y1", a.y);
    line.setAttribute("y2", b.y);
    line.setAttribute("stroke", "rgba(89, 73, 84, 0.055)");
    grid.appendChild(line);
  });
  [34, 35, 36, 37, 38].forEach((lat) => {
    const a = project({ lon: bounds.minLon, lat });
    const b = project({ lon: bounds.maxLon, lat });
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", a.x);
    line.setAttribute("x2", b.x);
    line.setAttribute("y1", a.y);
    line.setAttribute("y2", b.y);
    line.setAttribute("stroke", "rgba(89, 73, 84, 0.055)");
    grid.appendChild(line);
  });
  svg.appendChild(grid);

  const land = document.createElementNS("http://www.w3.org/2000/svg", "path");
  land.setAttribute("d", `${pathFromLonLat([
    { lon: 126.20, lat: 37.95 }, { lon: 126.72, lat: 38.25 }, { lon: 127.72, lat: 38.18 },
    { lon: 128.86, lat: 37.77 }, { lon: 129.44, lat: 36.86 }, { lon: 129.38, lat: 35.95 },
    { lon: 129.20, lat: 35.18 }, { lon: 128.55, lat: 34.82 }, { lon: 127.70, lat: 34.66 },
    { lon: 126.86, lat: 34.42 }, { lon: 126.10, lat: 34.62 }, { lon: 125.75, lat: 35.22 },
    { lon: 126.00, lat: 35.90 }, { lon: 125.88, lat: 36.55 }, { lon: 126.20, lat: 37.18 },
    { lon: 126.20, lat: 37.95 }
  ])} Z`);
  land.setAttribute("fill", "rgba(255,255,255,0.72)");
  land.setAttribute("stroke", "rgba(184,50,102,0.18)");
  land.setAttribute("stroke-width", "3");
  svg.appendChild(land);

  const jeju = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
  const jejuCenter = project({ lon: 126.54, lat: 33.38 });
  jeju.setAttribute("cx", jejuCenter.x);
  jeju.setAttribute("cy", jejuCenter.y);
  jeju.setAttribute("rx", "54");
  jeju.setAttribute("ry", "20");
  jeju.setAttribute("fill", "rgba(255,255,255,0.68)");
  jeju.setAttribute("stroke", "rgba(184,50,102,0.16)");
  jeju.setAttribute("stroke-width", "3");
  svg.appendChild(jeju);

  const labelOffsets = {
    Seoul: { dx: 16, dy: -12 },
    Bukchuncheon: { dx: 14, dy: -12 },
    Baengnyeongdo: { dx: 14, dy: -12 },
    Seogwipo: { dx: 14, dy: 18 },
    Changwon: { dx: -96, dy: -10 },
    Busan: { dx: 12, dy: 18 },
    Ulleungdo: { dx: 16, dy: -8 },
    Heuksando: { dx: 14, dy: -10 }
  };

  bloomData.forEach((entry) => {
    const coords = mapPositions[entry.region];
    if (!coords) return;
    const pos = project(coords);
    const late = entry.day > 7;
    const glow = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    glow.setAttribute("cx", pos.x);
    glow.setAttribute("cy", pos.y);
    glow.setAttribute("r", late ? "30" : "34");
    glow.setAttribute("fill", late ? "url(#mapGlowLate)" : "url(#mapGlowEarly)");
    svg.appendChild(glow);
  });

  bloomData.forEach((entry) => {
    const coords = mapPositions[entry.region];
    if (!coords) return;
    const pos = project(coords);
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("role", "button");
    group.setAttribute("tabindex", "0");
    group.setAttribute("aria-label", `${entry.region}, ${entry.date}, ${normalText(entry.normal)}`);
    group.addEventListener("click", () => setSelected(entry.region));
    group.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setSelected(entry.region);
      }
    });

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.dataset.region = entry.region;
    circle.setAttribute("class", "map-point");
    circle.setAttribute("cx", pos.x);
    circle.setAttribute("cy", pos.y);
    circle.setAttribute("r", entry.region === "Changwon" ? "11" : "8");
    circle.setAttribute("fill", entry.day > 7 ? "#8eb8dd" : "#e85d8d");
    circle.setAttribute("stroke", entry.region === "Changwon" ? "#b83266" : "#fff");
    circle.setAttribute("stroke-width", entry.region === "Changwon" ? "5" : "2.5");
    group.appendChild(circle);

    if (Object.hasOwn(labelOffsets, entry.region)) {
      const offset = labelOffsets[entry.region];
      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", pos.x + offset.dx);
      label.setAttribute("y", pos.y + offset.dy);
      label.setAttribute("class", "map-label");
      label.textContent = entry.region;
      group.appendChild(label);
    }

    svg.appendChild(group);
  });

  /*const north = document.createElementNS("http://www.w3.org/2000/svg", "text");
  north.setAttribute("x", width - 208);
  north.setAttribute("y", "52");
  north.setAttribute("class", "map-note");
  north.textContent = "station positions use approximate coordinates";
  svg.appendChild(north);*/
}

function drawDateClusterChart() {
  const charts = document.querySelectorAll(".date-cluster-chart, #date-cluster-chart");
  if (!charts.length) return;

  const width = 720;
  const height = 340;
  const margin = { top: 24, right: 24, bottom: 58, left: 38 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const counts = [...bloomData.reduce((map, entry) => {
    map.set(entry.date, (map.get(entry.date) || 0) + 1);
    return map;
  }, new Map())].map(([date, count]) => {
    const day = bloomData.find((entry) => entry.date === date).day;
    return { date, count, day };
  }).sort((a, b) => a.day - b.day);
  const maxCount = Math.max(...counts.map((entry) => entry.count));
  const step = innerW / counts.length;
  const barW = Math.min(46, step * 0.62);

  charts.forEach((svg) => {
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.innerHTML = "";

    counts.forEach((entry, index) => {
      const x = margin.left + index * step + (step - barW) / 2;
      const barH = (entry.count / maxCount) * innerH;
      const y = margin.top + innerH - barH;
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", x);
      rect.setAttribute("y", y);
      rect.setAttribute("width", barW);
      rect.setAttribute("height", barH);
      rect.setAttribute("rx", "12");
      rect.setAttribute("fill", entry.day <= 5 ? "#e85d8d" : "#8eb8dd");
      rect.setAttribute("opacity", "0.82");
      svg.appendChild(rect);

      const value = document.createElementNS("http://www.w3.org/2000/svg", "text");
      value.setAttribute("x", x + barW / 2);
      value.setAttribute("y", y - 10);
      value.setAttribute("text-anchor", "middle");
      value.setAttribute("class", "bar-label");
      value.textContent = entry.count;
      svg.appendChild(value);

      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", x + barW / 2);
      label.setAttribute("y", height - 24);
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("class", "tick-label");
      label.textContent = entry.date.replace(" ", "\u00a0");
      svg.appendChild(label);
    });

    const axis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    axis.setAttribute("x1", margin.left);
    axis.setAttribute("x2", width - margin.right);
    axis.setAttribute("y1", margin.top + innerH);
    axis.setAttribute("y2", margin.top + innerH);
    axis.setAttribute("stroke", "rgba(89, 73, 84, 0.18)");
    axis.setAttribute("stroke-width", "2");
    svg.appendChild(axis);
  });
}

function drawNormalShiftChart() {
  const charts = document.querySelectorAll(".normal-shift-chart, #normal-shift-chart");
  if (!charts.length) return;

  const listed = bloomData.filter((entry) => entry.normal !== null);
  const early = listed.filter((entry) => entry.normal < 0).length;
  const late = listed.filter((entry) => entry.normal > 0).length;
  const neutral = listed.filter((entry) => entry.normal === 0).length;
  const width = 720;
  const height = 340;
  const center = width / 2;
  const y = 112;
  const max = listed.length;
  const scale = 260 / max;
  const leftW = early * scale;
  const rightW = late * scale;

  charts.forEach((svg) => {
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.innerHTML = "";

  const base = document.createElementNS("http://www.w3.org/2000/svg", "line");
  base.setAttribute("x1", center - 280);
  base.setAttribute("x2", center + 280);
  base.setAttribute("y1", y);
  base.setAttribute("y2", y);
  base.setAttribute("stroke", "rgba(89, 73, 84, 0.16)");
  base.setAttribute("stroke-width", "24");
  base.setAttribute("stroke-linecap", "round");
  svg.appendChild(base);

  const earlyLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
  earlyLine.setAttribute("x1", center);
  earlyLine.setAttribute("x2", center - leftW);
  earlyLine.setAttribute("y1", y);
  earlyLine.setAttribute("y2", y);
  earlyLine.setAttribute("stroke", "#e85d8d");
  earlyLine.setAttribute("stroke-width", "24");
  earlyLine.setAttribute("stroke-linecap", "round");
  svg.appendChild(earlyLine);

  const lateLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
  lateLine.setAttribute("x1", center);
  lateLine.setAttribute("x2", center + rightW);
  lateLine.setAttribute("y1", y);
  lateLine.setAttribute("y2", y);
  lateLine.setAttribute("stroke", "#8eb8dd");
  lateLine.setAttribute("stroke-width", "24");
  lateLine.setAttribute("stroke-linecap", "round");
  svg.appendChild(lateLine);

  const centerLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
  centerLine.setAttribute("x1", center);
  centerLine.setAttribute("x2", center);
  centerLine.setAttribute("y1", 54);
  centerLine.setAttribute("y2", 172);
  centerLine.setAttribute("stroke", "rgba(39, 27, 36, 0.42)");
  centerLine.setAttribute("stroke-width", "2");
  centerLine.setAttribute("stroke-dasharray", "5 5");
  svg.appendChild(centerLine);

  const labels = [
    { x: center - leftW / 2, y: y - 42, title: `${early} early`, sub: "negative values" },
    { x: center + Math.max(rightW / 2, 38), y: y - 42, title: `${late} late`, sub: "positive values" },
    { x: center, y: y + 74, title: `${neutral} near normal`, sub: "exactly zero" }
  ];

  labels.forEach((label) => {
    const title = document.createElementNS("http://www.w3.org/2000/svg", "text");
    title.setAttribute("x", label.x);
    title.setAttribute("y", label.y);
    title.setAttribute("text-anchor", "middle");
    title.setAttribute("class", "bar-label");
    title.textContent = label.title;
    svg.appendChild(title);

    const sub = document.createElementNS("http://www.w3.org/2000/svg", "text");
    sub.setAttribute("x", label.x);
    sub.setAttribute("y", label.y + 20);
    sub.setAttribute("text-anchor", "middle");
    sub.setAttribute("class", "chart-note");
    sub.textContent = label.sub;
    svg.appendChild(sub);
  });

  const callouts = [
    { x: center - leftW, y: 226, text: "Seoul: 10 days early", color: "#e85d8d" },
    { x: center + rightW, y: 264, text: "Seogwipo: 9 days late", color: "#8eb8dd" }
  ];

    callouts.forEach((callout) => {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", callout.x);
      circle.setAttribute("cy", y);
      circle.setAttribute("r", "8");
      circle.setAttribute("fill", callout.color);
      circle.setAttribute("stroke", "#fff");
      circle.setAttribute("stroke-width", "3");
      svg.appendChild(circle);

      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", callout.x);
      line.setAttribute("x2", callout.x);
      line.setAttribute("y1", y + 14);
      line.setAttribute("y2", callout.y - 20);
      line.setAttribute("stroke", callout.color);
      line.setAttribute("stroke-width", "2");
      line.setAttribute("stroke-dasharray", "5 5");
      svg.appendChild(line);

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", callout.x);
      text.setAttribute("y", callout.y);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("class", "bar-label");
      text.textContent = callout.text;
      svg.appendChild(text);
    });
  });
}

function drawPhenologyStrip() {
  const svg = document.querySelector("#phenology-strip-chart");
  if (!svg) return;

  const width = 720;
  const height = 360;
  const margin = { top: 46, right: 54, bottom: 76, left: 54 };
  const cardW = 148;
  const stages = [
    { label: "Budburst", date: "Mar 24", day: 0, color: "#6f9f82", y: 172, labelX: 126 },
    { label: "Flowering", date: "Apr 04", day: 11, color: "#e85d8d", y: 118, labelX: 350 },
    { label: "Full bloom", date: "Apr 08", day: 15, color: "#8e75c8", y: 82, labelX: 580 }
  ];
  const x = (day) => margin.left + (day / 22) * (width - margin.left - margin.right);

  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.innerHTML = "";

  const rail = document.createElementNS("http://www.w3.org/2000/svg", "line");
  rail.setAttribute("x1", margin.left);
  rail.setAttribute("x2", width - margin.right);
  rail.setAttribute("y1", "210");
  rail.setAttribute("y2", "210");
  rail.setAttribute("stroke", "rgba(89, 73, 84, 0.16)");
  rail.setAttribute("stroke-width", "16");
  rail.setAttribute("stroke-linecap", "round");
  svg.appendChild(rail);

  stages.forEach((stage, index) => {
    const gx = x(stage.day);
    const cardX = Math.max(18, Math.min(stage.labelX - cardW / 2, width - cardW - 18));
    const cardCenter = cardX + cardW / 2;
    const marker = document.createElementNS("http://www.w3.org/2000/svg", "path");
    marker.setAttribute("d", `M ${gx} 210 L ${gx} ${stage.y + 36} L ${cardCenter} ${stage.y + 36}`);
    marker.setAttribute("fill", "none");
    marker.setAttribute("stroke", stage.color);
    marker.setAttribute("stroke-width", "3");
    marker.setAttribute("stroke-dasharray", "6 6");
    svg.appendChild(marker);

    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", gx);
    dot.setAttribute("cy", "210");
    dot.setAttribute("r", "13");
    dot.setAttribute("fill", stage.color);
    dot.setAttribute("stroke", "#fff");
    dot.setAttribute("stroke-width", "4");
    svg.appendChild(dot);

    const card = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    card.setAttribute("x", cardX);
    card.setAttribute("y", stage.y - 40);
    card.setAttribute("width", cardW);
    card.setAttribute("height", "70");
    card.setAttribute("rx", "18");
    card.setAttribute("fill", "rgba(255,255,255,0.86)");
    card.setAttribute("stroke", stage.color);
    card.setAttribute("stroke-opacity", "0.28");
    svg.appendChild(card);

    const title = document.createElementNS("http://www.w3.org/2000/svg", "text");
    title.setAttribute("x", cardCenter);
    title.setAttribute("y", stage.y - 12);
    title.setAttribute("text-anchor", "middle");
    title.setAttribute("class", "bar-label");
    title.textContent = stage.label;
    svg.appendChild(title);

    const date = document.createElementNS("http://www.w3.org/2000/svg", "text");
    date.setAttribute("x", cardCenter);
    date.setAttribute("y", stage.y + 10);
    date.setAttribute("text-anchor", "middle");
    date.setAttribute("class", "chart-note");
    date.textContent = stage.date;
    svg.appendChild(date);

    const tick = document.createElementNS("http://www.w3.org/2000/svg", "text");
    tick.setAttribute("x", gx);
    tick.setAttribute("y", "250");
    tick.setAttribute("text-anchor", "middle");
    tick.setAttribute("class", "tick-label");
    tick.textContent = stage.date;
    svg.appendChild(tick);
  });

  const caption = document.createElementNS("http://www.w3.org/2000/svg", "text");
  caption.setAttribute("x", width / 2);
  caption.setAttribute("y", height - 24);
  caption.setAttribute("text-anchor", "middle");
  caption.setAttribute("class", "chart-note");
  caption.textContent = "Bukchuncheon 2026 stages shown as separated milestones to avoid label overlap.";
  svg.appendChild(caption);
}

function dayLabel(day) {
  if (day <= 16) return `Mar ${String(15 + day).padStart(2, "0")}`;
  return `Apr ${String(day - 16).padStart(2, "0")}`;
}

function linearFit(data) {
  const n = data.length;
  const sumX = data.reduce((sum, point) => sum + point.year, 0);
  const sumY = data.reduce((sum, point) => sum + point.day, 0);
  const sumXY = data.reduce((sum, point) => sum + point.year * point.day, 0);
  const sumXX = data.reduce((sum, point) => sum + point.year * point.year, 0);
  const slope = ((n * sumXY) - (sumX * sumY)) / ((n * sumXX) - (sumX * sumX));
  const intercept = (sumY - slope * sumX) / n;
  return { slope, intercept, predict: (year) => slope * year + intercept };
}

function drawTrendChart(svg, data, config) {
  if (!svg) return;

  const width = 980;
  const height = 520;
  const margin = { top: 44, right: 40, bottom: 74, left: 96 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const minYear = config.minYear;
  const maxYear = config.maxYear;
  const minDay = 0;
  const maxDay = 35;
  const x = (year) => margin.left + ((year - minYear) / (maxYear - minYear)) * innerW;
  const y = (day) => margin.top + (1 - ((day - minDay) / (maxDay - minDay))) * innerH;
  const fit = linearFit(data);
  const projectionStart = 2026;
  const projectedYears = Array.from({ length: maxYear - projectionStart + 1 }, (_, index) => projectionStart + index);

  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.innerHTML = "";

  [0, 5, 10, 15, 20, 25, 30, 35].forEach((day) => {
    const gy = y(day);
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", margin.left);
    line.setAttribute("x2", width - margin.right);
    line.setAttribute("y1", gy);
    line.setAttribute("y2", gy);
    line.setAttribute("stroke", "rgba(89, 73, 84, 0.11)");
    svg.appendChild(line);

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", margin.left - 16);
    label.setAttribute("y", gy + 4);
    label.setAttribute("text-anchor", "end");
    label.setAttribute("class", "tick-label");
    label.textContent = dayLabel(day);
    svg.appendChild(label);
  });

  config.ticks.forEach((year) => {
    const gx = x(year);
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", gx);
    line.setAttribute("x2", gx);
    line.setAttribute("y1", margin.top);
    line.setAttribute("y2", height - margin.bottom);
    line.setAttribute("stroke", "rgba(89, 73, 84, 0.09)");
    svg.appendChild(line);

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", gx);
    label.setAttribute("y", height - 34);
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("class", "tick-label");
    label.textContent = year;
    svg.appendChild(label);
  });

  const uncertainty = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const uncertaintyTop = projectedYears.map((year) => `${x(year)},${y(fit.predict(year) + config.band)}`).join(" ");
  const uncertaintyBottom = projectedYears.slice().reverse().map((year) => `${x(year)},${y(fit.predict(year) - config.band)}`).join(" ");
  uncertainty.setAttribute("d", `M ${uncertaintyTop} L ${uncertaintyBottom} Z`);
  uncertainty.setAttribute("fill", "rgba(142, 184, 221, 0.18)");
  svg.appendChild(uncertainty);

  const observedPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  observedPath.setAttribute("d", data.map((point, index) => `${index ? "L" : "M"} ${x(point.year)} ${y(point.day)}`).join(" "));
  observedPath.setAttribute("fill", "none");
  observedPath.setAttribute("stroke", "#8eb8dd");
  observedPath.setAttribute("stroke-width", "3");
  observedPath.setAttribute("stroke-linejoin", "round");
  svg.appendChild(observedPath);

  data.forEach((point) => {
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", x(point.year));
    dot.setAttribute("cy", y(point.day));
    dot.setAttribute("r", "4.5");
    dot.setAttribute("fill", "#3f9bc9");
    dot.setAttribute("stroke", "#fff");
    dot.setAttribute("stroke-width", "2");
    svg.appendChild(dot);
  });

  const trend = document.createElementNS("http://www.w3.org/2000/svg", "line");
  trend.setAttribute("x1", x(data[0].year));
  trend.setAttribute("x2", x(projectionStart));
  trend.setAttribute("y1", y(fit.predict(data[0].year)));
  trend.setAttribute("y2", y(fit.predict(projectionStart)));
  trend.setAttribute("stroke", "#e85d8d");
  trend.setAttribute("stroke-width", "4");
  svg.appendChild(trend);

  const projected = document.createElementNS("http://www.w3.org/2000/svg", "line");
  projected.setAttribute("x1", x(projectionStart));
  projected.setAttribute("x2", x(maxYear));
  projected.setAttribute("y1", y(fit.predict(projectionStart)));
  projected.setAttribute("y2", y(fit.predict(maxYear)));
  projected.setAttribute("stroke", "#6f9f82");
  projected.setAttribute("stroke-width", "4");
  projected.setAttribute("stroke-dasharray", "10 8");
  svg.appendChild(projected);

  const divider = document.createElementNS("http://www.w3.org/2000/svg", "line");
  divider.setAttribute("x1", x(projectionStart));
  divider.setAttribute("x2", x(projectionStart));
  divider.setAttribute("y1", margin.top);
  divider.setAttribute("y2", height - margin.bottom);
  divider.setAttribute("stroke", "rgba(39, 27, 36, 0.45)");
  divider.setAttribute("stroke-width", "2");
  divider.setAttribute("stroke-dasharray", "4 5");
  svg.appendChild(divider);

  const title = document.createElementNS("http://www.w3.org/2000/svg", "text");
  title.setAttribute("x", margin.left);
  title.setAttribute("y", 24);
  title.setAttribute("class", "bar-label");
  title.textContent = config.title;
  svg.appendChild(title);

  const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "text");
  yAxis.setAttribute("x", 24);
  yAxis.setAttribute("y", height / 2);
  yAxis.setAttribute("text-anchor", "middle");
  yAxis.setAttribute("transform", `rotate(-90 20 ${height / 2})`);
  yAxis.setAttribute("class", "axis-label");
  yAxis.textContent = "Flowering date";
  svg.appendChild(yAxis);

  const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "text");
  xAxis.setAttribute("x", width / 2);
  xAxis.setAttribute("y", height - 4);
  xAxis.setAttribute("text-anchor", "middle");
  xAxis.setAttribute("class", "axis-label");
  xAxis.textContent = "Year";
  svg.appendChild(xAxis);

  const note = document.createElementNS("http://www.w3.org/2000/svg", "text");
  note.setAttribute("x", x(projectionStart) + 12);
  note.setAttribute("y", margin.top + 18);
  note.setAttribute("class", "chart-note");
  note.textContent = "Projection starts";
  svg.appendChild(note);
}

function drawTrendCharts() {
  drawTrendChart(document.querySelector("#national-trend-chart"), nationalTrendData, {
    title: "Cherry blossoms are blooming earlier over time in Korea",
    minYear: 1970,
    maxYear: 2035,
    ticks: [1970, 1980, 1990, 2000, 2010, 2020, 2026, 2030, 2035],
    band: 4.5
  });
  drawTrendChart(document.querySelector("#bukchuncheon-trend-chart"), bukchuncheonTrendData, {
    title: "Bukchuncheon varies year to year, but the trend still points earlier",
    minYear: 2016,
    maxYear: 2030,
    ticks: [2016, 2018, 2020, 2022, 2024, 2026, 2028, 2030],
    band: 3.5
  });
}

function drawPetals() {
  const canvas = document.querySelector("#petal-field");
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let petals = [];

  function resize() {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    petals = Array.from({ length: Math.min(42, Math.floor(window.innerWidth / 28)) }, (_, index) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      s: 4 + Math.random() * 9,
      speed: 0.18 + Math.random() * 0.45,
      swing: 0.5 + Math.random() * 1.8,
      spin: Math.random() * Math.PI,
      seed: index * 19
    }));
  }

  function frame(time) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    petals.forEach((petal) => {
      if (!reduceMotion) {
        petal.y += petal.speed;
        petal.x += Math.sin((time / 900) + petal.seed) * petal.swing * 0.12;
        petal.spin += 0.006;
        if (petal.y > window.innerHeight + 20) {
          petal.y = -20;
          petal.x = Math.random() * window.innerWidth;
        }
      }
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.spin);
      ctx.fillStyle = "rgba(232, 93, 141, 0.16)";
      ctx.beginPath();
      ctx.ellipse(0, 0, petal.s * 0.55, petal.s, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(frame);
}

function updateScrollMeter() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  scrollMeter.style.width = `${pct}%`;
}

drawTimeline();
drawKoreaHeatmap();
drawTemperatureChart();
drawTemperatureBarCharts();
drawDateClusterChart();
drawNormalShiftChart();
drawPhenologyStrip();
drawTrendCharts();
drawPetals();
updateScrollMeter();
window.addEventListener("scroll", updateScrollMeter, { passive: true });
