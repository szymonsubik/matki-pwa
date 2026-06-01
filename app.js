const STORAGE_KEY = "matki-pszczele-batches-v4";
const EXPANDED_KEY = "matki-pszczele-expanded-v1";

const SCHEMES = {
  izolacja: {
    label: "Izolacja matki na plastrze",
    emergenceDay: 16,
    events: [
      { day: 0, title: "Zaizoluj matkę na plastrze", note: "Start: matka zamknięta na wybranym plastrze/ramce, żeby uzyskać larwy w znanym wieku.", main: true },
      { day: 1, title: "Uwolnij matkę / zakończ izolację", note: "Po około 24 h jaja na plastrze mają znany wiek. Od tego momentu pilnujesz terminu przekładki." },
      { day: 4, title: "Przekładka larw", note: "Przekładaj bardzo młode larwy: najlepiej 12–24 h od wyklucia, możliwie najmniejsze, pływające w mleczku. Przy izolacji 24 h na plastrze zwykle celujesz w okno około 4. dnia od zamknięcia matki.", main: true },
      { day: 9, title: "Zasklepienie", note: "Dzień 9 od izolacji matki, czyli dzień 5 od przekładki larwy. Sprawdź przyjęcia i zasklepienie zgodnie ze swoją metodą.", tone: "seal" },
      { day: 10, title: "Możliwa izolacja, bardzo delikatna", note: "Dzień 6 od przekładki. Jeśli musisz izolować, zrób to spokojnie i bez wstrząsów. Ułóż mateczniki do góry nogami.", warning: true, tone: "pink" },
      { day: 11, title: "Możliwa izolacja, bardzo delikatna", note: "Dzień 7 od przekładki. Jeśli musisz izolować, zrób to spokojnie i bez wstrząsów. Ułóż mateczniki do góry nogami.", warning: true, tone: "pink" },
      { day: 12, title: "HISTOLIZA — NIE DOTYKAJ ULA", note: "Dzień 8 od przekładki. Okres bardzo wrażliwy. Nie przestawiaj, nie stukaj, nie rozbieraj ula.", warning: true, danger: true, tone: "danger" },
      { day: 13, title: "Izolacja mateczników", note: "Dzień 9 od przekładki. Właściwa izolacja mateczników. Pracuj spokojnie, bez wstrząsów. Ułóż mateczniki do góry nogami.", warning: true, main: true, tone: "isolation" },
      { day: 15, title: "Możliwe wygryzanie matek", note: "Dzień 11 od przekładki. Może pojawić się wcześniejsze wygryzanie.", warning: true, main: true, tone: "light-green" },
      { day: 16, title: "Wygryzanie matek", note: "Dzień 12 od przekładki. Główny termin spodziewanego wygryzania matek.", warning: true, main: true, emergence: true, tone: "dark-green" }
    ]
  },
  larwa: {
    label: "Przekładka larwy",
    emergenceDay: 12,
    events: [
      { day: 0, title: "Przekładka larwy", note: "Przekładaj bardzo młode larwy: najlepiej 12–24 h od wyklucia, możliwie najmniejsze, pływające w mleczku.", main: true },
      { day: 5, title: "Zasklepienie", note: "Dzień 5 od przekładki. Sprawdź przyjęcia i zasklepienie mateczników zgodnie ze swoją metodą.", tone: "seal" },
      { day: 6, title: "Możliwa izolacja, bardzo delikatna", note: "Dzień 6 od przekładki. Jeśli musisz izolować, zrób to spokojnie i bez wstrząsów. Ułóż mateczniki do góry nogami.", warning: true, tone: "pink" },
      { day: 7, title: "Możliwa izolacja, bardzo delikatna", note: "Dzień 7 od przekładki. Jeśli musisz izolować, zrób to spokojnie i bez wstrząsów. Ułóż mateczniki do góry nogami.", warning: true, tone: "pink" },
      { day: 8, title: "HISTOLIZA — NIE DOTYKAJ ULA", note: "Dzień 8 od przekładki. Okres bardzo wrażliwy. Nie przestawiaj, nie stukaj, nie rozbieraj ula.", warning: true, danger: true, tone: "danger" },
      { day: 9, title: "Izolacja mateczników", note: "Dzień 9 od przekładki. Właściwa izolacja mateczników. Pracuj spokojnie, bez wstrząsów. Ułóż mateczniki do góry nogami.", warning: true, main: true, tone: "isolation" },
      { day: 11, title: "Możliwe wygryzanie matek", note: "Dzień 11 od przekładki. Może zdarzyć się wcześniejsze wygryzanie. Traktuj partię ostrożnie.", warning: true, main: true, tone: "light-green" },
      { day: 12, title: "Wygryzanie matek", note: "Dzień 12 od przekładki. Główny termin spodziewanego wygryzania matek.", warning: true, main: true, emergence: true, tone: "dark-green" }
    ]
  },
  zasklepiony: {
    label: "Zasklepiony matecznik",
    emergenceDay: 7,
    events: [
      { day: 0, title: "Start: matecznik zasklepiony", note: "Liczenie od momentu znalezienia/włożenia zasklepionego matecznika.", tone: "seal" },
      { day: 1, title: "Okres wrażliwy: nie ruszać", note: "Ogranicz przeglądy i wstrząsy.", warning: true },
      { day: 5, title: "Zaizolować matecznik", note: "Jeżeli izolujesz, zrób to według swojej metody.", warning: true, tone: "pink" },
      { day: 6, title: "Możliwe wygryzanie matek", note: "Termin zależy od wieku matecznika w chwili dodania.", warning: true, main: true, tone: "light-green" },
      { day: 7, title: "Wygryzanie matek", note: "Orientacyjny główny termin przy liczeniu od zasklepienia.", warning: true, main: true, emergence: true, tone: "dark-green" }
    ]
  },
  wygryzienie: {
    label: "Wygryzienie matki",
    emergenceDay: 0,
    events: [
      { day: 0, title: "Matka wygryziona", note: "Start liczenia po wygryzieniu.", emergence: true, tone: "dark-green" },
      { day: 3, title: "Nie przeszkadzać", note: "Daj matce czas na dojrzewanie i orientację." },
      { day: 7, title: "Możliwe loty godowe", note: "Termin mocno zależy od pogody.", warning: true }
    ]
  }
};

