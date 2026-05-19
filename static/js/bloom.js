const bloomData = [
  { region: "Changwon", date: "Mar 24", day: 0, normal: -5, temp: 8.6, last7: 10.8, note: "The earliest 2026 bloom, opening the southern wave." },
  { region: "Pohang", date: "Mar 26", day: 2, normal: -3, temp: 8.5, last7: 11.1, note: "Eastern coastal warmth kept flowering early." },
  { region: "Daegu", date: "Mar 26", day: 2, normal: -3, temp: 8.1, last7: 10.9, note: "An inland early bloom among the late-March cluster." },
  { region: "Busan", date: "Mar 26", day: 2, normal: -2, temp: 9.6, last7: 12.0, note: "A warm coastal signal with late-March flowering." },
  { region: "Yeosu", date: "Mar 26", day: 2, normal: -5, temp: 8.7, last7: 11.0, note: "Southern marine influence supported early bloom timing." },
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

  const guide = document.createElementNS("http://www.w3.org/2000/svg", "path");
  guide.setAttribute("d", `M ${x(0)} ${y(9.3)} C ${x(6)} ${y(8.2)}, ${x(12)} ${y(9.8)}, ${x(22)} ${y(8.6)}`);
  guide.setAttribute("stroke", "url(#warmLine)");
  guide.setAttribute("stroke-width", "4");
  guide.setAttribute("stroke-dasharray", "10 10");
  guide.setAttribute("stroke-linecap", "round");
  guide.setAttribute("fill", "none");
  guide.setAttribute("opacity", "0.48");
  svg.appendChild(guide);

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
  });
}

function drawDateClusterChart() {
  const svg = document.querySelector("#date-cluster-chart");
  if (!svg) return;

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
}

function drawNormalShiftChart() {
  const svg = document.querySelector("#normal-shift-chart");
  if (!svg) return;

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
drawTemperatureChart();
drawDateClusterChart();
drawNormalShiftChart();
drawPetals();
updateScrollMeter();
window.addEventListener("scroll", updateScrollMeter, { passive: true });
