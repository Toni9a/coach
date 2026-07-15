const WEEK = [
  { day: "MONDAY", workouts: ["upper-strength-1"] },
  { day: "TUESDAY", workouts: ["lower-strength-1", "run-easy-1"] },
  { day: "WEDNESDAY", workouts: ["interval-run"] },
  { day: "THURSDAY", workouts: ["upper-strength-2", "run-easy-2"] },
  { day: "FRIDAY", workouts: ["lower-strength-2", "progressive-run"] },
  { day: "SATURDAY", workouts: ["run-easy-3"] },
  { day: "SUNDAY", workouts: ["long-run"] },
];

const WORKOUTS = {
  "upper-strength-1": {
    day: "MONDAY",
    tag: "UPPER STRENGTH",
    type: "lift",
    rows: [
      { exercise: "Bench Press", sets: 5, reps: "5" },
      { exercise: "Weighted Pull Up", sets: 5, reps: "5" },
      { exercise: "Kneeling Landmine Press", sets: 3, reps: "6-8" },
      { exercise: "Chest Supported Row", sets: 3, reps: "6-8" },
      { superset: true, label: "Superset:" },
      { exercise: "Weighted Dips", sets: 2, reps: "6-8" },
      { exercise: "Cable Face Pull", sets: 2, reps: "15-20" },
      { superset: true, label: "Superset:" },
      { exercise: "Hammer Curl", sets: 2, reps: "10-12" },
      { exercise: "Pallof Press", sets: 2, reps: "10-12" },
      { core: true, label: "Abs / Core", value: "5-10 minutes" },
    ],
  },
  "upper-strength-2": {
    day: "THURSDAY",
    tag: "UPPER STRENGTH",
    type: "lift",
    rows: [
      { exercise: "Overhead Press", sets: 5, reps: "5" },
      { exercise: "Single Arm Row", sets: 4, reps: "8" },
      { exercise: "Incline Dumbbell Press", sets: 3, reps: "8-10" },
      { exercise: "Lat Pulldown", sets: 3, reps: "8-10" },
      { superset: true, label: "Superset:" },
      { exercise: "Lateral Raise", sets: 3, reps: "12-15" },
      { exercise: "Rear Delt Fly", sets: 3, reps: "12-15" },
      { superset: true, label: "Superset:" },
      { exercise: "EZ Bar Curl", sets: 2, reps: "10-12" },
      { exercise: "Cable Crunch", sets: 2, reps: "12-15" },
      { core: true, label: "Abs / Core", value: "5-10 minutes" },
    ],
  },
  "lower-strength-1": {
    day: "TUESDAY",
    tag: "LOWER STRENGTH",
    type: "lift",
    rows: [
      { exercise: "Back Squat", sets: 5, reps: "5" },
      { exercise: "Romanian Deadlift", sets: 4, reps: "6-8" },
      { exercise: "Walking Lunge", sets: 3, reps: "10/leg" },
      { exercise: "Leg Press", sets: 3, reps: "8-10" },
      { superset: true, label: "Superset:" },
      { exercise: "Leg Curl", sets: 3, reps: "10-12" },
      { exercise: "Standing Calf Raise", sets: 3, reps: "12-15" },
      { core: true, label: "Abs / Core", value: "5-10 minutes" },
    ],
  },
  "lower-strength-2": {
    day: "FRIDAY",
    tag: "LOWER STRENGTH",
    type: "lift",
    rows: [
      { exercise: "Front Squat", sets: 4, reps: "6" },
      { exercise: "Hip Thrust", sets: 4, reps: "8" },
      { exercise: "Bulgarian Split Squat", sets: 3, reps: "8/leg" },
      { exercise: "Seated Leg Curl", sets: 3, reps: "10-12" },
      { superset: true, label: "Superset:" },
      { exercise: "Calf Raise", sets: 3, reps: "12-15" },
      { exercise: "Pallof Press", sets: 3, reps: "10-12" },
      { core: true, label: "Abs / Core", value: "5-10 minutes" },
    ],
  },
  "interval-run": {
    day: "WEDNESDAY",
    tag: "INTERVAL RUN",
    type: "run",
    warmup: [
      { time: "5:00 min", zone: "Zone 1" },
      { time: "10:00 min", zone: "Zone 2" },
    ],
    mainset: [
      { time: "6 x 1:00 min", zone: "Zone 4" },
      { time: "/2:00 min", zone: "Zone 2" },
    ],
    cooldown: [{ time: "15:00 min", zone: "Zone 1" }],
    chart: { intervals: 6 },
  },
  "progressive-run": {
    day: "FRIDAY",
    tag: "PROGRESSIVE RUN",
    type: "run",
    warmup: [{ time: "10:00 min", zone: "Zone 1" }],
    mainset: [
      { time: "10:00 min", zone: "Zone 2" },
      { time: "10:00 min", zone: "Zone 3" },
      { time: "10:00 min", zone: "Zone 4" },
    ],
    cooldown: [{ time: "10:00 min", zone: "Zone 1" }],
  },
  "long-run": {
    day: "SUNDAY",
    tag: "LONG RUN",
    type: "run",
    warmup: [{ time: "10:00 min", zone: "Zone 1" }],
    mainset: [{ time: "60-90:00 min", zone: "Zone 2" }],
    cooldown: [{ time: "5:00 min", zone: "Zone 1" }],
  },
  "run-easy-1": {
    day: "TUESDAY",
    tag: "RUN",
    type: "run",
    warmup: [{ time: "5:00 min", zone: "Zone 1" }],
    mainset: [{ time: "30:00 min", zone: "Zone 2" }],
    cooldown: [{ time: "5:00 min", zone: "Zone 1" }],
  },
  "run-easy-2": {
    day: "THURSDAY",
    tag: "RUN",
    type: "run",
    warmup: [{ time: "5:00 min", zone: "Zone 1" }],
    mainset: [{ time: "35:00 min", zone: "Zone 2" }],
    cooldown: [{ time: "5:00 min", zone: "Zone 1" }],
  },
  "run-easy-3": {
    day: "SATURDAY",
    tag: "RUN",
    type: "run",
    warmup: [{ time: "5:00 min", zone: "Zone 1" }],
    mainset: [{ time: "40:00 min", zone: "Zone 2" }],
    cooldown: [{ time: "5:00 min", zone: "Zone 1" }],
  },
};