const form = document.querySelector("#batchForm");
const batchesEl = document.querySelector("#batches");
const template = document.querySelector("#batchTemplate");
const emptyState = document.querySelector("#emptyState");
const todayLabel = document.querySelector("#todayLabel");
const demoBtn = document.querySelector("#demoBtn");
const notifyBtn = document.querySelector("#notifyBtn");

let batches = loadBatches();
const expandedBatchIds = loadExpandedState();

init();

function init() {
  setDefaultDate();
  registerServiceWorker();
  render();
  form.addEventListener("submit", onSubmit);
  demoBtn.addEventListener("click", addDemo);
  notifyBtn.addEventListener("click", requestNotifications);
  setInterval(render, 60_000);
}

function onSubmit(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const batch = {
    id: createId(),
    name: String(formData.get("name") || "").trim(),
    startType: String(formData.get("startType") || "larwa"),
    startDate: parseLocalDateTime(String(formData.get("startDate") || "")).toISOString(),
    count: String(formData.get("count") || "").trim(),
    notes: String(formData.get("notes") || "").trim(),
    createdAt: new Date().toISOString()
  };

  if (!batch.name) {
    alert("Wpisz nazwę partii / ula.");
    return;
  }
  if (Number.isNaN(new Date(batch.startDate).getTime())) {
    alert("Ustaw poprawną datę i godzinę startu.");
    return;
  }

  batches.push(batch);
  try {
    saveBatches();
  } catch (error) {
    alert("Nie udało się zapisać partii w pamięci Safari. Sprawdź, czy nie używasz trybu prywatnego.");
    return;
  }
  form.reset();
  setDefaultDate();
  render();
  maybeNotify("Dodano partię", `${batch.name}: harmonogram jest gotowy.`);
}

function addDemo() {
  const start = new Date();
  start.setDate(start.getDate() - 3);
  start.setHours(9, 0, 0, 0);
  batches.push({
    id: createId(),
    name: "Ul 1 / seria testowa",
    startType: "larwa",
    startDate: start.toISOString(),
    count: "12",
    notes: "Przykład do sprawdzenia działania aplikacji.",
    createdAt: new Date().toISOString()
  });
  saveBatches();
  render();
}

function render() {
  todayLabel.textContent = new Intl.DateTimeFormat("pl-PL", { dateStyle: "full", timeStyle: "short" }).format(new Date());
  batchesEl.innerHTML = "";
  emptyState.hidden = batches.length > 0;

  const sorted = [...batches].sort((a, b) => getEmergenceDate(a) - getEmergenceDate(b));

  for (const batch of sorted) {
    batchesEl.appendChild(renderBatch(batch));
  }
}

function renderBatch(batch) {
  const node = template.content.firstElementChild.cloneNode(true);
  const scheme = SCHEMES[batch.startType] || SCHEMES.larwa;
  const start = new Date(batch.startDate);
  const events = scheme.events.map(item => ({
    ...item,
    date: addDays(start, item.day)
  }));
  const now = new Date();
  const next = events.find(item => item.date >= now) || events.at(-1);
  const emergenceEvent = events.find(item => item.emergence) || events.find(item => item.day === scheme.emergenceDay) || events.at(-1);

  node.querySelector(".batch-name").textContent = batch.name;
  node.querySelector(".batch-meta").textContent = [
    scheme.label,
    batch.count ? `${batch.count} szt.` : null,
    `start: ${formatDateTime(start)}`
  ].filter(Boolean).join(" • ");

  const heroBox = node.querySelector(".emergence-box");
  node.querySelector(".emergence-countdown").textContent = countdownLabel(emergenceEvent.date, now);
  node.querySelector(".emergence-date").textContent = formatBigDate(emergenceEvent.date);
  node.querySelector(".emergence-day").hidden = true;
  if (emergenceEvent.date < now) heroBox.classList.add("past");

  const nextBox = node.querySelector(".next-box");
  if (next?.warning) nextBox.classList.add("warning");
  if (next?.danger) nextBox.classList.add("danger");
  applyTone(nextBox, next);
  node.querySelector(".next-label").textContent = next ? "Kolejny krok" : "Harmonogram zakończony";
  node.querySelector(".next-title").textContent = next ? next.title : "Koniec";
  node.querySelector(".next-countdown").textContent = next ? countdownLabel(next.date, now) : "koniec";
  node.querySelector(".next-date").textContent = next ? formatDateTime(next.date) : "";

  const mainEvents = node.querySelector(".main-events");
  const upcomingMain = events.filter(item => item.main && item.date >= now).slice(0, 3);
  const compactEvents = upcomingMain.length ? upcomingMain : events.filter(item => item.date >= now).slice(0, 3);
  for (const event of compactEvents) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${escapeHtml(event.title)}</strong><span>${formatDateTime(event.date)}</span>`;
    if (event.warning) li.classList.add("warning-text");
    applyTone(li, event);
    mainEvents.appendChild(li);
  }

  const toggle = node.querySelector(".toggle-details");
  const details = node.querySelector(".details");
  const isExpanded = expandedBatchIds.has(batch.id);
  details.hidden = !isExpanded;
  toggle.textContent = isExpanded ? "Zwiń szczegóły" : "Rozwiń szczegóły";
  toggle.addEventListener("click", () => {
    const isHidden = details.hidden;
    details.hidden = !isHidden;
    if (isHidden) {
      expandedBatchIds.add(batch.id);
    } else {
      expandedBatchIds.delete(batch.id);
    }
    saveExpandedState();
    toggle.textContent = isHidden ? "Zwiń szczegóły" : "Rozwiń szczegóły";
  });

  const timeline = node.querySelector(".timeline");
  for (const event of events) {
    const li = document.createElement("li");
    const isDone = event.date < now;
    const isActive = !isDone && event === next;
    if (isDone) li.classList.add("done");
    if (isActive) li.classList.add("active");
    if (event.danger) li.classList.add("danger-item");
    applyTone(li, event);

    const time = document.createElement("time");
    time.dateTime = event.date.toISOString();
    time.textContent = `Dzień ${event.day} · ${formatShort(event.date)}`;

    const body = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = event.title;
    const note = document.createElement("p");
    note.textContent = event.note;
    note.className = "muted";
    body.append(title, note);
    li.append(time, body);
    timeline.appendChild(li);
  }

  const notes = node.querySelector(".notes");
  notes.textContent = batch.notes ? `Notatka: ${batch.notes}` : "";
  notes.hidden = !batch.notes;

  node.querySelector(".delete-btn").addEventListener("click", () => {
    const ok = confirm(`Usunąć partię „${batch.name}”?`);
    if (!ok) return;
    batches = batches.filter(item => item.id !== batch.id);
    expandedBatchIds.delete(batch.id);
    saveExpandedState();
    saveBatches();
    render();
  });

  return node;
}

function getEmergenceDate(batch) {
  const scheme = SCHEMES[batch.startType] || SCHEMES.larwa;
  return addDays(new Date(batch.startDate), scheme.emergenceDay).getTime();
}

function countdownLabel(target, now = new Date()) {
  const ms = target.getTime() - now.getTime();
  const past = ms < 0;
  const absMs = Math.abs(ms);
  const minutes = Math.floor(absMs / 60_000);
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const mins = minutes % 60;

  if (minutes < 1) return "teraz";
  const text = days > 0 ? `${days} dni ${hours} godz.` : hours > 0 ? `${hours} godz. ${mins} min` : `${mins} min`;
  return past ? `${text} temu` : `za ${text}`;
}

function formatDateTime(date) {
  return new Intl.DateTimeFormat("pl-PL", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function formatBigDate(date) {
  return new Intl.DateTimeFormat("pl-PL", { weekday: "long", day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(date);
}

function formatShort(date) {
  return new Intl.DateTimeFormat("pl-PL", { weekday: "short", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }).format(date);
}

function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}


function createId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `batch-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function parseLocalDateTime(value) {
  // Safari na iPhonie bywa kapryśne przy parsowaniu datetime-local, więc składamy datę ręcznie.
  const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!match) return new Date(NaN);
  const [, y, m, d, h, min] = match.map(Number);
  return new Date(y, m - 1, d, h, min, 0, 0);
}