function render() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  const app = document.getElementById("app");
  app.innerHTML = "";

  if (hash.startsWith("workout/")) {
    const id = hash.slice("workout/".length);
    app.appendChild(renderWorkout(id));
  } else {
    app.appendChild(renderWeek());
  }
  window.scrollTo(0, 0);
}

function renderWeek() {
  const sheet = document.createElement("div");
  sheet.className = "sheet";

  sheet.innerHTML = `
    <h1 class="page-title">The Full Week</h1>
    <p class="page-subtitle">4 lifts. 5 runs. 1 long run.</p>
    <p class="page-note">Run the hard days hard. Keep the easy days easy. Do not turn every session into a test.</p>
  `;

  const week = document.createElement("div");
  week.className = "week";

  WEEK.forEach(({ day, workouts }) => {
    const row = document.createElement("div");
    row.className = "day-row";

    const name = document.createElement("div");
    name.className = "day-name";
    name.textContent = day;
    row.appendChild(name);

    for (let i = 0; i < 2; i++) {
      const id = workouts[i];
      if (id) {
        const w = WORKOUTS[id];
        const btn = document.createElement("button");
        btn.className = "pill";
        btn.textContent = w.tag;
        btn.addEventListener("click", () => {
          window.location.hash = `#/workout/${id}`;
        });
        row.appendChild(btn);
      } else {
        const empty = document.createElement("div");
        empty.className = "pill slot-empty";
        row.appendChild(empty);
      }
    }

    week.appendChild(row);
  });

  sheet.appendChild(week);
  return sheet;
}

function renderWorkout(id) {
  const w = WORKOUTS[id];
  const sheet = document.createElement("div");
  sheet.className = "sheet";

  if (!w) {
    sheet.innerHTML = `<p>Workout not found.</p>`;
    return sheet;
  }

  const back = document.createElement("button");
  back.className = "back-link";
  back.innerHTML = "&larr; Back";
  back.addEventListener("click", () => {
    window.location.hash = "#/";
  });
  sheet.appendChild(back);

  const header = document.createElement("div");
  header.className = "detail-header";
  header.innerHTML = `
    <h1 class="detail-title">${w.day}</h1>
    <span class="pill static detail-tag">${w.tag}</span>
  `;
  sheet.appendChild(header);

  if (w.type === "lift") {
    sheet.appendChild(renderLift(w));
  } else {
    sheet.appendChild(renderRun(w));
  }

  return sheet;
}

function renderLift(w) {
  const wrap = document.createElement("div");

  const table = document.createElement("table");
  table.className = "lift-table";
  table.innerHTML = `
    <thead>
      <tr><th>Exercise</th><th>Sets</th><th>Reps</th></tr>
    </thead>
  `;
  const tbody = document.createElement("tbody");

  w.rows.forEach((row) => {
    const tr = document.createElement("tr");
    if (row.superset) {
      tr.innerHTML = `<td class="superset-label" colspan="3">${row.label}</td>`;
    } else if (row.core) {
      tr.className = "core-row";
      tr.innerHTML = `<td>${row.label}</td><td colspan="2">${row.value}</td>`;
    } else {
      tr.innerHTML = `<td>${row.exercise}</td><td>${row.sets}</td><td>${row.reps}</td>`;
    }
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  wrap.appendChild(table);
  return wrap;
}

function renderRun(w) {
  const wrap = document.createElement("div");

  const section = (title, lines) => {
    const s = document.createElement("div");
    s.innerHTML = `<div class="run-section-title">${title}</div>`;
    lines.forEach((l) => {
      const line = document.createElement("div");
      line.className = "run-line";
      line.innerHTML = `<span>${l.time}</span><span>${l.zone}</span>`;
      s.appendChild(line);
    });
    return s;
  };

  wrap.innerHTML = `<div class="run-section-title" style="margin-top:0">Run</div>`;
  wrap.appendChild(section("Warm Up", w.warmup));
  wrap.appendChild(section("Main Set", w.mainset));
  wrap.appendChild(section("Cool Down", w.cooldown));

  if (w.chart) {
    wrap.appendChild(renderZoneChart(w.chart));
  }

  return wrap;
}

function renderZoneChart(chart) {
  const container = document.createElement("div");
  container.className = "zone-chart";

  const barsRow = document.createElement("div");
  barsRow.style.display = "flex";
  barsRow.style.alignItems = "flex-end";
  barsRow.style.height = "220px";

  const addBar = (flex, heightPx, colorVar, position) => {
    const bar = document.createElement("div");
    bar.style.flex = flex;
    bar.style.height = heightPx + "px";
    bar.style.background = `var(${colorVar})`;
    bar.style.position = position || "static";
    return bar;
  };

  // warm up: zone 1
  barsRow.appendChild(addBar(1, 55, "--zone1"));

  // main set base: zone 2, with zone 4 spikes on top
  const mainWrap = document.createElement("div");
  mainWrap.style.flex = 3;
  mainWrap.style.display = "flex";
  mainWrap.style.alignItems = "flex-end";
  mainWrap.style.height = "130px";
  mainWrap.style.background = "var(--zone2)";
  mainWrap.style.gap = "2px";
  mainWrap.style.padding = "0 2px";

  for (let i = 0; i < chart.intervals; i++) {
    const spike = document.createElement("div");
    spike.style.flex = "1";
    spike.style.height = "220px";
    spike.style.background = "var(--zone4)";
    mainWrap.appendChild(spike);
  }

  const mainOuter = document.createElement("div");
  mainOuter.style.flex = 3;
  mainOuter.style.display = "flex";
  mainOuter.style.alignItems = "flex-end";
  mainOuter.appendChild(mainWrap);
  barsRow.appendChild(mainOuter);

  // cool down: zone 1
  barsRow.appendChild(addBar(1.5, 55, "--zone1"));

  const labelsRow = document.createElement("div");
  labelsRow.style.display = "flex";
  labelsRow.style.marginTop = "6px";
  labelsRow.innerHTML = `
    <span class="zone-label" style="flex:1">ZONE 1</span>
    <span class="zone-label" style="flex:3">ZONE 2</span>
    <span class="zone-label" style="flex:1.5">ZONE 1</span>
  `;

  const zone4Label = document.createElement("div");
  zone4Label.className = "zone-label";
  zone4Label.textContent = "ZONE 4";
  zone4Label.style.marginBottom = "6px";

  container.appendChild(zone4Label);
  container.appendChild(barsRow);
  container.appendChild(labelsRow);
  return container;
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", render);