function loadBatches() {
  try {
    const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (current.length) return current;
    const previous = JSON.parse(localStorage.getItem("matki-pszczele-batches-v2") || "[]");
    if (previous.length) return previous;
    return JSON.parse(localStorage.getItem("matki-pszczele-batches-v1") || "[]");
  } catch {
    return [];
  }
}

function saveBatches() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(batches));
}

function loadExpandedState() {
  try {
    const ids = JSON.parse(localStorage.getItem(EXPANDED_KEY) || "[]");
    return new Set(Array.isArray(ids) ? ids : []);
  } catch {
    return new Set();
  }
}

function saveExpandedState() {
  localStorage.setItem(EXPANDED_KEY, JSON.stringify([...expandedBatchIds]));
}

function setDefaultDate() {
  const input = document.querySelector("#startDate");
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  input.value = now.toISOString().slice(0, 16);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function applyTone(element, event) {
  if (!element || !event?.tone) return;
  element.classList.add(`tone-${event.tone}`);
}

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  try {
    await navigator.serviceWorker.register("sw.js");
  } catch (error) {
    console.warn("Service worker nie został zarejestrowany", error);
  }
}

async function requestNotifications() {
  if (!("Notification" in window)) {
    alert("Ta przeglądarka nie obsługuje powiadomień webowych.");
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    maybeNotify("Powiadomienia włączone", "Na razie aplikacja przypomina po otwarciu. Pełne push dodamy w kolejnym etapie.");
  } else {
    alert("Nie włączono powiadomień.");
  }
}

function maybeNotify(title, body) {
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  new Notification(title, { body, icon: "icons/icon-192.png" });
}
